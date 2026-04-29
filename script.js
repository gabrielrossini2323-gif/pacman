const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;
const size = 20;

// Configuração do Jogador
let player = { x: 200, y: 200, dx: 0, dy: 0 };

// Configuração da Pastilha
let food = { x: 100, y: 100 };

// Configuração do "Fantasma" (Inimigo)
let ghost = { x: 40, y: 40, speed: 1.5 };

function draw() {
    // Limpa a tela
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha Jogador
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.x, player.y, size, size);

    // Desenha Pastilha
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(food.x + size/2, food.y + size/2, 5, 0, Math.PI * 2);
    ctx.fill();

    // Desenha Fantasma
    ctx.fillStyle = "red";
    ctx.fillRect(ghost.x, ghost.y, size, size);

    update();
    requestAnimationFrame(draw);
}

function update() {
    // Movimentação do jogador
    player.x += player.dx;
    player.y += player.dy;

    // Colisão com as bordas (atravessa a tela igual ao original)
    if (player.x < 0) player.x = canvas.width;
    if (player.x > canvas.width) player.x = 0;
    if (player.y < 0) player.y = canvas.height;
    if (player.y > canvas.height) player.y = 0;

    // IA básica do Fantasma (persegue o jogador)
    if (ghost.x < player.x) ghost.x += ghost.speed;
    else ghost.x -= ghost.speed;
    if (ghost.y < player.y) ghost.y += ghost.speed;
    else ghost.y -= ghost.speed;

    // Colisão com a pastilha
    if (Math.abs(player.x - food.x) < size && Math.abs(player.y - food.y) < size) {
        score += 10;
        scoreElement.innerText = score;
        food.x = Math.floor(Math.random() * (canvas.width - size));
        food.y = Math.floor(Math.random() * (canvas.height - size));
    }

    // Colisão com o fantasma (Game Over)
    if (Math.abs(player.x - ghost.x) < size && Math.abs(player.y - ghost.y) < size) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }
}

// Controles
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") { player.dx = 0; player.dy = -2; }
    if (e.key === "ArrowDown") { player.dx = 0; player.dy = 2; }
    if (e.key === "ArrowLeft") { player.dx = -2; player.dy = 0; }
    if (e.key === "ArrowRight") { player.dx = 2; player.dy = 0; }
});

draw();