from rest_framework import serializers
from django.utils import timezone
from apps.fundraisers.models import Fundraiser, Donation, Payment, Comment
from apps.users.serializers import UserSerializer


class FundraiserListSerializer(serializers.ModelSerializer):
    createur = UserSerializer(read_only=True)
    progression = serializers.SerializerMethodField()
    jours_restants = serializers.SerializerMethodField()
    est_termine = serializers.SerializerMethodField()
    
    class Meta:
        model = Fundraiser
        fields = [
            'id', 'titre', 'description', 'objectif', 'montant_collecte', 'devise',
            'date_debut', 'date_fin', 'est_active', 'image', 'categorie',
            'createur', 'progression', 'jours_restants', 'est_termine',
            'masquer_le_montant', 'est_validee', 'created_at', 'updated_at'
        ]
        read_only_fields = ['montant_collecte', 'date_debut', 'created_at', 'updated_at']

    def get_progression(self, obj):
        if obj.objectif <= 0:
            return 0
        return round((obj.montant_collecte / obj.objectif) * 100, 2)

    def get_jours_restants(self, obj):
        if not obj.date_fin:
            return None
        delta = obj.date_fin - timezone.now()
        return max(0, delta.days)

    def get_est_termine(self, obj):
        if not obj.date_fin:
            return False
        return timezone.now() > obj.date_fin


class FundraiserCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fundraiser
        fields = [
            'titre', 'description', 'objectif', 'date_fin', 'devise',
            'image', 'categorie', 'video_url', 'masquer_le_montant'
        ]
    
    def validate(self, attrs):
        if attrs.get('objectif', 0) <= 0:
            raise serializers.ValidationError("L'objectif doit être supérieur à 0.")
            
        date_fin = attrs.get('date_fin')
        if date_fin and date_fin <= timezone.now():
            raise serializers.ValidationError("La date de fin doit être dans le futur.")
            
        return attrs
    
    def create(self, validated_data):
        validated_data['createur'] = self.context['request'].user
        return super().create(validated_data)


class DonationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'id', 'donateur_nom', 'donateur_email', 'montant', 'devise',
            'message', 'est_anonyme', 'masquer_le_montant', 'created_at'
        ]
        read_only_fields = fields


class DonationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'fundraiser', 'donateur_nom', 'donateur_email', 'montant',
            'devise', 'message', 'est_anonyme', 'masquer_le_montant'
        ]
        read_only_fields = ['fundraiser']
    
    def validate(self, attrs):
        if attrs.get('montant', 0) <= 0:
            raise serializers.ValidationError("Le montant du don doit être positif.")
        return attrs


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'reference_transaction', 'statut', 'methode_paiement',
            'created_at', 'updated_at'
        ]
        read_only_fields = fields


class CommentListSerializer(serializers.ModelSerializer):
    auteur = UserSerializer(read_only=True, allow_null=True)
    reactions_positives_count = serializers.IntegerField(read_only=True, source='reactions_positives.count')
    reactions_negatives_count = serializers.IntegerField(read_only=True, source='reactions_negatives.count')
    has_positive_reaction = serializers.SerializerMethodField()
    has_negative_reaction = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id',
            'auteur',
            'contenu',
            'image',
            'video_url',
            'video',
            'reactions_positives_count',
            'reactions_negatives_count',
            'has_positive_reaction',
            'has_negative_reaction',
            'created_at'
        ]
        read_only_fields = [
            'reactions_positives_count',
            'reactions_negatives_count',
            'has_positive_reaction',
            'has_negative_reaction',
            'created_at'
        ]

    def get_has_positive_reaction(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.reactions_positives.filter(id=request.user.id).exists()
        return False

    def get_has_negative_reaction(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.reactions_negatives.filter(id=request.user.id).exists()
        return False


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['contenu', 'image', 'video_url', 'video']
        read_only_fields = ['fundraiser']
        
class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['contenu', 'image', 'video_url', 'video']
        extra_kwargs = {
            'contenu': {'required': False},
            'image': {'required': False},
            'video_url': {'required': False},
            'video': {'required': False},
        }