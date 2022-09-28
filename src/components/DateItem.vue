<template>
    <div
        @click="!disabled ? dateClicked() : null"
        class="date-item"
        :class="{
            disabled: disabled,
            active: active,
        }"
    >
        <strong
            class="day"
            v-text="availability.day.slice(0,3)"
        ></strong>
        <span
            class="day-mon"
            v-text="availability.date.slice(0,2)"
        ></span>
    </div>
</template>

<script>
export default {
    props: {
        schedule: Object,
    },
    created() {
        // Disabled appointments within 24 hours ahead of current time
        if (!(this.unixDate <= (this.currentUnixDate)))
            this.disabled = false;

        // Disable appointments that are after more than 30 days
        const timeDifference = this.unixDate - this.currentUnixDate;
        if (timeDifference >= 2548800) // 29 days and 12 hours
            this.disabled = true;
    },

    data() {
        return {
            disabled: true,
            active: false,
        }
    },
    computed: {
        availability() {
            return this.schedule.availability;
        },

        currentUnixDate() {
            return Math.floor(new Date().getTime() / 1000);
        },
        unixDate() {
            const [d, m, y] = this.availability.date.split("-");
            return Math.floor(new Date(`${y}-${m}-${d}`).getTime() / 1000);
        },
    },
    methods: {
        dateClicked() {
            if (!this.disabled)
                this.$emit("dateClicked", this.schedule);
            this.active = true;
        },
        deactivate() {
            this.active = false;
        }
    }

}
</script>

<style scoped>
.date-item {
    height: 60px;
    min-width: 46px;
    width: 46px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.161);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    animation: fade 0.3s;
}

@keyframes fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.date-item.disabled {
    box-shadow: none;
    color: #CFCFCF;
    cursor: default;
}

.date-item.disabled:hover {
    box-shadow: none;
}

.date-item:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.164);
}

.date-item.active {
    background-color: var(--primary);
    border-radius: 9px;
    color: white;
}
</style>