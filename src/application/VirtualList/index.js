/**
 *  
        1. 首屏加载的时候只需要加载可视区域页面的列表项
        2. 当滚动发生时，动态通过计算获得可视区域的内的列表项。
        3. 将非可视区域内的列表项删除

        infinite-list-container 可视区域容器
        infinite-list-phantom 占位，高度为总列表高度，用于形成滚动条
        infinite-list 列表项的可视区域

        4. 监听可视区域容器的滚动 获取滚动位置 scrollTop

        可视区域高度固定 screenHeight
        列表项高度固定 itemHeight
        列表数据 listData
        当前滚动位置 scrollTop

        列表总高度 listData * itemHeight
        可显示的列表项数 visibleCount = Math.floor(screenHeight / itemHeight)
        数据的起始索引 startIndex = scrollTop / itemHeight
        数据的结束索引 endIndex = startIndex + visibleCount
        列表显示数据 listData[startIndex, endIndex]

        当滚动后，由于渲染区域相对于可视区域已经发生了偏移，此时我需要获取一个偏移量startOffset，通过样式控制将渲染区域偏移至可视区域中。
        偏移量 startOffset = scrollTop - (scrollTop % itemSize);
 */
import React, { useEffect, useReducer, useRef, useState } from 'react';

import './index.css'


function AddListData() {

    let listData = [];
    for(let i = 0; i < 1000; i++) {
        listData.push({id: i, value: "dihghhhff" + i})
    }

    return <VirtualList data={listData}/>
}
function VirtualList(props) {debugger

    const {data} = props;

    // 列表项高度
    const ItemSize = 200;
    const screenHeight = 1000;
    const visibleCount = Math.floor(screenHeight / ItemSize);

    const [listHeight, setListHeight] = useState(0); // 列表总高度
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [startOffset, setStartOffset] = useState(0);
    const [visibleData, setVisibleData] = useState([]);


    const listRef = useRef('list');
    const itemRef = useRef('item');

    useEffect(() => {
        const listHeight = data.length * ItemSize;
        setListHeight(listHeight);

        const end = start + visibleCount;
        setEnd(end);
    },[])

    const visibleDataFunc = () => {
        let sliceData = data.slice(start, Math.min(end, data.length))
        setVisibleData(sliceData);
    } 
    useEffect(() => {
        visibleDataFunc();
    }, [start, end])

    const scrollEvent = () => {
        //当前滚动位置
        let scrollTop = listRef.current.scrollTop;
        //此时的开始索引
        let start = Math.floor(scrollTop / ItemSize);
        let end = start + visibleCount;
        let startOffset = scrollTop - (scrollTop % ItemSize);
        setStart(start);
        setEnd(end);
        setStartOffset(startOffset);
    }

    return <div ref={listRef} className="infinite-list-container" onScroll={scrollEvent}>
            <div className="infinite-list-phantom" style={{height: listHeight + 'px'}}></div>
            {/* 列表项可视区域 */}
            <div className="infinite-list" style={{transform: `translate3d(0,${startOffset}px,0)`}}>
                {
                        visibleData.map((item, index) => {
                            return <div ref={itemRef} className="infinite-list-item" style={{height: ItemSize + 'px', lineHeight: ItemSize + 'px'}} key={item.id}>
                                {item.value}
                            </div>
                        })
                }
            </div>
    </div>
}
export default AddListData;