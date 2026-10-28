
(() => {
  const input = document.getElementById('fileInput');
  const dropzone = document.getElementById('dropzone');
  const previewWrap = document.getElementById('previewWrap');
  const previewImage = document.getElementById('previewImage');
  const fileName = document.getElementById('fileName');
  const removeImage = document.getElementById('removeImage');
  const widthRange = document.getElementById('widthRange');
  const widthValue = document.getElementById('widthValue');
  const convertBtn = document.getElementById('convertBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const asciiOutput = document.getElementById('asciiOutput');
  const placeholder = document.getElementById('placeholder');
  const loading = document.getElementById('loading');
  const outputArea = document.getElementById('outputArea');
  const status = document.getElementById('status');
  const statusText = document.getElementById('statusText');

  const chars = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\\\|()1{}[]?-_+~<>i! lI;:,';

  let image = null;
  let currentUrl = null;
  let ansiResult = '';
  let outputHtml = '';

  widthRange.addEventListener('input', () => {
    widthValue.textContent = `${widthRange.value} caracteres`;
  });

  function setStatus(text, ready = false) {
    statusText.textContent = text;
    status.classList.toggle('ready', ready);
  }

  function resetOutput() {
    asciiOutput.style.display = 'none';
    asciiOutput.innerHTML = '';
    placeholder.style.display = 'flex';
    copyBtn.disabled = true;
    downloadBtn.disabled = true;
    ansiResult = '';
    outputHtml = '';
  }

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setStatus('Selecione um arquivo de imagem');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      currentUrl = url;
      image = img;

      previewImage.src = url;
      fileName.textContent =
        `${file.name} · ${img.naturalWidth} × ${img.naturalHeight}px`;

      dropzone.classList.add('hidden');
      previewWrap.classList.add('visible');

      convertBtn.disabled = false;
      resetOutput();
      setStatus('Imagem pronta para conversão', true);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setStatus('Não foi possível abrir essa imagem');
    };

    img.src = url;
  }

  input.addEventListener('change', event => {
    loadFile(event.target.files[0]);
  });

  removeImage.addEventListener('click', () => {
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }

    currentUrl = null;
    image = null;
    input.value = '';
    previewImage.removeAttribute('src');

    previewWrap.classList.remove('visible');
    dropzone.classList.remove('hidden');

    convertBtn.disabled = true;
    resetOutput();
    setStatus('Aguardando imagem');
  });

  ['dragenter', 'dragover'].forEach(type => {
    dropzone.addEventListener(type, event => {
      event.preventDefault();
      dropzone.classList.add('dragging');
    });
  });

  ['dragleave', 'drop'].forEach(type => {
    dropzone.addEventListener(type, event => {
      event.preventDefault();
      dropzone.classList.remove('dragging');
    });
  });

  dropzone.addEventListener('drop', event => {
    loadFile(event.dataTransfer.files[0]);
  });

  function escapeHtml(value) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  function fitAscii(width, height) {
    const style = getComputedStyle(outputArea);

    const availableWidth =
      outputArea.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight) - 8;

    const availableHeight =
      outputArea.clientHeight -
      parseFloat(style.paddingTop) -
      parseFloat(style.paddingBottom) - 8;

    // Aproximação da largura de um caractere monoespaçado.
    const fontByWidth = availableWidth / (width * 0.61);
    const fontByHeight = availableHeight / height;

    // Limites para manter o texto legível sem exceder a área.
    const fontSize = Math.max(
      3,
      Math.min(18, fontByWidth, fontByHeight)
    );

    asciiOutput.style.fontSize = `${fontSize}px`;
  }

  async function convertImage() {
    if (!image) return;

    convertBtn.disabled = true;
    loading.classList.add('visible');
    placeholder.style.display = 'none';
    asciiOutput.style.display = 'none';
    setStatus('Processando imagem...');

    // Permite que o navegador renderize o indicador de carregamento.
    await new Promise(resolve => setTimeout(resolve, 60));

    try {
      const width = Number(widthRange.value);
      const ratio = image.naturalHeight / image.naturalWidth;
      const height = Math.max(1, Math.floor(width * ratio * 0.5));

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', {
        willReadFrequently: true
      });

      ctx.drawImage(image, 0, 0, width, height);

      const pixels = ctx.getImageData(
        0, 0, width, height
      ).data;

      let html = '';
      let ansi = '';

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          const brightness = (r + g + b) / 3;

          const index = Math.min(
            chars.length - 1,
            Math.floor(chars.length * brightness / 256)
          );

          const character = chars[index];

          html += `<span style="color:rgb(${r},${g},${b})">${escapeHtml(character)}</span>`;
          ansi += `\x1b[38;2;${r};${g};${b}m${character}\x1b[0m`;
        }

        html += '\n';
        ansi += '\n';
      }

      outputHtml = html;
      ansiResult = ansi;

      asciiOutput.innerHTML = html;
      asciiOutput.style.display = 'block';

      // Centraliza e dimensiona a arte conforme a área disponível.
      fitAscii(width, height);

      copyBtn.disabled = false;
      downloadBtn.disabled = false;

      setStatus(
        `Conversão concluída · ${width} × ${height} caracteres`,
        true
      );

    } catch (error) {
      placeholder.style.display = 'flex';
      setStatus('Erro ao processar a imagem');
      console.error(error);

    } finally {
      loading.classList.remove('visible');
      convertBtn.disabled = false;
    }
  }

  convertBtn.addEventListener('click', convertImage);

  // Recalcula o tamanho se a janela for redimensionada.
  window.addEventListener('resize', () => {
    if (asciiOutput.style.display !== 'block') return;

    const width = Number(widthRange.value);
    const ratio = image.naturalHeight / image.naturalWidth;
    const height = Math.max(1, Math.floor(width * ratio * 0.5));

    fitAscii(width, height);
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(ansiResult);
    } catch {
      const area = document.createElement('textarea');
      area.value = ansiResult;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }

    copyBtn.textContent = 'Copiado!';

    setTimeout(() => {
      copyBtn.textContent = 'Copiar ANSI';
    }, 1400);
  });

  downloadBtn.addEventListener('click', () => {
    const documentHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Arte ASCII colorida</title>
</head>
<body style="background:#1F1F35;margin:0;padding:24px">
<pre style="font:${asciiOutput.style.fontSize} monospace;line-height:1;white-space:pre">${outputHtml}</pre>
</body>
</html>`;

    const blob = new Blob(
      [documentHtml],
      { type: 'text/html;charset=utf-8' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'ascii-art-colorida.html';
    link.click();

    URL.revokeObjectURL(url);
  });
})();
