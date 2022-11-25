import SideBar from "../../components/SideBar";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";
import api from "./../../services/Api/index";
import { IsUserLogged } from "../../services/Api/Users";
import { ToastError, ToastSucess, ToastInfo } from "../../services/Toast";
import { TbDropletFilled } from "react-icons/tb";
import { GiGrainBundle } from "react-icons/gi";

export default function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [userLogged, setUserLogged] = useState(null);
  const [idFazenda, setIdFazenda] = useState(null);
  const [isColleting, setIsColleting] = useState(true);
  const [currentColeta, setCurrentColeta] = useState(null);
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
      labels: {
        show: false,
      },
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

  async function FetchAndStoreData() {
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

    if (count === 0) {
      let coleta;

      await api
        .post("fazenda/cadastrarInicioColeta", {
          idFazenda: idFazenda,
        })
        .then((result) => {
          coleta = result.data.data.Id;
          if (coleta > 0) {
            ToastSucess("Coleta iniciada com sucesso.");
            setCurrentColeta(coleta);
          }
        })
        .catch((error) => {
          ToastError("Falha ao iniciar coleta.");
        });

      if (coleta > 0) {
        await api.post("fazenda/cadastrarDadosColeta", {
          idColeta: coleta,
          umidadeAr: parseFloat(dataValues?.umidadeAr),
          umidadeSolo: parseFloat(dataValues?.umidadeSolo / 100),
          temperaturaAmbiente: parseFloat(dataValues?.temperaturaAmbiente),
          createdAt: horario,
        });
      }
    } else if (count === 30) {
      // Finalizando Coleta
      await api
        .patch("fazenda/finalizarColeta", {
          idColeta: currentColeta,
        })
        .then((result) => {
          ToastInfo("Coleta finalizada com sucesso!");
        })
        .catch((error) => {
          ToastError("Erro ao finalizar coleta.");
        });

      setCurrentColeta(null);
      setCount(0);
      setUmidadeAr([]);
      setUmidadeSolo([]);
      setTemperaturaAmbiente([]);
      setHorarioColeta([]);
    } // Coletando
    else {
      await api.post("fazenda/cadastrarDadosColeta", {
        idColeta: currentColeta,
        umidadeAr: parseFloat(dataValues?.umidadeAr),
        umidadeSolo: parseFloat(dataValues?.umidadeSolo / 100),
        temperaturaAmbiente: parseFloat(dataValues?.temperaturaAmbiente),
        createdAt: horario,
      });
    }

    if (count != 30) {
      setCount(count + 1);
    }
  }

  useEffect(() => {
    if (isColleting && userLogged != null && idFazenda != null) {
      const interval = setInterval(() => FetchAndStoreData(), 60000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  useEffect(() => {
    if (userLogged == null) {
      let getUser = async () => {
        let user = await IsUserLogged();
        if (user != null && user?.isValid) {
          setUserLogged(user?.user);
        } else {
          navigate("/login");
        }
      };

      getUser();
    }
  }, []);

  useEffect(() => {
    if (idFazenda == null && userLogged != null) {
      let getFazenda = async () => {
        await api
          .get(`fazenda/buscarFazenda?userId=${userLogged?.Id}`)
          .then((result) => {
            setIdFazenda(result?.data.data.Id);
          })
          .catch((error) => {
            ToastError("Falha ao buscar fazenda do usuário.");
          });
      };

      getFazenda();
    }
  });

  return (
    userLogged != null && (
      <div className={styles["container"]}>
        <SideBar colorIcons={"#FFFFFF"} backgroundColor={"#1D4D16"} />

        <div className={styles["homeContainer"]}>
          <header>
            <h3>
              Bem vindo, @{userLogged?.Nome}! Acompanhe aqui os dados de
              ambiente coletados pelo seu dispostivo.
            </h3>
          </header>

          <main>
            <Chart
              width={"100%"}
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

          <h3 style={{color:'#1b7837'}}>
            Coletas: <span style={{color:'yellow', fontSize:'22px', fontWeight:'bolder'}}>{count}</span>
          </h3>
        </div>
        <div>
            <div className={styles["imagem1"]}>
              <div className={styles["contato"]}>
                <h1><GiGrainBundle style={{ color: "#fff", width:"200px",height:"50px" }} /></h1>
                <br/>
                <h1>Irrigação</h1>
                <p>Os sistemas de irrigação por gotejamento e por sulcos são indicados para solos argilo-arenosos e argilosos.  A gota d'água cai próxima às raízes das plantas, reduzindo o desperdício e elevando a eficiência.</p>
              </div>
            </div>
            <div className={styles["imagem2"]}>
              <div className={styles["contato"]}>
                <h1><TbDropletFilled style={{ color: "#fff", width:"200px",height:"50px" }} /></h1>
                <br/>
                <h1>Gotejamento</h1>
                <p>O gotejamento é a forma mais eficiente de fornecer água e nutrientes as plantas porque entrega as quantidades ideais de acordo com as fases do seu cultivo, no momento certo e diretamente na raiz da planta.</p>
              </div>
            </div>
          </div>
      </div>
    )
  );
}