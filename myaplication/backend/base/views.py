from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_frameworks.decorators import api_view
from rest_frameworks.response import Response
# Create your views here.



@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products/',
        '/api/products/create',
        '/api/products/upload',
        '/api/products/<id>/reviews/',
        '/api/products/top',
        '/api/products/<id>',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/'\

 ]
    return JsonResponse(routes,safe=False)

@api_view(['GET'])
def getProducts(request):
    return JsonResponse(products,safe=False)

@api_view(['GET'])
def getProduct(request,pk):
    product=None
    for i in products:
        if i[_id]==pk:
            product=i
            break

    return Response(product)
