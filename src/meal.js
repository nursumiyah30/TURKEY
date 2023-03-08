const data_container = document.getElementById("data");
const keyword = document.getElementById("keyword");
let appendString = "No Data Found";
let api_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

console.log("KEYWORD VALUE : ", keyword.value);
keyword.addEventListener("keyup", function (event) {
  // clear the previously added data.
  data_container.innerHTML = "";

  // check for `ENTER` key.
  if (event.keyCode === 13) {
    api_url += keyword.value;
    fetchData();
  }
});

function fetchData() {
  let request = new XMLHttpRequest();
  request.open("GET", api_url);
  request.send();
  request.onload = () => {
    console.log("REQUEST: ", request);

    if (request.status == 200) {
      console.log("RAW JSON: ", JSON.parse(request.response));
      let json = JSON.parse(request.response);

      for (let i = 0; i < json.meals.length; i++) {
        let obj = json.meals[i];
        console.log("JSON OBJECT: ", obj.idMeal);

        // as per themealdb apis doc, we will always receive 20 keys for ingredient and quantity.
        let ingredients = [];
        for (let j = 1; j <= 20; j++) {
          if (obj["strIngredient" + j]) {
            ingredients.push(
              `${obj[`strIngredient${j}`]} - ${obj[`strMeasure${j}`]}`
            );
          } else {
            break;
          }
        }
        console.log("INGREDIENTS : ", ingredients);

        appendString = `<div class="card">
            <div class="text">
                <center>
                    <h2><b>${obj.strMeal}</b></h2>
                    <div class="row">
                        <div class="col-4">
                            <h4><b>Area:</b></h4>
                            <p>${obj.strArea}</p>
                        </div>
                        <div class="col-4">
                            <h4><b>Category:</b></h4>
                            <p>${obj.strCategory}</p>
                        </div>
                        <div class="col-4">
                            <h4><b>Tags:</b></h4>
                            <p>${obj.strTags}</p>
                        </div>
                    </div>
                </center>

                <div class="row1">
                    <div class="col-6-1">
                        <h4><b>Procedure:</b></h4>
                        <p style="text-align: justify;">${obj.strInstructions}</p>
                    </div>
                    <div class="col-6-1">
                        <h4><b>Ingredients:</b></h4>
                        <ul>${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}</ul>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <h4><b>Image:</b></h4>
                        <p>
                            <img src="${obj.strMealThumb}" alt="${obj.strMeal}" 
                                    style="height: 500px; width: 100%;">
                        </p>
                    </div>

                    <div class="col-6">
                        <h4><b>Video:</b></h4>
                        <p>
                            <iframe src="https://www.youtube.com/embed/${obj.strYoutube.slice(-11)}" 
                                    title="${obj.strMeal}" frameborder="0" allowfullscreen
                                    style="height: 500px; width: 100%;"></iframe>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;

        data_container.innerHTML += appendString;
      }
    } else {
      console.log(`ERROR: ${request.status} ${request.statusText}`);
    }
  };
}
