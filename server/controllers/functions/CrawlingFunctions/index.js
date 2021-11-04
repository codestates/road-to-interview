const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
//리눅스 환경 적용
//https://curryyou.tistory.com/222

const getHtml = async () => {
  const browser = await puppeteer.launch({
    headless: false,
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
  return { content, browser };
};

getHtml().then(({ content, browser }) => {
  let ulList = [];
  let url = "https://www.wanted.co.kr";
  const $ = cheerio.load(content);

  const list = $("ul.clearfix > li");

  list.each(function (i, elem) {
    ulList[i] = {
      position: $(this).find("div.job-card-position").text(),
      company: $(this).find("div.job-card-company-name").text(),
      src: url + $(this).find("div._3D4OeuZHyGXN7wwibRM5BJ a").attr("href"),
    };
  });
  console.log(ulList);
  const data = ulList.filter((n) => n.title);
  browser.close();
  return data;
});
