"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://portfolio.harshaicreations.com/api";

interface Project {
  id: number;
  category_id: number;
  title: string;
  video_src: string;
  tools_used?: string;
  description?: string;
  is_featured?: number | boolean;
  is_active?: number | boolean;
  sort_order?: number;
  category_name?: string;
  accent_color?: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "messages" | "settings">("dashboard");
  const [loading, setLoading] = useState(true);

  // Auth State
  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewVideo, setPreviewVideo] = useState<{ src: string; title: string } | null>(null);

  // Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCatId, setFormCatId] = useState(1);
  const [formVideoSrc, setFormVideoSrc] = useState("");
  const [formTools, setFormTools] = useState("Veo 3.1, Seedance 2.0");
  const [formSort, setFormSort] = useState(1);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formActive, setFormActive] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    system_status: "Available",
    stat_completed_projects: "18+",
    stat_video_ads: "10+",
    stat_cinematic_teasers: "8+",
    contact_phone: "+91-8160587315",
    contact_email: "aicreationsbyharsh@gmail.com",
    contact_address: "A-5, Shivam Appartment, Nehru Nagar, Ichchhanath, Surat-395007",
    cloudinary_cloud_name: "la4ig9t3",
    cloudinary_api_key: "427994134557492",
    cloudinary_api_secret: "_3vxKU6--GfaMPJqs-zuc9gB9lY"
  });

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchData(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async (authToken: string) => {
    setLoading(true);
    try {
      // 1. Fetch projects
      const resP = await fetch(`${API_BASE}/projects.php?all=1`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (resP.ok) {
        const dataP = await resP.json();
        if (dataP.success) setProjects(dataP.data || []);
      }

      // 2. Fetch messages
      const resM = await fetch(`${API_BASE}/contact.php`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (resM.ok) {
        const dataM = await resM.json();
        if (dataM.success) setMessages(dataM.data.messages || []);
      }

      // 3. Fetch settings
      const resS = await fetch(`${API_BASE}/settings.php`);
      if (resS.ok) {
        const dataS = await resS.json();
        if (dataS.success && dataS.data.key_value) {
          setSettings(prev => ({ ...prev, ...dataS.data.key_value }));
        }
      }
    } catch (err) {
      console.warn("Could not fetch remote data from Hostinger backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/auth.php?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });
      const data = await res.json();

      if (data.success && data.data?.token) {
        localStorage.setItem("admin_token", data.data.token);
        setToken(data.data.token);
        showToast("Authenticated successfully!", "success");
        fetchData(data.data.token);
      } else {
        // Fallback for demo login if backend is unreachable
        if ((loginUser === "admin" || loginUser === "aicreationsbyharsh@gmail.com") && loginPass === "password123") {
          const fallbackToken = "demo_token_" + Date.now();
          localStorage.setItem("admin_token", fallbackToken);
          setToken(fallbackToken);
          showToast("Demo Terminal Mode active", "success");
          setLoading(false);
        } else {
          setLoginError(data.message || "Invalid credentials.");
        }
      }
    } catch (err) {
      // Offline / Demo fallback
      if ((loginUser === "admin" || loginUser === "aicreationsbyharsh@gmail.com") && loginPass === "password123") {
        const fallbackToken = "demo_token_" + Date.now();
        localStorage.setItem("admin_token", fallbackToken);
        setToken(fallbackToken);
        showToast("Connected in Local Mode", "success");
        setLoading(false);
      } else {
        setLoginError("Could not connect to Hostinger API. Check network or use default credentials.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    showToast("Logged out from Terminal");
  };

  const openNewProjectModal = () => {
    setEditProject(null);
    setFormTitle("");
    setFormCatId(1);
    setFormVideoSrc("");
    setFormTools("Veo 3.1, Seedance 2.0");
    setFormSort(projects.length + 1);
    setFormFeatured(false);
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditProject(proj);
    setFormTitle(proj.title);
    setFormCatId(proj.category_id);
    setFormVideoSrc(proj.video_src);
    setFormTools(proj.tools_used || "Veo 3.1");
    setFormSort(proj.sort_order || 1);
    setFormFeatured(Boolean(proj.is_featured));
    setFormActive(proj.is_active !== undefined ? Boolean(proj.is_active) : true);
    setIsModalOpen(true);
  };

  const handleVideoUpload = async (file: File) => {
    setUploading(true);
    showToast("Uploading video to Cloudinary CDN...", "success");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "video");

    try {
      const res = await fetch(`${API_BASE}/upload.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        setFormVideoSrc(data.data.url);
        showToast("Uploaded to Cloudinary successfully!", "success");
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Error uploading video file", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editProject);

    const payload = {
      id: editProject ? editProject.id : undefined,
      title: formTitle,
      category_id: formCatId,
      video_src: formVideoSrc,
      tools_used: formTools,
      sort_order: formSort,
      is_featured: formFeatured ? 1 : 0,
      is_active: formActive ? 1 : 0
    };

    try {
      const res = await fetch(`${API_BASE}/projects.php${isEdit ? `?id=${editProject?.id}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(isEdit ? "Project updated!" : "Project added!", "success");
        setIsModalOpen(false);
        if (token) fetchData(token);
      } else {
        showToast(data.message || "Failed to save project", "error");
      }
    } catch (err) {
      showToast("Network error saving project", "error");
    }
  };

  const handleDeleteProject = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/projects.php?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Project deleted", "success");
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        showToast(data.message || "Delete failed", "error");
      }
    } catch (err) {
      showToast("Error deleting project", "error");
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/projects.php?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, toggle_active: true })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, is_active: !p.is_active } : p));
        showToast("Status toggled", "success");
      }
    } catch (err) {
      showToast("Failed to toggle status", "error");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/settings.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ settings })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Settings saved successfully!", "success");
      } else {
        showToast(data.message || "Failed to save settings", "error");
      }
    } catch (err) {
      showToast("Network error saving settings", "error");
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesCat = filterCat === "all" || (filterCat === "ads" && p.category_id === 1) || (filterCat === "teasers" && p.category_id === 2);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || (p.tools_used && p.tools_used.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const unreadCount = messages.filter(m => m.status === "new").length;

  // -------------------------------------------------------------
  // RENDER: LOGIN SCREEN (If Unauthenticated)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#050508] relative">
        <div className="w-full max-w-md p-8 glass-3d rounded-3xl border border-white/10 shadow-2xl relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 border border-white/15 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black gradient-text">⚡</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white font-[family-name:var(--font-outfit)]">
              Control <span className="gradient-text">Terminal</span>
            </h1>
            <p className="text-xs text-white/50 mt-1">Authenticate to manage portfolio projects & telemetry</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Username / Email</label>
              <input
                type="text"
                value={loginUser}
                onChange={e => setLoginUser(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none transition-colors"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full btn-3d py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider mt-2 cursor-pointer shadow-lg"
            >
              {loginLoading ? "Authenticating..." : "Uplink to Terminal"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-white/40">
            <div>Default: <strong className="text-white/70">admin</strong> / <strong className="text-white/70">password123</strong></div>
            <div className="mt-1">Target API: <code className="text-cyan-400">{API_BASE}</code></div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN TERMINAL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#050508] text-white font-[family-name:var(--font-inter)] flex flex-col md:flex-row">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl border text-sm font-semibold shadow-2xl flex items-center gap-2 animate-fade-in-up ${
          toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200" : "bg-red-950/90 border-red-500/50 text-red-200"
        }`}>
          <span>{toast.type === "success" ? "✓" : "⚠️"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-950/90 border-r border-white/5 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <span className="font-black text-sm gradient-text">AI</span>
              </div>
            </div>
            <div>
              <div className="font-black text-base font-[family-name:var(--font-outfit)] gradient-text">AI Creations</div>
              <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Admin Terminal</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "dashboard" ? "bg-white/10 text-white border border-white/10 shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "projects" ? "bg-white/10 text-white border border-white/10 shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              <span>Video Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "messages" ? "bg-white/10 text-white border border-white/10 shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>Inquiries</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "settings" ? "bg-white/10 text-white border border-white/10 shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              <span>Site & Cloudinary</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-3">
          <Link href="/" target="_blank" className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            <span>Open Live Portfolio</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-white/5 mb-8">
          <div>
            <h1 className="text-2xl font-black font-[family-name:var(--font-outfit)] text-white">
              {activeTab === "dashboard" && "Dashboard & Telemetry"}
              {activeTab === "projects" && "Video Projects Manager"}
              {activeTab === "messages" && "Contact Inquiries Inbox"}
              {activeTab === "settings" && "Studio & Cloudinary Settings"}
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Host: <code className="text-cyan-400">{API_BASE}</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-[10px] font-bold text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              SYS.ACTIVE
            </span>

            {activeTab === "projects" && (
              <button
                onClick={openNewProjectModal}
                className="btn-3d px-5 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
              >
                + Add Video
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-3d p-6 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black uppercase text-white/40 tracking-wider mb-2">Total Projects</div>
                <div className="text-3xl font-black gradient-text font-[family-name:var(--font-outfit)]">{projects.length}</div>
                <div className="text-xs text-white/40 mt-1">Live in Portfolio</div>
              </div>

              <div className="glass-3d p-6 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black uppercase text-white/40 tracking-wider mb-2">AI Video Ads</div>
                <div className="text-3xl font-black text-violet-400 font-[family-name:var(--font-outfit)]">
                  {projects.filter(p => p.category_id === 1).length}
                </div>
                <div className="text-xs text-white/40 mt-1">Commercials</div>
              </div>

              <div className="glass-3d p-6 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black uppercase text-white/40 tracking-wider mb-2">AI Teasers</div>
                <div className="text-3xl font-black text-cyan-400 font-[family-name:var(--font-outfit)]">
                  {projects.filter(p => p.category_id === 2).length}
                </div>
                <div className="text-xs text-white/40 mt-1">Cinematic Films</div>
              </div>

              <div className="glass-3d p-6 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black uppercase text-white/40 tracking-wider mb-2">Inquiries</div>
                <div className="text-3xl font-black text-fuchsia-400 font-[family-name:var(--font-outfit)]">{messages.length}</div>
                <div className="text-xs text-white/40 mt-1">{unreadCount} New Unread</div>
              </div>
            </div>

            {/* Quick Projects Overview */}
            <div className="glass-3d p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-black font-[family-name:var(--font-outfit)] text-white">Recent Video Uploads</h2>
                <button onClick={() => setActiveTab("projects")} className="text-xs text-cyan-400 hover:underline">View All &rarr;</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 6).map(proj => (
                  <div key={proj.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-white truncate">{proj.title}</div>
                      <div className="text-[10px] text-white/40 uppercase">{proj.category_id === 1 ? "AI Video Ad" : "AI Teaser"}</div>
                    </div>
                    <button
                      onClick={() => setPreviewVideo({ src: proj.video_src, title: proj.title })}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 cursor-pointer"
                      title="Preview"
                    >
                      ▶
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Filter & Search */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterCat("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    filterCat === "all" ? "bg-white/15 text-white border border-white/10" : "text-white/40 hover:text-white"
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  onClick={() => setFilterCat("ads")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    filterCat === "ads" ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "text-white/40 hover:text-white"
                  }`}
                >
                  AI Ads ({projects.filter(p => p.category_id === 1).length})
                </button>
                <button
                  onClick={() => setFilterCat("teasers")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    filterCat === "teasers" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-white/40 hover:text-white"
                  }`}
                >
                  AI Teasers ({projects.filter(p => p.category_id === 2).length})
                </button>
              </div>

              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs w-64 focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Table */}
            <div className="glass-3d rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 text-white/40 uppercase font-black tracking-wider border-b border-white/5">
                    <tr>
                      <th className="p-4">Sort</th>
                      <th className="p-4">Project & Video URL</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Tools</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProjects.map(proj => (
                      <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono text-white/30">#{proj.sort_order}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setPreviewVideo({ src: proj.video_src, title: proj.title })}
                              className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold hover:scale-105 transition-transform cursor-pointer"
                              title="Play Video"
                            >
                              ▶
                            </button>
                            <div>
                              <div className="font-bold text-white text-sm">{proj.title}</div>
                              <div className="text-[10px] text-white/40 font-mono max-w-xs truncate">{proj.video_src}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            proj.category_id === 1 ? "bg-violet-500/15 text-violet-300 border border-violet-500/30" : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                          }`}>
                            {proj.category_id === 1 ? "AI Video Ad" : "AI Teaser"}
                          </span>
                        </td>
                        <td className="p-4 text-white/60">{proj.tools_used || "Veo 3.1"}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleStatus(proj.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              proj.is_active ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {proj.is_active ? "Active" : "Hidden"}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditProjectModal(proj)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 cursor-pointer"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="glass-3d p-12 rounded-2xl text-center text-white/40 text-sm">
                No inquiries submitted yet.
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="glass-3d p-6 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-base mr-3">{msg.name}</span>
                      <a href={`mailto:${msg.email}`} className="text-xs text-cyan-400 hover:underline">{msg.email}</a>
                      {msg.phone && <span className="text-xs text-white/40 ml-3">📞 {msg.phone}</span>}
                    </div>
                    <span className="text-[10px] text-white/30 font-mono">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>

                  <div className="text-sm font-semibold text-white/90">{msg.subject || "Portfolio Inquiry"}</div>
                  <div className="p-4 rounded-xl bg-black/40 text-xs text-white/70 leading-relaxed whitespace-pre-wrap">{msg.message}</div>

                  <div className="flex justify-end gap-3 pt-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Inquiry")}`}
                      className="btn-3d px-4 py-2 rounded-xl text-white font-bold text-xs uppercase cursor-pointer"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS & CLOUDINARY */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-2xl">
            <form onSubmit={handleSaveSettings} className="glass-3d p-8 rounded-2xl border border-white/5 space-y-6">
              <h2 className="text-lg font-black font-[family-name:var(--font-outfit)] text-white">Studio & Cloudinary Configuration</h2>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Cloudinary Cloud Name</label>
                <input
                  type="text"
                  value={settings.cloudinary_cloud_name}
                  onChange={e => setSettings({ ...settings, cloudinary_cloud_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Cloudinary API Key</label>
                <input
                  type="text"
                  value={settings.cloudinary_api_key}
                  onChange={e => setSettings({ ...settings, cloudinary_api_key: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Cloudinary API Secret</label>
                <input
                  type="password"
                  value={settings.cloudinary_api_secret}
                  onChange={e => setSettings({ ...settings, cloudinary_api_secret: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-4 border-t border-white/5">
                <button type="submit" className="btn-3d px-6 py-3 rounded-xl text-white font-bold text-xs uppercase cursor-pointer">
                  Save All Configuration
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MODAL: ADD / EDIT PROJECT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-3d p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-xl font-black font-[family-name:var(--font-outfit)] text-white mb-6">
              {editProject ? "Edit Video Project" : "Add New Video Project"}
            </h2>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-white/60 uppercase mb-1.5">Project Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. Tata Sierra Commercial"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-400"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-white/60 uppercase mb-1.5">Category</label>
                <select
                  value={formCatId}
                  onChange={e => setFormCatId(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-400"
                >
                  <option value={1}>AI Video Ads</option>
                  <option value={2}>AI Teasers</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-white/60 uppercase mb-1.5">Video Source URL (Cloudinary / Direct)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formVideoSrc}
                    onChange={e => setFormVideoSrc(e.target.value)}
                    placeholder="https://res.cloudinary.com/... or /videos/ads/..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-violet-400"
                    required
                  />
                  <label className="btn-3d-secondary px-4 py-2 rounded-xl text-white font-bold text-[10px] uppercase cursor-pointer flex items-center shrink-0">
                    {uploading ? "Uploading..." : "📁 Upload MP4"}
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-white/60 uppercase mb-1.5">Tools Used</label>
                <input
                  type="text"
                  value={formTools}
                  onChange={e => setFormTools(e.target.value)}
                  placeholder="Veo 3.1, Seedance 2.0"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-white/80">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={e => setFormFeatured(e.target.checked)}
                    className="accent-violet-500"
                  />
                  <span>Featured Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-white/80">
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={e => setFormActive(e.target.checked)}
                    className="accent-cyan-500"
                  />
                  <span>Active (Visible in UI)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-3d-secondary px-5 py-2.5 rounded-xl text-white/70 font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d px-6 py-2.5 rounded-xl text-white font-bold uppercase cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIDEO PREVIEW */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-3xl glass-3d rounded-3xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-bold text-sm text-white">{previewVideo.title}</span>
              <button onClick={() => setPreviewVideo(null)} className="text-white/60 hover:text-white p-1">✕</button>
            </div>
            <div className="bg-black aspect-video">
              <video src={previewVideo.src} controls autoPlay className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
