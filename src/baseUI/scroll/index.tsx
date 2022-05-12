import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react';
import BScroll from 'better-scroll';
import styled from 'styled-components';
import Loading from '../loading/index';
import LoadingV2 from '../loading-v2/index';
import {noop } from 'lodash';
const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

interface IScrollProps {
    direction?: "vertical" | "horizental",
    click?: boolean;
    refresh?: boolean;
    pullUpLoading?: boolean;
    pullDownLoading?: boolean;
    bounceTop?: boolean;
    bounceBottom?: boolean;
    mouseWheel?: boolean;
    onScroll?: () => void;
    pullUp?: () => {};
    pullDown?: () => {};
    children: React.ReactNode;
    className: string;
}

type posData = {
    x: number;
    y: number;
}
// 函数组件不能直接被上层组件调用ref, 需要通过forwardRef包裹
const Scroll = forwardRef((props: IScrollProps, ref) => {
    const [bScroll, setBScroll] = useState<BScroll | null>(null);
    const {
        direction = 'vertical', 
        click = true, 
        refresh = true, 
        pullUpLoading = false, 
        pullDownLoading = false, 
        bounceTop = true, 
        bounceBottom = true
    } = props;

    const { pullUp = noop, pullDown = noop, onScroll } = props;

    // 通过useRef创建一个ref scrollContaninerRef.current获取相对应的实例
    const scrollContaninerRef = useRef<HTMLDivElement | null> (null);


    // 传递给useEffect空数组，目的在于告诉effect，仅在组件挂载和卸载时执行。
    // 如果什么都不传，则在第一次渲染和之后都每次组件更新都会调用这个useEffect
    // 同时也可以在数组中传入依赖都值，在第一次和每次值发生变化都时候调用


    // 仅在组件挂载和卸载时创建better-scroll实例对象
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current!, {
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
        bScroll.on('scroll', onScroll)
        return () => {
            bScroll.off('scroll', onScroll)
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
        bScroll.on('touchEnd', (pos: posData) => {
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
    const PullUpdisplayStyle = pullUpLoading ? {display: ''} : {display: "none"};
    const PullDowndisplayStyle = pullDownLoading ? {display: ''} : {display: "none"}

    return(
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}

            {/* 滑倒底部加载动画 */}
            <pullUpLoading style={PullUpdisplayStyle}><Loading></Loading></pullUpLoading>
            <pullDownLoading style={PullDowndisplayStyle}><LoadingV2></LoadingV2></pullDownLoading>
        </ScrollContainer>
    )
})

export default Scroll;