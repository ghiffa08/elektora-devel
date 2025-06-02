import { NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';

const articleService = new ArticleService();

// GET /api/articles/categories - Get all article categories
export async function GET() {
  try {
    const categories = await articleService.getCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch categories' 
      },
      { status: 500 }
    );
  }
}
