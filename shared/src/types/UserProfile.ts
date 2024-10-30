export default interface UserProfile {
    // User Profile Data
    displayName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
  
    // Company/Source Data
    industry?: string;
    referralSource?: string;
    companyName?: string;
    companySize?: string;
  
    // Subscription Data
    selectedPlan?: 'free' | 'pro' | 'enterprise';
  }
  