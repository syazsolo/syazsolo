'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/utils';

type ContactType = 'email' | 'phone';

const createSchema = () => {
  return z
    .object({
      name: z.string().min(1, 'Name is required'),
      contactValue: z.string(),
      message: z.string().optional(),
      contactType: z.enum(['email', 'phone']),
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
    });
};

type FormData = z.infer<ReturnType<typeof createSchema>>;

export default function ContactForm() {
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
    },
  });

  useEffect(() => {
    setValue('contactType', contactType, { shouldValidate: true });
  }, [contactType, setValue]);

  const contactValueRegister = register('contactValue');
  const {
    name: contactValueName,
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
      // Build form data as a plain object for proper encoding
      const formBody: Record<string, string> = {
        'form-name': 'contact',
        'contact-type': contactType,
        name: data.name,
        'contact-value': data.contactValue,
        message: data.message || '',
        'bot-field': '',
      };

      // Debug: log the form data being sent
      const bodyString = new URLSearchParams(formBody).toString();
      console.log('Submitting to Netlify:', bodyString);
      console.log('Current URL:', window.location.href);

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyString,
      });

      // Debug: log full response details
      console.log('Response status:', response.status, response.statusText);
      console.log('Response URL:', response.url);
      const responseText = await response.text();
      console.log(
        'Response body (first 500 chars):',
        responseText.substring(0, 500)
      );

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        throw new Error(`Submission failed: ${response.status}`);
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
          Message Sent!
        </h3>
        <p className="text-muted-foreground text-sm">
          Thanks for reaching out. I'll get back to you soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form
        name="contact"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Hidden Netlify fields */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        <input type="hidden" {...register('contactType')} name="contact-type" />

        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-foreground mb-1 block text-sm font-medium"
          >
            Name
          </label>
          <Input
            id="contact-name"
            type="text"
            placeholder="Lando"
            className={cn('bg-background', errors.name && 'border-destructive')}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-sm duration-200">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Contact Field */}
        <div className="space-y-2">
          <div className="mb-1 flex items-baseline justify-between">
            <label
              htmlFor="contact-value"
              className="text-foreground text-sm font-medium"
            >
              {contactType === 'email' ? 'Email' : 'Phone'}
            </label>
            <button
              type="button"
              onClick={toggleContactType}
              className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
            >
              or use {contactType === 'email' ? 'phone' : 'email'}
            </button>
          </div>
          <Input
            id="contact-value"
            name={contactValueName}
            type={contactType === 'email' ? 'email' : 'tel'}
            placeholder={
              contactType === 'email'
                ? 'lando@admin.cloudcity'
                : '12-345-6789-CC'
            }
            className={cn(
              'bg-background',
              errors.contactValue && 'border-destructive'
            )}
            onChange={contactValueOnChange}
            onBlur={contactValueOnBlur}
            ref={contactValueRef}
          />
          {errors.contactValue && (
            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-sm duration-200">
              {errors.contactValue.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="contact-message"
            className="text-foreground mb-1 block text-sm font-medium"
          >
            Message (optional)
          </label>
          <Textarea
            id="contact-message"
            placeholder="how's my falcon doing buddy?"
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
            'Send'
          )}
        </Button>
      </form>
    </div>
  );
}
