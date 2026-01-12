from django.shortcuts import render
from rest_framework import generics
from .models import Bill
from .serializers import BillFormSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from utils.response import custom_response


# Create your views here.



class BillListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = (
        Bill.objects.all()
        .order_by("-created_at")[:5]
    )

    def get_serializer_class(self):
        if self.request.method == "POST":
            return BillFormSerializer
        return BillFormSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)
        return custom_response(data=serializer.data, method="GET", data_name="Bills")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return custom_response(
            method="POST",
            data_name="Bill",
            data=serializer.data,
        )
