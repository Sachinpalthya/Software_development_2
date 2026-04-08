const CertificateModel = require('../models/certificatemodel');

class CertificateService {
    static async getCertificatesData(userId) {
        // Fetch dynamic data from database model
        const stats = await CertificateModel.getCertificateStats(userId);
        const certificates = await CertificateModel.getUserCertificates(userId);

        return {
            title: 'Certificate Gallery | SkillStreak',
            stats: {
                totalBadges: stats.totalBadges || 0,
                expertCerts: stats.expertCerts || 0
            },
            certificates: certificates,
            premier: {
                title: 'Senior Full-Stack Architect',
                credentialText: 'This credential verifies the successful completion of the SkillStreak Professional Path for Senior Systems Engineering. Validated through 48 rigorous technical assessments and 3 capstone deployments.',
                verifiedType: 'Cryptographically Signed'
            }
        };
    }
}

module.exports = CertificateService;
