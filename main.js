/**
 * gets JSON Obj
 * @returns a JSON object with message for link for image as wel as status of the request
 */
export async function getImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data;
    
}
/**
 * loop 4 times for images
 */
for (i = 0; i < 4; i++) {
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