window.onload = function () {
    const canvas = document.querySelector('.canvasScreen');
    const ctx = canvas.getContext('2d');
    const textColorPicker = document.querySelector('.textColorPicker input');
    const backgroundColorPicker = document.querySelector('.backgound input');
    const fontSizeInput = document.querySelector('.font_size input');
    const clearButton = document.querySelector('.bg-red-500');
    const saveButton = document.querySelector('.bg-green-500');

    // Set initial canvas size and background color
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;
    let currentColor = textColorPicker.value;
    let currentFontSize = parseInt(fontSizeInput.value, 10) || 16;

    // Update color, background, and font size
    textColorPicker.addEventListener('input', function () {
        currentColor = this.value;
    });

    backgroundColorPicker.addEventListener('input', function () {
        ctx.fillStyle = this.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    fontSizeInput.addEventListener('input', function () {
        currentFontSize = parseInt(this.value, 10) || 16;
    });

    // Drawing functions
    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function endDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!drawing) return;

        ctx.lineWidth = currentFontSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', endDrawing);
    canvas.addEventListener('touchmove', draw);

    // Clear canvas
    clearButton.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Save and download the canvas as an image
    saveButton.addEventListener('click', function () {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas-drawing.png';
        link.click();
    });    
};
