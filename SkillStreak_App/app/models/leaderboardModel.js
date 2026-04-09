const db = require('../../db');

class LeaderboardModel {
    static async getMonthlyLeaderboard() {
        const query = `
            SELECT 
                u.user_id, 
                u.full_name, 
                l.score as total_score, 
                l.rank_position
            FROM leaderboard l
            JOIN users u ON l.user_id = u.user_id
            WHERE l.leaderboard_type = 'monthly_streak'
            ORDER BY l.score DESC
            LIMIT 50
        `;
        const [rows] = await db.query(query);
        return rows;
    }

    static async getWeeklyLeaderboard() {
        const query = `
            SELECT 
                u.user_id, 
                u.full_name, 
                l.score as total_score, 
                l.rank_position
            FROM leaderboard l
            JOIN users u ON l.user_id = u.user_id
            WHERE l.leaderboard_type = 'weekly_contest'
            ORDER BY l.score DESC
            LIMIT 50
        `;
        const [rows] = await db.query(query);
        return rows;
    }
}

module.exports = LeaderboardModel;
