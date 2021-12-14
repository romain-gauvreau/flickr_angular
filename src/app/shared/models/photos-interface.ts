import {PhotoInterface} from "./photo-interface";

export interface PhotosInterface {
    photos : {
        page : number,
        pages : number,
        perpage : number,
        photo : PhotoInterface[],
        total : number
    }
}
