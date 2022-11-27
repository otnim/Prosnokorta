
from rest_framework import serializers
from prosno.models import Chapter, Class, Course, Exam, Question, QuestionInExam, Review, Set, Profile


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = []        
        # extra_kwargs = {
        #     'explanation': {'write_only': True},
        #     'course': {'write_only': True},
        #     'question_maker': {'write_only': True},
        #     'answer': {'write_only': True},
        #     # 'points': {'read_only': True}
        # }

class SimpleQuestionSeriralizer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'description', 'first_option', 'second_option', 'third_option', 'fourth_option', 'answer']

class QuestionSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = ['points']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = []

class ReveiwSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer()

    class Meta:
        model = Review
        fields = ['id', 'description', 'date', 'profile']

    
    def create(self, validated_data):
        question_id = self.context['question_id']
        return Review.objects.create(question_id=question_id, **validated_data)

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        exclude = []

class QuestionInExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionInExam
        # fields = ['set', 'question']
        exclude = []

class QuestionInExamSerializerReadOnly(serializers.ModelSerializer):
    question = SimpleQuestionSeriralizer()
    class Meta:
        model = QuestionInExam
        # fields = ['question']
        fields = ['id', 'set', 'question']
        # exclude = []
        
class ClassSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Class
        exclude = []

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = []

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        exclude = []

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        exclude = []