# apps/fundraisers/views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.shortcuts import get_object_or_404
import traceback

from django.db import transaction

from apps.fundraisers.models import Fundraiser, Comment, Donation, Payment
from apps.fundraisers.serializers import (
    FundraiserListSerializer,
    FundraiserCreateUpdateSerializer,
    CommentListSerializer,
    CommentCreateSerializer,
    CommentUpdateSerializer,DonationPaymentCreateSerializer,PaymentSerializer,
    PaymentCreateSerializer, DonationListSerializer, DonationCreateSerializer,
)

from helpers.permissions import (
    IsAuthenticatedOrReadOnly,
    IsOwnerOrReadOnly,
)


# =============================================================================
#                           FUNDRAISER VIEWS
# =============================================================================

class FundraiserListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        tags=['Fundraisers'],
        manual_parameters=[
            openapi.Parameter('categorie', openapi.IN_QUERY, type=openapi.TYPE_STRING, required=False),
            openapi.Parameter('active', openapi.IN_QUERY, type=openapi.TYPE_BOOLEAN, required=False),
        ]
    )
    def get(self, request):
        try:
            qs = Fundraiser.objects.select_related('createur').order_by('-created_at')

            categorie = request.query_params.get('categorie')
            if categorie:
                qs = qs.filter(categorie__iexact=categorie)

            active = request.query_params.get('active')
            if active is not None:
                qs = qs.filter(est_active=active.lower() in ('true', '1', 'yes'))

            serializer = FundraiserListSerializer(qs, many=True)
            return Response({
                "success": True,
                "message": "Liste des campagnes récupérée",
                "data": serializer.data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la récupération des campagnes : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class MyFundraiserListView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        tags=['Fundraisers'],
        manual_parameters=[
            openapi.Parameter('categorie', openapi.IN_QUERY, type=openapi.TYPE_STRING, required=False),
        ]
    )
    def get(self, request):
        try:
            qs = Fundraiser.objects.filter(createur=request.user).order_by('-created_at')

            categorie = request.query_params.get('categorie')
            if categorie:
                qs = qs.filter(categorie__iexact=categorie)

            serializer = FundraiserListSerializer(qs, many=True)
            return Response({
                "success": True,
                "message": "Liste des campagnes récupérée",
                "data": serializer.data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la récupération des campagnes : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FundraiserCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        tags=['Fundraisers'],
        request_body=FundraiserCreateUpdateSerializer
    )
    def post(self, request):
        try:
            serializer = FundraiserCreateUpdateSerializer(
                data=request.data,
                context={'request': request}
            )
            if serializer.is_valid():
                instance = serializer.save()
                return Response({
                    "success": True,
                    "message": "Campagne créée avec succès",
                    "data": FundraiserListSerializer(instance).data
                }, status=status.HTTP_201_CREATED)

            return Response({
                "success": False,
                "message": "Données invalides",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la création de la campagne : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FundraiserDetailView(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, fundraiser_id):
        try:
            return Fundraiser.objects.get(pk=fundraiser_id)
        except Fundraiser.DoesNotExist:
            return None

    @swagger_auto_schema(tags=['Fundraisers'])
    def get(self, request, fundraiser_id):
        try:
            obj = self.get_object(fundraiser_id)
            if not obj:
                return Response({
                    "success": False,
                    "message": "Campagne non trouvée",
                    "data": {}
                }, status=status.HTTP_404_NOT_FOUND)

            self.check_object_permissions(request, obj)
            serializer = FundraiserListSerializer(obj)
            return Response({
                "success": True,
                "message": "Détail de la campagne",
                "data": serializer.data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur serveur : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FundraiserUpdateView(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, fundraiser_id):
        try:
            return Fundraiser.objects.get(pk=fundraiser_id)
        except Fundraiser.DoesNotExist:
            return None

    @swagger_auto_schema(
        tags=['Fundraisers'],
        request_body=FundraiserCreateUpdateSerializer
    )
    def put(self, request, fundraiser_id):
        try:
            obj = self.get_object(fundraiser_id)
            if not obj:
                return Response({
                    "success": False,
                    "message": "Campagne non trouvée",
                    "data": {}
                }, status=status.HTTP_404_NOT_FOUND)

            self.check_object_permissions(request, obj)

            serializer = FundraiserCreateUpdateSerializer(
                obj, data=request.data, partial=True, context={'request': request}
            )

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "success": True,
                    "message": "Campagne mise à jour avec succès",
                    "data": FundraiserListSerializer(obj).data
                })

            return Response({
                "success": False,
                "message": "Données invalides",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la mise à jour : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FundraiserDeleteView(APIView):
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, fundraiser_id):
        try:
            return Fundraiser.objects.get(pk=fundraiser_id)
        except Fundraiser.DoesNotExist:
            return None

    @swagger_auto_schema(tags=['Fundraisers'])
    def delete(self, request, fundraiser_id):
        try:
            obj = self.get_object(fundraiser_id)
            if not obj:
                return Response({
                    "success": False,
                    "message": "Campagne non trouvée",
                    "data": {}
                }, status=status.HTTP_404_NOT_FOUND)

            self.check_object_permissions(request, obj)
            titre = obj.titre
            obj.delete()

            return Response({
                "success": True,
                "message": f"Campagne '{titre}' supprimée avec succès",
                "data": {}
            }, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la suppression : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# =============================================================================
#                             COMMENT VIEWS
# =============================================================================

class CommentListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(tags=['Comments'])
    def get(self, request, fundraiser_id):
        try:
            fundraiser = get_object_or_404(Fundraiser, id=fundraiser_id)
            comments = Comment.objects.filter(fundraiser=fundraiser)\
                                     .select_related('auteur')\
                                     .order_by('-created_at')

            serializer = CommentListSerializer(
                comments, many=True, context={'request': request}
            )

            return Response({
                "success": True,
                "message": "Liste des commentaires récupérée",
                "data": serializer.data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la récupération des commentaires : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        tags=['Comments'],
        request_body=CommentCreateSerializer
    )
    def post(self, request, fundraiser_id):
        try:
            fundraiser = get_object_or_404(Fundraiser, id=fundraiser_id)

            serializer = CommentCreateSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(
                    fundraiser=fundraiser,
                    auteur=request.user
                )
                return Response({
                    "success": True,
                    "message": "Commentaire créé avec succès",
                    "data": CommentListSerializer(comment, context={'request': request}).data
                }, status=status.HTTP_201_CREATED)

            return Response({
                "success": False,
                "message": "Données invalides",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la création du commentaire : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentDetailView(APIView):
    permission_classes = [IsOwnerOrReadOnly]  # ou IsCommentOwnerOrReadOnly

    def get_object(self, comment_id):
        return get_object_or_404(Comment, pk=comment_id)

    @swagger_auto_schema(tags=['Comments'])
    def get(self, request, comment_id):
        try:
            comment = self.get_object(comment_id)
            self.check_object_permissions(request, comment)

            serializer = CommentListSerializer(comment, context={'request': request})
            return Response({
                "success": True,
                "message": "Détail du commentaire",
                "data": serializer.data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur serveur : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentUpdateView(APIView):
    permission_classes = [IsOwnerOrReadOnly]  # ou IsCommentOwnerOrReadOnly
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, comment_id):
        return get_object_or_404(Comment, pk=comment_id)

    @swagger_auto_schema(
        tags=['Comments'],
        request_body=CommentUpdateSerializer
    )
    def put(self, request, comment_id):
        try:
            comment = self.get_object(comment_id)
            self.check_object_permissions(request, comment)

            serializer = CommentUpdateSerializer(
                comment, data=request.data, partial=True
            )

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "success": True,
                    "message": "Commentaire modifié avec succès",
                    "data": CommentListSerializer(comment, context={'request': request}).data
                })

            return Response({
                "success": False,
                "message": "Données invalides",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la modification : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentDeleteView(APIView):
    permission_classes = [IsOwnerOrReadOnly]  # ou IsCommentOwnerOrReadOnly

    def get_object(self, comment_id):
        return get_object_or_404(Comment, pk=comment_id)

    @swagger_auto_schema(tags=['Comments'])
    def delete(self, request, comment_id):
        try:
            comment = self.get_object(comment_id)
            self.check_object_permissions(request, comment)
            comment.delete()

            return Response({
                "success": True,
                "message": "Commentaire supprimé avec succès",
                "data": {}
            }, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la suppression : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# =============================================================================
#                DONATION & PAYMENT VIEWS
# ============================================================================

class DonationPaymentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        tags=['Donations'],
        operation_summary="Créer donation + payement",
        operation_description=(
            "Crée une Donation liée à une campagne (Fundraiser) et crée le Payement associé "
            "(relation OneToOne). La réponse renvoie toujours la forme: {donation: {...}, payement: {...}}."
        ),
        # manual_parameters=[
        #     openapi.Parameter(
        #         name='fundraiser_id',
        #         in_=openapi.IN_PATH,
        #         type=openapi.TYPE_INTEGER,
        #         required=True,
        #         description="ID de la campagne (Fundraiser)"
        #     ),
        # ],
        request_body=DonationPaymentCreateSerializer,
        responses={
            201: openapi.Response(
                description="Création réussie",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        "message": openapi.Schema(type=openapi.TYPE_STRING),
                        "data": openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                "donation": openapi.Schema(type=openapi.TYPE_OBJECT),
                                "payement": openapi.Schema(type=openapi.TYPE_OBJECT),
                            }
                        )
                    }
                ),
                examples={
                    "application/json": {
                        "success": True,
                        "message": "Donation et payement créés avec succès",
                        "data": {
                            "donation": {
                                "id": 10,
                                "donateur_nom": "John",
                                "donateur_email": "john@mail.com",
                                "montant": "5000.00",
                                "devise": "MGA",
                                "message": "Courage",
                                "est_anonyme": False,
                                "masquer_le_montant": False,
                                "est_achevee": False,
                                "created_at": "2026-01-11T20:00:00+03:00"
                            },
                            "payement": {
                                "id": 7,
                                "reference_transaction": "TXN-20260111-0001",
                                "statut": "En attente",
                                "methode_paiement": "MVola",
                                "created_at": "2026-01-11T20:00:00+03:00",
                                "updated_at": "2026-01-11T20:00:00+03:00"
                            }
                        }
                    }
                }
            ),
            400: openapi.Response(
                description="Erreur de validation ou référence_transaction déjà utilisée"
            ),
            401: openapi.Response(
                description="Non authentifié"
            ),
            404: openapi.Response(
                description="Campagne introuvable"
            ),
        }
    )
    @transaction.atomic
    def post(self, request, fundraiser_id):
        try:
            fundraiser = get_object_or_404(Fundraiser, pk=fundraiser_id)

            serializer = DonationPaymentCreateSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)

            donation_data = serializer.validated_data['donation']
            payement_data = serializer.validated_data['payement']

            # 1) Créer la donation (liée au fundraiser)
            donation = Donation.objects.create(
                fundraiser=fundraiser,
                **donation_data
            )

            # 2) Créer le payment (OneToOne)
            payment = Payment.objects.create(
                donation=donation,
                reference_transaction=payement_data['reference_transaction'],
                methode_paiement=payement_data['methode_paiement'],
                statut=payement_data.get('statut', 'En attente')
            )

            return Response({
                "success": True,
                "message": "Donation et payement créés avec succès",
                "data": {
                    "donation": DonationListSerializer(donation).data,
                    "payement": PaymentSerializer(payment).data
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la création donation/payement : {str(e)}",
                "data": {"donation": {}, "payement": {}}
            }, status=status.HTTP_400_BAD_REQUEST)

class DonationListByFundraiserView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(tags=['Donations'])
    def get(self, request, fundraiser_id):
        try:
            fundraiser = get_object_or_404(Fundraiser, pk=fundraiser_id)

            qs = Donation.objects.filter(fundraiser=fundraiser).order_by('-created_at')
            serializer = DonationListSerializer(qs, many=True)

            return Response({
                "success": True,
                "message": "Liste des donations récupérée",
                "data": serializer.data
            })
        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la récupération des donations : {str(e)}",
                "data": []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DonationProfileView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(
        tags=['Donations'],
        operation_summary="Détail donation + payement",
        manual_parameters=[
            openapi.Parameter(
                name='donation_id',
                in_=openapi.IN_PATH,
                type=openapi.TYPE_INTEGER,
                required=True,
                description="ID de la donation"
            ),
        ],
        responses={
            200: openapi.Response(
                description="Détail donation",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "success": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        "message": openapi.Schema(type=openapi.TYPE_STRING),
                        "data": openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                "donation": openapi.Schema(type=openapi.TYPE_OBJECT),
                                "payement": openapi.Schema(type=openapi.TYPE_OBJECT, nullable=True),
                            }
                        )
                    }
                )
            ),
            404: openapi.Response(description="Donation introuvable"),
            500: openapi.Response(description="Erreur serveur"),
        }
    )
    def get(self, request, donation_id):
        try:
            donation = get_object_or_404(Donation, pk=donation_id)

            payment = getattr(donation, "payment", None)

            return Response({
                "success": True,
                "message": "Détail donation",
                "data": {
                    "donation": DonationListSerializer(donation).data,
                    "payement": PaymentSerializer(payment).data if payment else None
                }
            })
        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la récupération : {str(e)}",
                "data": {"donation": {}, "payement": {}}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# =============================================================================
#                         REACTIONS (LIKES / DISLIKES)
# =============================================================================

class CommentReactPositiveView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['Comments - Reactions'])
    def post(self, request, comment_id):
        try:
            comment = get_object_or_404(Comment, pk=comment_id)

            if comment.reactions_positives.filter(id=request.user.id).exists():
                comment.reactions_positives.remove(request.user)
                action = "retirée"
            else:
                comment.reactions_negatives.remove(request.user)
                comment.reactions_positives.add(request.user)
                action = "ajoutée"

            return Response({
                "success": True,
                "message": f"Réaction positive {action}",
                "data": CommentListSerializer(comment, context={'request': request}).data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la gestion de la réaction positive : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentReactNegativeView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['Comments - Reactions'])
    def post(self, request, comment_id):
        try:
            comment = get_object_or_404(Comment, pk=comment_id)

            if comment.reactions_negatives.filter(id=request.user.id).exists():
                comment.reactions_negatives.remove(request.user)
                action = "retirée"
            else:
                comment.reactions_positives.remove(request.user)
                comment.reactions_negatives.add(request.user)
                action = "ajoutée"

            return Response({
                "success": True,
                "message": f"Réaction négative {action}",
                "data": CommentListSerializer(comment, context={'request': request}).data
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": f"Erreur lors de la gestion de la réaction négative : {str(e)}",
                "data": {}
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)