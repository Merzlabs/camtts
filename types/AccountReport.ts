import { Report } from "./Report";

export class AccountReport {
    constructor(private doc:Document) {}

    get groupHeader() {
        return new GroupHeader(this.doc.getElementsByTagName('GrpHdr')[0]);
    }

    get report(): Report {
       return new Report(this.doc.getElementsByTagName('Rpt')[0]);
    }
}

export class GroupHeader {
    constructor(private element: Element) { }

    get messageId() {
        return this.element.getElementsByTagName('MsgId')[0]?.textContent;
    }

    get creationDateTime() {
        return this.element.getElementsByTagName('CreDtTm')[0]?.textContent;
    }
}