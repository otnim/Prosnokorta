from django.db import models

class QuestionMaker(models.Model):
    name = models.CharField(max_length=255)
    age = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return self.name
    class Meta:
        ordering = ['name']

class Question(models.Model):
    description = models.TextField(null=True)
    first_option = models.CharField(max_length=255)
    second_option = models.CharField(max_length=255)
    third_option = models.CharField(max_length=255)
    fourth_option = models.CharField(max_length=255)
    answer = models.PositiveSmallIntegerField()
    explanation = models.TextField()

    #admin string representation
    def __str__(self) -> str:
        return self.description # this will present the description of the question
        #in admin section

    # for sorting we declare a class called meta
    class Meta:
        ordering = ['description']