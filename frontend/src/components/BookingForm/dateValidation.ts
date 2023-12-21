


export function endDateValidation(strDate?: string, start?:boolean) {
    let today;
    if(start){
        today = new Date();
        let todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        return todayStr;
    }
    if(strDate){
        today = new Date(strDate);
    } else{
        today = new Date();
    }

    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowStr = `${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()+1}`;
    return tomorrowStr;

}

let endDate = '2023-12-05';
endDateValidation(endDate)
