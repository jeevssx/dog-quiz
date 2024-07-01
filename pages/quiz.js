import { getImage, getBreedList } from "../apiService";

let breedsArray;
let breedsCache = new Set();
let currBreeds = new Set();
const numBreeds = 4;
let score = 0;

function updateScore() {
    document.getElementById('score').innerText = score;
}

async function setupQuiz() {
    try {
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

        // get breedList
        const breedData = await getBreedList();
        breedsArray = Object.keys(breedData.message);

        // randomize breeds
        while (currBreeds.size < numBreeds) {
            let index = Math.floor(Math.random() * breedsArray.length);
            if (!breedsCache.has(breedsArray[index])) {
                currBreeds.add(breedsArray[index])
            }
        }

        let breeds = Array.from(currBreeds).sort(() => 0.5 - Math.random());

        for (let i = 0; i < 4; i++) {
            let identifier = i.toString().concat(" button");
            let obj = document.getElementsByClassName(identifier)[0];
            
            let breeds = Array.from(currBreeds);
            obj.innerHTML = breeds[i];
            
        }
    }
    catch (error) {
        console.error('Error setting up the quiz:', error);
    }
}

setupQuiz();