// (C) 2019 GoodData Corporation
import { useCallback } from "react";
import useProjectId from "./useProjectId";
import getElements from "../../../utils/getElements";
import { Model } from "@gooddata/react-components";
import usePromise from "../../../hooks/usePromise";

const quarterAttributeIdentifier = "date.aci81lMifn6q";
const currentPreviousQuarterAttributeLabel = "label.fi2.quarter";

const useQuarter = ({
    dateAttributeIdentifier = quarterAttributeIdentifier,
    filterAttributeIdentifier = currentPreviousQuarterAttributeLabel,
} = {}) => {
    const projectId = useProjectId();

    const task = useCallback(() => {
        if (projectId) {
            return getElements(projectId, dateAttributeIdentifier, {
                afm: {
                    attributes: [
                        {
                            localIdentifier: "date",
                            displayForm: {
                                identifier: dateAttributeIdentifier,
                            },
                        },
                    ],
                    filters: [Model.attributeFilter(filterAttributeIdentifier).in("current", "previous")],
                },
            });
        }
        return null;
    }, [projectId]);
    const { value } = usePromise(task);

    const [previousQuarter, currentQuarter] = value
        ? value.validElements.items.map((item) => item.element.title)
        : ["", ""];

    return {
        currentQuarter,
        previousQuarter,
        currentVsPreviousQuarter:
            previousQuarter !== "" && currentQuarter !== "" ? `${currentQuarter} vs ${previousQuarter}` : "",
    };
};

export default useQuarter;
