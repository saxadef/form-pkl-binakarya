const namaPembimbing = [
  "Holdin Farouk", "Andri Nurlena", "Lizun Pidriansya"
];

function tampilkanPembimbing() {
  const jumlah = document.getElementById('jumlah').value;
  const container = document.getElementById('formPembimbing');
  container.innerHTML = '';

  if (jumlah === "1") {
    container.innerHTML += `
      <label for="pembimbing1">Pilih Pembimbing:</label>
      <select id="pembimbing1" name="pembimbing1" required>
        ${buatOpsiPembimbing()}
      </select>
    `;
  } else if (jumlah === "2") {
    container.innerHTML += `
      <label for="pembimbing1">Pembimbing 1:</label>
      <select id="pembimbing1" name="pembimbing1" onchange="updateDropdown()" required>
        ${buatOpsiPembimbing()}
      </select>

      <label for="pembimbing2">Pembimbing 2:</label>
      <select id="pembimbing2" name="pembimbing2" required>
        ${buatOpsiPembimbing()}
      </select>
    `;
  }
}

function buatOpsiPembimbing() {
  return `<option value="">--Pilih--</option>` +
    namaPembimbing.map(nama => `<option value="${nama}">${nama}</option>`).join('');
}

function updateDropdown() {
  const pembimbing1 = document.getElementById('pembimbing1').value;
  const pembimbing2Select = document.getElementById('pembimbing2');

  Array.from(pembimbing2Select.options).forEach(opt => {
    opt.disabled = opt.value === pembimbing1 && pembimbing1 !== "";
  });
}
