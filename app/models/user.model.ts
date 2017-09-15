import {RoleModel} from './role.model';

export interface UserModel {
    id: number;
    title: string;
    username: string;
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    country: string;
    postalCode: number;
    location: string;
    type: number;
    email: string;
    workPhoneNumber: string;
    website: string;
    accountEnabled: boolean;
    accountExpired: boolean;
    credentialsExpired: boolean;
    loginName: string;
    roles: RoleModel[];
    userType: number;
    chargeableFlag: boolean;
    lastSuccessfulLogin: number;
}
