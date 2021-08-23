/**
 * 测试hansonTable
 */
import React, { useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import './index.css'
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';
import { RendererComponent, PromoteRenderer, ScoreRenderer } from './rendererComponent';
const ResizeDiv111 = (props) => {
    const handsontableData = [
        {
            id: 1,
            code: "BJ_CMP_O01",
            company: "某某公司",
            desc: "水电费",
            connectPeople: "张三三",
            faren: "法人",
            isCTableHeader: false,
            isCTableBody: false
        }, {
            id: 2,
            code: "BJ_CMP_O02",
            company: "某某11公司",
            desc: "水电费电费",
            connectPeople: "张丝丝",
            faren: "法无人",
            isCTableHeader: false,
            isCTableBody: false
        }, {
            id: "",
            code: "联系人",
            company: "职务",
            desc: "性别",
            connectPeople: "女",
            faren: "",
            isCTableHeader: true,
            isCTableBody: false
        }, {
            id: "1",
            code: "BJ_Cmp_001",
            company: "长名字的某某公司",
            desc: "搜索",
            connectPeople: "李思思",
            faren: "",
            isCTableHeader: false,
            isCTableBody: true
        }, {
            id: "",
            code: "股东名称",
            company: "持股比例",
            desc: "例一",
            connectPeople: "说明",
            faren: "是否机构",
            // faren11: "备注",
            isCTableHeader: true,
            isCTableBody: false,
        }, {
            id: "1",
            code: "BJ_CMP_001",
            company: "长名字的某某公司",
            desc: "搜索",
            connectPeople: "李思思",
            faren: "河北邯郸",
            // faren11: "40010",
            isCTableHeader: false,
            isCTableBody: true,
        }

    ]

    const data = [
        ["BJ_CMP_001", "某某公司", "水电费", "张三三", "理综", "北京海淀", "100010", "1000人"],
        ["BJ_CMP_002", "常敏子某某公司", "水电费", "张四三", "2综", "北京海淀", "100010", "1000人"],
        ["联系人", "职务", "性别", "姓名"],
        ["BJ_Cmp_001", "长名字的某某公司", "搜索", "李思思"],
        ["BJ_Cmp_001", "某某公司", "水电费", "张三三"],
        ["股东名称", "持股比例", "股东类型", "例1", "说明", "是否机构", "备注"],
        ["BJ_CMP_001", "长名字的某某公司", "搜索", "李思思", "王总", "河北邯郸", "40010"]
    ]

    const [rowList, setRowList] = useState([]);

    const headerRowList = [2, 5]
    const colList = [0, 1, 2, 3]
    const bodyRowList = [[3, 4], [6]];
    
    const subTableSetting = {
        "setting1": {
            headerRowList: 2,
            colList: [4],
            bodyRowList: [3, 4]
        }, 
        "setting2": {
            headerRowList: 5,
            colList: [0, 1, 2, 3, 4, 5, 6],
            bodyRowList: [6]
        }
    }
    const subTableSettings1 = {
        headerRowList: 2,
        colList: [0, 1, 2, 3],
        bodyRowList: [3, 4]
    }

    const render = (headerRowList, colList, bodyRowList) => {

    }
    return(
        
        <div id="hot-app">

            <HotTable 
                data={data}
                licenseKey='non-commercial-and-evaluation'
                autoRowSize={true}
                autoColumnSize={true}
                rowHeaders={true}
                colHeaders={["子表", "编码", "公司名称", "简称", "联系人", "法人"]}
                manualColumnResize={true} //.拖拽行头或列头改变行或列的大小
                manualRowResize={true}
                cells={(row, col, props) => {
                    let cellProperties = {};
                    cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                        Handsontable.renderers.TextRenderer.apply(this, arguments);
                        let len =  Object.keys(subTableSetting).length;
                        if (len == 0) return;
                        for (let key in subTableSetting) {
                            let item = subTableSetting[key];
                            let {headerRowList, colList, bodyRowList} = item;
                            let colRender = colList.indexOf(col) !== -1 ? true : false;
                            if (row === headerRowList && colRender) {
                                td.style.background = 'red';//背景色
                            }
                            if (bodyRowList.length == 1 && row === bodyRowList[0] && colRender) {debugger
                                td.style.background = 'yellow';
                            } else if (bodyRowList.length > 1) {
                                if (row >= bodyRowList[0] && row <= bodyRowList[1] && colRender) {
                                    td.style.background = 'yellow';
                                }
                            }
                        }
                        // let {colList, headerRowList, bodyRowList} = subTableSettings1;
                        // console.log(row)
                        // headerRowList.forEach((item, index) => {
                        //     if (row === item && colRender) {
                        //         td.style.background = 'red';//背景色
                        //     }
                        // })

                        // bodyRowList.forEach((item, index) => {
                        //     if (colRender && item == row) {
                        //         td.style.background = 'yellow';
                        //     }
                        // })
                        // if (row === 2 || row === 5) {
                        // }

                    }
                    return cellProperties
                } }          
            >
                {/* <HotColumn data="id">
                    <ScoreRenderer hot-renderer/>
                </HotColumn>
                <HotColumn data="code"></HotColumn>
                <HotColumn data="company"></HotColumn>
                <HotColumn data="connectPeople"></HotColumn>
                <HotColumn data="faren"></HotColumn> */}
                {/* <HotColumn data="cPeople"></HotColumn>
                <HotColumn data="cZHiwu"></HotColumn>
                <HotColumn data="cSex"></HotColumn>
                <HotColumn data="cName"></HotColumn> */}
                {/* <HotColumn data="score">
                    <ScoreRenderer hot-renderer/>
                </HotColumn>
                <HotColumn data="isPromoted">
                    <PromoteRenderer hot-renderer/>
                </HotColumn> */}

            </HotTable>
        </div>
    )
}

export default ResizeDiv111;