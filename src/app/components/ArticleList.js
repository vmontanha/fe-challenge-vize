'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetchRecentArticles } from '../../lib/api';
import * as React from 'react';

const Article = ({ article }) => (
  <div>
    <h2>
      <Link href={`/articles/${article.id}`}>
        {article.title}
      </Link>
    </h2>
    <p>{article.description}</p>
  </div>
);

const ArticleList = () => {
  const { data: articles, mutate } = useSWR('src/pages/recente-articles/recent-articles.js', fetchRecentArticles);

  useEffect(() => {
    mutate();
  }, []);

  if (!articles) return <div>Loading...</div>;

  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
