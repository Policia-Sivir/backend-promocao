import {Promotion} from './Promotion'

export interface IPromotionRepository{
    create(promotion : Promotion) : Promise<void>;
    findById(id_promotion: string) : Promise<Promotion | null>;
    listAllActives() : Promise<Promotion[]>;
    update(promotion : Promotion) : Promise<void>
    remove(id_promotion: string) : Promise<void>
}