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
      } catch (err) {
        console.error('API Connection Failed:', err);
        setProjects([]);
        setError('Unable to fetch projects. Check API Token and Team ID configuration.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto gap-12">
      {/* Header Section */}
      <header className="flex flex-col gap-6 border-b-3 border-neo-black pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
            The Prawn<br />
            <span className="bg-neo-yellow px-2 inline-block transform -skew-x-6 border-3 border-neo-black shadow-neo">Projects</span>
          </h1>
          <div className="text-right">
            <h2 className="text-4xl font-bold uppercase">b</h2>
            <p className="text-xl font-medium uppercase tracking-wide bg-neo-black text-neo-white px-2 py-1 inline-block mt-2">
              I code sometimes
            </p>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="flex-grow">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-3xl font-bold uppercase decoration-neo-yellow underline decoration-4 underline-offset-4">
            Deployed Works
          </h3>
          {error && (
            <span className="text-xs font-bold bg-neo-yellow border-2 border-neo-black px-2 py-1 uppercase hidden md:inline-block">
              Connection Error
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 border-3 border-neo-black animate-pulse bg-gray-100 shadow-neo"></div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <NeoCard key={project.id} title={project.name}>
                <div className="flex flex-col h-full justify-between gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-neo-black mb-4"></div>
                    <p className="font-bold text-sm uppercase opacity-70">
                      Framework: {project.framework || 'React'}
                    </p>
                    <p className="text-xs uppercase break-all">
                      {project.link ? new URL(project.link).hostname : 'No link'}
                    </p>
                  </div>
                  
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block mt-4">
                      <NeoButton className="w-full text-center group-hover:bg-neo-yellow transition-colors">
                        View Project
                      </NeoButton>
                    </a>
                  ) : (
                    <NeoButton disabled className="w-full text-center opacity-50 cursor-not-allowed">
                      Not Deployed
                    </NeoButton>
                  )}
                </div>
              </NeoCard>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border-3 border-neo-black bg-gray-50 flex flex-col items-center justify-center gap-4">
             <div className="w-16 h-16 border-3 border-neo-black rounded-full flex items-center justify-center font-bold text-2xl">!</div>
             <div>
                <p className="text-xl font-bold uppercase text-neo-black">
                  {error ? 'API Connection Unavailable' : 'No Projects Found'}
                </p>
                <p className="text-sm mt-2 font-medium opacity-60 max-w-md mx-auto">
                   {error || 'Your Vercel account appears to have no projects or the API token is missing.'}
                </p>
             </div>
          </div>
        )}
      </main>

      {/* Contact Section */}
      <footer className="border-t-3 border-neo-black pt-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h4 className="text-4xl font-bold uppercase mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-2 items-start">
               <NeoLink href="mailto:hello@hong-yi.me">
                 hello@hong-yi.me
               </NeoLink>
               <NeoLink href="https://www.hong-yi.me" target="_blank">
                 www.hong-yi.me
               </NeoLink>
            </div>
          </div>
          <div className="text-right">
             <p className="text-sm font-bold uppercase opacity-50">
               © 2025 紅衣 (RED SHIRT)
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;