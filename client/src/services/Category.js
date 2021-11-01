export default class Category {
  constructor(client) {
    this.client = client;
  }

  // 카테고리 가져오기
  async getCategory() {
    const res = await this.client.get('/categorys');
    return res.data.category;
  }
}
