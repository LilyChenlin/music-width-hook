import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';

const scrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

// 函数组件不能直接被上层组件调用ref, 需要通过forwardRef包裹
const Scroll = forwardRef((props, ref) => {

    const {
        direction, 
        click, 
        refresh, 
        onScroll, 
        pullUp, 
        pullDown, 
        pullUpLoading, 
        pullDownLoading, 
        bounceTop, 
        bounceBottom
    } = props;
    // 初始化better-scroll实例对象
    const [bScroll, setBScroll] = useState();

    // 通过useRef创建一个ref scrollContaninerRef.current获取相对应的实例
    const scrollContaninerRef = useRef ();


    // 传递给useEffect空数组，目的在于告诉effect，仅在组件挂载和卸载时执行。
    // 如果什么都不传，则在第一次渲染和之后都每次组件更新都会调用这个useEffect
    // 同时也可以在数组中传入依赖都值，在第一次和每次值发生变化都时候调用


    // 仅在组件挂载和卸载时创建better-scroll实例对象
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizental',
            scrollY: direction === 'vertical',
            probeType: 3, //不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setBScroll(scroll); // 设置scroll实例
        return () => {
            setBScroll(null); //在下一次运行这个effect的时候，先把实例清除掉 清除副作用 在组件卸载前执行
        }
    }, [])

    // 在每次组件更新重新渲染都时候都要重新刷新bScroll实例，防止无法滑动
    useEffect(() => {
        if(refresh && bScroll) {
            bScroll.refresh();
        }
    })

    // 实例绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll)
        })
        return () => {
            bScroll.off('scroll')
        }
    }, [bScroll, onScroll])

    // 进行下拉到底的判断，调用上拉刷新的函数
    // 如果下拉到底，就重新调用上拉刷新函数
    useEffect(() => {
        if(!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            // 判断是否划到了底部，如果滑到底部，则调用pullUp刷新函数
            if(bScroll.y < bScroll.maxScrollY + 100) {
                pullUp()
            }
        });
        return () => {
            bScroll.off('scrollEnd')
        }
    }, [pullUp, bScroll])

    // 进行下拉判断，如果下拉幅度过大， 则调用下拉刷新函数
    useEffect(() => {
        if(!bScroll || !pullDown) return;
        bScroll.on('touchEnd', pos => {
            // 判断下拉动作
            if (pos.y > 50) {
                pullDown()
            }
        });
        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDown, bScroll])

    useImperativeHandle(ref, () => ({
        // 给外界暴露方法refresh()方法
        refresh() {
            if(bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0,0);
            }
        },
        // 给外界暴露 getBScroll 方法，提供 bs 实例
        getBScroll() {
            if(bScroll) {
                return bScroll;
            }
        }
    }))
    return(
        <scrollContainer ref={scrollContaninerRef}>
            {props.children}
        </scrollContainer>
    )
})


Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
    click: true,// 是否支持点击
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.function,// 滑动触发的回调函数
    pullUp: PropTypes.function,// 上拉加载逻辑
    pullDown: PropTypes.function,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool,// 是否支持向下吸底
    mouseWheel: PropTypes.bool, //是否支持chrome滚轮效果
} 

Scroll.defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: true,
    onScroll: null,
    pullUp: null, 
    pullDown: null,
    pullUpLoading: false,
    pullDownLoading: false,
    bounceTop: false,
    bounceBottom: false,
    mouseWheel: true
}
export default Scroll;