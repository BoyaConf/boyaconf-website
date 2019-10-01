const mymap = L.map('mapid').setView([5.8292, -73.02536], 16);
L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiYm95YWNvbmYiLCJhIjoiY2sxNzg4eTF0MGJiajNna3dnOWVuZmF2ZCJ9.iyLM3K1PtMIYfMvwIEoEOw',
  {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 5,
    maxZoom: 16,
    id: 'mapbox.streets'
  }).addTo(mymap);
// noinspection JSUnresolvedFunction
const marker = L.marker([5.8292, -73.02536]).addTo(mymap);
marker.bindPopup(
  '<b>Cámara de Comercio de Duitama</b><br>Auditorio Monseñor<br>Luis Antonio Corredor Chaparro<br><br>Transversal 19 No. 23–141')
  .openPopup();
