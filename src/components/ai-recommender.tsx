'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wand2, Sparkles, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getAiRecommendations } from '@/app/actions';
import type { RecommendContentOutput } from '@/ai/flows/ai-recommend-content';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Separator } from './ui/separator';

const formSchema = z.object({
  interests: z.string().min(10, {
    message: 'Please tell us a bit more about your interests (at least 10 characters).',
  }),
});

type AiRecommenderProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AiRecommender({ open, onOpenChange }: AiRecommenderProps) {
  const [recommendation, setRecommendation] = React.useState<RecommendContentOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: '',
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setRecommendation(null);
    const result = await getAiRecommendations(values.interests);
    if (result.success && result.data) {
      setRecommendation(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
  }
  
  React.useEffect(() => {
    if (!open) {
      form.reset();
      setRecommendation(null);
      setError(null);
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-accent" />
            AI Content Recommender
          </DialogTitle>
          <DialogDescription>
            Tell us what you're interested in, and our AI will suggest some content just for you.
          </DialogDescription>
        </DialogHeader>
        
        {!isSubmitSuccessful || !recommendation ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I'm a frontend developer interested in React, design systems, and productivity hacks.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : null}

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {isSubmitSuccessful && recommendation && (
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Here are your recommendations:</h3>
                    <div className="p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap font-mono">
                        {recommendation.recommendedContent}
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold text-lg mb-2">Reasoning:</h3>
                    <p className="text-sm text-muted-foreground italic">
                        {recommendation.reasoning}
                    </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    form.reset();
                    setRecommendation(null);
                    setError(null);
                  }}>
                    Start Over
                  </Button>
                </DialogFooter>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
