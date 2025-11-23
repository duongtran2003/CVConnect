import { timestamp } from "@vueuse/core";

export const usePubSubStore = defineStore("pubSub", () => {
  const stream = ref<any>({
    chatStream: null,
  });

  const subscribe = computed(() => {
    return (channel: string) => {
      return stream.value[channel];
    };
  });

  function push(channel: string, message: string) {
    stream.value[channel] = {
      data: message,
      timestamp: new Date(),
    };
  }

  return {
    stream,
    subscribe,
    push,
  };
});
