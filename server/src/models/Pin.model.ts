import { Document, Schema, model } from 'mongoose';

// Create the interface
export interface IPin extends Document {
    username: string
    title: string
    rating: number
    lat: number
    long: number
}

// Create the schema
const PinSchema = new Schema<IPin>({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 3
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 0
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

// Create and export user model
export const PinModel = model<IPin>("Pin", PinSchema);
