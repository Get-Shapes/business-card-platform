import React from 'react';
import type { ProfileData, SocialLink } from '../data/initialData';
import { Plus, Trash2, Download } from 'lucide-react';
import { IconMap } from '../utils/iconMap';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface EditorViewProps {
    data: ProfileData;
    onChange: (data: ProfileData) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({ data, onChange }) => {
    const handleChange = (field: keyof ProfileData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'coverUrl') => {
        const file = e.target.files?.[0];
        console.log("File selected:", file); // Debug log
        if (!file) return;

        // Validating file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image too large (max 2MB)");
            return;
        }

        const toastId = toast.loading("Uploading image...");

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${data.id || 'temp'}/${Math.random()}.${fileExt}`;

            console.log("Uploading to path:", fileName); // Debug log

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, {
                    upsert: true
                });

            if (uploadError) {
                console.error("Upload error:", uploadError); // Debug log
                throw uploadError;
            }

            const { data: publicUrlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            console.log("Public URL:", publicUrlData.publicUrl); // Debug log

            handleChange(field, publicUrlData.publicUrl);
            toast.success("Image uploaded!");
        } catch (error: any) {
            console.error(error);
            toast.error(`Upload failed: ${error.message}`);
        } finally {
            toast.dismiss(toastId);
        }
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
                <section className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-700">Basic Info</h3>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Role</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Designer"
                            />
                        </div>

                        {/* Locked Company & Bio (Hidden or Readonly) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                value={data.company}
                                readOnly
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-700">Contact</h3>

                    {/* Helper function to handle email change */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={data.email.split('@')[0]}
                                    onChange={(e) => handleChange('email', `${e.target.value}@get-shapes.com`)}
                                    className="flex-1 px-4 py-2 rounded-l-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none border-r-0"
                                    placeholder="name"
                                />
                                <span className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-r-xl text-gray-500 font-medium whitespace-nowrap">
                                    @get-shapes.com
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">Your professional Shapes email address.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="+1 234 567 890"
                        />
                        <p className="text-xs text-gray-500 mt-1">Include country code for WhatsApp (e.g. +1...)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                            type="text"
                            value={data.website}
                            readOnly
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                        />
                    </div>
                </section>

                {/* Images */}
                <section className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-700">Identity</h3>

                    {/* Avatar Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                {data.avatarUrl?.startsWith('#') ? (
                                    <div className="w-12 h-12 rounded-full border border-gray-200" style={{ backgroundColor: data.avatarUrl }} />
                                ) : (
                                    <img src={data.avatarUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                                )}
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleChange('avatarUrl', '#000000')}
                                            className={`px-3 py-1 text-xs rounded-lg border ${data.avatarUrl?.startsWith('#') ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                                        >
                                            Color
                                        </button>
                                        <button
                                            onClick={() => handleChange('avatarUrl', '/images/ShapesBL150.png')}
                                            className={`px-3 py-1 text-xs rounded-lg border ${!data.avatarUrl?.startsWith('#') ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                                        >
                                            Image
                                        </button>
                                    </div>

                                    {data.avatarUrl?.startsWith('#') ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={data.avatarUrl}
                                                onChange={(e) => handleChange('avatarUrl', e.target.value)}
                                                className="w-8 h-8 rounded-full border-0 p-0 overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-xs font-mono text-gray-500">{data.avatarUrl}</span>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, 'avatarUrl')}
                                            className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cover Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                        <div className="flex flex-col gap-3">
                            <div className="relative h-16 w-full rounded-lg overflow-hidden border border-gray-200">
                                {data.coverUrl?.startsWith('#') ? (
                                    <div className="w-full h-full" style={{ backgroundColor: data.coverUrl }} />
                                ) : (
                                    <img src={data.coverUrl} alt="Preview" className="w-full h-full object-cover" />
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleChange('coverUrl', '#000000')}
                                        className={`px-3 py-1 text-xs rounded-lg border ${data.coverUrl?.startsWith('#') ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                                    >
                                        Color
                                    </button>
                                    <button
                                        onClick={() => handleChange('coverUrl', '/images/White.png')}
                                        className={`px-3 py-1 text-xs rounded-lg border ${!data.coverUrl?.startsWith('#') ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                                    >
                                        Image
                                    </button>
                                </div>

                                {data.coverUrl?.startsWith('#') ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={data.coverUrl}
                                            onChange={(e) => handleChange('coverUrl', e.target.value)}
                                            className="w-8 h-8 rounded-full border-0 p-0 overflow-hidden cursor-pointer"
                                        />
                                        <span className="text-xs font-mono text-gray-500">{data.coverUrl}</span>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'coverUrl')}
                                        className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                                    />
                                )}
                            </div>
                        </div>
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
