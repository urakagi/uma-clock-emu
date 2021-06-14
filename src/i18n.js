import Vue from 'vue'
import VueI18n from 'vue-i18n'

// import en from '../i18n/en/lang'
// import tw from '../i18n/tw/lang'

Vue.use(VueI18n)

const messages = {
	jp: {
		message: {
			saveUma: 'セーブ',
			umaToLoad: '保存済みウマ娘',
			loadUma: 'ロード',
			yes: 'はい',
			deleteOrNot: '削除しますか？',
			delete: '削除',
			resetOrNot: 'リセットしますか？',
			reset: 'リセット',
			importUma: 'JSONからインポート',
			speed: 'スピード',
			stamina: "スタミナ",
			power: "パワー",
			guts: "根性",
			wisdom: "賢さ",
			style: "脚質",

			distanceFit: "距離適性",
			surfaceFit: "バ場適性",
			styleFit: "脚質適性",
			random: "ランダム",
			course: "コース",
			surfaceCondition: "バ場状態",
			uniqueSkill: "固有スキル",
			testTime: "回数",
			emulationResult: "時計統計",
			realTime: "実タイム",
			StandardDeviation: "標準偏差",
			best: "ベスト",
			worst: "ワースト",
			timeInGame: "ゲーム表記",
			avg: "平均",
			MaxSpurt: "最大ｽﾊﾟｰﾄ",
			NotMaxSpurt: "非最大ｽﾊﾟｰﾄ",
			spurtAverage: "スパート平均",
			maxSpurtRate: "最大スパート率",
			maxSpurtSPLeft: "最大時耐力余剰",
			nonMaxSpurtSPLack: "非最大時不足分",
			latestRaceTime: "直近レース詳細",
			totalStatus: "ステータス総合",
			displayStatusCheck: "コースステータスチェック",

			skillActivateRate : "スキル発動率",
			temperamentRate: "掛かり率",
			v0: "スタート目標速度",
			a0: "スタート加速度",
			maxSpurtSpeed: "最高スパート速度",

      remark1: "あくまで目安。適当実装＆データの正確性が低いので参考までに。",
      remark2: "灰色の背景は掛かり区間、淡紫色の背景はコーナー。",
      remark3: "データが安定するまではいつでもロードデータが使えなくなる可能性があります。その都度作り直して下さい。安定したらこんなことはなくなります。多分安定しました。",
      remark4: "ポジションキープを始めとした他ウマ娘が絡む要素は未実装。",
      remark5: "それが条件になるスキルは適当にそれっぽく実装してます。",
      remark6: "喰らう妨害スキルは一律発動率80％としています。",
      remark7: "適性は直接ステータスを修正するものではないので、下の補正後ステータスには反映されません。",
      remark8: "作った人：砂井裏鍵。各種別情報は大いに参考させて頂きました。",

      contact: "ツイッターはこ↑こ↓",
      emulating: "エミュレート中、少々お待ち下さい……",
		}
	},
	tw: {
		message: {

			saveUma: '儲存',
			umaToLoad: '已儲存的馬娘',
			loadUma: '載入',
			yes: '是',
			deleteOrNot: '確定要刪除嗎？',
			delete: '刪除',
			resetOrNot: '確定要重設嗎？',
			reset: '重設',
			importUma: '從JSON載入',
			speed: '速度',
			stamina: "耐力",
			power: "力量",
			guts: "根性",
			wisdom: "智慧",
			style: "腳質",

			distanceFit: "距離適性",
			surfaceFit: "馬場適性",
			styleFit: "腳質適性",
			random: "隨機",
			course: "場地",
			surfaceCondition: "馬場狀態",
			uniqueSkill: "固有技能",
			emulateStart: "エミュレート開始",
			testTime: "回數",
			emulationResult: "時計統計",
			realTime: "實際時間",
			StandardDeviation: "標準差",
			best: "最佳",
			worst: "最差",
			timeInGame: "遊戲內時間",
			avg: "平均",
			MaxSpurt: "最大衝刺",
			NotMaxSpurt: "非最大衝刺",
			spurtAverage: "平均衝刺",
			maxSpurtRate: "最大衝刺率",
			maxSpurtSPLeft: "最大時剩餘耐力",
			nonMaxSpurtSPLack: "非最大時不足耐力",

			latestRaceTime: "直近レース詳細",
			totalStatus: "ステータス総合",
			displayStatusCheck: "コースステータスチェック",

			skillActivateRate : "技能發動率",
			temperamentRate: "焦慮率(掛かり率)",
			v0: "起跑目標速度",
			a0: "起跑加速度",
			maxSpurtSpeed: "最高衝刺速度",



      remark1: "あくまで目安。適当実装＆データの正確性が低いので参考までに。",
      remark2: "灰色の背景は掛かり区間、淡紫色の背景はコーナー。",
      remark3: "データが安定するまではいつでもロードデータが使えなくなる可能性があります。その都度作り直して下さい。安定したらこんなことはなくなります。多分安定しました。",
      remark4: "ポジションキープを始めとした他ウマ娘が絡む要素は未実装。",
      remark5: "それが条件になるスキルは適当にそれっぽく実装してます。",
      remark6: "喰らう妨害スキルは一律発動率80％としています。",
      remark7: "適性は直接ステータスを修正するものではないので、下の補正後ステータスには反映されません。",
      remark8: "作った人：砂井裏鍵。各種別情報は大いに参考させて頂きました。",

      contact: "推特在↑這↓",
      emulating: "エミュレート中、少々お待ち下さい……",
		}
	}
}







// 取得預設語系
const locale = localStorage.getItem('locale') || 'jp'

const i18n = new VueI18n({
  locale,
  messages,
})

export default i18n