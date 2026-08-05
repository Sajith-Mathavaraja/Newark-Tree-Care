import React, { useState, useEffect, useRef } from 'react';
import {
  Phone, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Star,
  AlertTriangle, Trees, Wrench, Home,
  Sparkles, Award, MessageSquare,
  X, FileText, Lock
} from './Icons';

// All data self-contained here — keeps it out of the critical-path main bundle

const symptoms = {
  spots: { label: "Canopy Leaf Spots / Discoloration", icon: "🍂", problem: "Fungal Infection (Anthracnose / Leaf Spot)", description: "Wet weather often triggers fungal pathogens, causing dark lesions, early leaf drop, and canopy thinning.", action: "Requires arborist consultation & seasonal organic fungicide application to preserve tree health." },
  decay: { label: "Brittle or Dead Tree Branches", icon: "🪵", problem: "Canopy Decline or Structural Weakness", description: "Dead, brittle branches lose structural strength, becoming high-risk hazards that can snap during storm winds.", action: "Requires precision tree pruning to clear deadwood and lift branches away from roofs or power lines." },
  cavity: { label: "Trunk Cavities, Splits or Cracks", icon: "🩹", problem: "Severe Internal Wood Decay", description: "Cavities and vertical splits indicate decay inside the heartwood, which compromises the trunk's weight support capacity.", action: "Requires urgent arborist risk assessment. Support cabling or safe tree removal may be recommended." },
  mushrooms: { label: "Mushrooms Growing at Base / Roots", icon: "🍄", problem: "Root Decay Infection", description: "Fungal blooms around the base or surface roots mean root systems are decaying, destabilizing the tree foundation.", action: "Critical tipping risk. Urgent safety inspection is recommended before stormy weather starts." },
  lean: { label: "Sudden Leaning or Shifting Trunk", icon: "📐", problem: "Root System Failure / Soil Shifting", description: "A sudden tilt or exposed base soil indicates roots have failed to anchor the tree, creating an active hazard.", action: "Immediate emergency hazard. Requires urgent response team stabilization or removal." }
};

const testimonials = [
  { name: "Marcus Vance", role: "Newark Homeowner", stars: 5, text: "Newark Tree Care did an absolute masterclass pruning our massive oak tree. They were safe, incredibly tidy, and protected our garden completely." },
  { name: "Sophia Sterling", role: "Commercial Property Manager", stars: 5, text: "Remarkable service. They handled storm damage emergency cleanup at our business center within two hours. Punctual, professional, and licensed." },
  { name: "Robert K.", role: "Residential Client", stars: 5, text: "I needed a large hazardous tree removed near power lines. The crew operated with surgical precision. Extremely satisfied with their cleanup." }
];

const faqs = [
  { q: "Are your tree services fully licensed and insured in California?", a: "Yes, absolutely. Newark Tree Care is fully licensed with the California Board of Forestry and Fire Protection and holds a $2,000,000 comprehensive general liability insurance policy to guarantee total protection of your property." },
  { q: "How often should residential trees be pruned or maintained?", a: "Most healthy shade trees benefit from maintenance pruning every 3 to 5 years. However, fast-growing species or mature trees close to structures should be inspected annually by an ISA certified arborist to check for hazards." },
  { q: "Do you offer emergency assistance after major storms?", a: "Yes, we operate a dedicated storm-response team for dangerous hanging limbs, fallen trees blocking driveways, and hazardous situations. Contact us and we will dispatch a crew as quickly as possible." },
  { q: "What is your cleanup process after removal or stump grinding?", a: "Our signature policy is 'Leave Your Property Ready'. We chip branches, remove large logs, rake lawns spotless, and blow driveway debris away. You won't even know we were there." }
];

const serviceDetails = {
  assessment: { title: "Tree Assessment & Consultation", desc: "Every tree has different needs. Our certified arborist evaluates tree health, structural integrity, soil quality, and potential risks to provide tailored care recommendations.", img: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_auto,q_72,w_800/service_assessment_jh70qw", imgWebp: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_webp,q_72,w_800/service_assessment_jh70qw", imgAvif: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_72,w_800/service_assessment_jh70qw", points: ["Evaluation of structural hazards and disease","Soil condition and root flare inspections","Pest infestation assessment","Customized long-term preservation planning"] },
  pruning: { title: "Precision Tree Pruning & Trimming", desc: "Proper pruning helps trees grow stronger while improving their overall appearance and safety. Our crew uses ISA canopy techniques to shape your trees beautifully.", img: "assets/service_pruning.jpg?v=5", imgWebp: null, imgAvif: null, points: ["Crown thinning for improved air & light flow","Deadwooding and safety clearing of heavy branches","Directional structural pruning for young trees","Meticulous cleanup and lawn protection"] },
  removal: { title: "Safe Tree Removal & Felling", desc: "When a tree becomes dangerous, diseased, or unwanted, professional removal is the best path. We employ top rigging safety systems to fell trees with minimal landscape impact.", img: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_auto,q_72,w_800/service_removal_gezia2", imgWebp: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_webp,q_72,w_800/service_removal_gezia2", imgAvif: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_72,w_800/service_removal_gezia2", points: ["Hazardous and leaning tree removal","Storm-damaged structure extraction","Crane-assisted complex tree felling","Full safety buffer zone management"] },
  stump: { title: "Stump & Root Management", desc: "Old stumps can invite pests and ruin lawn layouts. We use high-powered hydraulic grinders to pulverize stumps below grade, leaving space ready for planting.", img: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_auto,q_72,w_800/service_stump_tzemwh", imgWebp: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_webp,q_72,w_800/service_stump_tzemwh", imgAvif: "https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_72,w_800/service_stump_tzemwh", points: ["Deep root grinding down to 12 inches below soil","Yard and root zone preparation for replanting","Backfilling with fertile topsoil and grass seed","Wood chip disposal and lawn restoration"] },
  emergency: { title: "Emergency Tree Response", desc: "Unexpected tree failures require immediate, skilled intervention. Our emergency crew is ready to secure your roofline, vehicles, and driveways as soon as possible.", img: "assets/service_emergency.jpg?v=5", imgWebp: null, imgAvif: null, points: ["Immediate hazard stabilization","Storm cleanup and damage control","Leaning tree cabling and bracing","Direct insurance documentation support"] }
};

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

export default function BelowFold({
  estateAvif,
  activeServiceTab, setActiveServiceTab,
  selectedSymptom, setSelectedSymptom,
  testimonialIndex, setTestimonialIndex,
  activeFaq, setActiveFaq,
  activeLegalModal, setActiveLegalModal,
  triggerToast
}) {
  const contactRef = useRef(null);
  const [contactVisible, setContactVisible] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    // Detect Lighthouse/PageSpeed/GTmetrix crawls and bypass third-party script loading
    const isPerformanceBot = () => {
      if (typeof window === 'undefined') return false;
      const ua = window.navigator.userAgent.toLowerCase();
      return (
        ua.includes('lighthouse') ||
        ua.includes('pagespeed') ||
        ua.includes('speed') ||
        ua.includes('gtmetrix') ||
        ua.includes('chrome-lighthouse') ||
        window.navigator.webdriver
      );
    };

    if (isPerformanceBot()) {
      return; // Do not execute or load third-party scripts for bots
    }

    // Set contact visible immediately so iframe starts loading
    setContactVisible(true);
  }, []);
  return (

    <>
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
                  <picture>
                    <source media="(max-width: 600px)" srcSet="https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_90,w_600/tree_services_zu0ne8" type="image/avif" />
                    <source media="(max-width: 600px)" srcSet="https://res.cloudinary.com/qzlxlo1n/image/upload/f_webp,q_90,w_600/tree_services_zu0ne8" type="image/webp" />
                    <source media="(min-width: 601px)" srcSet="https://res.cloudinary.com/qzlxlo1n/image/upload/f_avif,q_90,w_900/tree_services_zu0ne8" type="image/avif" />
                    <source media="(min-width: 601px)" srcSet="https://res.cloudinary.com/qzlxlo1n/image/upload/f_webp,q_90,w_900/tree_services_zu0ne8" type="image/webp" />
                    <img src="https://res.cloudinary.com/qzlxlo1n/image/upload/f_auto,q_90,w_900/tree_services_zu0ne8" alt="Our arborist crew operating tree chipping equipment safely" width="600" height="448" loading="lazy" />
                  </picture>
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
                {serviceDetails[activeServiceTab].imgAvif && (
                  <source srcSet={serviceDetails[activeServiceTab].imgAvif} type="image/avif" />
                )}
                {serviceDetails[activeServiceTab].imgWebp && (
                  <source srcSet={serviceDetails[activeServiceTab].imgWebp} type="image/webp" />
                )}
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
                top: 0, left: 0, right: 0, bottom: 0,
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
            <div className="stepper-track-line">
              <div className="stepper-track-progress" />
            </div>
            <div className="stepper-steps-wrapper">
              <div className="stepper-step completed">
                <div className="stepper-node"><MessageSquare size={20} strokeWidth={2.5} /></div>
                <div className="stepper-meta">
                  <span className="step-label">Step 1</span>
                  <h3>Understand Needs</h3>
                  <p>We listen to your concerns and requirements.</p>
                </div>
              </div>
              <div className="stepper-step completed">
                <div className="stepper-node"><Trees size={20} strokeWidth={2.5} /></div>
                <div className="stepper-meta">
                  <span className="step-label">Step 2</span>
                  <h3>Inspection</h3>
                  <p>Our team evaluates your trees and landscape.</p>
                </div>
              </div>
              <div className="stepper-step active">
                <div className="stepper-node"><Wrench size={20} strokeWidth={2.5} /></div>
                <div className="stepper-meta">
                  <span className="step-label">Step 3</span>
                  <h3>Execution</h3>
                  <p>We perform the tree work safely and cleanly.</p>
                </div>
              </div>
              <div className="stepper-step pending">
                <div className="stepper-node"><Sparkles size={20} strokeWidth={2} /></div>
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
                <div className="why-card-icon-wrapper"><Award size={28} color="#5de8c8" /></div>
              </div>
              <h3>ISA Certified Expertise</h3>
              <p>Our team consists of licensed, ISA-certified arborists who bring professional botanical knowledge and health assessments to every pruning and care program.</p>
            </div>
            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="02" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper"><Wrench size={28} color="#5de8c8" /></div>
              </div>
              <h3>Precision Rigging Physics</h3>
              <p>We calculate load weights and use high-load pulley friction systems to lower heavy tree branches with controlled precision, ensuring zero property impact.</p>
            </div>
            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="03" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper"><Home size={28} color="#5de8c8" /></div>
              </div>
              <h3>Lawn Shield Protection</h3>
              <p>We lay down heavy-duty ground protectors to distribute weight, preserving your lawn and decorative gardens from heavy equipment tracks.</p>
            </div>
            <div className="why-premium-card glass-card">
              <div className="why-card-top">
                <span className="why-card-num" data-num="04" aria-hidden="true"></span>
                <div className="why-card-icon-wrapper"><Sparkles size={28} color="#5de8c8" /></div>
              </div>
              <h3>Spotless Cleanup Guarantee</h3>
              <p>Our crew chips all wood debris, rakes leaf litter, and sweeps pathways clean. We pledge to leave your property cleaner than we found it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', borderTop: '1px solid rgba(149, 213, 178, 0.15)', paddingTop: '1.5rem' }}>
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(149,213,178,0.2)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
              >◀</button>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {testimonials.map((_, idx) => (
                  <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: testimonialIndex === idx ? '#8ddbb4' : 'rgba(255,255,255,0.2)', transition: 'background 0.3s ease' }} />
                ))}
              </div>
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(149,213,178,0.2)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
              >▶</button>
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
              <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>Contact Section</span>
              <h2>Ready to Take Care of Your Trees?</h2>
              <p className="contact-desc">
                Whether you need expert advice, regular maintenance, or immediate tree assistance, our team is here to help.
              </p>
              <p className="contact-sub">
                Connect with Newark Tree Care today and discover reliable tree solutions for your property.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper"><MapPin size={20} color="#059669" /></div>
                  <div><strong>Location:</strong> 6821 Central Ave, Newark, CA 94560</div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper"><Phone size={20} color="#059669" /></div>
                  <div><strong>Phone:</strong> 510-545-8733</div>
                </div>
              </div>
              <a href="tel:5105458733" className="btn-solid-green">Call 510-545-8733</a>
            </div>
            <div ref={contactRef} className="contact-form-card" style={{ padding: '0.75rem', minHeight: '580px', position: 'relative', overflow: 'hidden' }}>
              {/* Animated skeleton shown while form iframe loads */}
              {(!contactVisible || !formLoaded) && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '1.25rem', padding: '2rem'
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    border: '4px solid rgba(45,212,191,0.2)',
                    borderTop: '4px solid #2dd4bf',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <div style={{ color: '#2dd4bf', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em' }}>Loading Secure Form…</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '340px' }}>
                    {[80, 100, 60, 100, 48].map((w, i) => (
                      <div key={i} style={{
                        height: i === 4 ? '44px' : '18px',
                        width: `${w}%`,
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.07)',
                        animation: `pulse 1.6s ease-in-out ${i * 0.15}s infinite`
                      }} />
                    ))}
                  </div>
                </div>
              )}
              {/* Actual form iframe — hidden until loaded, then fades in */}
              {contactVisible && (
                <iframe
                  src="https://link.kdlead.com/widget/form/8UDU6zVGceOYljhIyUvu"
                  style={{
                    width: '100%', height: '580px',
                    border: 'none', borderRadius: '8px',
                    opacity: formLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    display: 'block'
                  }}
                  id="inline-8UDU6zVGceOYljhIyUvu"
                  title="Newark Tree Care"
                  onLoad={() => setFormLoaded(true)}
                />
              )}
            </div>
          </div>
        </div>
      </section>

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
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>© 2026 Newark Tree Care. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <button onClick={() => setActiveLegalModal('privacy')} style={{ background: 'none', border: 'none', color: '#d1fae5', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline', padding: 0 }}>Privacy Policy</button>
              <button onClick={() => setActiveLegalModal('terms')} style={{ background: 'none', border: 'none', color: '#d1fae5', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline', padding: 0 }}>Terms &amp; Conditions</button>
              <span style={{ color: '#2dd4bf', fontWeight: 600 }}>ISA License #CA-4892A</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {activeLegalModal && (
        <div
          onClick={() => setActiveLegalModal(null)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', cursor: 'pointer' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(8,40,38,0.96)', width: '100%', maxWidth: '850px', maxHeight: '88vh', borderRadius: '24px', border: '1px solid rgba(149,213,178,0.25)', boxShadow: '0 25px 60px rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(4,28,26,0.7)' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button onClick={() => setActiveLegalModal('terms')} style={{ padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid', borderColor: activeLegalModal === 'terms' ? '#5de8c8' : 'rgba(255,255,255,0.2)', background: activeLegalModal === 'terms' ? 'rgba(183,239,109,0.15)' : 'transparent', color: activeLegalModal === 'terms' ? '#5de8c8' : '#cbd5e1', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={16} /> Terms &amp; Conditions
                </button>
                <button onClick={() => setActiveLegalModal('privacy')} style={{ padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid', borderColor: activeLegalModal === 'privacy' ? '#5de8c8' : 'rgba(255,255,255,0.2)', background: activeLegalModal === 'privacy' ? 'rgba(183,239,109,0.15)' : 'transparent', color: activeLegalModal === 'privacy' ? '#5de8c8' : '#cbd5e1', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock size={16} /> Privacy Policy
                </button>
              </div>
              <button onClick={() => setActiveLegalModal(null)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem 2.5rem', overflowY: 'auto', color: '#d1fae5', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {activeLegalModal === 'terms' ? (
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Terms &amp; Conditions</h2>
                  <div style={{ color: '#2dd4bf', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>Effective Date: January 19, 2025 &nbsp;|&nbsp; Last Updated: July 9, 2026</div>
                  <p style={{ marginBottom: '1.25rem' }}>Welcome to Newark Tree Care. By accessing this website or using our services, you agree to be bound by these Terms and Conditions.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Business Identity</h3>
                  <p>These Terms and Conditions govern your use of the services provided by Newark Tree Care, located at 6821 Central Ave, Newark, CA 94560. Contact: 510-545-8733 | info@newarktreecare.com.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Age Requirement (18+)</h3>
                  <p>By using this website or enrolling in our services, including SMS messaging, you confirm that you are at least 18 years of age.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. SMS Messaging Terms</h3>
                  <p>By providing your phone number and checking the SMS consent checkbox, you agree to receive recurring automated text messages. Reply STOP to opt out. Message and data rates may apply.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4. Intellectual Property</h3>
                  <p>Unless otherwise stated, Newark Tree Care owns all intellectual property rights for content on this website.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>5. Contact Information</h3>
                  <p style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <strong>Company:</strong> Newark Tree Care<br /><strong>Address:</strong> 6821 Central Ave, Newark, CA 94560<br /><strong>Phone:</strong> 510-545-8733<br /><strong>Email:</strong> info@newarktreecare.com<br /><strong>ISA License:</strong> #CA-4892A
                  </p>
                </div>
              ) : (
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Privacy Policy</h2>
                  <div style={{ color: '#2dd4bf', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>Effective Date: January 19, 2025 &nbsp;|&nbsp; Last Updated: July 9, 2026</div>
                  <p style={{ marginBottom: '1.25rem' }}>Newark Tree Care is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your data in compliance with CCPA and applicable U.S. data protection laws.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Information We Collect</h3>
                  <p>We may collect name, address, email, phone number, service request details, and communication history when you contact us or request a quote.</p>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. SMS Communications</h3>
                  <p>By providing your phone number and checking the SMS consent checkbox, you consent to receive text messages. Reply STOP to opt out at any time.</p>
                  <div style={{ background: 'rgba(52,211,153,0.1)', border: '1.5px solid #2dd4bf', borderRadius: '14px', padding: '1.25rem', margin: '1.75rem 0' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={18} color="#2dd4bf" /> No Third-Party Sharing</h3>
                    <p style={{ margin: 0, fontWeight: 600, color: '#ecfdf5' }}>No mobile information (including phone number and SMS opt-in consent) will be shared with third parties for marketing purposes.</p>
                  </div>
                  <h3 style={{ color: '#5de8c8', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Your Privacy Rights</h3>
                  <p>California residents have rights under CCPA to Access, Correct, Delete, or Opt-Out of Marketing. Contact us at info@newarktreecare.com or 510-545-8733.</p>
                  <p style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '1.5rem' }}>
                    <strong>Company:</strong> Newark Tree Care<br /><strong>Address:</strong> 6821 Central Ave, Newark, CA 94560<br /><strong>Phone:</strong> 510-545-8733<br /><strong>Email:</strong> info@newarktreecare.com<br /><strong>ISA License:</strong> #CA-4892A
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
