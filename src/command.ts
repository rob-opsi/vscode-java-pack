import * as vscode from 'vscode';

export type CommandHandler = (context: vscode.ExtensionContext, ...args: any[]) => any;

export function instrumentCommand(context: vscode.ExtensionContext, callback: CommandHandler): (...args: any[]) => any {
  return async (...args: any[]) => {
    return await callback(context, ...args);
  };
}
