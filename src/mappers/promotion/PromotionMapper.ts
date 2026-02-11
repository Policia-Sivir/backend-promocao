import { Promotion } from "@/domain/promotion/Promotion"
import { PromotionResponseDTO } from "@/dto/promotion/PromotionHttpProtocols"

export function mapPromotionToResponse(promotion : Promotion) : PromotionResponseDTO{
    return{
        id_promotion: promotion.id_promotion,
        title: promotion.title,
        id_category: promotion.id_category,
        url_redirect: promotion.url_redirect,
        url_image: promotion.url_image,
        is_enabled: promotion.is_enabled,
        createdAt: promotion.createdAt
    }
}