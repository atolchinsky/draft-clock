<template>
<div class="col-xs-10 col-xs-offset-1">
        <div name="draftBoard" id="draftBoard">
            <form class="form-horizontal text-center">
                <div id="container" class="jumbotron">
                    <legend>
                        <h1 id="draftName"></h1>
                    </legend>

                    <div id="clockPanel" class="panel panel-warning">
                        <div id="clockHeader" class="panel-heading">
                            <h2 class="panel-title xxlFont">On The Clock</h2>
                        </div>
                        <div class="panel-body">
                            <h1 id="draftTeam"></h1>
                        </div>
                        <div class="panel-footer">
                            <h2 id="draftTimer">00:00</h2>

                        </div>
                    </div>
                    <button type="button" id="draftNext" class="btn btn-primary btn-lg btn-block xxlFont">Cheers!</button>

                    <div class="col-xs-12">
                        <h2 class="text-large">
                            <span id="selectionRound"></span>
                            <span id="selectionRoundOf"></span>
                        </h2>
                        <h3 class="text-large">
                            <span id="draftRound"></span>
                            <span id="draftRoundOf"></span>
                        </h3>

                        <label id="draftPercent"></label>


                    </div>
                    <div class="clearfix" />
                </div>
            </form>

        </div>
    </div> 
</template>


<script>
var STORAGE_KEY = "fs-beer-draft-2017";
var draftStorage = {
  fetch: function() {
    var drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    drafts.forEach(function(draft, index) {
      todo.id = index;
    });
    draftStorage.uid = drafts.length;
    return drafts;
  },
  save: function(drafts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }
};

export default {
  name: "DraftBoard",
  data() {
    return {
      draft: {}
    };
  },
  methods: {}
};
</script>