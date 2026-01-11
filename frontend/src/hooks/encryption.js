// src/hooks/encryption.js
import CryptoJS from "crypto-js"

const KEY = import.meta.env.VITE_AES_KEY
const IV = import.meta.env.VITE_AES_IV

const getKeyIv = () => {
  if (!KEY || !IV) {
    throw new Error("VITE_AES_KEY ou VITE_AES_IV manquant dans .env")
  }

  if (KEY.length !== 32) {
    throw new Error(`VITE_AES_KEY doit faire 32 caractères (actuel: ${KEY.length})`)
  }

  if (IV.length !== 16) {
    throw new Error(`VITE_AES_IV doit faire 16 caractères (actuel: ${IV.length})`)
  }

  return {
    key: CryptoJS.enc.Utf8.parse(KEY),
    iv: CryptoJS.enc.Utf8.parse(IV),
  }
}

/**
 * enc_dec(text, type="e")
 * - type="e": encrypt -> Base64
 * - type="d": decrypt Base64 -> plaintext
 */
export function enc_dec(text, type = "e") {
  const { key, iv } = getKeyIv()

  if (type === "e") {
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  }

  if (type === "d") {
    const ciphertextWA = CryptoJS.enc.Base64.parse(text)
    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: ciphertextWA })

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return CryptoJS.enc.Utf8.stringify(decrypted)
  }

  throw new Error("type inconnu: utiliser 'e' ou 'd'")
}

export function encryptId(id) {
  if (!id) return null
  try {
    return enc_dec(String(id), "e")
  } catch (error) {
    console.error("[v0] Encryption error:", error.message)
    return null
  }
}

export function decryptId(encryptedId) {
  if (!encryptedId) return null
  try {
    return enc_dec(encryptedId, "d")
  } catch (error) {
    console.error("[v0] Decryption error:", error.message)
    return null
  }
}
