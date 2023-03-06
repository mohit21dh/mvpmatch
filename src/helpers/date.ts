import dayjs from 'dayjs';

export const dateFormat = (date: Date): string => dayjs(date).format('YYYY-MM-DD');

export const filterStartDate = (nowDate: Date): Date => dayjs(nowDate).subtract(1, 'year').toDate();
