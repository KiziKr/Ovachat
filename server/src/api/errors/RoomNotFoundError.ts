import { HttpError } from 'routing-controllers';

export class RoomNotFoundError extends HttpError {
    constructor() {
        super(404, 'Channel introuvable !');
        this.name = 'RoomNotFoundError'
    }
}