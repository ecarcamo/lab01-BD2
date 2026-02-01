// EJERCICIO 01
// crear la colection de usuarios, ya que la de recetas se creó desde mongo atlas

db.createCollection("usuarios")

// EJERCICIO 02
//2.1 Cree una consulta para obtener todas las recetas

db.recetas.find({})
db.recetas.find({}).count() //contar cuantas son
db.recetas.countDocuments({}) //funciona igual que el count
db.recetas.findOne() // para ver de una mejor forma como es la estructura

//2.2 Cree una consulta para obtener todos los usuarios

db.usuarios.find({})
db.usuarios.find({}).count() //contar cuantas son
db.usuarios.countDocuments({}) //funciona igual que el count


//2.3 Con base a la estructura observada en la colección de recetas, cree un nuevo documento que contenga los siguientes campos:
//2.3.1 Título
//2.3.2 Descripción
//2.3.3 Tiempo de cocción

//agregar la receta en base a las instrucciones
db.recetas.insertOne({
    "title": "Receta agregada Empanadas",
    "desc": "Esta es una nueva receta agregada para el lab1 que es para empanadas",
    "cook_time": 30
})

//2.4 Cree una consulta que busque la receta que acaba de crear.
db.recetas.find({
    $or:[
        { _id: ObjectId("697ec7d09c4667184f0d9cb9")}, 
        { title: "Receta agregada Empanadas"}
    ]
})

//2.5 Cree una consulta en la que liste las recetas, mostrando únicamente el título y su tiempo de cocción.
db.recetas.find({})
    .projection({title:1 , cook_time:1, _id:0})

//2.6 Cree una consulta en la que se listen las recetas ordenadas por mayor tiempo de cocción.
db.recetas.find({})
    .sort({cook_time:-1})
    .projection({title:1 , cook_time:1}) // se agrega para poder ver mejor el dato del cook_time, pero es opcional

//2.7 Investigue la instrucción update() para poder agregar un rating más a una receta y actualizar el rating promedio.
//esto sirve para saber como esta el rating y el average antes y después de actualizarlo
db.recetas.find({title: "Chicken Soft Tacos"})
    .projection({
        title:1 , rating:1 , rating_avg:1
    })
    
db.recetas.updateOne(
    {
        title: "Chicken Soft Tacos"
    },
    {
        $push:{
            rating: 10
        },
        $set: {
            rating_avg: 4.5
        }
    }
    
)
    
//2.8 Cree una consulta en la que elimine un ingrediente de la lista de ingredientes de una receta en específico.
db.recetas.find({title: "Chicken Soft Tacos"})  // revisar ingrendientes de esta receta específica
    .projection({
        title:1 , ingredients:1 
    })

db.recetas.updateOne(
    {
        title: "Chicken Soft Tacos"
    },
    {
        $pull: {
            ingredients: {name: "chicken breast"}
        }
    }
)

//2.9 Investigue la opción skip de la instrucción find() y cree una consulta en la que obtenga la tercera receta con mejor rating promedio.
db.recetas.find({})
    .projection({title:1, rating_avg:1})
    .sort({rating_avg:-1})
    .skip(2)
    .limit(1)

//2.10 Cree una consulta que busque las recetas que tienen comentarios.
db.recetas.find({
    comments: {$exists: true}
}).projection({title:1 , comments:1})

//2.11 Cree una consulta en la que liste las recetas que son de postres.
db.recetas.find({
    type: "Dessert"
}).projection({title:1, type:1})


//2.12 Cree una consulta en la que elimine las recetas que sean difíciles de cocinar.
db.recetas.find({})
    .projection({title:1, cook_time:1, prep_time:1}) // esta consulta solo es para explorar los campos para crear la consulta del enunciado

db.recetas.countDocuments({}) //en este punto yo obtengo 9 recetas, antes de ejecutar el delete

db.recetas.deleteMany({
    $or: [
        {
            cook_time: {$gt: 20}
        },
        {
            prep_time: {$gt: 10}
        }
    ]
})

db.recetas.find({})
    .projection({title:1, cook_time:1, prep_time:1}) //en este punto ya obtengo solamente 3 despues de aplicar mi regla de negocio 
    

//2.13 Con base a la estructura observada en la colección de usuarios, cree 3 nuevos documentos de usuarios en una sola instrucción, que contenga los siguientes campos:
//2.13.1 Nombre
//2.13.2 Apellido
//2.13.3 Correo electrónico
//2.13.4 Contraseña

db.usuarios.insertMany(
    [
        {
            firstName: "Esteban",
            lastname: "Carcamo",
            email: "estebancarcamou@gmail.com",
            password: "contraseñaSegura1234"
        },
        {
            firstName: "Nico",
            lastname: "Concua",
            email: "nico@gmail.com",
            password: "si1234**"
        },
        {
            firstName: "Ernesto",
            lastname: "Ascencio",
            email: "ernesto@gmail.com",
            password: "no1234]*"
        }
    ]
)


//2.14 Cree las consultas para agregarle la receta favorita a cada uno de los usuarios creados anteriormente.

db.usuarios.updateOne(
  { firstName: "Esteban" },
  { $set: { favorite_recipe: ObjectId("5e6fd805fa98021236426a24") } }
)

db.usuarios.updateOne(
  { firstName: "Nico" },
  { $set: { favorite_recipe: ObjectId("5e877cba20a4f574c0aa56da") } }
)

db.usuarios.updateOne(
  { firstName: "Ernesto" },
  { $set: { favorite_recipe: ObjectId("5e5e9c470d33e9e8e3891b35") } }
)


//2.15 Cree una consulta para consultar los distintos nombres de usuarios.


//2.16 Investigue el uso de expresiones regulares en la instrucción find() y cree una consulta para buscar todos los usuarios que tengan correo electrónico con dominio de Gmail.


//2.17 Agregar un campo de actividad a los usuarios, para indicar si están activos o inactivos con un valor booleano.


//2.18 Cree una consulta en la que inactive a 2 usuarios.


//2.19 Cree una consulta en la que cambie la unidad de medida de todas las recetas que tienen lb a kg.


//2.20 Cree una consulta en la que elimine a los usuarios inactivos
