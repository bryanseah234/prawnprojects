import React, { useEffect, useState } from 'react';
import { NeoCard, NeoButton, NeoLink } from './components/NeoComponents';
import { fetchProjects } from './services/vercelService';
import { Project } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Execute server-side fetch to Vercel API
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        console.error('API Connection Failed:', err);
        setProjects([]);
        setError(err.message || 'Unable to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Helper to clean URL for display
  const formatUrl = (urlStr: string) => {
    try {
      const hostname = new URL(urlStr).hostname;
      return hostname.replace(/^www\./, '');
    } catch (e) {
      return 'No Link';
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto gap-8 md:gap-12">
      {/* Header Section */}
      <header className="flex justify-center items-center border-b-3 border-neo-black pb-6 md:pb-8 pt-4 overflow-hidden">
        {/* Responsive text sizing: uses vw units on mobile to force fit, clamps on larger screens */}
        <h1 className="text-[6vw] sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none text-center whitespace-nowrap w-full">
          The Prawn <span className="bg-neo-grey px-2 inline-block transform -skew-x-6 border-3 border-neo-black shadow-neo ml-1 sm:ml-4">Projects</span>
        </h1>
      </header>

      {/* Projects Grid */}
      <main className="flex-grow">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-bold uppercase decoration-neo-grey underline decoration-4 underline-offset-4">
            Deployed Works
          </h3>
          {error && (
            <span className="text-xs font-bold bg-neo-grey border-2 border-neo-black px-2 py-1 uppercase inline-block">
              Connection Error
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="border-3 border-neo-black bg-neo-white p-6 shadow-neo h-72 flex flex-col"
              >
                {/* Title Skeleton */}
                <div className="h-8 bg-neo-black w-3/4 mb-4 animate-pulse" />
                
                {/* Divider */}
                <div className="border-b-3 border-neo-black mb-6 w-full opacity-20" />
                
                {/* Metadata Skeleton */}
                <div className="space-y-4 flex-grow">
                  <div className="h-4 bg-neo-grey w-1/2 border-2 border-neo-black animate-pulse" />
                  <div className="h-4 bg-neo-grey w-2/3 border-2 border-neo-black animate-pulse" style={{ animationDelay: '100ms' }} />
                  <div className="h-4 bg-neo-grey w-1/3 border-2 border-neo-black animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>
                
                {/* Button Skeleton */}
                <div className="h-12 w-full border-3 border-neo-black bg-gray-100 mt-4 animate-pulse" />
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <NeoCard key={project.id} title={project.name}>
                <div className="flex flex-col h-full justify-between gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-neo-black mb-4"></div>
                    <p className="font-bold text-sm uppercase opacity-70">
                      Framework: {project.framework || 'React'}
                    </p>
                    <p className="text-xs uppercase truncate max-w-full font-medium tracking-tight">
                      {project.link ? formatUrl(project.link) : ''}
                    </p>
                  </div>
                  
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block mt-4">
                      <NeoButton className="w-full text-center group-hover:bg-neo-grey transition-colors text-sm md:text-base">
                        View Project
                      </NeoButton>
                    </a>
                  ) : (
                    <NeoButton disabled className="w-full text-center opacity-50 cursor-not-allowed text-sm md:text-base">
                      Not Deployed
                    </NeoButton>
                  )}
                </div>
              </NeoCard>
            ))}
          </div>
        ) : (
          <div className="p-8 md:p-12 text-center border-3 border-neo-black bg-gray-50 flex flex-col items-center justify-center gap-4">
             <div className="w-16 h-16 border-3 border-neo-black rounded-full flex items-center justify-center font-bold text-2xl">!</div>
             <div>
                <p className="text-xl font-bold uppercase text-neo-black">
                  {error ? 'API Connection Unavailable' : 'No Projects Found'}
                </p>
                <p className="text-sm mt-2 font-medium opacity-60 max-w-md mx-auto">
                   {error ? 
                     'Please check the browser console for specific debugging details regarding your VERCEL_API_TOKEN.' : 
                     'Your Vercel account appears to have no projects.'}
                </p>
             </div>
          </div>
        )}
      </main>

      {/* Contact Section */}
      <footer className="border-t-3 border-neo-black pt-8 pb-12">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <h4 className="text-3xl md:text-4xl font-bold uppercase">Get In Touch</h4>
          <div className="flex flex-col gap-2 items-center">
             <NeoLink href="mailto:hello@hong-yi.me">
               hello@hong-yi.me
             </NeoLink>
             <NeoLink href="https://www.hong-yi.me" target="_blank">
               www.hong-yi.me
             </NeoLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;