# CAMT TS
## camt.052 parser in Typescript

**:warning: API work in progress**

Based on the SEPA speca found [here](http://www.ebics.de/spezifikation/dfue-abkommen-anlage-3-formatstandards/)

## Developemt

Adding new methods to classes to get tags from the XML element is pretty quick to do. Just use the Visual Studio Code snippet in this project. Type `c-get` and a new code snippet will appear. The cursor will automatically be at the method name and swich to the XML tag with *TAB*.

### Snippets for quick new parsings

* `c-get` Simple tag getter
* `c-constructor` New element constructor
* `c-type` Parse new type instead of simple text