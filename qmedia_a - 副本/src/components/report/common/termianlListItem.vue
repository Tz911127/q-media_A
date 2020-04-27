<template>
  <div v-loading="loading">
    <div class="list">
      <ol>
        <li v-for="(li) in lis" :key="li.index" :value="li.label">
          <span>{{li.name}}</span>
          <span
            style="float:right"
          >{{li.count?li.count:li.duration?($filters.formatSeconds(li.duration)):li.onlineDuration?$filters.formatSeconds((li.onlineDuration/1000).toFixed(0)):li.sum}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lis: Array,
    loading: Boolean
  }
};
</script>

<style scoped>
.list {
  margin: 10px 30px;
  font-size: 14px;
}
.list li {
  margin: 10px 0;
}
</style>