import React from "react";
import Header from "./header";
import DonutChart from './DoughnutChart';
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
 
  return (<>
    <Header/> 
    <div className="center-div">
    <div className="main-cont">
      <div className="inf">
        <div className="inform">
          <div className="di" >
          <DonutChart width={300} height={300} items={[
	{value: 12, color: 'orange'},
  {value: 12, color: 'gray'},

]} innerRadius={120} outerRadius={140} />
          
            <div className="di-text">
              Сильно <br/>
              <span className="text di-text2">Основной аллерген: Гриб</span>
            </div>
          </div>
          <div className="text i-text">
            Вероятно вызывают реакцию у людей чувсвительных к пыльце
          </div>
          <div className="allerg-cont">
            <div className="allerg-icon">
              <div className="all-icon" style={{ '--strength': '79%' }}>
                <img alt="Wheat Icon" src={wheat}></img>
              </div>
              <div className="all-icon" style={{ '--strength': '59%' }}>
                <img alt="Grass Icon" src={grass}></img>
              </div>
              <div className="all-icon"  style={{ '--strength': '99%' }}>
                <img alt="Tree Icon" src={tree}></img>
              </div>
              <div className="all-icon"  style={{ '--strength': '19%' }}>
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
    </div></div></>
  );
};

export default Pollen;
