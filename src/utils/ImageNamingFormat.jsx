export const ImageNamingFormat = (x) => {
    let d = new Date()
    let dFormat = `${x}_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}_${d.getMilliseconds()}`
    return dFormat
}