// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { HashRouter as Router } from "react-router-dom";
import noop from "lodash/noop";
import AppPicker, { Tile, viewOptions } from "../AppPicker";
import { ACQUIRER_VIEW, ISSUER_VIEW } from "../../../constants";

const sampleProjects = ["digital", "acquirer premium", "acquirer standard", "issuer standard"];

const sampleTiles = [
    {
        isShown: (projects) => projects.filter((project) => project.includes("digital")).length > 0,
        types: [ISSUER_VIEW, ACQUIRER_VIEW],
        route: "/digital",
        title: "Digital",
    },
    {
        // this one is not in sampleProjects
        isShown: (projects) => projects.filter((project) => project.includes("issuer premium")).length > 0,
        types: [ISSUER_VIEW],
        route: "/issuer-benchmarking-premium",
        title: "Issuer Benchmarking Premium",
    },
    {
        isShown: (projects) => projects.filter((project) => project.includes("issuer standard")).length > 0,
        types: [ISSUER_VIEW],
        route: "/issuer-benchmarking-standard",
        title: "Issuer Benchmarking Standard",
    },
    {
        isShown: (projects) => projects.filter((project) => project.includes("acquirer premium")).length > 0,
        types: [ACQUIRER_VIEW],
        route: "/acquirer-benchmarking-premium",
        title: "Acquirer Benchmarking Premium",
    },
    {
        isShown: (projects) => projects.filter((project) => project.includes("acquirer standard")).length > 0,
        types: [ACQUIRER_VIEW],
        route: "/acquirer-benchmarking-standard",
        title: "Acquirer Benchmarking Standard",
    },
];

const issuerOption = viewOptions[0];
const acquirerOption = viewOptions[1];

describe("AppPicker", () => {
    it("should render available tiles", () => {
        const mounted = mount(
            <Router>
                <AppPicker
                    tileDefinitions={sampleTiles}
                    projects={sampleProjects}
                    selectedViewOption={acquirerOption}
                    setSelectedViewOption={noop}
                />
            </Router>,
        );
        expect(mounted.find(Tile).map((element) => element.prop("title"))).toEqual([
            "Digital",
            "Acquirer Benchmarking Premium",
            "Acquirer Benchmarking Standard",
        ]);
    });

    it("should pre-select selectedViewOption", () => {
        const mounted = mount(
            <Router>
                <AppPicker
                    tileDefinitions={sampleTiles}
                    projects={sampleProjects}
                    selectedViewOption={acquirerOption}
                    setSelectedViewOption={noop}
                />
            </Router>,
        );
        expect(mounted.find("Select").first().prop("value")).toMatchObject({ value: ACQUIRER_VIEW });
    });

    it("should fire setSelectedViewOption with the option that has the most tiles if selectedViewOption is null", () => {
        const setSelectedViewOption = jest.fn();
        mount(
            <Router>
                <AppPicker
                    tileDefinitions={sampleTiles}
                    projects={sampleProjects}
                    setSelectedViewOption={setSelectedViewOption}
                />
            </Router>,
        );

        expect(setSelectedViewOption).toHaveBeenLastCalledWith(acquirerOption);
    });

    it("should fire setSelectedViewOption when user switches view type", () => {
        const setSelectedViewOption = jest.fn();
        const mounted = mount(
            <Router>
                <AppPicker
                    tileDefinitions={sampleTiles}
                    projects={sampleProjects}
                    selectedViewOption={acquirerOption}
                    setSelectedViewOption={setSelectedViewOption}
                />
            </Router>,
        );

        const input = mounted.find("Select input").first();
        input.simulate("change", { target: { value: "Issuer" } });
        input.simulate("keyDown", { key: "Enter" });

        expect(setSelectedViewOption).toHaveBeenLastCalledWith(issuerOption);
    });

    it("should full-text filter tiles", () => {
        const mounted = mount(
            <Router>
                <AppPicker
                    tileDefinitions={sampleTiles}
                    projects={sampleProjects}
                    selectedViewOption={acquirerOption}
                    setSelectedViewOption={noop}
                />
            </Router>,
        );

        const input = mounted.find(".textFilter input").first();
        input.simulate("change", { target: { value: "Digital" } });

        expect(mounted.find(Tile).map((element) => element.prop("title"))).toEqual(["Digital"]);
    });
});
