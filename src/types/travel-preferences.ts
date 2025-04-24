export interface TravelPreferences {
    destination: string;
    startDate: Date;
    endDate: Date;
    budget?: number;
    style?: string[];
    cities: string [];
}