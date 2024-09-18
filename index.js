const express = require("express");
const app = express();
const port = 3000;

// Hardcoded weather response
const weatherData = {
  city: "New York",
  temperature: "22°C",
  description: "Sunny",
  humidity: "50%",
  wind_speed: "15 km/h",
};

// Define a route for the weather API
app.get("/api/weather", (req, res) => {
  res.json(weatherData);
});

// Start the server
app.listen(port, () => {
  console.log(`Weather API is running at http://localhost:${port}`);
});
