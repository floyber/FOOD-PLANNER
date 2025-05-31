// Food Planner - Animaciones dinámicas y efectos interactivos avanzados
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado completamente - iniciando configuración avanzada');
    
    // Referencias a los elementos de características
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    // Inicializar todas las animaciones y efectos
    initAdvancedAnimations();
    initParticleEffects();
    initHoverEffects();
    initClickEffects();
    initFloatingAnimation();
    
    // Configurar el modal de inicio de sesión
    setupLoginModal();
});

// Función para inicializar animaciones avanzadas de entrada
function initAdvancedAnimations() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    // Crear contenedor para efectos de fondo
    createBackgroundEffects();
    
    // Configurar estado inicial con efectos más dramáticos
    featureBoxes.forEach((box, index) => {
        // Estado inicial: invisible y transformado
        box.style.opacity = '0';
        box.style.transform = 'translateY(100px) rotateX(45deg) scale(0.8)';
        box.style.filter = 'blur(10px)';
        box.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Añadir clase para efectos CSS adicionales
        box.classList.add('feature-animated');
        
        // Animación de entrada escalonada con efectos únicos por box
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0) rotateX(0) scale(1)';
            box.style.filter = 'blur(0px)';
            
            // Efecto de brillo inicial
            box.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.3)';
            
            // Añadir efecto de ondas
            createRippleEffect(box);
            
        }, 300 + (index * 200));
    });
}

// Crear efectos de partículas de fondo
function initParticleEffects() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Crear partículas flotantes
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(particleContainer, i);
    }
}

// Crear partícula flotante individual
function createFloatingParticle(container, index) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const colors = ['#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9'];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        opacity: ${Math.random() * 0.7 + 0.3};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-${index} ${15 + Math.random() * 10}s infinite linear;
    `;
    
    // Crear keyframes únicos para cada partícula
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-${index} {
            from {
                transform: translateY(100vh) rotate(0deg);
            }
            to {
                transform: translateY(-100px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    container.appendChild(particle);
    
    // Recrear partícula cuando termine la animación
    setTimeout(() => {
        particle.remove();
        createFloatingParticle(container, index);
    }, (15 + Math.random() * 10) * 1000);
}

// Efectos de hover avanzados
function initHoverEffects() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach(box => {
        // Efecto hover con transformaciones 3D
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(76, 175, 80, 0.4)';
            this.style.zIndex = '10';
            
            // Efecto de giro completo del icono con brillo
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'scale(1.3) rotateY(360deg)';
                icon.style.color = '#4CAF50';
                icon.style.textShadow = '0 0 20px rgba(76, 175, 80, 0.8)';
                
                // Añadir efecto de pulso durante el giro
                icon.style.animation = 'icon-pulse 0.8s ease-in-out';
            }
            
            // Crear ondas de energía
            createEnergyWaves(this);
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            this.style.zIndex = '1';
            
            // Restaurar icono con animación de retorno
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'all 0.5s ease-out';
                icon.style.transform = 'scale(1) rotateY(0deg)';
                icon.style.color = '#4CAF50';
                icon.style.textShadow = 'none';
                icon.style.animation = 'none';
            }
        });
    });
}

// Efectos de clic con explosión de partículas y giro de iconos
function initClickEffects() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            // Prevenir múltiples clics rápidos
            if (this.classList.contains('clicking')) return;
            
            this.classList.add('clicking');
            
            // Efecto de implosión seguido de explosión
            this.style.transform = 'scale(0.95)';
            this.style.filter = 'brightness(1.5)';
            
            // Efecto de giro rápido del icono al hacer clic
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'scale(1.5) rotateY(720deg) rotateX(360deg)';
                icon.style.filter = 'drop-shadow(0 0 15px rgba(76, 175, 80, 0.8))';
            }
            
            // Crear explosión de partículas en el punto de clic
            createClickExplosion(e.pageX, e.pageY);
            
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.filter = 'brightness(1)';
                    
                    // Restaurar icono
                    if (icon) {
                        icon.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
                        icon.style.filter = 'none';
                    }
                    
                    // Navegación con retraso para ver la animación
                    const feature = this.getAttribute('data-feature');
                    setTimeout(() => {
                        navigateToFeature(feature);
                    }, 300);
                    
                    this.classList.remove('clicking');
                }, 200);
            }, 100);
        });
        
        // Efectos táctiles para móviles con giro de icono
        box.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            createTouchRipple(this, touch.clientX, touch.clientY);
            
            // Efecto de giro sutil en touch
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'scale(1.1) rotateZ(15deg)';
            }
        });
        
        box.addEventListener('touchend', function() {
            // Restaurar icono después del touch
            const icon = this.querySelector('i');
            if (icon) {
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotateZ(0deg)';
                }, 100);
            }
        });
    });
}

// Crear explosión de partículas en el clic
function createClickExplosion(x, y) {
    const colors = ['#4CAF50', '#81C784', '#FFC107', '#FF9800'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / 12) * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x - size/2}px;
            top: ${y - size/2}px;
            pointer-events: none;
            z-index: 1000;
            animation: explode-${i} 0.8s ease-out forwards;
        `;
        
        // Crear animación única para cada partícula
        const style = document.createElement('style');
        style.textContent = `
            @keyframes explode-${i} {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(particle);
        
        // Limpiar después de la animación
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 800);
    }
}

// Crear ondas de energía
function createEnergyWaves(element) {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid rgba(76, 175, 80, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: energy-wave 1.5s ease-out;
        pointer-events: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes energy-wave {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    element.style.position = 'relative';
    element.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
        style.remove();
    }, 1500);
}

// Crear efecto de ondas en el clic
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        background: radial-gradient(circle at center, transparent 0%, rgba(76, 175, 80, 0.1) 50%, transparent 100%);
        animation: ripple-pulse 2s ease-in-out infinite;
        pointer-events: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0.3;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.1;
            }
        }
    `;
    document.head.appendChild(style);
    
    element.style.position = 'relative';
    element.appendChild(ripple);
}

// Animación flotante sutil y continua
function initFloatingAnimation() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach((box, index) => {
        const delay = index * 0.5;
        const duration = 4 + Math.random() * 2;
        
        box.style.animation = `gentle-float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Crear keyframes para animación flotante
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gentle-float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-8px);
            }
        }
        
        @keyframes icon-pulse {
            0%, 100% {
                filter: drop-shadow(0 0 5px rgba(76, 175, 80, 0.5));
            }
            50% {
                filter: drop-shadow(0 0 25px rgba(76, 175, 80, 1));
            }
        }
        
        @keyframes icon-rotate-continuous {
            from {
                transform: rotateY(0deg);
            }
            to {
                transform: rotateY(360deg);
            }
        }
        
        .feature-animated {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-animated:hover {
            animation-play-state: paused;
        }
        
        .feature-animated i {
            transition: all 0.3s ease;
        }
        
        .feature-box:nth-child(1) i {
            animation: icon-rotate-continuous 8s linear infinite;
            animation-delay: 0s;
        }
        
        .feature-box:nth-child(2) i {
            animation: icon-rotate-continuous 10s linear infinite;
            animation-delay: 2s;
        }
        
        .feature-box:nth-child(3) i {
            animation: icon-rotate-continuous 12s linear infinite;
            animation-delay: 4s;
        }
    `;
    document.head.appendChild(style);
}

// Crear efectos de fondo dinámicos
function createBackgroundEffects() {
    const bgEffect = document.createElement('div');
    bgEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, 
            rgba(76, 175, 80, 0.05) 0%, 
            rgba(129, 199, 132, 0.03) 25%, 
            rgba(165, 214, 167, 0.05) 50%, 
            rgba(200, 230, 201, 0.03) 75%, 
            rgba(76, 175, 80, 0.05) 100%);
        background-size: 400% 400%;
        animation: gradient-shift 15s ease infinite;
        pointer-events: none;
        z-index: -2;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bgEffect);
}

// Función mejorada de navegación con transición
function navigateToFeature(feature) {
    // Crear overlay de transición
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #4CAF50, #81C784);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: bold;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="animation: spin 1s linear infinite; font-size: 48px; margin-bottom: 20px;">⟳</div>
            Cargando...
        </div>
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(overlay);
    
    // Mostrar overlay
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Navegar después del efecto
    setTimeout(() => {
        switch(feature) {
            case 'calendario':
                window.location.href = 'CALENDARIOindex.html';
                break;
            case 'recetas':
                window.location.href = 'RECETAindex.html';
                break;
            case 'compras':
                window.location.href = 'LISTACOMPRASindex.html';
                break;
        }
    }, 1000);
}

// Configurar funcionalidad del modal de inicio de sesión (manteniendo la funcionalidad original)
function setupLoginModal() {
    console.log('Configurando modal de inicio de sesión');
    
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    
    if (!loginBtn || !loginModal) {
        console.error('Elementos del modal no encontrados');
        return;
    }
    
    const modalClose = document.querySelector('.modal-close');
    const loginForm = document.getElementById('login-form');
    
    function openLoginModal(e) {
        e.preventDefault();
        console.log('Abriendo modal de inicio de sesión');
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Añadir efecto de entrada al modal
        const modalContent = loginModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.7) translateY(-50px)';
            modalContent.style.opacity = '0';
            modalContent.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
            }, 10);
        }
    }
    
    loginBtn.addEventListener('click', openLoginModal);
    
    function closeModal() {
        console.log('Cerrando modal');
        const modalContent = loginModal.querySelector('.modal-content');
        
        if (modalContent) {
            modalContent.style.transform = 'scale(0.7) translateY(-50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                loginModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        } else {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal();
        }
    });
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario de inicio de sesión enviado');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            checkCredentials(email, password);
        });
    }
    
    function checkCredentials(email, password) {
        // Usar variables en memoria en lugar de localStorage
        const storedUserData = window.userData || null;
        
        if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
            alert('Inicio de sesión exitoso');
            window.isLoggedIn = true;
            window.currentUser = storedUserData.nombre;
            closeModal();
            updateUIForLoggedInUser(storedUserData.nombre);
        } else {
            alert('Correo electrónico o contraseña incorrectos, o no hay usuarios registrados.');
        }
    }
    
    function updateUIForLoggedInUser(nombre) {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.textContent = `Hola, ${nombre}`;
            loginBtn.removeEventListener('click', openLoginModal);
            
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('¿Desea cerrar sesión?')) {
                    window.isLoggedIn = false;
                    window.currentUser = null;
                    window.location.reload();
                }
            });
        }
    }
    
    // Verificar sesión existente
    if (window.isLoggedIn && window.currentUser) {
        updateUIForLoggedInUser(window.currentUser);
    }
}