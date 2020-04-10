import * as vscode from 'vscode';
import SqlCustomEditorProvider from './SqlCustomEditorProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.window.registerCustomEditorProvider('sqlSchemaEditor', new SqlCustomEditorProvider(context.extensionPath)));
}

export function deactivate() { }
