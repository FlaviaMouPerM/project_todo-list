import {closeModal} from "./modal.js"
const sendForm = document.querySelector(".send-form");
const form = document.querySelector(".project_form");
const project = [];

 form.addEventListener("submit", function (e){
    e.preventDefault();
    const projectName = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const color = document.getElementById("color").value;
    // console.log(projectName)
    // console.log(description)
    // console.log(color)
    
    const task = new tasks(projectName,description,color) // criei obj
    function tasks( projectName, description, color){
        this.projectName = projectName;
        this.description = description;
        this.color = color;
    }
    project.push(task); // armazenando no array
    console.log(project)
    closeModal();
    
});
//mostrar o task no  array

// function createProject(){
//     
//  for(let i = 0; i<=project.length; i++){
//     project.push();
//  }
// }

// const arr = [
//   {
//     projeto: "meuprojeto1",
//     todolist: ["fazer x", "fazer y", "fazer z"],
//   },
//   {
//     projecto: "meuprojeto2",
//     todolist: ["fazer a", "fazer b"],
//   },
// ];

// arr.forEach((item) => localStorage.setItem(item.projecto, todolist.join(",")));

// // 'fazer x, fazer y'

// const minhaString = localStorage.getItem("iddoprojeto");
// minhaString.split(",");