import * as vscode from 'vscode';
import { initialize, instrumentOperation } from 'vscode-extension-telemetry-wrapper';

import { instrumentCommand } from './command';
import { overviewCmdHandler, createMavenProjectCmdHanlder, createSpringBootProjectCmdHandler, showExtensionCmdHandler, showOverviewPageOnActivation } from './overview';

export async function activate(context: vscode.ExtensionContext) {
  initializeTelemetry(context);

  const activationOperation = instrumentOperation('activation', initializeExtension);
  await activationOperation(context);
}

async function initializeExtension(operationId: string, context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('java.overview', instrumentCommand(context, 'java.overview', overviewCmdHandler)));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.createMavenProject', instrumentCommand(context, 'java.helper.createMavenProject', createMavenProjectCmdHanlder)));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.createSpringBootProject', instrumentCommand(context, 'java.helper.createSpringBootProject', createSpringBootProjectCmdHandler)));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.showExtension', instrumentCommand(context, 'java.helper.showExtension', showExtensionCmdHandler)));

  await showOverviewPageOnActivation(context);
}

function initializeTelemetry(context: vscode.ExtensionContext) {
  const packageInfo = require(context.asAbsolutePath('./package.json'));
  if (packageInfo) {
    if (packageInfo.aiKey) {
      initialize(packageInfo.name, packageInfo.version, packageInfo.aiKey, true);
    }
  }
}

export function deactivate() {
}
