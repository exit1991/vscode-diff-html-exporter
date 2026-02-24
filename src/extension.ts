import * as vscode from 'vscode';
import { createTwoFilesPatch } from 'diff';
import { html } from 'diff2html';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'vscode-diff-html-exporter.exportHtml',
    async () => {
      const tab = vscode.window.tabGroups.activeTabGroup.activeTab;

      if (!(tab?.input instanceof vscode.TabInputTextDiff)) {
        vscode.window.showErrorMessage(
          vscode.l10n.t('Run this command in a diff editor'),
        );
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
        saveLabel: vscode.l10n.t('Export'),
      });

      if (!uri) {
        return;
      }

      const themedHtmlOutput = wrapHtml(htmlOutput);

      await vscode.workspace.fs.writeFile(uri, Buffer.from(themedHtmlOutput));

      vscode.window.showInformationMessage(vscode.l10n.t('HTML exported'));
    },
  );

  context.subscriptions.push(disposable);
}

function wrapHtml(html: string) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>diff2html</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />
    </head>
    <body>
      <div>
        ${html}
      </div>
    </body>
  </html>
  `;
}

export function deactivate() {}
