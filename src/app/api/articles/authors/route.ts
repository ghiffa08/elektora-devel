import { NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';

const articleService = new ArticleService();

// GET /api/articles/authors - Get all article authors
export async function GET() {
  try {
    const authors = await articleService.getAuthors();
    
    return NextResponse.json({
      success: true,
      data: authors,
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch authors' 
      },
      { status: 500 }
    );
  }
}
