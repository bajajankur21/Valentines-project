// --- CONFIGURATION ---
const questions = [
    {
        question: "What was the one thing I brought which was dirty",
        options: ["Food", "Bike ride", "The dirty helmet", "My clothes"],
        correct: 2 
    },
    {
        question: "What is my favorite food?",
        options: ["Pizza", "Sushi", "Burgers", "Tacos"],
        correct: 0
    },
    {
        question: "Where was this photo taken?",
        image: "us.jpg", 
        options: ["Paris", "London", "New York", "Our Backyard"],
        correct: 3
    },
    {
        question: "What is our anniversary date?",
        options: ["Jan 1st", "Feb 14th", "Dec 25th", "July 4th"],
        correct: 1
    },
    {
        question: "Who said 'I love you' first?",
        options: ["Me", "You", "We said it together", "Neither yet"],
        correct: 0
    }
];

// --- LOGIC ---
let currentQuestionIndex = 0;
let errorTimeout; 

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.question;
    const optionsDiv = document.getElementById('options-container');
    optionsDiv.innerHTML = ""; 
    
    const imgContainer = document.getElementById('image-container');
    imgContainer.innerHTML = ""; 
    if (q.image) {
        const img = document.createElement('img');
        img.src = q.image;
        imgContainer.appendChild(img);
    }

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];

    if (selectedIndex === q.correct) {
        showHeart();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(showQuestion, 1000); 
        } else {
            setTimeout(showProposal, 1000); 
        }
    } else {
        showError("Wrong answer! 😤 Try again!");
    }
}

function showHeart() {
    const heartOverlay = document.getElementById('heart-overlay');
    heartOverlay.classList.remove('hidden');
    setTimeout(() => {
        heartOverlay.classList.add('hidden');
    }, 1000);
}

function showProposal() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('proposal-container').classList.remove('hidden');
}

function rejectProposal() {
    showError("System has detected you’re already my valentine. Pick again.");
}

function acceptProposal() {
    // 1. Reveal Success Screen Immediately (UI First)
    document.getElementById('proposal-container').classList.add('hidden');
    document.getElementById('success-container').classList.remove('hidden');

    // 2. Send Email via EmailJS
    // I have added your service ID here:
    const serviceID = "service_2gcpzaj"; 
    
    // REPLACE THIS WITH YOUR TEMPLATE ID
    const templateID = "template_k5im4n9"; 

    // Optional: Parameters to send to the template (if your template uses variables)
    const templateParams = {
        message: "She said YES! 💍",
        reply_to: "better_treat_her_right"
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            console.log("Email sent successfully!");
        })
        .catch((err) => {
            console.error("Failed to send email:", err);
        });
}

// --- ERROR HANDLING ---
function showError(message) {
    const overlay = document.getElementById('error-overlay');
    const msgElement = document.getElementById('error-message');
    
    msgElement.innerText = message;
    overlay.classList.remove('hidden');

    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        overlay.classList.add('hidden');
    }, 2500);
}

function closeError() {
    const overlay = document.getElementById('error-overlay');
    overlay.classList.add('hidden');
    clearTimeout(errorTimeout);
}
