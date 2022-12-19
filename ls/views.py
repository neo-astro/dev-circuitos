from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
  return render(request,'index.html')





# def gif(request,param):
#   return HttpResponse(f'hola {param}')

def gif(request,param):
  print(f'{settings.STATIC_ROOT}' + f'/img/{param}.gif')
  with open( f'{settings.STATIC_ROOT}' + f'/img/{param}.gif', 'rb') as gif_file:
    gif_data = gif_file.read()
  return HttpResponse(gif_data, content_type="image/gif")

