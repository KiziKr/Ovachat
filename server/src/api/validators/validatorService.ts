import { Service } from 'typedi';

@Service()
export class ValidatorService {
    /**
     * Inspects an entity and returns an error object if the validation fails
     */
    public static validateEntity(entity : any): Promise<object>{
        return new Promise((resolve, reject) => {
            entity.validate().then(res => {
                return resolve({
                    type: 'validation',
                    status: 'success'
                })
            }).catch(err => {
                return reject({
                    type: 'validation',
                    status: 'failed',
                    errors: err.errors
                })
            })
        })
    }

    /**
     * Save an entity in the database. 
     */
    public static validationSave(entity : any) {
        return new Promise((resolve, reject) => {
            entity.save(function(next) {
                if(next) {
                    return reject({
                        type: "save",
                        status: 'failed',
                        errors: next
                    })
                }
                return resolve({
                    type: "save",
                    status: 'success'
                })
            })
        })
    }
}