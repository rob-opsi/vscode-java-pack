import * as vscode from 'vscode';

import { instrumentCommand } from "./command";
import { overviewCmdHandler, createMavenProjectCmdHanlder, createSpringBootProjectCmdHandler, showExtensionCmdHandler, showOverviewPageOnActivation } from './overview';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('java.overview', instrumentCommand(context, overviewCmdHandler)));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.createMavenProject', instrumentCommand(context, createMavenProjectCmdHanlder)));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.createSpringBootProject', instrumentCommand(context, createSpringBootProjectCmdHandler)));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.showExtension', instrumentCommand(context, showExtensionCmdHandler)));

  showOverviewPageOnActivation(context);
}

export function deactivate() {
}
