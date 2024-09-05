import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api'; // Update with the correct import path for BASE_URL

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      min: 0,           // Start the y-axis at 0
      max: 1000000,     // Set the maximum value (adjust based on your data)
      tickAmount: 5,    // Number of intervals (this creates 5 intervals of 200,000)
      labels: {
        formatter: (value) => `${value.toLocaleString()} Tsh`, // Format the label with 'Tsh' and commas for readability
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewSales = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();
  const [chartData, setChartData] = useState(chartSeries);
  const [loading, setLoading] = useState(true);

  const handleSyncClick = async () => {
    const token = localStorage.getItem('access_token'); // Get the token from local storage
  
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/data/yearly/`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the headers
        },
        params: { year: '2024' } // Adjust the parameters as needed
      });
  
      if (response.status === 200) {
        
        const { daily_totals } = response.data;
        const monthlySalesData = Array(12).fill(0);
        daily_totals.forEach((item) => {
          const month = new Date(item.date).getMonth();
          monthlySalesData[month] += item.total_sales;
        });

  
        setChartData([{ name: 'Sales', data: monthlySalesData }]);
        setLoading(true);
        
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        
      }
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      setLoading(false);
      
    }
  };


  
  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
            onClick={handleSyncClick} // Attach the click handler
          >
            Sync
          </Button>
        )}
        title="Sales Chart"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartData}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Overview
        </Button> */}
      </CardActions>
    </Card>
  );
};

OverviewSales.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
