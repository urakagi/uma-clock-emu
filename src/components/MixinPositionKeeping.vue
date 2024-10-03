<script>
import { FRAME_PER_SECOND, STYLE } from "@/components/data/constants";

export default {
  name: "MixinPositionKeeping",
  data() {
    return {
      positionKeeping: {
        mode: "normal",
        lastCheckFrame: 0,
        enterAbnormalModePosition: 0,
        needCoolDown: false,
      },
    };
  },
  mounted() {},
  computed: {
    positionKeepingSelection() {
      return this.$refs.executeBlock.positionKeeping;
    },
    sectionLength() {
      return Math.round(this.courseLength / 24);
    },
    modeMaxLength() {
      if (this.runningStyle === STYLE.OONIGE) {
        return this.sectionLength * 3;
      } else {
        return this.sectionLength;
      }
    },
    runnerSuccessRate() {
      return 0.2 * Math.log10(this.modifiedWisdom * 0.1);
    },
  },
  methods: {
    resetPositionKeeping() {
      this.positionKeeping.mode = "normal";
      this.positionKeeping.lastCheckFrame = 0;
      this.positionKeeping.enterAbnormalModePosition = 0;
      this.positionKeeping.needCoolDown = false;
    },
    progressPositionKeeping() {
      if (this.fixRandom) {
        return 1;
      }
      if (this.currentSection >= 10) {
        return 1;
      }
      switch (this.positionKeepingSelection) {
        case "1.04":
          return this.progressRunnerSimple();
        case "none":
        default:
          return 1;
      }
    },
    progressRunnerSimple() {
      if (
        this.runningStyle != STYLE.OONIGE &&
        this.runningStyle != STYLE.NIGE
      ) {
        return 1;
      }
      if (this.useExpectedValue) {
        const sectionTime =
          this.sectionLength / (this.currentPhase === 0 ? this.v0 : this.v1);
        if (this.runningStyle === STYLE.NIGE) {
          const et = 2 / this.runnerSuccessRate + sectionTime + 1;
          return 1 + (0.04 * (3 + sectionTime)) / et;
        } else {
          // OONIGE
          const et = 2 / this.runnerSuccessRate + sectionTime * 3 + 1;
          return 1 + (0.04 * (3 + sectionTime * 3)) / et;
        }
      }

      this.decideMode();

      if (this.positionKeeping.mode === "normal") {
        return 1;
      } else {
        return 1.04;
      }
    },
    decideMode() {
      if (this.positionKeeping.mode === "normal") {
        // Check in each 2 seconds
        if (
          this.frameElapsed - this.positionKeeping.lastCheckFrame <
          (2 + this.positionKeeping.needCoolDown ? 1 : 0) * FRAME_PER_SECOND
        ) {
          return;
        }

        this.positionKeeping.lastCheckFrame = this.frameElapsed;
        this.positionKeeping.needCoolDown = false;
        if (Math.random() < this.runnerSuccessRate) {
          this.positionKeeping.mode = "speedUp";
          this.positionKeeping.enterAbnormalModePosition = this.position;
        }
      } else {
        if (
          this.position - this.positionKeeping.enterAbnormalModePosition >=
          this.modeMaxLength
        ) {
          this.positionKeeping.mode = "normal";
          this.positionKeeping.lastCheckFrame = this.frameElapsed;
          this.positionKeeping.needCoolDown = true;
        }
      }
    },
  },
};
</script>
