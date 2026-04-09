class ContestModel {
    static async getContestDetails() {
        return {
            title: "Weekly Contest #42",
            description: "Push your limits in our premier weekly algorithm challenge. Compete against 15,000+ developers worldwide for glory and exclusive rank points.",
            participants: "12,482",
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
            weeklyLeaderboard: [
                { rank: 1, name: "ByteMaster", score: 1850, time: "45m 12s", isTop: true },
                { rank: 2, name: "AlgoWiz", score: 1820, time: "48m 05s", isTop: false },
                { rank: 3, name: "CodeNinja", score: 1790, time: "52m 33s", isTop: false },
                { rank: 4, name: "DevPro", score: 1750, time: "55m 10s", isTop: false }
            ],
            dailyLeaderboard: [
                { rank: 1, name: "AlgoWiz", score: 500, time: "18m 22s", isTop: true },
                { rank: 2, name: "CodeNinja", score: 480, time: "20m 10s", isTop: false },
                { rank: 3, name: "DevPro", score: 450, time: "21m 45s", isTop: false },
                { rank: 4, name: "SyntaxError", score: 400, time: "25m 00s", isTop: false }
            ],
            practiceArena: [
                { title: "Weekly Contest #41", time: "Last Week", score: "1200 / 2000", maxScore: 2000, currentScore: 1200 },
                { title: "Weekly Contest #40", time: "2 Weeks Ago", score: "2000 / 2000 (Perfect!)", maxScore: 2000, currentScore: 2000 },
                { title: "Strings & Arrays Special", time: "Special", score: "Not attempted yet", maxScore: 2000, currentScore: 0 }
            ]
        };
    }
}

module.exports = ContestModel;
