export const parser = (data: string) => {
  //split by row
  let allRows = data.split(/\r?\n|\r/);

  //remove last character if break line
  for (let i = allRows.length - 1; i >= 0; i--) {
    if (/^\s*$/.test(allRows[i])) {
      allRows.splice(allRows.length - 1);
    } else {
      break;
    }
  }
  console.log(`we remove the last character of the folder because it was a break line`);

  //split by col
  let RowDividedByCell = allRows.map((x) => x.split(/,|;/));
  let keyObj = RowDividedByCell[0];

  let result = RowDividedByCell.filter((x, i) => i !== 0).map((x, i) => {
    let resultFinal = {};

    for (let j = 0; j < x.length; j++) {
      resultFinal[keyObj[j]] = x[j];
    }
    return resultFinal;
  });

  return result;
};
