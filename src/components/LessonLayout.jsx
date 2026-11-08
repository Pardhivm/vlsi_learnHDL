import { useState } from "react";

function LessonLayout({
  sidebar,
  courseName = "Verilog",
  children,
  rightSidebar
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="learning-layout">

      {!sidebarOpen && (
        <button
          className="lesson-menu-button"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      <div
        className={`mobile-sidebar ${
          sidebarOpen ? "active" : ""
        }`}
      >

        <div className="mobile-sidebar-header">

          <h2>{courseName}</h2>

          <button
            className="mobile-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

        </div>

        {sidebar}

      </div>

      <div className="desktop-sidebar">
        {sidebar}
      </div>

      <main className="lesson-content">
        {children}
      </main>

      {rightSidebar}

    </div>
  );
}

export default LessonLayout;