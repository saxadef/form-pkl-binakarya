const namaPembimbing = [
  "Holdin Farouk",
  "Andri Nurlena",
  "Lizun Pidriansya"
];

function tampilkanPembimbing() {
  const jumlah = document.getElementById('jumlah').value;
  const container = document.getElementById('formPembimbing');
  container.innerHTML = '';

  if (jumlah === "1") {
    // Untuk 1 pembimbing, Lizun gak muncul
    container.innerHTML = `
      <label for="pembimbing1">Pilih Pembimbing</label>
      <select id="pembimbing1" name="pembimbing1" required>
        ${buatOpsiPembimbing("1")}
      </select>
    `;
  } else if (jumlah === "2") {
    container.innerHTML = `
      <label for="pembimbing1">Pembimbing 1</label>
      <select id="pembimbing1" name="pembimbing1" onchange="updateDropdown()" required>
        ${buatOpsiPembimbing("1")}
      </select>

      <label for="pembimbing2">Pembimbing 2</label>
      <select id="pembimbing2" name="pembimbing2" required>
        ${buatOpsiPembimbing("2")}
      </select>
    `;
  }
}

function buatOpsiPembimbing(posisi) {
  let opsi = '<option value="">--Pilih--</option>';
  namaPembimbing.forEach(nama => {
    if (posisi === "1" && nama !== "Lizun Pidriansya") {
      opsi += `<option value="${nama}">${nama}</option>`;
    } else if (posisi === "2") {
      opsi += `<option value="${nama}">${nama}</option>`;
    }
  });
  return opsi;
}

function updateDropdown() {
  const pembimbing1 = document.getElementById('pembimbing1').value;
  const pembimbing2Select = document.getElementById('pembimbing2');
  
  Array.from(pembimbing2Select.options).forEach(opt => {
    opt.disabled = false; // reset dulu semua opsi

    // Jika pembimbing1 = Andri, maka Holdin disabled di pembimbing2
    if (pembimbing1 === "Andri Nurlena" && opt.value === "Holdin Farouk") {
      opt.disabled = true;
    }
    // Jika pembimbing1 = Holdin, maka Andri disabled di pembimbing2
    if (pembimbing1 === "Holdin Farouk" && opt.value === "Andri Nurlena") {
      opt.disabled = true;
    }
    // Pembimbing 2 gak boleh sama dengan pembimbing 1
    if (opt.value === pembimbing1 && pembimbing1 !== "") {
      opt.disabled = true;
    }
    // Jika pembimbing1 = Lizun, maka pembimbing 2 harus kosong (Lizun hanya untuk pembimbing 2)
    if (pembimbing1 === "Lizun Pidriansya") {
      opt.disabled = true;
    }
  });
}

function submitForm(event) {
  event.preventDefault();

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

  // Kirim data ke Formspree
  fetch("https://formspree.io/f/mblyryre", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      alert("Data berhasil dikirim!");
      document.getElementById("pklForm").reset();
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
