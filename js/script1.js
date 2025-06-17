const questions = [
    {
        question: "Какая команда используется для создания новой базы данных в PostgreSQL?",
        options: [
            "NEW DATABASE",
            "ADD DATABASE",
            "CREATE DATABASE",
            "MAKE DATABASE"
        ],
        correct: "CREATE DATABASE",
        explanation: "Синтаксис создания БД — CREATE DATABASE имя_бд;."
    },
    {
        question: "Какой инструмент НЕ упоминался для выполнения SQL-запросов?",
        options: [
            "pgAdmin",
            "MySQL Workbench",
            "psql",
            "Query Tool в pgAdmin"
        ],
        correct: "MySQL Workbench",
        explanation: "В тексте указаны pgAdmin и psql, но не MySQL Workbench."
    },
    {
        question: "Что нужно сделать перед удалением базы данных?",
        options: [
            "Убедиться, что она неактивна (нет подключений).",
            "Создать её резервную копию.",
            "Переименовать её.",
            "Закрыть pgAdmin."
        ],
        correct: "Убедиться, что она неактивна (нет подключений).",
        explanation: "Команда DROP DATABASE требует, чтобы БД была отключена."
    },
    {
        question: "Как обновить список баз данных в pgAdmin после создания новой?",
        options: [
            "Перезапустить программу.",
            "Нажать правой кнопкой на узел \"Databases\" → \"Refresh\".",
            "Ввести команду RELOAD DATABASES.",
            "Удалить и заново открыть pgAdmin."
        ],
        correct: "Нажать правой кнопкой на узел \"Databases\" → \"Refresh\".",
        explanation: "Обновление через контекстное меню в левой панели."
    },
    {
        question: "Напишите SQL-запрос для удаления базы данных с названием test_db.",
        input: true,
        correct: "DROP DATABASE test_db;",
        explanation: "Правильный синтаксис DROP DATABASE с именем test_db."
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
        message = "Повторите тему «Управление БД в PostgreSQL».";
    }

    quizBox.innerHTML = `
    <div class="result">Вы ответили правильно на ${score} из ${questions.length} (${percent}%)</div>
    <div>${message}</div>
    <p><strong>Совет:</strong> Попробуйте выполнить эти действия в pgAdmin на практике.</p>
    <div class="navigation-buttons">
        <button onclick="location.href='chapter1_4.html'" class="nav-button">Вернуться</button>
        <button onclick="location.href='chapter2.html'" class="nav-button">Следующий курс</button>
    </div>
`;
}

// Запуск
showQuestion();