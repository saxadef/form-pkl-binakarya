const namaPembimbing = [
  "Holdin Farouk", "Andri Nurlena", "Lizun Pidriansya"
];

function tampilkanPembimbing() {
  const jumlah = document.getElementById('jumlah').value;
  const container = document.getElementById('formPembimbing');
  container.innerHTML = '';

  if (jumlah === "1") {
    container.innerHTML += `
      <label for="pembimbing1">Pilih Pembimbing</label>
      <select id="pembimbing1">${buatOpsiPembimbing()}</select>
    `;
  } else if (jumlah === "2") {
    container.innerHTML += `
      <label for="pembimbing1">Pembimbing 1</label>
      <select id="pembimbing1" onchange="updateDropdown()">${buatOpsiPembimbing()}</select>

      <label for="pembimbing2">Pembimbing 2</label>
      <select id="pembimbing2">${buatOpsiPembimbing()}</select>
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

function submitForm() {
  const nama = document.getElementById("nama").value.trim();
  const nik = document.getElementById("nik").value.trim();
  const jumlah = document.getElementById("jumlah").value;
  const pembimbing1 = document.getElementById("pembimbing1")?.value || "";
  const pembimbing2 = document.getElementById("pembimbing2")?.value || "";

  if (!nama || !nik || !jumlah || !pembimbing1 || (jumlah === "2" && !pembimbing2)) {
    alert("Harap lengkapi semua data.");
    return;
  }

  if (jumlah === "2" && pembimbing1 === pembimbing2) {
    alert("Pembimbing 1 dan 2 tidak boleh sama.");
    return;
  }

  const data = {
    nama,
    nik,
    jumlah,
    pembimbing1,
    pembimbing2
  };

  fetch("https://script.google.com/macros/s/AKfycbwpI8GBawr6oJVa-6xEK8RU69Pf6uKsMPhI1x1trOesMpW-eJCkJD44IQVkbeOkYIhdpw/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(res => {
    if (res.status === "success") {
      alert("Data berhasil dikirim!");
      // reset form
      document.getElementById("nama").value = "";
      document.getElementById("nik").value = "";
      document.getElementById("jumlah").value = "";
      document.getElementById("formPembimbing").innerHTML = "";
    } else {
      alert("Gagal mengirim data.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengirim.");
  });
}
