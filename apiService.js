/**
 * gets JSON Obj
 * @returns a JSON object with message for link for image as wel as status of the request
 */
export async function getImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data;
}
export async function getImageByDoggo(doggo) {
    const response = await fetch(`https://dog.ceo.api/breed/${doggo}/images`);
    const data = await response.json();
    /**
     * returns images of all of a breed and subreeed
     */
    return data;
}

export async function getBreedList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    return data;
}