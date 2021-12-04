function createClass(name, rules) {
    let style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!(style.sheet || {}).insertRule)
        (style.styleSheet || style.sheet).addRule(name, rules);
    else
        style.sheet.insertRule(name + "{" + rules + "}", 0);
}

function getTableColumnWidth(table, tableClassName, columnNum) {
    let columnWidth = table.querySelector(`.${tableClassName} thead tr td:nth-child(${columnNum})`);
    //  console.log(columnWidth);
    return columnWidth.offsetWidth;
}

function setColumnsChainBackground(tableClassName, chainLenght) {
    let targetTable = document.querySelector(`.${tableClassName}`);
    let startOffset = 0;
    for (i = 1; i <= chainLenght; i++) {
        createClass(`.${tableClassName} tr td:nth-child(${i}):not(thead )`, `position: sticky; background-color: #36BADF; border: solid 1px black;  left: ${startOffset}px; z-index: 1;`);
        createClass(`.${tableClassName} tr td:nth-child(${i}):before`, `
      position: absolute;
      content: " ";
      width: 100%;
      height: 100%;
      display: block;
      box-shadow: 1px 1px black, 1px -1px black, -1px -1px black;
      z-index: -1;
      top: 0;
      bottom: 0;
      right: 0;`);

        startOffset += getTableColumnWidth(targetTable, tableClassName, i);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setColumnsChainBackground('fat_cock', 2);
});