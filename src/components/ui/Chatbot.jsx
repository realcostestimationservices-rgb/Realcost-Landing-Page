import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const qrRef = useRef(null);

  const botResponses = {
    trial: ["✅ Start your 14-day free trial — no credit card required. Click 'Request Demo' at the top of the page to request a demo."],
    pricing: ["💰 Real Cost is $10/user/month or $80/user/year (save 33%). 14-day free trial included, no card needed."],
    features: ["🔍 Key features: Digital Takeoff Canvas (upload PDF drawings), Auto-Count (find symbols across all pages instantly), Bid Page (material, labour, overhead, duration), Canadian city pricing (L1/L2/L3), Supplier RFQs, one-click Quote Letter, Estimate Graph, and Team Management."],
    autocount: ["Auto-Count: draw a rectangle around any symbol on your drawing — Real Cost finds and counts all matching assemblies across every page of your drawing set, instantly. No manual clicking."],
    bidpage: ["💰 The Bid Page auto-calculates material costs, labour hours, overhead, markup, and project duration from your takeoff counts. Everything updates live as you make changes."],
    quote: ["📋 Once your bid is done, one click generates a professional branded PDF or Word quote letter — ready to send to your client immediately."],
    trades: ["🏗 Real Cost supports: Electrical, Mechanical/HVAC, Plumbing, Fire Alarm, Voice & Data, Security, Audio/Visual, Heat Tracing, and Mechanical Control."],
    pricing_can: ["📍 Material rates auto-adjust to your city's regional pricing tier (L1/L2/L3) — covering Toronto, Ottawa, Montreal, Calgary, Vancouver, Quebec and more."],
    contact: ["📞 (647) 677-8399 · info@realcostestimating.ca · Toronto, Ontario · Mon–Fri 9AM–6PM ET"],
    default: ["👋 Hi! I can help with anything about Real Cost — features, pricing, workflows, or how to get started. What would you like to know?"]
  };

  const quickReplies = [
    ['🚀 Free trial', 'trial'],
    ['💰 Pricing', 'pricing'],
    ['🔍 Auto-count', 'autocount'],
    ['🏗 Trades', 'trades'],
    ['📞 Contact', 'contact']
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
      else if (lower.includes('trade') || lower.includes('electrical') || lower.includes('mechanical') || lower.includes('plumb') || lower.includes('fire')) key = 'trades';
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
      addMessage("👋 Hi! I'm the Real Cost assistant. Ask me anything about our digital estimation platform!", 'bot');
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
      <button className="cbtn" onClick={toggle}>
        {isOpen ? (
          <span className="cbtn-close">×</span>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7C4 5.34315 5.34315 4 7 4H21C22.6569 4 24 5.34315 24 7V17C24 18.6569 22.6569 20 21 20H15L9 24V20H7C5.34315 20 4 18.6569 4 17V7Z" fill="white" fillOpacity="0.95"/>
            <circle cx="10" cy="13" r="1.5" fill="#0F2557"/>
            <circle cx="14" cy="13" r="1.5" fill="#0F2557"/>
            <circle cx="18" cy="13" r="1.5" fill="#0F2557"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
