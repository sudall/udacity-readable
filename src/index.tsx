import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/App';
import registerServiceWorker from 'src/registerServiceWorker';
import 'src/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
