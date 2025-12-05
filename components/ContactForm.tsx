'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  Send,
  ArrowRightLeft,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/utils';
import FormModeToggle, { type FormMode } from '@/components/FormModeToggle';

type ContactType = 'email' | 'phone';

const createSchema = () => {
  return z
    .object({
      name: z.string().min(1, 'Please let me know how to address you'),
      contactValue: z.string(),
      message: z.string(),
      contactType: z.enum(['email', 'phone']),
      mode: z.enum(['standard', 'simple']),
    })
    .superRefine((data, ctx) => {
      if (!data.contactValue.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please enter your ${data.contactType}`,
          path: ['contactValue'],
        });
      } else if (data.contactType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contactValue)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid email address',
            path: ['contactValue'],
          });
        }
      }
      if (data.mode === 'standard' && !data.message.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "What's on your mind?",
          path: ['message'],
        });
      }
    });
};

type FormData = z.infer<ReturnType<typeof createSchema>>;

const ContactForm = () => {
  const [mode, setMode] = useState<FormMode>('standard');
  const [contactType, setContactType] = useState<ContactType>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const schema = useMemo(() => createSchema(), []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      contactValue: '',
      message: '',
      contactType: 'email',
      mode: 'standard',
    },
  });

  useEffect(() => {
    setValue('contactType', contactType, { shouldValidate: true });
  }, [contactType, setValue]);

  useEffect(() => {
    setValue('mode', mode, { shouldValidate: true });
  }, [mode, setValue]);

  const contactValueRegister = register('contactValue');
  const {
    onChange: contactValueOnChange,
    onBlur: contactValueOnBlur,
    ref: contactValueRef,
  } = contactValueRegister;

  const toggleContactType = () => {
    const newType = contactType === 'email' ? 'phone' : 'email';
    setContactType(newType);
    setValue('contactValue', '');
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('form-name', 'contact');
      formDataToSend.append('mode', mode);
      formDataToSend.append('contact-type', contactType);
      formDataToSend.append('name', data.name);
      formDataToSend.append('contact-value', data.contactValue);
      if (mode === 'standard') {
        formDataToSend.append('message', data.message);
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          formDataToSend as unknown as Record<string, string>
        ).toString(),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      // Error handling is done per-field via react-hook-form
      // For submission errors, we can use setError on root if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center py-8 text-center duration-300">
        <div className="relative">
          <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-xl" />
          <CheckCircle className="text-primary relative mb-4 h-16 w-16" />
        </div>
        <h3 className="text-foreground mb-2 text-lg font-semibold">
          {mode === 'standard' ? 'Message Sent!' : "I'll reach out soon!"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {mode === 'standard'
            ? "Thanks for reaching out. I'll get back to you soon!"
            : 'Thanks for connecting. Expect to hear from me shortly!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormModeToggle mode={mode} onModeChange={setMode} />

      {/* Form */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Hidden Netlify fields */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" {...register('mode')} />
        <input type="hidden" {...register('contactType')} name="contact-type" />

        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-foreground mb-1 block text-sm font-medium"
          >
            How should I address you?
          </label>
          <Input
            id="contact-name"
            type="text"
            placeholder="e.g., John, Ms. Smith..."
            className={cn('bg-background', errors.name && 'border-destructive')}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-sm duration-200">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Contact Field with Toggle */}
        <div className="space-y-2">
          <label
            htmlFor="contact-value"
            className="text-foreground mb-1 block text-sm font-medium"
          >
            {contactType === 'email' ? 'Your email' : 'Your phone number'}
          </label>
          <div className="relative mb-0.5 flex items-center">
            <div className="text-muted-foreground pointer-events-none absolute left-3">
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
              placeholder={
                contactType === 'email'
                  ? 'hello@example.com'
                  : '+60 12-345 6789'
              }
              className={cn(
                'bg-background pr-12 pl-10',
                errors.contactValue && 'border-destructive'
              )}
              onChange={contactValueOnChange}
              onBlur={contactValueOnBlur}
              ref={contactValueRef}
            />
            <button
              type="button"
              onClick={toggleContactType}
              className={cn(
                'absolute right-1.5 flex h-7 w-9 cursor-pointer items-center justify-center rounded-md',
                'bg-muted hover:bg-accent text-muted-foreground hover:text-foreground',
                'transition-all duration-200 hover:scale-105 active:scale-95'
              )}
              title={`Switch to ${contactType === 'email' ? 'phone' : 'email'}`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
            </button>
          </div>
          {errors.contactValue ? (
            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-sm duration-200">
              {errors.contactValue.message}
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">
              {contactType === 'email'
                ? 'Tap the arrow to use phone instead'
                : 'Tap the arrow to use email instead'}
            </p>
          )}
        </div>

        {/* Message Field (Standard mode only) */}
        {mode === 'standard' && (
          <div className="animate-in slide-in-from-top-2 fade-in space-y-2 duration-300">
            <label
              htmlFor="contact-message"
              className="text-foreground mb-1 block text-sm font-medium"
            >
              What&apos;s on your mind?
            </label>
            <Textarea
              id="contact-message"
              placeholder="I'd love to discuss..."
              className={cn(
                'bg-background min-h-[100px] resize-none',
                errors.message && 'border-destructive'
              )}
              rows={4}
              {...register('message')}
            />
            {errors.message && (
              <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-sm duration-200">
                {errors.message.message}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full gap-2 transition-all duration-300',
            isSubmitting && 'opacity-80'
          )}
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {mode === 'standard' ? 'Send Message' : "Let's Connect"}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
