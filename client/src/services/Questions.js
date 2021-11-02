export default class Questions {
  constructor(client) {
    this.client = client;
  }

  // 문제 가져오기
  async getQuestions(interviewsId) {
    const res = await this.client.get(`/questions/${interviewsId}`);
    return res.data.questions;
  }
}
