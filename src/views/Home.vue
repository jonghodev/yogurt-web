<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {
  created() {
    this.$router.push('/schedule');
  }
}
</script>
