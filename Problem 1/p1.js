document.getElementById('weatherForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const city = document.getElementById('cityInput').value.trim();
  
  if (city === '') {
      alert('Please enter a city name');
      return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=b1080008513c40aa9ba64524242803&q=${city}`)
      .then(response => response.json())
      .then(data => {
        // Disply weather info
          const currentWeather = `
              Current Weather in ${data.location.name}, ${data.location.country}:<br>
              Temperature: ${data.current.temp_c}°C<br>
              Condition: ${data.current.condition.text}<br>
              Humidity: ${data.current.humidity}%
          `;
          document.getElementById('currentWeather').innerHTML = currentWeather;
      })
      .catch(error => {
          console.error('Error fetching current weather:', error);
      });

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=b1080008513c40aa9ba64524242803&q=${city}&days=5`)
      .then(response => response.json())
      .then(data => {
        // Display forcast
        let forecast = '<h3>5-Day Forecast:</h3>';
          data.forecast.forecastday.forEach(day => {
              forecast += `
                  <strong>${day.date}</strong>:<br>
                  Condition: ${day.day.condition.text}<br>
                  Max Temperature: ${day.day.maxtemp_c}°C<br>
                  Min Temperature: ${day.day.mintemp_c}°C<br><br>
              `;
          });
          document.getElementById('forecast').innerHTML = forecast;
      })
      .catch(error => {
          console.error('Error fetching forecast:', error);
      });
});
