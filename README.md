# Weather App

A simple and responsive weather application that provides real-time weather information for cities around the world.

## 🌐 Live Demo

**Try the app live:** [Weather App Demo](https://weather-maheshs-projects-d7b3362c.vercel.app/)

---

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Visual Weather Icons**: Dynamic weather icons that change based on conditions
- **Key Weather Metrics**:
  - Temperature (in Celsius)
  - Humidity percentage
  - Wind speed (km/h)
- **User-friendly Interface**: Clean, modern UI with intuitive search functionality

## 🛠️ Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **OpenWeatherMap API**: Weather data source

## 📁 Project Structure

```
Main-Projects/
├── index.html          # Main HTML file
├── Weather.css         # Stylesheet
├── Weather.js          # JavaScript functionality
├── images/             # Weather icons and assets
│   ├── clear.png
│   ├── clouds.png
│   ├── drizzle.png
│   ├── humidity.png
│   ├── mist.png
│   ├── rain.png
│   ├── search.png
│   ├── snow.png
│   └── wind.png
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start searching for weather information!

### Usage

1. **Search for a City**: Type the name of any city in the search bar
2. **Get Weather Info**: Click the search button or press Enter
3. **View Results**: The app will display:
   - Current temperature
   - City name
   - Weather condition with icon
   - Humidity level
   - Wind speed

## 🔧 API Configuration

The app uses the OpenWeatherMap API. If you want to use your own API key:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Replace the `apiKey` variable in `Weather.js` with your key

```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

## 🎨 Customization

### Adding New Weather Conditions

To add support for additional weather conditions:

1. Add the corresponding weather icon to the `images/` folder
2. Update the weather condition logic in `Weather.js`:

```javascript
else if (data.weather[0].main == "YourWeatherType") {
    weathericon.src = "images/your-weather-icon.png"
}
```

### Styling Changes

Modify `Weather.css` to customize the appearance:

- Colors and themes
- Layout and spacing
- Responsive breakpoints
- Typography

## 🌐 Supported Weather Conditions

- ☀️ Clear
- ☁️ Clouds
- 🌧️ Rain
- 🌦️ Drizzle
- 🌫️ Mist
- ❄️ Snow

## 📱 Responsive Design

The app is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🤝 Contributing

Feel free to contribute to this project by:

- Reporting bugs
- Suggesting new features
- Improving the UI/UX
- Adding new weather conditions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- Weather icons and assets
- The open-source community for inspiration and resources

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the browser console for error messages
2. Ensure you have a stable internet connection
3. Verify the city name is spelled correctly

---

**Happy Weather Tracking! 🌤️**
