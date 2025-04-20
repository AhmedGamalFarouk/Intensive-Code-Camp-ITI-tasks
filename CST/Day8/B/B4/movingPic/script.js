const originalPositions = {
    icon1: { left: '20px', top: '50%', transform: 'translateY(-50%)', right: 'auto', bottom: 'auto' },
    icon2: { right: '20px', top: '50%', transform: 'translateY(-50%)', left: 'auto', bottom: 'auto' },
    icon3: { bottom: '20px', left: '50%', transform: 'translateX(-50%)', right: 'auto', top: 'auto' }
};

const icon1 = document.getElementById('icon1');
const icon2 = document.getElementById('icon2');
const icon3 = document.getElementById('icon3');
const moveBtn = document.getElementById('moveBtn');
const resetBtn = document.getElementById('resetBtn');

let isMoving = false;
let animationInterval;

let icon1MovingRight = true;
let icon2MovingLeft = true;
let icon3MovingUp = true;

function moveIcons() {
    if (isMoving) {
        clearInterval(animationInterval);
        isMoving = false;
        moveBtn.textContent = 'Move';
        return;
    }

    isMoving = true;
    moveBtn.textContent = 'Stop';

    animationInterval = setInterval(() => {
        const icon1Rect = icon1.getBoundingClientRect();
        const containerRect = icon1.parentElement.getBoundingClientRect();

        if (icon1MovingRight) {
            icon1.style.left = (icon1Rect.left - containerRect.left + 30) + 'px';
            if (icon1Rect.right >= containerRect.right - 20) {
                icon1MovingRight = false;
            }
        } else {
            icon1.style.left = (icon1Rect.left - containerRect.left - 30) + 'px';
            if (icon1Rect.left <= containerRect.left + 20) {
                icon1MovingRight = true;
            }
        }

        const icon2Rect = icon2.getBoundingClientRect();

        if (icon2MovingLeft) {
            icon2.style.right = (containerRect.right - icon2Rect.right + 30) + 'px';
            if (icon2Rect.left <= containerRect.left + 20) {
                icon2MovingLeft = false;
            }
        } else {
            icon2.style.right = (containerRect.right - icon2Rect.right - 30) + 'px';
            if (icon2Rect.right >= containerRect.right - 20) {
                icon2MovingLeft = true;
            }
        }

        const icon3Rect = icon3.getBoundingClientRect();

        if (icon3MovingUp) {
            icon3.style.bottom = (containerRect.bottom - icon3Rect.bottom + 30) + 'px';
            if (icon3Rect.top <= containerRect.top + 20) {
                icon3MovingUp = false;
            }
        } else {
            icon3.style.bottom = (containerRect.bottom - icon3Rect.bottom - 30) + 'px';
            if (icon3Rect.bottom >= containerRect.bottom - 20) {
                icon3MovingUp = true;
            }
        }
    }, 30);
}

function resetIcons() {
    if (isMoving) {
        clearInterval(animationInterval);
        isMoving = false;
        moveBtn.textContent = 'Move';
    }

    Object.entries(originalPositions).forEach(([id, styles]) => {
        const element = document.getElementById(id);
        Object.entries(styles).forEach(([prop, value]) => {
            element.style[prop] = value;
        });
    });
}

moveBtn.addEventListener('click', moveIcons);
resetBtn.addEventListener('click', resetIcons);