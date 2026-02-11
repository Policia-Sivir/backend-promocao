import mongoose, {Model, Schema} from "mongoose";
import { Promotion } from "@/domain/promotion/Promotion";
import { IPromotion } from "@/domain/promotion/IPromotion";
import { IPromotionRepository } from "@/domain/promotion/IPromotionRepository";
import { title } from "node:process";

type IPromotionDocument = Omit<IPromotion, "id_promotion"> & {
    _id: string
    createdAt: Date
    updatedAt: Date
} // mapeia o id_promotion para _id do MongoDB

export class PromotionRepositoryMongo implements IPromotionRepository {
    private static instance?: PromotionRepositoryMongo
    private readonly mongoPromotModel : Model<IPromotionDocument>

    private constructor(){
        const schema_promo = new Schema<IPromotionDocument>(
            {
                _id: { type: String, required: true },
                title: { type: String, required: true },
                id_category: { type: String, required: true },
                url_redirect: { type: String, required: true },
                url_image: { type: String, required: true },
                is_enabled: { type: Boolean, default: true }
            },
            {   timestamps: true, // createdAt e updatedAt automaticamente gerenciados pelo mongoose
                versionKey: false
            }
        )
        this.mongoPromotModel = mongoose.model<IPromotionDocument>("Promotion", schema_promo)
    }

    static getInstance(): PromotionRepositoryMongo{
        if (!this.instance) {
            this.instance = new PromotionRepositoryMongo()
        }
        return this.instance
    }

    async create(promotion: Promotion): Promise<void>{
        await this.mongoPromotModel.create({
            _id: promotion.id_promotion,
            title: promotion.title,
            id_category: promotion.id_category,
            url_redirect: promotion.url_redirect,
            url_image: promotion.url_image,
            is_enabled: promotion.is_enabled
        })
    }

    async findById(id_promotion: string) : Promise<Promotion | null> {
        const promot_doc = await this.mongoPromotModel.findOne({ _id: id_promotion}).exec()
        if(!promot_doc){
            return null
        }
        return new Promotion(
            promot_doc._id,
            promot_doc.title,
            promot_doc.id_category,
            promot_doc.url_redirect,
            promot_doc.url_image,
            promot_doc.is_enabled,
            promot_doc.createdAt,
            promot_doc.updatedAt
        )
    }

    async listAllActives() : Promise<Promotion[]>{
        const docs = await this.mongoPromotModel.find({is_enabled: true})
        return docs.map(doc =>
            new Promotion(
                doc._id,
                doc.title,
                doc.id_category,
                doc.url_redirect,
                doc.url_image,
                doc.is_enabled,
                doc.createdAt,
                doc.updatedAt
            )
        )
    }

    async update(promotion : Promotion) : Promise<void>{
        await this.mongoPromotModel.updateOne(
            {_id: promotion.id_promotion},
            {
                title: promotion.title,
                id_category: promotion.id_category,
                url_redirect: promotion.url_redirect,
                url_image: promotion.url_image,
                is_enabled: promotion.is_enabled,
            }
        )
    }


    async remove(id_promotion: string) : Promise<void>{
        await this.mongoPromotModel.updateOne(
            {_id: id_promotion},
            {is_enabled: false}
        )
    }
}