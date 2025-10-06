const searchBox = document.getElementById("searchCity")
const submit = document.getElementById("searchBtn")
const locationTag = document.getElementById("location")
const locationTemp = document.getElementById("locationTemp")
let locations = "";

const forecasted = async function getForecast(locations){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locations}/?key=LC9P9NEQJ2XQBBM4HXGWW3PQN`
    const response = await fetch(url)
    if(!response.ok) throw new Error("failed to fetch weather data");
    const data = await response.json();
    return (data.currentConditions.temp)
}

function renderLocation(locations,temp){
    locationTag.textContent = `Location: ${locations}`;
    locationTemp.textContent = "Temp:" + temp;
}

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const locations = searchBox.value.trim();
  if(!location) return alert("Please enter a location")

    try{
        const temp = await forecasted(locations);
        renderLocation(locations, temp);
    }catch(err){
        locationTag.textContent = "Error fetching weather data.";
        locationTemp.textContent = "";
    }
});


