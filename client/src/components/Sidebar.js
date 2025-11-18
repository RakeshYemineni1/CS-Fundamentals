import React from 'react';

const Sidebar = ({ categories, activeCategory, activeTopicId, onCategoryChange, onTopicChange }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {Object.entries(categories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="category-section">
            <h3 
              className={`category-title ${activeCategory === categoryKey ? 'active' : ''}`}
              onClick={() => onCategoryChange(categoryKey)}
            >
              {category.name}
            </h3>
            
            {activeCategory === categoryKey && (
              <ul className="topic-list">
                {category.topics.map(topic => (
                  <li
                    key={topic.id}
                    className={`topic-item ${activeTopicId === topic.id ? 'active' : ''}`}
                    onClick={() => onTopicChange(topic.id)}
                  >
                    {topic.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;