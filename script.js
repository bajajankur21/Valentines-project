// --- CONFIGURATION ---
const questions = [
  {
    question: "What was the one thing that did not happen on our first date?",
    options: [
      "I cooked for you",
      "We watched a movie",
      "We watched TMKOC",
      "We kissed",
    ],
    correct: 3, // Make sure this index matches the correct answer! (0 is first, 1 is second...)
  },
  {
    question: "What is my favorite food cooked by you?",
    options: ["Chole bhature", "Mutton gravy", "Lahori Paneer", "Poha"],
    correct: 0,
  },
  {
    question: "Where was this photo taken?",
    image: "./us.jpeg",
    options: ["The Culiniriam", "Earl's Kitchen", "The palm", "Society"],
    correct: 0,
  },
  {
    question: "What is our anniversary date?",
    options: ["Nov 5th", "Oct 10th", "Nov 9th", "Oct 5th"],
    correct: 3,
  },
  {
    question: "Who said 'I love you' first?",
    options: ["Me", "You", "We said it together", "Neither yet"],
    correct: 0,
  },
];

// --- LOGIC ---
let currentQuestionIndex = 0;
let errorTimeout; // Variable to track the timer

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById("question-text").innerText = q.question;
  const optionsDiv = document.getElementById("options-container");
  optionsDiv.innerHTML = "";

  const imgContainer = document.getElementById("image-container");
  imgContainer.innerHTML = "";
  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    imgContainer.appendChild(img);
  }

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];

  if (selectedIndex === q.correct) {
    // Correct!
    showHeart();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(showQuestion, 1000);
    } else {
      setTimeout(showProposal, 1000);
    }
  } else {
    // Wrong! Show the Error Overlay
    showError("Wrong answer! 😤 Try again!");
  }
}

function showHeart() {
  const heartOverlay = document.getElementById("heart-overlay");
  heartOverlay.classList.remove("hidden");
  setTimeout(() => {
    heartOverlay.classList.add("hidden");
  }, 1000);
}

function showProposal() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("proposal-container").classList.remove("hidden");
}

function rejectProposal() {
  // Show the Error Overlay for rejection
  showError("System has detected you’re already my valentine. Pick again.");
}

function acceptProposal() {
  document.getElementById("proposal-container").classList.add("hidden");
  document.getElementById("success-container").classList.remove("hidden");
}

// --- NEW FUNCTION TO HANDLE ERRORS ---
function showError(message) {
  const overlay = document.getElementById("error-overlay");
  const msgElement = document.getElementById("error-message");

  // Set the text
  msgElement.innerText = message;

  // Show the overlay
  overlay.classList.remove("hidden");

  // Clear any existing timer so they don't overlap
  clearTimeout(errorTimeout);

  // Automatically hide after 2.5 seconds (gives her time to read)
  errorTimeout = setTimeout(() => {
    overlay.classList.add("hidden");
  }, 2500);
}

// Allow her to dismiss it early by clicking
function closeError() {
  const overlay = document.getElementById("error-overlay");
  overlay.classList.add("hidden");
  clearTimeout(errorTimeout);
}
