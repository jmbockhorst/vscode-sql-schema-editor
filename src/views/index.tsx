import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SchemaEditor } from './SchemaEditor';
import { Database } from '../schema';

declare global {
    interface Window {
        acquireVsCodeApi(): any;
        database: Database;
    }
}

const vscode = window.acquireVsCodeApi();

ReactDOM.render(
    <SchemaEditor database={window.database} />,
    document.getElementById('root')
);