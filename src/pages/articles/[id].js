import { useRouter } from 'next/router';
import useSWR  from 'swr';
import { fetchArticleById } from '../../lib/api';
import Article from '../../app/components/Article';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: article, error } = useSWR(id ? `/${id}` : null, fetchArticleById);

  if (error) return <div>Error loading article</div>;
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <Article article={article} />
    </div>
  );
};

export default ArticlePage;
