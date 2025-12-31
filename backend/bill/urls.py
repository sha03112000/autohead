from django.urls import path
from . import views

urlpatterns = [
    path('', views.BillListCreateView.as_view(), name='bill-list-create'),
    # path('<int:pk>/', views.BillRetrieveUpdateDestroyView.as_view(), name='bill-detail'),
]