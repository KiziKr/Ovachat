import { Service } from 'typedi';

@Service()
export class ValidatorService {
    /**
     *
     */
    public static async completeEntityValidation(entityModel: any) {
        let validation = await this.validateEntity(entityModel).then((res) => {
            return res
        }).catch(err => {
            return err
        })

        if (validation.success === false) {
            return validation
        }

        return await this.validationSave(
            entityModel
        )
    }

    /**
     * Inspects an entity and returns an error object if the validation fails
     */
    public static validateEntity(entity: any): Promise<object> {
        return new Promise((resolve, reject) => {
            entity.validate().then(res => {
                return resolve({
                    type: 'validation',
                    success: true,
                    data: res
                })
            }).catch(err => {
                return reject({
                    type: 'validation',
                    success: false,
                    errors: err.errors
                })
            })
        })
    }

    /**
     * Save an entity in the database. 
     */
    public static validationSave(entity: any) {
        return new Promise((resolve, reject) => {
            entity.save(function (next) {
                if (next) {
                    return reject({
                        type: "save",
                        success: false,
                        errors: next
                    })
                }
                return resolve({
                    type: "save",
                    success: true
                })
            })
        })
    }
}