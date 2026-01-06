from rest_framework import serializers
from .models import ProductReturn, CustomerProductReturn
from django.db import transaction
from bill.models import Bill, BillItem
from django.shortcuts import get_object_or_404



# Reusable Mixin
class StockValidationMixin:
    def validate_stock(self, vendor_product, return_qty):
        if vendor_product.stock is None or return_qty > vendor_product.stock:
            raise serializers.ValidationError(
                {"return_qty": "Return quantity cannot be greater than stock count."}
            )


class VendorProductReturnSerializer(StockValidationMixin, serializers.ModelSerializer):

    return_type = serializers.ChoiceField(choices=[("1", "2")], write_only=True)

    class Meta:
        model = ProductReturn
        fields = ["id", "vendor_product", "return_qty", "reason", "return_type"]
        read_only_fields = ["id"]

    def validate(self, attrs):
        self.validate_stock(attrs["vendor_product"], attrs["return_qty"])
        return attrs

    def create(self, validated_data):
        with transaction.atomic():
            return_qty = validated_data["return_qty"]
            vendor_product = validated_data["vendor_product"]
            vendor_product.stock -= return_qty
            vendor_product.save()
            product_return = ProductReturn.objects.create(**validated_data)
            return product_return


class CustomerProductReturnSerializer(StockValidationMixin, serializers.ModelSerializer):
    return_type = serializers.ChoiceField(
        choices=[
            ("1", "2"),
        ],
        write_only=True,
    )

    class Meta:
        model = CustomerProductReturn
        fields = [
            "id",
            "customer_name",
            "return_qty",
            "reason",
            "resolution_type",
            "vendor_product",
            "return_type",
        ]

    def validate(self, attrs):
        invoice_num = attrs["invoice_num"]

        if not Bill.objects.filter(invoice_no=invoice_num).exists():
            raise serializers.ValidationError(
                {"invoice_num": "Invalid invoice number."}
            )
            
        self.validate_stock(attrs["vendor_product"], attrs["return_qty"])

        return attrs

    def create(self, validated_data):
        with transaction.atomic():
            vendor_product = validated_data["vendor_product"]

            ProductReturn.objects.create(
                vendor_product=vendor_product,
                return_qty=validated_data["return_qty"],
                reason=validated_data["reason"],
            )

            bill = get_object_or_404(
                Bill, invoice_no=validated_data["invoice_num"]
            )
            bill_item = get_object_or_404(
                BillItem, bill=bill, vendor_product=vendor_product
            )

            return CustomerProductReturn.objects.create(
                **validated_data,
                bill=bill,
                bill_item=bill_item,
            )

