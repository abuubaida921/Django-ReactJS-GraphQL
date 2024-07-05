import graphene

class Query(graphene.ObjectType):
    name = graphene.String(default_value="Abu Ubaida")
    title = graphene.String(default_value="Software Engineer")
    
schema = graphene.Schema(query=Query)