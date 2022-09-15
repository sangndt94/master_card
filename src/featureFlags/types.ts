// (C) 2019 GoodData Corporation
export interface IVersionSpecification {
    [flagName: string]: any;
}

export interface IVersionList {
    [versionName: string]: IVersionSpecification;
}
