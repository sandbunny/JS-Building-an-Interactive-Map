// window.onload = async () => {
//   let location = await getUserCoordinates();
//   myMap.createMap(coordinates);
// };

const map = L.map("map"), {
  center: coordinates,
  zoom: 13,
});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(myMap);

const marker = L.maker(coordinates);
marker.addTo(map).bindPopup("<b>Hello world!").openPopup();

//  async function getUserCoordinates() {
//   let position = await new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
//   return [position.coords.latitude, position.coords.longitude];
// }

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: "fsq36S45VReQUTF/Vo7esrKY5uGXUOxtYze9kwmlGgcL10k=",
//   },
// };

// async function fetchPlaces(business) {
//   let respone = await fetch(
//     `https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=coffee&limit=5&ll=41.8781%2C-87.6298`,
//     options
//   );
//   let places = respone.json();
//   return places;
// }

// function parseLocations() {
//   let locations = [ ];
//   results.forEach((result) => {
//     let location = [results.geocodes.main, result.name];
//     locations.push(location);
//   });
//   return locations;
// }
