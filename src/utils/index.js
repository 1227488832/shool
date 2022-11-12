export const formatSeconds = (value) => {
    var theTime = parseInt(value);// 秒
    var middle = 0;// 分
    var hour = 0;// 小时

    if (theTime >= 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle >= 60) {
            hour = parseInt(middle / 60);
            middle = parseInt(middle % 60);
        }
    }
    var result = `${hour < 10 ? '0' + hour : hour}:${middle < 10 ? '0' + middle : middle}:${theTime < 10 ? '0' + theTime : theTime}`
    return result;
}