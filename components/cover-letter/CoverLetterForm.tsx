'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { FormData } from '@/types/cover-letter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  companyName: z.string().optional(),
  roleTitle: z.string().optional(),
  hiringManagerName: z.string().optional(),
  companyAddress: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface CoverLetterFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
}

export default function CoverLetterForm({
  initialData,
  onSubmit,
}: CoverLetterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: initialData.companyName,
      roleTitle: initialData.roleTitle,
      hiringManagerName: initialData.hiringManagerName || '',
      companyAddress: initialData.companyAddress || '',
      date: initialData.date,
    },
  });

  const onFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      companyName: data.companyName || 'Google',
      roleTitle: data.roleTitle || 'Software Engineer',
      hiringManagerName: data.hiringManagerName || undefined,
      companyAddress: data.companyAddress || undefined,
    });
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-slate-800">
          Cover Letter Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="companyName" className="text-base">
                Company Name
              </Label>
              <Input
                id="companyName"
                placeholder="e.g. Google"
                className="h-11 text-base"
                {...register('companyName')}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="roleTitle" className="text-base">
                Role Title
              </Label>
              <Input
                id="roleTitle"
                placeholder="e.g. Senior Software Engineer"
                className="h-11 text-base"
                {...register('roleTitle')}
              />
              {errors.roleTitle && (
                <p className="text-sm text-red-500">
                  {errors.roleTitle.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="hiringManagerName" className="text-base">
              Hiring Manager Name
            </Label>
            <Input
              id="hiringManagerName"
              placeholder="e.g. John Doe (Optional)"
              className="h-11 text-base"
              {...register('hiringManagerName')}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="companyAddress" className="text-base">
              Company Address
            </Label>
            <Textarea
              id="companyAddress"
              placeholder="e.g. 1600 Amphitheatre Parkway, Mountain View, CA (Optional)"
              className="min-h-[120px] text-base"
              {...register('companyAddress')}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="date" className="text-base">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              className="h-11 text-base"
              {...register('date')}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="mt-4 w-full text-base">
            Generate Preview
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
