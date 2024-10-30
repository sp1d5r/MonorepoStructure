export default interface UserProfile {
    displayName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    industry?: string;
    referralSource?: string;
    companyName?: string;
    companySize?: string;
    selectedPlan?: 'free' | 'pro' | 'enterprise';
}
