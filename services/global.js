const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    darkModeToggle();
    const currentLocation = window.location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        menuItem[i].classList.remove('active');
        if (menuItem[i].href === currentLocation) {
            menuItem[i].className += " active";
        }
        else if ((currentLocation.endsWith('/') || currentLocation.endsWith('/index.html')) && menuItem[i].href.endsWith('index.html')) {
             menuItem[i].className += " active";
        }
    }
});


const darkModeToggle = () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    const sunIcon = toggleButton ? toggleButton.querySelector('.fa-sun') : null;
    const moonIcon = toggleButton ? toggleButton.querySelector('.fa-moon') : null;

    
    if (!toggleButton || !sunIcon || !moonIcon) {
        console.error("Dark mode toggle button or icons not found. Button:", toggleButton, "Sun:", sunIcon, "Moon:", moonIcon);
        return; 
    }

    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            body.classList.remove('dark-mode');
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    };

    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        
        applyTheme('light');
    }


    
    toggleButton.addEventListener('click', () => {
        
        body.classList.toggle('dark-mode');

        
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
            theme = 'dark';
        } else {
            
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
            theme = 'light';
        }
        
        localStorage.setItem('theme', theme);
    });
};