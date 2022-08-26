const questions = [
    {
        question: 'Welche Sprache funktioniert im Browser?',
        answers: ['Java', 'C', 'Python', 'JavaScript',],
        correct: 4,
    },
    {
        question: 'Was bedeutet CSS?',
        answers: [
            'Central Style Sheets', 
            'Cascading Style Sheets', 
            'Cascading Simple Sheets', 
            'Cars Style Sheetst',
        ],
        correct: 2,
    },
    {
        question: 'Was bedeutet HTML?',
        answers: [
            'Hypertext Markup Language', 
            'Hypertext Mardown Language', 
            'Hypertext Machine Language', 
            'Helicopters Terminals Motoboats Language',
        ],
        correct: 1,
    },
    {
        question: 'Im welchem Jahr wurde das JavaScript erstellt?',
        answers: ['1996', '1995', '1994', '2000'],
        correct: 2,
    },
];

const quizHeader = document.querySelector('.quiz-header');
const quizList = document.querySelector('.quiz-list');
const btn = document.querySelector('.quiz-submit');

let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQestion();
btn.addEventListener('click', checkAnswer);

// очистка HTML-разметки
function clearPage() {
    quizHeader.innerHTML = '';
    quizList.innerHTML = '';
} 

function showQestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`; 
    // вопрос
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    quizHeader.innerHTML = title;

    // варианты ответов
    let answerNumber = 1;
    for ([index, item] of questions[questionIndex]['answers'].entries()) {
        
        const questionTemplate = `
            <li>
                <label>
                    <input value="%number%" type="radio" class="answer" name="answer" />
                    <span>%answer%</span>
                </label>
            </li>
        `;

        const answerHTML = questionTemplate
                                .replace("%answer%", item)
                                .replace("%number%", answerNumber);

        quizList.innerHTML += answerHTML;
        answerNumber++;
    }
}

// функция проверки, правильно ли ответил пользователь
 function checkAnswer() {

    // находим выбранную радиокнопку
    const checkedRadio = quizList.querySelector('input[type="radio"]:checked');
    
    if (!checkedRadio) {
        btn.blur();
        return;  // если ответ не выбран, ничего не делаем, выходим из функции
    }

    // получаем номер ответа, что выбрал пользователь
    const userAnswer = parseInt(checkedRadio.value); // сразу переводим ответ в число

    // если ответ верен, увеличиваем счет
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
        console.log('score = ', score);
    }
    // проверка был ли это последний вопрос
    if (questionIndex === questions.length - 1) {
        console.log('Das ist die letzte Frage');
        clearPage();
        showResult();
    } else {
        questionIndex++; // увеличиваем индекс
        clearPage();
        showQestion();
    }

}
// считаем результат
function showResult() {
        const resultTemplate = `
            <h2 class="title">%title%</h2>
            <h3 class="summary">%message%</h3>
            <p class="result">%result%</p>
        `;

        let title, message;

        // варианты заголовков и текста
        if (score === questions.length) {
            title = 'Glückwunsch!' ;
            message = 'Sie haben alle Fragen richtig beantwortet!';
        } else if (score * 100 / questions.length >= 50) {
            title = 'Gutes Ergebnis!';
            message = 'Sie haben mehr als die Hälfte der richtigen Antworten';
        } else {
            title = 'Versuchen Sie es noch einmal';
            message = 'Sie haben weniger als die Hälfte der richtigen Antworten';
        }
    // результат
     let result = `${score} aus ${questions.length}`;

     // финанльный ответ
     const finalMessage = resultTemplate
                            .replace('%title%', title)
                            .replace('%message%', message)
                            .replace('%result%', result);

    quizHeader.innerHTML = finalMessage;
        
    // меняем кнопку
        btn.blur();
        btn.innerHTML = 'Von neuem beginnen';
        btn.addEventListener('click', () => history.go());
    }
