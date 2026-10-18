import { z } from 'zod';
import {
  IntroPropsSchema,
  LowerThirdPropsSchema,
  EndScreenPropsSchema,
  type IntroProps,
  type LowerThirdProps,
  type EndScreenProps,
} from '../schemas/templates';

export type ValidationResult<T = unknown> = {
  valid: boolean;
  data?: T;
  errors?: string[];
};

export function validateProps(templateId: string, props: unknown): ValidationResult {
  try {
    let schema: z.ZodSchema<any>;
    
    if (templateId.startsWith('intro')) {
      schema = IntroPropsSchema;
    } else if (templateId.includes('lower')) {
      schema = LowerThirdPropsSchema;
    } else if (templateId.includes('end')) {
      schema = EndScreenPropsSchema;
    } else {
      return { valid: false, errors: ['Unknown template type'] };
    }
    
    const data = schema.parse(props);
    return { valid: true, data };
  } catch (e: any) {
    return {
      valid: false,
      errors: e.errors?.map((err: any) => err.message) || [e.message || 'Validation failed']
    };
  }
}

export function getDefaultProps(templateId: string): Record<string, unknown> {
  switch (templateId) {
    case 'intro-default':
    case 'intro-minimal':
    case 'intro-bold':
      return IntroPropsSchema.parse({ id: templateId, title: 'Welcome' });
    case 'lower-third':
      return LowerThirdPropsSchema.parse({ id: templateId, name: 'John Doe' });
    case 'end-screen':
      return EndScreenPropsSchema.parse({ id: templateId, title: 'Subscribe', cta: 'Click here' });
    default:
      return {};
  }
}
