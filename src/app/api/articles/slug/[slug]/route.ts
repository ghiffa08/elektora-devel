import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';

const articleService = new ArticleService();

// GET /api/articles/slug/[slug] - Get article by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    if (!slug) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Slug is required' 
        },
        { status: 400 }
      );
    }

    const article = await articleService.getArticleBySlug(slug);
    
    if (!article) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Article not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch article' 
      },
      { status: 500 }
    );
  }
}
