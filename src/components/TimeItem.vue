<template>
    <div
        class="time-item"
        :class="{active: active, disabled: disabled}"
        @click="!disabled ? activate() : null"
        v-text="timeFormat"
    ></div>
</template>

<script>
import convertTime from "convert-time";
export default {
    props: {
        time: Object,
        disabled: Boolean,
    },
    data() {
        return {
            active: false,
        }
    },
    computed: {
        timeFormat() {
            const time = new Date(+this.time.from_unix * 1000);
            return convertTime(`${time.getHours()}:${time.getMinutes()}`);
        }
    },
    methods: {
        activate() {
            this.$emit("timeClicked", this.time);
            this.active = true;
        },
        deactivate() {
            this.active = false;
        }
    }

}
</script>

<style scoped>
.time-item {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.161);
    border-radius: 10px;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.time-item.active {
    background-color: var(--primary);
    color: white;
    cursor: pointer;
}

.time-item.disabled {
    cursor: default;
    box-shadow: none;
}
</style>