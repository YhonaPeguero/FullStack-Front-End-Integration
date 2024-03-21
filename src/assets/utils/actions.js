// src/utils/actions.js

export const addNote = () => {
  return { type: 'ADD_NOTE' };
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
