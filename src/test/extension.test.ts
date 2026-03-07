import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { createFullContextPatch } from '../extension';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('createFullContextPatch は最後の差分以降の未変更行も含める', () => {
    // Given: 差分が先頭寄りに1か所だけあり、末尾に未変更行が続く2つのテキスト
    const leftText =
      Array.from({ length: 12 }, (_, index) => `line${index + 1}`).join('\n') +
      '\n';
    const rightLines = Array.from(
      { length: 12 },
      (_, index) => `line${index + 1}`,
    );
    rightLines[1] = 'line2_changed';
    const rightText = rightLines.join('\n') + '\n';

    // When: フルコンテキスト指定の unified diff を生成する
    const patch = createFullContextPatch(
      'left.txt',
      'right.txt',
      leftText,
      rightText,
    );

    // Then: hunk に末尾の未変更行まで含まれる
    assert.ok(patch.includes('@@ -1,12 +1,12 @@'));
    assert.ok(patch.includes('-line2\n'));
    assert.ok(patch.includes('+line2_changed\n'));
    assert.ok(patch.includes(' line12\n'));
  });
});
