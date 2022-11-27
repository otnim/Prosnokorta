from cgitb import lookup
from email.mime import base
from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework_nested import routers


# this is parent router
router = routers.DefaultRouter()

router.register('questions', views.QuestionViewSet, basename='questions')
router.register('sets', views.SetViewSet, basename='sets')
router.register('questioninexam', views.QuestionInExamViewSet, basename='questioninexam')
router.register('questioninexamreadonly', views.QuestionInExamViewSetReadOnly, basename='questioninexamreadonly')
router.register('class', views.ClassViewSet, basename='class')
router.register('course', views.CourseViewSet, basename='course')
router.register('chapters', views.ChapterViewSet, basename='chapters')
router.register('exams', views.ExamViewSet, basename='exams')

# child router
question_router = routers.NestedDefaultRouter(router, 'questions', lookup='question')
question_router.register('reviews', views.ReviewViewSet, basename='product-reviews')

urlpatterns = router.urls + question_router.urls

# urlpatterns = [
#     path('', include(router.urls)),
# ]