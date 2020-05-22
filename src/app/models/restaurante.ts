import { Platillos } from './platillos';

export interface Restaurante {
    id?:string
    name?:string;
    lat?:number;
    lng?:number;
    prom?:number;
    cantidad?:number;
    total?:number;
    platillos?:Array<Platillos>;
}
