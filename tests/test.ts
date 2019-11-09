import { AccountReport } from "../types/AccountReport";
import { CAMT } from "..";

const fs = require('fs');
const path = require('path');

describe('camt.052', () => {
    let camt: string;
    let report: AccountReport;
    
    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8')
    })
    
    it('parse should not return a result', function () {
        const report = CAMT.parse(camt);
        expect(report).toBeDefined();
    });


    describe('camt.052', () => {
        beforeEach(() => {
            report = CAMT.parse(camt);
        })

        it('GroupHeader should be valid', function () {
            expect(report.groupHeader).toBeDefined();
            expect(report.groupHeader.messageId).toEqual('camt52_GR');
            expect(report.groupHeader.creationDateTime).toEqual('2019-11-08T16:20:06.570Z');
        });

    });
});