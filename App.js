import React, { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ProgressChart from './components/ProgressChart'; // New import

const App = () => {
 const [tasks, setTasks] = useState([]);

 // Enhanced Add Task handler with additional fields
 const handleAddTask = (taskData) => {
   const newTask = {
     id: Date.now(),
     text: taskData.text,
     status: 'Not Started', // ['Not Started', 'In Progress', 'Completed']
     completionDate: null,
     comments: taskData.comments || '',
     completed: false
   };
   setTasks([...tasks, newTask]);
 };

 // Update task status
 const handleStatusChange = (taskId, newStatus) => {
   setTasks(tasks.map(task => {
     if (task.id === taskId) {
       const completionDate = newStatus === 'Completed' ? new Date().toISOString() : null;
       return {
         ...task,
         status: newStatus,
         completionDate,
         completed: newStatus === 'Completed'
       };
     }
     return task;
   }));
 };

 // Update task comments
 const handleCommentsChange = (taskId, newComments) => {
   setTasks(tasks.map(task =>
     task.id === taskId ? { ...task, comments: newComments } : task
   ));
 };

 // Delete task
 const handleDeleteTask = (taskId) => {
   setTasks(tasks.filter(task => task.id !== taskId));
 };

 // Clear completed tasks
 const handleClearCompleted = () => {
   setTasks(tasks.filter(task => !task.completed));
 };

 const hasCompletedTasks = tasks.some(task => task.completed);

 return (
   <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
     <Header />
     <TaskInput onAddTask={handleAddTask} />
   
     <div className="p-4">
       <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200">
           <thead className="bg-gray-50">
             <tr>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
             </tr>
           </thead>
           <tbody className="bg-white divide-y divide-gray-200">
             {tasks.map(task => (
               <tr key={task.id}>
                 <td className="px-6 py-4 whitespace-nowrap">
                   <span className={task.completed ? 'line-through text-gray-500' : ''}>
                     {task.text}
                   </span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                   <select
                     value={task.status}
                     onChange={(e) => handleStatusChange(task.id, e.target.value)}
                     className="rounded border-gray-300 text-sm"
                   >
                     <option value="Not Started">Not Started</option>
                     <option value="In Progress">In Progress</option>
                     <option value="Completed">Completed</option>
                   </select>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {task.completionDate ? new Date(task.completionDate).toLocaleDateString() : '-'}
                 </td>
                 <td className="px-6 py-4">
                   <input
                     type="text"
                     value={task.comments}
                     onChange={(e) => handleCommentsChange(task.id, e.target.value)}
                     className="w-full rounded border-gray-300 text-sm"
                     placeholder="Add comments..."
                   />
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <button
                     onClick={() => handleDeleteTask(task.id)}
                     className="text-red-600 hover:text-red-900"
                   >
                     Delete
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>

     <ProgressChart tasks={tasks} /> {/* This is the key addition */}
   
     {hasCompletedTasks && (
       <div className="p-4 border-t">
         <button
           onClick={handleClearCompleted}
           className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
         >
           Clear Completed Tasks
         </button>
       </div>
     )}
   </div>
 );
};

export default App;
