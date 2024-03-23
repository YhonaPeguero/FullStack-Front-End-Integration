import { useSelector, useDispatch } from "react-redux";
import {
  addNote,
  addTab,
  deleteNote,
  reset,
  setActiveNote,
  updateNoteContent,
} from "../utils/actions";
import NoteTab from "../components/NoteTab";
import axios from "axios";
import { REST_API } from "../utils/config";

// eslint-disable-next-line react/prop-types
const TabList = ({ isIntegrationVersion, setIsIntegrationVersion }) => {
  const dispatch = useDispatch();
  const { tabs, activeTab, contents, tableData } = useSelector((state) => state);
  //const [classData, setClassData] = useState(null);

  const handleReset = () => {
    dispatch(reset());
  };

  const handleCreateNote = (noteTitle) => {
    dispatch(addNote(noteTitle));
  };

  const handleCreateTab = (noteTitle, tableDataNow) => {
    dispatch(addTab(noteTitle, tableDataNow));
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

  const handleToggleVersion = () => {
    handleReset()
    setIsIntegrationVersion(!isIntegrationVersion);
  };

  const handleGetClassData = async () => {
    try {
      const response = await axios.post(
        `${REST_API}/class`,
        contents[activeTab]
      );
      // Almacenar los datos de la API en el estado
      //setClassData(response.data);
      console.log(new Date().toLocaleString())
      handleCreateTab(new Date().toLocaleString(), response.data);
      console.log(tabs)
      console.log(activeTab)
      console.log(contents)
      console.log(tableData)
      console.log(isIntegrationVersion)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="flex-one-hundred">
          <div className="col d-flex justify-content-between">
            <ul className="nav nav-tabs" role="tablist">
              {tabs.map((tabId) => (
                <li className="nav-item" key={tabId}>
                  <a
                    className={`nav-link ${
                      activeTab === tabId ? "active" : ""
                    }`}
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
              {/* isIntegrationVersion ? */}
              {tabs.length < 10 && isIntegrationVersion && (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleCreateNote(`Nota ${tabs.length + 1}`)}
                  >
                    +
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div
            onClick={() => handleToggleVersion()}
            className="btn-toggle btn btn-primary"
          >
            {isIntegrationVersion ? `Integration Version` : `Frontend Version`}
          </div>
        </div>
      </div>
      <div className="flex">
        <h5>Notas:</h5>
        {isIntegrationVersion && activeTab && (
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteTab(activeTab)}
          >
            Eliminar
          </button>
        )}
      </div>
      <div className="tab-content">
        {tabs.map((tabId) => (
          <NoteTab
            key={tabId}
            id={tabId}
            isActive={activeTab === tabId}
            content={contents[tabId]}
            onContentChange={(e) => handleContentChange(tabId, e.target.value)}
          />
        ))}
      </div>
      {tabs.length <= 10 && !isIntegrationVersion && (<>
        <div className="flex pt-3">
        <div>Info: </div>
        <div className="btn btn-primary" onClick={() => handleGetClassData()}>
          Generar Info
        </div>
      </div>
      {/* <div className="btn btn-primary" onClick={() => {
              console.log(tabs)
              console.log(activeTab)
              console.log(contents)
              console.log(tableData)
              console.log(isIntegrationVersion)
              console.log(tableData[activeTab])
              console.log(tableData[activeTab]["className"])
      }}>
        log
      </div> */}
      </>)}
      {!isIntegrationVersion && tableData[activeTab] !== null && tableData[activeTab]["className"] !== undefined && 
      tableData[activeTab]["scope"] !== null &&      
      tableData[activeTab]["constructor"] !== null &&
      tableData[activeTab]["data"] !== null &&
      (
        <div>
          <p>class name: {tableData[activeTab]["className"]}</p>
          <p>scope: {tableData[activeTab]["scope"]}</p>
          <p>constructor: {tableData[activeTab]["constructor"]}</p>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>NAME</th>
                <th>VARI</th>
                <th>SCOPE</th>
                <th>SIGNATURE</th>
              </tr>
            </thead>
            <tbody>
              {tableData[activeTab]["data"].map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.vari}</td>
                  <td>{item.scope}</td>
                  <td>{item.signature}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <section>
            VARI: variación, RTYPE: return type, PARAMS: parámetros
          </section>
          <article>A: atributo, M: método</article>
        </div>
      )}
    </div>
  );
};

export default TabList;
