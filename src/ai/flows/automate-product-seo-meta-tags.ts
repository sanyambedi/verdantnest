
'use server';
/**
 * @fileOverview A Genkit flow for generating SEO-optimized meta tags and ALT text for plant products.
 *
 * - automateProductSeoMetaTags - A function that generates SEO meta title, description, and image ALT text.
 * - AutomateProductSeoMetaTagsInput - The input type for the automateProductSeoMetaTags function.
 * - AutomateProductSeoMetaTagsOutput - The return type for the automateProductSeoMetaTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateProductSeoMetaTagsInputSchema = z.object({
  productName: z.string().describe('The name of the plant product.'),
  productDescription:
    z.string().describe(
      'A detailed description of the plant product, including its characteristics, care instructions, and benefits.'
    ),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the plant product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Used for generating ALT text if provided."
    ),
});
export type AutomateProductSeoMetaTagsInput = z.infer<
  typeof AutomateProductSeoMetaTagsInputSchema
>;

const AutomateProductSeoMetaTagsOutputSchema = z.object({
  metaTitle:
    z.string().describe(
      'An SEO-optimized meta title for the plant product page, max 60 characters.'
    ),
  metaDescription:
    z.string().describe(
      'An SEO-optimized meta description for the plant product page, max 160 characters, compelling users to click.'
    ),
  altText:
    z.string().describe(
      'Descriptive ALT text for the plant product image, focusing on accessibility and keywords. If no image is provided, provide a generic descriptive alt text based on the product name and description.'
    ),
});
export type AutomateProductSeoMetaTagsOutput = z.infer<
  typeof AutomateProductSeoMetaTagsOutputSchema
>;

function fallbackAutomateProductSeoMetaTags(input: AutomateProductSeoMetaTagsInput): AutomateProductSeoMetaTagsOutput {
  const name = input.productName || 'Botanical Specimen';
  return {
    metaTitle: `${name} | Premium Indoor Plants | VerdantNest`,
    metaDescription: `Shop nursery-conditioned ${name} at VerdantNest. Includes expert care guide, free shipping, and nursery-fresh guarantee on all specimens.`,
    altText: `Mature ${name} in a minimalist ceramic pot showcasing lush green botanical foliage`
  };
}

export async function automateProductSeoMetaTags(
  input: AutomateProductSeoMetaTagsInput
): Promise<AutomateProductSeoMetaTagsOutput> {
  try {
    return await automateProductSeoMetaTagsFlow(input);
  } catch (error) {
    console.warn("Genkit meta tags flow unavailable, using fallback generator:", error);
    return fallbackAutomateProductSeoMetaTags(input);
  }
}

const prompt = ai.definePrompt({
  name: 'automateProductSeoMetaTagsPrompt',
  input: {schema: AutomateProductSeoMetaTagsInputSchema},
  output: {schema: AutomateProductSeoMetaTagsOutputSchema},
  prompt: `You are an expert SEO specialist and botanical copywriter for an online plant store called VerdantNest. Your task is to generate highly optimized meta titles, meta descriptions, and image ALT text for plant product pages.\n\nFocus on:\n- Maximizing search engine discoverability.\n- Attracting clicks from search results.\n- Ensuring accessibility for screen readers via descriptive ALT text.\n- Using relevant keywords naturally.\n\nProduct Name: {{{productName}}}\nProduct Description: {{{productDescription}}}\n\n{{#if imageDataUri}}\nPhoto for ALT text generation: {{media url=imageDataUri}}\n{{/if}}\n\nInstructions:\n1.  **Meta Title:** Create a compelling and keyword-rich meta title (maximum 60 characters). It should accurately describe the plant and encourage clicks. Include "VerdantNest" if appropriate.\n2.  **Meta Description:** Write an engaging meta description (maximum 160 characters) that summarizes the plant, highlights its benefits, and includes a clear call to action or unique selling proposition.\n3.  **ALT Text:** Generate a detailed and descriptive ALT text for the product image. Describe the plant and its key visual features. If no image is provided, generate descriptive alt text based on the product name and description.\n\nProvide your output in JSON format, exactly matching the schema.`,
});

const automateProductSeoMetaTagsFlow = ai.defineFlow(
  {
    name: 'automateProductSeoMetaTagsFlow',
    inputSchema: AutomateProductSeoMetaTagsInputSchema,
    outputSchema: AutomateProductSeoMetaTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate SEO meta tags and alt text.');
    }
    return output;
  }
);

