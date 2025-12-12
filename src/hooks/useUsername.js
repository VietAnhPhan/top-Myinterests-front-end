export default function useUsername() {
  const authStorage = JSON.parse(
    localStorage.getItem("myinterests_app_access")
  );

  if (authStorage && authStorage.username) {
    return authStorage.username;
  }

  return "";
}
