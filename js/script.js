// Basic JavaScript for interactivity
// Add any interactive features here

window.addEventListener('load', function() {
    console.log('Portfolio loaded successfully!');
    initRaceGame();
    initProjectGallery();
});

function initRaceGame() {
    const canvas = document.getElementById('raceCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const scoreText = document.getElementById('scoreText');
    const speedText = document.getElementById('speedText');
    const gameMessage = document.getElementById('gameMessage');
    const restartButton = document.getElementById('restartButton');

    const width = canvas.width;
    const height = canvas.height;
    const road = { x: width * 0.15, y: 0, width: width * 0.7, height: height };
    const laneCount = 3;
    const laneWidth = road.width / laneCount;

    const player = {
        width: laneWidth * 0.6,
        height: 90,
        x: road.x + laneWidth * 1.2,
        y: height - 140,
        color: '#ffdd59',
        speed: 6,
        dx: 0,
    };

    let obstacles = [];
    let frames = 0;
    let score = 0;
    let speed = 5;
    let running = true;

    function resetRace() {
        obstacles = [];
        frames = 0;
        score = 0;
        speed = 5;
        running = true;
        player.x = road.x + laneWidth * 1.2;
        player.dx = 0;
        gameMessage.textContent = '';
        updateText();
        requestAnimationFrame(update);
    }

    function updateText() {
        if (scoreText) scoreText.textContent = `Score: ${score}`;
        if (speedText) speedText.textContent = `Speed: ${speed}`;
    }

    function drawRoad() {
        ctx.fillStyle = '#111b2e';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#202f5d';
        ctx.fillRect(road.x, road.y, road.width, road.height);

        ctx.strokeStyle = '#3a5cb1';
        ctx.lineWidth = 2;
        ctx.strokeRect(road.x, road.y, road.width, road.height);

        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 4;
        ctx.setLineDash([20, 20]);
        for (let i = 1; i < laneCount; i++) {
            const x = road.x + laneWidth * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }

    function drawPlayer() {
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.roundRect(player.x, player.y, player.width, player.height, 18);
        ctx.fill();

        ctx.fillStyle = '#1d2231';
        ctx.fillRect(player.x + player.width * 0.15, player.y + 18, player.width * 0.7, 16);
        ctx.fillRect(player.x + 14, player.y + 40, player.width - 28, 16);
    }

    function createObstacle() {
        const lane = Math.floor(Math.random() * laneCount);
        const obstacleWidth = laneWidth * 0.55;
        const obstacleHeight = 50;
        const x = road.x + lane * laneWidth + (laneWidth - obstacleWidth) / 2;
        obstacles.push({ x, y: -obstacleHeight, width: obstacleWidth, height: obstacleHeight, color: '#ff5a5a' });
    }

    function drawObstacles() {
        obstacles.forEach(obstacle => {
            ctx.fillStyle = obstacle.color;
            ctx.beginPath();
            ctx.roundRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 12);
            ctx.fill();

            ctx.fillStyle = '#ffd5d5';
            ctx.fillRect(obstacle.x + obstacle.width * 0.2, obstacle.y + 12, obstacle.width * 0.6, 8);
        });
    }

    function moveObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.y += speed;
        });
        obstacles = obstacles.filter(obstacle => obstacle.y < height + obstacle.height);
    }

    function checkCollision() {
        return obstacles.some(obstacle => {
            return (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            );
        });
    }

    function updatePlayer() {
        player.x += player.dx * player.speed;
        const minX = road.x + 8;
        const maxX = road.x + road.width - player.width - 8;
        if (player.x < minX) player.x = minX;
        if (player.x > maxX) player.x = maxX;
    }

    function update() {
        if (!running) return;
        frames += 1;
        if (frames % 60 === 0) {
            score += 10;
            speed = Math.min(12, 5 + Math.floor(score / 100));
            updateText();
        }
        if (frames % 80 === 0) {
            createObstacle();
        }

        ctx.clearRect(0, 0, width, height);
        drawRoad();
        updatePlayer();
        moveObstacles();
        drawPlayer();
        drawObstacles();

        if (checkCollision()) {
            running = false;
            gameMessage.textContent = 'Crash! Press Restart to try again.';
            return;
        }
        requestAnimationFrame(update);
    }

    document.addEventListener('keydown', function(event) {
        if (!running) return;
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            player.dx = -1;
        }
        if (event.key === 'ArrowRight' || event.key === 'd') {
            player.dx = 1;
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'a' || event.key === 'd') {
            player.dx = 0;
        }
    });

    restartButton.addEventListener('click', function() {
        resetRace();
    });

    resetRace();
}
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
