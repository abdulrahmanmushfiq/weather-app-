const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Show initial message
window.addEventListener('load', () => {
    weather_body.style.display = 'flex';
    location_not_found.style.display = 'none';
});

async function checkWeather(city) {
    // Validate input
    if (!city || city.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    // Use environment variable or a more secure way to store API key
    const api_key = "4cd0eee81294c867b4bc4cfc64e998c5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.error("Location not found:", city);
            return;
        }

        console.log("Weather data loaded successfully");
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Update temperature with proper formatting
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed.toFixed(1)} Km/H`;

        // Update weather image based on condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "cloud.png";
                break;
            case 'Clear':
                weather_img.src = "clear.png";
                break;
            case 'Rain':
            case 'Drizzle':
                weather_img.src = "rain.png";
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                weather_img.src = "mist.png";
                break;
            case 'Snow':
                weather_img.src = "snow.png";
                break;
            case 'Thunderstorm':
                weather_img.src = "rain.png"; // or create thunderstorm.png
                break;
            default:
                weather_img.src = "cloud.png";
        }

        console.log(weather_data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

// Search button click event
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Press Enter key in input field
inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});