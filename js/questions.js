
/*
 * CyberQuiz question bank
 * Compatible with the existing cyberquiz.js.
 *
 * Required properties:
 * id, rank, topic, difficulty, q, options,
 * correct, why, hint
 *
 * Optional:
 * email (plain text)
 *
 * Rank levels:
 * 0 = Associate
 * 1 = Professional
 * 2 = Practitioner
 * 3 = Architect
 * 4 = Expert
 */

window.CYBERQUIZ_QUESTIONS = [
  {
    id: 1,
    rank: 0,
    topic: "Password Security",
    difficulty: "BEGINNER",
    q: "Which of the following is the strongest password practice?",
    options: [
      "Use the same strong password everywhere",
      "Use a unique password for every account",
      "Change every password every week",
      "Use your date of birth with special characters"
    ],
    correct: 1,
    why: "Using a unique password for each account limits the impact of a breach on other accounts.",
    hint: "Think about what happens if one website suffers a data breach."
  },

  {
    id: 2,
    rank: 0,
    topic: "Phishing",
    difficulty: "BEGINNER",
    q: "What is phishing?",
    options: [
      "A method of encrypting files",
      "An attempt to trick people into revealing information or taking unsafe actions",
      "A technique for improving network speed",
      "A legitimate method of verifying identity"
    ],
    correct: 1,
    why: "Phishing uses deceptive messages or websites to manipulate people into revealing sensitive information or performing unsafe actions.",
    hint: "Consider how attackers use deception to manipulate people."
  },

  {
    id: 3,
    rank: 0,
    topic: "Multi-Factor Authentication",
    difficulty: "BEGINNER",
    q: "What is the main benefit of multi-factor authentication (MFA)?",
    options: [
      "It removes the need for passwords in every situation",
      "It adds another layer of verification beyond a single factor",
      "It prevents every phishing attack",
      "It makes all devices anonymous"
    ],
    correct: 1,
    why: "MFA adds another verification factor, making accounts harder to compromise when a password is stolen.",
    hint: "Think about what an attacker would still need after stealing a password."
  },

  {
    id: 4,
    rank: 0,
    topic: "Software Security",
    difficulty: "BEGINNER",
    q: "Why should software updates be installed promptly?",
    options: [
      "They always make software run faster",
      "They remove the need for antivirus software",
      "They can fix known vulnerabilities and security defects",
      "They prevent all future cyberattacks"
    ],
    correct: 2,
    why: "Security updates often patch known vulnerabilities that attackers could otherwise exploit.",
    hint: "Focus on vulnerabilities that have already been discovered."
  },

  {
    id: 5,
    rank: 0,
    topic: "Data Protection",
    difficulty: "BEGINNER",
    q: "Which action best protects sensitive data stored on a laptop if it is lost or stolen?",
    options: [
      "Give every colleague an administrator account",
      "Enable full-disk encryption",
      "Save passwords in a plain-text file",
      "Disable the screen lock"
    ],
    correct: 1,
    why: "Full-disk encryption helps protect stored data against unauthorised access if a device is lost or stolen.",
    hint: "Consider which control protects the data itself, not just access to the desktop."
  },

  {
    id: 6,
    rank: 1,
    topic: "Phishing",
    difficulty: "INTERMEDIATE",
    email:
      "FROM: IT Support <support@company-security.example>\n" +
      "SUBJECT: Urgent: Your account will be suspended\n\n" +
      "Your mailbox will be disabled within 30 minutes. " +
      "Verify your account immediately using the link below " +
      "to avoid losing access.\n\n" +
      "LINK: https://company-security.example/verify",
    q: "What is the safest response to this email?",
    options: [
      "Click the link because the message comes from IT Support",
      "Reply with your password to confirm your identity",
      "Verify the request through a trusted IT channel and report the email",
      "Forward the message to colleagues to see whether they received it"
    ],
    correct: 2,
    why: "Urgency and threats of account suspension are common phishing tactics. Verify the request independently and report the suspicious message.",
    hint: "Do not trust the sender name or use contact details supplied in a suspicious email."
  },

  {
    id: 7,
    rank: 1,
    topic: "Phishing",
    difficulty: "INTERMEDIATE",
    email:
      "FROM: Payroll Team <payroll@company-payroll.example>\n" +
      "SUBJECT: Action required: Salary payment issue\n\n" +
      "We could not process your latest salary payment. " +
      "Open the attached document and enter your employee " +
      "login details to release your payment.",
    q: "Which is the strongest warning sign in this message?",
    options: [
      "It mentions payroll",
      "It asks you to enter login details through an unexpected attachment",
      "It was received during working hours",
      "It refers to an employee payment"
    ],
    correct: 1,
    why: "Unexpected attachments that request credentials can be used to steal login details. Verify the issue with payroll through a trusted channel.",
    hint: "Focus on the unexpected request to provide credentials."
  },

  {
    id: 8,
    rank: 1,
    topic: "Phishing",
    difficulty: "INTERMEDIATE",
    email:
      "FROM: Cloud Storage <sharing@cloud-files.example>\n" +
      "SUBJECT: A document has been shared with you\n\n" +
      "A colleague has shared a confidential document. " +
      "Sign in immediately to review it. The document will " +
      "be deleted in 10 minutes.\n\n" +
      "LINK: https://cloud-files.example/document",
    q: "What should you do before opening the shared document?",
    options: [
      "Sign in immediately to prevent deletion",
      "Verify the sender and sharing request through a trusted channel",
      "Disable your browser's security protections",
      "Enter your credentials because the email mentions a colleague"
    ],
    correct: 1,
    why: "Unexpected document-sharing messages can be used to steal credentials. Verify the request and access the service through its known official address.",
    hint: "Urgency and a familiar-sounding context do not prove the request is genuine."
  },

  {
    id: 9,
    rank: 2,
    topic: "Business Email Compromise",
    difficulty: "ADVANCED",
    email:
      "FROM: Managing Director <director@company-payments.example>\n" +
      "SUBJECT: Confidential: Urgent supplier payment\n\n" +
      "I am in a meeting and cannot take calls. Please transfer " +
      "£8,750 to the supplier account below today. Keep this " +
      "confidential until the payment is complete.",
    q: "What is the most appropriate action?",
    options: [
      "Make the transfer because the request comes from a senior executive",
      "Reply to the email asking whether the payment is urgent",
      "Follow the organisation's payment verification procedure using an independent trusted channel",
      "Transfer a smaller amount first to test the account"
    ],
    correct: 2,
    why: "Business email compromise exploits authority, urgency and secrecy. Verify payment requests independently and follow the organisation's approval procedures.",
    hint: "Use established verification procedures rather than relying on the sender's apparent identity."
  },

  {
    id: 10,
    rank: 2,
    topic: "Credential Theft",
    difficulty: "ADVANCED",
    email:
      "FROM: Security Notifications <alerts@account-protection.example>\n" +
      "SUBJECT: Unusual sign-in detected\n\n" +
      "We detected an unfamiliar sign-in to your account. " +
      "Use the link below to review the activity and secure " +
      "your account. If you do not act now, access may be restricted.\n\n" +
      "LINK: https://account-protection.example/review",
    q: "How should you investigate this notification safely?",
    options: [
      "Open the link and enter your password to check the alert",
      "Ignore every account security notification",
      "Navigate directly to the service through its known official app or website and review account activity",
      "Send your password to the sender so they can investigate"
    ],
    correct: 2,
    why: "Security alerts can be genuine or fraudulent. Avoid unexpected links and check your account using the official app or a known website address.",
    hint: "You can investigate the alert without using the link in the email."
  }
];

