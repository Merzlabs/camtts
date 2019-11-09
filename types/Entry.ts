import { CAMTElement } from "./Base";

export class Entry extends CAMTElement {
    get reference() {
        return this.element?.getElementsByTagName('NtryRef')[0]?.textContent;
    }

    get amount() {
        const value = this.element?.getElementsByTagName('Amt')[0]?.textContent;
        const currency = this.element?.getElementsByTagName('Amt')[0]?.getAttribute('Ccy');
        return {value, currency};
    }

    get creditdebitIndicator() {
        return this.element?.getElementsByTagName('CdtDbtInd')[0]?.textContent;
    }

    get bookindDate() {
        const bookingDate = this.element?.getElementsByTagName('BookgDt')[0]
        return {date: bookingDate?.getElementsByTagName('Dt')[0]?.textContent};
    }

    get accountServiceRef() {
        return this.element?.getElementsByTagName('AcctSvcrRef')[0]?.textContent;
    }

    get additionalEntryInfo() {
        return this.element?.getElementsByTagName('AddtlNtryInf')[0]?.textContent;
    }

    get entryDetails(): EntryDetails {
        return new EntryDetails(this.element?.getElementsByTagName('NtryDtls')[0]);
    }
}

export class EntryDetails extends CAMTElement {

    get transactionDetails(): TransactionDetails {
        return new TransactionDetails(this.element?.getElementsByTagName('TxDtls')[0]);
    }
}

export class TransactionDetails extends CAMTElement {

    get relatedParties(): RelatedParties {
        return new RelatedParties(this.element?.getElementsByTagName('RltdPties')[0]);
    }
}

export class RelatedParties extends CAMTElement {

    get debitorAccount() {
        const acc = this.element?.getElementsByTagName('DbtrAcct')[0];
        const iban = acc?.getElementsByTagName('Id')[0]?.getElementsByTagName('IBAN')[0]?.textContent;

        return {id: {iban}};
    }

    get creditorAccount() {
        const acc = this.element?.getElementsByTagName('CdtrAcct')[0];
        const iban = acc?.getElementsByTagName('Id')[0]?.getElementsByTagName('IBAN')[0]?.textContent;

        return { id: { iban } };
    }
}