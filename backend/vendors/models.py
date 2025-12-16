from django.db import models

# Create your models here.
class Vendors(models.Model):
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    address = models.CharField(max_length=255)
    gst_number = models.CharField(max_length=15, blank=True, null=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    pincode = models.CharField(max_length=6, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
class Bank(models.Model):
    vendor = models.OneToOneField(Vendors, on_delete=models.CASCADE, related_name='bank')
    bank_name = models.CharField(max_length=100, null=True, blank=True)
    branch_name = models.CharField(max_length=100, null=True, blank=True)
    account_number = models.CharField(max_length=20, null=True, blank=True)
    ifsc_code = models.CharField(max_length=11, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'bank'
    
    def __str__(self):
        return self.bank_name

