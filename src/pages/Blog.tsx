import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';

// Markdown posts loader (Vite)
const posts = Object.entries(
  import.meta.glob('../../content/blog/*.md', { eager: true, as: 'raw' })
).map(([path, raw]) => {
  const slug = path.split('/').pop()?.replace('.md', '') || 'post';
  // Simple frontmatter parse: expects first block like ---\nkey: value\n---
  const match = String(raw).match(/^---[\s\S]*?---/);
  const fm = match ? match[0] : '';
  const meta: Record<string, string> = {};
  fm.split('\n').forEach((line) => {
    const t = line.replace(/^---|---$/g, '').trim();
    const idx = t.indexOf(':');
    if (idx > -1) {
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim();
      if (k) meta[k] = v;
    }
  });
  return {
    slug,
    title: meta.title || slug.replace(/-/g, ' '),
    date: meta.date || '',
    excerpt: meta.excerpt || '',
    tags: (meta.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
  };
}).sort((a, b) => (a.date < b.date ? 1 : -1));

const Blog = () => {
  return (
    <>
      <Meta 
        title="Blog | LOG_ON"
        description="Stories and updates on autonomous agents, automation, and digital growth."
        canonical="https://www.log-on.io/blog"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.log-on.io' },
          { name: 'Blog', item: 'https://www.log-on.io/blog' }
        ]}
      />
      <GridBackground>
        <AppHeader />
        <main className="pt-20">
          <SectionWrapper className="py-16 text-center">
            <h1 className="font-satoshi font-bold text-4xl md:text-6xl text-text-white mb-4">LOG_ON Blog</h1>
            <p className="text-text-white-80 max-w-3xl mx-auto">Insights, product updates, and practical AI automation walkthroughs.</p>
          </SectionWrapper>

          <SectionWrapper className="py-12">
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className="glass-card p-6 block hover:border-primary/50 transition-all">
                  <h3 className="font-semibold text-text-white mb-2">{p.title}</h3>
                  {p.date && <p className="text-text-white-60 text-xs mb-1">{new Date(p.date).toLocaleDateString()}</p>}
                  <p className="text-text-white-70 text-sm line-clamp-3">{p.excerpt || 'Read more...'}</p>
                  {!!p.tags.length && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-text-white-10 text-text-white-70">{t}</span>
                      ))}
                    </div>
                  )}
                  <span className="text-primary text-sm mt-3 inline-block">Read More →</span>
                </a>
              ))}
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </GridBackground>
    </>
  );
};

export default Blog;

