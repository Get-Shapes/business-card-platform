import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { EditorView } from '../components/EditorView';
import { CardView } from '../components/CardView';
import { initialProfile } from '../data/initialData';
import type { ProfileData } from '../data/initialData';
import { LogOut, Loader2, Save, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const Dashboard = () => {
    const [profile, setProfile] = useState<ProfileData>(initialProfile);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else if (data) {
                // Set username for public link
                setUsername(data.username || user.id);

                // Map database fields to application state
                setProfile({
                    id: data.id,
                    name: data.full_name || '',
                    title: data.title || '',
                    company: data.company || '',
                    bio: data.bio || '',
                    avatarUrl: data.avatar_url || '',
                    coverUrl: data.cover_url || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    location: data.location || '',
                    website: data.website || '',
                    socialLinks: data.social_links || [],
                    theme: data.theme || initialProfile.theme
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleSave = async (updatedProfile: ProfileData) => {
        setProfile(updatedProfile);
        // Debounce or manual save could go here. 
        // For now we'll rely on the manual Save button in the header.
    };

    const persistChanges = async () => {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: profile.name,
                    title: profile.title,
                    company: profile.company,
                    bio: profile.bio,
                    avatar_url: profile.avatarUrl,
                    cover_url: profile.coverUrl,
                    email: profile.email,
                    phone: profile.phone,
                    location: profile.location,
                    website: profile.website,
                    social_links: profile.socialLinks,
                    theme: profile.theme,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            toast.error('Failed to save profile');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar Editor */}
            <div className="w-full md:w-[400px] bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <h1 className="font-bold text-lg">Editor</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={persistChanges}
                            disabled={saving}
                            className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                            title="Save Changes"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <EditorView data={profile} onChange={handleSave} />
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-gray-50 relative overflow-y-auto">
                <div className="absolute top-4 right-4 z-10">
                    <a
                        href={`/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium hover:shadow-md transition-all text-gray-700"
                    >
                        View Public <ExternalLink size={14} />
                    </a>
                </div>
                <CardView data={profile} />
            </div>
        </div>
    );
};
