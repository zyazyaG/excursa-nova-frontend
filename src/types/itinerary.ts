export interface Itinerary {
    _id: string;
    name: string;
    content: string;
    destination: string;
    startDate?: Date;
    endDate?: Date;
    createdAt: string;
    style: string [];
    imgURL: string[];
}

export interface FilterObject {
    searchString: string;
    destination: string[],
    date: string[],
    sort: "desc" | "acs";

}