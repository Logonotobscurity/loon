import React, { useState } from 'react';
import ResponsiveModal from '../Global/ResponsiveModal';
import CTAButton from '../Global/CTAButton';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const AssessmentValidation = z.object({
  fullName: z.string().min(1, { message: 'Full Name is required' }),
  businessEmail: z.string().email({ message: 'Invalid email address' }),
  companyName: z.string().min(1, { message: 'Company Name is required' }),
  businessGoals: z.string().min(1, { message: 'Business Goals are required' }),
  currentChallenges: z
    .string()
    .min(1, { message: 'Current Challenges are required' }),
});

type AssessmentFormData = z.infer<typeof AssessmentValidation>;

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(AssessmentValidation),
    defaultValues: {
      fullName: '',
      businessEmail: '',
      companyName: '',
      businessGoals: '',
      currentChallenges: '',
    },
  });

  const onSubmit = (values: AssessmentFormData) => {
    console.log('Assessment form submitted:', values);
    // Here you would typically send the data to your backend or an external service
    onClose(); // Close the modal after submission
  };

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} title="Business Assessment">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your business email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Goals</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your business goals" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentChallenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Challenges</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your current challenges" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <CTAButton type="submit">Submit Assessment</CTAButton>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};

export default AssessmentModal;