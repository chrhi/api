"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let app;
async function bootstrap() {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.init();
    }
    return app;
}
async function handler(req, res) {
    const app = await bootstrap();
    const httpAdapter = app.getHttpAdapter();
    return httpAdapter.getInstance()(req, res);
}
exports.default = handler;
//# sourceMappingURL=main.js.map