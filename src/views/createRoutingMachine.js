import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(33.52001088075479, 36.26829385757446),
      L.latLng(33.50546582848033, 36.29547681726967)
    ],
    lineOptions: {
      styles: [{ color: "#FF0000", weight: 4 }],
      addWaypoints:true,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: true
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
