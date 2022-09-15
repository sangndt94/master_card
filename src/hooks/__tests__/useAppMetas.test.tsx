// (C) 2019 GoodData Corporation
import React from "react";
import { mount } from "enzyme";
import { FeatureFlagProvider } from "../../featureFlags/FeatureFlagContext";
import useAppMetas from "../useAppMetas";
import { IAppMeta } from "../../types";
import { FilterStateProvider } from "../../apps/fi-squared/contexts/FilterStateContext";
import { ISSUER_VIEW, ACQUIRER_VIEW } from "../../constants";
import noop from "lodash/noop";

const testActiveVersions = {
    1: {
        available: true,
    },
};

const testComponent = (MockComponent) => {
    mount(
        <FeatureFlagProvider versions={testActiveVersions} initialVersion="1">
            <MockComponent />
        </FeatureFlagProvider>,
    );
};

const testAppMeta = {
    projectRegexp: /^\s*\[FII_X_P\]\s*/,
    projectIdentifier: "fii", // needs to be same as in appMetas
    getValidProjects: noop as any,
    getProjectTitle: noop as any,
    routeBase: "/fii",
    requiredFeatureFlags: ["available"],
    name: "test",
    FilterStateProvider,
    routeDefinitions: [],
    relevantFor: [ISSUER_VIEW, ACQUIRER_VIEW],
};

describe("createUseProjectId", () => {
    it("should return default app metas", () => {
        const MockComponent = () => {
            const appMetas = useAppMetas();
            expect(appMetas).toBe(appMetas);
            return null;
        };

        testComponent(MockComponent);
    });
    it("should return custom app metas", () => {
        const MockComponent = () => {
            const customAppMetas = [];
            const appMetas = useAppMetas(customAppMetas);
            expect(appMetas).toEqual(customAppMetas);
            return null;
        };

        testComponent(MockComponent);
    });
    it("should only return app metas which feature flag requirements are met", () => {
        const MockComponent = () => {
            const customAppMetas: IAppMeta[] = [
                testAppMeta,
                {
                    ...testAppMeta,
                    name: "test without feature flag requirements",
                    requiredFeatureFlags: undefined,
                },
                {
                    ...testAppMeta,
                    name: "test with an unavailable feature flag",
                    requiredFeatureFlags: ["unavailable", "available"],
                },
            ];
            const expected: IAppMeta[] = [
                testAppMeta,
                {
                    ...testAppMeta,
                    name: "test without feature flag requirements",
                    requiredFeatureFlags: undefined,
                },
            ];
            const appMetas = useAppMetas(customAppMetas);
            expect(appMetas).toEqual(expected);
            return null;
        };

        testComponent(MockComponent);
    });
});
