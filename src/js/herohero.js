        document.addEventListener('DOMContentLoaded', () => {
            console.log('HeroHero script loaded');
            const left = document.querySelector('.left');
            const right = document.querySelector('.right');
            const container = document.querySelector('.containerHero');

            // Funkcia na kontrolu, či je mobilná verzia (podľa media query)
            const isMobile = () => window.matchMedia('(max-width: 800px)').matches;

            // Desktop hover efekty
            left.addEventListener('mouseenter', () => {
                if (!isMobile()) {
                    container.classList.add('hover-left');
                }
            });

            left.addEventListener('mouseleave', () => {
                if (!isMobile()) {
                    container.classList.remove('hover-left');
                }
            });

            right.addEventListener('mouseenter', () => {
                if (!isMobile()) {
                    container.classList.add('hover-right');
                }
            });

            right.addEventListener('mouseleave', () => {
                if (!isMobile()) {
                    container.classList.remove('hover-right');
                }
            });

            // Mobilné tap/hover efekty
            // Pre mobil použijeme 'click' na simuláciu hoveru, ale lepšie je riadiť to stavom
            left.addEventListener('click', () => {
                if (isMobile()) {
                    // Prepína triedu 'hover-top' na kontajneri
                    container.classList.toggle('hover-top');
                    container.classList.remove('hover-bottom'); // Ak už je aktívna druhá strana
                }
            });

            right.addEventListener('click', () => {
                if (isMobile()) {
                    // Prepína triedu 'hover-bottom' na kontajneri
                    container.classList.toggle('hover-bottom');
                    container.classList.remove('hover-top'); // Ak už je aktívna druhá strana
                }
            });

            // Resetovanie tried pri zmene veľkosti okna (mobil/desktop)
            window.addEventListener('resize', () => {
                if (!isMobile()) {
                    // Ak prejdeme na desktop, odstráň mobilné hover triedy
                    container.classList.remove('hover-top', 'hover-bottom');
                    // Zaistiť, že desktopové triedy sú tiež resetované pri prechode
                    container.classList.remove('hover-left', 'hover-right');
                } else {
                    // Ak prejdeme na mobil, odstráň desktopové hover triedy
                    container.classList.remove('hover-left', 'hover-right');
                    // Zaistiť, že mobilné triedy sú tiež resetované pri prechode
                    container.classList.remove('hover-top', 'hover-bottom');
                }
            });
        });