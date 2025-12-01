'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface CoverLetterFormProps {
  fields: string[];
  onSubmit: (data: Record<string, string>) => void;
}

export default function CoverLetterForm({
  fields,
  onSubmit,
}: CoverLetterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, string>>();

  const onFormSubmit = (data: Record<string, string>) => {
    onSubmit(data);
  };

  return (
    <Card className="border-none bg-white shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-slate-800">
          Fill in Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field} className="space-y-3">
                <Label htmlFor={field} className="text-base capitalize text-slate-700">
                  {field}
                </Label>
                {field.toLowerCase().includes('address') || field.toLowerCase().includes('description') ? (
                   <Textarea
                    id={field}
                    placeholder={`Enter ${field} (Optional)`}
                    className="min-h-[100px] bg-white text-base text-slate-900"
                    {...register(field)}
                  />
                ) : (
                  <Input
                    id={field}
                    placeholder={`Enter ${field} (Optional)`}
                    className="h-11 bg-white text-base text-slate-900"
                    {...register(field)}
                  />
                )}
              </div>
            ))}
          </div>

          <Button type="submit" size="lg" className="mt-4 w-full text-base">
            Generate Preview
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
