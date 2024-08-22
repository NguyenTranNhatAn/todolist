export interface TaskModel{
    id?:string,
    title:string,
    description:string,
    dueDate:any,
    start:any,
    end:any,
    uids:string[],
    color?:string,
    fileUrls:string[],
    progress?:string;

}