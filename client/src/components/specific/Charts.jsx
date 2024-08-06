import React from 'react'
import {Line,Doughnut} from "react-chartjs-2"
import {
   CategoryScale, 
   Chart as ChartJS,
   Tooltip,
   Filler,
   LinearScale,
   PointElement,
   LineElement,
   ArcElement,
   Legend,
  } from 'chart.js'
import { orange, orangeLight, purple, purpleLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features.js';
import zIndex from '@mui/material/styles/zIndex.js';

ChartJS.register(
    Tooltip,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    ArcElement,
    Legend
);

const labels=getLast7Days();


const lineChartOptions={
  responsive: true,
  plugins: {
    legend:{
      display:false,
    },
    title:{
      display:false,
    },
  },
  scales:{
    x:{
      grid:{
        display:false,
      },
    },
    y:{
      beginAtZero:true,
      grid:{
        display:false,
      },
    },
  },
};


const LineChart = ({value=[]}) => {
  const data ={
    labels,
    datasets:[
    {
      data:value,
      label:"Revenue",
      fill:true,
      backgroundColor: purpleLight,
      borderColor: purple,
    },
  ],
  };

  return <Line data={data} options={lineChartOptions} />
}

const DoughnutChartOptions={
  responsive: true,
  plugins: {
    legend:{
      display:false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({value=[],labels=[]}) => {

  const data ={
    labels,
    datasets:[
    {
      data:value,
      backgroundColor: [purpleLight,orangeLight],
      hoverBackgroundColor: [purple,orange],
      borderColor: [purple,orange],
      offset: 40,
    },
  ],
  };

  return (
   <Doughnut
     style={{zIndex:10}}
     data={data} 
     options={DoughnutChartOptions} 
   />

  )
}

export {LineChart,DoughnutChart}