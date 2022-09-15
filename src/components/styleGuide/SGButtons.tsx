// (C) 2007-2019 GoodData Corporation
import React, { FC } from "react";
import styleGuide from "./styleGuide";
import Typography from "../utils/Typography";
import Button from "../controls/Button";
import { css } from "emotion";
import { IconMissing } from "../icon";
import IconButton from "../controls/IconButton";

const classes = {
    list: css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridGap: styleGuide.spacing(2),
    }),
    headline: css({
        marginTop: 0,
        marginBottom: styleGuide.spacing(4),
    }),
};

// tslint:disable-next-line: no-console
const onClick = () => console.log("onClick");

const sampleIcon = <IconMissing height="1em" />;

export const SGButtons: FC = () => {
    return (
        <div>
            <Typography variant="menuGroupTitle" Component="h1" className={classes.headline}>
                Buttons
            </Typography>
            <div className={classes.list}>
                <div>
                    <Typography variant="caption" Component="h2">
                        Button
                    </Typography>
                    <Typography variant="label" Component="h3">
                        Default state
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid">
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline">
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text">
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        Active state
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" active>
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" active>
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" active>
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        Disabled state
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" disabled>
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" disabled>
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" disabled>
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        Custom color
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" color="positive">
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" color="positive">
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" color="positive">
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        In text
                    </Typography>
                    <div>
                        <Typography variant="subtitle" Component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id sem{" "}
                            <Button onClick={onClick} variant="text">
                                pulvinar
                            </Button>
                            , egestas sapien ac, tincidunt diam. Quisque et risus elit. Nunc imperdiet augue
                            justo. Aenean et nisi placerat, tincidunt arcu vitae, aliquam justo. Pellentesque
                            sodales vulputate molestie. Nullam fringilla posuere blandit. Maecenas ultrices
                            vel sapien a mattis.
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        Button with icon
                    </Typography>
                    <Typography variant="label" Component="h3">
                        Default state{" "}
                        <Typography variant="subtitle" Component="span">
                            (with start icon)
                        </Typography>
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" startIcon={sampleIcon}>
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" startIcon={sampleIcon}>
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" startIcon={sampleIcon}>
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        Active state{" "}
                        <Typography variant="subtitle" Component="span">
                            (with end icon)
                        </Typography>
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" active endIcon={sampleIcon}>
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" active endIcon={sampleIcon}>
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" active endIcon={sampleIcon}>
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        Disabled state{" "}
                        <Typography variant="subtitle" Component="span">
                            (with start icon)
                        </Typography>
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" disabled startIcon={sampleIcon}>
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" disabled startIcon={sampleIcon}>
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" disabled startIcon={sampleIcon}>
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        Custom color
                    </Typography>
                    <div>
                        <Button onClick={onClick} variant="solid" color="negative" startIcon={sampleIcon}>
                            Solid
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="outline" color="negative" startIcon={sampleIcon}>
                            Outline
                        </Button>
                        &emsp;
                        <Button onClick={onClick} variant="text" color="negative" startIcon={sampleIcon}>
                            Text
                        </Button>
                    </div>
                    <Typography variant="label" Component="h3">
                        In text{" "}
                        <Typography variant="subtitle" Component="span">
                            (with end icon)
                        </Typography>
                    </Typography>
                    <div>
                        <Typography variant="subtitle" Component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id sem{" "}
                            <Button onClick={onClick} variant="text" endIcon={sampleIcon}>
                                pulvinar
                            </Button>
                            , egestas sapien ac, tincidunt diam. Quisque et risus elit. Nunc imperdiet augue
                            justo. Aenean et nisi placerat, tincidunt arcu vitae, aliquam justo. Pellentesque
                            sodales vulputate molestie. Nullam fringilla posuere blandit. Maecenas ultrices
                            vel sapien a mattis.
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" Component="h2">
                        IconButton
                    </Typography>
                    <Typography variant="label" Component="h3">
                        Default state
                    </Typography>
                    <div>
                        <IconButton onClick={onClick} variant="solid" Icon={IconMissing} />
                        &emsp;
                        <IconButton onClick={onClick} variant="text" Icon={IconMissing} />
                    </div>
                    <Typography variant="label" Component="h3">
                        Active state
                    </Typography>
                    <div>
                        <IconButton onClick={onClick} variant="solid" active Icon={IconMissing} />
                        &emsp;
                        <IconButton onClick={onClick} variant="text" active Icon={IconMissing} />
                    </div>
                    <Typography variant="label" Component="h3">
                        Disabled state
                    </Typography>
                    <div>
                        <IconButton onClick={onClick} variant="solid" disabled Icon={IconMissing} />
                        &emsp;
                        <IconButton onClick={onClick} variant="text" disabled Icon={IconMissing} />
                    </div>
                    <Typography variant="label" Component="h3">
                        Custom color
                    </Typography>
                    <div>
                        <IconButton onClick={onClick} variant="solid" color="black" Icon={IconMissing} />
                        &emsp;
                        <IconButton onClick={onClick} variant="text" color="black" Icon={IconMissing} />
                    </div>
                    <Typography variant="label" Component="h3">
                        In text
                    </Typography>
                    <div>
                        <Typography variant="subtitle" Component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id sem pulvinar{" "}
                            <IconButton onClick={onClick} variant="text" Icon={IconMissing} iconSize={12} />,
                            egestas sapien ac, tincidunt diam. Quisque et risus elit. Nunc imperdiet augue
                            justo. Aenean et nisi placerat, tincidunt arcu vitae, aliquam justo. Pellentesque
                            sodales vulputate molestie. Nullam fringilla posuere blandit. Maecenas ultrices
                            vel sapien a mattis.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};
