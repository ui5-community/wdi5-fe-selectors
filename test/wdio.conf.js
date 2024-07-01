exports.config = {
    specs: ["./**/*.test.js"],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
            //
            browserName: "chrome",
            "goog:chromeOptions": {
                args:
                    process.argv.indexOf("--headless") > -1
                        ? ["--headless=new"]
                        : process.argv.indexOf("--debug") > -1
                            ? ["window-size=1440,800", "--auto-open-devtools-for-tabs"]
                            : ["window-size=1440,800"]
            },
            acceptInsecureCerts: true,
            "wdi5:authentication": {
                provider: "BasicAuth",
                basicAuthUrls: [`http://localhost:8080/odata/v4/admin/Books`]
            }
        }
    ],
    logLevel: "error",
    bail: 0,
    baseUrl: "http://localhost:8080/",
    waitforTimeout: 10000,
    connectionRetryTimeout: process.argv.indexOf("--debug") > -1 ? 1200000 : 120000,
    connectionRetryCount: 3,
    services: [
        "ui5"
    ],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: process.argv.indexOf("--debug") > -1 ? 600000 : 60000
    }
}
