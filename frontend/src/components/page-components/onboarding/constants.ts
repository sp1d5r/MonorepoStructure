import { Plan } from './types';

export const INDUSTRY_OPTIONS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Other'
];

export const COMPANY_SIZE_OPTIONS = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '500+'
];

export const REFERRAL_OPTIONS = [
  'Google Search',
  'Social Media',
  'Friend/Colleague',
  'Professional Network',
  'Online Advertisement',
  'Other'
];

export const PRICING_PLANS: Plan[] = [
  {
    type: 'free',
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Basic Features',
      '1 User',
      'Limited Storage',
      'Community Support'
    ]
  },
  {
    type: 'pro',
    name: 'Pro',
    price: '$29/mo',
    description: 'For growing businesses',
    features: [
      'Advanced Features',
      'Unlimited Users',
      '100GB Storage',
      'Priority Support',
      'Analytics Dashboard',
      'Custom Integrations'
    ]
  },
  {
    type: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'All Pro Features',
      'Dedicated Support',
      'Custom Storage',
      'SLA Agreement',
      'Security Features',
      'API Access'
    ]
  }
];