import type { ProfileData } from '../data/initialData';

export const generateVCard = (data: ProfileData): string => {
    const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.name}`,
        `N:;${data.name};;;`,
        `ORG:${data.company}`,
        `TITLE:${data.title}`,
        `TEL;TYPE=CELL:${data.phone}`,
        `EMAIL;TYPE=INTERNET:${data.email}`,
        `URL:${data.website}`,
        `NOTE:${data.bio}`,
        ...data.socialLinks
            .filter(l => l.active)
            .map(l => `X-SOCIALPROFILE;type=${l.platform}:${l.url}`),
        'END:VCARD'
    ].join('\n');

    return vcard;
};

export const downloadVCard = (data: ProfileData) => {
    const vcardContent = generateVCard(data);
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
