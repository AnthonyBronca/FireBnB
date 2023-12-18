import {Buffer} from 'buffer'

export interface IAWSFile{
    originalname?: string,
    mimetype?: any,
    buffer?: Buffer
}
