/* English / Arabic language toggle. Text is matched by its English source string. */
(function () {
  var root = document.documentElement;
  var AR = {
    'Skip to content': 'انتقل إلى المحتوى',
    'Mohamed ElAzab': 'محمد العزب',
    'Mohamed': 'محمد',
    'ElAzab': 'العزب',
    'Work': 'الأعمال',
    'Experience': 'الخبرات',
    'About': 'نبذة',
    'Contact': 'تواصل',
    'Resume': 'السيرة الذاتية',
    'Faculty of Computers & Information': 'كلية الحاسبات والمعلومات',
    'Cybersecurity Background': 'خلفية في الأمن السيبراني',
    'Open to freelance work': 'متاح للعمل الحر',
    'Full-Stack .NET Developer': 'مطوّر Full-Stack .NET',
    'I build modern web applications and backend systems using C#, ASP.NET Core, SQL Server, and JavaScript, with a strong academic background in Cybersecurity.': 'أبني تطبيقات ويب حديثة وأنظمة خلفية (Backend) باستخدام C# وASP.NET Core وSQL Server وJavaScript، مع خلفية أكاديمية قوية في الأمن السيبراني.',
    'View My Work': 'شاهد أعمالي',
    'Get in touch': 'تواصل معي',
    'Selected work': 'أعمال مختارة',
    'Web Development': 'تطوير الويب',
    'Featured': 'مميّز',
    'A modern responsive coffee shop website focused on clean UI, responsive design, and frontend development.': 'موقع حديث ومتجاوب لمقهى، يركّز على واجهة مستخدم نظيفة وتصميم متجاوب وتطوير الواجهة الأمامية.',
    'Live Demo': 'معاينة مباشرة',
    'GitHub': 'GitHub',
    'Database / SQL Server': 'قواعد البيانات / SQL Server',
    'BikeStores SQL Project': 'مشروع BikeStores لقواعد البيانات',
    'SQL Server database project covering database design, advanced queries, CTEs, window functions, and performance-oriented SQL work.': 'مشروع قاعدة بيانات على SQL Server يشمل تصميم قواعد البيانات والاستعلامات المتقدمة وCTEs ودوال النوافذ (Window Functions) وتحسين أداء SQL.',
    'Cybersecurity / Penetration Testing': 'الأمن السيبراني / اختبار الاختراق',
    'Metasploitable 3 Penetration Testing Report': 'تقرير اختبار اختراق Metasploitable 3',
    'A comprehensive black-box penetration testing and vulnerability assessment report for a Metasploitable 3 environment.': 'تقرير شامل لاختبار الاختراق بأسلوب الصندوق الأسود وتقييم الثغرات لبيئة Metasploitable 3.',
    'Cybersecurity': 'الأمن السيبراني',
    'UnrealIRCd Backdoor Penetration Testing': 'اختبار اختراق الباب الخلفي في UnrealIRCd',
    'Controlled penetration testing lab report analyzing the UnrealIRCd 3.2.8.1 backdoor vulnerability and documenting remediation steps.': 'تقرير معملي لاختبار اختراق مضبوط يحلّل ثغرة الباب الخلفي في UnrealIRCd 3.2.8.1 ويوثّق خطوات المعالجة.',
    'Network Security': 'أمن الشبكات',
    'ARP Poisoning Simulation & Remediation': 'محاكاة هجوم ARP Poisoning وطرق المعالجة',
    'Network security lab demonstrating ARP spoofing simulation and mitigation using Kali Linux, GNS3, DHCP Snooping, and Dynamic ARP Inspection.': 'معمل أمن شبكات يوضّح محاكاة هجوم ARP Spoofing وطرق الحد منه باستخدام Kali Linux وGNS3 وDHCP Snooping وDynamic ARP Inspection.',
    'Networking / Security': 'الشبكات / الأمن',
    'Secure Branch Office Lab': 'معمل فرع مكتبي آمن',
    'Secure enterprise network design featuring LACP, Inter-VLAN routing, ACLs, and Port Security for a simulated medical clinic.': 'تصميم شبكة مؤسسية آمنة يتضمن LACP وInter-VLAN Routing وACLs وPort Security لعيادة طبية افتراضية.',
    'View All Projects': 'عرض كل المشاريع',
    'Show Fewer Projects': 'عرض عدد أقل',
    'Experience & training': 'الخبرات والتدريب',
    'Training': 'تدريب',
    'Leadership': 'قيادة',
    'Full-Stack .NET Trainee': 'متدرّب Full-Stack .NET',
    'Digital Egypt Pioneers Initiative (DEPI)': 'مبادرة رواد مصر الرقمية (DEPI)',
    'My main and largest development training program, focused on C#, ASP.NET Core, Entity Framework Core, SQL Server, REST APIs, and web development.': 'برنامجي التدريبي الرئيسي والأكبر في التطوير، ويركّز على C# وASP.NET Core وEntity Framework Core وSQL Server وREST APIs وتطوير الويب.',
    'Penetration Testing & Application Security Trainee': 'متدرّب اختبار الاختراق وأمن التطبيقات',
    'National Telecommunication Institute (NTI)': 'المعهد القومي للاتصالات (NTI)',
    'Web security, application security, vulnerability assessment, penetration testing, and security hardening.': 'أمن الويب وأمن التطبيقات وتقييم الثغرات واختبار الاختراق وتحصين الأنظمة.',
    'CCNA Trainee': 'متدرّب CCNA',
    'Networking, routing and switching, and network fundamentals.': 'الشبكات والتوجيه والتبديل وأساسيات الشبكات.',
    'Cybersecurity Trainee': 'متدرّب أمن سيبراني',
    'Information Technology Institute (ITI)': 'معهد تكنولوجيا المعلومات (ITI)',
    'Cybersecurity fundamentals, security concepts, and practical security training.': 'أساسيات الأمن السيبراني ومفاهيم الأمن والتدريب العملي عليه.',
    'Cybersecurity Team Co-Lead': 'نائب قائد فريق الأمن السيبراني',
    'Google Developer Groups (GDG)': 'مجتمعات مطوّري Google (GDG)',
    'Co-leading the Cybersecurity team and supporting technical activities, learning sessions, and community initiatives.': 'أشارك في قيادة فريق الأمن السيبراني وأدعم الأنشطة التقنية وجلسات التعلّم والمبادرات المجتمعية.',
    'Technical stack': 'التقنيات المستخدمة',
    'Backend': 'الخلفية (Backend)',
    'Database': 'قواعد البيانات',
    'Frontend': 'الواجهة الأمامية (Frontend)',
    'Tools': 'الأدوات',
    'Additional knowledge': 'معرفة إضافية',
    'Networking': 'الشبكات',
    "I'm Mohamed ElAzab, a third-year student at the Faculty of Computers and Information, Zagazig University, specializing in Cybersecurity. My current professional direction is Full-Stack .NET development.": 'أنا محمد العزب، طالب في السنة الثالثة بكلية الحاسبات والمعلومات، جامعة الزقازيق، متخصص في الأمن السيبراني. وتوجّهي المهني الحالي هو تطوير Full-Stack .NET.',
    'I work with C#, ASP.NET Core, Entity Framework Core, SQL Server, REST APIs, JavaScript, HTML, CSS, React, and Bootstrap.': 'أعمل باستخدام C# وASP.NET Core وEntity Framework Core وSQL Server وREST APIs وJavaScript وHTML وCSS وReact وBootstrap.',
    'My cybersecurity background gives me an added understanding of application security, networking, Linux, and secure software development, which I bring into the way I design and build software.': 'تمنحني خلفيتي في الأمن السيبراني فهمًا أعمق لأمن التطبيقات والشبكات ولينكس وتطوير البرمجيات الآمنة، وهو ما أطبّقه في تصميم البرمجيات وبنائها.',
    'Education': 'التعليم',
    'Zagazig University': 'جامعة الزقازيق',
    'Faculty of Computers & Information · Cybersecurity Department': 'كلية الحاسبات والمعلومات · قسم الأمن السيبراني',
    '3rd Year Student': 'طالب بالفرقة الثالثة',
    "What I'm working on": 'ما أعمل عليه حاليًا',
    'Currently focused on building full-stack applications with ASP.NET Core while strengthening my backend, database, and API development skills.': 'أركّز حاليًا على بناء تطبيقات Full-Stack باستخدام ASP.NET Core مع تعزيز مهاراتي في تطوير الـ Backend وقواعد البيانات وواجهات API.',
    "Let's build something useful.": 'لنبنِ شيئًا مفيدًا معًا.',
    "I'm open to freelance opportunities, development projects, collaborations, and technical opportunities.": 'أنا متاح لفرص العمل الحر ومشاريع التطوير والتعاون والفرص التقنية.',
    'Email': 'البريد الإلكتروني',
    'LinkedIn': 'LinkedIn',
    'Phone': 'الهاتف',
    'Name': 'الاسم',
    'Message': 'الرسالة',
    'Send message': 'إرسال الرسالة',
        '© 2026 Mohamed ElAzab. All rights reserved.': '© 2026 محمد العزب. جميع الحقوق محفوظة.'
  };
  var UI = {
    en: { themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme', lang: 'العربية', langLabel: 'Switch to Arabic', burgerOpen: 'Open menu', burgerClose: 'Close menu', menu: 'Primary', pills: 'Highlights', focus: 'Current focus',
      title: 'Mohamed ElAzab — Full-Stack .NET Developer', sent: 'Thanks. Your message was sent, and I will reply by email.', fail: 'Something went wrong. Please email me at mahamed22440@gmail.com.', net: 'Network error. Please try again or email me at mahamed22440@gmail.com.', sending: 'Sending...' },
    ar: { themeDark: 'التبديل إلى الوضع الداكن', themeLight: 'التبديل إلى الوضع الفاتح', lang: 'EN', langLabel: 'التبديل إلى الإنجليزية', burgerOpen: 'فتح القائمة', burgerClose: 'إغلاق القائمة', menu: 'التنقل الرئيسي', pills: 'أبرز النقاط', focus: 'التركيز الحالي',
      title: 'محمد العزب — مطوّر Full-Stack .NET', sent: 'شكرًا لك. تم إرسال رسالتك وسأرد عليك عبر البريد الإلكتروني.', fail: 'حدث خطأ ما. من فضلك راسلني على mahamed22440@gmail.com.', net: 'خطأ في الاتصال. حاول مرة أخرى أو راسلني على mahamed22440@gmail.com.', sending: 'جارٍ الإرسال...' }
  };
  var orig = new WeakMap();
  var attrOrig = new WeakMap();
  var lang = 'en';

  // Keep Latin terms (C#, .NET, SQL Server...) as intact left-to-right runs inside Arabic text.
  function isolate(t) {
    t = t.replace(/\s*و(?=[A-Za-z.])/g, '، ');
    return t.replace(/\.?[A-Za-z][A-Za-z0-9.#+\-]*(?: \.?[A-Za-z0-9][A-Za-z0-9.#+\-]*)*/g, function (m) { return '\u2066' + m + '\u2069'; });
  }

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function walk(node, fn) {
    var w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === 'SCRIPT' || p === 'STYLE' || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while ((n = w.nextNode())) fn(n);
  }

  function translateTexts(toAr) {
    walk(document.body, function (n) {
      if (!orig.has(n)) orig.set(n, n.nodeValue);
      var src = orig.get(n);
      if (!toAr) { n.nodeValue = src; return; }
      var key = norm(src);
      if (AR[key]) {
        var lead = src.match(/^\s*/)[0], trail = src.match(/\s*$/)[0];
        n.nodeValue = lead + isolate(AR[key]) + trail;
      }
    });
  }

  function set(el, name, val) { if (el) el.setAttribute(name, val); }

  function apply(l, save) {
    lang = l;
    var ar = l === 'ar', ui = UI[l];
    root.setAttribute('lang', l);
    root.setAttribute('dir', ar ? 'rtl' : 'ltr');
    translateTexts(ar);
    document.title = ui.title;
    var d = document.querySelector('meta[name="description"]');
    if (d) {
      if (!d.dataset.en) d.dataset.en = d.content;
      d.content = ar ? 'الموقع الشخصي لمحمد العزب، مطوّر Full-Stack .NET يبني تطبيقات ويب حديثة وأنظمة خلفية باستخدام C# وASP.NET Core وSQL Server وJavaScript.' : d.dataset.en;
    }
    var theme = document.getElementById('theme');
    set(theme, 'aria-label', root.getAttribute('data-theme') === 'dark' ? ui.themeLight : ui.themeDark);
    var btn = document.getElementById('lang');
    if (btn) { btn.textContent = ui.lang; set(btn, 'aria-label', ui.langLabel); set(btn, 'lang', ar ? 'en' : 'ar'); }
    var burger = document.getElementById('burger');
    set(burger, 'aria-label', document.getElementById('menu').classList.contains('open') ? ui.burgerClose : ui.burgerOpen);
    set(document.getElementById('menu'), 'aria-label', ui.menu);
    set(document.querySelector('.pills'), 'aria-label', ui.pills);
    set(document.querySelector('.chips'), 'aria-label', ui.focus);
    var more = document.getElementById('more');
    if (more) more.textContent = more.getAttribute('aria-expanded') === 'true' ? (ar ? AR['Show Fewer Projects'] : 'Show Fewer Projects') : (ar ? AR['View All Projects'] : 'View All Projects');
    if (save) { try { localStorage.setItem('lang', l); } catch (e) {} }
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }

  window.__t = function (k) { return UI[lang][k]; };
  window.__lang = function () { return lang; };

  var saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  var btn = document.getElementById('lang');
  btn.addEventListener('click', function () { apply(lang === 'ar' ? 'en' : 'ar', true); });
  // keep theme label in sync with language
  document.getElementById('theme').addEventListener('click', function () { setTimeout(function () { apply(lang, false); }, 0); });
  if (saved === 'ar') apply('ar', false); else apply('en', false);
})();
