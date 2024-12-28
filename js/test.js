
function getTimeString(time){
    // get Hour and rest seconds
    const year = parseInt (remainingSecond1 / 360)
    const month = parseInt (remainingSecond1 / 30)
    const day = parseInt (time / 86400); // 86400 second = 1 day 
    let remainingSecond1 = time % 86400  
    
    const hour = parseInt (time / 3600); // 3600 second = 1 hour
    let remainingSecond = time % 3600;
    const minute = parseInt (remainingSecond / 60);
    remainingSecond = remainingSecond % 60;

    return `${year}year ${month}month  ${day} day ${hour} hour ${minute} minute  ${remainingSecond} second ago`
}
console.log(getTimeString(464626))