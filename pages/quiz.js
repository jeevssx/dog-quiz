import { getImage, getBreedList } from "../apiService";



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
        
    })