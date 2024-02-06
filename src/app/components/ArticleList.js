'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetchFreshArticles, fetchNewestArticles, fetchOldestArticle } from '../../lib/api';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { Favorite, ModeComment } from '@mui/icons-material';
import '../../app/style.css'


const Article = ({ article }) => (
  <div className='box'>
    <h2>
      <Link href={`/articles/${article.id}`}>
        {article.title}
      </Link>
    </h2>
    <p>{article.description}</p>
    <div className='tags'>
      <p>{article.tags}</p>
    </div>
    <div className='box__footer'>
      <div className='reactions'>
        <Favorite />
        <p>{article.positive_reactions_count}</p>
        <ModeComment />
        <p>{article.comments_count}</p>
      </div>
      <div className='time_to_read'>
        <p>{article.reading_time_minutes} min read</p>
      </div>
    </div>
      
  </div>
);

const ArticleList = () => {
  const { data: freshArticles, mutate: mutateFresh } = useSWR('/api/fresh-articles', fetchFreshArticles);
  const { data: newestArticle, mutate: mutateNewest } = useSWR('/api/all-articles', fetchNewestArticles);
  const { data: oldestArticle, mutate: mutateOldest } = useSWR('/api/rising-articles', fetchOldestArticle);

  const [value, setValue] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (value) {
      case '1':
        mutateFresh();
        break;
      case '2':
        mutateNewest();
        break;
      case '3':
        mutateOldest();
        break;
      default:
        break;
    }
  }, [value]);

  return (
    <div className='box__home'>
      <h1>Dev To Blog</h1>
      <Box sx={{ width: '100%', typography: 'body1', marginBottom: 2 }}>
        <TextField
          label='Text here something interresting...'
          variant="outlined"
          sx={{
            width: '100%',
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered>
              <Tab label="Most Relevant" value="1" />
              <Tab label="Newest" value="2" />
              <Tab label="Oldest" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {freshArticles && Array.isArray(freshArticles) ? (
              freshArticles
                .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((article) => (
                  <Article key={article.id} article={article} />
                ))
            ) : (
              <div>Loading fresh articles...</div>
            )}
          </TabPanel>
          <TabPanel value="2">
            {newestArticle && Array.isArray(newestArticle) ? (
              newestArticle
                .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((article) => (
                  <Article key={article.id} article={article} />
                ))
            ) : (
              <div>Loading newest articles...</div>
            )}
          </TabPanel>
          <TabPanel value="3">
            {oldestArticle && Array.isArray(oldestArticle) ? (
              oldestArticle
                .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((article) => (
                  <Article key={article.id} article={article} />
                ))
            ) : (
              <div>Loading oldest articles...</div>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ArticleList;
