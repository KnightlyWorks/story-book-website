import fs from 'fs'
import path from 'path'

export async function handler(event, context) {
  try {
    let data

    if (process.env.NETLIFY_DEV === 'true') {
      const filePath = path.resolve('./data.json')
      data = fs.readFileSync(filePath, 'utf-8')
    } else {
      const url = 'https://raw.githubusercontent.com/KnightlyWorks/story-book-data-private/main/data.json'
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.GH_DATA_TOKEN}`,
        },
      })

      if (!response.ok) {
        return {
          statusCode: response.status,
          body: JSON.stringify({ error: 'Failed to fetch data.json' }),
        }
      }

      data = await response.text()
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
      body: data,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
