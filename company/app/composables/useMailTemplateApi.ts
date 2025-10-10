export const useMailTemplateApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getMailTemplates = async (
    params: any,
    abortController?: AbortController,
  ) => {
    const _abortController = abortController;

    try {
      const queryString = objectToQuery(params);
      const res = await $axios.get(
        `/_api/notify/email-template/filter?${queryString}`,
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

  const getMailTemplatePreviewDefault = async (
    id: number,
    body: Record<string, any>,
    abortController?: AbortController,
  ) => {
    const _abortController = abortController;

    try {
      const res = await $axios.post(
        `/_api/notify/email-template/preview-email/${id}`,
        {
          ...body,
        },
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

  const getMailTemplateDetail = async (
    id: number,
    abortController?: AbortController,
  ) => {
    const _abortController = abortController;

    try {
      const res = await $axios.get(`/_api/notify/email-template/detail/${id}`, {
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

  const getMailTemplateConfig = async (abortController?: AbortController) => {
    const _abortController = abortController;

    try {
      const res = await $axios.get(`/_api/notify/email-config/get-by-org`, {
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

  return {
    getMailTemplates,
    getMailTemplatePreviewDefault,
    getMailTemplateDetail,
    getMailTemplateConfig,
  };
};
