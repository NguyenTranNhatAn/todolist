export interface TaskModel{
    id?:string,
    title:string,
    description:string,
    dueDate:any,
    start:any,
    end:any,
    uids:string[],
    createdAt?:number,
    updatedAt?:number,
    color?:string,
    attachments:Attachment[],
    progress?:number,
    isUrgent:boolean,

}
export interface Attachment {
    name:string,
    url:string,
    size:number,
    type?:string,
}

export interface SubStatModel {
    createdAt: number,
    description: string,
    id: string,
    isComplete: boolean,
    taskId: string,
    title: string,
    upDatedAt: number,
  }
  