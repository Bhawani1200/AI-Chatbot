import styles from "./Theme.module.css";

export function Theme() {
  function handleValueChange(event) {
    document.documentElement.dataset.theme = event.target.value;
  }

  return (
    <div className={styles.Theme}>
      <span>Theme:</span>
      <select defaultValue="system" onChange={handleValueChange}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}