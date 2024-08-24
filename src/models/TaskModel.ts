export interface TaskModel{
    id?:string,
    title:string,
    description:string,
    dueDate:any,
    start:any,
    end:any,
    uids:string[],
    createAt?:number,
    updateAt?:number,
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

export interface SubStatModel {
    createAt: number,
    description: string,
    id: string,
    isComplete: boolean,
    taskId: string,
    title: string,
    upDateAt: number,
  }
  