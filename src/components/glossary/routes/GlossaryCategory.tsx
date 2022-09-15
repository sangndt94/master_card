// (C) 2020 GoodData Corporation
import React from "react";
import GlossaryCard from "../GlossaryCard";
import { glossaryContentGlossary } from "../GlossaryContent";

const GlossaryCategory: React.FC = () => {
    return <GlossaryCard contentGroup={glossaryContentGlossary} />;
};

export default GlossaryCategory;
