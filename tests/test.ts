import { AccountReport } from "../types/AccountReport";
import { Entry } from "../types/Entry";
import CAMT from "../index";

const fs = require('fs');
const path = require('path');

describe('camt.052', () => {
    let camt: string;
    let accreport: AccountReport;
    let entries: Array<Entry>;

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
            it('Account should have basic properties', function () {
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

        describe('Report should have a entries', function () {
            beforeEach(() => {
                entries = accreport.report.entries;
            })

            it('Entries should exist all', function () {
                expect(entries.length).toEqual(3);
            });

            it('Entry[0] should be valid', function () {
                const entry = entries[0];
                expect(entry).toBeDefined();
                expect(entry.reference).toBeUndefined();
                expect(entry.amount.currency).toEqual('EUR');
                expect(entry.amount.value).toEqual('4.02');
                expect(entry.creditdebitIndicator).toEqual('DBIT');
                expect(entry.bookindDate.date).toEqual('2019-11-08');
                expect(entry.accountServiceRef).toEqual('NONREF');
                expect(entry.additionalEntryInfo).toEqual('TRANSFER');

                //Check details
                expect(entry.entryDetails.transactionDetails).toBeDefined();

                //Transaction parties
                expect(entry.entryDetails.transactionDetails.relatedParties).toBeDefined();
                expect(entry.entryDetails.transactionDetails.relatedParties.debtorAccount.id.iban).toEqual('DE86999999999999999999');
                expect(entry.entryDetails.transactionDetails.relatedParties.creditorAccount.id.iban).toEqual('HR9123912345670329373');
                expect(entry.entryDetails.transactionDetails.relatedParties.debtorAccount.id.iban).toEqual('DE86999999999999999999');
                expect(entry.entryDetails.transactionDetails.relatedParties.creditor.name).toEqual('Creditor Name');
                expect(entry.entryDetails.transactionDetails.relatedParties.ultimateCreditor.name).toEqual('Ultimate Creditor Name');
                expect(entry.entryDetails.transactionDetails.relatedParties.debtor.name).toEqual('Debtor Name');
                expect(entry.entryDetails.transactionDetails.relatedParties.ultimateDebtor.name).toEqual('Ultimate Debtor Name');

                //Verwendungszweck
                expect(entry.entryDetails.remittanceInformation.unstructured[0]).toEqual('COUNT        1');
            });
        });
    });
});