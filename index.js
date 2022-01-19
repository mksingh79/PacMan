const width = 28; //28*15=420 which is the width of the grid
const grid = document.querySelector(".grid")
const scoreDisplay = document.getElementById("score")
let score = 0
let squares = []
let pacmanCurrentIndex = 489

// the grid will be the layout where all the divs will be added 
// each div will have a specific value as shown below
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
// the grid will be 28*28 , 784 divs in it
// hardcoding the entire layout like this

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]


function createBoard(){
    //function to create the board
    //create 784 individual div elements and add them to the grid
    for (let i = 0; i<layout.length; i++ ){
        const square = document.createElement("div")
        grid.appendChild(square)
        //append the new square in a squares array to be used later
        squares.push(square)
        
        if (layout[i] === 0){
            squares[i].classList.add("pac-dot")
        } else if (layout[i] === 1){
            squares[i].classList.add("wall")
        } else if (layout[i] === 2){
            squares[i].classList.add("ghost-lair")
        } else if (layout[i] === 3){
            squares[i].classList.add("power-pellet")
        } 

    }
    
}

createBoard()

//add pacman to the board
squares[pacmanCurrentIndex].classList.add("pacman")

//code to control movement
function control(e){
    pacDotEat()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
    squares[pacmanCurrentIndex].classList.remove("pacman")
    
    if (e.key === "Down" || e.key === "ArrowDown" || e.key === "s"){
        // down boundry condition check & other checks
        if (!squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
            !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
            pacmanCurrentIndex + width < width*width){
            pacmanCurrentIndex += width
        }
    } else if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w"){
        // up boundary condition and wall check
        if (!squares[pacmanCurrentIndex - width].classList.contains("wall") &&
            pacmanCurrentIndex - width >= 0){
            pacmanCurrentIndex -= width
        }
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a"){
        // left boundary condition and wall check
        if (!squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
            pacmanCurrentIndex % width !== 0){
            pacmanCurrentIndex -= 1
            // pacman shortcut 
            if (pacmanCurrentIndex === 364){
                pacmanCurrentIndex = 391
            }
        }
    } else if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d"){
        // right boundary condition and wall check
        if (!squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
            pacmanCurrentIndex % width < width-1){
            pacmanCurrentIndex += 1
            // pacman shortcut
            if (pacmanCurrentIndex === 391){
                pacmanCurrentIndex = 364
            }
        }
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    
}
// event to listen to key strokes
document.addEventListener("keyup", control)

//function to eat pac dot
function pacDotEat(){
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
        score++
        scoreDisplay.innerText = score
    }
}
function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        //add a score of 10
        score += 10
        scoreDisplay.innerText = score
        //remove power pellet class
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after 10 seconds   
        setTimeout(unScareGhosts, 10000)    
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new ghost("blinky", 348, 200),
    new ghost("pinky", 376, 300),
    new ghost("inky", 351, 150),
    new ghost("clyde", 379, 400)
]

//create the ghosts
ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost')
})

//move the ghosts
function moveGhost(ghost){
    const directions = [1, -1, width, -width]
    let direction = directions[Math.floor(Math.random()*directions.length)]
    ghost.timerId = setInterval(function() {
        if(!squares[ghost.currentIndex + direction].classList.contains("wall") &&
        !squares[ghost.currentIndex + direction].classList.contains("ghost")){
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
        } else direction = directions[Math.floor(Math.random()*directions.length)]
    console.log(ghost.isScared)
        // change ghost to scared ghost is scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            score += 100
            scoreDisplay.innerText = score
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            //add a score of 100
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
        checkForWin()
    }, ghost.speed )

}
ghosts.forEach(ghost => moveGhost(ghost))

//check for game over
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) {
     //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove eventlistener from our control function
    document.removeEventListener('keyup', control)
    //tell user the game is over   
    scoreDisplay.innerHTML = 'You LOSE!'
     }
}

function checkForWin(){
    if (score === 100){
         //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove eventlistener from our control function
        document.removeEventListener('keyup', control)
        //tell user the game is over   
        scoreDisplay.innerHTML = 'You WIN!'

    }
}
