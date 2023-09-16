
class Task{
	
	constructor(checked,description,dateAndTime){
		this.checked=checked;
		this.description=description;
		this.dateAndTime=dateAndTime;
		
	}
	getDateAndTime(){
		return this.dateAndTime;
	}
	
	
}

var tasks=[];


function getFromLocalStorage(){
	
	
	
	tasks=JSON.parse(localStorage.getItem("tasks"));
	
	
	
	
	if(tasks!=null){
	var tabela=document.getElementById("tabela");
	for(let i=0;i<tasks.length;i++){
		var rresht=tabela.insertRow(i+1);
		var description=rresht.insertCell(0);
		description.innerHTML=tasks[i].description;
		var mbaruar=rresht.insertCell(1);
		var checkbox=document.createElement("input");
		checkbox.type="checkbox";
		if(tasks[i].checked==true){
			
			checkbox.checked=true;
			rresht.classList.add("done");
			
		}
		else{
			checkbox.checked=false;
			rresht.classList.remove("done");
			
		}
		checkbox.addEventListener("change", function(e) {
    if (this.checked) {
        
		let indexToBeChecked=tasks.indexOf(tasks[i]);
		let rreshtat=document.querySelectorAll("#tabela tr");
		let rreshtPerNdryshim=rreshtat[indexToBeChecked+1];
		rreshtPerNdryshim.classList.add("done");
		tasks[indexToBeChecked].checked=true;
		localStorage.setItem("tasks",JSON.stringify(tasks));
		
    }
else 	{
			let indexToBeChecked=tasks.indexOf(tasks[i]);
			let rreshtat=document.querySelectorAll("#tabela tr");
			let rreshtPerNdryshim=rreshtat[indexToBeChecked+1];
			rreshtPerNdryshim.classList.remove("done");
			tasks[indexToBeChecked].checked=false;
			localStorage.setItem("tasks",JSON.stringify(tasks));
			
}
});
		mbaruar.appendChild(checkbox);
		var date=rresht.insertCell(2);
		var dateFromTasks=new Date(tasks[i].dateAndTime);
		if(timeExpired(dateFromTasks)){
			
			rresht.style.background="#d73b3e";
		}
		if(timeAboutToExpire(dateFromTasks)){
			
			rresht.style.background="#fcf75e";
		}
		date.innerHTML=dateFromTasks.toISOString().split('T')[0];
		var time=rresht.insertCell(3);
		time.innerHTML=dateFromTasks.toLocaleTimeString('en-US');
	}
	}
	else {tasks=[];}
}

function funksioniShfaq(){

var popup=document.getElementById("taskPopup");
popup.classList.add("active");
popup.classList.remove("nonactive");

}
function funksioniFshi(){

var popup=document.getElementById("taskPopup");
popup.classList.add("nonactive");
popup.classList.remove("active");

}



function shtoTask(){
	
var taskName=document.getElementById("taskName");
var taskDate=document.getElementById("taskDate");
var taskTime=document.getElementById("taskTime");
	
var tabela=document.getElementById("tabela");

let dateAndTime=taskDate.value+"T"+taskTime.value+":00";

var date = new Date(dateAndTime);

var newTask=new Task(false,taskName.value,date);




 var index=binarySearch(tasks,newTask);
 
 
 tasks.splice(index,0,newTask);
 console.log(index);
 console.log(tasks);
 

var rresht;
if(index==0){
	 rresht=tabela.insertRow(1);
}

else if(index==1&&tasks.length==1){
	
	rresht=tabela.insertRow(index);
}
else{
	
	 rresht=tabela.insertRow(index+1);
}
if(timeExpired(date)){rresht.style.background="#d73b3e";}
if(timeAboutToExpire(date)){
			
		rresht.style.background="#fcf75e";
	}
var description=rresht.insertCell(0);
description.innerHTML=taskName.value;	
var mbaruar=rresht.insertCell(1);
var checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.addEventListener("change", function(e) {
    if (this.checked) {
        rresht.classList.add("done");
			let toCheckIndex=tasks.indexOf(newTask);
			tasks[toCheckIndex].checked=true;
			localStorage.setItem("tasks",JSON.stringify(tasks));
	}
		
		else{
			rresht.classList.remove("done");
		let toCheckIndex=tasks.indexOf(newTask);
			tasks[toCheckIndex].checked=false;
			localStorage.setItem("tasks",JSON.stringify(tasks));
}
   	
});
mbaruar.appendChild(checkbox);
var date=rresht.insertCell(2);
date.innerHTML=taskDate.value;
	
var time=rresht.insertCell(3);
var fullTime;
if(parseInt(taskTime.value.substring(0,2))>11){ fullTime=taskTime.value+":00 PM"}
else{fullTime=taskTime.value+":00 AM"}
time.innerHTML=fullTime;

funksioniFshi();
 localStorage.setItem("tasks",JSON.stringify(tasks));
 
}

function binarySearch(tasks,newTask){
	if (tasks.length==0){  return 1;}
	if(newTask.getDateAndTime()>=new Date(tasks[tasks.length-1].dateAndTime)) return tasks.length;
	if(newTask.getDateAndTime()<=new Date(tasks[0].dateAndTime)) return 0;
	let i;
	for(i=tasks.length-1;i>=0&&new Date(tasks[i].dateAndTime)>newTask.dateAndTime;i--){
		console.log("inside for");
	}
	
	return i+1;
	
}

function timeExpired(date){
	
	if(date<new Date()){
			
			return true;
		}
	return false;	
}

function timeAboutToExpire(date){
	let diff=date.getTime()-new Date().getTime();
	if(diff>0&&diff<86400000) return true;
	return false;
	
}



