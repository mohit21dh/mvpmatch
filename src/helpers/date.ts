import dayjs from 'dayjs';

export const dateFormat = (date: Date) => dayjs(date).format('YYYY-MM-DD');

export const filterStartDate = (nowDate: Date) => dayjs(nowDate).subtract(1, 'year').toDate();
