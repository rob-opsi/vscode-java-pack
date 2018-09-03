'use strict';
import * as vscode from 'vscode';
import welcomeCmdHandler from './welcome';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('java.welcome', welcomeCmdHandler, context));

  vscode.commands.executeCommand('java.welcome');
}

export function deactivate() {
}
