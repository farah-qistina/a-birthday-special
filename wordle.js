const WORD = "waffle"; // The word to guess
const ROWS = 5; // Number of attempts
const COLUMNS = WORD.length; // Length of the word

let currentRow = 0;
let currentCol = 0;

const grid = document.querySelector(".grid");
const keyboard = document.querySelector(".keyboard");

// Initialize the grid
for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", r);
        cell.setAttribute("data-col", c);
        grid.appendChild(cell);
    }
}

// Initialize the keyboard in QWERTY layout
const LAYOUT = [
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm",
];

LAYOUT.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.split("").forEach((key) => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("key");
        keyElement.textContent = key;
        keyElement.addEventListener("click", () => handleKeyPress(key));
        rowElement.appendChild(keyElement);
    });
    keyboard.appendChild(rowElement);
});

// Handle key presses
function handleKeyPress(key) {
    if (currentCol < COLUMNS && currentRow < ROWS) {
        const cell = document.querySelector(
            `.cell[data-row="${currentRow}"][data-col="${currentCol}"]`
        );
        cell.textContent = key;
        currentCol++;
    }
}

// Handle Enter and Backspace
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkRow();
    } else if (event.key === "Backspace") {
        deleteLetter();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toLowerCase());
    }
});

function checkRow() {
    if (currentCol < COLUMNS) return; // Ensure the row is full

    const guess = Array.from(
        document.querySelectorAll(`.cell[data-row="${currentRow}"]`)
    )
        .map((cell) => cell.textContent)
        .join("")
        .toLowerCase();

    const keyElements = document.querySelectorAll(".key");

    guess.split("").forEach((char, index) => {
        const cell = document.querySelector(
            `.cell[data-row="${currentRow}"][data-col="${index}"]`
        );
        if (WORD[index] === char) {
            cell.classList.add("correct");
            keyElements.forEach((key) => {
                if (key.textContent === char) key.classList.add("correct");
            });
        } else if (WORD.includes(char)) {
            cell.classList.add("misplaced");
            keyElements.forEach((key) => {
                if (key.textContent === char && !key.classList.contains("correct"))
                    key.classList.add("misplaced");
            });
        } else {
            cell.classList.add("wrong");
            keyElements.forEach((key) => {
                if (key.textContent === char) key.classList.add("wrong");
            });
        }
    });

    if (guess === WORD) {
        setTimeout(() => {
            window.location.href = "goodjob.html"; // Redirect to the success page
        }, 1000); // Add a slight delay before redirecting
        return;
    }

    currentRow++;
    currentCol = 0;

    if (currentRow === ROWS) {
        setTimeout(() => {
            window.location.href = "ohno.html"; // Redirect to the failure page
        }, 1000); // Add a slight delay before redirecting
    }
}

function deleteLetter() {
    if (currentCol > 0) {
        currentCol--;
        const cell = document.querySelector(
            `.cell[data-row="${currentRow}"][data-col="${currentCol}"]`
        );
        cell.textContent = "";
    }
}
