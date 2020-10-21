<template>
    <header>
        <h1>Yahtzee</h1>
    </header>
    <Dice />
    <ActionButtons />
    <Rounds />
    <HowTo />
    <Score />
</template>

<script>
import Dice from './components/Dice.vue';
import ActionButtons from './components/ActionButtons.vue';
import Rounds from './components/Rounds.vue';
import HowTo from './components/HowTo.vue';
import Score from './components/Score.vue';

export default {
    name: 'Yahtzee',
    components: {Dice, ActionButtons, Rounds, HowTo, Score},
};
</script>
