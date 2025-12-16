import "./Practice.css";

const Practice = () => {
  const challenges = [
    {
      id: 1,
      title: "FizzBuzz",
      difficulty: "Fácil",
      category: "Lógica",
      description:
        'Imprime los números del 1 al 100, pero reemplaza múltiplos de 3 con "Fizz", múltiplos de 5 con "Buzz", y múltiplos de ambos con "FizzBuzz".',
      attempts: 1234,
    },
    {
      id: 2,
      title: "Palíndromo",
      difficulty: "Fácil",
      category: "Strings",
      description:
        "Determina si una cadena es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).",
      attempts: 987,
    },
    {
      id: 3,
      title: "Array Rotation",
      difficulty: "Medio",
      category: "Arrays",
      description: "Rota un array k posiciones hacia la derecha.",
      attempts: 654,
    },
    {
      id: 4,
      title: "Binary Tree Traversal",
      difficulty: "Difícil",
      category: "Estructuras de Datos",
      description:
        "Implementa los tres tipos de recorrido de árboles binarios: inorder, preorder y postorder.",
      attempts: 432,
    },
    {
      id: 5,
      title: "API REST",
      difficulty: "Medio",
      category: "Backend",
      description:
        "Crea una API REST básica con endpoints CRUD para gestionar usuarios.",
      attempts: 789,
    },
    {
      id: 6,
      title: "Validador de Formularios",
      difficulty: "Medio",
      category: "Frontend",
      description:
        "Implementa un sistema de validación de formularios con React.",
      attempts: 856,
    },
  ];

  const getDifficultyClass = (difficulty) => {
    return difficulty.toLowerCase().replace("á", "a").replace("í", "i");
  };

  return (
    <div className='practice-page'>
      <section className='practice-hero'>
        <div className='container'>
          <h1>Zona de Práctica</h1>
          <p>Mejora tus habilidades con desafíos de programación reales</p>
        </div>
      </section>

      <section className='practice-content'>
        <div className='container'>
          <div className='practice-info'>
            <div className='info-card'>
              <span className='info-icon'>💪</span>
              <h3>Desafía tus habilidades</h3>
              <p>
                Resuelve problemas de programación de diferentes niveles de
                dificultad
              </p>
            </div>
            <div className='info-card'>
              <span className='info-icon'>🏆</span>
              <h3>Gana recompensas</h3>
              <p>Desbloquea logros y sube en el ranking mientras progresas</p>
            </div>
            <div className='info-card'>
              <span className='info-icon'>📊</span>
              <h3>Rastrea tu progreso</h3>
              <p>Visualiza tu evolución y áreas de mejora</p>
            </div>
          </div>

          <h2 className='challenges-title'>Desafíos Disponibles</h2>

          <div className='challenges-grid'>
            {challenges.map((challenge) => (
              <div key={challenge.id} className='challenge-card'>
                <div className='challenge-header'>
                  <span className='challenge-category'>
                    {challenge.category}
                  </span>
                  <span
                    className={`challenge-difficulty ${getDifficultyClass(
                      challenge.difficulty
                    )}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className='challenge-title'>{challenge.title}</h3>
                <p className='challenge-description'>{challenge.description}</p>

                <div className='challenge-footer'>
                  <span className='challenge-attempts'>
                    👥 {challenge.attempts} intentos
                  </span>
                  <button className='challenge-button'>Resolver</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Practice;
