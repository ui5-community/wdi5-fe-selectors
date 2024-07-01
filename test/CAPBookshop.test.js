const { wdi5 } = require('wdio-ui5-service');
const lib = require('wdi5-fe-selectors');

describe('samples', () => {

    it('should log', () => {
        const logger = wdi5.getLogger();
        logger.log('hello world!');
    })

    it('go home', async () => {
        await lib.goHome();
        await _sleep(2 * 1000)
    })

    it('new book', async () => {
        await lib.goHome();
        await lib.pressTile('Manage Books');
        await lib.performStandardAction('Create');
        await lib.setFieldValue('Title', 'WDI5');
        await lib.openValueHelpForField('Author');
        await lib.chooseRowInValueHelpDialogTable('Items', 1);
        await lib.performStandardAction('Save');
        await lib.navigateBack();
        await lib.searchFor('WDI5');
        await _sleep(2 * 1000)
    })

    it('delete book', async () => {
        await lib.goHome();
        await lib.pressTile('Manage Books');
        await lib.selectRowInTable('Books', 0 );
        await lib.selectRowInTable('Books', 1 );
        await lib.performStandardAction('Delete');
        await lib.pressButtonInDialog('Delete');
        await _sleep(2 * 1000)
    })

})

function _sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
