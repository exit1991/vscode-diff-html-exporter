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
# ? Which bundler to use? esbuild
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


# フォーマッターの導入
フォーマッターとして Prettier を導入する。  
VS Code 側で導入する。  

## VS Code 拡張機能の導入
以下のVSCode拡張機能をインストールする。

- Prettier - Code formatter
  - ID: esbenp.prettier-vscode

## 保存時に自動でフォーマットするように設定変更
- VS Code の設定を変更すると、保存時に自動で Prettier のフォーマットを行うことができるようになる。
- 今回は JavaScript、 TypeScript（念の為）、JSON、コメント付きJSON に対してフォーマットするようにする。
- `.vscode/settings.json` に以下を追加する（`.vscode`フォルダが無ければ追加する）。

```json
{
  〜 (省略) 〜
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[json]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  〜 (省略) 〜
}
```

## Prettier 用設定ファイル配置
### .prettierrc （フォーマット設定ファイル）
- プロジェクトのトップに `.prettierrc` を作成する
- 以下の内容を追加する

```json
{
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true
}
```

### .prettierignore （フォーマット除外対象設定ファイル）
- プロジェクトのトップに `.prettierignore` を作成する
- 以下の内容を追加する（他にも除外したいものがあったら追加する）

```
node_modules
package.json
package-lock.json
```
