import express from 'express';
import cors from 'cors';
import { Client } from '@notionhq/client';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import dotenv from 'dotenv';

dotenv.config();

interface Article {
  id: string;
  properties: {
    [key: string]: any;
  };
  url: string | null;
}

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ data: 'This is test data from the backend' });
});

// Add an endpoint to fetch articles from Notion
app.get('/api/articles', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
    });

    const articles: Article[] = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page: PageObjectResponse) => {
        const properties: { [key: string]: any } = {};
        
        for (const [key, value] of Object.entries(page.properties)) {
          switch (value.type) {
            case 'title':
              properties[key] = value.title[0]?.plain_text || '';
              break;
            case 'rich_text':
              properties[key] = value.rich_text[0]?.plain_text || '';
              break;
            case 'date':
              properties[key] = value.date?.start || null;
              break;
            case 'checkbox':
              properties[key] = value.checkbox;
              break;
            case 'multi_select':
              properties[key] = value.multi_select.map((item) => item.name);
              break;
            case 'select':
              properties[key] = value.select?.name || null;
              break;
            case 'number':
              properties[key] = value.number;
              break;
            case 'url':
              properties[key] = value.url;
              break;
            default:
              properties[key] = JSON.stringify(value);
          }
        }

        return {
          id: page.id,
          properties,
          url: page.url,
        };
      });

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles from Notion:', error);
    res.status(500).json({ error: 'Failed to fetch articles from Notion' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
