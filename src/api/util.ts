import { object } from "prop-types";

export const getCount = (count: number) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor (count / 10000) < 10000){
        return Math.floor (count/1000)/10 + "万";
    } else  {
        return Math.floor (count / 10000000)/ 10 + "亿";
    }
}

type IRracksList = {
    tracks: string[]
}
// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: IRracksList[]) => {
    for (let i = 0; i < rankList.length; i++) {
        if(rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
}

type IItem = {
    name: string
}
// 处理歌手列表拼接歌手名字
export const getName = (list: IItem[]) => {
    let str = ''; // 最后拼接完的结果
    list.map((item, index) => {
        str += index === 0 ? item.name : '/' + item.name;
    })
    return str;
}

// 判断控对象
export const isEmptyObject = (obj: object) => !obj || Object.keys(obj).length === 0;
