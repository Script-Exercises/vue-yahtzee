<template>
    <div class="button">
        <button @click="throwDice" class="btn onHover">Gooien</button>
        <button @click="setSelected" class="btn onHover">Vul score in</button>
    </div>
</template>

<script>
import {throwDice, setSelected} from '../game';

export default {
    setup() {
        return {throwDice, setSelected};
    },
};
</script>
