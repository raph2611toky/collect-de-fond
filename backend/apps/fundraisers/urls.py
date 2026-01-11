from django.urls import path
from apps.fundraisers import views

urlpatterns = [
    # Fundraisers
    path('fundraisers/', view=views.FundraiserListView.as_view(), name='fundraiser-list'),
    path('fundraisers/my/', view=views.MyFundraiserListView.as_view(), name='my-fundraiser-list'),
    path('fundraisers/create/', views.FundraiserCreateView.as_view(), name='fundraiser-create'),
    path('fundraisers/<int:fundraiser_id>/', views.FundraiserDetailView.as_view(), name='fundraiser-detail'),
    path('fundraisers/<int:fundraiser_id>/update/', views.FundraiserUpdateView.as_view(), name='fundraiser-update'),
    path('fundraisers/<int:fundraiser_id>/delete/', views.FundraiserDeleteView.as_view(), name='fundraiser-delete'),

    # Comments
    path('fundraisers/<int:fundraiser_id>/comments/', views.CommentListView.as_view(), name='comment-list'),
    path('fundraisers/<int:fundraiser_id>/comments/create/', views.CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:comment_id>/', views.CommentDetailView.as_view(), name='comment-detail'),
    path('comments/<int:comment_id>/update/', views.CommentUpdateView.as_view(), name='comment-update'),
    path('comments/<int:comment_id>/delete/', views.CommentDeleteView.as_view(), name='comment-delete'),

    # Reactions
    path('comments/<int:comment_id>/react-positive/', views.CommentReactPositiveView.as_view(), name='comment-react-positive'),
    path('comments/<int:comment_id>/react-negative/', views.CommentReactNegativeView.as_view(), name='comment-react-negative'),
    
    path(
        "fundraisers/<int:fundraiser_id>/donations/pay/",
        views.DonationPaymentCreateView.as_view(),
        name="donation-payment-create",
    ),
    path(
        "fundraisers/<int:fundraiser_id>/donations/",
        views.DonationListByFundraiserView.as_view(),
        name="donation-list-by-fundraiser",
    ),
    path(
        "donations/<int:donation_id>/details/",
        views.DonationProfileView.as_view(),
        name="donation-profile",
    ),
]