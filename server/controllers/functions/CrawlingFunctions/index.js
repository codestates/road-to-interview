const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

let con = mysql.createConnection({
  host: "rti.cqmaumynjbfr.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "roadtointerview",
  database: "RTI",
  port: "13306",
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

getHtml().then((content) => {
  let ulList = [];
  let url = "https://www.wanted.co.kr";
  const $ = cheerio.load(content);

  const list = $("ul.clearfix > li");

  list.each(function (i, elem) {
    ulList[i] = {
      position: $(this).find("div.job-card-position").text(),
      company: $(this).find("div.job-card-company-name").text(),
      url: url + $(this).find("div._3D4OeuZHyGXN7wwibRM5BJ a").attr("href"),
    };
  });

  let nowList = ulList.map((el) => {
    return ["null", el.position, el.company, el.url, "now()", "now()"];
  });

  console.log(nowList);
  const sql =
    "insert into news(id,position,company,url,createdAt,updatedAt) values ?";

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, [nowList], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      con.end();
      return;
    });
  });
});
