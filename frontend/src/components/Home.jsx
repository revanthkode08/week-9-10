import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/common-api/articles`);
        setArticles(res.data.payload);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center items-center py-20 lg:py-32">
      {/* Container */}
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col space-y-6 max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to the <br /> world of <span className="text-gradient">blogging</span>
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At consectetur lorem donec massa sapien faucibus.
          </p>
          
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Link 
              to="/register" 
              className="bg-gradient-btn text-white font-bold py-4 px-8 rounded-sm tracking-widest text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] uppercase"
            >
              EXPLORE BLOGS
            </Link>
            
            <Link 
              to="/register" 
              className="border border-gray-600 hover:border-gray-400 text-white font-bold py-4 px-8 rounded-sm tracking-widest text-sm transition-all bg-transparent uppercase"
            >
              BECOME AUTHOR
            </Link>
          </div>
        </div>

        {/* Right Content - Visual Display */}
        <div className="relative h-[500px] w-full hidden lg:flex items-center justify-center">
          {/* Gradient Circle Border */}
          <div className="absolute inset-0 m-auto w-[400px] h-[400px] rounded-full border border-transparent" style={{ background: 'linear-gradient(#0f0f13, #0f0f13) padding-box, linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4) border-box', borderWidth: '2px' }}></div>
          
          {/* Blogging Image */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600" 
              alt="Blogging setup" 
              className="w-80 h-96 object-cover shadow-2xl rounded-sm border-2 border-[#1a1a24] hover:-translate-y-2 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative blurred spots */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      
      {/* Latest Articles Section */}
      <div className="container mx-auto px-6 lg:px-16 mt-32 relative z-10 w-full mb-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-widest text-white mb-10 uppercase">
          LATEST ARTICLES
        </h2>
        
        {articles.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No articles available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div 
                key={article._id}
                onClick={() => navigate(`/article/${article._id}`, { state: article })}
                className="bg-[#1a1a24] rounded-sm p-6 border border-gray-800 h-64 flex flex-col justify-between hover:border-pink-500 transition-colors duration-300 cursor-pointer shadow-lg group"
              >
                <div>
                  <span className="text-xs text-pink-500 font-bold tracking-wider uppercase mb-2 block">{article.category}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-2 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {article.content}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-4">
                  <span className="text-xs text-gray-500 font-bold tracking-widest">
                    BY {article.author?.firstName?.toUpperCase() || "AUTHOR"}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(article.createdAt).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "medium",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;