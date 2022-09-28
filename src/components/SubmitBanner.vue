<template>
    <div
        class="submit-banner-view"
        :class="{closed : closed}"
    >
        <div
            class="banner-message"
            v-if="selectedTime && selectedDate"
        >
            <h2 v-text="'Appointment Details'"></h2>
            <hr>
            <p>Your appoinment is on <strong v-text="selectedDate.availability.label"></strong>
                at <strong v-text="timeFormat"></strong>
            </p>
            <button
                @click="close"
                v-text="'Done'"
            ></button>
        </div>
    </div>
</template>

<script>
import convertTime from "convert-time";

export default {
    props: {
        selectedDate: Object,
        selectedTime: Object,
    },
    data() {
        return {
            closed: true,
        }
    },
    methods: {
        close() {
            this.closed = true;
        }
    },
    computed: {
        timeFormat() {
            const time = new Date(+this.selectedTime.from_unix * 1000);
            return convertTime(`${time.getHours()}:${time.getMinutes()}`);
        }
    },

}
</script>

<style scoped>
.submit-banner-view {
    position: absolute;
    z-index: 10;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.301);
    backdrop-filter: blur(3px);
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit-banner-view.closed {
    display: none;
}

.banner-message {
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    text-align: center;

}
</style>