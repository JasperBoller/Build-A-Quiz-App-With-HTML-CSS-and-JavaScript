// ... (keep all your existing variable declarations and fetch code)

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
let correctAnswersCount = 0; // Track number of correct answers

startGame = () => {
    questionCounter = 0;
    score = 0;
    correctAnswersCount = 0; // Reset correct answers counter
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

// Update the answer checking logic
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            correctAnswersCount++; // Increment correct answers count
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // Highlight correct answer if wrong was selected
        if (classToApply === 'incorrect') {
            const correctChoice = choices.find(
                choice => choice.dataset['number'] == currentQuestion.answer
            );
            correctChoice.parentElement.classList.add('correct');
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            
            // Remove correct highlight if it was shown
            if (classToApply === 'incorrect') {
                const correctChoice = choices.find(
                    choice => choice.dataset['number'] == currentQuestion.answer
                );
                correctChoice.parentElement.classList.remove('correct');
            }
            
            getNewQuestion();
        }, 1000);
    });
});

// Modify the end game logic to store additional data
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('correctAnswers', correctAnswersCount);
        localStorage.setItem('totalQuestions', MAX_QUESTIONS);
        localStorage.setItem('percentageScore', Math.round((correctAnswersCount / MAX_QUESTIONS) * 100));
        
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// Keep your existing incrementScore function
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};