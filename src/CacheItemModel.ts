import * as mongoose from "mongoose";
import * as Catbox from "catbox";


export interface CacheItem {
    key: Catbox.CacheKey;
    value: any;
    createdAt: Date;
    expiresAt?: Date;
    ttl: number;
}

const cacheItemSchema = new mongoose.Schema({
    key: {
        type: {
            segment: String,
            id: String,
        },
        index: true,
        unique: true,
    },
    value: mongoose.Schema.Types.Mixed,
    createdAt: Date, // https://docs.mongodb.com/manual/tutorial/expire-data/#expire-documents-at-a-specific-clock-time
    expiresAt: {
        type: Date,
        index: {
            expires: 0,
        }
    },
    ttl: Number,
});

export const CacheItemModel = mongoose.model<mongoose.Document & CacheItem>("CacheItem", cacheItemSchema);
