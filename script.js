// Elementos DOM
const animationContainer = document.getElementById('animation-container');
const continueBtn = document.getElementById('continue-btn');
const loginContainer = document.getElementById('login-container');
const mainSite = document.getElementById('main-site');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const imageGallery = document.getElementById('image-gallery');
const musicList = document.getElementById('music-list');
const couplePhoto = document.getElementById('couple-photo');
const coupleMessage = document.getElementById('couple-message');
const randomGallery = document.getElementById('random-gallery');
const galleryIndicators = document.getElementById('gallery-indicators');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const gameAccessMainBtn = document.getElementById('game-access-main-btn');
const floatingGameBtn = document.getElementById('floating-game-btn');

// Elementos do contador
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Credenciais do cofre
const SAFE_PASSWORD = "03122008"; // 03/12/2008
let attempts = 0;

// Galeria de momentos aleatórios
let currentGalleryIndex = 0;
let galleryItems = [];

// Sistema de Música
let currentAudio = null;
let currentPlayingCard = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Criar corações caindo
    createFallingHearts();
    
    // Criar confetes
    createConfetti();
    
    // Iniciar contador
    startCountdown();
    
    // Inicializar display do cofre
    initSafeDisplay();
    
    // Carregar dados dos links
    loadDataFromLinks();
    
    // Inicializar jogo
    initDotGame();
    
    // Inicializar galeria aleatória
    initRandomGallery();
});

// Criar corações caindo
function createFallingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'falling-hearts-container';
    document.body.appendChild(heartsContainer);
    
    // Criar corações continuamente
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${15 + Math.random() * 20}px`;
        heart.style.animationDuration = `${5 + Math.random() * 5}s`;
        
        heartsContainer.appendChild(heart);
        
        // Remover coração após a animação
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 10000);
    }, 500);
}

// Criar confetes
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Cores dos confetes
    const colors = ['#ff6b8b', '#6b8bff', '#6bff8b', '#ffd36b', '#c56bff', '#6bffd3', '#ff8b6b'];
    
    // Criar confetes continuamente
    setInterval(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${3 + Math.random() * 4}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        
        confettiContainer.appendChild(confetti);
        
        // Remover confete após a animação
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 7000);
    }, 100);
}

// Contador para o próximo aniversário (03/12)
function startCountdown() {
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Definir a data do próximo aniversário (03 de Dezembro)
        let nextBirthday = new Date(currentYear, 11, 3); // 11 = Dezembro (0-indexed)
        
        // Se o aniversário deste ano já passou, usar o próximo ano
        if (now > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, 11, 3);
        }
        
        const timeRemaining = nextBirthday - now;
        
        // Calcular dias, horas, minutos e segundos
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Atualizar elementos DOM
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Atualizar imediatamente e a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Inicializar display do cofre
function initSafeDisplay() {
    const passwordInput = document.getElementById('password');
    const digits = document.querySelectorAll('.digit');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const value = this.value;
            
            // Atualizar display
            digits.forEach((digit, index) => {
                if (index < value.length) {
                    digit.textContent = '•';
                    digit.classList.add('filled');
                } else {
                    digit.textContent = '•';
                    digit.classList.remove('filled');
                }
            });
        });
        
        // Focar no input automaticamente
        setTimeout(() => {
            passwordInput.focus();
        }, 100);
    }
}

// Sistema de Login do Cofre
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        const attemptsElement = document.getElementById('attempts');
        
        attempts++;
        if (attemptsElement) {
            attemptsElement.textContent = attempts;
        }
        
        if (password === SAFE_PASSWORD) {
            // Senha correta - Efeito de sucesso
            playSuccessEffect();
            
            // Login bem-sucedido
            setTimeout(() => {
                loginContainer.style.display = 'none';
                mainSite.style.display = 'block';
                
                // Animação de fade-in
                setTimeout(() => {
                    mainSite.classList.add('fade-in');
                    // Criar player de música após login bem-sucedido
                    createMusicPlayer();
                }, 100);
            }, 1000);
            
        } else {
            // Senha incorreta
            errorMessage.style.display = 'flex';
            playErrorEffect();
            
            // Efeito de erro no input
            const passwordInput = document.getElementById('password');
            passwordInput.style.borderColor = '#e74c3c';
            passwordInput.style.animation = 'shake 0.5s ease';
            
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            
            // Limpar senha após 2 segundos
            setTimeout(() => {
                passwordInput.value = '';
                passwordInput.style.borderColor = '#f1c40f';
                errorMessage.style.display = 'none';
                updateSafeDisplay('');
            }, 2000);
        }
    });
}

// Efeito de sucesso
function playSuccessEffect() {
    const safeBox = document.querySelector('.safe-box');
    const digits = document.querySelectorAll('.digit');
    
    // Efeito visual
    safeBox.style.animation = 'pulse 0.5s ease';
    digits.forEach(digit => {
        digit.style.background = '#27ae60';
        digit.style.borderColor = '#27ae60';
    });
    
    setTimeout(() => {
        safeBox.style.animation = '';
    }, 500);
}

// Efeito de erro
function playErrorEffect() {
    const safeBox = document.querySelector('.safe-box');
    safeBox.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        safeBox.style.animation = '';
    }, 500);
}

// Atualizar display do cofre
function updateSafeDisplay(value) {
    const digits = document.querySelectorAll('.digit');
    digits.forEach((digit, index) => {
        if (index < value.length) {
            digit.textContent = '•';
            digit.classList.add('filled');
        } else {
            digit.textContent = '•';
            digit.classList.remove('filled');
        }
    });
}

// Continuar para o login após a animação
if (continueBtn) {
    continueBtn.addEventListener('click', function() {
        animationContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
    });
}

// Carregar dados dos links
function loadDataFromLinks() {
    // Carregar músicas (serão carregadas na função createMusicPlayer)
    
    // Carregar fotos da galeria principal
    const photoLinks = document.querySelectorAll('#photo-links div');
    if (photoLinks.length > 0 && imageGallery) {
        photoLinks.forEach(photo => {
            const title = photo.getAttribute('data-title');
            const caption = photo.getAttribute('data-caption');
            const url = photo.getAttribute('data-url');
            
            addImageToGallery(url, title, caption);
        });
    }
    
    // Carregar foto do casal
    const couplePhotoLink = document.getElementById('couple-photo-link');
    if (couplePhotoLink && couplePhoto) {
        const url = couplePhotoLink.getAttribute('data-url');
        couplePhoto.src = url;
        couplePhoto.alt = "Nossa foto especial";
    }
}

// Galeria de Imagens Principal
function addImageToGallery(imageUrl, title, caption) {
    if (!imageGallery) return;
    
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    galleryItem.innerHTML = `
        <img src="${imageUrl}" alt="${title}" class="gallery-image">
        <div class="gallery-content">
            <h3 class="gallery-title">${title}</h3>
            <p class="gallery-caption">${caption}</p>
        </div>
    `;
    
    imageGallery.appendChild(galleryItem);
}

// Inicializar Galeria Aleatória
function initRandomGallery() {
    const randomPhotoLinks = document.querySelectorAll('#random-photo-links div');
    
    if (randomPhotoLinks.length > 0 && randomGallery) {
        randomPhotoLinks.forEach((photo, index) => {
            const caption = photo.getAttribute('data-caption');
            const url = photo.getAttribute('data-url');
            
            const galleryItem = document.createElement('div');
            galleryItem.className = 'random-gallery-item';
            galleryItem.innerHTML = `
                <img src="${url}" alt="Momento especial ${index + 1}" class="random-gallery-image">
                <div class="random-gallery-caption">${caption}</div>
            `;
            
            randomGallery.appendChild(galleryItem);
            galleryItems.push(galleryItem);
            
            // Criar indicador
            const indicator = document.createElement('div');
            indicator.className = `gallery-indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => goToGallerySlide(index));
            galleryIndicators.appendChild(indicator);
        });
        
        // Configurar navegação
        setupGalleryNavigation();
    }
}

// Configurar navegação da galeria
function setupGalleryNavigation() {
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            goToGallerySlide(currentGalleryIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToGallerySlide(currentGalleryIndex + 1);
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToGallerySlide(currentGalleryIndex - 1);
            } else if (e.key === 'ArrowRight') {
                goToGallerySlide(currentGalleryIndex + 1);
            }
        });
        
        // Navegação por swipe em dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;
        
        randomGallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        randomGallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe para esquerda - próxima
                    goToGallerySlide(currentGalleryIndex + 1);
                } else {
                    // Swipe para direita - anterior
                    goToGallerySlide(currentGalleryIndex - 1);
                }
            }
        }
    }
}

// Ir para slide específico da galeria
function goToGallerySlide(index) {
    if (galleryItems.length === 0) return;
    
    // Ajustar índice para circular
    if (index < 0) {
        index = galleryItems.length - 1;
    } else if (index >= galleryItems.length) {
        index = 0;
    }
    
    // Atualizar galeria
    randomGallery.style.transform = `translateX(-${index * 100}%)`;
    currentGalleryIndex = index;
    
    // Atualizar indicadores
    updateGalleryIndicators();
}

// Atualizar indicadores da galeria
function updateGalleryIndicators() {
    const indicators = document.querySelectorAll('.gallery-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentGalleryIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// SISTEMA DE MÚSICA FUNCIONAL
function createMusicPlayer() {
    if (!musicList) return;
    
    // Limpar conteúdo existente
    musicList.innerHTML = '';
    
    // Obter dados das músicas
    const musicLinks = document.querySelectorAll('#music-links div');
    
    if (musicLinks.length === 0) {
        // Adicionar músicas de exemplo se não houver configurações
        const sampleMusics = [
            {
                title: "Perfect",
                artist: "Ed Sheeran",
                url: "https://assets.codepen.io/4358584/Perfect.mp3"
            },
            {
                title: "A Thousand Years",
                artist: "Christina Perri",
                url: "https://assets.codepen.io/4358584/AThousandYears.mp3"
            },
            {
                title: "All of Me",
                artist: "John Legend",
                url: "https://assets.codepen.io/4358584/AllOfMe.mp3"
            },
            {
                title: "At My Worst",
                artist: "Pink Sweat$",
                url: "https://assets.codepen.io/4358584/AtMyWorst.mp3"
            }
        ];
        
        sampleMusics.forEach(music => {
            addMusicToPlayer(music.title, music.artist, music.url);
        });
    } else {
        // Usar músicas configuradas
        musicLinks.forEach(music => {
            const title = music.getAttribute('data-title');
            const artist = music.getAttribute('data-artist');
            const url = music.getAttribute('data-url');
            
            if (title && artist && url) {
                addMusicToPlayer(title, artist, url);
            }
        });
    }
}

function addMusicToPlayer(title, artist, url) {
    const musicItem = document.createElement('div');
    musicItem.className = 'music-item';
    
    musicItem.innerHTML = `
        <div class="music-info">
            <h3 class="music-title">${title}</h3>
            <p class="music-artist">${artist}</p>
        </div>
        <div class="music-controls">
            <button class="music-play-btn" data-url="${url}">
                <i class="fas fa-play"></i>
            </button>
            <button class="music-pause-btn" style="display: none;">
                <i class="fas fa-pause"></i>
            </button>
        </div>
        <audio class="audio-player" preload="metadata">
            <source src="${url}" type="audio/mpeg">
            Seu navegador não suporta o elemento de áudio.
        </audio>
    `;
    
    musicList.appendChild(musicItem);
    
    // Configurar controles
    const playBtn = musicItem.querySelector('.music-play-btn');
    const pauseBtn = musicItem.querySelector('.music-pause-btn');
    const audio = musicItem.querySelector('.audio-player');
    
    // Tentar carregar a música
    audio.addEventListener('error', function(e) {
        console.error('Erro ao carregar música:', title, url);
        playBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        playBtn.disabled = true;
        playBtn.title = 'Erro ao carregar música';
    });
    
    playBtn.addEventListener('click', function() {
        playMusic(musicItem, audio, playBtn, pauseBtn);
    });
    
    pauseBtn.addEventListener('click', function() {
        pauseMusic(audio, playBtn, pauseBtn);
    });
    
    audio.addEventListener('ended', function() {
        resetMusicControls(playBtn, pauseBtn);
        currentAudio = null;
        currentPlayingCard = null;
    });
    
    audio.addEventListener('pause', function() {
        if (!audio.ended) {
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
    });
}

function playMusic(musicItem, audio, playBtn, pauseBtn) {
    // Pausar música atual se houver
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        if (currentPlayingCard) {
            const prevPlayBtn = currentPlayingCard.querySelector('.music-play-btn');
            const prevPauseBtn = currentPlayingCard.querySelector('.music-pause-btn');
            if (prevPlayBtn && prevPauseBtn) {
                prevPlayBtn.style.display = 'block';
                prevPauseBtn.style.display = 'none';
            }
        }
    }
    
    // Tocar nova música
    audio.play().then(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        currentAudio = audio;
        currentPlayingCard = musicItem;
        
        // Adicionar efeito visual
        musicItem.classList.add('playing');
    }).catch(error => {
        console.error('Erro ao reproduzir música:', error);
        playBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        playBtn.disabled = true;
    });
}

function pauseMusic(audio, playBtn, pauseBtn) {
    audio.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    
    if (currentPlayingCard) {
        currentPlayingCard.classList.remove('playing');
    }
}

function resetMusicControls(playBtn, pauseBtn) {
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

// Jogo de Interligar Pontos
let dotGame = null;

function initDotGame() {
    dotGame = new DotGame();
    
    // Configurar botões de acesso ao jogo
    if (gameAccessMainBtn) {
        gameAccessMainBtn.addEventListener('click', () => {
            dotGame.showGame();
        });
    }
    
    if (floatingGameBtn) {
        floatingGameBtn.addEventListener('click', () => {
            dotGame.showGame();
        });
    }
}

// Classe do Jogo de Interligar Pontos
class DotGame {
    constructor() {
        this.dots = [];
        this.lines = [];
        this.currentDot = 1;
        this.totalDots = 24; // "mulher mais bela desse mundo" tem 24 letras
        this.gameBoard = document.getElementById('dot-game-board');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.resetBtn = document.getElementById('reset-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.backBtn = document.getElementById('back-btn');
        this.gameContainer = document.getElementById('dot-game-container');
        this.completionEffect = document.getElementById('completion-effect');
        this.continueGameBtn = document.getElementById('continue-game-btn');
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.setupEventListeners();
    }
    
    createDots() {
        // Coordenadas para formar a frase "mulher mais bela desse mundo"
        const dotPositions = [
            // M
            {x: 10, y: 50, num: 1},
            {x: 10, y: 100, num: 2},
            {x: 10, y: 150, num: 3},
            {x: 30, y: 100, num: 4},
            {x: 50, y: 50, num: 5},
            {x: 50, y: 100, num: 6},
            {x: 50, y: 150, num: 7},
            
            // U
            {x: 80, y: 50, num: 8},
            {x: 80, y: 100, num: 9},
            {x: 80, y: 150, num: 10},
            {x: 100, y: 150, num: 11},
            {x: 120, y: 150, num: 12},
            {x: 120, y: 100, num: 13},
            {x: 120, y: 50, num: 14},
            
            // L
            {x: 150, y: 50, num: 15},
            {x: 150, y: 100, num: 16},
            {x: 150, y: 150, num: 17},
            {x: 170, y: 150, num: 18},
            
            // H
            {x: 200, y: 50, num: 19},
            {x: 200, y: 100, num: 20},
            {x: 220, y: 100, num: 21},
            {x: 240, y: 50, num: 22},
            {x: 240, y: 100, num: 23},
            {x: 240, y: 150, num: 24}
        ].map(pos => ({
            ...pos,
            x: (pos.x / 250) * 100 + '%',
            y: (pos.y / 200) * 100 + '%'
        }));
        
        // Criar pontos
        dotPositions.forEach(pos => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.textContent = pos.num;
            dot.style.left = pos.x;
            dot.style.top = pos.y;
            dot.dataset.number = pos.num;
            
            // Marcar o primeiro ponto como ativo
            if (pos.num === 1) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => this.handleDotClick(pos.num));
            this.gameBoard.appendChild(dot);
            this.dots.push(dot);
        });
    }
    
    setupEventListeners() {
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetGame());
        }
        
        if (this.hintBtn) {
            this.hintBtn.addEventListener('click', () => this.showHint());
        }
        
        if (this.backBtn) {
            this.backBtn.addEventListener('click', () => this.hideGame());
        }
        
        if (this.continueGameBtn) {
            this.continueGameBtn.addEventListener('click', () => this.hideCompletion());
        }
    }
    
    showGame() {
        if (this.gameContainer) {
            this.gameContainer.style.display = 'flex';
            document.getElementById('main-site').style.display = 'none';
            
            // Animar entrada
            setTimeout(() => {
                this.gameContainer.style.opacity = '1';
            }, 10);
        }
    }
    
    hideGame() {
        if (this.gameContainer) {
            this.gameContainer.style.display = 'none';
            document.getElementById('main-site').style.display = 'block';
        }
    }
    
    handleDotClick(dotNumber) {
        if (dotNumber === this.currentDot) {
            this.connectDot(dotNumber);
            
            // Atualizar progresso
            const progress = (this.currentDot - 1) / this.totalDots * 100;
            if (this.progressFill) {
                this.progressFill.style.width = `${progress}%`;
            }
            if (this.progressText) {
                this.progressText.textContent = `${Math.round(progress)}% completo`;
            }
            
            // Se completou todos os pontos
            if (this.currentDot > this.totalDots) {
                setTimeout(() => {
                    this.showCompletion();
                }, 500);
            } else {
                // Ativar próximo ponto
                this.activateNextDot();
            }
        } else if (dotNumber < this.currentDot) {
            // Ponto já conectado - apenas dar feedback visual
            const dot = this.dots.find(d => d.dataset.number == dotNumber);
            if (dot) {
                dot.style.animation = 'none';
                setTimeout(() => {
                    dot.style.animation = '';
                }, 10);
            }
        } else {
            // Ponto errado - dar feedback
            const dot = this.dots.find(d => d.dataset.number == dotNumber);
            if (dot) {
                dot.style.backgroundColor = '#e74c3c';
                dot.style.animation = 'shake 0.5s ease';
                
                setTimeout(() => {
                    dot.style.backgroundColor = '';
                    dot.style.animation = '';
                }, 500);
            }
        }
    }
    
    connectDot(dotNumber) {
        const dot = this.dots.find(d => d.dataset.number == dotNumber);
        
        if (!dot) return;
        
        // Marcar como conectado
        dot.classList.remove('active');
        dot.classList.add('connected');
        
        // Se não for o primeiro ponto, criar linha do ponto anterior até este
        if (dotNumber > 1) {
            const prevDot = this.dots.find(d => d.dataset.number == (dotNumber - 1));
            if (prevDot) {
                this.createLine(prevDot, dot);
            }
        }
        
        this.currentDot++;
    }
    
    createLine(fromDot, toDot) {
        const fromRect = fromDot.getBoundingClientRect();
        const toRect = toDot.getBoundingClientRect();
        const boardRect = this.gameBoard.getBoundingClientRect();
        
        const x1 = fromRect.left + fromRect.width/2 - boardRect.left;
        const y1 = fromRect.top + fromRect.height/2 - boardRect.top;
        const x2 = toRect.left + toRect.width/2 - boardRect.left;
        const y2 = toRect.top + toRect.height/2 - boardRect.top;
        
        // Calcular distância e ângulo
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Criar linha
        const line = document.createElement('div');
        line.className = 'line animating';
        line.style.setProperty('--line-width', `${distance}px`);
        line.style.width = `${distance}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        
        this.gameBoard.appendChild(line);
        this.lines.push(line);
        
        // Remover classe de animação após completar
        setTimeout(() => {
            line.classList.remove('animating');
        }, 800);
    }
    
    activateNextDot() {
        const nextDot = this.dots.find(d => d.dataset.number == this.currentDot);
        if (nextDot) {
            // Remover ativo de todos os pontos
            this.dots.forEach(dot => dot.classList.remove('active'));
            // Ativar próximo ponto
            nextDot.classList.add('active');
        }
    }
    
    showHint() {
        // Destacar o ponto atual
        const currentDot = this.dots.find(d => d.dataset.number == this.currentDot);
        if (currentDot) {
            currentDot.style.boxShadow = '0 0 30px 15px #ffd36b';
            currentDot.style.animation = 'pulseDot 0.5s infinite';
            
            setTimeout(() => {
                currentDot.style.boxShadow = '';
                currentDot.style.animation = '';
            }, 2000);
        }
    }
    
    resetGame() {
        // Limpar pontos
        this.dots.forEach(dot => {
            dot.classList.remove('connected', 'active', 'completed');
        });
        
        // Limpar linhas
        this.lines.forEach(line => line.remove());
        this.lines = [];
        
        // Resetar estado
        this.currentDot = 1;
        
        // Ativar primeiro ponto
        const firstDot = this.dots.find(d => d.dataset.number == 1);
        if (firstDot) {
            firstDot.classList.add('active');
        }
        
        // Resetar progresso
        if (this.progressFill) {
            this.progressFill.style.width = '0%';
        }
        if (this.progressText) {
            this.progressText.textContent = '0% completo';
        }
    }
    
    showCompletion() {
        // Efeito nos pontos
        this.dots.forEach(dot => {
            dot.classList.remove('connected');
            dot.classList.add('completed');
        });
        
        // Mostrar efeito de completar
        if (this.completionEffect) {
            this.completionEffect.style.display = 'flex';
        }
        
        // Tocar música de vitória
        this.playVictorySound();
        
        // Criar confetes extras
        this.createVictoryConfetti();
    }
    
    hideCompletion() {
        if (this.completionEffect) {
            this.completionEffect.style.display = 'none';
        }
        this.hideGame();
    }
    
    playVictorySound() {
        // Criar um som simples de vitória
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Melodia simples
            const now = audioContext.currentTime;
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
            oscillator.frequency.setValueAtTime(1046.50, now + 0.3); // C6
            
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1);
            
            oscillator.start(now);
            oscillator.stop(now + 1);
        } catch (e) {
            console.log('Audio not supported or blocked by browser');
        }
    }
    
    createVictoryConfetti() {
        const colors = ['#ff6b8b', '#6b8bff', '#6bff8b', '#ffd36b', '#c56bff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 15px;
                height: 15px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                transform: rotate(${Math.random() * 360}deg);
                animation: victoryConfettiFall ${3 + Math.random() * 5}s linear forwards;
                z-index: 3001;
            `;
            
            document.body.appendChild(confetti);
            
            // Remover após animação
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 8000);
        }
        
        // Adicionar estilo para a animação
        if (!document.getElementById('victory-confetti-style')) {
            const style = document.createElement('style');
            style.id = 'victory-confetti-style';
            style.textContent = `
                @keyframes victoryConfettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Auto-play da galeria aleatória
setInterval(() => {
    if (galleryItems.length > 0) {
        goToGallerySlide(currentGalleryIndex + 1);
    }
}, 5000);

// Player de música global
document.addEventListener('click', function(e) {
    // Pausar música quando clicar fora do player (opcional)
    if (currentAudio && !e.target.closest('.music-item') && !e.target.closest('.music-play-btn') && !e.target.closest('.music-pause-btn')) {
        // Opcional: adicione lógica se quiser pausar ao clicar fora
    }
});