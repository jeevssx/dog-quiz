import { getImage } from "./apiService";
/**
 * loop 4 times for images
 */
for (let i = 0; i < 4; i++) {
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
}