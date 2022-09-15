// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import theme from "../../utils/theme";

interface IHrProps {
    className?: string;
    color?: string;
}

const Hr: React.FC<IHrProps> = ({ className, color = theme.color.primary, ...restProps }) => (
    <div className={cx("Hr", className)} {...restProps}>
        {/* language=CSS */}
        <style jsx>{`
            .Hr {
                border: 0 solid ${color};
                border-top-width: 2px;
            }
        `}</style>
    </div>
);

export default Hr;
