    1) configure the main urls.py file
    2) configure sub app urls.py
    3) define response function in sub app views.py

$ pipenv install django-debug-toolbar

https://django-debug-toolbar.readthedocs.io/en/latest/installation.html
এখন docs দেখে django-debug-toolbar configure করে নিতে হবে
*******) debug-toolbar istall configure করলেই
		1) Mysql database install and configure করতে হয় । না হলে error দেখায়
            কিন্তু যদি আমরা project এ mysql db use করতে চাই তবে migrate করার আগে mysql db
            install and set করে নিতে হবে
            $ pipenv install mysqlclient  # docs-> https://pypi.org/project/mysqlclient/
            mysqlclient install হলে root project এ settings.py এ mysql configure করতে হবে।
		2) কিন্তু debug-toolbar show করতে হলে html templates add করতে হয় (2.10- Using Templates)
		




এখন database model create করতে হবে prosno app এর model.py file এ
তারপর migrations করতে হবে।


$ python manage.py makemigrations

যদি ভুল হওয়ার কারণে আগের migrations এ ফিরে যেতে হয় তবে

$ python manage.py migrate app_name migration_no
example $ python manage.py migrate prosno 0001

তবে তার জন্য নতুন change গুলো পরিবর্তন করতে হয়।

-------------------------------------------------------------
এর জন্য সব থেকে ভালো উপায় হোল git revert command use করা
git revert command

to check all commit and HEAD
$ git log --oneline

to locate the head one step reverse in git
$ git reset --hard HEAD~1

------------------------------------------

migrations গুলো data base এ apply করার জন্য
$ python manage.py migrate


----------------31 july 2022
Django Admin

root/admin

--- for creating admin
তবে এর আগে database এর সাথে connected থাকতে হবে
$ python manage.py createsuperuser


password ভুলে গেলে change করার নিয়ম

$ python manage.py changepassword admin


আমরা এখন django rest frame work নিয়ে কাজ করব
$ pipenv install djangorestframework

install করার পর installed_apps এ এটিকে add করতে হবে
https://www.django-rest-framework.org/tutorial/quickstart/

INSTALLED_APPS = [
     'rest_framework',
]


এরপর see readmeAPI.txt