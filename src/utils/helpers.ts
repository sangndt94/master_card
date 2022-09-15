// (C) 2007-2019 GoodData Corporation
import { ILoadingState } from "../types";

export const defaultSourceState: ILoadingState = { isLoading: true, error: null, data: null };

export const delay = (delayTime = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delayTime);
    });
};
