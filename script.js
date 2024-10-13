const newTaskButton = document.querySelector(".task-button");
const saveTaskButton = document.querySelector(".save-task-button");
const taskList = document.querySelector(".to-do-tasks");
const tasksArray = JSON.parse(localStorage.getItem("task")) || [];
const check = document.querySelector(".fa-user-check");
let deleteTaskButton = document.querySelectorAll(".fa-trash");
let eachTask = document.querySelectorAll(".task");
renderTask(tasksArray);
//Event Listener
newTaskButton.addEventListener("click", addTask);
saveTaskButton.addEventListener("click", () => {
    tasksArray.forEach((object, index) => {
        reflectChangesToArray(object, index);
    });
    localStorage.setItem("task", JSON.stringify(tasksArray));
    check.style.animation = "none";
    check.offsetWidth;
    check.style.animation= "appear 1s";
});
function addTask(){
    tasksArray.push({
        completion: false,
        date: "",
        title: "",
        description: "",
        color: "#"+ randomHexGenerator().toString(16),
    });
    renderTask(tasksArray);
}
function deleteTask(id){
    tasksArray.splice(id, 1);
    renderTask(tasksArray);
}
function renderTask(array){
    const taskHTML = array.map((task)=> {
        return `
            <div class="task flexbox">
                <div class="task-info flexbox">
                    <div class="flexbox">
                        <strong>Completion:</strong>
                        <input type="checkbox" class="checkbox" ${task.completion ? 'checked' : ""}>
                    </div>
                    <div>
                        <strong>Date:</strong>
                        <input type="date" class="task-date" value="${task.date}">
                    </div>
                    <div>
                        <strong>Task Title:</strong>
                        <input type="text" class="task-title" value="${task.title}">
                    </div>
                    <i class="fa-solid fa-trash" onclick=deleteTask(${array.indexOf(task)})></i>
                </div>
                <strong>Task Description: </strong>
                <textarea name="description" class="task-description">${task.description}</textarea>
            </div>
    `;
    })
    .join("");
    taskList.innerHTML = taskHTML;
    
        deleteTaskButton = document.querySelectorAll(".fa-trash");
        eachTask = document.querySelectorAll(".task");
        for(let index = 0; index<tasksArray.length; index++){
            eachTask[index].style.background = tasksArray[index].color;
        }
}
function reflectChangesToArray(object, index){
    const checkBox = document.querySelectorAll(".checkbox");
    const date = document.querySelectorAll(".task-date");
    const title = document.querySelectorAll(".task-title");
    const description = document.querySelectorAll(".task-description");

            object.completion = checkBox[index].checked;
            object.date = date[index].value;
            object.title = title[index].value;
            object.description = description[index].value;
}
function randomHexGenerator(){
    return Math.floor(Math.random()*16777215).toString(16);
}