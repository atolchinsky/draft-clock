<template>
  <div class="hello">
 <h2></h2>
    <div class="padding-5">
        <div id="setup" class="col-sm-12 well">

                <fieldset>
                    <legend>Welcome to the FS Beer Draft!</legend>
                    <div class="form-group col-sm-12">
                        <label for="rounds" class="control-label col-sm-3">Draft Name:</label>
                        <div class=" col-sm-9">
                            <input type="text" class="form-control input-lg" id="name" name="name" value="3rd Annual FS Beer Draft" />
                        </div>
                    </div>

                    <div class="form-group col-sm-12">
                        <label for="rounds" class="control-label col-sm-3">Number of Rounds</label>
                        <div class=" col-sm-9">
                            <input type="number" id="rounds" name="rounds" class="form-control input-lg" value="24" min="1" max="100" required="required"
                            />

                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group col-sm-6" v-for="team in teams">
                            <h3 for="teamone" class="col-sm-12"> {{team.name}}</h3>
                            <div class="col-sm-12" >
                                <input type="text" placeholder="Name" @keyup.enter="AddToTeam(team)"  v-model="team.currentPlayer.name" class="form-control input-lg" />
                                <input type="button" class="col-sm-12 btn btn-default" value="Add"
                                @click="AddToTeam(team)"
                                />
                            </div>
                            <!-- <div class="col-sm-12" v-for="player in team.players">
                                {{ player.name }}
                            </div> -->
                            <grid class="col-sm-6"
                                :draggable="true"
                                :sortable="true"
                                :items="team.players"
                                :cellWidth="100"
                                :cellHeight="80"
                                :windowWidth="330"
                                @remove="(event) => SyncPlayerList(event, team)">
                                  <template slot="cell" slot-scope="props" :window-width="330">
                                      <div class="col-sm-4">
                                        <Icon :color="props.item.color"
                                            :index="props.index"
                                            :with-button="true"
                                            :text="props.item.name"
                                            @remove="RemovePlayer(props, team.players)"/>
                                            </div>
                                    </template>
                            </grid>
                        </div>
                    </div>

                    <div class="col-xs-12">
                        <button @click="StartDraft()" type="button" id="startDraft" name="start" class="btn btn-success btn-lg btn-block xxlFont">Beer me!</button>
                    </div>
                </fieldset>
        </div>
    </div>

  </div>
</template>

<script>
import Grid from 'vue-js-grid';
import Router from 'vue-router';

import { generateRGBColors } from "../util";
import Icon from "./Icon.vue";

var STORAGE_KEY = "fs-beer-draft-2017";
var draftStorage = {
  fetch: function() {
    var drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (drafts.length <= 0) {
      drafts =
      [
        {
          name: "Team Lager",
          currentPlayer: {},
          players: [],
          color: {}
        },
        {
          name: "Team Porter",
          currentPlayer: {},
          players: [],
          color: {}
        }
      ];
    }

    draftStorage.uid = drafts.length;
    return drafts;
  },
  save: function(drafts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }
};

export default {
  name: "DraftStart",
  data() {
    let colors = generateRGBColors(2);

    return {
      drafts: draftStorage.fetch(),
      teams: draftStorage.fetch(),
      colors
    };
  },
  methods: {
    AddToTeam(team) {
      team.currentPlayer.color = generateRGBColors(1)[0];
      team.players.push(team.currentPlayer);

      team.currentPlayer = {};
    },
    RemovePlayer(player, team) {
      player.remove()
    },
    SyncPlayerList(event, team) {
      team.players = event.items.map((players) => players.item)
    },
    SaveDraft() {
      draftStorage.save([...this.teams]);
    },
    StartDraft() {
        draftStorage.save([...this.teams]);
        this.$router.push('/DraftBoard')
    }
  },
  components: {
    Icon
  },
  mounted: () => {
    this.teams = draftStorage.fetch()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#draftBoard {
  display: none;
}
#container {
  position: relative;
}
.centered {
  width: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
}
.xxlFont {
  font-size: xx-large;
}
</style>
