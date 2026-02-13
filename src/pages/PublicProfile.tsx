import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CardView } from '../components/CardView';
import { initialProfile } from '../data/initialData';
import type { ProfileData } from '../data/initialData';
import { Loader2, AlertCircle } from 'lucide-react';

export const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!username) return;

            // Try finding by username first, fallback to ID if needed (though username is cleaner)
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .or(`username.eq.${username},id.eq.${username}`)
                .single();

            if (error || !data) {
                setError('Profile not found');
            } else {
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
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500 gap-4">
                <AlertCircle size={48} />
                <h1 className="text-xl font-semibold">{error}</h1>
            </div>
        );
    }

    return <CardView data={profile} />;
};
