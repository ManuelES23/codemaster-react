import { useState } from "react";
import CourseCard from "../components/CourseCard";
import "./Courses.css";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLevel, setSelectedLevel] = useState("Todos");

  const courses = [
    {
      id: 1,
      title: "JavaScript Desde Cero",
      description:
        "Aprende JavaScript desde los fundamentos hasta conceptos avanzados.",
      level: "Principiante",
      duration: "8 semanas",
      students: 1200,
      image: "/img/javascript.jpg",
      category: "Desarrollo Web",
    },
    {
      id: 2,
      title: "Python para Data Science",
      description:
        "Domina Python y sus librerías para análisis de datos y machine learning.",
      level: "Intermedio",
      duration: "10 semanas",
      students: 850,
      image: "/img/python.jpg",
      category: "Data Science",
    },
    {
      id: 3,
      title: "React Avanzado",
      description:
        "Construye aplicaciones modernas con React, Hooks y mejores prácticas.",
      level: "Avanzado",
      duration: "12 semanas",
      students: 620,
      image: "/img/react.jpg",
      category: "Frontend",
    },
    {
      id: 4,
      title: "Node.js y Express",
      description:
        "Crea APIs REST y aplicaciones backend escalables con Node.js.",
      level: "Intermedio",
      duration: "9 semanas",
      students: 750,
      image: "/img/nodejs.jpg",
      category: "Backend",
    },
    {
      id: 5,
      title: "CSS y Diseño Responsivo",
      description: "Domina CSS moderno, Flexbox, Grid y diseño mobile-first.",
      level: "Principiante",
      duration: "6 semanas",
      students: 980,
      image: "/img/css.jpg",
      category: "Frontend",
    },
    {
      id: 6,
      title: "Machine Learning con Python",
      description: "Introducción al aprendizaje automático y redes neuronales.",
      level: "Avanzado",
      duration: "14 semanas",
      students: 420,
      image: "/img/ml.jpg",
      category: "Data Science",
    },
  ];

  const categories = [
    "Todos",
    "Desarrollo Web",
    "Frontend",
    "Backend",
    "Data Science",
  ];
  const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"];

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "Todos" || course.category === selectedCategory;
    const levelMatch =
      selectedLevel === "Todos" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className='courses-page'>
      <div className='courses-header'>
        <div className='container'>
          <h1>Todos los Cursos</h1>
          <p>Descubre nuestra amplia selección de cursos de programación</p>
        </div>
      </div>

      <div className='courses-content'>
        <div className='container'>
          <div className='filters'>
            <div className='filter-group'>
              <label>Categoría:</label>
              <div className='filter-buttons'>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className='filter-group'>
              <label>Nivel:</label>
              <div className='filter-buttons'>
                {levels.map((level) => (
                  <button
                    key={level}
                    className={`filter-btn ${
                      selectedLevel === level ? "active" : ""
                    }`}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='courses-results'>
            <p className='results-count'>
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1
                ? "curso encontrado"
                : "cursos encontrados"}
            </p>

            <div className='courses-grid'>
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className='no-results'>
                <p>No se encontraron cursos con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
