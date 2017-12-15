<template>
<div>
    <div class="hidden-xs">
        <div class="col-sm-6">
            <DraftSummary id="draftSummary1" :team="teams[0]" :timerInput="{}"></DraftSummary>
        </div>
        <div class="col-sm-6">
            <DraftSummary id="draftSummary2" :team="teams[1]" :timerInput="{}"></DraftSummary>
        </div>
    </div>
        <div v-if="!teamName" class="hidden-sm hidden-md hidden-lg">
            <h2>Select your team</h2>
            <hr>
            <button class="btn btn-default col-xs-12" @click="teamName = teams[0].name">{{teams[0].name}}</button>
            <hr>
            <button class="btn btn-default col-xs-12" @click="teamName = teams[1].name">{{teams[1].name}}</button>
        </div>
        <div v-if="teamName" class="hidden-sm hidden-md hidden-lg">
            <h2>{{teamName}}</h2>
            <hr>
            <button v-if="teamName === teams[0].name" @click="nextRound(teams[0])" type="button" id="draftNext" class="btn btn-primary btn-lg btn-block xxlFont">Cheers!</button>
            <button v-if="teamName === teams[1].name" @click="nextRound(teams[1])" type="button" id="draftNext" class="btn btn-primary btn-lg btn-block xxlFont">Cheers!</button>

        </div>

    </div>
</template>


<script>
var STORAGE_KEY = 'fs-beer-draft-2017'
var draftStorage = {
    fetch: function() {
        var drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

        draftStorage.uid = drafts.length
        return drafts
    },
    save: function(drafts) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
    }
}

import DraftSummary from './DraftSummary.vue'

export default {
    name: 'DraftBoard',
    data() {
        return {
            teams: draftStorage.fetch(),
            teamName: null
        }
    },
    components: {
        DraftSummary
    },
    methods: {
        nextRound(team) {
            this.$socket.emit("next round", team);
        }
    }
}
</script>
