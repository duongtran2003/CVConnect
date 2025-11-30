export const useDashboardApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getOverview = async (
    payload: any,
    abortController?: AbortController,
  ) => {
    const _abortController = abortController;

    try {
      const queryString = objectToQuery(payload);
      const res = await $axios.get(
        `/core/dashboard/system-admin/overview?${queryString}`,
        {
          signal: _abortController ? _abortController.signal : undefined,
        },
      );
      return res.data;
    } catch (err: any) {
      if (err.name === "AbortError") {
        return null;
      }

      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return null;
    }
  };

  const getPassRate = async (
    payload: any,
    abortController?: AbortController,
  ) => {
    const _abortController = abortController;

    try {
      const queryString = objectToQuery(payload);
      const res = await $axios.get(
        `/core/dashboard/system-admin/percent-passed?${queryString}`,
        {
          signal: _abortController ? _abortController.signal : undefined,
        },
      );
      return res.data;
    } catch (err: any) {
      if (err.name === "AbortError") {
        return null;
      }

      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return null;
    }
  };

  return {
    getOverview,
    getPassRate,
  };
};
