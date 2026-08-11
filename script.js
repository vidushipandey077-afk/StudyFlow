const dailyTaskCard=document.getElementById('dailyTaskCard');
const dailyTasks=document.getElementById('dailyTasks')
const dashboard=document.getElementById('dashboard')
const backButton=document.getElementById('backButton')
const addButton=document.getElementById("addButton")
const taskList=document.getElementById("taskList")
const inputTask=document.getElementById("taskInput")
const pendingCount=document.getElementById("pendingCount")
const completedCount=document.getElementById("completedCount")

dailyTaskCard.addEventListener('click',dailyTaskCardClick)
backButton.addEventListener('click',goBack)
addButton.addEventListener('click',addTask)
taskList.addEventListener('change',updateTask)

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
    if(input.trim()==""){
        return;
    }
    const checkbox=document.createElement("input")
    checkbox.type="checkbox"

    const typeTask=document.createElement("span")
    typeTask.textContent=input

    const inputList=document.createElement("li")

    inputList.appendChild(checkbox)
    inputList.appendChild(typeTask)

    taskList.appendChild(inputList)
    updateTask()
}
