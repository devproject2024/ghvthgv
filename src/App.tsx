import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/**
 * ROUTING
 * -----------------------------------------------------------------
 * HashRouter is used so the site works when served as a single static
 * file from any host (URLs look like /#/work). When you deploy to a host
 * with SPA rewrites (Vercel, Netlify, Cloudflare Pages), swap HashRouter
 * for BrowserRouter below — nothing else needs to change.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
