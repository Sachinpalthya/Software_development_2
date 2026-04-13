const db = require('../../db');

class ContestModel {
    static async getContestDetails() {
        // Fetch the latest contest
        const [contests] = await db.execute('SELECT * FROM contests ORDER BY created_at DESC LIMIT 1');
        let latestContest = contests.length > 0 ? contests[0] : null;

        // Fetch participant count and leaderboard for the latest contest
        let participantsCount = 0;
        let mappedLeaderboard = [];

        if (latestContest) {
            // Count participants
            const [parts] = await db.execute('SELECT COUNT(*) as count FROM contest_participants WHERE contest_id = ?', [latestContest.contest_id]);
            participantsCount = parts[0].count;

            // Fetch top participants for this specific contest
            const [participantsData] = await db.execute(`
                SELECT u.full_name, cp.score, cp.submitted_at
                FROM contest_participants cp
                JOIN users u ON cp.user_id = u.user_id
                WHERE cp.contest_id = ?
                ORDER BY cp.score DESC, cp.submitted_at ASC
                LIMIT 4
            `, [latestContest.contest_id]);

            mappedLeaderboard = participantsData.map((row, index) => ({
                rank: index + 1,
                name: row.full_name,
                score: row.score,
                time: "N/A", // We can't calculate exact duration without start time, so keep N/A
                isTop: index === 0
            }));
        }

        // Fill remaining places with mock if db is empty or less than 4
        const finalLeaderboard = mappedLeaderboard.length >= 4 ? mappedLeaderboard : [
            ...mappedLeaderboard,
            { rank: mappedLeaderboard.length + 1, name: "AlgoWiz", score: 1820, time: "48m 05s", isTop: mappedLeaderboard.length === 0 },
            { rank: mappedLeaderboard.length + 2, name: "CodeNinja", score: 1790, time: "52m 33s", isTop: false },
            { rank: mappedLeaderboard.length + 3, name: "DevPro", score: 1750, time: "55m 10s", isTop: false },
            { rank: mappedLeaderboard.length + 4, name: "ByteMaster", score: 1700, time: "58m 20s", isTop: false }
        ].slice(0, 4);

        return {
            contest_id: latestContest ? latestContest.contest_id : 1,
            title: latestContest ? latestContest.contest_title : "Weekly Contest #42",
            description: latestContest ? latestContest.contest_description : "Push your limits in our premier weekly algorithm challenge. Compete against 15,000+ developers worldwide for glory and exclusive rank points.",
            participants: (participantsCount || 12482).toString(),
            prizePool: "5,000 pts",
            difficulty: "Hard",
            problem: {
                id: "P3",
                title: "Dynamic Path Finder",
                points: 500,
                timeLimit: "2.0s",
                description: `Given a 2D grid of size <code>N x M</code>, find the minimum cost to travel from the top-left cell to the bottom-right cell. You can only move <strong>Down</strong> or <strong>Right</strong>.`,
                inputFormat: `The first line contains integers N and M. The following N lines contain M integers representing cell costs.`,
                sampleInput: `3 3\n1 3 1\n1 5 1\n4 2 1`,
                starterCode: `def solve_grid(grid):\n    n = len(grid)\n    m = len(grid[0])\n    # Initialize DP table\n    dp = [[0] * m for _ in range(n)]\n\n    # Your implementation here\n    dp[0][0] = grid[0][0]\n    \n    pass`
            },
            weeklyLeaderboard: finalLeaderboard,
            dailyLeaderboard: finalLeaderboard,
            practiceArena: [
                { title: "Weekly Contest #41", time: "Last Week", score: "1200 / 2000", maxScore: 2000, currentScore: 1200 },
                { title: "Weekly Contest #40", time: "2 Weeks Ago", score: "2000 / 2000 (Perfect!)", maxScore: 2000, currentScore: 2000 },
                { title: "Strings & Arrays Special", time: "Special", score: "Not attempted yet", maxScore: 2000, currentScore: 0 }
            ]
        };
    }

    static async saveSubmission(userId, contestId, score) {
        // Check if user already participated in this contest
        const [existing] = await db.execute('SELECT * FROM contest_participants WHERE user_id = ? AND contest_id = ?', [userId, contestId]);
        
        if (existing.length > 0) {
            // Update score if historical score is lower
            if (score > existing[0].score) {
                await db.execute('UPDATE contest_participants SET score = ?, submitted_at = NOW() WHERE participation_id = ?', [score, existing[0].participation_id]);
            }
            return { participation_id: existing[0].participation_id };
        } else {
            // Insert new participation record
            const [result] = await db.execute('INSERT INTO contest_participants (contest_id, user_id, score) VALUES (?, ?, ?)', [contestId, userId, score]);
            return { participation_id: result.insertId };
        }
    }
}

module.exports = ContestModel;
