import { Entry } from "./Entry";
import { CAMTElement } from "./Base";

export class Report extends CAMTElement {

    get id() {
        return this.element?.getElementsByTagName('Id')[0]?.textContent;
    }

    get electronicSequenceNumber() {
        return this.element?.getElementsByTagName('ElctrncSeqNb')[0]?.textContent;
    }

    get creationDateTime() {
        return this.element?.getElementsByTagName('CreDtTm')[0]?.textContent;
    }

    get account(): Account {
        return new Account(this.element?.getElementsByTagName('Acct')[0]);
    }

    get entries(): Array<Entry> {
        let entries: Array<Entry> = [];
        const elements = this.element?.getElementsByTagName('Ntry');
        if (typeof elements !== "undefined") {
            for (let i = 0; i < elements.length; i++) {
                const element = elements.item(i);
                if (element !== null) {
                    entries.push(new Entry(element));
                }
            }
        }

        return entries;
    }
}

export class Account extends CAMTElement {

    get id() {
        const idElem = this.element?.getElementsByTagName('Id')[0];
        return { iban: idElem?.getElementsByTagName('IBAN')[0]?.textContent };
    }

    get currency() {
        return this.element?.getElementsByTagName('Ccy')[0]?.textContent;
    }

    get servicer(): Servicer {
        return new Servicer(this.element?.getElementsByTagName('Svcr')[0]);
    }
}

export class Servicer extends CAMTElement {

    get financialInstitutionId(): FinancialInstitutionId {
        return new FinancialInstitutionId(this.element?.getElementsByTagName('FinInstnId')[0]);
    }
}

export class FinancialInstitutionId extends CAMTElement {

    get bic() {
        return this.element?.getElementsByTagName('BIC')[0]?.textContent;
    }

    get name() {
        return this.element?.getElementsByTagName('Nm')[0]?.textContent;
    }
}