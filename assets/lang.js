/* =========================================================
   星轨 STARWAY · 语言与内容数据
   - 全站：中 / 英
   - 世界和平页：中 / 英 / 俄 / 法 / 阿拉伯（RTL）
   - 长文本数据：世界人权宣言、星轨计划项目、未成年人保护规则
   - 世界和平页文案（PW 字典，五语）
   ========================================================= */

(function () {
  const STORE_KEY = "starway-lang";
  const ALL = ["zh", "en", "ru", "fr", "ar"];
  let current = localStorage.getItem(STORE_KEY);
  if (ALL.indexOf(current) === -1) current = "zh";

  /* data-zh / data-en 元素在非中英语言下的回退 */
  const DATA_ATTR = { zh: "zh", en: "en", ru: "en", fr: "en", ar: "en" };

  /* -------------------------------------------------------
     世界人权宣言（联合国，1948）· 五语
     ------------------------------------------------------- */
  const UDHR = {
    preamble: {
      zh: [
        "鉴于对人类家庭所有成员的固有尊严及其平等的和不移的权利的承认，乃是世界自由、正义与和平的基础，",
        "鉴于对人权的无视和侮蔑已发展为野蛮暴行，这些暴行玷污了人类的良心，而一个人人享有言论和信仰自由并免予恐惧和匮乏的世界的来临，已被宣布为普通人民的最高愿望，",
        "鉴于为使人类不致迫不得已铤而走险对暴政和压迫进行反叛，有必要使人权受法治的保护，",
        "鉴于有必要促进各国间友好关系的发展，",
        "鉴于各联合国国家的人民已在联合国宪章中重申他们对基本人权、人格尊严和价值以及男女平等权利的信念，并决心促成较大自由中的社会进步和生活水平的改善，",
        "鉴于各会员国业已誓愿同联合国合作以促进对人权和基本自由的普遍尊重和遵行，",
        "鉴于对这些权利和自由的普遍了解对于这个誓愿的充分实现具有很大的重要性，",
        "因此现在，大会发布这一世界人权宣言，作为所有人民和所有国家努力实现的共同标准，以期每一个人和社会机构经常铭念本宣言，努力通过教诲和教育促进对权利和自由的尊重，并通过国家的和国际的渐进措施，使这些权利和自由在各会员国本身人民及在其管辖下领土的人民中得到普遍和有效的承认和遵行。"
      ],
      en: [
        "Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world,",
        "Whereas disregard and contempt for human rights have resulted in barbarous acts which have outraged the conscience of mankind, and the advent of a world in which human beings shall enjoy freedom of speech and belief and freedom from fear and want has been proclaimed as the highest aspiration of the common people,",
        "Whereas it is essential, if man is not to be compelled to have recourse, as a last resort, to rebellion against tyranny and oppression, that human rights should be protected by the rule of law,",
        "Whereas it is essential to promote the development of friendly relations between nations,",
        "Whereas the peoples of the United Nations have in the Charter reaffirmed their faith in fundamental human rights, in the dignity and worth of the human person and in the equal rights of men and women and have determined to promote social progress and better standards of life in larger freedom,",
        "Whereas Member States have pledged themselves to achieve, in co-operation with the United Nations, the promotion of universal respect for and observance of human rights and fundamental freedoms,",
        "Whereas a common understanding of these rights and freedoms is of the greatest importance for the full realization of this pledge,",
        "Now, therefore, the General Assembly proclaims this Universal Declaration of Human Rights as a common standard of achievement for all peoples and all nations, to the end that every individual and every organ of society, keeping this Declaration constantly in mind, shall strive by teaching and education to promote respect for these rights and freedoms and by progressive measures, national and international, to secure their universal and effective recognition and observance, both among the peoples of Member States themselves and among the peoples of territories under their jurisdiction."
      ],
      ru: [
        "Принимая во внимание, что признание достоинства, присущего всем членам человеческой семьи, и равных и неотъемлемых прав их является основой свободы, справедливости и всеобщего мира,",
        "принимая во внимание, что пренебрежение и презрение к правам человека привели к варварским актам, которые возмущают совесть человечества, и что создание такого мира, в котором люди будут иметь свободу слова и убеждений и будут свободны от страха и нужды, провозглашено как высокое стремление людей,",
        "принимая во внимание, что необходимо, чтобы права человека охранялись властью закона в целях обеспечения того, чтобы человек не был вынужден прибегать, в качестве последнего средства, к восстанию против тирании и угнетения,",
        "принимая во внимание, что необходимо содействовать развитию дружественных отношений между народами,",
        "принимая во внимание, что народы Объединенных Наций подтвердили в Уставе свою веру в основные права человека, в достоинство и ценность человеческой личности и в равноправие мужчин и женщин и решили содействовать социальному прогрессу и улучшению условий жизни при большей свободе,",
        "принимая во внимание, что государства-члены обязались содействовать, в сотрудничестве с Организацией Объединенных Наций, всеобщему уважению и соблюдению прав человека и основных свобод,",
        "принимая во внимание, что всеобщее понимание характера этих прав и свобод имеет огромное значение для полного выполнения этого обязательства,",
        "Генеральная Ассамблея провозглашает настоящую Всеобщую декларацию прав человека в качестве задачи, к выполнению которой должны стремиться все народы и все государства с тем, чтобы каждый человек и каждый орган общества, постоянно имея в виду настоящую Декларацию, стремились путем просвещения и образования содействовать уважению этих прав и свобод и обеспечению, путем национальных и международных прогрессивных мероприятий, всеобщего и эффективного признания и осуществления их как среди народов государств-членов самой Организации, так и среди народов территорий, находящихся под их юрисдикцией."
      ],
      fr: [
        "Considérant que la reconnaissance de la dignité inhérente à tous les membres de la famille humaine et de leurs droits égaux et inaliénables constitue le fondement de la liberté, de la justice et de la paix dans le monde,",
        "considérant que la méconnaissance et le mépris des droits de l'homme ont conduit à des actes de barbarie qui révoltent la conscience de l'humanité et que l'avènement d'un monde où les êtres humains seront libres de parler et de croire, libérés de la terreur et de la misère, a été proclamé comme la plus haute aspiration de l'homme,",
        "considérant qu'il est essentiel que les droits de l'homme soient protégés par un régime de droit pour que l'homme ne soit pas contraint, en suprême recours, à la révolte contre la tyrannie et l'oppression,",
        "considérant qu'il est essentiel d'encourager le développement de relations amicales entre nations,",
        "considérant que dans la Charte les peuples des Nations Unies ont proclamé à nouveau leur foi dans les droits fondamentaux de l'homme, dans la dignité et la valeur de la personne humaine, dans l'égalité des droits des hommes et des femmes, et qu'ils se sont déclarés résolus à favoriser le progrès social et à instaurer de meilleures conditions de vie dans une liberté plus grande,",
        "considérant que les États Membres se sont engagés à assurer, en coopération avec l'Organisation des Nations Unies, le respect universel et effectif des droits de l'homme et des libertés fondamentales,",
        "considérant qu'une conception commune de ces droits et libertés est de la plus haute importance pour remplir pleinement cet engagement,",
        "L'Assemblée générale proclame la présente Déclaration universelle des droits de l'homme comme l'idéal commun à atteindre par tous les peuples et toutes les nations, afin que tous les individus et tous les organes de la société, ayant cette Déclaration constamment à l'esprit, s'efforcent, par l'enseignement et l'éducation, de développer le respect de ces droits et libertés et d'en assurer, par des mesures progressives d'ordre national et international, la reconnaissance et l'application universelles et effectives, tant parmi les populations des États Membres eux-mêmes que parmi celles des territoires placés sous leur juridiction."
      ],
      ar: [
        "بما أن الاعتراف بالكرامة الأصيلة لجميع أفراد الأسرة البشرية وبحقوقهم المتساوية الثابتة هو أساس الحرية والعدالة والسلام في العالم،",
        "وبما أن إنكار حقوق الإنسان وازدراؤها قد أدى إلى أعمال همجية آذت ضمير الإنسانية، وأنه قد أُعلن أن أعلى غاية للإنسان هو عالم يتمتع فيه بحرية القول والاعتقاد ويتحرر من الخوف والفقر،",
        "وبما أنه من الضروري أن تحظى حقوق الإنسان بحماية سيادة القانون، كي لا يضطر المرء كملجأ أخير إلى التمرد ضد الطغيان والاضطهاد،",
        "وبما أنه من الضروري تشجيع نمو العلاقات الودية بين الأمم،",
        "وبما أن شعوب الأمم المتحدة قد أكدت في الميثاق إيمانها بالحقوق الأساسية للإنسان، وبكرامة الإنسان وقيمته، وبتساوي حقوق الرجل والمرأة، وقد تصمم على دفع التقدم الاجتماعي وتحسين مستوى الحياة في جو من الحرية أوسع،",
        "وبما أن الدول الأعضاء قد تعهدت بالتعاون مع منظمة الأمم المتحدة على تحقيق الاحترام العالمي والفعلي لحقوق الإنسان والحريات الأساسية،",
        "وبما أن الفهم المشترك لهذه الحقوق والحريات هو الأهم لتحقيق هذا التعهد على الوجه الأكمل،",
        "فإن الجمعية العامة تُعلن هذا الإعلان العالمي لحقوق الإنسان معياراً مشتركاً ينبغي أن تسعى إليه جميع الشعوب والأمم، حتى يسعى كل فرد وكل جهاز في المجتمع، إذ يتذكرون هذا الإعلان دائماً، إلى تعليم هذه الحقوق والحريات واحترامها وتنميتها بإجراءات تدريجية وطنية ودولية، لكي تُعرف وتُطبَّق فعلياً وبصورة عامة وسريعة بين شعوب الدول الأعضاء ذاتها وبين شعوب الأقاليم التي تكون تحت ولايتها."
      ]
    },
    articles: [
      { n: 1,
        zh: ["人人生而自由，在尊严和权利上一律平等。他们赋有理性和良心，并应以兄弟关系的精神相对待。"],
        en: ["All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood."],
        ru: ["Все люди рождаются свободными и равными в своем достоинстве и правах. Они наделены разумом и совестью и должны поступать в отношении друг друга в духе братства."],
        fr: ["Tous les êtres humains naissent libres et égaux en dignité et en droits. Ils sont doués de raison et de conscience et doivent agir les uns envers les autres dans un esprit de fraternité."],
        ar: ["يولد جميع الناس أحرارًا متساوين في الكرامة والحقوق. وقد وهبو عقلًا وضميرًا وعليهم أن يعامل بعضهم بعضًا بروح الإخاء."] },
      { n: 2,
        zh: ["人人有资格享有本宣言所载的一切权利和自由，不分种族、肤色、性别、语言、宗教、政治或其他见解、国籍或社会出身、财产、出生或其他身分等任何区别。", "并且不得因一人所属的国家或领土的政治的、行政的或者国际的地位之不同而有所区别，无论该领土是独立领土、托管领土、非自治领土或者处于其他任何主权受限制的情况之下。"],
        en: ["Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.", "Furthermore, no distinction shall be made on the basis of the political, jurisdictional or international status of the country or territory to which a person belongs, whether it be independent, trust, non-self-governing or under any other limitation of sovereignty."],
        ru: ["Каждый человек должен обладать всеми правами и всеми свободами, провозглашенными настоящей Декларацией, без какого бы то ни было различия, как-то в отношении расы, цвета кожи, пола, языка, религии, политических или иных убеждений, национального или социального происхождения, имущественного, сословного или иного положения.", "Кроме того, не должно проводиться никакого различия на основе политического, правового или международного статуса страны или территории, к которой человек принадлежит, независимо от того, является ли эта территория независимой, подопечной, несамоуправляющейся или как-либо иначе ограниченной в своем суверенитете."],
        fr: ["Chacun peut se prévaloir de tous les droits et de toutes les libertés proclamés dans la présente Déclaration, sans distinction aucune, notamment de race, de couleur, de sexe, de langue, de religion, d'opinion politique ou de toute autre opinion, d'origine nationale ou sociale, de fortune, de naissance ou de toute autre situation.", "De plus, il ne sera fait aucune distinction fondée sur le statut politique, juridique ou international du pays ou du territoire dont une personne est ressortissante, que ce pays ou territoire soit indépendant, sous tutelle, non autonome ou soumis à une limitation quelconque de souveraineté."],
        ar: ["لكل إنسان حق التمتع بجميع الحقوق والحريات الواردة في هذا الإعلان، دون أي تمييز، لا سيما بالنسبة إلى العنصر واللون والجنس واللغة والدين والرأي السياسي أو الرأي الذي يرجع إلى أي سبب آخر والأصل الوطني أو الاجتماعي والثروة والميلاد أو أي وضع آخر.", "علاوة على ذلك، لا يُفرق أي تمييز على أساس الوضع السياسي أو القانوني أو الدولي للبلد أو الإقليم الذي ينتمي إليه الفرد، سواء أكان هذا البلد أو الإقليم مستقلاً أم تحت الوصاية أم غير متمتع بالحكم الذاتي أم كان سلطانه السيادي خاضعاً لأي قيد من هذه القيود."] },
      { n: 3,
        zh: ["人人有权享有生命、自由和人身安全。"],
        en: ["Everyone has the right to life, liberty and security of person."],
        ru: ["Каждый человек имеет право на жизнь, на свободу и на личную неприкосновенность."],
        fr: ["Tout individu a droit à la vie, à la liberté et à la sûreté de sa personne."],
        ar: ["لكل فرد حق في الحياة والحرية وأمن شخصه."] },
      { n: 4,
        zh: ["任何人不得使为奴隶或奴役；一切形式的奴隶制度和奴隶买卖，均应予以禁止。"],
        en: ["No one shall be held in slavery or servitude; slavery and the slave trade shall be prohibited in all their forms."],
        ru: ["Никто не должен содержаться в рабстве или в подневольном состоянии; рабство и работорговля запрещаются во всех их видах."],
        fr: ["Nul ne sera tenu en esclavage ni en servitude; l'esclavage et la traite des esclaves sont interdits sous toutes leurs formes."],
        ar: ["لا يجوز إقامة أحد في عبودية أو رق، وتحظر جميع أشكال تجارة الرقيق وتجارة العبيد."] },
      { n: 5,
        zh: ["任何人不得加以酷刑，或施以残忍的、不人道的或侮辱性的待遇或刑罚。"],
        en: ["No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment."],
        ru: ["Никто не должен подвергаться пыткам или жестоким, бесчеловечным или унижающим его достоинство обращению и наказанию."],
        fr: ["Nul ne sera soumis à la torture, ni à des peines ou traitements cruels, inhumains ou dégradants."],
        ar: ["لا يجوز تعريض أحد للتعذيب ولا للمعاملة أو العقاب القاسي أو اللاإنساني أو المهين."] },
      { n: 6,
        zh: ["人人在任何地方有权被承认在法律前的人格。"],
        en: ["Everyone has the right to recognition everywhere as a person before the law."],
        ru: ["Каждый человек, где бы он ни находился, имеет право на признание его правосубъектности."],
        fr: ["Chacun a le droit à la reconnaissance en tous lieux de sa personnalité juridique."],
        ar: ["لكل فرد، أياً كان مكانه، حق في الاعتراف بشخصيته القانونية."] },
      { n: 7,
        zh: ["法律之前人人平等，并有权享受法律的平等保护，不受任何歧视。人人有权享受平等保护，以免受违反本宣言的任何歧视行为以及煽动这种歧视的任何行为之害。"],
        en: ["All are equal before the law and are entitled without any discrimination to equal protection of the law. All are entitled to equal protection against any discrimination in violation of this Declaration and against any incitement to such discrimination."],
        ru: ["Все люди равны перед законом и имеют право, без всякого различия, на равную защиту закона. Все люди имеют право на равную защиту от какой бы то ни было дискриминации, нарушающей настоящую Декларацию, и от какого бы то ни было подстрекательства к такой дискриминации."],
        fr: ["Tous sont égaux devant la loi et ont droit à une égale protection de la loi. Tous ont droit à une protection égale contre toute discrimination qui violerait la présente Déclaration et contre toute provocation à une telle discrimination."],
        ar: ["وكل الناس متساوون أمام القانون ولهم بدون تمييز الحق في التمتع بحماية متساوية للقانون. ولكل الحق في حماية متساوية من أي تمييز من شأنه أن يخالف هذا الإعلان ومن أي تحريض على تمييز من هذا القبيل."] },
      { n: 8,
        zh: ["任何人当宪法或法律所赋予他的基本权利遭受侵害时，有权由合格的国家法庭对这种侵害行为作有效的补救。"],
        en: ["Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights granted him by the constitution or by law."],
        ru: ["Каждый человек имеет право на эффективное восстановление в правах компетентными национальными судами в случаях нарушения его основных прав, предоставленных ему конституцией или законом."],
        fr: ["Toute personne a droit à un recours effectif devant les juridictions nationales compétentes contre les actes violant les droits fondamentaux qui lui sont reconnus par la constitution ou par la loi."],
        ar: ["لكل فرد الحق في النداء الفعال إلى المحاكم الوطنية المختصة، التي تصون حقاً أساسياً منحت له إياه الدستور أو القانون، في حال كان هناك اعتداء على هذا الحق."] },
      { n: 9,
        zh: ["任何人不得加以任意逮捕、拘禁或放逐。"],
        en: ["No one shall be subjected to arbitrary arrest, detention or exile."],
        ru: ["Никто не может быть подвергнут произвольному аресту, задержанию или изгнанию."],
        fr: ["Nul ne peut être arbitrairement arrêté, détenu ou exilé."],
        ar: ["لا يجوز القبض على أحد أو حجزه أو نفيه تعسفاً."] },
      { n: 10,
        zh: ["人人完全平等地有权由一个独立而无偏倚的法庭进行公正的和公开的审讯，以确定他的权利和义务并判定对他提出的任何刑事指控。"],
        en: ["Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him."],
        ru: ["Каждый человек, для определения его прав и обязанностей и для установления обоснованности предъявленного ему уголовного обвинения, имеет право, на основе полного равенства, на то, чтобы его дело было рассмотрено гласно и с соблюдением всех требований беспристрастности независимым и беспристрастным судом."],
        fr: ["Toute personne a droit, en pleine égalité, à ce que sa cause soit entendue équitablement et publiquement par un tribunal indépendant et impartial, qui décidera soit de ses droits et obligations, soit du bien-fondé de toute accusation en matière pénale dirigée contre elle."],
        ar: ["لكل فرد، في حالة تساوي كاملة، الحق في أن تحكم قضيته على نحو إنصاف علني محايد قضاءً من محكمة مختصة مستقلة محايدة، نظراً في حقوقه وواجباته وأية تهمة جنائية وجهت إليه."] },
      { n: 11,
        zh: ["凡受刑事控告者，在未经获得辩护上所需的一切保证的公开审判而依法证实有罪以前，有权被视为无罪。", "任何人的任何行为或不行为，在其发生时依国家法或国际法均不构成刑事罪者，不得被判为犯有刑事罪。刑罚不得重于犯罪时适用的法律规定。"],
        en: ["Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence.", "No one shall be held guilty of any penal offence on account of any act or omission which did not constitute a penal offence, under national or international law, at the time when it was committed. Nor shall a heavier penalty be imposed than the one that was applicable at the time the penal offence was committed."],
        ru: ["Каждый обвиняемый в совершении преступления имеет право считаться невиновным до тех пор, пока его виновность не будет установлена законным порядком путем гласного судебного разбирательства, при котором ему обеспечиваются все возможности для защиты.", "Никто не может быть осужден за преступление на основании совершения какого-либо деяния или за бездействие, которые во время их совершения не составляли преступления по национальным законам или по международному праву. Не может также налагаться наказание более тяжкое, нежели то, которое могло быть применено в то время, когда преступление было совершено."],
        fr: ["Toute personne accusée d'un acte délictueux est présumée innocente jusqu'à ce que sa culpabilité ait été légalement établie au cours d'un procès public où toutes les garanties nécessaires à sa défense lui auront été assurées.", "Nul ne sera condamné pour des actions ou omissions qui, au moment où elles ont été commises, ne constituaient pas un acte délictueux d'après le droit national ou international. De même, il ne sera infligé aucune peine plus forte que celle qui était applicable au moment où l'acte délictueux a été commis."],
        ar: ["كل من اتهم بجريمة يعتبر بريئاً حتى تثبت إدانته قانوناً بمحاكمة علنية تؤمن له فيها جميع الضمانات اللازمة للدفاع عنه.", "لا يُدان أحد بارتكاب جريمة بسبب أي فعل أو امتناع عن فعل لا يعد جريمة، بحسب القانون الوطني أو الدولي، وقت ارتكابه، ولا تجوز فرض عقوبة أشد من العقوبة التي كانت قابلة للتطبيق وقت ارتكاب الجريمة."] },
      { n: 12,
        zh: ["任何人的私生活、家庭、住宅和通信不得任意干涉，他的荣誉和名誉不得加以攻击。人人有权享受法律保护，以免受这种干涉或攻击。"],
        en: ["No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks."],
        ru: ["Никто не может подвергаться произвольному вмешательству в его личную и семейную жизнь, произвольным посягательствам на неприкосновенность его жилища, тайну его корреспонденции или на его честь и репутацию. Каждый человек имеет право на защиту закона от такого вмешательства или таких посягательств."],
        fr: ["Nul ne sera l'objet d'immixtions arbitraires dans sa vie privée, sa famille, son domicile ou sa correspondance, ni d'atteintes à son honneur ou à sa réputation. Toute personne a droit à la protection de la loi contre de telles immixtions ou de telles atteintes."],
        ar: ["لا يعرض أحد لتدخل تعسفي في حياته الخاصة أو شؤون أسرته أو مسكنه أو مراسلاته، ولا لمساس بشرفه أو سمعته، ولكل فرد الحق في حماية القانون من هذا التدخل أو هذا المساس."] },
      { n: 13,
        zh: ["人人在各国境内有权自由迁徙和居住。", "人人有权离开任何国家，包括其本国在内，并有权返回他的国家。"],
        en: ["Everyone has the right to freedom of movement and residence within the borders of each state.", "Everyone has the right to leave any country, including his own, and to return to his country."],
        ru: ["Каждый человек имеет право свободно передвигаться и выбирать себе местожительство в пределах каждого государства.", "Каждый человек имеет право покидать любую страну, включая свою собственную, и возвращаться в свою страну."],
        fr: ["Toute personne a le droit de circuler librement et de choisir sa résidence à l'intérieur d'un État.", "Toute personne a le droit de quitter tout pays, y compris le sien, et de revenir dans son pays."],
        ar: ["لكل فرد الحق في التنقل والإقامة داخل حدود كل دولة.", "ولكل فرد الحق في مغادرة أي بلد، بما في ذلك بلده، والعودة إلى بلده."] },
      { n: 14,
        zh: ["人人有权在其他国家寻求和享受庇护以避免迫害。", "在真正由于非政治性的罪行或违背联合国的宗旨和原则的行为而被起诉的情况下，不得援用此种权利。"],
        en: ["Everyone has the right to seek and to enjoy in other countries asylum from persecution.", "This right may not be invoked in the case of prosecutions genuinely arising from non-political crimes or from acts contrary to the purposes and principles of the United Nations."],
        ru: ["Каждый человек имеет право искать убежище от преследования и пользоваться этим убежищем в других странах.", "Это право не может быть использовано в случае преследования, в действительности основанного на совершении неполитического преступления, или деяния, противоречащего целям и принципам Организации Объединенных Наций."],
        fr: ["Devant la persécution, toute personne a le droit de chercher asile et de bénéficier de l'asile en d'autres pays.", "Cette clause ne peut être invoquée dans le cas de poursuites réellement fondées sur un crime de droit commun ou sur des agissements contraires aux buts et principes des Nations Unies."],
        ar: ["لكل فرد الحق في طلب اللجوء والتمتع به في بلاد أخرى هرباً من الاضطهاد.", "ولا يُنتفع بهذا الحق في حالة الملاحقات الناشئة فعلاً عن جرائم غير سياسية أو عن أفعال مخالفة لأغراض الأمم المتحدة ومبادئها."] },
      { n: 15,
        zh: ["人人有权享有国籍。", "任何人的国籍不得任意剥夺，亦不得否认其改变国籍的权利。"],
        en: ["Everyone has the right to a nationality.", "No one shall be arbitrarily deprived of his nationality nor denied the right to change his nationality."],
        ru: ["Каждый человек имеет право на гражданство.", "Никто не может быть произвольно лишен своего гражданства или права изменить свое гражданство."],
        fr: ["Tout individu a droit à une nationalité.", "Nul ne peut être arbitrairement privé de sa nationalité, ni du droit de changer de nationalité."],
        ar: ["لكل فرد الحق في جنسية ما.", "ولا يجوز حرمان أحد من جنسياته أو إنكار حقه في تغيير جنسياته تعسفاً."] },
      { n: 16,
        zh: ["成年男女，不受种族、国籍或宗教的任何限制有权婚嫁和成立家庭。他们在婚姻方面，在结婚期间和在解除婚约时，应有平等的权利。", "只有经男女双方的自由和完全的同意，才能缔婚。", "家庭是天然的和基本的社会单元，并应受社会和国家的保护。"],
        en: ["Men and women of full age, without any limitation due to race, nationality or religion, have the right to marry and to found a family. They are entitled to equal rights as to marriage, during marriage and at its dissolution.", "Marriage shall be entered into only with the free and full consent of the intending spouses.", "The family is the natural and fundamental group unit of society and is entitled to protection by society and the State."],
        ru: ["Мужчины и женщины, достигшие совершеннолетия, имеют право без всяких ограничений, обусловленных расой, национальностью или религией, вступать в брак и основывать семью. Они пользуются одинаковыми правами в отношении вступления в брак, во время состояния в браке и во время его расторжения.", "Брак может быть заключен только при свободном и полном согласии обеих вступающих в брак сторон.", "Семья является естественной и основной ячейкой общества и имеет право на защиту со стороны общества и государства."],
        fr: ["À partir de l'âge nubile, l'homme et la femme, sans aucune restriction quant à la race, la nationalité ou la religion, ont le droit de se marier et de fonder une famille. Ils ont des droits égaux au regard du mariage, durant le mariage et lors de sa dissolution.", "Le mariage ne peut être conclu qu'avec le libre et plein consentement des futurs époux.", "La famille est l'élément naturel et fondamental de la société et a droit à la protection de la société et de l'État."],
        ar: ["للرجل والمرأة، بعد بلوغهما سن الرشد، دون أي قيد بسبب العنصر أو الجنسية أو الدين، الحق في الزواج وتأسيس أسرة، ولهما عند الزواج وأثناء قيامه وانحلاله حقوق متساوية.", "لا يعقد الزواج إلا برضا الطرفين المرتاضَين الكاملَين الرغبة في ذلك.", "الأسرة هي الوحدة الطبيعية والأساسية للمجتمع ولها الحق في حماية المجتمع والدولة."] },
      { n: 17,
        zh: ["人人得有单独的财产所有权以及同他人合有的所有权。", "任何人的财产不得任意剥夺。"],
        en: ["Everyone has the right to own property alone as well as in association with others.", "No one shall be arbitrarily deprived of his property."],
        ru: ["Каждый человек имеет право владеть имуществом как единолично, так и совместно с другими.", "Никто не должен быть произвольно лишен своего имущества."],
        fr: ["Toute personne, aussi bien seule qu'en association avec autrui, a droit à la propriété.", "Nul ne peut être arbitrairement privé de sa propriété."],
        ar: ["لكل فرد الحق في التملك منفرداً أو مشتركاً مع غيره.", "ولا يجوز تجريد أحد من ملكه تعسفاً."] },
      { n: 18,
        zh: ["人人有思想、良心和宗教自由的权利；此项权利包括改变他的宗教或信仰的自由，以及单独或集体、公开或秘密地以教义、实践、礼拜和戒律表示他的宗教或信仰的自由。"],
        en: ["Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance."],
        ru: ["Каждый человек имеет право на свободу мысли, совести и религии; это право включает свободу менять свою религию или убеждения и свободу исповедовать свою религию или убеждения как единолично, так и сообща с другими, публичным или частным порядком в учении, богослужении и выполнении религиозных и ритуальных обрядов."],
        fr: ["Toute personne a droit à la liberté de pensée, de conscience et de religion; ce droit implique la liberté de changer de religion ou de conviction ainsi que la liberté de manifester sa religion ou sa conviction, seule ou en commun, tant en public qu'en privé, par l'enseignement, les pratiques, le culte et l'accomplissement des rites."],
        ar: ["لكل فرد الحق في حرية الفكر والضمير والديانة، ويشمل هذا الحق حرية تغيير ديانته أو عقيدته، وحرية إظهار الديانة أو العقيدة بالعبادة أو بإقامة الشعائر أو بممارسة التعاليم، سواء أكان ذلك على انفراد أم مع جماعة."] },
      { n: 19,
        zh: ["人人有权享有主张和发表意见的自由；此项权利包括持有主张而不受干涉的自由，和通过任何媒介和不论国界寻求、接受和传递消息和思想的自由。"],
        en: ["Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers."],
        ru: ["Каждый человек имеет право на свободу убеждений и на свободное выражение их; это право включает свободу беспрепятственно придерживаться своих убеждений и свободу искать, получать и распространять информацию и идеи любыми средствами и независимо от государственных границ."],
        fr: ["Tout individu a droit à la liberté d'opinion et d'expression, ce qui implique le droit de ne pas être inquiété pour ses opinions et celui de chercher, de recevoir et de répandre, sans considérations de frontières, les informations et les idées par quelque moyen d'expression que ce soit."],
        ar: ["لكل فرد الحق في حرية الرأي والتعبير، ويشمل هذا الحق حرية اعتناق الآراء دون تدخل، واستقاء الأنباء والأفكار وتلقيها وإذاعتها بأي وسيلة وأياً كانت حدود القطر."] },
      { n: 20,
        zh: ["人人有权享有和平集会和结社的自由。", "任何人不得迫使隶属于某一团体。"],
        en: ["Everyone has the right to freedom of peaceful assembly and association.", "No one may be compelled to belong to an association."],
        ru: ["Каждый человек имеет право на свободу мирных собраний и ассоциаций.", "Никто не может быть принуждаем вступать в какую-либо ассоциацию."],
        fr: ["Toute personne a droit à la liberté de réunion et d'association pacifiques.", "Nul ne peut être obligé de faire partie d'une association."],
        ar: ["لكل فرد الحق في حرية الالتماسات والجمعيات السلمية.", "ولا يجوز إجبار أحد على الانتماء إلى جمعية ما."] },
      { n: 21,
        zh: ["人人有直接或通过自由选择的代表参与治理本国的权利。", "人人有平等机会参加本国公务的权利。", "人民的意志是政府权力的基础；这一意志应以定期的和真正的选举予以表现，而选举应依据普遍和平等的投票权，并以不记名投票或相当的自由投票程序进行。"],
        en: ["Everyone has the right to take part in the government of his country, directly or through freely chosen representatives.", "Everyone has the right of equal access to public service in his country.", "The will of the people shall be the basis of the authority of government; this will shall be expressed in periodic and genuine elections which shall be by universal and equal suffrage and shall be held by secret vote or by equivalent free voting procedures."],
        ru: ["Каждый человек имеет право принимать участие в управлении своей страной непосредственно или через посредство свободно избранных представителей.", "Каждый человек имеет право равного доступа к государственной службе в своей стране.", "Воля народа должна быть основой власти правительства; эта воля должна находить себе выражение в периодических и нефальсифицированных выборах, которые должны проводиться при всеобщем и равном избирательном праве, путем тайного голосования или же посредством других равнозначных форм, обеспечивающих свободу голосования."],
        fr: ["Toute personne a le droit de prendre part à la direction des affaires publiques de son pays, soit directement, soit par l'intermédiaire de représentants librement choisis.", "Toute personne a droit à accéder, dans des conditions d'égalité, aux fonctions publiques de son pays.", "La volonté du peuple est le fondement de l'autorité des pouvoirs publics; cette volonté doit s'exprimer par des élections honnêtes qui doivent avoir lieu périodiquement, au suffrage universel égal et au vote secret, ou suivant une procédure équivalente assurant la liberté du vote."],
        ar: ["لكل فرد الحق في المشاركة في إدارة الشؤون العامة لبلاده، أياً كانت طريقة هذه المشاركة، سواء أكانت مباشرة أم عن طريق ممثلين يختارهم اختياراً حراً.", "ولكل فرد الحق في تولي الوظائف العامة في بلاده على قدم المساواة.", "إن إرادة الشعب هي مصدر سلطة الحكومة، ويعبَّر عن هذه الإرادة في انتخابات نزيهة دورية تُجرى على أساس الاقتراع العام المتساوي بالتصويت السري أو بحسب إجراء مماثل يكفل حرية التصويت."] },
      { n: 22,
        zh: ["每个人，作为社会的一员，有权享受社会保障，并有权享受他的个人尊严和人格的自由发展所必需的经济、社会和文化方面各种权利的实现，这种实现是通过国家努力和国际合作并依照各国的组织和资源情况。"],
        en: ["Everyone, as a member of society, has the right to social security and is entitled to realization, through national effort and international co-operation and in accordance with the organization and resources of each State, of the economic, social and cultural rights indispensable for his dignity and the free development of his personality."],
        ru: ["Каждый человек, как член общества, имеет право на социальное обеспечение и на осуществление необходимых для поддержания его достоинства и для свободного развития его личности прав в экономической, социальной и культурной областях через посредство национальных усилий и международного сотрудничества и в соответствии со структурой и ресурсами каждого государства."],
        fr: ["Toute personne, en tant que membre de la société, a droit à la sécurité sociale; elle est fondée à obtenir la satisfaction des droits économiques, sociaux et culturels indispensables à sa dignité et au libre développement de sa personnalité, grâce à l'effort national et à la coopération internationale, compte tenu de l'organisation et des ressources de chaque pays."],
        ar: ["لكل فرد بصفته عضواً في المجتمع الحق في الضمان الاجتماعي، وفي الحصول، عن طريق الجهد الوطني والتعاون الدولي، وبما يتفق مع تنظيم كل دولة ومواردها، على جميع الحقوق الاقتصادية والاجتماعية والثقافية اللازمة لكرامته وللنمو الحر لشخصيته."] },
      { n: 23,
        zh: ["人人有权工作、自由选择职业、享受公正和合适的工作条件并享受免于失业的保障。", "人人有同工同酬的权利，不受任何歧视。", "每一个工作的人，有权享受公正和合适的报酬，保证使他本人和家属有一个符合人的生活条件，必要时并辅以其他方式的社会保障。", "人人有为维护其利益而组织和参加工会的权利。"],
        en: ["Everyone has the right to work, to free choice of employment, to just and favourable conditions of work and to protection against unemployment.", "Everyone, without any discrimination, has the right to equal pay for equal work.", "Everyone who works has the right to just and favourable remuneration ensuring for himself and his family an existence worthy of human dignity, and supplemented, if necessary, by other means of social protection.", "Everyone has the right to form and to join trade unions for the protection of his interests."],
        ru: ["Каждый человек имеет право на труд, на свободный выбор работы, на справедливые и благоприятные условия труда и на защиту от безработицы.", "Каждый человек, без какого-либо различия, имеет право на равную оплату за равный труд.", "Каждый работающий имеет право на справедливое и удовлетворительное вознаграждение, обеспечивающее достойное человека существование для него самого и его семьи и дополняемое, при необходимости, другими средствами социального обеспечения.", "Каждый человек имеет право создавать профессиональные союзы и входить в профессиональные союзы для защиты своих интересов."],
        fr: ["Toute personne a droit au travail, au libre choix de son travail, à des conditions équitables et satisfaisantes de travail et à la protection contre le chômage.", "Tous ont droit, sans aucune discrimination, à un salaire égal pour un travail égal.", "Quiconque travaille a droit à une rémunération équitable et satisfaisante lui assurant ainsi qu'à sa famille une existence conforme à la dignité humaine et complétée, s'il y a lieu, par tous autres moyens de protection sociale.", "Toute personne a le droit de fonder avec d'autres des syndicats et de s'affilier à des syndicats pour la défense de ses intérêts."],
        ar: ["لكل فرد الحق في العمل، وفي حرية اختيار عمله، وفي ظروف عمل عادلة وميسرة، وفي الحماية من البطالة.", "ولكل فرد، دون أي تمييز، الحق في أجر متساوٍ عن عمل متساوٍ.", "ولكل فرد الذي يعمل حقاً في أجر عادل وميسور يكفيه وولديه معيشة إنسانية كريمة، ويضاف إليه، عند الاقتضاء، وسائل أخرى للرعاية الاجتماعية.", "ولكل فرد الحق في تأسيس النقابات مع غيره والانتساب إليها صوناً لمصالحه."] },
      { n: 24,
        zh: ["人人有享有休息和闲暇的权利，包括工作时间有合理限制和定期给薪休假的权利。"],
        en: ["Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay."],
        ru: ["Каждый человек имеет право на отдых и досуг, включая право на разумное ограничение рабочего дня и на оплачиваемый периодический отпуск."],
        fr: ["Toute personne a droit au repos et aux loisirs et notamment à une limitation raisonnable de la durée du travail et à des congés payés périodiques."],
        ar: ["لكل فرد الحق في الراحة والفراغ، ولا سيما في التقييد المعقول لساعات العمل وفي العطلات الدورية بأجر."] },
      { n: 25,
        zh: ["人人有权享受为维持他本人和家属的健康和福利所需的生活水准，包括食物、衣着、住房、医疗和必要的社会服务；在遭到失业、疾病、残废、守寡、衰老或在其他不能控制的情况下丧失谋生能力时，有权享受保障。", "母亲和儿童有权享受特别照顾和协助。一切儿童，无论婚生或非婚生，都应享受同样的社会保护。"],
        en: ["Everyone has the right to a standard of living adequate for the health and well-being of himself and of his family, including food, clothing, housing and medical care and necessary social services, and the right to security in the event of unemployment, sickness, disability, widowhood, old age or other lack of livelihood in circumstances beyond his control.", "Motherhood and childhood are entitled to special care and assistance. All children, whether born in or out of wedlock, shall enjoy the same social protection."],
        ru: ["Каждый человек имеет право на такой жизненный уровень, включая пищу, одежду, жилище, медицинский уход и необходимое социальное обслуживание, который необходим для поддержания благосостояния его самого и его семьи, и право на обеспечение в случае безработицы, болезни, инвалидности, вдовства, наступления старости или иного случая утраты средств к существованию по не зависящим от него обстоятельствам.", "Материнство и младенчество дают право на особое попечение и помощь. Все дети, родившиеся в браке или вне брака, должны пользоваться одинаковой социальной защитой."],
        fr: ["Toute personne a droit à un niveau de vie suffisant pour assurer sa santé, son bien-être et ceux de sa famille, notamment pour l'alimentation, l'habillement, le logement, les soins médicaux ainsi que pour les services sociaux nécessaires; elle a droit à la sécurité en cas de chômage, de maladie, d'invalidité, de veuvage, de vieillesse ou en cas de perte de ses moyens de subsistance par suite de circonstances indépendantes de sa volonté.", "La maternité et l'enfance ont droit à une aide et à une assistance spéciales. Tous les enfants, qu'ils soient nés dans le mariage ou hors mariage, jouissent de la même protection sociale."],
        ar: ["لكل فرد الحق في مستوى معيشة كافٍ للرفاه والصحة له وولأسرته، ويشمل ذلك الغذاء والملبس والمسكن والرعاية الطبية وخدمات اجتماعية ضرورية، وفي الحق في تأمين معيشته في حالات البطالة والمرض والعجز والترمل والشيخوخة وكل حالة فقدان لوسائل العيش نتيجة لظروف خارجة عن إرادته.", "للأمومة والطفولة الحق في رعاية ومساعدة خاصتين، ويتمتع جميع الأبناء، سواء أكانوا مولودين داخل الزواج أم خارجه، بحماية اجتماعية ذاتها."] },
      { n: 26,
        zh: ["人人都有受教育的权利，教育应当免费，至少在初级和基本阶段应如此。初级教育应属义务性质。技术和职业教育应普遍设立。高等教育应根据成绩而对一切人平等开放。", "教育的目的在于充分发展人的个性并加强对人权和基本自由的尊重。教育应促进各国、各种族或各宗教集团间的了解、容忍和友谊，并应促进联合国维护和平的各项活动。", "父母对其子女所应受的教育的种类，有优先选择的权利。"],
        en: ["Everyone has the right to education. Education shall be free, at least in the elementary and fundamental stages. Elementary education shall be compulsory. Technical and professional education shall be made generally available and higher education shall be equally accessible to all on the basis of merit.", "Education shall be directed to the full development of the human personality and to the strengthening of respect for human rights and fundamental freedoms. It shall promote understanding, tolerance and friendship among all nations, racial or religious groups, and shall further the activities of the United Nations for the maintenance of peace.", "Parents have a prior right to choose the kind of education that shall be given to their children."],
        ru: ["Каждый человек имеет право на образование. Образование должно быть бесплатным, по меньшей мере в том, что касается начального и общего образования. Начальное образование должно быть обязательным. Техническое и профессиональное образование должно быть общедоступным, и высшее образование должно быть одинаково доступным для всех на основе способностей.", "Образование должно быть направлено к полному развитию человеческой личности и к увеличению уважения к правам человека и основным свободам. Образование должно содействовать взаимопониманию, терпимости и дружбе между всеми народами, расовыми и религиозными группами и должно содействовать деятельности Организации Объединенных Наций по поддержанию мира.", "Родители имеют право приоритета в выборе вида образования для малолетних детей."],
        fr: ["Toute personne a droit à l'éducation. L'éducation doit être gratuite, au moins en ce qui concerne l'enseignement élémentaire et fondamental. L'enseignement élémentaire est obligatoire. L'enseignement technique et professionnel doit être généralisé; l'accès aux études supérieures doit être ouvert en pleine égalité à tous en fonction de leur mérite.", "L'éducation doit viser au plein épanouissement de la personnalité humaine et au renforcement du respect des droits de l'homme et des libertés fondamentales. Elle doit favoriser la compréhension, la tolérance et l'amitié entre toutes les nations et tous les groupes raciaux ou religieux, ainsi que le développement des activités des Nations Unies pour le maintien de la paix.", "Les parents ont, par priorité, le droit de choisir le genre d'éducation à donner à leurs enfants."],
        ar: ["لكل فرد الحق في التعليم، وواجب أن يكون التعليم في مراحله الأولية والأساسية على الأقل مجانياً، وأن يكون التعليم الابتدائي إلزامياً، وأن يكون التعليم الفني والمهني متاحاً للعموم، وأن يكون التعليم العالي متاحاً للجميع على قدم المساواة تماماً على أساس الكفاءة.", " وأن يكون الهدف من التعليم أن ينمي شخصية الإنسان إنماءً كاملاً وأن يقوي احترام حقوق الإنسان والحريات الأساسية، وأن يعمل التعليم على نفهم التسامح والصداقة بين جميع الأمم والجماعات العنصرية أو الدينية، وأن يزيد نشاط الأمم المتحدة في صون السلام.", "وللوالدين الحق في أولوية اختيار نوع التعليم الذي يُولد لأبنائهم."] },
      { n: 27,
        zh: ["人人有权自由参加社会的文化生活，享受艺术，并分享科学进步及其产生的福利。", "人人对由于他所创作的任何科学、文学或美术作品而产生的精神和物质的利益，有享受保护的权利。"],
        en: ["Everyone has the right freely to participate in the cultural life of the community, to enjoy the arts and to share in scientific advancement and its benefits.", "Everyone has the right to the protection of the moral and material interests resulting from any scientific, literary or artistic production of which he is the author."],
        ru: ["Каждый человек имеет право свободно участвовать в культурной жизни общества, наслаждаться искусством, участвовать в научном прогрессе и пользоваться его благами.", "Каждый человек имеет право на защиту его моральных и материальных интересов, являющихся результатом научных, литературных или художественных трудов, автором которых он является."],
        fr: ["Toute personne a le droit de prendre part librement à la vie culturelle de la communauté, de jouir des arts et de participer au progrès scientifique et aux bienfaits qui en résultent.", "Chacun a droit à la protection des intérêts moraux et matériels découlant de toute production scientifique, littéraire ou artistique dont il est l'auteur."],
        ar: ["لكل فرد الحق في أن يشارك حرة في الحياة الثقافية للمجتمع، وفي أن يستمتع بالفنون، وأن يشترك في التقدم العلمي وفي منافعه.", "ولكل فرد الحق في صون المصالح المعنوية والمادية المترتبة على أي إنتاج علمي أو أدبي أو فني يصدر عنه."] },
      { n: 28,
        zh: ["人人有权要求一种社会的和国际的秩序，在这种秩序中，本宣言所载的权利和自由能获得充分实现。"],
        en: ["Everyone is entitled to a social and international order in which the rights and freedoms set forth in this Declaration can be fully realized."],
        ru: ["Каждый человек имеет право на социальный и международный порядок, при котором права и свободы, изложенные в настоящей Декларации, могут быть полностью осуществлены."],
        fr: ["Toute personne a droit à ce que règne, sur le plan social et sur le plan international, un ordre tel que les droits et libertés énoncés dans la présente Déclaration puissent y trouver plein effet."],
        ar: ["لكل فرد الحق في وجود نظام اجتماعي ودولي تحقق بموجبه الحقوق والحريات الواردة في هذا الإعلان تحققاً تاماً."] },
      { n: 29,
        zh: ["人人对社会负有义务，因为只有在社会中他的个性才可能得到自由和充分的发展。", "人在行使他的权利和自由时，只受法律所确定的限制，确定此种限制的唯一目的在于保证对旁人的权利和自由给予应有的承认和尊重，并在一个民主的社会中适应道德、公共秩序和普遍福利的正当需要。", "这些权利和自由的行使，无论在任何情形下均不得违背联合国的宗旨和原则。"],
        en: ["Everyone has duties to the community in which alone the free and full development of his personality is possible.", "In the exercise of his rights and freedoms, everyone shall be subject only to such limitations as are determined by law solely for the purpose of securing due recognition and respect for the rights and freedoms of others and of meeting the just requirements of morality, public order and the general welfare in a democratic society.", "These rights and freedoms may in no case be exercised contrary to the purposes and principles of the United Nations."],
        ru: ["Каждый человек имеет обязанности перед обществом, в котором только и возможно свободное и полное развитие его личности.", "При осуществлении своих прав и свобод каждый человек должен подвергаться только таким ограничениям, какие установлены законом исключительно с целью обеспечения должного признания и уважения прав и свобод других и удовлетворения справедливых требований морали, общественного порядка и общего благосостояния в демократическом обществе.", "Осуществление этих прав и свобод ни в каком случае не должно противоречить целям и принципам Организации Объединенных Наций."],
        fr: ["L'individu a des devoirs envers la communauté, dans laquelle seule le libre et plein développement de sa personnalité est possible.", "Dans l'exercice de ses droits et dans la jouissance de ses libertés, chacun n'est soumis qu'aux limitations établies par la loi exclusivement en vue d'assurer la reconnaissance et le respect des droits et libertés d'autrui et afin de satisfaire aux justes exigences de la morale, de l'ordre public et du bien-être général dans une société démocratique.", "Ces droits et libertés ne pourront, en aucun cas, s'exercer contrairement aux buts et principes des Nations Unies."],
        ar: ["على الفرد واجبات تجاه المجتمع الذي تتيح له وحده التنمية الحرة والكاملة لشخصيته.", "ولا يخضع الفرد في استعمال حقوقه وحرياته إلا لتلك القيود التي حددها القانون حصراً بهدف تأمين الاعتراف بحقوق وحريات الآخرين واحترامها، ولإشباع المقتضيات العادلة للنظام الأخلاقي والنظام العام والرفاه العام في مجتمع ديمقراطي.", "ولا يجوز استعمال هذه الحقوق والحريات في أي حال خلافاً لأغراض الأمم المتحدة ومبادئها."] },
      { n: 30,
        zh: ["本宣言的任何条文，不得解释为默许任何国家、集团或个人有权进行任何旨在破坏本宣言所载的任何权利和自由的活动或行为。"],
        en: ["Nothing in this Declaration may be interpreted as implying for any State, group or person any right to engage in any activity or to perform any act aimed at the destruction of any of the rights and freedoms set forth herein."],
        ru: ["Ничто в настоящей Декларации не может быть истолковано как предоставление какому-либо государству, группе лиц или отдельным лицам права заниматься какой-либо деятельностью или совершать действия, направленные к уничтожению прав и свобод, изложенных в настоящей Декларации."],
        fr: ["Aucune disposition de la présente Déclaration ne peut être interprétée comme impliquant pour un État, un groupement ou un individu un droit quelconque de se livrer à une activité ou d'accomplir un acte visant à la destruction des droits et libertés qui y sont énoncés."],
        ar: ["لا يجوز تفسير ما في هذا الإعلان على أنه يخول لأي دولة أو جماعة أو فرد أي حق في الانخراط في أي نشاط أو القيام بأي عمل يهدف إلى إخلال بأي حق من الحقوق والحريات الواردة فيه."] }
    ]
  };

  /* -------------------------------------------------------
     世界和平页文案（五语）
     ------------------------------------------------------- */
  const PW = {
    brand:        { zh: "世界和平", en: "World Peace", ru: "Всемирный мир", fr: "Paix mondiale", ar: "السلام العالمي" },
    brandSub:     { zh: "World Peace · 世界和平", en: "World Peace · 世界和平", ru: "World Peace · Всемирный мир", fr: "World Peace · Paix mondiale", ar: "World Peace · السلام العالمي" },
    navWish:      { zh: "我的愿望", en: "A wish", ru: "Моё пожелание", fr: "Un vœu", ar: "أمنيتي" },
    navDecl:      { zh: "人权宣言全文", en: "The Declaration", ru: "Текст Декларации", fr: "La Déclaration", ar: "نص الإعلان" },
    navStarway:   { zh: "星轨计划", en: "Starway Project", ru: "Проект Starway", fr: "Projet Starway", ar: "مشروع ستارواي" },
    navBack:      { zh: "← 星轨工作室", en: "← Starway studio", ru: "← Студия Starway", fr: "← Studio Starway", ar: "← استوديو ستارواي" },
    musicOn:      { zh: "和平之歌", en: "Song of Peace", ru: "Песнь мира", fr: "Chant de la paix", ar: "نشيد السلام" },
    musicOff:     { zh: "播放", en: "Play", ru: "Слушать", fr: "Écouter", ar: "تشغيل" },
    eyebrow:      { zh: "A personal statement · 2026", en: "A personal statement · 2026", ru: "Личное заявление · 2026", fr: "Une déclaration personnelle · 2026", ar: "بيان شخصي · 2026" },
    unBlueCap:    { zh: "联合国蓝 · UNITED NATIONS BLUE", en: "UNITED NATIONS BLUE", ru: "Голубой цвет ООН · UNITED NATIONS BLUE", fr: "Bleu des Nations Unies · UNITED NATIONS BLUE", ar: "الأزرق الأممي · UNITED NATIONS BLUE" },
    heroTitle:    { zh: "愿<em>世界</em><br>和平", en: "May there<br>be <em>peace</em>", ru: "Да будет<br>на Земле <em>мир</em>", fr: "Que règne<br>la <em>paix</em> sur Terre", ar: "ليسود <em>السلام</em><br>في العالم" },
    lede:         { zh: "这不是一个游戏项目，也不是一句标语。这是一名普通创作者，在 2026 年最想留下的一句话。",
                    en: "This is not a game project, and not a slogan. It is the one sentence an ordinary maker most wants to leave behind in 2026.",
                    ru: "Это не игровой проект и не лозунг. Это одна фраза, которую обычный создатель больше всего хочет оставить после себя в 2026 году.",
                    fr: "Ce n'est ni un projet de jeu ni un slogan. C'est la phrase qu'un créateur ordinaire souhaite le plus laisser derrière lui en 2026.",
                    ar: "هذا ليس مشروع لعبة ولا شعاراً. إنها الجملة التي يود صانع عادي أن يتركها من بعده في عام 2026." },
    sign:         { zh: "星轨工作室 · 独立游戏开发者", en: "Starway Studio · independent game developer", ru: "Студия Starway · независимый разработчик игр", fr: "Studio Starway · développeur de jeux indépendant", ar: "استوديو ستارواي · مطور ألعاب مستقل" },
    wishLabel:    { zh: "我的愿望 · A WISH", en: "A WISH · 我的愿望", ru: "МОЁ ПОЖЕЛАНИЕ · A WISH", fr: "UN VŒU · 我的愿望", ar: "أمنيتي · A WISH" },
    wish1:        { zh: "我做游戏，是因为相信故事能让人更理解彼此。但有些话，比故事更重要，也更简单——我希望这个世界和平。",
                    en: "I make games because I believe stories help people understand each other. But some things matter more than stories, and are far simpler — I want this world to be at peace.",
                    ru: "Я делаю игры, потому что верю: истории помогают людям понимать друг друга. Но кое-что важнее историй и куда проще — я хочу, чтобы в этом мире был мир.",
                    fr: "Je fais des jeux parce que je crois que les histoires aident les gens à se comprendre. Mais certaines choses comptent plus que les histoires, et sont plus simples — je veux que le monde soit en paix.",
                    ar: "أصنع الألعاب لأنني أعتقد أن القصص تساعد الناس على تفهم بعضهم بعضاً. لكن هناك ما هو أهم من القصص وأبسط — أريد أن يكون هذا العالم في سلام." },
    wish2:        { zh: "它不是一句口号。它意味着：孩子可以在夜里安睡，而不是在警报声中醒来；一个家庭不必因为战争、贫困或一场灾难，失去本可以留住的人；一个人的尊严，不因为出生在哪里、说什么语言、相信什么，而被削减一分。",
                    en: "It is not a slogan. It means: a child can sleep through the night instead of waking to sirens; a family does not lose someone who could have been saved, to war or poverty or a single disaster; a person's dignity is not diminished by where they were born, what language they speak, or what they believe.",
                    ru: "Это не лозунг. Это значит: ребёнок может спать спокойно ночью, а не просыпаться от сирен; семья не теряет того, кого можно было спасти, из-за войны, бедности или одной катастрофы; достоинство человека не умаляется от того, где он родился, на каком языке говорит и во что верит.",
                    fr: "Ce n'est pas un slogan. Cela signifie : un enfant peut dormir la nuit au lieu de se réveiller sous les sirènes ; une famille ne perd pas quelqu'un qui aurait pu être sauvé, à cause de la guerre, de la pauvreté ou d'une seule catastrophe ; la dignité d'une personne n'est pas diminuée par le lieu où elle est née, la langue qu'elle parle ou ce qu'elle croit.",
                    ar: "هذا ليس شعاراً. إنه يعني: أن ينام الطفل ليلته بدلاً من أن يستيقظ على صافرات الإنذار؛ ألا تفقد أسرة إنساناً كان يمكن إنقاذه بسبب حرب أو فقر أو كارثة واحدة؛ ألا تنقص كرامة الإنسان بسبب مكان ولادته أو لغته أو عقيدته." },
    wish3:        { zh: "这些不是我的发明。1948 年 12 月 10 日，联合国大会通过《世界人权宣言》，把“人人生而自由，在尊严和权利上一律平等”写成了所有国家共同的标准。七十多年过去，它仍未被完全实现——而这正是它值得被一遍遍读出来的原因。",
                    en: "None of this is my invention. On 10 December 1948 the United Nations General Assembly adopted the Universal Declaration of Human Rights, setting down “all human beings are born free and equal in dignity and rights” as a common standard for every nation. Seventy-eight years later it is still not fully realised — which is exactly why it deserves to be read again and again.",
                    ru: "Ничто из этого не моё изобретение. 10 декабря 1948 года Генеральная Ассамблея ООН приняла Всеобщую декларацию прав человека, записав «все люди рождаются свободными и равными в достоинстве и правах» как общий стандарт для всех государств. Спустя почти восемьдесят лет он всё ещё не воплощён полностью — именно поэтому его стоит перечитывать снова и снова.",
                    fr: "Rien de tout cela n'est de mon invention. Le 10 décembre 1948, l'Assemblée générale des Nations Unies a adopté la Déclaration universelle des droits de l'homme, écrivant que « tous les êtres humains naissent libres et égaux en dignité et en droits » comme norme commune à toutes les nations. Presque quatre-vingts ans plus tard, elle n'est pas encore pleinement réalisée — c'est précisément pourquoi elle mérite d'être relue encore et encore.",
                    ar: "لا شيء مما سبق من اختراعي. ففي 10 ديسمبر 1948 أقرّت الجمعية العامة للأمم المتحدة الإعلان العالمي لحقوق الإنسان، وجعلت من «ولادة جميع الناس أحراراً متساوين في الكرامة والحقوق» معياراً مشتركاً لكل الأمم. وبعد قرابة ثمانين عاماً لم يتحقق بعد تحققاً كاملاً — ولهذا بالضبط يستحق أن يُقرأ مرة بعد مرة." },
    wish4:        { zh: "所以我把这一页放在这里。它不属于任何一个游戏，也不为了卖什么。它只是一个人，在 2026 年的一个愿望。",
                    en: "So I keep this page here. It belongs to no game, and it sells nothing. It is only one person's wish, in 2026.",
                    ru: "Поэтому я оставляю эту страницу здесь. Она не принадлежит ни одной игре и ничего не продаёт. Это лишь пожелание одного человека в 2026 году.",
                    fr: "Alors je laisse cette page ici. Elle n'appartient à aucun jeu et ne vend rien. Ce n'est que le vœu d'une seule personne, en 2026.",
                    ar: "لذلك أترك هذه الصفحة هنا. هي لا تنتمي إلى أي لعبة، ولا تبيع شيئاً. إنها مجرد أمنية إنسان واحد في عام 2026." },
    sig1:         { zh: "—— 星轨工作室，2026 年 10 月", en: "— Starway Studio, October 2026", ru: "— Студия Starway, октябрь 2026", fr: "— Studio Starway, octobre 2026", ar: "— استوديو ستارواي، أكتوبر 2026" },
    whyEb:        { zh: "Why this document", en: "Why this document", ru: "Почему этот документ", fr: "Pourquoi ce document", ar: "لماذا هذا الوثيقة" },
    whyTitle:     { zh: "和平不只是没有战争", en: "Peace is more than the absence of war", ru: "Мир — это больше, чем отсутствие войны", fr: "La paix est plus que l'absence de guerre", ar: "السلام أكثر من مجرد غياب الحرب" },
    why1:         { zh: "战争是和平最响亮的敌人，但远不是唯一的。贫困、歧视、失学、无医可求、无法发声——这些安静的东西，同样在一点一点拿走一个人的安全感。",
                    en: "War is the loudest enemy of peace, but far from the only one. Poverty, discrimination, no school to go to, no doctor to see, no way to speak — these quieter things take away a person's sense of safety just as surely.",
                    ru: "Война — самый громкий враг мира, но далеко не единственный. Бедность, дискриминация, отсутствие школы, врача, возможности голоса — эти тихие вещи точно так же отнимают у человека чувство безопасности.",
                    fr: "La guerre est l'ennemie la plus bruyante de la paix, mais loin d'être la seule. La pauvreté, la discrimination, l'école absente, le médecin introuvable, la parole impossible — ces choses silencieuses retirent tout autant à une personne son sentiment de sécurité.",
                    ar: "الحرب هي أعسى أعداء السلام صخباً، لكنها ليست الوحيدة. الفقر والتمييز وانعدام المدرسة والطبيب وغياب الصوت — هذه الأمور الصامتة تسلب الإنسان إحساسه بالأمان بالقدر نفسه." },
    why2:         { zh: "《世界人权宣言》开篇第一句就写清楚了这件事：对人人固有尊严与平等权利的承认，<strong>乃是世界自由、正义与和平的基础</strong>。它把“和平”从停火协议里拉出来，放回到每一个具体的人身上。",
                    en: "The Declaration says it in its very first line: recognition of the inherent dignity and of the equal rights of all members of the human family <strong>is the foundation of freedom, justice and peace in the world</strong>. It lifts “peace” out of ceasefire agreements and puts it back onto individual people.",
                    ru: "Декларация говорит об этом в самой первой строке: признание присущего людям достоинства и равных прав <strong>является основой свободы, справедливости и всеобщего мира</strong>. Она вынимает «мир» из соглашений о прекращении огня и возвращает его конкретным людям.",
                    fr: "La Déclaration le dit dès sa première ligne : la reconnaissance de la dignité et des droits égaux de tous <strong>constitue le fondement de la liberté, de la justice et de la paix dans le monde</strong>. Elle sort la « paix » des accords de cessez-le-feu et la rend aux personnes concrètes.",
                    ar: "يقول الإعلان ذلك في سطره الأول: الاعتراف بالكرامة الأصيلة والحقوق المتساوية <strong>هو أساس الحرية والعدالة والسلام في العالم</strong>. إنه يُخرج «السلام» من اتفاقيات وقف إطلاق النار ويعيده إلى الناس أفراداً." },
    why3:         { zh: "我把全文放在下面，不加删改。一是因为它值得被完整读到；二是因为它给了“想帮别人”这件事一个不靠情绪的标准——不是同情，而是权利。",
                    en: "The full text is below, unabridged. Because it deserves to be read whole — and because it gives the wish to help a standard that does not depend on sentiment. Not charity: rights.",
                    ru: "Полный текст ниже, без сокращений. Потому что он заслуживает того, чтобы его прочитали целиком, — и потому что он даёт желанию помогать критерий, не зависящий от настроения. Не милостыня: права.",
                    fr: "Le texte intégral est ci-dessous, sans coupure. Parce qu'il mérite d'être lu en entier — et parce qu'il donne à l'envie d'aider un critère qui ne dépend pas du sentiment. Pas la charité : les droits.",
                    ar: "النص الكامل أدناه بلا حذف. لأنه يستحق أن يُقرأ كاملاً — ولأنه يمنح رغبة المساعدة معياراً لا يعتمد على المشاعر. ليس عطاءً، بل حقوقاً." },
    docTitle:     { zh: "世界人权宣言", en: "Universal Declaration of Human Rights", ru: "Всеобщая декларация прав человека", fr: "Déclaration universelle des droits de l'homme", ar: "الإعلان العالمي لحقوق الإنسان" },
    docMeta1:     { zh: "联合国大会 1948 年 12 月 10 日第 217A(III) 号决议通过并颁布", en: "Adopted by UN General Assembly resolution 217A (III), 10 December 1948", ru: "Принята резолюцией 217 A (III) Генеральной Ассамблеи ООН от 10 декабря 1948 года", fr: "Adoptée par l'Assemblée générale dans sa résolution 217 A (III) du 10 décembre 1948", ar: "أقرّتها الجمعية العامة بقرارها 217 (د-3) المؤرخ 10 ديسمبر 1948" },
    docMeta2:     { zh: "序言 + 三十条", en: "Preamble + 30 articles", ru: "Преамбула + 30 статей", fr: "Préambule + 30 articles", ar: "ديباجة + 30 مادة" },
    idxTitle:     { zh: "条款索引", en: "Index", ru: "Указатель статей", fr: "Index des articles", ar: "فهرس المواد" },
    idxBack:      { zh: "↑ 回到愿望", en: "↑ Back to the wish", ru: "↑ К пожеланию", fr: "↑ Revenir au vœu", ar: "↑ عودة إلى الأمنية" },
    preTitle:     { zh: "序　言", en: "PREAMBLE", ru: "ПРЕАМБУЛА", fr: "PRÉAMBULE", ar: "الديباجة" },
    source:       { zh: "文本来源：联合国，《世界人权宣言》中文文本（联合国大会 1948 年 12 月 10 日第 217A(III) 号决议）。本页仅作非商业性展示与传播，未作任何删改。",
                    en: "Source: United Nations, Universal Declaration of Human Rights (General Assembly resolution 217A (III), 10 December 1948). Reproduced here in full, unaltered, for non-commercial display.",
                    ru: "Источник: Организация Объединённых Наций, Всеобщая декларация прав человека (резолюция 217 A (III) от 10 декабря 1948 года). Приведена полностью, без изменений, в некоммерческих целях.",
                    fr: "Source : Nations Unies, Déclaration universelle des droits de l'homme (résolution 217 A (III) du 10 décembre 1948). Reproduite ici intégralement, sans modification, à des fins non commerciales.",
                    ar: "المصدر: الأمم المتحدة، الإعلان العالمي لحقوق الإنسان (قرار الجمعية العامة 217 (د-3) بتاريخ 10 ديسمبر 1948). نُقل هنا كاملاً دون تعديل لأغراض غير تجارية." },
    bridgeTitle:  { zh: "如果你也愿意做点什么", en: "If you would also like to do something", ru: "Если вы тоже хотите что-то сделать", fr: "Si vous voulez, vous aussi, faire quelque chose", ar: "إن كنت تريد أنت أيضاً أن تفعل شيئاً" },
    bridgeText:   { zh: "愿望之外，我们也做具体的事：星轨计划每月把收入的 2% 投入国内与海外的教育、医疗与净水项目，账目公开。",
                    en: "Beyond wishes, we do concrete things: the Starway Project puts 2% of monthly revenue into education, medical and water programs at home and abroad, with public accounts.",
                    ru: "Помимо пожеланий, мы делаем конкретные вещи: проект Starway ежемесячно направляет 2% доходов на программы образования, медицины и чистой воды дома и за рубежом, с открытыми счетами.",
                    fr: "Au-delà des vœux, nous faisons des choses concrètes : le Projet Starway consacre chaque mois 2 % de ses revenus à des programmes d'éducation, de santé et d'eau potable, en Chine et à l'étranger, avec des comptes publics.",
                    ar: "إلى جانب الأمنيات، نفعل أشياء ملموسة: مشروع ستارواي يوجّه شهرياً 2% من الدخل إلى برامج التعليم والصحة والمياه النظيفة داخل البلاد وخارجها، بحسابات مفتوحة." },
    bridgeLink:   { zh: "前往星轨计划 →", en: "Go to the Starway Project →", ru: "Перейти к проекту Starway →", fr: "Aller au Projet Starway →", ar: "الذهاب إلى مشروع ستارواي →" },
    fAbout:       { zh: "愿世界和平。这一页不属于星轨的任何一款游戏，只属于一个人的愿望。", en: "May peace prevail on Earth. This page belongs to no Starway game — only to one person's wish.", ru: "Да будет мир на Земле. Эта страница не принадлежит ни одной игре Starway — только пожеланию одного человека.", fr: "Que règne la paix sur Terre. Cette page n'appartient à aucun jeu Starway — seulement au vœu d'une personne.", ar: "ليسود السلام في العالم. هذه الصفحة لا تنتمي إلى أي لعبة من ألعاب ستارواي — بل إلى أمنية إنسان واحد." },
    fH4a:         { zh: "本页", en: "This page", ru: "Эта страница", fr: "Cette page", ar: "هذه الصفحة" },
    fH4b:         { zh: "星轨工作室", en: "Starway Studio", ru: "Студия Starway", fr: "Studio Starway", ar: "استوديو ستارواي" },
    fBottom1:     { zh: "© 2026 星轨工作室 · 本页为非商业性公益展示", en: "© 2026 Starway Studio · non-commercial public-interest page", ru: "© 2026 Студия Starway · некоммерческая страница", fr: "© 2026 Studio Starway · page non commerciale d'intérêt public", ar: "© 2026 استوديو ستارواي · صفحة غير تجارية للمصلحة العامة" },
    fBottom2:     { zh: "《世界人权宣言》文本版权属联合国", en: "Text of the Universal Declaration of Human Rights © United Nations", ru: "Текст Всеобщей декларации прав человека © Организация Объединённых Наций", fr: "Texte de la Déclaration universelle des droits de l'homme © Nations Unies", ar: "نص الإعلان العالمي لحقوق الإنسان © الأمم المتحدة" },
    fNavWish:     { zh: "我的愿望", en: "A wish", ru: "Моё пожелание", fr: "Un vœu", ar: "أمنيتي" },
    fNavFull:     { zh: "人权宣言全文", en: "Full declaration", ru: "Полный текст Декларации", fr: "Déclaration intégrale", ar: "نص الإعلان الكامل" },
    fNavIdx:      { zh: "条款索引", en: "Article index", ru: "Указатель статей", fr: "Index des articles", ar: "فهرس المواد" },
    fNavHome:     { zh: "官网首页", en: "Studio home", ru: "Сайт студии", fr: "Accueil du studio", ar: "صفحة الاستوديو" },
    fNavProj:     { zh: "星轨计划", en: "Starway Project", ru: "Проект Starway", fr: "Projet Starway", ar: "مشروع ستارواي" },
    fNavMinor:    { zh: "未成年人模式", en: "Minor Mode", ru: "Режим для несовершеннолетних", fr: "Mode mineurs", ar: "وضع القاصرين" },

    /* ---------- 联合国宪章 ---------- */
    navCharter:   { zh: "联合国宪章", en: "UN Charter", ru: "Устав ООН", fr: "Charte des Nations Unies", ar: "ميثاق الأمم المتحدة" },
    charterTitle: { zh: "联合国宪章", en: "Charter of the United Nations", ru: "Устав Организации Объединённых Наций", fr: "Charte des Nations Unies", ar: "ميثاق الأمم المتحدة" },
    charterMeta1: { zh: "1945 年 6 月 26 日订于旧金山 · 同年 10 月 24 日生效", en: "Signed at San Francisco, 26 June 1945 · in force 24 October 1945", ru: "Подписан в Сан-Франциско 26 июня 1945 г. · вступил в силу 24 октября 1945 г.", fr: "Signée à San Francisco le 26 juin 1945 · entrée en vigueur le 24 octobre 1945", ar: "وُقّع في سان فرانسيسكو في 26 حزيران/يونيه 1945 · ونفذ في 24 تشرين الأول/أكتوبر 1945" },
    charterMeta2: { zh: "序言 + 十九章 · 一百一十一条", en: "Preamble + 19 chapters · 111 articles", ru: "Преамбула + 19 глав · 111 статей", fr: "Préambule + 19 chapitres · 111 articles", ar: "ديباجة + 19 فصلاً · 111 مادة" },
    charterLead:  { zh: "《联合国宪章》是联合国的组织法。1945 年 6 月 26 日，五十个国家的代表在旧金山签署；同年 10 月 24 日生效，联合国由此成立。它在国际法上是有约束力的条约——这也是它与《世界人权宣言》最大的不同：<strong>宪章约束国家，宣言提醒每一个人。</strong>",
                    en: "The Charter is the founding treaty of the United Nations. Representatives of fifty nations signed it in San Francisco on 26 June 1945; it entered into force on 24 October that year, and the United Nations came into being. It is binding international law — and that is what sets it apart from the Universal Declaration: <strong>the Charter binds states; the Declaration reminds every person.</strong>",
                    ru: "Устав — учредительный договор Организации Объединённых Наций. Представители пятидесяти государств подписали его в Сан-Франциско 26 июня 1945 года; 24 октября того же года он вступил в силу, и Организация была создана. Это юридически обязывающий международный договор — в этом его главное отличие от Всеобщей декларации: <strong>Устав обязывает государства, Декларация напоминает каждому человеку.</strong>",
                    fr: "La Charte est le traité fondateur des Nations Unies. Les représentants de cinquante États l'ont signée à San Francisco le 26 juin 1945 ; elle est entrée en vigueur le 24 octobre de la même année, donnant naissance à l'Organisation. C'est un traité juridiquement contraignant — et c'est ce qui la distingue de la Déclaration universelle : <strong>la Charte oblige les États, la Déclaration rappelle à chacun ses droits.</strong>",
                    ar: "الميثاق هو المعاهدة التأسيسية للأمم المتحدة. وقّعه ممثلو خمسين دولة في سان فرانسيسكو في 26 حزيران/يونيه 1945، ونفذ في 24 تشرين الأول/أكتوبر من العام نفسه، فقامت المنظمة. وهو معاهدة ملزمة في القانون الدولي — وهذا أبرز ما يميزه عن الإعلان العالمي: <strong>الميثاق يُلزم الدول، والإعلان يُذكّر كل إنسان.</strong>" },
    pair1t:       { zh: "联合国宪章", en: "UN Charter", ru: "Устав ООН", fr: "Charte des Nations Unies", ar: "ميثاق الأمم المتحدة" },
    pair1d:       { zh: "组织法。有法律约束力，规定宗旨、原则与机构。", en: "The constitution. Legally binding: purposes, principles, organs.", ru: "Учредительный договор. Юридически обязателен: цели, принципы, органы.", fr: "Le traité fondateur. Juridiquement contraignant : buts, principes, organes.", ar: "الميثاق التأسيسي. ملزم قانوناً: المقاصد والمبادئ والأجهزة." },
    pair2t:       { zh: "世界人权宣言", en: "Universal Declaration", ru: "Всеобщая декларация", fr: "Déclaration universelle", ar: "الإعلان العالمي" },
    pair2d:       { zh: "宪章承诺的第一份清单。不具条约效力，却是后来所有人权公约的母本。", en: "The first list drawn from the Charter's promise. Not a treaty, yet the parent text of every later human-rights covenant.", ru: "Первый перечень, вытекающий из обещания Устава. Не договор, но родоначальник всех последующих пактов о правах.", fr: "La première liste issue de la promesse de la Charte. Non contraignante, mais matrice de tous les pactes ultérieurs.", ar: "أول قائمة مستمدة من وعد الميثاق. غير ملزمة، لكنها أصل كل المواثيق اللاحقة." },
    pairNote:     { zh: "前者约束国家，后者提醒每一个人：你本来就有这些权利。", en: "The first binds states; the second reminds every person that these rights were always theirs.", ru: "Первый обязывает государства, вторая напоминает каждому: эти права принадлежат вам по рождению.", fr: "La première oblige les États ; la seconde rappelle à chacun que ces droits lui appartiennent déjà.", ar: "الأول يُلزم الدول، والثاني يُذكّر كل إنسان بأن هذه الحقوق له أصلاً." },
    charterPreTitle:    { zh: "序　言", en: "Preamble", ru: "Преамбула", fr: "Préambule", ar: "الديباجة" },
    charterStructTitle: { zh: "宪章的结构", en: "How the Charter is built", ru: "Структура Устава", fr: "L'architecture de la Charte", ar: "بنية الميثاق" },
    charterStructNote:  { zh: "十九章、一百一十一条。加亮的四章，是这份文件里与「和平」最直接相关的部分——宗旨、争端的和平解决、对和平之破坏的应对，以及经济与社会的合作。",
                          en: "Nineteen chapters, 111 articles. The four highlighted chapters are where peace sits most directly: purposes, the pacific settlement of disputes, action against breaches of the peace, and economic and social co-operation.",
                          ru: "Девятнадцать глав, 111 статей. Выделенные четыре главы — то, что в этом документе напрямую связано с миром: цели, мирное разрешение споров, действия при нарушении мира, экономическое и социальное сотрудничество.",
                          fr: "Dix-neuf chapitres, 111 articles. Les quatre chapitres mis en évidence sont ceux où la paix se joue le plus directement : buts, règlement pacifique des différends, action en cas de rupture de la paix, coopération économique et sociale.",
                          ar: "تسعة عشر فصلاً و111 مادة. الفصول الأربعة المظللة هي الأكثر ارتباطاً بالسلام في هذا النص: المقاصد، والتسوية السلمية للمنازعات، والتدابير عند الإخلال بالسلم، والتعاون الاقتصادي والاجتماعي." },
    charterIdxTitle: { zh: "宪章索引", en: "Charter index", ru: "Указатель Устава", fr: "Index de la Charte", ar: "فهرس الميثاق" },
    charterIdxBack:  { zh: "↑ 回到人权宣言", en: "↑ Back to the Declaration", ru: "↑ К Декларации", fr: "↑ Retour à la Déclaration", ar: "↑ العودة إلى الإعلان" },
    charterArtWord:  { zh: "第 %s 条", en: "Article %s", ru: "Статья %s", fr: "Article %s", ar: "المادة %s" },
    charterChapter:  { zh: "第 %s 章", en: "Chapter %s", ru: "Глава %s", fr: "Chapitre %s", ar: "الفصل %s" },
    charterSource:   { zh: "文本来源：联合国，《联合国宪章》（1945 年 6 月 26 日订于旧金山）。本页节选序言与第一条、第二条、第三十三条、第五十六条，未作任何删改，仅供非商业性展示与传播。",
                       en: "Source: Charter of the United Nations, San Francisco, 26 June 1945. This page reproduces the Preamble and Articles 1, 2, 33 and 56 without alteration, for non-commercial display only.",
                       ru: "Источник: Устав Организации Объединённых Наций (Сан-Франциско, 26 июня 1945 г.). На этой странице без изменений воспроизведены преамбула и статьи 1, 2, 33 и 56 — только для некоммерческого показа.",
                       fr: "Source : Charte des Nations Unies, San Francisco, 26 juin 1945. Cette page reproduit sans modification le préambule et les articles 1, 2, 33 et 56, à des fins de présentation non commerciale.",
                       ar: "المصدر: ميثاق الأمم المتحدة (سان فرانسيسكو، 26 حزيران/يونيه 1945). تعرض هذه الصفحة الديباجة والمواد 1 و2 و33 و56 دون أي تعديل، لغرض العرض غير التجاري." },
    fNavCharter:  { zh: "联合国宪章", en: "UN Charter", ru: "Устав ООН", fr: "Charte des Nations Unies", ar: "ميثاق الأمم المتحدة" }
  };

  /* -------------------------------------------------------
     辅助功能文案
     ------------------------------------------------------- */
  const A11Y = {
    title:    { zh: "辅助功能", en: "Accessibility", ru: "Специальные возможности", fr: "Accessibilité", ar: "إمكانية الوصول" },
    large:    { zh: "大字体（适老）", en: "Large text (senior-friendly)", ru: "Крупный шрифт", fr: "Grandes polices", ar: "خط كبير" },
    contrast: { zh: "高对比度", en: "High contrast", ru: "Высокая контрастность", fr: "Contraste élevé", ar: "تباين عالٍ" },
    cb:       { zh: "色盲友好", en: "Colour-blind friendly", ru: "Режим для дальтоников", fr: "Mode daltonien", ar: "مناسب لعمى الألوان" },
    motion:   { zh: "减少动效", en: "Reduce motion", ru: "Меньше анимации", fr: "Réduire les animations", ar: "تقليل الحركة" },
    tts:      { zh: "朗读页面", en: "Read aloud", ru: "Читать вслух", fr: "Lecture vocale", ar: "قراءة الصفحة" },
    stop:     { zh: "停止朗读", en: "Stop reading", ru: "Остановить", fr: "Arrêter", ar: "إيقاف القراءة" }
  };

  /* -------------------------------------------------------
     动态列表数据
     ------------------------------------------------------- */
  const DATA = {
    udhr: UDHR,
    pw: PW,
    a11y: A11Y,

    games: [
      {
        img: "assets/img/starscar.png",
        title: { zh: "《星痕》", en: "Starscar" },
        sub: "STARSCAR",
        tags: [{ zh: "叙事", en: "Narrative" }, { zh: "科幻", en: "Sci-fi" }, { zh: "单人", en: "Single player" }],
        desc: {
          zh: "横跨三个星系的手绘叙事冒险，循着姐姐留下的星图，找回失落的记忆。",
          en: "A hand-painted narrative adventure across three star systems. Follow the star map your sister left behind, and reclaim what was lost."
        },
        pill: { zh: "发售中", en: "Available" },
        on: true,
        plat: "Steam · WeGame"
      },
      {
        img: "assets/img/firefly.png",
        title: { zh: "《萤火小镇》", en: "Firefly" },
        sub: "FIREFLY",
        tags: [{ zh: "解谜", en: "Puzzle" }, { zh: "治愈", en: "Healing" }, { zh: "手绘", en: "Hand-drawn" }],
        desc: {
          zh: "点亮小镇的每一盏灯，在萤火虫的指引下，听居民们讲未说完的睡前故事。",
          en: "Light every lamp in town. Following the fireflies, listen to the bedtime stories the townsfolk never finished."
        },
        pill: { zh: "开发中 62%", en: "In development 62%" },
        on: false,
        plat: { zh: "预计 2027 春", en: "Q2 2027" }
      },
      {
        img: "assets/img/lightkeeper.png",
        title: { zh: "《拾光者》", en: "Lightkeeper" },
        sub: "LIGHTKEEPER",
        tags: [{ zh: "肉鸽", en: "Roguelike" }, { zh: "卡牌", en: "Card" }, { zh: "策略", en: "Strategy" }],
        desc: {
          zh: "把回忆做成卡牌，在下坠的灯塔里，一层一层向上，抢救即将熄灭的光。",
          en: "Turn memories into cards. In a lighthouse falling into darkness, climb floor by floor to rescue the fading light."
        },
        pill: { zh: "发售中", en: "Available" },
        on: true,
        plat: "Steam · TapTap"
      }
    ],

    logs: [
      {
        date: "10.18",
        title: { zh: "《萤火小镇》实机演示首次公开，音乐系统幕后故事", en: "Firefly gameplay reveal — the making of its music system" },
        desc: { zh: "我们为小镇写了 14 首环境音乐，每一盏灯都有专属旋律。", en: "We wrote 14 ambient tracks for the town; every lamp has its own melody." },
        tag: { zh: "开发中", en: "Devlog" },
        kind: "dev"
      },
      {
        date: "10.02",
        title: { zh: "星轨计划新增海外项目：肯尼亚内罗毕净水井", en: "Starway Project adds an overseas program: water wells in Nairobi" },
        desc: { zh: "与当地机构合作打井并培训维护员，一所学校 400 名学生获得安全饮水。", en: "With a local partner we drilled wells and trained caretakers — 400 students now have safe water." },
        tag: { zh: "星轨计划", en: "Starway Project" },
        kind: "peace"
      },
      {
        date: "09.30",
        title: { zh: "星轨计划 9 月善款公示：累计帮助 486 个家庭", en: "Starway Project September report: 486 families supported" },
        desc: { zh: "本月收入的 2% 捐入国内外 6 个项目，明细已上线可查。", en: "2% of September revenue went to six programs at home and abroad. Full ledger is public." },
        tag: { zh: "星轨计划", en: "Starway Project" },
        kind: "peace"
      },
      {
        date: "09.12",
        title: { zh: "《拾光者》新资料片「灯塔之上」上线，加入无尽模式", en: "Lightkeeper expansion “Above the Lighthouse” is live with endless mode" },
        desc: { zh: "免费更新，包含 30 张新卡牌与全新的爬塔机制。", en: "A free update with 30 new cards and a rebuilt tower-climbing system." },
        tag: { zh: "更新", en: "Update" },
        kind: "update"
      }
    ],

    projectsCn: [
      {
        region: { zh: "云南 · 山区", en: "Yunnan · Rural" },
        title: { zh: "学习桌计划", en: "Study Desk Program" },
        desc: { zh: "为山区孩子配一套自己的书桌与台灯，让他们不必再趴在饭桌上写作业。", en: "A desk and a lamp of their own, so children no longer do homework on the dinner table." },
        meta: { zh: "已落地 120 套 · 投入 ¥42,000", en: "120 sets delivered · ¥42,000" },
        pct: 78
      },
      {
        region: { zh: "甘肃 · 乡村小学", en: "Gansu · Village schools" },
        title: { zh: "校园图书角", en: "School Reading Corners" },
        desc: { zh: "每间教室 600 册书，配套书架与每周一节阅读课。", en: "600 books per classroom, with shelving and a weekly reading class." },
        meta: { zh: "8 所学校 · 投入 ¥36,000", en: "8 schools · ¥36,000" },
        pct: 64
      },
      {
        region: { zh: "江西 · 农村", en: "Jiangxi · Rural" },
        title: { zh: "医疗互助金", en: "Medical Mutual Fund" },
        desc: { zh: "为大病家庭的术后复查与长期用药提供一次性补助。", en: "One-off grants for post-surgery checkups and long-term medication." },
        meta: { zh: "27 个家庭 · 投入 ¥28,400", en: "27 families · ¥28,400" },
        pct: 52
      }
    ],

    projectsIntl: [
      {
        region: { zh: "肯尼亚 · 内罗毕", en: "Kenya · Nairobi" },
        title: { zh: "净水井与维护培训", en: "Clean Water Wells" },
        desc: { zh: "与当地机构合作打井，并培训两名社区维护员，保证水源长期可用。", en: "Wells drilled with a local partner, plus two trained community caretakers so the water keeps flowing." },
        meta: { zh: "400 名学生受益 · $18,000", en: "400 students · $18,000" },
        pct: 72
      },
      {
        region: { zh: "叙利亚 · 临时学校", en: "Syria · Temporary schools" },
        title: { zh: "儿童心理支持", en: "Child Psychosocial Support" },
        desc: { zh: "通过绘画与游戏治疗，帮助经历冲突的孩子重新建立安全感。", en: "Art and play therapy that helps children who lived through conflict feel safe again." },
        meta: { zh: "2 所学校 · $12,500", en: "2 schools · $12,500" },
        pct: 46
      },
      {
        region: { zh: "尼泊尔 · 山区", en: "Nepal · Highlands" },
        title: { zh: "震后教室重建", en: "Classroom Rebuilding" },
        desc: { zh: "重建两间抗震教室，配齐课桌、教材与冬季取暖设备。", en: "Two earthquake-resistant classrooms, fully equipped with desks, textbooks and winter heating." },
        meta: { zh: "2 间教室 · $21,000", en: "2 classrooms · $21,000" },
        pct: 58
      }
    ],

    channels: [
      {
        id: "xiaoyu",
        title: { zh: "微信收款码", en: "WeChat Pay" },
        sub: { zh: "受助人 · 小雨的学习桌计划", en: "Beneficiary · Xiaoyu's study desk" },
        photo: "assets/img/recipient-xiaoyu.png",
        alt: { zh: "受助人小雨的照片：山区小学女孩在书桌前微笑", en: "Photo of Xiaoyu, a mountain-village schoolgirl smiling at her desk" },
        region: { zh: "云南省 · 怒江傈僳族自治州 · 山区小学", en: "Yunnan · Nujiang · rural primary school" },
        person: { zh: "小雨 · 10 岁 · 四年级", en: "Xiaoyu · 10 years old · Grade 4" },
        story: [
          { zh: "小雨的家在半山腰上，每天往返学校要走两个小时山路。她的书桌是一张掉漆的旧饭桌，晚上写作业只能凑着家里唯一一盏昏黄的灯。", en: "Xiaoyu lives halfway up a mountain, two hours' walk from school. Her \"desk\" is an old painted-peeling dinner table, and at night she studies by the house's only dim bulb." },
          { zh: "学习桌计划为她这样的 120 个孩子配备可升降书桌、护眼台灯与整套文具，并请驻村老师定期回访使用情况。", en: "The study-desk project provides 120 children like her with height-adjustable desks, eye-care lamps and full stationery kits, with teachers following up regularly." }
        ],
        raised: "¥18,600", goal: "¥32,000", pct: 58,
        updates: [
          { d: "2026.08", t: { zh: "首批 60 套书桌台灯已送达，驻村老师照片回访完成", en: "First 60 desk & lamp sets delivered; teacher photo follow-ups done" } },
          { d: "2026.09", t: { zh: "剩余 60 套已下单，预计 11 月前完成配送", en: "Remaining 60 sets ordered; delivery expected before November" } },
          { d: "2026.10", t: { zh: "第二批物资已到达县城仓库，正在安排山路运输", en: "Second batch arrived at county warehouse; mountain transport being arranged" } }
        ],
        note: { zh: "收款码占位 · 审核后替换为受助人真实收款码", en: "Placeholder · replace with the verified recipient QR code" },
        seed: 3
      },
      {
        id: "chen",
        title: { zh: "支付宝收款码", en: "Alipay" },
        sub: { zh: "受助人 · 陈奶奶医疗互助计划", en: "Beneficiary · Grandma Chen's medical fund" },
        photo: "assets/img/recipient-chen.png",
        alt: { zh: "受助人陈奶奶的照片：农村院子里微笑的老人", en: "Photo of Grandma Chen smiling in her village courtyard" },
        region: { zh: "贵州省 · 毕节市 · 乡村", en: "Guizhou · Bijie · rural village" },
        person: { zh: "陈奶奶 · 72 岁 · 独居", en: "Grandma Chen · 72 · lives alone" },
        story: [
          { zh: "陈奶奶的老伴早年去世，儿女在外务工。今年她在县医院查出需要二次手术，术后每月还要复查与长期服药。", en: "Grandma Chen lost her husband years ago; her children work far from home. This year the county hospital confirmed she needs a second operation, plus monthly check-ups and long-term medication." },
          { zh: "医疗互助计划承担她手术自付部分与 12 个月的复查费用，由村委会与志愿者按月公示票据。", en: "The medical fund covers her out-of-pocket surgery costs and 12 months of follow-ups, with receipts published monthly by the village committee and volunteers." }
        ],
        raised: "¥6,800", goal: "¥15,000", pct: 45,
        updates: [
          { d: "2026.06", t: { zh: "第一次手术顺利完成，进入恢复期", en: "First operation completed successfully; recovery under way" } },
          { d: "2026.08", t: { zh: "8 月复查结果良好，药费票据已公示", en: "August check-up good; medication receipts published" } },
          { d: "2026.10", t: { zh: "二次手术已排期，费用缺口还差 ¥8,200", en: "Second operation scheduled; ¥8,200 still needed" } }
        ],
        note: { zh: "收款码占位 · 审核后替换为受助人真实收款码", en: "Placeholder · replace with the verified recipient QR code" },
        seed: 7
      },
      {
        id: "ngo",
        title: { zh: "公益机构直捐", en: "Direct to partner NGO" },
        sub: { zh: "合作方 · 儿童教育与医疗专项", en: "Partner · education & medical fund" },
        photo: "assets/img/recipient-ngo.png",
        alt: { zh: "合作机构项目的照片：东非教室里举手的孩子", en: "Photo from the partner programme: children raising hands in an East African classroom" },
        region: { zh: "肯尼亚 · 图尔卡纳郡 · 流动学校", en: "Kenya · Turkana County · mobile schools" },
        person: { zh: "合作机构 · 儿童教育与医疗专项基金", en: "Partner NGO · children's education & medical fund" },
        story: [
          { zh: "在肯尼亚图尔卡纳郡，许多孩子要走到十几公里外才有学校。合作机构运营 6 所流动学校，跟着牧民家庭的迁徙路线开课，同时提供一顿热餐与基础医疗。", en: "In Turkana County, Kenya, the nearest school is often over ten kilometres away. Our partner runs 6 mobile schools that follow pastoralist families, each also providing a hot meal and basic healthcare." },
          { zh: "你的捐赠直接进入机构官方公募通道，可开具捐赠票据；每季度公示项目执行报告与审计结果。", en: "Donations go straight into the NGO's official public-fundraising channel; receipts are available, and quarterly execution and audit reports are published." }
        ],
        raised: "$6,200", goal: "$12,000", pct: 52,
        updates: [
          { d: "2026.07", t: { zh: "第三期钻井完成，两所流动学校接入净水", en: "Phase-3 wells completed; two mobile schools connected to clean water" } },
          { d: "2026.09", t: { zh: "新增 1 所流动学校，覆盖 90 名儿童", en: "One new mobile school opened, covering 90 children" } },
          { d: "2026.10", t: { zh: "季度执行报告已同步至下方公示区", en: "Quarterly report synced to the ledger below" } }
        ],
        note: { zh: "机构官方公募通道 · 支持开具捐赠票据", en: "Official public-fundraising channel · receipts available" },
        seed: 11
      }
    ],

    ledger: [
      { m: "2026.10", t: { zh: "肯尼亚净水井 · 第三期钻井与维护培训", en: "Kenya wells · phase 3 drilling and caretaker training" }, a: "+ $6,200" },
      { m: "2026.09", t: { zh: "山区儿童图书馆计划 · 第 4 期图书采购", en: "Rural children's library · phase 4 book purchase" }, a: "+ ¥11,200" },
      { m: "2026.08", t: { zh: "学习桌计划 · 120 套书桌台灯配送云南山区", en: "Study desks · 120 sets delivered to Yunnan" }, a: "+ ¥18,600" },
      { m: "2026.07", t: { zh: "叙利亚临时学校 · 儿童心理支持课程", en: "Syria · psychosocial support sessions" }, a: "+ $4,800" },
      { m: "2026.06", t: { zh: "医疗互助计划 · 陈奶奶术后复查费用支持", en: "Medical fund · Grandma Chen's post-surgery care" }, a: "+ ¥6,800" }
    ],

    minorGames: [
      { name: { zh: "星星拼图", en: "Star Puzzle" }, age: { zh: "益智 · 3 岁以上", en: "Puzzle · 3+" }, cls: "c1", icon: "puzzle" },
      { name: { zh: "音乐小屋", en: "Music House" }, age: { zh: "节奏 · 4 岁以上", en: "Rhythm · 4+" }, cls: "c2", icon: "note" },
      { name: { zh: "涂色太空", en: "Colour the Sky" }, age: { zh: "创意 · 3 岁以上", en: "Creative · 3+" }, cls: "c3", icon: "paint" },
      { name: { zh: "数星星", en: "Count the Stars" }, age: { zh: "启蒙 · 5 岁以上", en: "Early maths · 5+" }, cls: "c4", icon: "moon" }
    ],

    protections: [
      {
        icon: "id",
        title: { zh: "实名与年龄核验", en: "Real-name & age check" },
        desc: {
          zh: "通过实名注册自动识别年龄。未满 18 周岁自动进入本模式，无需手动选择。",
          en: "Age is verified through real-name registration. Under-18 accounts enter this mode automatically."
        }
      },
      {
        icon: "clock",
        title: { zh: "时长管理", en: "Time limits" },
        desc: {
          zh: "每日累计 60 分钟上限，22:00–08:00 无法进入；连续使用 20 分钟提醒远眺休息。",
          en: "A 60-minute daily cap, no access between 22:00 and 08:00, and a rest reminder every 20 minutes."
        }
      },
      {
        icon: "coin",
        title: { zh: "消费保护", en: "Spending protection" },
        desc: {
          zh: "未满 8 周岁不可付费；8–16 周岁单次 ≤50 元、每月 ≤200 元；16–18 周岁单次 ≤100 元、每月 ≤400 元。",
          en: "No payments under 8. Ages 8–16: ≤¥50 per payment, ≤¥200 monthly. Ages 16–18: ≤¥100 per payment, ≤¥400 monthly."
        }
      },
      {
        icon: "shield",
        title: { zh: "内容分级", en: "Content rating" },
        desc: {
          zh: "全部内容按 3+ / 6+ / 8+ / 12+ 标注，本模式只展示与年龄相符的内容。",
          en: "Everything is rated 3+ / 6+ / 8+ / 12+; this mode only shows age-appropriate content."
        }
      }
    ]
  };

  /* -------------------------------------------------------
     语言应用
     ------------------------------------------------------- */
  function pick(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[current] != null ? v[current] : (v.en != null ? v.en : (v.zh || ""));
  }

  function apply(next) {
    if (next && ALL.indexOf(next) !== -1) current = next;
    try { localStorage.setItem(STORE_KEY, current); } catch (e) {}
    document.documentElement.setAttribute("lang", current === "zh" ? "zh-CN" : current);
    document.documentElement.setAttribute("data-lang", current);
    document.documentElement.setAttribute("dir", current === "ar" ? "rtl" : "ltr");

    const attr = DATA_ATTR[current];
    document.querySelectorAll("[data-zh]").forEach((el) => {
      const v = el.dataset[attr] || el.dataset.en || el.dataset.zh;
      if (el.hasAttribute("data-html")) el.innerHTML = v;
      else el.textContent = v;
    });

    document.querySelectorAll("[data-ph-zh]").forEach((el) => {
      el.setAttribute("placeholder", el.dataset["ph" + cap(attr)] || el.dataset.phEn || el.dataset.phZh);
    });

    document.querySelectorAll("[data-pw]").forEach((el) => {
      const v = pick(PW[el.dataset.pw]);
      if (v) el.innerHTML = v;
    });

    document.querySelectorAll(".lang-switch button, .pw-lang button").forEach((b) => {
      b.classList.toggle("on", b.dataset.lang === current);
      b.setAttribute("aria-pressed", b.dataset.lang === current ? "true" : "false");
    });
    document.querySelectorAll("[data-lang-select]").forEach((s) => {
      if (s.value !== current) s.value = current;
    });

    if (typeof window.renderPage === "function") window.renderPage();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: current } }));
  }

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  window.STARWAY_DATA = DATA;
  window.LANG = {
    langs: ALL,
    get current() { return current; },
    isZh() { return current === "zh"; },
    apply,
    pick,
    toggle(l) { apply(l || (current === "zh" ? "en" : "zh")); }
  };
})();
