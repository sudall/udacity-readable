import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from 'src/registerServiceWorker';
import 'src/index.css';
import ReadableApplicationBootstrapper from "src/components/readable/ReadableApplicationBootstrapper";

ReactDOM.render(
    (
        <ReadableApplicationBootstrapper/>
    ),
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
