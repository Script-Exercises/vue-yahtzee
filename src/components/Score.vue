<template>
    <div class="paper">
        <table>
            <tr>
                <td class="noBorder" />
            </tr>
            <tr>
                <th class="title noBorder" colspan="7">scoreblok</th>
                <th class="title noBorder"><img class="posImg" src="../assets/dice.png" /></th>
            </tr>
            <tr>
                <td class="noBorder" />
            </tr>
            <tr>
                <th class="h1 noBorder" colspan="2">deel 1</th>
                <th class="h1 noBorder">hoe te scoren</th>

                <th class="h2 noBorder" v-for="gameNr in currentGame" :key="gameNr">Spel {{ gameNr }}</th>
            </tr>
            <tr v-for="side in MAX_DICE_SIDE" :key="side">
                <td class="noBorderRight">{{ translation[side] }}</td>
                <td class="dicePreview noBorderLeft" v-html="dieFace(side)" />
                <td class="howToScore">waarde van alle {{ translation[side] }}</td>
                <td
                    class="fillFont"
                    :class="{
                        select: currentTopScore[side].select.value,
                        selected: currentTopScore[side].selected.value,
                    }"
                    @click="toggleSelect(side)"
                >
                    {{ currentTopScore[side].score.value }}
                </td>
            </tr>
            <tr id="total">
                <td class="uppercase" colspan="2">totaal</td>
                <td class="arrow">&#10132;</td>
                <td id="upperScore1" class="fillFont">{{ currentTopScore.total }}</td>
            </tr>
            <tr id="bonus">
                <td class="noBorderRight">bonus</td>
                <td class="alt noBorderLeft">
                    als totaal 63
                    <br />
                    of meer is
                </td>
                <td class="howToScore">35 punten</td>
                <td id="bonus1" class="fillFont">{{ currentTopScore.bonus }}</td>
            </tr>
            <tr id="upperTotal">
                <td class="uppercase noBorderRight">totaal</td>
                <td class="alt uppercase noBorderLeft">
                    van de
                    <br />
                    bovenste
                    <br />
                    helft
                </td>
                <td class="arrow">&#10132;</td>
                <td id="totalUpperScore1" class="fillFont">{{ currentTopScore.totalWithBonus }}</td>
            </tr>
            <tr>
                <th class="h1 noBorder" colspan="2">deel 2</th>
            </tr>

            <tr>
                <td colspan="2">3 of a kind</td>
                <td class="howToScore">totaal van alle dobbelstenen</td>
                <td id="threeOfKind1" class="fillFont keepScore"></td>
                <td id="threeOfKind2" class="fillFont keepScore"></td>
                <td id="threeOfKind3" class="fillFont keepScore"></td>
                <td id="threeOfKind4" class="fillFont keepScore"></td>
                <td id="threeOfKind5" class="fillFont keepScore"></td>
            </tr>
            <tr>
                <td colspan="2">4 of a kind</td>
                <td class="howToScore">totaal van alle dobbelstenen</td>
                <td id="fourOfKind1" class="fillFont keepScore"></td>
                <td id="fourOfKind2" class="fillFont keepScore"></td>
                <td id="fourOfKind3" class="fillFont keepScore"></td>
                <td id="fourOfKind4" class="fillFont keepScore"></td>
                <td id="fourOfKind5" class="fillFont keepScore"></td>
            </tr>
            <tr>
                <td colspan="2">full house</td>
                <td class="howToScore">25 punten</td>
                <td id="fullHouse1" class="fillFont keepScore"></td>
                <td id="fullHouse2" class="fillFont keepScore"></td>
                <td id="fullHouse3" class="fillFont keepScore"></td>
                <td id="fullHouse4" class="fillFont keepScore"></td>
                <td id="fullHouse5" class="fillFont keepScore"></td>
            </tr>
            <tr>
                <td class="noBorderRight">kleine straat</td>
                <td class="alt noBorderLeft">
                    4
                    <br />
                    opeenvolgende nummers
                </td>
                <td class="howToScore">30 punten</td>
                <td id="smStraight1" class="fillFont keepScore"></td>
                <td id="smStraight2" class="fillFont keepScore"></td>
                <td id="smStraight3" class="fillFont keepScore"></td>
                <td id="smStraight4" class="fillFont keepScore"></td>
                <td id="smStraight5" class="fillFont keepScore"></td>
            </tr>
            <tr>
                <td class="noBorderRight">grote straat</td>
                <td class="alt noBorderLeft">
                    5
                    <br />
                    opeenvolgende nummers
                </td>
                <td class="howToScore">40 punten</td>
                <td id="lgStraight1" class="fillFont keepScore"></td>
                <td id="lgStraight2" class="fillFont keepScore"></td>
                <td id="lgStraight3" class="fillFont keepScore"></td>
                <td id="lgStraight4" class="fillFont keepScore"></td>
                <td id="lgStraight5" class="fillFont keepScore"></td>
            </tr>
            <tr>
                <td class="noBorderRight">yahtzee</td>
                <td class="alt noBorderLeft">
                    5
                    <br />
                    dezelfde
                    <br />
                    nummers
                </td>
                <td class="howToScore">50 punten</td>
                <td id="yahtzee1" class="fillFont keepScore"></td>
                <td id="yahtzee2" class="fillFont keepScore"></td>
                <td id="yahtzee3" class="fillFont keepScore"></td>
                <td id="yahtzee4" class="fillFont keepScore"></td>
                <td id="yahtzee5" class="fillFont keepScore"></td>
            </tr>
            <tr id="chance">
                <td colspan="2">chance</td>
                <td class="howToScore">totaal van alle dobbelstenen</td>
                <td id="chance1" class="fillFont keepScore"></td>
                <td id="chance2" class="fillFont keepScore"></td>
                <td id="chance3" class="fillFont keepScore"></td>
                <td id="chance4" class="fillFont keepScore"></td>
                <td id="chance5" class="fillFont keepScore"></td>
            </tr>
            <tr id="lowerTotal">
                <td class="uppercase noBorderRight">totaal</td>
                <td class="alt uppercase noBorderLeft">
                    van de
                    <br />
                    onderste
                    <br />
                    helft
                </td>
                <td class="arrow">&#10132;</td>
                <td id="lowerScore1" class="fillFont"></td>
                <td id="lowerScore2" class="fillFont"></td>
                <td id="lowerScore3" class="fillFont"></td>
                <td id="lowerScore4" class="fillFont"></td>
                <td id="lowerScore5" class="fillFont"></td>
            </tr>
            <tr id="lowUpperTotal">
                <td class="uppercase noBorderRight">totaal</td>
                <td class="alt uppercase noBorderLeft">
                    van de
                    <br />
                    bovenste
                    <br />
                    helft
                </td>
                <td class="arrow">&#10132;</td>
                <td id="upperScoreLower1" class="fillFont"></td>
                <td id="upperScoreLower2" class="fillFont"></td>
                <td id="upperScoreLower3" class="fillFont"></td>
                <td id="upperScoreLower4" class="fillFont"></td>
                <td id="upperScoreLower5" class="fillFont"></td>
            </tr>
            <tr id="grandTotal">
                <td class="bold" colspan="2">totaal generaal</td>
                <td class="arrow">&#10132;</td>
                <td id="grandTotal1" class="fillFont"></td>
                <td id="grandTotal2" class="fillFont"></td>
                <td id="grandTotal3" class="fillFont"></td>
                <td id="grandTotal4" class="fillFont"></td>
                <td id="grandTotal5" class="fillFont"></td>
            </tr>
        </table>
    </div>
</template>

<script>
import {MAX_DICE_SIDE} from '../constants';
import {currentGame, currentTopScore, toggleSelect} from '../game';

const translation = {
    1: 'enen',
    2: 'tweeën',
    3: 'drieën',
    4: 'vieren',
    5: 'vijven',
    6: 'zessen',
};

export default {
    setup() {
        const dieFace = side => '&#x268' + (side - 1).toString() + ';';

        return {currentGame, currentTopScore, translation, MAX_DICE_SIDE, dieFace, toggleSelect};
    },
};
</script>
