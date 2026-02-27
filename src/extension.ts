import * as vscode from 'vscode';
import { createTwoFilesPatch } from 'diff';
import * as Diff2html from 'diff2html';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'vscode-diff-html-exporter.exportHtml',
    async () => {
      // アクティブなタブがdiffエディタであることを確認
      const tab = vscode.window.tabGroups.activeTabGroup.activeTab;
      if (!(tab?.input instanceof vscode.TabInputTextDiff)) {
        vscode.window.showErrorMessage(
          vscode.l10n.t('Run this command in a diff editor'),
        );
        return;
      }

      // 左右のURIを取得
      const leftUri = tab.input.original;
      const rightUri = tab.input.modified;

      // ドキュメントを開いてテキストを取得
      const leftDoc = await vscode.workspace.openTextDocument(leftUri);
      const rightDoc = await vscode.workspace.openTextDocument(rightUri);
      const leftText = leftDoc.getText();
      const rightText = rightDoc.getText();

      // デフォルトのファイル名を生成
      const leftFileName = extractBaseFileName(leftUri) ?? 'left';
      const rightFileName = extractBaseFileName(rightUri) ?? 'right';

      // diffを生成
      const patch = createTwoFilesPatch(
        leftFileName,
        rightFileName,
        leftText,
        rightText,
      );

      // diffをHTMLに変換
      const htmlOutput = Diff2html.html(patch, {
        drawFileList: false,
        matching: 'words',
        outputFormat: 'side-by-side',
      });

      // デフォルトのHTMLファイル名を生成
      const fileTitle = `${leftFileName}_vs_${rightFileName}`;
      const defaultHtmlFileName = `${fileTitle}.html`;

      // 保存場所のデフォルトを設定（右側のファイルのディレクトリを基準）
      const defaultDir =
        rightUri.scheme === 'file'
          ? vscode.Uri.joinPath(rightUri, '..', defaultHtmlFileName)
          : vscode.Uri.file(defaultHtmlFileName);
      const defaultUri = defaultDir;

      // 保存ダイアログを表示
      const uri = await vscode.window.showSaveDialog({
        defaultUri: defaultUri,
        filters: { HTML: ['html'] },
        saveLabel: vscode.l10n.t('Export'),
      });

      // ユーザーがキャンセルした場合は処理を終了
      if (!uri) {
        return;
      }

      // HTMLにテーマを適用
      const themedHtmlOutput = wrapBaseHtml(htmlOutput, fileTitle);

      // ファイルに書き込み、完了メッセージを表示
      await vscode.workspace.fs.writeFile(uri, Buffer.from(themedHtmlOutput));
      vscode.window.showInformationMessage(vscode.l10n.t('HTML exported'));
    },
  );

  context.subscriptions.push(disposable);
}

/**
 * ファイルパスから拡張子を除いたベースファイル名を抽出する
 * @param uri ファイルのURI
 * @returns 拡張子を除いたベースファイル名、または抽出できない場合はundefined
 */
function extractBaseFileName(uri: vscode.Uri): string | undefined {
  return uri.path
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '');
}

/**
 * ベースとなるHTMLを生成する
 * @param html HTMLの内容
 * @param title HTMLのタイトル
 * @returns 完成したHTML文字列
 */
function wrapBaseHtml(html: string, title: string) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />
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
