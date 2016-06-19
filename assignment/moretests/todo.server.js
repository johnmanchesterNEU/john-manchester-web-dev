module.exports = function(app){
    var TodoSchema = mongoos.schema({
        priority: Number,
        title: String,
        todo: String
    });
    var Todo = mongoose.model("Todo", TodoSchema);

    app.get("/api/todos", findAllTodos);


    function findAllTodos(req, res) {
        Todo
            .find()
            .then(function (todos){res.json(todos);}
            )

    }

 /*
    Todo.create({"priority": 1, "title": "CS5620", "todo": "Hello"});
    Todo.create( {"priority": 2, "title": "CS5320", "todo": "Yo"});
    Todo.create( {"priority": 3, "title": "CS5320", "todo": "Yo"});
    Todo.create( {"priority": 4, "title": "CS5920", "todo": "Hooooo"});*/
}