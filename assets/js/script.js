// Добавьте этот код в конец файла script.js, после предыдущих функций

// Глобальные переменные для истории
let currentStoryIndex = 0;
let playerName = "";
let playerChoice = null;
let storyPath = [];

// Массив историй с разветвлениями
const storyData = [
    {
        text: "Тебя никто не звал...",
        delay: 3000,
        choices: null,
        next: "auto"
    },
    {
        text: "Но раз уж ты здесь...",
        delay: 3000,
        choices: null,
        next: "auto"
    },
    {
        text: "Я собираю команду для особой миссии.",
        delay: 3500,
        choices: null,
        next: "auto"
    },
    {
        text: "Лишние руки не повредят. Хочешь присоединиться?",
        delay: 4000,
        choices: [
            "Принять предложение",
            "Отказаться",
            "Спросить подробности"
        ],
        next: "choice"
    }
];

// Развитие сюжета в зависимости от выбора
const storyBranches = {
    "Принять предложение": [
        {
            text: "Отлично! Добро пожаловать в Братство Теней.",
            delay: 3000,
            next: "auto"
        },
        {
            text: "Наш мир находится под угрозой. Древнее зло - Глортокс Пожиратель Лун - пробуждается.",
            delay: 4000,
            next: "auto"
        },
        {
            text: "Только объединив силы монстров, драконов и героев аниме, мы сможем его остановить.",
            delay: 4000,
            next: "auto"
        },
        {
            text: "Выбери свой путь:",
            delay: 3000,
            choices: [
                "Стать Охотником на Теней",
                "Призвать Древнего Дракона",
                "Использовать Силу Аниме-артефактов"
            ],
            next: "choice"
        }
    ],
    
    "Отказаться": [
        {
            text: "Жаль... Но двери нашего мира уже открыты для тебя.",
            delay: 3500,
            next: "auto"
        },
        {
            text: "Глортокс почуял твое присутствие. Он будет охотиться за тобой.",
            delay: 4000,
            next: "auto"
        },
        {
            text: "Тебе придется защищаться. Выбери оружие:",
            delay: 3000,
            choices: [
                "Меч Лунного Света",
                "Щит Забвения",
                "Арбалет Тысячи Игл"
            ],
            next: "choice"
        }
    ],
    
    "Спросить подробности": [
        {
            text: "Умный выбор. Рассказываю:",
            delay: 3000,
            next: "auto"
        },
        {
            text: "Наш мир населен уникальными существами:",
            delay: 3500,
            next: "auto"
        },
        {
            text: "Кибер-оборотни из Токио, Фениксы Заката, Драконы Кристальных Пещер...",
            delay: 4000,
            next: "auto"
        },
        {
            text: "Все они объединились против общего врага. Присоединишься?",
            delay: 4000,
            choices: [
                "Да, я с вами!",
                "Мне нужно подумать",
                "Показать мне команду"
            ],
            next: "choice"
        }
    ],
    
    // Ветки второго уровня
    "Стать Охотником на Теней": [
        {
            text: "Ты получаешь Плащ Ночного Охотника и Клинки Сумерек.",
            delay: 3500,
            next: "auto"
        },
        {
            text: "Твоя первая миссия: защитить Деревню Лунных Фей от вторжения Теней.",
            delay: 4000,
            next: "auto"
        },
        {
            text: "Феи дарят тебе амулет Лунного Света. Он будет светить тебе в темноте.",
            delay: 4000,
            next: "ending"
        }
    ],
    
    "Призвать Древнего Дракона": [
        {
            text: "Ты отправляешься в Горный Хребет Вечного Эха.",
            delay: 3500,
            next: "auto"
        },
        {
            text: "После древнего ритуала появляется Азрагор - дракон из Сапфировых Глубин.",
            delay: 4000,
            next: "auto"
        },
        {
            text: "Он признает тебя своим Наездником. Вместе вы - непобедимая сила!",
            delay: 4000,
            next: "ending"
        }
    ],
    
    "Использовать Силу Аниме-артефактов": [
        {
            text: "Тебе открывается доступ в Сокровищницу Забытых Серий.",
            delay: 3500,
            next: "auto"
        },
        {
            text: "Ты находишь: Меч Забвения из Блич, Мангу Всемогущества, Куклу Цукуёми.",
            delay: 4000,
            next: "auto"
        },
        {
            text: "С их помощью ты можешь изменять реальность. Но будь осторожен с силой!",
            delay: 4000,
            next: "ending"
        }
    ],
    
    // Концовки
    "ending_hunter": {
        title: "Охотник Лунного Света",
        text: `${playerName}, ты стал легендой Братства Теней. Феи поют песни о твоих подвигах, а тени боятся твоего имени. Твой путь только начинается...`,
        type: "good"
    },
    
    "ending_dragon": {
        title: "Наездник Сапфирового Дракона",
        text: `Вместе с Азрагором, ${playerName}, ты несешь небесное правосудие. Ваш союз стал символом надежды для всех миров. Небо - ваш дом, облака - ваш путь.`,
        type: "epic"
    },
    
    "ending_anime": {
        title: "Хранитель Аниме-реальности",
        text: `${playerName}, ты обрел силу управлять мирами. Но с великой силой приходит великая ответственность. Помни об этом, Хранитель.`,
        type: "magical"
    }
};

// Основная функция показа истории
function showStoryPhase() {
    const phaseStory = document.getElementById('phase-story');
    const storyContainer = document.getElementById('story-container');
    const monster2Video = document.getElementById('monster2-video');
    
    phaseStory.classList.add('active');
    phaseStory.style.opacity = '1';
    
    // Показ доброго монстра
    setTimeout(() => {
        monster2Video.style.opacity = '1';
        monster2Video.play();
        
        setTimeout(() => {
            monster2Video.style.opacity = '0';
            monster2Video.style.transition = 'opacity 1.2s ease';
            
            setTimeout(() => {
                storyContainer.classList.remove('hidden');
                playMagicSound();
                startStory();
            }, 1200);
        }, 1200);
    }, 500);
}

// Начало истории
function startStory() {
    currentStoryIndex = 0;
    showNextStoryPart();
}

// Показать следующую часть истории
function showNextStoryPart() {
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    const continueBtn = document.getElementById('story-continue');
    
    // Скрыть все элементы
    choicesContainer.classList.add('hidden');
    continueBtn.classList.add('hidden');
    
    // Получить текущую часть истории
    let currentStory = getCurrentStory();
    
    if (!currentStory) {
        showEnding();
        return;
    }
    
    // Показать текст с эффектом печати
    storyText.innerHTML = currentStory.text;
    storyText.classList.add('text-typing');
    
    // Настроить таймер для следующего действия
    setTimeout(() => {
        storyText.classList.remove('text-typing');
        
        if (currentStory.next === "choice" && currentStory.choices) {
            showChoices(currentStory.choices);
        } else if (currentStory.next === "ending") {
            setTimeout(showEnding, 1000);
        } else {
            continueBtn.classList.remove('hidden');
        }
    }, currentStory.delay || 3000);
}

// Получить текущую часть истории
function getCurrentStory() {
    if (storyPath.length === 0) {
        return storyData[currentStoryIndex];
    } else {
        const pathKey = storyPath[storyPath.length - 1];
        const branch = storyBranches[pathKey];
        return branch ? branch[currentStoryIndex] : null;
    }
}

// Показать варианты выбора
function showChoices(choices) {
    const choicesContainer = document.getElementById('choices-container');
    const buttons = choicesContainer.querySelectorAll('.choice-btn');
    
    // Настроить кнопки
    buttons.forEach((btn, index) => {
        if (choices[index]) {
            btn.textContent = choices[index];
            btn.style.display = 'block';
            btn.onclick = () => makeChoice(choices[index]);
        } else {
            btn.style.display = 'none';
        }
    });
    
    choicesContainer.classList.remove('hidden');
    playClickSound();
}

// Обработка выбора
function makeChoice(choice) {
    storyPath.push(choice);
    currentStoryIndex = 0;
    playClickSound();
    showNextStoryPart();
}

// Показать концовку
function showEnding() {
    const storyContainer = document.getElementById('story-container');
    const endingsContainer = document.getElementById('endings-container');
    const endingContent = document.getElementById('ending-content');
    
    storyContainer.classList.add('hidden');
    endingsContainer.classList.remove('hidden');
    
    // Определить концовку
    let ending;
    if (storyPath.includes("Стать Охотником на Теней")) {
        ending = storyBranches.ending_hunter;
    } else if (storyPath.includes("Призвать Древнего Дракона")) {
        ending = storyBranches.ending_dragon;
    } else if (storyPath.includes("Использовать Силу Аниме-артефактов")) {
        ending = storyBranches.ending_anime;
    } else {
        ending = {
            title: "Скиталец Миров",
            text: `${playerName}, твой путь еще не окончен. Мир полон тайн, и каждая тень хранит свою историю. Возможно, мы встретимся снова...`,
            type: "mystery"
        };
    }
    
    // Показать концовку
    endingContent.innerHTML = `
        <h2 style="color: #ffcc00; margin-bottom: 30px; font-family: 'Cinzel', serif;">${ending.title}</h2>
        <p>${ending.text}</p>
    `;
    
    // Настроить кнопку перезапуска
    document.getElementById('restart-btn').onclick = restartGame;
}

// Перезапуск игры
function restartGame() {
    currentStoryIndex = 0;
    playerChoice = null;
    storyPath = [];
    
    const phaseStory = document.getElementById('phase-story');
    const endingsContainer = document.getElementById('endings-container');
    const storyContainer = document.getElementById('story-container');
    
    phaseStory.classList.remove('active');
    phaseStory.style.opacity = '0';
    endingsContainer.classList.add('hidden');
    storyContainer.classList.add('hidden');
    
    // Вернуться к началу
    setTimeout(() => {
        phaseError.classList.add('active');
        phaseError.style.opacity = '1';
        location.reload();
    }, 1000);
}

// Звуковые эффекты
function playMagicSound() {
    const magicSound = document.getElementById('magic-sound');
    if (magicSound) {
        magicSound.currentTime = 0;
        magicSound.play();
    }
}

function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

// Обновите функцию processName в предыдущем коде:
function processName() {
    const userName = nameInput.value.trim();
    if (!userName) return;
    
    playerName = userName;
    
    // 1. Страница светлеет
    phaseHorror.style.opacity = '0';
    phaseHorror.style.transition = 'opacity 2s ease';
    
    setTimeout(() => {
        phaseHorror.classList.remove('active');
        phaseHorror.style.display = 'none';
        
        // 2. Показать историю вместо белой фазы
        showStoryPhase();
    }, 2000);
}

// Добавьте обработчик для кнопки продолжения
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Добавьте этот обработчик
    document.getElementById('continue-btn').addEventListener('click', function() {
        currentStoryIndex++;
        playClickSound();
        showNextStoryPart();
    });
    
    // ... остальной код ...
});
