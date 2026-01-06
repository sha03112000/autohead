from django.db import models
from product.models import  VendorProducts
from bill.models import Bill, BillItem

# Create your models here.
class ProductReturn(models.Model):
    vendor_product = models.ForeignKey(
        VendorProducts, on_delete=models.PROTECT, related_name="product_returns"
    )

    return_qty = models.PositiveIntegerField()
    

    resolution_type = models.SmallIntegerField(
        choices=[
            (1, "Refund"),
            (2, "Replacement"),
        ],
        null=True,
        blank=True,
    )
    status = models.SmallIntegerField(
        choices=[
            (1, "Pending"),
            (2, "Resolved"),
            (3, "Rejected"),
        ],
        default=1,
    )
    reason = models.TextField(null=True, blank=True)
    return_date = models.DateTimeField(auto_now_add=True)
    resolved_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "product_returns"

    def __str__(self):
        return self.vendor_product
    
    
class CustomerProductReturn(models.Model):
    vendor_product = models.ForeignKey(
        VendorProducts, on_delete=models.PROTECT, related_name="customer_product_returns"
    )

    bill = models.ForeignKey(
        Bill,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="customer_product_returns",
    )

    bill_item = models.ForeignKey(
        BillItem,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="customer_product_returns",
    )
    
    return_qty = models.PositiveIntegerField()
    
    customer_name = models.CharField(max_length=255, null=True, blank=True)
    
    resolution_type = models.SmallIntegerField(
        choices=[
            (1, "Refund"),
            (2, "Replacement"),
        ],
        null=True,
        blank=True,
    )
    
    status = models.SmallIntegerField(
        choices=[
            (1, "Pending"),
            (2, "Resolved"),
            (3, "Rejected"),
        ],
        default=1,
    )
    
    refund_amount = models.DecimalField(null=True, blank=True, max_digits=12, decimal_places=2)  
    reason = models.TextField(null=True, blank=True)
    return_date = models.DateTimeField(auto_now_add=True)
    resolved_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "customer_product_returns"

    def __str__(self):
        return self.vendor_product
    
    

