// Main initialization module
import { initRaceGame } from './modules/game.js';
import { initProjectGallery } from './modules/gallery.js';

window.addEventListener('load', function() {
    console.log('Portfolio loaded successfully!');
    initRaceGame();
    initProjectGallery();
});
