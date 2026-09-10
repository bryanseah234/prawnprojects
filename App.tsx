import React from 'react';
import { NeoCard, NeoProjectLink, NeoLink } from './components/NeoComponents';
import { projects, catalogUpdatedAt } from './services/vercelService';

const updatedDate = new Intl.DateTimeFormat('en-SG', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Singapore',
}).format(new Date(catalogUpdatedAt));

const App: React.FC = () => (
  <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto gap-8 md:gap-12">
    <header className="flex justify-center items-center border-b-3 border-neo-black pb-6 md:pb-8 pt-4 overflow-hidden">
      <h1 className="text-[6vw] sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none text-center whitespace-nowrap w-full">
        The Prawn <span className="bg-neo-grey px-2 inline-block transform -skew-x-6 border-3 border-neo-black shadow-neo ml-1 sm:ml-4">Projects</span>
      </h1>
    </header>

    <main className="flex-grow">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold uppercase decoration-neo-grey underline decoration-4 underline-offset-4">Deployed Works</h2>
        <p className="text-xs font-bold uppercase">
          {projects.length} projects · Updated <time dateTime={catalogUpdatedAt}>{updatedDate}</time>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map(project => (
          <NeoCard key={project.id} title={project.name}>
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="space-y-2">
                <div className="w-full h-2 bg-neo-black mb-4" />
                <p className="font-bold text-sm uppercase opacity-70">Framework: {project.framework || 'Website'}</p>
                <p className="text-xs uppercase truncate max-w-full font-medium tracking-tight">{new URL(project.link).hostname.replace(/^www\./, '')}</p>
              </div>
              <NeoProjectLink href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name}`} className="block mt-4 w-full text-center group-hover:bg-neo-grey text-sm md:text-base">
                View Project
              </NeoProjectLink>
            </div>
          </NeoCard>
        ))}
      </div>
    </main>

    <footer className="border-t-3 border-neo-black pt-8 pb-12">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold uppercase">Get In Touch</h2>
        <div className="flex flex-col gap-2 items-center">
          <NeoLink href="mailto:hello@hong-yi.me">hello@hong-yi.me</NeoLink>
          <NeoLink href="https://www.hong-yi.me" target="_blank" rel="noopener noreferrer">www.hong-yi.me</NeoLink>
        </div>
      </div>
    </footer>
  </div>
);

export default App;
