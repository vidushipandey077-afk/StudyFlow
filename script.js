const dailyTaskCard=document.getElementById('dailyTaskCard');
const dailyTasks=document.getElementById('dailyTasks')
const dashboard=document.getElementById('dashboard')
const backButton=document.getElementById('backButton')
const addButton=document.getElementById("addButton")
const taskList=document.getElementById("taskList")
const inputTask=document.getElementById("taskInput")
const pendingCount=document.getElementById("pendingCount")
const completedCount=document.getElementById("completedCount")
const pendingTaskCard=document.getElementById("pendingTaskCard");

let taskArray=[];

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
taskArray=savedTasks

displayTasks()

dailyTaskCard.addEventListener('click',dailyTaskCardClick)
backButton.addEventListener('click',goBack)
addButton.addEventListener('click',addTask)
taskList.addEventListener('change',updateTask)
inputTask.addEventListener('keydown',function(event){
    if(event.key==="Enter"){
        addTask()
    }
})

function updateTask(){
    let completedTask=0;
    let pendingTask=0;
    const checkboxes=taskList.querySelectorAll("input")
    checkboxes.forEach((val)=>{
        if(val.checked){
            completedTask++;
        }
        else{
            pendingTask++;
        }
    })
    pendingTaskCard.textContent=pendingTask
    completedCount.textContent=completedTask
    pendingCount.textContent=pendingTask
}
function dailyTaskCardClick(){
    dashboard.style.display="none"
    dailyTasks.style.display="flex"
}

function goBack(){
    dailyTasks.style.display="none"
    dashboard.style.display="block"
}

function addTask(){
    const input=inputTask.value;
    inputTask.value=""
    if(input.trim()==""){
        return;
    }
    const checkbox=document.createElement("input")
    checkbox.type="checkbox"

    const typeTask=document.createElement("span")
    typeTask.textContent=input

    const deleteSymbol=document.createElement("span")
    deleteSymbol.textContent="🗑️"

    const inputList=document.createElement("li")

    inputList.appendChild(checkbox)
    inputList.appendChild(typeTask)
    inputList.appendChild(deleteSymbol)

    taskList.appendChild(inputList)
    updateTask()

    deleteSymbol.addEventListener('click',deleteTask)

    function deleteTask(){
        inputList.remove()
        updateTask()
    }

    const taskArrayObject={
        task:input,
        completed:checkbox.checked
    };

    taskArray.push(taskArrayObject)
    localStorage.setItem("tasks",JSON.stringify(taskArray))
}

function displayTasks(){
    taskArray.forEach((val)=>{
        const checkbox=document.createElement("input")
        checkbox.type="checkbox"
        checkbox.checked=val.completed

        const typeTask=document.createElement("span")
        typeTask.textContent=val.task

        const deleteSymbol=document.createElement("span")
        deleteSymbol.textContent="🗑️"

        const inputList=document.createElement("li")

        inputList.appendChild(checkbox)
        inputList.appendChild(typeTask)
        inputList.appendChild(deleteSymbol)

        taskList.appendChild(inputList)
        updateTask()

        deleteSymbol.addEventListener('click',deleteTask)

        function deleteTask(){
            inputList.remove()
            updateTask()
        }
    })
}
