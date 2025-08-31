const defaultRoleKey = "auth-default-role";

const getDefaultRole = (): TAccountRole | null => {
  const role = localStorage.getItem(defaultRoleKey);
  if (role) {
    return JSON.parse(role);
  }
  return null;
};

const setDefaultRole = (role: TAccountRole) => {
  localStorage.setItem(defaultRoleKey, JSON.stringify(role));
};

const clearDefaultRole = () => {
  localStorage.removeItem(defaultRoleKey);
};

export { getDefaultRole, setDefaultRole, clearDefaultRole };
