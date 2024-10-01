<script>
export default {
  data() {
    return {
      kuaWeightsOutputLine1: "",
      kuaWeightsOutputLine2: "",
      kuaWeightsOutputLine3: "",
    };
  },
  methods: {
    generateKuaWeights() {
      // Use expected value
      const originalValue = this.skillActivateAdjustment;
      this.$refs.executeBlock.skillActivateAdjustment = "expected";

      const baseTime = this.executeOnce();

      const baseSkill = this.skills.find(
        (skill) =>
          skill.name === this.kua.baseSkillName ||
          this.$t(skill.name) === this.kua.baseSkillName
      );
      if (baseSkill === undefined) {
        this.$message.error("Base skill not found");
        return;
      }
      this.hasSkills[baseSkill.type][baseSkill.rarity].push(baseSkill.id);
      const skillTime = this.executeOnce();
      this.updateChart();
      this.hasSkills[baseSkill.type][baseSkill.rarity].pop();

      const ptBase =
        (Math.abs(baseTime - skillTime) * 50) / +this.kua.baseSkillPt;
      const timeDiff = { "-1": {}, 1: {} };
      for (const status of ["speed", "stamina", "power", "guts", "wisdom"]) {
        for (const direction of ["-1", "1"]) {
          // Set the status weight
          const originalStatus = +this.umaStatus[status];
          const refRealValue =
            this.calcExceedStatus(originalStatus) + +direction * 50;
          this.umaStatus[status] =
            refRealValue > 1200
              ? 1200 + (refRealValue - 1200) * 2
              : refRealValue;
          const time = this.executeOnce();
          timeDiff[direction][status] = Math.abs(time - baseTime) / ptBase;
          this.umaStatus[status] = originalStatus;
        }
      }

      this.kuaWeightsOutputLine1 = `  "TargetStatus": [ ${this.umaStatus.speed}, ${this.umaStatus.stamina}, ${this.umaStatus.power}, ${this.umaStatus.guts}, ${this.umaStatus.wisdom}, 9999 ],\n`;

      this.kuaWeightsOutputLine2 = `  "BelowTargetStatusScore": [ ${timeDiff[
        "-1"
      ].speed.toFixed(4)}, ${timeDiff["-1"].stamina.toFixed(4)}, ${timeDiff[
        "-1"
      ].power.toFixed(4)}, ${timeDiff["-1"].guts.toFixed(4)}, ${timeDiff[
        "-1"
      ].wisdom.toFixed(4)}, 1 ],\n`;

      this.kuaWeightsOutputLine3 = `  "OverTargetStatusScore": [ ${timeDiff[
        "1"
      ].speed.toFixed(4)}, ${timeDiff["1"].stamina.toFixed(4)}, ${timeDiff[
        "1"
      ].power.toFixed(4)}, ${timeDiff["1"].guts.toFixed(4)}, ${timeDiff[
        "1"
      ].wisdom.toFixed(4)}, 1 ]\n`;

      this.$refs.executeBlock.skillActivateAdjustment = originalValue;
      this.kua.showKuaWeights = true;
    },
    executeOnce() {
      this.emulations = [];
      this.start();
      return this.emulations[0].raceTime;
    },
    copyKuaWeights() {
      const text = `${this.kuaWeightsOutputLine1}${this.kuaWeightsOutputLine2}${this.kuaWeightsOutputLine3}`;
      navigator.clipboard.writeText(text).then(
        () => {
          this.$message.success("Copied to clipboard");
        },
        () => {
          this.$message.error("Failed to copy to clipboard");
        }
      );
    },
  },
};
</script>
