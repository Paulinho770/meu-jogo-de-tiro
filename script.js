const game = document.getElementById('game');
const player = document.getElementById('player');

let bullets = [];
let enemies = [];
let playerX = window.innerWidth / 2 - 25;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 20;
  }
  if (e.key === 'ArrowRight' && playerX < window.innerWidth - 50) {
    playerX += 20;
  }
  if (e.key === ' ') {
    shoot();
  }
  player.style.left = `${playerX}px`;
});

function shoot() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = `${playerX + 22}px`;
  bullet.style.bottom = `70px`;
  game.appendChild(bullet);
  bullets.push(bullet);
}

function spawnEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
  enemy.style.top = `0px`;
  game.appendChild(enemy);
  enemies.push(enemy);
}

function updateGame() {
  // Atualiza balas
  bullets.forEach((bullet, i) => {
    let bottom = parseInt(bullet.style.bottom);
    if (bottom > window.innerHeight) {
      bullet.remove();
      bullets.splice(i, 1);
    } else {
      bullet.style.bottom = `${bottom + 10}px`;
    }
  });

  // Atualiza inimigos
  enemies.forEach((enemy, i) => {
    let top = parseInt(enemy.style.top);
    if (top > window.innerHeight) {
      enemy.remove();
      enemies.splice(i, 1);
    } else {
      enemy.style.top = `${top + 2}px`;
    }

    // Checar colisão com balas
    bullets.forEach((bullet, j) => {
      const bRect = bullet.getBoundingClientRect();
      const eRect = enemy.getBoundingClientRect();
      if (
        bRect.top < eRect.bottom &&
        bRect.bottom > eRect.top &&
        bRect.left < eRect.right &&
        bRect.right > eRect.left
      ) {
        enemy.remove();
        bullet.remove();
        enemies.splice(i, 1);
        bullets.splice(j, 1);
      }
    });
  });

  requestAnimationFrame(updateGame);
}

setInterval(spawnEnemy, 1500);
updateGame();
