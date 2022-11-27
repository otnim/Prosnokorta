from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer


class UserCreateSerializer(BaseUserCreateSerializer):
    user_type = serializers.CharField(max_length=50, required=True)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email',
                  'user_type', 'first_name', 'last_name']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'email',
                  'user_type', 'first_name', 'last_name']
