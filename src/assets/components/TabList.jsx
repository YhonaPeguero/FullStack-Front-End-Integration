import { useSelector, useDispatch } from 'react-redux';
import { addNote, deleteNote, setActiveNote, updateNoteContent } from '../utils/actions';
import NoteTab from '../components/NoteTab';

const TabList = () => {
  const dispatch = useDispatch();
  const { tabs, activeTab, contents } = useSelector(state => state);

  const handleCreateTab = () => {
    dispatch(addNote());
  };

  const handleSetActiveTab = (tabId) => {
    dispatch(setActiveNote(tabId));
  };

  const handleDeleteTab = (tabId) => {
    dispatch(deleteNote(tabId));
  };

  const handleContentChange = (tabId, content) => {
    dispatch(updateNoteContent(tabId, content));
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
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSetActiveTab(tabId);
                  }}
                >
                  {tabId}
                </a>
              </li>
            ))}
            {tabs.length < 10 && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleCreateTab}>+</button>
              </li>
            )}
          </ul>
          {activeTab && (
            <button className="btn btn-danger" onClick={() => handleDeleteTab(activeTab)}>
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
