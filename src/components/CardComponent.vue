<template>
    <div class="card-view">
        <h2 class="card-title">Schedule Appointment</h2>
        <div class="card-body">
            <div class="top">
                <strong>Fees</strong>
                <span>85$</span>
            </div>
            <div class="divider"></div>
            <div class="middle">
                <strong>Schedule</strong>
                <div class="middle-content">

                    <font-awesome-icon
                        icon="fa-solid fa-chevron-left"
                        class="cursor-pointer"
                        @click="previous"
                        :class="{disabled: previousDisabled}"
                    />

                    <div class="dates-picker">
                        <DateItem
                            ref="but"
                            v-for="schedule in currentItems"
                            :key="schedule"
                            :schedule="schedule"
                            @dateClicked="dateClicked"
                        />
                    </div>
                    <font-awesome-icon
                        @click="next"
                        icon="fa-solid fa-chevron-right"
                        class="cursor-pointer"
                        :class="{disabled: nextDisabled}"
                    />

                </div>
            </div>
            <div class="bottom">
                <strong>Choose time</strong>
                <div class="bottom-content">
                    <div class="time-picker">

                        <TimeItem
                            v-for="time in availableDates"
                            :key="time"
                            :time="time"
                            ref="timeRef"
                            @timeClicked="timeClicked"
                            :disabled="false"
                        />
                        <TimeItem
                            v-for="time in unavailableDates"
                            :key="time"
                            :time="time"
                            :disabled="true"
                        />
                    </div>
                </div>
            </div>

        </div>
        <button
            class="card-button"
            :class="{disabled: !buttonDisabled}"
        >Book Appointment</button>
    </div>
</template>

<script>
import DateItem from './DateItem.vue';
import TimeItem from "./TimeItem.vue";
export default {
    name: "card-component",
    async created() {
        await fetch("https://cura-front-end-test.herokuapp.com")
            .then(res => res.json())
            .then(data => JSON.parse(data))
            .then(data => this.schedule = data.schedule);
        this.currentItems = this.schedule.slice(0, 5);
    },

    methods: {
        dateClicked(availability) {
            this.selectedTime = null;

            this.$refs.but.forEach(b => b.deactivate());
            this.availableDates = [];
            this.unavailableDates = [];
            this.selectedDate = availability;

            availability.available.forEach(time => {
                this.availableDates.push(time);
            });

            availability.unavailable.forEach(time => {
                this.unavailableDates.push(time);
            });
        },

        timeClicked(selected) {
            this.$refs.timeRef.forEach(time => time.deactivate());
            this.selectedTime = selected;
            console.log(this.selectedTime, this.selectedDate);
        },

        next() {
            if (this.currentIndex + 5 >= this.schedule.length)
                return;

            this.currentIndex += 5;

            this.currentItems = this.schedule.slice(this.currentIndex, this.currentIndex + 5);
        },
        previous() {
            if (this.currentIndex - 5 < 0)
                return;
            this.currentItems = this.schedule.slice(this.currentIndex - 5, this.currentIndex);
            this.currentIndex -= 5;
        },
    },
    data() {
        return {
            schedule: [],
            currentItems: [],
            currentIndex: 0,
            unavailableDates: [],
            availableDates: [],
            timeActive: false,
            selectedTime: null,
            selectedDate: null,
        };
    },

    computed: {
        nextDisabled() {
            return this.currentIndex + 5 > this.schedule.length;
        },
        previousDisabled() {
            return this.currentIndex - 5 < 0;
        },
        buttonDisabled() {
            return this.selectedTime && this.selectedDate;
        }
    },
    components: { DateItem, TimeItem }
}
</script>

<style>
h2 {
    margin: 0px;
}

.card-title {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
}

.disabled {
    cursor: default;
    opacity: 0.5;
}

.time-picker {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(2, 36px);
    column-gap: 14px;
    column-gap: 10px;
}



.dates-picker {
    position: relative;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-grow: 1;
    gap: 11px;

}

.day {
    font-weight: 800;
    font-size: 14px;
    line-height: 17px;
}

.day-mon {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
}



.middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.middle>* {
    width: 100%;
}

.middle>:nth-child(1) {
    max-width: 90%;

}

.middle-content {
    display: flex;
    align-items: center;
    gap: 10px;

}

.card-view {
    width: 357px;
    display: flex;
    flex-direction: column;
    gap: 19px;
}

.card-button {
    background-color: #4894FE;
    color: white;
    border: none;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    padding: 17px;
    border-radius: 14px;
}

.card-button.disabled {
    background-color: gray;
    color: black;
}

.card-body {
    position: relative;
    border: 1px solid #E1E1E1;
    border-radius: 10px;
    padding: 27px 20px;
    gap: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-body>div {
    width: 100%;
}

span {
    font-weight: 400;
    font-size: 17px;
    opacity: 0.5;
}

.divider {
    max-width: 90%;
    height: 1px;
    background-color: #E1E1E1;
}

strong {
    font-weight: 800;
    font-size: 17px;
    line-height: 20px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90%;

}

.bottom {
    max-width: 90%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>