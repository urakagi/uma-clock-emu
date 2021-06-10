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
      ]
    }
  }
}
</script>
