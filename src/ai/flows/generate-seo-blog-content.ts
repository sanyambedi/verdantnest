
'use server';
/**
 * @fileOverview A Genkit flow for generating keyword-rich botanical care guides and blog articles.
 *
 * - generateSeoBlogContent - A function that handles the content generation process.
 * - GenerateSeoBlogContentInput - The input type for the generateSeoBlogContent function.
 * - GenerateSeoBlogContentOutput - The return type for the generateSeoBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoBlogContentInputSchema = z.object({
  topic: z.string().describe('The main topic for the botanical care guide or blog article.'),
  keywords: z.array(z.string()).optional().describe('An optional list of keywords to incorporate into the content.'),
  length: z.enum(['short', 'medium', 'long']).default('medium').describe('The desired length of the generated content.'),
  tone: z.string().default('informative').describe('The desired tone of the content, e.g., "informative", "friendly", "expert".'),
});
export type GenerateSeoBlogContentInput = z.infer<typeof GenerateSeoBlogContentInputSchema>;

const GenerateSeoBlogContentOutputSchema = z.object({
  title: z.string().describe('The SEO-optimized title for the blog post or guide.'),
  content: z.string().describe('The full body content of the botanical care guide or blog article.'),
  suggestedTags: z.array(z.string()).describe('A list of suggested SEO tags for the content.'),
});
export type GenerateSeoBlogContentOutput = z.infer<typeof GenerateSeoBlogContentOutputSchema>;

function fallbackGenerateSeoBlogContent(input: GenerateSeoBlogContentInput): GenerateSeoBlogContentOutput {
  const t = input.topic || 'Botanical Houseplant Care Guide';
  const kw = input.keywords && input.keywords.length > 0 
    ? input.keywords 
    : ['indoor plants', 'care tips', 'watering guide', 'botanical sanctuary'];

  return {
    title: `The Ultimate Guide to ${t}: Expert Tips & Conditioning Advice`,
    content: `Cultivating healthy, vibrant botanicals requires an understanding of natural habitat conditions. When caring for ${t}, light exposure, moisture management, and soil aeration form the foundation of long-term success.

1. Lighting Architecture
Position your plant where it can receive adequate indirect natural light. Avoid harsh midday direct sunlight which can scorch tender foliage, while avoiding dark corners that trigger leaf dropping.

2. Moisture & Hydration Protocol
Water deeply until liquid drains freely from bottom drainage holes, then allow the top 2 inches of potting medium to dry before rewatering. Never permit standing water to accumulate in saucers.

3. Seasonal Feeding & Air Conditioning
During active spring and summer growth cycles, nourish monthly with a balanced organic botanical liquid fertilizer diluted to half strength.

By following these fundamental practices, your ${t} will continue to purify your living space and thrive for years to come.`,
    suggestedTags: [...kw, 'botanical care', 'verdantnest', 'houseplants']
  };
}

export async function generateSeoBlogContent(input: GenerateSeoBlogContentInput): Promise<GenerateSeoBlogContentOutput> {
  try {
    return await generateSeoBlogContentFlow(input);
  } catch (error) {
    console.warn("Genkit blog flow unavailable, using fallback generator:", error);
    return fallbackGenerateSeoBlogContent(input);
  }
}

const generateSeoBlogContentPrompt = ai.definePrompt({
  name: 'generateSeoBlogContentPrompt',
  input: {schema: GenerateSeoBlogContentInputSchema},
  output: {schema: GenerateSeoBlogContentOutputSchema},
  prompt: `You are an expert SEO content creator specializing in botanical care guides and blog articles. Your goal is to generate high-quality, keyword-rich content that attracts organic search traffic.

Generate a detailed and engaging {{length}} article about '{{{topic}}}'.
The tone of the article should be {{tone}}.

Make sure to naturally incorporate the following keywords throughout the article:
{{#if keywords}}
Keywords: {{#each keywords}}- {{{this}}}
{{/each}}
{{else}}
No specific keywords provided, use your expertise to include relevant ones.
{{/if}}

The article should include:
1.  An engaging title.
2.  Comprehensive content covering the topic.
3.  A list of 3-5 suggested SEO tags for this article.

Respond only with a JSON object containing the 'title', 'content', and 'suggestedTags' fields.`,
});

const generateSeoBlogContentFlow = ai.defineFlow(
  {
    name: 'generateSeoBlogContentFlow',
    inputSchema: GenerateSeoBlogContentInputSchema,
    outputSchema: GenerateSeoBlogContentOutputSchema,
  },
  async (input) => {
    const {output} = await generateSeoBlogContentPrompt(input);
    return output!;
  }
);
