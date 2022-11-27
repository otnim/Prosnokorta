
from . models import Chapter, Course, Exam, Question, QuestionInExam, Review, Set, Class
from rest_framework.response import Response
from .serializers import ChapterSerializer, ClassSerialzer, CourseSerializer, ExamSerializer, QuestionInExamSerializer, QuestionInExamSerializerReadOnly, QuestionSerializer, ReveiwSerializer, SetSerializer
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    # for filtering
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['class_no', 'course', 'chapter', 'author']

    def get_serializer_context(self):
        return {'request': self.request}

    def destroy(self, request, *args, **kwargs):
        question = self.get_object()
        if question.points > 0:
            return Response({"error": "Question alredey used should not be deleted"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        return super().destroy(request, *args, **kwargs)


class SetViewSet(ModelViewSet):
    queryset = Set.objects.all()
    serializer_class = SetSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author']

    def get_serializer_context(self):
        return {'request': self.request}


class QuestionInExamViewSet(ModelViewSet):
    queryset = QuestionInExam.objects.all()
    serializer_class = QuestionInExamSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['set']

    def get_serializer_context(self):
        return {'request': self.request}


class QuestionInExamViewSetReadOnly(ReadOnlyModelViewSet):
    queryset = QuestionInExam.objects.select_related('question').all()
    serializer_class = QuestionInExamSerializerReadOnly

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['set']

    def get_serializer_context(self):
        return {'request': self.request}


class ReviewViewSet(ModelViewSet):

    # queryset = Review.objects.all()
    def get_queryset(self):
        return Review.objects.filter(question_id=self.kwargs['question_pk'])

    serializer_class = ReveiwSerializer

    # in this view class we have access to urls params
    # so we can read the question id from the urls
    # and using context object we can pass it to serializer
    # we use context object to provide additional data to serializer

    def get_serializer_context(self):
        return {'question_id': self.kwargs['question_pk']}


class ClassViewSet(ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerialzer
    
    def get_serializer_context(self):
        return {'request': self.request}

class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['class_id']

    def get_serializer_context(self):
        return {'request': self.request}


class ChapterViewSet(ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['course']

    def get_serializer_context(self):
        return {'request': self.request}

class ExamViewSet(ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student', 'author']

    def get_serializer_context(self):
        return {'request': self.request}