import { useEffect, useState } from "react";
import { IsUserLogged } from "../../services/Api/Users";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api";
import { ToastError } from "../../services/Toast";
import SideBar from "../../components/SideBar";
import styles from "./styles.module.css";
import { ListColetas } from "../../services/Api/Coleta";
import { BiStopwatch } from "react-icons/bi";
import { BiCompass } from "react-icons/bi";
import { BsThermometerHalf } from "react-icons/bs";
import { BsWind } from "react-icons/bs";
import { GiPlantRoots } from "react-icons/gi";
import { BsHourglassSplit } from "react-icons/bs";
import Media from "../../services/CalculoMedia";

export default function Historico() {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState(null);
  const [idFazenda, setIdFazenda] = useState(null);
  const [coletas, setColetas] = useState(null);

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

  useEffect(() => {
    if (userLogged != null && idFazenda > 0) {
      let getColetas = async () => {
        let listColetas = await ListColetas(idFazenda);
        console.log(listColetas);
        setColetas(listColetas);
      };

      getColetas();
    }
  }, [idFazenda]);

  return (
    userLogged != null &&
    idFazenda != null &&
    coletas != null && (
      <div className={styles["container"]}>
        <SideBar colorIcons={"#FFFFFF"} backgroundColor={"#1D4D16"} />

        <div className={styles["homeContainer"]}>
          <h1 id={styles["title-historico"]} style={{ position: "absolute", top: "25px", color: "#1b7837" }}>
            Histórico de coletas
          </h1>

          <div id={styles["lista"]}>
            {coletas.map((coleta) => {
              return (
                <section className={styles["history-section"]}>
                  <table className={styles["table"]}>
                    <thead>
                      <tr className={styles["header-table"]}>
                        <th style={{ color: "#222224", fontWeight: "600" }}>
                          HORÁRIO
                        </th>
                        <th style={{ color: "#18712D", fontWeight: "bolder" }}>
                          Umidade do Ar
                        </th>
                        <th style={{ color: "#02461A", fontWeight: "bolder" }}>
                          Umidade do Solo
                        </th>
                        <th style={{ color: "#57A05C", fontWeight: "bolder" }}>
                          Temperatura Ambiente
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {coleta.Dados.map((dado) => {
                        return (
                          <tr className={styles["row-table"]}>
                            <td>
                              {new Date(dado?.createdAt).toLocaleString(
                                "pt-BR"
                              )}
                            </td>
                            <td>{dado?.UmidadeDoAr}%</td>
                            <td>{dado?.UmidadeDoSolo}%</td>
                            <td>{dado?.TemperaturaAmbiente} °C</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className={styles["card-table"]}>
                    <span>
                      <p style={{ color: "#353537", fontWeight: "bolder" }}>
                        <BiStopwatch size={20} color="#222224" />
                        Inicío da coleta:
                      </p>
                      <span style={{ color: "#1b7837", fontWeight: "bolder" }}>
                        {new Date(coleta?.StartedAt).toLocaleString("pt-BR")}
                      </span>
                    </span>

                    <span>
                      <p style={{ color: "#353537", fontWeight: "bolder" }}>
                        <BsHourglassSplit size={20} color="yellow" />
                        Fim da coleta:
                      </p>
                      <span style={{ color: "#1b7837", fontWeight: "bolder" }}>
                        {new Date(coleta?.FinishedAt).toLocaleString("pt-BR")}
                      </span>
                    </span>

                    <span>
                      <p style={{ color: "#353537", fontWeight: "bolder" }}>
                        <BsThermometerHalf size={20} color="#FF2020" />
                        Temperatura média do ambiente:
                      </p>
                      <span style={{ color: "#1b7837", fontWeight: "bolder" }}>
                        {Media(
                          coleta?.Dados,
                          "TemperaturaAmbiente",
                          coleta?.Dados.length
                        )}
                        °C
                      </span>
                    </span>

                    <span>
                      <p style={{ color: "#353537", fontWeight: "bolder" }}>
                        <BsWind size={20} color="#20FFFF" />
                        Umidade média do ar:
                      </p>
                      <span style={{ color: "#1b7837", fontWeight: "bolder" }}>
                        {Media(
                          coleta?.Dados,
                          "UmidadeDoAr",
                          coleta?.Dados.length
                        )}
                        %
                      </span>
                    </span>

                    <span>
                      <p style={{ color: "#353537", fontWeight: "bolder" }}>
                        <GiPlantRoots size={20} color="#02461A" />
                        Umidade média do solo:
                      </p>
                      <span style={{ color: "#1b7837", fontWeight: "bolder" }}>
                        {Media(
                          coleta?.Dados,
                          "UmidadeDoSolo",
                          coleta?.Dados.length
                        )}
                        %
                      </span>
                    </span>
                  </div>

                  <hr style={{ color: "red", width: "40px" }}></hr>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
