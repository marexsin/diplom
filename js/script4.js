const questions = [
    {
        question: "Какой запрос позволяет выбрать уникальные данные по определенным столбцам?",
        options: [
            "DISTINCT",
            "LIMIT",
            "ORDER BY",
            "VARCHAR"
        ],
        correct: "DISTINCT",
        explanation: "Ключевое слово `DISTINCT` используется в запросе `SELECT` для возврата только уникальных (различных) значений для указанных столбцов. Дублирующиеся строки будут исключены из результата."
    },
    {
        question: "Какой запрос позволяет отсортировать значения по определенному столбцу?",
        options: [
            "DISTINCT",
            "LIMIT",
            "ORDER BY",
            "VARCHAR"
        ],
        correct: "ORDER BY",
        explanation: "Предложение `ORDER BY` используется для сортировки результирующего набора данных по одному или нескольким столбцам. По умолчанию сортировка производится по возрастанию (`ASC`), но можно указать `DESC` для сортировки по убыванию."
    },
    {
        question: "Для чего нужен оператор IN?",
        options: [
            "Определяет набор значений, которые должны иметь столбцы",
            "Получение строки",
            "Переименовать таблицу",
            "Получение всех столбцов"
        ],
        correct: "Определяет набор значений, которые должны иметь столбцы",
        explanation: "Оператор `IN` позволяет указать несколько значений в предложении `WHERE`. Он возвращает строки, у которых значение указанного столбца совпадает с любым значением из предоставленного списка. Например, `WHERE город IN ('Москва', 'Киев', 'Минск')`."
    },
    {
        question: "Что делает функция Avg?",
        options: [
            "Извлекает определенное количество строк",
            "Возвращает среднее значение на диапазоне значений столбца таблицы",
            "Указывает, с какой строки надо начинать выборку",
            "Добавление данных в таблицу"
        ],
        correct: "Возвращает среднее значение на диапазоне значений столбца таблицы",
        explanation: "Агрегатная функция `AVG()` (от Average) вычисляет среднее арифметическое значение для числового столбца. Она игнорирует значения `NULL` при расчете."
    },
    {
        question: "Какой оператор применяется для группировки данных?",
        options: [
            "GROUP BY",
            "FROM",
            "DELETE",
            "ORDER BY"
        ],
        correct: "GROUP BY",
        explanation: "Предложение `GROUP BY` используется для группировки строк, имеющих одинаковые значения в одном или нескольких столбцах, в одну сводную строку. Часто используется с агрегатными функциями (например, `COUNT()`, `SUM()`, `AVG()`) для вычисления метрик по каждой группе."
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

    // Используем questions.length для определения общего количества вопросов
    if (score === questions.length) {
        message = "Отлично!";
    } else if (score >= Math.ceil(questions.length * 0.6)) { // Например, 60% правильных - хороший результат (3 из 5)
        message = "Хороший результат.";
    } else {
        message = "Повторите тему)";
    }

    quizBox.innerHTML = `
    <div class="result">Вы ответили правильно на ${score} из ${questions.length} (${percent}%)</div>
    <div>${message}</div>
    <p><strong>Совет:</strong> Попробуйте выполнить эти действия в pgAdmin на практике.</p>
    <div class="navigation-buttons">
        <button onclick="location.href='chapter4_7.html'" class="nav-button">Вернуться</button>
        <button onclick="location.href='chapter5.html'" class="nav-button">Следующий курс</button>
    </div>
`;
}

// Запуск
showQuestion();