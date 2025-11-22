import { Template, AspectRatio } from './types';

export const TEMPLATES: Template[] = [
  // --- Photorealistic ---
  {
    id: 'photo-portrait',
    name: 'Cinematic Portrait',
    category: 'Photorealistic',
    description: 'High-end studio lighting, 85mm lens, sharp focus, bokeh background.',
    promptModifier: 'cinematic lighting, 85mm lens, photorealistic, incredibly detailed, sharp focus, shallow depth of field, professional color grading, 8k resolution',
    thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'photo-nature',
    name: 'National Geographic',
    category: 'Photorealistic',
    description: 'Dramatic landscape, golden hour, hyper-realistic nature photography.',
    promptModifier: 'award winning nature photography, golden hour, dramatic lighting, hyperrealistic, highly detailed, wide angle lens, 8k, national geographic style',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'photo-urban',
    name: 'Urban Nightlife',
    category: 'Photorealistic',
    description: 'City streets at night, wet pavement, neon reflections.',
    promptModifier: 'urban night photography, wet streets, neon reflections, city lights, cinematic atmosphere, highly detailed, 8k, photorealistic',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'photo-macro',
    name: 'Macro Detail',
    category: 'Photorealistic',
    description: 'Extreme close-up, intricate details, soft lighting.',
    promptModifier: 'macro photography, extreme close-up, intricate details, soft lighting, sharp focus, bokeh, highly detailed textures',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
    mode: 'CREATE'
  },
  
  // --- Fashion ---
  {
    id: 'fashion-editorial',
    name: 'Vogue Editorial',
    category: 'Fashion',
    description: 'High fashion, avant-garde clothing, dynamic pose, editorial makeup.',
    promptModifier: 'fashion photography, vogue magazine style, haute couture, dramatic lighting, stylish pose, detailed fabric texture, professional model, editorial look',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'fashion-street',
    name: 'Urban Streetwear',
    category: 'Fashion',
    description: 'Trendy streetwear, city background, candid vibe, natural lighting.',
    promptModifier: 'streetwear fashion photography, urban setting, hypebeast style, candid shot, natural lighting, trendy outfit, sneakers, city background, 4k',
    thumbnail: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'fashion-minimal',
    name: 'Minimalist Lookbook',
    category: 'Fashion',
    description: 'Clean background, soft lighting, focus on clothing details.',
    promptModifier: 'minimalist fashion lookbook, studio background, soft diffuse lighting, focus on texture and cut, neutral colors, elegant, high quality',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'fashion-vintage',
    name: 'Vintage Vogue',
    category: 'Fashion',
    description: '60s fashion style, retro colors, film grain.',
    promptModifier: '1960s fashion photography, vintage style, retro clothing, film grain, kodachrome, nostalgic, stylish',
    thumbnail: 'https://images.unsplash.com/photo-1586078130702-d208852b4c75?w=400&q=80',
    mode: 'CREATE'
  },

  // --- Food ---
  {
    id: 'food-michelin',
    name: 'Michelin Plating',
    category: 'Food',
    description: 'Gourmet presentation, macro details, appetizing lighting.',
    promptModifier: 'professional food photography, michelin star plating, macro shot, steam rising, appetizing, soft studio lighting, 4k, delicious textures, culinary art',
    thumbnail: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'food-burger',
    name: 'Commercial Burger',
    category: 'Food',
    description: 'Juicy, stacked high, vibrant ingredients, advertisement style.',
    promptModifier: 'commercial food photography, juicy burger, melting cheese, fresh lettuce, splashing sauce, high contrast, vibrant colors, advertisement quality',
    thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'food-bakery',
    name: 'Rustic Bakery',
    category: 'Food',
    description: 'Warm tones, flour dust, fresh bread, cozy atmosphere.',
    promptModifier: 'rustic food photography, fresh baked bread, flour dust, warm lighting, wooden table, cozy atmosphere, artisan bakery, detailed texture',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'food-dessert',
    name: 'Elegant Dessert',
    category: 'Food',
    description: 'Pastry art, delicate plating, sweet aesthetic.',
    promptModifier: 'elegant dessert photography, pastry art, delicate plating, soft lighting, sweet aesthetic, high resolution, appetizing',
    thumbnail: 'https://images.unsplash.com/photo-1563729784474-d77ddb933406?w=400&q=80',
    mode: 'CREATE'
  },

  // --- Architecture ---
  {
    id: 'arch-modern',
    name: 'Modern Minimalist',
    category: 'Architecture',
    description: 'Clean lines, glass and concrete, bright daylight.',
    promptModifier: 'modern architecture, minimalist design, concrete and glass, clean lines, bright daylight, blue sky, architectural digest style, wide angle',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'interior-scandi',
    name: 'Scandi Interior',
    category: 'Architecture',
    description: 'Minimalist, bright, wooden textures, cozy atmosphere.',
    promptModifier: 'interior design, scandinavian style, minimalist, natural light, wooden textures, cozy living room, architectural photography, wide angle, hygge',
    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'arch-futuristic',
    name: 'Eco-Futurism',
    category: 'Architecture',
    description: 'Green buildings, solar punk, nature integration.',
    promptModifier: 'eco-futuristic architecture, solar punk, vertical gardens, glass structures, integration with nature, bright and hopeful, utopian city',
    thumbnail: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=400&q=80',
    mode: 'CREATE'
  },

  // --- Art & Character ---
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    category: 'Art',
    description: 'Futuristic cityscapes, neon lights, rain, high contrast.',
    promptModifier: 'cyberpunk style, neon lights, futuristic city, rain-slicked streets, high contrast, vibrant colors, digital art, blade runner aesthetic, cinematic',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'watercolor',
    name: 'Soft Watercolor',
    category: 'Art',
    description: 'Artistic, dripping paint, soft pastel colors, paper texture.',
    promptModifier: 'watercolor painting, soft pastel colors, wet on wet technique, artistic, dreamy, paper texture visible, illustration, masterpiece',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'anime-style',
    name: 'Anime Studio',
    category: 'Character',
    description: 'High quality anime style, cel shading, vibrant.',
    promptModifier: 'high quality anime style, studio ghibli inspired, cel shading, vibrant colors, detailed character design, emotional expression, 4k',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: '3d-character',
    name: 'Pixar Style 3D',
    category: 'Character',
    description: 'Cute 3D render, soft lighting, expressive eyes.',
    promptModifier: '3d character render, pixar style, cute, expressive eyes, soft studio lighting, occlusion, 4k, detailed textures, 3d animation style',
    thumbnail: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'oil-painting',
    name: 'Classic Oil',
    category: 'Art',
    description: 'Thick brushstrokes, classical composition, rich colors.',
    promptModifier: 'oil painting, thick impasto brushstrokes, classical style, rich colors, masterpiece, traditional art, canvas texture',
    thumbnail: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&q=80',
    mode: 'CREATE'
  },

  // --- Logo Design ---
  {
    id: 'logo-minimal',
    name: 'Minimalist Tech',
    category: 'Logo',
    description: 'Clean geometric vector shapes, modern, tech startup vibe.',
    promptModifier: 'minimalist vector logo design, tech company, geometric abstract shape, flat design, clean lines, white background, svg style, professional branding, blue and grey colors',
    thumbnail: 'https://images.unsplash.com/photo-1614036417651-55a05a823960?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'logo-organic',
    name: 'Organic Brand',
    category: 'Logo',
    description: 'Hand-drawn elements, nature inspired, soft palette.',
    promptModifier: 'organic logo design, botanical illustration, soft earth tones, hand-drawn style, vector, coffee shop or florist branding, elegant typography, white background',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799314348d?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'logo-gradient',
    name: 'Vibrant Gradient',
    category: 'Logo',
    description: 'Modern app icon style, fluid shapes, vivid gradients.',
    promptModifier: 'modern app icon logo, fluid shapes, vibrant color gradient, glossy finish, rounded corners, mobile app style, vector, high quality, white background',
    thumbnail: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&q=80',
    mode: 'CREATE'
  },
  {
    id: 'logo-badge',
    name: 'Retro Badge',
    category: 'Logo',
    description: 'Vintage seal style, circular text, monochrome.',
    promptModifier: 'vintage badge logo, hipster style, circular seal, bold typography, monochrome, line art, vector, white background, stamp texture',
    thumbnail: 'https://images.unsplash.com/photo-1619551734325-81aaf323686c?w=400&q=80',
    mode: 'CREATE'
  },

  // --- Editing (Requires Reference Image) ---
  {
    id: 'edit-vintage',
    name: 'Vintage Film',
    category: 'Editing',
    description: 'Apply a retro film look, grain, and color grading.',
    promptModifier: 'apply a vintage film style, add film grain, retro color grading, 1980s aesthetic, nostalgic feel, keep original composition',
    thumbnail: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'edit-sketch',
    name: 'Pencil Sketch',
    category: 'Editing',
    description: 'Transform the image into a detailed pencil sketch.',
    promptModifier: 'transform into a pencil sketch, graphite texture, hand drawn style, monochrome, artistic, rough lines, shading',
    thumbnail: 'https://images.unsplash.com/photo-1598149885212-c92671611588?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'edit-winter',
    name: 'Winter Wonderland',
    category: 'Editing',
    description: 'Change the season to winter, add snow.',
    promptModifier: 'change season to winter, add snow, frost on surfaces, cold atmosphere, winter lighting, keep original structure',
    thumbnail: 'https://images.unsplash.com/photo-1542601098-3db15d4a948e?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'edit-cyber',
    name: 'Cyberpunk Filter',
    category: 'Editing',
    description: 'Add neon lights and futuristic elements.',
    promptModifier: 'make it cyberpunk, add neon lights, futuristic elements, pink and blue lighting, high tech vibe, sci-fi transformation',
    thumbnail: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=400&q=80',
    mode: 'EDIT'
  },
   {
    id: 'edit-remove-bg',
    name: 'Isolate Subject',
    category: 'Editing',
    description: 'Remove background, studio setting.',
    promptModifier: 'change background to a clean solid studio color, isolate the main subject, professional product photography look, crisp edges',
    thumbnail: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'edit-golden-hour',
    name: 'Golden Hour',
    category: 'Editing',
    description: 'Bathe the image in warm, sunset light.',
    promptModifier: 'apply golden hour lighting, warm sunset tones, long shadows, soft glowing light, magical atmosphere, enhance colors',
    thumbnail: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9d869?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'edit-cartoon',
    name: 'Toon Filter',
    category: 'Editing',
    description: 'Convert to a 2D cartoon style.',
    promptModifier: 'convert to a flat 2D cartoon style, bold outlines, vibrant flat colors, simplified details, comic book look',
    thumbnail: 'https://images.unsplash.com/photo-1560856218-0da3189293ba?w=400&q=80',
    mode: 'EDIT'
  },

  // --- Remix / Combine ---
  {
    id: 'remix-fusion',
    name: 'Concept Fusion',
    category: 'Remix',
    description: 'Combine elements from multiple images into one.',
    promptModifier: 'create a seamless fusion of the provided images, combine the subject of the first with the style of the second, creative composition, coherent blending, 8k',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-86a5d8727436?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'remix-style-transfer',
    name: 'Style Transfer',
    category: 'Remix',
    description: 'Apply the artistic style of one image to another.',
    promptModifier: 'apply the artistic style and color palette of the second image to the content of the first image, maintain structure of the first image, high artistic quality',
    thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80',
    mode: 'EDIT'
  },
  {
    id: 'remix-collage',
    name: 'Artistic Collage',
    category: 'Remix',
    description: 'Create a mixed media collage from inputs.',
    promptModifier: 'create an artistic mixed media collage using elements from the provided images, layered composition, abstract artistic style, vibrant and creative',
    thumbnail: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?w=400&q=80',
    mode: 'EDIT'
  }
];

export const ASPECT_RATIOS: AspectRatio[] = ['1:1', '3:4', '4:3', '9:16', '16:9'];