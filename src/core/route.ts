import { Methods } from "config/enums";

export interface BaseRoute{
    url:string
    method:Methods
    handler:any,
    pre?:any, 
    object?:any
}