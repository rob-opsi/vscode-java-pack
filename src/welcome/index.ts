import * as vscode from 'vscode';

import { readFile } from 'fs';
import * as path from 'path';

let welcomeView: vscode.WebviewPanel | undefined;

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

  readFile(require.resolve('./assets/index.html'), (err, data) => {
    welcomeView.webview.html = data.toString();
  });

  welcomeView.onDidDispose(() => {
    welcomeView = undefined;
  });
};
