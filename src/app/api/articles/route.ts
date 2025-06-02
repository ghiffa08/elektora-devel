import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';
import { ArticleCreateData, ArticleFilters } from '@/types/article';

const articleService = new ArticleService();

// GET /api/articles - Get all articles with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filters: ArticleFilters = {
      category: searchParams.get('category') || undefined,
      author: searchParams.get('author') || undefined,
      search: searchParams.get('search') || undefined,
      published: searchParams.get('published') === 'true' ? true : 
                searchParams.get('published') === 'false' ? false : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    const result = await articleService.getArticles(filters);
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch articles' 
      },
      { status: 500 }
    );
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Title and content are required' 
        },
        { status: 400 }
      );
    }

    const articleData: ArticleCreateData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      featured_image: body.featured_image,
      author: body.author || 'Anonymous',
      category: body.category || 'General',
      tags: body.tags || '',
      published: body.published || false,
    };

    const article = await articleService.createArticle(articleData);
    
    return NextResponse.json({
      success: true,
      data: article,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create article' 
      },
      { status: 500 }
    );
  }
}
