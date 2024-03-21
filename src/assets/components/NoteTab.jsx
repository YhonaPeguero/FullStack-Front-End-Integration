// eslint-disable-next-line react/prop-types
const NoteTab = ({ id, isActive, content, onContentChange }) => {
  if (!isActive) return null;

  return (
    <div className={`tab-pane ${isActive ? 'active' : ''}`} id={id} role="tabpanel">
      <textarea
        className="form-control"
        value={content}
        onChange={onContentChange}
        rows="10"
        placeholder="Escribe tu nota aquí..."
      ></textarea>
    </div>
  );
};

export default NoteTab;
