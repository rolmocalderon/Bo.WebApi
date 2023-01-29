class Library{
    convertToDate(stringDate){
        let dateValues = stringDate.split('/');
        return new Date(dateValues[2], dateValues[1] -1, dateValues[0]);
    }
}

module.exports = new Library();