import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({adressA, adressB, avoidElements}) => {
  const instance = L.Routing.control({
    waypoints: [
      adressA,
      adressB
    ],
    lineOptions: {
      styles: [{ color: "#000000", weight: 4 }],
      addWaypoints:true,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: true
  });
  if (avoidElements) {
    instance.route({
      avoid: avoidElements.map((element) => ({
        polygon: element.toGeoJSON(), // Преобразуем элемент Circle в GeoJSON
      })),
    });
  }
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
