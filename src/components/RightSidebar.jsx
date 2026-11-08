function RightSidebar({ sections = [] }) {
  return (
    <aside className="right-sidebar">

      <h3>On this page</h3>

      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
        >
          {section.title}
        </a>
      ))}

    </aside>
  );
}

export default RightSidebar;