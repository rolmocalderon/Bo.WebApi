function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }

  function getUniqueValues(rows){
    let values = [];
    for(let row of rows){
      let canPush = !values.find(value => value && value.date == row.date && value.name.toLowerCase() == row.name.toLowerCase())
      if(canPush){
        values.push(row);
      }
    }

    return values;
  }
  
  module.exports = {
    getOffset,
    emptyOrRows,
    getUniqueValues
  }