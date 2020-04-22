import {BaseRoute} from './route'
export class BaseController{
    public Routes:Array<BaseRoute>
    constructor()
    {
        this.Routes = new Array<BaseRoute>()
    }
}