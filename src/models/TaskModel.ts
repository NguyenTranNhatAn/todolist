export interface TaskModel{
    id?:string,
    title:string,
    description:string,
    dueDate:any,
    start:any,
    end:any,
    uids:string[],
    color?:string,
    attachments:Attachment[],
    progress?:number;

}
export interface Attachment {
    name:string,
    url:string,
    size:number,
    type?:string,
}