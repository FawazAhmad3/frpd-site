import { useState } from 'react';

interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  price: string;
  duration?: string;
  level?: string;
  image?: string;
}

interface Props {
  item: CourseItem | null;
  onClose: () => void;
}

export default function ModalCourse({ item, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const registrations = JSON.parse(localStorage.getItem('bootcamp_registrations') || '[]');
      registrations.push({
        id: '_' + Math.random().toString(36).substr(2, 9),
        courseId: item.id,
        courseTitle: item.title,
        name,
        email,
        phone,
        timestamp: new Date().toISOString(),
        status: 'Pending Verification'
      });
      localStorage.setItem('bootcamp_registrations', JSON.stringify(registrations));
      setIsSubmitted(true);
    } catch {
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex-grow overflow-y-auto">
          {/* Header Image */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img src={item.image || '/assets/images/sample1.jpg'} alt="Course" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 bg-brand-accent/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded mb-2">{item.level || 'Executive'}</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">{item.title}</h2>
            </div>
            <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-heading font-bold text-brand-dark mb-4 flex items-center">
                    <i className="fas fa-info-circle mr-3 text-brand-accent"></i> Course Overview
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.title} by {item.instructor}. Duration: {item.duration || 'Self-paced'}
                  </p>
                </div>

                {/* Curriculum */}
                <div>
                  <h3 className="text-xl font-heading font-bold text-brand-dark mb-4 flex items-center">
                    <i className="fas fa-list-check mr-3 text-brand-accent"></i> Curriculum
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-gray-500 text-sm">Course modules will be shared upon enrollment</li>
                  </ul>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Payment */}
                <div className="bg-blue-50 p-6 md:p-8 rounded-2xl border border-blue-100 flex flex-col justify-center">
                  <h3 className="text-xl font-heading font-bold text-brand-dark mb-2">Easypaisa Payment</h3>
                  <p className="text-xs text-gray-500 mb-6">Complete your payment and submit the form below. We will verify and provide Google Drive access via email.</p>

                  <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Account Number</span>
                      <span className="text-lg font-bold text-brand-accent">0344 9198158</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Account Name</span>
                      <span className="text-sm font-bold text-brand-dark italic">FRPD Training</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4 p-4 bg-brand-accent/5 rounded-xl border border-brand-accent/10">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-brand-accent text-xl shadow-sm">
                      <i className="fas fa-money-bill-transfer"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Total Amount</p>
                      <p className="text-xl font-bold text-brand-dark">{item.price} PKR</p>
                    </div>
                  </div>
                </div>

                {/* Enrollment Form */}
                <div className="flex flex-col justify-center">
                  {isSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-5 animate__animated animate__fadeIn">
                      <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/20">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-brand-dark">Request Submitted!</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Thank you, <strong className="text-brand-dark">{name}</strong>. Your enrollment request for <strong className="text-brand-dark">{item.title}</strong> has been successfully received.
                      </p>
                      <div className="bg-white p-5 rounded-2xl border border-emerald-100 text-left text-xs space-y-2">
                        <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Registration Details</p>
                        <p><span className="font-semibold text-gray-500">Email:</span> {email}</p>
                        <p><span className="font-semibold text-gray-500">Phone:</span> {phone}</p>
                        <p><span className="font-semibold text-gray-500">Payment Status:</span> Pending Verification (24-48 Hours)</p>
                      </div>
                      <p className="text-[10px] text-gray-500 italic leading-relaxed">
                        A confirmation email has been dispatched to {email}. Please check your inbox (and spam folder) for further instructions.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-heading font-bold text-brand-dark mb-6">Complete Enrollment</h3>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            disabled={isSubmitting}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Fawaz Ahmad" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-accent transition-all text-sm disabled:opacity-50" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Email Address</label>
                          <input 
                            type="email" 
                            required 
                            disabled={isSubmitting}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="fawaz@example.com" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-accent transition-all text-sm disabled:opacity-50" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Phone / WhatsApp</label>
                          <input 
                            type="tel" 
                            required 
                            disabled={isSubmitting}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="03XXXXXXXXX" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-accent transition-all text-sm disabled:opacity-50" 
                          />
                        </div>
                        {submitError && (
                          <p className="text-red-500 text-xs font-semibold ml-2">{submitError}</p>
                        )}
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full mt-4 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                          {isSubmitting ? (
                            <>Submitting Request <i className="fas fa-spinner fa-spin"></i></>
                          ) : (
                            <>Submit Registration Request <i className="fas fa-paper-plane"></i></>
                          )}
                        </button>
                        <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest font-bold">Manual Verification Required (24-48 Hours)</p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
