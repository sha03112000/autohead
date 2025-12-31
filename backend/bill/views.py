from django.shortcuts import render
from rest_framework import generics
from .models import Bill
from .serializers import BillFormSerializer
from rest_framework.permissions import IsAuthenticated
from utils.response import custom_response

# Create your views here.


class BillListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Bill.objects.all().prefetch_related(
        "items__vendor_product__product",
        "items__vendor_product__vendor",
        ).order_by("-created_at")
    
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return BillFormSerializer
        return BillFormSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return custom_response(
            method='POST',
            data_name='Bill',
            data=serializer.data,
        )
    
    