import React from 'react';

// --- COMPONENTS ---

// A fixed sidebar for navigation, creating a more artistic and less corporate feel.
const SideMenu = ({ activePage, setActivePage }) => {
  const navLinks = ["Photographs", "Films", "Articles", "Commissioned", "About", "Contact"];

  const NavLink = ({ page }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`block w-full text-left py-1 text-lg transition-colors duration-300 ${
        activePage === page
          ? 'text-white'
          : 'text-gray-500 hover:text-white'
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-black p-8 z-50 flex flex-col">
      <div className="flex-grow">
        <button
          onClick={() => setActivePage("Home")}
          className="text-white text-3xl font-serif font-bold tracking-wider mb-12 text-left"
        >
          Swanand Kottewar
        </button>
        <nav className="space-y-4">
          {navLinks.map(link => <NavLink key={link} page={link} />)}
        </nav>
      </div>
       <div className="text-gray-600 text-xs">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
       </div>
    </div>
  );
};

// A more subtle gallery item. Information is displayed cleanly below the image.
const GalleryItem = ({ title, category, imageUrl }) => (
  <div className="group">
    <div className="overflow-hidden mb-2">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto object-cover transition-opacity duration-500 group-hover:opacity-80" 
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/1a1a1a/4a4a4a?text=Image+Not+Found'; }}
        />
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="text-sm text-gray-500">{category}</p>
  </div>
);

// --- PAGES ---

// The home page is now a pure, full-screen visual canvas.
const HomePage = () => (
  <div className="fixed inset-0 z-0">
    <div
      className="absolute inset-0 bg-cover bg-center animate-fade-in"
      style={{ backgroundImage: "url('https://placehold.co/1920x1080/000000/333333?text=sk')", opacity: 0.8 }}
    ></div>
     <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
  </div>
);

// A clean, uniform grid for photographs.
const PhotographsPage = () => {
    const photos = [
        { title: "Street Portrait", category: "Portrait", imageUrl: "https://placehold.co/800x600/333/fff?text=Photo+1" },
        { title: "Urban Landscape", category: "Landscape", imageUrl: "https://placehold.co/800x1000/333/fff?text=Photo+2" },
        { title: "Abstract Light", category: "Abstract", imageUrl: "https://placehold.co/800x600/333/fff?text=Photo+3" },
        { title: "Monochrome Mood", category: "B&W", imageUrl: "https://placehold.co/800x600/333/fff?text=Photo+4" },
        { title: "Nature's Frame", category: "Nature", imageUrl: "https://placehold.co/800x1000/333/fff?text=Photo+5" },
        { title: "City at Night", category: "Urban", imageUrl: "https://placehold.co/800x600/333/fff?text=Photo+6" },
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-white">Photographs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {photos.map((photo, index) => <GalleryItem key={index} {...photo} />)}
            </div>
        </div>
    );
};

// Films page using the same clean grid layout.
const FilmsPage = () => {
    const films = [
        { title: "Haaalat", category: "Short Documentary (2020)", imageUrl: "https://placehold.co/800x1100/1a1a1a/ffffff?text=Haaalat" },
        { title: "gadha ghum raha hai", category: "Short Fiction (2022)", imageUrl: "https://placehold.co/800x1100/1a1a1a/ffffff?text=gadha+ghum" },
        { title: "Cycle of Life", category: "Short Fiction (2024)", imageUrl: "https://placehold.co/800x1100/1a1a1a/ffffff?text=Cycle+of+Life" },
        { title: "Baal Diwas", category: "Short Fiction (2022)", imageUrl: "https://placehold.co/800x1100/1a1a1a/ffffff?text=Baal+Diwas" },
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-white">Films</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {films.map((film, index) => <GalleryItem key={index} {...film} />)}
            </div>
        </div>
    );
};

// A more refined and readable layout for articles.
const ArticlesPage = () => {
    const articles = [
        { title: "The Art of Visual Storytelling", excerpt: "Exploring the nuances of narrative construction through cinematography and editing, focusing on how subtle visual cues can build a powerful emotional landscape for the audience.", date: "2024-08-15" },
        { title: "Space and Narrative in Cinema", excerpt: "A deep dive into how architectural spaces and environments shape cinematic stories, arguing that location is not just a backdrop but a character in itself.", date: "2024-05-20" },
        { title: "Deconstructing the Documentary Form", excerpt: "An analysis of modern documentary filmmaking techniques and the ethical considerations of representing reality, questioning the line between observation and construction.", date: "2023-11-02" },
    ];

    return (
        <div className="animate-fade-in max-w-4xl">
            <h2 className="text-4xl font-serif font-bold mb-12 text-white">Articles</h2>
            <div className="space-y-10">
                {articles.map((article, index) => (
                    <div key={index} className="group">
                        <p className="text-sm text-gray-500 mb-1">{article.date}</p>
                        <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">{article.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{article.excerpt}</p>
                        <button className="text-white hover:text-gray-300 mt-3 font-semibold text-sm">Read More &rarr;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Commissioned work page.
const CommissionedPage = () => {
    const works = [
        { title: "Nisargavedh - Nature for Future", category: "Documentary (2025)", imageUrl: "https://placehold.co/800x600/2c2c2c/fff?text=Nisargavedh" },
        { title: "Anokha Dhaaga - Tata Power", category: "CSR Video (2024)", imageUrl: "https://placehold.co/800x600/2c2c2c/fff?text=Anokha+Dhaaga" },
    ];

    return (
        <div className="animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-8 text-white">Commissioned Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {works.map((work, index) => <GalleryItem key={index} {...work} />)}
            </div>
        </div>
    );
};

// A cleaner, more focused About page.
const AboutPage = () => {
    return (
        <div className="animate-fade-in max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <img src="https://i.imgur.com/example.png" alt="Swanand Kottewar" className="w-full h-auto object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x500/1a1a1a/4a4a4a?text=S+K'; }}/>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-4xl font-serif font-bold mb-6 text-white">About</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        Based out of Nagpur (IN), my interests lie in the exploration of image, space and narrative, and the possibilities offered by cinematic expressions.
                    </p>
                    
                    <div className="text-sm text-gray-400 space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Experience</h3>
                        <p><span className="text-gray-200">2024-25:</span> Managed Social Media and Outreach for Nagpur Edition of Pune Int. Film Festival</p>
                        <p><span className="text-gray-200">2023:</span> Observer at Doc. Edge, and Mentee in PSBT Doccomune</p>
                        <p><span className="text-gray-200">2022-25:</span> Curates and Organizes film screenings at Meraki, Nagpur</p>
                        <p><span className="text-gray-200">2022-24:</span> Cinematographer and Sound Recordist with Pankaj Rishi Kumar</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Minimalist contact page.
const ContactPage = () => {
    return (
        <div className="animate-fade-in max-w-xl">
            <h2 className="text-4xl font-serif font-bold mb-6 text-white">Contact</h2>
            <p className="text-lg text-gray-400 mb-8">
                Available for collaborations, commissions, and conversations.
            </p>
            <div className="space-y-4 text-lg">
                <a href="mailto:swanandkottewar@gmail.com" className="block text-white hover:text-gray-400 transition-colors">
                    swanandkottewar@gmail.com
                </a>
                <p className="text-gray-500">+91-8956126016</p>
            </div>
        </div>
    );
};


// --- MAIN APP ---
export default function App() {
    const [activePage, setActivePage] = React.useState("Home");
    
    // This effect handles the page transition animation.
    const [isAnimating, setIsAnimating] = React.useState(false);
    const changePage = (page) => {
        if (page !== activePage) {
            setIsAnimating(true);
            setTimeout(() => {
                setActivePage(page);
                setIsAnimating(false);
            }, 300); // Duration should match animation-out
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case "Home": return null; // Home page is handled separately as a background
            case "Photographs": return <PhotographsPage />;
            case "Films": return <FilmsPage />;
            case "Articles": return <ArticlesPage />;
            case "Commissioned": return <CommissionedPage />;
            case "About": return <AboutPage />;
            case "Contact": return <ContactPage />;
            default: return null;
        }
    };

    return (
        <div className="bg-black min-h-screen font-serif text-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
              .font-serif { font-family: 'Lora', serif; }
              .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
              .animate-fade-out { animation: fadeOut 0.3s ease-in forwards; }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
            `}</style>
            
            <SideMenu activePage={activePage} setActivePage={changePage} />
            
            {/* The home page is a special background case */}
            {activePage === 'Home' && <HomePage />}

            {/* Main content area for all other pages */}
            <main className={`ml-64 p-8 md:p-12 transition-opacity duration-300 ${isAnimating ? 'animate-fade-out' : ''}`}>
                {renderPage()}
            </main>
        </div>
    );
}
