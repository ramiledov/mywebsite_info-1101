// Project gallery/slideshow module
function initProjectGallery() {
    const galleries = document.querySelectorAll('.project-gallery');
    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.slide');
        const prevButton = gallery.querySelector('.gallery-arrow.prev');
        const nextButton = gallery.querySelector('.gallery-arrow.next');
        let currentIndex = 0;

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }

        prevButton?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        });

        nextButton?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        });

        updateSlides();
    });
}

export { initProjectGallery };
