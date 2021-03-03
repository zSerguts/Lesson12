'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoRemove = document.querySelector('.todo-remove'),
    startButton = document.getElementById('add');

let todoData = [];

if (JSON.parse(localStorage.getItem('data') !== null)){
    todoData = JSON.parse(localStorage.getItem('data'));
}

const render = function(){
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
            console.log(item.completed);
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
            render();
        });
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
    console.log(newTodo);
    todoData.push(newTodo);
    if (headerInput.value !== ''){
        localStorage.setItem('data', JSON.stringify(todoData));
    }
    headerInput.value = ''; 
    render();
});
render();