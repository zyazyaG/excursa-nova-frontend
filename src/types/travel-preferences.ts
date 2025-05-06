export interface TravelPreferences {
    destination: string;
    startDate: Date;
    endDate: Date;
    budget?: string;
    style?: string[];
    cities: string [];
}