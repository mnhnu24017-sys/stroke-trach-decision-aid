// Content pages (1..N) for the decision aid.
// Each page is a React component rendered inside <Page>.
// Pages receive { state, update } for persisting user choices.

const { useState } = React;

// ---------- Helpers ----------

function Radio({ value, options, onChange }) {
  return (
    <div className="radio-row">
      {options.map(o => (
        <button
          key={o}
          className={value === o ? 'on' : ''}
          onClick={() => onChange(o)}
        >{o}</button>
      ))}
    </div>
  );
}

function CheckItem({ checked, onToggle, dim, children }) {
  return (
    <li
      className={(checked ? 'on ' : '') + (dim ? 'dim' : '')}
      onClick={onToggle}
    >
      <span className="check-box" />
      <span>{children}</span>
    </li>
  );
}

// ---------- Page 1: Cover ----------
function PageCover() {
  return (
    <div className="page">
      <div style={{textAlign:'center', padding:'20px 0 10px'}}>
        <div style={{fontSize:13, letterSpacing:'.16em', color:'var(--ink-muted)', marginBottom:20}}>
          代 理 决 策 辅 助 工 具
        </div>
        <h1 className="page-title big">脑卒中患者<br/>气管切开</h1>
        <div style={{color:'var(--ink-muted)', fontSize:15, marginTop:20, fontFamily:'"Noto Serif SC", serif'}}>
          —— 写给正在为家人做决定的您 ——
        </div>
      </div>
      <hr className="rule" style={{margin:'40px auto', width:'40%'}}/>
      <p className="lead">我们理解，此刻的您可能正在经历一段艰难的时光。</p>
      <p className="lead">您的家人生病了，而您需要帮助他做出一个重要的医疗决定。</p>
      <p className="lead">这份手册是为了帮助您——<br/>
        帮助您了解情况、整理思绪、减轻压力，<br/>
        最终做出一个您和家人都能安心的决定。</p>
      <div className="callout" style={{marginTop:30, textAlign:'center', fontSize:17, fontFamily:'"Noto Serif SC", serif'}}>
        您不是一个人在面对这一切。
      </div>
    </div>
  );
}

// ---------- Page 2: How to use ----------
function PageHowToUse() {
  return (
    <div className="page">
      <span className="eyebrow">使用说明</span>
      <h1 className="page-title">怎样使用这份手册</h1>
      <p className="lead" style={{marginTop:24}}>亲爱的家属：</p>
      <p>这份手册是专门为像您这样需要帮助家人做医疗决定的人准备的。您可以自己阅读，也可以和家人一起阅读，或者请医护人员帮您讲解。</p>
      <p>如果您现在非常难过，或者脑子里一片空白，这是完全正常的反应。您不需要强迫自己马上看下去。可以先放在手边，等心情稍微平复一些再打开。</p>

      <h3 className="sub-title">请记住：</h3>
      <ul className="check-list" style={{pointerEvents:'none'}}>
        <li className="on"><span className="check-box"/><span>这不是考试，没有标准答案</span></li>
        <li className="on"><span className="check-box"/><span>您不需要一口气读完，可以随时停下来休息</span></li>
        <li className="on"><span className="check-box"/><span>手册里的问题是帮您思考用的，不一定要写下答案</span></li>
        <li className="on"><span className="check-box"/><span>如果有不明白的地方，随时可以问医生或护士</span></li>
      </ul>

      <div className="callout amber" style={{marginTop:24}}>
        <div className="callout-title">小贴士</div>
        您随时可以点击右上角的"目录"按钮，跳到任何一个章节。
      </div>
    </div>
  );
}

// ---------- Page 3: Part 1 - Why ----------
function PageWhy() {
  return (
    <div className="page">
      <span className="eyebrow">第一部分 · 认识您的处境</span>
      <h1 className="page-title">为什么会面临这个决定？</h1>
      <p style={{marginTop:22}}>您的家人因为脑卒中（也叫中风）住进了医院。脑卒中会影响大脑控制身体的能力，有时候会让人暂时无法自己呼吸。</p>
      <p>现在，您的家人正在通过一根插在嘴里的管子（叫<b>气管插管</b>）连接呼吸机，帮助他呼吸。但这根管子不能在嘴里放太久，时间长了会损伤喉咙和嘴巴。</p>
      <div className="callout">
        这种情况并不少见——大约<b>每三到五位</b>重症脑卒中患者中，就有一位需要考虑气管切开。
      </div>
      <p>如果医生判断您的家人短期内还不能自己呼吸，就会建议做<b>气管切开手术</b>——在脖子上开一个小口，把呼吸管换到那里，这样可以更安全地帮助他呼吸更长时间。</p>

      <div className="fig">
        <img src="assets/compare.png" alt="口腔插管与气管切开对比图"/>
        <div className="fig-caption">图 1：口腔插管（左）与气管切开（右）两种辅助呼吸方式对比</div>
      </div>

      <p style={{marginTop:24, color:'var(--ink)'}}><b>简单来说：</b>在脖子上开一个小口，把呼吸管换到那里。嘴里的管子如果放太久，会损伤口腔和喉咙，还容易引起感染。换到脖子上以后，嘴巴和喉咙就不再被管子压着了，也更方便医护人员清理呼吸道、进行后续的治疗和康复。</p>
    </div>
  );
}

// ---------- Page 4: Part 1 - Your role ----------
function PageYourRole() {
  return (
    <div className="page">
      <span className="eyebrow">第一部分 · 认识您的处境</span>
      <h1 className="page-title">为什么需要您来做这个决定？</h1>
      <p style={{marginTop:22}}>因为脑卒中的影响，您的家人现在可能无法清醒地表达自己的想法。在这种情况下，最了解他、最关心他的人——也就是<b>您</b>——需要帮助他做出这个决定。</p>
      <div className="callout" style={{fontSize:17, lineHeight:1.85}}>
        这不是要您替他决定生或死，而是要您站在他的角度，想一想：<br/>
        <span style={{fontFamily:'"Noto Serif SC", serif', fontSize:19, color:'var(--accent-ink)'}}>「如果他能说话，他会希望怎么做？」</span>
      </div>
      <p>您是在帮他<b>表达他的意愿</b>，而不是在替他做主。这是一件充满爱的事情。</p>
      <p>如果您不太确定他会怎么想，也没关系。后面的内容会帮您一步一步地回忆和思考。</p>

      <h2 className="section-title">您有时间慢慢考虑</h2>
      <p>这个决定很重要，但在大多数情况下，您<b>不需要在几分钟内</b>就做出选择。具体有多少时间来考虑，取决于患者的病情——请直接问医生：</p>
      <div className="callout amber" style={{fontFamily:'"Noto Serif SC", serif', fontSize:17}}>
        "我还有多少时间可以考虑？"
      </div>
      <p>这是您完全有权利问的问题。在这段时间里，您可以：</p>
      <ul className="check-list" style={{pointerEvents:'none'}}>
        <li className="on"><span className="check-box"/><span>看看这份手册，了解气管切开是怎么回事</span></li>
        <li className="on"><span className="check-box"/><span>把不懂的问题记下来，找医生护士解答</span></li>
        <li className="on"><span className="check-box"/><span>和家人商量，听听大家的想法</span></li>
        <li className="on"><span className="check-box"/><span>给自己一些时间消化这些信息，不要勉强自己马上做决定</span></li>
      </ul>
    </div>
  );
}

// ---------- Page 5: Self-check ----------
function PageSelfCheck({ state, update }) {
  const QS = [
    { k:'q1', label:'我对气管切开这件事了解吗？', opts:['很了解','有一些了解','不太了解','完全不了解'] },
    { k:'q2', label:'我知道各个选项的好处和风险吗？', opts:['清楚','大概知道','不太清楚','完全不知道'] },
    { k:'q3', label:'我清楚家人可能会希望怎么做吗？', opts:['清楚','大概知道','不太清楚','完全不知道'] },
    { k:'q4', label:'我对做这个决定感到有压力吗？', opts:['非常有压力','有一些压力','压力不大','没有压力'] },
    { k:'q5', label:'我担心做出让自己后悔的决定吗？', opts:['非常担心','有些担心','不太担心','不担心'] },
    { k:'q6', label:'我觉得现在的信息太多，需要时间消化吗？', opts:['非常需要','有一些','还好','不需要'] },
  ];
  return (
    <div className="page">
      <span className="eyebrow">第一部分 · 认识您的处境</span>
      <h1 className="page-title">先了解一下您现在的状态</h1>
      <p style={{marginTop:20}}>下面几个问题可以帮您了解自己目前的想法，请根据实际感受勾选。这不是测试，只是帮您整理思绪。</p>

      {QS.map(q => (
        <div className="qa-card" key={q.k}>
          <div className="q">{q.label}</div>
          <Radio value={state[q.k]} options={q.opts} onChange={v => update(q.k, v)} />
        </div>
      ))}

      <div className="callout amber">
        <div className="callout-title">小提示</div>
        不管您选了什么，都没关系。这些问题只是帮您看看自己现在的状态。接下来的内容会针对这些方面提供信息和帮助。
      </div>
    </div>
  );
}

// ---------- Page 6: Part 2 - Stroke ----------
function PageStroke() {
  return (
    <div className="page">
      <span className="eyebrow">第二部分 · 了解气管切开</span>
      <h1 className="page-title">什么是脑卒中？</h1>
      <p style={{marginTop:22}}>脑卒中，老百姓常说的<b>中风</b>，是因为大脑的血管出了问题——要么是<b>血管堵住了</b>（脑梗死），要么是<b>血管破裂出血了</b>（脑出血）。</p>
      <p>大脑是我们身体的指挥中心，控制着我们的思考、说话、活动，也控制着呼吸。当脑卒中比较严重时，大脑可能暂时无法正常指挥身体，患者可能会：</p>
      <ul className="check-list" style={{pointerEvents:'none'}}>
        <li className="on"><span className="check-box"/><span>意识不清醒，无法说话或回应</span></li>
        <li className="on"><span className="check-box"/><span>无法自己呼吸，需要呼吸机帮助</span></li>
        <li className="on"><span className="check-box"/><span>吞咽困难，无法自己吃东西</span></li>
      </ul>
      <div className="callout">
        大脑有一定的<b>恢复能力</b>。有些患者经过治疗和康复，可以逐渐恢复一部分功能。但恢复需要时间，每个人的情况也不一样——有的人恢复得多一些，有的人恢复得少一些，也有的人可能很难恢复。医生会根据您家人的具体情况来判断。
      </div>
    </div>
  );
}

// ---------- Page 7: Part 2 - What is trach ----------
function PageWhatIsTrach() {
  return (
    <div className="page">
      <span className="eyebrow">第二部分 · 了解气管切开</span>
      <h1 className="page-title">气管切开是怎么回事？</h1>
      <div className="fig">
        <img src="assets/anatomy.png" alt="气管切开示意图" style={{maxHeight:360}}/>
        <div className="fig-caption">图 2：气管切开示意图</div>
      </div>
      <p style={{marginTop:18}}>气管切开是一个小手术。医生会在脖子前面靠下的位置开一个<b>小切口</b>（大约2-3厘米），然后在气管（就是我们呼吸时空气经过的管道）上开一个小孔，放入一根短管子。这根管子可以连接呼吸机，帮助患者呼吸。</p>

      <h3 className="sub-title">关于手术方式</h3>
      <p>气管切开有两种做法——<b>传统的外科切开</b>和<b>经皮穿刺扩张</b>。经皮穿刺扩张是目前比较常用的方式，切口更小。医生会根据患者的具体情况选择最合适的方式，您不需要为此做选择。</p>

      <h3 className="sub-title">手术疼吗？时间长吗？</h3>
      <p>手术是在<b>麻醉下</b>进行的，患者不会感到疼痛。整个手术时间不长，一般在<b>半小时左右</b>，具体因手术方式和患者情况而异。</p>
    </div>
  );
}

// ---------- Page 8: Options A/B/C ----------
function PageOptions() {
  return (
    <div className="page">
      <span className="eyebrow">第二部分 · 了解气管切开</span>
      <h1 className="page-title">您现在面临的选择</h1>
      <div className="callout rose" style={{marginTop:20}}>
        <b>请注意：</b>不是所有选择都适合每一位患者。请和医生确认哪些选项适合您的家人。
      </div>

      <div className="option-card A">
        <span className="opt-label">选项 A</span>
        <h4>进行气管切开</h4>
        <p>医生会根据患者的病情，判断什么时候做最合适。目前医学界对于最佳时机还没有统一的标准——有的医生建议在插管后较早进行，有的建议再观察一段时间。您可以问医生：</p>
        <p style={{marginTop:10, fontFamily:'"Noto Serif SC", serif', color:'var(--accent-ink)'}}>"我家人什么时候做比较好？早做和晚做有什么区别？"</p>
      </div>

      <div className="option-card B">
        <span className="opt-label">选项 B</span>
        <h4>气管切开 + 设定观察期</h4>
        <p>先进行气管切开，同时和医疗团队约定一个<b>观察期限</b>。在这段时间里积极治疗和康复，定期评估病情变化。如果观察期结束后没有明显好转，再和医疗团队讨论下一步方案。</p>
        <p style={{marginTop:8}}>观察期的长短由您和医生共同商定。这个选项让您有机会<b>"先试一试"</b>，同时为后续决定留有余地。</p>
      </div>

      <div className="option-card C">
        <span className="opt-label">选项 C</span>
        <h4>不做气管切开</h4>
        <p>选择不进行气管切开，把治疗重点放在<b>减轻患者的不适</b>上，让他尽量舒适。这意味着接受疾病的自然进程。如果您考虑这个选项，可以问医生：</p>
        <p style={{marginTop:10, fontFamily:'"Noto Serif SC", serif', color:'var(--accent-ink)'}}>"不做的话，接下来会怎样？怎样让他尽量不受罪？"</p>
      </div>
    </div>
  );
}

// ---------- Page 9: Pros/cons ----------
function PageProsCons() {
  return (
    <div className="page">
      <span className="eyebrow">第二部分 · 了解气管切开</span>
      <h1 className="page-title">好处与风险</h1>
      <p style={{marginTop:20}}>任何医疗决定都有好处，也有风险。了解这些可以帮您做出更明智的选择。</p>

      <div className="proscons">
        <div className="pc-col">
          <h4><span className="dot"/>气管切开的好处</h4>
          <ul>
            <li>解除嘴里管子对口腔、喉咙的长期压迫</li>
            <li>方便清理呼吸道的痰液</li>
            <li>可能降低肺部感染的机会</li>
            <li>患者更容易进行康复锻炼</li>
            <li>病情稳定后可能更早离开 ICU</li>
          </ul>
        </div>
        <div className="pc-col cons">
          <h4><span className="dot"/>气管切开的风险</h4>
          <ul>
            <li>手术本身的风险：出血、感染等</li>
            <li>脖子上会有一个切口，需要每天护理</li>
            <li>初期无法正常说话</li>
            <li>少数人可能出现气管狭窄等远期并发症</li>
            <li>不能保证患者一定能恢复</li>
          </ul>
        </div>
      </div>

      <h2 className="section-title">如果用数字来看</h2>
      <div className="callout amber" style={{marginTop:6}}>
        以下数据来自多项研究，是一个<b>大致范围</b>。您家人的实际情况可能与此不同，请向医生确认。
      </div>

      <div className="stat">
        <div className="stat-top"><span className="stat-label">切口局部感染</span><span className="stat-val">约 5% – 6%</span></div>
        <div className="stat-bar"><span style={{width:'6%'}}/></div>
      </div>
      <div className="stat">
        <div className="stat-top"><span className="stat-label">远期并发症（气管狭窄等）</span><span className="stat-val">约 14% – 45%</span></div>
        <div className="stat-bar"><span style={{width:'30%'}}/></div>
      </div>
      <div className="stat">
        <div className="stat-top"><span className="stat-label">病情好转后成功拔管</span><span className="stat-val">约 60%</span></div>
        <div className="stat-bar"><span style={{width:'60%'}}/></div>
      </div>
      <div className="stat">
        <div className="stat-top"><span className="stat-label">无肺部感染者 · 拔管时间</span><span className="stat-val">约 3 周</span></div>
        <div className="stat-bar"><span style={{width:'35%'}}/></div>
      </div>
      <div className="stat">
        <div className="stat-top"><span className="stat-label">有肺部感染者 · 拔管时间</span><span className="stat-val">5 – 6 周或更久</span></div>
        <div className="stat-bar"><span style={{width:'65%'}}/></div>
      </div>

      <div className="callout" style={{marginTop:20}}>
        <b>关于死亡风险：</b>气管切开本身导致死亡的风险很低。患者的生存情况主要取决于脑卒中本身的严重程度，而不是气管切开手术。
      </div>
    </div>
  );
}

// ---------- Page 10: FAQ ----------
function PageFAQ() {
  const FAQ = [
    ['气管切开手术疼吗？', '手术是在麻醉下进行的，患者不会感到疼痛。术后可能会有一些不适，医生会给予适当的处理。'],
    ['气管切开后还能说话吗？', '刚做完时因为空气不经过声带，无法正常说话。但随着病情恢复，部分患者可以通过特殊的说话装置恢复语言交流。'],
    ['气管切开后还能吃东西吗？', '这取决于患者的吞咽功能恢复情况。有些患者可以慢慢恢复经口吃饭，有些可能需要通过管子来进食。医生会根据具体情况评估。'],
    ['气管切开后能出院吗？', '可以的。当患者病情稳定后，即使还带着气管切开管，也可以出院。出院前，护士会教您怎么在家护理。'],
    ['气管切开管可以拔掉吗？', '如果患者恢复了自主呼吸能力，经过医生评估后，是可以把管子拔掉的。大约六成的患者最终成功拔管。时间因人而异，短的三周左右，长的可能需要一两个月甚至更久。拔管后脖子上的小口通常会慢慢自己长好。'],
    ['做了气管切开，如果没好转怎么办？', '您可以随时和医疗团队讨论，调整治疗方案。做了气管切开并不意味着必须无限期地维持，后续可以根据病情变化做出新的决定。'],
    ['早做和晚做有什么区别？', '目前的研究显示，较早进行气管切开可能缩短 ICU 住院时间、减少肺部感染的机会，但对最终的恢复程度和存活率影响不大。具体到您的家人适合什么时候做，需要医生综合判断。'],
  ];
  const [open, setOpen] = useState(0);
  return (
    <div className="page">
      <span className="eyebrow">第二部分 · 了解气管切开</span>
      <h1 className="page-title">您可能想知道的问题</h1>
      <p style={{marginTop:20}}>点击问题可展开答案。</p>
      {FAQ.map(([q, a], i) => (
        <div className="qa-card" key={i} style={{cursor:'pointer'}} onClick={() => setOpen(open === i ? -1 : i)}>
          <div className="q" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: open === i ? 10 : 0}}>
            <span>Q{i + 1}. {q}</span>
            <span style={{color:'var(--ink-muted)', fontSize:14, fontFamily:'sans-serif'}}>{open === i ? '−' : '+'}</span>
          </div>
          {open === i && <div style={{color:'var(--ink-soft)', fontSize:15, lineHeight:1.75, paddingTop:6, borderTop:'1px dashed var(--rule)'}}>{a}</div>}
        </div>
      ))}
    </div>
  );
}

// ---------- Page 11: Stories ----------
function PageStories() {
  return (
    <div className="page">
      <span className="eyebrow">第三部分 · 其他家庭是怎么想的</span>
      <h1 className="page-title">您不是一个人</h1>
      <p style={{marginTop:20}}>面临类似决定的家属，每个人的感受和选择都不一样。以下是几位家属的<b>真实心声</b>，来自护理学研究者对他们的访谈记录。</p>
      <p>这些不是建议，只是想让您知道：很多人都经历过和您一样的艰难时刻。</p>

      <div className="story">
        <div className="story-tag">情境一 · 尊重他的意思</div>
        <blockquote>（他）事先表示不想与连接到身体的各种机器一起生活。</blockquote>
        <cite>—— 一位家属，家人需要依赖机器维持生命<br/>Tanaka 等（2024），日本，维持生命治疗患者的代理决策家属访谈</cite>
      </div>

      <div className="story">
        <div className="story-tag">情境二 · 不想放弃</div>
        <blockquote>我爱人出现了脑水肿，颅压很高。用药或者手术，感觉不进行手术后面好不了，就算好了，也不知道到什么程度。我很不确定，可又有谁能告诉我当时该怎么选择呢？</blockquote>
        <cite>—— 一位妻子，丈夫因脑卒中住进 ICU<br/>郭子宁等（2024），中国，重症脑卒中患者家属访谈</cite>
      </div>

      <div className="story">
        <div className="story-tag">情境三 · 家人意见不一致</div>
        <blockquote>几个哥哥意见很多，他们有时不想父亲受罪而极为抗拒一些治疗，这让我在决策时顾虑很多。</blockquote>
        <cite>—— 一位女儿，父亲因脑卒中住进 ICU<br/>郭子宁等（2024），中国，重症脑卒中患者家属访谈</cite>
      </div>

      <div className="story">
        <div className="story-tag">情境三 · 独自面对</div>
        <blockquote>如果我的妹妹能够跟我一起讨论并参与决策，那我的压力将会小很多。</blockquote>
        <cite>—— 一位儿子，独自面对决策<br/>郭子宁等（2024），中国，重症脑卒中患者家属访谈</cite>
      </div>

      <div className="story">
        <div className="story-tag">情境四 · 先试一试</div>
        <blockquote>当时的计划就是先看看，在接下来两三个月里，他能不能恢复我说的那些功能。但如果我们没有看到好转，或者情况在走下坡路，那我们就准备让他在剩下的时间里舒服一些。</blockquote>
        <cite>—— 一位家属，家人因严重急性脑损伤住进 ICU<br/>Goss 等（2024），美国，严重急性脑损伤患者代理决策者访谈</cite>
      </div>

      <div className="callout" style={{marginTop:24, fontFamily:'"Noto Serif SC", serif', fontSize:16.5}}>
        担心、纠结、害怕做错、压力大——这些感受都是正常的。不管您最终做出什么选择，只要是<b>认真想过</b>的，就是负责任的决定。
      </div>
    </div>
  );
}

// ---------- Page 12: Part 4 - Recall ----------
function PageRecall() {
  return (
    <div className="page">
      <span className="eyebrow">第四部分 · 明确什么是重要的</span>
      <h1 className="page-title">回忆您的家人</h1>
      <p style={{marginTop:20}}>这一部分可能是最难的，但也是最重要的。我们希望帮助您站在家人的角度，想一想他可能会怎么选择。</p>
      <div className="callout">
        在思考这些问题的时候，您可能会发现一件不容易的事：区分 <b>"他可能会怎么想"</b> 和 <b>"我自己希望怎样"</b>。这两个想法有时候会重合，有时候会冲突。两种想法都很重要，都值得被认真对待。
      </div>
      <p>下面这些问题是帮您回忆和思考的，您可以在心里默想，也可以和其他家人聊聊，不需要写下答案。</p>

      <div className="qa-card">
        <div className="q" style={{color:'var(--accent-ink)'}}>关于他生病前的生活</div>
        <ul style={{margin:'8px 0 0', paddingLeft:20, color:'var(--ink-soft)', lineHeight:1.85}}>
          <li>他平时最喜欢做什么？什么事情让他开心？</li>
          <li>他是一个什么样的人？独立、要强，还是随和、知足？</li>
          <li>他的身体状况怎么样？平时活动能力如何？</li>
        </ul>
      </div>

      <div className="qa-card">
        <div className="q" style={{color:'var(--accent-ink)'}}>关于他对医疗的态度</div>
        <ul style={{margin:'8px 0 0', paddingLeft:20, color:'var(--ink-soft)', lineHeight:1.85}}>
          <li>他平时对医院、看病的态度是怎样的？</li>
          <li>他以前有没有说过"如果我生重病了，希望怎样"这类话？</li>
          <li>他对身边其他生过重病的亲友是什么态度？说过什么评价？</li>
        </ul>
      </div>

      <div className="qa-card">
        <div className="q" style={{color:'var(--accent-ink)'}}>试着站在他的角度想</div>
        <ul style={{margin:'8px 0 0', paddingLeft:20, color:'var(--ink-soft)', lineHeight:1.85}}>
          <li>如果他知道活着可能需要长期依赖机器和他人照顾，他会怎么想？</li>
          <li>对他来说，什么样的生活是有意义的？什么是他无法接受的？</li>
        </ul>
      </div>

      <div className="callout amber">
        <div className="callout-title">如果您发现很多问题都答不上来？</div>
        这很正常。大多数家庭平时不会谈论这些话题。您可以试试这几个办法：
        <ul style={{margin:'8px 0 0', paddingLeft:20}}>
          <li>回想他平时对生活的态度——是一个不怕吃苦、能忍的人，还是特别在意生活质量的人？</li>
          <li>回想他对身边其他生过重病的亲友说过什么评价</li>
          <li>问问其他家人，看他们有没有听他提起过相关的想法</li>
        </ul>
        <p style={{margin:'8px 0 0'}}>即使最后还是不确定，也没关系。您对他的了解，比您以为的要多。</p>
      </div>
    </div>
  );
}

// ---------- Page 13: Quality of life ----------
function PageQoL({ state, update }) {
  const accept = [
    '能认出家人',
    '能用眼神、表情或简单动作与家人交流',
    '能自己吃东西（不需要鼻饲管）',
    '能坐起来或下床活动',
    '能回家居住',
    '只要活着就好，其他都可以接受',
  ];
  const avoid = [
    '完全无法与家人交流',
    '完全依赖他人照顾日常生活',
    '长期住在医院或护理机构',
    '需要持续依赖呼吸机维持生命',
    '无法自己吃东西，需要长期使用鼻饲管',
  ];
  const toggle = (k, v) => {
    const cur = state[k] || [];
    update(k, cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v]);
  };
  return (
    <div className="page">
      <span className="eyebrow">第四部分 · 明确什么是重要的</span>
      <h1 className="page-title">关于生活质量的思考</h1>
      <p style={{marginTop:20}}>这部分可能有些沉重，但它能帮您更清楚地理解您家人可能的想法。请根据您对他的了解来勾选。</p>

      <h3 className="sub-title">对您的家人来说，以下哪些状态是<b style={{color:'var(--accent-ink)'}}>可以接受</b>的？</h3>
      <p style={{fontSize:14, color:'var(--ink-muted)'}}>（可多选）</p>
      <ul className="check-list">
        {accept.map(t => (
          <CheckItem key={t}
            checked={(state.accept || []).includes(t)}
            onToggle={() => toggle('accept', t)}>{t}</CheckItem>
        ))}
      </ul>

      <h3 className="sub-title">对您的家人来说，以下哪些状态是<b style={{color:'var(--rose)'}}>难以接受</b>的？</h3>
      <p style={{fontSize:14, color:'var(--ink-muted)'}}>（可多选）</p>
      <ul className="check-list">
        {avoid.map(t => (
          <CheckItem key={t} dim
            checked={(state.avoid || []).includes(t)}
            onToggle={() => toggle('avoid', t)}>{t}</CheckItem>
        ))}
      </ul>

      <h3 className="sub-title">在延长生命与生活质量之间，您认为家人会更看重：</h3>
      <Radio value={state.tradeoff} options={[
        '更看重延长生命，即使生活质量受影响',
        '两者同样重要',
        '更看重生活质量，不希望为了延长时间而承受太多痛苦',
        '不确定',
      ]} onChange={v => update('tradeoff', v)} />
    </div>
  );
}

// ---------- Page 14: Family situation ----------
function PageFamily({ state, update }) {
  const QS = [
    { k:'f1', label:'如果家人需要长期照护，您的家庭能承担照护任务吗？', opts:['能够承担','有困难但可克服','困难较大','无法承担','不确定'] },
    { k:'f2', label:'您的家庭对治疗和照护费用的承受能力如何？', opts:['可以承受','有压力但可承受','压力较大','难以承受','不确定'] },
    { k:'f3', label:'家庭主要成员对这个决定的看法一致吗？', opts:['一致','基本一致','有些分歧','分歧较大'] },
  ];
  return (
    <div className="page">
      <span className="eyebrow">第四部分 · 明确什么是重要的</span>
      <h1 className="page-title">家庭的实际情况</h1>
      <p style={{marginTop:20}}>做决定时，除了考虑患者的意愿，也需要考虑家庭的实际情况。这不是"金钱和生命哪个重要"的问题——而是要确保您做出的决定是<b>可以长期坚持</b>的，是对患者真正好的。</p>

      {QS.map(q => (
        <div className="qa-card" key={q.k}>
          <div className="q">{q.label}</div>
          <Radio value={state[q.k]} options={q.opts} onChange={v => update(q.k, v)} />
        </div>
      ))}

      <div className="callout amber">
        <div className="callout-title">温馨提示</div>
        如果家庭经济或照护能力有困难，并不意味着您是"不孝"或"不爱家人"。勉强做出无法长期维持的决定，反而可能让患者和整个家庭都陷入困境。<b>诚实地面对现实，是负责任的表现。</b>
      </div>

      {(state.f3 === '有些分歧' || state.f3 === '分歧较大') && (
        <div className="callout">
          <div className="callout-title">家人意见不一致怎么办？</div>
          家人之间有不同想法是很正常的，不代表谁不关心患者。以下几个办法可能有帮助：
          <ul style={{margin:'8px 0 0', paddingLeft:20, lineHeight:1.8}}>
            <li>请医生或护士组织一次<b>家庭会议</b>，让所有主要家庭成员一起听听病情介绍，当面问问题。很多分歧是因为大家掌握的信息不一样。</li>
            <li>试着把讨论的焦点从"我觉得应该怎么做"转到<b>"他会希望怎么做"</b>——这样更容易找到共同点。</li>
            <li>如果实在无法达成一致，可以先做大家都能接受的最小决定（比如"先观察几天再说"），不急着做最终选择。</li>
            <li>最终需要有一个人签字。如果那个人是您，请相信：只要您是基于对患者的了解、认真考虑过的，就是负责任的决定。</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------- Page 15: Emotions ----------
function PageEmotions() {
  const FEELS = [
    ['焦虑、担心', '不知道该怎么决定，担心做错选择'],
    ['悲伤、难过', '看到家人生病，心里很难受'],
    ['内疚、自责', '觉得自己应该早点发现，或者照顾得更好'],
    ['无助、挫败', '想帮忙却不知道能做什么'],
    ['疲惫、压力大', '又要照顾病人，又要做决定，身心俱疲'],
    ['脑子转不动了', '已经听了太多信息、做了太多选择，感觉什么都不想再想了'],
    ['麻木、不真实感', '有时候觉得这一切不像是真的'],
  ];
  return (
    <div className="page">
      <span className="eyebrow">第五部分 · 情感支持与资源</span>
      <h1 className="page-title">您现在可能有的感受</h1>
      <p style={{marginTop:20}}>作为代理决策者，您可能正在经历各种复杂的情绪。请相信，这些感受都是正常的：</p>

      <div className="feel-grid">
        {FEELS.map(([n, d]) => (
          <div className="feel-card" key={n}>
            <div className="feel-name">{n}</div>
            <div className="feel-desc">{d}</div>
          </div>
        ))}
      </div>

      <div className="callout" style={{fontFamily:'"Noto Serif SC", serif', fontSize:16.5, marginTop:22}}>
        请记住：您不是在决定家人的生死。您是在<b>帮助他表达他自己可能的意愿</b>。无论您最终做出什么决定，只要是基于对他的了解和爱，就是负责任的决定。
      </div>

      <h2 className="section-title">如果您需要帮助</h2>
      <div className="qa-card"><div className="q">需要更多时间考虑</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>告诉医生您需要多想想。问清楚还有多少时间可以考虑，不要勉强自己马上做决定。</p></div>
      <div className="qa-card"><div className="q">家人意见不一致</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>可以请医生或护士组织一次家庭会议，让大家一起听听病情介绍，有疑问当面问，一起讨论。</p></div>
      <div className="qa-card"><div className="q">想听听其他医生的意见</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>这是您的权利。可以请医院安排会诊，或者咨询其他医院的专家。</p></div>
      <div className="qa-card"><div className="q">情绪快撑不住了</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>请告诉护士或医生。医院通常有社工或心理咨询师可以提供帮助。<b>照顾好自己，才能更好地帮助家人。</b></p></div>
      <div className="qa-card"><div className="q">觉得信息太多，什么都决定不了</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>这说明您的大脑需要休息，不是您"不负责任"。先不做决定，休息一天再想。也可以请护士帮您把最关键的两三个问题列出来，一次只想一个。</p></div>
    </div>
  );
}

// ---------- Page 16: Resources & hotlines ----------
function PageResources() {
  return (
    <div className="page">
      <span className="eyebrow">第五部分 · 情感支持与资源</span>
      <h1 className="page-title">照顾好自己，用上可用的资源</h1>

      <h3 className="sub-title">在照顾家人的同时，请不要忘记照顾自己</h3>
      <ul className="check-list" style={{pointerEvents:'none'}}>
        <li className="on"><span className="check-box"/><span>尽量保证基本的吃饭和休息</span></li>
        <li className="on"><span className="check-box"/><span>找信任的人倾诉您的感受</span></li>
        <li className="on"><span className="check-box"/><span>不要独自承担所有压力，让其他家人分担</span></li>
        <li className="on"><span className="check-box"/><span>允许自己有脆弱的时刻</span></li>
        <li className="on"><span className="check-box"/><span>如果感到难以承受，可以寻求专业的心理支持</span></li>
      </ul>

      <div className="hotlines">
        <h4>如果情绪难以承受，可拨打免费心理援助热线</h4>
        <div className="hotline-row">
          <span className="hotline-num">12320-5</span>
          <span className="hotline-name">全国心理援助热线</span>
        </div>
        <div className="hotline-row">
          <span className="hotline-num">400-161-9995</span>
          <span className="hotline-name">希望 24 热线 · 24 小时</span>
        </div>
        <p style={{margin:'14px 0 0', fontSize:14, color:'var(--ink-muted)'}}>电话那头会有专业的人倾听您、陪伴您，您不需要独自扛着。</p>
      </div>

      <h2 className="section-title">可能用得上的资源</h2>
      <div className="callout amber" style={{marginTop:8}}>
        具体政策和资源可能因地区而异，建议向<b>医院社工</b>或当地相关部门咨询。
      </div>

      <div className="qa-card"><div className="q">医保报销</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>气管切开手术和住院费用大部分可以医保报销，具体比例因地区和医保类型而异。请咨询医院医保办了解详情。</p></div>
      <div className="qa-card"><div className="q">医疗救助</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>如果家庭经济困难，可以拨打 <b>12345</b> 政务服务热线咨询民政救助、低保申请、大病救助等政策，也可以向医院社工了解慈善救助项目。</p></div>
      <div className="qa-card"><div className="q">长期照护机构</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>包括康复医院、护理院、养老机构等。可以请医院社工帮忙了解当地资源，也可以拨打 <b>12320</b> 卫生健康热线咨询。</p></div>
      <div className="qa-card"><div className="q">居家护理服务</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>部分地区有上门护理服务，可以帮助家属在家照护患者。可拨打 <b>12320</b> 或咨询社区卫生服务中心。</p></div>
      <div className="qa-card"><div className="q">康复服务</div>
        <p style={{margin:0, fontSize:15, color:'var(--ink-soft)'}}>气管切开后的康复是一个较长的过程，可能包括呼吸训练、吞咽训练、肢体康复等。<b>带管的患者也可以进行康复训练，不需要等到拔管以后才开始。</b></p></div>
    </div>
  );
}

// ---------- Page 17: Leaning ----------
function PageLean({ state, update }) {
  return (
    <div className="page">
      <span className="eyebrow">第六部分 · 准备做出决定</span>
      <h1 className="page-title">此刻，您心里在想什么？</h1>
      <p style={{marginTop:20}}>下面这个问题<b>没有对错</b>，只是帮您看清自己现在内心的想法。请点击最接近您想法的位置。</p>

      <div className="lean-slider">
        <div className="lean-labels">
          <span style={{color:'var(--accent-ink)'}}>倾向做气管切开</span>
          <span style={{color:'var(--rose)'}}>倾向不做气管切开</span>
        </div>
        <div className="lean-track">
          <div className="lean-stops">
            {[1,2,3,4,5].map(n => (
              <button key={n}
                className={'lean-stop' + (state.lean === n ? ' on' : '')}
                onClick={() => update('lean', n)}>{n}</button>
            ))}
          </div>
        </div>
        <div className="lean-sub">
          <span>非常<br/>倾向做</span>
          <span>有点<br/>倾向做</span>
          <span>还没<br/>想好</span>
          <span>有点<br/>倾向不做</span>
          <span>非常<br/>倾向不做</span>
        </div>
      </div>

      <h3 className="sub-title">我现在最纠结的地方是（可以不写）：</h3>
      <textarea className="note-input"
        value={state.struggle || ''}
        onChange={e => update('struggle', e.target.value)}
        placeholder="写下您心里最拿不定主意的事情..."/>

      {state.lean === 3 && (
        <div className="callout amber" style={{marginTop:20}}>
          <b>还没想好</b>——这很正常。您可以回头看看前面的内容，或者把还不清楚的问题记下来问医生。
        </div>
      )}
      {(state.lean === 1 || state.lean === 2) && (
        <div className="callout" style={{marginTop:20}}>
          <b>倾向做气管切开</b>——但心里还是不踏实的话，下一页的"准备情况检查"可以帮您看看还有哪方面需要更多信息。
        </div>
      )}
      {(state.lean === 4 || state.lean === 5) && (
        <div className="callout rose" style={{marginTop:20}}>
          <b>倾向不做气管切开</b>——担心家人或医生不理解是很重要的想法。后面的沟通清单会帮您准备怎么表达。
        </div>
      )}
    </div>
  );
}

// ---------- Page 18: Ready check ----------
function PageReady({ state, update }) {
  const QS = [
    { k:'r1', label:'我已了解各个选项及其利弊', opts:['是','还需要更多信息'] },
    { k:'r2', label:'我已思考过家人可能的意愿', opts:['是','还不太清楚'] },
    { k:'r3', label:'我已考虑过家庭的实际情况', opts:['是','还需要和家人商量'] },
    { k:'r4', label:'我对目前倾向的选择感到基本安心', opts:['是','还在犹豫'] },
    { k:'r5', label:'我知道想问医生什么问题', opts:['是','不太清楚'] },
  ];
  return (
    <div className="page">
      <span className="eyebrow">第六部分 · 准备做出决定</span>
      <h1 className="page-title">您准备好了吗？</h1>
      <p style={{marginTop:20}}>在与医疗团队做最后沟通之前，您可以用下面这个清单检查一下自己的准备情况：</p>

      {QS.map(q => (
        <div className="qa-card" key={q.k}>
          <div className="q">{q.label}</div>
          <Radio value={state[q.k]} options={q.opts} onChange={v => update(q.k, v)} />
        </div>
      ))}

      <div className="callout amber">
        如果您有几项选了"还需要"或"还在犹豫"，不用着急。您可以回头再看看前面的内容，或者把您的疑问记下来问医生。下一页就是<b>与医疗团队沟通清单</b>——可以直接打印带到医院。
      </div>
    </div>
  );
}

// ---------- Page 20: After the decision ----------
function PageAfter() {
  return (
    <div className="page">
      <span className="eyebrow">第六部分 · 准备做出决定</span>
      <h1 className="page-title">做出决定之后</h1>

      <div className="decide-card" style={{borderColor:'var(--accent)'}}>
        <h4 style={{color:'var(--accent-ink)'}}>如果您决定进行气管切开</h4>
        <ul>
          <li>医生会安排手术时间，向您详细说明手术过程</li>
          <li>您需要签署知情同意书</li>
          <li>术后医疗团队会继续观察和治疗</li>
          <li>出院前护士会教您气管切开的日常护理方法</li>
        </ul>
      </div>

      <div className="decide-card" style={{borderColor:'var(--ink-muted)'}}>
        <h4>如果您决定不进行气管切开</h4>
        <ul>
          <li>医疗团队会与您讨论后续的照护方案</li>
          <li>医疗团队会制定专门的<b>舒适照护方案</b>，重点是减轻患者的不适和痛苦。这不是"什么都不做"，而是<b>另一种积极的照护方式</b>。</li>
          <li>医疗团队会继续陪伴和支持您</li>
        </ul>
      </div>

      <div className="callout amber" style={{marginTop:20}}>
        <div className="callout-title">重要提醒</div>
        医疗决策<b>不是一成不变的</b>。如果以后患者的病情发生变化，或者您有了新的想法，随时可以和医疗团队沟通，重新评估和调整治疗方案。
      </div>

      <hr className="rule"/>
      <h2 className="section-title">写在最后</h2>
      <p className="lead">亲爱的家属：</p>
      <p>感谢您读完这份手册。我们知道，这段时间对您来说非常艰难。</p>
      <p>无论您最终做出什么决定，只要是基于对家人的了解、基于您对他的爱、基于您认真的思考——<b>那就是一个好的决定</b>。</p>
      <p>没有人能预知未来，我们只能在当下做出我们认为最好的选择。</p>
      <p style={{fontFamily:'"Noto Serif SC", serif', fontSize:18, color:'var(--ink)', marginTop:24}}>
        请相信自己，也请照顾好自己。<br/>
        您不是一个人在面对这一切。
      </p>
      <p style={{color:'var(--ink-muted)', fontSize:14, marginTop:30, textAlign:'center', fontStyle:'italic'}}>
        祝愿您的家人早日康复，<br/>也祝愿您平安、坚强。
      </p>
    </div>
  );
}

Object.assign(window, {
  PageCover, PageHowToUse, PageWhy, PageYourRole, PageSelfCheck,
  PageStroke, PageWhatIsTrach, PageOptions, PageProsCons, PageFAQ,
  PageStories, PageRecall, PageQoL, PageFamily,
  PageEmotions, PageResources, PageLean, PageReady, PageAfter,
  Radio, CheckItem,
});
