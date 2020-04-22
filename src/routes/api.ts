import { BaseRoute } from 'core/route'
import { Person } from 'controllers/api/person'

let routes:Array<BaseRoute> = []

routes.push.apply(routes, new Person().Routes)

export default async function controlRoutes(instance, options) 
{
    instance.decorate('util', (request, key, value) => { request[key] = value })
    instance.addHook('preHandler', async (request, reply) => {
        //TODO: authentication
        return
    })

    routes.forEach((route:BaseRoute, index:number) => {
        let config:any = {}
        if(route.object != null) config['params'] = route.object
        instance.route({
            method: route.method,
            url: route.url,
            handler: route.handler,
            config: config,
            preHandler: route.pre,
        })
    })
    return
}