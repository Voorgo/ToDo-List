import { format, parseISO, isToday, isThisWeek } from "date-fns";

export class UI {
    static tasks = [];

   static createTask(task) {
        let date = new Date(task.dueDate)
        const content = document.querySelector('.content');
        const card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
        <div class="first">
          <div class="title">${task.title}</div>
        </div>
        <div class="second">
          <div class="details">Details</div>
          <div>${format(date, 'do MMM')}</div>
          <img src="img/edit.svg" alt="edit" class="edit">
          <img src="img/trash.svg" alt="delete" class="del">
          <div class="${task.priority}"></div>
        `
        content.append(card);
    }

   static clearInput(title, description, dueDate, priority) {
        title.value = '';
        description.value = '';
        dueDate.value = '';
        if(priority !== 'notSpecified') priority.checked = false;
    }

     static loadTasks(task) {
      document.querySelector('.content').innerHTML = ''
      task.forEach(task => this.createTask(task))
    }
  
    static addTask(newTask) {
        if(this.tasks.find(task => task.title === newTask.getName())) return;
        this.tasks.push(newTask)
      }

    static deleteTask(index, menu) {
      if(menu === 'menu') {
        UI.tasks.splice(index, 1);
        UI.loadTasks(UI.tasks);
      }

      else if(menu === 'imp') {
        for(let i = 0; i < UI.tasks.length; i++) {
          if(UI.tasks[i] === UI.important()[index]) {
            UI.tasks.splice(i, 1);
            break;
          }
        }
        UI.loadTasks(UI.important());
      }

      else if(menu === 'week') {
        for(let i = 0; i < UI.tasks.length; i++) {
          if(UI.tasks[i] === UI.week()[index]) {
            UI.tasks.splice(i, 1);
            break;
          }
        }
        UI.loadTasks(UI.week());
      }

      else if(menu === 'today') {
        for(let i = 0; i < UI.tasks.length; i++) {
          if(UI.tasks[i] === UI.today()[index]) {
            UI.tasks.splice(i, 1);
            break;
          }
        }
        UI.loadTasks(UI.today());
      }

      else if(!UI.tasks) menu = 'home';
    }

    static editTask(index, title, description, date, menu) {
      if(menu === 'today') {
        if(title) UI.today()[index].title = title;

        if(description) UI.today()[index].description = description;
  
        if(date) UI.today()[index].dueDate = parseISO(date);

        UI.loadTasks(UI.today())
      }

      else if(menu === 'imp') {
        if(title) UI.important()[index].title = title;

        if(description) UI.important()[index].description = description;
  
        if(date) UI.important()[index].dueDate = parseISO(date);

        UI.loadTasks(UI.important())
      }

      else if(menu === 'week') {
        if(title) UI.week()[index].title = title;

        if(description) UI.week()[index].description = description;
  
        if(date) UI.week()[index].dueDate = parseISO(date);

        UI.loadTasks(UI.week())
      }

      else {
      if(title) UI.tasks[index].title = title;

      if(description) UI.tasks[index].description = description;

      if(date) UI.tasks[index].dueDate = parseISO(date);

      UI.loadTasks(UI.tasks);
      }
    }

    static important() {
      let impTask = UI.tasks.filter(task => task.priority === 'high');
      return impTask
    }

    static today() {
      let todayTask =  UI.tasks.filter(task => isToday(task.dueDate));
      return todayTask;
    }

    static week() {
      let weekTask = UI.tasks.filter(task => isThisWeek(task.dueDate));
      return weekTask;
    }

    static getFromStorage(todos) {
      if(todos === null) return;
      else {
        todos.forEach(todo => UI.tasks.push(todo));
      }
    }
}

