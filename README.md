# Diff HTML Exporter

A Visual Studio Code extension that allows you to export diff editor content as a beautiful HTML file.

## Features

- **Export Diff to HTML**: Convert your diff editor comparisons into a standalone HTML file
- **Side-by-Side View**: Output includes a side-by-side comparison view for easy reading
- **File List**: Generated HTML includes a file list for quick navigation
- **Standalone Output**: The exported HTML file includes all necessary styling via CDN
- **Multi-language Support**: Interface available in English and Japanese

## Usage

1. Open two files in VS Code's diff editor (compare mode)
2. Click the export icon in the editor title bar, or
3. Right-click in the editor and select "Diff HTML Exporter: Export Diff to HTML", or
4. Open the Command Palette (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux) and search for "Diff HTML Exporter: Export Diff to HTML"
5. Choose the location and filename for the exported HTML file
6. Open the generated HTML file in any web browser to view the diff

## Requirements

- Visual Studio Code version 1.109.0 or higher

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

None at this time. Please report issues on the GitHub repository.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

### 0.0.1

Initial release:
- Export diff editor content as HTML
- Side-by-side comparison view
- Multi-language support (English/Japanese)

## Technologies

This extension uses the following libraries:
- [diff](https://www.npmjs.com/package/diff) - Create text diffs
- [diff2html](https://www.npmjs.com/package/diff2html) - Generate beautiful HTML diffs

## License

See LICENSE file for details.
