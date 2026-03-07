
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      slug: 'voice-to-text-future',
      title: 'The Future of Voice-to-Text Technology',
      excerpt: 'Explore how AI-powered voice transcription is revolutionizing the way we capture and organize our thoughts.',
      author: 'EchoNote Team',
      date: '2024-01-15',
      readTime: '5 min read',
      image: '/hero.png',
      category: 'Technology'
    },
    {
      id: 2,
      slug: 'productivity-tips-voice-notes',
      title: '10 Productivity Tips Using Voice Notes',
      excerpt: 'Discover practical ways to boost your productivity using voice notes for meetings, brainstorming, and daily tasks.',
      author: 'EchoNote Team',
      date: '2024-01-10',
      readTime: '8 min read',
      image: '/hero.png',
      category: 'Productivity'
    },
    {
      id: 3,
      slug: 'mobile-voice-recording-best-practices',
      title: 'Mobile Voice Recording: Best Practices',
      excerpt: 'Learn the best techniques for high-quality voice recording on mobile devices for optimal transcription results.',
      author: 'EchoNote Team',
      date: '2024-01-05',
      readTime: '6 min read',
      image: '/hero.png',
      category: 'Tips & Tricks'
    }
  ];

  return (
    <>
      <SEO 
        title="EchoNote Blog - Voice Recording & Transcription Tips"
        description="Stay updated with the latest voice-to-text technology insights, productivity tips, and best practices for voice recording and transcription."
        keywords="voice recording blog, transcription tips, voice to text technology, productivity tips, mobile recording"
        url="https://echonote.ink/blog"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        <main className="notion-container py-12 md:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-echonote-purple/10 text-echonote-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              Latest Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              EchoNote Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest insights, tips, and best practices for voice recording, transcription, and productivity.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-echonote-purple text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                    Featured
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    <Link 
                      to={`/blog/${blogPosts[0].slug}`}
                      className="hover:text-echonote-purple transition-colors"
                    >
                      {blogPosts[0].title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/blog/${blogPosts[0].slug}`}
                      className="inline-flex items-center gap-2 text-echonote-purple font-medium hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-echonote-purple px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-echonote-purple transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-echonote-purple font-medium hover:underline text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-echonote-purple to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with EchoNote
            </h3>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Get the latest tips, insights, and updates on voice technology delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <button className="bg-white text-echonote-purple px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
