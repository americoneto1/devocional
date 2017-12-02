const cheerio = require('cheerio');
const request = require('request');
const baseUrl = 'http://www.iluminalma.com/dph/4/{0}.html';

function parseContent(body, res) {
    const $ = cheerio.load(body);
    const copyright = $('.copyright p');
    const versiculo = $('h4').text().trim();

    if (versiculo.indexOf('Página não encontrada') >= 0) {
        res.status(404).send('Not Found');
        return;
    }

    let pensamento = copyright.eq(0).text().trim();
    let oracao = copyright.eq(1).text().trim();

    pensamento = pensamento.replace('Pensamento: ', '');
    oracao = oracao.replace('Oração: ', '');
    oracao = oracao.replace("\n\n \n\n\n<!--//<![CDATA[\n   var m3_u = \n(location.protocol=='https:'?'https://ads.heartlight.org/openads/www/delivery/ajs.php':'http://ads.heartlight.org/openads/www/delivery/ajs.php');\n   var m3_r = Math.floor(Math.random()*99999999999);\n   if (!document.MAX_used) document.MAX_used = ',';\n   document.write (\"<scr\"+\"ipt type='text/javascript' src='\"+m3_u);\n   document.write (\"?zoneid=37\");\n   document.write ('&cb=' + m3_r);\n   if (document.MAX_used != ',') document.write (\"&exclude=\" + document.MAX_used);\n   document.write (\"&loc=\" + escape(window.location));\n   if (document.referrer) document.write (\"&referer=\" + escape(document.referrer));\n   if (document.context) document.write (\"&context=\" + escape(document.context));\n   if (document.mmm_fo) document.write (\"&mmm_fo=1\");\n   document.write (\"'></scr\"+\"ipt>\");\n//]]>-->\n   Devocional Para Hoje em: \nInglês", "");

    res.json({
        "titulo": $('h2').text().trim(),
        "versiculo": versiculo,
        "pensamento": pensamento,
        "oracao": oracao,
        "dataPub": $('.dphDate').text().trim()
    });
}

function requestPage(req, res) {
    const date = req.params.mes + req.params.dia;
    const url = baseUrl.replace('{0}', date);

    request(url, (error, response, body) => {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            res.status(500).send(error);
            return;
        }
        parseContent(body, res);
    });
}

module.exports = function (app) {
    app.get('/api/v1/iluminalma/:dia/:mes', requestPage);
};