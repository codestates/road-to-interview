export default class Collections {
  constructor(client) {
    this.client = client;
  }

  // 유저 컬렉션 목록에 인터뷰 추가
  async addCollections(accessToken, interviews_id) {
    const res = await this.client.post(
      `/collections/${interviews_id}`,
      {},
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return res.data;
  }

  // 유저의 컬렉션 불러오기
  async getCollections(accessToken) {
    const res = await this.client.get('/collections', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return res.data;
  }
}
