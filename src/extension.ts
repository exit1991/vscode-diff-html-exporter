import * as vscode from 'vscode';
import { createTwoFilesPatch } from 'diff';
import { html } from 'diff2html';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'vscode-diff-html-exporter.exportHtml',
    async () => {
      const tab = vscode.window.tabGroups.activeTabGroup.activeTab;

      if (!(tab?.input instanceof vscode.TabInputTextDiff)) {
        vscode.window.showErrorMessage('Diff画面で実行してください');
        return;
      }

      const leftUri = tab.input.original;
      const rightUri = tab.input.modified;

      const leftDoc = await vscode.workspace.openTextDocument(leftUri);
      const rightDoc = await vscode.workspace.openTextDocument(rightUri);

      const leftText = leftDoc.getText();
      const rightText = rightDoc.getText();

      const patch = createTwoFilesPatch(
        leftUri.path,
        rightUri.path,
        leftText,
        rightText,
      );

      const htmlOutput = html(patch, {
        drawFileList: true,
        matching: 'lines',
        outputFormat: 'side-by-side',
      });

      const uri = await vscode.window.showSaveDialog({
        filters: { HTML: ['html'] },
        saveLabel: 'Export Diff HTML',
      });

      if (!uri) {
        return;
      }

      await vscode.workspace.fs.writeFile(uri, Buffer.from(htmlOutput));

      vscode.window.showInformationMessage('HTMLを出力しました');
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
