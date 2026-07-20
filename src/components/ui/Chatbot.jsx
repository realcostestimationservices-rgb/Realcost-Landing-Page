import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/chatbot.css';

const ChatIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
    <path d="M4 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-5l-4 3v-3H6c-1.1 0-2-.9-2-2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 6.5l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
    <path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.4-1.2A8.5 8.5 0 1012 3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M9.3 9.6c.15-.45.55-.75 1-.65l.7.15c.35.08.6.35.7.7l.2.85c.1.35 0 .7-.25.9l-.4.35c.4.85 1.05 1.5 1.9 1.9l.35-.4c.2-.25.55-.35.9-.25l.85.2c.35.1.62.35.7.7l.15.7c.1.45-.2.85-.65 1-1.9.6-4.1-.1-5.4-1.5-1.4-1.3-2.1-3.5-1.5-5.4z" stroke="currentColor" strokeWidth="1.05" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const qrRef = useRef(null);

  const botResponses = {
    trial: ["Start your 14-day free trial — no credit card required. Click 'Request Demo' at the top of the page to request a demo."],
    pricing: ["Real Cost is $10/user/month or $80/user/year (save 33%). 14-day free trial included, no card needed."],
    features: ["Key features: Digital Takeoff Canvas (upload PDF drawings), Auto-Count (find symbols across all pages instantly), Bid Page (material, labour, overhead, duration), Canadian city pricing (L1/L2/L3), Supplier RFQs, one-click Quote Letter, Estimate Graph, and Team Management."],
    autocount: ["Auto-Count: draw a rectangle around any symbol on your drawing — Real Cost finds and counts all matching assemblies across every page of your drawing set, instantly. No manual clicking."],
    bidpage: ["The Bid Page auto-calculates material costs, labour hours, overhead, markup, and project duration from your takeoff counts. Everything updates live as you make changes."],
    quote: ["Once your bid is done, one click generates a professional branded PDF or Word quote letter — ready to send to your client immediately."],
    pricing_can: ["Material rates auto-adjust to your city's regional pricing tier (L1/L2/L3) — covering Toronto, Ottawa, Montreal, Calgary, Vancouver, Quebec and more."],
    trades: ["Real Cost is built specifically for electrical contractors in Canada — every formula, assembly and workflow is purpose-built for electrical estimating."],
    contact: ["(647) 677-8399 · info@realcostestimating.ca · 1200 Bloor Street West, Toronto · Mon–Fri 9AM–6PM ET"],
    default: ["Hi! I can help with anything about Real Cost — features, pricing, workflows, or how to get started. What would you like to know?"]
  };

  const quickReplies = [
    ['Free trial', 'trial'],
    ['Pricing', 'pricing'],
    ['Auto-count', 'autocount'],
    ['Contact', 'contact']
  ];

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, { text, type }]);
  };

  const handleQuickReply = (key, label) => {
    addMessage(label, 'user');
    setTimeout(() => {
      const response = botResponses[key] || botResponses.default;
      addMessage(response[0], 'bot');
      setQuickReplies(quickReplies);
    }, 400);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    addMessage(text, 'user');
    setInput('');
    setQuickReplies([]);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let key = 'default';
      if (lower.includes('trial') || lower.includes('free') || lower.includes('start')) key = 'trial';
      else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('$')) key = 'pricing';
      else if (lower.includes('auto') || lower.includes('count') || lower.includes('ai') || lower.includes('symbol')) key = 'autocount';
      else if (lower.includes('bid') || lower.includes('calculat')) key = 'bidpage';
      else if (lower.includes('quote') || lower.includes('letter')) key = 'quote';
      else if (lower.includes('trade') || lower.includes('electrical') || lower.includes('contractor')) key = 'trades';
      else if (lower.includes('city') || lower.includes('toronto') || lower.includes('montreal') || lower.includes('canada') || lower.includes('pricing')) key = 'pricing_can';
      else if (lower.includes('feature') || lower.includes('platform') || lower.includes('takeoff')) key = 'features';
      else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('support')) key = 'contact';
      const response = botResponses[key] || botResponses.default;
      addMessage(response[0], 'bot');
      setQuickReplies(quickReplies);
    }, 500);
  };

  const setQuickReplies = (replies) => {
    if (qrRef.current) {
      qrRef.current.innerHTML = replies ? replies.map(([label, key]) =>
        `<button class="cqr" onclick="window.__chatQuickReply('${key}','${label}')">${label}</button>`
      ).join('') : '';
    }
  };

  // Expose quick reply to window
  useEffect(() => {
    window.__chatQuickReply = handleQuickReply;
    return () => { delete window.__chatQuickReply; };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage("Hi! I'm the Real Cost assistant. Ask me anything about our digital estimation platform!", 'bot');
      setTimeout(() => setQuickReplies(quickReplies), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cfab">
      <div className={`cwin ${isOpen ? 'open' : ''}`}>
        <div className="chdr">
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <img
              src={process.env.PUBLIC_URL + '/images/brand/logo.png'}
              alt="RC"
              className="chdr-logo"
            />
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#fff', letterSpacing: '0.01em' }}>Real Cost Assistant</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <div className="chdr-online" />
                <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,.50)', fontWeight: '400' }}>Online · Replies in seconds</span>
              </div>
            </div>
          </div>
          <button onClick={toggle} style={{ background: 'rgba(255,255,255,.08)', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.7)', fontSize: '18px', lineHeight: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div className="cbody">
          {messages.map((msg, i) => (
            <div key={i} className={msg.type === 'bot' ? 'mbot' : 'musr'}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="cqrs" ref={qrRef}></div>
        <div className="cinrow">
          <input
            placeholder="Ask anything about Real Cost..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="csend" onClick={handleSend}>➤</button>
        </div>
      </div>
      <div className="cicon-stack">
        <button className={`cistack-btn${isOpen ? ' active' : ''}`} onClick={toggle} aria-label="Chat with us">
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </button>
        <a className="cistack-btn" href="tel:6476778399" aria-label="Call us">
          <PhoneIcon />
        </a>
        <a className="cistack-btn" href="https://mail.google.com/mail/?view=cm&fs=1&to=info@realcostestimating.ca" target="_blank" rel="noopener noreferrer" aria-label="Email us">
          <MailIcon />
        </a>
        <a className="cistack-btn" href="https://wa.me/16476778399" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
};

export default Chatbot;
