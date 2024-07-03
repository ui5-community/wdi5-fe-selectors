const { wdi5 } = require("wdio-ui5-service")

async function goHome() {
    await wdi5.goTo("#Shell-home")
}

async function pressTile(name) {
    const control = await browser.asControl({
        selector: {
            controlType: "sap.m.GenericTile",
            properties: {
                header: name
            }
        }
    })
    await control.press()
}

async function searchFor(text) {
    await browser
        .asControl({
            selector: {
                controlType: "sap.m.SearchField",
                interaction: {
                    idSuffix: "I"
                }
            }
        })
        .enterText(text)
}

async function performStandardAction(name) {
    const control = await browser.asControl({
        selector: {
            controlType: "sap.m.Button",
            interactable: true,
            id: new RegExp(`.*::StandardAction::${name}$`)
        }
    })
    await control.press()
}

async function setFieldValue(name, value) {
    const control = await browser.asControl({
        selector: {
            controlType: "sap.m.Input",
            interaction: "root",
            labelFor: {
                text: name
            }
        }
    })
    await control.setValue(value)
}

async function openValueHelpForField(name) {
    const control = await browser.asControl({
        selector: {
            controlType: "sap.m.Input",
            labelFor: {
                text: name
            }
        }
    })
    await control.press()
}

async function _findTableWithTitle(title, controlType, opt = {}) {
    const { searchOpenDialogs } = opt
    return await browser.asControl({
        selector: {
            controlType,
            searchOpenDialogs,
            interaction: "root",
            descendant: {
                controlType: "sap.m.Title",
                properties: {
                    text: {
                        regex: {
                            source: `^${title}`
                        }
                    }
                }
            }
        }
    })
}

async function chooseRowInValueHelpDialogTable(tableTitle, rowNumber) {
    const table = await _findTableWithTitle(tableTitle, "sap.ui.table.Table", { searchOpenDialogs: true })
    const id = (await table.getId()) + `-rows-row${rowNumber}-col0`
    await tapOnId(id)
    /* the following works but is too slow
    const rows = await table.getAggregation('rows');
    const cells = await rows[rowNumber].getAggregation('cells');
    await cells[0].press()
    */
}

async function selectRowInTable(tableTitle, targetRow) {
    const table = await _findTableWithTitle(tableTitle, "sap.m.Table")
    const items = await table.getItems()
    const checkbox = await items[targetRow].getMultiSelectControl()
    await checkbox.press()
}

async function getTableRowCount(tableTitle) {
    const table = await _findTableWithTitle(tableTitle, "sap.m.Table")
    const items = await table.getItems()
    return items.length
}

async function navigateBack() {
    const control = await browser.asControl({
        selector: {
            controlType: "sap.ushell.ui.shell.ShellHeadItem",
            interactable: true,
            id: "backBtn"
        }
    })
    await control.press()
}

async function pressButtonInDialog(text) {
    const control = await browser.asControl({
        selector: {
            controlType: "sap.m.Button",
            searchOpenDialogs: true,
            interactable: true,
            properties: {
                text
            }
        }
    })
    await control.press()
}

async function tapOnId(id) {
    await browser.executeScript('$("#"+$.escapeSelector(arguments[0])).trigger("tap")', [id])
    await browser.waitForUI5()
}

module.exports = {
    goHome,
    pressTile,
    searchFor,
    performStandardAction,
    setFieldValue,
    openValueHelpForField,
    chooseRowInValueHelpDialogTable,
    selectRowInTable,
    navigateBack,
    pressButtonInDialog,
    getTableRowCount
}
