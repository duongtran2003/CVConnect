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
  };

  const changeProcessCandidate = async (payload: any) => {
    try {
      const res = await $axios.put(
        `/_api/core/job-ad-candidate/change-process`,
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

  const markOnboard = async (id: number | string, status: boolean) => {
    const payload = {
      jobAdCandidateId: id,
      isOnboarded: status,
    };

    try {
      const res = await $axios.put(
        `/_api/core/job-ad-candidate/mark-onboard`,
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

  const changeOnboardDate = async (id: number | string, date: string) => {
    const payload = {
      jobAdCandidateId: id,
      newOnboardDate: date,
    };

    try {
      const res = await $axios.put(
        `/_api/core/job-ad-candidate/change-onboard-date`,
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

  const getEmailLog = async (
    candidateInfoId: string | number,
    jobAdId: string | number,
  ) => {
    try {
      const res = await $axios.get(
        `/_api/notify/email-log/log-by-candidate-info/${candidateInfoId}/${jobAdId}`,
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
      return false;
    }
  };

  const sendEmail = async (payload: any) => {
    try {
      const res = await $axios.post(
        `/_api/core/job-ad-candidate/send-email`,
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
    getJobAdCandidateDetail,
    markOnboard,
    changeOnboardDate,
    sendEmail,
    saveSummary,
    eliminateCandidate,
    changeProcessCandidate,
    getEmailLog,
  };
};
