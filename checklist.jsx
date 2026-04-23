// Communication checklist — printable to bring to the doctor.

const CHECKLIST = [
  {
    roman: '一',
    title: '关于患者目前的病情',
    items: [
      '患者现在的病情有多严重？',
      '他现在的意识状态怎么样？有可能好转吗？',
      '他的呼吸功能怎么样？能脱离呼吸机吗？',
      '除了呼吸问题，还有哪些需要担心的情况？',
      '整体来看，他的病情是在好转、稳定还是恶化？',
    ],
  },
  {
    roman: '二',
    title: '关于气管切开手术',
    items: [
      '为什么医生建议做气管切开？',
      '如果不做气管切开，还有别的办法吗？',
      '手术有什么风险？发生的可能性大吗？',
      '手术由谁来做？在哪里做？',
      '早一点做和晚一点做有什么区别？',
      '我们还有多少时间来考虑这个决定？',
    ],
  },
  {
    roman: '三',
    title: '关于气管切开后的情况',
    items: [
      '做了气管切开后，患者恢复的可能性有多大？',
      '气管切开后，大概还要住院多久？',
      '气管切开后，患者还能说话吗？能吃东西吗？',
      '气管切开后，患者的生活质量可能会怎样？',
      '气管切开的管子以后可以拔掉吗？需要什么条件？',
      '如果做了之后病情没有好转，后面怎么办？',
    ],
  },
  {
    roman: '四',
    title: '关于出院后的照护',
    items: [
      '出院后需要怎么照顾？家属需要学什么技能？',
      '出院后需要什么设备或耗材？',
      '多久需要回医院复查一次？',
      '在家遇到紧急情况怎么办？',
      '有没有上门护理服务可以用？',
      '如果家里没法照顾，可以去什么机构？',
    ],
  },
  {
    roman: '五',
    title: '关于费用',
    items: [
      '气管切开手术大概要多少钱？',
      '住院期间的费用大概是多少？',
      '哪些费用可以用医保报销？',
      '出院后长期照护大概要花多少钱？',
      '有没有医疗救助或补贴政策？',
    ],
  },
  {
    roman: '六',
    title: '关于选择不做气管切开',
    items: [
      '如果不做气管切开，接下来会怎样？',
      '不做的话，患者还能维持多长时间？',
      '如果选择不做，怎样让患者尽量舒适、不受罪？',
      '这个决定做出后，还可以改变主意吗？',
      '如果选择不做，医疗团队会提供哪些照护来让他舒适、减轻痛苦？',
      '选择不做，是不是意味着放弃所有治疗？还是只是不做气管切开，其他治疗继续？',
    ],
  },
];

const SHARE_INFO = [
  '家人以前说过的关于生病、治疗的想法',
  '我对家人价值观和生活态度的了解',
  '家人生病前的生活状态和活动能力',
  '我们家庭的照护能力（时间、人手）',
  '我们家庭的经济承受能力',
  '家庭成员之间是否有不同意见',
  '我目前倾向的选择',
  '我目前最纠结、最拿不定主意的地方',
  '我目前最担心的事情',
];

function ChecklistRow({ status, onToggle, children }) {
  // status: 'none' | 'done' (已了解) | 'q' (重点询问)
  let mark = '';
  if (status === 'done') mark = '✓';
  else if (status === 'q') mark = '?';
  return (
    <div className={'ckl-row' + (status === 'done' ? ' on' : '') + (status === 'q' ? ' q on' : '')} onClick={onToggle}>
      <span className="mark">{mark}</span>
      <span className="text">{children}</span>
      <span className="mark-toggle print-hide">
        {status === 'none' && '点击标记'}
        {status === 'done' && '已了解 · 点击切换'}
        {status === 'q' && '重点询问 · 点击清除'}
      </span>
    </div>
  );
}

function PageChecklist({ state, update }) {
  const marks = state.ckl || {};
  const info = state.info || {};

  const cycle = (id) => {
    const cur = marks[id] || 'none';
    const next = cur === 'none' ? 'done' : cur === 'done' ? 'q' : 'none';
    update('ckl', { ...marks, [id]: next });
  };
  const toggleInfo = (t) => {
    update('info', { ...info, [t]: !info[t] });
  };

  const doPrint = () => window.print();

  return (
    <div className="page">
      <div className="print-header print-show-only" style={{display:'none'}}>
        <h1 className="serif">与医疗团队沟通清单</h1>
        <div className="print-sub">脑卒中气管切开代理决策辅助工具</div>
      </div>

      <span className="eyebrow print-hide">第六部分 · 准备做出决定</span>
      <h1 className="page-title print-hide">与医疗团队沟通清单</h1>
      <p style={{marginTop:20}} className="print-hide">这份清单可以帮您更高效地和医生沟通。标记完成后可以<b>打印一份带到医院</b>。</p>

      <div className="mark-hint print-hide">
        点击问题可循环切换标记：<b>空白</b> → <b>✓ 已了解</b> → <b>? 重点询问</b> → 空白。<br/>
        打印后可以在医院里当场勾画记录。
      </div>

      <div className="print-actions print-hide">
        <button className="btn primary" onClick={doPrint}>🖨 打印沟通清单</button>
        <button className="btn" onClick={() => update('ckl', {})}>清除所有标记</button>
      </div>

      {CHECKLIST.map(section => (
        <div className="ckl-section" key={section.roman}>
          <h4><span className="roman">{section.roman}</span>{section.title}</h4>
          {section.items.map((it, i) => {
            const id = section.roman + '_' + i;
            return (
              <ChecklistRow key={id} status={marks[id] || 'none'} onToggle={() => cycle(id)}>
                {it}
              </ChecklistRow>
            );
          })}
        </div>
      ))}

      <div className="ckl-section">
        <h4><span className="roman">七</span>我还有其他问题想问医生</h4>
        <textarea className="note-input"
          value={state.otherQ || ''}
          onChange={e => update('otherQ', e.target.value)}
          placeholder="写下您想到的其他问题..."
          style={{minHeight:100}}/>
      </div>

      <hr className="rule" style={{margin:'36px 0 28px'}}/>

      <h2 className="section-title">您可以主动告诉医生的信息</h2>
      <p>以下信息可以帮助医生更好地了解情况，帮您做出更合适的决定。请勾选您准备和医生分享的内容：</p>

      <ul className="check-list" style={{marginTop:16}}>
        {SHARE_INFO.map(t => (
          <li key={t} className={info[t] ? 'on' : ''} onClick={() => toggleInfo(t)}>
            <span className="check-box"/>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="print-actions print-hide">
        <button className="btn primary" onClick={doPrint}>🖨 打印沟通清单</button>
      </div>
    </div>
  );
}

Object.assign(window, { PageChecklist });
