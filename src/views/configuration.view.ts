import { Configuration } from '../types/configuration';

export const configurationView = (config: Configuration) => {
    return `
      <html>
        <body>
          <h1>Dentest | Configuration</h1>
          <form onsubmit="saveConfig(); return false;">
            <label for="api">API:</label><br>
            <input type="text" id="api" name="api" value="${config.api}" required><br><br>
            <label for="pullToken">Pull token:</label><br>
            <input type="password" id="pullToken" name="pullToken" value="${config.pullToken}" required><br><br>
            <label for="featuresDestination">Features destination:</label><br>
            <button type="button" onclick="selectFolder()">Select features destination</button>
            <input type="text" id="featuresDestination" name="featuresDestination" value="${config.featuresDestination}" required readonly disabled><br><br>
            <label for="inlineParamWrapper">Inline params wrapping string:</label><br>
            <input type="text" id="inlineParamWrapper" name="inlineParamWrapper" value='${config.inlineParamWrapper}' required><br><br>
            <input type="submit" value="Save">
          </form>
          <script>
              const vscode = acquireVsCodeApi();
  
              function saveConfig() {
                  vscode.postMessage({
                  command: 'saveConfiguration',
                  configuration: {
                      api: document.getElementById('api').value,
                      pullToken: document.getElementById('pullToken').value,
                      featuresDestination: document.getElementById('featuresDestination').value,
                      inlineParamWrapper: document.getElementById('inlineParamWrapper').value
                  }
                  });
              }
  
              function selectFolder() {
                  vscode.postMessage({
                      command: 'selectFeaturesFolder'
                  });
              }
  
              window.addEventListener('message', event => {
                  const message = event.data;
                  switch (message.command) {
                      case 'featuresFolderSelected':
                          document.getElementById('featuresDestination').value = message.folderPath;
                          break;
                  }
              });
          </script>
        </body>
      </html>
    `;
  };