import { Link } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  const { id, title, description, level, duration, students, image, category } =
    course;

  return (
    <div className='course-card'>
      <div className='course-card-image'>
        <img src={image} alt={title} />
        <span className={`course-level ${level.toLowerCase()}`}>{level}</span>
      </div>

      <div className='course-card-content'>
        <span className='course-category'>{category}</span>
        <h3 className='course-title'>{title}</h3>
        <p className='course-description'>{description}</p>

        <div className='course-stats'>
          <div className='stat'>
            <span className='stat-icon'>👥</span>
            <span>{students} estudiantes</span>
          </div>
          <div className='stat'>
            <span className='stat-icon'>⏱️</span>
            <span>{duration}</span>
          </div>
        </div>

        <Link to={`/course/${id}`} className='course-button'>
          Ver Curso
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
