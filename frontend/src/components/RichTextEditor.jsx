"use client"

import { useState } from "react"
import "../styles/RichTexteditor.css"

export default function RichTextEditor({ value, onChange, language }) {
  const translations = {
    fr: { bold: "Gras", italic: "Italique", link: "Lien", image: "Image", video: "Vidéo" },
    mg: { bold: "Bold", italic: "Italic", link: "Lien", image: "Larawan", video: "Video" },
    en: { bold: "Bold", italic: "Italic", link: "Link", image: "Image", video: "Video" },
  }

  const t = translations[language] || translations.fr
  const [isLink, setIsLink] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const applyFormat = (format) => {
    const textarea = document.querySelector(".rich-editor-textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end) || "texte"

    let formattedText = ""
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "link":
        setIsLink(true)
        return
      case "image":
        formattedText = `![image](url)`
        break
      case "video":
        formattedText = `[Vidéo](https://youtube.com/...)`
        break
      default:
        return
    }

    const newText = value.substring(0, start) + formattedText + value.substring(end)
    onChange(newText)
  }

  const addLink = () => {
    const textarea = document.querySelector(".rich-editor-textarea")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end) || "lien"
    const newText = value.substring(0, start) + `[${selectedText}](${linkUrl})` + value.substring(end)
    onChange(newText)
    setIsLink(false)
    setLinkUrl("")
  }

  return (
    <div className="rich-editor">
      <div className="editor-toolbar">
        <button type="button" title={t.bold} onClick={() => applyFormat("bold")}>
          <strong>B</strong>
        </button>
        <button type="button" title={t.italic} onClick={() => applyFormat("italic")}>
          <em>I</em>
        </button>
        <button type="button" title={t.link} onClick={() => applyFormat("link")}>
          🔗
        </button>
        <button type="button" title={t.image} onClick={() => applyFormat("image")}>
          🖼️
        </button>
        <button type="button" title={t.video} onClick={() => applyFormat("video")}>
          📹
        </button>
      </div>

      {isLink && (
        <div className="link-input">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            autoFocus
          />
          <button type="button" onClick={addLink}>
            OK
          </button>
          <button type="button" onClick={() => setIsLink(false)}>
            Annuler
          </button>
        </div>
      )}

      <textarea
        className="rich-editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Écrivez votre message..."
        rows="8"
      ></textarea>
    </div>
  )
}
