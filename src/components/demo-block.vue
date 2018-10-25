<script>
import ParticleEffectButton from './particle-effect-button'

export default {
  components: {
    ParticleEffectButton,
  },
  props: {
    background: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    buttonStyles: {
      type: Object,
      default: null,
    },
    buttonOptions: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      hidden: false,
      animating: false,
    }
  },
  computed: {
    blockStyles() {
      return {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '46vmax',
        height: '46vmax',
        margin: '2vmax 2vmax 0 0',
        background: this.background,
      }
    },
    resetButtonStyles() {
      return {
        position: 'absolute',
        top: '1em',
        right: '1em',
        background: '#32bafa',
        color: '#fff',
        border: '0',
        borderRadius: '4px',
        fontSize: '1em',
        padding: '0.7em 1.2em',
        cursor: 'pointer',
        outline: 'none',
      }
    },
  },
  methods: {
    onResetClick() {
      this.$refs.demoButtonRef.onToggle()
    },
  },
}
</script>

<template>
  <div :style="blockStyles">
    <button
      v-if="hidden && !animating"
      :style="resetButtonStyles"
      @click="onResetClick"
    >Reset</button>
    <ParticleEffectButton
      ref="demoButtonRef"
      :text="text"
      :hidden.sync="hidden"
      :animating.sync="animating"
      :button-styles="buttonStyles"
      :button-options="buttonOptions"
    />
  </div>
</template>
