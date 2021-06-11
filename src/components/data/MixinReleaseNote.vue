<script>
export default {
  name: "MixinReleaseNote",
  data: function () {
    return {
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
          content: '色々とスキルバグを修正、ランダム発動スキルの発動地点を10m間隔に変更、直線ランダムスキルを修正、コーナーを表記するようになった',
          timestamp: '2021-06-12'
        },
      ]
    }
  }
}
</script>
