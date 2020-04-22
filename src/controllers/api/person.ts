import { BaseController } from "core/controller";
import { Methods } from "config/enums";

export class Person extends BaseController
{
    constructor()
    {
        super()
        this.Routes.push({url:'/people/all',method:Methods.Get,handler:this.getAll})
    }

    async getAll(request, reply):Promise<void>
    {
        reply.send({People:'List'})
    }
}