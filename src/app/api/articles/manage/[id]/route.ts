import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { id } = params
    const body = await request.json()
    const { title, content, excerpt, category, tags, featured, status } = body

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id }
    })

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Generate new slug if title changed
    let slug = existingArticle.slug
    if (title && title !== existingArticle.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')

      // Check if new slug already exists
      const slugExists = await prisma.article.findFirst({
        where: { 
          slug,
          id: { not: id }
        }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Article with this title already exists' },
          { status: 409 }
        )
      }
    }

    // Update article
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        ...(title && { title, slug }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(category && { category }),
        ...(tags && { tags: Array.isArray(tags) ? tags : [] }),
        ...(featured !== undefined && { featured }),
        ...(status && { status }),
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      message: 'Article updated successfully',
      article: updatedArticle
    })

  } catch (error) {
    console.error('Update article error:', error)
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { id } = params

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id }
    })

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // Delete article
    await prisma.article.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Article deleted successfully'
    })

  } catch (error) {
    console.error('Delete article error:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}
