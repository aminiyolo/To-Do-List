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
}

function init(){
    getDate();
    getTime();
    setInterval(getTime, 1000);
}
init();

