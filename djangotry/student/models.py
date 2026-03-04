from django.db import models

# Create your models here.
class StudentDetails(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    email = models.EmailField(unique=True)
    course = models.CharField(max_length=50)

    def __str__(self):
        return self.name
