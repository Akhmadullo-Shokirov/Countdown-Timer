let daysEl;
let hoursEl;
let minutesEl;
let secondsEl;
let generateBtn;
let bodyContainer;

let eventYears = "1 January 2022";
let eventTitle = "New Years Eve";

function createEvent() {
  let bodyElement = document.querySelector("body");
  bodyElement.innerHTML = `
    <h1 id="title">${eventTitle}</h1>
    <div class="countdown-container">
        <div class="countdown-el days-c">
            <p class="big-text" id="days">0</p>
            <span>days</span>
        </div>
        <div class="countdown-el hours-c">
            <p class="big-text" id="hours">0</p>
            <span>hours</span>
        </div>
        <div class="countdown-el minutes-c">
            <p class="big-text" id="minutes">0</p>
            <span>mins</span>
        </div>
        <div class="countdown-el seconds-c">
            <p class="big-text" id="seconds">0</p>
            <span>seconds</span>
        </div>
    </div>
    <div class="generateBtn-container">
        <button id="generateBtn" class="generateBtn">Generate Timer</button>
    </div>
  `;
  daysEl = document.getElementById("days");
  hoursEl = document.getElementById("hours");
  minutesEl = document.getElementById("minutes");
  secondsEl = document.getElementById("seconds");
  generateBtn = document.getElementById("generateBtn");
  bodyContainer = document.querySelector("body");
  generateBtn.addEventListener("click", generateTimer);
}

function init() {
  createEvent();
  
  countdown();
  setInterval(countdown, 1000);
}

function countdown() {
  const eventYearsDate = new Date(eventYears);
  const currentDate = new Date();

  const totalSeconds = (eventYearsDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function generateTimer() {

  bodyContainer.innerHTML = "";
  let eventContainer = document.createElement("div");
  eventContainer.classList.add("event-container");
  eventContainer.innerHTML = `
    <h2>Event Info</h2>
    <div class="main-container">
        <div class="input-container">
            <label class="event-label" for="input">Event Name</label>
            <input type="text" id="input-title" >
        </div>
        <div class="calendar-container">
            <div class="calendar-child">
                <label class="event-label" for="day">Day</label>
                <select id="day" class="day">
                    
                </select>
            </div>
            <div class="calendar-child">
                <label class="event-label" for="month">Month</label>
                <select id="month" class="month">
                    
                </select>
            </div>
            <div class="calendar-child">
                <label class="event-label" for="year">Year</label>
                <select id="year" class="year">
                    
                </select>
            </div>
        </div>
        <div class="generate-container">
            <button id="generate" class="generate">Generate</button>
        </div>
    </div>
  `;
  bodyContainer.appendChild(eventContainer);

  addDate();
  
  document.getElementById("generate").addEventListener("click", getEventInfo);
}

function addDate() {
  for(let i = 1; i <=31; i++) {
    let optionDay = document.createElement("option");
    optionDay.value = i;
    optionDay.innerText = i;
    document.getElementById("day").appendChild(optionDay);
  }

  const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  monthsList.forEach((month) => {
    let optionMonth = document.createElement("option");
    optionMonth.value = month;
    optionMonth.innerText = month;
    document.getElementById("month").appendChild(optionMonth);
  });

  const fullDate = new Date();
  const currentYear = fullDate.getFullYear();
  const borderYear = currentYear+50;

  for(let i = currentYear; i<=borderYear; i++) {
    let optionYear = document.createElement("option");
    optionYear.value = i;
    optionYear.innerText = i;
    document.getElementById("year").appendChild(optionYear);
  }
}

function getEventInfo() {
  const titleVal = document.getElementById("input-title").value;
  const dayVal = document.getElementById("day").value;
  const monthVal = document.getElementById("month").value;
  const yearVal = document.getElementById("year").value;

  eventTitle = titleVal;
  let wholeData = dayVal + " " + monthVal + " " + yearVal;
  eventYears = wholeData;
  
  createEvent();
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

window.onload = init;