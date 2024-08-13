import React, { useEffect } from 'react';
import HeatMap from '@uiw/react-heat-map';
import './style.css'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import {useHeatmapData} from '../hooks/useHeatmapData'

//Temp data 
const value = [
  { date: '2016/01/11', count: 0 },
  { date: '2016/01/12', count: 0 },
  { date: '2016/01/13', count: -1 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
  { date: '2016/04/11', count: -1 },
  { date: '2016/05/01', count: 5 },
  { date: '2016/05/02', count: 5 },
  { date: '2016/05/04', count: 11 },
];

//array of submissions
const HeatChart = ({submissions}) => {
  
    const data = useHeatmapData(submissions)
    const {darkMode} = useContext(UserContext)

  return (
    <div id='heatmap' className={`overflow-auto font-bold dark:!tw-text-white`}>
      <HeatMap
      width={1500}
        rectSize={25}
        fontSize={20}
        value={data}
        weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
        startDate={new Date('2024/01/01')}
        style={{ color: darkMode ?'white' :'black'}}
        
      />
    </div>
  )
};

export default HeatChart