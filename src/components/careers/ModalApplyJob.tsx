import React, { useState } from 'react';

interface Props {
  jobTitle: string;
  onClose: () => void;
  language: string;
}

export default function ModalApplyJob({ jobTitle, onClose, language }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await new Promise((r) => setTimeout(r, 1500));
      
      const applications = JSON.parse(localStorage.getItem('job_applications') || '[]');
      applications.push({
        id: '_' + Math.random().toString(36).substr(2, 9),
        jobTitle,
        name,
        email,
        phone,
        portfolio,
        coverLetter,
        fileName: fileName || 'CV_Submitted.pdf',
        timestamp: new Date().toISOString(),
        status: 'Applied'
      });
      localStorage.setItem('job_applications', JSON.stringify(applications));
      setIsSubmitted(true);
    } catch {
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate__animated animate__zoomIn animate__faster">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest block mb-1">
              {language === 'ar' ? 'طلب وظيفة' : language === 'fr' ? 'Candidature' : language === 'de' ? 'Bewerbung' : 'Application'}
            </span>
            <h2 className="text-xl font-heading font-bold text-brand-dark">
              {jobTitle === 'Talent Pool' 
                ? (language === 'ar' ? 'انضم إلى تجمع المواهب' : language === 'fr' ? 'Rejoindre le vivier' : 'Join Talent Pool')
                : `${language === 'ar' ? 'التقدم لوظيفة' : language === 'fr' ? 'Postuler pour' : 'Apply for'} ${jobTitle}`
              }
            </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8">
          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate__animated animate__fadeIn">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/20">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-dark">
                {language === 'ar' ? 'تم تقديم الطلب بنجاح!' : language === 'fr' ? 'Candidature soumise !' : 'Application Submitted!'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'ar' ? `شكرًا لك ${name}، لقد استلمنا طلبك بنجاح.` : 
                 language === 'fr' ? `Merci ${name}, nous avons bien reçu votre candidature.` :
                 `Thank you, ${name}. Your application details have been successfully received for this role.`}
              </p>
              <div className="bg-white p-4 rounded-xl border border-emerald-100 text-left text-xs space-y-2 max-w-md mx-auto">
                <p className="text-gray-400 font-bold uppercase tracking-wider">Application Summary:</p>
                <p><span className="font-semibold text-gray-500">Position:</span> {jobTitle}</p>
                <p><span className="font-semibold text-gray-500">Full Name:</span> {name}</p>
                <p><span className="font-semibold text-gray-500">Email:</span> {email}</p>
                <p><span className="font-semibold text-gray-500">Resume:</span> {fileName || 'Uploaded'}</p>
              </div>
              <p className="text-xs text-gray-500 italic pt-2">
                {language === 'ar' ? 'سيقوم فريق الموارد البشرية بمراجعة طلبك والتواصل معك قريبًا.' : 
                 language === 'fr' ? 'Notre équipe RH examinera votre profil et vous contactera prochainement.' :
                 "Our recruiting team will review your application and get in touch if your background aligns."}
              </p>
              <button 
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-accent transition-colors"
              >
                {language === 'ar' ? 'إغلاق' : language === 'fr' ? 'Fermer' : 'Close Window'}
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Full Name *</label>
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
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Email Address *</label>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Phone Number *</label>
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
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">LinkedIn / Portfolio URL</label>
                  <input 
                    type="url" 
                    disabled={isSubmitting}
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://linkedin.com/in/username" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-accent transition-all text-sm disabled:opacity-50" 
                  />
                </div>
              </div>

              {/* Simulated CV Upload */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Upload CV/Resume *</label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 text-center hover:border-brand-accent transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <input 
                    type="file" 
                    required 
                    disabled={isSubmitting}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-2xl mb-2"></i>
                  <p className="text-xs text-gray-500 font-semibold">
                    {fileName ? `Selected: ${fileName}` : 'Drag & drop or click to upload PDF/Word document'}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-1">Supported formats: PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Cover Letter / Additional Information</label>
                <textarea 
                  rows={4}
                  disabled={isSubmitting}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us why you are a great fit for this position..." 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-accent transition-all text-sm disabled:opacity-50 resize-none" 
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-xs font-semibold ml-2">{submitError}</p>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>Submitting Application <i className="fas fa-spinner fa-spin"></i></>
                ) : (
                  <>Submit Application <i className="fas fa-paper-plane"></i></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
