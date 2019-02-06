import { Service } from 'typedi';

@Service()
export class ValidatorService {
    /**
     * Validation
     */
    public static validateEntity(entity : any): Promise<object>{
        return new Promise((resolve, reject) => {
            entity.validate().then(res => {
                return resolve({
                    type: 'validation',
                    status: 'success',
                    description: 'user details successfully saved.',
                })
            }).catch(err => {
                return reject({
                    type: 'validation',
                    status: 'failed',
                    description: 'user details failed saved.',
                    errors: err.errors
                })
            })
        })
    }

    /**
     * Save
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