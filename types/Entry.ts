export class Entry {
    constructor(private element: Element|null) { }

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
}