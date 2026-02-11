import { IApiRouter } from "@/interfaces";
import { Router, Request, Response, NextFunction } from "express";
import { PromotionService } from "@/services/PromotionService";
import { PromotionRepositoryMongo } from "@/repositories/mongo/PromotionRepositoryMongo";
import {
    createPromotionZSchema,
    updatePromotionParamsZSchema,
    updatePromotionZSchema,
    removePromotionParamsZSchema
} from "@/validators/PromotionZodSchemas"
import { mapPromotionToResponse } from "@/mappers/promotion/PromotionMapper";

export class PromotionRouter implements IApiRouter {
    readonly baseURI = '/api/v1/promocoes'
    public readonly router = Router()
    private readonly service = new PromotionService(PromotionRepositoryMongo.getInstance())

    constructor() {
        this.router.post("/", this.create())
        this.router.get("/", this.list())
        this.router.patch("/:id_promocao", this.update())
        this.router.delete("/:id_promocao", this.remove())
    }

    getExpressRouter(): Router {
        return this.router
    }

    private create(){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedBody = createPromotionZSchema.parse(req.body)
                
                const dto_input = {
                    title: validatedBody.title,
                    id_category: validatedBody.id_category,
                    url_image: validatedBody.url_image
                }

                await this.service.createPromotion(dto_input)

                res.status(201).send()
            } catch (error : unknown) {
                next(error)
            }
        }
    }

    private list(){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const lPromotions = await this.service.listPromotions()
                const response = lPromotions.map(prom => mapPromotionToResponse(prom))
                
                res.status(200).json(response)
            } catch (error : unknown) {
                next(error)
            }
        }
    }

    private update(){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedParams = updatePromotionParamsZSchema.parse(req.params)
                const validatedBody = updatePromotionZSchema.parse(req.body)

                const dto_input = {
                    title: validatedBody.title,
                    id_category: validatedBody.id_category,
                    url_image: validatedBody.url_image,
                    is_enabled: validatedBody.is_enabled
                }

                await this.service.updatePromotion(validatedParams.id_promocao, dto_input)

                res.status(200).send()

            } catch (error : unknown) {
                next(error)
            }
        }
    }

    private remove(){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedParams = removePromotionParamsZSchema.parse(req.params)

                await this.service.removePromotion(validatedParams.id_promocao)

                res.status(204).send()
            } catch (error : unknown) {
                next(error)
            }
        }
    }
} 