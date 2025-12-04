// Манга: Смертельный Марш в Параллельный Мир
// Основные переменные
let player = {
    name: '',
    choices: [],
    allies: ['Аинз', 'Альбедо', 'Шалтир'],
    stats: {
        level: 1,
        hp: 100,
        mp: 50,
        strength: 10,
        intelligence: 8,
        luck: 5
    },
    ending: ''
};

let currentPage = 'cover';
let gameState = {
    battleHp: 85,
    battleMp: 30,
    enemyHp: 70,
    chapter: 1
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    // Обработчики кнопок
    document.getElementById('start-reading').addEventListener('click', startReading);
    document.getElementById('confirm-name').addEventListener('click', confirmName);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    // Обработчики перелистывания страниц
    document.querySelectorAll('.next-page').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextPage = this.dataset.next;
            if (nextPage) turnPage(nextPage);
        });
    });
    
    document.querySelectorAll('.prev-page').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevPage = this.dataset.prev;
            if (prevPage) turnPage(prevPage);
        });
    });
    
    // Обработчики выбора
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const choice = this.dataset.choice;
            makeChoice(choice);
        });
    });
    
    // Обработчики боевых действий
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            performBattleAction(action);
        });
    });
    
    // Автофокус на поле имени
    const nameInput = document.getElementById('player-name');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') confirmName();
        });
    }
});

function initGame() {
    // Показать обложку
    showScreen('screen-cover');
    
    // Сброс состояния
    player = {
        name: '',
        choices: [],
        allies: ['Аинз', 'Альбедо', 'Шалтир'],
        stats: {
            level: 1,
            hp: 100,
            mp: 50,
            strength: 10,
            intelligence: 8,
            luck: 5
        },
        ending: ''
    };
    
    gameState = {
        battleHp: 85,
        battleMp: 30,
        enemyHp: 70,
        chapter: 1
    };
    
    // Анимация обложки
    animateCover();
}

function animateCover() {
    const eyes = document.querySelectorAll('.char-eye');
    let blinkCount = 0;
    
    const blinkInterval = setInterval(() => {
        eyes.forEach(eye => {
            eye.style.height = eye.style.height === '30px' ? '60px' : '30px';
        });
        
        blinkCount++;
        if (blinkCount >= 6) {
            clearInterval(blinkInterval);
            eyes.forEach(eye => {
                eye.style.height = '60px';
            });
        }
    }, 500);
    
    // Мигание текста ошибки
    const errorText = document.querySelector('.panel-text');
    setInterval(() => {
        errorText.style.opacity = errorText.style.opacity === '0.7' ? '1' : '0.7';
    }, 800);
}

function startReading() {
    // Показать модальное окно для ввода имени
    showNameModal();
}

function showNameModal() {
    const modal = document.getElementById('name-modal');
    modal.style.display = 'flex';
    
    // Анимация появления
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 100);
    
    // Фокус на поле ввода
    document.getElementById('player-name').focus();
}

function confirmName() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    
    if (!name) {
        // Эффект ошибки
        nameInput.style.borderColor = 'var(--manga-red)';
        nameInput.style.animation = 'flicker 0.5s';
        setTimeout(() => {
            nameInput.style.animation = '';
        }, 500);
        return;
    }
    
    player.name = name;
    
    // Закрыть модальное окно
    const modal = document.getElementById('name-modal');
    modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    modal.querySelector('.modal-content').style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Перейти к первой главе
        turnPage('chapter1');
        
        // Обновить имя в истории (если нужно)
        updatePlayerNameInStory();
    }, 300);
}

function turnPage(pageId) {
    // Скрыть текущую страницу
    document.getElementById(`screen-${currentPage}`).classList.remove('active');
    
    // Показать новую страницу
    document.getElementById(`screen-${pageId}`).classList.add('active');
    
    // Эффект перелистывания
    const newPage = document.getElementById(`screen-${pageId}`);
    newPage.style.opacity = '0';
    newPage.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
        newPage.style.transition = 'all 0.5s ease';
        newPage.style.opacity = '1';
        newPage.style.transform = 'translateX(0)';
    }, 50);
    
    currentPage = pageId;
    
    // Особые действия для страниц
    switch(pageId) {
        case 'chapter1':
            startChapter1();
            break;
        case 'chapter2':
            startChapter2();
            break;
        case 'chapter3':
            startChapter3();
            break;
        case 'ending':
            showEnding();
            break;
    }
    
    // Звук перелистывания страницы
    playPageSound();
}

function startChapter1() {
    // Анимация появления текста
    const textPanels = document.querySelectorAll('#screen-chapter1 .dialogue-bubble');
    textPanels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            panel.style.transition = 'all 0.5s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
    
    // Анимация силуэта монстра
    const monster = document.querySelector('.monster-silhouette');
    if (monster) {
        setTimeout(() => {
            monster.style.boxShadow = '0 0 20px var(--manga-purple)';
            monster.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                monster.style.boxShadow = 'none';
                monster.style.transform = 'scale(1)';
            }, 500);
        }, 1000);
    }
}

function startChapter2() {
    // Анимация появления Аинза
    const ainzSprite = document.querySelector('.char-sprite.ainz');
    if (ainzSprite) {
        ainzSprite.style.opacity = '0';
        ainzSprite.style.transform = 'scale(0)';
        
        setTimeout(() => {
            ainzSprite.style.transition = 'all 0.8s ease';
            ainzSprite.style.opacity = '1';
            ainzSprite.style.transform = 'scale(1)';
        }, 500);
    }
    
    // Анимация выбора
    const choices = document.querySelectorAll('#screen-chapter2 .choice-btn');
    choices.forEach((choice, index) => {
        choice.style.opacity = '0';
        choice.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            choice.style.transition = 'all 0.5s ease';
            choice.style.opacity = '1';
            choice.style.transform = 'translateX(0)';
        }, 300 * (index + 1));
    });
}

function makeChoice(choice) {
    player.choices.push(choice);
    
    // Эффект выбора
    const button = event.target.closest('.choice-btn');
    if (button) {
        button.style.background = 'var(--manga-blue)';
        button.style.color = 'white';
        button.style.borderColor = 'var(--manga-blue)';
        
        // Звук выбора
        playChoiceSound();
        
        // Переход к битве через 1 секунду
        setTimeout(() => {
            turnPage('chapter3');
        }, 1000);
    }
}

function startChapter3() {
    // Обновить статистику битвы
    updateBattleStats();
    
    // Анимация появления боевого интерфейса
    const battleElements = document.querySelectorAll('.battle-scene > *');
    battleElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
    
    // Автоматическое добавление логов битвы
    addBattleLog();
}

function updateBattleStats() {
    // Обновить HP/MP бары
    const playerHp = document.querySelector('.player .hp-fill');
    const playerMp = document.querySelector('.player .mp-fill');
    const enemyHp = document.querySelector('.enemy .hp-fill');
    
    if (playerHp) playerHp.style.width = `${gameState.battleHp}%`;
    if (playerMp) playerMp.style.width = `${gameState.battleMp}%`;
    if (enemyHp) enemyHp.style.width = `${gameState.enemyHp}%`;
    
    // Обновить текстовые значения
    const hpText = document.querySelector('.player .hp-text');
    const mpText = document.querySelector('.player .mp-text');
    
    if (hpText) hpText.textContent = `HP: ${gameState.battleHp}/100`;
    if (mpText) mpText.textContent = `MP: ${gameState.battleMp}/50`;
}

function addBattleLog() {
    const log = document.querySelector('.battle-log');
    if (!log) return;
    
    // Очистить лог
    log.innerHTML = '';
    
    // Добавить начальные записи
    const initialLogs = [
        { char: '[SYSTEM]:', text: 'БИТВА НАЧАЛАСЬ!', type: 'system' },
        { char: '[404]:', text: 'お前の世界を吸収する！', type: 'enemy' },
        { char: '[ГГ]:', text: 'Не позволю тебе!', type: 'player' }
    ];
    
    initialLogs.forEach((entry, index) => {
        setTimeout(() => {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${entry.type}`;
            logEntry.innerHTML = `
                <span class="log-char">${entry.char}</span>
                <span class="log-text">${entry.text}</span>
            `;
            
            // Анимация появления
            logEntry.style.opacity = '0';
            logEntry.style.transform = 'translateX(-20px)';
            
            log.appendChild(logEntry);
            
            setTimeout(() => {
                logEntry.style.transition = 'all 0.3s ease';
                logEntry.style.opacity = '1';
                logEntry.style.transform = 'translateX(0)';
                
                // Прокрутка вниз
                log.scrollTop = log.scrollHeight;
            }, 50);
        }, 500 * index);
    });
}

function performBattleAction(action) {
    const button = event.target.closest('.action-btn');
    if (!button) return;
    
    // Эффект нажатия
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Звук действия
    playBattleSound();
    
    // Логика действий
    const log = document.querySelector('.battle-log');
    let playerAction = '';
    let enemyDamage = 0;
    let playerDamage = 0;
    let mpCost = 0;
    
    switch(action) {
        case 'attack':
            playerAction = '⚔️ Атака мечом!';
            enemyDamage = Math.floor(Math.random() * 15) + 10;
            playerDamage = Math.floor(Math.random() * 5) + 5;
            break;
            
        case 'defend':
            playerAction = '🛡️ Оборонительная стойка!';
            enemyDamage = Math.floor(Math.random() * 5);
            playerDamage = Math.floor(Math.random() * 3);
            mpCost = 5;
            break;
            
        case 'skill':
            playerAction = '✨ Вспышка магии!';
            enemyDamage = Math.floor(Math.random() * 20) + 15;
            playerDamage = Math.floor(Math.random() * 8) + 5;
            mpCost = 15;
            break;
            
        case 'item':
            playerAction = '💊 Использовано зелье лечения!';
            enemyDamage = 0;
            playerDamage = -20; // лечение
            mpCost = 0;
            break;
    }
    
    // Обновить MP
    if (mpCost > 0) {
        gameState.battleMp = Math.max(0, gameState.battleMp - mpCost);
    }
    
    // Применить лечение
    if (playerDamage < 0) {
        gameState.battleHp = Math.min(100, gameState.battleHp - playerDamage);
    } else {
        gameState.battleHp = Math.max(0, gameState.battleHp - playerDamage);
    }
    
    // Урон врагу
    gameState.enemyHp = Math.max(0, gameState.enemyHp - enemyDamage);
    
    // Добавить лог действий
    addLogEntry('[ГГ]:', playerAction, 'player');
    
    setTimeout(() => {
        // Ответ врага
        const enemyActions = [
            '空間切断！',
            '闇の波動！',
            '現実歪曲！',
            '魂吸収！'
        ];
        const enemyAction = enemyActions[Math.floor(Math.random() * enemyActions.length)];
        
        addLogEntry('[404]:', enemyAction, 'enemy');
        
        // Обновить статистику
        updateBattleStats();
        
        // Проверить конец битвы
        setTimeout(checkBattleEnd, 500);
    }, 500);
}

function addLogEntry(character, text, type) {
    const log = document.querySelector('.battle-log');
    if (!log) return;
    
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `
        <span class="log-char">${character}</span>
        <span class="log-text">${text}</span>
    `;
    
    // Анимация появления
    logEntry.style.opacity = '0';
    logEntry.style.transform = 'translateX(-20px)';
    
    log.appendChild(logEntry);
    
    setTimeout(() => {
        logEntry.style.transition = 'all 0.3s ease';
        logEntry.style.opacity = '1';
        logEntry.style.transform = 'translateX(0)';
        
        // Прокрутка вниз
        log.scrollTop = log.scrollHeight;
    }, 50);
}

function checkBattleEnd() {
    if (gameState.enemyHp <= 0) {
        // Победа
        addLogEntry('[SYSTEM]:', 'СУЩНОСТЬ-404 ПОБЕЖДЕНА!', 'system');
        player.ending = 'victory';
        
        // Переход к концовке через 2 секунды
        setTimeout(() => {
            turnPage('ending');
        }, 2000);
        
    } else if (gameState.battleHp <= 0) {
        // Поражение
        addLogEntry('[SYSTEM]:', 'ГГ ПОВЕРЖЕН...', 'system');
        player.ending = 'defeat';
        
        setTimeout(() => {
            turnPage('ending');
        }, 2000);
    }
}

function showEnding() {
    // Определить тип концовки
    let endingType = 'victory';
    if (player.ending === 'defeat') {
        endingType = 'defeat';
    } else if (player.choices.includes('escape')) {
        endingType = 'escape';
    }
    
    // Обновить статистику
    document.getElementById('choices-count').textContent = player.choices.length;
    document.getElementById('allies-count').textContent = player.allies.length;
    
    // Обновить текст концовки
    const endingText = document.getElementById('ending-text');
    const endingTitle = document.getElementById('ending-title');
    const playerRole = document.getElementById('player-role');
    
    let title = '';
    let text = '';
    let role = '';
    
    switch(endingType) {
        case 'victory':
            title = 'ПОБЕДИТЕЛЬ МИРОВ';
            role = 'Повелитель Назарика';
            text = `Вы победили Сущность-404 и спасли параллельный мир. ${player.name} стал легендой среди монстров и героев. Ваше имя теперь известно во всех измерениях.`;
            break;
            
        case 'defeat':
            title = 'ПАВШИЙ ГЕРОЙ';
            role = 'Забытый воин';
            text = `Вы пали в битве с Сущностью-404. Но ваша жертва не была напрасной - Аинз смог завершить ритуал изгнания. ${player.name} останется в памяти мира как герой, пожертвовавший собой.`;
            break;
            
        case 'escape':
            title = 'БЕГЛЕЦ РЕАЛЬНОСТИ';
            role = 'Скиталец миров';
            text = `Вы сбежали от битвы, но не от своей судьбы. ${player.name} теперь вечный путешественник между мирами, нигде не находящий покоя. Возможно, однажды вы вернётесь...`;
            break;
            
        default:
            title = 'ПУТЕШЕСТВЕННИК МИРОВ';
            role = 'Хранитель Врат';
            text = `Ваше путешествие подошло к концу. Вы преодолели Смертельный Марш и нашли своё место в параллельном мире. Как ${role}, вы теперь связующее звено между мирами.`;
    }
    
    if (endingTitle) endingTitle.textContent = title;
    if (playerRole) playerRole.textContent = role;
    if (endingText) endingText.innerHTML = text;
    
    // Анимация появления
    const endingContent = document.querySelector('.ending-content');
    if (endingContent) {
        endingContent.style.opacity = '0';
        endingContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            endingContent.style.transition = 'all 1s ease';
            endingContent.style.opacity = '1';
            endingContent.style.transform = 'translateY(0)';
        }, 300);
    }
}

function restartGame() {
    // Плавный переход к началу
    document.getElementById('screen-ending').classList.remove('active');
    document.getElementById('screen-ending').style.opacity = '0';
    
    setTimeout(() => {
        initGame();
    }, 500);
}

function updatePlayerNameInStory() {
    // Обновить имя ГГ в тексте (если есть такие места)
    const ggElements = document.querySelectorAll('[data-gg-name]');
    ggElements.forEach(el => {
        el.textContent = player.name;
    });
}

// Вспомогательные функции
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function playPageSound() {
    // Имитация звука перелистывания
    const audio = document.getElementById('sfx-page');
    if (audio) {
        audio.currentTime = 0;
        // audio.play(); // Раскомментировать когда добавите звук
    }
}

function playChoiceSound() {
    const audio = document.getElementById('sfx-choice');
    if (audio) {
        audio.currentTime = 0;
        // audio.play();
    }
}

function playBattleSound() {
    const audio = document.getElementById('sfx-battle');
    if (audio) {
        audio.currentTime = 0;
        // audio.play();
    }
}

// Анимация для обложки
function animateCover() {
    const title = document.querySelector('.title-main');
    if (title) {
        setInterval(() => {
            title.style.textShadow = 
                title.style.textShadow.includes('5px') 
                    ? '3px 3px 0 var(--manga-black), 6px 6px 0 rgba(0, 0, 0, 0.2)'
                    : '5px 5px 0 var(--manga-black), 10px 10px 0 rgba(0, 0, 0, 0.2)';
        }, 1000);
    }
}
