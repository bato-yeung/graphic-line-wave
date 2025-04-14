window.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Wave properties
    const waves = [];
    const waveCount = 4; // Number of waves

    for (let i = 0; i < waveCount; i++) {
        waves.push({
            frequency: 0.002 + Math.random() * 0.002, // Random frequency between 0.0015 and 0.004
            speed: 0.001 + Math.random() * 0.001, // Random speed between 0.001 and 0.003
            offset: Math.random() * Math.PI * 2, // Random initial offset
            hue: Math.random() * 360 // Random initial hue for each wave
        });
    }

    const resizeCanvas = () => {
        console.log('resizeCanvas executed'); // Debug log
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Adjust wave amplitude and frequency based on canvas size
        waves.forEach(wave => {
            wave.amplitude = canvas.height * 0.1 + Math.random() * (canvas.height * 0.1); // Amplitude is 10-20% of canvas height
            wave.frequency = 0.001 + (0.002 / canvas.width) * 1000; // Frequency inversely proportional to canvas width
        });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Ensure resizeCanvas is called on load

    // Add mouse interaction
    let hueShift = 0; // Hue shift based on mouse Y position

    canvas.addEventListener('mousemove', (event) => {
        const mouseY = event.clientY;
        hueShift = Math.floor((mouseY / canvas.height) * 360); // Map mouse Y position to hue shift
    });

    // Draw a single wave
    const drawWave = (wave) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + Math.sin(wave.offset + x * wave.frequency) * wave.amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = `hsl(${(wave.hue + hueShift) % 360}, 100%, 50%)`; // Adjust hue based on mouse position
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    };

    // Rendering loop
    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        waves.forEach((wave) => {
            drawWave(wave);
            wave.offset += wave.speed; // Update wave offset for animation
        });

        requestAnimationFrame(render);
    };

    render();
};
