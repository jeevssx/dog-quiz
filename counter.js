export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => document.getElementById("img").src = "https://images.dog.ceo/breeds/kombai/Kombai-indian-Dog.jpg")
  setCounter(0)
}
