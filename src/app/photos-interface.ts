export interface PhotosInterface {
    photos : {
        page : number,
        pages : number,
        perpage : number,
        photo : {
            id : String,
            owner : String,
            secret : String,
            server : String,
            title : String
        },
        total : number
    }
}
