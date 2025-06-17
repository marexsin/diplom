const questions = [
    {
        question: "Какая команда используется для удаления базы данных в PostgreSQL?",
        options: [
            "NEW DATABASE",
            "ADD DATABASE",
            "CREATE DATABASE",
            "DROP DATABASE"
        ],
        correct: "DROP DATABASE"
    },
    {
        question: "Какой логический тип может хранить одно из двух значений: true или false?",
        options: [
            "date",
            "text",
            "boolean",
            "path"
        ],
        correct: "boolean",
    },
    {
        question: "Что делает атрибут PRIMARY KEY?",
        options: [
            "Уникальные значения",
            "Уникально идентифицирует строку в таблице",
            "Определяет значение по умолчанию для столбца",
            "Задает ограничение для диапазона значений"
        ],
        correct: "Уникально идентифицирует строку в таблице",
    },
    {
        question: "Что используется для связи между таблицами?",
        options: [
            "Primary key",
            "REFERENCES",
            "Внешние ключи",
            "SET DEFAULT"
        ],
        correct: "Внешние ключи",
    },
    {
        question: "Для чего используется ALTER TABLE?",
        options: [
            "Дубировать таблицу",
            "Добавить столбец",
            "Изменять уже имеющуюся таблицу",
            "Переименование таблицы"
        ],
        correct: "Изменять уже имеющуюся таблицу",
    }
];

let currentQuestion = 0;
let score = 0;

const quizBox = document.getElementById("quiz-box");

function showQuestion() {
    const q = questions[currentQuestion];
    let html = `<div class="question"><strong>Вопрос ${currentQuestion + 1}:</strong> ${q.question}</div>`;
    html += `<form id="quiz-form"><div class="options">`;

    if (q.input) {
        html += `<input type="text" id="user-input" placeholder="Введите SQL-запрос">`;
    } else {
        q.options.forEach(opt => {
            html += `
                <label>
                    <input type="radio" name="option" value="${opt}"> ${opt}
                </label>`;
        });
    }

    html += `</div><button type="submit">Ответить</button></form>`;
    quizBox.innerHTML = html;

    document.getElementById("quiz-form").addEventListener("submit", handleAnswer);
}

function handleAnswer(event) {
    event.preventDefault();

    const q = questions[currentQuestion];
    let userAnswer = "";

    if (q.input) {
        const input = document.getElementById("user-input").value.trim();
        if (!input) {
            alert("Введите SQL-запрос!");
            return;
        }
        userAnswer = input;
    } else {
        const selected = document.querySelector("input[name='option']:checked");
        if (!selected) {
            alert("Выберите вариант ответа!");
            return;
        }
        userAnswer = selected.value;
    }

    const isCorrect = userAnswer.trim().toLowerCase() === q.correct.trim().toLowerCase();
    if (isCorrect) score++;

    quizBox.innerHTML = `
        <div class="question"><strong>Вопрос ${currentQuestion + 1}:</strong> ${q.question}</div>
        <div><strong>Ваш ответ:</strong> ${userAnswer}</div>
        <div><strong>${isCorrect ? "✅ Верно!" : "❌ Неверно."}</strong></div>
        <div><em>${q.explanation}</em></div>
        <button id="next-btn">Далее</button>
    `;

    document.getElementById("next-btn").addEventListener("click", nextQuestion);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const percent = Math.round((score / questions.length) * 100);
    let message = "";

    if (score === 5) {
        message = "Отлично!";
    } else if (score >= 3) {
        message = "Хороший результат.";
    } else {
        message = "Повторите тему)";
    }

    quizBox.innerHTML = `
    <div class="result">Вы ответили правильно на ${score} из ${questions.length} (${percent}%)</div>
    <div>${message}</div>
    <p><strong>Совет:</strong> Попробуйте выполнить эти действия в pgAdmin на практике.</p>
    <div class="navigation-buttons">
        <button onclick="location.href='chapter2_6.html'" class="nav-button">Вернуться</button>
        <button onclick="location.href='chapter3.html'" class="nav-button">Следующий курс</button>
    </div>
`;
}

// Запуск
showQuestion();