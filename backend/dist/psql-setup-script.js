"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { sequelize } = require('./db/models');
sequelize.showAllSchemas({ logging: false }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.includes(process.env.SCHEMA)) {
        yield sequelize.createSchema(process.env.SCHEMA);
    }
}));
//# sourceMappingURL=psql-setup-script.js.map