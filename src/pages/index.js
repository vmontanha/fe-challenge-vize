import ArticleList from '../app/components/ArticleList';
import '../pages/Home/Home.css'
const Home = () => {
  return (
    <div className='container'>
      <h1>Dev.to Blog</h1>
      <ArticleList />
    </div>
  );
};

export default Home;