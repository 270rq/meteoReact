import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({adressA, adressB}) => {
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
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
