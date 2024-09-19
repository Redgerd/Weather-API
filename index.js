require("dotenv").config();
const axios = require("axios");
const express = require("express");
const rateLimit = require("express-rate-limit"); // Import express-rate-limit package
const app = express();
const port = 3000;

// Access environment variables
const apiKey = process.env.API_KEY;
const weatherApiUrl = process.env.weatherApiUrl;

// Define a rate limiting rule (e.g., 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to all API routes
app.use("/api/", limiter);

// Define a route for the weather API
app.get("/api/weather", async (req, res) => {
  const city = req.query.city; // Get the city from the query parameters
  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  try {
    const response = await axios.get(
      `${weatherApiUrl}?apikey=${apiKey}&q=${city}`
    );

    // Check if the response status code indicates success
    if (response.status === 200) {
      return res.json(response.data); // Send the weather data back to the client
    } else {
      return res.status(response.status).json({
        message: "Error fetching weather data",
        status: response.status,
      });
    }
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // The request was made, and the server responded with a non-2xx status code
      if (error.response.status === 404) {
        return res
          .status(404)
          .json({ message: "City not found. Please check the city name." });
      } else if (error.response.status >= 500) {
        return res.status(500).json({
          message:
            "Weather service is currently unavailable. Please try again later.",
        });
      } else {
        return res.status(error.response.status).json({
          message: "Error occurred with the weather service.",
          error: error.message,
        });
      }
    } else if (error.request) {
      // The request was made, but no response was received
      return res.status(503).json({
        message:
          "No response from the weather service. Please check your network or try again later.",
      });
    } else {
      // Something else happened in making the request
      return res.status(500).json({
        message: "An unexpected error occurred.",
        error: error.message,
      });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Weather API is running at http://localhost:${port}`);
});
