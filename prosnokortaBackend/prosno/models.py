from django.db import models
from django.conf import settings

length_50 = 50
length_100 = 100
length_255 = 255
max_lenght_1000 = 100

class Class(models.Model):
    class_no = models.PositiveSmallIntegerField()
    title = models.CharField(max_length=length_50) 

    def __str__(self) -> str:
        return self.title
    

class Course(models.Model):
    title = models.CharField(max_length=length_100)
    code = models.CharField(max_length=length_50)
    class_id = models.ForeignKey(Class, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.title

class Chapter(models.Model):
    title = models.CharField(max_length=length_100)
    no = models.PositiveSmallIntegerField()
    course = models.ForeignKey(Course, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,primary_key=True )
    age = models.SmallIntegerField()
    phone = models.CharField(max_length=length_50)
    rating = models.PositiveIntegerField(default=0)

class Question(models.Model):
    description = models.TextField(null=True)
    first_option = models.CharField(max_length=255)
    second_option = models.CharField(max_length=255)
    third_option = models.CharField(max_length=255)
    fourth_option = models.CharField(max_length=255)
    answer = models.PositiveSmallIntegerField()
    explanation = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    class_no = models.ForeignKey(Class, on_delete=models.PROTECT, null=True)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, null=True)
    chapter = models.ForeignKey(Chapter, on_delete=models.PROTECT, null=True)
    points = models.PositiveBigIntegerField(default=0) # 0 to 2,147,483,647



    # admin string representation
    def __str__(self) -> str:
        return self.description # this will present the description of the question
        #in admin section

    # for sorting we declare a class called meta
    class Meta:
        ordering = ['description']


class Set(models.Model):
    title = models.CharField(max_length=length_255)
    total_questions = models.PositiveIntegerField()#check the maximum value
    total_marks = models.PositiveIntegerField()
    duration = models.PositiveIntegerField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    start_at = models.DateTimeField(auto_now_add=False)

class QuestionInExam(models.Model):
    question = models.ForeignKey(Question, on_delete=models.PROTECT)
    set = models.ForeignKey(Set, on_delete=models.PROTECT)
    class Meta:
        unique_together = ["question", "set"]

class Review(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)

class Exam(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student')
    set = models.ForeignKey(Set, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    corrected = models.PositiveSmallIntegerField(null=True)
    score = models.PositiveBigIntegerField(null=True)
    status = models.CharField(max_length=56, default='requested')

    class Meta:
        unique_together = ["student", "set"]
