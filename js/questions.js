/*
 * CyberQuiz question bank (200 questions)
 *
 * Required properties:
 * id, rank, topic, difficulty, q, options,
 * correct, why, hint
 *
 * Optional:
 * email (plain text)
 *
 * Rank levels and number of questions:
 * 0 = Associate     (30 questions)
 * 1 = Professional  (30 questions)
 * 2 = Practitioner  (40 questions)
 * 3 = Architect     (45 questions)
 * 4 = Expert        (55 questions)
 * Total: 200 questions
 *
 * Coverage: core security awareness, phishing and social engineering,
 * identity, cloud, cryptography, secure development, incident response,
 * architecture, GRC, AI (LLM) security, malware analysis and
 * penetration testing.
 *
 * Note: all 200 questions have been checked for uniqueness (ids 1-200,
 * no duplicate or overlapping questions, 200 distinct topic labels).
 *
 * Correct-answer positions are balanced across A/B/C/D:
 * A=50, B=50, C=50, D=50 overall.
 * Per rank (A/B/C/D): Associate 8/7/8/7, Professional 7/8/7/8,
 * Practitioner 10/10/10/10, Architect 11/12/11/11, Expert 14/13/14/14.
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
    options: ["Enable full-disk encryption","Give every colleague an administrator account on the laptop","Save passwords in a plain-text file on the desktop","Disable the screen lock to make access quicker"],
    correct: 0, why: "Full-disk encryption helps protect stored data against unauthorised access if a device is lost or stolen.",
    hint: "Consider which control protects the data itself, not just access to the desktop."
  },
  {
    id: 6, rank: 1, topic: "Phishing Triage", difficulty: "INTERMEDIATE",
    email: "FROM: IT Support <support@company-security.example>\nSUBJECT: Urgent: Your account will be suspended\n\nYour mailbox will be disabled within 30 minutes. Verify your account immediately using the link below to avoid losing access.\n\nLINK: https://company-security.example/verify",
    q: "What is the safest response to this email?",
    options: ["Click the link because the message appears to come from the IT Support team","Verify the request through a trusted IT channel and report the email","Reply with your password to confirm your identity","Forward the message to colleagues to check whether they also received it"],
    correct: 1, why: "Urgency and threats of account suspension are common phishing tactics. Verify the request independently and report the suspicious message.",
    hint: "Do not trust the sender name or use contact details supplied in a suspicious email."
  },
  {
    id: 7, rank: 1, topic: "Payroll Phishing", difficulty: "INTERMEDIATE",
    email: "FROM: Payroll Team <payroll@company-payroll.example>\nSUBJECT: Action required: Salary payment issue\n\nWe could not process your latest salary payment. Open the attached document and enter your employee login details to release your payment.",
    q: "Which is the strongest warning sign in this message?",
    options: ["It mentions payroll and a problem with processing a salary payment","It was received during normal working hours on a weekday morning","It refers to a payment issue affecting the employee's latest salary","It asks for login details through an unexpected attachment"],
    correct: 3, why: "Unexpected attachments that request credentials can be used to steal login details. Verify the issue with payroll through a trusted channel.",
    hint: "Focus on the unexpected request to provide credentials."
  },
  {
    id: 8, rank: 1, topic: "Document-Sharing Phishing", difficulty: "INTERMEDIATE",
    email: "FROM: Cloud Storage <sharing@cloud-files.example>\nSUBJECT: A document has been shared with you\n\nA colleague has shared a confidential document. Sign in immediately to review it. The document will be deleted in 10 minutes.\n\nLINK: https://cloud-files.example/document",
    q: "What should you do before opening the shared document?",
    options: ["Verify the sharing request through a trusted channel","Sign in immediately to stop the document being deleted","Disable your browser's security protections so the page loads","Enter your credentials because the email mentions a colleague"],
    correct: 0, why: "Unexpected document-sharing messages can be used to steal credentials. Verify the request and access the service through its known official address.",
    hint: "Urgency and a familiar-sounding context do not prove the request is genuine."
  },
  {
    id: 9, rank: 2, topic: "Business Email Compromise", difficulty: "ADVANCED",
    email: "FROM: Managing Director <director@company-payments.example>\nSUBJECT: Confidential: Urgent supplier payment\n\nI am in a meeting and cannot take calls. Please transfer £8,750 to the supplier account below today. Keep this confidential until the payment is complete.",
    q: "What is the most appropriate action?",
    options: ["Make the transfer because the request appears to come from a senior executive","Reply to the same email asking whether the payment is really urgent","Transfer a smaller amount first to test whether the account is genuine","Follow payment verification procedures using an independent channel"],
    correct: 3, why: "Business email compromise exploits authority, urgency and secrecy. Verify payment requests independently and follow the organisation's approval procedures.",
    hint: "Use established verification procedures rather than relying on the sender's apparent identity."
  },
  {
    id: 10, rank: 2, topic: "Credential Theft", difficulty: "ADVANCED",
    email: "FROM: Security Notifications <alerts@account-protection.example>\nSUBJECT: Unusual sign-in detected\n\nWe detected an unfamiliar sign-in to your account. Use the link below to review the activity and secure your account. If you do not act now, access may be restricted.\n\nLINK: https://account-protection.example/review",
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
    options: ["Lock the screen","Leave it unlocked if you will be back soon","Write your password on a note","Share your session with a colleague"],
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
    options: ["It may contain malware or bypass controls","It always uses too much memory on managed devices","It permanently prevents operating system updates","It makes encryption impossible in every case"],
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
    options: ["It makes every account share one convenient password","It prevents every form of account compromise or phishing","It generates and stores unique passwords","It means MFA is no longer useful on any account"],
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
    options: ["The chance of harm if a threat exploits a vulnerability","Any software on the network that is out of date or no longer supported","A password that has expired and must be changed by the user","A guaranteed attack on a system that has not been patched"],
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
    options: ["Written authorisation that defines the scope","Verbal approval from any employee who works at the target","A copy of the target's administrator passwords","Nothing, as long as the aim is to help the organisation"],
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
    email: "FROM: Accounts <invoices@supplier-billing.example>\nSUBJECT: Overdue invoice\n\nPlease see the attached invoice. If the document appears blank, click 'Enable Content' to view it.",
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
  }
];
