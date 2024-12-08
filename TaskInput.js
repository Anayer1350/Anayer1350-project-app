import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({
    text: '',
    comments: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!taskData.text.trim()) {
      setError('Please enter a task description');
      return;
    }
   
    onAddTask(taskData);
    setTaskData({ text: '', comments: '' });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="p-4 border-b">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="text"
            value={taskData.text}
            onChange={handleChange}
            placeholder="Enter task description..."
            className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
        </div>
        <div>
          <input
            type="text"
            name="comments"
            value={taskData.comments}
            onChange={handleChange}
            placeholder="Add initial comments (optional)..."
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;