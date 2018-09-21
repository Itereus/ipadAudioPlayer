var lyd = document.getElementById("audio");
var progressBar = document.getElementById("progressbar")
document.getElementById("btnPlay").onclick = function() {playReset(lyd)};
lyd.addEventListener('timeupdate', updateProgressBar, false);
progressbar.style.opacity = '0';

var progressTekst = document.getElementById('progressTekst');
var minuteStart = 0;
var secondsStart = 0;
var endTime = 0;
var minuteEnd = 0;
var secondsEnd = 0;
var curTime = 0;
var timerId;

document.getElementById('progressbar').addEventListener('click', function (e) {
    var value_clicked = e.offsetX * this.max / this.offsetWidth;
    lyd.currentTime = (value_clicked * lyd.duration ) / 100;
    if (lyd.paused) {
        lyd.play();
        btnPlay.className = '';
        btnPlay.className = 'stop';
        progressBar.style.opacity = '1';
        progressTekst.style.opacity = '1';
    }

    updateProgressBarInner();
});

function updateProgressBarInner() {
    endTime = Math.floor(lyd.duration);
    minuteEnd = Math.floor(endTime / 60);
    secondsEnd = Math.floor(((endTime / 60) - minuteEnd) * 60);
    curTime = Math.floor(lyd.currentTime);
    minuteStart = Math.floor(curTime / 60);
    secondsStart = Math.floor(((curTime / 60) - minuteStart) * 60);
    progressTekst.innerHTML = minuteStart + ':' + secondsStart + '/' + minuteEnd + ':' + secondsEnd;
    clearInterval(timerId);
    timerId = setInterval(function() {
        progressTekst.innerHTML = minuteStart + ':' + secondsStart + '/' + minuteEnd + ':' + secondsEnd;
        secondsStart++;
        }, 1000)
}

function updateProgressBar(){
    var percentage = Math.floor((100 / lyd.duration) * lyd.currentTime);
    progressBar.value = percentage;
    progressBar.innerHTML = percentage;
}

function resetPlayer() {
    progressBar.value = 0;
    lyd.currentTime = 0;
}

lyd.onended = function() {
    btnPlay.className = '';
    btnPlay.className = 'play';
    progressBar.value = 0;
    progressBar.style.opacity = '0';
    clearInterval(timerId);
    progressTekst.innerHTML = '';
    progressTekst.style.opacity = '0';
}

function playReset(lydKilde) {   
    if (lydKilde.paused) {
        lydKilde.play();
        btnPlay.className = '';
        btnPlay.className = 'stop';
        progressBar.style.opacity = '1';
        progressTekst.style.opacity = '1';
        updateProgressBarInner();
    } else {
        lydKilde.load();
        btnPlay.className = '';
        btnPlay.className = 'play';
        progressBar.value = 0;
        progressBar.style.opacity = '0';
        progressTekst.style.opacity = '0';
        clearInterval(timerId);
        progressTekst.innerHTML = '';        
    }
}