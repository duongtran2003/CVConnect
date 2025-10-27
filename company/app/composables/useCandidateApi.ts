export const useCandidateApi = () => {
  const { $axios } = useNuxtApp();
  const toast = useToast();

  const getJobAdCandidates = async (
    params: any,
    abortController?: AbortController,
  ) => {
    const _abortController = abortController;

    try {
      const queryString = objectToQuery(params);
      const res = await $axios.get(
        `/_api/core/job-ad-candidate/filter?${queryString}`,
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

  const getJobAdCandidateDetail = async (id: number) => {
    try {
      const res = await $axios.get(
        `/_api/core/job-ad-candidate/candidate-detail/${id}`,
      );
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

  const saveSummary = async (payload: any) => {
    try {
      const res = await $axios.post(
        `/_api/core/candidate-summary-org/save-summary`,
        payload,
      );
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return true;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return false;
    }
  };

  const eliminateCandidate = async (payload: any) => {
    try {
      const res = await $axios.put(
        `/_api/core/job-ad-candidate/eliminate-candidate`,
        payload,
      );
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return true;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return false;
    }
  }

  const createDepartment = async (payload: any) => {
    try {
      const res = await $axios.post(`/_api/core/department/create`, payload);
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

  const changeDepartmentStatus = async (payload: any) => {
    try {
      const res = await $axios.put(
        `/_api/core/department/change-status-active`,
        payload,
      );
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

  const updateDepartment = async (id: number, payload: any) => {
    try {
      const res = await $axios.put(
        `/_api/core/department/update/${id}`,
        payload,
      );
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

  const deleteDepartment = async (payload: any) => {
    try {
      const res = await $axios.delete(`/_api/core/department/delete`, {
        data: payload.ids,
      });
      if (res.data.message) {
        toast.add({
          title: res.data.message,
          color: "success",
        });
      }
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
    getJobAdCandidates,
    createDepartment,
    deleteDepartment,
    getJobAdCandidateDetail,
    updateDepartment,
    changeDepartmentStatus,
    saveSummary,
    eliminateCandidate,
  };
};
