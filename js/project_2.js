// https://github.com/HadaSheldor/myTasksBoard.git

var tasksList = new Array;
var currentDate = new Date;
var typedTaskText, typedTaskDate, typedTaskTime, newTaskObj, taskIndex;

function displayNote(newTaskObj, taskIndex) {
    // creates div for a new note
    var newDivNote = document.createElement("div");
    newDivNote.className = "newDivNote";
    newDivNote.setAttribute("taskIndex",taskIndex);
    document.querySelector("#userNotes").appendChild(newDivNote);

    // creates "X" button to each newDivNote
    var closeIcon = document.createElement("i");
    closeIcon.className = "fas fa-times close";
    closeIcon.addEventListener("click", function(e) {
        var taskElement = e.target.closest(".newDivNote");
        taskElement.setAttribute("id", taskIndex);
        discardNote(taskElement.id);
        taskElement.remove();
    }); 
    newDivNote.appendChild(closeIcon);
        
    // creates div for textNode to each newDivNote
    textNode = document.createElement("div");
    textNode.className = "typedTaskText";
    textNode.innerHTML = newTaskObj.typedTaskText;
    newDivNote.appendChild(textNode);
        
    // creates div for dateNode to each newDivNote
    dateNode = document.createElement("div");
    dateNode.className = "typedTaskDate";
    dateNode.innerHTML = newTaskObj.typedTaskDate;
    newDivNote.appendChild(dateNode);
        
    // creates div for timeDiv to each newDivNote
    timeNode = document.createElement("div");
    timeNode.className = "typedTaskTime";
    timeNode.innerHTML = newTaskObj.typedTaskTime;
    newDivNote.appendChild(timeNode);   

    refreshLocalStorage();
}

function discardNote(taskIndex) {
    tasksList.splice(taskIndex,1);
    refreshLocalStorage ();
}

function onloadDisplayNotesData() {
    tasksList = localStorage.getItem("tasksList");
    if(tasksList == null) {
        localStorage.setItem("tasksList", JSON.stringify([tasksList]));
    }
    tasksList = JSON.parse(localStorage.getItem("tasksList"));
    // sorting notes in ascending order >> https://en.proft.me/2015/11/14/sorting-array-objects-number-string-date-javascrip/ 
    for (i=0; i<tasksList.length; i++) {
        if (tasksList[i] != null) {
            tasksList.sort (function(a,b) {
            var a = new Date (Date.parse(a.typedTaskDate + " " + a.typedTaskTime));
            var b = new Date (Date.parse(b.typedTaskDate + " " + b.typedTaskTime));
            return a-b;
            })
            refreshLocalStorage();
            displayNote(tasksList[i],i); 
        } else {
            tasksList.splice(i--,1);
            refreshLocalStorage();
        }
    }
    unfinishedTasks();
}

function unfinishedTasks() {
    tasksList = JSON.parse(localStorage.getItem("tasksList"));
    
    for (i=0; i<tasksList.length; i++) {
        var taskDate = new Date(tasksList[i].typedTaskDate + " " + tasksList[i].typedTaskTime);
        var myCurrentDate = new Date(currentDate);
        if (taskDate <= myCurrentDate) {
            alert("REMINDER!" + "\n" + "\n" + "The TIME of one of your tasks has EXPIRED:" + "\n" + tasksList[i].typedTaskDate + " " + tasksList[i].typedTaskTime + "\n" + "\n" + "TASK'S DETAILS:" + "\n" + tasksList[i].typedTaskText);
            document.querySelector("#userNotes").focus();
        } 
    } 
    refreshLocalStorage();
}

function refreshLocalStorage () {
    localStorage.removeItem("tasksList");
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

function resetFields() {
    document.querySelector("#noteText").value="";
    document.querySelector("#noteDate").value="";
    document.querySelector("#noteTime").value="";
    document.querySelector("#noteText").style.borderColor = "";
    document.querySelector("#noteDate").style.borderColor = "";
    document.querySelector("#noteTime").style.borderColor = "";
}