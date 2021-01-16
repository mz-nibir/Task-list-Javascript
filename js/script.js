// define UI Element

let form = document.querySelector("#task_form");
let taskList = document.querySelector('ol');
let clearBtn = document.querySelector("#clear_task_btn");
let taskInput = document.querySelector("#new_task");
let filter = document.querySelector("#task_filter");

// define EventListeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);

document.addEventListener('DOMContentLoaded', getTask)

// define Function

// add task
function addTask(e) {

  if (taskInput.value === '') {
    alert("Add a Task");
  }

  else {  // create li Element
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value + " "));

    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);

    taskList.appendChild(li);

    //store the task to Local Stroge , function calling
    storeTaskInLocalStorage(taskInput.value);
    //

    taskInput.value = "";
  }
  e.preventDefault();
}

// Remove Task 
function removeTask(e) {

  if (e.target.hasAttribute('href')) {

    if (confirm('Are you sure ?')) {

      let ele = e.target.parentElement;
      ele.remove();

     // Remove Task from local Storage
        removeFromLS(ele);   


    }
  }
}

// Clear Task 
function clearTask(e) {

  if (confirm('Are you sure? Remove Task Finally')){

    taskList.innerHTML = "";

    localStorage.clear();


  }

  taskList.innerHTML = "";

  localStorage.clear();

}

// filter Tash 
function filterTask(e) {
  let text = e.target.value.toLowerCase();   // text = user input
  //console.log(text);
  document.querySelectorAll('li').forEach(task => { //get all list elements
    let item = task.firstChild.textContent;  //match with only textcontent, and check items
    if (item.toLowerCase().indexOf(text) != -1) { // if search anyone
      task.style.display = 'block';  // if found anyone it will be show
    }
    else {
      task.style.display = 'none'; // if donot found anyone it ll be hidden
    }
  })

}

//store the task to Local Stroge , define the function

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {  // local stroage a task nam e keo ache ki na
    tasks = []; // if na thake then blank array ashbe
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));  // jodi thake tahole sei task ta json parse kore niye ashbe
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));  // tasks k overwrite kore data gula stroage hobe
}  //now uplodding to LS


// define getTask and downloaded task from LS
function getTask(){
// copy from storeTaskInLocalStorage
  let tasks;
  if (localStorage.getItem('tasks') === null) {  // local stroage a task nam e keo ache ki na
    tasks = []; // if na thake then blank array ashbe
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));  // jodi thake tahole sei task ta json parse kore niye ashbe
  }

  tasks.forEach(task => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task+ " "));//  change.. taskInput.value  to task

    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);

    taskList.appendChild(li);

  });



}

// define removeFromLS function
function removeFromLS(taskItem){
  // copy from storeTaskInLocalStorage
  let tasks;
  if (localStorage.getItem('tasks') === null) {  // local stroage a task nam e keo ache ki na
    tasks = []; // if na thake then blank array ashbe
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));  // jodi thake tahole sei task ta json parse kore niye ashbe
  }

  let li = taskItem;
  li.removeChild(li.lastChild); //<a> x <a> remove

  tasks.forEach((task,index) => {
    if(li.textContent.trim() === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));


}