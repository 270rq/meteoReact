import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

import "./css/pollen.css";
import mask from "./icon/mask.svg";
import glasses from "./icon/glasses.svg";
import tshirt from "./icon/tshirt.svg";
import bath from "./icon/shower.svg";
import window from "./icon/window.svg";
import ciclist from "./icon/cyclist.svg";
import wheat from "./icon/wheat.svg";
import grass from "./icon/grass.svg";
import tree from "./icon/tree.svg";
import mushroom from "./icon/mushroom.svg";
import MapContainer from "./map";

const Pollen = () => {
  Chart.register(ArcElement);
  const data = {
    labels: ["Категория 1", "Категория 2"],
    datasets: [
      {
        data: [30, 40],
        backgroundColor: ["blue", "grey"],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    layout: {
      padding: 10,
    },

    plugins: {
      legend: false,
      datalabels: {
        display: false,
      },
    },

    maintainAspectRatio: false,
    responsive: true,
    rotation: -90,
    cutoutPercentage: 40,
    circumference: 180,
  };

  return (
    <div className="center-div">
    <div className="main-cont">
      <div className="inf">
        <div className="inform">
          <div className="di" style={{ width: "200px", height: "200px" }}>
            <Doughnut
              plugins={[
                {
                  beforeDraw: function (chart) {
                    const datasetMeta = chart.getDatasetMeta(0);
                    datasetMeta.data[1].outerRadius = 75;
                    datasetMeta.data[1].innerRadius = 55;
                  },
                },
              ]}
              data={data}
              options={options}
            />
            <div className="di-text">
              Сильно
              <div className="text di-text2">Основной аллерген: Гриб</div>
            </div>
          </div>
          <div className="text i-text">
            Вероятно вызывают реакцию у людей чувсвительных к пыльце
          </div>
          <div className="allerg-cont">
            <div className="allerg-icon">
              <div className="all-icon">
                <img alt="Wheat Icon" src={wheat}></img>
              </div>
              <div className="all-icon">
                <img alt="Grass Icon" src={grass}></img>
              </div>
              <div className="all-icon">
                <img alt="Tree Icon" src={tree}></img>
              </div>
              <div className="all-icon">
                <img alt="Mushroom Icon" src={mushroom}></img>
              </div>
            </div>
          </div>
        </div>
        <div className="inform">
          <div className="rec-text">
            <div className="cont">
              <img className="icon-rec" src={mask} alt="Mask Icon" />
              <div className="text t1">Маски настоятельно рекомендуются</div>
            </div>
            <div className="cont">
              <img className="icon-rec" src={glasses} alt="Glasses Icon" />
              <div className="text t2">
                Настоятельно рекомендуется солнцезащитные очки
              </div>
            </div>
            <div className="cont">
              <img className="icon-rec" src={tshirt} alt="Tshirt Icon" />
              <div className="text t3">
                Не носите шерстяную одежду на открытом воздухе
              </div>
            </div>
            <div className="cont">
              <img className="icon-rec" src={bath} alt="Shower Icon" />
              <div className="text t4">
                Рекомендуется принять душ после выхода на улицу
              </div>
            </div>
            <div className="cont">
              <img className="icon-rec" src={window} alt="Window Icon" />
              <div className="text t5">
                Рекомендуется закрыть окна и двери и включить очиститель воздуха
              </div>
            </div>
            <div className="cont">
              <img className="icon-rec" src={ciclist} alt="Ciclist Icon" />
              <div className="text t6">Избегайте занятий на свежем воздухе</div>
            </div>
          </div>
        </div>
      </div>
      <MapContainer />
    </div></div>
  );
};

export default Pollen;
