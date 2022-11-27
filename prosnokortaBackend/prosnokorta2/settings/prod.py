from prosnokorta2.settings.dev import SECRET_KEY
from .common import *
import os

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['prosnokorta.herokuapp.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',


        'NAME': os.environ['DATABASE_NAME'],
        'HOST': os.environ['DATABASE_HOST'],
        'USER': os.environ['DATABASE_USER'],
        'PASSWORD': os.environ['DATABASE_PASSWORD'],
        'PORT': os.environ['DATABASE_PORT'],
        
        # 'OPTIONS': {
        #     'init_command': 'SET default_storage_engine=INNODB',
        #     # 'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        # }
    }
}
