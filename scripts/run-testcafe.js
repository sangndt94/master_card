#!/usr/bin/env node

const createTestCafe = require("testcafe");

const CI_CONCURRENCY = 4;
const LOCAL_CONCURRENCY = 4;
const ASSERTION_TIMEOUT = 20000;
const SELECTOR_TIMEOUT = 90000;
const WINDOW_WIDTH = 1920;
const WINDOW_HEIGHT = 1080;
const CHROME_HEADLESS_DOCKER = `chrome:headless --window-size='${WINDOW_WIDTH},${WINDOW_HEIGHT}' --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-breakpad --disable-client-side-phishing-detection --disable-component-update --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=site-per-process --disable-hang-monitor --disable-infobars --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-sync --disable-translate --disable-web-resource --enable-automation --metrics-recording-only --mute-audio --no-first-run --no-sandbox --safebrowsing-disable-auto-update`;
const CHROME_HEADLESS_LOCAL = `chrome:headless --window-size='${WINDOW_WIDTH},${WINDOW_HEIGHT}' --no-sandbox`;
const CHROME_LOCAL = `chrome --window-size='${WINDOW_WIDTH},${WINDOW_HEIGHT}' --no-sandbox --disable-background-timer-throttling`;
const CAPTURE_CI_PATH = "_screenshots";
const CAPTURE_BASE_PATTERN = "${DATE}_${TIME}/${TEST_ID}_${FIXTURE}/${RUN_ID}/${FILE_INDEX}_${TEST}";
const SCREENSHOT_PATTERN = `${CAPTURE_BASE_PATTERN}.png`;
const VIDEO_PATTERN = `${CAPTURE_BASE_PATTERN}.mp4`;
const REPORTER_CONFIG = [
    {
        name: "spec",
    },
    {
        name: "xunit",
        output: "ci/results/testcafe-results.xml",
    },
];

let testcafe = null;

createTestCafe("localhost")
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();
        const targetVersion = process.env.TEST_TARGET_VERSION || 1;
        const mode = process.env.TEST_MODE;

        // For some reason testcafe has problems using globstar so we need to specify
        // maximum directory depth, otherwise it just picks up tests in the deepest directory.
        let TESTS_PATH = "test/**/**/sanity/*_test*";
        if (mode === 'checklist' || mode === 'checklist-visual') {
            TESTS_PATH = "test/**/**/checklist/*_test*";
        }

        if (process.env.TEST_PATH) {
            TESTS_PATH = process.env.TEST_PATH;
        }

        const runnerBase = runner
            .filter((_, __, ___, ____, fixtureMeta) => {
                const { version } = fixtureMeta;
                return version <= targetVersion;
            })
            .src([TESTS_PATH])
            .reporter(REPORTER_CONFIG);

        if (mode === "ci" || mode === "checklist") {
            return runnerBase
                .browsers([CHROME_HEADLESS_DOCKER])
                .screenshots(CAPTURE_CI_PATH, true, SCREENSHOT_PATTERN)
                .concurrency(CI_CONCURRENCY)
                .run({
                    assertionTimeout: ASSERTION_TIMEOUT,
                    selectorTimeout: SELECTOR_TIMEOUT,
                    quarantineMode: true,
                });
        }

        if (mode === "ci-video") {
            return runnerBase
                .browsers([CHROME_HEADLESS_DOCKER])
                .screenshots(CAPTURE_CI_PATH, true, SCREENSHOT_PATTERN)
                .concurrency(CI_CONCURRENCY)
                .video(CAPTURE_CI_PATH, {
                    failedOnly: true,
                    singleFile: false,
                    pathPattern: VIDEO_PATTERN,
                })
                .run({
                    assertionTimeout: ASSERTION_TIMEOUT,
                    selectorTimeout: SELECTOR_TIMEOUT,
                    quarantineMode: true,
                });
        }

        if (mode === "visual" || mode === "checklist-visual") {
            console.log("Starting TestCafe in visual-local mode without concurrency.");
            return runnerBase.browsers([CHROME_LOCAL]).run({
                assertionTimeout: ASSERTION_TIMEOUT,
                selectorTimeout: SELECTOR_TIMEOUT,
                quarantineMode: true,
                debugOnFail: true,
            });
        }

        if (mode === "video") {
            console.log(
                `Starting TestCafe in local mode with concurrency ${LOCAL_CONCURRENCY} and video recording.`,
            );
            return runnerBase
                .browsers([CHROME_HEADLESS_LOCAL])
                .concurrency(LOCAL_CONCURRENCY)
                .video(CAPTURE_CI_PATH, {
                    failedOnly: true,
                    singleFile: false,
                    pathPattern: VIDEO_PATTERN,
                })
                .run({
                    assertionTimeout: ASSERTION_TIMEOUT,
                    selectorTimeout: SELECTOR_TIMEOUT,
                    quarantineMode: true,
                    debugOnFail: true,
                });
        }

        console.log(`Starting TestCafe in local mode with concurrency ${LOCAL_CONCURRENCY}.`);
        return runnerBase
            .browsers([CHROME_HEADLESS_LOCAL])
            .concurrency(LOCAL_CONCURRENCY)
            .run({
                assertionTimeout: ASSERTION_TIMEOUT,
                selectorTimeout: SELECTOR_TIMEOUT,
                quarantineMode: true,
            });
    })
    .then(failedCount => {
        testcafe.close();
        // To modify exit code to 1 at jenkin-ii
        // Don't modify at checklist
        if (failedCount > 0 && process.env.TEST_MODE !== "checklist") {
            process.exit(1);
        }
    })
    .catch(e => {
        console.error(e.message);
        testcafe.close();
        process.exit(1);
    });
