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
    name: '', // Empty by default so user types it
    title: 'Company Role',
    company: 'Shapes',
    bio: 'Wearable Science',
    avatarUrl: '/images/ShapesBL150.png',
    coverUrl: '/images/White.png',
    email: '', // Logic will handle the @get-shapes.com part
    phone: '',
    location: 'City, Country',
    website: 'https://get-shapes.com',
    socialLinks: [
        {
            id: 'linkedin',
            platform: 'linkedin',
            url: 'https://linkedin.com',
            icon: 'Linkedin',
            label: 'LinkedIn',
            active: true,
        }
    ],
    theme: {
        primaryColor: '#000000', // Black accent
        backgroundColor: '#000000', // Black background
        cardStyle: 'glass',
    },
};
