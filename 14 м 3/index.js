function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
  
    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log("Статус ответа: ", xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
  
  
    xhr.send();
}

    const resultNode = document.querySelector('.j-result'); 
    const btnNode = document.querySelector('.j-btn-request');
  
  
  
  function displayResult(apiData) {
    console.log(apiData)
    let cards = "";
    apiData.forEach((item) => {
      const cardBlock = `
            <div class="card">
                <img class="card-image" src="${item.url}">
                <p>${item.title}</p>
            </div>
        `;
      cards += cardBlock;
    });
  
    resultNode.innerHTML = cards;
  }
  
  btnNode.addEventListener("click", () => {
    const input = document.querySelector('input');
     if ((Number(input.value) < 1) || (Number(input.value) > 10))
   {
      resultNode.innerHTML = "<p>число вне диапазона от 1 до 10</p>";
    } else {
      url = `https://jsonplaceholder.typicode.com/photos?_limit=${input.value}`;
      useRequest(url, displayResult);
    }
  });
  