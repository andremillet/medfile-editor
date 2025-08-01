

function parseMedFile(text) {
    const lines = text.split('\n');
    let html = '';
    const tagMap = {
        '!HPP': 'História da Doença Atual',
        '!MED': 'Medicações em Uso',
        '!HF': 'História Familiar',
        '!RX': 'Exames de Imagem',
        '!!': 'Alergias'
    };

    for (const line of lines) {
        // Seções: [ANAMNESE]
        if (line.startsWith('[') && line.endsWith(']')) {
            html += `<h2>${line.substring(1, line.length - 1)}</h2>`;
        
        // Tags de Anamnese: !HPP, !MED, etc.
        } else if (line.trim().startsWith('!')) {
            const match = line.match(/^(![A-Z]+) (.*)/);
            if (match) {
                const tag = match[1];
                const content = match[2];
                const tagName = tagMap[tag] || tag;
                
                const items = content.split(';').map(item => item.trim()).filter(item => item);
                const tagsHtml = items.map(item => `<span class="medical-tag">${item}</span>`).join(' ');

                html += `<div class="anamnesis-item">
                           <span class="anamnesis-tag">${tagName}:</span>
                           <div class="anamnesis-content">${tagsHtml}</div>
                         </div>`;
            } else {
                 html += `<p>${line}</p>`; // Linhas que não se encaixam no padrão
            }

        // Exames: @NOME_EXAME[DATA]:
        } else if (line.startsWith('@')) {
            html += `<h4>${line}</h4>`;
        
        // Conduta: + e -
        } else if (line.startsWith('+')) {
            html += `<p style="color: #4CAF50;">${line}</p>`;
        } else if (line.startsWith('-')) {
            html += `<p style="color: #F44336;">${line}</p>`;
        
        // Outras tags de conduta
        } else if (line.startsWith('>>') || line.startsWith('!DESMAME')) {
            html += `<h4>${line}</h4>`;
        
        // Linhas normais
        } else if (line.trim() !== '') {
            html += `<p>${line}</p>`;
        }
    }

    return html;
}
