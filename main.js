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

function paintText(name){
    greeting.innerText = `Hello,     ${name}! \n What is your main focus for today?`
    listForm.classList.add("visible");
}

function handleSubmit(event){
    event.preventDefault();
    nameForm.classList.add(invisible);
    greeting.classList.remove(invisible);
    const name = nameInput.value;
    localStorage.setItem(user, name);
    paintText(name);
};

function getName(){
    const name = localStorage.getItem(user);
    nameForm.classList.add(invisible);
    greeting.classList.remove(invisible);
    paintText(name);
};

function loadName(){
    const currentUser = localStorage.getItem(user)
    if(currentUser !== null){
        getName();
    } 
};

// display random background image
const body = document.querySelector("body");    

function getBackground(){
    const image = new Image();
    const number = Math.floor(Math.random()*4) + 1;
    image.src = `imgs/bg${number}.jpg`;
    image.classList.add("bg__image");
    body.prepend(image);
};

// Make a to do list and delete button with delete function 
const listForm = document.querySelector(".list__form");
const listInput = document.querySelector(".list__input");
const listOutput = document.querySelector(".todo__list");
const toDo = "The thing you should do";
let toDoLists = [];
let idNumbers = 1;

function saveList(){
    localStorage.setItem(toDo, JSON.stringify(toDoLists));
};

function deleteList(event){
    const target = event.target.parentNode;
    listOutput.removeChild(target);
    const newList = toDoLists.filter((list) => {
        return list.id !== parseInt(target.id)
    });
    toDoLists = newList;
    saveList();
};

function writeList(list){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deletBtn = document.createElement("button");
    const id = idNumbers;
    li.id = id;
    deletBtn.addEventListener("click", deleteList);
    deletBtn.innerText = '✔️';
    span.innerText = list;
    li.appendChild(deletBtn);
    li.appendChild(span);
    listOutput.appendChild(li);
    const toDoObject = {
        text : list,
        id : id
    }
    idNumbers += 1;
    toDoLists.push(toDoObject);
    saveList();
};

function handleListSubmit(event){
    event.preventDefault();
    const value = listInput.value;
    writeList(value);
    listInput.value = "";
};

function loadList(){
    const list = localStorage.getItem(toDo);
    if(list !== null) {
        const parsedList = JSON.parse(list);
        parsedList.forEach((list) => {
            writeList(list.text);
        });
    }
};  

// Get coords and weather
const API_KEY = "be9792e78e14114cbec04b3a116017a7";
const weatherContainer = document.querySelector(".weather__container");
const coords = "Coords"

function getWeather(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then(response => {
        return response.json();
    })
    .then(json => {
        const temperature = Math.floor(json.main.temp);
        const place = json.name;
        weatherContainer.innerText =`${place} ' ${temperature}°C`;
    });
};

function handleGeoSuccess(position){
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const coordsObject = {
        longitude,
        latitude
    };
    localStorage.setItem(coords, JSON.stringify(coordsObject));
    getWeather(latitude, longitude);
};

function handleGeoError(){
    window.alert("Can't access location");
};

function getLocation(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
};

function loadLocation(){
    const location = localStorage.getItem(coords);
    if(location === null) {
        getLocation();
    } else {
        const parsedLocation = JSON.parse(location);
        getWeather(parsedLocation.latitude, parsedLocation.longitude);
    }
}; 

function init(){
    getDate();
    getTime();
    setInterval(getTime, 1000);
    loadName();
    nameForm.addEventListener("submit", handleSubmit);
    getBackground();
    loadList();
    listForm.addEventListener("submit", handleListSubmit)
    loadLocation();
};
init();