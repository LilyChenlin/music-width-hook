import React, { useEffect, useState } from 'react';
import './index.css'
import _ from 'underscore';
const ResizeDiv = (props) => {


    const [isHResize, setIsHResize] = useState(false)
    const [isVResize, setIsVResize] = useState(false)
    const [hNum, setHNum] = useState(100);
    const [vNum, setVNum] = useState(500);
    const [hNumLimit, setHNumLimit] = useState(30); 
    const [vNumLimit, setVNumLimit] = useState(30);

    let resizeOffsetInfo = {
        clientTop: 0,
        clientLeft: 0
    }

    let leftHeight = 0;

    let containerWidth = 0;


    // 初始化resize信息
    const initResizeInfo = () => {
        const hEle = document.getElementById('h_resize_container');
        resizeOffsetInfo = getElemOffset(hEle);
        leftHeight = hEle.offsetHeight;
        containerWidth = document.getElementById("v_resize_container").offsetWidth;
    }

    const getElemOffset = (ele) => {
        let clientTop = ele.offsetTop;
        let clientLeft = ele.offsetLeft;
        var current = ele.offsetParent;
        while (current !== null) {
            clientTop += current.offsetTop;
            clientLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return {
            clientTop,
            clientLeft,
            height: ele.offsetHeight,
            width: ele.offsetWidth
        }
    }


    // 开始拖动水平调整块 -> hResizeDown
    const hResizeDown = () => {
        setIsHResize(true)
    }

    // 拖动水平调整块
    const hResizeOver = (e) => {
        // resizeOffsetInfo.height 是左侧的高度
        if (isHResize && hNum >= hNumLimit && (resizeOffsetInfo.height - hNum >= hNumLimit)) {
            let newValue = resizeOffsetInfo.clientTop + resizeOffsetInfo.height - e.clientY;
            if (newValue < hNumLimit) {
                newValue = hNumLimit
            }
            if (newValue > (resizeOffsetInfo.height - hNumLimit)) {
                newValue = resizeOffsetInfo.height - hNumLimit
            }
            setHNum(newValue)
        }
    } 


    /**
     * 开始拖动垂直调整块
     */
    const vResizeDown = () => {
        setIsVResize(true)
    }

    /**
     * 拖动垂直调整块
     */
    const vResizeOver = (e) => {
        if (isVResize && vNum >= vNumLimit && (containerWidth - vNum >= vNumLimit)) {
            let newValue = e.clientX - resizeOffsetInfo.clientLeft
            if (newValue < vNumLimit) {
                newValue = vNumLimit
            }
            if (newValue > containerWidth - vNumLimit) {
                newValue = containerWidth - vNumLimit
            }
            setVNum(newValue)
        }
    }

    /**
     * 只要鼠标松开或者离开区域，那么就停止resize
     */
    const stopResize = () => {
        setIsHResize(false);
        setIsVResize(false);
    }

    useEffect(() => {
        initResizeInfo();
        const throttled = _.throttle(() => {
            initResizeInfo()
        }, 200)
        window.onresize = throttled;
        return () => {
            window.onresize = null;
        }
    }, [])

    const hCursor = isHResize ? 'row-resize' : 'default'
    const hColor = isHResize ? '#ddd' : '#fff'
    const vCursor = isVResize ? 'col-resize' : 'default'
    const vColor = isVResize ? '#ddd' : '#fff'
    return(
        <div className="container" onMouseLeave={stopResize}>
            <div className="content" id="v_resize_container" onMouseMove={vResizeOver}>
                <div 
                    className="left" 
                    id="h_resize_container" 
                    onMouseMove={hResizeOver} 
                    style={{ width: vNum, cursor: vCursor }}
                    
                >
                    <div className="left-top" style={{ bottom: hNum, cursor: hCursor }}>leftTop</div>
                    <div className="h-resize" onMouseDown={hResizeDown} style={{ bottom: hNum, backgroundColor: hColor }} draggable={false}></div>
                    <div className="left-bottom" style={{ height: hNum + 4, cursor: hCursor }}>leftBottom</div>
                </div>
                <div className="v-resize" onMouseDown={vResizeDown} style={{ left: vNum, backgroundColor: vColor }} draggable={false}></div>
                <div className="right" style={{ marginLeft: vNum + 4, cursor: vCursor }}>right</div>
            </div>
        </div>
    )
}
export default ResizeDiv;