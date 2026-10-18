import { z } from 'zod';

export const BaseSchema = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
  cta: z.string().optional(),
  accentColor: z.string().optional(),
  bgColor: z.string().optional(),
});

export const IntroPropsSchema = BaseSchema.extend({
  title: z.string(),
  subtitle: z.string().optional(),
  accentColor: z.string().default('#FF6B6B'),
  bgColor: z.string().default('#000000'),
  animation: z.enum([
    'fadeIn', 'slideLeft', 'slideRight', 'slideUp', 'slideDown', 'scaleIn', 'none',
  ]).default('fadeIn'),
});

export const LowerThirdPropsSchema = BaseSchema.extend({
  name: z.string(),
  role: z.string().optional(),
  accentColor: z.string().default('#FF6B6B'),
  position: z.enum(['bottom-left', 'bottom-center', 'bottom-right']).default('bottom-center'),
});

export const EndScreenPropsSchema = BaseSchema.extend({
  title: z.string(),
  cta: z.string(),
  accentColor: z.string().optional(),
});

export type BaseProps = z.infer<typeof BaseSchema>;
export type IntroProps = z.infer<typeof IntroPropsSchema>;
export type LowerThirdProps = z.infer<typeof LowerThirdPropsSchema>;
export type EndScreenProps = z.infer<typeof EndScreenPropsSchema>;

export const AudioTrackSchema = z.object({
  id: z.string().optional(),
  src: z.string(),
  startAtFrame: z.number().optional(),
  volume: z.number().optional(),
});

export type AudioTrackItem = z.infer<typeof AudioTrackSchema>;
