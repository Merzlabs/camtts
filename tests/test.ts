import { AccountReport } from "../types/AccountReport";
import { CAMT } from "..";

const fs = require('fs');
const path = require('path');

describe('camt.052', () => {
    let camt: string;
    let accreport: AccountReport;
    
    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8')
    })
    
    it('parse should not return a result', function () {
        const report = CAMT.parse(camt);
        expect(report).toBeDefined();
    });


    describe('Account Report', () => {
        beforeEach(() => {
            accreport = CAMT.parse(camt);
        })

        it('GroupHeader should be valid', function () {
            expect(accreport.groupHeader).toBeDefined();
            expect(accreport.groupHeader.messageId).toEqual('camt52_GR');
            expect(accreport.groupHeader.creationDateTime).toEqual('2019-11-08T16:20:06.570Z');
        });

        it('Report should be valid', function () {
            const report = accreport.report;
            expect(report).toBeDefined();
            expect(report.id).toEqual('camt052');
            expect(report.electronicSequenceNumber).toEqual('00000');
            expect(report.creationDateTime).toEqual('2019-11-08T16:20:06.571Z');
        });

        describe('Report should have a valid account', function () {
            it('Account should have basic properties', function() {
                const account = accreport.report.account;
                expect(account).toBeDefined();
                expect(account.id.iban).toEqual('DE86999999999999999999');
                expect(account.currency).toEqual('EUR');
            });

            it('Account should have a valid Servicer', function () {
                const servicer = accreport.report.account.servicer;
                expect(servicer).toBeDefined();
                expect(servicer.financialInstitutionId.bic).toEqual('TESTDE99999');
                expect(servicer.financialInstitutionId.name).toEqual('Test');
            });
        });
    });
});