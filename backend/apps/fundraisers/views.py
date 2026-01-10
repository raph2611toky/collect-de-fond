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

from .models import Fundraiser, Comment
from .serializers import (
    FundraiserListSerializer,
    FundraiserCreateUpdateSerializer,
    CommentListSerializer,
    CommentCreateSerializer,
    CommentUpdateSerializer
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