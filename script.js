const MATRIX_SIZE = {
    row: 10,
    col: 10
};
const GAME_CONFIG = {
    speed: 1500,
    positive_points: 1000,
    negative_points: 500
};
const GAME_ACTOR = {
    curr_col: 5
};

let container = document.querySelector('.container');
let matrix = [];

// IIFE za init matrice
(function () {
    for (let i = 0; i < MATRIX_SIZE.row; i++) {
        let row = [];
        let rowHTML = document.createElement('div');
        rowHTML.className = 'row';

        for (let j = 0; j < MATRIX_SIZE.col; j++) {
            let el = document.createElement('div');
            el.className = 'field';
            row[j] = el;
            rowHTML.insertAdjacentElement("beforeend", el);
        }

        matrix[i] = row;
        container.insertAdjacentElement("beforeend", rowHTML);
    }
})();

// Pomera jedan element dole
function moveElDown(row, col) {
    if (row < MATRIX_SIZE.row - 2) {
        matrix[row][col].classList.remove('fill');
        matrix[row + 1][col].classList.add('fill');
    }
}

function checkColliders(row, col) {
    if (row == MATRIX_SIZE.row - 2) {
        let pointsEl = document.querySelector('#points');

        if (matrix[row + 1][col].classList.contains('actor')) {
            let points = parseInt(pointsEl.innerHTML) + GAME_CONFIG.positive_points;
            pointsEl.innerHTML = points;
        } else {
            let points = parseInt(pointsEl.innerHTML) - GAME_CONFIG.negative_points;
            pointsEl.innerHTML = points;
        }
        matrix[row][col].classList.remove('fill');
    }
}

// Prolazi kroz aktivne elemente i spusta ih za jedno polje dole
function updateMatrix() {
    for (let i = MATRIX_SIZE.row - 1; i >= 0; i--) {
        for (let j = 0; j < MATRIX_SIZE.col; j++) {
            if (matrix[i][j].classList.contains('fill')) {
                moveElDown(i, j);
                checkColliders(i, j);
            }
        }
    }
}

// Random stvaranje na vrhu 
setInterval(function () {
    let num = Math.floor(Math.random() * MATRIX_SIZE.col);
    matrix[0][num].classList.add('fill');
}, GAME_CONFIG.speed);

setInterval(updateMatrix, GAME_CONFIG.speed / 2);

function actorReRender() {
    for (let i = 0; i < MATRIX_SIZE.col; i++) {
        matrix[MATRIX_SIZE.row - 1][i].classList.remove('actor');
    }
    matrix[MATRIX_SIZE.row - 1][GAME_ACTOR.curr_col].classList.add('actor');
}

// Init aktora
(function () {
    matrix[MATRIX_SIZE.row - 1][GAME_ACTOR.curr_col].classList.add('actor');

    document.addEventListener('keydown', function (e) {
        if (e.keyCode < 37 || e.keyCode > 40) return;

        if (e.keyCode == 37 && GAME_ACTOR.curr_col > 0) {
            GAME_ACTOR.curr_col--;
        }
        if (e.keyCode == 39 && GAME_ACTOR.curr_col < MATRIX_SIZE.col - 1) {
            GAME_ACTOR.curr_col++;
        }
        actorReRender();
    });
})();

// Button listeners
(function () {
    let btnLeft = document.querySelector('#left');
    let btnRight = document.querySelector('#right');

    btnLeft.addEventListener('click', function () {
        if (GAME_ACTOR.curr_col > 0)
            GAME_ACTOR.curr_col--;
        actorReRender();
    });

    btnRight.addEventListener('click', function () {
        if (GAME_ACTOR.curr_col < MATRIX_SIZE.col - 1)
            GAME_ACTOR.curr_col++;
        actorReRender();
    });

})();
