import { useState } from 'react';
import { CheckCircle, AlertCircle, Mail } from 'lucide-react';

interface HubspotFormProps {
  onClose?: () => void;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export function HubspotForm({ onClose }: HubspotFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const contextMessage = `I'm interested in staying updated with BuilderZ News.
Current page: ${document.title}
User email: ${email}`;

      const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47155561/a6efc3de-4530-412e-8802-25594a1a8c95', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: [
            {
              name: "email",
              value: email
            },
            {
              name: "message",
              value: contextMessage
            }
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
            hutk: document.cookie.match(/hubspotutk=(.*?);/)?.[1]
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
    } catch (error) {
      console.error('Failed to submit form:', error);
      setStatus('error');
      // Fallback to mailto
      const mailtoBody = `Hi BuilderZ News team,

I'm interested in staying updated with your platform.

Best regards,
${email}`;

      window.open(`mailto:info@builderzai.com?subject=Newsletter%20Subscription&body=${encodeURIComponent(mailtoBody)}`, '_blank');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Thank You!</h2>
            <p className="text-white/70 mb-6">
              We'll keep you updated with the latest VC funding news.
            </p>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Oops!</h2>
            <p className="text-white/70 mb-6">
              Something went wrong. Please try again or use the email option.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
            >
              Try Again
            </button>
          </>
        );
      default:
        return (
          <>
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Stay Updated</h2>
            <p className="text-white/70 mb-6">
              Get the latest VC funding news delivered to your inbox.
            </p>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-white/40"
              />
            </div>
            <button 
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center"
            >
              {status === 'sending' ? 'Sending...' : 'Subscribe'}
            </button>
          </>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-background/95 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4 text-center border border-white/10">
        {renderContent()}
      </div>
    </div>
  );
} 