import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import type { Session } from 'next-auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any) as Session | null
    
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
    }    const body = await request.json()
    const { title, content, excerpt, category, tags, featured = false, published = false } = body

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      )
    }

    // Check if article with same title already exists
    const existingArticle = await prisma.article.findFirst({
      where: { title: title.trim() }
    })

    if (existingArticle) {
      return NextResponse.json(
        { error: 'Article with this title already exists' },
        { status: 400 }
      )
    }

    // Process tags - convert array to JSON string
    const processedTags = Array.isArray(tags) 
      ? JSON.stringify(tags.filter(tag => tag && tag.trim())) 
      : JSON.stringify([])

    // Create article
    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt?.trim() || content.substring(0, 200).trim() + '...',
        category: category.trim(),
        authorId: user.id,
        tags: processedTags,
        featured: Boolean(featured),
        published: Boolean(published),
      }
    })

    return NextResponse.json({
      message: 'Article created successfully',
      article
    })

  } catch (error) {
    console.error('Create article error:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
