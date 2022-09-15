import { Selector, t } from "testcafe";
import { loginAutoTestUserAndNavigate } from "../helpers/fixtureWithLogin";
import {
    applyFilter,
    addFilterValue,
    waitForChildFilterLoading,
    isErrorBy,
    assertAllFiltersExist,
    navigateTo,
    getVisualizationByIdentifier
} from "../helpers/pageUtils";

const testCid = "102575";

loginAutoTestUserAndNavigate("MO/TO Issuer", 1, "moto-issuer/overview");

const navGroups = [
    {
        title: "Overview",
        path: "moto-issuer/overview",
        visualizationIds: ["aaUiPk1Je4q5", "aahiQP4Ya986", "aaLiP2qWdjus", "abniQ3LtbRbD", "abeiPOKMfrZL", "acoiPyFLgYrD",
            "aa3jkiMNfqf6", "abdjifzKhamI", "abtjjBsGfaWy", "adRje73rf67E", "acdjgDmablCg", "abvjljJUdRPD",
            "abDjkxdyd7FB", "abdjlzX6go0w", "abOjj4BZfm4P", "abpjkxkJdq7B", "aa8jxrbpertK", "aaHjw5goica0"]
    },
    {
        title: "Performance Drivers",
        path: "moto-issuer/performance-drivers",
        visualizationIds: ["abDjy6Cnboal", "aaPjAL8jc0x4", "aarjOgfrfUea", "aaCjOgNtgFgm", "aa0oHJK0aSY7",
            "abffbJH8deZx", "achfb5jiiiGP", "adGe60PLgtTf", "aefe5QyPf1T0", "acJXDw6IhVyO",
            "abAXCYOpdouG", "ab4XD78FhZcA", "ab0XD7BdhX8v"]
    },
    {
        title: "Customer Insights",
        path: "moto-issuer/customer-insights",
        visualizationIds: ["acJo3atpbtDH", "aaRtpGtObwwD", "aalpduTZa0jz", "aaepe5lphqme",
            "aaEtBI3kcGOl", "abktG4kGiw4C", "abT5IXlEf1Te", "abC5Jbvdc5bM", "adm5FqTpeCoB", "acm5Ih3GcbO4",
            "acA5GxhfbUn7", "aamfaY6Yb37T", "aa2UfbBig36I"]
    },
    {
        title: "Top Industries Merchants By Spend",
        path: "moto-issuer/top-industries-merchants-by-spend",
        visualizationIds: ["aaG5O0ZvgbMz", "ab1DceG7fGip", "aaH70CLCcXYV"]
    },
    {
        title: "Top Industries Merchants by Transactions",
        path: "moto-issuer/top-industries-merchants-by-transactions",
        visualizationIds: ["aep5IPxEcMR6", "abuIM2tAfOHR", "aa79FVFRhSWB"]
    },
    {
        title: "Product Analysis",
        path: "moto-issuer/product-analysis",
        visualizationIds: ["aaRXW2fIfn8V", "aajX0SXzajTa", "aaBXYIgEfOcs",
            "aaD8ohucbSJS", "aao8qRr9d45C", "abp8tWEbbScV",
            "aaW8X4Xsddud", "abE8XdkjaRnD", "abO8wdpic0aF"]
    }
];

navGroups.forEach(navGroup => {
    test(`should render donut & combo chart of ${navGroup.title}`, async () => {
        await navigateTo(navGroup.path);
        await assertAllFiltersExist(["cidAndIca_parent", "cidAndIca_child", "country"]);
        await addFilterValue("cidAndIca_parent", testCid);
        await waitForChildFilterLoading("cidAndIca_child");
        await addFilterValue("country", "FRANCE");
        await applyFilter();

        const visualizationIDs = navGroup.visualizationIds;

        visualizationIDs.forEach(async visualizationID => {
            const visualization = getVisualizationByIdentifier(visualizationID);
            await t
                .expect(await visualization.exists)
                .ok()
                .expect(await isErrorBy(visualization))
                .notOk();
        })
    })
});
