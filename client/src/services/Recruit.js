export default class Recruit {
  constructor(client) {
    this.client = client;
  }

  // 구직데이터 가져오기
  async getRecruit() {
    const res = await this.client.get(`/news`);
    return res.data.news;
  }
}
