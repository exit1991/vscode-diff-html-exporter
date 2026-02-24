# 初期構築

## 1. 事前準備（1回だけ）
### インストール
yo と generator-code をグローバルにインストール

```shell
npm install -g yo generator-code
```

### 拡張テンプレート作成

```shell
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? vscode-diff-html-exporter
# ? What's the identifier of your extension? vscode-diff-html-exporter
# ? What's the description of your extension? 
# ? Initialize a git repository? No
# ? Which bundler to use? unbundled
# ? Which package manager to use? npm
```

### 作成されたフォルダへ移動

```shell
cd diff-html-exporter
```

### diffライブラリ追加

```shell
npm install diff diff2html
```

## 2. 最小構成の完成コード
src/extension.ts を編集する。

## 3. package.json の設定
package.json にコマンドを追加します。

```json
"contributes": {
  "commands": [
    {
      "command": "diff-html-exporter.exportHtml",
      "title": "Export Diff to HTML"
    }
  ]
}
```

## 4. 動作確認（ここ重要）
F5 を押します。

すると「Extension Development Host」という 別のVS Codeが起動します。

そこで：
- ファイルAを開く
- ファイルBを開く
- 右クリック → Compare With Selected
- Diff画面表示
- Cmd + Shift + P
- Export Diff to HTML
- HTMLが出力されます。
