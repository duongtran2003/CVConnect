export const positionTableHeaders = [
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
    accessorKey: "name",
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
    accessorKey: "code",
    header: "Mã",
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
  // {
  //   accessorKey: "description",
  //   header: "Mô tả",
  //   allowFilter: true,
  //   filterType: "text",
  //   isSortable: true,
  //   meta: {
  //     class: {
  //       th: "min-w-[200px] pl-[32px] max-w-[440px] truncate",
  //       td: "pl-[32px] max-w-[440px] truncate",
  //     },
  //   },
  // },
  {
    accessorKey: "listLevel",
    header: "Cấp bậc",
    allowFilter: true,
    filterType: "text",
    isSortable: false,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[440px] truncate",
        td: "pl-[32px] max-w-[440px] truncate",
      },
    },
  },
  {
    accessorKey: "departmentName",
    header: "Phòng ban",
    allowFilter: true,
    filterType: "select",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[440px] truncate",
        td: "pl-[32px] max-w-[440px] truncate",
      },
    },
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    allowFilter: true,
    filterType: "select",
    isSortable: true,
    meta: {
      class: {
        th: "min-w-[200px] pl-[32px] max-w-[440px] truncate",
        td: "pl-[32px] max-w-[440px] truncate",
      },
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    isSortable: true,
    allowFilter: true,
    filterType: "date",
    meta: {
      class: {
        th: "min-w-[248px] max-w-[248px] truncate",
        td: "max-w-[248px] truncate",
      },
    },
  },
  {
    accessorKey: "createdBy",
    header: "Người tạo",
    isSortable: true,
    allowFilter: true,
    filterType: "text",
    meta: {
      class: {
        th: "min-w-[168px] max-w-[168px] truncate",
        td: "max-w-[168px] truncate",
      },
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật",
    isSortable: true,
    filterType: "date",
    allowFilter: true,
    meta: {
      class: {
        th: "min-w-[248px] max-w-[248px] truncate",
        td: "max-w-[248px] truncate",
      },
    },
  },
  {
    accessorKey: "updatedBy",
    header: "Người cập nhật",
    filterType: "text",
    isSortable: true,
    allowFilter: true,
    meta: {
      class: {
        th: "min-w-[168px] max-w-[168px] truncate",
        td: "max-w-[168px] truncate",
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

export const BREADCRUMB_BASE: TBreadcumbItem[] = [
  {
    name: "Danh mục",
    icon: "material-symbols:category-outline-rounded",
    url: "",
  },
  {
    name: "Vị trí tuyển dụng",
    icon: "",
    url: "/org-admin/position",
  },
];
