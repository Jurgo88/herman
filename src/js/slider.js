function initSlider(container) {
    const overlay = container.querySelector('.slider-overlay');
    const handle = container.querySelector('.slider-handle');

    function updateSlider(x) {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      const percent = (offsetX / rect.width) * 100;
      overlay.style.width = `${percent}%`;
      handle.style.left = `${percent}%`;
    }

    // Mouse events
    container.addEventListener('mousedown', (e) => updateSlider(e.clientX));
    container.addEventListener('mousemove', (e) => {
      if (e.buttons !== 1) return;
      updateSlider(e.clientX);
    });

    // Touch events
    container.addEventListener('touchstart', (e) => updateSlider(e.touches[0].clientX));
    container.addEventListener('touchmove', (e) => updateSlider(e.touches[0].clientX));
  }

  // Inicializuj všetky slidery na stránke
  document.querySelectorAll('.slider-container').forEach(initSlider);