let args = ["--window-size=1920,1080"]

if (process.argv.indexOf("--headless") > -1) args.push("--headless=new")
if (process.argv.indexOf("--debug") > -1) args.push("--auto-open-devtools-for-tabs")

exports.config = {
    specs: ["./**/*.test.js"],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
            browserName: "chrome",
            "goog:chromeOptions": { args },
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
    services: ["ui5"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: process.argv.indexOf("--debug") > -1 ? 600000 : 60000
    }
}
