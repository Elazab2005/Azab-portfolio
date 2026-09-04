/**
 * MAIN JAVASCRIPT CONTROLLER
 * Mohamed ElAzab Portfolio - Cybersecurity Student | Penetration Testing & Network Security
 * Interactive Logic, Theme Engine, Modal Handlers, Web Audio Synthesis
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 0. THEME TOGGLE — Dark (Default) & Light Mode with localStorage persistence
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconWrap = document.getElementById('theme-icon-wrap');

  const SUN_SVG = `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const MOON_SVG = `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function updateThemeIcon(theme) {
    if (!themeIconWrap) return;
    // When dark, show sun to toggle light; when light, show moon to toggle dark
    themeIconWrap.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  // Initialize theme icon
  updateThemeIcon(getCurrentTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = getCurrentTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      playCyberChirp(900, 'sine', 0.07);
    });
  }

  // ==========================================================================
  // 1. SOUND SYNTHESIZER (Web Audio API - 100% self contained)
  // ==========================================================================
  let soundEnabled = true;
  let audioCtx = null;

  const AUDIO_ON_SVG = `<svg class="svg-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> <span>Audio</span>`;
  const AUDIO_MUTED_SVG = `<svg class="svg-icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> <span>Muted</span>`;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playCyberChirp(freq = 800, type = 'sine', duration = 0.08) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Sound toggle button
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? AUDIO_ON_SVG : AUDIO_MUTED_SVG;
      showToast(soundEnabled ? 'Audio cues enabled' : 'Audio cues muted');
      if (soundEnabled) playCyberChirp(950);
    });
  }

  // Bind clicks for interactive sound
  document.querySelectorAll('.btn, .tab-btn, .filter-btn, .nav-link, .skill-chip').forEach(el => {
    el.addEventListener('click', () => playCyberChirp(700, 'triangle', 0.04));
  });

  // ==========================================================================
  // 2. NAVBAR SCROLL & MOBILE MENU
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const HAMBURGER_SVG = `<svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  const CLOSE_SVG = `<svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    updateActiveNavLink();
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? CLOSE_SVG : HAMBURGER_SVG;
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) {
          mobileToggle.innerHTML = HAMBURGER_SVG;
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ==========================================================================
  // 3. STAT COUNTERS ON SCROLL
  // ==========================================================================
  const statValues = document.querySelectorAll('.stat-val');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statValues.forEach(val => {
          const target = parseInt(val.getAttribute('data-target'), 10);
          const duration = 1400;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              val.textContent = target;
              clearInterval(timer);
            } else {
              val.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsBanner = document.querySelector('.hero-stats-banner');
  if (statsBanner) statsObserver.observe(statsBanner);

  // ==========================================================================
  // 4. SKILLS TABS (7 CATEGORIES)
  // ==========================================================================
  const skillTabs = document.querySelectorAll('.skills-tabs-nav .tab-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-category-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.getAttribute('data-category');

      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCat === targetCategory) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 180);
        }
      });
    });
  });

  // ==========================================================================
  // 5. PROJECT FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cardFilter = card.getAttribute('data-category');
        if (filter === 'all' || cardFilter === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 6. DETAILED PROJECT MODAL & CASE STUDIES DATA
  // ==========================================================================
  const projectsData = {
    '1': {
      id: '01',
      title: 'Comprehensive Black-Box Penetration Test',
      target: 'Metasploitable 3 Vulnerable Lab Environment',
      category: 'Penetration Testing & Vulnerability Assessment',
      severity: 'CRITICAL (CVSS 9.8)',
      tools: ['Kali Linux', 'Nmap', 'Metasploit Framework', 'Nessus'],
      github: 'https://github.com/Elazab2005/Metasploitable3-Penetration-Testing-Report',
      overview: 'Conducted an exhaustive black-box penetration testing assessment against an isolated Metasploitable 3 target environment to discover, analyze, and validate high-impact vulnerabilities across exposed services and web daemons, followed by formal reporting and actionable defense recommendations.',
      phases: [
        {
          phase: 'Phase 1: Reconnaissance & Network Enumeration',
          desc: 'Performed full TCP/UDP port mapping and service banner discovery using Nmap (`nmap -sS -sV -sC -p- -T4`). Identified exposed legacy daemons, misconfigured SMB shares, and outdated web services.'
        },
        {
          phase: 'Phase 2: Vulnerability Assessment & Correlation',
          desc: 'Utilized Nessus vulnerability scanner combined with manual script analysis (`nmap --script vuln`) to pinpoint unpatched services, protocol flaws, and default administrative credentials.'
        },
        {
          phase: 'Phase 3: Exploitation & PoC Validation',
          desc: 'Employed Metasploit Framework modules within the strictly authorized lab environment to exploit verified vulnerabilities, successfully gaining low-privilege and root shells to validate theoretical risk.'
        },
        {
          phase: 'Phase 4: Post-Exploitation & Risk Impact Assessment',
          desc: 'Evaluated lateral movement pathways, credential harvesting vectors, and privilege escalation weaknesses.'
        },
        {
          phase: 'Phase 5: Remediation & Defense-in-Depth Hardening',
          desc: 'Drafted professional technical and executive reports detailing exact patch requirements, disabling unnecessary services, implementing host-based firewalls, and least-privilege service account configurations.'
        }
      ],
      remediation: 'Apply vendor security patches; isolate management interfaces behind strict ACLs; enforce multi-factor authentication; conduct continuous vulnerability scans.'
    },
    '2': {
      id: '02',
      title: 'UnrealIRCd Backdoor Exploitation',
      target: 'UnrealIRCd 3.2.8.1 (CVE-2010-2075)',
      category: 'Exploitation & Vulnerability Analysis',
      severity: 'CRITICAL (CVSS 9.8)',
      tools: ['Kali Linux', 'Metasploit', 'Netcat', 'TCP Sockets'],
      github: 'https://github.com/Elazab2005/unrealircd-backdoor-pentest-report',
      overview: 'Analyzed, replicated, and exploited the notorious UnrealIRCd Backdoor (CVE-2010-2075) within a controlled, isolated laboratory environment to understand the precise mechanics of malicious supply-chain tampering and remote arbitrary command execution.',
      phases: [
        {
          phase: 'Phase 1: Vulnerability Research & Source Analysis',
          desc: 'Investigated the malicious backdoor injected into the official UnrealIRCd archive (`DEBUG_COMMAND` macro in `s_bsd.c`), allowing any client to execute arbitrary operating system commands by prefixing commands with "AB;".'
        },
        {
          phase: 'Phase 2: Exploit Construction & Verification',
          desc: 'Constructed manual raw TCP payloads and used Netcat to communicate with port 6667, triggering command execution without requiring authentication.'
        },
        {
          phase: 'Phase 3: Reverse Shell & RCE Demonstration',
          desc: 'Successfully executed interactive reverse shells back to the penetration testing workstation, validating full interactive root access on the target host.'
        },
        {
          phase: 'Phase 4: Impact Analysis & Remediation',
          desc: 'Documented the complete chain of attack and formulated defensive hardening practices to prevent supply chain tampering and unauthorized socket binding.'
        }
      ],
      remediation: 'Verify cryptographic PGP/GPG signatures and SHA-256 checksums before deploying third-party daemons; restrict outbound network egress; monitor server process creation.'
    },
    '3': {
      id: '03',
      title: 'ARP Poisoning Simulation & Dynamic ARP Inspection',
      target: 'Enterprise Layer-2 Switching Infrastructure',
      category: 'Network Security & Layer-2 Defense',
      severity: 'HIGH (Man-in-the-Middle Risk)',
      tools: ['GNS3', 'Kali Linux', 'Ettercap', 'Cisco IOS'],
      github: 'https://github.com/Elazab2005/ARP-Poisoning-Simulation-And-Remediation',
      overview: 'Simulated an ARP Cache Poisoning / Man-in-the-Middle (MITM) attack against a switched local area network in GNS3 and systematically implemented Cisco Layer-2 defense mechanisms to nullify the attack vector.',
      phases: [
        {
          phase: 'Phase 1: MITM Simulation via Ettercap',
          desc: 'Used Ettercap on Kali Linux to flood the local subnet with gratuitous ARP responses, successfully poisoning the ARP cache of the victim workstation and default gateway to intercept plaintext HTTP and DNS traffic.'
        },
        {
          phase: 'Phase 2: DHCP Snooping Configuration',
          desc: 'Configured DHCP Snooping on Cisco IOS switches to differentiate between trusted and untrusted switchports, creating an authoritative IP-to-MAC-to-Port binding database.'
        },
        {
          phase: 'Phase 3: Dynamic ARP Inspection (DAI) Enforcement',
          desc: 'Enabled DAI across all access VLANs, ensuring every ARP packet is intercepted and validated against the DHCP Snooping binding table. Invalid/forged ARP replies were automatically dropped at wire speed.'
        },
        {
          phase: 'Phase 4: Port Security & Attack Validation',
          desc: 'Applied Port Security (limiting MAC addresses per port with err-disable violation action). Re-ran Ettercap attack and verified that all spoofed frames were blocked with zero packet leakage.'
        }
      ],
      remediation: 'Enforce DHCP Snooping + Dynamic ARP Inspection (DAI) across all user access VLANs; enable Port Security; disable DTP (Dynamic Trunking Protocol) on access ports.'
    },
    '4': {
      id: '04',
      title: 'Secure Branch Office Network Architecture',
      target: 'Multi-VLAN Enterprise Branch Office Infrastructure',
      category: 'Enterprise Network Design & Security',
      severity: 'DEFENSIVE ARCHITECTURE',
      tools: ['GNS3', 'Cisco IOS', 'VLANs', 'ACLs', 'LACP'],
      github: 'https://github.com/Elazab2005/Secure-Branch-Office-Lab',
      overview: 'Architected and hardened a resilient, segmented branch-office enterprise network featuring departmental isolation, granular traffic filtering via Access Control Lists, and high-availability link aggregation.',
      phases: [
        {
          phase: 'Phase 1: Departmental VLAN Segmentation',
          desc: 'Segregated network into dedicated VLANs: Management, Corporate Employees, Guests, and Server Farm, preventing flat-network lateral movement.'
        },
        {
          phase: 'Phase 2: Granular Access Control Lists (ACLs)',
          desc: 'Crafted extended Access Control Lists to restrict inter-VLAN communication, blocking guest access to internal servers and strictly permitting authorized administration only via SSH.'
        },
        {
          phase: 'Phase 3: High Availability via EtherChannel / LACP',
          desc: 'Configured 802.3ad LACP EtherChannel bundles across distribution and core switches, boosting inter-switch bandwidth and eliminating single points of failure.'
        },
        {
          phase: 'Phase 4: Device Hardening & OSPF Routing',
          desc: 'Disabled unnecessary Cisco services (CDP, HTTP server, proxy ARP), configured secure SSHv2 with RSA keys, and deployed authenticated OSPF routing.'
        }
      ],
      remediation: 'Adopt zero-trust network segmentation; enforce 802.1X port-based authentication; encrypt all internal routing protocols.'
    },
    '5': {
      id: '05',
      title: 'BikeStores Database Engineering & Security',
      target: 'Microsoft SQL Server Enterprise Database',
      category: 'Database Engineering & SQL Security',
      severity: 'DATA SECURITY & RESILIENCE',
      tools: ['T-SQL', 'Microsoft SQL Server', 'SSMS'],
      github: 'https://github.com/Elazab2005/BikeStores-SQL-Project',
      overview: 'Designed, implemented, and hardened a production-grade relational database architecture using Microsoft SQL Server, optimizing complex analytical queries and engineering robust defenses against SQL Injection.',
      phases: [
        {
          phase: 'Phase 1: Schema Architecture & Normalization',
          desc: 'Engineered normalized relational tables (3NF) encompassing orders, customers, products, and inventory with strict primary/foreign key constraints and indexing.'
        },
        {
          phase: 'Phase 2: Stored Procedures & Parameterization',
          desc: 'Eliminated dynamic string concatenation by constructing parameterized Stored Procedures for all CRUD transactions, completely mitigating SQL Injection (SQLi) vulnerabilities.'
        },
        {
          phase: 'Phase 3: Views, Triggers & Audit Controls',
          desc: 'Implemented secure Views for role-based data masking and audit Triggers to track sensitive changes and prevent unauthorized record modification.'
        },
        {
          phase: 'Phase 4: Query Optimization & Execution Plan Analysis',
          desc: 'Utilized SQL Server Profiler and Execution Plans to identify index fragmentation, adding covering non-clustered indexes to slash query latency by over 60%.'
        }
      ],
      remediation: 'Never use dynamic SQL concatenation in application code; use parameterized commands or ORMs (Entity Framework Core); enforce principle of least privilege on database users.'
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalId = document.getElementById('modal-id');
  const modalTarget = document.getElementById('modal-target');
  const modalSeverity = document.getElementById('modal-severity');
  const modalTools = document.getElementById('modal-tools');
  const modalOverview = document.getElementById('modal-overview');
  const modalPhases = document.getElementById('modal-phases');
  const modalRemediation = document.getElementById('modal-remediation');
  const modalGithubLink = document.getElementById('modal-github-link');

  function openProjectModal(projId) {
    const data = projectsData[projId];
    if (!data) return;

    modalId.textContent = `CASE STUDY // ${data.id}`;
    modalTitle.textContent = data.title;
    modalTarget.textContent = data.target;
    modalSeverity.textContent = data.severity;
    modalTools.textContent = data.tools.join(' · ');
    modalOverview.textContent = data.overview;
    modalRemediation.textContent = data.remediation;

    if (modalGithubLink) {
      modalGithubLink.href = data.github;
    }

    modalPhases.innerHTML = '';
    data.phases.forEach(p => {
      const li = document.createElement('li');
      li.className = 'modal-step-item';
      li.innerHTML = `<strong>${p.phase}:</strong> ${p.desc}`;
      modalPhases.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    playCyberChirp(850, 'sine', 0.1);
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      playCyberChirp(500, 'sine', 0.08);
    }
  }

  document.querySelectorAll('.open-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
      if (certLightboxModal && certLightboxModal.classList.contains('active')) {
        closeCertLightbox();
      }
    }
  });

  // ==========================================================================
  // 6B. FULLSCREEN CERTIFICATE LIGHTBOX MODAL & VERIFIED CERTS
  // ==========================================================================
  const certificatesData = {
    '1': {
      title: 'HCIA-Security V4.0 Course',
      issuer: 'Huawei ICT Academy',
      date: 'Apr 2026',
      verifyCode: 'EBG20260408020517',
      image: './images/hcia-security.jpg',
      badge: 'OFFICIAL CERTIFICATE',
      badgeClass: 'badge-emerald',
      desc: 'Accredited by Huawei ICT Academy in enterprise security architectures, firewall deployments, access control policies, NAT, IPS/IDS, and threat defense technologies.'
    },
    '2': {
      title: 'Computer Networks V1.0',
      issuer: 'Huawei ICT Academy',
      date: 'Apr 2026',
      verifyCode: 'ICT20260104001187',
      image: './images/computer-networks.jpg',
      badge: 'OFFICIAL CERTIFICATE',
      badgeClass: 'badge-emerald',
      desc: 'Validated mastery of the TCP/IP stack, Ethernet switching topologies, IP addressing & VLSM subnetting, routing protocols (OSPF, RIP), and network architecture.'
    },
    '3': {
      title: 'CCNA 200-301 Track (120 Hours)',
      issuer: 'ECST (Egyptian Center for Science & Technology)',
      date: '120 Hours Program',
      verifyCode: 'ECST-CCNA-200-301',
      image: './images/ccna-200-301.jpg',
      badge: '120H TRAINING TRACK',
      badgeClass: 'badge-cyan',
      desc: 'Comprehensive 120-hour practical track covering enterprise Cisco networking, VLANs, trunking, STP, EtherChannel, Layer-2 security (DHCP Snooping, DAI, Port Security), and ACLs.'
    },
    '4': {
      title: 'Cybersecurity For Beginners Track',
      issuer: 'ITI Mahara-Tech & VMware',
      date: 'VMware Partner Track',
      verifyCode: 'ITI-VMWARE-SEC',
      image: './images/mahara-tech.jpg',
      badge: 'VMWARE PARTNER TRACK',
      badgeClass: 'badge-cyan',
      desc: 'Joint program by Information Technology Institute (ITI) Mahara-Tech and VMware focusing on information security fundamentals, virtualization defense, access management, and threat landscapes.'
    },
    '5': {
      title: 'Digital Egypt Youth Program',
      issuer: 'NTI (National Telecommunication Institute) & MCIT',
      date: 'National Technology Initiative',
      verifyCode: 'NTI-MCIT-DEY',
      image: './images/nti-digital-egypt.jpg',
      badge: 'GOVERNMENT ACCREDITED',
      badgeClass: 'badge-emerald',
      desc: 'National training program under the Ministry of Communications and Information Technology (MCIT) and National Telecommunication Institute (NTI) covering network infrastructure and cyber defense.'
    },
    '6': {
      title: 'Full-Stack .NET Development Track',
      issuer: 'DEPI (Digital Egypt Pioneers Initiative)',
      date: 'Active Fellowship 2024-2025',
      verifyCode: 'DEPI-ACTIVE-TRAINEE',
      image: null,
      badge: 'ACTIVE TRAINEE',
      badgeClass: 'badge-amber',
      desc: 'Intensive nationwide scholarship initiative for top engineering talent. Specializing in enterprise C#, ASP.NET Core Web APIs, Entity Framework Core, SQL Server database design, and Clean Architecture.'
    }
  };

  const certLightboxModal = document.getElementById('cert-lightbox-modal');
  const certLightboxClose = document.getElementById('cert-lightbox-close');
  const certLightboxOverlay = document.getElementById('cert-lightbox-overlay');
  const certLightboxImg = document.getElementById('cert-lightbox-img');
  const certLightboxFallback = document.getElementById('cert-lightbox-fallback');
  const certLightboxTitle = document.getElementById('cert-lightbox-title');
  const certLightboxIssuer = document.getElementById('cert-lightbox-issuer');
  const certLightboxBadge = document.getElementById('cert-lightbox-badge');
  const certLightboxOpenBtn = document.getElementById('cert-lightbox-open-btn');

  function openCertLightbox(certId) {
    const cert = certificatesData[certId];
    if (!cert || !certLightboxModal) return;

    if (certLightboxTitle) certLightboxTitle.textContent = cert.title;
    if (certLightboxIssuer) certLightboxIssuer.textContent = `${cert.issuer} • ${cert.date}`;
    if (certLightboxBadge) {
      certLightboxBadge.textContent = cert.badge;
      certLightboxBadge.className = `badge ${cert.badgeClass}`;
    }

    if (cert.image) {
      if (certLightboxImg) {
        certLightboxImg.style.display = 'block';
        certLightboxImg.src = cert.image;
        certLightboxImg.alt = `${cert.title} Preview`;
      }
      if (certLightboxFallback) certLightboxFallback.style.display = 'none';
      if (certLightboxOpenBtn) {
        certLightboxOpenBtn.style.display = 'inline-flex';
        certLightboxOpenBtn.href = cert.image;
      }
    } else {
      if (certLightboxImg) certLightboxImg.style.display = 'none';
      if (certLightboxFallback) {
        certLightboxFallback.style.display = 'block';
        const fTitle = document.getElementById('fallback-title');
        const fDesc = document.getElementById('fallback-desc');
        if (fTitle) fTitle.textContent = cert.title;
        if (fDesc) fDesc.textContent = cert.desc;
      }
      if (certLightboxOpenBtn) {
        certLightboxOpenBtn.style.display = 'none';
      }
    }

    certLightboxModal.classList.add('active');
    certLightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playCyberChirp(850, 'sine', 0.08);
  }

  function closeCertLightbox() {
    if (!certLightboxModal) return;
    certLightboxModal.classList.remove('active');
    certLightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playCyberChirp(500, 'sine', 0.06);
  }

  // Click triggers for certificate preview
  document.querySelectorAll('.cert-thumb-wrapper, .cert-preview-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const card = el.closest('.cert-glass-card');
      const certId = el.getAttribute('data-cert-id') || (card ? card.getAttribute('data-cert-id') : null);
      if (certId) {
        openCertLightbox(certId);
      }
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const card = el.closest('.cert-glass-card');
        const certId = el.getAttribute('data-cert-id') || (card ? card.getAttribute('data-cert-id') : null);
        if (certId) {
          openCertLightbox(certId);
        }
      }
    });
  });

  if (certLightboxClose) certLightboxClose.addEventListener('click', closeCertLightbox);
  if (certLightboxOverlay) certLightboxOverlay.addEventListener('click', closeCertLightbox);

  // Verification Code 1-Click Copy
  document.querySelectorAll('.copy-verify-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-copy');
      if (code) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(() => {
            showToast(`Verification code copied: ${code}`);
            playCyberChirp(1150, 'sine', 0.06);
          }).catch(() => {
            fallbackCopy(code);
          });
        } else {
          fallbackCopy(code);
        }
      }
    });
  });

  // Download CV CTA handler
  const downloadCvBtn = document.getElementById('btn-download-cv');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Redirecting to contact form for CV request...');
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const subj = document.getElementById('contact-subject');
        const msg = document.getElementById('contact-message');
        if (subj) subj.value = 'Request for CV / Resume — Mohamed ElAzab';
        if (msg) {
          msg.value = 'Hello Mohamed,\n\nI reviewed your portfolio and would like to request your latest CV for opportunities.\n\nBest regards,';
          msg.focus();
        }
      }
      playCyberChirp(880, 'sine', 0.08);
    });
  }

  // ==========================================================================
  // 7. 1-CLICK CLIPBOARD COPY WITH TOAST NOTIFICATION
  // ==========================================================================
  const toastContainer = document.getElementById('toast-container');

  window.showToast = function (message, type) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type || 'info'}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          playCyberChirp(1200, 'sine', 0.08);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else if (textToCopy) {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied "${text}" to clipboard!`);
  }

  // ==========================================================================
  // 8. CONTACT FORM SUBMISSION HANDLER
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Generate mailto link
      const encodedSubject = encodeURIComponent(`[Cybersecurity Portfolio Inquiry] ${subject || 'New Message from ' + name}`);
      const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:mahamed22440@gmail.com?subject=${encodedSubject}&body=${encodeURIComponent(bodyText)}`;

      // Open mail client
      window.location.href = mailtoUrl;

      showToast('Opening email client with your message...');
      playCyberChirp(1100, 'triangle', 0.12);
    });
  }

  // ==========================================================================
  // 9. BACK TO TOP
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
