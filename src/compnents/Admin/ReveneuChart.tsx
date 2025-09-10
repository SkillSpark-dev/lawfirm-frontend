// components/admin/RevenueChart.tsx
'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data - replace with API data
const monthlyRevenue = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [42000, 49000, 45000, 51000, 58000, 62000, 71000, 68000, 75000, 82000, 78000, 85000],
      borderColor: 'rgb(30, 64, 175)',
      backgroundColor: 'rgba(30, 64, 175, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const revenueByPractice = {
  labels: ['Corporate', 'Litigation', 'Real Estate', 'Family Law', 'Intellectual Property'],
  datasets: [
    {
      label: 'Revenue by Practice',
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        'rgba(30, 64, 175, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(96, 165, 250, 0.8)',
        'rgba(147, 197, 253, 0.8)',
        'rgba(191, 219, 254, 0.8)',
      ],
      borderColor: [
        'rgb(30, 64, 175)',
        'rgb(59, 130, 246)',
        'rgb(96, 165, 250)',
        'rgb(147, 197, 253)',
        'rgb(191, 219, 254)',
      ],
      borderWidth: 1,
    },
  ],
};

const revenueComparison = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: '2023',
      data: [42000, 49000, 45000, 51000, 58000, 62000, 71000, 68000, 75000, 82000, 78000, 85000],
      backgroundColor: 'rgba(30, 64, 175, 0.5)',
    },
    {
      label: '2022',
      data: [38000, 42000, 40000, 45000, 49000, 52000, 58000, 55000, 60000, 65000, 62000, 68000],
      backgroundColor: 'rgba(107, 114, 128, 0.5)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Revenue',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: any) {
          return '$' + value.toLocaleString();
        },
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Yearly Comparison',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: any) {
          return '$' + value.toLocaleString();
        },
      },
    },
  },
};

type ChartType = 'line' | 'bar' | 'doughnut';

export default function RevenueChart() {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState('2023');

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={monthlyRevenue} options={chartOptions} />;
      case 'bar':
        return <Bar data={revenueComparison} options={barOptions} />;
      case 'doughnut':
        return <Doughnut data={revenueByPractice} options={doughnutOptions} />;
      default:
        return <Line data={monthlyRevenue} options={chartOptions} />;
    }
  };

  // Calculate metrics
  const totalRevenue = monthlyRevenue.datasets[0].data.reduce((sum, value) => sum + value, 0);
  const averageRevenue = Math.round(totalRevenue / monthlyRevenue.datasets[0].data.length);
  const growthRate = ((monthlyRevenue.datasets[0].data[11] - monthlyRevenue.datasets[0].data[10]) / monthlyRevenue.datasets[0].data[10]) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Revenue Analytics</h2>
        
        <div className="flex flex-wrap gap-3 mt-3 sm:mt-0">
          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          
          <div className="flex bg-gray-100 rounded-md p-1">
            <button
              className={`px-3 py-1 text-sm rounded-md ${chartType === 'line' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              onClick={() => setChartType('line')}
            >
              Line
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${chartType === 'bar' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              onClick={() => setChartType('bar')}
            >
              Bar
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${chartType === 'doughnut' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              onClick={() => setChartType('doughnut')}
            >
              Pie
            </button>
          </div>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-blue-600 mt-1">Year to Date</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-700 font-medium">Average Monthly</p>
          <p className="text-2xl font-bold text-green-900">${averageRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">+12% from last year</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-700 font-medium">Monthly Growth</p>
          <p className="text-2xl font-bold text-purple-900">{growthRate.toFixed(1)}%</p>
          <p className="text-xs text-purple-600 mt-1">From previous month</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        {renderChart()}
      </div>

      {/* Insights */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Revenue Insights</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Q4 revenue is projected to be 15% higher than Q3</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>Corporate practice continues to be the highest revenue generator</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>Intellectual Property shows the strongest growth at 22% YoY</span>
          </li>
        </ul>
      </div>
    </div>
  );
}