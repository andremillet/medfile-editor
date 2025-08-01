window.addEventListener('load', () => {
    const editorContainer = document.getElementById('editor-container');
    const previewContainer = document.getElementById('preview-container');

    const newFileButton = document.getElementById('new-file');
    const openFileButton = document.getElementById('open-file');
    const saveFileButton = document.getElementById('save-file');
    const printPdfButton = document.getElementById('print-pdf');

    // Wait for the editor to be initialized
    const checkEditorInterval = setInterval(() => {
        if (window.editor) {
            clearInterval(checkEditorInterval);
            const editor = window.editor;

            editor.onDidChangeModelContent(() => {
                const content = editor.getValue();
                previewContainer.innerHTML = parseMedFile(content);
            });

            newFileButton.addEventListener('click', () => {
                editor.setValue('');
            });

            openFileButton.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.med';
                input.onchange = (event) => {
                    const file = event.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        editor.setValue(e.target.result);
                    };
                    reader.readAsText(file);
                };
                input.click();
            });

            saveFileButton.addEventListener('click', () => {
                const content = editor.getValue();
                const blob = new Blob([content], { type: 'text/plain' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'arquivo.med';
                a.click();
            });

            printPdfButton.addEventListener('click', () => {
                window.print();
            });
        }
    }, 100);
});