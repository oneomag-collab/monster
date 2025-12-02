document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const phaseError = document.getElementById('phase-error');
    const phaseHorror = document.getElementById('phase-horror');
    const phaseGood = document.getElementById('phase-good');
    const error404 = document.getElementById('error-404');
    const monster1Video = document.getElementById('monster1-video');
    const monster2Video = document.getElementById('monster2-video');
    const bloodPlate = document.getElementById('blood-plate');
    const nameInput = document.getElementById('name-input');
    const submitName = document.getElementById('submit-name');
    const textMessages = document.getElementById('text-messages');
    const dripSound = document.getElementById('drip-sound');

    // Последовательность анимаций
    setTimeout(() => {
        // 1. Мигание ошибки 404
        error404.style.animation = 'blink 0.5s 4';
        
        setTimeout(() => {
            // 2. Исчезновение ошибки и затемнение
            phaseError.style.opacity = '0';
            phaseError.style.transition = 'opacity 2s ease';
            
            setTimeout(() => {
                // 3. Переключение на фазу ужаса
                phaseError.classList.remove('active');
                phaseError.style.display = 'none';
                
                phaseHorror.classList.add('active');
                phaseHorror.style.opacity = '1';
                
                // 4. Показ страшного монстра
                setTimeout(() => {
                    monster1Video.style.opacity = '1';
                    monster1Video.play();
                    
                    // 5. Монстр исчезает через 1.2 сек
                    setTimeout(() => {
                        monster1Video.style.opacity = '0';
                        monster1Video.style.transition = 'opacity 1.2s ease';
                        
                        // 6. Появление кровавой таблички
                        setTimeout(() => {
                            bloodPlate.classList.remove('hidden');
                            // Воспроизведение звука капель
                            if(dripSound) {
                                dripSound.currentTime = 0;
                                dripSound.play();
                            }
                        }, 1200);
                    }, 1200);
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);

    // Обработка ввода имени
    submitName.addEventListener('click', processName);
    nameInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') processName();
    });

    function processName() {
        const userName = nameInput.value.trim();
        if(!userName) return;
        
        // 1. Страница светлеет
        phaseHorror.style.opacity = '0';
        phaseHorror.style.transition = 'opacity 2s ease';
        
        setTimeout(() => {
            phaseHorror.classList.remove('active');
            phaseHorror.style.display = 'none';
            
            // 2. Включение белой фазы
            phaseGood.classList.add('active');
            phaseGood.style.opacity = '1';
            
            // 3. Показ доброго монстра
            setTimeout(() => {
                monster2Video.style.opacity = '1';
                monster2Video.play();
                
                // 4. Монстр исчезает через 1.2 сек
                setTimeout(() => {
                    monster2Video.style.opacity = '0';
                    monster2Video.style.transition = 'opacity 1.2s ease';
                    
                    // 5. Показ текстовых сообщений
                    setTimeout(showTextMessages, 1200, userName);
                }, 1200);
            }, 500);
        }, 2000);
    }

    function showTextMessages(userName) {
        const messages = [
            `Приветствую ${userName}!`,
            'Зачем ты пришел?',
            'Тебя никто не звал',
            'Иди те на...'
        ];
        
        let delay = 0;
        
        messages.forEach((msg, index) => {
            setTimeout(() => {
                const messageEl = document.createElement('div');
                messageEl.className = 'message';
                messageEl.textContent = msg;
                textMessages.appendChild(messageEl);
                
                // Анимация появления
                setTimeout(() => {
                    messageEl.style.transition = 'opacity 2s ease';
                    messageEl.style.opacity = '1';
                    
                    // Анимация исчезновения
                    const fadeOutTime = (index === 3) ? 3000 : 2000;
                    const fadeOutDelay = (index === 3) ? 3000 : 2000;
                    
                    setTimeout(() => {
                        if(index === 3) {
                            // Особое рассыпание для последнего сообщения
                            messageEl.style.animation = 'scatter 3s forwards';
                            setTimeout(() => {
                                messageEl.remove();
                            }, 3000);
                        } else {
                            messageEl.style.opacity = '0';
                            setTimeout(() => {
                                messageEl.remove();
                            }, 2000);
                        }
                    }, fadeOutDelay);
                }, 100);
            }, delay);
            
            delay += (index === 3) ? 3000 : 2000;
        });
    }

    // Адаптация размера видео
    function resizeVideo() {
        const videos = document.querySelectorAll('.monster-media');
        const isMobile = window.innerWidth <= 768;
        
        videos.forEach(video => {
            if(isMobile) {
                video.style.objectFit = 'contain';
                video.style.backgroundColor = '#000';
            } else {
                video.style.objectFit = 'cover';
            }
        });
    }
    
    window.addEventListener('resize', resizeVideo);
    resizeVideo();
});
