export const candidateTableHeaders = [
  {
    accessorKey: "index",
    header: "STT",
    meta: {
      class: {
        th: "min-w-[56px]",
      },
    },
  },
  {
    id: "id",
    accessorKey: "id",
  },
  {
    accessorKey: "fullName",
    header: "Tên",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "phone",
    header: "SĐT",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "numOfApply",
    header: "Số tin ứng tuyển",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate text-right",
      },
    },
  },
  {
    accessorKey: "applyDate",
    header: "Ngày ứng tuyển",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "candidateStatus",
    header: "Trạng thái ứng viên",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "jobAdTitle",
    header: "Tên tin tuyển dụng",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "jobAdContact",
    header: "Thông tin HR",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
  {
    accessorKey: "currentRound",
    header: "Vòng hiện tại",
    allowFilter: true,
    filterType: "text",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[280px] truncate",
        td: "pl-[32px] max-w-[280px] truncate",
      },
    },
  },
];

export const pageSizeOptions = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "50",
    value: 50,
  },
];
