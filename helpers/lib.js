class Library{
    convertToDate(stringDate){
        let dateValues = stringDate.split('/');
        let day = Number(dateValues[0]);
        let month = dateValues[1] -1;
        let year = dateValues[2];
        return new Date(year, month, day);
    }
}

module.exports = new Library();