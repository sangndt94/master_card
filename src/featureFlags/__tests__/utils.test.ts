// (C) 2019 GoodData Corporation
import { getEffectiveFeatureFlags } from "../utils";

describe("getEffectiveFeatureFlags", () => {
    it("should return an empty object for empty input", () => {
        const actual = getEffectiveFeatureFlags({}, "2");
        expect(actual).toEqual({});
    });

    it("should return a copy of the input if it is only one version", () => {
        const actual = getEffectiveFeatureFlags(
            {
                "1": {
                    featureA: true,
                },
            },
            "1",
        );
        expect(actual).toEqual({
            featureA: true,
        });
    });

    it("should merge two versions", () => {
        const actual = getEffectiveFeatureFlags(
            {
                "1": {
                    featureA: true,
                    featureC: true,
                },
                "2": {
                    featureA: false,
                    featureB: true,
                },
            },
            "2",
        );
        expect(actual).toEqual({
            featureA: false,
            featureB: true,
            featureC: true,
        });
    });

    it("should merge two versions in wrong order", () => {
        const actual = getEffectiveFeatureFlags(
            {
                "2": {
                    featureA: false,
                    featureB: true,
                },
                "1": {
                    featureA: true,
                },
            },
            "2",
        );
        expect(actual).toEqual({
            featureA: false,
            featureB: true,
        });
    });

    it("should ignore versions > effective version if specified", () => {
        const actual = getEffectiveFeatureFlags(
            {
                "1": {
                    featureA: true,
                },
                "2": {
                    featureA: false,
                    featureB: true,
                },
                "3": {
                    featureC: true,
                },
            },
            "2",
        );
        expect(actual).toEqual({
            featureA: false,
            featureB: true,
        });
    });

    it("should replace non-scalar values", () => {
        const actual = getEffectiveFeatureFlags(
            {
                "1": {
                    featureA: [1, 2],
                    featureB: 4,
                },
                "2": {
                    featureA: [3, 4],
                },
            },
            "2",
        );
        expect(actual).toEqual({
            featureA: [3, 4],
            featureB: 4,
        });
    });
});
