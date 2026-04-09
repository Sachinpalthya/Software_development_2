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
}

module.exports = new ContestService();
