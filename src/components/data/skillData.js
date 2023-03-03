function normalSkillData(thiz) {
  return [
    {
      variants: [{ rarity: "rare", id: 202051, name: "大逃げ", value: 0 }],
      type: "passive",
      conditions: { running_style: 1 },
    },
    {
      variants: [
        { rarity: "double", id: 200021, name: "左回り◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200022,
          name: "左回り○",
          passiveSpeed: 40,
        },
      ],
      conditions: { rotation: 2 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200014,
          name: "右回りの鬼",
          passiveSpeed: 60,
          passivePower: 60,
        },
        { rarity: "double", id: 200011, name: "右回り◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200012,
          name: "右回り○",
          passiveSpeed: 40,
        },
      ],
      conditions: { rotation: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200174,
          name: "春一番/初嵐",
          passiveSpeed: 60,
          passivePower: 60,
        },
        {
          rarity: "double",
          id: -200171,
          name: "季節ウマ娘◎",
          passiveSpeed: 60,
        },
        {
          rarity: "normal",
          id: -200172,
          name: "季節ウマ娘○",
          passiveSpeed: 40,
        },
      ],
      emulatorTypeLimit: ["cm"],
    },
    {
      variants: [
        { rarity: "double", id: 200271, name: "おひとり様◎", passiveSpeed: 80 },
        {
          rarity: "normal",
          id: 200272,
          name: "おひとり様○",
          passiveSpeed: 60,
        },
      ],
    },
    {
      variants: [
        { rarity: "double", id: 200301, name: "伏兵◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200302,
          name: "伏兵○",
          passiveSpeed: 40,
        },
      ],
    },
    {
      variants: [
        { rarity: "double", id: 200261, name: "外枠得意◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200262,
          name: "外枠得意○",
          passiveSpeed: 40,
        },
      ],
      tooltip: "発動率44%として扱う(チャンピオンズミーティング基準)",
      triggerRate: 0.4444444444444444,
    },
    {
      variants: [
        {
          rarity: "normal",
          id: 201631,
          name: "シンパシー",
          passiveSpeed: 40,
        },
      ],
    },
    {
      variants: [
        {
          rarity: "normal",
          id: 201641,
          name: "一匹狼",
          passiveSpeed: 40,
        },
      ],
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200081,
          name: "札幌レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200082,
          name: "札幌レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10001 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200091,
          name: "函館レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200092,
          name: "函館レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10002 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200111,
          name: "新潟レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200112,
          name: "新潟レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10003 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200101,
          name: "福島レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200102,
          name: "福島レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10004 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200041,
          name: "中山レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200042,
          name: "中山レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10005 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200031,
          name: "東京レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200032,
          name: "東京レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10006 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200071,
          name: "中京レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200072,
          name: "中京レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10007 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200064,
          name: "淀の申し子",
          passiveSpeed: 60,
          passiveStamina: 60,
          passiveWisdom: 60,
        },
        {
          rarity: "double",
          id: 200061,
          name: "京都レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200062,
          name: "京都レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10008 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200051,
          name: "阪神レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200052,
          name: "阪神レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10009 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200121,
          name: "小倉レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200122,
          name: "小倉レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10010 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200951,
          name: "大井レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200952,
          name: "大井レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10011 },
    },
    {
      variants: [
        { rarity: "double", id: 200131, name: "根幹距離◎", passiveStamina: 60 },
        {
          rarity: "normal",
          id: 200132,
          name: "根幹距離○",
          passiveStamina: 40,
        },
      ],
      conditions: { is_basis_distance: 1 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200141,
          name: "非根幹距離◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 200142,
          name: "非根幹距離○",
          passiveStamina: 40,
        },
      ],
      conditions: { is_basis_distance: 0 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200154,
          name: "良バ場の鬼",
          passivePower: 60,
          passiveSpeed: 60,
        },
        { rarity: "double", id: 200151, name: "良バ場◎", passivePower: 60 },
        {
          rarity: "normal",
          id: 200152,
          name: "良バ場○",
          passivePower: 40,
        },
      ],
      conditions: { ground_condition: 1 },
    },
    {
      variants: [
        { rarity: "double", id: 200161, name: "道悪◎", passivePower: 60 },
        {
          rarity: "normal",
          id: 200162,
          name: "道悪○",
          passivePower: 40,
        },
      ],
      conditions: { ground_condition: [2, 3, 4] },
    },
    {
      variants: [
        { rarity: "double", id: 200281, name: "対抗意識◎", passivePower: 60 },
        {
          rarity: "normal",
          id: 200282,
          name: "対抗意識○",
          passivePower: 40,
        },
      ],
    },
    {
      variants: [
        { rarity: "double", id: -200211, name: "天気の日◎", passiveGuts: 60 },
        {
          rarity: "normal",
          id: -200212,
          name: "天気の日○",
          passiveGuts: 40,
        },
      ],
      emulatorTypeLimit: ["cm"],
    },
    {
      variants: [
        { rarity: "double", id: 200291, name: "徹底マーク◎", passiveGuts: 60 },
        {
          rarity: "normal",
          id: 200292,
          name: "徹底マーク○",
          passiveGuts: 40,
        },
      ],
    },
    {
      variants: [
        { rarity: "double", id: 200251, name: "内枠得意◎", passiveWisdom: 60 },
        {
          rarity: "normal",
          id: 200252,
          name: "内枠得意○",
          passiveWisdom: 40,
        },
      ],
      tooltip: "発動率33%として扱う(チャンピオンズミーティング基準)",
      triggerRate: 0.3333333333333333,
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201521,
          name: "逃げのコツ◎",
          passiveWisdom: 60,
        },
        {
          rarity: "normal",
          id: 201522,
          name: "逃げのコツ○",
          passiveWisdom: 40,
        },
      ],
      conditions: { running_style: 1 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201531,
          name: "先行のコツ◎",
          passiveWisdom: 60,
        },
        {
          rarity: "normal",
          id: 201532,
          name: "先行のコツ○",
          passiveWisdom: 40,
        },
      ],
      conditions: { running_style: 2 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201541,
          name: "差しのコツ◎",
          passiveWisdom: 60,
        },
        {
          rarity: "normal",
          id: 201542,
          name: "差しのコツ○",
          passiveWisdom: 40,
        },
      ],
      conditions: { running_style: 3 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201551,
          name: "追込のコツ◎",
          passiveWisdom: 60,
        },
        {
          rarity: "normal",
          id: 201552,
          name: "追込のコツ○",
          passiveWisdom: 40,
        },
      ],
      conditions: { running_style: 4 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201561,
          name: "スーパーラッキーセブン",
          passiveSpeed: 60,
          passivePower: 60,
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 201562,
          name: "ラッキーセブン",
          passiveSpeed: 40,
          passivePower: 40,
          passiveStamina: 40,
        },
      ],
      tooltip: "発動率1/18として扱う(チャンピオンズミーティング基準)",
      triggerRate: 0.05555555555555555,
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200174,
          name: "春一番",
          passiveSpeed: 60,
          passivePower: 60,
        },
        { rarity: "double", id: 200171, name: "春ウマ娘◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200172,
          name: "春ウマ娘○",
          passiveSpeed: 40,
        },
      ],
      tooltip: "発動率40%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.season === 0;
      },
    },
    {
      variants: [
        { rarity: "double", id: 200181, name: "夏ウマ娘◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200182,
          name: "夏ウマ娘○",
          passiveSpeed: 40,
        },
      ],
      tooltip: "発動率20%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.season === 1;
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200194,
          name: "初嵐",
          passiveSpeed: 60,
          passivePower: 60,
        },
        { rarity: "double", id: 200191, name: "秋ウマ娘◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200192,
          name: "秋ウマ娘○",
          passiveSpeed: 40,
        },
      ],
      tooltip: "発動率20%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.season === 2;
      },
    },
    {
      variants: [
        { rarity: "double", id: 200201, name: "冬ウマ娘◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 200202,
          name: "冬ウマ娘○",
          passiveSpeed: 40,
        },
      ],
      tooltip: "発動率20%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.season === 3;
      },
    },
    {
      variants: [
        { rarity: "double", id: 200211, name: "晴れの日◎", value: 60 },
        {
          rarity: "normal",
          id: 200212,
          name: "晴れの日○",
          value: 40,
        },
      ],
      tooltip: "発動率57.5%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.weather === 0;
      },
    },
    {
      variants: [
        { rarity: "double", id: 200221, name: "曇りの日◎", value: 60 },
        {
          rarity: "normal",
          id: 200222,
          name: "曇りの日○",
          value: 40,
        },
      ],
      tooltip: "発動率30%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.weather === 1;
      },
    },
    {
      variants: [
        { rarity: "double", id: 200231, name: "雨の日◎", value: 60 },
        {
          rarity: "normal",
          id: 200232,
          name: "雨の日○",
          value: 40,
        },
      ],
      tooltip: "発動率11%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.weather === 2;
      },
    },
    {
      variants: [
        { rarity: "double", id: 200241, name: "雪の日◎", value: 60 },
        {
          rarity: "normal",
          id: 200242,
          name: "雪の日○",
          value: 40,
        },
      ],
      tooltip: "発動率1.5%として扱う。",
      emulatorTypeLimit: ["team"],
      check: function () {
        return thiz.weather === 3;
      },
    },
    {
      variants: [
        {
          rarity: "normal",
          id: 202161,
          name: "自制心",
          passiveWisdom: 60,
          temptationRate: -3,
        },
      ],
      tooltip: "掛かり率は固定で-3%として処理",
    },
    {
      variants: [
        { rarity: "double", id: 202251, name: "交流重賞◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 202252,
          name: "交流重賞○",
          passiveSpeed: 40,
        },
      ],
      conditions: { ground_type: 2 },
    },
    {
      variants: [{ rarity: "rare", id: 202331, name: "抜群の踏み込み" }],
      type: "passive",
      conditions: { ground_type: 2 },
      trigger: function () {
        if (thiz.umaStatus.power >= 1200) {
          thiz.passiveBonus.speed += 80;
        } else if (thiz.umaStatus.power >= 1000) {
          thiz.passiveBonus.speed += 60;
        }
      },
    },
    {
      variants: [{ rarity: "normal", id: 202332, name: "踏み込み上手" }],
      type: "passive",
      conditions: { ground_type: 2 },
      trigger: function () {
        if (thiz.umaStatus.power >= 1200) {
          thiz.passiveBonus.speed += 40;
        } else if (thiz.umaStatus.power >= 1000) {
          thiz.passiveBonus.speed += 20;
        }
      },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 202201,
          name: "川崎レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 202202,
          name: "川崎レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10103 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 202211,
          name: "船橋レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 202212,
          name: "船橋レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10104 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 202221,
          name: "盛岡レース場◎",
          passiveStamina: 60,
        },
        {
          rarity: "normal",
          id: 202222,
          name: "盛岡レース場○",
          passiveStamina: 40,
        },
      ],
      conditions: { track_id: 10105 },
    },
    {
      variants: [
        { rarity: "double", id: 202231, name: "ナイター◎", passiveWisdom: 60 },
        {
          rarity: "normal",
          id: 202232,
          name: "ナイター○",
          passiveWisdom: 40,
        },
      ],
    },
    {
      variants: [
        { rarity: "double", id: 202241, name: "小回り◎", passiveWisdom: 60 },
        {
          rarity: "normal",
          id: 202242,
          name: "小回り○",
          passiveWisdom: 40,
        },
      ],
      conditions: { track_id: [10001, 10002, 10004, 10010, 10103, 10104] },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202341,
          name: "泥んこマイスター",
          passiveSpeed: 60,
          passivePower: 60,
        },
        { rarity: "double", id: 202342, name: "泥遊び◎", passiveSpeed: 60 },
        {
          rarity: "normal",
          id: 202343,
          name: "泥遊び○",
          passiveSpeed: 40,
        },
      ],
      conditions: { ground_type: 2, ground_condition: [3, 4] },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202441,
          name: "勝負師",
          passiveSpeed: 80,
          passiveGuts: 80,
          passivePower: 80,
        },
        {
          rarity: "normal",
          id: 202442,
          name: "やまっけ",
          passiveSpeed: 40,
          passiveGuts: 40,
          passivePower: 40,
        },
      ],
      tooltip: "発動率60%として扱う",
      triggerRate: 0.6,
    },
    {
      variants: [
        { rarity: "rare", id: 200351, name: "円弧のマエストロ", heal: 550 },
        {
          rarity: "normal",
          id: 200352,
          name: "コーナー回復○",
          heal: 150,
        },
      ],
      conditions: { corner_random: [1, 2, 3, 4] },
    },
    {
      variants: [
        { rarity: "rare", id: 200381, name: "好転一息", heal: 550 },
        {
          rarity: "normal",
          id: 200382,
          name: "直線回復",
          heal: 150,
        },
      ],
      conditions: { corner: 0, phase: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200741, name: "クールダウン", heal: 550 },
        {
          rarity: "normal",
          id: 200742,
          name: "深呼吸",
          heal: 150,
        },
      ],
      conditions: { distance_type: 4, phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "normal",
          id: 201571,
          name: "スリーセブン",
          heal: 150,
        },
      ],
      conditions: { remain_distance: [776, 778] },
    },
    {
      variants: [{ rarity: "normal", id: 201621, name: "ふり絞り", heal: 150 }],
      check: function () {
        return thiz.skillTriggerCount[2] + thiz.skillTriggerCount[3] >= 3;
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201481,
          name: "下校後のスペシャリスト",
          heal: 550,
        },
        { rarity: "normal", id: 201482, name: "下校の楽しみ", heal: 150 },
      ],
      conditions: { running_style: 4, slope: 2, accumulatetime: 10 },
    },
    {
      variants: [
        { rarity: "rare", id: 201281, name: "じゃじゃウマ娘", heal: 550 },
        {
          rarity: "normal",
          id: 201282,
          name: "勢い任せ",
          heal: 150,
        },
      ],
      conditions: { running_style: 1, slope: 1, accumulatetime: 10 },
    },
    {
      variants: [
        { rarity: "rare", id: 201351, name: "食いしん坊", heal: 550 },
        {
          rarity: "normal",
          id: 201352,
          name: "栄養補給",
          heal: 150,
        },
      ],
      conditions: { running_style: 2, phase_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200571, name: "レースプランナー", heal: 550 },
        {
          rarity: "normal",
          id: 200572,
          name: "好位追走",
          heal: 150,
        },
      ],
      conditions: { running_style: 2, phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "normal",
          id: 200662,
          name: "様子見",
          heal: 150,
          acceleration: 0.1,
        },
      ],
      conditions: {
        distance_type: 2,
        phase_random: 1,
        running_style: [3, 4],
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201221, name: "スタミナグリード", heal: 350 },
        {
          rarity: "normal",
          id: 201222,
          name: "スタミナイーター",
          heal: 150,
        },
      ],
      conditions: {
        distance_type: 4,
        phase_random: 1,
        running_style: [3, 4],
      },
    },
    {
      variants: [
        { rarity: "rare", id: 200711, name: "切り開く者", heal: 550 },
        {
          rarity: "normal",
          id: 200712,
          name: "前途洋々",
          heal: 150,
        },
      ],
      conditions: {
        distance_type: 3,
        phase_random: 1,
        running_style: [1, 2],
      },
    },
    {
      variants: [
        { rarity: "rare", id: 200621, name: "眠れる獅子", heal: 550 },
        {
          rarity: "normal",
          id: 200622,
          name: "後方待機",
          heal: 150,
        },
      ],
      conditions: {
        running_style: 4,
        phase_random: 1,
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201201, name: "VIP顔パス", heal: 550 },
        {
          rarity: "normal",
          id: 201202,
          name: "パス上手",
          heal: 150,
        },
      ],
      conditions: {
        distance_type: 4,
        accumulatetime: 5,
        phase_random: 1,
      },
      tooltip: "「中盤のどこかで発動」として扱う。適当実装注意。",
    },
    {
      variants: [
        { rarity: "rare", id: 201141, name: "神業ステップ", heal: 550 },
        {
          rarity: "normal",
          id: 201142,
          name: "軽やかステップ",
          heal: 150,
        },
      ],
      conditions: { distance_type: 3, accumulatetime: 20 },
      tooltip:
        "「スタート後20秒で発動」として扱う。大体そこら辺で内コースを取り始めるため。多分（ガバ）",
    },
    {
      variants: [
        { rarity: "rare", id: 200561, name: "余裕綽々", heal: 550 },
        {
          rarity: "normal",
          id: 200562,
          name: "スタミナキープ",
          heal: 150,
        },
      ],
      conditions: { running_style: 2, phase_laterhalf_random: 0 },
    },
    {
      variants: [
        { rarity: "rare", id: 200691, name: "慧眼", heal: 550 },
        {
          rarity: "normal",
          id: 200692,
          name: "展開窺い",
          heal: 150,
        },
      ],
      conditions: {
        distance_type: 2,
        phase_laterhalf_random: 0,
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201421, name: "リラックス", heal: 550 },
        {
          rarity: "normal",
          id: 201422,
          name: "小休憩",
          heal: 150,
        },
      ],
      conditions: { running_style: 3, phase_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200441, name: "鋼の意志", heal: 550 },
        {
          rarity: "normal",
          id: 200442,
          name: "隠れ蓑",
          heal: 150,
        },
      ],
      conditions: { phase_random: 1, accumulatetime: 5 },
      tooltip: "「中盤のどこか」として扱う。",
    },
    {
      variants: [
        { rarity: "rare", id: 201491, name: "冷静沈着", heal: 550 },
        {
          rarity: "normal",
          id: 201492,
          name: "冷静",
          heal: 150,
        },
      ],
      tooltip: "「中盤のどこかで発動」として扱う。",
      conditions: { running_style: 4, accumulatetime: 10, phase_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200471, name: "不屈の心", heal: 550 },
        {
          rarity: "normal",
          id: 200472,
          name: "ペースキープ",
          heal: 150,
        },
      ],
      conditions: { phase_random: 1 },
      tooltip: "「中盤のどこか」として扱う。",
    },
    {
      variants: [
        { rarity: "rare", id: 200481, name: "どこ吹く風", heal: 550 },
        {
          rarity: "normal",
          id: 200482,
          name: "ウマ込み冷静",
          heal: 150,
        },
      ],
      conditions: { phase_random: 1 },
      tooltip: "「中盤のどこか」として扱う。",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200761,
          name: "火事場のバ鹿力",
          heal: 550,
          targetSpeed: 0.35,
        },
        { rarity: "normal", id: 200762, name: "別腹タンク", heal: 150 },
      ],
      duration: 1.8,
      conditions: { distance_type: 4 },
    },
    {
      variants: [
        { rarity: "rare", id: 210021, name: "アオハル燃焼・体", heal: 605 },
        {
          rarity: "normal",
          id: 210022,
          name: "アオハル点火・体",
          heal: 165,
        },
      ],
      conditions: { phase_random: 1 },
      tooltip: "効果1.1倍として扱う",
    },
    {
      variants: [
        { rarity: "rare", id: 201691, name: "潜伏態勢", heal: 550 },
        {
          rarity: "normal",
          id: 201692,
          name: "静かな呼吸",
          heal: 150,
        },
      ],
      conditions: { running_style: 3, phase_laterhalf_random: 0 },
    },
    {
      variants: [
        { rarity: "rare", id: 202001, name: "砂の玄人", heal: 550 },
        {
          rarity: "normal",
          id: 202002,
          name: "砂塵慣れ",
          heal: 150,
        },
      ],
      conditions: { ground_type: 2, phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202071,
          name: "泰然自若",
          heal: 750,
          speed: -0.15,
        },
        {
          rarity: "normal",
          id: 202072,
          name: "マイペース",
          heal: 350,
          speed: -0.15,
        },
      ],
      duration: 1.2,
      conditions: { distance_type: 4, phase_firsthalf_random: 1 },
      tooltip: "4-7位",
    },
    {
      variants: [
        { rarity: "rare", id: 202191, name: "一意専心", heal: 750 },
        {
          rarity: "normal",
          id: 202192,
          name: "抜かりなし",
          heal: 350,
        },
      ],
      conditions: {
        is_badstart: 0,
        running_style: 2,
        distance_type: 4,
        phase_firsthalf_random: 1,
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200331,
          name: "弧線のプロフェッサー",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 200332,
          name: "コーナー巧者○",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      cd: 30,
      conditions: { all_corner_random: 1 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 200971,
          name: "短距離コーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 200972,
          name: "短距離コーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, distance_type: 1 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201041,
          name: "マイルコーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201042,
          name: "マイルコーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, distance_type: 2 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201113,
          name: "光芒円刃",
          targetSpeed: 0.35,
        },
        {
          rarity: "double",
          id: 201111,
          name: "中距離コーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201112,
          name: "中距離コーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, distance_type: 3 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201181,
          name: "長距離コーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201182,
          name: "長距離コーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, distance_type: 4 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201251,
          name: "逃げコーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201252,
          name: "逃げコーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, running_style: 1 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201321,
          name: "先行コーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201322,
          name: "先行コーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, running_style: 2 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201391,
          name: "差しコーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201392,
          name: "差しコーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, running_style: 3 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201461,
          name: "追込コーナー◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201462,
          name: "追込コーナー○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, running_style: 4 },
    },
    {
      variants: [
        { rarity: "rare", id: 200361, name: "ハヤテ一文字", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200362,
          name: "直線巧者",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      cd: 30,
      conditions: { straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200963, name: "紫電一閃", targetSpeed: 0.35 },
        {
          rarity: "double",
          id: 200961,
          name: "短距離直線◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 200962,
          name: "短距離直線○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { distance_type: 1, straight_random: 1 },
    },
    {
      variants: [
        {
          rarity: "double",
          id: 201031,
          name: "マイル直線◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201032,
          name: "マイル直線○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { distance_type: 2, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201103, name: "光芒一閃", targetSpeed: 0.35 },
        {
          rarity: "double",
          id: 201101,
          name: "中距離直線◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201102,
          name: "中距離直線○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { distance_type: 3, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201173, name: "烈風一閃", targetSpeed: 0.35 },
        {
          rarity: "double",
          id: 201171,
          name: "長距離直線◎",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201172,
          name: "長距離直線○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { distance_type: 4, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "double", id: 201241, name: "逃げ直線◎", targetSpeed: 0.25 },
        {
          rarity: "normal",
          id: 201242,
          name: "逃げ直線○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { running_style: 1, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "double", id: 201311, name: "先行直線◎", targetSpeed: 0.25 },
        {
          rarity: "normal",
          id: 201312,
          name: "先行直線○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { running_style: 2, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201383, name: "鋭脚一閃", targetSpeed: 0.35 },
        {
          rarity: "double",
          id: 201381,
          name: "差し直線◎",
          targetSpeed: 0.25,
        },
        { rarity: "normal", id: 201382, name: "差し直線○", targetSpeed: 0.15 },
      ],
      duration: 3,
      conditions: { running_style: 3, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201453, name: "月影一閃", targetSpeed: 0.35 },
        {
          rarity: "double",
          id: 201451,
          name: "追込直線◎",
          targetSpeed: 0.25,
        },
        { rarity: "normal", id: 201452, name: "追込直線○", targetSpeed: 0.15 },
      ],
      duration: 3,
      conditions: { running_style: 4, straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200541, name: "脱出術", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200542,
          name: "急ぎ足",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { running_style: 1, phase_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200591, name: "迅速果断", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200592,
          name: "位置取り押し上げ",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { running_style: 3, phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201271,
          name: "トップランナー",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 201272,
          name: "先頭プライド",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        running_style: 1,
        phase_laterhalf_random: 0,
        accumulatetime: 5,
      },
      tooltip: "序盤後半のどこかで発動として扱う",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200581,
          name: "スピードスター",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 200582,
          name: "抜け出し準備",
          targetSpeed: 0.15,
        },
      ],
      duration: 1.8,
      conditions: { running_style: 2, is_finalcorner_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200611, name: "昇り龍", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200612,
          name: "外差し準備",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { running_style: 3, is_finalcorner_random: 1 },
      tooltip: "「最終コーナーのどこか」として扱う。",
    },
    {
      variants: [
        { rarity: "rare", id: 201411, name: "百万バリキ", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201412,
          name: "十万バリキ",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { up_slope_random: 1, running_style: 3 },
    },
    {
      variants: [
        { rarity: "rare", id: 200981, name: "圧倒的リード", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200982,
          name: "大きなリード",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { distance_type: 1, phase: 1 },
      tooltip: "中盤に入った瞬間に1位で3馬身リードしていると見なす。見なすな。",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200671,
          name: "電撃の煌めき",
          targetSpeed: 0.35,
          acceleration: 0.1,
        },
        {
          rarity: "normal",
          id: 200672,
          name: "詰め寄り",
          targetSpeed: 0.15,
          acceleration: 0.05,
        },
      ],
      duration: 3,
      conditions: { distance_type: 1, phase_random: 2, running_style: [3, 4] },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200681,
          name: "マイルの支配者",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 200682,
          name: "積極策",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        distance_type: 2,
        phase_laterhalf_random: 0,
        running_style: [1, 2],
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201051, name: "ギアチェンジ", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201052,
          name: "ギアシフト",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: {
        distance_type: 2,
        phase_random: 1,
        running_style: [1, 2],
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201071, name: "姉御肌", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201072,
          name: "負けん気",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: {
        distance_type: 2,
        phase_random: 1,
      },
      tooltip: "「中盤のどこか」として扱う。",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200721,
          name: "キラーチューン",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 200722,
          name: "テンポアップ",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: {
        distance_type: 3,
        phase_random: 1,
        running_style: [1, 2],
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200731,
          name: "勝利への執念",
          targetSpeed: 0.35,
          acceleration: 0.1,
        },
        {
          rarity: "normal",
          id: 200732,
          name: "食い下がり",
          targetSpeed: 0.15,
          acceleration: 0.05,
        },
      ],
      duration: 3,
      conditions: { distance_type: 3, is_finalcorner: 1 },
      tooltip: "「最終コーナー即発動」として扱う",
    },
    {
      variants: [
        { rarity: "rare", id: 200751, name: "内的体験", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200752,
          name: "内弁慶",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        distance_type: 4,
        is_finalcorner: 1,
        corner: 1,
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201191, name: "先陣の心得", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201192,
          name: "リードキープ",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        distance_type: 4,
        phase_random: 1,
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201662,
          name: "お先に失礼っ！",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 201661,
          name: "遊びはおしまいっ！",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        phase_random: 1,
        accumulatetime: 10,
      },
      tooltip: "「中盤のどこかで発動」として扱う。",
    },
    {
      variants: [
        {
          rarity: "normal",
          id: 201651,
          name: "スリップストリーム",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        phase_random: 1,
        accumulatetime: 10,
      },
      tooltip: "「中盤のどこかで発動」として扱う。",
    },
    {
      variants: [
        { rarity: "rare", id: 200631, name: "疾風怒濤", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200632,
          name: "仕掛け抜群",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        running_style: 4,
        phase_firsthalf_random: 3,
        is_lastspurt: 1,
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201211,
          name: "怒涛の追い上げ",
          targetSpeed: 0.35,
          acceleration: 0.1,
        },
        {
          rarity: "normal",
          id: 201212,
          name: "追い上げ",
          targetSpeed: 0.15,
          acceleration: 0.05,
        },
      ],
      duration: 3,
      conditions: { distance_type: 4, phase_random: 2 },
      tooltip: "「終盤前半のどこか」として扱う",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201081,
          name: "スピードグリード",
          targetSpeed: 0.25,
        },
        {
          rarity: "normal",
          id: 201082,
          name: "スピードイーター",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: {
        distance_type: 2,
        phase_random: 1,
        running_style: 1,
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200461,
          name: "アガッてきた！",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 200462,
          name: "ペースアップ",
          targetSpeed: 0.15,
        },
      ],
      duration: 1.8,
      tooltip: "「中盤のどこかで発動」として扱う。",
      conditions: { phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201671,
          name: "チャート急上昇！",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 201672,
          name: "レコメンド",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { ground_type: 2, phase_random: 1 },
      tooltip: "「中盤のどこか」として扱う。",
    },
    {
      variants: [
        { rarity: "rare", id: 200511, name: "全身全霊", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 200512,
          name: "末脚",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { phase_firsthalf_random: 3 },
    },
    {
      variants: [
        { rarity: "rare", id: 201612, name: "尻尾の滝登り", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201611,
          name: "尻尾上がり",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      check: function () {
        return thiz.skillTriggerCount[1] >= 3;
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 210011,
          name: "アオハル燃焼・速",
          targetSpeed: 0.4025,
        },
        {
          rarity: "normal",
          id: 210012,
          name: "アオハル点火・速",
          targetSpeed: 0.1725,
        },
      ],
      duration: 1.8,
      tooltip: "効果1.15倍として扱う",
      conditions: { phase_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201701, name: "決死の覚悟", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201702,
          name: "ありったけ",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { distance_type: 3, is_lastspurt: 1, corner: 0 },
    },
    {
      variants: [
        { rarity: "rare", id: 202011, name: "真打", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202012,
          name: "影打",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { distance_type: 4, phase_laterhalf_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 202022, name: "強攻策", targetSpeed: 0.25 },
        {
          rarity: "normal",
          id: 202021,
          name: "早仕掛け",
          targetSpeed: 0.05,
        },
      ],
      duration: 4,
      conditions: { running_style: 4, phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202061,
          name: "日本一のウマ娘",
          targetSpeed: 0.35,
        },
      ],
      duration: 3,
      conditions: { distance_type: 4, is_finalcorner_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201592, name: "ウママニア", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 201591,
          name: "ウマ好み",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { accumulatetime: 5 },
      tooltip: "開始5秒で即発動扱い",
    },
    {
      variants: [
        { rarity: "rare", id: 202101, name: "高揚感", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202102,
          name: "前のめり",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { distance_type: 3, phase_random: 1 },
      tooltip: ">=50%(5～9位)",
    },
    {
      variants: [
        { rarity: "rare", id: 202111, name: "破竹の勢い", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202112,
          name: "気合十分",
          targetSpeed: 0.15,
        },
      ],
      duration: 1.8,
      conditions: { distance_type: 2, is_finalcorner_random: 1 },
      tooltip: ">=50%(5～9位)",
    },
    {
      variants: [
        { rarity: "rare", id: 202131, name: "荒ぶる旋風", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202132,
          name: "気迫を込めて",
          targetSpeed: 0.15,
        },
      ],
      duration: 1.8,
      conditions: { distance_type: 3, phase_random: 1, running_style: 1 },
      tooltip: "1～3位。デバフは金0.15/白0.035。",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202171,
          name: "至高のダウンヒラー",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 202172,
          name: "下り坂巧者",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { down_slope_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 202041, name: "意気衝天", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202042,
          name: "軽い足取り",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { distance_type: 1, phase_laterhalf_random: 1 },
      tooltip: "1～5位",
    },
    {
      variants: [
        { rarity: "rare", id: 202261, name: "勝利の機運", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202262,
          name: "明るい兆し",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { ground_type: 2, phase_laterhalf_random: 1 },
      tooltip: "1～5位",
    },
    {
      variants: [
        { rarity: "rare", id: 202271, name: "捲土重来", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202272,
          name: "盛り返し",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { ground_type: 2, phase_random: 1 },
      tooltip: "6～9位。",
    },
    {
      variants: [
        { rarity: "rare", id: 202281, name: "全速前進！", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202282,
          name: "まっしぐら",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { ground_type: 2, phase_random: 3, is_lastspurt: 1 },
      tooltip: "1～5位。",
    },
    {
      variants: [
        { rarity: "rare", id: 202291, name: "明鏡止水", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202292,
          name: "冴える思考",
          targetSpeed: 0.15,
        },
      ],
      duration: 1.8,
      conditions: {
        ground_type: 2,
        distance_rate: "<=42",
        phase: 1,
        activate_count_heal: 1,
      },
      tooltip: "6～9位。",
    },
    {
      variants: [
        { rarity: "rare", id: 202301, name: "優雅な砂浴び", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202302,
          name: "砂浴び○",
          targetSpeed: 0.15,
        },
      ],
      duration: 3,
      conditions: { ground_type: 2, accumulatetime: 5 },
      tooltip: "開始5秒で即発動扱い。逃げで使う場合は自己責任で。",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202371,
          name: "アンストッパブル",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 202372,
          name: "攻めの姿勢",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { phase_random: 1, running_style: 2 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202381,
          name: "ブレイクスルー",
          targetSpeed: 0.35,
        },
        {
          rarity: "normal",
          id: 202382,
          name: "打開策",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { phase_random: 1, running_style: 4 },
    },
    {
      variants: [
        { rarity: "rare", id: 202411, name: "風雲の志", targetSpeed: 0.25 },
        {
          rarity: "normal",
          id: 202412,
          name: "向上心",
          targetSpeed: 0.05,
        },
      ],
      duration: 4,
      conditions: {
        running_style: 2,
        phase: 1,
        distance_rate_random: [60, 66],
      },
      tooltip: "60%～66%のランダム区間発動扱い",
    },
    {
      variants: [
        { rarity: "rare", id: 202461, name: "踏ませぬ影", targetSpeed: 0.45 },
        {
          rarity: "normal",
          id: 202462,
          name: "粘り腰",
          targetSpeed: 0.25,
        },
      ],
      duration: 2.4,
      conditions: { running_style: 1, is_finalcorner: 1, corner: 0 },
    },
    {
      variants: [
        { rarity: "rare", id: 202451, name: "トップギア", targetSpeed: 0.45 },
        {
          rarity: "normal",
          id: 202452,
          name: "キレる脚",
          targetSpeed: 0.25,
        },
      ],
      duration: 2.4,
      conditions: { running_style: 3, is_finalcorner: 1, corner: 0 },
    },
    {
      variants: [
        { rarity: "rare", id: 202471, name: "猛追", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202472,
          name: "食らいつき",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      conditions: { running_style: [2, 3], distance_rate: ">=50" },
    },
    {
      variants: [
        { rarity: "rare", id: 202501, name: "遮二無二", targetSpeed: 0.35 },
        {
          rarity: "normal",
          id: 202502,
          name: "向こう見ず",
          targetSpeed: 0.15,
        },
      ],
      duration: 2.4,
      tooltip: "順位<=50%",
      conditions: { distance_type: 2, phase_laterhalf_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201253, name: "陣風円刃", targetSpeed: 0.35 },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, running_style: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 201393, name: "鋭脚円刃", targetSpeed: 0.35 },
      ],
      duration: 3,
      conditions: { all_corner_random: 1, running_style: 3 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200341,
          name: "曲線のソムリエ",
          acceleration: 0.4,
        },
        {
          rarity: "normal",
          id: 200342,
          name: "コーナー加速○",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      cd: 30,
      conditions: { all_corner_random: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200371,
          name: "一陣の風",
          acceleration: 0.4,
          targetSpeed: 0.15,
        },
        { rarity: "normal", id: 200372, name: "直線加速", acceleration: 0.2 },
      ],
      duration: 3,
      cd: 30,
      conditions: { straight_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200531, name: "先手必勝", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 200532,
          name: "先駆け",
          acceleration: 0.2,
        },
      ],
      conditions: {
        running_style: 1,
        phase: 0,
      },
      duration: 1.2,
    },
    {
      variants: [
        { rarity: "rare", id: 200551, name: "逃亡者", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 200552,
          name: "押し切り準備",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { running_style: 1, is_finalcorner_random: 1 },
    },
    {
      variants: [
        { rarity: "rare", id: 200601, name: "乗り換え上手", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 200602,
          name: "差し切り体勢",
          acceleration: 0.2,
        },
      ],
      duration: 1.8,
      conditions: { running_style: 3, phase_firsthalf_random: 2 },
    },
    {
      variants: [
        { rarity: "rare", id: 200641, name: "迫る影", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 200642,
          name: "直線一気",
          acceleration: 0.2,
        },
      ],
      duration: 0.9,
      conditions: { running_style: 4, is_lastspurt: 1, corner: 0 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200651,
          name: "スプリントターボ",
          acceleration: 0.4,
        },
        {
          rarity: "normal",
          id: 200652,
          name: "スプリントギア",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { distance_type: 1, phase_random: 2 },
    },
    {
      variants: [
        { rarity: "rare", id: 200701, name: "豪脚", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 200702,
          name: "上昇気流",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { distance_type: 2, phase_random: 2 },
    },
    {
      variants: [
        { rarity: "rare", id: 200991, name: "プランX", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 200992,
          name: "善後策",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: {
        distance_type: 1,
        phase_laterhalf_random: 1,
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201061,
          name: "アクセル全開！",
          acceleration: 0.4,
        },
        {
          rarity: "normal",
          id: 201062,
          name: "アクセラレーション",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      tooltip: "「50％以降のどこかで発動」として扱う。",
      conditions: { distance_type: 2, distance_rate_after_random: ">=50" },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201131,
          name: "ライトニングステップ",
          acceleration: 0.3,
        },
        {
          rarity: "normal",
          id: 201132,
          name: "イナズマステップ",
          acceleration: 0.2,
        },
      ],
      duration: 4,
      conditions: { distance_type: 3, phase_random: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201291,
          name: "再燃焼",
          acceleration: 0.4,
          heal: -200,
        },
        {
          rarity: "normal",
          id: 201292,
          name: "二の矢",
          acceleration: 0.2,
          heal: -200,
        },
      ],
      duration: 3,
      conditions: { running_style: 1, phase_random: 2 },
    },
    {
      variants: [
        { rarity: "rare", id: 201331, name: "技巧派", acceleration: 0.3 },
        {
          rarity: "normal",
          id: 201332,
          name: "巧みなステップ",
          acceleration: 0.2,
        },
      ],
      duration: 1.8,
      conditions: { running_style: 2, accumulatetime: 20 },
      tooltip: "「スタート後20秒で発動」として扱う。",
    },
    {
      variants: [
        { rarity: "rare", id: 201341, name: "決意の直滑降", acceleration: 0.3 },
        {
          rarity: "normal",
          id: 201342,
          name: "直滑降",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { down_slope_random: 1, running_style: 2 },
    },
    {
      variants: [
        { rarity: "normal", id: 201581, name: "登山家", acceleration: 0.2 },
      ],
      duration: 3,
      conditions: { up_slope_random: 1 },
    },
    {
      variants: [
        { rarity: "normal", id: 201362, name: "まき直し", acceleration: 0.2 },
      ],
      duration: 3,
      conditions: {
        running_style: 2,
        phase_random: 1,
      },
    },
    {
      variants: [
        { rarity: "rare", id: 201401, name: "努力家", acceleration: 0.3 },
        {
          rarity: "normal",
          id: 201402,
          name: "がんばり屋",
          acceleration: 0.2,
        },
      ],
      duration: 4,
      conditions: {
        running_style: 3,
        phase_random: 1,
      },
      tooltip: "「中盤のどこか」として扱う。",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200491,
          name: "ノンストップガール",
          acceleration: 0.4,
        },
        {
          rarity: "normal",
          id: 200492,
          name: "垂れウマ回避",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { is_lastspurt: 1 },
      tooltip: "スパート即発動として扱う。実際に発動するかどうかは自己判断で。",
    },
    {
      variants: [
        { rarity: "normal", id: 201601, name: "地固め", acceleration: 0.2 },
      ],
      duration: 3,
      tooltip: "条件は満たしているとして扱う",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 210031,
          name: "アオハル燃焼・力",
          acceleration: 0.44,
        },
        {
          rarity: "normal",
          id: 210032,
          name: "アオハル点火・力",
          acceleration: 0.22,
        },
      ],
      duration: 1.2,
      conditions: { phase_random: 2 },
      tooltip: "効果1.1倍として扱う",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 201681,
          name: "狙うは最前列！",
          acceleration: 0.3,
        },
        {
          rarity: "normal",
          id: 201682,
          name: "前列狙い",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { ground_type: 2, phase_random: 2 },
    },
    {
      variants: [
        { rarity: "rare", id: 201901, name: "鍔迫り合い", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 201902,
          name: "真っ向勝負",
          acceleration: 0.2,
        },
      ],
      duration: 1.8,
      conditions: { running_style: 2, phase_firsthalf_random: 2 },
    },
    {
      variants: [
        { rarity: "rare", id: 202081, name: "起死回生", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 202082,
          name: "ワンチャンス",
          acceleration: 0.2,
        },
      ],
      duration: 1.8,
      conditions: { distance_type: 3, phase_firsthalf_random: 2 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202311,
          name: "目指せセンター！",
          acceleration: 0.4,
        },
        {
          rarity: "normal",
          id: 202312,
          name: "意気込み十分",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { ground_type: 2, phase_random: 2 },
      tooltip: "1～5位。",
    },
    {
      variants: [
        { rarity: "rare", id: 202321, name: "爆走モード！", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 202322,
          name: "急浮上",
          acceleration: 0.2,
        },
      ],
      duration: 3,
      conditions: { ground_type: 2, phase_random: 2 },
      tooltip: "5～9位。",
    },
    {
      variants: [
        { rarity: "rare", id: 202401, name: "電光石火", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 202402,
          name: "一足飛び",
          acceleration: 0.2,
        },
      ],
      duration: 2,
      conditions: { distance_type: [1, 2], phase: ">=2" },
      tooltip: "5～9位、即発動扱い",
    },
    {
      variants: [
        { rarity: "rare", id: 202481, name: "怪物", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 202482,
          name: "本領発揮",
          acceleration: 0.2,
        },
      ],
      duration: 1.2,
      conditions: { distance_type: 4, running_style: 2, phase: 2 },
      tooltip: "即発動扱い",
    },
    {
      variants: [
        { rarity: "rare", id: 202491, name: "抜群の切れ味", acceleration: 0.4 },
        {
          rarity: "normal",
          id: 202492,
          name: "切れ味",
          acceleration: 0.2,
        },
      ],
      duration: 1.2,
      conditions: { running_style: 4, phase_firsthalf_random: 2 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 210041,
          name: "アオハル燃焼・根",
          targetSpeed: 0.275,
          acceleration: 0.33,
        },
        {
          rarity: "normal",
          id: 210042,
          name: "アオハル点火・根",
          targetSpeed: 0.055,
          acceleration: 0.11,
        },
      ],
      duration: 1.8,
      conditions: { phase_random: 2 },
      tooltip: "効果1.1倍として扱う",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 210061,
          name: "一番星",
          targetSpeed: 0.3,
          acceleration: 0.36,
          heal: 420,
        },
        {
          rarity: "normal",
          id: 210062,
          name: "綺羅星",
          targetSpeed: 0.06,
          acceleration: 0.12,
          heal: 60,
        },
      ],
      duration: 1.2,
      tooltip: "効果1.2倍(25戦↑)として扱う",
      conditions: { distance_rate_after_random: 50 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202091,
          name: "気炎万丈",
          targetSpeed: 0.35,
          heal: 350,
        },
        {
          rarity: "normal",
          id: 202092,
          name: "闘争心",
          targetSpeed: 0.15,
          heal: 50,
        },
      ],
      duration: 2.4,
      conditions: { distance_type: 3, phase_random: 1 },
      tooltip: "中盤ランダム発動扱い",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202121,
          name: "大胆不敵",
          targetSpeed: 0.35,
          acceleration: 0.1,
        },
        {
          rarity: "normal",
          id: 202122,
          name: "恐れぬ心",
          targetSpeed: 0.15,
          acceleration: 0.05,
        },
      ],
      conditions: { running_style: 3, distance_rate_after_random: 50 },
      duration: 2.4,
      tooltip: ">=40% <=70%(4～6位)",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202151,
          name: "勇往邁進",
          targetSpeed: 0.45,
          heal: -200,
        },
        {
          rarity: "normal",
          id: 202152,
          name: "フルスロットル",
          targetSpeed: 0.25,
          heal: -200,
        },
      ],
      conditions: { running_style: 3, phase_random: 1 },
      duration: 2.4,
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 210071,
          name: "キミと勝ちたい",
          targetSpeed: 0.42,
          acceleration: 0.24,
        },
        {
          rarity: "normal",
          id: 210072,
          name: "夢の途中",
          targetSpeed: 0.18,
          acceleration: 0.084,
        },
      ],
      duration: 1.2,
      tooltip: "1～6位。ファン数16万以上の場合。",
      conditions: { distance_rate_after_random: 50 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202391,
          name: "出力1000％！",
          targetSpeed: 0.45,
          heal: -400,
        },
        {
          rarity: "normal",
          id: 202392,
          name: "しゃかりき",
          targetSpeed: 0.25,
          heal: -400,
        },
      ],
      duration: 2.7,
      conditions: { phase_firsthalf_random: 1, running_style: 1 },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202421,
          name: "無我夢中",
          acceleration: 0.4,
          heal: -200,
        },
        {
          rarity: "normal",
          id: 202422,
          name: "がむしゃら",
          acceleration: 0.2,
          heal: -200,
        },
      ],
      duration: 1.5,
      conditions: { distance_type: 4, running_style: 3, is_lastspurt: 1 },
      tooltip: "4-9位",
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 202431,
          name: "快進撃",
          targetSpeed: 0.25,
          acceleration: 0.3,
        },
        {
          rarity: "normal",
          id: 202432,
          name: "確かな足取り",
          targetSpeed: 0.05,
          acceleration: 0.1,
        },
      ],
      duration: 3,
      tooltip: "発動地点に先頭から４馬身以内にいる必要がある",
      conditions: {
        distance_type: 3,
        running_style: 2,
        phase_laterhalf_random: 1,
      },
    },
    {
      variants: [
        {
          rarity: "rare",
          id: 200431,
          name: "コンセントレーション",
          startDelay: 0.4,
        },
        {
          rarity: "normal",
          id: 200432,
          name: "集中力",
          startDelay: 0.9,
        },
        { rarity: "inherit", id: 200433, name: "ゲート難", startDelay: 1.5 },
      ],
    },
    {
      variants: [{ rarity: "all", name: "逃げためらい", speed: -0.15 }],
      duration: 3,
      conditions: { running_style: 1 },
    },
    {
      variants: [{ rarity: "all", name: "逃げためらいx2", speed: -0.3 }],
      duration: 3,
      conditions: { running_style: 1 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "先行ためらい", speed: -0.15 }],
      duration: 3,
      conditions: { running_style: 2 },
    },
    {
      variants: [{ rarity: "all", name: "先行ためらいx2", speed: -0.3 }],
      duration: 3,
      conditions: { running_style: 2 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "差しためらい", speed: -0.15 }],
      duration: 3,
      conditions: { running_style: 3 },
    },
    {
      variants: [{ rarity: "all", name: "差しためらいx2", speed: -0.3 }],
      duration: 3,
      conditions: { running_style: 3 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "追込ためらい", speed: -0.15 }],
      duration: 3,
      conditions: { running_style: 4 },
    },
    {
      variants: [{ rarity: "all", name: "追込ためらいx2", speed: -0.3 }],
      duration: 3,
      conditions: { running_style: 4 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "後方釘付", speed: -0.2 }],
      duration: 3,
      conditions: { distance_type: 1 },
    },
    {
      variants: [{ rarity: "all", name: "悩殺術", speed: -0.25 }],
      duration: 3,
      conditions: { distance_type: 1 },
    },
    {
      variants: [{ rarity: "all", name: "スピードイーター", speed: -0.15 }],
      duration: 3,
      conditions: { distance_type: 2 },
    },
    {
      variants: [{ rarity: "all", name: "束縛", speed: -0.15 }],
      duration: 3,
      conditions: { distance_type: 3 },
    },
    {
      variants: [{ rarity: "all", name: "独占力", speed: -0.25 }],
      duration: 3,
      conditions: { distance_type: 3 },
    },
    {
      variants: [{ rarity: "all", name: "まなざし", speed: -0.15 }],
      duration: 3,
    },
    {
      variants: [
        {
          rarity: "all",
          name: "アナタヲ・オイカケテ",
          speed: -0.05,
        },
      ],
      duration: 6,
    },
    {
      variants: [
        { rarity: "all", name: "アナタヲ・オイカケテ(継承)", speed: -0.025 },
      ],
      duration: 3.6,
    },
    {
      variants: [{ rarity: "all", name: "スタミナイーター", fatigue: 50 }],
      conditions: { distance_type: 4 },
    },
    {
      variants: [{ rarity: "all", name: "スタミナイーターx2", fatigue: 100 }],
      conditions: { distance_type: 4 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "逃げけん制", fatigue: 100 }],
      conditions: { running_style: 1 },
    },
    {
      variants: [{ rarity: "all", name: "逃げけん制x2", fatigue: 200 }],
      conditions: { running_style: 1 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "先行けん制", fatigue: 100 }],
      conditions: { running_style: 2 },
    },
    {
      variants: [{ rarity: "all", name: "先行けん制x2", fatigue: 200 }],
      conditions: { running_style: 2 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "差しけん制", fatigue: 100 }],
      conditions: { running_style: 3 },
    },
    {
      variants: [{ rarity: "all", name: "差しけん制x2", fatigue: 200 }],
      conditions: { running_style: 3 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "追込けん制", fatigue: 100 }],
      conditions: { running_style: 4 },
    },
    {
      variants: [{ rarity: "all", name: "追込けん制x2", fatigue: 200 }],
      conditions: { running_style: 4 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "逃げ焦り", fatigue: 100 }],
      conditions: { running_style: 1 },
    },
    {
      variants: [{ rarity: "all", name: "逃げ焦りx2", fatigue: 200 }],
      conditions: { running_style: 1 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "先行焦り", fatigue: 100 }],
      conditions: { running_style: 2 },
    },
    {
      variants: [{ rarity: "all", name: "先行焦りx2", fatigue: 200 }],
      conditions: { running_style: 2 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "差し焦り", fatigue: 100 }],
      conditions: { running_style: 3 },
    },
    {
      variants: [{ rarity: "all", name: "差し焦りx2", fatigue: 200 }],
      conditions: { running_style: 3 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "追込焦り", fatigue: 100 }],
      conditions: { running_style: 4 },
    },
    {
      variants: [{ rarity: "all", name: "追込焦りx2", fatigue: 200 }],
      conditions: { running_style: 4 },
      tooltip: "2回同時に喰らう。通常のと加算できる。",
    },
    {
      variants: [{ rarity: "all", name: "逃亡禁止令", fatigue: 300 }],
      conditions: { distance_type: 1 },
    },
    {
      variants: [{ rarity: "all", name: "抜け駆け禁止", fatigue: 100 }],
      conditions: { distance_type: 1 },
    },
    {
      variants: [{ rarity: "all", name: "ささやき", fatigue: 100 }],
      conditions: { distance_type: 3 },
    },
    {
      variants: [{ rarity: "all", name: "ささやきx2", fatigue: 200 }],
      conditions: { distance_type: 3 },
    },
    {
      variants: [{ rarity: "all", name: "魅惑のささやき", fatigue: 300 }],
      conditions: { distance_type: 3 },
    },
    {
      variants: [{ rarity: "all", name: "魅惑のささやきx2", fatigue: 600 }],
      conditions: { distance_type: 3 },
    },
    { variants: [{ rarity: "all", name: "鋭い眼光", fatigue: 100 }] },
    {
      variants: [
        {
          rarity: "all",
          name: "鋭い眼光x2",
          fatigue: 200,
        },
      ],
    },
    { variants: [{ rarity: "all", name: "八方にらみ", fatigue: 300 }] },
    {
      variants: [
        {
          rarity: "all",
          name: "八方にらみx2",
          fatigue: 600,
        },
      ],
    },
    {
      variants: [{ rarity: "all", name: "スタミナグリード", fatigue: 100 }],
      conditions: { distance_type: 4 },
    },
  ];
}

const uniqueSkillData = (thiz) => [
  {
    name: "  なし／発動しない",
    noInherit: true,
    check: function () {
      return false;
    },
  },
  {
    id: 100321,
    name: "U=ma2",
    heal: 550,
    duration: 4,
    targetSpeed: 0.25,
    tooltip: "3～4位(<=40%)",
    check: function () {
      return (
        thiz.position >= thiz.courseLength / 2.0 &&
        thiz.isInCorner(thiz.position)
      );
    },
  },
  {
    id: 100451,
    name: "ピュリティオブハート",
    heal: 750,
    tooltip: "2～4位(<=40%)",
    init: function () {
      this.randoms = thiz.initPhaseRandom(1);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10521,
  //   name: "ワクワクよーいドン",
  //   noInherit: true,
  //   heal: 350,
  //   tooltip: "近くにウマ娘がいる＆順位<=50%は満たしていると見なす",
  //   check: function () {
  //     return thiz.isInFinalCorner();
  //   },
  // },
  {
    id: 100521,
    name: "ワクワククライマックス",
    heal: 550,
    tooltip: "近くにウマ娘がいる＆順位<=50%は満たしていると見なす",
    check: function () {
      return thiz.isInFinalCorner();
    },
  },
  {
    id: 110111,
    name: "ゲインヒール・スペリアー",
    heal: 750,
    tooltip: "中盤のどこかで発動として見なす。",
    init: function () {
      this.randoms = thiz.initPhaseRandom(1);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110011,
    name: "わやかわ♪マリンダイヴ",
    heal: 550,
    check: function () {
      return thiz.skillTriggerCount[1] >= 2;
    },
  },
  {
    id: 110301,
    name: "Drain for rose",
    heal: 550,
    targetSpeed: 0.25,
    duration: 5,
    conditions: {
      phase: 1,
    },
  },
  // {
  //   id: 10071,
  //   name: "波乱注意砲！",
  //   noInherit: true,
  //   targetSpeed: 0.15,
  //   duration: 6,
  //   tooltip: "順位条件の<=50%は満たしていると見なす",
  //   check: function () {
  //     return (
  //       thiz.position >= thiz.courseLength * 0.5 &&
  //       thiz.position <= thiz.courseLength * 0.6
  //     );
  //   },
  // },
  {
    id: 100071,
    name: "不沈艦、抜錨ォッ！",
    targetSpeed: 0.25,
    duration: 6,
    tooltip: "順位条件の<=50%は満たしていると見なす",
    check: function () {
      return (
        thiz.position >= thiz.courseLength * 0.5 &&
        thiz.position <= thiz.courseLength * 0.6
      );
    },
  },
  {
    id: 100131,
    name: "貴顕の使命を果たすべく",
    duration: 5,
    type: "speed",
    invokes: [
      {
        targetSpeed: 0.45,
        conditions: {
          is_finalcorner: 1,
          corner: 1,
          distance_type: 4,
          lastspurt: 2,
        },
      },
      {
        targetSpeed: 0.35,
        conditions: {
          is_finalcorner: 1,
          corner: 1,
        },
      },
    ],
  },
  {
    id: 100261,
    name: "G00 1st．F∞;",
    targetSpeed: 0.45,
    duration: 5,
    conditions: {
      is_badstart: 0,
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 110131,
    name: "最強の名を懸けて",
    targetSpeed: 0.35,
    duration: 6,
    conditions: {
      phase: ">=2",
      is_finalcorner: 1,
    },
    tooltip: "「最終直線のどこか」として扱う。",
    init: function () {
      this.randoms = thiz.initFinalStraightRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10081,
  //   name: "アクセルX",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   duration: 5,
  //   tooltip:
  //     "「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。",
  //   check: function (startPosition) {
  //     return (
  //       startPosition <= thiz.toPosition(200) &&
  //       thiz.position >= thiz.toPosition(200)
  //     );
  //   },
  // },
  {
    id: 100081,
    name: "カッティング×DRIVE！",
    targetSpeed: 0.35,
    duration: 5,
    tooltip:
      "「他面倒くさいの全部満たしたと見なして200mで発動する」として扱う。",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(200) &&
        thiz.position >= thiz.toPosition(200)
      );
    },
  },
  {
    id: 100061,
    name: "勝利の鼓動",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "順位条件は満たしてると見なす",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(200) &&
        thiz.position >= thiz.toPosition(200)
      );
    },
  },
  {
    id: 100171,
    name: "汝、皇帝の神威を見よ",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "最終コーナーで3人追い抜きは満たしたと見なす",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  // {
  //   id: 10181,
  //   name: "エンプレス・プライド",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   duration: 5,
  //   tooltip:
  //     "他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。",
  //   init: function () {
  //     this.randoms = thiz.initFinalCornerRandom();
  //   },
  //   check: function (startPosition) {
  //     return thiz.isInRandom(this.randoms, startPosition);
  //   },
  // },
  {
    id: 100181,
    name: "ブレイズ・オブ・プライド",
    targetSpeed: 0.35,
    duration: 5,
    tooltip:
      "他面倒くさいの全部満たしたと見なし「最終コーナーのどこかで発動する」として扱う。",
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10351,
  //   name: "全力Vサインッ！",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   duration: 5,
  //   tooltip:
  //     "他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。",
  //   init: function () {
  //     this.randoms = thiz.initFinalStraightRandom();
  //   },
  //   check: function (startPosition) {
  //     return thiz.isInRandom(this.randoms, startPosition);
  //   },
  // },
  {
    id: 100351,
    name: "勝利のチケットを、君にッ！",
    targetSpeed: 0.35,
    duration: 5,
    tooltip:
      "他面倒くさいの全部満たしたと見なし「最終直線のどこかで発動する」として扱う。",
    init: function () {
      this.randoms = thiz.initFinalStraightRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10411,
  //   name: "学級委員長+速さ＝バクシン",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   duration: 5,
  //   tooltip: "「レース1/2～5/6のどこかで発動する」として扱う。",
  //   init: function () {
  //     this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6);
  //   },
  //   check: function (startPosition) {
  //     return thiz.isInRandom(this.randoms, startPosition);
  //   },
  // },
  {
    id: 100411,
    name: "優等生×バクシン＝大勝利ッ",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「レース1/2～5/6のどこかで発動する」として扱う。",
    init: function () {
      this.randoms = thiz.initIntervalRandom(0.5, 5.0 / 6);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10561,
  //   name: "来てください来てください！",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   acceleration: 0.1,
  //   duration: 5,
  //   tooltip: "「終盤のどこかで発動する」として扱う。",
  //   init: function () {
  //     this.randoms = thiz.initPhaseRandom(2);
  //   },
  //   check: function (startPosition) {
  //     return thiz.isInRandom(this.randoms, startPosition);
  //   },
  // },
  {
    id: 100561,
    name: "来ます来てます来させます！",
    targetSpeed: 0.35,
    acceleration: 0.1,
    duration: 5,
    tooltip: "「終盤のどこかで発動する」として扱う。",
    init: function () {
      this.randoms = thiz.initPhaseRandom(2);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10601,
  //   name: "アタシもたまには、ね？",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   duration: 5,
  //   tooltip: "「ラストスパートのどこかで発動する」として扱う。",
  //   init: function () {
  //     this.randoms = thiz.initPhaseRandom(3);
  //   },
  //   check: function (startPosition) {
  //     return thiz.isInRandom(this.randoms, startPosition);
  //   },
  // },
  {
    id: 100601,
    name: "きっとその先へ…！",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「ラストスパートのどこかで発動する」として扱う。",
    init: function () {
      this.randoms = thiz.initPhaseRandom(3);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10111,
  //   name: "精神一到",
  //   noInherit: true,
  //   targetSpeed: 0.25,
  //   duration: 5,
  //   tooltip: "「最終直線のどこかで発動する」として扱う。",
  //   init: function () {
  //     this.randoms = thiz.initFinalStraightRandom();
  //   },
  //   check: function (startPosition) {
  //     return thiz.isInRandom(this.randoms, startPosition);
  //   },
  // },
  {
    id: 100111,
    name: "精神一到何事か成らざらん",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「最終直線のどこかで発動する」として扱う。",
    init: function () {
      this.randoms = thiz.initFinalStraightRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  // {
  //   id: 10611,
  //   name: "Call me KING",
  //   noInherit: true,
  //   targetSpeed: 0.35,
  //   duration: 5,
  //   tooltip: "4～6位(<=70%)",
  //   check: function (startPosition) {
  //     return (
  //       startPosition <= thiz.toPosition(200) &&
  //       thiz.position >= thiz.toPosition(200) &&
  //       thiz.temptationModeStart == null &&
  //       thiz.startDelay < 0.08
  //     );
  //   },
  // },
  {
    id: 100611,
    name: "Pride of KING",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "4～6位(<=70%)",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(200) &&
        thiz.position >= thiz.toPosition(200) &&
        thiz.temptationModeStart == null &&
        thiz.startDelay < 0.08
      );
    },
  },
  {
    id: 100011,
    name: "シューティングスター",
    speedWithDecel: 0.35,
    duration: 5,
    acceleration: 0.1,
    tooltip: "終盤前半ランダム位置発動として扱う",
    conditions: {
      phase_random: 2,
    },
  },
  {
    id: 100021,
    name: "先頭の景色は譲らない…！",
    targetSpeed: 0.35,
    duration: 5,
    check: function () {
      return thiz.isInInterval(0.5, 1);
    },
  },
  {
    id: 100031,
    name: "究極テイオーステップ",
    targetSpeed: 0.45,
    duration: 5,
    conditions: {
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 100151,
    name: "ヴィットーリアに捧ぐ舞踏",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「最終コーナーのどこかで発動」として扱う。まぁ発動しないけど。",
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 100161,
    name: "Shadow Break",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "競合あり、2～7位(<=75%)",
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 100231,
    name: "∴win Q．E．D．",
    duration: 5,
    type: "speed",
    invokes: [
      {
        targetSpeed: 0.45,
        conditions: {
          phase: ">=2",
          is_finalcorner: 1,
          temptation_count: 0,
        },
      },
      {
        targetSpeed: 0.35,
        conditions: {
          phase: ">=2",
          is_finalcorner: 1,
        },
      },
    ],
  },
  {
    id: 100301,
    name: "ブルーローズチェイサー",
    targetSpeed: 0.35,
    duration: 5,
    conditions: {
      phase: ">=2",
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 100501,
    name: "Nemesis",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「最終コーナーのどこかで発動」として扱う",
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110031,
    name: "絶対は、ボクだ",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「最終直線のどこかで発動」として扱う",
    init: function () {
      this.randoms = thiz.initFinalStraightRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110241.1,
    name: "フラワリー☆マニューバ(前)",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「最終コーナーのどこかで発動」として扱う。こちらは前の方。",
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110181,
    name: "薫風、永遠なる瞬間を",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「中盤のどこかで発動」として扱うが、基本的には発動しない。",
    init: function () {
      this.randoms = thiz.initPhaseRandom(1);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 100121,
    name: "タイマン！デッドヒート！",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "「最終直線のどこかで発動」として扱う。",
    init: function () {
      this.randoms = thiz.initFinalStraightRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110041,
    name: "グッときて♪Chu",
    targetSpeed: 0.35,
    duration: 5,
    check: function () {
      return (
        thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount > 0
      );
    },
  },
  {
    id: 100371,
    name: "Schwarze Schwert",
    targetSpeed: 0.45,
    duration: 5,
    conditions: {
      temptation_count: 0,
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 110561,
    name: "禾スナハチ登ル",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "50%-60%地点のどこかで発動として扱う",
    init: function () {
      this.randoms = thiz.initIntervalRandom(0.5, 0.6);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 100191,
    name: "尊み☆ﾗｽﾄｽﾊﾟ━━(ﾟ∀ﾟ)━━ﾄ!",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "フェイズ2のどこか発動として扱う",
    init: function () {
      this.randoms = thiz.initPhaseRandom(2);
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 100391,
    name: "姫たるもの、勝利をこの手に",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "最終直線に入ってすぐ発動として扱う",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 100251,
    name: "アナタヲ・オイカケテ",
    targetSpeed: 0.25,
    duration: 6,
    tooltip: "順位条件は満たしていると見なす",
    check: function () {
      return thiz.position >= thiz.courseLength * 0.5;
    },
  },
  {
    id: 110171,
    name: "翳り退く、さざめきの矢",
    targetSpeed: 0.35,
    duration: 6,
    conditions: {
      phase: ">=2",
      is_finalcorner: 1,
    },
  },
  {
    id: 100481,
    name: "YEAH☆VIVID TIME!",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "最終直線即発動として扱う",
    conditions: {
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 110231,
    name: "Presents from X",
    targetSpeed: 0.35,
    duration: 5,
    conditions: {
      phase: 1,
      distance_rate: ">=50",
    },
  },
  {
    id: 100041,
    name: "紅焔ギア/LP1211-M",
    acceleration: 0.4,
    duration: 4,
    tooltip:
      "順位<=5及び<=50%は満たしていると見なす。どの脚質でも最速発動扱い。",
    check: function () {
      return thiz.isInFinalCorner() || thiz.isInFinalStraight();
    },
  },
  {
    id: 100101,
    name: "ヴィクトリーショット！",
    acceleration: 0.4,
    duration: 4,
    tooltip: "順位>=3及び<=50%は満たしていると見なす",
    check: function () {
      return thiz.isInFinalCorner(thiz.position, { start: 0.5, end: 1 });
    },
  },
  {
    id: 100271,
    name: "レッツ・アナボリック！",
    acceleration: 0.4,
    duration: 4,
    conditions: { phase: ">=2", corner: 1, running_style: [3, 4] },
  },
  {
    id: 100201,
    name: "アングリング×スキーミング",
    acceleration: 0.4,
    duration: 4,
    conditions: { phase: ">=2", corner: 1, running_style: [1, 2] },
  },
  {
    id: 110241.2,
    name: "フラワリー☆マニューバ(後)",
    acceleration: 0.4,
    duration: 4,
    tooltip: "「最終コーナーのどこかで発動」として扱う。こちらは後の方。",
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110141,
    name: "コンドル猛撃波",
    acceleration: 0.4,
    duration: 4,
    init: function () {
      this.randoms = thiz.initFinalCornerRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 100401,
    name: "KEEP IT REAL．",
    acceleration: 0.3,
    duration: 6,
    tooltip: "50%地点で即発動として扱う",
    check: function () {
      return thiz.position >= thiz.courseLength / 2.0;
    },
  },
  {
    id: 100591,
    name: "彼方、その先へ…",
    acceleration: 0.4,
    duration: 4,
    tooltip: "常に順位>=50%及び<=70%は満たしていると見なす。",
    check: function (startPosition) {
      return (
        thiz.temptationModeStart == null &&
        ((thiz.currentPhase >= 2 &&
          !thiz.isInFinalCorner(startPosition) &&
          thiz.isInCorner(startPosition)) ||
          (thiz.currentPhase === 1 && thiz.isInFinalCorner(startPosition)))
      );
    },
  },
  {
    id: 100091,
    name: "ブリリアント・レッドエース",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "「レース50%～75%のどこかで発動する」として扱う。",
    conditions: {
      distance_rate_random: [50, 75],
    },
  },
  {
    id: 100141,
    name: "プランチャ☆ガナドール",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "最終直線即発動として扱う。",
    conditions: {
      is_finalcorner: 1,
      corner: 0,
      hp_per: ">=30",
    },
  },
  {
    id: 100241,
    name: "ひらめき☆ランディング",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "最終コーナーで即発動として扱う",
    conditions: {
      is_finalcorner: 1,
    },
  },
  {
    id: 100381,
    name: "#LookatCurren",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "2～4位(<=40%)。レース50%-65%のどこかで発動。",
    conditions: {
      distance_rate_random: [50, 65],
    },
  },
  {
    id: 100461,
    name: "キラキラ☆STARDOM",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "中盤のコーナーではない地点と即発動としてみなす",
    conditions: {
      phase: 1,
      corner: 0,
    },
  },
  {
    id: 100581,
    name: "I Never Goof Up!",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    conditions: {
      phase_random: 2,
    },
    tooltip: "「終盤前半ランダムで発動」として扱う",
  },
  {
    id: 100281,
    name: "I’M☆FULL☆SPEED!!",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    conditions: {
      distance_rate: [">=45", "<=60"],
      hp_per: "<=70",
    },
  },
  {
    id: 110451,
    name: "ぐるぐるマミートリック♡",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "最終直線に入った瞬間に発動として扱う",
    conditions: {
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 110401,
    name: "GET DOWN",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "最終コーナーに入った瞬間に発動として扱う",
    conditions: {
      is_finalcorner: 1,
      corner: 1,
    },
  },
  {
    id: 110061,
    name: "聖夜のミラクルラン！",
    targetSpeed: 0.25,
    acceleration: 0.3,
    heal: 350,
    duration: 5,
    check: function () {
      return (
        thiz.position >= thiz.courseLength * 0.5 && thiz.healTriggerCount >= 3
      );
    },
  },
  {
    id: 100221,
    name: "Fairy tale",
    targetSpeed: 0.35,
    duration: 5,
    check: function () {
      return thiz.position >= thiz.courseLength * 0.52;
    },
  },
  {
    id: 100211,
    name: "白い稲妻、見せたるで！",
    targetSpeed: 0.35,
    acceleration: 0.1,
    duration: 5,
    check: function () {
      return thiz.isInStraight() && thiz.position >= thiz.courseLength * 0.5;
    },
  },
  {
    id: 110521,
    name: "113転び114起き",
    targetSpeed: 0.25,
    duration: 6,
    tooltip: "6秒持続として扱う",
    check: function () {
      return thiz.isInFinalCorner();
    },
  },
  {
    id: 110151,
    name: "恵福バルカローレ",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "7回発動したとして扱う。じゃないと弱すぎる。",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(400) &&
        thiz.position >= thiz.toPosition(400)
      );
    },
  },
  {
    id: 100691,
    name: "憧れは桜を越える！",
    targetSpeed: 0.35,
    duration: 5,
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(300) &&
        thiz.position >= thiz.toPosition(300)
      );
    },
  },
  {
    id: 110261,
    name: "オペレーション・Cacao",
    targetSpeed: 0.35,
    heal: 150,
    duration: 5,
    check: function () {
      return thiz.currentPhase === 1 && thiz.isInCorner();
    },
  },
  {
    id: 110371,
    name: "Guten Appetit♪",
    targetSpeed: 0.35,
    duration: 6,
    tooltip: "最終コーナー以降で2人追い抜きは満たしたと見なす",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 100331,
    name: "ディオスクロイの流星",
    targetSpeed: 0.45,
    duration: 5,
    tooltip:
      "7～9位(>=80%)の場合。他の場合は他の最終直線0.35固有で代用して下さい。",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 100681,
    name: "勝ち鬨ワッショイ！",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "1～2位",
    check: function () {
      return (
        (thiz.isPhase(2) && thiz.isStraightFrontType(2)) ||
        (thiz.isInInterval(0.5, 1) && thiz.isInCorner(null, 3))
      );
    },
  },
  // {
  //   id: 10621,
  //   name: "レディー、どんっ！",
  //   noInherit: true,
  //   targetSpeed: 0.15,
  //   heal: 350,
  //   duration: 5,
  //   tooltip: "3～6位(<=70%)",
  //   check: function () {
  //     return thiz.isInInterval(0.5, 1) && thiz.isPhase(1);
  //   },
  // },
  {
    id: 100621,
    name: "どんっ、パッ、むんっ",
    targetSpeed: 0.25,
    heal: 550,
    duration: 5,
    tooltip: "3～6位(<=70%)",
    check: function () {
      return thiz.isInInterval(0.5, 1) && thiz.isPhase(1);
    },
  },
  {
    id: 100051,
    name: "煌星のヴォードヴィル",
    targetSpeed: 0.45,
    duration: 5,
    conditions: {
      remain_distance: "<=300",
    },
  },
  {
    id: 100671,
    name: "晦冥を照らせ永遠の耀き",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "2～5位。発動時先頭から5m以内の場合。",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 100711,
    name: "一期の夢、刹那の飛翔",
    targetSpeed: 0.45,
    heal: -100,
    duration: 4,
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 100741,
    name: "麗しき花信風",
    targetSpeed: 0.15,
    duration: 5,
    tooltip: "4～7位",
    conditions: {
      distance_rate: ">=50",
    },
    trigger: function (skill) {
      const map = {
        2000: 1,
        2400: 1.5,
        2600: 2,
        2800: 2.2,
        3000: 2.5,
        3200: 3,
        3500: 3.5,
        99999999: 4,
      };
      for (const key in map) {
        if (thiz.sp < key) {
          skill.duration *= map[key];
          return {
            extended: map[key].toString(),
          };
        }
      }
    },
  },
  {
    id: 110051,
    name: "Ravissant",
    targetSpeed: 0.45,
    duration: 4,
    check: function () {
      return thiz.isInFinalCorner() || thiz.isInFinalStraight();
    },
  },
  {
    id: 110201,
    name: "Do Ya Breakin!",
    targetSpeed: 0.35,
    acceleration: 0.2,
    duration: 5,
    conditions: {
      phase: ">=2",
      corner: 0,
      straight_front_type: 2,
    },
  },
  {
    id: 110511,
    name: "つぼみ、ほころぶ時",
    acceleration: 0.4,
    duration: 4,
    check: function () {
      return (
        (thiz.isPhase(2) || thiz.isPhase(3)) &&
        (thiz.isInFinalStraight() ||
          thiz.isInFinalCorner(thiz.position, { start: 0.5, end: 1 }))
      );
    },
  },
  {
    id: 100721,
    name: "烈火繚乱、無敵之舞",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "<=40%(1～4位)",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(300) &&
        thiz.position >= thiz.toPosition(300)
      );
    },
  },
  {
    id: 110601,
    name: "Go☆Go☆for it!",
    targetSpeed: 0.35,
    duration: 6,
    tooltip: ">=40% <=70%(4～6位)、4人気以下",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 110611,
    name: "轟！トレセン応援団！！",
    acceleration: 0.4,
    duration: 4,
    tooltip: "距離50%まで6～9位",
    check: function () {
      return thiz.isInFinalStraight() && thiz.temptationModeStart == null;
    },
  },
  {
    id: 100311,
    name: "チャージ完了！全速前進！",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "東京時、1～2位",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(300) &&
        thiz.position >= thiz.toPosition(300)
      );
    },
  },
  {
    id: 100641,
    name: "ぶっちぎりロード",
    heal: 550,
    targetSpeed: 0.25,
    duration: 6,
    tooltip: "距離50%までずっと1～2位",
    check: function () {
      return thiz.position >= thiz.courseLength * 0.5;
    },
  },
  {
    id: 110221,
    name: "Best day ever",
    targetSpeed: 0.35,
    acceleration: 0.1,
    duration: 5,
    tooltip: "2～4位。加速力は残り401m以上がある場合（自動で判断していない）",
    check: function () {
      return thiz.currentPhase >= 2 && thiz.isInFinalCorner();
    },
  },
  {
    id: 110381,
    name: "One True Color",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "2～4位、後ろ１馬身。",
    check: function (startPosition) {
      return thiz.isContainsRemainingDistance(350, startPosition);
    },
  },
  {
    id: 100341,
    name: "快走かな、快走かな！",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "最終直線ランダム発動として扱う",
    init: function () {
      this.randoms = thiz.initFinalStraightRandom();
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
  },
  {
    id: 110101,
    name: "Joyful Voyage!",
    targetSpeed: 0.35,
    speedWithDecel: 0.15,
    duration: 5,
    tooltip: "2～4位。追加条件は満たしたとしてみなす。",
    conditions: {
      remain_distance: [199, 201],
    },
  },
  {
    id: 110591,
    name: "ときめきが呼ぶほうへ",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "4～7位。",
    check: function () {
      return (
        thiz.position >= thiz.courseLength * 0.6 &&
        thiz.courseLength - thiz.position >= 500 &&
        thiz.isInSlope("down")
      );
    },
  },
  {
    id: 100361,
    name: "trigger:BEAT",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "4～7位。",
    check: function (startPosition) {
      return thiz.isInFinalStraight(startPosition);
    },
  },
  {
    id: 120131,
    name: "きらめくは海、まばゆきは君",
    targetSpeed: 0.15,
    duration: 5,
    tooltip: "1～4位",
    conditions: {
      distance_rate: ">=50",
    },
    trigger: function (skill) {
      const map = {
        2000: 1,
        2400: 1.5,
        2600: 2,
        2800: 2.2,
        3000: 2.5,
        3200: 3,
        3500: 3.5,
        99999999: 4,
      };
      for (const key in map) {
        if (thiz.sp < key) {
          skill.duration *= map[key];
          return {
            extended: map[key].toString(),
          };
        }
      }
    },
  },
  {
    id: 100441,
    name: "いただき☆ストレリチア！",
    targetSpeed: 0.35,
    duration: 6,
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(300) &&
        thiz.position >= thiz.toPosition(300) &&
        thiz.temptationModeStart == null
      );
    },
  },
  {
    id: 100981,
    name: "理運開かりて翔る",
    targetSpeed: 0.25,
    acceleration: 0,
    duration: 5,
    init: function () {
      this.randoms = thiz.initPhaseRandom(1, { startRate: 0.5 });
    },
    check: function (startPosition) {
      return thiz.isInRandom(this.randoms, startPosition);
    },
    trigger: function (skill) {
      if (skill.id === 900981) {
        skill.targetSpeed = 0.05;
        skill.acceleration = 0;
        return;
      }
      const rate = [0, 0, 0, 1, 1, 2];
      skill.targetSpeed =
        0.25 +
        (thiz.passiveTriggered > 5 ? 3 : rate[thiz.passiveTriggered]) * 0.05;
      skill.acceleration =
        (thiz.passiveTriggered > 5 ? 3 : rate[thiz.passiveTriggered]) * 0.05;
    },
  },
  {
    id: 110461,
    name: "α-star*",
    targetSpeed: 0.25,
    heal: 350,
    duration: 6,
    conditions: {
      ground_type: 2,
      distance_rate: [">=40%", "<=50"],
    },
    tooltip: "MAX発動時",
  },
  {
    id: 110351,
    name: "夢の先へ、届け！",
    targetSpeed: 0.35,
    duration: 6,
    tooltip: "面倒なので0.35として計算。",
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 110501,
    name: "Hephaistos",
    targetSpeed: 0.35,
    duration: 5,
    check: function () {
      return (
        thiz.isInFinalCorner(thiz.position, { start: 0.5, end: 1 }) &&
        (thiz.isPhase(2) || thiz.isPhase(3))
      );
    },
  },
  {
    id: 100291,
    name: "ゆきあかり、おいかけて",
    targetSpeed: 0.35,
    duration: 5,
    tooltip: "300m即発動として扱う。実際は先頭か先頭と5m以内の差で1～4位。",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(300) &&
        thiz.position >= thiz.toPosition(300)
      );
    },
  },
  {
    id: 100421,
    name: "『I’m possible』",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "2～9位、先頭と5m以内扱い",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(200) &&
        thiz.position >= thiz.toPosition(200)
      );
    },
  },
  {
    id: 110191,
    name: "萌到讓我活過來了！",
    targetSpeed: 0.35,
    duration: 5,
    check: function () {
      return thiz.isInCorner() && thiz.curretPhase === 1;
    },
  },
  {
    id: 110581,
    name: "Spooky-Scary-Happy",
    targetSpeed: 0.35,
    duration: 5,
    check: function () {
      return thiz.isInFinalStraight();
    },
  },
  {
    id: 100871,
    name: "silent letter",
    targetSpeed: 0.25,
    acceleration: 0.3,
    duration: 5,
    tooltip: "400m即発動として扱う",
    check: function (startPosition) {
      return (
        startPosition <= thiz.toPosition(400) &&
        thiz.position >= thiz.toPosition(400)
      );
    },
  },
  {
    id: 100781,
    name: "風光る",
    acceleration: 0.2,
    duration: 8,
    tooltip: "2位時",
    check: function () {
      return thiz.isInFinalCorner(thiz.position, { start: 0.5, end: 1 });
    },
  },
  {
    id: 110211,
    name: "火神鳴",
    targetSpeed: 0.3,
    duration: 6,
    tooltip: "2スキルで発動の即0.3として扱う",
    check: function () {
      return thiz.skillTriggerCount[1] >= 2;
    },
  },
  {
    id: 110341,
    name: "灯穂",
    targetSpeed: 0.385,
    duration: 5,
    tooltip: "0.35として扱う",
    check: function () {
      return thiz.currentPhase >= 2 && thiz.isInCorner();
    },
  },
  {
    id: 100491,
    name: "剣ヶ峰より、狂気に嗤え",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "0.45として扱う",
    check: function () {
      return thiz.remainDistance <= 400;
    },
  },
  {
    id: 101001,
    name: "Never Say Never",
    speedWithDecel: 0.25,
    duration: 5,
    conditions: {
      remain_distance: [299, 301],
      ground_type: 2,
    },
  },
  {
    id: 120011,
    name: "威風堂々、夢錦！",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "中山の0.45として扱う",
    conditions: {
      phase: ">=2",
      is_finalcorner: 1,
      corner: 1,
      is_activate_any_skill: 1,
      track_id: 10005,
    },
  },
  {
    id: 110091,
    name: "Queen’s Lumination",
    targetSpeed: 0.35,
    duration: 6,
    tooltip: "0.35のみ",
    conditions: {
      distance_rate: ">=50",
      corner: 0,
    },
  },
  {
    id: 110081,
    name: "Into High Gear!",
    targetSpeed: 0.35,
    acceleration: 0.1,
    duration: 5,
    tooltip: "常に東京として扱う。分ける実装面倒すぎぃ！",
    check: function (startPosition) {
      return (
        thiz.isInSlope("down", startPosition) &&
        !thiz.isInSlope("down") &&
        thiz.phase >= 1
      );
    },
  },
  {
    id: 100471,
    name: "掲げよ、己が魂の剣を！",
    targetSpeed: 0.45,
    duration: 5,
    tooltip: "0.45のみ",
    conditions: {
      remain_distance: 400,
    },
  },
  {
    id: 110161,
    name: "灰色の臨界点",
    targetSpeed: 0.55,
    duration: 5,
    tooltip: "0.55のみ",
    conditions: {
      distance_type: 4,
      phase: ">=2",
      is_finalcorner_laterhalf: 1,
      remain_distance: 400,
    },
  },
  {
    id: 110671,
    name: "玄雲散らす、黄金甲矢",
    targetSpeed: 0.35,
    heal: 350,
    duration: 5,
    conditions: {
      distance_rate: [">=40", "<=50"],
    },
  },
  {
    id: 110681,
    name: "あっぱれ大盤振る舞い！",
    speedWithDecel: 0.35,
    acceleration: 0.1,
    duration: 4,
    conditions: {
      phase: ">=2",
      corner: 1,
      remain_distance: ">=600",
    },
  },
  {
    id: 100991,
    name: "かがやけ☆とまこまい",
    acceleration: 0.4,
    duration: 4,
    tooltip: "最大スパート時のみ、3～4位＆中盤コーナーで競り合い",
    conditions: {
      ground_type: 2,
      lastspurt: 2,
      is_lastspurt: 1,
    },
  },
  {
    id: 100651,
    name: "アゲてアゲてぷちょへんざ！",
    targetSpeed: 0.25,
    duration: 6,
    tooltip: "短距離/マイルのみ、順位<=50%",
    conditions: {
      distance_type: [1, 2],
      phase_laterhalf_random: 1,
    },
  },
  {
    id: 110271,
    name: "あなたに捧げるフリーポア",
    targetSpeed: 0.35,
    acceleration: 0.1,
    duration: 4,
    tooltip: "中距離のみ、>=2位",
    conditions: {
      distance_rate: ">=60",
      slope: 2,
      phase: 1,
      distance_type: 3,
    },
  },
  {
    id: 110311,
    name: "フレッシュ☆パーラー",
    targetSpeed: 0.25,
    heal: 350,
    duration: 6,
    tooltip: "順位<=30%",
    conditions: {
      phase_firsthalf_random: 1,
    },
  },
  {
    id: 100431,
    name: "Ding Dong Boo",
    targetSpeed: 0.25,
    acceleration: 0.4,
    duration: 5,
    tooltip: "ダートのみ、最終直線ランダム発動として扱う",
    conditions: {
      ground_type: 2,
      is_finalcorner: 1,
      corner: 0,
    },
  },
  {
    id: 100571,
    name: "叙情、旅路の果てに",
    targetSpeed: 0.35,
    duration: 6,
    tooltip: "強化版のみ。6～9位で先頭から8馬身差。",
    conditions: {
      distance_type: [3, 4],
      phase_laterhalf_random: 1,
    },
  },
  {
    id: 100661,
    name: "エンジン全開！大噴射！",
    type: "speed",
    invokes: [
      {
        targetSpeed: 0.15,
        duration: 13,
        conditions: {
          distance_rate: [">=34", "<=36"],
        },
      },
      {
        targetSpeed: -0.05,
        duration: 500,
        conditions: {
          phase: 3,
        },
      },
    ],
  },

  // End of unique skills
];

export { normalSkillData, uniqueSkillData };
