/**
 * INTERACTIVE CYBERSECURITY OPERATIONS TERMINAL
 * Mohamed ElAzab - Security Operations Console
 * Clean Technical Output | No Emojis | Realistic Diagnostic Commands
 */

(function () {
  'use strict';

  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const clearBtn = document.getElementById('term-clear-btn');
  const helpBtn = document.getElementById('term-help-btn');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const ASCII_BANNER = `
<span class="term-highlight">  __  __       _                            _   ______ _                _     </span>
<span class="term-highlight"> |  \\/  |     | |                          | | |  ____| |              | |    </span>
<span class="term-highlight"> | \\  / | ___ | |__   __ _ _ __ ___   ___  __| | | |__  | | __ _ ______ _| |__  </span>
<span class="term-highlight"> | |\\/| |/ _ \\| '_ \\ / _\` | '_ \` _ \\ / _ \\/ _\` | |  __| | |/ _\` |_  / _\` | '_ \\ </span>
<span class="term-highlight"> | |  | | (_) | | | | (_| | | | | | |  __/ (_| | | |____| | (_| |/ / (_| | |_) |</span>
<span class="term-highlight"> |_|  |_|\\___/|_| |_|\\__,_|_| |_| |_|\\___|\\__,_| |______|_|\\__,_/___\\__,_|_.__/ </span>
<span class="term-danger">[SECURITY OPERATIONS CONSOLE]</span> <span class="term-success">[PENETRATION TESTING]</span> <span class="term-highlight">[NETWORK DEFENSE]</span>
Type <span class="term-highlight">'help'</span> to view available operations, or <span class="term-highlight">'projects'</span> to inspect verified lab repositories.
`;

  const COMMANDS = {
    help: `
<span class="term-highlight">AVAILABLE COMMANDS:</span>
  <span class="term-success">whoami</span>         - Operator executive security profile &amp; credentials
  <span class="term-success">skills</span>         - Technical domains: Offensive, Network Security, .NET &amp; SQL
  <span class="term-success">projects</span>       - Verified laboratory reports with direct GitHub repositories
  <span class="term-success">cve-2010-2075</span>  - Deep-dive technical advisory: UnrealIRCd Backdoor RCE
  <span class="term-success">certs</span>          - University degree, DEPI fellowship, and industry credentials
  <span class="term-success">capabilities</span>   - Evidence-backed security capabilities &amp; demonstrated scopes
  <span class="term-success">scan</span>           - Execute simulated multi-port reconnaissance probe
  <span class="term-success">diagnostics</span>    - Run laboratory environment integrity and security posture audit
  <span class="term-success">contact</span>        - Secure communication endpoints (Email, WhatsApp, LinkedIn, GitHub)
  <span class="term-success">clear</span>          - Clear the terminal console buffer
`,
    whoami: `
<span class="term-highlight">OPERATOR PROFILE:</span>
  Name:        <strong style="color:#fff">Mohamed ElAzab</strong>
  Role:        <span class="term-success">Cybersecurity Student | Penetration Testing &amp; Network Security</span>
  Institution: Faculty of Computers and Information, Zagazig University (Exp. 2028)
  Focus:       Black-Box Penetration Testing, Web App Security (OWASP Top 10),
               Cisco Layer-2 Defense (DHCP Snooping / DAI), Vulnerability Research.
  Foundation:  Full-Stack .NET Core Development &amp; Relational SQL Server Architecture (DEPI).
  Status:      <span class="term-success">[READY] Available for Cybersecurity Internships &amp; Technical Engagements</span>
`,
    skills: `
<span class="term-danger">[1] OFFENSIVE SECURITY &amp; PENTESTING:</span>
  Burp Suite, PortSwigger Web Security Academy (20+ Labs Solved), OWASP Top 10,
  SQL Injection, XSS, CSRF, IDOR, Nmap, Metasploit Framework, SearchSploit, Netcat,
  Ettercap, Nessus, OpenVAS, Manual Vulnerability Analysis, PoC Development, Remediation.

<span class="term-highlight">[2] NETWORK SECURITY &amp; INFRASTRUCTURE DEFENSE:</span>
  Cisco IOS, GNS3, Cisco Packet Tracer, VLAN Segmentation, Access Control Lists (ACLs),
  Port Security, DHCP Snooping, Dynamic ARP Inspection (DAI), Layer-2 Hardening,
  OSPF Routing, EtherChannel / LACP, GRE over IPSec VPN.

<span class="term-success">[3] BACKEND DEVELOPMENT &amp; DATABASE ARCHITECTURE:</span>
  C#, ASP.NET Core Web API, Entity Framework Core, C++, Python, T-SQL,
  Microsoft SQL Server, Stored Procedures, Views, Triggers, Query Optimization,
  SQL Injection Prevention, Kali Linux, Ubuntu Server, Windows Server.
`,
    projects: `
<span class="term-highlight">VERIFIED LABORATORY PROJECTS &amp; REPOSITORIES:</span>
  [01] <span class="term-danger">Comprehensive Black-Box Pentest (Metasploitable 3)</span>
       Kali Linux, Nmap, Metasploit, Nessus — Full lifecycle penetration test and hardening.
       Repo: <a href="https://github.com/Elazab2005/Metasploitable3-Penetration-Testing-Report" target="_blank" class="term-highlight">https://github.com/Elazab2005/Metasploitable3-Penetration-Testing-Report</a>

  [02] <span class="term-danger">UnrealIRCd Backdoor Exploitation (CVE-2010-2075)</span>
       Kali Linux, Metasploit, Netcat — Remote Code Execution (RCE) and PoC validation.
       Repo: <a href="https://github.com/Elazab2005/unrealircd-backdoor-pentest-report" target="_blank" class="term-highlight">https://github.com/Elazab2005/unrealircd-backdoor-pentest-report</a>

  [03] <span class="term-success">ARP Poisoning Simulation &amp; Dynamic ARP Inspection</span>
       GNS3, Kali, Ettercap, Cisco IOS — MITM simulation, DHCP Snooping, Dynamic ARP Inspection.
       Repo: <a href="https://github.com/Elazab2005/ARP-Poisoning-Simulation-And-Remediation" target="_blank" class="term-highlight">https://github.com/Elazab2005/ARP-Poisoning-Simulation-And-Remediation</a>

  [04] <span class="term-highlight">Secure Branch Office Network Architecture</span>
       GNS3, Cisco IOS, VLANs, ACLs, LACP — Enterprise segmentation and access control.
       Repo: <a href="https://github.com/Elazab2005/Secure-Branch-Office-Lab" target="_blank" class="term-highlight">https://github.com/Elazab2005/Secure-Branch-Office-Lab</a>

  [05] <span class="term-highlight">BikeStores Database Engineering &amp; Security</span>
       T-SQL, MS SQL Server, SSMS — Relational schema, SQLi mitigation, query optimization.
       Repo: <a href="https://github.com/Elazab2005/BikeStores-SQL-Project" target="_blank" class="term-highlight">https://github.com/Elazab2005/BikeStores-SQL-Project</a>
`,
    'cve-2010-2075': `
<span class="term-danger">[SECURITY ADVISORY // CVE-2010-2075]</span>
  Target Service: UnrealIRCd version 3.2.8.1
  Vulnerability:  Backdoor Command Execution (Remote Code Execution)
  CVSS Score:     <span class="term-danger">9.8 (CRITICAL)</span>
  Exploit Vector: Malicious 'DEBUG_COMMAND' macro embedded into official tarball release.
                  Clients sending strings prefixed with 'AB;' execute arbitrary OS commands.
  Validation:     Constructed raw TCP payload via Netcat to port 6667. Validated interactive
                  root reverse shell spawned to listener workstation.
  Remediation:    1. Deploy official uncompromised release with SHA-256 verification.
                  2. Restrict outbound egress traffic from application servers.
                  3. Enforce principle of least privilege on service daemons.
`,
    certs: `
<span class="term-highlight">ACADEMIC &amp; TECHNICAL CREDENTIALS:</span>
  [DEGREE]   <strong style="color:#fff">B.Sc. in Cybersecurity</strong> — Zagazig University (Expected 2028)
  [TRAINEE]  <strong style="color:#fff">Full-Stack .NET Track</strong> — Digital Egypt Pioneers Initiative (DEPI)
  [TRACK]    <strong style="color:#fff">CCNA 200-301 Track (120 Hours)</strong> — ECST &amp; NTI
  [CERT]     <strong style="color:#fff">HCIA-Security V4.0</strong> — Huawei ICT Academy (Code: EBG20260408020517)
  [CERT]     <strong style="color:#fff">Computer Networks V1.0</strong> — Huawei ICT Academy (Code: ICT20260104001187)
  [TRAINING] <strong style="color:#fff">Cybersecurity For Beginners Track</strong> — ITI Mahara-Tech &amp; VMware
  [TRAINING] <strong style="color:#fff">Practical Ethical Hacking</strong> — Eng. Hossam Shady
  [PROGRAM]  <strong style="color:#fff">InnovEgypt Technology Innovation</strong> — 45-Hour TIEC Accreditation
`,
    capabilities: `
<span class="term-highlight">DEMONSTRATED SECURITY CAPABILITIES:</span>
  [1] Web Application Penetration Testing (OWASP Top 10, PortSwigger Academy labs)
  [2] Network Infrastructure Assessment &amp; Layer-2 Hardening (DHCP Snooping, DAI, Port Security)
  [3] Database Architecture &amp; SQL Injection Elimination (Parameterized procedures, T-SQL)
  [4] Structured Technical Advisory &amp; PoC Reporting (CVSS, Reproducible steps, Code fixes)
`,
    contact: `
<span class="term-highlight">COMMUNICATION CHANNELS:</span>
  [EMAIL]    <a href="mailto:mahamed22440@gmail.com" class="term-highlight">mahamed22440@gmail.com</a>
  [WHATSAPP] <a href="https://wa.me/201034520369" target="_blank" class="term-success">+20 103 452 0369</a>
  [LINKEDIN] <a href="https://linkedin.com/in/muhammad-elazab/" target="_blank" class="term-highlight">https://linkedin.com/in/muhammad-elazab/</a>
  [GITHUB]   <a href="https://github.com/Elazab2005" target="_blank" class="term-highlight">https://github.com/Elazab2005</a>
`,
    scan: `
<span class="term-highlight">Executing simulated Nmap reconnaissance probe...</span>
Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-04 06:45 EST
Scanning target 192.168.10.50 [1000 ports]
Discovered open port 21/tcp    (ftp vsftpd 2.3.4)
Discovered open port 22/tcp    (ssh OpenSSH 7.4)
Discovered open port 80/tcp    (http Apache 2.4.41)
Discovered open port 6667/tcp  (irc UnrealIRCd 3.2.8.1)
Discovered open port 1433/tcp  (ms-sql-s Microsoft SQL Server 2019)

<span class="term-danger">[ALERT] Port 6667/tcp running backdoor-vulnerable daemon (CVE-2010-2075)!</span>
<span class="term-success">[STATUS] Scan completed in 1.34s. 5 ports discovered. Findings correlated.</span>
Type <span class="term-highlight">'cve-2010-2075'</span> to inspect the exploit analysis.
`,
    diagnostics: `
<span class="term-highlight">Performing laboratory posture &amp; environment integrity check...</span>
[OK] Kernel: Linux 6.6.9-kali1-amd64 (x86_64)
[OK] Core Offensive Toolchain: Nmap, Metasploit v6.3, Burp Suite Pro, Nessus
[OK] Network Virtualization Engine: GNS3 Server v2.2.43 / Cisco IOS c3725
[OK] Software Engineering SDK: .NET 8.0 SDK / C# 12 / EF Core
[OK] Relational Database Server: Microsoft SQL Server 2022 Developer Edition
[OK] Layer-2 Defense Controls: DHCP Snooping [ENABLED] / DAI [ACTIVE]
<span class="term-success">[STATUS] All security analysis and engineering environments operational.</span>
`
  };

  // Alias commands
  COMMANDS.services = COMMANDS.capabilities;
  COMMANDS.posture = COMMANDS.diagnostics;
  COMMANDS.info = COMMANDS.whoami;

  function printLine(html) {
    const line = document.createElement('div');
    line.innerHTML = html;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();

    // Echo command line
    printLine(`<div><span class="term-user-prompt">elazab@security-lab:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span></div>`);

    if (!cleanCmd) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    if (cleanCmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (cleanCmd === 'banner') {
      printLine(ASCII_BANNER);
      return;
    }

    if (COMMANDS[cleanCmd]) {
      printLine(COMMANDS[cleanCmd]);
    } else {
      printLine(`<span class="term-danger">Command not recognized: '${escapeHtml(cleanCmd)}'. Type '<span class="term-highlight">help</span>' to view available operations.</span>`);
    }
  }

  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Key handlers
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.toLowerCase().trim();
      const match = Object.keys(COMMANDS).find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = '';
      printLine(`<span class="term-success">Terminal buffer cleared. Type 'help' for commands.</span>`);
    });
  }

  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      handleCommand('help');
    });
  }

  // Initial banner print
  terminalOutput.innerHTML = ASCII_BANNER;
})();
