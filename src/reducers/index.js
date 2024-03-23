// src/reducers/index.js
const initialStateReset = {
  tabs: ["Nueva"],
  activeTab: "Nueva",
  contents: {
    "Nueva": ""
  },
  tableData: {
    'Nueva': {}
  }
};

const initialState = {
  tabs: ["Nueva"],
  activeTab: "Nueva",
  contents: {
    "Nueva": ""
  },
  tableData: {
    'Nueva': {}
  }
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NOTE":
      // eslint-disable-next-line no-case-declarations
      const newTabId = action.payload;
      console.log(newTabId);
      return {
        ...state,
        tabs: [...state.tabs, newTabId],
        activeTab: newTabId,
        contents: { ...state.contents, [newTabId]: "" },
      };
    case "ADD_TAB":
      // eslint-disable-next-line no-case-declarations
      const {newTabId2, tableData} = action.payload;
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        tabs: [...state.tabs, newTabId2],
        activeTab: newTabId2,
        contents: { ...state.contents, [newTabId2]: state.contents[state.activeTab], [state.activeTab]: ""},
        tableData: { ...state.tableData, [newTabId2]: tableData }
      };
    case "UPDATE_NOTE_CONTENT":
      // eslint-disable-next-line no-case-declarations
      const { id, content } = action.payload;
      return {
        ...state,
        contents: { ...state.contents, [id]: content },
      };
    case "DELETE_NOTE":
      // eslint-disable-next-line no-case-declarations
      const newTabs = state.tabs.filter((tabId) => tabId !== action.payload);
      // eslint-disable-next-line no-case-declarations, no-unused-vars
      const { [action.payload]: removedContent, ...newContents } =
        state.contents;
      return {
        ...state,
        tabs: newTabs,
        activeTab: newTabs[0] || "",
        contents: newContents,
      };
    case "SET_ACTIVE_NOTE":
      return {
        ...state,
        activeTab: action.payload,
        tableData: { ...state.tableData, [action.payload]: state.tableData[action.payload] }
      };
    case "RESET":
      return {
        ...state,
        tabs: initialStateReset.tabs,
        activeTab: initialStateReset.activeTab,
        contents: initialStateReset.contents,
      };
    default:
      return state;
  }
}

export default rootReducer;
