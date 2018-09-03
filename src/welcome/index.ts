import * as vscode from 'vscode';

import { readFile } from 'fs';
import * as path from 'path';

let welcomeView: vscode.WebviewPanel | undefined;
let viewBody: string;

readFile(require.resolve('./assets/index.html'), (err, data) => {
  viewBody = data.toString();
});

export default function (this: vscode.ExtensionContext) {
  if (welcomeView) {
    welcomeView.reveal();
    return;
  }

  welcomeView = vscode.window.createWebviewPanel(
    'java.welcome',
    'Java: Welcome',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      enableCommandUris: true
    }
  );

  welcomeView.iconPath = vscode.Uri.file(path.join(this.extensionPath, 'logo.png'));
  welcomeView.webview.html = viewBody;

  welcomeView.onDidDispose(() => {
    welcomeView = undefined;
  });
};
