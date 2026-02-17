function setLevel(level){

    localStorage.setItem("level",JSON.stringify(level))
    window.location.href='./memoryGame.html'
}