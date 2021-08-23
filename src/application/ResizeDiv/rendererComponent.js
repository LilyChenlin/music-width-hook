import React, { useState } from 'react';
import { BaseEditorComponent } from "@handsontable/react";
const RendererComponent = (props) => {console.log("1112", props)
    return (
        <>
            <i style={{ color: "#a9a9a9" }}>
                Row: {props.row}, column: {props.col},
            </i>{" "}
            value: {props.value}
        </>
    )
}


const ScoreRenderer = (props) => {
    const {value} = props;
    const color = value > 60 ? "#2ECC40" : "#FF4136";
    return (
        <>
            <span style={{ color }}>{value}</span>
        </>
    );
}

const PromoteRenderer = (props) => {
    const {value} = props;
    if (value) {
        return (
            <>
                <span>&#10004;</span>
            </>
        );
    }
    return (
        <>
            <span>&#10007;</span>
        </>
    );
}

export {RendererComponent, ScoreRenderer, PromoteRenderer};