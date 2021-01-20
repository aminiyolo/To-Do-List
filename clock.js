'use strict';

// display clock (current date and time)
const dateContainer = document.querySelector(".date__container");
const clockContainer = document.querySelector(".clock__container");
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDate(){
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const day = currentTime.getDate();
    const days = currentTime.getDay();
    function loadDays(number) {
        return week[number];
    }
    const whichDay = loadDays(days);
    dateContainer.innerHTML = `${year}.${month+1}.${day} ${whichDay}`
};

function getTime(){
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();
    clockContainer.innerHTML = `
    ${hour < 10 ? `0${hour}`: hour}:${
    minute < 10 ? `0${minute}`:minute}:${
    second < 10 ? `0${second}`: second}`
};

// Make a greeting
const nameForm = document.querySelector(".name__form");
const nameInput = document.querySelector("input");
const greeting = document.querySelector(".greeting");
const user = "Name";
const invisible ="invisible";

console.log(nameForm);
function paintText(name){
    greeting.innerText = `Hello ${name}! \n What is your main focus?`
}

function handleSubmit(event){
    event.preventDefault();
    nameForm.classList.add(invisible);
    greeting.classList.remove(invisible);
    const name = nameInput.value;
    localStorage.setItem(user, name);
    paintText(name);
};

function loadName(){
    const name = localStorage.getItem(user);
    nameForm.classList.add(invisible);
    greeting.classList.remove(invisible);
    paintText(name);
};

function getName(){
    const currentUser = localStorage.getItem(user)
    if(currentUser !== null){
        loadName();
    } 
};

// Get random background image
const body = document.querySelector("body");
console.log(body);

function init(){
    getDate();
    getTime();
    setInterval(getTime, 1000);
    getName();
    nameForm.addEventListener("submit", handleSubmit);
};
init();

