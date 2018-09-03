import * as vscode from 'vscode';

import { readFile as fsReadFile } from 'fs';
import * as util from 'util';
import * as path from 'path';

const readFile = util.promisify(fsReadFile);

let welcomeView: vscode.WebviewPanel | undefined;

export default async function (this: vscode.ExtensionContext) {
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
  let buffer = await readFile(require.resolve('./assets/index.html'));
  welcomeView.webview.html = buffer.toString();

  welcomeView.onDidDispose(() => {
    welcomeView = undefined;
  });
}
