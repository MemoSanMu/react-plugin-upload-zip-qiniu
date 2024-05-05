import dayjs from 'dayjs'

export const dateFormat = 'YYYY-MM-DD HH:mm:ss'

// dayjs().format('YYYY-MM-DD HH:mm:ss')  ==》 2021-01-12 14:17:58
// dayjs(time).valueOf() ==》 时间戳
/**
 * 将日期组件选择的日期对象转换为日期格式
 * @param time 时间
 */
export const handleMount = (time: any) => time && dayjs(time).format(dateFormat)
