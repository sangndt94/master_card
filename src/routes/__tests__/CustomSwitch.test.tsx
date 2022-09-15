// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { MemoryRouter as Router, Route } from "react-router-dom";
import CustomSwitch from "../CustomSwitch";
import Route404 from "../Route404";
import { IRouteDefinition } from "../../types";

describe("CustomSwitch", () => {
    const routes: IRouteDefinition[] = [
        { path: "/a", component: jest.fn().mockReturnValue(<div />), title: "a" },
    ];

    it("should render a route", async () => {
        const wrapper = mount(
            <Router initialEntries={["/a"]}>
                <CustomSwitch routes={routes} NoMatchComponent={Route404} />
            </Router>,
        );
        expect(wrapper.find(Route).exists()).toBe(true);
        expect(wrapper.find(Route).props()).toEqual({
            path: routes[0].path,
            exact: false,
            component: routes[0].component,
        });
        expect(wrapper.find(Route404).exists()).toBe(false);
    });
    it("should render a NoMatchComponent if no routes would match", async () => {
        const wrapper = mount(
            <Router initialEntries={["/b"]}>
                <CustomSwitch routes={routes} NoMatchComponent={Route404} />
            </Router>,
        );
        expect(wrapper.find(Route).exists()).toBe(false);
        expect(wrapper.find(Route404).exists()).toBe(true);
    });
});
