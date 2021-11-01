export default class Interview {
  constructor(client) {
    this.client = client;
  }

  // 인터뷰 목록 생성하기
  async createInterview(payload) {
    const response = await this.client.post('/interviews', payload);
    return response.data;
  }
  // 인터뷰 리스트 불러오기
  async getInterviews(page = 1, size = 10) {
    const response = await this.client.get(`/interviews?page=${page}&size=${size}`);
    return response.data;
  }
}
