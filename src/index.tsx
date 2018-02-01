import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/App';
import registerServiceWorker from 'src/registerServiceWorker';
import 'src/index.css';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ),
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
