import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-search";
import "leaflet-search/dist/leaflet-search.min.css";
import data from "./starting_pois.json";
import L from "leaflet";
import  Axios  from "axios";

export default function MapWithSearch() {
  return (
    <MapContainer
      center={[38.246639, 21.734573]}
      zoom={13}
      scrollWheelZoom
      animate={true}
      style={{ width: "100%", height: "90vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <Search />
    </MapContainer>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // const radius = 5000;
      // const color = "ivory";
      // const circle = L.circle(e.latlng, radius, color);
      // circle.addTo(map);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup></Popup>
    </Marker>
  );
}

function Search() {
  const map = useMap();

  const markersLayer = new L.LayerGroup(); //layer contain searched elements
  map.addLayer(markersLayer);

  useEffect(() => {
    const controlSearch = new L.Control.Search({
      position: "topleft",
      layer: markersLayer,
      initial: false,
      zoom: 20,
      marker: false,
    });

    map.addControl(controlSearch);
    
    //Αναλογα με την επισκεψημοτητα θετω διαφορετικο icon σε καθε marker
    const LeafIcon = L.Icon.extend({
      options: {}
    });
  
    const orangeIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffa500&chf=a,s,ee00FFFF"
      }),
      greenIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
      }),
      redIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000&chf=a,s,ee00FFFF"
      });

  

    const getPois = async () => {
      try {
            const responce = await Axios.get("http://localhost:3001/api/searchPois")
            responce.data.forEach((item) =>{
              const traffic =(item.percent + item.percent2) /2;
              const traffic1 =(item.percent3 + item.percent4) /2;
              let marker = new L.Marker(new L.latLng(item.lat,item.lng), {title: item.name, icon: greenIcon})
              if (traffic<32) {

              } else if(traffic > 33 && traffic < 65) {
                marker = new L.Marker(new L.latLng(item.lat,item.lng), {title: item.name, icon: orangeIcon})
             }else{
                marker = new L.Marker(new L.latLng(item.lat,item.lng), {title: item.name, icon: redIcon})
             }
            
             marker.bindPopup(
                 "Name: " + item.name + " | " +
                 "Estimated traffic for the next 2 hours: " + traffic + " | " + 
                 "Estimated traffic for the past 2 hours: " + traffic1
             );
             markersLayer.addLayer(marker);
           });
            
         
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  getPois()
  }, []);

  return null;
}
