import React from 'react';
import Meta from '../components/Meta';
import { GridBackground } from '../components/Global/GridBackground';
import { AppHeader } from '../components/Header/AppHeader';
import { SectionWrapper } from '../components/Global/SectionWrapper';
import { Footer } from '../components/Footer/Footer';

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
              {[1,2,3].map((i) => (
                <a key={i} href={`/blog/sample-post-${i}`} className="glass-card p-6 block hover:border-primary/50 transition-all">
                  <h3 className="font-semibold text-text-white mb-2">Sample Post {i}</h3>
                  <p className="text-text-white-70 text-sm">A short teaser introducing the topic and value to the reader.</p>
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

