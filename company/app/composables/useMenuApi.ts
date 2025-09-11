export const useMenuApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getAllMenus = async () => {
    try {
      const res = await $axios.get(`/_api/user/menu/all-menus`);
      return res.data;
    } catch (err: any) {
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
    getAllMenus,
  };
};
