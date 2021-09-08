import React from 'react';
import {add} from '@Utils/math';
import './index.less';

interface Iprops {
    a: number,
    b: number
}

function ComputedTwo(props: Iprops) {
    const {a, b} = props;
    const sum = add(a,b);
    return <p className='computed-two'>{`Hi, I'm computed two, my sum is ${sum}.`}</p>
}

export default ComputedTwo;