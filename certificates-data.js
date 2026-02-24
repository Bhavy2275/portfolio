/**
 * ============================================================
 *  CERTIFICATES DATA — BHAVYA SONI
 *  ============================================================
 *  HOW TO ADD A NEW COURSERA CERTIFICATE:
 *
 *  1. Copy one of the objects below and paste it at the TOP of
 *     the `certificates` array (newest first).
 *  2. Fill in:
 *     - title        : exact course name from Coursera
 *     - issuer       : university / company that issued it
 *     - date         : completion date as "YYYY-MM-DD"
 *     - credentialUrl: the Coursera verify link (e.g. https://coursera.org/verify/XXXXXX)
 *     - skills       : up to 4 skills the course covered
 *  3. Save the file and refresh the portfolio — done!
 *
 *  AUTOMATION TIP:
 *  Use Zapier → "New Email matching search" (filter for emails
 *  from no-reply@coursera.org) → "Code by Zapier" step to paste
 *  the new entry here automatically via a GitHub API commit.
 * ============================================================
 */

window.CERTS_DATA = {
    lastUpdated: "2026-02-24",
    certificates: [

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
