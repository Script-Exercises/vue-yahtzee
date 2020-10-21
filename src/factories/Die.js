/**
 * @typedef {import('vue').VNode} VNode
 *
 * @typedef {Object} Die
 * @property {number} dieSide
 * @property {boolean} keep
 * @property {string} face
 * @property {()=>void} toggleKeep
 * @property {VNode} component
 */

import {h, ref} from 'vue';

/**
 * @param {number} dieSide the side of the die
 *
 * @returns {Die}
 */
export default dieSide => {
    const keep = ref(false);

    const face = `&#x268${dieSide - 1};`;

    const toggleKeep = () => (keep.value = !keep.value);

    return {
        get dieSide() {
            return dieSide;
        },
        get keep() {
            return keep.value;
        },
        // Must be a function, doesn't work with a get
        getComponent() {
            let classes = 'dice onTextHover';
            if (keep.value) classes += ' keep';

            return {
                name: 'Die',
                render() {
                    return h('button', {class: classes, onClick: toggleKeep, innerHTML: face});
                },
            };
        },
    };
};
