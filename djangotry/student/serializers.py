from rest_framework import serializers
from .models import StudentDetails


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = "__all__"

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Name must be at least 3 characters long."
            )
        return value

    def validate_age(self, value):
        if value < 17:
            raise serializers.ValidationError("Age must be above 17 for a student here")
        return value
    
    def validate_mail(self, value):
        if not value.endswith("@gmail.com"):
            raise serializers.ValidationError("Only gmail allowed")
        return value