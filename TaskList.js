import React from 'react';

const TaskList = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <div className="p-4">
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50"
          >
            <button
              onClick={() => onCompleteTask(task.id)}
              className={`w-5 h-5 rounded-full border flex items-center justify-center
                        ${task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-500'}`}
            >
              {task.completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.text}
            </span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-red-500 hover:text-red-600 px-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;