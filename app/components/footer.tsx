export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <a className="wordmark" href="#top" aria-label="回到塔羅牌日記頂端">
            iris<span className="brand-dot">.</span>
          </a>
          <p>
            慢慢感受，慢慢成為自己。<br />
            <span>A journal for your inner world.</span>
          </p>
          <a className="back-top" href="#top">
            回到頂端 <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Iris Tarot Journal</span>
          <p>以塔羅為靈感，記錄生活與自我探索。</p>
          <a href="/images/sources.json" target="_blank" rel="noopener noreferrer">
            PHOTOGRAPHY / UNSPLASH ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
