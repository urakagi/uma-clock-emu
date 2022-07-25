<template>
  <div>
    <h3>最終更新：{{ releases[releases.length - 1].timestamp }}</h3>
    <el-collapse v-model="releaseNote">
      <el-collapse-item title="更新履歴">
        <el-timeline :reverse="true">
          <el-timeline-item
              v-for="(release, index) in releases"
              :key="index"
              :timestamp="release.timestamp">
            <div v-html="release.content"></div>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "ReleaseNote",
  data: function () {
    return {
      releaseNote: '',
      releases: [
        {
          content: 'αリリース',
          timestamp: '2021-06-07'
        },
        {
          content: 'コースデータを補完、ゲームデータ上の坂判定を適用、掛かりと出遅れ実装（ついでにブルボンの固有発動条件も）、コースのステータスチェック実装',
          timestamp: '2021-06-09'
        },
        {
          content: 'セイウンスカイの固有更新、固有スキルを独立化してレベル設定できるようにして補完、緑とゲートスキル実装',
          timestamp: '2021-06-10'
        },
        {
          content: 'パッシブスキルが確定発動じゃないバグを修正',
          timestamp: '2021-06-11'
        },
        {
          content: '色々とスキルバグを修正、どこか発動スキルの10m余裕を修正、直線ランダムスキルを修正、コーナーを表記するようになった。緑スキルのバグを修正した。',
          timestamp: '2021-06-12'
        },
        {
          content: '坂の影響が正しくなかったバグを修正',
          timestamp: '2021-06-13'
        },
        {
          content: '賢さによるランダム速度の式を修正',
          timestamp: '2021-06-17'
        },
        {
          content: '直線コースがバグったのを修正',
          timestamp: '2021-06-19'
        },
        {
          content: '競技場エミュレーターを追加。季節や天候の比例は見かけたものと自前のデータを参考にしてふわっと定めました。各々の確率は緑スキルに記載。<br>新潟1000mがバグる問題修正',
          timestamp: '2021-06-20'
        },
        {
          content: 'コース毎の最小及び最大タイムを表記、他色々細かいバグ修正',
          timestamp: '2021-06-24'
        },
        {
          content: '坂バグの修正に対応。中山や阪神などは仕様ということらしい。',
          timestamp: '2021-07-09'
        },
        {
          content: '多言語化。セーブ時、レース結果もセーブ＆ロードするようになった。',
          timestamp: '2021-07-14'
        },
        {
          content: 'スキル発動率補正オプションを追加。英語を追加。ウマ娘をエクスポート／インポートできるようになった。',
          timestamp: '2021-07-16'
        },
        {
          content: '新潟1000m直線で最終直線系のスキルは発動しないのを確認したので修正。水着2人の固有を追加。',
          timestamp: '2021-07-30'
        },
        {
          content: '減速スキルの仕様を修正。',
          timestamp: '2021-08-08'
        },
        {
          content: 'スタミナ切れの時の速度とステータスチェック計算式を修正。',
          timestamp: '2021-08-11'
        },
        {
          content: '謎区間の存在が確認されたので、直線スキルの発動を修正＆直線区間を表記するように。',
          timestamp: '2021-08-30'
        },
        {
          content: 'アオハルスキルを追加。',
          timestamp: '2021-09-07'
        },
        {
          content: '一回ボタンを追加。コース確認に便利。',
          timestamp: '2021-09-28'
        },
        {
          content: '坂データ更新＆根性のスパート速度増加を実装',
          timestamp: '2022-02-25'
        },
        {
          content: 'スキル新データの下準備',
          timestamp: '2022-02-28'
        },
        {
          content: 'スキルを新データに更新',
          timestamp: '2022-03-05'
        },
        {
          content: 'グラフの可視性を向上',
          timestamp: '2022-07-25'
        },
      ]
    }
  }
}
</script>
