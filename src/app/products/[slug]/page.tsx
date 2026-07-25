
import React from 'react';
import { Metadata } from 'next';
import { PLANTS } from '@/app/lib/data';
import ProductClient from './product-client';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plant = PLANTS.find((p) => p.slug === slug);

  if (!plant) {
    return {
      title: 'Species Not Found',
    };
  }

  return {
    title: plant.name,
    description: plant.description,
    openGraph: {
      title: `${plant.name} | VerdantNest`,
      description: plant.description,
      images: [{ url: plant.image }],
    },
  };
}

export async function generateStaticParams() {
  return PLANTS.map((plant) => ({
    slug: plant.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const plant = PLANTS.find((p) => p.slug === slug);

  if (!plant) return null;

  // JSON-LD Structured Data for Product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: plant.name,
    image: plant.image,
    description: plant.description,
    sku: plant.id,
    brand: {
      '@type': 'Brand',
      name: 'VerdantNest',
    },
    offers: {
      '@type': 'Offer',
      url: `https://verdantnest.com/products/${plant.slug}`,
      priceCurrency: 'USD',
      price: plant.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: plant.rating,
      reviewCount: 24, // Hardcoded for MVP, should be dynamic in production
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient slug={slug} />
    </>
  );
}
