import { monthNames } from "./appInfo"

monthNames
export class HandleDateTime{
    static DateString =(num:number)=>{
        const date= new Date(num)

        return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }
    static GetHour= (num:number) =>{
        const date= new Date(num)
        return `${date.getHours()}`
    }
}