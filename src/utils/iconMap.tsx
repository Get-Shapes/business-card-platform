import {
    Instagram,
    Twitter,
    Linkedin,
    Github,
    Globe,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Facebook,
    Youtube,
    Twitch
} from 'lucide-react';

export const IconMap: Record<string, any> = {
    Instagram,
    Twitter,
    Linkedin,
    Github,
    Globe,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Facebook,
    Youtube,
    Twitch
};

export const getIcon = (name: string) => {
    const Icon = IconMap[name] || Globe;
    return Icon;
};
