// Основные переменные
let playerName = '';
let currentStoryIndex = 0;
let currentPath = 'start';
let storyChoices = [];

// Сегменты истории
const story = {
    start: [
        {
            text: "Приветствую, {name}!",
            delay: 3000,
            autoContinue: true
        },
        {
            text: "Зачем ты пришел?",
            delay: 3000,
            autoContinue: true
        },
        {
            text: "Тебя никто не звал...",
            delay: 3000,
            autoContinue: true
        },
        {
            text: "Но раз уж ты здесь...",
            delay: 3000,
            choices: [
                "Я ищу приключений",
                "Мне нужна помощь",
                "Я просто заблудился"
            ]
        }
    ],
    
    adventure: [
        {
            text: "Приключения? В этом мире они найдут тебя сами.",
            delay: 3500,
            autoContinue: true
        },
        {
            text: "Здесь обитают драконы, порождения тьмы и герои забытых времён.",
            delay: 4000,
            autoContinue: true
        },
        {
            text: "Хочешь присоединиться к нашей охоте на Теневого Колосса?",
            delay: 3500,
            choices: [
                "Да, я готов к битве!",
                "Сначала покажи мне команду",
                "Мне страшно, я пас"
            ]
        }
    ],
    
    help: [
        {
            text: "Помощь? Ты пришел по адресу.",
            delay: 3000,
            autoContinue: true
        },
        {
            text: "Но здесь всё имеет свою цену.",
            delay: 3000,
            autoContinue: true
        },
        {
            text: "Что ты можешь предложить взамен?",
            delay: 3500,
            choices: [
                "Свою верность",
                "Древние знания",
                "Магический артефакт"
            ]
        }
    ],
    
    lost: [
        {
            text: "Заблудился? В Лабиринте Вечного Мрака?",
            delay: 3500,
            autoContinue: true
        },
        {
            text: "Ты либо очень храбрый, либо очень глупый.",
            delay: 3000,
            autoContinue: true
        },
        {
            text: "Но у меня есть для тебя предложение...",
            delay: 3000,
            choices: [
                "Слушаю",
                "Попробую найти выход сам",
                "Что ты хочешь?"
            ]
        }
    ]
};

// Концовки
const endings = {
    battle_brave: "Ты стал легендой среди монстров. Твоё имя теперь упоминают в страхе и уважении. Теневой Колосс пал, но новые угрозы уже на горизонте...",
    battle_team: "Команда приняла тебя. Вместе вы - непобедимая сила. Теперь ты часть чего-то большего, часть Братства Теней.",
    battle_scared: "Ты сбежал, но мир монстров запомнил тебя. Они будут ждать твоего возвращения... или найдут тебя сами.",
    help_loyalty: "Твоя верность была проверена и принята. Теперь ты страж Порога, защитник двух миров.",
    help_knowledge: "Древние знания открыли тебе секреты магии. Ты стал Архивариусом Забытых Искусств.",
    help_artifact: "Артефакт оказался ключом к древнему пророчеству. Тебе суждено изменить судьбу этого мира.",
    lost_listen: "Ты стал проводником между мирами. Никто больше не заблудится, пока ты здесь.",
    lost_alone: "Ты нашёл выход, но часть тебя осталась там, в темноте. Иногда ты слышишь зов...",
    lost_question: "Я хочу, чтобы ты стал Хранителем Врат. Решай: принять дар или навсегда забыть этот путь?"
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    startSequence();
    
    // Обработчик ввода имени
    document.getElementById('submit-btn').addEventListener('click', submitName);
    document.getElementById('name-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') submitName();
    });
    
    // Обработчик кнопки продолжения
    document.getElementById('continue-btn').addEventListener('click', continueStory);
    
    // Обработчик перезапуска
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});

// Начальная последовательность
function startSequence() {
    // 1. Показать ошибку 404
    showScreen('screen-404');
    
    // 2. Через 2 секунды начать мигание
    setTimeout(() => {
        startBlinking();
        
        // 3. Через 4 секунды перейти к монстру
        setTimeout(() => {
            showMonster();
        }, 4000);
    }, 2000);
}

// Мигание ошибки 404
function startBlinking() {
    const digits = document.querySelectorAll('.digit');
    const errorText = document.querySelector('.error-text');
    
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
        digits.forEach(digit => {
            digit.style.animation = 'none';
            setTimeout(() => {
                digit.style.animation = 'glow 2s infinite alternate';
            }, 100);
        });
        
        errorText.style.opacity = errorText.style.opacity === '0.3' ? '1' : '0.3';
        
        blinkCount++;
        if (blinkCount >= 6) {
            clearInterval(blinkInterval);
            
            // Исчезновение
            const errorContainer = document.querySelector('.error-container');
            errorContainer.style.animation = 'fadeOut 2s ease forwards';
            
            // Воспроизвести страшный звук
            playSound('sound-scary');
        }
    }, 500);
}

// Показать монстра
function showMonster() {
    showScreen('screen-monster');
    
    const monsterVideo = document.getElementById('monster-video');
    
    // Запустить видео монстра
    monsterVideo.style.opacity = '1';
    monsterVideo.play();
    
    // Монстр исчезает через 1.2 секунды
    setTimeout(() => {
        monsterVideo.style.opacity = '0';
        monsterVideo.style.transition = 'opacity 1.2s ease';
        
        // Показать кровавую табличку
        setTimeout(() => {
            showBloodScreen();
        }, 1200);
    }, 1200);
}

// Показать кровавый экран
function showBloodScreen() {
    showScreen('screen-blood');
    
    // Запустить звук капель
    playSound('sound-drip');
    
    // Анимация появления таблички
    const bloodPlate = document.querySelector('.blood-plate');
    bloodPlate.style.transform = 'scale(0)';
    bloodPlate.style.opacity = '0';
    
    setTimeout(() => {
        bloodPlate.style.transition = 'all 1s ease';
        bloodPlate.style.transform = 'scale(1)';
        bloodPlate.style.opacity = '1';
        
        // Фокус на поле ввода
        document.getElementById('name-input').focus();
    }, 500);
}

// Обработка ввода имени
function submitName() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
    
    if (!name) {
        // Анимация ошибки
        nameInput.style.borderColor = '#ff0000';
        nameInput.style.boxShadow = '0 0 20px #ff0000';
        setTimeout(() => {
            nameInput.style.borderColor = '#8b0000';
            nameInput.style.boxShadow = 'none';
        }, 1000);
        return;
    }
    
    playerName = name;
    
    // Эффект исчезновения
    const bloodPlate = document.querySelector('.blood-plate');
    bloodPlate.style.opacity = '0';
    bloodPlate.style.transform = 'scale(0.5)';
    
    // Затемнение экрана
    const screen = document.getElementById('screen-blood');
    screen.style.backgroundColor = '#fff';
    screen.style.transition = 'background-color 2s ease';
    
    // Переход к приветствию
    setTimeout(() => {
        showWelcomeScreen();
    }, 2000);
}

// Показать экран приветствия
function showWelcomeScreen() {
    showScreen('screen-welcome');
    
    const welcomeText = document.getElementById('welcome-text');
    const fullText = `ПРИВЕТСТВУЮ, ${playerName.toUpperCase()}!`;
    
    // Эффект печатания текста
    typeText(welcomeText, fullText, 100, () => {
        // Исчезновение через 2 секунды
        setTimeout(() => {
            welcomeText.style.animation = 'fadeOut 2s ease forwards';
            
            // Показать доброго монстра
            setTimeout(() => {
                showFriendlyMonster();
            }, 2000);
        }, 2000);
    });
}

// Показать доброго монстра
function showFriendlyMonster() {
    showScreen('screen-story');
    
    const friendlyMonster = document.getElementById('friendly-monster');
    
    // Анимация вылета из угла
    friendlyMonster.style.opacity = '1';
    friendlyMonster.style.left = '-50%';
    friendlyMonster.style.top = '-50%';
    friendlyMonster.style.transition = 'all 1.2s ease';
    
    setTimeout(() => {
        friendlyMonster.play();
        friendlyMonster.style.left = '50%';
        friendlyMonster.style.top = '50%';
        friendlyMonster.style.transform = 'translate(-50%, -50%)';
        
        // Исчезновение через 1.2 секунды
        setTimeout(() => {
            friendlyMonster.style.opacity = '0';
            
            // Начать историю
            setTimeout(() => {
                startStory();
            }, 1200);
        }, 1200);
    }, 100);
    
    // Магический звук
    playSound('sound-magic');
}

// Начать историю
function startStory() {
    currentStoryIndex = 0;
    currentPath = 'start';
    storyChoices = [];
    
    // Показать контейнер истории
    document.querySelector('.story-container').style.opacity = '1';
    
    // Показать первую часть истории
    showStoryPart();
}

// Показать часть истории
function showStoryPart() {
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const continueBtn = document.getElementById('continue-btn');
    
    // Очистить предыдущий контент
    storyText.innerHTML = '';
    choicesContainer.innerHTML = '';
    choicesContainer.classList.add('hidden');
    continueBtn.classList.add('hidden');
    
    // Получить текущую часть
    const storyPart = story[currentPath][currentStoryIndex];
    if (!storyPart) {
        showEnding();
        return;
    }
    
    // Заменить имя в тексте
    let text = storyPart.text.replace('{name}', playerName);
    
    // Показать текст
    typeText(storyText, text, 50, () => {
        // Если есть выборы
        if (storyPart.choices) {
            setTimeout(() => {
                showChoices(storyPart.choices);
            }, 500);
        }
        // Если авто-продолжение
        else if (storyPart.autoContinue) {
            setTimeout(() => {
                continueBtn.classList.remove('hidden');
            }, 500);
        }
    });
}

// Показать варианты выбора
function showChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.dataset.choice = index;
        
        button.addEventListener('click', () => {
            makeChoice(choice);
        });
        
        choicesContainer.appendChild(button);
    });
    
    choicesContainer.classList.remove('hidden');
}

// Обработка выбора
function makeChoice(choice) {
    storyChoices.push(choice);
    
    // Определить следующий путь
    if (currentPath === 'start') {
        if (choice.includes('приключений')) currentPath = 'adventure';
        else if (choice.includes('помощь')) currentPath = 'help';
        else if (choice.includes('заблудился')) currentPath = 'lost';
    }
    
    currentStoryIndex = 0;
    showStoryPart();
}

// Продолжить историю
function continueStory() {
    currentStoryIndex++;
    showStoryPart();
}

// Показать концовку
function showEnding() {
    // Определить концовку на основе выбора
    let endingKey = '';
    
    if (currentPath === 'adventure') {
        if (storyChoices[1]?.includes('готов')) endingKey = 'battle_brave';
        else if (storyChoices[1]?.includes('команду')) endingKey = 'battle_team';
        else endingKey = 'battle_scared';
    } else if (currentPath === 'help') {
        if (storyChoices[1]?.includes('верность')) endingKey = 'help_loyalty';
        else if (storyChoices[1]?.includes('знания')) endingKey = 'help_knowledge';
        else endingKey = 'help_artifact';
    } else if (currentPath === 'lost') {
        if (storyChoices[1]?.includes('Слушаю')) endingKey = 'lost_listen';
        else if (storyChoices[1]?.includes('сам')) endingKey = 'lost_alone';
        else endingKey = 'lost_question';
    }
    
    const endingText = endings[endingKey] || 
        "Твоя история ещё не закончена. Мир монстров ждёт твоего возвращения...";
    
    // Показать экран концовки
    showScreen('screen-ending');
    
    const endingElement = document.getElementById('ending-text');
    typeText(endingElement, endingText, 30);
}

// Перезапуск игры
function restartGame() {
    // Сбросить все переменные
    playerName = '';
    currentStoryIndex = 0;
    currentPath = 'start';
    storyChoices = [];
    
    // Сбросить все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.opacity = '0';
    });
    
    // Перезапустить видео
    document.getElementById('monster-video').currentTime = 0;
    document.getElementById('friendly-monster').currentTime = 0;
    
    // Начать сначала
    setTimeout(() => {
        startSequence();
    }, 500);
}

// Вспомогательные функции
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function typeText(element, text, speed, callback) {
    element.innerHTML = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else if (callback) {
            callback();
        }
    }
    
    typeChar();
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Автовоспроизведение заблокировано"));
    }
}
