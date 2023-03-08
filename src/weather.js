const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");

        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        div.setAttribute("id", "conditions");
        let country = document.createElement("h1");
        let countryNode = document.createTextNode(data.sys.country);
        country.appendChild(countryNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("\t"+(data.main.temp - 273.15).toFixed(1) + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("\t"+data.weather[0].description);
        desc.appendChild(descNode);

        let humidity = document.createElement("div");
        let humiNode = document.createTextNode("\tHumidity : "+data.main.humidity + " %");
        humidity.appendChild(humiNode);

        let wind = document.createElement("div");
        let windNode = document.createTextNode("\tWind Speed : "+data.wind.speed + " m/s");
        wind.appendChild(windNode);

        let tempmin = document.createElement("div");
        let tempminNode = document.createTextNode("\tMinimum temperature : "+(data.main.temp_min - 273.15).toFixed(1) + " °C ");
        tempmin.appendChild(tempminNode);

        let tempmax = document.createElement("div");
        let tempmaxNode = document.createTextNode("\tMaximum temperature : "+(data.main.temp_max - 273.15).toFixed(1) + " °C ");
        tempmax.appendChild(tempmaxNode);

        div.appendChild(city);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(humidity);
        div.appendChild(wind);
        div.appendChild(tempmin);
        div.appendChild(tempmax);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))
}

document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})