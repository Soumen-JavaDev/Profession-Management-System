let form=document.getElementById("user_form");
let nameInput=document.getElementById("name");
let professionInput=document.getElementById("profession");
let ageInput=document.getElementById("age");
let masg=document.getElementById("massage");
let userList=document.getElementById("user_list");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

updateEmployeesList();

form.addEventListener("submit",function (e){
 e.preventDefault();
  let name=nameInput.value.trim();
  let profession=professionInput.value.trim();
  let age=ageInput.value.trim();

  if(!name || !profession || !age){
    errorMasg("Error :Please Make sure All the field before adding in an emplyee","error");
   
    return;
  }
  const newEmployees={
    id:Date.now(),
    name,
    profession,
    age:parseInt(age)

  };
  employees.push(newEmployees);
  saveToLocalStorage();
  updateEmployeesList();
  errorMasg("Success : Message Added","success");
  form.reset();
  
});
function updateEmployeesList(){
      if(employees.length ===0)
      userList.innerHTML="Data Not Found";
     else userList.innerHTML="";

      employees.forEach((emp)=>{
        const div=document.createElement("div");
        div.className="employe_card";
        
        div.innerHTML=`<div>
        <p>${emp.name}</p>
        <p>${emp.profession}</p>
        <p>${emp.age}</p>
        </div>
        <button onclick="deleteEmploye(${emp.id})">Delete</button>
        `;

        userList.appendChild(div);
      });
      
};
function saveToLocalStorage(){
  localStorage.setItem("employees", JSON.stringify(employees));
};
function deleteEmploye(id){
  
  employees =employees.filter((emp)=>emp.id != id);
  saveToLocalStorage();
  updateEmployeesList();
  
};

function errorMasg(text,type){
  masg.textContent=text;
  masg.className=type;
};