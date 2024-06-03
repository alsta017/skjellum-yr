let timeout;
let location;
let locationFormEl = document.getElementById("locationForm");

locationFormEl.addEventListener("input", geocode);

function geocode(location) {
    fetch('/geocode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location })
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
    .catch(err => console.log(err))
}