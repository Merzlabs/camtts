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

    /**
     * Subject / Verwendungszweck
     */
    get remittanceInformation(): RemittanceInformation {
        return new RemittanceInformation(this.element?.getElementsByTagName('RmtInf')[0]);
    }
}

export class TransactionDetails extends CAMTElement {

    get relatedParties(): RelatedParties {
        return new RelatedParties(this.element?.getElementsByTagName('RltdPties')[0]);
    }
}

export class RelatedParties extends CAMTElement {

    /**
     * Financial institution for the creditor/ Zahlungsdienstleister des Debtors
     */
    get debitorAccount() {
        const acc = this.element?.getElementsByTagName('DbtrAcct')[0];
        const iban = acc?.getElementsByTagName('Id')[0]?.getElementsByTagName('IBAN')[0]?.textContent;

        return {id: {iban}};
    }

    /**
     * Debtor / Zahler
     */
    get debtor() {
        const acc = this.element?.getElementsByTagName('Dbtr')[0];
        const name = acc?.getElementsByTagName('Nm')[0]?.textContent;

        return { name };
    }

    /**
     * Ultimate debitor different from creditor / Abweichender Zahler
     */
    get ultimateDebtor() {
        const acc = this.element?.getElementsByTagName('UltmtDbtr')[0];
        const name = acc?.getElementsByTagName('Nm')[0]?.textContent;

        return { name };
    }

    /**
     *  ID of creditor account / Zahlungsdienstleister des Creditors
     */
    get creditorAccount() {
        const acc = this.element?.getElementsByTagName('CdtrAcct')[0];
        const iban = acc?.getElementsByTagName('Id')[0]?.getElementsByTagName('IBAN')[0]?.textContent;

        return { id: { iban } };
    }

    /**
     * Party to which amount of money is due / Einreicher der Lastschrift
     */
    get creditor() {
        const acc = this.element?.getElementsByTagName('Cdtr')[0];
        const name = acc?.getElementsByTagName('Nm')[0]?.textContent;

        return { name };
    }

    /**
     * Ultimate party to which an amount of money is due. / Konto des Lastschrifteinreichers
     */
    get ultimateCreditor() {
        const acc = this.element?.getElementsByTagName('UltmtCdtr')[0];
        const name = acc?.getElementsByTagName('Nm')[0]?.textContent;

        return { name };
    }
}

export class RemittanceInformation extends CAMTElement {

    get unstructured() {
        return Array.prototype.map.call(this.element?.getElementsByTagName('Ustrd'), (elem: Element) => {
            return elem.textContent;
        });
    }
}