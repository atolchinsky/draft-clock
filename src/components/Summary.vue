<template>
    <div class="col-sm-10 col-xs-offset-1">
        <div name="draftBoard" id="draftBoard">
            <form class="form-horizontal text-center">
                <div id="container" class="jumbotron">
                    <legend>
                        <h1 id="draftName">{{team.name}}</h1>
                    </legend>

                    <div id="clockPanel" class="panel panel-warning">
                        <div id="clockHeader" class="panel-heading">
                            <h2 class="panel-title xxlFont">On The Clock</h2>
                        </div>
                        <div class="panel-body">
                            <h1 id="draftTeam">{{current.team.name}}</h1>
                            <h3 id="onDeckTeam">On Deck: {{current.onDeck}}</h3>
                        </div>
                        <div class="panel-footer">
                            <h2 id="draftTimer">{{draftTimer}}</h2>

                        </div>
                    </div>
                    <button @click="nextRound()" type="button" id="draftNext" class="btn btn-primary btn-lg btn-block xxlFont">Cheers!</button>

                    <div class="col-xs-12">
                        <h2 class="text-large">
                            <span id="selectionRound">Round {{current.round}} </span>
                            <span id="selectionRoundOf">of {{current.rounds}}</span>
                        </h2>
                        <h3 class="text-large">
                            <span id="draftRound">Selection {{current.selection}} </span>
                            <span id="draftRoundOf">of {{current.teams.length}}</span>
                        </h3>

                        <label id="draftPercent">{{current.percent.toFixed(1)}}% Complete</label>
                        <!-- <progress value="current.percent.toFixed(1)" max=100>{{current.percent.toFixed(1)}}%</progress> -->

                    </div>
                    <div class="clearfix" />
                </div>
            </form>

        </div>
    </div>
</template>


<script>
import io from 'socket.io-client'
const socket = io('http://localhost:3002')

socket.on('next round started', function(data) {})

//var start = new Date() // when each plasyer started his/her turn
var totalStart // when the overall draft started


const minutes = 60 // seconds per minute
const hours = 60 * 60 // seconds per hour
const days = 60 * 60 * 24 // seconds per day

var populateDraft = function(rounds, teams) {
    console.log('populateDraft(' + rounds + ', ' + teams.length + ')')
    var draft = []
    var total = rounds * teams.length
    var count = 0

    for (var r = 1; r <= rounds; r += 1) {
        var start
        var end
        var incr
        var s = 1 //selection

        // odd rounds (1, 3, 5, ...) count up from 1 ... N
        if (r % 2 == 1) {
            start = 1
            end = function(v) {
                return v <= teams.length
            }
            incr = 1
            // even rounds (2, 4, 6, ...) count down from N ... 1
        } else {
            start = teams.length
            end = function(v) {
                return v >= 1
            }
            incr = -1
        }

        for (var t = start; end(t); t += incr) {
            count += 1
            var percent = count / total * 100
            draft.push({
                round: r,
                rounds: rounds,
                selection: s,
                team: teams[t - 1],
                teams: teams,
                percent: percent
            })
            s += 1
        }
    }
    return draft
}

var formatSeconds = function(s) {
    var d = Math.floor(s / days)
    s -= d * days
    var h = Math.floor(s / hours)
    s -= h * hours
    var m = Math.floor(s / minutes)
    s -= m * minutes

    var str = ''
    if (d > 0) {
        str += d + '.'
    }
    if (h > 0) {
        str += h + ':'
    }
    if (m < 10) {
        str += '0' + m + ':'
    } else {
        str += m + ':'
    }
    if (s < 10) {
        str += '0' + s
    } else {
        str += s
    }

    return str
}

export default {
    name: 'Summary',
    props: {
        team: {
            type: Object,
            default: {}
        },
        timerInput: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            draft: {},
            current: {},
            draftTimer: '00:00',
            timer: { ...this.timerInput },
            start: new Date(),
            interval: {}
        }
    },
    mounted: function() {
        this.$socket.emit('next round', this.team)
    },
    sockets: {
        nextRound: function(data) {
            if (
                data.current.teamName &&
                data.current.teamName === this.team.name
            ) {
                clearInterval(this.interval)
                console.log(data)
                console.log(this.interval)

                this.current = data.current
                this.start = new Date();
                this.interval = setInterval(this.tick, 1000)

            }
        }
    },
    methods: {
        nextRound() {
            this.$socket.emit('next round', this.team)
        },
        tick() {
            var s = Math.floor((new Date() - this.start) / 1000)
            var str = formatSeconds(s)
            this.draftTimer = str

            //this.current.timer = setTimeout(this.tick, 1000)
        }
    }
}
</script>
