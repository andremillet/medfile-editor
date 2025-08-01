function parseMedFile(text) {
    const lines = text.split('\n');
    let html = '';

    for (const line of lines) {
        if (line.startsWith('[')) {
            html += `<h2>${line.substring(1, line.length - 1)}</h2>`;
        } else if (line.startsWith('!')) {
            html += `<h4>${line}</h4>`;
        } else if (line.startsWith('@')) {
            html += `<h4>${line}</h4>`;
        } else if (line.startsWith('+')) {
            html += `<p style="color: green;">${line}</p>`;
        } else if (line.startsWith('-')) {
            html += `<p style="color: red;">${line}</p>`;
        } else if (line.startsWith('>>') || line.startsWith('!DESMAME')) {
            html += `<h4>${line}</h4>`;
        } else {
            html += `<p>${line}</p>`;
        }
    }

    return html;
}