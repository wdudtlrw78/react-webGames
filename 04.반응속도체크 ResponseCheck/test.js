const screen = document.querySelector('#screen');
const result = document.querySelector('.result');

let startTime;
let endTimer;
let record = [];
let timeOut;

screen.addEventListener('click', () => {
    if (screen.classList.contains('waiting')) {
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭해 주세요';
        timeOut = setTimeout(() => {
            startTime = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000)
    } else if (screen.classList.contains('ready')) {
        // 부정클릭
        if (!startTime) { 
            clearTimeout(timeOut);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = '너무 성급하시군요.';
        } else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요!!.';
        } 
    } else if (screen.classList.contains('now')) { // 시작상태
        endTime = new Date();
        result.textContent = `반응속도: ${(endTime - startTime) / 1000}ms`
        record.push(endTime - startTime);
        startTime = null;
        endTime = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요.';
    }
});