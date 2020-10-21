<template>
    <div class="fiveDice">
        <component v-for="(die, index) in thrownDice" :key="index" :is="die.getComponent()" />
    </div>
</template>

<script>
import {thrownDice} from '../game';

export default {
    setup() {
        return {thrownDice};
    },
};
</script>
