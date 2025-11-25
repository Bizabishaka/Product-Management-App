import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUIStore = defineStore("ui", () => {
  // Reactive search term
  const search = ref("");

  // Notifications (array of messages)
  const notifications = ref<string[]>([]);

  // Computed: number of notifications
  const notificationCount = computed(() => notifications.value.length);

  // Add a notification message
  function notify(msg: string) {
    notifications.value.unshift(msg);        // add to start
    if (notifications.value.length > 10) {  // keep last 10 messages
      notifications.value.pop();
    }
  }

  // Remove a specific notification by index
  function removeNotification(index: number) {
    notifications.value.splice(index, 1);
  }

  // Clear all notifications
  function clearNotifications() {
    notifications.value = [];
  }

  // Set the global search term
  function setSearch(term: string) {
    search.value = term;
  }

  return {
    search,
    setSearch,
    notifications,
    notificationCount,
    notify,
    removeNotification,
    clearNotifications,
  };
});
