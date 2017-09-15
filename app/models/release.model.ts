import {StatusModel} from './status.model';

export interface ReleaseModel {
    id: string;
    name: string;
    dueDate: string;
    description: string;
    status: StatusModel;
}
