import _ from 'lodash';
import print from './print.js';


function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], '');
    btn.innerHTML = 'Please click me';
    btn.onclick = print;

    element.appendChild(btn);
    return element;
}
document.body.appendChild(component())

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log("Accepting the updated printMe module!");
        print();
    })
}