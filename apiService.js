/**
 * gets JSON Obj
 * @returns a JSON object with message for link for image as wel as status of the request
 */
export async function getImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    console.log(data)
    return data;
}

export async function getBreedList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    const breedsArray = [];

    Object.keys(data.message).forEach(key => {
        const subBreeds = data.message[key];
        
        if (subBreeds.length > 0) {
            breedsArray.push(key);
            subBreeds.forEach(subBreed => {
                breedsArray.push(`${key}-${subBreed}`);
            });
        }
        else {
            breedsArray.push(key);
        }
    });

    return breedsArray;
}