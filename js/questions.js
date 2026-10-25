/*
 * CyberQuiz question bank
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
 *
 * Note: correct-answer positions are balanced across A/B/C/D
 * (25 each overall, 5 each per rank).
 */

window.CYBERQUIZ_QUESTIONS = [
  {
    id: 1, rank: 0, topic: "Password Security", difficulty: "BEGINNER",
    q: "Which of the following is the strongest password practice?",
    options: ["Use the same strong password everywhere","Change every password every week","Use a unique password for every account","Use your date of birth with special characters"],
    correct: 2, why: "Using a unique password for each account limits the impact of a breach on other accounts.",
    hint: "Think about what happens if one website suffers a data breach."
  },
  {
    id: 2, rank: 0, topic: "Phishing", difficulty: "BEGINNER",
    q: "What is phishing?",
    options: ["An attempt to trick people into revealing information or taking unsafe actions","A method of encrypting files","A technique for improving network speed","A legitimate method of verifying identity"],
    correct: 0, why: "Phishing uses deceptive messages or websites to manipulate people into revealing sensitive information or performing unsafe actions.",
    hint: "Consider how attackers use deception to manipulate people."
  },
  {
    id: 3, rank: 0, topic: "Multi-Factor Authentication", difficulty: "BEGINNER",
    q: "What is the main benefit of multi-factor authentication (MFA)?",
    options: ["It removes the need for passwords in every situation","It prevents every phishing attack","It makes all devices anonymous","It adds another layer of verification beyond a single factor"],
    correct: 3, why: "MFA adds another verification factor, making accounts harder to compromise when a password is stolen.",
    hint: "Think about what an attacker would still need after stealing a password."
  },
  {
    id: 4, rank: 0, topic: "Software Security", difficulty: "BEGINNER",
    q: "Why should software updates be installed promptly?",
    options: ["They always make software run faster","They can fix known vulnerabilities and security defects","They remove the need for antivirus software","They prevent all future cyberattacks"],
    correct: 1, why: "Security updates often patch known vulnerabilities that attackers could otherwise exploit.",
    hint: "Focus on vulnerabilities that have already been discovered."
  },
  {
    id: 5, rank: 0, topic: "Data Protection", difficulty: "BEGINNER",
    q: "Which action best protects sensitive data stored on a laptop if it is lost or stolen?",
    options: ["Enable full-disk encryption","Give every colleague an administrator account","Save passwords in a plain-text file","Disable the screen lock"],
    correct: 0, why: "Full-disk encryption helps protect stored data against unauthorised access if a device is lost or stolen.",
    hint: "Consider which control protects the data itself, not just access to the desktop."
  },
  {
    id: 6, rank: 1, topic: "Phishing", difficulty: "INTERMEDIATE",
    email: "FROM: IT Support <support@company-security.example>\nSUBJECT: Urgent: Your account will be suspended\n\nYour mailbox will be disabled within 30 minutes. Verify your account immediately using the link below to avoid losing access.\n\nLINK: https://company-security.example/verify",
    q: "What is the safest response to this email?",
    options: ["Click the link because the message comes from IT Support","Verify the request through a trusted IT channel and report the email","Reply with your password to confirm your identity","Forward the message to colleagues to see whether they received it"],
    correct: 1, why: "Urgency and threats of account suspension are common phishing tactics. Verify the request independently and report the suspicious message.",
    hint: "Do not trust the sender name or use contact details supplied in a suspicious email."
  },
  {
    id: 7, rank: 1, topic: "Phishing", difficulty: "INTERMEDIATE",
    email: "FROM: Payroll Team <payroll@company-payroll.example>\nSUBJECT: Action required: Salary payment issue\n\nWe could not process your latest salary payment. Open the attached document and enter your employee login details to release your payment.",
    q: "Which is the strongest warning sign in this message?",
    options: ["It mentions payroll","It was received during working hours","It refers to an employee payment","It asks you to enter login details through an unexpected attachment"],
    correct: 3, why: "Unexpected attachments that request credentials can be used to steal login details. Verify the issue with payroll through a trusted channel.",
    hint: "Focus on the unexpected request to provide credentials."
  },
  {
    id: 8, rank: 1, topic: "Phishing", difficulty: "INTERMEDIATE",
    email: "FROM: Cloud Storage <sharing@cloud-files.example>\nSUBJECT: A document has been shared with you\n\nA colleague has shared a confidential document. Sign in immediately to review it. The document will be deleted in 10 minutes.\n\nLINK: https://cloud-files.example/document",
    q: "What should you do before opening the shared document?",
    options: ["Verify the sender and sharing request through a trusted channel","Sign in immediately to prevent deletion","Disable your browser's security protections","Enter your credentials because the email mentions a colleague"],
    correct: 0, why: "Unexpected document-sharing messages can be used to steal credentials. Verify the request and access the service through its known official address.",
    hint: "Urgency and a familiar-sounding context do not prove the request is genuine."
  },
  {
    id: 9, rank: 2, topic: "Business Email Compromise", difficulty: "ADVANCED",
    email: "FROM: Managing Director <director@company-payments.example>\nSUBJECT: Confidential: Urgent supplier payment\n\nI am in a meeting and cannot take calls. Please transfer £8,750 to the supplier account below today. Keep this confidential until the payment is complete.",
    q: "What is the most appropriate action?",
    options: ["Make the transfer because the request comes from a senior executive","Reply to the email asking whether the payment is urgent","Transfer a smaller amount first to test the account","Follow the organisation's payment verification procedure using an independent trusted channel"],
    correct: 3, why: "Business email compromise exploits authority, urgency and secrecy. Verify payment requests independently and follow the organisation's approval procedures.",
    hint: "Use established verification procedures rather than relying on the sender's apparent identity."
  },
  {
    id: 10, rank: 2, topic: "Credential Theft", difficulty: "ADVANCED",
    email: "FROM: Security Notifications <alerts@account-protection.example>\nSUBJECT: Unusual sign-in detected\n\nWe detected an unfamiliar sign-in to your account. Use the link below to review the activity and secure your account. If you do not act now, access may be restricted.\n\nLINK: https://account-protection.example/review",
    q: "How should you investigate this notification safely?",
    options: ["Open the link and enter your password to check the alert","Navigate directly to the service through its known official app or website and review account activity","Ignore every account security notification","Send your password to the sender so they can investigate"],
    correct: 1, why: "Security alerts can be genuine or fraudulent. Avoid unexpected links and check your account using the official app or a known website address.",
    hint: "You can investigate the alert without using the link in the email."
  },
  {
    id: 11, rank: 0, topic: "Safe Browsing", difficulty: "BEGINNER",
    q: "What should you do if a website unexpectedly asks you to download a browser update?",
    options: ["Download it immediately from the pop-up","Disable browser protections","Install the first update found in an advert","Close the pop-up and check for updates through the browser's official settings"],
    correct: 3, why: "Unexpected update pop-ups can be malicious. Use the browser's built-in update mechanism or its official website.",
    hint: "Use the browser's own update settings."
  },
  {
    id: 12, rank: 0, topic: "Public Wi-Fi", difficulty: "BEGINNER",
    q: "Which practice is safest when using public Wi-Fi?",
    options: ["Assume every hotspot is legitimate","Avoid sensitive activity on untrusted networks and use trusted security controls","Access sensitive accounts without checking the network","Turn off device security to improve speed"],
    correct: 1, why: "Public hotspots can be impersonated or poorly secured. Use trusted networks and appropriate protections.",
    hint: "A network name alone does not prove the hotspot is genuine."
  },
  {
    id: 13, rank: 0, topic: "Backups", difficulty: "BEGINNER",
    q: "Why are backups important?",
    options: ["They guarantee that malware cannot run","They replace the need for updates","They help restore data after loss, damage or ransomware","They make passwords unnecessary"],
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
    options: ["Copy it to your personal email","Store extra copies just in case","Share it with your team chat","Follow your organisation's data-handling and deletion rules"],
    correct: 3, why: "Personal data should be handled only for legitimate purposes and retained according to policy.",
    hint: "Avoid keeping or sharing data without a need."
  },
  {
    id: 16, rank: 0, topic: "Social Engineering", difficulty: "BEGINNER",
    q: "A caller claiming to be IT asks for your password to fix an issue. What should you do?",
    options: ["Provide it if they sound professional","Refuse to share it and verify the request through an official channel","Ask them to repeat your password policy","Send it in a text message instead"],
    correct: 1, why: "Legitimate support staff should not need your password. Verify unusual requests independently.",
    hint: "A convincing caller is not proof of identity."
  },
  {
    id: 17, rank: 0, topic: "MFA Fatigue", difficulty: "BEGINNER",
    q: "You receive an MFA approval request you did not initiate. What is the safest response?",
    options: ["Approve it to stop the notifications","Send the code to the caller","Deny it and report the unexpected request","Ignore repeated requests indefinitely"],
    correct: 2, why: "Unexpected MFA prompts can indicate that someone has your password. Deny them and report the activity.",
    hint: "You did not start the sign-in."
  },
  {
    id: 18, rank: 0, topic: "Email Safety", difficulty: "BEGINNER",
    q: "Which is the safest way to open a link to your bank?",
    options: ["Use an unexpected email link","Search for a sponsored result and enter details","Follow a link in a text message claiming urgency","Use the bank's official app or type its known address"],
    correct: 3, why: "Using a known official app or address reduces the risk of landing on a fake login page.",
    hint: "Avoid relying on links in unsolicited messages."
  },
  {
    id: 19, rank: 0, topic: "Device Security", difficulty: "BEGINNER",
    q: "Why should you avoid installing unknown software on a work device?",
    options: ["It may contain malware or bypass organisational controls","It always uses too much memory","It prevents updates","It makes encryption impossible in every case"],
    correct: 0, why: "Untrusted software can introduce malware and create security or compliance risks.",
    hint: "Consider the source and permissions of the software."
  },
  {
    id: 20, rank: 0, topic: "Privacy", difficulty: "BEGINNER",
    q: "What should you do before posting a photo taken at work?",
    options: ["Post it if no passwords are visible","Share it publicly to get feedback","Check for sensitive information and follow workplace policy","Assume the background cannot reveal anything"],
    correct: 2, why: "Photos can expose screens, badges, documents, locations or other sensitive details.",
    hint: "Check the entire image, not just the main subject."
  },
  {
    id: 21, rank: 0, topic: "Ransomware", difficulty: "BEGINNER",
    q: "What is ransomware generally designed to do?",
    options: ["Improve file compression","Encrypt or otherwise block access to data and demand payment","Update operating systems","Verify user identity"],
    correct: 1, why: "Ransomware commonly disrupts access to data and demands payment, though behaviours vary.",
    hint: "Think about what access the victim loses."
  },
  {
    id: 22, rank: 0, topic: "Incident Reporting", difficulty: "BEGINNER",
    q: "You accidentally click a suspicious link on a work device. What should you do?",
    options: ["Report it promptly using your organisation's process","Hide the mistake","Wait until something breaks","Delete all browser history and say nothing"],
    correct: 0, why: "Prompt reporting helps responders assess risk and take protective action quickly.",
    hint: "Early reporting is more useful than concealing the event."
  },
  {
    id: 23, rank: 0, topic: "Physical Security", difficulty: "BEGINNER",
    q: "What should you do with a visitor who is trying to follow you through a secure door?",
    options: ["Hold the door because they look familiar","Share your access card","Ignore all access rules during busy periods","Politely follow visitor and access-control procedures"],
    correct: 3, why: "Tailgating can let unauthorised people enter restricted areas. Follow site procedures.",
    hint: "Do not treat physical access as a courtesy exception."
  },
  {
    id: 24, rank: 0, topic: "Cloud Accounts", difficulty: "BEGINNER",
    q: "A file-sharing service asks whether to make a confidential document public. What should you choose?",
    options: ["Public, so it is easy to access","Only the intended authorised people","Anyone with the link, regardless of policy","Post the link on social media"],
    correct: 1, why: "Access should be limited to people who need the document and are authorised to see it.",
    hint: "Use the least exposure necessary."
  },
  {
    id: 25, rank: 0, topic: "Password Managers", difficulty: "BEGINNER",
    q: "What is a key benefit of a reputable password manager?",
    options: ["It makes every account share one password","It prevents every form of account compromise","It can generate and store unique passwords securely","It means MFA is never useful"],
    correct: 2, why: "Password managers help users maintain unique, strong passwords without memorising each one.",
    hint: "Focus on unique credentials and secure storage."
  },
  {
    id: 26, rank: 1, topic: "Email Authentication", difficulty: "INTERMEDIATE",
    q: "What does SPF primarily help a receiving mail server assess?",
    options: ["Whether a message's attachment is harmless","Whether the sender's account uses MFA","Whether a sending host is authorised to send mail for a domain","Whether the message is encrypted end to end"],
    correct: 2, why: "SPF publishes authorised sending hosts for a domain, though it does not by itself prove a message is safe.",
    hint: "Think about authorised mail-sending infrastructure."
  },
  {
    id: 27, rank: 1, topic: "Email Authentication", difficulty: "INTERMEDIATE",
    q: "What is a principal purpose of DMARC?",
    options: ["Providing a policy and reporting framework using SPF and DKIM alignment","Encrypting all email content","Blocking every message with a link","Replacing DNS"],
    correct: 0, why: "DMARC lets domain owners specify handling for messages that fail alignment checks and receive reports.",
    hint: "It builds on existing email authentication mechanisms."
  },
  {
    id: 28, rank: 1, topic: "Malware", difficulty: "INTERMEDIATE",
    q: "A user reports a suspicious executable downloaded from an unknown site. What is the best first response?",
    options: ["Run it again to reproduce the issue","Upload it to a public forum from the work device","Disable endpoint protection","Follow incident procedures, isolate as appropriate and report it"],
    correct: 3, why: "Use the organisation's incident-response process and avoid executing or spreading the file.",
    hint: "Do not run the suspicious file."
  },
  {
    id: 29, rank: 1, topic: "Endpoint Security", difficulty: "INTERMEDIATE",
    q: "Why is least privilege important for everyday user accounts?",
    options: ["It makes all attacks impossible","It limits the actions available if an account is compromised","It removes the need for logging","It guarantees software compatibility"],
    correct: 1, why: "Reducing unnecessary permissions can limit an attacker's ability to make changes or access resources.",
    hint: "Consider the damage possible with a compromised account."
  },
  {
    id: 30, rank: 1, topic: "Network Security", difficulty: "INTERMEDIATE",
    q: "What does a firewall rule normally control?",
    options: ["The physical temperature of a server","The strength of a user's password","Which network traffic is allowed or denied according to defined criteria","The accuracy of every application input"],
    correct: 2, why: "Firewalls filter traffic using rules such as source, destination, protocol and port.",
    hint: "Think about network traffic decisions."
  },
  {
    id: 31, rank: 1, topic: "HTTPS", difficulty: "INTERMEDIATE",
    q: "What does HTTPS help protect when connecting to a website?",
    options: ["It protects data in transit and helps authenticate the server certificate","It proves the business is honest","It guarantees the website has no malware","It makes the user's device anonymous"],
    correct: 0, why: "HTTPS uses TLS to protect traffic in transit and authenticate the site through certificate validation.",
    hint: "It protects the connection, not every aspect of the site."
  },
  {
    id: 32, rank: 1, topic: "Vulnerability Management", difficulty: "INTERMEDIATE",
    q: "A critical internet-facing vulnerability is announced for a system you manage. What should guide your response?",
    options: ["Patch only at the next annual review","Ignore it if there is no known breach","Turn off logging to improve performance","Assess exposure and risk, apply mitigations and remediate under the response process"],
    correct: 3, why: "Prioritisation should consider severity, exposure, exploitability, asset importance and available mitigations.",
    hint: "Combine technical severity with real-world exposure."
  },
  {
    id: 33, rank: 1, topic: "Backups", difficulty: "INTERMEDIATE",
    q: "Which backup approach best improves resilience against ransomware?",
    options: ["Keep the only backup permanently writable from the production network","Maintain tested, protected backups with copies isolated or immutable where feasible","Back up only when an incident is detected","Store backups on the same disk as the original files"],
    correct: 1, why: "Protected and regularly tested backups make recovery more reliable if production systems are compromised.",
    hint: "Consider whether an attacker can alter both originals and backups."
  },
  {
    id: 34, rank: 1, topic: "Incident Response", difficulty: "INTERMEDIATE",
    q: "Why should evidence be preserved during a suspected security incident?",
    options: ["To delay all containment indefinitely","To avoid documenting actions","To support investigation, scope assessment and potential legal or regulatory needs","To ensure every incident becomes a criminal case"],
    correct: 2, why: "Preserved logs and evidence help responders understand what happened and support later decisions.",
    hint: "Evidence helps reconstruct events."
  },
  {
    id: 35, rank: 1, topic: "Cloud Security", difficulty: "INTERMEDIATE",
    q: "What is the safest default for a cloud storage bucket containing internal documents?",
    options: ["Public access enabled","A shared password posted in the team channel","No audit logging","Access restricted to authorised identities and required services"],
    correct: 3, why: "Restrictive access and monitoring reduce unintended exposure.",
    hint: "Start with private access and grant only necessary permissions."
  },
  {
    id: 36, rank: 1, topic: "Wi-Fi Security", difficulty: "INTERMEDIATE",
    q: "What is the main risk of connecting to a lookalike public Wi-Fi hotspot?",
    options: ["You may connect to an attacker-controlled network","It always drains the battery","It automatically encrypts all traffic","It makes your device immune to tracking"],
    correct: 0, why: "A malicious hotspot can observe or manipulate some traffic and attempt to impersonate services.",
    hint: "The hotspot may be controlled by someone else."
  },
  {
    id: 37, rank: 1, topic: "Identity Security", difficulty: "INTERMEDIATE",
    q: "What is single sign-on (SSO) intended to provide?",
    options: ["One shared password for an entire company","A replacement for all authorisation checks","A way to access multiple applications through a central authentication system","A guarantee that stolen sessions cannot be reused"],
    correct: 2, why: "SSO centralises authentication, but applications must still enforce authorisation and sessions must be protected.",
    hint: "Authentication is centralised; permissions still matter."
  },
  {
    id: 38, rank: 1, topic: "Secure Development", difficulty: "INTERMEDIATE",
    q: "Why should secrets such as API keys not be committed to a public repository?",
    options: ["They make code formatting inconsistent","Anyone who finds them may use them to access services or data","They stop code from compiling in all languages","They automatically expire after publication"],
    correct: 1, why: "Exposed secrets can be copied and abused; revoke or rotate them and investigate exposure.",
    hint: "Public repository content can be copied quickly."
  },
  {
    id: 39, rank: 1, topic: "Data Protection", difficulty: "INTERMEDIATE",
    q: "What does data minimisation mean?",
    options: ["Collect and retain only data needed for a defined purpose","Collect every field in case it is useful later","Delete all records immediately","Encrypt only data that is public"],
    correct: 0, why: "Data minimisation reduces unnecessary collection and retention of personal information.",
    hint: "Keep only what is necessary."
  },
  {
    id: 40, rank: 1, topic: "Web Security", difficulty: "INTERMEDIATE",
    q: "What is the purpose of input validation in an application?",
    options: ["To guarantee every user is trustworthy","To replace access control","To hide errors from developers in every case","To check that input meets expected rules before processing"],
    correct: 3, why: "Validation helps reject malformed or unexpected input, but must be combined with context-appropriate protections.",
    hint: "Check input against expected formats and constraints."
  },
  {
    id: 41, rank: 1, topic: "Social Engineering", difficulty: "INTERMEDIATE",
    q: "An employee receives a QR code asking them to sign in to a new HR portal. What is the safest approach?",
    options: ["Scan and enter credentials immediately","Verify the announcement through a known HR channel and use a trusted address","Forward the code externally for advice","Disable MFA before signing in"],
    correct: 1, why: "QR codes can conceal malicious destinations. Verify the request and inspect the destination before entering credentials.",
    hint: "A QR code hides its URL until scanned."
  },
  {
    id: 42, rank: 1, topic: "Logging", difficulty: "INTERMEDIATE",
    q: "Which practice makes security logs more useful during an investigation?",
    options: ["Allow every administrator to edit them without records","Delete logs daily","Centralise relevant logs, synchronise time and restrict tampering","Record passwords in plain text"],
    correct: 2, why: "Centralised, time-consistent and protected logs help correlate events and preserve evidence.",
    hint: "Investigators need reliable timelines and trustworthy records."
  },
  {
    id: 43, rank: 2, topic: "Business Email Compromise", difficulty: "ADVANCED",
    q: "A supplier emails new bank details shortly before a large invoice is due. What control is most effective?",
    options: ["Verify the change using an independently sourced contact and established payment controls","Accept the change because the email thread is familiar","Reply to the same email asking for confirmation","Pay a small amount and assume the remainder is safe"],
    correct: 0, why: "Payment-detail changes should be independently verified using a trusted contact route and documented approval.",
    hint: "Do not use contact details supplied only in the change request."
  },
  {
    id: 44, rank: 2, topic: "Incident Response", difficulty: "ADVANCED",
    q: "Several endpoints show signs of the same malware infection. What is a sound response priority?",
    options: ["Immediately wipe every device before collecting any information","Tell users to continue working normally","Coordinate containment, preserve relevant evidence and scope the incident","Disable central monitoring"],
    correct: 2, why: "Containment should limit spread while preserving evidence and enabling coordinated investigation and recovery.",
    hint: "Balance rapid containment with evidence and scope."
  },
  {
    id: 45, rank: 2, topic: "Threat Modelling", difficulty: "ADVANCED",
    q: "What is the primary purpose of threat modelling during system design?",
    options: ["Prove the system cannot be attacked","Identify assets, trust boundaries, likely threats and suitable mitigations","Replace penetration testing permanently","Choose controls solely by cost"],
    correct: 1, why: "Threat modelling makes security assumptions and potential attack paths explicit early in design.",
    hint: "Map what matters, where trust changes and how it could be attacked."
  },
  {
    id: 46, rank: 2, topic: "Network Segmentation", difficulty: "ADVANCED",
    q: "Why segment a corporate network?",
    options: ["To remove the need for authentication","To ensure every host can reach every other host","To make monitoring unnecessary","To limit lateral movement and restrict communication between zones"],
    correct: 3, why: "Segmentation reduces unnecessary connectivity and can contain compromise within a smaller area.",
    hint: "Limit pathways between systems."
  },
  {
    id: 47, rank: 2, topic: "Zero Trust", difficulty: "ADVANCED",
    q: "Which statement best reflects a Zero Trust approach?",
    options: ["Continuously make access decisions based on identity, context and policy rather than location alone","Trust every device inside the office network","Remove all network boundaries","Allow permanent access after one successful login"],
    correct: 0, why: "Zero Trust avoids implicit trust based solely on network location and applies explicit, least-privilege access decisions.",
    hint: "Being inside the network is not sufficient proof of trust."
  },
  {
    id: 48, rank: 2, topic: "Cloud IAM", difficulty: "ADVANCED",
    q: "A cloud workload needs read access to one storage container. Which permission model is best?",
    options: ["Grant tenant-wide administrator rights","Use a shared human administrator account","Grant only the required read permission to the specific resource","Disable access reviews"],
    correct: 2, why: "Least-privilege workload identities reduce the impact of credential theft or workload compromise.",
    hint: "Grant the narrowest permission that meets the need."
  },
  {
    id: 49, rank: 2, topic: "Vulnerability Management", difficulty: "ADVANCED",
    q: "A scanner reports a severe vulnerability on an isolated test host and a moderate vulnerability on an exposed payment server. How should remediation be prioritised?",
    options: ["Always fix the highest CVSS score first without context","Fix whichever report arrived first","Ignore the payment server because its score is lower","Consider severity alongside exposure, exploitability, business impact and compensating controls"],
    correct: 3, why: "Risk-based prioritisation combines technical severity with asset criticality and exposure.",
    hint: "CVSS is useful, but context matters."
  },
  {
    id: 50, rank: 2, topic: "Digital Forensics", difficulty: "ADVANCED",
    q: "Why calculate a cryptographic hash of a forensic image?",
    options: ["To encrypt the image automatically","To help verify that the image has not changed","To identify the suspect with certainty","To recover deleted files automatically"],
    correct: 1, why: "Matching hashes provide evidence that the hashed data has remained unchanged between checks.",
    hint: "A hash helps check integrity, not identify a person."
  },
  {
    id: 51, rank: 2, topic: "Ransomware Recovery", difficulty: "ADVANCED",
    q: "After ransomware is contained, what should happen before systems are returned to production?",
    options: ["Confirm the environment is clean, address the entry point and validate backups and recovery steps","Restore everything immediately without validation","Reconnect all devices to speed up restoration","Delete incident records"],
    correct: 0, why: "Recovery should address the cause, validate backups and monitor restored systems to reduce reinfection risk.",
    hint: "A successful restore is more than copying files back."
  },
  {
    id: 52, rank: 2, topic: "Secure SDLC", difficulty: "ADVANCED",
    q: "Why should dependency scanning be included in a software delivery pipeline?",
    options: ["It proves the application has no vulnerabilities","It replaces code review and testing","It can identify known vulnerabilities and risky components in third-party packages","It removes the need to track versions"],
    correct: 2, why: "Dependency scanning helps teams identify known issues in libraries and manage remediation or upgrades.",
    hint: "Third-party components can introduce inherited risk."
  },
  {
    id: 53, rank: 2, topic: "API Security", difficulty: "ADVANCED",
    q: "An API checks that a user is logged in but does not verify ownership of the requested record. What risk remains?",
    options: ["Only weak Wi-Fi encryption","Broken object-level authorisation, potentially exposing another user's data","A guaranteed denial of service","No meaningful risk if TLS is enabled"],
    correct: 1, why: "Authentication does not prove that a user is authorised to access a particular object.",
    hint: "Check permission for each requested resource."
  },
  {
    id: 54, rank: 2, topic: "Identity Threats", difficulty: "ADVANCED",
    q: "What is an important control against abuse of privileged accounts?",
    options: ["Permanent administrator access for convenience","Shared admin credentials","Disabling alerts for administrator actions","Separate privileged accounts, strong authentication, least privilege and monitored use"],
    correct: 3, why: "Privileged access should be limited, strongly authenticated and auditable.",
    hint: "Protect and monitor high-impact identities."
  },
  {
    id: 55, rank: 2, topic: "Security Monitoring", difficulty: "ADVANCED",
    q: "What is the main value of correlating identity, endpoint and network logs?",
    options: ["It guarantees every alert is accurate","It eliminates false positives completely","It can connect related events to reveal a broader attack sequence","It replaces incident responders"],
    correct: 2, why: "Cross-source correlation provides context that isolated events may not show.",
    hint: "An attack often leaves traces across several systems."
  },
  {
    id: 56, rank: 2, topic: "Risk Assessment", difficulty: "ADVANCED",
    q: "A control reduces the likelihood of an incident but not its potential impact. How should this be represented?",
    options: ["Reassess residual risk considering both likelihood and impact","Assume the risk is eliminated","Ignore impact because likelihood fell","Mark the control effective without testing"],
    correct: 0, why: "Residual risk should reflect how controls affect likelihood and impact, including remaining uncertainty.",
    hint: "Risk is not just likelihood."
  },
  {
    id: 57, rank: 2, topic: "Third-Party Risk", difficulty: "ADVANCED",
    q: "A vendor requests broad access to production data for troubleshooting. What should the organisation do?",
    options: ["Grant access permanently to avoid delays","Validate the need, minimise scope and duration, approve access and monitor activity","Share a generic administrator password","Allow access without logging"],
    correct: 1, why: "Third-party access should be justified, scoped, time-bound where possible and monitored.",
    hint: "Limit who can access what, and for how long."
  },
  {
    id: 58, rank: 2, topic: "Cryptography", difficulty: "ADVANCED",
    q: "Why is secure key management essential when data is encrypted?",
    options: ["Encryption algorithms never need review","Keys should be shared with all users","Key rotation alone prevents every breach","Poorly protected keys can undermine otherwise strong encryption"],
    correct: 3, why: "Access to encryption keys can determine whether protected data remains confidential.",
    hint: "Protect the keys as carefully as the data."
  },
  {
    id: 59, rank: 2, topic: "Phishing Response", difficulty: "ADVANCED",
    q: "A user entered credentials into a suspected phishing page. What should responders prioritise?",
    options: ["Reset or revoke affected credentials and sessions, investigate sign-ins and follow incident procedures","Only delete the browser tab","Wait for the attacker to make contact","Disable all audit logs"],
    correct: 0, why: "Credentials and active sessions may already be compromised; contain access and investigate for misuse.",
    hint: "Changing a password alone may not revoke existing sessions."
  },
  {
    id: 60, rank: 2, topic: "Business Continuity", difficulty: "ADVANCED",
    q: "What is the difference between RTO and RPO?",
    options: ["Both measure password strength","RTO measures data loss and RPO measures restore time","RTO is the target time to restore service; RPO is the acceptable data-loss window measured in time","They are interchangeable terms"],
    correct: 2, why: "Recovery time objective concerns service restoration time; recovery point objective concerns how far back restored data may be.",
    hint: "One is time to restore; the other is acceptable data loss."
  },
  {
    id: 61, rank: 3, topic: "Security Architecture", difficulty: "EXPERT",
    q: "A new platform handles public APIs, sensitive records and administrative functions. What is the strongest architectural starting point?",
    options: ["Place all components in one flat network","Rely only on a perimeter firewall","Define trust boundaries, data flows, identities and security requirements before selecting controls","Use the same service account for every component"],
    correct: 2, why: "Architecture should make assets, trust boundaries and data flows explicit so controls can be placed proportionately.",
    hint: "Start with the system and its trust boundaries."
  },
  {
    id: 62, rank: 3, topic: "Zero Trust Architecture", difficulty: "EXPERT",
    q: "What is a key architectural implication of Zero Trust?",
    options: ["Access is explicitly evaluated and constrained, with continuous signals where appropriate","Network location grants implicit trust","All traffic must be blocked permanently","Every request requires a human approval"],
    correct: 0, why: "Zero Trust architecture applies explicit policy and least privilege rather than assuming internal traffic is trustworthy.",
    hint: "Explicitly evaluate access instead of trusting location."
  },
  {
    id: 63, rank: 3, topic: "Cloud Architecture", difficulty: "EXPERT",
    q: "How should production secrets be supplied to cloud workloads?",
    options: ["Hard-code them in container images","Commit them to a private repository without controls","Reuse one static key across environments","Use an approved secrets manager or workload identity with tightly scoped permissions"],
    correct: 3, why: "Managed secrets and workload identity reduce exposure and support access control, rotation and auditing.",
    hint: "Avoid embedding credentials in deployable artefacts."
  },
  {
    id: 64, rank: 3, topic: "Resilience", difficulty: "EXPERT",
    q: "What is the main benefit of designing independent failure domains?",
    options: ["It makes all outages impossible","It can prevent a single failure or compromise from taking down every critical service","It removes the need for recovery tests","It guarantees zero latency"],
    correct: 1, why: "Failure isolation can reduce correlated outages and limit the blast radius of incidents.",
    hint: "Avoid one failure affecting everything."
  },
  {
    id: 65, rank: 3, topic: "Cryptographic Agility", difficulty: "EXPERT",
    q: "Why should an organisation plan for cryptographic agility?",
    options: ["To avoid maintaining a cryptographic inventory","To use the newest algorithm without testing","To remove certificate validation","To enable algorithms and protocols to be changed safely as requirements and threats evolve"],
    correct: 3, why: "Cryptographic agility supports controlled migration when algorithms, protocols or compliance needs change.",
    hint: "Plan to replace cryptography without redesigning everything."
  },
  {
    id: 66, rank: 3, topic: "Post-Quantum Cryptography", difficulty: "EXPERT",
    q: "What is the concern behind a 'harvest now, decrypt later' threat?",
    options: ["Attackers delete encrypted data today","Quantum computers automatically bypass every password","Attackers collect encrypted sensitive data now in the hope of decrypting it when capable quantum computers become available","All current encryption has already been broken"],
    correct: 2, why: "Long-lived sensitive data may be collected today and targeted for decryption in the future, motivating migration planning.",
    hint: "Consider data that must remain confidential for many years."
  },
  {
    id: 67, rank: 3, topic: "Identity Architecture", difficulty: "EXPERT",
    q: "Why prefer workload identities over long-lived embedded cloud credentials?",
    options: ["They can reduce static-secret exposure and support scoped, short-lived access","They remove all authentication needs","They require administrator access for every task","They prevent the need for audit logs"],
    correct: 0, why: "Workload identity can avoid distributing long-lived secrets and make permissions easier to scope and review.",
    hint: "Reduce static credentials and narrow permissions."
  },
  {
    id: 68, rank: 3, topic: "Microservices", difficulty: "EXPERT",
    q: "In a microservices architecture, what is a sound approach to service-to-service access?",
    options: ["Trust every request from the internal network","Authenticate services, authorise each action and minimise permissions","Share one unrestricted token among all services","Disable TLS between internal services by default"],
    correct: 1, why: "Internal services can be compromised too; authenticate and authorise service calls and protect communications.",
    hint: "Internal does not mean automatically trusted."
  },
  {
    id: 69, rank: 3, topic: "Secure by Design", difficulty: "EXPERT",
    q: "What does secure-by-design mean in practice?",
    options: ["Add security only after launch","Depend on end users to avoid every risk","Build security requirements, threat analysis and protective defaults into design and development","Treat compliance certification as proof of security"],
    correct: 2, why: "Security is considered throughout the lifecycle, with safer defaults and mitigations built into the product.",
    hint: "Security should shape the design from the beginning."
  },
  {
    id: 70, rank: 3, topic: "Supply Chain Security", difficulty: "EXPERT",
    q: "What is the value of a software bill of materials (SBOM)?",
    options: ["It records software components and dependencies to support inventory and vulnerability response","It guarantees all components are safe","It replaces signing and build controls","It proves a vendor has no vulnerabilities"],
    correct: 0, why: "An SBOM improves visibility into components so organisations can assess exposure when new issues emerge.",
    hint: "Know what components are inside the software."
  },
  {
    id: 71, rank: 3, topic: "Build Security", difficulty: "EXPERT",
    q: "Why isolate and protect CI/CD runners and build credentials?",
    options: ["Build systems cannot affect production","Compromised build infrastructure can inject malicious code or expose release credentials","It improves user interface design only","It removes the need for code review"],
    correct: 1, why: "Build pipelines are high-value targets because they can influence software delivered to many users.",
    hint: "A compromised build can compromise the product."
  },
  {
    id: 72, rank: 3, topic: "Threat Modelling", difficulty: "EXPERT",
    q: "When should threat modelling be revisited?",
    options: ["Only once before the first release","Only after a confirmed breach","Never, if a framework was used","When architecture, data flows, dependencies or the threat environment materially change"],
    correct: 3, why: "Threat models can become stale as systems and threats evolve, so important changes should trigger review.",
    hint: "Revisit assumptions when the system changes."
  },
  {
    id: 73, rank: 3, topic: "Data Architecture", difficulty: "EXPERT",
    q: "Which design best limits the impact of a breach involving sensitive records?",
    options: ["Minimise collection and replication, segment access and apply appropriate protection at each layer","Copy sensitive data into every service","Give all services full database access","Keep indefinite copies for convenience"],
    correct: 0, why: "Reducing unnecessary copies and restricting access limits exposure and simplifies governance.",
    hint: "Less replicated data and narrower access reduce blast radius."
  },
  {
    id: 74, rank: 3, topic: "Logging Architecture", difficulty: "EXPERT",
    q: "What should a security logging architecture balance?",
    options: ["Maximum data collection regardless of privacy or cost","No central collection","Detection value, integrity, retention, privacy, access control and operational cost","Unlimited retention of all secrets"],
    correct: 2, why: "Effective logging supports detection and investigation while managing sensitive data, integrity and retention requirements.",
    hint: "Logs must be useful, protected and proportionate."
  },
  {
    id: 75, rank: 3, topic: "Network Architecture", difficulty: "EXPERT",
    q: "What is a benefit of egress filtering?",
    options: ["It blocks every inbound attack","It replaces endpoint monitoring","It makes DNS unnecessary","It can restrict unauthorised outbound connections and reduce some command-and-control or exfiltration paths"],
    correct: 3, why: "Egress controls can constrain outbound traffic to approved destinations and protocols, supporting detection and containment.",
    hint: "Consider what compromised hosts can contact externally."
  },
  {
    id: 76, rank: 3, topic: "API Architecture", difficulty: "EXPERT",
    q: "How should API authorisation be designed for multi-tenant systems?",
    options: ["Trust a tenant ID supplied by the client without validation","Enforce tenant context and object-level permissions server-side on every relevant request","Hide tenant IDs in the user interface only","Use TLS as the sole access control"],
    correct: 1, why: "Server-side authorisation must verify the caller's access to each tenant and object; client-supplied identifiers are not proof.",
    hint: "Do not trust client-controlled tenant identifiers."
  },
  {
    id: 77, rank: 3, topic: "Incident Readiness", difficulty: "EXPERT",
    q: "Why should incident-response playbooks be exercised?",
    options: ["Exercises guarantee incidents cannot occur","They replace backups","They reveal gaps in roles, decisions, communications and technical procedures before a real incident","They remove the need for monitoring"],
    correct: 2, why: "Tabletop and technical exercises help validate readiness and improve plans under realistic constraints.",
    hint: "Test the plan, not just the document."
  },
  {
    id: 78, rank: 3, topic: "Security Metrics", difficulty: "EXPERT",
    q: "Which metric is generally more actionable than simply counting vulnerabilities?",
    options: ["Total number of alerts without context","Number of pages in a security policy","Number of tools purchased","Time to remediate exposed critical vulnerabilities, segmented by asset risk and service"],
    correct: 3, why: "Risk-contextual metrics connect security work to exposure and remediation outcomes.",
    hint: "Measure meaningful risk and response, not activity alone."
  },
  {
    id: 79, rank: 3, topic: "AI Security", difficulty: "EXPERT",
    q: "An AI agent can read email and execute payments. What is the most important architectural safeguard?",
    options: ["Constrain tools and permissions, require policy checks for consequential actions, and log decisions","Give it broad standing permissions to reduce friction","Trust all instructions found in email","Allow the agent to approve its own privilege escalation"],
    correct: 0, why: "Agents can be manipulated by untrusted content, so permissions, action boundaries and oversight must be designed explicitly.",
    hint: "Treat the agent as a privileged identity with tools."
  },
  {
    id: 80, rank: 3, topic: "Privacy Engineering", difficulty: "EXPERT",
    q: "What is the purpose of privacy threat modelling?",
    options: ["To guarantee compliance by itself","To identify how personal data could be exposed or misused and design proportionate mitigations","To eliminate all data processing","To replace legal and governance review"],
    correct: 1, why: "Privacy threat modelling examines data flows, misuse cases and controls to reduce privacy risks.",
    hint: "Model misuse and exposure of personal data."
  },
  {
    id: 81, rank: 4, topic: "Incident Leadership", difficulty: "EXPERT",
    q: "During a major incident, executives ask for a definitive attribution before evidence is sufficient. What should the incident lead do?",
    options: ["Name the most likely attacker as fact","Communicate verified facts, confidence levels, unknowns and the next decision points","Stop communicating until attribution is certain","Publish raw logs publicly"],
    correct: 1, why: "Clear incident communication separates confirmed evidence from hypotheses and states what is still being investigated.",
    hint: "Be transparent about uncertainty."
  },
  {
    id: 82, rank: 4, topic: "Risk Governance", difficulty: "EXPERT",
    q: "A business owner accepts a high residual cyber risk. What should good governance require?",
    options: ["An undocumented verbal agreement","Automatic permanent acceptance","Transfer the decision to the security analyst alone","Documented risk ownership, rationale, duration, compensating measures and appropriate approval"],
    correct: 3, why: "Risk acceptance should be explicit, accountable, time-bounded where appropriate and revisited as conditions change.",
    hint: "Acceptance needs an owner and an auditable rationale."
  },
  {
    id: 83, rank: 4, topic: "Threat Intelligence", difficulty: "EXPERT",
    q: "How should threat intelligence influence defensive priorities?",
    options: ["Evaluate credibility and relevance to the organisation's assets, exposure and likely adversaries","Treat every report as equally relevant","Deploy every indicator without validation","Use intelligence only after an incident"],
    correct: 0, why: "Intelligence is most useful when contextualised to the organisation and converted into proportionate action.",
    hint: "Relevance matters more than volume."
  },
  {
    id: 84, rank: 4, topic: "Detection Engineering", difficulty: "EXPERT",
    q: "A detection rule catches true attacks but generates many false positives. What is the best next step?",
    options: ["Disable it permanently without review","Suppress every alert from the source","Analyse alert data, refine logic and thresholds, test against known cases and monitor coverage","Assume analysts should handle unlimited noise"],
    correct: 2, why: "Detection engineering balances precision and coverage through testing, tuning and ongoing measurement.",
    hint: "Use evidence to tune, not guess."
  },
  {
    id: 85, rank: 4, topic: "Purple Teaming", difficulty: "EXPERT",
    q: "What is the primary value of purple teaming?",
    options: ["Keeping red and blue teams from communicating","Replacing all production monitoring","Proving the organisation is fully secure","Using adversary simulation and defender feedback together to improve detection and response"],
    correct: 3, why: "Purple teaming connects attack techniques to defensive telemetry and improvements in controls and detections.",
    hint: "Turn simulated attacks into measurable defensive improvements."
  },
  {
    id: 86, rank: 4, topic: "Security Programme", difficulty: "EXPERT",
    q: "How should a security leader decide between several competing control investments?",
    options: ["Choose the tool with the most features","Compare expected risk reduction, business impact, implementation effort, dependencies and residual risk","Prioritise the newest technology","Divide funding equally regardless of exposure"],
    correct: 1, why: "Investment decisions should be risk-informed and consider effectiveness, cost, operational fit and business priorities.",
    hint: "Compare outcomes, not marketing claims."
  },
  {
    id: 87, rank: 4, topic: "Third-Party Resilience", difficulty: "EXPERT",
    q: "A critical supplier suffers a prolonged outage. Which capability most directly supports business resilience?",
    options: ["A supplier list that has not been reviewed","A contract with no operational plan","Tested contingency plans, dependency mapping and viable recovery or alternate-service arrangements","An assumption that the supplier will recover quickly"],
    correct: 2, why: "Resilience depends on understanding critical dependencies and testing practical fallback and recovery arrangements.",
    hint: "Know the dependency and test the fallback."
  },
  {
    id: 88, rank: 4, topic: "Regulatory Response", difficulty: "EXPERT",
    q: "A suspected breach may involve regulated personal data. What should the organisation do first?",
    options: ["Activate incident and privacy/legal processes to assess scope, evidence and applicable notification obligations","Make a public statement before assessing facts","Delete affected records immediately","Assume notification is never required"],
    correct: 0, why: "Promptly assess the facts with relevant response, privacy and legal specialists so obligations and deadlines can be determined.",
    hint: "Escalate through the established incident and privacy process."
  },
  {
    id: 89, rank: 4, topic: "AI Governance", difficulty: "EXPERT",
    q: "An AI agent is approved for a low-risk pilot but later gains access to production customer records. What should happen?",
    options: ["Continue because the agent was approved once","Reassess the changed use case, permissions, data risks and required governance approval","Rely on the original pilot evaluation indefinitely","Let the agent decide whether it needs oversight"],
    correct: 1, why: "Material changes to capability, data access or impact can change risk and should trigger reassessment and approval.",
    hint: "Approval is tied to scope and assumptions."
  },
  {
    id: 90, rank: 4, topic: "AI Prompt Injection", difficulty: "EXPERT",
    q: "An agent retrieves a webpage containing instructions to reveal internal data. What is the safest design principle?",
    options: ["Treat retrieved text as trusted system instructions","Allow the page to change the agent's system prompt","Give the agent unrestricted access so it can decide safely","Treat external content as untrusted data and enforce tool permissions and policy outside the model's discretion"],
    correct: 3, why: "Prompt injection exploits confusion between data and instructions; robust controls must constrain what tools and data the agent can access.",
    hint: "Untrusted content must not override policy."
  },
  {
    id: 91, rank: 4, topic: "AI Evaluation", difficulty: "EXPERT",
    q: "Why evaluate an AI security control against adaptive, multi-turn attacks rather than only static prompts?",
    options: ["Attackers can iteratively adapt across turns, so single-turn tests may miss failures","Static prompts are always harder","Multi-turn testing guarantees complete security","It removes the need for human review"],
    correct: 0, why: "Multi-turn evaluations test whether protections persist as context and attacker strategies evolve.",
    hint: "Security behaviour can change over a conversation."
  },
  {
    id: 92, rank: 4, topic: "Cryptographic Migration", difficulty: "EXPERT",
    q: "What is a sensible first step in planning a post-quantum cryptography migration?",
    options: ["Replace every algorithm immediately without inventory","Wait until every legacy system fails","Inventory cryptographic assets and dependencies, identify long-lived sensitive data and prioritise migration risks","Assume a vendor update will cover every dependency"],
    correct: 2, why: "An inventory reveals where cryptography is used and supports risk-based migration planning across systems and suppliers.",
    hint: "You cannot migrate what you have not identified."
  },
  {
    id: 93, rank: 4, topic: "Cyber Crisis Communications", difficulty: "EXPERT",
    q: "What should public incident communications avoid?",
    options: ["Clear updates based on verified facts","Explaining protective steps to affected users","Coordinated messages reviewed by the response team","Speculation presented as confirmed fact and promises that cannot be supported"],
    correct: 3, why: "Unsupported attribution or assurances can mislead stakeholders and undermine trust. Communicate known facts and uncertainties.",
    hint: "Distinguish evidence from speculation."
  },
  {
    id: 94, rank: 4, topic: "Control Assurance", difficulty: "EXPERT",
    q: "How should an organisation determine whether a critical security control is effective?",
    options: ["Define the intended outcome and test the control under representative conditions, reviewing evidence and gaps","Rely only on the vendor's claim","Assume deployment means effectiveness","Count licences purchased"],
    correct: 0, why: "Control assurance requires evidence that the control achieves its objective in the environment where it operates.",
    hint: "Test outcomes, not just installation."
  },
  {
    id: 95, rank: 4, topic: "Security Culture", difficulty: "EXPERT",
    q: "Which approach is most likely to improve incident reporting culture?",
    options: ["Punish every person who reports a mistake","Require proof of damage before accepting a report","Make reporting easy, respond constructively and use reports to improve controls","Discourage reports that might affect metrics"],
    correct: 2, why: "A supportive, low-friction reporting process helps surface issues early and enables organisational learning.",
    hint: "People should feel safe raising concerns promptly."
  },
  {
    id: 96, rank: 4, topic: "Cyber Risk Quantification", difficulty: "EXPERT",
    q: "What is a key limitation of presenting a cyber-risk estimate as a single precise number?",
    options: ["Numbers can never support decisions","The estimate may hide uncertainty, assumptions and variation in possible outcomes","Risk cannot be discussed with business leaders","All models are equally reliable"],
    correct: 1, why: "Quantification should communicate assumptions, uncertainty and ranges where appropriate rather than implying false precision.",
    hint: "Explain the uncertainty behind the estimate."
  },
  {
    id: 97, rank: 4, topic: "Secure Architecture Review", difficulty: "EXPERT",
    q: "A design review finds a single identity provider whose compromise could affect every critical service. What should the review focus on?",
    options: ["Ignore it because centralisation is convenient","Remove all authentication","Add more services to the same trust boundary","Assess blast radius and resilience, then consider layered protections, recovery and failure-mode controls"],
    correct: 3, why: "Central identity is a critical dependency; resilience and layered controls should address compromise and outage scenarios.",
    hint: "Consider what happens if the shared dependency fails."
  },
  {
    id: 98, rank: 4, topic: "Adversary Simulation", difficulty: "EXPERT",
    q: "What makes an adversary simulation useful to senior leadership?",
    options: ["A dramatic demonstration without agreed objectives","Clear objectives, realistic scope, safety controls and evidence tied to business-relevant defensive outcomes","A guarantee that no other attack will succeed","Keeping all findings from control owners"],
    correct: 1, why: "A well-governed exercise tests assumptions and produces actionable improvements tied to defined objectives.",
    hint: "Define what the exercise is meant to prove."
  },
  {
    id: 99, rank: 4, topic: "Security Exceptions", difficulty: "EXPERT",
    q: "A legacy system cannot support a required security control immediately. What is the strongest exception process?",
    options: ["Record the owner, rationale, scope, compensating controls, expiry and remediation plan with appropriate approval","Ignore the gap indefinitely","Hide the issue from auditors","Grant the system broader access to compensate"],
    correct: 0, why: "Formal exceptions make residual risk visible and establish accountability and a path to remediation.",
    hint: "An exception should be controlled, owned and revisited."
  },
  {
    id: 100, rank: 4, topic: "Cyber Strategy", difficulty: "EXPERT",
    q: "How should a mature cyber strategy align with business objectives?",
    options: ["Maximise tool count regardless of need","Treat compliance as the only objective","Prioritise protection of critical services and information, define risk appetite and measure outcomes","Separate security decisions from business risk owners"],
    correct: 2, why: "Cyber strategy should protect business-critical outcomes and provide accountable, measurable risk reduction.",
    hint: "Start from business impact and critical services."
  }
];
