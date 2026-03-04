Implementation of API Endpoints using Django for a Student CRUD

Here we try to implement a basic user management system with the help of Api Endpoints

GET - To retrieve the data
POST - Create new resources
PUT - Replace a full resource
PATCH - Apply partial modifications
DELETE - Remove a resource

Installation:

- Ensure you have a code editor
- Install python latest stable version
- Install postman to test the api endpoints


Create a virtual environment: 
- python3 -m venv venv
- Activate the venv: Source venv/bin/activate

Install dependancies:
- pip install django
- pip install djangorestframework

Create new project:
- django-admin startproject djangotry

Now check if server is up and running:
- python manage.py runserver

Create a new app:
- python manage.py startapp student

Register the app in settings.py in installed_apps

Add urls of the specific app student in urls.py:
- path ("student/", include("student.urls"))

Create the table schema in models.py
- python manage.py makemigrations
- python manage.py migrate

Then exceute and test endpoints using postman:
- python manage.py runserver

GET http://127.0.0.1:8000/student/details/

POST http://127.0.0.1:8000/student/details/

{
"name":"sample name",
"age": 20,
"email": "name@gmail.com",
"course": "cse"
}

DELETE http://127.0.0.1:8000/student/details/<int:id>

PUT http://127.0.0.1:8000/student/details/<int:id>

PATCH http://127.0.0.1:8000/student/details/<int:id>

