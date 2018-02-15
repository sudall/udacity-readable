import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from 'src/registerServiceWorker';
import 'src/index.css';
import ReadableApplication from "src/components/readable/ReadableApplication";

ReactDOM.render(
    (
        <ReadableApplication/>
    ),
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
