import React from 'react';
import { RadialChart } from 'react-vis';
import 'react-vis/dist/style.css';

const Pollen = () => {
    const data = [
        { angle: 1, label: 'A' },
    ];

    return (
        <div className='inf'>
            <div className='inform'>
                <RadialChart
                    data={data}
                    width={300}
                    height={300}
                    showLabels
                    labelsAboveChildren
                />
                <div className='di-text'>Сильно <br></br>Основной аллерген: Гриб</div>
            </div>
            <div className='i-text'>Вероятно вызывают реакцию у людей чувсвительных к пыльце.</div>
            <div className='inform'>
                <div className='rec-text'>
                    <div className='text t1'>Маски настоятельно рекомендуются</div>
                    <div className='text t2'>Настоятельно рекомендуется солнцезащитные очки</div>
                    <div className='text t3'>Не носите шерстяную одежду на открытом воздухе</div>
                    <div className='text t3'>Рекомендуется принять душ после выхода на улицу</div>
                    <div className='text t4'>Рекомендуется закрыть окна и двери и включить очиститель воздуха</div>
                    <div className='text t5'>Избегайте занятий на свежем воздухе</div>
                </div>
            </div>
        </div>
    );
};

export default Pollen;