// Марш смерти под рапсодию параллельного мира
// Основные переменные
let player = {
    name: '',
    hp: 100,
    mp: 50,
    level: 1,
    allies: [],
    choices: [],
    world: 'void',
    ending: ''
};

let currentScreen = '404';
let currentStoryIndex = 0;
let isTyping = false;
let typeSpeed = 30;
let bgm = null;

// История в стиле Death March
const story = {
    // Часть 1: Вторжение в параллельный мир
    invasion: [
        {
            text: "● Вы открываете глаза в мире, где небо трескается как стекло...",
            character: 'system',
            choices: [],
            autoContinue: true,
            delay: 4000
        },
        {
            text: "● [СУЩНОСТЬ-404] поглощает реальность вокруг. Время искажается, пространство плавится...",
            character: 'system',
            choices: [],
            autoContinue: true,
            delay: 4000
        },
        {
            text: "АИНЗ: Так ты и есть тот, кто проник сквозь барьер миров?",
            character: 'ainz',
            choices: [
                "Кто ты? Где я?",
                "Что происходит?",
                "Мне нужно вернуться!"
            ],
            autoContinue: false,
            delay: 0
        }
    ],

    // Ответ на вопрос "Кто ты?"
    response_who: [
        {
            text: "АИНЗ: Я - Аинз Оал Гоун, Повелитель Назарика. Ты в параллельном мире, где правят монстры и магия.",
            character: 'ainz',
            choices: [],
            autoContinue: true,
            delay: 3500
        },
        {
            text: "АИНЗ: Твое появление не было случайностью. [СУЩНОСТЬ-404] привлекла тебя как ключ.",
            character: 'ainz',
            choices: [
                "Ключ? Для чего?",
                "Как остановить это существо?",
                "У меня нет сил для этого..."
            ],
            autoContinue: false,
            delay: 0
        }
    ],

    // Ответ на вопрос "Что происходит?"
    response_what: [
        {
            text: "АИНЗ: Происходит вторжение Ничто. [СУЩНОСТЬ-404] пожирает реальность, создавая пустоту.",
            character: 'ainz',
            choices: [],
            autoContinue: true,
            delay: 3500
        },
        {
            text: "АИНЗ: Только существо из другого мира может противостоять ей. Ты - наша последняя надежда.",
            character: 'ainz',
            choices: [
                "Почему именно я?",
                "Что я должен сделать?",
                "Я не герой..."
            ],
            autoContinue: false,
            delay: 0
        }
    ],

    // Битва с существом
    battle: [
        {
            text: "● [СУЩНОСТЬ-404] издает пронзительный вой. Реальность вокруг начинает сворачиваться...",
            character: 'system',
            choices: [],
            autoContinue: true,
            delay: 3000
        },
        {
            text: "АИНЗ: Она пытается поглотить твою душу! Используй силу своего мира!",
            character: 'ainz',
            choices: [
                "Призвать защиту воспоминаний",
                "Атаковать силой воли",
                "Попытаться договориться"
            ],
            autoContinue: false,
            delay: 0
        }
    ],

    // Концовки
    endings: {
        memory: {
            title: "ХРАНИТЕЛЬ ВОСПОМИНАНИЙ",
            text: "Ты использовал силу воспоминаний своего мира, создав барьер из ностальгии. [СУЩНОСТЬ-404] не смогла поглотить то, чего не понимала. Теперь ты - мост между мирами, хранитель равновесия.",
            allies: ["Аинз", "Альбедо", "Шалтир"],
            rank: "SS"
        },
        willpower: {
            title: "ВОЛЯ НЕСГИБАЕМАЯ",
            text: "Твоя сила воли оказалась сильнее пустоты. Ты не просто отразил атаку - ты переписал реальность вокруг. [СУЩНОСТЬ-404] была изгнана, но оставила часть своей силы в тебе.",
            allies: ["Аинз", "Кокутсу", "Деминрг"],
            rank: "EX"
        },
        negotiate: {
            title: "ДИПЛОМАТ БЕЗДНЫ",
            text: "Ты понял, что [СУЩНОСТЬ-404] просто одинока. Вместо битвы ты предложил союз. Теперь она - защитник параллельного мира, а ты - её связной с человечеством.",
            allies: ["Аинз", "СУЩНОСТЬ-404", "Пандора"],
            rank: "S"
        }
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    // Обработчики
    document.getElementById('verify-btn').addEventListener('click', verifyAccess);
    document.getElementById('access-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifyAccess();
    });
    
    document.getElementById('next-btn').addEventListener('click', continueStory);
    document.getElementById('auto-btn').addEventListener('click', toggleAuto);
    document.getElementById('skip-btn').addEventListener('click', skipDialogue);
    document.getElementById('new-game-btn').addEventListener('click', newGame);
    
    // Инициализация аудио
    initAudio();
});

function initGame() {
    // Начать с экрана 404
    showScreen('screen-404');
    start404Sequence();
}

function initAudio() {
    bgm = document.getElementById('bgm-main');
    // Установить громкость
    if (bgm) bgm.volume = 0.5;
}

// Последовательность 404
function start404Sequence() {
    // Мигание глитчей
    setTimeout(() => {
        startGlitching();
        
        // Через 4 секунды - переход к монстру
        setTimeout(() => {
            showMonsterSequence();
        }, 4000);
    }, 2000);
}

function startGlitching() {
    const glitchElements = document.querySelectorAll('.glitching');
    let glitchCount = 0;
    
    const glitchInterval = setInterval(() => {
        glitchElements.forEach(el => {
            el.style.color = getRandomColor();
            el.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        });
        
        // Проиграть звук глитча
        playSound('sfx-glitch');
        
        glitchCount++;
        if (glitchCount >= 8) {
            clearInterval(glitchInterval);
            
            // Исчезновение
            document.querySelector('.glitch-container').style.opacity = '0';
            document.querySelector('.glitch-container').style.transition = 'opacity 2s ease';
            
            // Темнота
            setTimeout(() => {
                document.getElementById('screen-404').style.backgroundColor = '#000';
            }, 1000);
        }
    }, 300);
}

function showMonsterSequence() {
    showScreen('screen-monster');
    const monsterVideo = document.getElementById('void-monster');
    
    // Запустить видео
    monsterVideo.style.opacity = '1';
    monsterVideo.play();
    
    // Исчезновение через 1.2 секунды
    setTimeout(() => {
        monsterVideo.style.opacity = '0';
        monsterVideo.style.transition = 'opacity 1.2s ease';
        
        // Показать интерфейс взлома
        setTimeout(() => {
            showInterface();
        }, 1200);
    }, 1200);
}

function showInterface() {
    showScreen('screen-interface');
    
    // Анимация появления терминала
    const terminal = document.querySelector('.terminal-window');
    terminal.style.transform = 'scale(0)';
    terminal.style.opacity = '0';
    
    setTimeout(() => {
        terminal.style.transition = 'all 1s ease';
        terminal.style.transform = 'scale(1)';
        terminal.style.opacity = '1';
        
        // Запустить звук печати
        playSound('sfx-type');
        
        // Автоматический ввод команды
        typeTerminalText();
    }, 500);
}

function typeTerminalText() {
    const terminalText = document.querySelector('.terminal-text');
    const originalHTML = terminalText.innerHTML;
    terminalText.innerHTML = '';
    
    const lines = [
        "root@parallel-world:~$ ",
        "scan_intruder.exe",
        "",
        "＞＞ ОБНАРУЖЕНА УГРОЗА: [СУЩНОСТЬ-404]",
        "＞＞ МЕСТОПОЛОЖЕНИЕ: ПАРАЛЛЕЛЬНЫЙ СЕКТОР [死亡行進]",
        "＞＞ ТРЕБУЕТСЯ ИДЕНТИФИКАЦИЯ..."
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeChar() {
        if (lineIndex < lines.length) {
            if (charIndex === 0) {
                terminalText.innerHTML += '<br>';
            }
            
            if (charIndex < lines[lineIndex].length) {
                terminalText.innerHTML += lines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeChar, 500);
            }
        } else {
            // Показать поле ввода
            document.querySelector('.input-section').style.opacity = '1';
            document.querySelector('.input-section').style.transition = 'opacity 1s ease';
            
            // Фокус на поле ввода
            document.getElementById('access-code').focus();
        }
    }
    
    typeChar();
}

function verifyAccess() {
    const nameInput = document.getElementById('access-code');
    const name = nameInput.value.trim();
    
    if (!name) {
        // Эффект ошибки
        nameInput.style.borderColor = '#ff0000';
        nameInput.style.boxShadow = '0 0 20px #ff0000';
        playSound('sfx-glitch');
        
        setTimeout(() => {
            nameInput.style.borderColor = 'var(--blood-red)';
            nameInput.style.boxShadow = 'none';
        }, 1000);
        return;
    }
    
    player.name = name;
    
    // Эффект подтверждения
    document.querySelector('.hack-button').innerHTML = 'ДОСТУП РАЗРЕШЕН';
    document.querySelector('.hack-button').style.background = 'linear-gradient(45deg, #00ff00, #008800)';
    
    playSound('sfx-victory');
    
    // Переход к приветствию
    setTimeout(() => {
        showWelcome();
    }, 1500);
}

function showWelcome() {
    showScreen('screen-welcome');
    
    const nameDisplay = document.getElementById('player-name-display');
    nameDisplay.textContent = player.name.toUpperCase();
    
    // Запустить BGM
    if (bgm) {
        bgm.play().catch(e => console.log("BGM autoplay blocked"));
    }
    
    // Автоматический переход к истории
    setTimeout(() => {
        startStory();
    }, 5000);
}

function startStory() {
    showScreen('screen-story');
    currentStoryIndex = 0;
    
    // Показать спрайт Аинза
    const sprite = document.getElementById('sprite-ainz');
    sprite.style.background = 'linear-gradient(45deg, #2d545e, #12343b)';
    sprite.innerHTML = '●';
    sprite.style.display = 'flex';
    sprite.style.justifyContent = 'center';
    sprite.style.alignItems = 'center';
    sprite.style.fontSize = '5rem';
    sprite.style.color = 'white';
    
    // Начать повествование
    showStorySegment('invasion');
}

function showStorySegment(segment) {
    const segmentData = story[segment];
    if (!segmentData || currentStoryIndex >= segmentData.length) {
        // Переход к следующей части или концовке
        if (segment === 'invasion') {
            // После вторжения - битва
            showBattle();
        } else {
            showEnding();
        }
        return;
    }
    
    const storyPart = segmentData[currentStoryIndex];
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    
    // Очистить
    storyText.innerHTML = '';
    choicesContainer.innerHTML = '';
    choicesContainer.classList.add('hidden');
    
    // Обновить имя персонажа
    const charName = document.querySelector('.character-name');
    charName.textContent = `● ${storyPart.character.toUpperCase()}`;
    
    // Напечатать текст
    isTyping = true;
    typeText(storyText, storyPart.text, typeSpeed, () => {
        isTyping = false;
        
        // Показать выборы если есть
        if (storyPart.choices && storyPart.choices.length > 0) {
            showChoices(storyPart.choices, segment);
        } else if (storyPart.autoContinue) {
            // Автоматическое продолжение
            setTimeout(() => {
                currentStoryIndex++;
                showStorySegment(segment);
            }, storyPart.delay);
        }
    });
}

function showChoices(choices, segment) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-option';
        button.textContent = choice;
        
        button.addEventListener('click', () => {
            if (isTyping) return;
            
            player.choices.push(choice);
            playSound('sfx-type');
            
            // Определить следующую часть истории
            let nextSegment = getNextSegment(segment, index);
            currentStoryIndex = 0;
            showStorySegment(nextSegment);
        });
        
        choicesContainer.appendChild(button);
    });
    
    choicesContainer.classList.remove('hidden');
}

function getNextSegment(currentSegment, choiceIndex) {
    switch(currentSegment) {
        case 'invasion':
            if (choiceIndex === 0) return 'response_who';
            if (choiceIndex === 1) return 'response_what';
            return 'battle';
        case 'response_who':
        case 'response_what':
            return 'battle';
        case 'battle':
            // Определить концовку по выбору
            if (choiceIndex === 0) player.ending = 'memory';
            else if (choiceIndex === 1) player.ending = 'willpower';
            else player.ending = 'negotiate';
            return 'end';
        default:
            return 'end';
    }
}

function showBattle() {
    // Показать боевой интерфейс
    document.querySelector('.battle-ui').classList.remove('hidden');
    
    // Анимация HP баров
    const playerHP = document.querySelector('.player .hp-fill');
    const enemyHP = document.querySelector('.enemy .hp-fill');
    
    let playerHpValue = 100;
    let enemyHpValue = 100;
    
    // Боевая анимация
    const battleInterval = setInterval(() => {
        playerHpValue -= Math.random() * 10;
        enemyHpValue -= Math.random() * 15;
        
        playerHP.style.width = `${Math.max(0, playerHpValue)}%`;
        enemyHP.style.width = `${Math.max(0, enemyHpValue)}%`;
        
        document.querySelector('.player .hp-value').textContent = 
            `${Math.max(0, Math.round(playerHpValue))}/100`;
        document.querySelector('.enemy .hp-value').textContent = 
            `${Math.max(0, Math.round(enemyHpValue))}/???`;
        
        if (enemyHpValue <= 0) {
            clearInterval(battleInterval);
            setTimeout(() => {
                document.querySelector('.battle-ui').classList.add('hidden');
                currentStoryIndex = 0;
                showStorySegment('battle');
            }, 1000);
        }
        
        if (playerHpValue <= 0) {
            clearInterval(battleInterval);
            player.ending = 'defeat';
            showEnding();
        }
    }, 500);
    
    // Звук битвы
    playSound('sfx-battle');
}

function showEnding() {
    showScreen('screen-ending');
    
    const endingData = story.endings[player.ending] || {
        title: "НЕИЗВЕСТНЫЙ ИСХОД",
        text: "Твоя история обрывается здесь. Возможно, в другой реальности...",
        allies: ["???"],
        rank: "?"
    };
    
    const endingText = document.getElementById('ending-text');
    const allyCount = document.getElementById('ally-count');
    const playerRank = document.getElementById('player-rank');
    const creditName = document.getElementById('credit-name');
    
    // Показать текст концовки
    typeText(endingText, 
        `<strong>${endingData.title}</strong><br><br>${endingData.text}<br><br>
        Ты преодолел Марш Смерти и нашел свой путь в параллельном мире. 
        Твоё путешествие только начинается...`, 
        typeSpeed);
    
    // Обновить статистику
    allyCount.textContent = endingData.allies.length;
    playerRank.textContent = endingData.rank;
    creditName.textContent = player.name;
    
    // Показать список союзников
    setTimeout(() => {
        endingText.innerHTML += `<br><br><strong>СОЮЗНИКИ:</strong><br>`;
        endingData.allies.forEach(ally => {
            endingText.innerHTML += `● ${ally}<br>`;
        });
    }, 3000);
    
    // Запустить победную музыку
    playSound('sfx-victory');
}

// Вспомогательные функции
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function typeText(element, text, speed, callback) {
    isTyping = true;
    element.innerHTML = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            // Звук печати
            if (i % 3 === 0) playSound('sfx-type', 0.1);
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            if (callback) callback();
        }
    }, speed);
}

function playSound(soundId, volume = 1) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play().catch(e => console.log("Sound play blocked"));
    }
}

function getRandomColor() {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function continueStory() {
    if (isTyping) {
        // Пропустить печатание
        const storyText = document.getElementById('story-text');
        storyText.style.animation = 'none';
        isTyping = false;
        return;
    }
    
    currentStoryIndex++;
    
    // Определить текущий сегмент
    let currentSegment = 'invasion';
    if (player.choices.length > 0) {
        currentSegment = getCurrentSegment();
    }
    
    showStorySegment(currentSegment);
}

function getCurrentSegment() {
    // Простая логика определения текущего сегмента
    if (player.choices.some(c => c.includes('Кто ты') || c.includes('Что происходит'))) {
        return player.choices.length > 1 ? 'battle' : 'response_who';
    }
    return 'invasion';
}

function toggleAuto() {
    // Режим авто-чтения (упрощенная версия)
    const autoBtn = document.getElementById('auto-btn');
    autoBtn.classList.toggle('active');
    
    if (autoBtn.classList.contains('active')) {
        // Запустить авто-чтение
        startAutoMode();
    }
}

function startAutoMode() {
    if (!isTyping && currentScreen === 'screen-story') {
        setTimeout(() => {
            if (document.getElementById('auto-btn').classList.contains('active')) {
                continueStory();
                startAutoMode();
            }
        }, 3000);
    }
}

function skipDialogue() {
    // Перейти сразу к концовке (для тестирования)
    player.ending = 'memory';
    showEnding();
}

function newGame() {
    // Сброс игры
    player = {
        name: '',
        hp: 100,
        mp: 50,
        level: 1,
        allies: [],
        choices: [],
        world: 'void',
        ending: ''
    };
    
    // Сбросить все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.opacity = '1';
    });
    
    // Сбросить видео
    document.getElementById('void-monster').currentTime = 0;
    
    // Начать сначала
    setTimeout(() => {
        initGame();
    }, 500);
}
