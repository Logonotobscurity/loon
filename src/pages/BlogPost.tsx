import React, { useMemo } from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const files = import.meta.glob('../../content/blog/*.md', { eager: true, as: 'raw' });

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---[\s\S]*?---/);
  const fmBlock = match ? match[0] : '';
  const content = raw.replace(fmBlock, '').trim();
  const meta: Record<string, string> = {};
  fmBlock.split('\n').forEach((line) => {
    const t = line.replace(/^---|---$/g, '').trim();
    const idx = t.indexOf(':');
    if (idx > -1) {
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim();
      if (k) meta[k] = v;
    }
  });
  return { meta, content };
}

const BlogPost = () => {
  const { slug } = useParams();
  const key = Object.keys(files).find((p) => p.endsWith(`/${slug}.md`));
  const raw = key ? String((files as any)[key]) : '';
  const { meta, content } = useMemo(() => parseFrontmatter(raw), [raw]);
  const title = meta.title || (slug || 'post').replace(/-/g, ' ');

  return (
    <>
      <Meta 
        title={`${title} | LOG_ON Blog`}
        description={meta.excerpt || `Read: ${title}`}
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
            <h1 className="font-satoshi font-bold text-3xl md:text-5xl text-text-white mb-2 capitalize">{title}</h1>
            {meta.date && (
              <p className="text-text-white-60 text-sm mb-6">{new Date(meta.date).toLocaleDateString()} {meta.tags ? `• ${meta.tags}` : ''}</p>
            )}
            <article className="prose prose-invert max-w-none">
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              ) : (
                <p>Post not found.</p>
              )}
            </article>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default BlogPost;

