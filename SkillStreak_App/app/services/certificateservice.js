class CertificateService {
    static getCertificatesData() {
        return {
            title: 'Certificate Gallery | SkillStreak',
            stats: {
                totalBadges: 12,
                expertCerts: 4
            },
            certificates: [
                {
                    id: 1,
                    title: 'Mastering React',
                    description: 'Advanced state management, performance hooks, and architectural patterns for enterprise apps.',
                    issueDate: 'Oct 24, 2024',
                    authId: 'SKL-RT-9821-X',
                    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
                    tag: 'EXPERT',
                    tagColor: '#f59e0b'
                },
                {
                    id: 2,
                    title: 'Agile Leadership',
                    description: 'Strategic framework implementation, scrum mastery, and high-velocity team orchestration.',
                    issueDate: 'Sep 12, 2024',
                    authId: 'SKL-AG-4482-B',
                    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80',
                    tag: 'PROFESSIONAL',
                    tagColor: '#3b82f6'
                },
                {
                    id: 3,
                    title: 'Cloud Architecture',
                    description: 'Designing scalable microservices, serverless deployments, and multi-region networking.',
                    issueDate: 'Aug 05, 2024',
                    authId: 'SKL-CL-1103-W',
                    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
                    tag: 'EXPERT',
                    tagColor: '#f59e0b'
                }
            ],
            premier: {
                title: 'Senior Full-Stack Architect',
                credentialText: 'This credential verifies the successful completion of the SkillStreak Professional Path for Senior Systems Engineering. Validated through 48 rigorous technical assessments and 3 capstone deployments.',
                verifiedType: 'Cryptographically Signed'
            }
        };
    }
}

module.exports = CertificateService;
