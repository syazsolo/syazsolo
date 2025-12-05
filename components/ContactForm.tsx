'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare, Handshake, Send, ArrowRightLeft, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/utils';

type FormMode = 'standard' | 'simple';
type ContactType = 'email' | 'phone';

interface FormData {
  name: string;
  contactValue: string;
  message: string;
}

const ContactForm = () => {
  const [mode, setMode] = useState<FormMode>('standard');
  const [contactType, setContactType] = useState<ContactType>('email');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactValue: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const toggleContactType = () => {
    setContactType(prev => (prev === 'email' ? 'phone' : 'email'));
    setFormData(prev => ({ ...prev, contactValue: '' }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Please let me know how to address you');
      return false;
    }
    if (!formData.contactValue.trim()) {
      setError(`Please enter your ${contactType}`);
      return false;
    }
    if (contactType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactValue)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    if (mode === 'standard' && !formData.message.trim()) {
      setError("What's on your mind?");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('form-name', 'contact');
      formDataToSend.append('mode', mode);
      formDataToSend.append('contact-type', contactType);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('contact-value', formData.contactValue);
      if (mode === 'standard') {
        formDataToSend.append('message', formData.message);
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', contactValue: '', message: '' });
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <CheckCircle className="relative h-16 w-16 text-primary mb-4" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {mode === 'standard' ? 'Message Sent!' : "I'll reach out soon!"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {mode === 'standard' 
            ? "Thanks for reaching out. I'll get back to you soon!" 
            : "Thanks for connecting. Expect to hear from me shortly!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="relative flex rounded-full bg-muted p-1">
        {/* Sliding background */}
        <div
          className={cn(
            "absolute top-1 bottom-1 rounded-full bg-primary shadow-lg transition-all duration-300 ease-out",
            mode === 'standard' ? 'left-1 right-1/2' : 'left-1/2 right-1'
          )}
          style={{ width: 'calc(50% - 4px)' }}
        />
        
        <button
          type="button"
          onClick={() => setMode('standard')}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-sm font-medium transition-colors duration-200",
            mode === 'standard' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Send a Message</span>
          <span className="sm:hidden">Message</span>
        </button>
        
        <button
          type="button"
          onClick={() => setMode('simple')}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-sm font-medium transition-colors duration-200",
            mode === 'simple' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Handshake className="h-4 w-4" />
          <span className="hidden sm:inline">Just Reach Out</span>
          <span className="sm:hidden">Connect</span>
        </button>
      </div>

      {/* Mode Description */}
      <p className="text-xs text-muted-foreground text-center animate-in fade-in duration-200">
        {mode === 'standard' 
          ? "Send me a message and I'll respond as soon as I can" 
          : "Leave your contact info and I'll reach out to you"}
      </p>

      {/* Form */}
      <form
        ref={formRef}
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Hidden Netlify fields */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="contact-type" value={contactType} />

        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
            How should I address you?
          </label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder="e.g., John, Ms. Smith..."
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="bg-background"
          />
        </div>

        {/* Contact Field with Toggle */}
        <div className="space-y-2">
          <label htmlFor="contact-value" className="text-sm font-medium text-foreground">
            {contactType === 'email' ? 'Your email' : 'Your phone number'}
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-muted-foreground pointer-events-none">
              {contactType === 'email' ? (
                <Mail className="h-4 w-4" />
              ) : (
                <Phone className="h-4 w-4" />
              )}
            </div>
            <Input
              id="contact-value"
              name="contact-value"
              type={contactType === 'email' ? 'email' : 'tel'}
              placeholder={contactType === 'email' ? 'hello@example.com' : '+60 12-345 6789'}
              value={formData.contactValue}
              onChange={(e) => handleInputChange('contactValue', e.target.value)}
              className="bg-background pl-10 pr-12"
            />
            <button
              type="button"
              onClick={toggleContactType}
              className={cn(
                "absolute right-1.5 flex items-center justify-center h-7 w-9 rounded-md",
                "bg-muted hover:bg-accent text-muted-foreground hover:text-foreground",
                "transition-all duration-200 hover:scale-105 active:scale-95"
              )}
              title={`Switch to ${contactType === 'email' ? 'phone' : 'email'}`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {contactType === 'email' 
              ? 'Tap the arrow to use phone instead' 
              : 'Tap the arrow to use email instead'}
          </p>
        </div>

        {/* Message Field (Standard mode only) */}
        {mode === 'standard' && (
          <div className="space-y-2 animate-in slide-in-from-top-2 fade-in duration-300">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              What's on your mind?
            </label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="I'd love to discuss..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="bg-background min-h-[100px] resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive text-center animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full gap-2 transition-all duration-300",
            isSubmitting && "opacity-80"
          )}
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : mode === 'standard' ? (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Let's Connect
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
