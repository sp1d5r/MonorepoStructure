export interface Plan {
    type: 'free' | 'pro' | 'enterprise';
    name: string;
    price: string;
    description: string;
    features: string[];
}
export declare const PRICING_PLANS: Plan[];
