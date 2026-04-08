const db = require('../../db');

class CertificateModel {
    static async getUserCertificates(userId) {
        const query = `
            SELECT certificate_id as id, 
                   cert_title as title, 
                   cert_description as description, 
                   DATE_FORMAT(issue_date, '%b %d, %Y') as issueDate, 
                   auth_id as authId, 
                   image_url as image, 
                   tag_name as tag, 
                   tag_color as tagColor
            FROM certificates 
            WHERE user_id = ?
            ORDER BY issue_date DESC
        `;
        const [rows] = await db.query(query, [userId]);
        return rows;
    }

    static async getCertificateStats(userId) {
        const badgesQuery = `SELECT IFNULL(SUM(current_streak), 0) as totalBadges FROM streaks WHERE user_id = ?`;
        const [badgeRows] = await db.query(badgesQuery, [userId]);
        
        const certsQuery = `SELECT COUNT(*) as expertCerts FROM certificates WHERE user_id = ? AND tag_name = 'EXPERT'`;
        const [certRows] = await db.query(certsQuery, [userId]);

        return {
            totalBadges: badgeRows[0].totalBadges,
            expertCerts: certRows[0].expertCerts
        };
    }
}

module.exports = CertificateModel;
