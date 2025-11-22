export const useConversationApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getConversationMessages = async (
    jobAdId: any,
    candidateId: any,
    pageIndex: any,
    controller?: AbortController,
  ) => {
    const _abortController = controller;
    try {
      let url = `/_api/notify/conversation/chat-messages?jobAdId=${jobAdId}&candidateId=${candidateId}&pageSize=20`;
      if (pageIndex != null) {
        url += `&pageIndex=${pageIndex}`;
      }
      const res = await $axios.get(url, {
        signal: _abortController ? _abortController.signal : undefined,
      });
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

  const getConversationOrgInfo = async (
    orgId: any,
    controller?: AbortController,
  ) => {
    const _abortController = controller;
    try {
      const res = await $axios.get(
        `/_api/core/org/outside/org-by-job-ad/${orgId}`,
        {
          signal: _abortController ? _abortController.signal : undefined,
        },
      );
      // toast.add({
      //   title: res.data.message,
      //   color: "success",
      // });
      return res.data;
    } catch (err: any) {
      // if (err.response && err.response.data) {
      //   toast.add({
      //     title: err.response.data.message || "Có lỗi xảy ra",
      //     color: "error",
      //   });
      // }
      console.error(err);
      return null;
    }
  };

  const checkExistConversation = async (
    jobAdId: any,
    candidateId: any,
    controller?: AbortController,
  ) => {
    try {
      const res = await $axios.get(
        `/_api/notify/conversation/check-exists/${jobAdId}/${candidateId}`,
        {
          signal: controller?.signal,
        },
      );
      // toast.add({
      //   title: res.data.message,
      //   color: "success",
      // });
      return res.data;
    } catch (err: any) {
      // if (err.response && err.response.data) {
      //   toast.add({
      //     title: err.response.data.message || "Có lỗi xảy ra",
      //     color: "error",
      //   });
      // }
      console.error(err);
      return null;
    }
  };

  const createConversation = async (jobAdId: any, candidateId: any) => {
    try {
      const res = await $axios.post(`/_api/notify/conversation/create`, {
        jobAdId,
        candidateId,
      });
      toast.add({
        title: res.data.message,
        color: "success",
      });
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

  const deleteHistory = async (id: any) => {
    try {
      const res = await $axios.delete(
        `/_api/core/search-history-outside/delete`,
        {
          data: [id],
        },
      );
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

  const deleteAllHistory = async () => {
    try {
      const res = await $axios.delete(
        `/_api/core/search-history-outside/delete-all`,
      );
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

  return {
    checkExistConversation,
    getConversationOrgInfo,
    createConversation,
    getConversationMessages,
  };
};
