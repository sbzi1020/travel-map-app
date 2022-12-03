import { Document, Schema, model } from 'mongoose';

// Create the interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

// Create the schema
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        max: 20
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

// Create and export user model
export const UserModel = model<IUser>("User", UserSchema);
