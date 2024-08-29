import React from "react";
import Layout from "../layout/Layout";
import PageTitle from "../components/PageTitle";
import StatMenuBox from "../components/StatMenuBox";
import SmallMenuBox from "../components/SmallMenuBox";
import BigMenuBox from "../components/BigMenuBox";
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="p-4 px-10 flex flex-col gap-6">
        <PageTitle page={"Tableau de bord"} title={"Informations générales"} />
        <div className="grid grid-cols-4 gap-2">
          <StatMenuBox
            title={" Groupe de colonnes"}
            number={"3.0"}
            lastly={"23/03/2024"}
            icon={"lucide:table-columns-split"}
          />
          <StatMenuBox
            title={"Nombre de colonnes"}
            number={"20.0"}
            lastly={"03/06/2024"}
            icon={"bx:columns"}
          />
          <StatMenuBox
            title={"Nombre de fichiers"}
            number={"30.0"}
            lastly={"13/08/2024"}
            icon={"simple-icons:files"}
          />
          <StatMenuBox
            title={"Nombre de fois utilisé"}
            number={"200.0"}
            lastly={"02/02/2024"}
            icon={"ic:sharp-data-usage"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Menu Section</p>
          <div className="grid grid-cols-2 gap-2 w-full">
            <SmallMenuBox
              icon={"noto-v1:card-index-dividers"}
              title={
                "Extraire et Conserver Certaines Colonnes d’un Fichier CSV"
              }
              desc={
                "prendre un fichier CSV existant et de ne garder que certaines colonnes spécifiques, éliminant ainsi les informations superflues pour se concentrer sur les données pertinentes."
              }
              onClick={() => navigate("filter_columns")}
            />
            <SmallMenuBox
              icon={"twemoji:card-index-dividers"}
              title={"Diviser un Fichier CSV en Plusieurs Parties"}
              desc={
                "une action de découpage d'un fichier CSV en plusieurs fichiers distincts."
              }
              onClick={() => navigate("divide_a_file")}
            />
            <SmallMenuBox
              icon={"emojione:card-index-dividers"}
              title={"Fusionner des Fichiers CSV en un Seul"}
              desc={
                "une opération où plusieurs fichiers CSV sont combinés en un seul fichier. L'objectif est de rassembler les données dispersées dans différents fichiers pour une analyse ou un traitement centralisé."
              }
              onClick={() => navigate("join_file_to_one")}
            />
            <SmallMenuBox
              icon={"emojione-v1:card-index-dividers"}
              title={"Diviser un Fichier CSV en sou ficher"}
              desc={
                " L'objectif est de rassembler les données dispersées dans différents fichiers pour une analyse ou un traitement centralisé."
              }
              onClick={() => navigate("make_sub_files")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mainpage;
