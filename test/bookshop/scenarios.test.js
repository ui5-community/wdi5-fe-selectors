const { wdi5 } = require("wdio-ui5-service")
const lib = require("wdi5-fe-selectors")
const assert = require("assert")

describe("samples", () => {
    it("should log", () => {
        const logger = wdi5.getLogger()
        logger.log("hello world!")
    })

    it("go home", async () => {
        await lib.goHome()
    })

    it("new book", async () => {
        await lib.goHome()
        await lib.pressTile("Manage Books")
        const countBefore = await lib.getTableRowCount("Books")
        await lib.performStandardAction("Create")
        await lib.setFieldValue("Title", "WDI5")
        await lib.openValueHelpForField("Author")
        await lib.chooseRowInValueHelpDialogTable("Items", 1)
        await lib.performStandardAction("Save")
        await lib.navigateBack()
        const countAfter = await lib.getTableRowCount("Books")
        assert.equal(countAfter - countBefore, 1)
        await lib.searchFor("WDI5")
        const countLast = await lib.getTableRowCount("Books")
        assert.equal(countLast, 1)
    })

    it("delete book", async () => {
        await lib.goHome()
        await lib.pressTile("Manage Books")
        const countBefore = await lib.getTableRowCount("Books")
        await lib.selectRowInTable("Books", 0)
        await lib.selectRowInTable("Books", 1)
        await lib.performStandardAction("Delete")
        await lib.pressButtonInDialog("Delete")
        const countAfter = await lib.getTableRowCount("Books")
        assert.equal(countBefore - countAfter, 2)
    })
})
