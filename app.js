window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-discription");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9fa923a11218f34c729201979616c74c`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    temperatureDegree.textContent = Math.round(temp - 273.15);
                    const description = data.weather[0].description;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    let iconcode = data.weather[0].icon;

                    let container = document.querySelector(".location");
                    let icon = document.createElement("img");
                    icon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconcode + "@2x.png")
                    container.appendChild(icon);
                });
        });
    }
});

