from django.contrib import admin
from .models import School

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'city', 'state', 'contact', 'email_id')
    search_fields = ('name', 'city', 'state', 'email_id')
    list_filter = ('state', 'city')
