export const useRoleApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getRoles = async (params: any, abortController?: AbortController) => {
    const _abortController = abortController;

    try {
      const queryString = objectToQuery(params);
      const res = await $axios.get(`/_api/user/role/filter?${queryString}`, {
        signal: _abortController ? _abortController.signal : undefined,
      });
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

  const getMemberTypes = async () => {
    try {
      const res = await $axios.get(`/_api/user/role/member-type`);
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return [];
    }
  };

  const createUserGroup = async (payload: any) => {
    try {
      const res = await $axios.post(`/_api/user/role/create`, payload);
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return true
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return false
    }
  };

  return { getRoles, getMemberTypes, createUserGroup };
};
