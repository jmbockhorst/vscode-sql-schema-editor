import * as vscode from "vscode";
import path = require("path");
import { Database } from "./schema";
import { Parser } from 'sql-ddl-to-json-schema';


export default class SqlCustomEditorProvider implements vscode.CustomTextEditorProvider {

    constructor(private _extensionPath: string) { }


    resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): void | Thenable<void> {
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(this._extensionPath, "build"))]
        };

        const database = this.parseSqlSchema(document);

        webviewPanel.webview.html = this.getWebviewHtml(webviewPanel.webview, database);
    }

    private getWebviewHtml(webview: vscode.Webview, database: Database) {
        const reactAppPathOnDisk = vscode.Uri.file(
            path.join(this._extensionPath, "build", "schemaEditor.js")
        );
        const reactAppUri = webview.asWebviewUri(reactAppPathOnDisk);

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <meta http-equiv="Content-Security-Policy"
                    content="default-src 'none';
                            img-src https:;
                            script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                            style-src vscode-resource: 'unsafe-inline';">

                <script>
                    window.acquireVsCodeApi = acquireVsCodeApi;
                    window.database = ${JSON.stringify(database)};
                </script>

				<title>Sql Scheme Editor</title>
			</head>
			<body>
				<div id="root"></div>
				
                <script src="${reactAppUri}"></script>
			</body>
			</html>`;
    }

    private parseSqlSchema(schema: vscode.TextDocument): Database {
        const parser = new Parser('mysql');

        const jsonSchema = parser.feed(schema.getText())
            .toCompactJson();

        return { name: '', tables: jsonSchema };
    }
}