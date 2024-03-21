// src/reducers/index.js

const initialState = {
  tabs: [],
  activeTab: '',
  contents: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      // eslint-disable-next-line no-case-declarations
      const newTabId = `Nota ${state.tabs.length + 1}`;
      return {
        ...state,
        tabs: [...state.tabs, newTabId],
        activeTab: newTabId,
        contents: { ...state.contents, [newTabId]: '' },
      };
    case 'UPDATE_NOTE_CONTENT':
      // eslint-disable-next-line no-case-declarations
      const { id, content } = action.payload;
      return {
        ...state,
        contents: { ...state.contents, [id]: content },
      };
    case 'DELETE_NOTE':
      // eslint-disable-next-line no-case-declarations
      const newTabs = state.tabs.filter(tabId => tabId !== action.payload);
      // eslint-disable-next-line no-case-declarations, no-unused-vars
      const { [action.payload]: removedContent, ...newContents } = state.contents;
      return {
        ...state,
        tabs: newTabs,
        activeTab: newTabs[0] || '',
        contents: newContents,
      };
    case 'SET_ACTIVE_NOTE':
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
