import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopicContent from './components/TopicContent';
import { topics } from './data/topics';
import { osTopics } from './data/osTopics';
import { allDbmsTopics } from './data/dbmsTopics';

function App() {
  const [activeCategory, setActiveCategory] = useState('oop');
  const [activeTopicId, setActiveTopicId] = useState('encapsulation');

  const categories = {
    oop: { name: 'Object-Oriented Programming', topics: topics },
    os: { name: 'Operating Systems', topics: osTopics },
    dbms: { name: 'Database Management Systems', topics: allDbmsTopics }
  };

  const currentTopics = categories[activeCategory].topics;
  const activeTopic = currentTopics.find(topic => topic.id === activeTopicId);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveTopicId(categories[category].topics[0].id);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="container">
            <h1>CS Fundamentals</h1>
          </div>
        </header>
        
        <div className="main-layout">
          <Sidebar 
            categories={categories}
            activeCategory={activeCategory}
            activeTopicId={activeTopicId}
            onCategoryChange={handleCategoryChange}
            onTopicChange={setActiveTopicId}
          />
          
          <main className="content">
            <div className="content-container">
              {activeTopic && <TopicContent topic={activeTopic} />}
            </div>
          </main>
        </div>
        
        <footer className="footer">
          <div className="container">
            <p>Comprehensive CS Fundamentals Guide - Master Computer Science Concepts</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;