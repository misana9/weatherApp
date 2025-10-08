import './styles.css'

const searchBox = document.getElementById("searchCity")
const submit = document.getElementById("searchBtn")
const locationTag = document.getElementById("location")
const locationCondition = document.getElementById("locationCondition")
const locationTemp = document.getElementById("locationTemp")
const locationHumidity = document.getElementById("locationHumidity")
const loading = document.getElementById("loading")
const forecastBox = document.getElementById("forecastBox")

const forecasted = async function getForecast(locations){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locations}/?key=LC9P9NEQJ2XQBBM4HXGWW3PQN`
    const response = await fetch(url)
    if(!response.ok) throw new Error("failed to fetch weather data");
    const data = await response.json();
    return (data)
}

function renderLocation(locations,temp,condition,humidity){
    forecastBox.style.display = "flex";
    locationTag.textContent = `Location: ${locations}`;
    locationCondition.textContent = "Condition: " + condition
    locationTemp.textContent = "Temp: " + temp;
    locationHumidity.textContent = "Humidity: " + humidity
}

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const locations = searchBox.value.trim();
  if(!locations) return alert("Please enter a location")

    try{
        loading.style.display = "block";
        const forecast = await forecasted(locations);
        console.log(forecast)
        renderLocation(forecast.resolvedAddress,forecast.currentConditions.temp,forecast.currentConditions.conditions,forecast.currentConditions.humidity);
        
    }catch(err){
        renderLocation("Error","Error","Error","Error")
    }finally{
        loading.style.display = "none";
    }
});


