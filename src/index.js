// import _ from 'lodash';


// function getComponent() {
//     const element = document.createElement('div');
//     return import('lodash')
//     .then(({default: _}) => {
//         const element = document.createElement('div');
//         element.innerHTML = _.join(['Hello', 'Webpack']);
//         return element;
//     })
// }

// 通过async/await 简化代码
async function getComponent() {
    const element = document.createElement('div');

    const {default: _} = await import('lodash');

    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');

    return element;

    
}
getComponent().then((component) => {
    document.body.appendChild(component)
})