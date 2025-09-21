import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const contactEmail = 'admin@aenzbi.com';
  const contactPhone = '25779457170'; // No '+' or spaces for wa.me URL

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const getFormattedMessage = () => {
    return `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`;
  };

  const handleSubmit = (e: React.FormEvent, method: 'email' | 'whatsapp') => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    if (method === 'email') {
      const subject = encodeURIComponent(`Sales Inquiry from ${formData.name}`);
      const body = encodeURIComponent(getFormattedMessage());
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    } else if (method === 'whatsapp') {
      const text = encodeURIComponent(getFormattedMessage());
      window.open(`https://wa.me/${contactPhone}?text=${text}`, '_blank');
    }
    
    setSubmitted(true);
  };
  
  const handleReset = () => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setSubmitted(false);
  };

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        handleReset();
      }, 300); // Wait for closing animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      aria-labelledby="contact-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {submitted ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-gray-300">Your message is ready to be sent.</p>
            <p className="text-gray-400 text-sm mt-2">Please complete the action in your email client or WhatsApp.</p>
            <button
                onClick={handleReset}
                className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-all"
            >
                Send Another Message
            </button>
          </div>
        ) : (
          <>
            <h2 id="contact-modal-title" className="text-2xl font-bold mb-2 text-white">Contact Sales</h2>
            <p className="text-gray-400 mb-6">Have questions about our platform or enterprise plans? Fill out the form below.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">Full Name <span className="text-red-400">*</span></label>
                <input type="text" name="name" id="contact-name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">Email Address <span className="text-red-400">*</span></label>
                <input type="email" name="email" id="contact-email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input type="text" name="company" id="contact-company" value={formData.company} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">Message <span className="text-red-400">*</span></label>
                <textarea name="message" id="contact-message" rows={4} value={formData.message} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="button" onClick={(e) => handleSubmit(e, 'email')} className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                  Send via Email
                </button>
                <button type="button" onClick={(e) => handleSubmit(e, 'whatsapp')} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </>
        )}
        
        <style>{`
          @keyframes scale-in { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
};

export default ContactModal;