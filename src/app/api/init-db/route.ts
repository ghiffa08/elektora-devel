import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, getDatabase } from '@/lib/database';

// POST /api/init-db - Initialize database tables
export async function POST() {
  try {
    await initDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initialize database' 
      },
      { status: 500 }
    );
  }
}

// GET /api/init-db - Check database status
export async function GET() {
  try {
    // Try to get the database connection (will throw if not initialized)
    let connection;
    try {
      connection = getDatabase();
    } catch (error) {
      return NextResponse.json({
        success: true,
        initialized: false,
        message: 'Database needs initialization',
      });
    }
    
    // Check if articles table exists
    const tableExists = await new Promise<boolean>((resolve) => {
      connection.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='articles'",
        (err, row) => {
          if (err) {
            resolve(false);
          } else {
            resolve(!!row);
          }
        }
      );
    });

    return NextResponse.json({
      success: true,
      initialized: tableExists,
      message: tableExists ? 'Database is initialized' : 'Database needs initialization',
    });
  } catch (error) {
    console.error('Error checking database status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check database status' 
      },
      { status: 500 }
    );
  }
}
