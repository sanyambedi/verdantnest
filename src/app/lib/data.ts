
import { Plant, BlogPost } from '../types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImg = (id: string) => {
  const img = PlaceHolderImages.find(i => i.id === id);
  return img?.imageUrl || `https://picsum.photos/seed/${id}/800/1000`;
};

export const PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    price: 35.00,
    originalPrice: 45.00,
    slug: 'fiddle-leaf-fig',
    category: 'Indoor',
    description: 'The Fiddle Leaf Fig is the ultimate statement indoor plant, prized for its large, sculptural, violin-shaped leaves. This stunning tropical beauty thrives in bright indirect light.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('fiddle-leaf'),
    rating: 4.8,
    tips: [
      'Rotate the plant 90 degrees every week to ensure even growth.',
      'Wipe the large leaves with a damp cloth to remove dust.',
      'Only water when the top two inches of soil feel dry.'
    ],
    facts: [
      'In native West African rainforests, these can grow up to 50 feet tall.',
      'The large leaves are designed to capture filtered sunlight.'
    ],
    reviews: [
      { id: 'r1', user: 'Sarah J.', rating: 5, comment: 'Arrived in perfect condition. It’s the star of my living room!', date: '2024-01-15' }
    ]
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    price: 28.00,
    originalPrice: 35.00,
    slug: 'monstera-deliciosa',
    category: 'Indoor',
    description: 'Affectionately known as the Swiss Cheese Plant, the Monstera Deliciosa is a vigorous climbing plant that epitomizes tropical vibes.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('monstera'),
    rating: 4.9,
    tips: [
      'Provide a moss pole or trellis for climbing.',
      'Mist frequently or use a humidifier.'
    ],
    facts: [
      'The holes allow wind to pass through during storms.',
      'In the wild, they grow as hemiepiphytes.'
    ],
    reviews: []
  },
  {
    id: '3',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    price: 19.00,
    originalPrice: 25.00,
    slug: 'snake-plant',
    category: 'Air Purifier',
    description: 'The Snake Plant is practically indestructible. Architectural and striking, it is a champion of air purification.',
    difficulty: 'Beginner',
    sunlight: 'Low',
    image: getImg('snake-plant'),
    rating: 5.0,
    tips: [
      'Water only once every 3-4 weeks.',
      'Avoid getting water in the center of the rosette.'
    ],
    facts: [
      'NASA found it can filter formaldehyde.',
      'Produces oxygen at night.'
    ],
    reviews: []
  },
  {
    id: '4',
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    price: 14.00,
    slug: 'golden-pothos-trailing',
    category: 'Hanging',
    description: 'Known as "Devil\'s Ivy," this trailing beauty is impossible to kill and grows at an incredible rate.',
    difficulty: 'Beginner',
    sunlight: 'Low',
    image: getImg('pothos'),
    rating: 4.8,
    tips: [
      'Trim vines regularly to encourage bushier growth.',
      'Can grow in soil or water.'
    ],
    facts: [
      'One of the best plants for beginners.',
      'Native to French Polynesia.'
    ],
    reviews: []
  },
  {
    id: '5',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    price: 24.00,
    slug: 'zz-plant-emerald',
    category: 'Indoor',
    description: 'The ZZ Plant is the ultimate low-maintenance companion. It thrives in low light and survives drought.',
    difficulty: 'Beginner',
    sunlight: 'Low',
    image: getImg('zz-plant'),
    rating: 4.9,
    tips: [
      'Water only when soil is bone dry.',
      'Thrives in almost any lighting condition.'
    ],
    facts: [
      'Grows from thick, potato-like rhizomes.',
      'Native to drought-prone parts of Africa.'
    ],
    reviews: []
  },
  {
    id: '6',
    name: 'Bird of Paradise',
    scientificName: 'Strelitzia reginae',
    price: 45.00,
    originalPrice: 55.00,
    slug: 'bird-of-paradise-tropical',
    category: 'Flowering',
    description: 'Bring dramatic tropical flair with banana-like leaves and iconic orange flowers.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('bird-paradise'),
    rating: 4.7,
    tips: [
      'Requires very bright light to bloom.',
      'Feed monthly during spring and summer.'
    ],
    facts: [
      'Related to the banana plant family.',
      'In the wild, they are pollinated by birds.'
    ],
    reviews: []
  },
  {
    id: '7',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    price: 15.00,
    slug: 'aloe-vera-medicinal',
    category: 'Medicinal',
    description: 'A blend of beauty and utility. Filled with soothing gel known for healing properties.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('aloe-vera'),
    rating: 4.8,
    tips: [
      'Use porous soil for drainage.',
      'Wait for the soil to dry out completely before watering.'
    ],
    facts: [
      'Ancient Egyptians called it the "Plant of Immortality."',
      'Contains over 75 active components.'
    ],
    reviews: []
  },
  {
    id: '8',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    price: 22.00,
    slug: 'peace-lily-bloom',
    category: 'Air Purifier',
    description: 'A symbol of tranquility and a powerhouse of air purification. Features elegant white spathes.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('peace-lily'),
    rating: 4.7,
    tips: [
      'Mist regularly to maintain high humidity.',
      'It will "droop" slightly when it needs water.'
    ],
    facts: [
      'Proven by NASA to remove airborne toxins.',
      'The "flowers" are actually modified leaves.'
    ],
    reviews: []
  },
  {
    id: '9',
    name: 'Boston Fern',
    scientificName: 'Nephrolepis exaltata',
    price: 26.00,
    slug: 'boston-fern-hanging',
    category: 'Hanging',
    description: 'Lush and woodland. Perfect for adding volume and texture to hanging baskets.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('boston-fern'),
    rating: 4.6,
    tips: [
      'Never let the soil dry out completely.',
      'Keep away from dry heater air.'
    ],
    facts: [
      'Dates back to prehistoric times.',
      'Excellent for improving air humidity.'
    ],
    reviews: []
  },
  {
    id: '10',
    name: 'Jade Plant',
    scientificName: 'Crassula ovata',
    price: 20.00,
    slug: 'jade-plant-money-tree',
    category: 'Succulent',
    description: 'Associated with luck and prosperity. Thick woody stems and oval-shaped leaves.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('jade-plant'),
    rating: 4.9,
    tips: [
      'Only water when soil is dry to the touch.',
      'Direct sunlight helps maintain healthy stems.'
    ],
    facts: [
      'Known as the "Money Tree" in some cultures.',
      'Can live for over 50 years.'
    ],
    reviews: []
  },
  {
    id: '11',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    price: 18.00,
    originalPrice: 24.00,
    slug: 'spider-plant-variegated',
    category: 'Hanging',
    description: 'Produces long stems with "spiderettes"—baby plants that dangle beautifully.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('spider-plant'),
    rating: 4.8,
    tips: [
      'Easily propagated from its runners.',
      'Tolerant of a wide range of conditions.'
    ],
    facts: [
      'Can remove up to 90% of household toxins.',
      'Non-toxic to pets.'
    ],
    reviews: []
  },
  {
    id: '12',
    name: 'Calathea Orbifolia',
    scientificName: 'Calathea orbifolia',
    price: 32.00,
    originalPrice: 42.00,
    slug: 'calathea-orbifolia-luxury',
    category: 'Indoor',
    description: 'Luxury foliage plant with oversized, round leaves and silvery-green stripes.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('calathea'),
    rating: 4.5,
    tips: [
      'Maintain humidity above 50% for healthy edges.',
      'Sensitive to tap water chemicals.'
    ],
    facts: [
      'Indigenous to the Amazon rainforest.',
      'Moves its leaves up at night.'
    ],
    reviews: []
  },
  {
    id: '13',
    name: 'Rubber Tree',
    scientificName: 'Ficus elastica',
    price: 38.00,
    slug: 'rubber-tree-burgundy',
    category: 'Indoor',
    description: 'Bold architectural plant with glossy, leather-like deep burgundy leaves.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('rubber-tree'),
    rating: 4.7,
    tips: [
      'Wipe leaves regularly to allow photosynthesis.',
      'Water only when top half of soil is dry.'
    ],
    facts: [
      'Milky sap was once used for rubber.',
      'Native to Southeast Asia.'
    ],
    reviews: []
  },
  {
    id: '14',
    name: 'Chinese Money Plant',
    scientificName: 'Pilea peperomioides',
    price: 25.00,
    slug: 'chinese-money-plant-pilea',
    category: 'Indoor',
    description: 'Quirky addition with perfectly round, pancake-shaped leaves. Fast growing.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('pilea'),
    rating: 4.8,
    tips: [
      'Rotate weekly to prevent lopsided growth.',
      'Easily produces babies for sharing.'
    ],
    facts: [
      'Also known as the "Pass-It-On Plant."',
      'Brought to Europe by missionaries.'
    ],
    reviews: []
  },
  {
    id: '15',
    name: 'English Lavender',
    scientificName: 'Lavandula angustifolia',
    price: 22.00,
    originalPrice: 30.00,
    slug: 'english-lavender-aromatic',
    category: 'Outdoor',
    description: 'Quintessential aromatic herb with slender spikes of purple flowers.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('lavender-english'),
    rating: 4.8,
    tips: [
      'Needs very well-draining soil.',
      'Prune after flowering to maintain shape.'
    ],
    facts: [
      'Name comes from Latin "lavare" (to wash).',
      'Used for centuries in aromatherapy.'
    ],
    reviews: []
  },
  {
    id: '16',
    name: 'Dwarf Pomegranate',
    scientificName: 'Punica granatum \'Nana\'',
    price: 65.00,
    slug: 'dwarf-pomegranate-bonsai',
    category: 'Bonsai',
    description: 'Fascinating bonsai specimen with tiny leaves and ornamental fruit.',
    difficulty: 'Expert',
    sunlight: 'Full Sun',
    image: getImg('pomegranate'),
    rating: 4.9,
    tips: [
      'Keep outdoors in summer for maximum light.',
      'Water daily during peak growth.'
    ],
    facts: [
      'One of the oldest fruit-bearing trees.',
      'Symbolizes prosperity and abundance.'
    ],
    reviews: []
  },
  {
    id: '17',
    name: 'Meyer Lemon',
    scientificName: 'Citrus × meyeri',
    price: 58.00,
    originalPrice: 75.00,
    slug: 'meyer-lemon-fruit-tree',
    category: 'Fruit',
    description: 'A cross between a lemon and a mandarin. Sweet, juicy, and aromatic fruit.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('lemon-tree'),
    rating: 4.8,
    tips: [
      'Give it 8-12 hours of light daily.',
      'Feed with specialized citrus fertilizer.'
    ],
    facts: [
      'Discovered in China in 1908.',
      'Sweeter than standard Eureka lemons.'
    ],
    reviews: []
  },
  {
    id: '18',
    name: 'Rosemary',
    scientificName: 'Salvia rosmarinus',
    price: 16.00,
    slug: 'mediterranean-rosemary-herb',
    category: 'Herb',
    description: 'Hardy Mediterranean shrub with needle-like leaves and a powerful scent.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('rosemary'),
    rating: 4.7,
    tips: [
      'Very drought tolerant once established.',
      'Loves sandy, poor-nutrient soil.'
    ],
    facts: [
      'Used in ancient Greece to aid memory.',
      'Symbol of remembrance and fidelity.'
    ],
    reviews: []
  },
  {
    id: '19',
    name: 'String of Hearts',
    scientificName: 'Ceropegia woodii',
    price: 26.00,
    slug: 'string-of-hearts-vine',
    category: 'Hanging',
    description: 'Elegant trailing succulent with heart-shaped leaves and silver marbling.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('string-of-hearts'),
    rating: 4.9,
    tips: [
      'Don\'t overwater; store water in their tubers.',
      'Vines can grow several feet long.'
    ],
    facts: [
      'Native to South Africa.',
      'Technically a tuberous plant.'
    ],
    reviews: []
  },
  {
    id: '20',
    name: 'Blue Star Fern',
    scientificName: 'Phlebodium aureum',
    price: 24.00,
    slug: 'blue-star-fern-unique',
    category: 'Indoor',
    description: 'Striking fern with elongated, blue-grey fronds. Very adaptable.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('blue-star-fern'),
    rating: 4.8,
    tips: [
      'Higher humidity helps maintain blue color.',
      'Water at the base to avoid rot.'
    ],
    facts: [
      'Grows as an epiphyte in the wild.',
      'Native to tropical rainforests.'
    ],
    reviews: []
  },
  {
    id: '21',
    name: 'Desert Rose',
    scientificName: 'Adenium obesum',
    price: 42.00,
    originalPrice: 52.00,
    slug: 'desert-rose-succulent',
    category: 'Succulent',
    description: 'Sculptural trunk and vibrant trumpet-shaped flowers. A true desert beauty.',
    difficulty: 'Expert',
    sunlight: 'Full Sun',
    image: getImg('desert-rose'),
    rating: 4.8,
    tips: [
      'Requires maximum sunlight to bloom.',
      'Goes dormant in winter; reduce watering.'
    ],
    facts: [
      'Can live for hundreds of years.',
      'The sap is used by some tribes for arrows.'
    ],
    reviews: []
  },
  {
    id: '22',
    name: 'Venus Flytrap',
    scientificName: 'Dionaea muscipula',
    price: 22.00,
    slug: 'venus-flytrap-exotic',
    category: 'Indoor',
    description: 'The world\'s most famous carnivorous plant. A botanical marvel.',
    difficulty: 'Expert',
    sunlight: 'Full Sun',
    image: getImg('venus-flytrap'),
    rating: 4.6,
    tips: [
      'Only use distilled or rainwater.',
      'Never trigger the traps manually.'
    ],
    facts: [
      'Native only to North and South Carolina.',
      'Takes 3-5 days to digest a meal.'
    ],
    reviews: []
  },
  {
    id: '23',
    name: 'Blue Spruce',
    scientificName: 'Picea pungens',
    price: 55.00,
    slug: 'blue-spruce-evergreen',
    category: 'Outdoor',
    description: 'Stately evergreen with distinctive silver-blue needles and pyramid shape.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('blue-spruce'),
    rating: 4.7,
    tips: [
      'Prefers cooler, well-draining soil.',
      'Slow growing but very hardy.'
    ],
    facts: [
      'The blue color is a natural wax coating.',
      'State tree of Colorado.'
    ],
    reviews: []
  },
  {
    id: '24',
    name: 'Sweet Basil',
    scientificName: 'Ocimum basilicum',
    price: 12.00,
    slug: 'sweet-basil-culinary',
    category: 'Herb',
    description: 'Aromatic and essential for fresh culinary creations. Fast-growing.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('basil'),
    rating: 4.7,
    tips: [
      'Pinch off flowers to extend leaf growth.',
      'Needs consistent moisture.'
    ],
    facts: [
      'Considered a symbol of love in Italy.',
      'Part of the mint family.'
    ],
    reviews: []
  },
  {
    id: '25',
    name: 'Moth Orchid',
    scientificName: 'Phalaenopsis',
    price: 35.00,
    originalPrice: 45.00,
    slug: 'moth-orchid-white',
    category: 'Flowering',
    description: 'Pure elegance. Arching sprays of large white blooms that last months.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('orchid'),
    rating: 4.6,
    tips: [
      'Water when roots appear silvery.',
      'Avoid getting water in the leaf crown.'
    ],
    facts: [
      'Blooms can last up to 3-4 months.',
      'Grows on trees in its native Asia.'
    ],
    reviews: []
  },
  {
    id: '26',
    name: 'String of Pearls',
    scientificName: 'Senecio rowleyanus',
    price: 24.00,
    slug: 'string-of-pearls-succulent',
    category: 'Hanging',
    description: 'Unique trailing succulent with pea-shaped leaves. A conversation piece.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('string-of-pearls'),
    rating: 4.5,
    tips: [
      'Water sparingly; pearls store water.',
      'Bright indirect light is best.'
    ],
    facts: [
      'Leaves have a translucent "window" for light.',
      'Native to Southwest Africa.'
    ],
    reviews: []
  },
  {
    id: '27',
    name: 'Thai Chili Pepper',
    scientificName: 'Capsicum annuum',
    price: 16.00,
    slug: 'thai-chili-pepper-fruit',
    category: 'Fruit',
    description: 'Compact plant producing hundreds of small, upright and spicy peppers.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('chili'),
    rating: 4.8,
    tips: [
      'Needs warmth and full sun to fruit.',
      'Peppers ripen from green to bright red.'
    ],
    facts: [
      'Rich in Vitamin C and antioxidants.',
      'Rating: 50,000–100,000 Scoville units.'
    ],
    reviews: []
  },
  {
    id: '28',
    name: 'Eucalyptus',
    scientificName: 'Eucalyptus cinerea',
    price: 28.00,
    slug: 'silver-dollar-eucalyptus',
    category: 'Medicinal',
    description: 'Prized for silvery-blue foliage and its refreshing, medicinal scent.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('eucalyptus'),
    rating: 4.7,
    tips: [
      'Needs a very large pot or outdoor space.',
      'Prune often to maintain a bushy shape.'
    ],
    facts: [
      'Native to Australia.',
      'Oil is used globally for therapeutic steam.'
    ],
    reviews: []
  },
  {
    id: '29',
    name: 'Gardenia',
    scientificName: 'Gardenia jasminoides',
    price: 35.00,
    slug: 'gardenia-fragrant-bloom',
    category: 'Flowering',
    description: 'The gold standard of floral fragrance. Intoxicatingly sweet.',
    difficulty: 'Expert',
    sunlight: 'Partial',
    image: getImg('gardenia'),
    rating: 4.4,
    tips: [
      'Requires acidic soil and humidity.',
      'Very sensitive to temperature changes.'
    ],
    facts: [
      'Named after Dr. Alexander Garden.',
      'Symbol of secret love and refinement.'
    ],
    reviews: []
  },
  {
    id: '30',
    name: 'Japanese Maple',
    scientificName: 'Acer palmatum',
    price: 85.00,
    originalPrice: 110.00,
    slug: 'japanese-maple-red-leaf',
    category: 'Outdoor',
    description: 'Masterpiece of garden design with delicate lace-like red leaves.',
    difficulty: 'Expert',
    sunlight: 'Partial',
    image: getImg('japanese-maple'),
    rating: 4.9,
    tips: [
      'Protect from harsh afternoon sun.',
      'Best pruned in winter dormancy.'
    ],
    facts: [
      'Signficiant in Japanese gardening philosophy.',
      'Over 1,000 cultivars exist.'
    ],
    reviews: []
  },
  {
    id: '31',
    name: 'Sago Palm',
    scientificName: 'Cycas revoluta',
    price: 48.00,
    slug: 'sago-palm-ancient',
    category: 'Indoor',
    description: 'Ancient botanical relic with a prehistoric tropical vibe and stiff fronds.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('sago-palm'),
    rating: 4.7,
    tips: [
      'Very slow growing; only produces one flush of leaves yearly.',
      'Tolerates moderate drought.'
    ],
    facts: [
      'Cycads existed alongside dinosaurs.',
      'Can live for over 100 years.'
    ],
    reviews: []
  },
  {
    id: '32',
    name: 'Dragon Tree',
    scientificName: 'Dracaena marginata',
    price: 32.00,
    slug: 'dragon-tree-madagascar',
    category: 'Indoor',
    description: 'Slender, arching leaves with red edges and dramatic wooden trunks.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('dragon-tree'),
    rating: 4.6,
    tips: [
      'Allow soil to dry significantly between waterings.',
      'Tolerates lower light than most trees.'
    ],
    facts: [
      'Native to Madagascar.',
      'Proven by NASA to filter toxins.'
    ],
    reviews: []
  },
  {
    id: '33',
    name: 'Cast Iron Plant',
    scientificName: 'Aspidistra elatior',
    price: 29.00,
    originalPrice: 38.00,
    slug: 'cast-iron-plant-hardy',
    category: 'Indoor',
    description: 'The hardiest indoor plant. Thrives in deep shade and neglect.',
    difficulty: 'Beginner',
    sunlight: 'Low',
    image: getImg('cast-iron'),
    rating: 4.8,
    tips: [
      'Avoid direct sunlight as it bleaches leaves.',
      'Does not need frequent repotting.'
    ],
    facts: [
      'A favorite in Victorian-era homes.',
      'Slow growing and long lived.'
    ],
    reviews: []
  },
  {
    id: '34',
    name: 'Bromeliad',
    scientificName: 'Guzmania',
    price: 24.00,
    slug: 'bromeliad-tropical-bloom',
    category: 'Flowering',
    description: 'Tropical showstopper with a central "cup" that holds a vibrant bloom.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('bromeliad'),
    rating: 4.7,
    tips: [
      'Water into the central cup, not the soil.',
      'Avoid direct afternoon sun.'
    ],
    facts: [
      'Epiphytic—grows on trees in the wild.',
      'Pineapples are a member of this family.'
    ],
    reviews: []
  },
  {
    id: '35',
    name: 'Air Plant',
    scientificName: 'Tillandsia',
    price: 12.00,
    slug: 'tillandsia-air-plant',
    category: 'Air Purifier',
    description: 'Needs no soil to survive. Obtains nutrients and water through its leaves.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('air-plant'),
    rating: 4.9,
    tips: [
      'Soak in water for 20 minutes once a week.',
      'Ensure it dries completely within 4 hours.'
    ],
    facts: [
      'Absorbs everything through trichomes on leaves.',
      'Over 650 species exist.'
    ],
    reviews: []
  },
  {
    id: '36',
    name: 'Alocasia Polly',
    scientificName: 'Alocasia × amazonica',
    price: 34.00,
    originalPrice: 42.00,
    slug: 'alocasia-polly-exotic',
    category: 'Indoor',
    description: 'Distinctive arrowhead-shaped leaves with silver veins. A true tropical showpiece.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('alocasia-polly'),
    rating: 4.7,
    tips: [
      'Keep humidity high to prevent crispy edges.',
      'Loves warm environments.'
    ],
    facts: [
      'Also known as the African Mask plant.',
      'Leaves can grow up to 16 inches long.'
    ],
    reviews: []
  },
  {
    id: '37',
    name: 'Prayer Plant',
    scientificName: 'Maranta leuconeura',
    price: 22.00,
    slug: 'maranta-prayer-plant',
    category: 'Indoor',
    description: 'Fascinating leaves that fold up at night as if in prayer.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('prayer-plant'),
    rating: 4.8,
    tips: [
      'Prefers consistently moist soil.',
      'Thrives in high humidity.'
    ],
    facts: [
      'The folding movement is called nyctinasty.',
      'Native to the Brazilian rainforest.'
    ],
    reviews: []
  },
  {
    id: '38',
    name: 'String of Bananas',
    scientificName: 'Curio radicans',
    price: 26.00,
    slug: 'string-of-bananas-trailing',
    category: 'Hanging',
    description: 'Trailing succulent with banana-shaped leaves. Fast-growing and resilient.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('string-bananas'),
    rating: 4.7,
    tips: [
      'Allow soil to dry completely between waterings.',
      'Provide bright light for faster growth.'
    ],
    facts: [
      'Native to South Africa.',
      'Produces small cinnamon-scented flowers.'
    ],
    reviews: []
  },
  {
    id: '39',
    name: 'Burro\'s Tail',
    scientificName: 'Sedum morganianum',
    price: 28.00,
    originalPrice: 35.00,
    slug: 'burro-tail-succulent',
    category: 'Succulent',
    description: 'Cascading stems covered in plump, blue-green leaves.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('burro-tail'),
    rating: 4.6,
    tips: [
      'Handle carefully; leaves fall off easily.',
      'Loves bright, direct sunlight.'
    ],
    facts: [
      'Leaves store water for long periods.',
      'Can grow up to 4 feet long.'
    ],
    reviews: []
  },
  {
    id: '40',
    name: 'Red Anthurium',
    scientificName: 'Anthurium andraeanum',
    price: 38.00,
    slug: 'anthurium-red-bloom',
    category: 'Flowering',
    description: 'Classic tropical beauty with waxy red flowers that last for weeks.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('anthurium-red'),
    rating: 4.9,
    tips: [
      'Bright light ensures consistent blooming.',
      'Mist leaves to mimic tropical humidity.'
    ],
    facts: [
      'The "flower" is actually a modified leaf called a spathe.',
      'Longest-lasting cut flower in the world.'
    ],
    reviews: []
  },
  {
    id: '41',
    name: 'African Violet',
    scientificName: 'Saintpaulia',
    price: 18.00,
    slug: 'african-violet-purple',
    category: 'Flowering',
    description: 'Charming indoor bloomer with velvety leaves and purple flowers.',
    difficulty: 'Intermediate',
    sunlight: 'Partial',
    image: getImg('african-violet'),
    rating: 4.5,
    tips: [
      'Water from the bottom to avoid leaf spots.',
      'Prefers room temperature water.'
    ],
    facts: [
      'Discovered in Tanzania in 1892.',
      'Can bloom year-round with proper care.'
    ],
    reviews: []
  },
  {
    id: '42',
    name: 'Money Tree',
    scientificName: 'Pachira aquatica',
    price: 45.00,
    originalPrice: 55.00,
    slug: 'money-tree-braided',
    category: 'Indoor',
    description: 'Braided trunk and palmate leaves. Symbol of luck and prosperity.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('money-tree'),
    rating: 4.8,
    tips: [
      'Deep but infrequent watering is best.',
      'Rotate to keep the canopy even.'
    ],
    facts: [
      'In the wild, it can grow up to 60 feet.',
      'Known as the "Feng Shui" plant.'
    ],
    reviews: []
  },
  {
    id: '43',
    name: 'Bamboo Palm',
    scientificName: 'Chamaedorea seifrizii',
    price: 52.00,
    slug: 'bamboo-palm-purifier',
    category: 'Air Purifier',
    description: 'Clumping palm with bamboo-like stems. Superior air purifier.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('bamboo-palm'),
    rating: 4.7,
    tips: [
      'Keep soil moist but not soggy.',
      'Thrives in lower light than most palms.'
    ],
    facts: [
      'Proven to remove benzene and formaldehyde.',
      'Native to Mexico and Central America.'
    ],
    reviews: []
  },
  {
    id: '44',
    name: 'Kimberly Queen Fern',
    scientificName: 'Nephrolepis obliterata',
    price: 28.00,
    slug: 'kimberly-queen-fern-pot',
    category: 'Indoor',
    description: 'Upright, sword-shaped fronds. More heat-tolerant than Boston ferns.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('kimberly-fern'),
    rating: 4.8,
    tips: [
      'Requires frequent watering.',
      'Loves humid environments like bathrooms.'
    ],
    facts: [
      'Native to Australia.',
      'Excellent for vertical interest.'
    ],
    reviews: []
  },
  {
    id: '45',
    name: 'Peperomia Hope',
    scientificName: 'Peperomia tetraphylla',
    price: 24.00,
    slug: 'peperomia-hope-trailing',
    category: 'Indoor',
    description: 'Trailing succulent-like stems with small, round, fleshy leaves.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('peperomia-hope'),
    rating: 4.7,
    tips: [
      'Allow soil to dry out between waterings.',
      'Loves bright indirect light.'
    ],
    facts: [
      'A hybrid of P. deppeana and P. quadrifolia.',
      'Very easy to propagate from cuttings.'
    ],
    reviews: []
  },
  {
    id: '46',
    name: 'Fishbone Cactus',
    scientificName: 'Epiphyllum anguliger',
    price: 32.00,
    originalPrice: 40.00,
    slug: 'fishbone-cactus-zigzag',
    category: 'Indoor',
    description: 'Flat, zig-zag stems that resemble a fish skeleton.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('fishbone-cactus'),
    rating: 4.8,
    tips: [
      'Avoid direct hot afternoon sun.',
      'Water more frequently than desert cacti.'
    ],
    facts: [
      'Night-blooming orchid cactus.',
      'Produces highly fragrant white flowers.'
    ],
    reviews: []
  },
  {
    id: '47',
    name: 'Stapelia',
    scientificName: 'Stapelia gigantea',
    price: 28.00,
    slug: 'stapelia-starfish-flower',
    category: 'Succulent',
    description: 'Low-growing succulent with upright stems and massive starfish-shaped blooms.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('stapelia'),
    rating: 4.6,
    tips: [
      'Flowers have a carrion scent to attract flies.',
      'Requires very well-draining soil.'
    ],
    facts: [
      'Also known as the Zulu Giant.',
      'Native to South Africa.'
    ],
    reviews: []
  },
  {
    id: '48',
    name: 'Ghost Pepper',
    scientificName: 'Capsicum chinense',
    price: 18.00,
    slug: 'ghost-pepper-extreme-heat',
    category: 'Fruit',
    description: 'One of the world\'s hottest chili peppers. For extreme heat lovers.',
    difficulty: 'Expert',
    sunlight: 'Full Sun',
    image: getImg('ghost-pepper'),
    rating: 4.9,
    tips: [
      'Requires a long, hot growing season.',
      'Wear gloves when handling ripe fruit.'
    ],
    facts: [
      'Over 1 million Scoville Heat Units.',
      'Originates from Northeast India.'
    ],
    reviews: []
  },
  {
    id: '49',
    name: 'Juniper Bonsai',
    scientificName: 'Juniperus procumbens',
    price: 75.00,
    originalPrice: 95.00,
    slug: 'juniper-bonsai-masterpiece',
    category: 'Bonsai',
    description: 'Classic evergreen bonsai with cascading branches and rugged bark.',
    difficulty: 'Expert',
    sunlight: 'Full Sun',
    image: getImg('juniper-bonsai'),
    rating: 4.9,
    tips: [
      'Should be kept outdoors year-round.',
      'Never allow the root ball to dry out.'
    ],
    facts: [
      'Junipers symbolize protection and strength.',
      'Can be trained into many classical styles.'
    ],
    reviews: []
  },
  {
    id: '50',
    name: 'Peppermint',
    scientificName: 'Mentha × piperita',
    price: 14.00,
    slug: 'peppermint-herb-fresh',
    category: 'Herb',
    description: 'Invigorating scent and flavor. Excellent for teas and culinary use.',
    difficulty: 'Beginner',
    sunlight: 'Partial',
    image: getImg('mint-herb'),
    rating: 4.8,
    tips: [
      'Best grown in a pot as it spreads rapidly.',
      'Loves consistent moisture.'
    ],
    facts: [
      'A natural cross between watermint and spearmint.',
      'Used for digestive health for centuries.'
    ],
    reviews: []
  },
  {
    id: '51',
    name: 'Thyme',
    scientificName: 'Thymus vulgaris',
    price: 15.00,
    slug: 'thyme-culinary-herb',
    category: 'Herb',
    description: 'Essential kitchen herb with a earthy, lemony fragrance.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('thyme-herb'),
    rating: 4.7,
    tips: [
      'Drought tolerant once established.',
      'Harvest frequently to keep the plant bushy.'
    ],
    facts: [
      'Symbol of courage in ancient Greece.',
      'Has natural antimicrobial properties.'
    ],
    reviews: []
  },
  {
    id: '52',
    name: 'Oregano',
    scientificName: 'Origanum vulgare',
    price: 14.00,
    slug: 'oregano-mediterranean-herb',
    category: 'Herb',
    description: 'The foundation of Mediterranean cuisine. Pungent and aromatic.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('oregano-herb'),
    rating: 4.8,
    tips: [
      'Loves rocky, poor-nutrient soil.',
      'Trim after flowering to refresh growth.'
    ],
    facts: [
      'Means "Joy of the Mountain" in Greek.',
      'Powerful antioxidant source.'
    ],
    reviews: []
  },
  {
    id: '53',
    name: 'Munstead Lavender',
    scientificName: 'Lavandula angustifolia \'Munstead\'',
    price: 24.00,
    slug: 'munstead-lavender-medicinal',
    category: 'Medicinal',
    description: 'Compact variety with deep purple flowers. Prized for its oil.',
    difficulty: 'Intermediate',
    sunlight: 'Full Sun',
    image: getImg('lavender-munstead'),
    rating: 4.9,
    tips: [
      'Requires excellent drainage.',
      'Prune in early spring for shape.'
    ],
    facts: [
      'Named after Munstead Wood in England.',
      'Attracts pollinators in droves.'
    ],
    reviews: []
  },
  {
    id: '54',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    price: 16.00,
    slug: 'chamomile-medicinal-flower',
    category: 'Medicinal',
    description: 'Charming daisy-like flowers used for calming herbal tea.',
    difficulty: 'Beginner',
    sunlight: 'Full Sun',
    image: getImg('chamomile-plant'),
    rating: 4.7,
    tips: [
      'Easy to grow from seed.',
      'Harvest flowers when fully open.'
    ],
    facts: [
      'Used for relaxation for thousands of years.',
      'Apple-like scent when crushed.'
    ],
    reviews: []
  },
  {
    id: '55',
    name: 'Blue Vanda Orchid',
    scientificName: 'Vanda coerulea',
    price: 65.00,
    originalPrice: 85.00,
    slug: 'blue-orchid-vanda-exotic',
    category: 'Flowering',
    description: 'One of the few naturally occurring blue orchids. Stunning epiphytic plant.',
    difficulty: 'Expert',
    sunlight: 'Full Sun',
    image: getImg('blue-orchid'),
    rating: 4.9,
    tips: [
      'Grow in a slatted basket without soil.',
      'Mist roots daily; they love humidity.'
    ],
    facts: [
      'Native to the Himalayas.',
      'Can bloom 2-3 times per year.'
    ],
    reviews: []
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why Your Monstera Leaves Aren\'t Splitting',
    excerpt: 'Fenestrations are the hallmark of a mature Monstera Deliciosa. Learn the secrets of light and maturity.',
    content: `If you've brought home a young Monstera and are waiting for those iconic holes to appear, you're not alone. In their native habitats, Monsteras develop these splits to allow wind to pass through and light to reach lower foliage. Move your plant to a spot with bright, indirect light to trigger growth.`,
    date: 'May 12, 2024',
    author: 'Elena Thorne',
    category: 'Expert Care',
    image: 'https://picsum.photos/seed/monstera-blog/1200/800',
    tags: ['Monstera', 'Indoor Gardening'],
    slug: 'monstera-leaf-splitting-guide',
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: 'The Pothos Variety Guide: Beyond Golden',
    excerpt: 'From the silvery Satin to the snowy N\'Joy, the Pothos family is vast. Discover which fits your aesthetic.',
    content: `The Golden Pothos is a gateway, but the genus offers so much more. Marble Queen features stunning white variegation, while Neon Pothos provides a pop of electric lime.`,
    date: 'June 05, 2024',
    author: 'Marcus Green',
    category: 'Species Spotlight',
    image: 'https://picsum.photos/seed/pothos-blog/1200/800',
    tags: ['Pothos', 'Varieties'],
    slug: 'pothos-variety-botanical-guide',
    readTime: '4 min read'
  }
];

    