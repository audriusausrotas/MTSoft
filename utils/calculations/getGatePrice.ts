export default function getGatePrice(name: string) {
  const settingsStore = useSettingsStore();
  return (
    settingsStore.gates.find(
      (fence) => fence.name.toLowerCase().trim() === name.toLowerCase().trim()
    ) || null
  );
}
