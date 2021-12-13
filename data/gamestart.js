
const start_date = "Dec 13 2021 12:00:00 GMT+0800"
const check_start_date = function () { return (new Date(start_date).getTime() - new Date().getTime()) < 0 }

export { check_start_date, start_date }