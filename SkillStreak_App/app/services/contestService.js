const ContestModel = require('../models/contestModel');

class ContestService {
    async getContestData() {
        const contestDetails = await ContestModel.getContestDetails();
        return {
            title: 'Contest | SkillStreak',
            contestDetails,
            showNavbar: true,
            showFooter: true
        };
    }

    async submitContest(userId, contestId) {
        // Calculate dynamic score (mock)
        const score = 500; // Standard score for submission
        return await ContestModel.saveSubmission(userId, contestId, score);
    }
}

module.exports = new ContestService();
