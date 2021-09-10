import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import printMe from './prints.js';
if (module && module.hot) {
    module.hot.accept('./prints.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
ReactDOM.render(<App/>, document.querySelector('#root'))