from apps.users.models import User
from django.db import models

class Fundraiser(models.Model):
    createur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fundraisers')
    titre = models.CharField(max_length=255)
    description = models.TextField()
    objectif = models.DecimalField(max_digits=10, decimal_places=2)
    montant_collecte = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    devise = models.CharField(max_length=10, default='MGA')
    date_debut = models.DateTimeField(auto_now_add=True)
    date_fin = models.DateTimeField()
    est_active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='fundraiser_images/', null=True, blank=True)
    categorie = models.CharField(max_length=100, default='Autre')
    video_url = models.URLField(null=True, blank=True)
    masquer_le_montant = models.BooleanField(default=False)
    est_validee = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.titre
    
    class Meta:
        db_table = 'fundraisers'
        ordering = ['-created_at']
        
class Donation(models.Model):
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.CASCADE, related_name='donations')
    donateur_nom = models.CharField(max_length=255)
    donateur_email = models.EmailField()
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    devise = models.CharField(max_length=10, default='MGA')
    message = models.TextField(null=True, blank=True)
    est_anonyme = models.BooleanField(default=False)
    masquer_le_montant = models.BooleanField(default=False)
    est_achevee = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Donation de {self.donateur_nom} - {self.montant} {self.devise}"
    
    class Meta:
        db_table = 'donations'
        ordering = ['-created_at']
        
class Payment(models.Model):
    donation = models.OneToOneField(Donation, on_delete=models.CASCADE, related_name='payment')
    reference_transaction = models.CharField(max_length=255, unique=True)
    statut = models.CharField(max_length=50, default='En attente')
    methode_paiement = models.CharField(max_length=100)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Payment {self.reference_transaction} - {self.statut}"
    
    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']

class Comment(models.Model):
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.CASCADE, related_name='comments')
    auteur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    image = models.ImageField(upload_to='comment_images/', null=True, blank=True)
    video_url = models.URLField(null=True, blank=True)
    video = models.FileField(upload_to='comment_videos/', null=True, blank=True)
    contenu = models.TextField()
    reactions_positives = models.ManyToManyField(User, related_name='positive_reactions', blank=True)
    reactions_negatives = models.ManyToManyField(User, related_name='negative_reactions', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Commentaire de {self.auteur}"
    
    class Meta:
        db_table = 'comments'
        ordering = ['-created_at']