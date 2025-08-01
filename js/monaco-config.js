require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    monaco.languages.register({ id: 'medfile' });

    monaco.languages.setMonarchTokensProvider('medfile', {
        tokenizer: {
            root: [
                [/^\[(ANAMNESE|EXAME FISICO|DIAGNOSTICO|CONDUTA)\]$/, 'keyword'],
                [/^!HPP|^!MED|^!HF|^!RX|^!!/, 'tag'],
                [/^@.+?\[.+\]:/, 'annotation'],
                [/^[\+\-].+/, 'diff'],
                [/^>>|!DESMAME/, 'special'],
                [/\[.*\]/, 'comment']
            ]
        }
    });

    window.editor = monaco.editor.create(document.getElementById('editor-container'), {
        language: 'medfile',
        theme: 'vs-dark'
    });
});