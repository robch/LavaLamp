# VS Code Lava Lamp Extension

## Description

This repository contains a VS Code extension named "Lava Lamp". The extension provides the following features:

1. **Lava Lamp Webview**: A webview demonstrating a "lava lamp" animation with configurable controls.
2. **Commands**: Several commands such as showing a "Hello World" message, launching an external URL, and displaying the lava lamp animation in a webview.
3. **Tree View**: An example tree view provider (currently showing an empty view).

## Files in the Repository

* `.eslintrc.json` - Configuration for ESLint.
* `.gitattributes` - Git attributes configuration.
* `.gitignore` - Specifies files and directories to be ignored by git.
* `.vscodeignore` - Specifies files to be ignored during publishing of the extension.
* `CHANGELOG.md` - A log of changes made to the extension.
* `package-lock.json` - Automatically generated for any operations where npm modifies either the node_modules tree or package.json.
* `package.json` - This is the manifest file that declares the extension and its commands.
* `tsconfig.json` - TypeScript configuration file.
* `vsc-extension-quickstart.md` - Quick start guide for setting up and running the extension.
* `src/extension.ts` - The main file where the implementation of the extension commands resides.

## Installation and Setup

To set up and run this extension locally, follow these steps:

1. **Clone the repository**:
    ```
    git clone <repository-url>
    ```

2. **Install the dependencies**:
    ```
    npm install
    ```

3. **Open the extension in VS Code**:
    ```
    code .
    ```

4. **Run the extension**:
    - Press `F5` to open a new window with the extension loaded.
    - Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.

## Commands

The extension provides the following commands:

1. **`lavalamp.hello`**: Displays a "Hello World" message.
2. **`lavalamp.launch`**: Launches an external URL (`https://crbn.us/lava.html`).
3. **`lavalamp.show`**: Opens a webview that displays the lava lamp animation.

## Lava Lamp Webview

The lava lamp animation is configurable through various controls:

- Number of blobs.
- Speed of blobs.
- Size of blobs.
- Option to use color with customizable color variance.

## Development

To make changes to the extension code:

1. Edit the code in `src/extension.ts`.
2. Relaunch the extension from the debug toolbar after making changes.
3. Reload the VS Code window to load your changes (`Ctrl+R` or `Cmd+R` on Mac).

## API Reference

You can explore the full set of VS Code API by opening the file `node_modules/@types/vscode/index.d.ts`.

## Running Tests

To run tests:

1. Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac).
2. From the launch configuration dropdown, pick `Extension Tests`.
3. Press `F5` to run the tests in a new window with the extension loaded.
4. See the output of the test result in the debug console.

## Additional Resources

- [UX guidelines](https://code.visualstudio.com/api/ux-guidelines/overview) for creating extensions that integrate with VS Code's interface.
- [Bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension) to reduce size and improve startup time.
- [Publishing your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.
- [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration) for automating builds.

## License

[Specify your license here]
