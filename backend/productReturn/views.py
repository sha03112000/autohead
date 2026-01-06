from rest_framework import generics
from .serializers import VendorProductReturnSerializer, CustomerProductReturnSerializer
from rest_framework.permissions import IsAuthenticated
from utils.response import custom_response




class CreateProductReturn(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    def get_serializer(self, *args, **kwargs):
        return_type = self.request.data.get("return_type")
        
        if return_type == "1":
            return VendorProductReturnSerializer
        return CustomerProductReturnSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data_name = (
            "VendorProductReturn"
            if request.data.get("return_type") == "1"
            else "CustomerProductReturn"
        )
        return custom_response(data=serializer.data, method="POST", data_name=data_name)
