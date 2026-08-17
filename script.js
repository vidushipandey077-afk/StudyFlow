// Selecting Elements
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

//Local Storage Array
let taskArray=[];

// conversion of tasks to Array
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
taskArray=savedTasks

displayTasks()

// EventListeners
dailyTaskCard.addEventListener('click',dailyTaskCardClick)
backButton.addEventListener('click',goBack)
addButton.addEventListener('click',addTask)
taskList.addEventListener('change',updateTask)
inputTask.addEventListener('keydown',function(event){
    if(event.key==="Enter"){
        addTask()
    }
})

// Count pending and Completed Tasks
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

// To switch from Dashboard to Daily Tasks
function dailyTaskCardClick(){
    dashboard.style.display="none"
    dailyTasks.style.display="flex"
}

// Back Key
function goBack(){
    dailyTasks.style.display="none"
    dashboard.style.display="block"
}

// To add task to the checklist
function addTask(){
    const input=inputTask.value;
    inputTask.value=""
    if(input.trim()==""){
        return;
    }
    const checkbox=document.createElement("input")
    checkbox.type="checkbox"
    checkbox.classList.add("check-box")

    const typeTask=document.createElement("span")
    typeTask.textContent=input

    const deleteSymbol=document.createElement("span")
    deleteSymbol.textContent="🗑️"
    deleteSymbol.classList.add("delete-button")

    const inputList=document.createElement("li")

    inputList.appendChild(checkbox)
    inputList.appendChild(typeTask)
    inputList.appendChild(deleteSymbol)

    taskList.appendChild(inputList)
    updateTask()

    deleteSymbol.addEventListener('click',deleteTask)
    checkbox.addEventListener('change',some)

    // Object to be aded to array
    const taskArrayObject={
        task:input,
        completed:checkbox.checked
    };

    // To delete the task from Local Storage and UI
    function deleteTask(){
        inputList.remove()
        taskArray=taskArray.filter((item)=>{
            return item!==taskArrayObject
        })

        localStorage.setItem("tasks",JSON.stringify(taskArray))
        updateTask()
    }

    function some(){
        taskArrayObject.completed=checkbox.checked
        localStorage.setItem("tasks",JSON.stringify(taskArray))
    }

    taskArray.push(taskArrayObject)
    localStorage.setItem("tasks",JSON.stringify(taskArray))
}

// To display tasks from local Storage when page reloads
function displayTasks(){
    taskArray.forEach((val)=>{
        const checkbox=document.createElement("input")
        checkbox.type="checkbox"
        checkbox.classList.add("check-box")
        checkbox.checked=val.completed

        const typeTask=document.createElement("span")
        typeTask.textContent=val.task

        const deleteSymbol=document.createElement("span")
        deleteSymbol.textContent="🗑️"
        deleteSymbol.classList.add("delete-button")

        const inputList=document.createElement("li")

        inputList.appendChild(checkbox)
        inputList.appendChild(typeTask)
        inputList.appendChild(deleteSymbol)

        taskList.appendChild(inputList)
        updateTask()

        deleteSymbol.addEventListener('click',deleteTask)
        checkbox.addEventListener('change',someFunction)

        function deleteTask(){
            inputList.remove()
            taskArray=taskArray.filter((item)=>{
                return item!==val
            })
        
            localStorage.setItem("tasks",JSON.stringify(taskArray))
            updateTask()
        }

        function someFunction(){
            val.completed=checkbox.checked
            localStorage.setItem("tasks",JSON.stringify(taskArray))
        }
    })
}
