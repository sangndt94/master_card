// (C) 2007-2019 GoodData Corporation
import React from "react";

import "@gooddata/react-components/styles/css/main.css";

export interface ICustomErrorProps {
    message: string;
    height?: number | string;
}

const CustomError: React.FC<ICustomErrorProps> = ({ message, height }) => (
    <div
        className="s-error"
        style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            whiteSpace: "normal",
            lineHeight: "normal",
            height,
        }}
    >
        <div
            className="gd-message error"
            style={{
                margin: 0,
                padding: 20,
                display: "block",
            }}
        >
            <div className="gd-message-text">
                <strong>{message}</strong>
            </div>
        </div>
    </div>
);

export default CustomError;
