const { wdi5 } = require('wdio-ui5-service');
const lib = require('wdi5-fe-selectors');

describe('samples', () => {

    it('should log', () => {
        const logger = wdi5.getLogger();
        logger.log('hello world!');
    })

    it('press tile', async () => {
        await lib.pressTile('Browse Books');
        await lib.searchFor('Catweazle');
        await _sleep(2 * 1000)
    })

})

function _sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
