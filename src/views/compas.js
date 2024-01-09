import compas from "./icon/compas.svg";
import arrow from "./icon/arrow(1).svg";
const CompasContainer = ({typeWind}) => {
    let angle = 0;

    switch (typeWind) {
      case "N":
        angle = 0;
        break;
      case "NE":
        angle = 45;
        break;
      case "E":
        angle = 90;
        break;
      case "SE":
        angle = 135;
        break;
      case "S":
        angle = 180;
        break;
      case "SW":
        angle = 225;
        break;
      case "W":
        angle = 270;
        break;
      case "NW":
        angle = 315;
        break;
      default:
        angle = 0;
    }
    return ( <div className="compas-cont-placer">
    <div className="compas-cont">
        <img className="compas" src={compas} alt="Compas Icon"/>
        <img
            className="compas-arrow"
            src={arrow}
            alt="Arrow Icon"
            style={{
            "--rotation-angle": `${ angle}deg`
        }}/>
    </div>
</div>)
}
export default CompasContainer