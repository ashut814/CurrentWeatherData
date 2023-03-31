const cities = ["Mumbai", "Delhi", "Lucknow", "Bengaluru", "Hyderabad","Indore","Patna"];
const tableBody = document.getElementById("weather-data");
const showSkeleton = () => {
  for (let i = 0; i < cities.length; i++) {
    const tableRow = document.createElement("tr");
    tableRow.classList.add("skeleton-line");
    tableRow.innerHTML = `
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    `;
    tableBody.appendChild(tableRow);
  }
};

const hideSkeleton = () => {
  const skeletonRows = document.querySelectorAll(".skeleton-line");
  skeletonRows.forEach((row) => row.remove());
};

const getWeatherData = async (city) => {
  let data = null;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f457b5ce872a3e9e47332937d42392af&units=metric`
    );
    if (response.ok) {
      data = await response.json();
    }
  } catch (err) {
    console.log(err);
  }
  return data;
};


const insertRow = (rowData) => {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${rowData.name}</td>
    <td>${rowData.main.temp}&deg;C</td>
    <td>${rowData.weather[0].description}</td>
    <td>${rowData.wind.speed} m/s</td>
    <td>${rowData.main.humidity}%</td>
  `;
  tableBody.appendChild(tableRow);
};

const populateTable = (data) => {
  data.forEach((rowData) => {
    insertRow(rowData);
  });
};

const getCitiesWeatherData = async () => {
  showSkeleton();
  const weatherData = [];
  for (const city of cities) {
    const data = await getWeatherData(city);
    if (data != null) {
      weatherData.push(data);
    }
  }
    if (weatherData.length > 0) {
      hideSkeleton();
      populateTable(weatherData);
    } else {
     const tableHeader = document.getElementsByTagName("thead")[0];
     tableHeader.style.display = "none";
     const errorMessage = document.getElementById("error-message");
     errorMessage.innerText = "Weather data cannot be acquired.";
     errorMessage.style.display = "block";
     hideSkeleton();
    }
};

window.addEventListener("load", getCitiesWeatherData());



