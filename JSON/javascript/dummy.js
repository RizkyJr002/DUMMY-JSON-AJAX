let url = "https://dummyjson.com/products";

$(document).ready(function () {
  
  // -------------------DATABASE SMK----------------------

  let id = "";
  let pelanggan = "";
  let alamat = "";
  let telp = "";

  //SELECT DATA
  function selectDataa() {
    $.ajax({
      type: "get",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/select.php",
      cache: false,
      dataType: "json",
      success: function (response) {
        let out = '<table class="table mt-4"><thead><tr><th scope="col">No</th><th scope="col">Nama</th><th scope="col">Alamat</th><th scope="col">Telp</th><th scope="col">Hapus</th><th scope="col">Ubah</th><th scope="col">Tambah</th></tr></thead>';
        let No = 1;
        $.each(response, function (key, val) {
          out += `<tr>
                      <td>${No++}</td>
                      <td>${val.pelanggan}</td>
                      <td>${val.alamat}</td>
                      <td>${val.telp}</td>
                      <td><button type="button" class="btn btn-outline-danger btn-dell" data-id = ${val.idpelanggan}>DEL</button></td>
                      <td><button type="button" class="btn btn-outline-warning btn-ubahh" data-id = ${val.idpelanggan}>UBAH</button></td>
                      <td><button type="button" class="btn btn-outline-dark btn-tambahh" data-id = ${val.idpelanggan}>TAM</button></td>
                   </tr>`;
        });

        $("#dbsmk").html(out);
      }
    });
  }
  selectDataa();

  function tambahDataa(id) {
    $.ajax({
      type: "GET",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/selectwhere.php?id="+id,
      cache: false,
      dataType: "json",
      success: function (response) {
        let out = '<table class="table mt-4"><thead><tr><th scope="col">ID</th><th scope="col">Nama</th><th scope="col">Alamat</th><th scope="col">Telp</th></tr></thead>';
        let no = 1;
          out += `<tr>
                      <td id="idpelanggan">${response.idpelanggan}</td>
                      <td id="pelanggan">${response.pelanggan}</td>
                      <td id="alamat">${response.alamat}</td>
                      <td id="telp">${response.telp}</td>
                   </tr>`;
        $("#dummyy").html(out);
      }
    });
  }

  $("tbody").on("click", ".btn-tambahh", function () {
    let id = $(this).attr("data-id");
    tambahDataa(id);
  });

  $("#submittt").click(function (e) { 
    e.preventDefault();
    idorder = 3;
    idbarang = $("#idbarang").text();
    jumlah = 2;
    harga = $("#harga").text();
    barang = $("#barang").text();
    idpelanggan = $("#idpelanggan").text();
    pelanggan = $("#pelanggan").text();
    alamat = $("#alamat").text();
    telp = $("#telp").text();

    if (pelanggan == "" || barang == "") {
      alert("Data Gagal Dimasukkan!");
    } else {
      insertDataaa();
    }

    $("#idorder").text("");
    $("#idbarang").text("");
    $("#jumlah").text("");
    $("#harga").text("");
    $("#barang").text("");
    $("#idpelanggan").text("");
    $("#pelanggan").text("");
    $("#alamat").text("");
    $("#telp").text("");
  });


  function insertDataaa() {
    let dataAdd = {
      idorder : idorder,
      idbarang : idbarang,
      jumlah : jumlah,
      harga : harga,
      barang : barang,
      idpelanggan : idpelanggan,
      pelanggan : pelanggan,
      alamat : alamat,
      telp : telp
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/addtocart.php",
      cache: false,
      data: JSON.stringify(dataAdd),
      success: function (response) {
        alert('Data Berhasil Dimasukkan!');
      }
    });
  }

  // DELETE DATA
  function deleteDataa(id) {
    let idpelanggan = {
      idpelanggan: id,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/delete.php",
      Cache: false,
      data: JSON.stringify(idpelanggan),
      success: function (response) {
        let out = `<p>${response}</p>`;
        $("#msg2").html(out);
        window.location.reload("http://127.0.0.1:5500/");
      },
    });
  }

  $("tbody").on("click", ".btn-dell", function () {
    let id = $(this).attr("data-id");
    deleteDataa(id);
  });

  $("#submitt").click(function (e) {
    e.preventDefault();
    id = $("#id").val();
    pelanggan = $("#pelanggan").val();
    alamat = $("#alamat").val();
    telp = $("#telp").val();

    if (id == "") {
      insertDataa();
    } else {
      updateDataa();
    }

    $("#id").val("");
    $("#pelanggan").val("");
    $("#alamat").val("");
    $("#telp").val("");
  });

  // INSERT DATA
  function insertDataa() {
    let dataPelanggan = {
      pelanggan: pelanggan,
      alamat: alamat,
      telp: telp,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/insert.php",
      cache: false,
      data: JSON.stringify(dataPelanggan),
      success: function (response) {
        let out = `<p>${response}</p>`;
        $("#msg").html(out);
        window.location.reload("http://127.0.0.1:5500/");
      }
    });
  }

  //UPDATE DATA
  function selectUpdatee(id) {
    let idpelanggan = {
      idpelanggan: id,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/selectupdate.php",
      cache: false,
      data: JSON.stringify(idpelanggan),
      success: function (response) {
        let data = JSON.parse(response);
        $("#id").val(data.idpelanggan);
        $("#pelanggan").val(data.pelanggan);
        $("#alamat").val(data.alamat);
        $("#telp").val(data.telp);
      }
    });
  }

  function updateDataa() {
    let dataPelanggan = {
      idpelanggan: id,
      pelanggan: pelanggan,
      alamat: alamat,
      telp: telp
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/tugas-5-dbsmk-dummyjson-ajax/php/update.php",
      cache: false,
      data: JSON.stringify(dataPelanggan),
      success: function (response) {
        let out = `<p>${response}</p>`;
        $("#msg").html(out);
        window.location.reload("http://127.0.0.1:5500/");
      }
    });
  }

  $("tbody").on("click", ".btn-ubahh", function () {
    let id = $(this).attr("data-id");
    selectUpdatee(id);
  });

  // -------------------DUMMY JSON------------------------

  //PILIH KATEGORI
  $("#submit2").click(function (e) {
    e.preventDefault();
    let Url;
    let category = document.getElementById("list").value;
    if (category === "smartphones") {
      Url = "https://dummyjson.com/products/category/smartphones";
    }
    if (category === "laptops") {
      Url = "https://dummyjson.com/products/category/laptops";
    }
    if (category === "fragrances") {
      Url = "https://dummyjson.com/products/category/fragrances";
    }
    if (category === "skincare") {
      Url = "https://dummyjson.com/products/category/skincare";
    }
    if (category === "groceries") {
      Url = "https://dummyjson.com/products/category/groceries";
    }
    if (category === "home-decoration") {
      Url = "https://dummyjson.com/products/category/home-decoration";
    }

    $.ajax({
      type: "get",
      url: Url,
      dataType: "json",
      success: function (response) {
        console.log(response.products);
        let out;
        $.each(response.products, function (key, val) {
          out += `<tr>
              <td>${val.id}</td>
              <td>${val.title}</td>
              <td>${val.price}</td>
              <td>${val.stock}</td>
              <td>${val.brand}</td>
              <td>${val.category}</td>
              <td><button type="button" id="delete" class="btn btn-danger btn-del" data-id = ${val.id}>DEL</button></td>
              <td><button type="button" id="update" class="btn btn-warning btn-ubah" data-id = ${val.id}>UBAH</button></td>
              <td><button type="button" id="tambah" class="btn btn-dark btn-tambah" data-id = ${val.id}>TAM</button></td>
           </tr>`;
        });
        $("#dummyjson").html(out);
      },
    });
  });

  //SELECT DATA
  $("#tabeld").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "get",
      url: url,
      dataType: "json",
      success: function (response) {
        let out = `<table class="table mt-3">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nama</th>
          <th scope="col">Harga</th>
          <th scope="col">Stock</th>
          <th scope="col">Brand</th>
          <th scope="col">Kategori</th>
          <th scope="col">Hapus</th>
          <th scope="col">Ubah</th>
          <th scope="col">Tambah</th>
        </tr>
      </thead></table>`;
        $.each(response.products, function (key, val) {
          out += `<tr>
                        <td>${val.id}</td>
                        <td>${val.title}</td>
                        <td>${val.price}</td>
                        <td>${val.stock}</td>
                        <td>${val.brand}</td>
                        <td>${val.category}</td>
                        <td><button type="button" id="delete" class="btn btn-danger btn-del" data-id = ${val.id}>DEL</button></td>
                        <td><button type="button" id="update" class="btn btn-warning btn-ubah" data-id = ${val.id}>UBAH</button></td>
                        <td><button type="button" id="tambah" class="btn btn-dark btn-tambah" data-id = ${val.id}>TAM</button></td>
                        </tr>`;
        });
        $("#dummyjson").html(out);
      },
    });
  });

  function tambahData(id) {
    $.ajax({
      type: "GET",
      url: `https://dummyjson.com/products/${id}`,
      cache: false,
      data: JSON.stringify(id),
      success: function (response) {
        let out = `<table class="table mt-3">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nama</th>
          <th scope="col">Harga</th>
        </tr>
      </thead></table>`;
           out += `<tr>
           <td id="idbarang">${response.id}</td>
           <td id="barang">${response.title}</td>
           <td id="harga">${response.price}</td>
           </tr>`
        $("#dummy").html(out);
      }
    });
  }

  $("tbody").on("click", ".btn-tambah", function () {
    let id = $(this).attr("data-id");
    tambahData(id);
  });

  //DELETE DATA
  function deleteData(id) {
    $.ajax({
      type: "POST",
      method: "DELETE",
      url: `https://dummyjson.com/products/${id}`,
      cache: false,
      data: JSON.stringify(id),
      success: function (response) {
        console.log(response);
      },
    });
  }

  $("tbody").on("click", ".btn-del", function () {
    let id = $(this).attr("data-id");
    deleteData(id);
  });

  //INSERT DATA
  function insertData() {
    $.ajax({
      type: "POST",
      method: "POST",
      url: "https://dummyjson.com/products/add",
      cache: false,
      data: JSON.stringify({
        title: title,
        price: price,
        stock: stock,
        brand: brand,
        category: category,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      success: function (response) {
        console.log(response);
      },
    });
  }

  $("#submit").click(function (e) {
    e.preventDefault();
    id = $("#id").val();
    title = $("#title").val();
    price = $("#price").val();
    stock = $("#stock").val();
    brand = $("#brand").val();
    category = $("#category").val();

    if (id == "") {
      insertData();
    } else {
      updateData();
    }

    $("#id").val("");
    $("#title").val("");
    $("#price").val("");
    $("#stock").val("");
    $("#brand").val("");
    $("#category").val("");
  });

  //UPDATE DATA
  function selectUpdate(id) {
    $.ajax({
      type: "GET",
      url: `https://dummyjson.com/products/${id}`,
      cache: false,
      dataType: "json",
      success: function (response) {
        $("#id").val(response.id);
        $("#title").val(response.title);
        $("#price").val(response.price);
        $("#stock").val(response.stock);
        $("#brand").val(response.brand);
        $("#category").val(response.category);
      },
    });
  }

  function updateData() {
    $.ajax({
      type: "POST",
      method: "PUT",
      url: `https://dummyjson.com/products/${id}`,
      cache: false,
      data: JSON.stringify({
        id: id,
        title: title,
        price: price,
        stock: stock,
        brand: brand,
        category: category,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      success: function (response) {
        console.log(response);
      },
    });
  }

  $("tbody").on("click", ".btn-ubah", function () {
    let id = $(this).attr("data-id");
    selectUpdate(id);
  });
});