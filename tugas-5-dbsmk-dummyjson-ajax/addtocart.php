<?php
require_once "koneksi.php";

$data = stripslashes(file_get_contents("php://input"));
$dataAdd  = json_decode($data, true);

$idorder = $dataAdd['idorder'];
$idbarang = $dataAdd['idbarang'];
$jumlah = $dataAdd['jumlah'];
$harga = $dataAdd['harga'];
$barang = $dataAdd['barang'];
$idpelanggan = $dataAdd['idpelanggan'];
$pelanggan = $dataAdd['pelanggan'];
$alamat = $dataAdd['alamat'];
$telp = $dataAdd['telp'];

$sql = "INSERT INTO tblorderdetail VALUES ('', $idorder, $idbarang, $jumlah, $harga, '$barang', $idpelanggan, '$pelanggan', '$alamat', $telp)";
$result = mysqli_query($con, $sql);
