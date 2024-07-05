import graphene
from .models import Todo
from graphene_django import DjangoObjectType

class TodoType(DjangoObjectType):
    class Meta:
        model=Todo
        fields=('id','title','date')
        
class Query(graphene.ObjectType):
    todos= graphene.List(TodoType,id=graphene.Int())
    def resolve_todos(self,info, id = None):
        if id:
            return Todo.objects.filter(id=id)
        return Todo.objects.all()