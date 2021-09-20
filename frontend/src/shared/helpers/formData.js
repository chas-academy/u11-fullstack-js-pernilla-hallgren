export const handleFormData = (e, stateSetter) => {
  const identifier = e.target.id;
  stateSetter((currentUser) => {
    return { ...currentUser, [identifier]: e.target.value };
  });
};
