<template>
    <div
        class="card-view"
        v-if="schedule"
    >
        <h2
            class="card-title"
            v-text="'Schedule Appointment'"
        ></h2>
        <div class="card-body">
            <div class="top">
                <strong v-text="'Fees'"></strong>
                <span v-text="'85$'"></span>
            </div>
            <div class="divider"></div>
            <div class="middle">
                <div class="middle-titles">
                    <strong v-text="'Schedule'"></strong>
                    <span
                        v-if="selectedDate"
                        class="disabled temp-messages"
                        v-text="selectedDate.availability.label"
                    ></span>
                </div>
                <div class="middle-content">
                    <font-awesome-icon
                        icon="fa-solid fa-chevron-left"
                        class="cursor-pointer"
                        @click="previous"
                        :class="{disabled: previousDisabled}"
                    />
                    <div class="dates-picker">
                        <DateItem
                            ref="dateRef"
                            v-for="schedule in currentDates"
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
                <strong v-text="'Choose time'"></strong>
                <div class="bottom-content">
                    <div
                        class="time-picker"
                        v-if="availableTimes.length || unavailableTimes.length"
                    >
                        <TimeItem
                            v-for="time in availableTimes"
                            :key="time"
                            :time="time"
                            ref="timeRef"
                            @timeClicked="timeClicked"
                            :disabled="false"
                        />
                        <TimeItem
                            v-for="time in unavailableTimes"
                            :key="time"
                            :time="time"
                            :disabled="true"
                        />
                    </div>
                    <span
                        class="disabled temp-messages"
                        v-else
                        v-text="'Please selected a date'"
                    > </span>
                </div>
            </div>
        </div>
        <button
            :class="{disabled: !buttonDisabled}"
            @click="submit"
            v-text="'Book Appointment'"
        ></button>

        <SubmitBanner
            ref="bannerRef"
            :selectedTime="selectedTime"
            :selectedDate="selectedDate"
        />
    </div>
    <div v-else>
        <img
            src="../assets/loading.svg"
            alt="Loading"
        />
    </div>
</template>

<script>
import DateItem from './DateItem.vue';
import TimeItem from "./TimeItem.vue";
import SubmitBanner from './SubmitBanner.vue';
export default {
    name: "card-component",
    created() {
        fetch("https://cura-front-end-test.herokuapp.com")
            .then(res => res.json())
            .then(data => JSON.parse(data))
            .then(data => {
                this.schedule = data.schedule;
                this.currentDates = this.schedule.slice(0, 5);
            });
    },

    methods: {
        dateClicked(availability) {
            this.selectedTime = null;

            this.$refs.dateRef.forEach(b => b.deactivate());
            this.availableTimes = [];
            this.unavailableTimes = [];
            this.selectedDate = availability;

            availability.available.forEach(time => {
                this.availableTimes.push(time);
            });

            availability.unavailable.forEach(time => {
                this.unavailableTimes.push(time);
            });
        },

        timeClicked(selected) {
            this.$refs.timeRef.forEach(time => time.deactivate());
            this.selectedTime = selected;
        },

        // Show next dates
        next() {
            if (this.currentIndex + 5 >= this.schedule.length)
                return;
            this.currentIndex += 5;
            this.currentDates = this.schedule.slice(this.currentIndex, this.currentIndex + 5);
        },
        previous() {
            if (this.currentIndex - 5 < 0)
                return;
            this.currentDates = this.schedule.slice(this.currentIndex - 5, this.currentIndex);
            this.currentIndex -= 5;
        },


        submit() {
            if (this.selectedTime && this.selectedDate) {
                //TODO: Send data to backend here using POST
                // Show appointment banner
                this.$refs.bannerRef.closed = false;

            }
        }
    },
    data() {
        return {
            schedule: null,
            currentDates: [],
            currentIndex: 0,
            unavailableTimes: [],
            availableTimes: [],
            timeActive: false,
            selectedTime: null,
            selectedDate: null,
            bannerActivation: false,
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
    components: { DateItem, TimeItem, SubmitBanner }
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
    box-shadow: none;
    opacity: 0.5;
}

.time-picker {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(2, 36px);
    column-gap: 14px;
    column-gap: 10px;
}

.middle-titles {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.temp-messages {
    font-size: 0.8rem;
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




.card-body {
    position: relative;
    border: 1px solid var(--border);
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
    background-color: var(--border);
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