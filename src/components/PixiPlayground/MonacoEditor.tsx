import { useCallback, useEffect, useRef } from 'react';

import { useColorMode } from '@docusaurus/theme-common';
import Editor, { loader } from '@monaco-editor/react';

import type { editor } from 'monaco-editor';
const ROOT_DIR = 'inmemory://model/';

export type CodeChangeCallbackType = (code: string | undefined) => void;

type MonacoEditorProps = {
    code: string;
    onChange: CodeChangeCallbackType;
};

loader.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs' } });

export default function MonacoEditor({ code, onChange }: MonacoEditorProps)
{
    const editorRef = useRef(null);

    const handleEditorDidMount = useCallback((editor: any) =>
    {
        editorRef.current = editor;
    }, []);

    useEffect(() =>
    {
        const resetEditorLayout = (): void =>
        {
            if (editorRef.current !== null) (editorRef.current as any).layout({});
        };

        window.addEventListener('resize', resetEditorLayout);

        return () =>
        {
            window.removeEventListener('resize', resetEditorLayout);
        };
    }, []);

    const options: editor.IStandaloneEditorConstructionOptions = {
        lineNumbers: 'off',
        padding: {
            top: 24,
        },
        minimap: {
            enabled: false,
        },
        fontSize: 14,
        scrollBeyondLastLine: false,
        scrollbar: {
            alwaysConsumeMouseWheel: false,
        },
    };

    const { colorMode } = useColorMode();

    return (
        <Editor
            defaultLanguage="javascript"
            value={code}
            defaultPath={`${ROOT_DIR}/src/index.ts`}
            onChange={onChange}
            options={options}
            onMount={handleEditorDidMount}
            theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
        />
    );
}
