import 'dotenv/config'
import { ExpressServer } from "@/servers/ExpressServer"
import { IExpressServer } from '@/interfaces'
import { MongoConfiguration } from './configs/MongoConfiguration'
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'
import { PromotionRouter } from './routers/PromotionRouter'

class App {
  readonly server: IExpressServer
  readonly mongoDb: MongoConfiguration

  constructor() {
    this.server = ExpressServer.getInstance()
    this.mongoDb = MongoConfiguration.getInstance()
  }

  public async start() {
    await this.mongoDb.connect()

    this.server.addRouter(new PromotionRouter())

    const errorHandlerMiddleware = new ErrorHandlerMiddleware()
    this.server.addAfterMiddleware(errorHandlerMiddleware)

    this.server.configure()
    this.server.listen()
  }
}

new App().start()