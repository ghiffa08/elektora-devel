import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';

const articleService = new ArticleService();

// GET /api/articles/recent - Get recent articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const articles = await articleService.getRecentArticles(limit);
    
    return NextResponse.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch recent articles' 
      },
      { status: 500 }
    );
  }
}
