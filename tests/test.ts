import { AccountReport } from "../types/AccountReport";
import { CAMT } from "..";

const fs = require('fs');
const path = require('path');

describe('camt.052', () => {
    let camt: string;
    
    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8')
    })
    
    
    it('parse should not return a result', function () {
        const report = CAMT.parse(camt);
        console.log(report.groupHeader.messageId);
        expect(report).toBeDefined();
    });
});