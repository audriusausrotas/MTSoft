export default function getFencePrice(name: string) {
  const settingsStore = useSettingsStore();

  return (
    settingsStore.fences.find(
      (fence) =>
        fence.name.toLowerCase().trim() ===
        name.replace(" Eco", "").replace(" Premium", "").toLowerCase().trim()
    ) || null
  );
}
