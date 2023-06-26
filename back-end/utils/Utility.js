    // Format DateTime to UTC+07:00
    const GetFullDateMinuteString = (dateVal) => {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                let year = dateVal.getFullYear().toString();

                let month = (dateVal.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = "0" + month;
                }

                let day = dateVal.getDate().toString();
                if (day.length < 2) {
                    day = "0" + day;
                }

                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let dayofWeek = weekday[dateVal.getDay()];

                let hour = dateVal.getHours().toString();
                if (hour.length < 2) {
                    hour = "0" + hour;
                }

                let minute = dateVal.getMinutes().toString();
                if (minute.length < 2) {
                    minute = "0" + minute;
                }

                let second = dateVal.getSeconds().toString();
                if (second.length < 2) {
                    second = "0" + second;
                }

                return year + "-" + month + "-" + day + "||" + hour + ":" + minute + ":" + second
            }
        }
        return "";
    }

module.exports = { GetFullDateMinuteString };