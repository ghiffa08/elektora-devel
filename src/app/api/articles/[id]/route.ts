import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/services/articleService';
import { ArticleUpdateData } from '@/types/article';

const articleService = new ArticleService();

// GET /api/articles/[id] - Get article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid article ID' 
        },
        { status: 400 }
      );
    }

    const article = await articleService.getArticleById(id);
    
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
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch article' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid article ID' 
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    const updateData: ArticleUpdateData = {
      id: id,
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      featured_image: body.featured_image,
      author: body.author,
      category: body.category,
      tags: body.tags,
      published: body.published,
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof ArticleUpdateData] === undefined) {
        delete updateData[key as keyof ArticleUpdateData];
      }
    });

    const article = await articleService.updateArticle(id, updateData);
    
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
    console.error('Error updating article:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update article' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid article ID' 
        },
        { status: 400 }
      );
    }

    const success = await articleService.deleteArticle(id);
    
    if (!success) {
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
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete article' 
      },
      { status: 500 }
    );
  }
}
