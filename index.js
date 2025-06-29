const form = document.querySelector("#to-do-form")
const list = document.querySelector("#to-do-list")
const input = document.querySelector("#task-input")
const allRemoveButton = document.querySelector("#all-task-remove-button")

let tasks = [];

function renderTasks (taskTitle, done = false){
        // cria um elemento pra lista
    const li = document.createElement('li');
    //cria uma checkbox para as tarefas que foram concluidas pra lista
    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type','checkbox');
    checkboxInput.addEventListener('change', (event) => {
        const liToggle = event.target.parentElement;
        const spanToggle = liToggle.querySelector('span');
        const done = event.target.checked;
        //riscar elemento da lista
        if(done){
            spanToggle.style.textDecoration = 'line-through';
        } else{
            spanToggle.style.textDecoration = 'none';
        }
        tasks = tasks.map(task => {
            if(task.title === spanToggle.textContent){
                return {
                    title: task.title,
                    done: !task.done
                }
            } else{
                return task
            }
        })
        //salva a lista localmente
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
    checkboxInput.checked = done;
    //cria um span pra lista
    const span = document.createElement('span');
    span.textContent = taskTitle;
        if(done){
         span.style.textDecoration = 'line-through';
    }
    //cria um botão pra remover elementos da lista
    const button = document.createElement('button')
    button.textContent ='X';
    button.addEventListener('click', (event) => {
        const liRemove = event.target.parentElement;
        const titleRemove = liRemove.querySelector('span').textContent
        //remove o elemento da lista
        list.removeChild(liRemove);
        tasks = tasks.filter(tasks => tasks.title !== titleRemove);
        //salva a lista localmente
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
    //adiciona todos os elementos criados ao item da lista
    li.appendChild(checkboxInput);
    li.appendChild(span);
    li.appendChild(button);
    //adiciona o item a lista
    list.appendChild(li);
}

//carrega as tasks salvas na memória
window.onload = () => {
    const tasksLocalStorage = localStorage.getItem('tasks');
    if(tasksLocalStorage){
        tasks = JSON.parse(tasksLocalStorage);
        tasks.forEach(task => {
            renderTasks(task.title, task.done)
        });
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskTitle = input.value;

    //verifica se o para digitar uma tarefa está vazio
    if(taskTitle !== ''){
        tasks.push({
            title:taskTitle,
            done:false
        });
        //salva a lista localmente
        localStorage.setItem('tasks', JSON.stringify(tasks))
        input.value = '';
    } else {
        alert('Digite uma tarefa');
        return;
    }
    renderTasks(taskTitle)
})

allRemoveButton.addEventListener('click', (event) => {
    list.innerHTML = '';
    tasks=[];
    //salva a lista localmente
    localStorage.setItem('tasks', JSON.stringify(tasks))
})