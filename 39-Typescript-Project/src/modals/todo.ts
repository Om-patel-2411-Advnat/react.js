class Todo {
    // in JS you don't have to add this but in here TS you have to add this
    id: string;
    text: string ;

    constructor(todoText : string){
        this.text = todoText;
        this.id = new Date().toISOString();
    }
}

export default Todo;