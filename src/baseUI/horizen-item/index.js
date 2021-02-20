import React, {useState, useRef, useEffect, memo} from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

function Horizen(props) {
    console.log("111", props)
    const {list, oldValue, title} = props;
    const {handleClick} = props;

    const Category = useRef(null);

    useEffect(() => {
        let categoryDom = Category.current;
        let tagElements = categoryDom.querySelectorAll('span');
        let totalWidth = 0;
        let tagArray = tagElements && Array.from(tagElements);
        tagArray && tagArray.forEach(ele => {
            totalWidth += ele.offsetWidth;
        })
        categoryDom.style.width = `${totalWidth}px`;
    }, [])
    // 初始化内容
    return(
        <Scroll direction={'horizental'}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return(
                                <ListItem
                                    key={item.key}
                                    className={`${oldValue === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}
                                >
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>

        </Scroll>
    )
}

// 该组件需要接收的参数
// list 接受的列表数据
// oldVal 为当前的item值
// title 列表的左边标题
// handleClick 点击不同的item执行的方法
Horizen.defaultProps = {
    list: [],
    oldValue: '',
    title: '',
    handleClick: null
}
Horizen.propTypes = {
    list: PropTypes.array,
    oldValue: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
}

const List = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        margin-right: 5px;
        color: grey;
        font-size: ${style["font-size-m"]};
        /* vertical-align: middle; */
    }
`

const ListItem = styled.span`
    flex: 0 0 auto;
    font-size: ${style["font-size-m"]};
    padding: 5px 8px;
    border-radius: 10px;
    &.selected {
        color: ${style["theme-color"]};
        border: 1px solid ${style["theme-color"]};
        opacity: 0.8;
    }
`

export default memo(Horizen)