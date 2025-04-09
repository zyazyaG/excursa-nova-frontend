export interface Itinerary {
    _id: string;
    content: string;
    destination?: string;
    startDate?: Date;
    endDate?: Date;
    createdAt: string;
}