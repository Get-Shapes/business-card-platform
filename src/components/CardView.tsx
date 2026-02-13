import React from 'react';
import type { ProfileData, SocialLink } from '../data/initialData';
import { getIcon } from '../utils/iconMap';
import { Phone, Mail, Globe, ExternalLink, MessageCircle } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';

interface CardViewProps {
    data: ProfileData;
}

export const CardView: React.FC<CardViewProps> = ({ data }) => {
    const { theme } = data;

    const handleSaveContact = () => {
        downloadVCard(data);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: theme.backgroundColor }}>
            <div
                className="w-full max-w-md rounded-[2rem] overflow-hidden relative shadow-2xl transition-all duration-300"
                style={{
                    background: theme.cardStyle === 'glass' ? 'rgba(255, 255, 255, 0.7)' : '#ffffff',
                    backdropFilter: theme.cardStyle === 'glass' ? 'blur(20px)' : 'none',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
            >
                {/* Cover Image */}
                {data.coverUrl?.startsWith('#') ? (
                    <div className="w-full h-full" style={{ backgroundColor: data.coverUrl }} />
                ) : (
                    <div className="w-full h-full bg-gray-100/50 flex items-center justify-center">
                        <img src={data.coverUrl} alt="Cover" className="w-full h-full object-contain p-2" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
            </div>

            {/* Profile Content */}
            <div className="px-6 pb-8 -mt-16 relative z-10">
                <div className="flex flex-col items-center">
                    {/* Avatar */}
                    <div className="p-1.5 bg-white/30 backdrop-blur-md rounded-full shadow-lg">
                        {data.avatarUrl?.startsWith('#') ? (
                            <div className="w-28 h-28 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: data.avatarUrl }} />
                        ) : (
                            <img src={data.avatarUrl} alt={data.name} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm" />
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="text-center mt-3">
                        <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
                        <p className="text-sm font-medium text-gray-600 mt-1">{data.title} @ {data.company}</p>
                        <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">{data.bio}</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-4 mt-6 w-full justify-center">
                        <a href={`tel:${data.phone}`} className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-gray-700">
                            <Phone size={20} />
                            <span className="text-[10px] mt-1 font-medium">Call</span>
                        </a>

                        {/* WhatsApp Button */}
                        <a
                            href={`https://wa.me/${data.phone?.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-gray-700"
                        >
                            <MessageCircle size={20} className="text-[#25D366]" />
                            <span className="text-[10px] mt-1 font-medium">WhatsApp</span>
                        </a>

                        <a href={`mailto:${data.email}`} className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-gray-700">
                            <Mail size={20} />
                            <span className="text-[10px] mt-1 font-medium">Email</span>
                        </a>

                        <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-gray-700">
                            <Globe size={20} />
                            <span className="text-[10px] mt-1 font-medium">Web</span>
                        </a>
                    </div>

                    {/* Save Contact Button */}
                    <button
                        onClick={handleSaveContact}
                        className="mt-8 w-full py-4 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        style={{ background: theme.primaryColor }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Save Contact
                    </button>

                    {/* Social Links Grid */}
                    <div className="mt-8 w-full space-y-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">Socials</h3>
                        {data.socialLinks.filter((l: SocialLink) => l.active).map((link: SocialLink) => {
                            const Icon = getIcon(link.icon);
                            return (
                                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white/60 hover:bg-white backdrop-blur-sm rounded-xl transition-all shadow-sm hover:shadow-md group">
                                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-50 text-gray-700 group-hover:text-blue-500 transition-colors">
                                        <Icon size={20} />
                                    </div>
                                    <span className="ml-4 font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                                    <ExternalLink size={14} className="ml-auto text-gray-400 group-hover:text-gray-600" />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};
