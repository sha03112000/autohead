from . import views
from django.urls import path

urlpatterns = [
    path("", views.CreateProductReturn.as_view(), name="product-return-create")
]