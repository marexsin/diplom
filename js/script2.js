const questions = [
    {
        question: "Какая команда используется для удаления базы данных в PostgreSQL?",
        options: [
            "NEW DATABASE",
            "ADD DATABASE",
            "CREATE DATABASE",
            "DROP DATABASE"
        ],
        correct: "DROP DATABASE",
        explanation: "Команда `DROP DATABASE имя_базы_данных;` используется для полного удаления существующей базы данных вместе со всеми ее объектами."
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
        explanation: "Тип данных `boolean` (или `bool`) предназначен для хранения логических значений: `TRUE` (истина), `FALSE` (ложь) или `NULL` (неопределенное значение)."
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
        explanation: "Ограничение `PRIMARY KEY` (первичный ключ) гарантирует, что значения в указанном столбце (или группе столбцов) уникальны и не равны `NULL`, что позволяет однозначно идентифицировать каждую запись в таблице."
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
        explanation: "Внешние ключи (`FOREIGN KEY`) используются для установления и поддержания ссылочной целостности между таблицами. Они связывают столбец (или столбцы) в одной таблице со столбцом (обычно первичным ключом) в другой таблице."
    },
    {
        question: "Для чего используется ALTER TABLE?",
        options: [
            "Дублировать таблицу",
            "Добавить столбец",
            "Изменять уже имеющуюся таблицу",
            "Переименование таблицы"
        ],
        correct: "Изменять уже имеющуюся таблицу",
        explanation: "Команда `ALTER TABLE` позволяет модифицировать структуру существующей таблицы. С ее помощью можно добавлять, изменять или удалять столбцы, добавлять или удалять ограничения, переименовывать таблицу и т.д."
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

    // Добавлено отображение правильного ответа, если ответ неверный
    quizBox.innerHTML = `
        <div class="question"><strong>Вопрос ${currentQuestion + 1}:</strong> ${q.question}</div>
        <div><strong>Ваш ответ:</strong> ${userAnswer}</div>
        <div><strong>${isCorrect ? "✅ Верно!" : `❌ Неверно. Правильный ответ: ${q.correct}`}</strong></div>
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

    if (score === questions.length) { // Изменено для общего случая
        message = "Отлично!";
    } else if (score >= Math.ceil(questions.length * 0.6)) { // Например, 60% правильных - хороший результат
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