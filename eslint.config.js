const { configs } = require("@eslint/js")

let cfg = {
    languageOptions: {
        sourceType: "commonjs",
        globals: {
            browser: true
        }
    }
}

module.exports = Object.assign(cfg, configs.recommended)
