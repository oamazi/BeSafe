import {Schema, SchemaDefinition, SchemaOptions} from 'mongoose'

export class BaseSchema extends Schema{
    
    constructor(definition?:SchemaDefinition, options?:SchemaOptions){
        definition['created_at']={type:Date, default:Date.now}
        definition['updated_at']={type:Date, default:Date.now}
        definition['deleted']={type:Boolean, default:false}
        super(definition, options)
        this.pre('save', async function() {
            this.set('updated_at',Date.now())
            let action = 'update'
            if(this.isNew) action = 'add'
            let paths = this.modifiedPaths()
            let values = []
            
            for(let i=0;i<paths.length;i++)
            {
                let element = {}
                element[paths[i]] = this[paths[i]]
                values.push(element)
            }
        })
        this.pre('find', function() {
            this.where({deleted: {$ne:true}});
        });
        this.set('toJSON', {virtuals:true})
        this.set('toObject', {virtuals:true})
        this.statics.Get = async function(value:string, field?:string):Promise<any>
        {
            try{
                let element:any = null
                if(field == null || field =='id') element = await this.findById(value)
                else 
                {
                    let object = {}
                    object[field] = value
                    element = await this.findOne(object)
                }
                if(element!=null)
                {
                    //console.log(this.schema.paths)
                }
                return element
            }
            catch(e) {return null}
        }

        this.statics.GetAll = async function():Promise<Array<any>>
        {
            let elements:Array<any> = await this.find({})
            return elements
        }

        this.statics.Delete = async function(id:string):Promise<boolean>
        {
            let element = await this.findById(id)
            if(element!=null)
            {
                element.deleted = true
                let keys = Object.keys(element.schema.paths)
                if(keys.indexOf('active') >= 0 ) element.active = false
                await element.save()
                return true
            }
            else throw new Error('INVALID_ELEMENT')
        }

        this.statics.Add = async function(object:any):Promise<string>
        {
            let element = new this(object)
            await element.save()
            return element.id
        }

        this.statics.Update = async function(id:string, object:any):Promise<boolean>
        {
            let element = await this.findById(id)
            if(element!= null){
                let keys = Object.keys(object)
                for(let i=0;i<keys.length;i++)
                {
                    let field = keys[i]
                    if(field != 'id') element[field] = object[field]
                }
                await element.save()
                return true
            }
            else throw new Error('INVALID_ELEMENT')
        }
    }
}