export interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: string;
    label: string;
    active: boolean;
}

export interface ProfileData {
    id: string;
    name: string;
    title: string;
    company: string;
    bio: string;
    avatarUrl: string;
    coverUrl: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    socialLinks: SocialLink[];
    theme: {
        primaryColor: string;
        backgroundColor: string;
        cardStyle: 'glass' | 'solid' | 'minimal';
    };
}

export const initialProfile: ProfileData = {
    id: 'demo',
    name: 'Your Name',
    title: 'Job Title',
    company: 'Company Name',
    bio: 'A short bio about yourself and what you do.',
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80', // Generic avatar
    coverUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1000&q=80', // Generic gradient
    email: 'email@example.com',
    phone: '+1 234 567 8900',
    location: 'City, Country',
    website: 'https://example.com',
    socialLinks: [],
    theme: {
        primaryColor: '#000000',
        backgroundColor: '#f3f4f6',
        cardStyle: 'glass',
    },
};
