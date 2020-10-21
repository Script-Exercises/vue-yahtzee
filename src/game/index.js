/**
 * @typedef {import('vue').Ref} Ref
 * @typedef {import('../factories/Die').Die} Die
 *
 * @typedef {import('../../types').Dice} Dice
 */

import {computed, ref} from 'vue';
import {MAX_DICE, MAX_DICE_SIDE} from '../constants';
import DieFactory from '../factories/Die';
import TopScoreFactory from '../factories/TopScore';

/** @type {Dice} */
export const thrownDice = ref([]);

export const round = ref(0);
export const currentGame = ref(1);

const randomDie = () => Math.ceil(Math.random() * MAX_DICE_SIDE);

export const throwDice = () => {
    // TODO :: set message or something that you can't throw again
    if (round.value >= 3) return;

    for (let index = 0; index < MAX_DICE; index++) {
        const die = thrownDice.value[index];
        if (!die || !die.keep) thrownDice.value[index] = DieFactory(randomDie());
    }

    round.value++;
};

export const games = {1: {top: TopScoreFactory(thrownDice)}};
export const currentGameScore = computed(() => games[currentGame.value]);
export const currentTopScore = computed(() => currentGameScore.value.top);

/**
 * @param {number|string} scoreId
 */
export const toggleSelect = scoreId => {
    currentTopScore.value.toggleSelect(scoreId);
};

export const setSelected = () => {
    if (currentTopScore.value.setSelected()) {
        round.value = 0;
        thrownDice.value.length = 0;
        return;
    }
    alert('nothing selected!');
};

// TODO :: why doesn't this work? Vite?
// export default {getThrownDice, throwDice};
