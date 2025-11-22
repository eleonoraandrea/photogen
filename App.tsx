import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Image as ImageIcon, 
  Wand2, 
  History, 
  Zap, 
  Download, 
  Sparkles,
  Maximize2,
  ChevronRight,
  Palette,
  Camera,
  Layers,
  Edit3,
  UserCircle,
  Shuffle
} from 'lucide-react';

import { AppMode, GenerationConfig, GeneratedImage, Template, AspectRatio, ReferenceImage } from './types';
import { TEMPLATES, ASPECT_RATIOS } from './constants';
import { generateImage } from './services/geminiService';
import { Button, TextArea, Select, Card } from './components/UIComponents';
import { ImageUploader } from './components/ImageUploader';

const App: React.FC = () => {
  // --- State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<AppMode>(AppMode.TEMPLATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Configuration State
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [refImages, setRefImages] = useState<ReferenceImage[]>([]);
  
  // --- Lifecycle ---
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    // 1. Check if API Key is already available in the environment (e.g. .env or pre-injected)
    // This supports Free tier keys that are hardcoded or injected without the AI Studio selection UI.
    if (process.env.API_KEY) {
      setIsLoggedIn(true);
      return;
    }

    // 2. AI Studio Environment check
    if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setIsLoggedIn(hasKey);
    } else {
      // 3. Fallback for other environments (assume logged in, let API call fail if key missing)
      setIsLoggedIn(true);
    }
  };

  // --- Handlers ---

  const handleLogin = async () => {
    if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
      try {
        await (window as any).aistudio.openSelectKey();
        // Assume success and let the environment inject the key
        setIsLoggedIn(true);
        // Double check
        checkLoginStatus();
      } catch (e) {
        console.error("Login failed", e);
      }
    } else {
      // Fallback
      setIsLoggedIn(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Always create new client inside service to get latest key
      const resultBase64 = await generateImage(
        prompt, 
        aspectRatio, 
        refImages
      );

      setGeneratedImage(resultBase64);
      
      // Add to history
      const newHistoryItem: GeneratedImage = {
        id: Date.now().toString(),
        url: resultBase64,
        prompt: prompt,
        timestamp: Date.now(),
        aspectRatio
      };
      setHistory(prev => [newHistoryItem, ...prev]);

    } catch (err: any) {
      // Handle specific API key error
      if (err.message && (err.message.includes("Requested entity was not found") || err.message.includes("API Key"))) {
        setIsLoggedIn(false);
        setError("API Key session expired or invalid. Please log in again.");
      } else {
        setError(err.message || "Something went wrong during generation.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyTemplate = (template: Template) => {
    setPrompt(template.promptModifier);
    // Switch to the mode appropriate for the template
    setMode(template.mode === 'EDIT' ? AppMode.EDIT : AppMode.CREATE);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `netcat-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // --- Render Login Overlay ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
          
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/30 relative z-10">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Netcat Photo</h1>
          <p className="text-slate-400 mb-8 relative z-10">
            Professional AI Creative Suite.<br/>
            <span className="text-indigo-400">Gemini 2.5 Flash Image</span>
          </p>
          
          <div className="space-y-4 relative z-10">
            <Button 
              onClick={handleLogin} 
              className="w-full py-3 text-lg"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Connect with Google
            </Button>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Supports both <strong>Free</strong> and <strong>Paid</strong> API keys.
              <br />
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline mt-1 inline-block">
                Get your API Key here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Sections ---

  const renderSidebar = () => (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0 overflow-y-auto z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Netcat Photo
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem 
          active={mode === AppMode.TEMPLATES} 
          onClick={() => setMode(AppMode.TEMPLATES)}
          icon={<Layout size={20} />} 
          label="Templates" 
        />
        <SidebarItem 
          active={mode === AppMode.CREATE} 
          onClick={() => setMode(AppMode.CREATE)}
          icon={<Wand2 size={20} />} 
          label="Create" 
        />
        <SidebarItem 
          active={mode === AppMode.EDIT} 
          onClick={() => setMode(AppMode.EDIT)}
          icon={<Edit3 size={20} />} 
          label="Edit & Remix" 
        />
        {/* Separator */}
        <div className="h-px bg-slate-800 my-4 mx-2"></div>
        <SidebarItem 
          active={mode === AppMode.HISTORY} 
          onClick={() => setMode(AppMode.HISTORY)}
          icon={<History size={20} />} 
          label="History" 
        />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold text-slate-300">Gemini 2.5 Flash</span>
          </div>
          <p className="text-xs text-slate-500">Nano Banana Model Active</p>
        </div>
        <button onClick={handleLogin} className="w-full mt-3 text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1">
           Switch API Key
        </button>
      </div>
    </div>
  );

  const renderTemplates = () => {
    const categories = ['All', 'Photorealistic', 'Fashion', 'Logo', 'Food', 'Architecture', 'Art', 'Character', 'Editing', 'Remix'];
    const filteredTemplates = selectedCategory === 'All' 
      ? TEMPLATES 
      : TEMPLATES.filter(t => t.category === selectedCategory);

    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-2">Start Creating</h2>
          <p className="text-slate-400">Choose a style to jumpstart your imagination.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              onClick={() => applyTemplate(template)}
              className="group cursor-pointer relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-all hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80";
                  }}
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs text-white font-medium border border-white/10 backdrop-blur-sm ${
                    template.mode === 'EDIT' ? 'bg-purple-500/80' : 'bg-indigo-500/80'
                }`}>
                  {template.mode === 'EDIT' ? (template.category === 'Remix' ? 'REMIX' : 'EDIT') : 'CREATE'}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                     {template.category}
                   </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (history.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
          <History className="w-16 h-16 mb-4 opacity-20" />
          <h3 className="text-xl font-medium mb-2">No History Yet</h3>
          <p>Your generated images will appear here.</p>
          <Button 
            variant="ghost" 
            className="mt-4 text-indigo-400 hover:text-indigo-300"
            onClick={() => setMode(AppMode.TEMPLATES)}
          >
            Start Creating
          </Button>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-bold text-white">Generation History</h2>
           <Button variant="secondary" onClick={() => setHistory([])} className="text-xs h-8 px-3 bg-slate-800/50 hover:bg-red-900/20 hover:text-red-400 border-slate-700">
             Clear All
           </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {history.map((item) => (
            <div key={item.id} className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 aspect-square">
              <img 
                src={item.url} 
                alt={item.prompt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 p-4 backdrop-blur-sm">
                <div className="flex gap-2">
                  <button 
                    title="Download"
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const link = document.createElement('a');
                      link.href = item.url;
                      link.download = `netcat-${item.id}.png`;
                      link.click();
                    }}
                  >
                    <Download size={18} />
                  </button>
                  <button 
                    title="Use as Reference"
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newRef: ReferenceImage = {
                         id: Date.now().toString(),
                         data: item.url,
                         mimeType: 'image/png'
                       };
                       setRefImages([newRef]);
                       setPrompt(item.prompt);
                       setMode(AppMode.EDIT);
                    }}
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 text-center line-clamp-3 px-2">{item.prompt}</p>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-md border border-white/10">
                {item.aspectRatio}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderControls = (isEditingMode: boolean) => (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 lg:sticky lg:top-8 h-fit">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        {isEditingMode ? <Edit3 className="w-5 h-5 text-indigo-400" /> : <Layers className="w-5 h-5 text-indigo-400" />}
        {isEditingMode ? 'Edit / Remix Config' : 'Generation Config'}
      </h2>

      <div className="space-y-6">
        {/* Reference Images */}
        <div className={isEditingMode ? 'p-4 border border-indigo-500/30 rounded-xl bg-indigo-500/5' : ''}>
          {isEditingMode && (
             <div className="mb-3 flex items-start gap-2">
               <div className="bg-indigo-500 rounded-full p-1 mt-0.5"><Sparkles size={12} className="text-white" /></div>
               <p className="text-sm text-indigo-200">
                 Upload images to start editing, filtering, or mixing.
               </p>
             </div>
          )}
          <ImageUploader 
            images={refImages}
            onImagesChange={(imgs) => {
              setRefImages(imgs);
              // Auto-switch to edit if uploading in Create mode
              if (imgs.length > 0 && !isEditingMode) setMode(AppMode.EDIT);
            }}
            label={isEditingMode ? "Source Images (Required)" : "Reference Images (Optional)"}
            maxImages={4}
          />
        </div>

        <TextArea 
          label="Prompt"
          placeholder={isEditingMode 
            ? "E.g., Combine these styles, remove the background, make it cyberpunk..." 
            : "Describe your imagination... e.g., A futuristic city with flying cars"}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
        />

        <div className="grid grid-cols-2 gap-4">
           <Select 
            label="Aspect Ratio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            options={ASPECT_RATIOS.map(r => ({ value: r, label: r }))}
          />
           <div className="flex flex-col gap-2">
             <label className="text-sm font-medium text-slate-300">Model</label>
             <div className="h-[46px] flex items-center px-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm">
               <Zap className="w-3 h-3 text-yellow-400 mr-2" />
               Gemini 2.5 Flash
             </div>
           </div>
        </div>

        <Button 
          className="w-full py-4 text-lg shadow-indigo-500/20" 
          onClick={handleGenerate}
          isLoading={isLoading}
          disabled={isEditingMode && refImages.length === 0}
        >
          {isLoading ? 'Processing...' : isEditingMode ? 'Transform / Remix' : 'Generate'}
          {!isLoading && <Sparkles className="w-5 h-5 ml-2" />}
        </Button>
        
        {isEditingMode && refImages.length === 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center justify-center text-red-400 text-xs">
            <ImageIcon className="w-4 h-4 mr-2" /> At least one source image required
          </div>
        )}
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="flex flex-col h-full">
      <Card className="flex-1 min-h-[500px] flex items-center justify-center relative group bg-slate-950/50 border-slate-800">
        {isLoading ? (
          <div className="text-center space-y-6">
             <div className="relative w-24 h-24 mx-auto">
               <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
               <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
               <div className="absolute inset-4 border-4 border-purple-500/30 rounded-full"></div>
               <div className="absolute inset-4 border-r-4 border-purple-500 rounded-full animate-spin reverse duration-1000"></div>
             </div>
             <div>
               <p className="text-indigo-300 font-medium text-lg animate-pulse">Generating...</p>
               <p className="text-slate-500 text-sm mt-1">Using Nano Banana Intelligence</p>
             </div>
          </div>
        ) : generatedImage ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <img 
              src={generatedImage} 
              alt="Generated Result" 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
               <Button onClick={handleDownload} variant="secondary" className="backdrop-blur-md bg-slate-900/80">
                 <Download className="w-4 h-4" /> Download
               </Button>
               <Button onClick={() => {
                 // Use the generated image as a new reference
                 const newRef: ReferenceImage = {
                   id: Date.now().toString(),
                   data: generatedImage,
                   mimeType: 'image/png'
                 };
                 setRefImages([newRef]);
                 setMode(AppMode.EDIT);
                 setPrompt('');
               }} variant="primary" className="shadow-xl">
                 <Edit3 className="w-4 h-4" /> Edit This
               </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 p-8">
            <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
              <ImageIcon className="w-12 h-12 opacity-30" />
            </div>
            <h3 className="text-xl font-medium text-slate-300 mb-2">Canvas Empty</h3>
            <p className="text-sm max-w-md mx-auto">
              Select a template from the sidebar or configure your own prompt to start generating amazing visuals.
            </p>
          </div>
        )}
      </Card>
      
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="p-2 bg-red-500/20 rounded-full"><Zap className="w-4 h-4 text-red-500" /></div>
          <div>
             <p className="font-bold">Generation Failed</p>
             <p className="opacity-80">{error}</p>
             {!isLoggedIn && (
               <button onClick={handleLogin} className="mt-2 underline font-medium">Try Logging In Again</button>
             )}
          </div>
        </div>
      )}
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {renderSidebar()}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
             <Sparkles className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold text-white">Netcat Photo</span>
        </div>
        <Button size="sm" variant="ghost" onClick={() => setMode(mode === AppMode.HISTORY ? AppMode.TEMPLATES : AppMode.HISTORY)}>
          {mode === AppMode.HISTORY ? <Layout size={20} /> : <History size={20} />}
        </Button>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen p-4 md:p-8 flex flex-col">
        <div className="flex-1">
          {mode === AppMode.TEMPLATES && renderTemplates()}
          
          {mode === AppMode.HISTORY && renderHistory()}

          {(mode === AppMode.CREATE || mode === AppMode.EDIT) && (
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Panel: Inputs */}
              <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
                {renderControls(mode === AppMode.EDIT)}
              </div>

              {/* Right Panel: Output */}
              <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 h-full">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-2xl font-bold flex items-center gap-2">
                     Canvas
                     {generatedImage && <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded">Done</span>}
                   </h2>
                 </div>
                 {renderResult()}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm pb-4 md:pb-0">
           <p className="flex items-center justify-center gap-1">
             Powered by Gemini 2.5 Flash Image • 
             <a href="https://netcat.website" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
               netcat.website
             </a>
           </p>
        </footer>
      </main>
    </div>
  );
};

// Sidebar Helper Component
const SidebarItem: React.FC<{ 
  active: boolean; 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void 
}> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-medium' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default App;