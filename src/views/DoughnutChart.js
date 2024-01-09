import {useState, useEffect, useMemo} from "react";

const PROGRESS_UNIT = 0.01;
const PROGRESS_TIMEOUT = 5;

const getArcPath = (start, end, innerRadius, outerRadius) => {
    const startAngle = start * Math.PI * 2;
    const endAngle = end * Math.PI * 2;
    const x1 = innerRadius * Math.sin(startAngle);
    const y1 = innerRadius * -Math.cos(startAngle);
    const x2 = outerRadius * Math.sin(startAngle);
    const y2 = outerRadius * -Math.cos(startAngle);
    const x3 = outerRadius * Math.sin(endAngle);
    const y3 = outerRadius * -Math.cos(endAngle);
    const x4 = innerRadius * Math.sin(endAngle);
    const y4 = innerRadius * -Math.cos(endAngle);
    const bigArc = end - start >= 0.5;
    const outerFlags = bigArc
        ? '1 1 1'
        : '0 0 1';
    const innerFlags = bigArc
        ? '1 1 0'
        : '1 0 0';
    return `M ${x1},${y1} L ${x2},${y2} A ${outerRadius} ${outerRadius} ${outerFlags} ${x3},${y3} 
        L ${x4},${y4} A ${innerRadius} ${innerRadius} ${innerFlags} ${x1},${y1} Z`;
};

const DonutChart = ({width, height, items, innerRadius, outerRadius}) => {
    const [visiblePart,
        setVisiblePart] = useState(0);

    useEffect(() => {
        if (visiblePart < 1) {
            setTimeout(() => setVisiblePart(visiblePart + PROGRESS_UNIT), PROGRESS_TIMEOUT);
        }
    }, [visiblePart]);

    const segments = useMemo(() => {
        const sum = items.reduce((sum, item) => sum + item.value, 0);
        let start = 0;
        let innerRadiusS = innerRadius;
        let outerRadiusS = outerRadius;
        return items.map((item) => {
            const delta = (item.value / sum) * visiblePart;
            const path = getArcPath(start, start + delta / 1.75, innerRadiusS, outerRadiusS);
            start += delta / 1.75;
            outerRadiusS -= 5;
            innerRadiusS += 5;
            return {
                ...item,
                path
            };
        });
    }, [items, innerRadius, outerRadius, visiblePart]);
    const endCoords = useMemo(() => {
        if (segments.length > 0) {
            const firstSegment = segments[0];
            const path = firstSegment.path;

            const pathElem = path.split(" ");
            const firstCoords = pathElem[10].split(",");
            const secondCoords = pathElem[20].split(",");
            const x = (parseFloat(firstCoords[0]) + parseFloat(secondCoords[0])) / 2;
            const y = (parseFloat(firstCoords[1]) + parseFloat(secondCoords[1])) / 2;
            return [x, y]; // Converting coordinates to numbers
        }
        return [0, 0]; // Default coordinates if no segments
    }, [segments]);
    return (
        <svg
            width={width}
            height={height}
            style={{
            transform: "rotate(258deg)", marginTop: "2rem", 
        }}>
            <g transform={`translate(${width / 2},${height / 2})`}>

                <path
                    key={segments[0].color}
                    stroke={segments[0].color}
                    fill={segments[0].color}
                    d={segments[0].path}/>

                <path
                    key={segments[1].color}
                    stroke={segments[1].color}
                    fill={segments[1].color}
                    d={segments[1].path}/>
                <circle cx={endCoords[0]} // x-coordinate of the end point
                    cy={endCoords[1]} r="20" // Radius of the circle
                    fill="#ffffff"></circle>
                <text x={endCoords[0]} y={endCoords[1]} textAnchor="middle" alignmentBaseline="central" fill="#FFAE00" // Color of the number
                    fontSize="16"
                    
                      transform={`rotate(-258, ${endCoords[0]}, ${endCoords[1]})`}>{100 * segments[0].value / (segments[0].value + segments[1].value)}</text>

            </g>
        </svg>
    );
};
export default DonutChart;