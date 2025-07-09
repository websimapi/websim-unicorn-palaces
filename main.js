const svg = document.getElementById('palace-svg');
const SVG_WIDTH = svg.width.baseVal.value;
const SVG_HEIGHT = svg.height.baseVal.value;
const groundY = SVG_HEIGHT * 0.9;

const colors = ['#ffadea', '#ffd6f5', '#d4a2f8', '#a2f8e1', '#ffffff'];
const roofColors = ['#c77dd4', '#8462d1', '#f8b9d4'];

function createSvgElement(tag, attributes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createTower(x, width, minHeight, maxHeight) {
    const height = random(minHeight, maxHeight);
    const y = groundY - height;
    const towerColor = choice(colors);

    // Tower body
    const body = createSvgElement('rect', {
        x: x - width / 2,
        y: y,
        width: width,
        height: height,
        fill: towerColor,
        stroke: '#fff',
        'stroke-width': 2,
    });
    svg.appendChild(body);

    // Roof
    const roofHeight = random(width * 0.8, width * 2.5);
    const roofColor = choice(roofColors);
    const roof = createSvgElement('polygon', {
        points: `${x - width / 2 - 5},${y} ${x + width / 2 + 5},${y} ${x},${y - roofHeight}`,
        fill: roofColor,
        stroke: '#fff',
        'stroke-width': 2,
    });
    svg.appendChild(roof);
    
    // Windows
    const numWindows = Math.floor(random(1, height / 30));
    for (let i = 0; i < numWindows; i++) {
        const windowSize = random(width * 0.1, width * 0.25);
        const windowX = x - width / 2 + random(windowSize, width - windowSize * 2);
        const windowY = y + random(windowSize, height - windowSize * 2);
        const window = createSvgElement('rect', {
            x: windowX,
            y: windowY,
            width: windowSize,
            height: windowSize * random(1.2, 1.8),
            fill: '#fff0a5',
            rx: 2,
            ry: 2
        });
        svg.appendChild(window);
    }
    
    // Flag on top
    if (Math.random() > 0.3) {
        const flagPole = createSvgElement('line', {
            x1: x,
            y1: y - roofHeight,
            x2: x,
            y2: y - roofHeight - 20,
            stroke: 'white',
            'stroke-width': 2
        });
        svg.appendChild(flagPole);
        
        const flag = createSvgElement('polygon', {
            points: `${x},${y - roofHeight - 20} ${x + 15},${y - roofHeight - 15} ${x},${y - roofHeight - 10}`,
            fill: choice(colors.filter(c => c !== '#ffffff')),
        });
        svg.appendChild(flag);
    }
}

function generatePalace() {
    svg.innerHTML = '';
    
    // Add a ground line
    const ground = createSvgElement('line', {
        x1: 0,
        y1: groundY,
        x2: SVG_WIDTH,
        y2: groundY,
        stroke: 'rgba(255, 255, 255, 0.7)',
        'stroke-width': 3
    });
    svg.appendChild(ground);

    // Main central tower
    const mainTowerWidth = random(80, 120);
    createTower(SVG_WIDTH / 2, mainTowerWidth, SVG_HEIGHT * 0.4, SVG_HEIGHT * 0.6);

    // Side towers
    const numSideTowers = Math.floor(random(1, 4));
    for (let i = 0; i < numSideTowers; i++) {
        const sideTowerWidth = random(40, 70);
        const spacing = (i % 2 === 0 ? -1 : 1) * Math.ceil((i+1)/2) * random(100,150)
        const sideTowerX = (SVG_WIDTH / 2) + spacing;
        if(sideTowerX > sideTowerWidth/2 && sideTowerX < SVG_WIDTH-sideTowerWidth/2) {
          createTower(sideTowerX, sideTowerWidth, SVG_HEIGHT * 0.2, SVG_HEIGHT * 0.4);
        }
    }
}

document.body.addEventListener('click', generatePalace);

// Initial palace
generatePalace();

