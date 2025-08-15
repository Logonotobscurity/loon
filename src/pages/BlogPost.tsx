import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const title = (slug || 'post').replace(/-/g, ' ');
  return (
    <>
      <Meta 
        title={`${title} | LOG_ON Blog`}
        description={`Read: ${title}`}
        canonical={`https://www.log-on.io/blog/${slug}`}
        breadcrumbs={[
          { name: 'Home', item: 'https://www.log-on.io' },
          { name: 'Blog', item: 'https://www.log-on.io/blog' },
          { name: title, item: `https://www.log-on.io/blog/${slug}` }
        ]}
      />
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="py-12">
            <nav className="text-sm mb-4">
              <Link to="/blog" className="text-text-white-60 hover:text-primary">← Back to Blog</Link>
            </nav>
            <h1 className="font-satoshi font-bold text-3xl md:text-5xl text-text-white mb-4 capitalize">{title}</h1>
            <article className="prose prose-invert max-w-none">
              <p>Coming soon. This is a placeholder for the blog post content.</p>
            </article>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default BlogPost;

