
import React from 'react';
import Table from './Table';
import './App.css';

const App = () => {
  const columns = [
    { header: 'Ad', accessor: 'name' },
    { header: 'Yaş', accessor: 'age' },
    { header: 'E-posta', accessor: 'email' }
  ];

  const data = [
    { name: 'John Doe', age: 28, email: 'john@example.com' },
    { name: 'Jane Smith', age: 34, email: 'jane@example.com' },
    { name: 'Sam Johnson', age: 22, email: 'sam@example.com' }
  ];

  return (
    <div>
      <h1>dynamic Table</h1>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default App;
