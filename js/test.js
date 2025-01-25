
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


/** 
    1. load and display data initially.
    2. onclick load and display data.
    3. Complex object accessing.
    4. toggle active class functionality.
    5. search functionality.
    6. load & display single data.
    7. display data in a modal.
    8. load & display single category data.
    9. Conditional rendering if array dont have any data
    10.Conditional rendering :: if a value empty
    11.Conditional rendering :: if a value length is zero



*/
