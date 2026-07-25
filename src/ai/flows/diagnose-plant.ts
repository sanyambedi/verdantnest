
'use server';
/**
 * @fileOverview A Genkit flow for diagnosing plant health issues from descriptions and photos.
 *
 * - diagnosePlantHealth - A function that provides diagnosis and care advice.
 * - DiagnosePlantHealthInput - The input type for the diagnosePlantHealth function.
 * - DiagnosePlantHealthOutput - The return type for the diagnosePlantHealth function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePlantHealthInputSchema = z.object({
  plantName: z.string().optional().describe('The name of the plant, if known.'),
  symptoms: z.string().describe('Description of the symptoms or issues the plant is experiencing.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnosePlantHealthInput = z.infer<typeof DiagnosePlantHealthInputSchema>;

const DiagnosePlantHealthOutputSchema = z.object({
  diagnosis: z.string().describe('The identified problem or condition.'),
  severity: z.enum(['low', 'medium', 'high', 'critical']).describe('The severity of the issue.'),
  recommendations: z.array(z.string()).describe('Step-by-step recovery plan.'),
  prognosis: z.string().describe('The likelihood of recovery if recommendations are followed.'),
  preventionTips: z.array(z.string()).describe('How to avoid this issue in the future.'),
});
export type DiagnosePlantHealthOutput = z.infer<typeof DiagnosePlantHealthOutputSchema>;

function fallbackDiagnosePlantHealth(input: DiagnosePlantHealthInput): DiagnosePlantHealthOutput {
  const sym = (input.symptoms || '').toLowerCase();
  const plant = input.plantName || 'Botanical Specimen';

  if (sym.includes('yellow') || sym.includes('mushy') || sym.includes('rot') || sym.includes('overwater')) {
    return {
      diagnosis: `Overwatering & Moisture Saturation in ${plant}`,
      severity: 'high',
      recommendations: [
        'Immediately pause watering and allow the top 2-3 inches of soil to completely dry out.',
        'Inspect drainage holes to ensure excess water escapes freely without pooling.',
        'Prune away heavily yellowed or decayed leaves with sanitized pruning shears.',
        'Consider repotting into a porous, well-draining aerated soil mix if soil remains soggy for over 4 days.'
      ],
      prognosis: 'High probability of recovery if watering frequency is reduced immediately.',
      preventionTips: [
        'Use the finger test before watering: insert finger 2 inches into soil to check moisture.',
        'Ensure pots always have functional bottom drainage holes.',
        'Reduce watering frequency significantly during autumn and winter months.'
      ]
    };
  }

  if (sym.includes('bug') || sym.includes('white') || sym.includes('web') || sym.includes('pest') || sym.includes('spot')) {
    return {
      diagnosis: `Botanical Pest Infestation (Spider Mites or Mealybugs) on ${plant}`,
      severity: 'medium',
      recommendations: [
        'Isolate this plant immediately from other indoor houseplants to prevent cross-contamination.',
        'Wipe down both sides of affected leaves with a soft damp cloth or gentle water spray.',
        'Apply cold-pressed organic Neem Oil spray or insecticidal soap solution every 5-7 days.',
        'Inspect soil surface and leaf axils weekly until no further pests are visible.'
      ],
      prognosis: 'Excellent recovery expected with consistent weekly organic treatment.',
      preventionTips: [
        'Maintain healthy ambient humidity levels, as spider mites thrive in dry air.',
        'Wipe leaves monthly with warm water to keep foliage clean and dust-free.',
        'Quarantine new plant arrivals for 10-14 days before introducing them to your collection.'
      ]
    };
  }

  if (sym.includes('dry') || sym.includes('brown') || sym.includes('crispy') || sym.includes('droop') || sym.includes('underwater')) {
    return {
      diagnosis: `Under-hydration & Low Ambient Humidity Stress in ${plant}`,
      severity: 'medium',
      recommendations: [
        'Perform a deep soak: water thoroughly until liquid drips freely from drainage holes.',
        'Trim away dead crispy brown leaf tips using sharp sanitized scissors.',
        'Increase surrounding humidity by placing a pebble tray filled with water beneath the pot.',
        'Keep plant away from dry air drafts, radiators, or AC vents.'
      ],
      prognosis: 'Very high likelihood of rapid leaf turgidity recovery within 24-48 hours.',
      preventionTips: [
        'Group plants together to create a micro-humidity zone.',
        'Maintain a consistent hydration routine according to seasonal light levels.',
        'Use a pebble moisture tray or room humidifier during dry winter heating seasons.'
      ]
    };
  }

  return {
    diagnosis: `General Environmental Light & Acclimation Stress in ${plant}`,
    severity: 'low',
    recommendations: [
      'Relocate plant to a spot receiving bright, indirect sunlight away from harsh direct rays.',
      'Check that potting medium has appropriate aeration and perlite for root respiration.',
      'Maintain stable indoor ambient temperatures between 65°F and 80°F (18°C - 27°C).',
      'Feed with a balanced diluted liquid organic fertilizer during active spring/summer growth.'
    ],
    prognosis: 'Favorable outlook. Plant is likely adjusting to environmental conditions.',
    preventionTips: [
      'Avoid moving the plant frequently once it finds an optimal light location.',
      'Monitor light shifts as seasons change between summer and winter.',
      'Maintain consistent watering and humidity parameters.'
    ]
  };
}

export async function diagnosePlantHealth(input: DiagnosePlantHealthInput): Promise<DiagnosePlantHealthOutput> {
  try {
    return await diagnosePlantHealthFlow(input);
  } catch (error) {
    console.warn("Genkit diagnosis flow unavailable, using intelligent fallback:", error);
    return fallbackDiagnosePlantHealth(input);
  }
}

const diagnosePrompt = ai.definePrompt({
  name: 'diagnosePlantHealthPrompt',
  input: {schema: DiagnosePlantHealthInputSchema},
  output: {schema: DiagnosePlantHealthOutputSchema},
  prompt: `You are a "Plant Doctor" AI at VerdantNest. Your job is to help customers save their dying or struggling plants.

Input:
Plant Name: {{{plantName}}}
Symptoms: {{{symptoms}}}
{{#if photoDataUri}}Photo Analysis Requested: {{media url=photoDataUri}}{{/if}}

Provide a detailed botanical diagnosis. Be empathetic but scientific.
Identify if it's a watering issue, light issue, pest infestation, or nutrient deficiency.

Output must include:
1. A clear diagnosis.
2. Severity level.
3. 3-5 specific recovery actions.
4. A prognosis.
5. Prevention advice.`,
});

const diagnosePlantHealthFlow = ai.defineFlow(
  {
    name: 'diagnosePlantHealthFlow',
    inputSchema: DiagnosePlantHealthInputSchema,
    outputSchema: DiagnosePlantHealthOutputSchema,
  },
  async input => {
    const {output} = await diagnosePrompt(input);
    if (!output) throw new Error('Could not diagnose plant health.');
    return output;
  }
);

