// src/utils/actions.js

export const addNote = (noteTitle) => {
  return { 
    type: 'ADD_NOTE',
    payload: noteTitle
  };
};

export const addTab = (noteTitle, tableDataNow) => {
  return { 
    type: 'ADD_TAB',
    payload: {newTabId2:noteTitle , tableData: tableDataNow}
  };
};

export const updateNoteContent = (id, content) => {
  return {
    type: 'UPDATE_NOTE_CONTENT',
    payload: { id, content },
  };
};

export const deleteNote = (id) => {
  return {
    type: 'DELETE_NOTE',
    payload: id,
  };
};

export const setActiveNote = (id) => {
  return {
    type: 'SET_ACTIVE_NOTE',
    payload: id,
  };
};

export const reset = () => {
  return {
    type: 'RESET',
  };
};
