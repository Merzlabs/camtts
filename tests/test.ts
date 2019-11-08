const fs = require('fs');
const path = require('path');

describe('parse test', () => {
    let camt: string;
    
    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8')
    })
    
    
    it('read', function () {
        console.log(camt);

        expect(camt).toBeDefined();
    });
});