const inputWidth = document.getElementById ("width");
const inputHeight = document.getElementById("height");
const submitButton = document.querySelector("button");
const photosContainer = document.getElementById("inner");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    const width = inputWidth.value;
    const height = inputHeight.value;

    if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
        photosContainer.innerHTML = ("Одно из чисел вне диапазона от 100 до 300.");
        return;
    }

    

    fetch(` https://dummyimage.com/${width}x${height}`)
        .then((response) => response.url)
        .then((result) => {
            loadPhoto(result);
            
        })
        .catch((reason) => {
            photosContainer.innerHTML = ("Ошибка: " + reason);
        });
}




function loadPhoto(photoUrl) {
    const cardBlock =   `<img
                          src="${photoUrl}"
                          />`;

    photosContainer.innerHTML = cardBlock;
}