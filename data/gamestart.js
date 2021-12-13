
const start_date = "Dec 13 2021 12:00:00 GMT+0800"
const check_start_date = function () { return (new Date(start_date).getTime() - new Date().getTime()) < 0 }

const batch1_date = "Dec 14 2021 12:00:00 GMT+0800"
const check_batch1_date = function () { return (new Date(batch1_date).getTime() - new Date().getTime()) < 0 }

const batch2_date = "Dec 15 2021 12:00:00 GMT+0800"
const check_batch2_date = function () { return (new Date(batch2_date).getTime() - new Date().getTime()) < 0 }

const batch3_date = "Dec 16 2021 12:00:00 GMT+0800"
const check_batch3_date = function () { return (new Date(batch3_date).getTime() - new Date().getTime()) < 0 }

const batch4_date = "Dec 17 2021 12:00:00 GMT+0800"
const check_batch4_date = function () { return (new Date(batch4_date).getTime() - new Date().getTime()) < 0 }

export { check_start_date, start_date, check_batch1_date, batch1_date, check_batch2_date, batch2_date, check_batch3_date, batch3_date, check_batch4_date, batch4_date }