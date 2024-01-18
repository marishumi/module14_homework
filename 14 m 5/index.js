const inputPageNum = document.getElementById("num");
const inputLimit = document.getElementById("limit");
const submitButton = document.querySelector("button");
const photoContainer = document.querySelector("div");

submitButton.addEventListener("click", submitButtonHandle);

if (loadPhotosFromLocalStorage())
write = ("Загружены последние просмотренные фото.");

function submitButtonHandle() {
    const pageNum = inputPageNum.value;
    const limit = inputLimit.value;

    if ((pageNum < 1 || pageNum > 10 || isNaN(pageNum)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        photoContainer.innerHTML = ("Номер страницы и лимит вне диапазона от 1 до 10.");
        return;
    } else
    if (pageNum < 1 || pageNum> 10 || isNaN(pageNum)) {
        photoContainer.innerHTML = ("Номер страницы вне диапазона от 1 до 10.");
        return;
    } else
    if (limit < 1 || limit > 10 || isNaN(limit)) {
        photoContainer.innerHTML = ("Лимит вне диапазона от 1 до 10.");
        return;
    }

    photoContainer.innerHTML = ("Загружаю фото...");

    fetch(` https://jsonplaceholder.typicode.com/photos?_page=${pageNum}&_limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            loadPhotos(json);
            savePhotosToLocalStorage();
            photoContainer.innerHTML = ("Фото загружены.");
        })
        .catch((reason) => {
            photoContainer.innerHTML = ("Ошибка: " + reason);
        });

}

function write(text) {
    photoContainer.innerHTML = text;
}

function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.url}"
                                  
                                />
                                <p>${item.title}</p>
                              </div>`;
        cards += cardBlock;
    });

    photoContainer.innerHTML = cards;
}

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photo", photoContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
    photoContainer.innerHTML = localStorage.getItem("last_photo");
    return  photoContainer.innerHTML.length > 0;
}