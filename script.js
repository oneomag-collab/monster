// Данные истории
const storyPages = [
    {
        title: "Пролог: Переход в иной мир",
        content: `
            <p>2018 год стал переломным для жанра исекай. Выход аниме "Марш смерти под рапсодию параллельного мира" потряс аудиторию своей мрачной атмосферой и философской глубиной.</p>
            <p>История начинается с того, что главный герой, обычный студент, погибает в результате странного инцидента и перерождается в фэнтезийном мире, управляемом жестокой системой "Рапсодии Смерти".</p>
            <p>В отличие от типичных исекай, здесь нет удобной системы уровней или дружелюбных компаньонов. Вместо этого герой оказывается один на один с враждебным миром, где каждое решение может стать фатальным.</p>
        `
    },
    {
        title: "Система Рапсодии Смерти",
        content: `
            <p>Новый мир управляется загадочной системой под названием "Рапсодия Смерти". Каждый житель этого мира имеет уникальный "Марш" — магическую мелодию, определяющую их судьбу и способности.</p>
            <p>Главный герой получает редкий и опасный "Марш Смерти", который дает ему невероятную силу, но медленно поглощает его душу. Эта способность позволяет ему видеть "нити судьбы" и манипулировать ими, но каждая использование приближает его к окончательной гибели.</p>
            <p>Система безжалостна: чем сильнее марш, тем короче жизнь его владельца. Этот центральный конфликт определяет трагическую природу всего повествования.</p>
        `
    },
    {
        title: "Спутники и противники",
        content: `
            <p>В своем путешествии герой встречает Лиру, девушку с "Маршем Иллюзий", способную создавать реалистичные миражи. Вместе они пытаются разгадать тайну системы "Рапсодии" и найти способ вернуться в свой мир.</p>
            <p>Их главным противником становится "Оркестр Тьмы" — организация, стремящаяся использовать силу Маршей для установления контроля над всем параллельным миром. Лидер Оркестра, маэстро Вальтер, обладает легендарным "Маршем Апокалипсиса".</p>
            <p>Каждая встреча с членами Оркестра — это не только физическое противостояние, но и столкновение идеологий, борьба за право определять судьбы целого мира.</p>
        `
    },
    {
        title: "Философские темы произведения",
        content: `
            <p>Аниме поднимает глубокие вопросы о свободе воли, предопределенности и ценности человеческой жизни. Система "Рапсодии" символизирует судьбу, от которой пытаются вырваться главные герои.</p>
            <p>Особое внимание уделяется теме самопожертвования и морального выбора в экстремальных условиях. Каждый персонаж сталкивается с дилеммой: использовать свою силу для личного спасения или рискнуть всем, чтобы изменить жестокий мир.</p>
            <p>Произведение избегает простых ответов, заставляя зрителя самостоятельно размышлять над поставленными вопросами, что делает его особенно ценным для вдумчивой аудитории.</p>
        `
    },
    {
        title: "Визуальный стиль и саундтрек",
        content: `
            <p>Визуальный ряд аниме выполнен в мрачной, почти готической эстетике. Преобладают тёмные тона, контрастирующие с яркими вспышками магии во время использования Маршей.</p>
            <p>Саундтрек, созданный композитором Кайо Кимурой, стал отдельным произведением искусства. Каждый "Марш" имеет уникальную музыкальную тему, отражающую личность и судьбу его владельца.</p>
            <p>Особенно отмечается финальная композиция "Реквием по потерянным мирам", которая идеально передаёт трагическую атмосферу финала.</p>
        `
    },
    {
        title: "Эпилог: Наследие и влияние",
        content: `
            <p>Хотя аниме вышло в 2018 году, его влияние ощущается до сих пор. "Марш смерти под рапсодию параллельного мира" переопределил ожидания от жанра исекай, добавив в него элементы психологического хоррора и философской драмы.</p>
            <p>Манга-адаптация, выпущенная в 2019 году, расширила вселенную, добавив новые сюжетные линии и раскрыв прошлое второстепенных персонажей. Поклонники до сих пор спорят о открытом финале аниме и его скрытых смыслах.</p>
            <div class="quote">
                <p>"Иногда самая красивая музыка рождается из самых тёмных мест души."</p>
                <p class="quote-author">— Лира, эпизод 11</p>
            </div>
            <p>Произведение остаётся культовым, продолжая вдохновлять новых авторов и заставляя зрителей задуматься о вечных вопросах человеческого существования.</p>
        `
    }
];

// Глобальные переменные
let currentPage = 0;
let username = "Гость";

// DOM элементы
const errorScreen = document.getElementById('error-screen');
const connectionScreen = document.getElementById('connection-screen');
const nameScreen = document.getElementById('name-screen');
const storyScreen = document.getElementById('story-screen');
const usernameInput = document.getElementById('username-input');
const nameSubmitBtn = document.getElementById('name-submit');
const userDisplay = document.getElementById('user-display');
const storyContainer = document.getElementById('story-text-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
const progressFill = document.getElementById('progress-fill');

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем общее количество страниц
    totalPagesSpan.textContent = storyPages.length;
    
    // Начинаем последовательность экранов
    startSequence();
});

// Последовательность экранов при загрузке
function startSequence() {
    // Показываем экран ошибки 404 на 3 секунды
    setTimeout(() => {
        // Запускаем мигание ошибки 404
        startErrorBlinking();
        
        // Через 2 секунды мигания показываем экран потери соединения
        setTimeout(() => {
            errorScreen.classList.add('hidden');
            connectionScreen.classList.remove('hidden');
            
            // Через 2 секунды показываем экран ввода имени
            setTimeout(() => {
                connectionScreen.classList.add('hidden');
                nameScreen.classList.remove('hidden');
            }, 2000);
        }, 2000);
    }, 3000);
}

// Мигание ошибки 404
function startErrorBlinking() {
    const errorNumber = document.querySelector('.error-number');
    const bloodDigit = document.querySelector('.blood');
    let blinkCount = 0;
    const maxBlinks = 5;
    
    const blinkInterval = setInterval(() => {
        if (blinkCount % 2 === 0) {
            errorNumber.style.color = '#8b0000';
            bloodDigit.style.color = '#fff';
            errorNumber.style.textShadow = '0 0 30px rgba(139, 0, 0, 0.9)';
        } else {
            errorNumber.style.color = '#fff';
            bloodDigit.style.color = '#8b0000';
            errorNumber.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.7)';
        }
        
        blinkCount++;
        
        if (blinkCount >= maxBlinks * 2) {
            clearInterval(blinkInterval);
            errorNumber.style.color = '#fff';
            bloodDigit.style.color = '#8b0000';
            errorNumber.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.7)';
        }
    }, 200);
}

// Обработчик отправки имени
nameSubmitBtn.addEventListener('click', function() {
    const name = usernameInput.value.trim();
    
    if (name) {
        username = name;
        userDisplay.textContent = username;
        
        // Переходим к истории
        nameScreen.classList.add('hidden');
        storyScreen.classList.remove('hidden');
        
        // Загружаем первую страницу истории
        loadStoryPage(currentPage);
    } else {
        // Анимация ошибки, если имя не введено
        usernameInput.style.border = '2px solid #8b0000';
        setTimeout(() => {
            usernameInput.style.border = 'none';
        }, 1000);
    }
});

// Также разрешаем отправку по Enter
usernameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        nameSubmitBtn.click();
    }
});

// Загрузка страницы истории
function loadStoryPage(pageIndex) {
    // Обновляем счетчик страниц
    currentPageSpan.textContent = pageIndex + 1;
    
    // Обновляем прогресс-бар
    const progress = ((pageIndex + 1) / storyPages.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Обновляем состояние кнопок
    prevBtn.disabled = pageIndex === 0;
    nextBtn.disabled = pageIndex === storyPages.length - 1;
    
    // Получаем данные страницы
    const pageData = storyPages[pageIndex];
    
    // Создаем элемент для текста
    const storyTextElement = document.createElement('div');
    storyTextElement.className = 'story-text active';
    storyTextElement.innerHTML = `
        <h2>${pageData.title}</h2>
        ${pageData.content}
    `;
    
    // Очищаем контейнер и добавляем новый текст
    storyContainer.innerHTML = '';
    storyContainer.appendChild(storyTextElement);
    
    // Прокручиваем вверх
    storyContainer.scrollTop = 0;
}

// Обработчики кнопок навигации
prevBtn.addEventListener('click', function() {
    if (currentPage > 0) {
        // Анимация исчезновения текущего текста
        const currentText = document.querySelector('.story-text');
        if (currentText) {
            currentText.classList.remove('active');
            currentText.classList.add('fading');
            
            // После завершения анимации загружаем новую страницу
            setTimeout(() => {
                currentPage--;
                loadStoryPage(currentPage);
            }, 500);
        }
    }
});

nextBtn.addEventListener('click', function() {
    if (currentPage < storyPages.length - 1) {
        // Анимация исчезновения текущего текста
        const currentText = document.querySelector('.story-text');
        if (currentText) {
            currentText.classList.remove('active');
            currentText.classList.add('fading');
            
            // После завершения анимации загружаем новую страницу
            setTimeout(() => {
                currentPage++;
                loadStoryPage(currentPage);
            }, 500);
        }
    }
});
