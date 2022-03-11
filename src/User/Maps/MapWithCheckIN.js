import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Axios from "axios";

import "leaflet-geometryutil";
import GeometryUtil from "leaflet-geometryutil";
import $ from "jquery";

export default function mapWithCurrentLocation() {
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
      <ClosePois />
    </MapContainer>
  );
}

const ClosePois = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();
  //layer contain pois within 20m
  const markersLayer = new L.LayerGroup();
  map.addLayer(markersLayer);
  var people,name;

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const circle = L.circle(e.latlng, 100, "ivory");
      circle.addTo(map);

      

      const getPois = async () => {
        try {
          const responce = await Axios.get("http://localhost:3001/api/searchPois");
          responce.data.forEach((item) => {
            if (
              GeometryUtil.distance(
                map,
                e.latlng,
                new L.latLng(item.lat, item.lng)
              ) < 80
            ) {
              const popupform =
                '<div className="form-container">' +
                '<div className="form-content-left"></div> ' +
                '<div className="form-content-right">' +
                '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="submit">' +
                "<label id = 'name'>"+item.name+"</label>" +
                '<div className="form-inputs"> ' +
                '<label className="form-label">How many people are in the store</label>' +
                '<input className="form-input" type="number" id="people" placeholder="Enter the number of people in the store" name="checkIn" value={people} />' +
                "</div> " +
                '<button className="form-input-btn" type="submit" value="submit">' +
                "CheckIn" +
                " </button>" +
                "</form>" +
                "</div>" +
                "</div>";
              const marker = new L.Marker(new L.latLng(item.lat, item.lng), {
                title: item.name,
              });
              marker.bindPopup(popupform);
              markersLayer.addLayer(marker);
            }
          });
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      };
      getPois();
    });
    $(document).on("submit", "form", function (e) {
      e.preventDefault();
      people = $("#people").val()
      name =$("#name").text()
    
        const date = new Date();
        var pad = function (num) {
        return ("00" + num).slice(-2);
      };
      Axios.post("http://localhost:3001/api/check_in", {
        people: people,
        username: localStorage.getItem("User"),
        poi_name: name,
        datetime:
          date.getUTCFullYear() +
          "-" +
          pad(date.getUTCMonth() + 1) +
          "-" +
          pad(date.getUTCDate()) +
          " " +
          pad(date.getUTCHours() + 2) +
          ":" +
          pad(date.getUTCMinutes()) +
          ":" +
          pad(date.getUTCSeconds()),
      }).then((res) => {
        alert(res.data.message)
        window.location.reload();


      });
    })
  }, [map]);

    
    
  
  return position === null ? null : (
    <Marker position={position}>
      <Popup></Popup>
    </Marker>
  );
};
