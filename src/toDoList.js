

export class ToDoList {
    constructor() {
        this.tasks = []
    }

    getTasks() {
        return this.tasks;
      }
  
        addTask(newTask) {
        if(this.tasks.find(task => task.title != newTask.getName())) return;
        this.tasks.push(newTask)
      }
      
     
}