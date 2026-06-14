export interface DiscountItem {
    id : string;
    name : string;
    type :  'PERCENTAGE' | 'FIXED';
    target : 'ONE_TIME' | 'MONTHLY';
    value : number;
    durationMonths ? : number;
    isActive : boolean
}

export type LocaleType = 'en' | 'nl'