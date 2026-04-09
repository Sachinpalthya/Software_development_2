const db = require('../../db');

class LeaderboardModel {
    static async getTopUsers() {
        const query = `
            SELECT 
                u.user_id, 
                u.full_name, 
                l.total_score, 
                l.rank_position
            FROM leaderboard l
            JOIN users u ON l.user_id = u.user_id
            ORDER BY l.total_score DESC
            LIMIT 50
        `;
        const [rows] = await db.query(query);
        return rows;
    }
}

module.exports = LeaderboardModel;
