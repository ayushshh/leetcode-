import { SubmissionHistory } from '@/modules/problems/components/submission-history';
import { getCurrentUserData } from '@/modules/profile/actions'
import PlaylistsSection from '@/modules/profile/components/playlist-section';
import ProfileStats from '@/modules/profile/components/profile-stats';
import SolvedProblems from '@/modules/profile/components/solved-problems';
import UserInfoCard from '@/modules/profile/components/user-info-card'

async function ProfilePage() {
    const result = await getCurrentUserData();

    if (!result.data) {
        return (
            <div className='min-h-screen py-32 flex items-center justify-center'>
                <p className='text-muted-foreground'>
                    {'error' in result ? result.error : 'Failed to load profile data.'}
                </p>
            </div>
        );
    }

    const userData = result.data;

    return (
        <div className='min-h-screen py-32'>
            <div className='container mx-auto px-4 max-w-6xl'>
                <UserInfoCard userData={userData} />
                <ProfileStats
                    submissions={userData.submissions}
                    solvedCount={userData.solvedProblems.length}
                    playlistCount={userData.playlists.length}
                />
                <SubmissionHistory submissions={userData.submissions} />
                <div className='grid gap-8 mt-10'>
                    <SolvedProblems solvedProblems={userData.solvedProblems} />
                    <PlaylistsSection playlists={userData.playlists} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage