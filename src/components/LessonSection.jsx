function LessonSection({ title, children, id }) {
  return (
    <section
      id={id}
      className="lesson-section"
    >
      <h2>{title}</h2>

      {children}
    </section>
  );
}

export default LessonSection;