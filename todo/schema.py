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
    
class CreateTodo(graphene.Mutation):
    todo = graphene.Field(TodoType)
    class Arguments:
        title = graphene.String(required=True)
    def mutate(self,info,title):
        todo = Todo(title=title)
        todo.save()
        return CreateTodo(todo=todo)

class Mutation(graphene.ObjectType):
    create_todo=CreateTodo.Field()