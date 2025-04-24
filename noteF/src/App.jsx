import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  return (
    <div className="app-container" style={{ padding: 20 }}>
      <center>
      <h1>My Notes</h1>
      <NoteForm />
      </center>
      <NoteList />
     
    </div>
  );
};

export default App;
