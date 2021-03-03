'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoRemove = document.querySelector('.todo-remove'),
    startButton = document.getElementById('add');



let todoData = [
];

for(let i=0; i<localStorage.length;i++){
    console.log(localStorage.getItem(localStorage.key(i)));
    let task = {value: localStorage.key(i), completed:!localStorage.getItem(localStorage.key(i))};
    todoData.push(task);
}
const render = function(){
    localStorage.clear();
    todoList.textContent = '';
    todoCompleted.textContent = '';
    console.log(todoData);
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
            localStorage.setItem(li.textContent.trim(), item.completed);
        }   else {
            todoList.append(li);
            localStorage.setItem(li.textContent.trim(), !item.completed);
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
    render();
    headerInput.value = '';
});
render();