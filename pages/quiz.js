import { getImage, getBreedList, randomizeBreeds } from "../apiService";

let breedsArray;
let breedsCache = new Set();
let breedNumber;
getImage()
    .then(data => {
        const dataContainer = document.getElementsByClassName('incomplete')[0];
        const img = document.createElement('img');
        img.src = data.message;
        img.className = 'image';
        dataContainer.className = 'complete';
        dataContainer.innerHTML = '';
        dataContainer.appendChild(img);
    })
getBreedList()
    .then(data => {
        breedsArray = [];

        Object.keys(data.message).forEach(key => {
            // const subBreeds = data.message[key];
            breedsArray.push(key);
        });
        breedNumber = breedsArray.length;
    })
// incomplete
randomizeBreeds(breedsArray, breedsCache, breedNumber)
    .then(breeds => {
        // edit the buttons
        for (let i = 0; i < 4; i++) {
            let identifier = str(i).concat(" button");
            let obj = Document.getElementsByClassName(identifier)
            obj.innerHTML = breeds[i];
        }
    })