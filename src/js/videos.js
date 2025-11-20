(function () {
    'use strict';

    const videos = [
        'Smcn2iT292E',
        'vR4tN1RfahE',
        'nGbLTnktrJM'
    ];

    const shorts = [
        'VjDJKA47By8',
        'PWsWQi-FAQk',
        'b51SKVo83IA'
    ];

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth <= 768;
    }

    function buildGrid() {
        const grid = document.querySelector('.yt-grid');
        if (!grid) return;

        const useShorts = isMobile() && shorts.length > 0;
        const list = useShorts ? shorts : videos;

        if (list.length === 0) {
            grid.innerHTML = '<p>Videá nie sú dostupné.</p>';
            return;
        }

        grid.innerHTML = '';

        list.forEach(id => {
            const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            const item = document.createElement('div');
            item.className = 'yt-item';

            item.innerHTML = `
                <img loading="lazy" src="${thumb}" alt="YouTube thumbnail">
                <div class="yt-play" aria-hidden="true">▶</div>
                <div class="yt-label">${useShorts ? 'Short' : 'Video'}</div>
            `;

            // Hover -> autoplay muted
            item.addEventListener('mouseenter', () => {
                const iframe = document.createElement('iframe');
                if (!item.querySelector('iframe')) {
                    iframe.width = '100%';
                    iframe.height = '100%';
                    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
                    iframe.title = 'YouTube video player';
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;

                    item.innerHTML = '';
                    item.appendChild(iframe);
                }
                //if click on iframe unmute video
                // const iframe = item.querySelector('iframe');
                if (iframe) {
                    iframe.addEventListener('click', function() {
                        console.log('Iframe clicked for unmute');
                        
                        // Pošleme správu do iframe, aby sme zrušili mute
                        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                    });
                }
                
            });

            // Klik -> prehrávanie so zvukom
item.addEventListener('click', () => {
    console.log('Item clicked');
    // Získame ID videa zo zdrojového obrázka
    const videoId = item.querySelector('img').getAttribute('src').match(/\/(\w+)\//)[1];

    // Vytvoríme iframe pre YouTube video
    const iframe = document.createElement('iframe');
    iframe.width = '100%';  // Nastavíme šírku iframe na 100% šírky
    iframe.height = '100vh';  // Nastavíme výšku iframe na 100% výšky okna (100vh)
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;  // Autoplay so zvukom
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;  // Povolenie pre režim celej obrazovky

    // Vyčistíme obsah item a pridáme iframe
    item.innerHTML = ''; 
    item.appendChild(iframe);  // Pridáme iframe do DOM
});





            //mouseleave -> remove iframe
            item.addEventListener('mouseleave', () => {
                item.innerHTML = `
                    <img loading="lazy" src="${thumb}" alt="YouTube thumbnail">
                    <div class="yt-play" aria-hidden="true">▶</div>
                    <div class="yt-label">${useShorts ? 'Short' : 'Video'}</div>
                `;
            });


            grid.appendChild(item);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildGrid);
    } else {
        buildGrid();
    }
})();

