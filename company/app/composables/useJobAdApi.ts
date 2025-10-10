export const useJobAdApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const createJobAd = async (payload: any) => {
    try {
      const res = await $axios.post(`/_api/core/job-ad/create`, payload);
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return true;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message || "Có lỗi xảy ra",
          color: "error",
        });
      }
      console.error(err);
      return false;
    }
  };


  return {
    createJobAd,
  };
};
