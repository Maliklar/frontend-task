<template>
    <div
        class="time-item"
        :class="{active: active, disabled: disabled}"
        @click="!disabled ? activate() : null"
        v-text="timeFormat"
    >

    </div>
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
            return convertTime(new Date(+this.time.from_unix * 1000).getHours() + ":00");
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
}

.time-item.active {
    background-color: #4894FE;
    border-radius: 9px;
    color: white;
}
</style>