function LearningNote({
  type = "info",
  title = "Note",
  children
}) {
  return (
    <div className={`learning-note learning-note-${type}`}>

      <strong>{title}</strong>

      <div className="learning-note-content">
        {children}
      </div>

    </div>
  );
}

export default LearningNote;