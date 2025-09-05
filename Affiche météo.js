
async function getWeather() {
    const city = document.getElementById("city").value;
    
    const url = `https://mon-projet-meteo-1.onrender.com/weather?city=${city}`;
    


    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = "⏳ Chargement...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.name) { // On vérifie que la ville existe
            weatherDiv.innerHTML = `
              🌍 Ville: ${data.name} <br>
              🌡 Température: ${data.main.temp}°C <br>
              🌬 Vent: ${data.wind.speed} km/h<br>
              💧 Humidité: ${data.main.humidity}%<br>
              ☁ Météo: ${data.weather[0].description}
            `;
        } else {
            weatherDiv.innerHTML = "❌ Ville introuvable";
        }

    } catch (err) {
        weatherDiv.innerHTML = "⚠️ Erreur serveur ou ville introuvable";
    }
}

// Permet d'appuyer sur Entrée
document.getElementById("city").addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});
