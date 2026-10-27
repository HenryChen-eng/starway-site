/* =========================================================
   《联合国宪章》· Charter of the United Nations
   1945 年 6 月 26 日订于旧金山，1945 年 10 月 24 日生效
   序言全文 + 四条关键条款（一、二、三十三、五十六）
   ========================================================= */
(function () {
  const CHARTER = {
    /* ---------- 序言 ---------- */
    preamble: {
      zh: [
        "我联合国人民同兹决心",
        "欲免后世再遭今代人类两度身历惨不堪言之战祸，",
        "重申基本人权，人格尊严与价值，以及男女与大小各国平等权利之信念，",
        "创造适当环境，俾克维持正义，尊重由条约与国际法其他渊源而起之义务，久而弗懈，",
        "促成大自由中之社会进步及较善之民生，",
        "并为达此目的，力行容恕，彼此以善邻之道，和睦相处，集中力量，以维持国际和平及安全，接受原则，确立方法，以保证非为公共利益，不得使用武力，运用国际机构，以促成全球人民经济及社会之进展，",
        "用是发愤立志，务当同心协力，以竟厥功。爰由我各本国政府，经齐集金山市之代表各将所奉全权证书，互相校阅，均属妥善，议定本联合国宪章，并设立国际组织，定名联合国。"
      ],
      en: [
        "WE THE PEOPLES OF THE UNITED NATIONS DETERMINED",
        "to save succeeding generations from the scourge of war, which twice in our lifetime has brought untold sorrow to mankind, and",
        "to reaffirm faith in fundamental human rights, in the dignity and worth of the human person, in the equal rights of men and women and of nations large and small, and",
        "to establish conditions under which justice and respect for the obligations arising from treaties and other sources of international law can be maintained, and",
        "to promote social progress and better standards of life in larger freedom,",
        "AND FOR THESE ENDS to practice tolerance and live together in peace with one another as good neighbours, and to unite our strength to maintain international peace and security, and to ensure, by the acceptance of principles and the institution of methods, that armed force shall not be used, save in the common interest, and to employ international machinery for the promotion of the economic and social advancement of all peoples,",
        "HAVE RESOLVED TO COMBINE OUR EFFORTS TO ACCOMPLISH THESE AIMS. Accordingly, our respective Governments, through representatives assembled in the city of San Francisco, who have exhibited their full powers found to be in good and due form, have agreed to the present Charter of the United Nations and do hereby establish an international organization to be known as the United Nations."
      ],
      ru: [
        "МЫ, НАРОДЫ ОБЪЕДИНЕННЫХ НАЦИЙ, ПРЕИСПОЛНЕННЫЕ РЕШИМОСТИ",
        "избавить грядущие поколения от бедствий войны, дважды в нашей жизни принесшей человечеству невыразимое горе, и",
        "вновь утвердить веру в основные права человека, в достоинство и ценность человеческой личности, в равноправие мужчин и женщин и в равенство прав больших и малых наций, и",
        "создать условия, при которых могут соблюдаться справедливость и уважение к обязательствам, вытекающим из договоров и других источников международного права, и",
        "содействовать социальному прогрессу и улучшению условий жизни при большей свободе,",
        "И В ЭТИХ ЦЕЛЯХ проявлять терпимость и жить вместе, в мире друг с другом, как добрые соседи, и объединить наши силы для поддержания международного мира и безопасности, и обеспечить принятием принципов и установлением методов, чтобы вооруженные силы применялись не иначе, как в общих интересах, и использовать международный аппарат для содействия экономическому и социальному прогрессу всех народов,",
        "РЕШИЛИ ОБЪЕДИНИТЬ НАШИ УСИЛИЯ ДЛЯ ДОСТИЖЕНИЯ ЭТИХ ЦЕЛЕЙ. Соответственно, наши правительства через представителей, собравшихся в городе Сан-Франциско, предъявивших свои полномочия, найденные в надлежащей форме, согласились принять настоящий Устав Организации Объединенных Наций и настоящим учреждают международную организацию под названием «Объединенные Нации»."
      ],
      fr: [
        "NOUS, PEUPLES DES NATIONS UNIES, RÉSOLUS",
        "à préserver les générations futures du fléau de la guerre qui deux fois en l'espace d'une vie humaine a infligé à l'humanité d'indicibles souffrances, et",
        "à proclamer à nouveau notre foi dans les droits fondamentaux de l'homme, dans la dignité et la valeur de la personne humaine, dans l'égalité de droits des hommes et des femmes, ainsi que des nations, grandes et petites, et",
        "à créer les conditions nécessaires au maintien de la justice et du respect des obligations nées des traités et autres sources du droit international, et",
        "à favoriser le progrès social et instaurer de meilleures conditions de vie dans une liberté plus grande,",
        "ET À CES FINS à pratiquer la tolérance, à vivre en paix l'un avec l'autre dans un esprit de bon voisinage, à unir nos forces pour maintenir la paix et la sécurité internationales, à accepter des principes et instituer des méthodes garantissant qu'il ne sera pas fait usage de la force des armes, sauf dans l'intérêt commun, à recourir aux institutions internationales pour favoriser le progrès économique et social de tous les peuples,",
        "AVONS DÉCIDÉ D'ASSOCIER NOS EFFORTS POUR RÉALISER CES DESSEINS. En conséquence, nos Gouvernements respectifs, par l'intermédiaire de leurs représentants, réunis en la ville de San-Francisco, et munis de pleins pouvoirs reconnus en bonne et due forme, ont adopté la présente Charte des Nations Unies et instituent par les présentes une organisation internationale qui prendra le nom de Nations Unies."
      ],
      ar: [
        "نحن شعوب الأمم المتحدة، وقد آلينا على أنفسنا",
        "أن ننقذ الأجيال المقبلة من ويلات الحرب التي في خلال جيل واحد جلبت على الإنسانية مرتين أحزاناً يعجز عنها الوصف،",
        "وأن نؤكد من جديد إيماننا بالحقوق الأساسية للإنسان وبكرامة الفرد وقدره، وبالمساواة بين الرجال والنساء وبين الأمم كبيرها وصغيرها،",
        "وأن نهيئ الظروف التي يمكن فيها أن يسود العدل والاحترام للالتزامات الناشئة عن المعاهدات وغيرها من مصادر القانون الدولي،",
        "وأن ندفع بالرقي الاجتماعي قدماً، وأن نرفع مستوى الحياة في جو من الحرية أفسح،",
        "ومن أجل هذه الغايات: أن نأخذ أنفسنا بالتسامح، وأن نعيش معاً في سلام وحسن جوار، وأن نجمع قوانا كي نحفظ السلم والأمن الدوليين، وأن نكفل بمبادئ وتنظيمات معينة ألا تستخدم القوة المسلحة إلا في سبيل المصلحة المشتركة، وأن نستخدم الأجهزة الدولية في تعزيز التقدم الاقتصادي والاجتماعي لجميع الشعوب،",
        "قد قررنا أن نجمع جهودنا لتحقيق هذه الغايات. وبناءً على ذلك، قررت حكوماتنا المختلفة، بواسطة مندوبيها الذين اجتمعوا في مدينة سان فرانسيسكو وأبرزوا وثائقهم الرسمية التامة الصحة، أن تقبل هذا الميثاق للأمم المتحدة، وأن تنشئ بموجبه هيئة دولية تسمى «الأمم المتحدة»."
      ]
    },

    /* ---------- 关键条款 ---------- */
    articles: [
      {
        n: 1,
        anchor: "ch-1",
        zh: [
          "一、维持国际和平及安全；并为此目的：采取有效集体办法，以防止且消除对于和平之威胁，制止侵略行为或其他和平之破坏；并以和平方法且依正义及国际法之原则，调整或解决足以破坏和平之国际争端或情势。",
          "二、发展国际间以尊重人民平等权利及自决原则为根据之友好关系，并采取其他适当办法，以增强普遍和平。",
          "三、促成国际合作，以解决国际间属于经济、社会、文化及人类福利性质之国际问题，且不分种族、性别、语言或宗教，增进并激励对于全体人类之人权及基本自由之尊重。",
          "四、构成一协调各国行动之中心，以达成上述共同目的。"
        ],
        en: [
          "1. To maintain international peace and security, and to that end: to take effective collective measures for the prevention and removal of threats to the peace, and for the suppression of acts of aggression or other breaches of the peace, and to bring about by peaceful means, and in conformity with the principles of justice and international law, adjustment or settlement of international disputes or situations which might lead to a breach of the peace;",
          "2. To develop friendly relations among nations based on respect for the principle of equal rights and self-determination of peoples, and to take other appropriate measures to strengthen universal peace;",
          "3. To achieve international co-operation in solving international problems of an economic, social, cultural, or humanitarian character, and in promoting and encouraging respect for human rights and for fundamental freedoms for all without distinction as to race, sex, language, or religion; and",
          "4. To be a centre for harmonizing the actions of nations in the attainment of these common ends."
        ],
        ru: [
          "1. Поддерживать международный мир и безопасность и с этой целью принимать эффективные коллективные меры для предотвращения и устранения угрозы миру и подавления актов агрессии или других нарушений мира и проводить мирными средствами, в согласии с принципами справедливости и международного права, улаживание или разрешение международных споров или ситуаций, которые могут привести к нарушению мира;",
          "2. Развивать дружественные отношения между нациями на основе уважения принципа равноправия и самоопределения народов, а также принимать другие соответствующие меры для укрепления всеобщего мира;",
          "3. Осуществлять международное сотрудничество в разрешении международных проблем экономического, социального, культурного и гуманитарного характера и в поощрении и развитии уважения к правам человека и основным свободам для всех, без различия расы, пола, языка и религии; и",
          "4. Быть центром для согласования действий наций в достижении этих общих целей."
        ],
        fr: [
          "1. Maintenir la paix et la sécurité internationales et à cette fin : prendre des mesures collectives efficaces en vue de prévenir et d'écarter les menaces à la paix et de réprimer tout acte d'agression ou autre rupture de la paix, et réaliser, par des moyens pacifiques, conformément aux principes de la justice et du droit international, l'ajustement ou le règlement de différends ou de situations, de caractère international, susceptibles de mener à une rupture de la paix;",
          "2. Développer entre les nations des relations amicales fondées sur le respect du principe de l'égalité de droits des peuples et de leur droit à disposer d'eux-mêmes, et prendre toutes autres mesures propres à consolider la paix du monde;",
          "3. Réaliser la coopération internationale en résolvant les problèmes internationaux d'ordre économique, social, intellectuel ou humanitaire, en développant et en encourageant le respect des droits de l'homme et des libertés fondamentales pour tous, sans distinction de race, de sexe, de langue ou de religion;",
          "4. Être un centre où s'harmonisent les efforts des nations vers ces fins communes."
        ],
        ar: [
          "1. حفظ السلم والأمن الدولي، وتحقيقاً لهذه الغاية اتخاذ التدابير الجماعية الفعالة لمنع الأخطار التي تهدد السلم وإزالتها، وكف يدواعي العدوان أو غيرها من حالات الإخلال بالسلم، وتقويم المنازعات أو المواقف الدولية التي قد تؤدي إلى الإخلال بالسلم أو تسويتها بالوسائل السلمية وفقاً لمبادئ العدل والقانون الدولي.",
          "2. إنماء العلاقات الودية بين الأمم على أساس احترام المبدأ الذي يقرر تساوي الشعوب في الحقوق وحقها في تقرير المصير، واتخاذ التدابير الأخرى الملائمة لتعزيز السلم العام.",
          "3. تحقيق التعاون الدولي على حل المسائل الدولية ذات الصبغة الاقتصادية والاجتماعية والثقافية والإنسانية، وعلى تعزيز احترام حقوق الإنسان والحريات الأساسية للناس جميعاً والتشجيع على ذلك، بلا تمييز بسبب العنصر أو الجنس أو اللغة أو الدين.",
          "4. أن تكون الأمم المتحدة مركزاً لتنسيق أعمال الأمم نحو تحقيق هذه المقاصد المشتركة."
        ]
      },
      {
        n: 2,
        anchor: "ch-2",
        zh: [
          "一、本组织系基于各会员国主权平等之原则。",
          "三、各会员国应以和平方法解决其国际争端，俾免危及国际和平、安全及正义。",
          "四、各会员国在其国际关系上不得使用威胁或武力，或以与联合国宗旨不符之任何其他方法，侵害任何会员国或国家之领土完整或政治独立。"
        ],
        en: [
          "1. The Organization is based on the principle of the sovereign equality of all its Members.",
          "3. All Members shall settle their international disputes by peaceful means in such a manner that international peace and security, and justice, are not endangered.",
          "4. All Members shall refrain in their international relations from the threat or use of force against the territorial integrity or political independence of any state, or in any other manner inconsistent with the Purposes of the United Nations."
        ],
        ru: [
          "1. Организация основана на принципе суверенного равенства всех ее Членов.",
          "3. Все Члены Организации разрешают свои международные споры мирными средствами таким образом, чтобы не подвергать угрозе международный мир и безопасность и справедливость.",
          "4. Все Члены Организации воздерживаются в их международных отношениях от угрозы силой или ее применения как против территориальной неприкосновенности или политической независимости любого государства, так и каким-либо другим образом, несовместимым с Целями Объединенных Наций."
        ],
        fr: [
          "1. L'Organisation est fondée sur le principe de l'égalité souveraine de tous ses Membres.",
          "3. Les Membres de l'Organisation règlent leurs différends internationaux par des moyens pacifiques, de telle manière que la paix et la sécurité internationales ainsi que la justice ne soient pas mises en danger.",
          "4. Les Membres de l'Organisation s'abstiennent, dans leurs relations internationales, de recourir à la menace ou à l'emploi de la force, soit contre l'intégrité territoriale ou l'indépendance politique de tout État, soit de toute autre manière incompatible avec les buts des Nations Unies."
        ],
        ar: [
          "1. تقوم الهيئة على مبدأ المساواة في السيادة بين جميع أعضائها.",
          "3. يفضي جميع أعضاء الهيئة منازعاتهم الدولية بالوسائل السلمية على وجه لا يجعل السلم والأمن الدولي والعدل عرضة للخطر.",
          "4. يمتنع أعضاء الهيئة جميعاً في علاقاتهم الدولية عن التهديد باستعمال القوة أو استخدامها ضد سلامة الأراضي أو الاستقلال السياسي لأية دولة، أو على أي وجه آخر لا يتفق ومقاصد الأمم المتحدة."
        ]
      },
      {
        n: 33,
        anchor: "ch-33",
        zh: [
          "一、任何争端之当事国，于争端之继续存在足以危及国际和平与安全之维持时，应尽先以谈判、调查、调停、和解、公断、司法解决、区域机关或区域办法之利用，或各该国自行选择之其他和平方法，求得解决。"
        ],
        en: [
          "1. The parties to any dispute, the continuance of which is likely to endanger the maintenance of international peace and security, shall, first of all, seek a solution by negotiation, enquiry, mediation, conciliation, arbitration, judicial settlement, resort to regional agencies or arrangements, or other peaceful means of their own choice."
        ],
        ru: [
          "1. Стороны, участвующие в любом споре, продолжение которого могло бы угрожать поддержанию международного мира и безопасности, должны прежде всего стараться разрешить спор путем переговоров, обследования, посредничества, примирения, арбитража, судебного разбирательства, обращения к региональным органам или соглашениям или иными мирными средствами по своему выбору."
        ],
        fr: [
          "1. Les parties à tout différend dont la prolongation est susceptible de menacer le maintien de la paix et de la sécurité internationales doivent en rechercher la solution, avant tout, par voie de négociation, d'enquête, de médiation, de conciliation, d'arbitrage, de règlement judiciaire, de recours aux organismes ou accords régionaux, ou par d'autres moyens pacifiques de leur choix."
        ],
        ar: [
          "1. لكل طرف في أي منازع، إذا كان استمراره من شأنه أن يعرض للخطر حفظ السلم والأمن الدولي، أن يلتمس أولاً حل هذا المنازع بالمفاوضات أو التحقيق أو الوساطة أو التوفيق أو التحكيم أو التسوية القضائية أو اللجوء إلى الوكالات أو الاتفاقات الإقليمية أو أي وسائل سلمية أخرى يختارها."
        ]
      },
      {
        n: 56,
        anchor: "ch-56",
        zh: ["各会员国担允采取共同及个别行动与本组织合作，以达成第五十五条所载之宗旨。"],
        en: ["All Members pledge themselves to take joint and separate action in co-operation with the Organization for the achievement of the purposes set forth in Article 55."],
        ru: ["Все Члены Организации торжественно обязуются предпринимать совместные и самостоятельные действия в сотрудничестве с Организацией для достижения целей, указанных в статье 55."],
        fr: ["Les Membres de l'Organisation s'engagent à agir, tant conjointement que séparément, en coopération avec l'Organisation, en vue d'atteindre les buts énoncés à l'Article 55."],
        ar: ["يتعهد جميع أعضاء الهيئة بأن يتخذوا منفردين أو مجتمعين ما يلزم من تدابير للعمل مع الهيئة لتحقيق المقاصد المبينة في المادة 55."]
      }
    ],

    /* ---------- 十九章结构 ---------- */
    chapters: [
      { r: "I", arts: "1–2", key: true, zh: "宗旨及原则", en: "Purposes and Principles" },
      { r: "II", arts: "3–6", zh: "会员", en: "Membership" },
      { r: "III", arts: "7–8", zh: "机关", en: "Organs" },
      { r: "IV", arts: "9–22", zh: "大会", en: "The General Assembly" },
      { r: "V", arts: "23–32", zh: "安全理事会", en: "The Security Council" },
      { r: "VI", arts: "33–38", key: true, zh: "争端之和平解决", en: "Pacific Settlement of Disputes" },
      { r: "VII", arts: "39–51", key: true, zh: "对于和平之威胁、和平之破坏及侵略行为之应付办法", en: "Threats to the Peace, Breaches of the Peace and Acts of Aggression" },
      { r: "VIII", arts: "52–54", zh: "区域办法", en: "Regional Arrangements" },
      { r: "IX", arts: "55–60", key: true, zh: "国际经济及社会合作", en: "International Economic and Social Co-operation" },
      { r: "X", arts: "61–72", zh: "经济及社会理事会", en: "The Economic and Social Council" },
      { r: "XI", arts: "73–74", zh: "关于非自治领土之宣言", en: "Declaration regarding Non-Self-Governing Territories" },
      { r: "XII", arts: "75–85", zh: "国际托管制度", en: "International Trusteeship System" },
      { r: "XIII", arts: "86–91", zh: "托管理事会", en: "The Trusteeship Council" },
      { r: "XIV", arts: "92–96", zh: "国际法院", en: "The International Court of Justice" },
      { r: "XV", arts: "97–101", zh: "秘书处", en: "The Secretariat" },
      { r: "XVI", arts: "102–105", zh: "杂项条款", en: "Miscellaneous Provisions" },
      { r: "XVII", arts: "106–107", zh: "过渡安全办法", en: "Transitional Security Arrangements" },
      { r: "XVIII", arts: "108–109", zh: "修正", en: "Amendments" },
      { r: "XIX", arts: "110–111", zh: "批准及签字", en: "Ratification and Signature" }
    ],

    /* 条款在中文里的序号写法 */
    cnNum: { 1: "一", 2: "二", 33: "三十三", 56: "五十六" }
  };

  window.UN_CHARTER = CHARTER;
})();
