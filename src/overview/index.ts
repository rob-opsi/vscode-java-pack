import * as vscode from 'vscode';

import { readFile as fsReadFile } from 'fs';
import * as util from 'util';
import * as path from 'path';

const readFile = util.promisify(fsReadFile);

let overviewView: vscode.WebviewPanel | undefined;

export default async function (this: vscode.ExtensionContext) {
  if (overviewView) {
    overviewView.reveal();
    return;
  }

  overviewView = vscode.window.createWebviewPanel(
    'java.overview',
    'Java Overview',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      enableCommandUris: true,
      retainContextWhenHidden: true
    }
  );

  overviewView.iconPath = vscode.Uri.file(path.join(this.extensionPath, 'logo.png'));
  let buffer = await readFile(require.resolve('./assets/index.html'));
  overviewView.webview.html = buffer.toString();

  overviewView.onDidDispose(() => {
    overviewView = undefined;
  });

  const installedExtensions = vscode.extensions.all.map(ext => ext.id.toLowerCase());
  overviewView.webview.postMessage({
    command: 'hideInstalledExtensions',
    installedExtensions: installedExtensions
  });

  overviewView.webview.postMessage({
    command: 'setOverviewVisibility',
    visibility: this.globalState.get('showWhenUsingJava')
  });

  overviewView.webview.onDidReceiveMessage((e) => {
    if (e.command === 'setOverviewVisibility') {
      this.globalState.update('showWhenUsingJava', e.visibility);
    }
  });
}
