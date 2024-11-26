console.log(`HyperFormula version: ${HyperFormula.version}`,
  'color: blue; font-weight: bold');

const hfoptions = {
    licenseKey: 'gpl-v3'
};

// define the data
const tableData = [['10', '20', '=SUM(A1:C1)']];

// build an instance with defined options and data 
const hfInstance = HyperFormula.buildFromArray(tableData, hfoptions);

// call getCellValue to get the calculation results
const mySum = hfInstance.getCellValue({ col: 1, row: 0, sheet: 0 });

// this outputs the result in the browser's console
console.log(mySum);

// Add a new sheet and get its id.
const sheetName = hfInstance.addSheet('main');
const sheetId = hfInstance.getSheetId(sheetName);

// Fill the HyperFormula sheet with data.
hfInstance.setCellContents(
  {
    row: 0,
    col: 0,
    sheet: sheetId,
  },
  tableData
);

/**
 * Fill the HTML table with data.
 */
function renderTable() {
  const theadDOM = document.querySelector('.example thead');
  const tbodyDOM = document.querySelector('.example tbody');
  const { height, width } = hfInstance.getSheetDimensions(sheetId);
  let newTheadHTML = '';
  let newTbodyHTML = '';

  for (let row = -1; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (row === -1) {
        newTheadHTML += `<th><span></span></th>`;

        continue;
      }

      const cellAddress = { sheet: sheetId, col, row };
      const cellHasFormula = hfInstance.doesCellHaveFormula(cellAddress);
      let cellValue = '';

      if (!hfInstance.isCellEmpty(cellAddress) && !cellHasFormula) {
        cellValue = hfInstance.getCellValue(cellAddress);
      } else {
        cellValue = hfInstance.getCellFormula(cellAddress);
      }

      newTbodyHTML += `<td><span>
      ${cellValue}
      </span></td>`;
    }
  }

  tbodyDOM.innerHTML = `<tr>${newTbodyHTML}</tr>`;
  theadDOM.innerHTML = newTheadHTML;
}


// Render the table.
renderTable();