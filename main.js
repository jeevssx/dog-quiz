// fetch('https://dog.ceo/api/breeds/image/random')
//     .then(response => response.json())
//     .then(data => {
//         const dataContainer = document.getElementsByClassName('incomplete')[0];
//         const img = document.createElement('img');
//         img.src = data.message;
//         dataContainer.className = 'complete';
//         dataContainer.innerHTML = '';
//         dataContainer.appendChild(img);
//     })
//     .then(response => response.json())
//     .then(data => {
//         const dataContainer = document.getElementsByClassName('incomplete')[0];
//         const img = document.createElement('img');
//         img.src = data.message;
//         dataContainer.className = 'complete';
//         dataContainer.innerHTML = '';
//         dataContainer.appendChild(img);
//     })

async function getImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data;
}
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