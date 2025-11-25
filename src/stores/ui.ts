import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUIStore = defineStore("ui", () => {
  
  const search = ref("");

  
  const notifications = ref<string[]>([]);

  
  const notificationCount = computed(() => notifications.value.length);

 
  function notify(msg: string) {
    notifications.value.unshift(msg);        
    if (notifications.value.length > 10) {  
      notifications.value.pop();
    }
  }

  
  function removeNotification(index: number) {
    notifications.value.splice(index, 1);
  }

  
  function clearNotifications() {
    notifications.value = [];
  }

  
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
