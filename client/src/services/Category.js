export default class Category {
  constructor(client) {
    this.client = client;
  }

  // 카테고리 가져오기
  async getCategory() {
    const res = await this.client.get('/categorys');
    // 로딩 컴포넌트 확인하기 위한 코드
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    return res.data.category;
  }
}
