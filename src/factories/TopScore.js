/**
 * @typedef {import("./Die").Die} Die
 * @typedef {import("vue").Ref} Ref
 * @typedef {import("../../types").Dice} Dice
 */

import {computed, ref} from 'vue';
import {MAX_DICE_SIDE, TOP_BONUS_MINIMUM, TOP_BONUS} from '../constants';

/**
 *
 * @param {Dice} thrownDice
 * @param {number} dieSide
 */
const partialScoreFactory = (thrownDice, dieSide) => {
    const setScore = ref(-1);

    const select = ref(false);
    const selected = ref(false);

    return {
        get score() {
            if (setScore.value != -1) return setScore;
            return computed(() =>
                thrownDice.value.reduce((acc, die) => {
                    if (die.dieSide == dieSide) acc += dieSide;
                    return acc;
                }, 0)
            );
        },

        get select() {
            return select;
        },

        get selected() {
            return selected;
        },

        setSelected() {
            setScore.value = thrownDice.value.reduce((acc, die) => {
                if (die.dieSide == dieSide) acc += dieSide;
                return acc;
            }, 0);
            selected.value = true;
        },

        toggleSelect() {
            select.value = !select.value;
        },
    };
};

/**
 * @param {Dice} thrownDice
 */
export default thrownDice => {
    const top = {
        get total() {
            let total = 0;
            for (let dieSide = 1; dieSide <= MAX_DICE_SIDE; dieSide++) total += top[dieSide].score.value;
            return total;
        },
        get bonus() {
            return top.total >= TOP_BONUS_MINIMUM ? TOP_BONUS : 0;
        },

        get totalWithBonus() {
            return top.total + top.bonus;
        },

        /**
         * @param {?number} side
         */
        toggleSelect(side) {
            if (top[side] && top[side].selected.value) return;

            for (let dieSide = 1; dieSide <= MAX_DICE_SIDE; dieSide++) {
                if (top[dieSide].select.value) top[dieSide].toggleSelect();
            }

            if (top[side]) top[side].toggleSelect();
        },

        setSelected() {
            for (let dieSide = 1; dieSide <= MAX_DICE_SIDE; dieSide++) {
                if (top[dieSide].select.value) {
                    top[dieSide].setSelected();
                    top[dieSide].toggleSelect();
                    return true;
                }
            }
        },
    };

    for (let dieSide = 1; dieSide <= MAX_DICE_SIDE; dieSide++) top[dieSide] = partialScoreFactory(thrownDice, dieSide);

    return top;
};
