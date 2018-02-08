import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MyReadsApplication from "src/components/MyReadsApplication";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyReadsApplication />, div);
});
