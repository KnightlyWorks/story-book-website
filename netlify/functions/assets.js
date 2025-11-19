import fs from 'fs'
import path from 'path'

// Netlify function to serve assets (images, icons, etc.)
export async function handler(event) {
    try {
        // extract the file path after /.netlify/functions/assets/
        let filePath = event.path.replace('/.netlify/functions/assets/', '')
        if (filePath.startsWith('/')) filePath = filePath.slice(1)

            if (!filePath) {
                return { statusCode: 400, body: 'Please provide a file path!' }
            }

            let buffer
            let contentType = 'application/octet-stream'

            if (process.env.NODE_ENV === 'development') {
                // Видаляємо префікс assets/ якщо він є
                const cleanPath = filePath.replace(/^assets\//, '')
                const localPath = path.resolve('./assets', cleanPath)
                console.log('[Assets] Local dev mode, reading:', localPath)

                if (!fs.existsSync(localPath)) {
                    console.warn('[Assets] File not found locally:', localPath)
                    return { statusCode: 404, body: `File not found locally: ${filePath}` }
                }

                buffer = fs.readFileSync(localPath)

                if (localPath.endsWith('.png')) contentType = 'image/png'
                    else if (localPath.endsWith('.jpg') || localPath.endsWith('.jpeg')) contentType = 'image/jpeg'
                        else if (localPath.endsWith('.gif')) contentType = 'image/gif'
                            else if (localPath.endsWith('.svg')) contentType = 'image/svg+xml'
                                else if (localPath.endsWith('.webp')) contentType = 'image/webp'
                                    else if (localPath.endsWith('.json')) contentType = 'application/json'

            } else {
                // Production: fetch directly using filePath
                const url = `https://raw.githubusercontent.com/KnightlyWorks/story-book-data-private/main/${filePath}`
                console.log('[Assets] Production mode, fetching from GitHub:', url)

                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${process.env.GH_DATA_TOKEN}` },
                })

                if (!response.ok) {
                    console.warn('[Assets] File not found on GitHub:', filePath)
                    return { statusCode: response.status, body: `File not found on GitHub: ${filePath}` }
                }

                const arrayBuffer = await response.arrayBuffer()
                buffer = Buffer.from(arrayBuffer)
                contentType = response.headers.get('content-type') || 'application/octet-stream'
            }

            return {
                statusCode: 200,
                isBase64Encoded: true,
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=3600',
                },
                body: buffer.toString('base64'),
            }

    } catch (err) {
        console.error('[Assets] Unexpected error:', err)
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
    }
}
