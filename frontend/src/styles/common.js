// src/styles/common.js
// Theme: Dark Gaming/Blog — #0f0f13 background, white text, gradient accents

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#0f0f13] min-h-screen text-gray-100";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16 relative z-10";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-[#1a1a24] rounded-2xl p-7 border border-gray-800 hover:border-gray-600 transition-colors duration-200 cursor-pointer shadow-lg";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-extrabold text-white tracking-tight leading-none mb-2";
export const headingClass = "text-2xl font-bold text-white tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-gray-200 tracking-tight";
export const bodyText = "text-gray-400 leading-relaxed";
export const mutedText = "text-sm text-gray-500";
export const linkClass = "text-pink-500 hover:text-pink-400 transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-btn text-white font-bold px-6 py-2.5 rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer text-sm tracking-widest";
export const secondaryBtn =
  "border border-gray-600 text-white font-bold px-6 py-2.5 rounded-sm hover:border-gray-400 transition-all cursor-pointer text-sm tracking-widest bg-transparent";
export const ghostBtn = "text-gray-300 font-medium hover:text-white transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-[#1a1a24] rounded-2xl p-10 max-w-4xl mx-auto border border-gray-800 shadow-2xl relative z-10";
export const formTitle = "text-3xl font-extrabold text-white tracking-tight text-center mb-7";
export const labelClass = "text-xs font-bold text-gray-400 tracking-widest uppercase mb-1.5 block";
export const inputClass =
  "w-full bg-[#0f0f13] border border-gray-700 rounded-sm px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all";
export const formGroup = "mb-5";
export const submitBtn =
  "w-full bg-gradient-btn text-white font-bold py-3.5 rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer mt-4 text-sm tracking-widest";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-[#0f0f13]/80 backdrop-blur-xl border-b border-gray-800 px-8 h-[70px] flex items-center sticky top-0 z-50";
export const navContainerClass = "max-w-7xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-xl font-extrabold text-white tracking-widest flex items-center gap-2";
export const navLinksClass = "flex items-center gap-8";
export const navLinkClass = "text-sm font-bold tracking-wider text-gray-300 hover:text-white transition-colors";
export const navLinkActiveClass = "text-sm font-bold tracking-wider text-white border-b-2 border-pink-500 pb-1";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-[#1a1a24] p-7 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col gap-3 cursor-pointer hover:-translate-y-1 shadow-lg";
export const articleTitle = "text-lg font-bold text-white leading-snug tracking-tight";
export const articleExcerpt = "text-sm text-gray-400 leading-relaxed";
export const articleMeta = "text-xs text-gray-500";
export const articleBody = "text-gray-300 leading-[1.85] text-[0.95rem] max-w-3xl";
export const timestampClass = "text-xs text-gray-500 flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-bold text-pink-400 uppercase tracking-widest w-fit border border-pink-500/30 px-2 py-0.5 rounded-full";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-4xl mx-auto px-6 py-14 relative z-10";

export const articleHeader = "mb-10 flex flex-col gap-4";

export const articleCategory = "text-[0.75rem] font-bold uppercase tracking-widest text-pink-500";

export const articleMainTitle = "text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-gray-800 py-4 text-sm text-gray-400";

export const authorInfo = "flex items-center gap-3 font-bold text-white";

export const articleContent = "text-gray-300 leading-[1.9] text-[1.05rem] whitespace-pre-line mt-8";

export const articleFooter = "border-t border-gray-800 mt-12 pt-6 text-sm text-gray-500";
// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-3 mt-6";

export const editBtn = "bg-gradient-btn text-white font-bold text-xs px-5 py-2 rounded-sm shadow-md transition";

export const deleteBtn = "border border-red-500/50 hover:bg-red-500/10 text-red-500 font-bold text-xs px-5 py-2 rounded-sm transition";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm bg-green-500/10 text-green-400 border border-green-500/20";

export const articleStatusDeleted =
  "absolute top-4 right-4 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm bg-red-500/10 text-red-400 border border-red-500/20";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-red-500/10 text-red-400 border border-red-500/20 rounded-sm px-4 py-3 text-sm font-medium";
export const successClass =
  "bg-green-500/10 text-green-400 border border-green-500/20 rounded-sm px-4 py-3 text-sm font-medium";
export const loadingClass = "text-pink-500/80 text-sm font-bold tracking-widest uppercase animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-gray-500 font-medium py-16 text-sm";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-gray-800 my-10";
