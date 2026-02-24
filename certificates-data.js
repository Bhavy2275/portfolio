/**
 * ============================================================
 *  MY CERTIFICATES — SONI BHAVYA VINAY
 *  ============================================================
 *  HOW TO ADD A CERTIFICATE:
 *
 *  1. Copy the template below and paste it at the VERY TOP
 *     of the `certificates` array (newest certificates first).
 *
 *  2. Fill in the fields:
 *     - id           : any unique short name, no spaces (e.g. "ml-course-2026")
 *     - title        : exact course name
 *     - platform     : "Coursera", "Udemy", etc.
 *     - issuer       : university or company (e.g. "Google", "Stanford")
 *     - date         : completion date as "YYYY-MM-DD"
 *     - credentialUrl: the verify link from Coursera (or leave "" if none)
 *     - skills       : up to 4 skills the course covered
 *
 *  3. Save this file → refresh the portfolio → done!
 *     Certificates added within the last 30 days get a NEW badge.
 *
 *  TEMPLATE (copy this):
 *  ─────────────────────
 *  {
 *    id: "course-name-2026",
 *    title: "Course Title Here",
 *    platform: "Coursera",
 *    issuer: "Issuer Name",
 *    date: "2026-01-01",
 *    credentialUrl: "https://coursera.org/verify/XXXXXX",
 *    skills: ["Skill 1", "Skill 2", "Skill 3"],
 *    imageUrl: ""
 *  },
 * ============================================================
 */

window.CERTS_DATA = {
    lastUpdated: "2026-02-24",
    certificates: [

        // ── ADD NEW CERTIFICATES ABOVE THIS LINE ──────────────────

        {
            id: "crypto-specialization",
            title: "Cryptography Specialization",
            platform: "Coursera",
            issuer: "Stanford University",
            date: "2024-12-01",
            credentialUrl: "",
            skills: ["Cryptography", "Security", "Algorithms", "RSA"],
            imageUrl: ""
        },

        {
            id: "ai-tools-workshop",
            title: "AI Tools Workshop",
            platform: "Coursera",
            issuer: "Coursera",
            date: "2024-10-15",
            credentialUrl: "",
            skills: ["AI", "Machine Learning", "Productivity", "Automation"],
            imageUrl: ""
        },

        {
            id: "mern-stack",
            title: "MERN Stack Development",
            platform: "Coursera",
            issuer: "Meta",
            date: "2024-08-20",
            credentialUrl: "",
            skills: ["MongoDB", "Express.js", "React", "Node.js"],
            imageUrl: ""
        },

        {
            id: "fullstack-cert",
            title: "Full-Stack Development Certificate",
            platform: "Coursera",
            issuer: "Meta",
            date: "2024-06-10",
            credentialUrl: "",
            skills: ["React", "JavaScript", "REST APIs", "Git"],
            imageUrl: ""
        }

    ]
};
