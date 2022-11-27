from rest_framework.views import APIView
import logging
from django.shortcuts import render
from django.http import HttpResponse
import requests

logger = logging.getLogger(__name__) # playground.views


class HelloView(APIView):
    def get(self, request):
        try:
            logger.info('Calling httpbin')
            response = requests.get('https://httpbin.org/delay/1')
            logger.info('Received the response')
        except requests.ConnectionError:
            logger.critical('gttpbin is offline')
        
        # return render(request)
        return HttpResponse('Question is being shown')
        
        