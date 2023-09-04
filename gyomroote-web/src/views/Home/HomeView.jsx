﻿import React, { useContext } from "react";
import "./HomeView.scss";
import LanguageContext from "../../contexts/LanguageContext";
import Container from "react-bootstrap/esm/Container";
import Main from "../../components/Main/Main";
import Button from "react-bootstrap/esm/Button";

const HomeView = () => {
	const { t, i18n } = useContext(LanguageContext);

	return (
		<Main>
			<div className="home-body">
				<div className="hero-text-container">
					<span className="hero-text-title">
						Gyömrői Önkéntes Tűzoltóság
					</span>
					<span>Üdvözöljük megújult weboldalunkon!</span>
				</div>

				<p>
					Egyesületünk 2010-ben alakult újjá, 100 éves hagyománnyal és
					múlttal rendelkezve, azzal a szándékkal, miszerint városunk
					és a környező települések lakosainak biztonságosabbá tegyük
					környezetét.
				</p>
				<h3>Bemutatkozás</h3>
				<p>
					Egyesületünk 2010-ben alakult újjá, 100 éves hagyománnyal és
					múlttal rendelkezve, azzal a szándékkal, miszerint városunk
					és a környező települések lakosainak biztonságosabbá tegyük
					környezetét, valamint gyorsan és hatékonyan segíthessünk a
					bajba jutottakon, legyen szó egy bekövetkező autóbaleset
					sérültjeiről vagy egy lakóingatlanban történő tűzeset,
					esetenként viharkárok felszámolásáról, és életmentésről.
					Jelenleg 27 fős beavatkozó állománnyal rendelkezünk,
					2017-ben közel 4500 óra szolgálatot adtunk a terület
					védelmében, 2018-ban már közel 5000 órát, ebből
					2018.04.01-től önálló beavatkozóként több mint 2300 órát.
				</p>
				<button>Olvasás folytatása...</button>
				<h3>Toborzás</h3>
				<p>
					A Gyömrői Önkéntes Tűzoltó Egyesület várja olyan 18 évet
					betöltött büntetlen előéletű polgárok jelentkezését, akik
					szeretnék megismerni a csapatot, működésünket, illetve a
					szerveződés életét, kedvet éreznek ahhoz, hogy az önkéntes
					tűzoltóság életébe bekapcsolódva a helyi lakosság
					szolgálatába álljanak.
				</p>
				<button>Jelentkezés</button>
			</div>
		</Main>
	);
};

export default HomeView;
