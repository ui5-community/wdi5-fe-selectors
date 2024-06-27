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

module.exports = {
  pressTile,
  searchFor,
}
