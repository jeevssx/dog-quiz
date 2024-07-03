import { getImage, getBreedList } from "./apiService";

let breedsArray;
let breedsCache = new Set();
let currBreeds = new Set();
const numBreeds = 4;
let score = 0;
let correctBreed;
let answered = false;

function updateScore() {
    document.getElementById('score').innerText = score;
}

function shuffleArray(array) {
    let new_array = new Set()
    while (new_array.size != array.length) {
        let index = Math.floor(Math.random() * 4)
        if (!new_array.has(array[index])) {
            new_array.add(array[index])
        }
    }
    return Array.from(new_array)
}



async function nextQuestion() {
    try {

        // reset
        currBreeds.clear();
        answered = false;
        hideCorrect();
        hideResetButton();

        // reload image
        const imgData = await getImage();
        const img = document.getElementsByClassName('image')[0];
        img.src = imgData.message;


        // get the breed of that dog
        let breed = imgData.message.split('/')[4];
        let subname = breed.split('-');
        if (subname.length > 1) {
            breed = subname[1] + ' ' + subname[0];
        }
        breedsCache.add(breed);
        currBreeds.add(breed);
        correctBreed = breed;

        // randomize breeds
        while (currBreeds.size < numBreeds) {
            let index = Math.floor(Math.random() * breedsArray.length);
            if (!breedsCache.has(breedsArray[index])) {
                currBreeds.add(breedsArray[index])
            }
        }

        let breeds = shuffleArray(Array.from(currBreeds));
        for (let i = 0; i < 4; i++) {
            let identifier = i.toString().concat(" button");
            let obj = document.getElementsByClassName(identifier)[0];
            obj.innerHTML = breeds[i];
        }
    }
    catch (error) {
        console.error('Error setting up the quiz:', error);
    }
}

async function setupQuiz() {
    try {

        hideResetButton();

        // get breedList
        const breedData = await getBreedList();
        breedsArray = Object.keys(breedData.message);

        // load image
        const imgData = await getImage();
        const dataContainer = document.getElementsByClassName('incomplete')[0];
        if (dataContainer) {
            const img = document.createElement('img');
            img.src = imgData.message;
            img.className = 'image';
            dataContainer.className = 'complete';
            dataContainer.innerHTML = '';
            dataContainer.appendChild(img);

            // get the breed of that dog
            let breed = imgData.message.split('/')[4];
            let subname = breed.split('-');
            if (subname.length > 1) {
                breed = subname[1] + ' ' + subname[0];
            }
            breedsCache.add(breed);
            currBreeds.add(breed);
            correctBreed = breed;
        }

        // randomize breeds
        while (currBreeds.size < numBreeds) {
            let index = Math.floor(Math.random() * breedsArray.length);
            if (!breedsCache.has(breedsArray[index])) {
                currBreeds.add(breedsArray[index])
            }
        }

        let breeds = shuffleArray(Array.from(currBreeds));
        for (let i = 0; i < 4; i++) {
            let identifier = i.toString().concat(" button");
            let obj = document.getElementsByClassName(identifier)[0];
            obj.innerHTML = breeds[i];
            //added for button on clicks
            obj.onclick = clickAnswer;
        }

        // setting up the next question
        let temp = document.getElementById('test');
        temp.onclick = nextQuestion;
    }
    catch (error) {
        console.error('Error setting up the quiz:', error);
    }
}

//check answer sees if correct prints to console updates score
function clickAnswer(event) {
    if (!answered) {
        const selectedBreed = event.target.innerHTML;
        if (selectedBreed === correctBreed) {
            score++;
            updateScore();
            answered = true;
        }
        showCorrect(event.target);

    }
}

// show image when clicked
function showCorrect(button) {
    if (button.innerHTML == correctBreed) {
        button.className = button.className + ' correct';
        showResetButton();
        answered = true;
    }
    else {
        button.className = button.className + ' incorrect';
    }
}

function hideCorrect() {
    for (let i = 0; i < 4; i++) {
        let button = document.getElementsByClassName("button " + i)[0];
        button.className = "button " + i;
    }
}

function showResetButton() {
    let resetButton = document.getElementById('test');
    resetButton.classList.remove('hidden');
}

function hideResetButton() {
    let resetButton = document.getElementById('test');
    resetButton.classList.add('hidden');
}

setupQuiz();