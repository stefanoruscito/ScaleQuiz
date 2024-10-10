// Dati delle scale maggiori e gradi corrispondenti
const scales = {
    'Do maggiore':  ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
    'Sol maggiore': ['Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa#'],
    'Re maggiore':  ['Re', 'Mi', 'Fa#', 'Sol', 'La', 'Si', 'Do#'],
    'La maggiore':  ['La', 'Si', 'Do#', 'Re', 'Mi', 'Fa#', 'Sol#'],
    'Mi maggiore':  ['Mi', 'Fa#', 'Sol#', 'La', 'Si', 'Do#', 'Re#'],
    'Si maggiore':  ['Si', 'Do#', 'Re#', 'Mi', 'Fa#', 'Sol#', 'La#'],
    'Fa# maggiore': ['Fa#', 'Sol#', 'La#', 'Si', 'Do#', 'Re#', 'Fa'],
    'Fa maggiore':  ['Fa', 'Sol', 'La', 'Sib', 'Do', 'Re', 'Mi'],
    'Sib maggiore': ['Sib', 'Do', 'Re', 'Mib', 'Fa', 'Sol', 'La'],
    'Mib maggiore': ['Mib', 'Fa', 'Sol', 'Lab', 'Sib', 'Do', 'Re'],
    'Lab maggiore': ['Lab', 'Sib', 'Do', 'Reb', 'Mib', 'Fa', 'Sol'],
    'Reb maggiore': ['Reb', 'Mib', 'Fa', 'Solb', 'Lab', 'Sib', 'Do'],
    'Solb maggiore': ['Solb', 'Lab', 'Sib', 'Dob', 'Reb', 'Mib', 'Fa'],
    'Dob maggiore': ['Dob', 'Reb', 'Mib', 'Fab', 'Solb', 'Lab', 'Sib']	
    // Aggiungi altre scale qui
};

let currentScale = '';
let currentQuestion = {};
let score = 0;
let questionCount = 0;
const totalQuestions = 5; // Numero di domande per quiz

// Funzione per ottenere una nota dalla scala e dal grado
function getNoteFromScale(scale, degree) {
    return scales[scale][degree - 1];
}

// Funzione per generare una domanda
function generateQuestion(scale) {
    const degree = Math.floor(Math.random() * 7) + 1; // Numero casuale tra 1 e 7
    const correctAnswer = getNoteFromScale(scale, degree);
    return {
        question: `Qual è la ${degree}ª nota della scala ${scale}?`,
        answer: correctAnswer
    };
}

// Inizializza il quiz
document.getElementById('start-quiz').addEventListener('click', () => {
    currentScale = document.getElementById('scale').value;
    score = 0;
    questionCount = 0;
    startNewQuestion();
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('question-section').classList.remove('hidden');
});

// Gestisce la verifica della risposta
document.getElementById('submit-answer').addEventListener('click', () => {
    const userAnswer = document.getElementById('answer').value;
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        score++;
        document.getElementById('result').textContent = 'Risposta corretta!';
    } else {
        document.getElementById('result').textContent = `Risposta errata. La risposta corretta era: ${currentQuestion.answer}`;
    }
    document.getElementById('question-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('answer').value = '';
});

// Passa alla prossima domanda o termina il quiz
document.getElementById('next-question').addEventListener('click', () => {
    questionCount++;
    if (questionCount < totalQuestions) {
        startNewQuestion();
        document.getElementById('result-section').classList.add('hidden');
        document.getElementById('question-section').classList.remove('hidden');
    } else {
        endQuiz();
    }
});

// Ricomincia il quiz
document.getElementById('restart-quiz').addEventListener('click', () => {
    document.getElementById('final-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
});

// Avvia una nuova domanda
function startNewQuestion() {
    currentQuestion = generateQuestion(currentScale);
    document.getElementById('question').textContent = currentQuestion.question;
}

// Termina il quiz e mostra il punteggio finale
function endQuiz() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('final-score').textContent = `Il tuo punteggio finale è ${score} su ${totalQuestions}`;
    document.getElementById('final-section').classList.remove('hidden');
}
