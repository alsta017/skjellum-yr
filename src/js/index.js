// index.js

// Get references to DOM elements
const locationInputEl = document.getElementById("locationInput");
const weatherContainerEl = document.getElementById("weather");
const inputResultsEl = document.getElementById("inputResults");

// Event listener for input changes
locationInputEl.addEventListener("input", debounce(geocode, 300));

locationInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

function geocode() {
    const location = locationInputEl.value;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&format=json&apiKey=9975534b6da84db1831a676c8b752bcb`;
    if (location === "") {
        inputResultsEl.textContent = "";
    } else {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            localStorage.setItem("data", JSON.stringify(data));
            inputResultsEl.textContent = "";

            // Assuming the Geoapify response contains { lat, lon } object
            if (data.results.length === 0) {
                const waitText = document.createElement("div"); // Create the "Laster inn..." message
                waitText.className = "waittext";
                waitText.textContent = "Ingen steder funnet";
                inputResultsEl.appendChild(waitText);
            } else {
                for (let b = 0; b < data.results.length; b++) {
                    let placeDiv = document.createElement("div");
                    placeDiv.className = "place";
                    placeDiv.setAttribute("id", b);
                    placeDiv.setAttribute("onclick", "getWeather(this.id)");
                    let placeName = document.createElement("p");
                    placeName.className = "placeName";
                    if (data.results[b].address_line2) {
                        placeName.textContent = data.results[b].address_line1 + ", " + data.results[b].address_line2;
                    } else {
                        placeName.textContent = data.results[b].address_line1;
                    };
                    placeDiv.appendChild(placeName);
                    inputResultsEl.appendChild(placeDiv);
                }
            }
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            // Handle error (e.g., display an error message to the user)
        })
    }
}

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const waitText = document.createElement("div"); // Create the "Laster inn..." message
        waitText.className = "waittext";
        waitText.textContent = "Laster inn..."; // Initial text
        inputResultsEl.textContent = "";
        inputResultsEl.appendChild(waitText);
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function getWeather(id) {
    localStorage.setItem("id", JSON.stringify(id));
    window.location.href = "/weather";
};