<template>
  <div class="innercontainer">
    <div class="row">
      <!-- Each card takes up 4 columns in a 12-column grid, allowing 3 cards per row -->
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="event in events"
        :key="event.id"
      >
        <div class="card h-100">
          <a href="https://www.google.com" target="_blank">
            <img :src="event.imageUrl" class="card-img-top" alt="Event Image" />
            <div class="card-body">
              <h6 class="card-date">{{ formatDate(event.date) }}</h6>
              <h5 class="card-title">{{ event.title }}</h5>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import events from "@/data/events.json";
export default {
  name: "EventCalendar",
  data() {
    return {
      events: events.events,
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style>
.innercontainer {
  margin-top: 1rem;
}
.card-date {
  color: rgb(234, 78, 68);
}
.card-text {
  font-weight: normal;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 5px; /* 5px rounded corners */
  display: flex;
  flex-direction: column;
}

.card-img-top {
  width: 100%;
  height: 200px; /* Set a fixed height for all images */
  object-fit: cover; /* This will make sure the image covers the area */
  border-top-left-radius: calc(5px - 1px);
  border-top-right-radius: calc(5px - 1px);
}

.card-body {
  padding: 15px;
  flex-grow: 1; /* Ensures that the card body expands to fill remaining space */
  background-color: white; /* Ensures white background for text */
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 992px) {
  .col-lg-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  .col-lg-4,
  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
