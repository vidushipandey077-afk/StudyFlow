const dailyTaskCard=document.getElementById('dailyTaskCard');
const dailyTasks=document.getElementById('dailyTasks')
const dashboard=document.getElementById('dashboard')
const backButton=document.getElementById('backButton')
const addButton=document.getElementById("addButton")
const taskList=document.getElementById("taskList")
const inputTask=document.getElementById("taskInput")

dailyTaskCard.addEventListener('click',dailyTaskCardClick)
backButton.addEventListener('click',goBack)
addButton.addEventListener('click',addTask)


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

    const checkbox=document.createElement("input")
    checkbox.type="checkbox"

    const typeTask=document.createElement("span")
    typeTask.textContent=input

    const inputList=document.createElement("li")

    inputList.appendChild(checkbox)
    inputList.appendChild(typeTask)

    taskList.appendChild(inputList)
}
