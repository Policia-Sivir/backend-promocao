// CreatePromotionDTO - Input (API) 
export interface CreatePromotionDTO {
    title: string;
    id_category: string;
    url_image: string;
}

// PromotionResponseDTO - Output (API)
export interface PromotionResponseDTO {
    id_promotion: string;
    title: string;
    id_category: string;
    url_redirect: string;
    url_image: string;
    is_enabled: boolean;
    createdAt?: Date;
}

export interface UpdatePromotionDTO{
    title?: string;
    id_category?: string;
    url_image?: string;
    is_enabled?: boolean;
}