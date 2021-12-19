import {Task} from './task';
import {UI} from './ui'

let index;
let menu = 'menu';
let jsCurrent = document.querySelector('.current');
let navBtns = document.querySelectorAll('.js-nav-btns');
let todos = JSON.parse(localStorage.getItem('todos'));

//Open-close the menu
document.querySelector('.ham-menu').addEventListener('click', () => {
    document.querySelector('.nav-bar').classList.toggle('closed')
});

//Open form section
document.querySelector('.addToDo').addEventListener('click', () => {
    document.querySelector('.form-section').classList.toggle('active')
});


//Create tasks when submit the form
document.querySelector('#task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('.task-title');
    const description = document.querySelector('.task-description');
    const dueDate = document.querySelector('.task-date');
    let priority = document.querySelector('input[name="prior"]:checked');
    if(priority) {
        const task = new Task(title.value, description.value, dueDate.value, priority.value);
        UI.addTask(task);
        UI.clearInput(title, description, dueDate, priority);
    }

    else {
        const task = new Task(title.value, description.value, dueDate.value, priority = 'notSpecified')
        UI.addTask(task);
        UI.clearInput(title, description, dueDate, priority);
    }

    document.querySelector('.form-section').classList.toggle('active');
    
    UI.loadTasks(UI.tasks);

    if(menu === 'home') {
        UI.loadTasks(UI.tasks);
    }

    else if(menu === 'imp') {
        UI.loadTasks(UI.important());  
    }

    else if(menu === 'week') {
        UI.loadTasks(UI.week());  
    }

    else if(menu === 'today') {
        UI.loadTasks(UI.today());
    }
    localStorage.setItem('todos', JSON.stringify(UI.tasks))
});

//Clear all form inputs
document.querySelector('.close-form').addEventListener('click', () => {
    document.querySelector('.form-section').classList.toggle('active');
    document.querySelector('.task-title').value = '';
    document.querySelector('.task-description').value = '';
    document.querySelector('.task-date').value = '';
    let priority = document.querySelector('input[name="prior"]:checked');
        if(priority) priority.checked = false;
});

//Edit, delete or see task details
document.addEventListener('click', (e) => {
    
    //Delete task
    if(e.target.classList.contains('del')) {
        let buttons = [...document.querySelectorAll('.del')]
        let card = e.target.parentElement.parentElement
        card.classList.add('del-animation');
        let index = buttons.indexOf(e.target)
        setTimeout(() => {
            UI.deleteTask(index, menu);
            localStorage.setItem('todos', JSON.stringify(UI.tasks))
        }, 300)
    }

    //Open the details section
    if(e.target.classList.contains('details')) {
        let btns = [...document.querySelectorAll('.details')]
        let taskInfo = document.querySelector('.info');
        taskInfo.innerHTML = '';
        taskInfo.innerHTML = ` <div class="taskOption taskDetails">
        <span class="close-description"></span>
        <p class="task-description"><div >Description:</div>${UI.tasks[btns.indexOf(e.target)].description}</p>
      </div>`
      taskInfo.classList.toggle('task-active');
      document.querySelector('.taskOption').classList.toggle('description-active')
    }

    if(e.target.classList.contains('close-description') || e.target.classList.contains('info')) {
        document.querySelector('.info').classList.toggle('task-active')
    }

    //Edit tasks
    if(e.target.classList.contains('edit') || e.target.classList.contains('edit-task')) {
        let btns = [...document.querySelectorAll('.edit')]
        document.querySelector('.edit-task').classList.toggle('task-active');
        index = btns.indexOf(e.target)
       
    }

    if(e.target.classList.contains('confirm')) {
        document.querySelector('.edit-task').classList.toggle('task-active');
       let newTitle = document.querySelector('.newTitle');
       let newDescription = document.querySelector('.newDescription');
       let newDate = document.querySelector('.newDate');
       
       UI.editTask(index, newTitle.value, newDescription.value, newDate.value, menu);
       localStorage.setItem('todos', JSON.stringify(UI.tasks)) 
      newTitle.value = ''
      newDescription.value = '';
      newDate.value = ''
    }
   
});

document.querySelector('.imp').addEventListener('click', () => {
    UI.loadTasks(UI.important());
    menu = 'imp';
    jsCurrent.innerText = '{Important}';
});

document.querySelector('.home').addEventListener('click', () => {
    UI.loadTasks(UI.tasks);
    menu = 'menu';
    jsCurrent.innerText = '{Menu}';
});

document.querySelector('.today').addEventListener('click', () => {
    UI.loadTasks(UI.today());
    menu = 'today';
    jsCurrent.innerText = '{Today}';
});

document.querySelector('.week').addEventListener('click', () => {
    UI.loadTasks(UI.week());
    menu = 'week'
    jsCurrent.innerText = '{Week}';
});

for(let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', () => {
        for(let j of navBtns) {
            if(j.classList.contains('toggled')) {
                j.classList.toggle('toggled')
            }
        }
        navBtns[i].classList.toggle('toggled')
    }
    )};


window.addEventListener('load', () => {
    UI.getFromStorage(todos);
    UI.loadTasks(UI.tasks);
})
