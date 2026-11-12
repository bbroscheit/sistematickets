import dayjs from "dayjs";

// arma la grilla de 5 semanas x 7 dias para el calendario mensual de agenda,
// arrancando desde el dia de semana correcto aunque el mes no empiece un domingo
export default function getDaysForSchedule( month = dayjs().month()){
    const year = dayjs().year()
    const firstDayOfTheMonth = dayjs(new Date( year, month, 1 )).day()
    let currentMonthCount = 0 - firstDayOfTheMonth
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })
    return daysMatrix
}