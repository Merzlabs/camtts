import { AccountReport } from "./types/AccountReport";

export default class CAMT {

    static parse(toparse: string) {
        let parser: DOMParser;

        // Use native DOMParser in Browser and package in NodeJS
        if (typeof DOMParser === 'undefined') {
            const NodeParser = require('xmldom').DOMParser;
            parser = new NodeParser();
        } else {
            parser = new DOMParser();
        }

        const xml = parser.parseFromString(toparse, 'text/xml');

        //Support for camt.052 Bank to Customer Account Report
        const report = new AccountReport(xml);
        return report;
    }
}