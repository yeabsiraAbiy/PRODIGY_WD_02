let startTime = 0, updatedTime = 0, difference = 0, tInterval, running = false, laps = [], lapCount = 0, previousLapTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1); // Interval set to 1ms for millisecond precision
        running = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    previousLapTime = 0;
    display.innerHTML = '00:00:00:000';
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        lapCount++;
        const currentTime = new Date().getTime();
        const currentLapTime = currentTime - startTime - previousLapTime;
        previousLapTime = currentTime - startTime;
        const formattedLapTime = formatTime(currentLapTime);
        const formattedOverallTime = formatTime(previousLapTime);
        const lapRecord = `Lap ${lapCount}: Lap Time: ${formattedLapTime}, Overall Time: ${formattedOverallTime}`;
        
        const li = document.createElement('li');
        li.textContent = lapRecord;
        lapsList.appendChild(li);
    }
}

function getShowTime() {
    difference = new Date().getTime() - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000));
    let seconds = parseInt((time / 1000) % 60);
    let minutes = parseInt((time / (1000 * 60)) % 60);
    
    milliseconds = milliseconds < 100 ? milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return minutes + ":" + seconds + ":" + milliseconds;
}


