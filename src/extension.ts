'use strict';

import * as vscode from 'vscode';
const openurl: any = require('openurl');

import overviewCmdHandler from './overview';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('java.overview', overviewCmdHandler, context));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.createMavenProject', async () => {
    if (!await validateAndRecommendExtension('vscjava.vscode-maven', 'Maven extension is recommended to help create Java projects and work with custom goals.')) {
      return;
    }

    await vscode.commands.executeCommand('maven.archetype.generate');
  }));

  // context.subscriptions.push(vscode.commands.registerCommand('java.helper.createJavaFile', async () => {
  //   await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
  //   await vscode.commands.executeCommand('workbench.action.editor.changeLanguageMode', 'java');
  // }));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.createSpringBootProject', async () => {
    if (!await validateAndRecommendExtension('vscjava.vscode-spring-initializr', 'Spring Initializr extension is recommended to help create Spring Boot projects and manage dependencies.')) {
      return;
    }

    await vscode.commands.executeCommand('spring.initializr.maven-project');
  }));

  context.subscriptions.push(vscode.commands.registerCommand('java.helper.showExtension', async (extensionName: string) => {
    openurl.open(vscode.Uri.parse(`vscode:extension/${extensionName}`).toString());
  }));

  let showWhenUsingJava = context.globalState.get('showWhenUsingJava');
  if (showWhenUsingJava === undefined) {
    showWhenUsingJava = true;
  }

  if (showWhenUsingJava) {
    vscode.commands.executeCommand('java.overview');
  }
}

async function validateAndRecommendExtension(extName: string, message: string): Promise<boolean> {
  const ext = vscode.extensions.getExtension(extName);
  if (ext) {
    return true;
  }

  const action = "Details";
  const answer = await vscode.window.showInformationMessage(message, action);
  if (answer === action) {
    await vscode.commands.executeCommand('java.helper.showExtension', extName);
  }

  return false;
}

export function deactivate() {
}
