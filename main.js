fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById('data-container');
        const img = document.createElement('img');
        img.src = data.message;
        dataContainer.innerHTML = '';
        dataContainer.appendChild(img);
    })