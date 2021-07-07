export const parser = (data: string) => {
  let allRows = data.split(/\r?\n|\r/);
  let RowDividedByCell = allRows.map((x) => x.split(','));
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
