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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const threads_api_1 = require("threads-api");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World From the Typescript Server!');
});
app.get('/api/hello', (req, res) => {
    res.send('Hello World From the Typescript Server!');
});
app.get('/api/user/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const threadsAPI = new threads_api_1.ThreadsAPI();
    const userID = yield threadsAPI.getUserIDfromUsername(username); // note the "await" keyword
    if (!userID) {
        res.status(404).send('User not found');
    }
    else {
        const user = yield threadsAPI.getUserProfile(userID); // again, use "await" if this is an async operation
        return user;
        // Don't forget to send a response back to the client here,
        // for instance: res.status(200).json(user);
    }
}));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
