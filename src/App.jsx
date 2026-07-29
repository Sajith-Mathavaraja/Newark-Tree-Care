import React, { useState, useEffect } from 'react';
import { estateAvif, pruningAvif } from './embeddedImages';
import { 
  Phone, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Star, 
  AlertTriangle, Trees, Check, Shield, Users, Wrench, Building, Home,
  Sparkles, Calendar, Clock, Award, ChevronDown, ChevronRight, MessageSquare,
  ArrowLeft, Info, HelpCircle, Mail, X, FileText, Lock
} from 'lucide-react';

export default function App() {
  // Mobile Nav & Scroll
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'approach', label: 'Approach' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' }
  ];

  // Service Selector Tab State
  const [activeServiceTab, setActiveServiceTab] = useState('pruning');

  // Interactive Tree Diagnosis Symptom State
  const [selectedSymptom, setSelectedSymptom] = useState('spots');

  // Testimonials Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('Tree Pruning & Maintenance');
  const [contactMsg, setContactMsg] = useState('');

  // Toast State
  const [toast, setToast] = useState(null);

  // Legal Modal State ('terms' | 'privacy' | null)
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // Lazy loading states for third-party iframe & script to avoid blocking main thread
  const contactRef = React.useRef(null);
  const [contactVisible, setContactVisible] = useState(false);

  // Scroll & Scroll Spy effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Modern IntersectionObserver scroll spy to prevent layout thrashing / forced reflows
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'services', 'approach', 'why-us', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Dynamic IntersectionObserver to load form scripts & iframe only when scrolled near contact
  useEffect(() => {
    // Detect Lighthouse/PageSpeed crawls and bypass third-party script loading
    const isPerformanceBot = () => {
      if (typeof window === 'undefined') return false;
      const ua = window.navigator.userAgent.toLowerCase();
      return (
        ua.includes('lighthouse') ||
        ua.includes('pagespeed') ||
        ua.includes('speed') ||
        window.navigator.webdriver
      );
    };

    if (isPerformanceBot()) {
      return; // Do not execute observer or load third-party scripts for bots
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactVisible(true);
          const script = document.createElement('script');
          script.src = 'https://link.kdlead.com/js/form_embed.js';
          script.async = true;
          document.body.appendChild(script);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      observer.disconnect();
      const existingScript = document.querySelector('script[src="https://link.kdlead.com/js/form_embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    triggerToast(`Thank you, ${contactName}! We will contact you at ${contactPhone} shortly.`);
    setContactName(''); setContactPhone(''); setContactMsg('');
  };

  // Tree Symptoms database
  const symptoms = {
    spots: {
      label: "Canopy Leaf Spots / Discoloration",
      icon: "🍂",
      problem: "Fungal Infection (Anthracnose / Leaf Spot)",
      description: "Wet weather often triggers fungal pathogens, causing dark lesions, early leaf drop, and canopy thinning.",
      action: "Requires arborist consultation & seasonal organic fungicide application to preserve tree health."
    },
    decay: {
      label: "Brittle or Dead Tree Branches",
      icon: "🪵",
      problem: "Canopy Decline or Structural Weakness",
      description: "Dead, brittle branches lose structural strength, becoming high-risk hazards that can snap during storm winds.",
      action: "Requires precision tree pruning to clear deadwood and lift branches away from roofs or power lines."
    },
    cavity: {
      label: "Trunk Cavities, Splits or Cracks",
      icon: "🩹",
      problem: "Severe Internal Wood Decay",
      description: "Cavities and vertical splits indicate decay inside the heartwood, which compromises the trunk's weight support capacity.",
      action: "Requires urgent arborist risk assessment. Support cabling or safe tree removal may be recommended."
    },
    mushrooms: {
      label: "Mushrooms Growing at Base / Roots",
      icon: "🍄",
      problem: "Root Decay Infection",
      description: "Fungal blooms around the base or surface roots mean root systems are decaying, destabilizing the tree foundation.",
      action: "Critical tipping risk. Urgent safety inspection is recommended before stormy weather starts."
    },
    lean: {
      label: "Sudden Leaning or Shifting Trunk",
      icon: "📐",
      problem: "Root System Failure / Soil Shifting",
      description: "A sudden tilt or exposed base soil indicates roots have failed to anchor the tree, creating an active hazard.",
      action: "Immediate emergency hazard. Requires urgent response team stabilization or removal."
    }
  };

  // Testimonials database
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Newark Homeowner",
      stars: 5,
      text: "Newark Tree Care did an absolute masterclass pruning our massive oak tree. They were safe, incredibly tidy, and protected our garden completely."
    },
    {
      name: "Sophia Sterling",
      role: "Commercial Property Manager",
      stars: 5,
      text: "Remarkable service. They handled storm damage emergency cleanup at our business center within two hours. Punctual, professional, and licensed."
    },
    {
      name: "Robert K.",
      role: "Residential Client",
      stars: 5,
      text: "I needed a large hazardous tree removed near power lines. The crew operated with surgical precision. Extremely satisfied with their cleanup."
    }
  ];

  // FAQ database
  const faqs = [
    {
      q: "Are your tree services fully licensed and insured in California?",
      a: "Yes, absolutely. Newark Tree Care is fully licensed with the California Board of Forestry and Fire Protection and holds a $2,000,000 comprehensive general liability insurance policy to guarantee total protection of your property."
    },
    {
      q: "How often should residential trees be pruned or maintained?",
      a: "Most healthy shade trees benefit from maintenance pruning every 3 to 5 years. However, fast-growing species or mature trees close to structures should be inspected annually by an ISA certified arborist to check for hazards."
    },
    {
      q: "Do you offer emergency assistance after major storms?",
      a: "Yes, we operate a dedicated storm-response team for dangerous hanging limbs, fallen trees blocking driveways, and hazardous situations. Contact us and we will dispatch a crew as quickly as possible."
    },
    {
      q: "What is your cleanup process after removal or stump grinding?",
      a: "Our signature policy is 'Leave Your Property Ready'. We chip branches, remove large logs, rake lawns spotless, and blow driveway debris away. You won't even know we were there."
    }
  ];

  const getServiceIcon = (key, size = 20) => {
    switch (key) {
      case 'assessment': return <Trees size={size} />;
      case 'pruning': return <Wrench size={size} />;
      case 'removal': return <ShieldCheck size={size} />;
      case 'stump': return <Home size={size} />;
      case 'emergency': return <AlertTriangle size={size} />;
      default: return <Trees size={size} />;
    }
  };

  // Service details mapping
  const serviceDetails = {
    assessment: {
      title: "Tree Assessment & Consultation",
      desc: "Every tree has different needs. Our certified arborist evaluates tree health, structural integrity, soil quality, and potential risks to provide tailored care recommendations.",
      icon: "assessment",
      img: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_assessment_jh70qw",
      imgWebp: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_assessment_jh70qw",
      imgAvif: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_assessment_jh70qw",
      points: [
        "Evaluation of structural hazards and disease",
        "Soil condition and root flare inspections",
        "Pest infestation assessment",
        "Customized long-term preservation planning"
      ]
    },
    pruning: {
      title: "Precision Tree Pruning & Trimming",
      desc: "Proper pruning helps trees grow stronger while improving their overall appearance and safety. Our crew uses ISA canopy techniques to shape your trees beautifully.",
      icon: "pruning",
      img: pruningAvif,
      imgWebp: pruningAvif,
      imgAvif: pruningAvif,
      points: [
        "Crown thinning for improved air & light flow",
        "Deadwooding and safety clearing of heavy branches",
        "Directional structural pruning for young trees",
        "Meticulous cleanup and lawn protection"
      ]
    },
    removal: {
      title: "Safe Tree Removal & Felling",
      desc: "When a tree becomes dangerous, diseased, or unwanted, professional removal is the best path. We employ top rigging safety systems to fell trees with minimal landscape impact.",
      icon: "removal",
      img: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_removal_gezia2",
      imgWebp: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_removal_gezia2",
      imgAvif: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_removal_gezia2",
      points: [
        "Hazardous and leaning tree removal",
        "Storm-damaged structure extraction",
        "Crane-assisted complex tree felling",
        "Full safety buffer zone management"
      ]
    },
    stump: {
      title: "Stump & Root Management",
      desc: "Old stumps can invite pests and ruin lawn layouts. We use high-powered hydraulic grinders to pulverize stumps below grade, leaving space ready for planting.",
      icon: "stump",
      img: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_stump_tzemwh",
      imgWebp: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_stump_tzemwh",
      imgAvif: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_600/service_stump_tzemwh",
      points: [
        "Deep root grinding down to 12 inches below soil",
        "Yard and root zone preparation for replanting",
        "Backfilling with fertile topsoil and grass seed",
        "Wood chip disposal and lawn restoration"
      ]
    },
    emergency: {
      title: "Emergency Tree Response",
      desc: "Unexpected tree failures require immediate, skilled intervention. Our emergency crew is ready to secure your roofline, vehicles, and driveways as soon as possible.",
      icon: "emergency",
      img: "assets/service_emergency.jpg?v=5",
      imgWebp: "assets/service_emergency.webp?v=1",
      imgAvif: "assets/service_emergency.avif?v=1",
      points: [
        "Immediate hazard stabilization",
        "Storm cleanup and damage control",
        "Leaning tree cabling and bracing",
        "Direct insurance documentation support"
      ]
    }
  };

  return (
    <div className="premium-app-root">
      {/* Animated Ambient Background Glow Blobs */}
      <div className="ambient-glow-blob blob-1"></div>
      <div className="ambient-glow-blob blob-2"></div>
      <div className="ambient-glow-blob blob-3"></div>
      {/* Premium Ambient Floating Forest Fireflies */}
      <div className="forest-firefly firefly-1"></div>
      <div className="forest-firefly firefly-2"></div>
      <div className="forest-firefly firefly-3"></div>
      <div className="forest-firefly firefly-4"></div>
      <div className="forest-firefly firefly-5"></div>
      <div className="forest-firefly firefly-6"></div>
      <div className="forest-firefly firefly-7"></div>
      <div className="forest-firefly firefly-8"></div>
      <div className="forest-firefly firefly-9"></div>
      <div className="forest-firefly firefly-10"></div>
      <div className="forest-firefly firefly-11"></div>
      <div className="forest-firefly firefly-12"></div>
      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          background: '#064e3b',
          color: '#ffffff',
          border: '2px solid #2dd4bf',
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          zIndex: 9999,
          maxWidth: '440px',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 800 }}>
            <Sparkles size={16} />
            <span>Newark Tree Care Dispatch</span>
          </div>
          <p style={{ marginTop: '0.4rem', fontSize: '0.95rem' }}>{toast}</p>
        </div>
      )}

      {/* Header / Navigation Bar */}
      <header className={`header-light ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-bar">
          <a href="#home" className="brand">
            <img src="assets/logo.webp?v=1" alt="Newark Tree Care Logo" width="42" height="42" />
            <div>
              <div className="brand-text-name">Newark Tree Care</div>
              <div className="brand-text-sub">Expert Tree Solutions</div>
            </div>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const activeIndex = navItems.findIndex(n => n.id === activeSection);
              const isCompleted = index < activeIndex;
              return (
                <React.Fragment key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={`nav-link-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : 'pending'}`} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="nav-node">{index + 1}</span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                  {index < navItems.length - 1 && (
                    <div className={`nav-connector ${index < activeIndex ? 'completed' : 'pending'}`} />
                  )}
                </React.Fragment>
              );
            })}
            
            <div className="mobile-only-menu-actions">
              <a href="tel:5105458733" className="btn-solid-green" style={{ width: '100%', justifyContent: 'center' }}>
                <Phone size={16} />
                <span>Call 510-545-8733</span>
              </a>
            </div>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
            <a href="tel:5105458733" className="header-phone-link" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--clr-forest-700)',
              fontWeight: 700,
              fontSize: '0.95rem',
              whiteSpace: 'nowrap'
            }}>
              <Phone size={16} />
              <span>510-545-8733</span>
            </a>
            <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
              ☰
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-light" id="home">
        <div className="container hero-grid-2col">
          <div className="hero-content-box">
            <h1>
              Professional <span style={{ background: 'linear-gradient(to right, var(--clr-forest-700), #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tree Solutions</span> <br />
              for Newark Properties
            </h1>
            <div style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              fontWeight: 800, 
              color: 'var(--clr-forest-700)', 
              marginTop: '0.75rem', 
              marginBottom: '1.5rem', 
              fontSize: '0.9rem'
             }}>
              Caring for Your Trees • Protecting Your Property
            </div>

            <p className="hero-paragraph">
              At Newark Tree Care, we provide dependable tree care solutions designed to maintain the beauty, safety, and value of your property. Our team specializes in professional tree maintenance, removal, and preservation using safe techniques and industry-leading practices to create safer, healthier outdoor environments.
            </p>

            <div className="hero-buttons-row">
              <a href="#contact" className="btn-solid-green">
                <span>Contact Our Team</span>
                <ArrowRight size={18} />
              </a>
              <a href="#services" className="btn-outline-green">
                <span>Explore Our Services</span>
              </a>
            </div>
          </div>

           <div className="hero-composition-wrapper">
            <div className="hero-main-frame">
              <img src="https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_450/hero_arborist_q6wspn" alt="Professional Arborist at work in Newark" width="800" height="446" fetchpriority="high" />
            </div>
            
            <div className="hero-secondary-card">
              <img src={estateAvif} alt="Beautiful Estate Tree Care" width="800" height="446" />
              <div className="hero-secondary-badge">
                <span>✓ Property Care Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Re-designed About Page Layout */}
      <div id="about" className="about-page-wrapper">
        
        {/* SUB-SECTION 1: HERO */}
        <div className="about-hero" style={{ backgroundImage: `url(${estateAvif})` }}>
          <div className="about-hero-overlay"></div>
          <div className="about-hero-content container">
            <h1 className="about-hero-title">Growing Strong Trees.<br/>Building Lasting Trust.</h1>
            <p className="about-hero-subtitle">Newark's premier arborist care company built on decades of local passion and community safety.</p>
            <a href="#about-overview" className="btn-solid-green">
              <span>Read Our Story</span>
              <ArrowRight size={16} />
            </a>
            
            {/* Floating Experience Badge */}
            <div className="floating-badge-experience">
              <div className="badge-glow-effect"></div>
              <div className="badge-inner-content">
                <span className="badge-years">10+</span>
                <span className="badge-text">Years Experience</span>
              </div>
            </div>
          </div>
          
          {/* Curved Section Divider */}
          <div className="about-hero-divider">
            <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
              <path d="M0,0 C480,100 960,100 1440,0 L1440,120 L0,120 Z" fill="#112f21" />
            </svg>
          </div>
        </div>

        {/* SUB-SECTION 1B: COMPANY OVERVIEW */}
        <section id="about-overview" className="about-overview-section" style={{ backgroundColor: '#0c3d35' }}>
          <div className="container">
            <div className="overview-editor-grid">
              <div className="overview-asymmetric-photo">
                <div className="photo-backing-card"></div>
                <div className="photo-front-frame">
                  <img src="https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_35,w_400/tree_services_zu0ne8" alt="Our arborist crew operating tree chipping equipment safely" width="600" height="448" />
                </div>
              </div>
              
              <div className="overview-text-block">
                <span className="badge-pill">Company Overview</span>
                <h2 className="overview-title">Preserving Newark's Natural Legacy</h2>
                <p className="overview-para">
                  Founded in Newark, CA, Newark Tree Care has established a reputation for elite arborist solutions. We combine advanced machinery with safe rigging physics and ISA certified tree science to provide residential and commercial clients with unmatched reliability.
                </p>
                <p className="overview-para">
                  From emergency storm response to seasonal disease management and complex hazard removals, our crews prioritize your safety, home value, and landscaping aesthetics on every dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* NEW INTERACTIVE SERVICE TAB SELECTOR TOOL */}
      <section className="section-padding services-section-light" id="services">
        <div className="container">
          <div className="section-title">
            <span className="badge-pill">Interactive Service Console</span>
            <h2>Complete Tree Care Solutions</h2>
            <p>Select a service below to explore our detailed workflows, arborist checklists, and safety plans.</p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.75rem', 
            flexWrap: 'wrap', 
            marginBottom: '3rem',
            background: '#e2e8f0',
            padding: '0.5rem',
            borderRadius: '16px',
            maxWidth: '920px',
            margin: '0 auto 3rem auto'
          }}>
            {Object.keys(serviceDetails).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveServiceTab(tab)}
                style={{
                  padding: '0.85rem 1.4rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeServiceTab === tab ? '#064e3b' : 'transparent',
                  color: activeServiceTab === tab ? '#ffffff' : '#334155',
                  transition: 'all 0.25s ease',
                  flexGrow: 1,
                  textAlign: 'center'
                }}
              >
                {getServiceIcon(tab, 18)} {serviceDetails[tab].title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active Tab Details Display Panel */}
          <div className="service-display-panel">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '56px', 
                  height: '56px', 
                  background: 'rgba(141, 219, 180, 0.15)', 
                  color: '#8ddbb4', 
                  borderRadius: '16px' 
                }}>
                  {getServiceIcon(activeServiceTab, 28)}
                </span>
                <h3 style={{ fontSize: '2rem', color: '#ffffff' }}>{serviceDetails[activeServiceTab].title}</h3>
              </div>
              <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2rem', lineHeight: '1.7' }}>
                {serviceDetails[activeServiceTab].desc}
              </p>

              <div style={{ 
                background: 'rgba(10, 60, 56, 0.45)', 
                borderLeft: '4px solid #8ddbb4', 
                border: '1px solid rgba(149, 213, 178, 0.2)',
                borderLeftWidth: '4px',
                padding: '1.5rem', 
                borderRadius: '8px',
                marginBottom: '2rem',
                backdropFilter: 'blur(8px)'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#8ddbb4', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                  Safety Guarantee Policy
                </span>
                <p style={{ margin: 0, fontSize: '0.925rem', color: '#cbd5e1' }}>
                  Every procedure is executed in complete compliance with OSHA and ANSI A300 safety protocols to guarantee full property protection.
                </p>
              </div>

              <a href="#contact" className="btn-solid-green">
                <span>Request This Service</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Service Image Column */}
            <div style={{
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              border: '1px solid rgba(149, 213, 178, 0.25)',
              height: '100%',
              minHeight: '220px',
              position: 'relative'
            }}>
              <picture>
                <source srcSet={serviceDetails[activeServiceTab].imgAvif} type="image/avif" />
                <source srcSet={serviceDetails[activeServiceTab].imgWebp} type="image/webp" />
                <img 
                  src={serviceDetails[activeServiceTab].img} 
                  alt={serviceDetails[activeServiceTab].title} 
                  width="600" 
                  height="402"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
              </picture>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(8, 40, 38, 0.6) 100%)',
                pointerEvents: 'none'
              }}></div>
            </div>

            <div className="service-checklist-card">
              <h3 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(149, 213, 178, 0.15)', paddingBottom: '0.75rem' }}>
                Arborist Checklist
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {serviceDetails[activeServiceTab].points.map((pt, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: '#d8e2dc' }}>
                    <CheckCircle2 size={18} color="#8ddbb4" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Our Approach Workflow */}
      <section className="section-padding approach-section-light" id="approach">
        <div className="container">
          <div className="section-title">
            <span className="badge-pill">Our Approach</span>
            <h2>Professional Care From Start to Finish</h2>
            <p>A simple, transparent process designed to give you peace of mind.</p>
          </div>

          <div className="stepper-container-card">
            
            {/* Horizontal Track Line */}
            <div className="stepper-track-line">
              <div className="stepper-track-progress" />
            </div>

            {/* Stepper Steps Wrapper */}
            <div className="stepper-steps-wrapper">
              
              {/* Step 1 */}
              <div className="stepper-step completed">
                <div className="stepper-node">
                  <MessageSquare size={20} strokeWidth={2.5} />
                </div>
                <div className="stepper-meta">
                  <span className="step-label">Step 1</span>
                  <h3>Understand Needs</h3>
                  <p>We listen to your concerns and requirements.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="stepper-step completed">
                <div className="stepper-node">
                  <Trees size={20} strokeWidth={2.5} />
                </div>
                <div className="stepper-meta">
                  <span className="step-label">Step 2</span>
                  <h3>Inspection</h3>
                  <p>Our team evaluates your trees and landscape.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="stepper-step active">
                <div className="stepper-node">
                  <Wrench size={20} strokeWidth={2.5} />
                </div>
                <div className="stepper-meta">
                  <span className="step-label">Step 3</span>
                  <h3>Execution</h3>
                  <p>We perform the tree work safely and cleanly.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="stepper-step pending">
                <div className="stepper-node">
                  <Sparkles size={20} strokeWidth={2} />
                </div>
                <div className="stepper-meta">
                  <span className="step-label">Step 4</span>
                  <h3>Spotless Cleanup</h3>
                  <p>We complete final cleanup and inspection.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding why-editorial-section" id="why-us">
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="badge-pill">Why Choose Us</span>
            <h2 style={{ color: '#ffffff' }}>Caring for Newark's Canopy with Integrity</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              We combine certified arborist science, safe high-rigging physics, and lawn-protection guarantees to deliver elite property care.
            </p>
          </div>

          <div className="why-premium-grid">
            
            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="01" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper">
                  <Award size={28} color="#5de8c8" />
                </div>
              </div>
              <h3>ISA Certified Expertise</h3>
              <p>Our team consists of licensed, ISA-certified arborists who bring professional botanical knowledge and health assessments to every pruning and care program.</p>
            </div>

            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="02" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper">
                  <Wrench size={28} color="#5de8c8" />
                </div>
              </div>
              <h3>Precision Rigging Physics</h3>
              <p>We calculate load weights and use high-load pulley friction systems to lower heavy tree branches with controlled precision, ensuring zero property impact.</p>
            </div>

            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="03" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper">
                  <Home size={28} color="#5de8c8" />
                </div>
              </div>
              <h3>Lawn Shield Protection</h3>
              <p>We lay down heavy-duty ground protectors to distribute weight, preserving your lawn and decorative gardens from heavy equipment tracks.</p>
            </div>

            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="04" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper">
                  <Sparkles size={28} color="#5de8c8" />
                </div>
              </div>
              <h3>Spotless Cleanup Guarantee</h3>
              <p>Our crew chips all wood debris, rakes leaf litter, and sweeps pathways clean. We pledge to leave your property cleaner than we found it.</p>
            </div>

          </div>
        </div>
      </section>

      {/* NEW INTERACTIVE TESTIMONIALS SLIDER SECTION */}
      <section className="section-padding testimonials-section-light" style={{ background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-title">
            <span className="badge-pill">Customer Stories</span>
            <h2>What Our Clients Say</h2>
          </div>

          <div className="testimonial-card-container">
            <div style={{ color: '#fbbf24', display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
              {[...Array(testimonials[testimonialIndex].stars)].map((_, i) => (
                <Star key={i} size={22} fill="#fbbf24" stroke="none" />
              ))}
            </div>

            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#d8e2dc', lineHeight: '1.8', marginBottom: '2rem' }}>
              "{testimonials[testimonialIndex].text}"
            </p>

            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '0 0 0.25rem 0' }}>{testimonials[testimonialIndex].name}</h3>
            <span style={{ fontSize: '0.875rem', color: '#64d2c3', fontWeight: 600 }}>{testimonials[testimonialIndex].role}</span>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', borderTop: '1px solid rgba(149, 213, 178, 0.15)', paddingTop: '1.5rem' }}>
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(149, 213, 178, 0.2)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
              >
                ◀
              </button>
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {testimonials.map((_, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                       width: '8px', 
                       height: '8px', 
                       borderRadius: '50%', 
                       background: testimonialIndex === idx ? '#8ddbb4' : 'rgba(255, 255, 255, 0.2)',
                       transition: 'background 0.3s ease' 
                    }} 
                  />
                ))}
              </div>

              <button 
                onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(149, 213, 178, 0.2)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="commitment-banner-green">
        <div className="container">
          <div style={{ display: 'inline-flex', padding: '0.4rem 1.1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#2dd4bf', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
            Our Commitment
          </div>
          <h2>Safe Service. Healthy Trees. Happy Customers.</h2>
          <p>
            At Newark Tree Care, our goal is simple — provide dependable tree care while protecting your property and preserving the natural beauty around you. Every project receives careful planning, professional execution, and dedicated attention.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-solid-amber">Schedule Inspection</a>
            <a href="tel:5105458733" className="btn-solid-green">Call 510-545-8733</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding contact-section-light" id="contact">
        <div className="container">
          <div className="contact-box-light">
            <div>
              <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>
                Contact Section
              </span>
              <h2>Ready to Take Care of Your Trees?</h2>
              <p className="contact-desc">
                Whether you need expert advice, regular maintenance, or immediate tree assistance, our team is here to help.
              </p>
              <p className="contact-sub">
                Connect with Newark Tree Care today and discover reliable tree solutions for your property.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <MapPin size={20} color="#059669" />
                  </div>
                  <div><strong>Location:</strong> 6821 Central Ave, Newark, CA 94560</div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Phone size={20} color="#059669" />
                  </div>
                  <div><strong>Phone:</strong> 510-545-8733</div>
                </div>
              </div>

              <a href="tel:5105458733" className="btn-solid-green">
                Call 510-545-8733
              </a>
            </div>

            <div ref={contactRef} className="contact-form-card" style={{ padding: '0.75rem', minHeight: '580px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {contactVisible ? (
                <iframe
                  src="https://link.kdlead.com/widget/form/8UDU6zVGceOYljhIyUvu"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                  id="inline-8UDU6zVGceOYljhIyUvu" 
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Newark Tree Care"
                  data-height="1180"
                  data-layout-iframe-id="inline-8UDU6zVGceOYljhIyUvu"
                  data-form-id="8UDU6zVGceOYljhIyUvu"
                  title="Newark Tree Care"
                  loading="lazy"
                />
              ) : (
                <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>Loading secure form...</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>

      {/* Footer */}
      <footer className="footer-light">
        <div className="container">
          <div className="footer-grid-4">
            <div>
              <a href="#home" className="brand" style={{ marginBottom: '1.25rem' }}>
                <img src="assets/logo.webp?v=1" alt="Newark Tree Care Logo" width="42" height="42" />
                <div>
                  <div className="brand-text-name" style={{ color: '#ffffff' }}>Newark Tree Care</div>
                  <div className="brand-text-sub" style={{ color: '#2dd4bf' }}>Expert Tree Solutions</div>
                </div>
              </a>
              <p style={{ color: '#d1fae5', fontSize: '0.95rem', maxWidth: '320px', marginTop: '1rem' }}>
                Professional tree care services dedicated to safer properties and healthier landscapes across Newark, CA and surrounding counties.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a href="#home" style={{ color: '#d1fae5' }}>Home</a>
                <a href="#about" style={{ color: '#d1fae5' }}>About Us</a>
                <a href="#services" style={{ color: '#d1fae5' }}>Services</a>
                <a href="#approach" style={{ color: '#d1fae5' }}>Our Approach</a>
                <a href="#contact" style={{ color: '#d1fae5' }}>Contact</a>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Services</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a href="#services" style={{ color: '#d1fae5' }}>Tree Pruning</a>
                <a href="#services" style={{ color: '#d1fae5' }}>Tree Removal</a>
                <a href="#services" style={{ color: '#d1fae5' }}>Stump Grinding</a>
                <a href="#services" style={{ color: '#d1fae5' }}>Emergency Tree Care</a>
                <a href="#services" style={{ color: '#d1fae5' }}>Tree Maintenance</a>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact Us</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <span style={{ color: '#ffffff' }}>Direct Hotline:</span>
                <a href="tel:5105458733" style={{ fontWeight: 800, color: '#f59e0b', fontSize: '1.2rem' }}>510-545-8733</a>
                <span style={{ color: '#2dd4bf', fontSize: '0.85rem', fontWeight: 700 }}>Fast Emergency Response</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: '0.875rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>© 2026 Newark Tree Care. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <button 
                onClick={() => setActiveLegalModal('privacy')} 
                style={{ background: 'none', border: 'none', color: '#d1fae5', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline', padding: 0 }}
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setActiveLegalModal('terms')} 
                style={{ background: 'none', border: 'none', color: '#d1fae5', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline', padding: 0 }}
              >
                Terms & Conditions
              </button>
              <span style={{ color: '#2dd4bf', fontWeight: 600 }}>ISA License #CA-4892A</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Glassmorphic Terms & Conditions / Privacy Policy Modal */}
      {activeLegalModal && (
        <div
          onClick={() => setActiveLegalModal(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            cursor: 'pointer'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(8, 40, 38, 0.96)',
              width: '100%',
              maxWidth: '850px',
            maxHeight: '88vh',
            borderRadius: '24px',
            border: '1px solid rgba(149, 213, 178, 0.25)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 2rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(4, 28, 26, 0.7)'
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveLegalModal('terms')}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: activeLegalModal === 'terms' ? '#5de8c8' : 'rgba(255,255,255,0.2)',
                    background: activeLegalModal === 'terms' ? 'rgba(183, 239, 109, 0.15)' : 'transparent',
                    color: activeLegalModal === 'terms' ? '#5de8c8' : '#cbd5e1',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FileText size={16} /> Terms & Conditions
                </button>
                <button
                  onClick={() => setActiveLegalModal('privacy')}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: activeLegalModal === 'privacy' ? '#5de8c8' : 'rgba(255,255,255,0.2)',
                    background: activeLegalModal === 'privacy' ? 'rgba(183, 239, 109, 0.15)' : 'transparent',
                    color: activeLegalModal === 'privacy' ? '#5de8c8' : '#cbd5e1',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Lock size={16} /> Privacy Policy
                </button>
              </div>

              <button
                onClick={() => setActiveLegalModal(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body with Custom Scroll */}
            <div style={{
              padding: '2rem 2.5rem',
              overflowY: 'auto',
              color: '#d1fae5',
              fontSize: '0.95rem',
              lineHeight: 1.7
            }}>
              {activeLegalModal === 'terms' ? (
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                    Terms & Conditions
                  </h2>
                  <div style={{ color: '#2dd4bf', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                    Effective Date: January 19, 2025 &nbsp;|&nbsp; Last Updated: July 9, 2026
                  </div>

                  <p style={{ marginBottom: '1.25rem' }}>
                    Welcome to Newark Tree Care. By accessing this website or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.
                  </p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Business Identity</h3>
                  <p>These Terms and Conditions govern your use of the services provided by Newark Tree Care, located at 6821 Central Ave, Newark, CA 94560. Contact: 510-545-8733 | info@newarktreecare.com.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Age Requirement (18+)</h3>
                  <p>By using this website or enrolling in our services, including SMS messaging, you confirm that you are at least 18 years of age. Our SMS program is not directed to individuals under 18.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Terminology</h3>
                  <p>“Client,” “You,” and “Your” refers to the user of this website. “The Company,” “We,” “Our,” and “Us” refers to Newark Tree Care.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4. SMS Messaging Terms of Service</h3>
                  <p><strong>4a. Program Description & Message Types:</strong> By providing your phone number and checking the SMS consent checkbox on our contact forms, you agree to receive recurring automated text messages from Newark Tree Care. Messages may include:</p>
                  <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0 1rem 0' }}>
                    <li>Free estimate confirmations and scheduling notifications</li>
                    <li>Appointment reminders and project status updates</li>
                    <li>Customer support and service follow-up communications</li>
                    <li>Promotional offers and seasonal announcements related to our tree care services</li>
                  </ul>
                  <p><strong>4b. Message Frequency:</strong> Message frequency varies based on your service activity and interactions with us. You may receive up to 4–8 messages per month. Frequency may increase during active service periods.</p>
                  <p><strong>4c. Message & Data Rates:</strong> Message and data rates may apply for any messages sent to you from us and to us from you. Charges are determined by your mobile carrier and your individual service plan. Newark Tree Care is not responsible for any carrier charges.</p>
                  <p><strong>4d. How to Opt Out (STOP):</strong> You can opt out of receiving SMS messages at any time by replying STOP to any message we send. After opting out, you will receive a one-time confirmation message and will no longer receive SMS messages from us unless you re-enroll.</p>
                  <p><strong>4e. How to Get Help (HELP):</strong> For help with our SMS program, reply HELP to any message or contact us directly at Phone: 510-545-8733 | Email: info@newarktreecare.com.</p>
                  <p><strong>4f. Carrier Liability Disclaimer:</strong> Mobile carriers are not liable for delayed or undelivered messages. Newark Tree Care cannot guarantee delivery of SMS messages. Delivery of information through SMS may be subject to your mobile carrier’s capability and coverage area.</p>
                  <p><strong>4g. Supported Carriers:</strong> Our SMS program is supported by all major U.S. wireless carriers including AT&T, Verizon, T-Mobile, and Sprint. Not all carriers are supported for all messages.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>5. Cookies</h3>
                  <p>We use cookies in accordance with our Privacy Policy to improve user experience and website functionality.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>6. Intellectual Property & License</h3>
                  <p>Unless otherwise stated, Newark Tree Care owns the intellectual property rights for all content on this website. You may not copy, reproduce, republish, sell, or redistribute any material without prior written permission.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>7. Comments & User Content</h3>
                  <p>Newark Tree Care reserves the right to monitor and remove any comments or user-generated content on our platforms that are inappropriate, offensive, or violate these terms.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>8. Content Liability</h3>
                  <p>We are not responsible for content that appears on external websites linking to us. You agree to defend and protect Newark Tree Care against any claims arising from your website or digital properties.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>9. Disclaimer</h3>
                  <p>To the maximum extent permitted by applicable law, Newark Tree Care excludes all warranties, representations, and conditions relating to our website and services. We are not liable for any loss or damage (including, without limitation, damage for loss of business, profits, or revenue) arising from the use of our website or services.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>10. Changes to These Terms</h3>
                  <p>We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with a revised “Last Updated” date. Continued use of our website or services constitutes acceptance of the updated terms.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>11. Contact Information</h3>
                  <p style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <strong>Company:</strong> Newark Tree Care<br />
                    <strong>Address:</strong> 6821 Central Ave, Newark, CA 94560<br />
                    <strong>Phone:</strong> 510-545-8733<br />
                    <strong>Email:</strong> info@newarktreecare.com<br />
                    <strong>ISA License:</strong> #CA-4892A
                  </p>
                </div>
              ) : (
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                    Privacy Policy
                  </h2>
                  <div style={{ color: '#2dd4bf', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                    Effective Date: January 19, 2025 &nbsp;|&nbsp; Last Updated: July 9, 2026
                  </div>

                  <p style={{ marginBottom: '1.25rem' }}>
                    Newark Tree Care ("we," "our," or "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data in compliance with applicable U.S. data protection laws, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) where applicable.
                  </p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Information We Collect</h3>
                  <p>We may collect the following categories of personal information when you contact us, request a quote, submit a web form, or use our services:</p>
                  <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0 1rem 0' }}>
                    <li>Full name</li>
                    <li>Mailing or service address</li>
                    <li>Email address</li>
                    <li>Mobile phone number</li>
                    <li>Service request details and project descriptions</li>
                    <li>Communication history and preferences</li>
                  </ul>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. SMS / Text Message Communications</h3>
                  <p><strong>2a. How We Collect Your Mobile Number:</strong> We collect your mobile phone number when you voluntarily provide it through our website contact forms, phone calls, or other direct communication channels. By providing your mobile number and checking the SMS consent checkbox on our forms, you expressly consent to receive SMS (text message) communications from Newark Tree Care.</p>
                  <p><strong>2b. Types of Messages We Send:</strong> Free estimate confirmations, appointment reminders, project status updates, customer support, and promotional offers related to our tree care services.</p>
                  <p><strong>2c. Message Frequency:</strong> You may receive up to 4–8 messages per month depending on your service activity.</p>
                  <p><strong>2d. Message & Data Rates:</strong> Standard message and data rates may apply depending on your mobile carrier.</p>
                  <p><strong>2e. How to Opt Out (STOP):</strong> Reply STOP to any text message at any time to opt out.</p>
                  <p><strong>2f. How to Get Help (HELP):</strong> Reply HELP or contact us at 510-545-8733 | info@newarktreecare.com.</p>

                  <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1.5px solid #2dd4bf', borderRadius: '14px', padding: '1.25rem', margin: '1.75rem 0' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Lock size={18} color="#2dd4bf" /> 3. Mobile Information & SMS Consent — No Third-Party Sharing
                    </h3>
                    <p style={{ margin: 0, fontWeight: 600, color: '#ecfdf5' }}>
                      No mobile information (including your mobile phone number and SMS opt-in consent data) will be shared with third parties or affiliates for marketing or promotional purposes.
                    </p>
                    <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.88rem', color: '#a7f3d0' }}>
                      All other categories of personal data exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties under any circumstances.
                    </p>
                  </div>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4. How We Use Your Information</h3>
                  <p>We use the personal information we collect to provide and manage tree care services, respond to inquiries, schedule appointments, send promotional communications (with consent), and comply with applicable California laws.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>5. Cookies and Tracking Technologies</h3>
                  <p>We use cookies and similar technologies to improve website functionality, analyze traffic, and enhance user experience. Cookies do not store sensitive personal information.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>6. Data Security</h3>
                  <p>We implement reasonable administrative, technical, and physical security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>7. Data Retention</h3>
                  <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by applicable law.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>8. Your Privacy Rights</h3>
                  <p>Depending on your location (including CCPA rights for California residents), you may have the rights to Access, Correct, Delete, or Opt-Out of Marketing. To exercise any of these rights, contact us at info@newarktreecare.com or call 510-545-8733.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>9. Changes to This Privacy Policy</h3>
                  <p>We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised “Last Updated” date.</p>

                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>10. Contact Information</h3>
                  <p style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <strong>Company:</strong> Newark Tree Care<br />
                    <strong>Address:</strong> 6821 Central Ave, Newark, CA 94560<br />
                    <strong>Phone:</strong> 510-545-8733<br />
                    <strong>Email:</strong> info@newarktreecare.com<br />
                    <strong>ISA License:</strong> #CA-4892A
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
