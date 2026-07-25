
import React from 'react';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/app/lib/data';
import BlogClient from './blog-client';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Verdant Journal`,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  return <BlogClient slug={slug} />;
}
