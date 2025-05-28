console.log('welcome to my game');
let music= new Audio("background_music.mp3")
let clickAudio = new Audio("music-click.mp3")
let gameOver= new Audio("game_over.mp3")
let afterGameMusic = new Audio("after-game.mp3")
let turn  ="X";
let isgameOver =false
    const checkWin = ()=>{
        let boxtext= document.getElementsByClassName('boxtext');
        let wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ]   
        wins.forEach((e, index) =>{
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
                (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
                (boxtext[e[0]].innerText !== "")){
                    document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Wins"
                    isgameOver = true
                    
                    // Change background music on win
                    music.pause();
                    music.currentTime = 0;
                    gameOver.play();
                    
                    boxtext[e[0]].parentElement.classList.add("win-highlight");
                    boxtext[e[1]].parentElement.classList.add("win-highlight");
                    boxtext[e[2]].parentElement.classList.add("win-highlight");
                    
                    // Win condition met, no line drawing
                }
        })
}


// Drawing functions
const drawX = (canvas, animate = true) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2980b9'; // Blue color for X
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    if (animate) {
        // Animated drawing
        let progress1 = 0;
        let progress2 = 0;
        const padding = 20;
        
        const animateLine1 = () => {
            if (progress1 < 1) {
                progress1 += 0.05;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw first line
                ctx.beginPath();
                const startX1 = padding;
                const startY1 = padding;
                const endX1 = canvas.width - padding;
                const endY1 = canvas.height - padding;
                
                const currX1 = startX1 + (endX1 - startX1) * progress1;
                const currY1 = startY1 + (endY1 - startY1) * progress1;
                
                ctx.moveTo(startX1, startY1);
                ctx.lineTo(currX1, currY1);
                ctx.stroke();
                
                requestAnimationFrame(animateLine1);
            } else {
                // Start second line animation
                animateLine2();
            }
        };
        
        const animateLine2 = () => {
            if (progress2 < 1) {
                progress2 += 0.05;
                
                // Draw second line
                ctx.beginPath();
                const startX2 = canvas.width - padding;
                const startY2 = padding;
                const endX2 = padding;
                const endY2 = canvas.height - padding;
                
                const currX2 = startX2 + (endX2 - startX2) * progress2;
                const currY2 = startY2 + (endY2 - startY2) * progress2;
                
                ctx.moveTo(startX2, startY2);
                ctx.lineTo(currX2, currY2);
                ctx.stroke();
                
                requestAnimationFrame(animateLine2);
            }
        };
        
        animateLine1();
    } else {
        // Instant drawing
        const padding = 20;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(canvas.width - padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
    }
};

const drawO = (canvas, animate = true) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e74c3c'; // Red color for O
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 20;
    
    if (animate) {
        // Animated drawing
        let progress = 0;
        
        const animateCircle = () => {
            if (progress < 1) {
                progress += 0.05;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                const endAngle = Math.PI * 2 * progress;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, endAngle, false);
                ctx.stroke();
                
                requestAnimationFrame(animateCircle);
            }
        };
        
        animateCircle();
    } else {
        // Instant drawing
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }
};

const changeTurn =()=>{
    return turn ==="X"? "O": "X";
}
document.getElementsByClassName("info")[0].innerText= "Turn for "+ turn;
let boxes = document.getElementsByClassName("boxs")
Array.from(boxes).forEach(element=>{
    element.addEventListener('click', ()=>{
        let boxtext = element.querySelector('.boxtext');
        let canvas = element.querySelector('canvas');
        
        if(boxtext.innerText === '' && !isgameOver){
            // Store the symbol in the hidden span
            boxtext.innerText = turn;
            
            // Draw the symbol on canvas
            if(turn === 'X') {
                drawX(canvas);
            } else {
                drawO(canvas);
            }
            
            // Change turn
            turn = changeTurn();
            
            // Play sounds
            clickAudio.play();
            music.play();
            
            // Check for win
            checkWin();
            
            if(!isgameOver){
                document.querySelector(".info").innerText = "Turn for - " + turn;
            }
        }
    })
})
// let resrtBtn =document.querySelectorAll("#reset")
// resrtBtn.addEventListener('click', (e)=>{
//     let boxestexts = document.querySelectorAll("boxtext")
//     Array.from(boxestexts).forEach(element=>{
//         element.innerText=""----------------------------
//     })
// }) 
reset.addEventListener('click',()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    
    Array.from(boxtexts).forEach(element=>{
        element.innerText = "";
    });
    
    // Clear all canvases
    let canvases = document.querySelectorAll('.boxs canvas');
    Array.from(canvases).forEach(canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    let box = document.querySelectorAll('.boxs');
    Array.from(box).forEach(element=>{
        element.classList.remove("win-highlight");
    })
    
    // No winning line to remove
    
    // Reset game state and music
    turn = "X";
    isgameOver = false;
    
    // Reset music to background music
    gameOver.pause();
    gameOver.currentTime = 0;
    afterGameMusic.pause();
    afterGameMusic.currentTime = 0;
    music.currentTime = 0;
    
    
    document.querySelector(".info").innerText = "Turn for " + turn;
      

    })
