// https://github.com/HadaSheldor/myTasksBoard.git

var tasksList = new Array;
var currentDate = new Date;
var typedTaskText, typedTaskDate, typedTaskTime, newTaskObj, taskIndex;

function collectDataFromUser() {
    typedTaskText = document.querySelector('#noteText').value;
    typedTaskDate = document.querySelector('#noteDate').value;
    typedTaskTime = document.querySelector('#noteTime').value;
    // default time value in case the user didn't insert any 
    if (typedTaskTime=="") {
        typedTaskTime = "09:00";
        document.querySelector("#noteTime").style.borderColor = "red";
    }
    return typedTaskText, typedTaskDate, typedTaskTime;
}

function validateDataFromUser() {  
    collectDataFromUser();  
    var userTypedDate = Date.parse(typedTaskDate + " " + typedTaskTime);
    var myCurrentDate = Date.parse(currentDate);
   
    if (typedTaskText=="") {
        alert("Please insert some DETAILS to your task");
        document.querySelector("#noteText").focus();
        document.querySelector("#noteText").style.borderColor = "red";
    } else if (typedTaskDate =="") {
        alert("Please insert an end DATE to your task");
        document.querySelector("#noteDate").focus();
        document.querySelector("#noteDate").style.borderColor = "red";
    } else if (userTypedDate < myCurrentDate) {
        alert("Please make sure that the DATE you're trying to set isn't earlier than TODAY");
        document.querySelector("#noteDate").focus();
        document.querySelector("#noteDate").style.borderColor = "red";
    } else {
        document.querySelector("#noteText").style.borderColor = "#28a745";
        document.querySelector("#noteDate").style.borderColor = "#28a745";
        document.querySelector("#noteTime").style.borderColor = "#28a745";
        saveDataToLocalStorage();
        displayNote(newTaskObj);
        // reloads divNotes to implement notes' ascending order
        document.querySelector("#userNotes").setAttribute("action", document.location.reload());
        resetFields();
    }
}

function saveDataToLocalStorage() {
    newTaskObj = {
        typedTaskText: typedTaskText,
        typedTaskDate: typedTaskDate,
        typedTaskTime: typedTaskTime,
    }
    tasksList.push(newTaskObj);
    
    // sorts tasksList in date+time ascending order before updating localST
    for (i=0; i<tasksList.length; i++) {
        tasksList.sort (function(a,b) {
        var a = new Date (Date.parse(a.typedTaskDate + " " + a.typedTaskTime));
        var b = new Date (Date.parse(b.typedTaskDate + " " + b.typedTaskTime));
        return a-b;
        })
    }
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

