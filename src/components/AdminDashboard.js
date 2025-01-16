import React, { useState } from 'react';

const AdminDashboard = ({ data, setData }) => {
  const [newTopic, setNewTopic] = useState('');

  const addTopic = () => {
    if (newTopic) {
      const newData = { ...data };
      newData[newTopic] = [];
      setData(newData);
      setNewTopic('');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        placeholder="Add new topic"
      />
      <button onClick={addTopic}>Add Topic</button>
      <div>
        <h2>Existing Topics</h2>
        <ul>
          {Object.keys(data).map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
