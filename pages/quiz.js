import { getImage, getBreedList } from "../apiService";

let breedsArray;
let breedsCache = new Set();
let currBreeds = new Set();
const numBreeds = 4;
let score = 0;

function updateScore() {
    document.getElementById('score').innerText = score;
}

function shuffleArray(array) {
    let new_array = new Set()
    while (new_array.size != array.length){
        let index = Math.floor(Math.random() * 4)
        if (!new_array.has(array[index])){
            new_array.add(array[index])
        }
    }
    return Array.from(new_array)
}

async function nextQuestion(){
    try {
        // reset currBreeds
        currBreeds.clear();

        // reload image
        const imgData = await getImage();
        const img = document.getElementsByClassName('image')[0];
        img.src = imgData.message;
        console.log(img)

        // get the breed of that dog
        let breed = imgData.message.split('/')[4];
        breedsCache.add(breed);
        currBreeds.add(breed);
        console.log('success')

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
            breedsCache.add(breed);
            currBreeds.add(breed);
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
        }

        // setting up the next question
        let temp = document.getElementById('test');
        test.onclick = nextQuestion;
    }
    catch (error) {
        console.error('Error setting up the quiz:', error);
    }
}

setupQuiz();