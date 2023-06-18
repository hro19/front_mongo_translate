//checkboxをresetするためのメソッド 第一引数はID名
function resetCheckboxValue(checkboxId: string) {
  const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = false;
  }
}

export { resetCheckboxValue };