import React from 'react';
import {add} from '@Utils/math';
import './index.less'
interface Iprops {
    a: number,
    b: number
}

function ComputedOne(props: Iprops) {
    const {a, b} = props;
    const sum = add(a,b);
    return <p className='computed-one'>{`Hi, I'm computed one, my sum is ${sum}.`}</p>
}

export default ComputedOne;