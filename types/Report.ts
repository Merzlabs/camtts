import { Entry } from "./Entry";

export class Report {
    constructor(private element: Element) { }

    get id() {
        return this.element.getElementsByTagName('Id')[0]?.textContent;
    }

    get electronicSequenceNumber() {
        return this.element.getElementsByTagName('ElctrncSeqNb')[0]?.textContent;
    }

    get creationDateTime() {
        return this.element.getElementsByTagName('CreDtTm')[0]?.textContent;
    }

    get account(): Account {
        return new Account(this.element.getElementsByTagName('Acct')[0]);
    }

    get entries(): Array<Entry> {
        let entries: Array<Entry> = [];
        const elements = this.element.getElementsByTagName('Ntry');
        for (let i = 0; i < elements.length; i++) {
            entries.push(new Entry(elements.item(i)));
        }

        return entries;
    }
}

export class Account {
    constructor(private element: Element) { }

    get id() {
        const idElem = this.element.getElementsByTagName('Id')[0];
        return { iban: idElem?.getElementsByTagName('IBAN')[0]?.textContent };
    }

    get currency() {
        return this.element.getElementsByTagName('Ccy')[0]?.textContent;
    }

    get servicer(): Servicer {
        return new Servicer(this.element.getElementsByTagName('Svcr')[0]);
    }
}

export class Servicer {
    constructor(private element: Element) { }

    get financialInstitutionId(): FinancialInstitutionId {
        return new FinancialInstitutionId(this.element.getElementsByTagName('FinInstnId')[0]);
    }
}

export class FinancialInstitutionId {
    constructor(private element: Element) { }

    get bic() {
        return this.element.getElementsByTagName('BIC')[0]?.textContent;
    }

    get name() {
        return this.element.getElementsByTagName('Nm')[0]?.textContent;
    }
}