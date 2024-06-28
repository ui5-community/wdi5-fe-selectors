async function pressTile(name) {
  const control = await browser.asControl({
    selector: {
      controlType: "sap.m.GenericTile",
      properties: {
        header: name
      }
    }
  });
  await control.press()
}

async function searchFor(text) {
  await browser.asControl({
    selector: {
      controlType: "sap.m.SearchField",
      interaction: {
        idSuffix: "I"
      }
    }
  }).enterText(text)
}

async function performStandardAction( name ) {  
  const control = await browser.asControl({
    selector: {
      controlType: "sap.m.Button",
      interactable: true,
      id: new RegExp(`.*\:\:StandardAction\:\:${name}\$`)
    }
  });
  await control.press();
}

async function setFieldValue( name, value ) {
  const control = await browser.asControl({
    selector: {
      controlType: "sap.m.Input",
      interaction: "root",
      labelFor: {
        text: name
      }
    }
  });
  await control.setValue(value);
}

async function openValueHelpForField( name ) {
  const control = await browser.asControl({
    selector: {
      controlType: "sap.m.Input",
      labelFor: {
        text: name
      }
    }
  });
  await control.press();
}

async function _findTableWithTitle(title, controlType, opt={}) {
  let { searchOpenDialogs } = opt;
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

async function chooseRowInValueHelpDialogTable( tableTitle, rowNumber ) {
  let table = await _findTableWithTitle(tableTitle, "sap.ui.table.Table", {searchOpenDialogs:true});
  //let rows = await table.getAggregation('rows');
  //let cells = await rows[rowNumber].getAggregation('cells');
  //let id = await cells[0].getId();
  let id = await table.getId()+`-rows-row${rowNumber}-col0`;
  await tapOnId(id);
}

async function navigateBack() {
  const control = await browser.asControl({
    selector: {
      controlType: 'sap.ushell.ui.shell.ShellHeadItem',
      interactable: true,
      id: 'backBtn'
    }
  });
  await control.press();
}

async function tapOnId(id) {
  await browser.executeScript('$("#"+$.escapeSelector(arguments[0])).trigger("tap")',[id]);
  await browser.waitForUI5();
}

module.exports = {
  pressTile,
  searchFor,
  performStandardAction,
  setFieldValue,
  openValueHelpForField,
  chooseRowInValueHelpDialogTable,
  navigateBack,
}
