document.addEventListener('DOMContentLoaded', () => {
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Detectar preferencia del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Función para aplicar tema
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('bg-dark', 'text-light');
            body.classList.add('bg-light', 'text-dark');
            header.classList.remove('header-dark');
            header.classList.add('header-light');
            footer.classList.remove('footer-dark');
            footer.classList.add('footer-light');
            themeIcon.className = 'fas fa-sun theme-icon';
            themeText.textContent = 'Claro';
        } else if (theme === 'dark') {
            body.classList.remove('bg-light', 'text-dark');
            body.classList.add('bg-dark', 'text-light');
            header.classList.remove('header-light');
            header.classList.add('header-dark');
            footer.classList.remove('footer-light');
            footer.classList.add('footer-dark');
            themeIcon.className = 'fas fa-moon theme-icon';
            themeText.textContent = 'Oscuro';
        } else if (theme === 'auto') {
            if (prefersDarkScheme.matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
            themeIcon.className = 'fas fa-adjust theme-icon';
            themeText.textContent = 'Auto';
        }
        
        // Guardar preferencia
        localStorage.setItem('theme', theme);
    }

    // Cargar tema guardado o usar auto por defecto
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);

    // Event listeners para cambio de tema
    themeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
        });
    });

    // Listener para cambios automáticos del sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'auto') {
            applyTheme('auto');
        }
    });

    // Animación de entrada suave
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carousel
    const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'), {
        interval: 4000, // 4 segundos entre transiciones
        wrap: true, // Volver al inicio después del último slide
        pause: 'hover' // Pausar cuando el mouse esté sobre el carousel
    });

    // Pausar el carousel cuando esté fuera de vista (optimización)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                carousel.cycle(); // Reanudar
            } else {
                carousel.pause(); // Pausar
            }
        });
    });

    observer.observe(document.getElementById('carouselExample'));
});