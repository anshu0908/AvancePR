import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowUpRight, X } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/data/blogs';
import { ClosingCtaSection } from '@/components/sections/ClosingCtaSection';

export const BlogsPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <Helmet>
        <title>PR Insights & Editorial | Avance PR — Strategic Communications</title>
        <meta
          name="description"
          content="Perspectives on narrative velocity, modern media relations, startup PR strategies, and crisis communications from the Avance PR team."
        />
        <link rel="canonical" href="https://www.avancepr.in/blogs" />
      </Helmet>

      <main id="main-content" className="pt-28 sm:pt-36 bg-transparent text-light-bg min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-14 border-b border-white/10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-brand-gold">
              Avance Perspectives
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[60px] lg:text-[76px] font-extrabold tracking-[-0.035em] leading-[1.02] text-white [text-wrap:balance]">
            PR Insights & <span className="text-brand-gold">Editorial Craft.</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[22px] text-zinc-400 max-w-3xl leading-relaxed">
            Observations from the media frontlines: how narrative architecture, founder positioning, and digital resonance drive enterprise value.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post, idx) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group p-8 rounded-3xl bg-dark-surface border border-white/10 shadow-lg hover:border-brand-gold hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-bold font-mono">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
                  </div>

                  <h2 className="text-[24px] sm:text-[28px] font-bold text-white group-hover:text-brand-gold transition-colors tracking-tight leading-snug">
                    {post.title}
                  </h2>

                  <p className="mt-4 text-[15px] text-stone-300 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-dark-bg transition-all">
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-dark-bg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Article Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl my-8 p-8 sm:p-12 rounded-3xl bg-dark-surface text-light-bg shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close article modal"
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 text-xs font-mono text-brand-gold font-bold">
                <span>{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {selectedPost.title}
              </h2>

              <div className="mt-8 space-y-5 text-stone-300 leading-relaxed text-[16px] sm:text-[17px] border-t border-white/10 pt-6">
                {selectedPost.content.map((p, pidx) => (
                  <p key={pidx}>{p}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-mono">
                  Avance PR Thought Leadership
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-gold text-dark-bg text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

        <ClosingCtaSection />
      </main>
    </>
  );
};
