// Main app — page navigation, TOC, state persistence.

const { useState, useEffect, useMemo, useCallback } = React;

const PAGES = [
  { key:'cover',    part:'封面',      title:'封面',                    C: window.PageCover },
  { key:'howto',    part:'使用说明',  title:'怎样使用这份手册',         C: window.PageHowToUse },
  { key:'why',      part:'第一部分',  title:'为什么会面临这个决定',     C: window.PageWhy },
  { key:'role',     part:'第一部分',  title:'为什么需要您来做决定',     C: window.PageYourRole },
  { key:'self',     part:'第一部分',  title:'您现在的状态',            C: window.PageSelfCheck },
  { key:'stroke',   part:'第二部分',  title:'什么是脑卒中',            C: window.PageStroke },
  { key:'trach',    part:'第二部分',  title:'气管切开是怎么回事',       C: window.PageWhatIsTrach },
  { key:'options',  part:'第二部分',  title:'您面临的三个选择',         C: window.PageOptions },
  { key:'proscons', part:'第二部分',  title:'好处与风险',              C: window.PageProsCons },
  { key:'faq',      part:'第二部分',  title:'您可能想知道的问题',       C: window.PageFAQ },
  { key:'stories',  part:'第三部分',  title:'其他家庭是怎么想的',       C: window.PageStories },
  { key:'recall',   part:'第四部分',  title:'回忆您的家人',            C: window.PageRecall },
  { key:'qol',      part:'第四部分',  title:'关于生活质量的思考',       C: window.PageQoL },
  { key:'family',   part:'第四部分',  title:'家庭的实际情况',           C: window.PageFamily },
  { key:'emotion',  part:'第五部分',  title:'您现在可能有的感受',       C: window.PageEmotions },
  { key:'resource', part:'第五部分',  title:'照顾好自己 · 资源',        C: window.PageResources },
  { key:'lean',     part:'第六部分',  title:'此刻，您心里在想什么',     C: window.PageLean },
  { key:'ready',    part:'第六部分',  title:'您准备好了吗',            C: window.PageReady },
  { key:'checklist',part:'第六部分',  title:'与医疗团队沟通清单',       C: window.PageChecklist },
  { key:'after',    part:'第六部分',  title:'做出决定之后',            C: window.PageAfter },
];

// Group TOC by section
const TOC = [
  { label:'开始',      desc:'欢迎 · 使用说明',            pages:[0,1] },
  { label:'第一部分',  desc:'认识您的处境',               pages:[2,3,4] },
  { label:'第二部分',  desc:'了解气管切开',               pages:[5,6,7,8,9] },
  { label:'第三部分',  desc:'其他家庭是怎么想的',         pages:[10] },
  { label:'第四部分',  desc:'明确什么是重要的',           pages:[11,12,13] },
  { label:'第五部分',  desc:'情感支持与资源',             pages:[14,15] },
  { label:'第六部分',  desc:'准备做出决定 · 打印清单',     pages:[16,17,18,19] },
];

const STORAGE_KEY = 'ptda_state_v1';
const PAGE_KEY = 'ptda_page_v1';

function App() {
  const [i, setI] = useState(() => {
    try { const saved = +(localStorage.getItem(PAGE_KEY) || 0); return Math.min(Math.max(0, saved), PAGES.length - 1); }
    catch { return 0; }
  });
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  });
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => { try { localStorage.setItem(PAGE_KEY, String(i)); } catch {} }, [i]);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} }, [state]);

  // scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [i]);

  const update = useCallback((k, v) => {
    setState(s => ({ ...s, [k]: v }));
  }, []);

  const go = (n) => setI(Math.min(Math.max(0, n), PAGES.length - 1));

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (tocOpen) return;
      if (e.target && /TEXTAREA|INPUT/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(i + 1); }
      if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { e.preventDefault(); go(i - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, tocOpen]);

  const P = PAGES[i];
  const Component = P.C;

  return (
    <div className="app" data-screen-label={`${String(i+1).padStart(2,'0')} ${P.title}`}>
      {/* topbar */}
      <div className="topbar print-hide">
        <div className="topbar-inner">
          <div className="brand">
            <span>脑卒中气管切开代理决策辅助工具</span>
          </div>
          <div className="progress">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${((i+1)/PAGES.length)*100}%` }}/>
            </div>
            <span className="progress-label">{i+1} / {PAGES.length}</span>
          </div>
          <button className="menu-btn" onClick={() => setTocOpen(true)}>☰ 目录</button>
        </div>
      </div>

      {/* page */}
      <div className="page-wrap">
        <Component state={state} update={update} />
      </div>

      {/* nav */}
      <div className="navbar print-hide">
        <div className="nav-inner">
          <button className="nav-btn" disabled={i === 0} onClick={() => go(i - 1)}>
            ← 上一页
          </button>
          <div className="nav-title">{P.part} · {P.title}</div>
          <button
            className={'nav-btn ' + (i === PAGES.length - 1 ? '' : 'primary')}
            disabled={i === PAGES.length - 1}
            onClick={() => go(i + 1)}>
            下一页 →
          </button>
        </div>
      </div>

      {/* TOC */}
      {tocOpen && (
        <div className="toc-overlay" onClick={() => setTocOpen(false)}>
          <div className="toc-panel" onClick={e => e.stopPropagation()} style={{position:'relative'}}>
            <button className="toc-close" onClick={() => setTocOpen(false)}>×</button>
            <h3>目录</h3>
            {TOC.map(sec => (
              <div key={sec.label} style={{marginBottom:16}}>
                <div style={{fontSize:12, letterSpacing:'.1em', color:'var(--ink-muted)', marginBottom:6, paddingLeft:4}}>
                  {sec.label.toUpperCase()} · {sec.desc}
                </div>
                {sec.pages.map(pi => (
                  <div key={pi}
                    className={'toc-item' + (pi === i ? ' active' : '')}
                    onClick={() => { go(pi); setTocOpen(false); }}>
                    <div className="toc-num">{String(pi+1).padStart(2,'0')}</div>
                    <div className="toc-text">
                      <div className="toc-title">{PAGES[pi].title}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
