// this reads which difficulty button is chosen
const difficulty = document.querySelectorAll('input');

for(let i of difficulty) {
    i.addEventListener('click', (e) => {
        createBoard(randomCards(e.target.value));
        }
    )
};

// this will shuffle array so they don't repeat in an obvious pattern
const shuffle = (array) => {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

// this creates random numbers array which are to be used for generating robots
const randomCards = (howMany) => {
    let numbers = [];
    let randomNumber = Math.floor(Math.random() * 101);
    for (let i = 0; i < howMany; i++) {
        numbers.push(i + randomNumber + 5);
    }

    numbers.map(el => numbers.push(el));

    return shuffle(numbers);
};

//this gets id of card images
let getCardId = [];
let classCounter = 0;
// this compares if two of the same are found and deals with it
const getIds = (e) => {
    let cardContainers = document.querySelectorAll('TD');

    e.target.classList.add('clicked');

    getCardId.push(e.target.id);

    if (getCardId.length == 2 && getCardId[0] != getCardId[1]) {
        setTimeout(() => {
            getCardId = [];
            cardContainers.forEach(el => el.classList.remove('clicked'))
        }, 500); 
    } else if ( getCardId.length == 2 && getCardId[0] == getCardId[1]) {
        setTimeout(() => {
            getCardId = [];
            cardContainers.forEach(el => {
                if (el.classList == 'clicked') {
                    el.classList.add('solved');
                    classCounter++;
                    el.classList.remove('clicked');
                }
                if ( classCounter == cardContainers.length) {
                    playboard.innerHTML = 'well done';
                }
            }) 
        }, 500); 
    }
};

// this creates playboard table
const playboard = document.querySelector('.playboard');

const createBoard = (array) => {
    playboard.innerHTML = '';
    let table = document.createElement('TABLE');
    playboard.appendChild(table);
    for (let i = 0; i < array.length; i++) {
        let td = document.createElement('TD');
        let img = document.createElement('IMG');
        img.src = `https://robohash.org/${ array[i] }?size=120x120`; 
        td.id = array[i];
        td.appendChild(img);
        td.addEventListener('click', getIds);
        table.appendChild(td);
    }  
};



 
