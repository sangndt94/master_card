// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { FeatureFlagProvider } from "../FeatureFlagContext";
import Feature from "../Feature";

describe("Feature", () => {
    const NewComponent = () => <div>NEW</div>;

    const versions = {
        1: { featureA: true, featureB: false, featureC: 42 },
    };

    it("should render the children if the flag value is matching", () => {
        const rendered = mount(
            <FeatureFlagProvider versions={versions} initialVersion="3">
                <Feature flag="featureC" value={42}>
                    <NewComponent />
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(rendered.find(NewComponent)).toExist();
    });

    it("should not render the children if the flag value is not matching", () => {
        const rendered = mount(
            <FeatureFlagProvider versions={versions} initialVersion="3">
                <Feature flag="featureC" value={40}>
                    <NewComponent />
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(rendered.find(NewComponent)).not.toExist();
    });

    it("should render the children if the flag value is not specified and the featureFlag is true", () => {
        const rendered = mount(
            <FeatureFlagProvider versions={versions} initialVersion="3">
                <Feature flag="featureA">
                    <NewComponent />
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(rendered.find(NewComponent)).toExist();
    });

    it("should not render the children if the flag value is not specified and the featureFlag is false", () => {
        const rendered = mount(
            <FeatureFlagProvider versions={versions} initialVersion="3">
                <Feature flag="featureB">
                    <NewComponent />
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(rendered.find(NewComponent)).not.toExist();
    });

    it("should not render the children if the flag value is not specified and the featureFlag not boolean", () => {
        const rendered = mount(
            <FeatureFlagProvider versions={versions} initialVersion="3">
                <Feature flag="featureC">
                    <NewComponent />
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(rendered.find(NewComponent)).not.toExist();
    });
});
