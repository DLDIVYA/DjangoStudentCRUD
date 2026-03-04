from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StudentDetails
from .serializers import StudentSerializer
from rest_framework import status


# Create your views here.
def say_hello(request):
    return HttpResponse("Hello student! Welcome")

@api_view(['GET', 'POST'])
def student_creation(request):
    if request.method == 'GET':
        students = StudentDetails.objects.all()
        search = request.GET.get('search')
        if search:
            students = students.filter(name__icontains=search)

        sort = request.GET.get('sort')
        if sort:
            students = students.order_by(sort)
        serializer = StudentSerializer(students, many = True)
        return Response(serializer.data)

        
    
    elif request.method == 'POST':
        serializer = StudentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE','PATCH'])
def student_detail(request, id):

    try:
        student = StudentDetails.objects.get(id=id)
    except StudentDetails.DoesNotExist:
        return Response({"error": "Student not found - Details missing"}, status=404)
    
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = StudentSerializer(student, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == "DELETE":
        student.delete()
        return Response({"message": "Student deleted Successfuly"}, status=204)
    elif request.method == "PATCH":
        serializer = StudentSerializer(student, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)





