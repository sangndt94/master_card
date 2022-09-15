// (C) 2020 GoodData Corporation
import React from "react";
import GlossaryCard from "../GlossaryCard";
import { glossaryContentCalculations } from "../GlossaryContent";

const GlossaryCalculations: React.FC = () => {
    return <GlossaryCard contentGroup={glossaryContentCalculations} />;
};

export default GlossaryCalculations;
