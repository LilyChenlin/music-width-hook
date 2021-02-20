import React, { useState } from 'react';
import Horizen from '../../baseUI/horizen-item/index';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';
function Singer(props) {
    // 分类
    let [category, setCategory] = useState('');
    // 首字母
    let [alpha, setAlpha] = useState('');

    let handleUpdateCategory = (val) => {
        setCategory(val)
    }

    let handleUpdateAlpha = (val) => {
        setAlpha(val)
    }
    return(
        <NavContainer>
            <Horizen 
                list={categoryTypes} 
                title={"分类 (默认热门):"}
                handleClick={handleUpdateCategory}
                oldValue={category}
            ></Horizen>
            <Horizen 
                list={alphaTypes} 
                title={"首字母:"}
                handleClick={handleUpdateAlpha}
                oldValue={alpha}
            ></Horizen>
        </NavContainer>
    )
}
export default React.memo(Singer);