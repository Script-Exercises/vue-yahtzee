<template>
    <div class="round">
        <p id="rounds">{{ round }}</p>
    </div>
</template>

<script>
import {computed} from 'vue';
import {round} from '../game';

export default {
    setup() {
        return {round};
    },
};
</script>
