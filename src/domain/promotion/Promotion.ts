import {IPromotion} from './IPromotion'

export class Promotion implements IPromotion{
    constructor(
        public readonly id_promotion : string,
        public title: string,
        public id_category: string,
        public url_redirect: string,
        public url_image: string,
        public is_enabled: boolean,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ){}
}