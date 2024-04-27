import React, { useState, useEffect } from 'react';

const WilayahDropdown = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  useEffect(() => {
    fetchProvinsi();
  }, []);

  const fetchProvinsi = async () => {
    try {
      const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
      const data = await response.json();
      setProvinsi(data);
    } catch (error) {
      console.error('Error fetching provinsi:', error);
    }
  };

  const fetchKabupaten = async (kodeProvinsi) => {
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${kodeProvinsi}.json`);
      const data = await response.json();
      setKabupaten(data);
      setKecamatan([]);
      setKelurahan([]);
    } catch (error) {
      console.error('Error fetching kabupaten:', error);
    }
  };

  const fetchKecamatan = async (kodeKabupaten) => {
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kodeKabupaten}.json`);
      const data = await response.json();
      setKecamatan(data);
      // Reset kelurahan
      setKelurahan([]);
    } catch (error) {
      console.error('Error fetching kecamatan:', error);
    }
  };

  const fetchKelurahan = async (kodeKecamatan) => {
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kodeKecamatan}.json`);
      const data = await response.json();
      setKelurahan(data);
    } catch (error) {
      console.error('Error fetching kelurahan:', error);
    }
  };

  const handleProvinsiChange = (event) => {
    const selectedProvinsi = event.target.value;
    fetchKabupaten(selectedProvinsi);
  };

  const handleKabupatenChange = (event) => {
    const selectedKabupaten = event.target.value;
    fetchKecamatan(selectedKabupaten);
  };

  const handleKecamatanChange = (event) => {
    const selectedKecamatan = event.target.value;
    fetchKelurahan(selectedKecamatan);
  };

    return (
      <div>
        <label>Provinsi:</label>
        <select onChange={handleProvinsiChange}>
          <option value="">Pilih Provinsi</option>
          {provinsi.map((prov) => (
            <option key={prov.id} value={prov.id}>{prov.name}</option>
          ))}
        </select>

        <label>Kabupaten:</label>
        <select onChange={handleKabupatenChange}>
          <option value="">Pilih Kabupaten</option>
          {kabupaten.map((kab) => (
            <option key={kab.id} value={kab.id}>{kab.name}</option>
          ))}
        </select>

        <label>Kecamatan:</label>
        <select onChange={handleKecamatanChange}>
          <option value="">Pilih Kecamatan</option>
          {kecamatan.map((kec) => (
            <option key={kec.id} value={kec.id}>{kec.name}</option>
          ))}
        </select>

        <label>Kelurahan:</label>
        <select>
          <option value="">Pilih Kelurahan</option>
          {kelurahan.map((kel) => (
            <option key={kel.id} value={kel.id}>{kel.name}</option>
          ))}
        </select>
      </div>
    );
};

export default WilayahDropdown;
