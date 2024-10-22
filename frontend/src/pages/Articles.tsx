import React, { useState, useEffect } from "react";
import ScrollableLayout from "../layouts/ScrollableLayout";
import { Client } from "@notionhq/client";

export interface ArticlesProps {}

interface Article {
  id: string;
  title: string;
  // Add other properties as needed
}

export const Articles: React.FC<ArticlesProps> = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const notion = new Client({ auth: process.env.REACT_APP_NOTION_API_KEY });
        const response = await notion.databases.query({
          database_id: process.env.REACT_APP_NOTION_DATABASE_ID as string,
        });
        
        console.log(response)
        const fetchedArticles = response.results.map((page: any) => ({
          id: page.id,
          title: page.properties.Title.title[0].plain_text,
          // Map other properties as needed
        }));
        
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to fetch articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ScrollableLayout>
      <div className="container mx-auto px-4 py-8 dark:text-white">
        <h1 className="text-4xl font-bold mb-8">Articles</h1>
        {loading && <p>Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.id} className="border p-4 rounded">
                <h2 className="text-2xl font-semibold">{article.title}</h2>
                {/* Add more article details here */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ScrollableLayout>
  );
};