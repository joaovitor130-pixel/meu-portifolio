// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}));

// Smooth scroll para os links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de entrada dos projetos e seções
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de projeto e seções
document.addEventListener('DOMContentLoaded', () => {
    // ADICIONEI '.hero-image' NA LINHA ABAIXO
    document.querySelectorAll('.hero-image, .projeto-card, .sobre-content, .contato-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Ativar animação inicial do hero
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 300);
});

// Efeito de hover nos cards de projeto
document.querySelectorAll('.projeto-card').forEach(card => {
    const image = card.querySelector('.projeto-image');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Contador de scroll para skills (opcional - animação de números)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start);
    }, 16);
}

// Scroll reveal para skills (quando chegar na seção)
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Aqui você pode adicionar contadores se quiser
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Copy email to clipboard
document.querySelector('.contato-link[href^="mailto:"]')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = e.target.getAttribute('href').replace('mailto:', '');
    
    try {
        await navigator.clipboard.writeText(email);
        showToast('Email copiado!', 'success');
    } catch (err) {
        console.error('Erro ao copiar email: ', err);
    }
});

// Função para mostrar toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Estilos CSS inline para toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease',
        fontWeight: '500'
    });
    
    // Animação de entrada
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });
    
    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Preloader (remove loading se houver)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Detectar se está no mobile para otimizar performance
const isMobile = window.innerWidth <= 768;
if (!isMobile) {
    // Apenas rodar parallax em desktop
    window.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.projeto-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.02;
            const xMove = (mouseX - 0.5) * speed * 20;
            const yMove = (mouseY - 0.5) * speed * 20;
            
            card.style.transform = `perspective(1000px) rotateY(${xMove}deg) rotateX(${-yMove}deg) translateY(-10px)`;
        });
    });
}

// Reset transform em mouseleave para cards
document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});