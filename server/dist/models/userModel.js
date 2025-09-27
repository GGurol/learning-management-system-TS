"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const uuid_1 = require("uuid");
const userSchema = new dynamoose_1.default.Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuid_1.v4,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            name: 'emailIndex',
            global: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true,
    saveUnknown: false, // Prevents saving unknown properties
});
// Middleware in Dynamoose is handled differently.
// We will handle hashing in the controller before saving.
// The pre-save hook logic is removed from here.
const User = dynamoose_1.default.model('User', userSchema);
exports.default = User;
