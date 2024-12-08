import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ tasks }) => {
  // Calculate task status counts
  const statusCounts = {
    'Not Started': tasks.filter(task => task.status === 'Not Started').length,
    'In Progress': tasks.filter(task => task.status === 'In Progress').length,
    'Completed': tasks.filter(task => task.status === 'Completed').length
  };

  const data = {
    labels: ['Not Started', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          statusCounts['Not Started'],
          statusCounts['In Progress'],
          statusCounts['Completed']
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',   // Red for Not Started
          'rgba(54, 162, 235, 0.6)',   // Blue for In Progress
          'rgba(75, 192, 192, 0.6)'    // Green for Completed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Progress Overview'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-xl font-semibold mb-4 text-center">Task Progress Visualization</h2>
      {tasks.length > 0 ? (
        <div className="max-w-md mx-auto">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks to visualize</p>
      )}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Total Tasks: {tasks.length} |
          Not Started: {statusCounts['Not Started']} |
          In Progress: {statusCounts['In Progress']} |
          Completed: {statusCounts['Completed']}
        </p>
      </div>
    </div>
  );
};

export default ProgressChart;