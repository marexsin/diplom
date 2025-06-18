// script6.js
const questions = [
  {
    question:
      "При неявном соединении нескольких таблиц (перечислением в FROM), какое выражение используется для указания условия связи между ними?",
    options: ["JOIN ON", "WHERE", "CONNECT BY", "LINK WITH"],
    correct: "WHERE",
    explanation:
      "В неявном соединении условие, по которому связываются строки из разных таблиц (например, равенство внешнего и первичного ключей), указывается в предложении WHERE.",
  },
  {
    question:
      "При использовании оператора `INNER JOIN`, какое ключевое слово следует за ним для определения условия соединения таблиц?",
    options: ["WHERE", "WITH", "ON", "BY"],
    correct: "ON",
    explanation:
      "Условие соединения для `INNER JOIN` (а также `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`) указывается после ключевого слова `ON`. Например: `Customers c INNER JOIN Orders o ON c.Id = o.CustomerId`.",
  },
  {
    question:
      "Какой тип `OUTER JOIN` вернет все строки из первой (левой) таблицы и только совпадающие строки из второй (правой) таблицы, заполняя недостающие данные из правой таблицы значениями NULL?",
    options: [
      "RIGHT OUTER JOIN",
      "FULL OUTER JOIN",
      "INNER JOIN",
      "LEFT OUTER JOIN",
    ],
    correct: "LEFT OUTER JOIN",
    explanation:
      "`LEFT OUTER JOIN` (или просто `LEFT JOIN`) включает все строки из левой таблицы. Если для строки из левой таблицы нет соответствия в правой, столбцы правой таблицы в результирующей строке будут содержать NULL.",
  },
  {
    question:
      "Если выполнить запрос с `INNER JOIN` двух таблиц (например, `Customers` и `Orders`) и затем сгруппировать результат по покупателям (`GROUP BY Customers.Id`), какие покупатели попадут в итоговую выборку?",
    options: [
      "Все покупатели, независимо от наличия заказов",
      "Только покупатели, у которых есть хотя бы один заказ",
      "Только покупатели, у которых нет заказов",
      "Все покупатели, и для каждого будет показан один случайный заказ",
    ],
    correct: "Только покупатели, у которых есть хотя бы один заказ",
    explanation:
      "`INNER JOIN` возвращает только те строки, для которых найдено соответствие в обеих таблицах. Следовательно, при группировке по покупателям в результат попадут только те, для которых существуют связанные записи о заказах.",
  },
  {
    question: "Каково основное назначение оператора `UNION` в SQL?",
    options: [
      "Соединять столбцы из разных таблиц на основе ключей",
      "Объединять строки из двух или более SELECT-запросов в один результирующий набор, удаляя дубликаты",
      "Вычислять разность между двумя наборами строк",
      "Создавать перекрестное произведение таблиц",
    ],
    correct:
      "Объединять строки из двух или более SELECT-запросов в один результирующий набор, удаляя дубликаты",
    explanation:
      "Оператор `UNION` используется для комбинирования результатов нескольких SELECT-запросов в единый набор строк. Важно, чтобы запросы имели одинаковое количество столбцов совместимых типов. По умолчанию `UNION` удаляет дублирующиеся строки.",
  },
  {
    question:
      "Что делает оператор `EXCEPT` применительно к двум SELECT-запросам?",
    options: [
      "Возвращает все строки из обоих запросов, включая дубликаты",
      "Возвращает только те строки, которые присутствуют в результатах обоих запросов",
      "Возвращает строки из первого запроса, которых нет во втором запросе",
      "Возвращает строки из второго запроса, которых нет в первом запросе",
    ],
    correct:
      "Возвращает строки из первого запроса, которых нет во втором запросе",
    explanation:
      "Оператор `EXCEPT` выполняет операцию вычитания множеств: он возвращает уникальные строки, которые есть в результате первого SELECT-запроса, но отсутствуют в результате второго SELECT-запроса.",
  },
  {
    question: "Для чего используется оператор `INTERSECT` в SQL?",
    options: [
      "Для объединения всех строк из двух запросов",
      "Для нахождения строк, уникальных для первого запроса",
      "Для нахождения общих (пересекающихся) уникальных строк между двумя SELECT-запросами",
      "Для сортировки результатов объединенного запроса",
    ],
    correct:
      "Для нахождения общих (пересекающихся) уникальных строк между двумя SELECT-запросами",
    explanation:
      "Оператор `INTERSECT` возвращает только те уникальные строки, которые одновременно присутствуют в результатах обоих SELECT-запросов, то есть их пересечение.",
  },
];

let currentQuestion = 0;
let score = 0;

const quizBox = document.getElementById("quiz-box");

function showQuestion() {
  const q = questions[currentQuestion];
  let html = `<div class="question"><strong>Вопрос ${currentQuestion + 1}:</strong> ${q.question}</div>`;
  html += `<form id="quiz-form"><div class="options">`;

  if (q.input) {
    // Эта часть оставлена для совместимости, но в данном тесте не используется
    html += `<input type="text" id="user-input" placeholder="Введите SQL-запрос">`;
  } else {
    q.options.forEach((opt) => {
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

  const isCorrect =
    userAnswer.trim().toLowerCase() === q.correct.trim().toLowerCase();
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

  // Пороговые значения для 7 вопросов
  if (score === questions.length) {
    // 7 правильных ответов
    message = "Отлично!";
  } else if (score >= 5) {
    // 5 или 6 правильных ответов
    message = "Хороший результат.";
  } else {
    // Менее 5 правильных ответов
    message = "Повторите тему)";
  }

  quizBox.innerHTML = `
    <div class="result">Вы ответили правильно на ${score} из ${questions.length} (${percent}%)</div>
    <div>${message}</div>
    <p><strong>Совет:</strong> Попробуйте выполнить запросы на соединение таблиц и операции над множествами в pgAdmin на практике, чтобы лучше усвоить материал.</p>
    <div class="navigation-buttons">
        <button onclick="location.href='chapter6_7.html'" class="nav-button">Вернуться к теории</button>
        <button onclick="location.href='chapter7.html'" class="nav-button">Следующий курс</button>
    </div>
`;
}

// Запуск
showQuestion();
