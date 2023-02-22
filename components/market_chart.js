import React from 'react';
import Box from '@mui/material/Box';
import 'chartjs-adapter-moment'
import { serverRequest, isAxiosError, isAxiosResponse } from "../utils/request"
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const MarketChart = (props) => {
    const { labels, dataset, legends } = props;
    const options = {
        responsive: true,
        plugins: {
          filler: {
              propagate: false,
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
    }
    
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const data = {
        labels,
        datasets: dataset.map((ds, index) => ({
            label: `${legends[index]}`,
            data: ds,
            fill: true,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            pointBorderColor: getRandomColor(),
        })),
    }
    
    return (<Box sx={{width: "100%", height: "100%"}}>
        <Line options={options} data={data} />;
    </Box>)
};