// Evento para el botón de 20 preguntas
document.getElementById("btn20").addEventListener("click", () => {
  startExam("20");
});

// Evento para el botón de 100 preguntas
document.getElementById("btn100").addEventListener("click", () => {
  startExam("100");
});

// Guarda el modo del examen y redirige a la página del simulacro
function startExam(mode) {
  localStorage.setItem("examMode", mode);
  window.location.href = "quiz.html";
}
