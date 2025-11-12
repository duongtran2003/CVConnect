export const useJobsSearchApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getFilter = async () => {
    try {
      const res = await $axios.get(`/_api/core/job-ad/outside/data-filter`, {
        skipAuth: true,
      });
      // toast.add({
      //   title: res.data.message,
      //   color: "success",
      // });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message || "Có lỗi xảy ra",
          color: "error",
        });
      }
      console.error(err);
      return null;
    }
  };

  return {
    getFilter,
  };
};
