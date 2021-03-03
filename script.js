'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoRemove = document.querySelector('.todo-remove'),
    startButton = document.getElementById('add');


let i = localStorage.length;

let todoData = [
];

for(let i=0; i<localStorage.length;i++){
    var boolean;
    if (localStorage.getItem(localStorage.key(i)) === 'false'){
        boolean = false;
    }   else{
        boolean = true;
    }
    let task = {value: localStorage.key(i), completed: boolean};
    todoData.push(task);
}
const render = function(){
    localStorage.clear();
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + ' </span>' +
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' +
            '</div>';
        if(item.completed){
            todoCompleted.append(li);
        }   else {
            todoList.append(li);
        }
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            li.remove();
            localStorage.removeItem(li.textContent.trim());
        });
        localStorage.setItem(li.textContent.trim(), item.completed);
        console.log(typeof(li));
        console.log(JSON.stringify(li));
        let data = {
            key: li.textContent.trim(),
            value: item.completed
        };
        console.log(typeof(JSON.stringify(data)));
        console.log(JSON.stringify(data));
    });
};
headerInput.addEventListener('input', function(){
    if (headerInput.value.trim() === ''){
        startButton.disabled = true;
    }   else{
        startButton.disabled = false;
    }
});

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    todoData.push(newTodo);
    headerInput.value = ''; 
    localStorage.setItem('data', JSON.stringify(todoData));
    render();
});
render();