const cities = ["Mumbai", "Delhi", "Lucknow", "Bengaluru", "Hyderabad"];
const tableBody = document.getElementById("weather-data");

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f457b5ce872a3e9e47332937d42392af&units=metric`
  );
  const data = await response.json();
  return data;
};

const skeleton = document.getElementsByClassName(".skeleton-line");
for (let i = 1; i < cities.length; i++){
  tableBody.append(skeleton.content.cloneNode(true));
}

// Function to populate table with weather data for a given city
const populateTable = (data) => {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${data.name}</td>
    <td>${data.main.temp}&deg;C</td>
    <td>${data.weather[0].description}</td>
    <td>${data.wind.speed} m/s</td>
    <td>${data.main.humidity}%</td>
  `;
  tableBody.appendChild(tableRow);
};

// Function to fetch weather data for all cities in the 'cities' array and populate the table
const getCitiesWeatherData = async () => {
  for (const city of cities) {
    const data = await getWeatherData(city);
    populateTable(data);
  }
  tableBody.innerHTML = "";
};

// Call the 'getCitiesWeatherData' function to populate the table with weather data for all cities
getCitiesWeatherData();
