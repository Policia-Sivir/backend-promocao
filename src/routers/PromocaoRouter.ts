import { IApiRouter } from "@/interfaces";
import { Router } from "express";

export class PromocaoRouter implements IApiRouter {
    readonly baseURI: string
    private readonly router: Router 

    constructor() {
        this.baseURI = '/api/v1/promocoes'
        this.router = Router()
    }

    getExpressRouter(): Router {
        return this.router
    }
} 