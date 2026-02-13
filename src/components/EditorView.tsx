import React from 'react';
import type { ProfileData, SocialLink } from '../data/initialData';
import { Plus, Trash2, Download } from 'lucide-react';
import { IconMap } from '../utils/iconMap';

interface EditorViewProps {
    data: ProfileData;
    onChange: (data: ProfileData) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({ data, onChange }) => {
    const handleChange = (field: keyof ProfileData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const handleThemeChange = (field: keyof ProfileData['theme'], value: any) => {
        onChange({ ...data, theme: { ...data.theme, [field]: value } });
    };

    const handleSocialChange = (id: string, field: keyof SocialLink, value: any) => {
        const newLinks = data.socialLinks.map(link =>
            link.id === id ? { ...link, [field]: value } : link
        );
        onChange({ ...data, socialLinks: newLinks });
    };

    const addSocialLink = () => {
        const newLink: SocialLink = {
            id: Date.now().toString(),
            platform: 'website',
            url: '',
            icon: 'Globe',
            label: 'New Link',
            active: true
        };
        onChange({ ...data, socialLinks: [...data.socialLinks, newLink] });
    };

    const removeSocialLink = (id: string) => {
        onChange({ ...data, socialLinks: data.socialLinks.filter(l => l.id !== id) });
    };

    const handleExport = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "profile.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 bg-white overflow-y-auto h-full border-r border-gray-200 shadow-xl z-20 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    <Download size={16} /> Export
                </button>
            </div>

            <div className="space-y-6">
                {/* Basic Info */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Company</label>
                        <input
                            type="text"
                            value={data.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        />
                    </div>
                </section>

                {/* Contact */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Phone</label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Website</label>
                        <input
                            type="url"
                            value={data.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </section>

                {/* Theme */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Theme</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Accent Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={data.theme.primaryColor}
                                    onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                                    className="w-8 h-8 rounded-full border-0 p-0 overflow-hidden cursor-pointer"
                                />
                                <span className="text-sm font-mono text-gray-600">{data.theme.primaryColor}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Background Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={data.theme.backgroundColor}
                                    onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                                    className="w-8 h-8 rounded-full border-0 p-0 overflow-hidden cursor-pointer"
                                />
                                <span className="text-sm font-mono text-gray-600">{data.theme.backgroundColor}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Avatar URL</label>
                        <input
                            type="url"
                            value={data.avatarUrl}
                            onChange={(e) => handleChange('avatarUrl', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Cover URL</label>
                        <input
                            type="url"
                            value={data.coverUrl}
                            onChange={(e) => handleChange('coverUrl', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xs"
                        />
                    </div>
                </section>

                {/* Social Links */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
                        <button
                            onClick={addSocialLink}
                            className="p-1 rounded-full hover:bg-gray-100 text-blue-600 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.socialLinks.map((link) => (
                            <div key={link.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-3 group">
                                <div className="flex items-center gap-2">
                                    <select
                                        value={link.icon}
                                        onChange={(e) => handleSocialChange(link.id, 'icon', e.target.value)}
                                        className="p-1.5 rounded-md border border-gray-300 text-sm bg-white"
                                    >
                                        {Object.keys(IconMap).map(iconName => (
                                            <option key={iconName} value={iconName}>{iconName}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={link.label}
                                        onChange={(e) => handleSocialChange(link.id, 'label', e.target.value)}
                                        placeholder="Label"
                                        className="flex-1 p-1.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => removeSocialLink(link.id)}
                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => handleSocialChange(link.id, 'url', e.target.value)}
                                    placeholder="URL (https://...)"
                                    className="w-full p-1.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 bg-white"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
