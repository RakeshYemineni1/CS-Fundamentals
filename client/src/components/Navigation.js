import React from 'react';

const Navigation = ({ topics, activeTopicId, onTopicChange }) => {
  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list">
          {topics.map(topic => (
            <li
              key={topic.id}
              className={`nav-item ${activeTopicId === topic.id ? 'active' : ''}`}
              onClick={() => onTopicChange(topic.id)}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;