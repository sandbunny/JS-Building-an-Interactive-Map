// loads the users location when the page loads up
window.onload = async () => {
  let coordinates = await getUserCoordinates();
  myMap.coordinates = coordinates;
  myMap.createMap(coordinates);
};

// gets my users coordinates
async function getUserCoordinates() {
  let position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return [position.coords.latitude, position.coords.longitude];
}

// map object
const myMap = {
  // create properties
  createMap: function (coordinates) {
    // Create Map
    const map = L.map("map", {
      center: coordinates,
      zoom: 13,
    });

    // tile layer I created
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // creating my markers
    const marker = L.marker(coordinates);
    marker.addTo(map).bindPopup("<p1><b>You Are Here</b></p1>").openPopup();
    // assigning map to a property to use outside of the function
    myMap.map = map;
  },
  // creating markers by using foursquare data
  addMarkers: function () {
    const redIcon = L.icon({
      iconUrl: "./images/red-pin.png",
      iconSize: [40, 40],
    });
    for (let i = 0; i < 5; i++) {
      L.marker([myMap.markers[i][0].latitude, myMap.markers[i][0].longitude], {
        icon: redIcon,
      })
        .bindPopup(`${myMap.markers[i][1]}`)
        .addTo(myMap.map);
    }
  },
};
// installed foursquare
let options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "fsq3/WiFKD2qOXoIbqqdLWYPiKsIjSR5VfZU9hk1MLoIdFo=",
  },
};
// applying fetch() to get data
async function fetchPlaces(business) {
  let response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=${myMap.coordinates}`,
    options
  );
  let places = await response.json();
  return places.results;
}

function parseLocations(results) {
  let locations = [];
  results.forEach((result) => {
    let location = [result.geocodes.main, result.name];
    locations.push(location);
  });
  return locations;
}
// event listener click event
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  submitButton();
});
// submitButton() configured
async function submitButton() {
  let selection = document.getElementById("business").value;
  let fourSquareData = await fetchPlaces(selection);
  // added await to fetchPlaces() because it was returning undefined
  let parsedData = parseLocations(fourSquareData);
  myMap.markers = parsedData;
  myMap.addMarkers();
}
