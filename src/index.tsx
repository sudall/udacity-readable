import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from 'src/registerServiceWorker';
import 'src/index.css';
import {BrowserRouter} from "react-router-dom";
import ReadableApplication from "src/components/readable/ReadableApplication";

ReactDOM.render(
    (
        <BrowserRouter>
            <ReadableApplication />
        </BrowserRouter>
    ),
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
