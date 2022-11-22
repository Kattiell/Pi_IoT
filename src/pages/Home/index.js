import SideBar from "../../components/SideBar";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import api from "./../../services/Api/index";

export default function Home() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [isColleting, setIsColleting] = useState(true);
  const [umidadeAr, setUmidadeAr] = useState([]);
  const [umidadeSolo, setUmidadeSolo] = useState([]);
  const [temperaturaAmbiente, setTemperaturaAmbiente] = useState([]);
  const [horarioColeta, setHorarioColeta] = useState([]);
  const [dynamicWidth, setDynamicWidth] = useState("100%");

  let options = {
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    colors: ["#00441B", "#1A7335", "#53A15A"],
    plotOptions: {
      line: {
        columnWidth: "40%",
      },
    },
    xaxis: {
      categories: horarioColeta.map((value, index) => {
        return value;
      }),
      labels:{
        show: false,
      }
    },
    yaxis: {
      forceNiceScale: true,
    },
    stroke: {
      curve: "smooth",
      width: [5, 5, 5],
    },
    markers: {
      size: 1,
    },
  };

  let dataValues;

  async function FetchData() {
    setCount(count + 1);
    await fetch("http://localhost:1880/node-red-data")
      .then(async function (response) {
        let res = await response.json();
        return res;
      })
      .then(function (myData) {
        dataValues = myData;
      });

    let horario = new Date(dataValues?.horarioColeta).toLocaleString("pt-BR");

    let ar = umidadeAr;
    ar.push(dataValues?.umidadeAr);
    setUmidadeAr(ar);

    let solo = umidadeSolo;
    solo.push(dataValues?.umidadeSolo / 100);
    setUmidadeSolo(solo);

    let temperatura = temperaturaAmbiente;
    temperatura.push(dataValues?.temperaturaAmbiente);
    setTemperaturaAmbiente(temperatura);

    let horarioColetas = horarioColeta;
    horarioColetas.push(horario);

    setHorarioColeta(horarioColetas);

  }

  useEffect(() => {
    if (isColleting) {
      const interval = setInterval(() => FetchData(), 2000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  return (
    <div className={styles["container"]}>
      <SideBar colorIcons={"#FFFFFF"} backgroundColor={"#1D4D16"} />

      <div className={styles["homeContainer"]}>
        <header>
          <h3>
            Bem vindo, @{username}! Acompanhe aqui as estatísticas sobre o solo.
          </h3>
        </header>

        <main>
          <Chart
            width={dynamicWidth}
            type="line"
            height={450}
            options={options}
            series={[
              {
                name: "Umidade do solo",
                data: umidadeSolo.map((value, index) => {
                  return value;
                }),
              },
              {
                name: "Umidade do ar",
                data: umidadeAr.map((value, index) => {
                  return value;
                }),
              },
              {
                name: "Temperatura ambiente",
                data: temperaturaAmbiente.map((value, index) => {
                  return value;
                }),
              },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
