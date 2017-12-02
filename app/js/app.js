(function () {
    "use strict";

    function Devocional() {
        //const api = "http://localhost:3000/api/v1/iluminalma";
        const api = "https://devocional.herokuapp.com/api/v1/iluminalma";

        let actualDate = moment().toDate();

        const setContent = (response) => {
            document.querySelector("article h1").innerHTML = response.titulo;
            document.querySelector("article em").innerHTML = response.versiculo;
            document.querySelector("article span").innerHTML = response.dataPub;
            document.querySelector(".pensamento").innerHTML = response.pensamento;
            document.querySelector(".oracao").innerHTML = response.oracao;
        };

        const getData = () => {
            let date = {
                dia: moment(actualDate).format("DD"),
                mes: moment(actualDate).format("MM")
            };
            fetch(`${api}/${date.dia}/${date.mes}`)
                .then((response) => {
                    response.json().then(setContent);
                })
                .catch((err) => {
                    console.error('Error:', err);
                })
        };

        const getNextData = (event) => {
            event.preventDefault();
            actualDate = moment(actualDate).add(1, 'days').toDate();
            getData();
        };

        const getPreviousData = (event) => {
            event.preventDefault();
            actualDate = moment(actualDate).subtract(1, 'days').toDate();
            getData();
        };

        return {
            getData,
            getNextData,
            getPreviousData
        };
    }

    const d = new Devocional();
    document.addEventListener("DOMContentLoaded", d.getData, false);
    document.getElementsByClassName("btnAnterior")[0].addEventListener("click", d.getPreviousData);
    document.getElementsByClassName("btnProximo")[0].addEventListener("click", d.getNextData);
})();