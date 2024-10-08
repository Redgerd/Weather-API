# Weather-API
In this project, instead of relying on our own weather data, we will build a weather API that fetches and returns weather data from a 3rd party API. This project will help you understand how to work with 3rd party APIs, caching, and environment variables.
![weather-api-f8i1q](https://github.com/user-attachments/assets/982cdb7c-261b-462b-9a07-f7169ceaf42a)
The idea for this project was taken from [roadmap.sh](https://roadmap.sh). You can find more details about the original project [here](https://roadmap.sh/projects/weather-api-wrapper-service).

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your `.env` file with your API key and weather API URL:

```bash
API_KEY=your_api_key_here
weatherApiUrl=https://api.weatherapi.com/v1/current.json
