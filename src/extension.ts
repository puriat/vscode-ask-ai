import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  // Register the Sidebar Panel
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "myextension-sidebar",
      sidebarProvider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "myextension.openChatWithSelection",
      async () => {
        await vscode.commands.executeCommand("myextension-sidebar.focus");
        setTimeout(() => sidebarProvider.showWithText(), 10);
      }
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
