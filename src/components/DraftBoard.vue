<template>
<div>
    <div class="hidden-xs">
        <div class="col-sm-6">
            <Summary id="draftSummary1" :team="teams[0]" :timerInput="{}"></Summary>
        </div>
        <div class="col-sm-6">
            <Summary id="draftSummary2" :team="teams[1]" :timerInput="{}"></Summary>
        </div>
    </div>
        <div class="hidden-sm hidden-md hidden-lg">
            <button class="btn btn-default col-xs-12">Lager Team</button>
            <button class="btn btn-default col-xs-12">Porter Team</button>  
        </div>
    </div>
</template>


<script>
var STORAGE_KEY = "fs-beer-draft-2017";
var draftStorage = {
  fetch: function() {
    var drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    draftStorage.uid = drafts.length;
    return drafts;
  },
  save: function(drafts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }
};

import Summary from "./Summary.vue";

export default {
  name: "DraftBoard",
  data() {
    return {
      teams: draftStorage.fetch()
    };
  },
  components: {
    Summary
  },
  methods: {}
};
</script>