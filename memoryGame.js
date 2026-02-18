const body = document.getElementsByTagName("body")
const mainDiv = document.querySelector(".mainDiv");
const newGame = document.querySelector(".newGame");
const arrimg = [];
const level = JSON.parse(localStorage.getItem("level"));
if(level==32)
    {
    document.getElementsByClassName("mainDiv")[0].style.gridTemplateColumns="repeat(8, 170px)";
    }

    newGame.addEventListener("click",()=>{
        window.location.href = "./levels.html";
    })
// יצירת מערך עם זוגות תמונות
for (let i = 1; i <= level / 2; i++) {
    arrimg.push(i);
    arrimg.push(i);
}

// ערבוב מערך התמונות
for (let i = arrimg.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrimg[i], arrimg[j]] = [arrimg[j], arrimg[i]];
}

// יצירת כרטיסים
for (let index = 0; index < level; index++) {
    const divCard = document.createElement("div");
    divCard.className = "a_" + index;
    document.getElementsByClassName('mainDiv')[0].appendChild(divCard);
    divCard.style.backgroundImage = "url(simon_pic/d.jpg)";
}

// משתנים למשחק
let count = 0;
let klaf = null;
let win = 0;
let ii = 0;
let card = 0;
let point = 0;
const ppoints = document.querySelector(".ppoints");
ppoints.textContent = `${point}`;
const matchSound = new Audio("audio/click.mp3");
const winVoice = new Audio("audio/win.mp3");
const loseVoice = new Audio("audio/gameOver.mp3");

console.log(arrimg)
// לכרטיסים event listeners הוספת 
for (let i = 0; i < level; i++) {
    const a = document.querySelector(`.a_${i}`);
    const clickHandler = () => {
        const imageNumber = arrimg[i];
        a.style.backgroundImage = `url(simon_pic/${getImageName(imageNumber)})`;

        count++;
        if (count === 1) {
            klaf = a;
            card = imageNumber;
            ii = i;
        } else if (count === 2) {
            if (card === imageNumber && ii !== i) {
                point += 5;
                ppoints.textContent = `${point}`;
                a.removeEventListener("click", clickHandler);
                klaf.removeEventListener("click", clickHandler);
                a.classList.add("open");
                klaf.classList.add("open");
                count = 0;
                win++;
                matchSound.play();
                
            } else {
                setTimeout(() => {
                    a.style.backgroundImage = "url(simon_pic/d.jpg)";
                    klaf.style.backgroundImage = "url(simon_pic/d.jpg)";
                    count = 0;
                }, 1000);
            }
        } else if (count === 3) {
            a.style.backgroundImage = "url(simon_pic/d.jpg)";
            
            count = 2;
        }
    };
    a.addEventListener("click", clickHandler);
}

// המרת מספר תמונה לשם קובץ
function getImageName(imageNumber) {
    const imageNames = {
        1: "j.jpg",
        2: "k.jpg",
        3: "f.jpg",
        4: "v.jpg",
        5: "i.png",
        6: "l.jpg",
        7: "m.jpg",
        8: "o.jpg",
        9: "h.png",
        10: "y.jpg",
        11: "z.jpg",
        12: "e.jpg",
        13: "w.jpg",
        14: "x.jpg",
        15: "b.jpg",
        16: "u.jpg",
    };
    return imageNames[imageNumber];
}

let second = 60;
const ptime = document.querySelector(".ptime");

const timer = setInterval(() => {
    ptime.textContent = `${second}`;
    second--;

    if (win == level / 2) { // נצחון
        point += second + 2;
        ppoints.textContent = `${point}`;
        clearInterval(timer);
        for (let i = 0; i < level; i++) {
            const part = document.querySelector(`.a_${i}`);
            part.style.display = "none";
        }
        const finish = document.createElement('div');
        finish.className = "finish";
        finish.style.width = "500px";
        finish.style.height = "500px";
        mainDiv.appendChild(finish);
        ptime.textContent = "finish...";
        finish.style.backgroundImage = "url(simon_pic/p.gif)";
        win = 0;
        updatePoints();
        winVoice.play();
    } else {
        if (second === -1) {
            loseVoice.play();
            clearInterval(timer);
            const finish = document.createElement('div');
            finish.className = "finish";
            finish.style.width = "500px";
            finish.style.height = "500px";
            mainDiv.appendChild(finish);
            if (win != level / 2) { // כשלון
                for (let i = 0; i < level; i++) {
                    const part = document.querySelector(`.a_${i}`);
                    part.style.display = "none";
                }
                point -= 10;
                ppoints.textContent = `${point}`;
                ptime.textContent = "finish...";
                finish.style.backgroundImage = "url(/n.gif)";
            }
            updatePoints();
            
        }
    }
}, 1000);

const updatePoints = () => {
    const username = JSON.parse(localStorage.getItem("current"));
    const allUsersString = localStorage.getItem('users');
    const allUsers = JSON.parse(allUsersString);
    const users = allUsers.map((user) => {
        if (user.username === username) {
            if (user.point < point) {
                user.point = point;
            }
        }
        return user;
    });
    localStorage.setItem("users", JSON.stringify(users));
};