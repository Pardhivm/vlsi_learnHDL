import { Link } from "react-router-dom";

function CourseCard({ title, description, path }) {
  return (
    <div className="course-card">

      <h3>{title}</h3>

      <p>{description}</p>

      {path ? (
        <Link
          to={path}
          className="course-button"
        >
          Learn {title}
        </Link>
      ) : (
        <button className="course-button">
          Learn {title}
        </button>
      )}

    </div>
  );
}

export default CourseCard;