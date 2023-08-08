export default class Utility {
    // Format DateTime to UTC+07:00
    static GetFullDateMinuteString = (dateVal) => {
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

                return dayofWeek + "-" + day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second
            }
        }
        return "";
    }

    static GetFullDateString = (dateVal) => {
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

                return dayofWeek + "-" + day + "-" + month + "-" + year
            }
        }
        return "";
    }

    static validateEmail(obj) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(obj).toLowerCase());
    }

    static validateUsername(obj) {
        var Re_username = new RegExp(/^([a-z|A-Z|_|\.|0-9][a-z|A-Z|_|\.|0-9]+)$/);
        return Re_username.test(obj);
        //username ki tự đầu phải là kí tự chữ. k thể là số. các kí tự sau lặp có thẻ là chứ _ .  or sô
    }

    static validatePhone(obj) {
        var Re_phone = new RegExp(/^(\d{6,11})$/);
        return Re_phone.test(obj);
        //phone : 6-11 số
    }

    static validatePassword(obj) {
        var Re_password = new RegExp(
            /^([a-z|A-Z|0-9])([a-z|A-Z|0-9][a-z|A-Z|0-9][a-z|A-Z|0-9][a-z|A-Z|0-9])([a-z|A-Z|0-9]+)$/
        );
        return Re_password.test(obj);
        //password : 6 kí tự
    }


    static validateCoordinate(obj) {
        var Re_Coord = new RegExp(/^(-?)\d*\.?\d*$/);
        return Re_Coord.test(obj);
    }

    static validateAZCharacter(obj) {
        var Re_Char = new RegExp(/^[A-Z]+$/g);
        return Re_Char.test(obj);
    }

    static validateNumberCharacter(obj) {
        var Re_Char = new RegExp(/^[0-9]+$/g);
        return Re_Char.test(obj);
    }

    static validateStrNumber(obj) {
        let Re_CharNumber = new RegExp(/^[0-9]+$/g)
        let Re_DecimalThounsandChar = new RegExp(/[\.\,]/)
        if (Re_CharNumber.test(obj)) {
            return true
        }
        return Re_DecimalThounsandChar.test(obj)
    }

    static validateDateMonthPickerCharacter(obj) {
        let Re_CharNumber = new RegExp(/^[0-9]+$/g)
        var Re_CharDivider = new RegExp(/[\/\.\-]/)
        if (Re_CharNumber.test(obj)) {
            return true
        }
        return Re_CharDivider.test(obj)
    }

    static IsNullOrUndefined(obj) {
        if (obj === null || obj === undefined) {
            return true;
        }
        return false;
    }

    static IsNullOrEmpty(str) {
        if (str === null || str === undefined || str === "") {
            return true;
        }
        return false;
    }

    static IsNullOrWhiteSpace(str) {
        if (str === null || str === undefined || str.trim() === "") {
            return true;
        }
        return false;
    }
}
