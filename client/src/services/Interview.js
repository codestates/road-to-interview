export default class Interview {
  constructor(client) {
    this.client = client;
  }

  // 인터뷰 목록 생성하기
  async createInterview(payload, accessToken) {
    const response = await this.client.post('/interviews', payload, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  }
  // 인터뷰 리스트 불러오기
  async getInterviews(page = 1, size = 10, categorys_id = null) {
    const offset = (page - 1) * 10;
    const response = await this.client.get('/interviews', {
      params: {
        page: offset,
        size: size,
        categorys_id: categorys_id,
      },
    });
    // 로딩 컴포넌트 확인하기 위한 코드
    await new Promise(resolve => setTimeout(() => resolve(), 3000));
    return response.data;
  }
}
