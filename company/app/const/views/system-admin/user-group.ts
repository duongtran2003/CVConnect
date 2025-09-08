export const userGroupTableHeaders = [
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
    filterType: 'text',
    isSortable: true,
  },
  {
    accessorKey: "memberType",
    header: "Nhóm người dùng",
    isSortable: true,
    allowFilter: true,
    meta: {
      class: {
        th: "min-w-[188px]",
      },
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    isSortable: true,
    allowFilter: true,
    filterType: 'date',
    meta: {
      class: {
        th: "min-w-[136px]",
      },
    },
  },
  {
    accessorKey: "createdBy",
    header: "Người tạo",
    isSortable: true,
    allowFilter: true,
    filterType: 'text',
    meta: {
      class: {
        th: "min-w-[136px]",
      },
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật",
    isSortable: true,
    filterType: 'date',
    allowFilter: true,
    meta: {
      class: {
        th: "min-w-[160px]",
      },
    },
  },
  {
    accessorKey: "updatedBy",
    header: "Người cập nhật",
    filterType: 'text',
    isSortable: true,
    allowFilter: true,
    meta: {
      class: {
        th: "min-w-[168px]",
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
