let boxes = document.querySelectorAll('.cell');
let reset = document.querySelector('.reset');
let newGameBtn = document.querySelector('#new-btn');
let newContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn0 = true;   // true for O turn, false for X turn

let winCombos = [           // wining combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {             // reset the game to initial state
    turn0 = true;
    enableBoxes();
    newContainer.classList.add("hide");        // hide the winner message
};

boxes.forEach((cell) => {                         // add click event to each box
    cell.addEventListener("click", () => {
        if (turn0) {     // turn for O player
            cell.innerText = "O";
            turn0 = false;
        } else {         // turn for X player
            cell.innerText = "X";
            turn0 = true;
        }
        cell.disabled = true;  // disable the box after click

        checkWin();  // check for win after every turn
    });
});

const enableBoxes = () => {                  // enable all boxes and clear text
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {                               // display winner message
    msg.innerText = `Congratulation, Winner is: ${winner}`;
    newContainer.classList.remove("hide");
    for(let box of boxes){                          // disable all boxes after win
        box.disabled = true;
    }
};

const checkWin = () => {                                      // check for wining combination
    for (let combo of winCombos) {

        let pos1Val = boxes[combo[0]].innerText;
        let pos2Val = boxes[combo[1]].innerText;
        let pos3Val = boxes[combo[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

reset.addEventListener("click", resetGame);              // reset button functionality
newGameBtn.addEventListener("click", resetGame);         // new game button functionality