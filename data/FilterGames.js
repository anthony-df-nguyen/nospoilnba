import moment from 'moment'

const FilterGames = (array,receivedDate) => {
    //console.log(array)
    //console.log("🚀 ~ file: FilterGames.js ~ line 10 ~ FilterGames ~ receivedDate", receivedDate)
    let day = receivedDate.slice(-2);
    let month =  receivedDate.slice(5,7);
    let year =  receivedDate.slice(0,4);
    let parsed = moment(new Date(`${month}/${day}/${year}`)).format('l')
    let searchDate = `${parsed} 12:00:00 AM`;
    //console.log("🚀 ~ file: FilterGames.js ~ line 9 ~ FilterGames ~ searchDate", searchDate)

    let todaysGames = [];
    try {
        let searchforMatches = array.filter(a => a.gameDate === searchDate && a)
        searchforMatches[0].games.forEach(row => {
            todaysGames.push(row)
        })
        return todaysGames
    } catch(err) {
        return []
    }
}

export default FilterGames;
