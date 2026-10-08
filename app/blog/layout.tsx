import Header from "../components/header";
import Footer from "../components/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="blog-layout">
      <a className="skip-link" href="#main">跳至主要內容</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
