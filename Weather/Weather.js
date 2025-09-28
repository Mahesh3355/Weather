const apiKey = "4eb3703790b356562054106543b748b2";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
const placeholder = document.querySelector(".Search-Bar");

// Global variables for unit conversion
let currentUnit = "celsius";
let currentWeatherData = null;
const rest = () => {
  if (placeholder.value == "") {
    document.querySelector(".weather").style.display = "none";
  }
};
// Unit conversion functions
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function convertTemperature(temp, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temp;
  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    return celsiusToFahrenheit(temp);
  }
  if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    return fahrenheitToCelsius(temp);
  }
  return temp;
}

// Weather background control function
function setWeatherBackground(weatherMain) {
  // Remove all weather background classes
  document.body.classList.remove(
    "weather-clear",
    "weather-cloudy",
    "weather-rainy",
    "weather-snowy",
    "weather-stormy"
  );

  // Hide all weather elements initially
  const weatherElements = document.querySelectorAll(
    ".weather-clouds, .weather-rain, .weather-snow, .weather-sun"
  );
  weatherElements.forEach((el) => (el.style.display = "none"));

  // Show appropriate weather elements based on condition
  switch (weatherMain.toLowerCase()) {
    case "clear":
      document.body.classList.add("weather-clear");
      document.querySelector(".weather-sun").style.display = "block";
      break;
    case "clouds":
    case "mist":
    case "fog":
    case "haze":
      document.body.classList.add("weather-cloudy");
      document.querySelector(".weather-clouds").style.display = "block";
      break;
    case "rain":
    case "drizzle":
    case "thunderstorm":
      document.body.classList.add("weather-rainy");
      document.querySelector(".weather-rain").style.display = "block";
      document.querySelector(".weather-clouds").style.display = "block";
      break;
    case "snow":
      document.body.classList.add("weather-snowy");
      document.querySelector(".weather-snow").style.display = "block";
      document.querySelector(".weather-clouds").style.display = "block";
      break;
    default:
      document.body.classList.add("weather-clear");
      document.querySelector(".weather-sun").style.display = "block";
  }
}

// Enhanced weather display function
function displayWeather(data) {
  currentWeatherData = data;
  document.querySelector(".city").innerHTML = data.name;

  // Temperature with unit conversion
  const temp =
    currentUnit === "celsius"
      ? Math.round(data.main.temp)
      : celsiusToFahrenheit(data.main.temp);
  const unitSymbol = currentUnit === "celsius" ? "°C" : "°F";
  document.querySelector(".temp").innerHTML = temp + unitSymbol;

  // Humidity
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

  // Wind speed with unit conversion
  const windSpeed =
    currentUnit === "celsius"
      ? data.wind.speed
      : (data.wind.speed * 2.237).toFixed(1);
  const windUnit = currentUnit === "celsius" ? "km/h" : "mph";
  document.querySelector(".wind").innerHTML = windSpeed + windUnit;

  // Feels like temperature
  const feelsLike =
    currentUnit === "celsius"
      ? Math.round(data.main.feels_like)
      : celsiusToFahrenheit(data.main.feels_like);
  const feelsLikeUnit = currentUnit === "celsius" ? "°C" : "°F";
  document.querySelector(
    ".feels-like"
  ).innerHTML = `Feels like ${feelsLike}${feelsLikeUnit}`;

  // Atmospheric pressure
  document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

  // Enhanced weather icon mapping for better coverage
  const weatherConditions = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Snow: "images/snow.png",
    Thunderstorm: "images/rain.png",
    Fog: "images/mist.png",
    Haze: "images/mist.png",
    Smoke: "images/mist.png",
    Dust: "images/mist.png",
    Sand: "images/mist.png",
    Ash: "images/mist.png",
    Squall: "images/rain.png",
    Tornado: "images/rain.png",
  };

  const weatherMain = data.weather[0].main;
  weathericon.src = weatherConditions[weatherMain] || "images/clear.png";

  // Set weather background animations
  setWeatherBackground(weatherMain);

  document.querySelector(".weather").style.display = "block";
}

// Enhanced error handling
function showError(message) {
  const errorDiv = document.querySelector(".error-message") || createErrorDiv();
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  document.querySelector(".weather").style.display = "none";

  // Auto-hide error after 5 seconds
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

function createErrorDiv() {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.cssText = `
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
        padding: 10px;
        border-radius: 10px;
        margin: 10px 0;
        display: none;
        font-size: 14px;
    `;
  document
    .querySelector(".card")
    .insertBefore(errorDiv, document.querySelector(".weather"));
  return errorDiv;
}

async function checkWeather(city) {
  // Input validation
  if (!city || city.trim() === "") {
    showError("Please enter a city name");
    return;
  }

  // Show loading state
  const loadingDiv = document.querySelector(".loading") || createLoadingDiv();
  loadingDiv.style.display = "block";
  document.querySelector(".weather").style.display = "none";

  try {
    const response = await fetch(apiurl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      showError("City not found. Please check the spelling and try again.");
    } else if (response.status === 401) {
      showError("API key error. Please try again later.");
    } else if (!response.ok) {
      showError("Unable to fetch weather data. Please try again.");
    } else {
      const data = await response.json();
      displayWeather(data);
    }
  } catch (error) {
    showError("Network error. Please check your internet connection.");
  } finally {
    loadingDiv.style.display = "none";
  }
}

function createLoadingDiv() {
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading";
  loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading weather data...</p>
    `;
  loadingDiv.style.cssText = `
        text-align: center;
        padding: 20px;
        display: none;
    `;
  document
    .querySelector(".card")
    .insertBefore(loadingDiv, document.querySelector(".weather"));
  return loadingDiv;
}
// Unit conversion toggle function
function toggleUnit() {
  currentUnit = currentUnit === "celsius" ? "fahrenheit" : "celsius";
  if (currentWeatherData) {
    displayWeather(currentWeatherData);
  }
}

// Enhanced search functionality with Enter key support
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

// Enhanced input validation and autocomplete suggestions
searchBox.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (value.length > 0) {
    // Enhanced input validation - allow letters, spaces, hyphens, and apostrophes
    e.target.value = value.replace(/[^a-zA-Z\s\-']/g, "");

    // Auto-capitalize first letter of each word
    e.target.value = e.target.value.replace(/\b\w/g, (l) => l.toUpperCase());
  }
});

// Add focus and blur effects for better UX
searchBox.addEventListener("focus", (e) => {
  e.target.style.transform = "scale(1.02)";
  e.target.style.boxShadow = "0 0 20px rgba(0, 254, 186, 0.3)";
});

searchBox.addEventListener("blur", (e) => {
  e.target.style.transform = "scale(1)";
  e.target.style.boxShadow = "none";
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// Mouse interaction with floating elements
document.addEventListener("mousemove", (e) => {
  const weatherElements = document.querySelector(".weather-elements");
  if (weatherElements) {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;

    weatherElements.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Add parallax effect to floating elements
document.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const weatherElements = document.querySelector(".weather-elements");
  if (weatherElements) {
    weatherElements.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add random floating weather icons
function createFloatingIcon() {
  const icons = ["🌡️", "💨", "🌤️", "🌦️", "⛅", "🌧️", "❄️", "⛈️"];
  const icon = document.createElement("div");
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];
  icon.style.cssText = `
    position: fixed;
    top: 100vh;
    left: ${Math.random() * 100}vw;
    font-size: ${Math.random() * 20 + 15}px;
    pointer-events: none;
    z-index: -1;
    opacity: 0.6;
    animation: floatUp ${Math.random() * 10 + 10}s linear forwards;
  `;

  document.body.appendChild(icon);

  setTimeout(() => {
    icon.remove();
  }, 15000);
}

// Create floating icons periodically
setInterval(createFloatingIcon, 3000);

// Add CSS for floating icon animation
const style = document.createElement("style");
style.textContent = `
  @keyframes floatUp {
    0% { 
      transform: translateY(0) rotate(0deg); 
      opacity: 0.6;
    }
    100% { 
      transform: translateY(-100vh) rotate(360deg); 
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize app
rest();
