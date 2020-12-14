export interface Publication {
    isOwner: boolean;
    idpublications: number;
    title: string;
    body: string;
    media: string;
    idusers: number;
    createdAt: string;
    updatedAt: string;
    user: {
        firstname: string,
        lastname: string,
        media: string
    };
    comments: any[];
    likes: number[];
    nbrLikes: number;
    nbrComments: number;

}
