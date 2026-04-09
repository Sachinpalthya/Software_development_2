const LeaderboardModel = require('../models/leaderboardModel');

class LeaderboardService {
    static async getLeaderboardData(currentUserId) {
        let monthlyPodium = [];
        let monthlyList = [];
        let weeklyPodium = [];
        let weeklyList = [];

        const formatData = (dbUsers) => {
            const mapped = dbUsers.map((u, i) => {
                let init = u.full_name ? u.full_name.substring(0, 2).toUpperCase() : 'U';
                return {
                    id: u.user_id,
                    name: u.full_name,
                    xp: u.total_score, // this is either monthly streak or weekly points
                    rank: i + 1,
                    trend: null,
                    avatar: init,
                    isCurrentUser: u.user_id === currentUserId
                };
            });

            // In podium, 1st place is index 0, 2nd is index 1, 3rd is index 2
            // Let's reorder them so 2nd is left, 1st is center, 3rd is right exactly as before
            const podiumPositions = [1, 0, 2]; // map to [Silver, Gold, Bronze]
            const podium = [];
            
            for (let pos of podiumPositions) {
                if (mapped[pos]) {
                    podium.push({
                        ...mapped[pos],
                        reward: pos === 0 ? '85% All-Access Pass' : pos === 1 ? '50% Course Discount' : '25% Course Discount',
                        badgeClass: pos === 0 ? 'gold' : pos === 1 ? 'silver' : 'bronze',
                        badgeIcon: pos === 0 ? 'fa-trophy' : pos === 1 ? 'fa-medal' : 'fa-award',
                        isGrand: pos === 0
                    });
                }
            }

            const list = mapped.slice(3);

            return { podium, list };
        };

        try {
            const monthlyDbUsers = await LeaderboardModel.getMonthlyLeaderboard();
            const monthlyData = formatData(monthlyDbUsers);
            monthlyPodium = monthlyData.podium;
            monthlyList = monthlyData.list;

            const weeklyDbUsers = await LeaderboardModel.getWeeklyLeaderboard();
            const weeklyData = formatData(weeklyDbUsers);
            weeklyPodium = weeklyData.podium;
            weeklyList = weeklyData.list;
            
        } catch (err) {
            console.error("Error fetching db for leaderboard", err);
        }

        return {
            title: 'Rankings | SkillStreak',
            monthlyPodium,
            monthlyList,
            weeklyPodium,
            weeklyList,
            currentUserId
        };
    }
}

module.exports = LeaderboardService;
