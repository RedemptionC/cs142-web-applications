"use strict";

class TableTemplate {
  /**
   * fillIn first examine and process the header row of the table,replace any placeholder
   * using key-value pair in dict.If columnName is specified,it should do the same thing
   * for placeholders in this column. If not specified, if should process the whole table.
   * @param {string} tableID
   * @param {object} dict
   * @param {string} columnName
   */
  static fillIn(tableID, dict, columnName) {
    let tableElem = document.getElementById(tableID);

    // process the table headers
    let columnNameElems = tableElem.rows[0].cells;
    for (let columnNameElem of columnNameElems) {
      columnNameElem.textContent = new window.Cs142TemplateProcessor(
        columnNameElem.textContent
      ).fillIn(dict);
    }
    if (columnName === undefined) {
      for (let i = 1; i < tableElem.rows.length; i++) {
        for (let j = 0; j < tableElem.rows[i].cells.length; j++) {
          let template = tableElem.rows[i].cells[j].textContent;
          tableElem.rows[i].cells[j].textContent =
            new window.Cs142TemplateProcessor(template).fillIn(dict);
        }
      }
    } else {
      for (let i = 1; i < tableElem.rows.length; i++) {
        for (let j = 0; j < tableElem.rows[i].cells.length; j++) {
          if (tableElem.rows[0].cells[j].textContent !== columnName) {
            continue;
          }
          let template = tableElem.rows[i].cells[j].textContent;
          tableElem.rows[i].cells[j].textContent =
            new window.Cs142TemplateProcessor(template).fillIn(dict);
        }
      }
    }
    tableElem.style.visibility = "visible";
  }
}
