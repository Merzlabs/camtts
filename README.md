# CAMT TS
## camt.052 parser in Typescript

**:warning: API work in progress**

Based on the SEPA specs found [here](http://www.ebics.de/spezifikation/dfue-abkommen-anlage-3-formatstandards/)

## Developemt

Adding new methods to classes for getting tags from XML elements is easily achievable. Just use the Visual Studio Code snippet in this project. Type `c-get` and a new code snippet will appear. The cursor will automatically position at the method name and swich to the XML tag with *TAB*.

### Snippets for quick new parsings

* `c-get` Simple tag getter
* `c-type` Parse new type instead of simple text

## Element

`CAMTElement`: Base class for all objects below 'document'.
