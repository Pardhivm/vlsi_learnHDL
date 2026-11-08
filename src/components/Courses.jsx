import CourseCard from "./CourseCard";
import courses from "../config/courses";

function Courses() {
  return (
    <section className="courses">

      <h2>Explore Our Courses</h2>

      <p className="courses-subtitle">
        Learn the technologies used in VLSI and hardware design.
      </p>

      <div className="course-container">

        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            path={
              course.status === "available"
                ? course.path
                : null
            }
          />
        ))}

      </div>

    </section>
  );
}

export default Courses;