const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime =0;
let elapsedTime =0;
let currentTime=0;
let paused= true; //if our time is currenty pause we'll set this to be true, false if it's running. sebebei tekrar çalıştırabilmek icin true ayarlanır
let intervalId;
let hrs=0;
let mins=0;
let secs=0;

startBtn.addEventListener("click", () => {
    // burayada eklebilirsin gidip her birinede teker teker ekleybilirsin paused = true diger iksinie ekelemene gerek kalmaz
    if(paused){//check the see if paused true
        paused = false;
        startTime = Date.now() - elapsedTime;//give you the current date and time in miliseconds. elapsedTime will initally be zero to begin
        intervalId = setInterval(updateTime, 1000);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;//tekrar start tusuna basıp run yapmasını sağlamak ıcın
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){
    elapsedTime = Date.now() - startTime; //how much time is passed

    secs = Math.floor((elapsedTime / 1000) % 60);//because of time is milisecons nad we need to convert
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);
    
    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    function pad(unit){//ı'd like to two zeros
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}