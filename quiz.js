// quiz.js
// Muestra preguntas y al finalizar redirige a results.html con el resultado

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const backButton = document.getElementById("back");

let questions = [];
let selectedQuestions = [];
let examMode = localStorage.getItem("examMode") || "20";

// cargar preguntas (con cache-busting)
fetch("questions.json?v=" + Date.now())
  .then(res => res.json())
  .then(data => {
    if (examMode === "100") {
  questions = data;               // SIN mezclar
  selectedQuestions = questions.slice(0, 100);
} else {
  questions = shuffleArray(data); // Para las 20 sí se mezcla
  selectedQuestions = questions.slice(0, 20);
}

    showQuiz();
  })
  .catch(() => {
    quizContainer.innerHTML = "<p>Error al cargar las preguntas.</p>";
  });

// mostrar preguntas
function showQuiz() {
  quizContainer.innerHTML = "";
  selectedQuestions.forEach((q, index) => {
    const questionHTML = `
      <div class="question">
        <p><strong>${index + 1}. ${q.question}</strong></p>
        ${q.options
          .map(
            opt =>
              `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
          )
          .join("")}
      </div><br>
    `;
    quizContainer.innerHTML += questionHTML;
  });
}

// cuando se envía el examen
submitButton.addEventListener("click", () => {
  const userAnswers = [];

  selectedQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const userAnswer = selected ? selected.value : null;
    userAnswers.push({
      question: q.question,
      options: q.options,
      correct: q.answer,
      selected: userAnswer,
      isCorrect: userAnswer === q.answer,
    });
  });

  // guardar los resultados en localStorage
  localStorage.setItem("quizResults", JSON.stringify(userAnswers));
  localStorage.setItem("totalQuestions", selectedQuestions.length);

  // redirigir a results.html
  window.location.href = "results.html";
});

// volver
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// mezclar array
function shuffleArray(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}



// Cronometro
let seconds = 0;
const timer = document.getElementById("timer");

setInterval(() => {
  seconds++;
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  timer.textContent = `${mins}:${secs}`;
}, 1000);
