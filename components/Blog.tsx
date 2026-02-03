
import React from 'react';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "Digital Transformation at LASUSTECH: The Journey So Far",
      category: "Innovation",
      tags: ["Digital", "LASUSTECH"],
      image: "https://picsum.photos/seed/lasu_blog1/400/250"
    },
    {
      title: "Why Biometrics is the Future of Nigerian Higher Education",
      category: "Technology",
      tags: ["Security"],
      image: "https://picsum.photos/seed/lasu_blog2/400/250"
    },
    {
      title: "5 Tips for Students to Maintain 100% Attendance",
      category: "Academics",
      tags: ["Success"],
      image: "https://picsum.photos/seed/lasu_blog3/400/250"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-indigo-600 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Campus News
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Insights from our <br />
            <span className="text-indigo-600">Academic Hub</span>
          </h2>
          <p className="text-slate-500">Stay updated with the latest in educational technology and campus announcements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                   {post.tags.map((tag, tIdx) => (
                     <span key={tIdx} className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{tag}</span>
                   ))}
                </div>
              </div>
              <div className="p-8">
                <p className="text-indigo-600 text-xs font-bold mb-3 uppercase tracking-widest">{post.category}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <button className="w-full py-3 rounded-full border border-slate-100 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
