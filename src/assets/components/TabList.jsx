import { useState } from 'react';
import NoteTab from './NoteTab';

const TabList = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [contents, setContents] = useState({});

  const createTab = () => {
    if (tabs.length < 10) {
      const newTabId = `Nota ${tabs.length + 1}`;
      setTabs([...tabs, newTabId]);
      setActiveTab(newTabId);
      setContents({ ...contents, [newTabId]: '' });
    }
  };

  const deleteTab = (tabId) => {
    const updatedTabs = tabs.filter(id => id !== tabId);
    setTabs(updatedTabs);
    const newContents = { ...contents };
    delete newContents[tabId];
    setContents(newContents);
    setActiveTab(updatedTabs.length > 0 ? updatedTabs[0] : '');
  };

  const handleContentChange = (tabId, text) => {
    setContents({ ...contents, [tabId]: text });
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col d-flex justify-content-between">
          <ul className="nav nav-tabs" role="tablist">
            {tabs.map(tabId => (
              <li className="nav-item" key={tabId}>
                <a 
                  className={`nav-link ${activeTab === tabId ? 'active' : ''}`}
                  data-toggle="tab"
                  role="tab"
                  onClick={() => setActiveTab(tabId)}
                >
                  {tabId}
                </a>
              </li>
            ))}
            {tabs.length < 10 && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={createTab}>+</button>
              </li>
            )}
          </ul>
          {activeTab && (
            <button className="btn btn-danger" onClick={() => deleteTab(activeTab)}>
              Eliminar
            </button>
          )}
        </div>
      </div>
      <h5>Notas:</h5>
      <div className="tab-content">
        {tabs.map(tabId => (
          <NoteTab
            key={tabId}
            id={tabId}
            isActive={activeTab === tabId}
            content={contents[tabId]}
            onContentChange={(e) => handleContentChange(tabId, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default TabList;
