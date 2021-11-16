const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  insertNews: () => {
    let con = mysql.createConnection({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
    });
    const getHtml = async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setViewport({
        width: 1366,
        height: 768,
      });
      await page.goto(
        "https://www.wanted.co.kr/wdlist/518?country=kr&job_sort=company.response_rate_order&years=-1&locations=all"
      );

      const content = await page.content();
      browser.close();
      return content;
    };
    const select_sql = `select a.position, a.company,a.url,a.img
        from (select position, company, url,img, date(createdAt) created from news) a
        where created = ?`;
    con.connect(function (err) {
      if (err) throw err;
      //한번에 데이터 안들어갈 경우를 대비하여
      con.query(
        select_sql,
        [new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]],
        function (err, result, fields) {
          if (err) throw err;
          // console.log(result);
          if (result.length < 1) {
            getHtml().then((content) => {
              let ulList = [];
              let url = "https://www.wanted.co.kr";
              const $ = cheerio.load(content);

              const list = $("ul.clearfix > li");

              list.each(function (i, elem) {
                if ($(this).find("div.job-card-position").text() !== "") {
                  ulList[i] = {
                    img: $(this)
                      .find("header")
                      .attr("style")
                      .split('url("')[1]
                      .split('");')[0],
                    position: $(this).find("div.job-card-position").text(),
                    company: $(this).find("div.job-card-company-name").text(),
                    url:
                      url +
                      $(this)
                        .find("div._3D4OeuZHyGXN7wwibRM5BJ a")
                        .attr("href"),
                  };
                }
              });
              // console.log(ulList);
              let nowList = ulList.map((el) => {
                return [
                  "null",
                  el.position,
                  el.company,
                  el.url,
                  el.img,
                  new Date(),
                  new Date(),
                ];
              });

              console.log(nowList);

              const sql =
                "insert into news(id,position,company,url,img,createdAt,updatedAt) values ?";

              con.query(sql, [nowList], function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                con.end();
                return;
              });
            });
          }
        }
      );
    });
  },
};
