import { IPromotionRepository } from "@/domain/promotion/IPromotionRepository";
import { Promotion } from "@/domain/promotion/Promotion";
import { CreatePromotionDTO, UpdatePromotionDTO } from "@/dto/promotion/PromotionHttpProtocols";
import { ErrorCodes } from "@/enums";
import { ApiError } from "@/utils/ApiError";

export class PromotionService{
    constructor(private promot_repo: IPromotionRepository){}

    async createPromotion(dto_creation: CreatePromotionDTO): Promise<void>{
        // redirecionam para a categoria vinculada
        const url_redirect = `/categorias/${dto_creation.id_category}`

        const promotion = new Promotion(
            crypto.randomUUID(),
            dto_creation.title,
            dto_creation.id_category,
            url_redirect,
            dto_creation.url_image,
            true
        )

        await this.promot_repo.create(promotion)
    }

    async listPromotions() : Promise<Promotion[]>{
        const promotions = await this.promot_repo.listAllActives()

        if(! promotions || promotions.length === 0 ){
            throw new ApiError(404, ErrorCodes.ERROR_0002, "No promotion actives found")
        }

        return promotions
    }

    async updatePromotion(id_promotion: string, dto_update : UpdatePromotionDTO) : Promise<void>{
        const existing_promotion = await this.promot_repo.findById(id_promotion)

        if(!existing_promotion){
            throw new ApiError(404, ErrorCodes.ERROR_0001, `No promotion found by id ${id_promotion}`)
        }

        const id_category = dto_update.id_category ?? existing_promotion.id_category
        const url_redirect = `/categorias/${id_category}`
        const updatePromotion = new Promotion(
            existing_promotion.id_promotion,
            dto_update.title ?? existing_promotion.title,
            id_category,
            url_redirect,
            dto_update.url_image ?? existing_promotion.url_image,
            dto_update.is_enabled ?? existing_promotion.is_enabled
        )

        await this.promot_repo.update(updatePromotion)
    }


    async removePromotion(id_promotion : string) : Promise<void>{
        const promotion = await this.promot_repo.findById(id_promotion)
        if(!promotion){
            throw new ApiError(404, ErrorCodes.ERROR_0001, `No promotion found by id ${id_promotion}`)
        }
        if(!promotion.is_enabled){
            throw new ApiError(409, ErrorCodes.ERROR_0004, "Promotion already disabled");
        }
        await this.promot_repo.remove(id_promotion)
    }
}