

export function dateConverter(date: Date): string {
    let currDate = new Date(date);

    let dateStr = `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`;
    return dateStr;

}
