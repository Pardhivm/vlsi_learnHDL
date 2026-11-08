import { Link } from "react-router-dom";

import LessonLayout from "./LessonLayout";
import RightSidebar from "./RightSidebar";
import VerilogSidebar from "./VerilogSidebar";

function LessonPage({
  title,
  courseName = "Verilog",
  children,
  sections = [],
  previousLesson,
  previousPath,
  nextLesson,
  nextPath,
  sidebar
}) {

  // Use the provided sidebar.
  // If no sidebar is provided, use the Verilog sidebar.
  const activeSidebar = sidebar || <VerilogSidebar />;

  return (
    <LessonLayout
      sidebar={activeSidebar}
      courseName={courseName}
      rightSidebar={<RightSidebar sections={sections} />}
    >

      <h1>{title}</h1>

      {children}

      <div className="lesson-navigation">

        {previousLesson ? (
          <Link
            to={previousPath}
            className="previous-button"
          >
            ← {previousLesson}
          </Link>
        ) : (
          <div></div>
        )}

        {nextLesson && (
          <Link
            to={nextPath}
            className="next-button"
        >
            {nextLesson} →
          </Link>
        )}

      </div>

    </LessonLayout>
  );
}

export default LessonPage;