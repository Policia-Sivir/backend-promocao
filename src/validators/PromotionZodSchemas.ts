import z from "zod"

/* Zod Schemas for validating request body */

// POST /api/v1/promocoes
export const createPromotionZSchema = z.object({
    title: z.string().min(1),
    id_category: z.uuid(),
    url_image: z.url()
})

// PATCH /api/v1/promocoes/:id_promocao
export const updatePromotionParamsZSchema = z.object({
    id_promocao: z.uuid()
})
export const updatePromotionZSchema = z.object({
    title: z.string().min(1).optional(),
    id_category: z.uuid().optional(),
    url_image: z.url().optional(),
    is_enabled: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
})

// DELETE  /api/v1/promocoes/:id_promocao
export const removePromotionParamsZSchema = z.object({
    id_promocao: z.uuid()
})