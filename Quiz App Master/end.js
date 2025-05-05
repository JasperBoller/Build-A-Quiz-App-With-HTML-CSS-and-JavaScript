// DOM Elements
const finalScore = document.getElementById('finalScore');
const correctAnswersEl = document.getElementById('correctAnswers');
const totalQuestionsEl = document.getElementById('totalQuestions');
const percentageScoreEl = document.getElementById('percentageScore');
const feedbackMessage = document.getElementById('feedbackMessage');
const usernameInput = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const saveScoreForm = document.getElementById('saveScoreForm');

// Get results from localStorage
const mostRecentScore = localStorage.getItem('mostRecentScore');
const correctAnswers = localStorage.getItem('correctAnswers');
const totalQuestions = localStorage.getItem('totalQuestions');
const percentageScore = localStorage.getItem('percentageScore');

// High Scores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;

// Display results
finalScore.innerText = mostRecentScore;
correctAnswersEl.innerText = correctAnswers;
totalQuestionsEl.innerText = totalQuestions;
percentageScoreEl.innerText = percentageScore;

// Add feedback based on percentage
const percentage = parseInt(percentageScore);
if (percentage >= 90) {
    feedbackMessage.innerText = "Excellent! 🎉";
} else if (percentage >= 70) {
    feedbackMessage.innerText = "Good job! 👍";
} else if (percentage >= 50) {
    feedbackMessage.innerText = "Not bad! 😊";
} else {
    feedbackMessage.innerText = "Keep practicing! 💪";
}

// Enable save button when username is entered
usernameInput.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !usernameInput.value;
});

// Save high score
saveScoreForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const score = {
        score: mostRecentScore,
        correctAnswers: correctAnswers,
        totalQuestions: totalQuestions,
        percentage: percentageScore,
        name: usernameInput.value,
        date: new Date().toLocaleDateString()
    };
    
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // Disable form after submission
    usernameInput.disabled = true;
    saveScoreBtn.disabled = true;
    
    // Show confirmation
    feedbackMessage.textContent = `Score saved for ${usernameInput.value}!`;
    feedbackMessage.style.color = "#4CAF50";
});